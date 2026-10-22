// Balayage audio : envoie chaque morceau de texte du Listening (découpé comme dans l'appli) à la vraie synthèse vocale d'Edge
// et vérifie qu'elle démarre. Détecte les textes que le moteur refuse ou ne lit pas.
// Usage : node tools/sweep-audio.js [nbNavigateurs=4] [limite=0] [pauseMs=450] [pas=1]   (pas = ne tester qu'un morceau sur N)   (limite = n'essayer que les N premiers morceaux)
const fs = require('fs'), vm = require('vm'), path = require('path'), os = require('os');
const { spawn } = require('child_process');
const http = require('http');
const SHARDS = +process.argv[2] || 4, LIMIT = +process.argv[3] || 0, GAP = +process.argv[4] || 450, STRIDE = +process.argv[5] || 1; // GAP = pause (ms) entre annulation et morceau suivant
const base = path.join(__dirname, '..', 'app') + '/';
const edge = process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';

/* 1) découpage identique à l'appli : on charge le vrai core.js dans une sandbox */
const el = () => new Proxy(function () {}, { get: (t, k) => k === 'classList' ? { toggle() {}, add() {}, remove() {} } : el(), apply: () => el(), set: () => true });
const ctx = { console, setTimeout, clearTimeout, setInterval, clearInterval, Date, Math, JSON, URL, Blob: function () {}, CONTENT: {},
  document: { querySelector: () => ({ textContent: '', classList: { add() {}, remove() {}, toggle() {} } }), querySelectorAll: () => [], createElement: () => el(), body: { classList: { toggle() {} } }, documentElement: {}, addEventListener() {} },
  localStorage: { getItem: () => null, setItem() {} }, location: { hash: '' }, history: {}, navigator: {}, speechSynthesis: undefined, fetch: () => Promise.reject(new Error('x')) };
ctx.window = ctx; ctx.addEventListener = () => {}; ctx.matchMedia = () => ({ matches: false });
vm.createContext(ctx);
const html = fs.readFileSync(base + 'index.html', 'utf8');
for (const m of html.matchAll(/src="((?:data|js)\/[^"]+)"/g)) { if (/pages|motion|tasks|session|lookup/.test(m[1])) continue; vm.runInContext(fs.readFileSync(base + m[1], 'utf8'), ctx, { filename: m[1] }); }
let jobs = vm.runInContext(`(() => { const out = [];
  for (const type of ['lcr', 'conv', 'ann', 'talk']) for (const it of CONTENT[type]) {
    const turns = it.lines ? it.lines.map((l) => [l[0], l[1]]) : [[it.g || 'W', it.text || it.p]];
    turns.forEach(([g, t], k) => Voice.chunks(t).forEach((c, j) => out.push({ id: it.id + (it.lines ? '#' + k : '') + (j ? '.' + j : ''), g, t: c })));
  } return out; })()`, ctx);
if (STRIDE > 1) jobs = jobs.filter((_, k) => k % STRIDE === 0);
if (LIMIT) jobs = jobs.slice(0, LIMIT);
console.log('morceaux à tester :', jobs.length, 'sur', SHARDS, 'navigateurs');

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
async function worker(idx, list) {
  const port = 9460 + idx, prof = fs.mkdtempSync(path.join(os.tmpdir(), 'sweep-'));
  const ch = spawn(edge, ['--headless=new', '--remote-debugging-port=' + port, '--autoplay-policy=no-user-gesture-required', '--user-data-dir=' + prof, 'about:blank'], { stdio: 'ignore' });
  const get = (p) => new Promise((res, rej) => http.get({ host: '127.0.0.1', port, path: p }, (r) => { let d = ''; r.on('data', (c) => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej));
  let tabs; for (let i = 0; i < 60; i++) { try { tabs = await get('/json'); if (tabs.length) break; } catch (e) { /* attente */ } await wait(250); }
  const pg = tabs.find((t) => t.type === 'page') || tabs[0]; const ws = new WebSocket(pg.webSocketDebuggerUrl); let id = 0; const pend = {};
  await new Promise((r) => ws.onopen = r);
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d.result); };
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  await send('Page.enable'); await send('Page.navigate', { url: 'http://127.0.0.1:' + port + '/json/version' }); await wait(1500);
  const r = await send('Runtime.evaluate', { awaitPromise: true, returnByValue: true, expression: `(async () => {
    await new Promise((r) => { const f = () => speechSynthesis.getVoices().length ? r() : 0; f(); speechSynthesis.onvoiceschanged = f; setTimeout(r, 4000); });
    const vs = speechSynthesis.getVoices();
    const vW = vs.find((v) => /Aria Online/.test(v.name)), vM = vs.find((v) => /Guy Online/.test(v.name));
    if (!vW || !vM) return JSON.stringify({ fatal: 'voix Aria/Guy introuvables' });
    const jobs = ${JSON.stringify(list)}; const bad = [], flaky = []; let n = 0, slow = 0, sumMs = 0, first = 0, recovered = 0; const GAP = ${GAP};
    const tryOnce = (j, v) => new Promise((resolve) => {
      const u = new SpeechSynthesisUtterance(j.t); u.voice = v; u.lang = v.lang; let done = false; const t0 = performance.now();
      const fin = (x) => { if (!done) { done = true; clearTimeout(tm); resolve(x); } };
      u.onstart = () => fin({ ok: true, ms: Math.round(performance.now() - t0) });
      u.onerror = (e) => fin({ err: e.error });
      const tm = setTimeout(() => fin({ err: 'TIMEOUT' }), 9000);
      speechSynthesis.speak(u);
    });
    for (const j of jobs) {
      const v = j.g === 'M' ? vM : vW;
      const res = await tryOnce(j, v);
      speechSynthesis.cancel(); await new Promise((r) => setTimeout(r, GAP));
      n++; if (res.ok) { sumMs += res.ms; if (res.ms > 2500) slow++; } else { first++; flaky.push({ id: j.id, err: res.err }); const again = await tryOnce(j, v); speechSynthesis.cancel(); await new Promise((r) => setTimeout(r, 600)); if (again.ok) { recovered++; } else bad.push({ id: j.id, err: res.err + '→' + again.err, t: j.t.slice(0, 80) }); }
    }
    return JSON.stringify({ n, bad, slow, first, recovered, meanStartMs: Math.round(sumMs / Math.max(1, n - first)) });
  })()` });
  ws.close(); ch.kill(); try { fs.rmSync(prof, { recursive: true, force: true }); } catch (e) { /* rien */ }
  return JSON.parse(r.result.value);
}
(async () => {
  const shards = Array.from({ length: SHARDS }, (_, i) => jobs.filter((_, k) => k % SHARDS === i));
  const t0 = Date.now();
  const res = await Promise.all(shards.map((s, i) => worker(i, s)));
  let n = 0, slow = 0, first = 0, recovered = 0; const bad = [];
  for (const r of res) { if (r.fatal) { console.log('ERREUR :', r.fatal); continue; } n += r.n; slow += r.slow; first += r.first; recovered += r.recovered; bad.push(...r.bad); }
  console.log(`testés : ${n} · échecs au 1er essai : ${first} · réussis au 2e essai : ${recovered} · échecs permanents : ${bad.length} · démarrages > 2,5 s : ${slow} · durée : ${Math.round((Date.now() - t0) / 1000)} s`);
  console.log('latence moyenne de démarrage par navigateur (ms) :', res.map((r) => r.meanStartMs).join(', '));
  for (const b of bad.slice(0, 40)) console.log(' ✗', b.id, b.err, JSON.stringify(b.t));
  process.exit(0);
})();
