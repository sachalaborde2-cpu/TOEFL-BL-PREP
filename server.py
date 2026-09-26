#!/usr/bin/env python3
"""Serveur local de TOEFL Prep.

- Sert l'application (dossier app/) sur http://localhost:8765
- Sauvegarde la progression dans data/progression.json (+ sauvegardes horodatées)
- Proxy optionnel vers l'API Google Gemini (offre gratuite) pour la correction automatique
  du Writing et du Speaking. Clé lue depuis GEMINI_API_KEY ou data/config.json.
Aucune dépendance externe : uniquement la bibliothèque standard Python 3.
"""
import json
import os
import shutil
import sys
import time
import urllib.error
import urllib.request
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

ROOT = os.path.dirname(os.path.abspath(__file__))
APP_DIR = os.path.join(ROOT, "app")
DATA_DIR = os.path.join(ROOT, "data")
BACKUP_DIR = os.path.join(DATA_DIR, "sauvegardes")
PROGRESS_FILE = os.path.join(DATA_DIR, "progression.json")
CONFIG_FILE = os.path.join(DATA_DIR, "config.json")
PORT = int(os.environ.get("TOEFL_PORT", "8765"))

GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta"

os.makedirs(BACKUP_DIR, exist_ok=True)


def read_json(path, default):
    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return default


def write_json_atomic(path, obj):
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=1)
    os.replace(tmp, path)


def api_key():
    return os.environ.get("GEMINI_API_KEY") or read_json(CONFIG_FILE, {}).get("gemini_api_key", "")


