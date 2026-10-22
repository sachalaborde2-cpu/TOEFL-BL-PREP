/* =========================================================
   TOEFL Prep — noyau : utilitaires, stockage, scoring, audio, routeur
   ========================================================= */
'use strict';
window.CONTENT = window.CONTENT || {};

/* ---------- Utilitaires ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
const shuffle = (arr) => { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sum = (a) => a.reduce((s, x) => s + x, 0);
const avg = (a) => (a.length ? sum(a) / a.length : 0);
const pct = (x) => Math.round(x * 100) + '%';
const LETTERS = 'ABCDEFGH';

function h(html) { const t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstElementChild; }
function todayStr(d = new Date()) { const z = new Date(d.getTime() - d.getTimezoneOffset() * 60000); return z.toISOString().slice(0, 10); }
function parseDay(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); }
function daysBetween(a, b) { return Math.round((parseDay(todayStr(b)) - parseDay(todayStr(a))) / 86400000); }
function fmtDate(ts, opts = { day: 'numeric', month: 'short' }) { return new Date(ts).toLocaleDateString('fr-FR', opts); }
function fmtTime(sec) { sec = Math.max(0, Math.round(sec)); const m = Math.floor(sec / 60), s = sec % 60; return m + ':' + String(s).padStart(2, '0'); }
function wordCount(t) { return (t.trim().match(/[A-Za-z0-9'’-]+/g) || []).length; }

function toast(msg, ms = 2200) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('on');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('on'), ms);
}

/* ---------- Métadonnées des tâches ---------- */
const SECTIONS = {
  R: { name: 'Reading', fr: 'Compréhension écrite', color: 'var(--sec-R)' },
  L: { name: 'Listening', fr: 'Compréhension orale', color: 'var(--sec-L)' },
  W: { name: 'Writing', fr: 'Expression écrite', color: 'var(--sec-W)' },
  S: { name: 'Speaking', fr: 'Expression orale', color: 'var(--sec-S)' },
};
const TYPES = {
  ctw:   { sec: 'R', name: 'Complete the Words', fr: 'Compléter les mots', min: 3, weight: 0.45, unit: 'paragraphe' },
  dl:    { sec: 'R', name: 'Read in Daily Life', fr: 'Textes du quotidien', min: 2.5, weight: 0.25, unit: 'document' },
  ap:    { sec: 'R', name: 'Read an Academic Passage', fr: 'Texte académique', min: 6, weight: 0.30, unit: 'passage' },
  lcr:   { sec: 'L', name: 'Listen and Choose a Response', fr: 'Choisir la réponse', min: 0.5, weight: 0.35, unit: 'réplique' },
  conv:  { sec: 'L', name: 'Listen to a Conversation', fr: 'Conversation', min: 2, weight: 0.25, unit: 'conversation' },
  ann:   { sec: 'L', name: 'Listen to an Announcement', fr: 'Annonce', min: 2, weight: 0.15, unit: 'annonce' },
  talk:  { sec: 'L', name: 'Listen to an Academic Talk', fr: 'Mini-cours', min: 4, weight: 0.25, unit: 'cours' },
  bas:   { sec: 'W', name: 'Build a Sentence', fr: 'Construire la phrase', min: 0.6, weight: 0.5, unit: 'phrase' },
  email: { sec: 'W', name: 'Write an Email', fr: 'Rédiger un e-mail', min: 9, weight: 0.25, unit: 'e-mail' },
  disc:  { sec: 'W', name: 'Write for an Academic Discussion', fr: 'Discussion académique', min: 12, weight: 0.25, unit: 'discussion' },
  rep:   { sec: 'S', name: 'Listen and Repeat', fr: 'Écouter et répéter', min: 3, weight: 0.64, unit: 'série de 7' },
  int:   { sec: 'S', name: 'Take an Interview', fr: 'Entretien', min: 5, weight: 0.36, unit: 'entretien (4 questions)' },
};
const SEC_TYPES = { R: ['ctw', 'dl', 'ap'], L: ['lcr', 'conv', 'ann', 'talk'], W: ['bas', 'email', 'disc'], S: ['rep', 'int'] };

/* ---------- Échelles de score (ETS, janvier 2026) ---------- */
const BAND_TO_120 = [[6, 114], [5.5, 107], [5, 95], [4.5, 86], [4, 72], [3.5, 58], [3, 44], [2.5, 34], [2, 24], [1.5, 12], [1, 0]];
function bandCefr(b) { if (b == null) return '—'; if (b >= 6) return 'C2'; if (b >= 5) return 'C1'; if (b >= 4) return 'B2'; if (b >= 3) return 'B1'; if (b >= 2) return 'A2'; return 'A1'; }
function roundHalf(x) { return Math.floor(x * 2 + 0.5) / 2; } // 5.25 -> 5.5 (règle ETS : arrondi à la demi-bande la plus proche)
/* Estimation (non officielle) : % de points obtenus -> bande 1-6 */
const PCT_BANDS = [[0.95, 6], [0.88, 5.5], [0.78, 5], [0.68, 4.5], [0.56, 4], [0.45, 3.5], [0.35, 3], [0.26, 2.5], [0.18, 2], [0.1, 1.5], [0, 1]];
function pctToBand(p) { for (const [t, b] of PCT_BANDS) if (p >= t) return b; return 1; }
/* version continue, pour des moyennes plus fines */
function pctToBandCont(p) {
  const pts = PCT_BANDS.slice().reverse();
  if (p <= 0) return 1; if (p >= 0.95) return 6;
  for (let i = 0; i < pts.length - 1; i++) {
    const [t0, b0] = pts[i], [t1, b1] = pts[i + 1];
    if (p >= t0 && p < t1) return b0 + (b1 - b0) * (p - t0) / (t1 - t0);
  }
  return 6;
}
/* bande moyenne (continue) -> équivalent 0-120 approximatif */
function bandTo120(b) {
  if (b == null) return null;
  const pts = BAND_TO_120.slice().reverse().concat([[6.5, 120]]);
  if (b <= 1) return 0;
  for (let i = 0; i < pts.length - 1; i++) {
    const [b0, s0] = pts[i], [b1, s1] = pts[i + 1];
    if (b >= b0 && b < b1) return Math.round(s0 + (s1 - s0) * (b - b0) / (b1 - b0));
  }
  return 120;
}
function score120ToBand(s) { for (const [b, min] of BAND_TO_120) if (s >= min) return b; return 1; }
function fmtBand(b) { return b == null ? '—' : (Math.round(b * 2) / 2).toFixed(1); }

/* ---------- Stockage ---------- */
const STORAGE_KEY = 'toefl-prep-v1';
function defaultState() {
  return {
    version: 1, updatedAt: 0,
    profile: null,
    attempts: [],   // {ts,type,id,mode,score(0-1),n,diff}
    seen: {},       // "type:id" -> ts
    bags: null,     // type -> ids faits dans le cycle en cours (null = à reconstruire depuis `seen`)
    cycles: {},     // type -> nombre de cycles complets terminés
    myVocab: [],    // mots/expressions ajoutés depuis les exercices : {w, fr, d, ctx, ts}
    lv: {},         // type -> niveau courant des séquences : 2 = B2 (pool B2/C1/C2), 3 = C1 (pool C1/C2)
    mocks: [],      // rapports de tests blancs
    errors: [],     // carnet d'erreurs
    vocab: {},      // mot -> {box,due,right,wrong}
    writings: [],   // productions écrites
    speakings: [],  // productions orales
    activity: {},   // 'YYYY-MM-DD' -> minutes
    settings: { rate: 1, accent: 'mix', replay: true, reserve: true, theme: 'auto', showTranscript: true },
  };
}
const Store = {
  state: defaultState(), server: false, ai: false, _t: null,
  async init() {
    try { const raw = localStorage.getItem(STORAGE_KEY); if (raw) this.state = Object.assign(defaultState(), JSON.parse(raw)); } catch (e) { /* stockage indisponible */ }
    this.state.settings = Object.assign(defaultState().settings, this.state.settings || {});
    try {
      const st = await fetch('/api/status').then((r) => r.json());
      this.server = !!st.server; this.ai = !!st.ai;
      const remote = await fetch('/api/progress').then((r) => r.json());
      if (remote && remote.version && (remote.updatedAt || 0) > (this.state.updatedAt || 0)) {
        this.state = Object.assign(defaultState(), remote);
        this.state.settings = Object.assign(defaultState().settings, remote.settings || {});
        this._local();
      }
    } catch (e) { this.server = false; }
    this.status();
  },
  _local() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state)); } catch (e) { /* plein ou bloqué */ } },
  save() {
    this.state.updatedAt = Date.now();
    this._local();
    clearTimeout(this._t);
    this._t = setTimeout(() => this.push(), 800);
  },
  async push() {
    if (!this.server) return this.status();
    try {
      await fetch('/api/progress', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(this.state) });
      this.status('Sauvegardé ' + new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    } catch (e) { this.server = false; this.status(); }
  },
  status(msg) {
    const el = $('#sync-status'); if (!el) return;
    el.innerHTML = this.server
      ? `● ${esc(msg || 'Progression synchronisée')}<br><span>dans data/progression.json</span>`
      : `<span style="color:var(--warn)">● Hors serveur</span><br><span>Sauvegarde navigateur uniquement — lance « Lancer TOEFL Prep.command »</span>`;
  },
  get s() { return this.state; },
};