def daily_backup():
    """Une copie de la progression par jour (on garde les 30 dernières)."""
    if not os.path.exists(PROGRESS_FILE):
        return
    name = time.strftime("progression-%Y-%m-%d.json")
    dest = os.path.join(BACKUP_DIR, name)
    if not os.path.exists(dest):
        shutil.copy2(PROGRESS_FILE, dest)
    files = sorted(f for f in os.listdir(BACKUP_DIR) if f.startswith("progression-"))
    for old in files[:-30]:
        os.remove(os.path.join(BACKUP_DIR, old))


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=APP_DIR, **kwargs)

    def log_message(self, fmt, *args):  # console plus lisible
        if "/api/" in (args[0] if args else ""):
            sys.stderr.write("  " + (fmt % args) + "\n")

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def _json(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _body(self):
        n = int(self.headers.get("Content-Length", "0") or 0)
        return json.loads(self.rfile.read(n).decode("utf-8") or "{}")

    def do_GET(self):
        if self.path == "/api/progress":
            return self._json(200, read_json(PROGRESS_FILE, None) or {})
        if self.path == "/api/status":
            return self._json(200, {"server": True, "ai": bool(api_key()), "provider": "Gemini", "model": STATE["model"]})
        return super().do_GET()

    def do_POST(self):
        try:
            if self.path == "/api/progress":
                data = self._body()
                daily_backup()
                write_json_atomic(PROGRESS_FILE, data)
                return self._json(200, {"ok": True, "saved": time.strftime("%H:%M:%S")})
            if self.path == "/api/config":
                data = self._body()
                cfg = read_json(CONFIG_FILE, {})
                cfg["gemini_api_key"] = (data.get("gemini_api_key") or "").strip()
                STATE["models"] = None; STATE["model"] = None
                write_json_atomic(CONFIG_FILE, cfg)
                return self._json(200, {"ok": True, "ai": bool(api_key())})
            if self.path == "/api/grade":
                return self._grade(self._body())
        except Exception as e:  # noqa: BLE001
            return self._json(500, {"error": str(e)})
        self._json(404, {"error": "not found"})

    def _grade(self, data):
        key = api_key()
        if not key:
            return self._json(400, {"error": "Aucune clé API Gemini configurée (Réglages)."})
        schema = json.dumps(data.get("schema") or {}, ensure_ascii=False)
        prompt = (data.get("prompt", "") + "\n\nReturn ONLY a JSON object (no markdown) matching this JSON Schema:\n" + schema)
        payload = {
            "system_instruction": {"parts": [{"text": data.get("system", "")}]},
            "contents": [{"role": "user", "parts": [{"text": prompt}]}],
            "generationConfig": {"responseMimeType": "application/json", "temperature": 0.2},
        }
        last_err = None
        for model in candidate_models(key):
            try:
                resp = gemini_call(key, model, payload)
            except urllib.error.HTTPError as e:
                detail = e.read().decode("utf-8", "replace")
                last_err = f"Gemini ({model}) : HTTP {e.code} — {detail[:300]}"
                if e.code in (404, 400) and "not found" in detail.lower() or e.code in (429, 500, 503):
                    continue  # modèle indisponible ou quota épuisé : on essaie le suivant
                return self._json(502, {"error": last_err})
            except urllib.error.URLError as e:
                return self._json(502, {"error": f"Connexion impossible à l'API Gemini : {e.reason}"})
            cands = resp.get("candidates") or []
            if not cands:
                last_err = "Réponse vide (contenu bloqué ?) : " + json.dumps(resp.get("promptFeedback", {}))[:300]
                continue
            parts = (cands[0].get("content") or {}).get("parts") or []
            text = "".join(p.get("text", "") for p in parts if not p.get("thought"))
            result = parse_json_loose(text)
            if result is None:
                last_err = "Réponse illisible : " + text[:300]
                continue
            STATE["model"] = model
            return self._json(200, {"result": normalize_grade(result), "model": model})
        return self._json(502, {"error": last_err or "Aucun modèle Gemini disponible pour cette clé."})


STATE = {"model": None, "models": None}
PREFERRED = ["gemini-flash-latest", "gemini-3.5-flash", "gemini-3-flash", "gemini-2.5-flash", "gemini-2.0-flash"]


def list_models(key):
    """Liste les modèles 'Flash' texte disponibles pour cette clé, du plus récent au plus ancien."""
    if STATE["models"] is not None:
        return STATE["models"]
    names = []
    try:
        req = urllib.request.Request(GEMINI_BASE + "/models?pageSize=200", headers={"x-goog-api-key": key})
        with urllib.request.urlopen(req, timeout=30) as r:
            for m in json.loads(r.read().decode("utf-8")).get("models", []):
                n = m.get("name", "").replace("models/", "")
                if "generateContent" not in m.get("supportedGenerationMethods", []):
                    continue
                if "flash" in n and not any(x in n for x in ("image", "tts", "audio", "live", "lite", "thinking", "exp", "8b")):
                    names.append(n)
    except Exception:  # noqa: BLE001
        pass
    import re as _re
    def ver(n):
        m = _re.search(r"gemini-(\d+(?:\.\d+)?)", n)
        return (float(m.group(1)) if m else 0, "preview" not in n)
    names.sort(key=ver, reverse=True)
    STATE["models"] = names
    return names


def candidate_models(key):
    cfg_model = read_json(CONFIG_FILE, {}).get("gemini_model")
    out = []
    for m in [cfg_model, STATE["model"], *list_models(key)[:3], *PREFERRED]:
        if m and m not in out:
            out.append(m)
    return out


def gemini_call(key, model, payload):
    req = urllib.request.Request(
        f"{GEMINI_BASE}/models/{model}:generateContent",
        data=json.dumps(payload).encode("utf-8"),
        headers={"content-type": "application/json", "x-goog-api-key": key},
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.loads(r.read().decode("utf-8"))


def parse_json_loose(text):
    t = (text or "").strip()
    if t.startswith("```"):
        t = t.strip("`")
        t = t[t.find("{"):]
    i, j = t.find("{"), t.rfind("}")
    if i < 0 or j < 0:
        return None
    try:
        return json.loads(t[i:j + 1])
    except ValueError:
        return None


def normalize_grade(r):
    """Garantit la forme attendue par l'appli, même si le modèle omet un champ."""
    def num(v, d):
        try:
            return float(v)
        except (TypeError, ValueError):
            return d
    score = max(0.0, min(5.0, round(num(r.get("score"), 3) * 2) / 2))
    lst = lambda k: [str(x) for x in (r.get(k) or []) if x]  # noqa: E731
    corr = [c for c in (r.get("corrections") or []) if isinstance(c, dict)]
    return {
        "score": score,
        "band_estimate": max(1.0, min(6.0, num(r.get("band_estimate"), 1 + score))),
        "cefr": str(r.get("cefr") or ""),
        "summary": str(r.get("summary") or ""),
        "strengths": lst("strengths"),
        "improvements": lst("improvements"),
        "corrections": [{"original": str(c.get("original", "")), "corrected": str(c.get("corrected", "")), "explanation": str(c.get("explanation", ""))} for c in corr],
        "upgraded_version": str(r.get("upgraded_version") or ""),
    }


def main():
    try:
        httpd = ThreadingHTTPServer(("127.0.0.1", PORT), Handler)
    except OSError:
        print(f"Le port {PORT} est déjà utilisé : l'application tourne sans doute déjà.")
        print(f"Ouvre http://localhost:{PORT} dans ton navigateur.")
        return
    print("=" * 56)
    print("  TOEFL Prep est lancé  ->  http://localhost:%d" % PORT)
    print("  Progression sauvegardée dans : data/progression.json")
    print("  Laisse cette fenêtre ouverte pendant tes sessions.")
    print("  Pour arrêter : ferme la fenêtre ou Ctrl+C")
    print("=" * 56)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