/* ---------- Contenu ---------- */
const Content = {
  all(type) { return CONTENT[type] || []; },
  get(type, id) { return this.all(type).find((x) => x.id === id); },
  reservedIds() {
    // Les items des tests blancs fixes ne sont pas proposés en entraînement tant que le test n'a pas été passé.
    const set = new Set();
    if (!Store.s.settings.reserve) return set;
    const done = new Set(Store.s.mocks.map((m) => m.mockId));
    for (const m of (CONTENT.mocks || [])) {
      if (done.has(m.id)) continue;
      for (const [type, ids] of Object.entries(m.items)) ids.forEach((id) => set.add(type + ':' + id));
    }
    return set;
  },
  /* Niveau CECRL d'une séquence : 2 = B2, 3 = C1, 4 = C2. Le minimum est B2 : un ancien « 1 » (B1) compte comme B2. */
  level(x) { return clamp(x.diff || 2, 2, 4); },
  /* Séquences proposables pour ce type : hors tests blancs réservés, et dans la tranche de niveau de l'élève
     (niveau B2 -> B2/C1/C2 ; niveau C1 -> C1/C2). `diffs` impose une tranche (tests blancs adaptatifs). */
  eligible(type, { diffs = null, allowReserved = false, exclude = null } = {}) {
    const reserved = allowReserved ? new Set() : this.reservedIds();
    const levels = diffs || Estimator.levels(type);
    const all = this.all(type).filter((x) => !(exclude && exclude.has(type + ':' + x.id)));
    const base = all.filter((x) => !reserved.has(type + ':' + x.id));
    const pool = base.length ? base : all;
    const lv = pool.filter((x) => levels.includes(this.level(x)));
    return lv.length ? lv : pool;
  },
  /* « Sac » du cycle en cours pour un type : ids déjà faits depuis le dernier tour complet.
     Première utilisation sur une ancienne sauvegarde : on le reconstruit à partir de `seen`. */
  bag(type) {
    const s = Store.s;
    if (!s.bags) {
      s.bags = {};
      for (const k of Object.keys(s.seen || {})) { const i = k.indexOf(':'); (s.bags[k.slice(0, i)] = s.bags[k.slice(0, i)] || []).push(k.slice(i + 1)); }
    }
    return (s.bags[type] = s.bags[type] || []);
  },
  /* Choisit n séquences au hasard parmi celles de ton niveau pas encore faites dans le cycle en cours.
     Quand toutes celles de ton niveau ont été faites (voir markDone), le cycle repart de zéro. */
  pick(type, n, { exclude = new Set(), diffs = null, allowReserved = false } = {}) {
    const pool = this.eligible(type, { diffs, allowReserved, exclude });
    const done = new Set(this.bag(type));
    const out = shuffle(pool.filter((x) => !done.has(x.id))).slice(0, n);
    if (out.length < n) { // il reste moins de n séquences inédites dans le cycle : on complète au hasard
      const taken = new Set(out.map((x) => x.id));
      out.push(...shuffle(pool.filter((x) => !taken.has(x.id))).slice(0, n - out.length));
    }
    return out;
  },
  /* Appelé quand une séquence est terminée : l'ajoute au cycle, et relance le cycle quand tout ton niveau a été fait */
  markDone(type, id) {
    const s = Store.s; const bag = this.bag(type);
    if (!bag.includes(id)) bag.push(id);
    const pool = this.eligible(type); const done = new Set(bag);
    if (pool.length && pool.every((x) => done.has(x.id))) {
      const ids = new Set(pool.map((x) => x.id));
      s.bags[type] = bag.filter((i) => !ids.has(i)); // on ne repart de zéro que pour la tranche de niveau terminée
      s.cycles = s.cycles || {}; s.cycles[type] = (s.cycles[type] || 0) + 1;
      toast(`Cycle terminé : tu as fait les ${pool.length} exercices de « ${TYPES[type] ? TYPES[type].name : type} » à ton niveau. On repart de zéro !`, 4200);
    }
  },
  /* Séquences restantes dans le cycle en cours (à ton niveau) */
  unseenCount(type) { const done = new Set(this.bag(type)); return this.eligible(type).filter((x) => !done.has(x.id)).length; },
  cycleTotal(type) { return this.eligible(type).length; },
  cycleNo(type) { return ((Store.s.cycles || {})[type] || 0) + 1; },
};

/* ---------- Enregistrement des résultats ---------- */
const Record = {
  attempt({ type, id, mode, score, n = 1, diff = 2 }) {
    const s = Store.s;
    s.attempts.push({ ts: Date.now(), type, id, mode, score: Math.round(score * 1000) / 1000, n, diff: clamp(diff || 2, 2, 4) });
    s.seen[type + ':' + id] = Date.now();
    Estimator.refreshLevel(type);
    Content.markDone(type, id);
    Store.save();
  },
  minutes(min) {
    const d = todayStr(); Store.s.activity[d] = Math.round(((Store.s.activity[d] || 0) + min) * 10) / 10; Store.save();
  },
  error(e) {
    const s = Store.s; const key = e.type + ':' + e.id + ':' + (e.q ?? '');
    const ex = s.errors.find((x) => x.key === key);
    if (ex) { ex.ts = Date.now(); ex.count = (ex.count || 1) + 1; ex.mastered = false; }
    else s.errors.push(Object.assign({ key, ts: Date.now(), count: 1, mastered: false, streak: 0 }, e));
    Store.save(); updateBadges();
  },
  errorFixed(key) {
    const e = Store.s.errors.find((x) => x.key === key); if (!e) return;
    e.streak = (e.streak || 0) + 1; if (e.streak >= 2) e.mastered = true; Store.save(); updateBadges();
  },
};
function updateBadges() {
  const n = Store.s.errors.filter((e) => !e.mastered).length;
  const b = $('#err-badge'); if (b) b.textContent = n ? String(n) : '';
}

/* ---------- Estimation du niveau ---------- */
const DIFF_CAP = { 1: 0.75, 2: 0.93, 3: 1, 4: 1 }; // 1 = anciennes tentatives B1 ; B2 plafonne à 93 %, C1/C2 comptent plein
const Estimator = {
  typeStats(type, { windowPts = 60 } = {}) {
    const list = Store.s.attempts.filter((a) => a.type === type).slice().reverse();
    let pts = 0, num = 0, den = 0, i = 0;
    for (const a of list) {
      if (pts >= windowPts) break;
      const rec = Math.pow(0.97, i++);
      // la difficulté plafonne : 100 % sur des items B2 ne prouve pas un niveau C1
      const adj = a.score * DIFF_CAP[a.diff || 2];
      num += clamp(adj, 0, 1) * a.n * rec; den += a.n * rec; pts += a.n;
    }
    const count = Store.s.attempts.filter((a) => a.type === type).length;
    return den ? { acc: num / den, count, band: pctToBandCont(num / den) } : { acc: null, count: 0, band: null };
  },
  practiceSection(sec) {
    let num = 0, den = 0;
    for (const t of SEC_TYPES[sec]) { const st = this.typeStats(t); if (st.acc != null) { num += st.acc * TYPES[t].weight; den += TYPES[t].weight; } }
    return den ? pctToBandCont(num / den) : null;
  },
  lastMock(maxDays = 30) {
    const m = Store.s.mocks.filter((x) => x.complete && x.kind !== 'diag-partial').slice(-1)[0];
    if (!m) return null; if ((Date.now() - m.ts) / 86400000 > maxDays) return null; return m;
  },
  lastMockSection(sec, maxDays = 30) {
    const m = Store.s.mocks.filter((x) => x.sections && x.sections[sec] && (Date.now() - x.ts) / 86400000 <= maxDays).slice(-1)[0];
    return m ? m.sections[sec] : null;
  },
  section(sec) {
    const p = this.practiceSection(sec);
    const ms = this.lastMockSection(sec);
    const mb = ms ? (ms.bandCont ?? ms.band) : null;
    if (mb != null && p != null) return 0.6 * mb + 0.4 * p;
    return mb ?? p;
  },
  overall() {
    const b = ['R', 'L', 'W', 'S'].map((s) => this.section(s));
    if (b.some((x) => x == null)) {
      const known = b.filter((x) => x != null); if (!known.length) return null;
      return { band: roundHalf(avg(known)), cont: avg(known), partial: true, sections: b };
    }
    return { band: roundHalf(avg(b)), cont: avg(b), partial: false, sections: b };
  },
  /* Niveau courant des séquences pour un type : 2 = B2, 3 = C1.
     Au départ : auto-évaluation du profil (C1 -> 3, sinon B2). Ensuite il suit ta réussite récente (fenêtre pondérée par la difficulté) :
     on monte en C1 à partir de la bande 5.0, et on redescend en B2 sous 4.5 (marge pour éviter de zigzaguer). */
  startLevel(type) {
    const self = Store.s.profile && Store.s.profile.self && Store.s.profile.self[TYPES[type].sec];
    return self === 'C1' ? 3 : 2;
  },
  refreshLevel(type) {
    const s = Store.s; s.lv = s.lv || {};
    const st = this.typeStats(type);
    let lv = s.lv[type] || this.startLevel(type);
    if (st.acc != null && st.count >= 3) { if (lv === 2 && st.band >= 5) lv = 3; else if (lv === 3 && st.band < 4.5) lv = 2; }
    s.lv[type] = lv; return lv;
  },
  /* tranche de niveaux proposée pour un type : B2 -> [B2, C1, C2] ; C1 -> [C1, C2] */
  levels(type) { const lv = (Store.s.lv && Store.s.lv[type]) || this.startLevel(type); return lv >= 3 ? [3, 4] : [2, 3, 4]; },
  levelLabel(type) { return this.levels(type)[0] >= 3 ? 'C1' : 'B2'; },
  targetBand() { return (Store.s.profile && Store.s.profile.targetBand) || 5.5; },
};

/* ---------- Audio : synthèse vocale ---------- */
/* Les listes de prénoms servent à deviner le genre d'une voix (Windows/Edge : « Microsoft Aria Online (Natural) », macOS : « Samantha »…) */
const FEMALE = /samantha|karen|moira|tessa|victoria|allison|\bava\b|susan|serena|kate|fiona|veena|\bfemale\b|zoe|zoë|nicky|catherine|martha|shelley|sandy|flo|kathy|agnes|joanna|salli|kimberly|ivy|emma|amy|libby|sonia|natasha|jenny|aria|michelle|google us english|siri.*voice 2|stephanie|clara|maisie|emily|neerja|asilia|ezinne|molly|rosa|luna|imani|leah|\bana\b|\byan\b/i;
const MALE = /daniel|alex\b|fred|rishi|aaron|arthur|gordon|tom\b|oliver|evan|nathan|\bmale\b|lee\b|reed|rocko|eddy|grandpa|ralph|albert|bruce|junior|matthew|justin|joey|brian|ryan|guy|william|thomas|siri.*voice 1|james|andrew|christopher|\beric\b|roger|steffan|liam|connor|mitchell|wayne|luke|prabhat|\bsam\b|elimu|chilemba|abeo/i;
const Voice = {
  voices: [], _keep: [], _bad: new Set(), speaking: false, _token: null, _lastCancel: 0, _seq: 0,
  init() {
    if (!('speechSynthesis' in window)) return;
    const load = () => { this.voices = speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang)); };
    load(); speechSynthesis.onvoiceschanged = load;
  },
  /* attend que la liste des voix soit chargée (Chrome/Edge la remplissent après coup) : évite de lire avec une voix par défaut */
  ready() {
    if (this.voices.length) return Promise.resolve();
    this.init();
    return new Promise((res) => { const t0 = Date.now(); const iv = setInterval(() => { if (this.voices.length || Date.now() - t0 > 2500) { clearInterval(iv); res(); } }, 50); });
  },
  gender(v) { if (MALE.test(v.name)) return 'M'; if (FEMALE.test(v.name)) return 'W'; return '?'; },
  quality(v) { return (/enhanced|premium|neural|natural/i.test(v.name) ? 3 : 0) + (/google/i.test(v.name) ? 2 : 0) + (v.localService ? 0.5 : 0) - (/fred|albert|bad news|bahh|bells|boing|bubbles|cellos|good news|jester|organ|superstar|trinoids|whisper|wobble|zarvox|junior|ralph|grandma|grandpa|eddy|flo|reed|rocko|sandy|shelley/i.test(v.name) ? 10 : 0); },
  accentList() { const a = Store.s.settings.accent; if (a === 'us') return ['en-US']; if (a === 'gb') return ['en-GB']; return ['en-US', 'en-GB', 'en-AU', 'en-US']; },
  /* Choisit une voix pour un genre + un accent ; retombe sur n'importe quelle voix anglaise. Les voix qui ont échoué sont écartées. */
  pick(g = 'W', accent = null, avoid = null) {
    if (!this.voices.length) this.init();
    const acc = accent || shuffle(this.accentList())[0];
    const norm = (l) => l.replace('_', '-');
    let cands = this.voices.filter((v) => v !== avoid && !this._bad.has(v.name));
    if (!cands.length) cands = this.voices.filter((v) => v !== avoid);
    const score = (v) => this.quality(v) + (this.gender(v) === g ? 5 : this.gender(v) === '?' ? 1 : -3) + (norm(v.lang).startsWith(acc) ? 3 : 0) + Math.random();
    return cands.sort((a, b) => score(b) - score(a))[0] || null;
  },
  cast(genders) { // voix cohérentes et distinctes pour une conversation
    const map = {}; let prev = null;
    for (const g of genders) { if (!map[g]) { map[g] = this.pick(g, null, prev); prev = map[g]; } }
    return map;
  },
  /* Annule la lecture en cours. Après une annulation, les moteurs en ligne (Edge) refusent de parler pendant quelques centaines de ms
     (erreur « synthesis-failed », mesurée : 43 % d'échecs à 60 ms, 0 % à 400 ms) : on note l'heure et on attend avant de reparler. */
  cancel() {
    if ('speechSynthesis' in window) { if (speechSynthesis.speaking || speechSynthesis.pending) this._lastCancel = Date.now(); speechSynthesis.cancel(); }
    this.speaking = false; this._token = null;
  },
  async _settle() { const w = 450 - (Date.now() - this._lastCancel); if (w > 0) await sleep(w); },
  /* Découpe un texte en phrases sans couper après « Dr. », « Ms. », « a.m. », « e.g. » ni dans « 3.5 » */
  sentences(text) {
    const t = String(text).replace(/\s+/g, ' ').trim(); if (!t) return [];
    const ABBR = /^(?:Dr|Mr|Mrs|Ms|Prof|St|Jr|Sr|vs|etc|Inc|Ltd|Co|No|Fig|Vol|approx|Mt)\.$/i, DOTTED = /^(?:[A-Za-z]\.){2,}[,;:)]?$/;
    const out = []; let cur = '';
    for (const tok of t.split(/(\s+)/)) {
      cur += tok; if (!tok.trim()) continue;
      if (/[.!?]["')\]]*$/.test(tok) && !ABBR.test(tok) && !DOTTED.test(tok) && !/\.\.\.$/.test(tok)) { out.push(cur.trim()); cur = ''; }
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  },
  /* Prépare le texte pour la voix : tirets, symboles et marques qu'elle lirait mal */
  speakable(t) {
    return String(t).replace(/\s*[—–]\s*/g, ', ').replace(/…/g, '...').replace(/&/g, ' and ').replace(/and\/or/gi, 'and or').replace(/([A-Za-z])\/([A-Za-z])/g, '$1 or $2').replace(/[*_#~^|<>{}\[\]]/g, ' ').replace(/\s+/g, ' ').trim();
  },
  /* Morceaux à lire d'un seul souffle : une réplique courte = 1 morceau (moins de redémarrages du moteur = moins de blancs),
     un long texte est coupé à la fin d'une phrase vers 240 caractères (les très longs textes sont coupés par les moteurs en ligne). */
  chunks(text, max = 240) {
    const out = []; let cur = '';
    for (const s of this.sentences(this.speakable(text))) {
      if (cur && (cur + ' ' + s).length > max) { out.push(cur); cur = s; } else cur = cur ? cur + ' ' + s : s;
    }
    if (cur) out.push(cur);
    return out.flatMap((c) => {
      if (c.length <= 420) return [c];
      const parts = c.split(/(?<=[,;:])\s+/), r = []; let b = '';
      for (const p of parts) { if (b && (b + ' ' + p).length > max) { r.push(b); b = p; } else b = b ? b + ' ' + p : p; }
      if (b) r.push(b); return r;
    });
  },
  /* segments : [{t, g}] ; lit tout. Les morceaux sont enchaînés sans temps mort : le suivant est mis en file dès que le précédent démarre.
     Renvoie { ok, blocked, interrupted, played, failed, total } :
       blocked     = le navigateur refuse de parler sans clic préalable (il faut un bouton ▶) ;
       failed      = nombre de morceaux que la voix n'a pas pu lire (réseau coupé, voix en panne). */
  async play(segments, { rate = null, voices = null, onStart, onEnd } = {}) {
    const res = { ok: true, blocked: false, interrupted: false, played: 0, failed: 0, total: 0 };
    if (!('speechSynthesis' in window)) { toast('Synthèse vocale indisponible dans ce navigateur'); res.ok = false; res.failed = 1; res.total = 1; return res; }
    await this.ready();
    const cast = voices || {}; let prevV = null; // voix manquantes (liste pas encore chargée au rendu) : choisies maintenant, et conservées pour la réécoute
    for (const g of new Set(segments.map((s) => s.g || 'W'))) { if (!cast[g]) cast[g] = this.pick(g, null, prevV); prevV = cast[g]; }
    const queue = []; for (const seg of segments) for (const t of this.chunks(seg.t)) queue.push({ t, g: seg.g || 'W' });
    res.total = queue.length; if (!queue.length) return res;
    const myId = ++this._seq; this.cancel(); await this._settle();
    if (myId !== this._seq) { res.interrupted = true; return res; } // une autre lecture a été demandée entre-temps
    const r = rate || Store.s.settings.rate || 1;
    const tok = this._token = uid(); this.speaking = true; onStart && onStart();
    const alive = () => this._token === tok && this.speaking;
    const items = []; // un objet par morceau : { began, p (promesse de fin), fail() }
    const make = (i) => {
      const c = queue[i], o = { began: false };
      o.p = new Promise((resolve) => {
        const v = cast[c.g]; const u = new SpeechSynthesisUtterance(c.t);
        if (v) { u.voice = v; u.lang = v.lang; } else u.lang = 'en-US';
        u.rate = r; let done = false, wd = null;
        const finish = (st) => { if (done) return; done = true; clearTimeout(wd); resolve(st); };
        o.fail = () => { try { this._lastCancel = Date.now(); speechSynthesis.cancel(); } catch (e) { /* rien */ } finish('fail'); };
        u.onstart = () => { o.began = true; if (i + 1 < queue.length && alive() && !items[i + 1]) items[i + 1] = make(i + 1); };
        u.onend = () => finish('ok');
        u.onerror = (e) => finish(e.error === 'not-allowed' ? 'blocked' : (e.error === 'interrupted' || e.error === 'canceled') ? 'stop' : o.began ? 'cut' : 'fail');
        wd = setTimeout(() => finish(o.began ? 'cut' : 'fail'), 30000 + c.t.length * 140); // garde-fou global
        this._keep.push(u); if (this._keep.length > 60) this._keep.shift(); // évite que le navigateur ne ramasse l'objet en cours de lecture
        try { speechSynthesis.resume(); } catch (e) { /* rien */ }
        speechSynthesis.speak(u);
      });
      return o;
    };
    for (let i = 0; i < queue.length; i++) {
      if (!alive()) { res.interrupted = true; return res; }
      let o = items[i] || (items[i] = make(i));
      let dog = setTimeout(() => { if (!o.began) o.fail(); }, 8000); // aucun son 8 s après son tour : la voix ne répond pas
      let st = await o.p; clearTimeout(dog);
      if (st === 'fail' && alive()) { // une seule nouvelle tentative, avec une autre voix (la voix défaillante est écartée)
        const bad = cast[queue[i].g]; if (bad) this._bad.add(bad.name);
        const alt = this.pick(queue[i].g, null, bad); if (alt) cast[queue[i].g] = alt;
        try { this._lastCancel = Date.now(); speechSynthesis.cancel(); } catch (e) { /* rien */ }
        await this._settle(); if (!alive()) { res.interrupted = true; return res; }
        o = items[i] = make(i);
        dog = setTimeout(() => { if (!o.began) o.fail(); }, 8000); st = await o.p; clearTimeout(dog);
      }
      if (st === 'blocked') { res.blocked = true; this.speaking = false; return res; }
      if (st === 'stop' || !alive()) { res.interrupted = true; return res; }
      if (st === 'ok' || st === 'cut') res.played++; else res.failed++;
    }
    if (this._token === tok) { this.speaking = false; onEnd && onEnd(); }
    return res;
  },
};

/* ---------- Audio : bip + enregistrement + transcription ---------- */
let _actx = null;
function beep(freq = 880, dur = 0.18) {
  try {
    _actx = _actx || new (window.AudioContext || window.webkitAudioContext)();
    const o = _actx.createOscillator(), g = _actx.createGain();
    o.frequency.value = freq; o.connect(g); g.connect(_actx.destination);
    g.gain.setValueAtTime(0.15, _actx.currentTime); g.gain.exponentialRampToValueAtTime(0.0001, _actx.currentTime + dur);
    o.start(); o.stop(_actx.currentTime + dur);
  } catch (e) { /* audio indisponible */ }
  return sleep(dur * 1000 + 60);
}
const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
const Mic = {
  stream: null,
  async get() {
    if (this.stream && this.stream.active) return this.stream;
    this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return this.stream;
  },
  release() { if (this.stream) { this.stream.getTracks().forEach((t) => t.stop()); this.stream = null; } },
};
class Recorder {
  constructor() { this.chunks = []; this.finals = []; this.interim = ''; this.active = false; }
  async start({ asr = true, onText } = {}) {
    this.onText = onText; this.t0 = Date.now(); this.active = true;
    try {
      const stream = await Mic.get();
      this.mr = new MediaRecorder(stream);
      this.mr.ondataavailable = (e) => e.data.size && this.chunks.push(e.data);
      this.mr.start();
    } catch (e) { this.micError = e; }
    if (asr && SR) this._startAsr();
    return !this.micError;
  }
  _startAsr() {
    try {
      const r = new SR(); this.rec = r;
      r.lang = 'en-US'; r.continuous = true; r.interimResults = true; r.maxAlternatives = 1;
      r.onresult = (ev) => {
        let interim = '';
        for (let i = ev.resultIndex; i < ev.results.length; i++) {
          const res = ev.results[i];
          if (res.isFinal) this.finals.push(res[0].transcript.trim()); else interim += res[0].transcript;
        }
        this.interim = interim.trim();
        this.onText && this.onText(this.text());
      };
      r.onerror = (e) => { this.asrError = e.error; };
      r.onend = () => { if (this.active) { try { r.start(); } catch (e) { /* déjà relancé */ } } else this._asrDone && this._asrDone(); };
      r.start();
    } catch (e) { this.asrError = String(e); }
  }
  text() { return (this.finals.join(' ') + ' ' + this.interim).replace(/\s+/g, ' ').trim(); }
  async stop() {
    this.active = false; const duration = (Date.now() - this.t0) / 1000;
    const pAsr = new Promise((res) => { this._asrDone = res; setTimeout(res, 1800); });
    try { this.rec && this.rec.stop(); } catch (e) { /* ignore */ }
    const pMr = new Promise((res) => {
      if (!this.mr || this.mr.state === 'inactive') return res();
      this.mr.onstop = () => res(); this.mr.stop();
    });
    await Promise.all([pAsr, pMr]);
    const blob = this.chunks.length ? new Blob(this.chunks, { type: this.chunks[0].type || 'audio/webm' }) : null;
    return { blob, url: blob ? URL.createObjectURL(blob) : null, transcript: this.text(), duration, asr: !!SR && !this.asrError, asrError: this.asrError, micError: this.micError };
  }
}

/* ---------- Analyse de texte ---------- */
const CONTRACTIONS = { "i'm": 'i am', "you're": 'you are', "we're": 'we are', "they're": 'they are', "it's": 'it is', "that's": 'that is', "there's": 'there is', "he's": 'he is', "she's": 'she is', "what's": 'what is', "i've": 'i have', "we've": 'we have', "you've": 'you have', "they've": 'they have', "i'll": 'i will', "we'll": 'we will', "you'll": 'you will', "it'll": 'it will', "they'll": 'they will', "i'd": 'i would', "we'd": 'we would', "you'd": 'you would', "don't": 'do not', "doesn't": 'does not', "didn't": 'did not', "can't": 'cannot', "won't": 'will not', "isn't": 'is not', "aren't": 'are not', "wasn't": 'was not', "weren't": 'were not', "haven't": 'have not', "hasn't": 'has not', "hadn't": 'had not', "shouldn't": 'should not', "wouldn't": 'would not', "couldn't": 'could not', "let's": 'let us', "here's": 'here is', "where's": 'where is', "who's": 'who is' };
const NUMS = { 0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten', 11: 'eleven', 12: 'twelve', 15: 'fifteen', 20: 'twenty', 30: 'thirty' };
function normWords(t) {
  let s = String(t).toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]+/g, ' ');
  s = s.split(/\s+/).map((w) => CONTRACTIONS[w] || (NUMS[w] ?? w)).join(' ');
  s = s.replace(/cannot/g, 'can not');
  return s.split(/\s+/).filter(Boolean).map((w) => w.replace(/'s$/, '').replace(/'/g, ''));
}
/* alignement mot à mot (LCS) : renvoie précision + diff */
function alignWords(target, said) {
  const a = normWords(target), b = normWords(said);
  const n = a.length, m = b.length; const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
  const ops = []; let i = 0, j = 0;
  while (i < n && j < m) { if (a[i] === b[j]) { ops.push(['hit', a[i]]); i++; j++; } else if (dp[i + 1][j] >= dp[i][j + 1]) { ops.push(['miss', a[i]]); i++; } else { ops.push(['extra', b[j]]); j++; } }
  while (i < n) ops.push(['miss', a[i++]]); while (j < m) ops.push(['extra', b[j++]]);
  const hits = dp[0][0]; const extra = ops.filter((o) => o[0] === 'extra').length;
  const acc = n ? Math.max(0, (hits - 0.5 * Math.max(0, extra - 1)) / n) : 0;
  return { acc, ops, hits, total: n };
}
function accToFive(acc) { if (acc >= 0.97) return 5; if (acc >= 0.88) return 4; if (acc >= 0.72) return 3; if (acc >= 0.5) return 2; if (acc > 0.15) return 1; return 0; }

/* ---------- Timer ---------- */
class Countdown {
  constructor(el, seconds, { onEnd, onTick, label = '' } = {}) {
    this.el = el; this.left = seconds; this.onEnd = onEnd; this.onTick = onTick; this.label = label; this.paused = false;
    this.render(); this.iv = setInterval(() => this.tick(), 1000); App.onLeave(() => this.stop());
  }
  tick() { if (this.paused) return; this.left--; this.render(); this.onTick && this.onTick(this.left); if (this.left <= 0) { this.stop(); this.onEnd && this.onEnd(); } }
  render() { if (!this.el) return; this.el.textContent = (this.label ? this.label + ' ' : '') + fmtTime(this.left); this.el.classList.toggle('low', this.left <= 60); }
  stop() { clearInterval(this.iv); }
}
class Stopwatch { constructor() { this.t0 = Date.now(); } get sec() { return (Date.now() - this.t0) / 1000; } }

/* ---------- Graphique en lignes (SVG) ---------- */
function lineChart(container, series, { yMin = 1, yMax = 6, target = null, height = 260, yFmt = (v) => v.toFixed(1) } = {}) {
  const all = series.flatMap((s) => s.points);
  if (all.length === 0) { container.innerHTML = '<p class="muted">Pas encore de données — fais un test blanc ou quelques exercices.</p>'; return; }
  const W = Math.max(320, container.clientWidth || 640), H = height, P = { l: 34, r: 70, t: 12, b: 26 };
  const xs = all.map((p) => p.x); let x0 = Math.min(...xs), x1 = Math.max(...xs); if (x1 === x0) { x0 -= 86400000; x1 += 86400000; }
  const X = (x) => P.l + (x - x0) / (x1 - x0) * (W - P.l - P.r);
  const Y = (y) => P.t + (1 - (y - yMin) / (yMax - yMin)) * (H - P.t - P.b);
  let svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Évolution des scores">`;
  for (let v = yMin; v <= yMax; v += 0.5) {
    const major = Number.isInteger(v);
    svg += `<line x1="${P.l}" x2="${W - P.r}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--border)" stroke-width="1" ${major ? '' : 'stroke-dasharray="2 4"'}/>`;
    if (major) svg += `<text x="${P.l - 8}" y="${Y(v) + 4}" text-anchor="end" font-size="11" fill="var(--muted)">${v}</text>`;
  }
  if (target != null) svg += `<line x1="${P.l}" x2="${W - P.r}" y1="${Y(target)}" y2="${Y(target)}" stroke="var(--text)" stroke-width="1.5" stroke-dasharray="6 4" opacity=".55"/><text x="${W - P.r + 6}" y="${Y(target) + 4}" font-size="11" fill="var(--text-2)">objectif ${target}</text>`;
  const ticks = 4; for (let i = 0; i <= ticks; i++) { const x = x0 + (x1 - x0) * i / ticks; svg += `<text x="${X(x)}" y="${H - 6}" text-anchor="middle" font-size="11" fill="var(--muted)">${fmtDate(x)}</text>`; }
  const labelsY = [];
  for (const s of series) {
    if (!s.points.length) continue;
    const pts = s.points.slice().sort((a, b) => a.x - b.x);
    const d = pts.map((p, i) => (i ? 'L' : 'M') + X(p.x).toFixed(1) + ' ' + Y(p.y).toFixed(1)).join(' ');
    svg += `<path d="${d}" fill="none" stroke="${s.color}" stroke-width="${s.bold ? 3 : 2}" stroke-linejoin="round" stroke-linecap="round"/>`;
    for (const p of pts) svg += `<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="4" fill="${s.color}" stroke="var(--surface)" stroke-width="2"/>`;
    const last = pts[pts.length - 1]; let ly = Y(last.y) + 4; while (labelsY.some((v) => Math.abs(v - ly) < 13)) ly += 13; labelsY.push(ly);
    svg += `<text x="${W - P.r + 6}" y="${ly}" font-size="11.5" fill="var(--text-2)" font-weight="${s.bold ? 700 : 500}">${esc(s.name)}</text>`;
  }
  svg += `<line class="xh" x1="0" x2="0" y1="${P.t}" y2="${H - P.b}" stroke="var(--muted)" stroke-width="1" visibility="hidden"/><rect x="${P.l}" y="${P.t}" width="${W - P.l - P.r}" height="${H - P.t - P.b}" fill="transparent" class="hit"/></svg>`;
  container.innerHTML = `<div class="chart-wrap">${svg}<div class="chart-tip"></div></div><div class="legend mt">${series.map((s) => `<span><i class="dot" style="background:${s.color}"></i>${esc(s.name)}</span>`).join('')}</div>`;
  const hit = $('.hit', container), tip = $('.chart-tip', container), xh = $('.xh', container);
  const xsU = [...new Set(all.map((p) => p.x))].sort((a, b) => a - b);
  hit.addEventListener('mousemove', (e) => {
    const r = hit.getBoundingClientRect(); const mx = e.clientX - r.left + P.l;
    let best = xsU[0]; for (const x of xsU) if (Math.abs(X(x) - mx) < Math.abs(X(best) - mx)) best = x;
    xh.setAttribute('x1', X(best)); xh.setAttribute('x2', X(best)); xh.setAttribute('visibility', 'visible');
    const rows = series.map((s) => { const p = s.points.find((q) => q.x === best); return p ? `<div><i class="dot" style="background:${s.color}"></i> ${esc(s.name)} : <b>${yFmt(p.y)}</b></div>` : ''; }).join('');
    tip.innerHTML = `<div class="muted">${fmtDate(best, { day: 'numeric', month: 'long' })}</div>${rows}`;
    tip.style.display = 'block'; tip.style.left = Math.min(X(best) + 12, W - 180) + 'px'; tip.style.top = '8px';
  });
  hit.addEventListener('mouseleave', () => { tip.style.display = 'none'; xh.setAttribute('visibility', 'hidden'); });
}

/* ---------- Routeur ---------- */
const App = {
  routes: [], _leave: [],
  route(pattern, fn) { this.routes.push([pattern, fn]); },
  onLeave(fn) { this._leave.push(fn); },
  leave() { this._leave.splice(0).forEach((f) => { try { f(); } catch (e) { console.error(e); } }); Voice.cancel(); },
  go(hash) { location.hash = hash; },
  guard: null, // fonction qui peut bloquer la navigation (test en cours)
  async render() {
    const hash = location.hash.slice(1) || '/';
    const [path, qs] = hash.split('?');
    const q = Object.fromEntries(new URLSearchParams(qs || ''));
    this.leave();
    const view = $('#view'); view.innerHTML = ''; window.scrollTo(0, 0);
    document.body.classList.toggle('in-session', /^\/(practice|mock|review)(\/|$)/.test(path)); // exercices en plein écran
    for (const [pat, fn] of this.routes) {
      const m = path.match(pat);
      if (m) {
        const top = path.split('/')[1] || 'home';
        $$('#nav a').forEach((a) => a.classList.toggle('active', a.dataset.nav === (top || 'home') || (top === '' && a.dataset.nav === 'home') || (top === 'practice' && a.dataset.nav === 'train') || (top === 'strategy' && a.dataset.nav === 'train') || ((top === 'mock' || top === 'report') && a.dataset.nav === 'mocks')));
        try { await fn(view, m.slice(1), q); } catch (e) { console.error(e); view.innerHTML = `<div class="callout bad">Erreur : ${esc(e.message)}</div>`; }
        return;
      }
    }
    view.innerHTML = '<p>Page introuvable.</p>';
  },
};
window.addEventListener('hashchange', (e) => {
  if (App.guard && !App.guard()) { history.replaceState(null, '', e.oldURL.split('#')[1] ? '#' + e.oldURL.split('#')[1] : '#/'); return; }
  App.guard = null; App.render();
});
window.addEventListener('beforeunload', (e) => { if (App.guard) { e.preventDefault(); e.returnValue = ''; } });

function applyTheme() { const t = Store.s.settings.theme; if (t === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', t); }
