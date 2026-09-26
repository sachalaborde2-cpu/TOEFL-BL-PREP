/* =========================================================
   TOEFL Prep — pages
   ========================================================= */
'use strict';

/* ---------- Planificateur personnalisé ---------- */
function plural(unit, n) { if (n < 2 || unit.includes('(')) return unit; const [w, ...rest] = unit.split(' '); return [w + 's', ...rest].join(' '); }
const Planner = {
  daysLeft() { const p = Store.s.profile; if (!p || !p.examDate) return null; return daysBetween(new Date(), parseDay(p.examDate)); },
  hasDiag() { return Store.s.mocks.some((m) => m.kind === 'diag' || m.complete); },
  phase(d = this.daysLeft()) {
    if (!this.hasDiag()) return { key: 'diag', name: 'Diagnostic', color: 'var(--muted)', desc: 'Mesurer ton niveau de départ sur les 4 sections pour personnaliser tout le plan.' };
    if (d == null || d > 35) return { key: 'found', name: 'Fondations', color: 'var(--sec-R)', desc: 'Maîtriser la méthode de chaque tâche, sans pression de temps au début. Gros volume de vocabulaire académique. Un test blanc toutes les 2 semaines.', mockEvery: 14 };
    if (d > 14) return { key: 'intens', name: 'Intensif', color: 'var(--sec-L)', desc: 'Tout se fait chronométré. 60 % du temps sur tes points faibles. Un test blanc complet par semaine.', mockEvery: 7 };
    if (d > 3) return { key: 'simu', name: 'Simulation', color: 'var(--sec-W)', desc: 'Tests blancs tous les 3-4 jours en conditions réelles, révision systématique du carnet d\'erreurs, sections chronométrées.', mockEvery: 4 };
    if (d > 0) return { key: 'final', name: 'Dernière ligne droite', color: 'var(--sec-S)', desc: 'On consolide sans s\'épuiser : erreurs, vocabulaire, échauffement oral. La veille : repos et logistique.' };
    return { key: 'exam', name: 'Jour J', color: 'var(--bad)', desc: 'Échauffement de 15 min, puis go. Tu es prêt.' };
  },
  lastFullMock() { return Store.s.mocks.filter((m) => m.complete).slice(-1)[0]; },
  mockDue() {
    const ph = this.phase(); if (!ph.mockEvery) return false;
    const last = this.lastFullMock(); if (!last) return true;
    return (Date.now() - last.ts) / 86400000 >= ph.mockEvery - 0.5;
  },
  seedRand(seed) { let x = 0; for (const c of seed) x = (x * 31 + c.charCodeAt(0)) >>> 0; return () => { x = (x * 1664525 + 1013904223) >>> 0; return x / 4294967296; }; },
  build() {
    const p = Store.s.profile; const M = (p && p.minutes) || 60; const ph = this.phase(); const d = this.daysLeft();
    const rnd = this.seedRand(todayStr());
    const blocks = [];
    if (ph.key === 'diag') {
      blocks.push({ kind: 'diag', min: 40, title: 'Test diagnostic (≈ 40 min)', why: 'Point de départ : il calibre ton plan, les difficultés proposées et ton estimation de score.' });
      blocks.push({ kind: 'guide', min: 10, title: 'Lire le guide du nouveau format', why: 'Le TOEFL a changé en janvier 2026 : 10 minutes pour connaître chaque tâche.' });
      return blocks;
    }
    if (ph.key === 'exam') return [{ kind: 'warmup', min: 15, title: 'Échauffement : 1 série Listen & Repeat + 1 question d\'entretien', why: 'Chauffer la voix et l\'oreille, sans se fatiguer.', type: 'rep', n: 1 }];
    if (d === 1) return [{ kind: 'vocab', min: 10, title: 'Vocabulaire : révisions du jour uniquement', why: 'Léger.' }, { kind: 'guide', min: 10, title: 'Checklist du jour J (guide)', why: 'Pièce d\'identité, test du matériel, horaires.' }, { kind: 'rest', min: 0, title: 'Repos', why: 'Le sommeil de la veille vaut plus qu\'une heure de révision.' }];
    let budget = M;
    if (this.mockDue() && ph.key !== 'final') {
      blocks.push({ kind: 'mock', min: 90, title: 'Test blanc complet en conditions réelles', why: `Phase ${ph.name} : un test blanc tous les ${ph.mockEvery} jours pour mesurer tes progrès.` });
      budget -= 90;
    }
    const vocabDue = Vocab.dueCount();
    blocks.push({ kind: 'vocab', min: 10, title: `Vocabulaire académique · ${vocabDue} carte(s) à revoir + nouvelles`, why: 'Complete the Words et le Reading reposent sur le vocabulaire académique : c\'est le levier n°1 pour atteindre C1.' });
    budget -= 10;
    const errN = Store.s.errors.filter((e) => !e.mastered).length;
    if (errN >= 5 && budget > 10) { blocks.push({ kind: 'review', min: 10, title: `Carnet d'erreurs · ${errN} à retravailler`, why: 'Refaire ses erreurs est la méthode la plus rentable : elles ne sont validées qu\'après 2 réussites.' }); budget -= 10; }
    if (budget < 10) return blocks;
    // priorité de chaque type : écart à l'objectif × fraîcheur × aléa du jour
    const tgt = Estimator.targetBand();
    const now = Date.now();
    const scores = Object.keys(TYPES).map((t) => {
      const st = Estimator.typeStats(t); const secB = Estimator.section(TYPES[t].sec);
      const gap = Math.max(0.3, tgt - (st.band ?? secB ?? 4));
      const last = Math.max(0, ...Store.s.attempts.filter((a) => a.type === t).map((a) => a.ts));
      const stale = last ? Math.min(3, (now - last) / 86400000 / 2) : 3;
      const weakBonus = (p && p.weak && p.weak.includes(TYPES[t].sec)) ? 1.3 : 1;
      return { t, pr: gap * (1 + stale) * weakBonus * (0.8 + rnd() * 0.4) };
    }).sort((a, b) => b.pr - a.pr);
    const chosen = []; const secCount = {};
    for (const s of scores) {
      if (budget < 5) break;
      const sec = TYPES[s.t].sec; if ((secCount[sec] || 0) >= 1 && chosen.length < 3) continue;
      const tm = TYPES[s.t].min;
      let n = Math.max(1, Math.round(Math.min(budget, ph.key === 'final' ? 12 : 22) / tm));
      if (['email', 'disc', 'int', 'ap', 'talk'].includes(s.t)) n = Math.min(n, 2);
      if (s.t === 'ctw') n = Math.min(n, 5); if (s.t === 'lcr') n = Math.min(Math.max(n, 8), 16); if (s.t === 'bas') n = Math.min(Math.max(n, 8), 15);
      const min = Math.round(n * tm);
      chosen.push({ kind: 'practice', type: s.t, n, min, title: `${TYPES[s.t].name} · ${n} ${plural(TYPES[s.t].unit, n)}`, why: this.why(s.t) });
      secCount[sec] = (secCount[sec] || 0) + 1; budget -= min;
      if (chosen.length >= 4) break;
    }
    return blocks.concat(chosen);
  },
  why(t) {
    const st = Estimator.typeStats(t); const tgt = Estimator.targetBand();
    if (st.count === 0) return 'Jamais travaillé : découvre la tâche (lis la méthode d\'abord).';
    if (st.band < tgt - 1) return `Priorité : estimé ${fmtBand(st.band)} vs objectif ${tgt}. C'est là que tu gagnes le plus de points.`;
    if (st.band < tgt) return `Presque au niveau (${fmtBand(st.band)}) : on consolide pour sécuriser la bande ${tgt}.`;
    return `Au niveau (${fmtBand(st.band)}) : entretien pour ne pas perdre la main.`;
  },
  today() {
    const key = todayStr(); Store.s.plans = Store.s.plans || {};
    const stale = Store.s.plans[key] && Store.s.plans[key].some((b) => b.kind === 'diag') && this.hasDiag();
    if (!Store.s.plans[key] || stale) { Store.s.plans[key] = this.build(); Store.save(); }
    return Store.s.plans[key];
  },
  regen() { Store.s.plans = Store.s.plans || {}; Store.s.plans[todayStr()] = this.build(); Store.save(); },
  isDone(b) {
    const start = parseDay(todayStr()).getTime();
    const today = Store.s.attempts.filter((a) => a.ts >= start);
    if (b.kind === 'practice' || b.kind === 'warmup') return today.filter((a) => a.type === b.type && a.mode !== 'mock').length >= b.n;
    if (b.kind === 'mock') return Store.s.mocks.some((m) => m.ts >= start && m.complete);
    if (b.kind === 'diag') return Store.s.mocks.some((m) => m.kind === 'diag');
    if (b.kind === 'vocab') return (Store.s.vocabLog || {})[todayStr()] >= 15 || (Vocab.dueCount() === 0 && ((Store.s.vocabLog || {})[todayStr()] || 0) > 0);
    if (b.kind === 'review') return today.filter((a) => a.mode === 'review').length >= 3;
    if (b.kind === 'guide') return !!(Store.s.flags || {}).guideRead;
    return false;
  },
  href(b) {
    return { practice: `#/practice/${b.type}?n=${b.n}`, warmup: `#/practice/${b.type}?n=1`, mock: '#/mock/next', diag: '#/mock/diag', vocab: '#/vocab/study', review: '#/review', guide: '#/guide', rest: '#/guide' }[b.kind];
  },
};

/* ---------- Vocabulaire (répétition espacée, boîtes de Leitner) ---------- */
const INTERVALS = [0, 1, 2, 4, 8, 16, 35];
const Vocab = {
  list() { return CONTENT.vocab || []; },
  card(w) { return Store.s.vocab[w]; },
  dueCount() { const now = Date.now(); return Object.values(Store.s.vocab).filter((c) => c.due <= now && c.box < 6).length; },
  learnedCount() { return Object.values(Store.s.vocab).filter((c) => c.box >= 3).length; },
  queue(newPerDay = 12) {
    const now = Date.now();
    const due = this.list().filter((v) => { const c = this.card(v.w); return c && c.due <= now && c.box < 6; });
    const introducedToday = Object.values(Store.s.vocab).filter((c) => c.intro === todayStr()).length;
    const fresh = this.list().filter((v) => !this.card(v.w)).slice(0, Math.max(0, newPerDay - introducedToday));
    return shuffle(due).concat(fresh);
  },
  grade(w, g) { // g: 0 raté, 1 hésitant, 2 su
    const c = Store.s.vocab[w] || { box: 0, right: 0, wrong: 0, intro: todayStr() };
    if (g === 0) { c.box = 0; c.wrong++; c.due = Date.now() + 5 * 60000; }
    else if (g === 1) { c.box = Math.max(1, c.box); c.due = Date.now() + 86400000; }
    else { c.box = Math.min(6, c.box + 1); c.right++; c.due = Date.now() + INTERVALS[c.box] * 86400000; }
    Store.s.vocab[w] = c;
    Store.s.vocabLog = Store.s.vocabLog || {}; Store.s.vocabLog[todayStr()] = (Store.s.vocabLog[todayStr()] || 0) + 1;
    Store.save();
  },
};

/* ---------- Instantanés quotidiens pour le suivi ---------- */
function snapshot() {
  const o = Estimator.overall(); if (!o) return;
  Store.s.snapshots = Store.s.snapshots || {};
  const secs = {}; ['R', 'L', 'W', 'S'].forEach((s, i) => { if (o.sections[i] != null) secs[s] = Math.round(o.sections[i] * 100) / 100; });
  const prev = Store.s.snapshots[todayStr()];
  const next = { ...secs, total: o.partial ? null : Math.round(o.cont * 100) / 100 };
  if (JSON.stringify(prev) !== JSON.stringify(next)) { Store.s.snapshots[todayStr()] = next; Store.save(); }
}

/* =========================================================
   ONBOARDING
   ========================================================= */
function pageOnboarding(view) {
  const def = new Date(Date.now() + 56 * 86400000);
  const st = { target120: 105, minutes: 60, days: 6, weak: [], self: { R: 'B2', L: 'B2', W: 'B2', S: 'B2' } };
  view.innerHTML = `<div style="max-width:760px;margin:0 auto">
    <h1>Bienvenue 👋 Construisons ta préparation</h1>
    <p class="t2">2 minutes de réglages pour un plan 100 % personnalisé. Tout reste modifiable ensuite dans Réglages.</p>
    <div class="card">
      <label class="field"><span>Ton prénom</span><input type="text" id="ob-name" placeholder="Prénom"></label>
      <label class="field"><span>Date de ton TOEFL</span><input type="date" id="ob-date" value="${todayStr(def)}"><small>Pas encore inscrit ? Laisse une date estimée (8 semaines par défaut) : le plan s'adapte.</small></label>
      <div class="field"><span>Ton objectif (échelle 0-120 équivalente)</span>
        <div class="choice-grid" id="ob-target">${[[100, '100', 'bande 5.0 · C1'], [105, '105', 'bande 5.0 → viser 5.5'], [110, '110', 'bande 5.5 · C1+'], [114, '114+', 'bande 6 · C2']].map(([v, l, s]) => `<button class="choice ${v === 105 ? 'on' : ''}" data-v="${v}"><b>${l}</b><br><small class="muted">${s}</small></button>`).join('')}</div>
        <small class="muted">Nouvelle échelle ETS : 5.0 ⇔ 95-106 · 5.5 ⇔ 107-113. Pour sécuriser 100-110, l'appli te fait viser <b>5.5 dans chaque section</b>.</small></div>
      <div class="field"><span>Temps disponible par jour</span><div class="choice-grid" id="ob-min">${[30, 45, 60, 90, 120].map((m) => `<button class="choice ${m === 60 ? 'on' : ''}" data-v="${m}">${m} min</button>`).join('')}</div></div>
      <div class="field"><span>Comment évalues-tu ton niveau actuel ?</span>
        <div class="table-wrap"><table class="tbl">${['R', 'L', 'W', 'S'].map((s) => `<tr><td><i class="dot ${s}"></i> ${SECTIONS[s].name}</td><td>${['B1', 'B2', 'C1'].map((l) => `<button class="btn sm self ${l === 'B2' ? 'primary' : ''}" data-s="${s}" data-l="${l}">${l}</button>`).join(' ')}</td></tr>`).join('')}</table></div></div>
      <div class="field"><span>Sections où tu te sens le moins à l'aise (plusieurs choix)</span><div class="choice-grid" id="ob-weak">${['R', 'L', 'W', 'S'].map((s) => `<button class="choice" data-v="${s}"><i class="dot ${s}"></i> ${SECTIONS[s].name}</button>`).join('')}</div></div>
      <div class="row mt"><span class="spacer"></span><button class="btn primary lg" id="ob-go">Créer mon plan →</button></div>
    </div></div>`;
  const single = (id, key) => $$(`#${id} .choice`, view).forEach((b) => b.onclick = () => { $$(`#${id} .choice`, view).forEach((x) => x.classList.remove('on')); b.classList.add('on'); st[key] = +b.dataset.v; });
  single('ob-target', 'target120'); single('ob-min', 'minutes');
  $$('#ob-weak .choice', view).forEach((b) => b.onclick = () => { b.classList.toggle('on'); st.weak = $$('#ob-weak .choice.on', view).map((x) => x.dataset.v); });
  $$('.self', view).forEach((b) => b.onclick = () => { $$(`.self[data-s="${b.dataset.s}"]`, view).forEach((x) => x.classList.remove('primary')); b.classList.add('primary'); st.self[b.dataset.s] = b.dataset.l; });
  $('#ob-go', view).onclick = () => {
    Store.s.profile = { name: $('#ob-name', view).value.trim(), examDate: $('#ob-date', view).value, target120: st.target120, targetBand: st.target120 >= 114 ? 6 : 5.5, minutes: st.minutes, weak: st.weak, self: st.self, createdAt: Date.now() };
    Store.save(); location.hash = '#/'; App.render();
  };
}

/* =========================================================
   TABLEAU DE BORD
   ========================================================= */
function pageHome(view) {
  const p = Store.s.profile; if (!p) return pageOnboarding(view);
  snapshot();
  const d = Planner.daysLeft(); const ph = Planner.phase(); const o = Estimator.overall(); const tgt = Estimator.targetBand();
  const blocks = Planner.today();
  const streak = (() => { let n = 0; for (let i = 0; i < 400; i++) { const k = todayStr(new Date(Date.now() - i * 86400000)); if ((Store.s.activity[k] || 0) > 0) n++; else if (i > 0) break; } return n; })();
  const week = sum(Array.from({ length: 7 }, (_, i) => Store.s.activity[todayStr(new Date(Date.now() - i * 86400000))] || 0));
  const hello = p.name ? `Bonjour ${esc(p.name)}` : 'Bonjour';
  view.innerHTML = `
    <div class="row between mb"><div><h1 style="margin:0">${hello} 👋</h1><div class="t2">${d != null ? (d > 0 ? `<b>J-${d}</b> avant ton TOEFL (${fmtDate(parseDay(p.examDate).getTime(), { day: 'numeric', month: 'long' })})` : d === 0 ? '<b>C\'est aujourd\'hui !</b>' : 'Date du test passée — mets-la à jour dans Réglages') : ''} · Phase <b style="color:${ph.color}">${ph.name}</b></div></div>
      <div class="row"><span class="pill">🔥 ${streak} jour${streak > 1 ? 's' : ''} d'affilée</span><span class="pill">⏱ ${Math.round(week)} min cette semaine</span></div></div>
    <div class="grid g3">
      <div class="card" style="grid-column: span 1">
        <div class="kpi"><span class="label">Score estimé ${o && o.partial ? '(partiel)' : ''}</span>
        <div class="score-big"><span class="hero-num">${o ? fmtBand(o.band) : '—'}</span><span class="cefr">${o ? bandCefr(o.band) : '?'}</span></div>
        <span class="sub">${o ? `≈ ${bandTo120(o.cont)}/120 · objectif ${p.target120}/120 (bande ${tgt})` : 'Fais le diagnostic pour obtenir une estimation.'}</span></div>
        ${o ? `<div class="bar mt"><span style="width:${((o.cont - 1) / 5) * 100}%"></span><i class="target" style="left:${((tgt - 1) / 5) * 100}%"></i></div><div class="small muted mt">${o.cont >= tgt ? '🎯 Objectif atteint en estimation : on sécurise !' : `Il te manque ≈ ${(tgt - o.cont).toFixed(1)} bande en moyenne.`}</div>` : `<a class="btn primary mt" href="#/mock/diag">Lancer le diagnostic →</a>`}
      </div>
      <div class="card" style="grid-column: span 2"><div class="grid g4">${['R', 'L', 'W', 'S'].map((s) => {
        const b = Estimator.section(s);
        return `<div class="kpi"><span class="label"><i class="dot ${s}"></i> ${SECTIONS[s].name}</span><span class="value">${fmtBand(b)}</span><span class="sub">${b != null ? bandCefr(b) + (b >= tgt ? ' · ✓' : ` · −${(tgt - b).toFixed(1)}`) : 'pas de données'}</span><div class="bar mt"><span style="width:${b ? ((b - 1) / 5) * 100 : 0}%;background:${SECTIONS[s].color}"></span><i class="target" style="left:${((tgt - 1) / 5) * 100}%"></i></div></div>`;
      }).join('')}</div><p class="small muted mt" style="margin-bottom:0">Estimation = 60 % dernier test blanc + 40 % entraînement récent (pondéré par la difficulté). Trait noir = objectif ${tgt}.</p></div>
    </div>
    <div class="grid g3 mt">
      <div class="card" style="grid-column: span 2">
        <div class="row between"><h2 style="margin:0">Aujourd'hui</h2><span class="small muted">${blocks.reduce((s, b) => s + b.min, 0)} min prévues · <a href="#" id="regen">régénérer</a></span></div>
        <p class="small t2">${ph.desc}</p>
        <div class="blocks"></div>
      </div>
      <div class="card">
        <h3>Raccourcis</h3>
        <div class="stack">
          <a class="btn" style="width:100%" href="#/mocks">⏱ Tests blancs</a>
          <a class="btn" style="width:100%" href="#/vocab/study">Aa Réviser le vocabulaire (${Vocab.dueCount()})</a>
          <a class="btn" style="width:100%" href="#/errors">! Carnet d'erreurs (${Store.s.errors.filter((e) => !e.mastered).length})</a>
          <a class="btn" style="width:100%" href="#/guide">? Guide du format 2026</a>
        </div>
        <hr><h3>Ton point faible n°1</h3><div class="weak small"></div>
      </div>
    </div>`;
  const bEl = $('.blocks', view);
  blocks.forEach((b) => {
    const done = Planner.isDone(b);
    const el = h(`<div class="plan-block ${done ? 'done' : ''}"><div class="check">${done ? '✓' : ''}</div><div class="pb-body"><div class="pb-title">${b.type ? `<i class="dot ${TYPES[b.type].sec}"></i> ` : ''}${esc(b.title)}</div><div class="pb-why">${esc(b.why)}</div></div><span class="small muted">${b.min ? b.min + ' min' : ''}</span>${b.kind !== 'rest' ? `<a class="btn ${done ? '' : 'primary'} sm" href="${Planner.href(b)}">${done ? 'Refaire' : 'Go'}</a>` : ''}</div>`);
    bEl.appendChild(el);
  });
  $('#regen', view).onclick = (e) => { e.preventDefault(); Planner.regen(); App.render(); };
  const weakest = Object.keys(TYPES).map((t) => ({ t, ...Estimator.typeStats(t) })).filter((x) => x.band != null).sort((a, b) => a.band - b.band)[0];
  $('.weak', view).innerHTML = weakest ? `<p><b>${TYPES[weakest.t].name}</b> — estimé ${fmtBand(weakest.band)} (${pct(weakest.acc)}).</p><div class="row"><a class="btn sm" href="#/strategy/${weakest.t}">Méthode</a><a class="btn sm primary" href="#/practice/${weakest.t}?n=3">S'entraîner</a></div>` : '<p class="muted">Pas encore assez de données.</p>';
}

/* =========================================================
   PLAN
   ========================================================= */
function pagePlan(view) {
  const p = Store.s.profile; if (!p) return pageOnboarding(view);
  const d = Planner.daysLeft(); const ph = Planner.phase();
  const phases = [
    ['diag', 'Diagnostic', 'Jour 1', 'Test court (40 min) sur les 4 sections → calibre tout le reste.'],
    ['found', 'Fondations', '> J-35', 'Méthode de chaque tâche, vocabulaire académique intensif (12 mots/jour), gammes de grammaire (Build a Sentence), shadowing quotidien. Test blanc toutes les 2 semaines.'],
    ['intens', 'Intensif', 'J-35 → J-15', 'Tout en temps limité. 60 % du temps sur tes 2 tâches les plus faibles. Un test blanc complet par semaine + analyse.'],
    ['simu', 'Simulation', 'J-14 → J-4', 'Test blanc tous les 3-4 jours, sections en conditions réelles, carnet d\'erreurs vidé chaque jour.'],
    ['final', 'Dernière ligne droite', 'J-3 → J-1', 'Léger : erreurs, vocabulaire, échauffement oral. Veille = repos + logistique.'],
  ];
  // calendrier
  const start = new Date(); start.setDate(start.getDate() - ((start.getDay() + 6) % 7));
  const end = p.examDate ? parseDay(p.examDate) : new Date(Date.now() + 56 * 86400000);
  const lastMock = Planner.lastFullMock();
  let nextMock = lastMock ? lastMock.ts : Date.now();
  const mockDays = new Set();
  for (let t = Date.now(); t <= end.getTime(); t += 86400000) {
    const ph2 = Planner.phase(daysBetween(new Date(t), end));
    if (ph2.mockEvery && (t - nextMock) / 86400000 >= ph2.mockEvery - 0.5) { mockDays.add(todayStr(new Date(t))); nextMock = t; }
  }
  if (Planner.mockDue()) mockDays.add(todayStr());
  let cal = '';
  for (let t = start.getTime(); t <= end.getTime() + 86400000 * ((7 - ((end.getDay() + 6) % 7)) % 7); t += 86400000) {
    const k = todayStr(new Date(t)); const isExam = p.examDate === k; const past = k < todayStr();
    const dl = daysBetween(new Date(t), end); const ph2 = Planner.phase(dl);
    cal += `<div class="d ${k === todayStr() ? 'today' : ''} ${isExam ? 'exam' : ''} ${mockDays.has(k) && !past ? 'mock' : ''} ${past ? 'past' : ''} ${(Store.s.activity[k] || 0) > 0 ? 'act' : ''}" title="${k}"><b>${new Date(t).getDate()}</b>${isExam ? '<br>TOEFL' : mockDays.has(k) && !past ? '<br>Test blanc' : ''}<br><span style="color:${isExam ? '#fff' : ph2.color}">●</span></div>`;
  }
  view.innerHTML = `<h1>Mon plan</h1>
    <p class="t2">Plan recalculé chaque jour à partir de ton niveau estimé, de l'écart à l'objectif (bande ${Estimator.targetBand()}), du temps restant (${d != null ? 'J-' + d : '—'}) et de ce que tu n'as pas travaillé récemment.</p>
    <div class="card"><h2>Les 5 phases</h2>${phases.map(([k, n, w, t]) => `<div class="plan-block ${k === ph.key ? '' : 'done'}" style="${k === ph.key ? 'border-color:var(--primary)' : ''}"><div class="check" style="${k === ph.key ? 'background:var(--primary);border-color:var(--primary);color:#fff' : ''}">${k === ph.key ? '▶' : ''}</div><div class="pb-body"><div class="pb-title">${n} <span class="muted small">${w}</span></div><div class="pb-why">${t}</div></div></div>`).join('')}</div>
    <div class="card"><div class="row between"><h2 style="margin:0">Calendrier jusqu'au test</h2><span class="legend"><span><i class="dot" style="background:color-mix(in srgb, var(--primary) 40%, transparent)"></i>test blanc prévu</span><span><i class="dot" style="background:var(--good)"></i>jour travaillé</span><span><i class="dot" style="background:var(--bad)"></i>TOEFL</span></span></div>
      <div class="cal mt">${['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map((x) => `<div class="small muted center">${x}</div>`).join('')}${cal}</div></div>
    <div class="card"><h2>Les règles du plan</h2><ul class="fb-list">
      <li><b>Tous les jours :</b> 10 min de vocabulaire (répétition espacée) — c'est le socle de Complete the Words et du Reading C1.</li>
      <li><b>Priorité aux écarts :</b> chaque tâche reçoit un poids = (objectif − niveau estimé) × (jours sans pratique). Tu travailles donc surtout ce qui rapporte le plus de points.</li>
      <li><b>Difficulté adaptative :</b> les exercices proposés montent en difficulté (B1 → B2 → C1) quand ta réussite dépasse 55 % puis 80 %.</li>
      <li><b>Carnet d'erreurs :</b> chaque erreur revient jusqu'à ce que tu la réussisses 2 fois de suite.</li>
      <li><b>Tests blancs :</b> adaptatifs comme le vrai test (module 2 plus dur si tu réussis le module 1), audio unique, chronos stricts.</li>
      <li><b>Oral tous les 2 jours minimum :</b> le Speaking (Listen & Repeat) récompense la régularité — fais aussi 10 min de <i>shadowing</i> sur un podcast.</li></ul>
      <p class="small muted">Temps quotidien : ${p.minutes} min (modifiable dans Réglages).</p></div>`;
}

/* =========================================================
   ENTRAÎNEMENT
   ========================================================= */
function pageTrain(view) {
  view.innerHTML = `<h1>Entraînement</h1><p class="t2">Les 12 tâches du TOEFL iBT 2026. Chaque exercice est corrigé et expliqué ; la difficulté s'adapte à ton niveau. Commence par « Méthode » si tu découvres une tâche.</p>
    ${['R', 'L', 'W', 'S'].map((s) => `<h2 class="mt2"><i class="dot ${s}"></i> ${SECTIONS[s].name} <span class="muted small">· ${SECTIONS[s].fr} · estimé ${fmtBand(Estimator.section(s))}</span></h2>
    <div class="grid g3">${SEC_TYPES[s].map((t) => {
      const st = Estimator.typeStats(t); const total = Content.all(t).length;
      const opts = { ctw: [1, 3, 5], dl: [2, 4, 6], ap: [1, 2, 3], lcr: [8, 16, 24], conv: [2, 4, 6], ann: [2, 3, 4], talk: [1, 2, 3], bas: [5, 10, 15], email: [1], disc: [1], rep: [1, 2], int: [1] }[t];
      return `<div class="card task-card"><div class="row between"><b>${TYPES[t].name}</b>${st.band != null ? `<span class="pill ${s}">${fmtBand(st.band)}</span>` : ''}</div>
        <div class="meta">${TYPES[t].fr} · ${st.count} fait(s) · ${Content.unseenCount(t)}/${total} inédits${st.acc != null ? ' · réussite ' + pct(st.acc) : ''}</div>
        <div class="row"><a class="btn sm" href="#/strategy/${t}">Méthode</a>${opts.map((n) => `<a class="btn sm primary" href="#/practice/${t}?n=${n}">${n} ${n > 1 ? '' : ''}${TYPES[t].unit.split(' ')[0]}${n > 1 && !TYPES[t].unit.includes('(') ? 's' : ''}</a>`).join('')}</div></div>`;
    }).join('')}</div>`).join('')}`;
}
function pagePractice(view, [type], q) {
  if (!TYPES[type]) return (view.innerHTML = 'Type inconnu');
  const n = clamp(parseInt(q.n || '3', 10), 1, 30);
  const items = Content.pick(type, n);
  if (!items.length) return (view.innerHTML = '<div class="callout">Pas de contenu disponible pour cette tâche.</div>');
  if (!Store.s.strategySeen || !Store.s.strategySeen[type]) {
    Store.s.strategySeen = Store.s.strategySeen || {}; Store.s.strategySeen[type] = true; Store.save();
    view.innerHTML = `<div class="card" style="max-width:760px;margin:0 auto"><div class="callout">Première fois sur <b>${TYPES[type].name}</b> : voici la méthode en 1 minute.</div><div class="strategy mt">${strategyHtml(type)}</div><div class="row mt"><span class="spacer"></span><button class="btn primary lg">C'est parti →</button></div></div>`;
    $('button.primary', view).onclick = () => runPractice(view, type, items);
    return;
  }
  runPractice(view, type, items);
}
function strategyHtml(type) {
  const g = (CONTENT.guide && CONTENT.guide.strategies && CONTENT.guide.strategies[type]) || null;
  if (!g) return '<p class="muted">Méthode à venir.</p>';
  return `<p class="t2">${g.what}</p>
    <div class="grid g2"><div><h3>Format officiel</h3><ul>${g.format.map((x) => `<li>${x}</li>`).join('')}</ul></div><div><h3>Ce qui est évalué / niveau C1</h3><ul>${g.c1.map((x) => `<li>${x}</li>`).join('')}</ul></div></div>
    <h3>Méthode pas à pas</h3><ol>${g.method.map((x) => `<li>${x}</li>`).join('')}</ol>
    <h3>Pièges (surtout pour un francophone)</h3><ul>${g.traps.map((x) => `<li>${x}</li>`).join('')}</ul>
    ${g.tools ? `<h3>Boîte à outils</h3>${g.tools}` : ''}`;
}
function pageStrategy(view, [type]) {
  const t = TYPES[type]; if (!t) return;
  view.innerHTML = `<a href="#/train" class="small">← Entraînement</a><div class="card mt strategy"><div class="row between"><h1 style="margin:0"><i class="dot ${t.sec}"></i> ${t.name}</h1><a class="btn primary" href="#/practice/${type}?n=${{ email: 1, disc: 1, int: 1, rep: 1, lcr: 8, bas: 10 }[type] || 3}">S'entraîner →</a></div><div class="mt">${strategyHtml(type)}</div></div>`;
}

/* =========================================================
   TESTS BLANCS
   ========================================================= */
function pageMocks(view) {
  const fixed = (CONTENT.mocks || []).filter((m) => m.id !== 'diag');
  const done = new Set(Store.s.mocks.map((m) => m.mockId));
  const hist = Store.s.mocks.slice().reverse();
  view.innerHTML = `<h1>Tests blancs</h1><p class="t2">Reproduction fidèle du TOEFL iBT 2026 : Reading et Listening adaptatifs en 2 modules, audio unique, chronos stricts, Writing et Speaking notés sur l'échelle officielle 0-5 puis convertis en bandes 1-6 et en équivalent /120.</p>
    <div class="grid g3">
      <div class="card task-card"><b>Diagnostic</b><div class="meta">≈ 40 min · version courte des 4 sections</div><p class="small">À faire en premier : il calibre ton plan.</p><a class="btn ${done.has('diag') ? '' : 'primary'}" href="#/mock/diag">${done.has('diag') ? 'Refaire' : 'Commencer'}</a></div>
      ${fixed.map((m) => `<div class="card task-card"><b>${esc(m.name)}</b><div class="meta">≈ 90 min · complet · ${done.has(m.id) ? '✓ fait' : 'inédit'}</div><p class="small">${esc(m.desc || '')}</p><a class="btn ${done.has(m.id) ? '' : 'primary'}" href="#/mock/${m.id}">${done.has(m.id) ? 'Refaire' : 'Commencer'}</a></div>`).join('')}
      <div class="card task-card"><b>Test blanc aléatoire</b><div class="meta">≈ 90 min · complet · items inédits en priorité</div><p class="small">Généré à partir de la banque d'exercices.</p><a class="btn" href="#/mock/random">Commencer</a></div>
    </div>
    <h2 class="mt2">Une section en conditions réelles</h2><div class="grid g4">${['R', 'L', 'W', 'S'].map((s) => `<a class="card task-card" href="#/mock/random?sec=${s}" style="color:inherit"><b><i class="dot ${s}"></i> ${SECTIONS[s].name}</b><span class="meta">${{ R: '≈ 29 min · adaptatif', L: '≈ 28 min · adaptatif', W: '≈ 23 min', S: '≈ 8 min' }[s]}</span></a>`).join('')}</div>
    <h2 class="mt2">Historique</h2>
    ${hist.length ? `<div class="card table-wrap"><table class="tbl"><tr><th>Date</th><th>Test</th><th>R</th><th>L</th><th>W</th><th>S</th><th>Total</th><th>/120</th><th></th></tr>${hist.map((m) => `<tr><td>${fmtDate(m.ts)}</td><td>${esc(m.title)}</td>${['R', 'L', 'W', 'S'].map((s) => `<td>${m.sections[s] ? fmtBand(m.sections[s].band) : '—'}</td>`).join('')}<td><b>${m.secOnly ? '—' : fmtBand(m.total)}</b></td><td>${m.secOnly ? '—' : m.total120 ?? '—'}</td><td><a href="#/report/${m.id}">Rapport</a></td></tr>`).join('')}</table></div>` : '<p class="muted">Aucun test passé pour l\'instant.</p>'}`;
}
function pageMockRun(view, [kind], q) {
  if (kind === 'next') { const f = (CONTENT.mocks || []).filter((m) => m.id !== 'diag'); const done = new Set(Store.s.mocks.map((m) => m.mockId)); const nx = f.find((m) => !done.has(m.id)); kind = nx ? nx.id : 'random'; }
  runMock(view, kind, { secOnly: q.sec || null });
}
function pageReport(view, [id]) {
  const m = Store.s.mocks.find((x) => x.id === id); if (!m) return (view.innerHTML = 'Rapport introuvable');
  if (!m.sections || !Object.keys(m.sections).length || (m.secOnly && !m.sections[m.secOnly])) return (view.innerHTML = '<div class="callout warn">Ce test ne contient aucun résultat exploitable (test interrompu ?). <a href="#/mocks">Retour aux tests blancs</a></div>');
  const tgt = Estimator.targetBand();
  const secs = ['R', 'L', 'W', 'S'].filter((s) => m.sections[s]);
  const weakTypes = secs.flatMap((s) => Object.entries(m.sections[s].byType).map(([t, v]) => ({ t, ...v }))).sort((a, b) => a.pct - b.pct).slice(0, 3);
  view.innerHTML = `<a href="#/mocks" class="small">← Tests blancs</a>
    <h1 class="mt">${esc(m.title)} <span class="muted small">· ${fmtDate(m.ts, { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })} · ${m.minutes} min</span></h1>
    <div class="grid g3">
      <div class="card">${m.secOnly ? `<div class="kpi"><span class="label">${SECTIONS[m.secOnly].name}</span><span class="hero-num">${fmtBand(m.sections[m.secOnly].band)}</span><span class="sub">${bandCefr(m.sections[m.secOnly].band)}</span></div>` : `<div class="kpi"><span class="label">Score global (bande)</span><div class="score-big"><span class="hero-num">${fmtBand(m.total)}</span><span class="cefr">${bandCefr(m.total)}</span></div><span class="sub">≈ <b>${m.total120}/120</b> · objectif ${Store.s.profile ? Store.s.profile.target120 : 105}</span></div>`}
        <p class="small muted mt">Calcul ETS : moyenne des 4 sections arrondie à la demi-bande. Équivalence /120 : table officielle ETS (interpolée).</p></div>
      <div class="card" style="grid-column: span 2"><div class="grid g4">${secs.map((s) => { const x = m.sections[s]; return `<div class="kpi"><span class="label"><i class="dot ${s}"></i> ${SECTIONS[s].name}</span><span class="value">${fmtBand(x.band)}</span><span class="sub">${pct(x.pct)} des points${x.route ? ` · module 2 ${x.route === 'upper' ? 'difficile ✓' : 'facile (plafond 4.5)'}` : ''}</span><div class="bar mt"><span style="width:${((x.bandCont - 1) / 5) * 100}%;background:${SECTIONS[s].color}"></span><i class="target" style="left:${((tgt - 1) / 5) * 100}%"></i></div></div>`; }).join('')}</div></div>
    </div>
    <div class="card"><h2>Détail par tâche</h2><div class="table-wrap"><table class="tbl"><tr><th>Tâche</th><th>Réussite</th><th>Points</th><th>Bande équivalente</th><th></th></tr>
      ${secs.flatMap((s) => Object.entries(m.sections[s].byType).map(([t, v]) => `<tr><td><i class="dot ${s}"></i> ${TYPES[t].name}</td><td>${pct(v.pct)}</td><td>${Math.round(v.pct * v.n * 10) / 10}/${v.n}</td><td>${fmtBand(pctToBand(v.pct))}</td><td><a href="#/practice/${t}?n=3">S'entraîner</a></td></tr>`)).join('')}</table></div></div>
    <div class="card"><h2>Tes 3 priorités</h2><ol>${weakTypes.map((w) => `<li><b>${TYPES[w.t].name}</b> (${pct(w.pct)}) — <a href="#/strategy/${w.t}">revoir la méthode</a> puis <a href="#/practice/${w.t}?n=3">3 exercices</a>.</li>`).join('')}</ol>
      <p class="small t2">Toutes tes erreurs de ce test ont été ajoutées au <a href="#/errors">carnet d'erreurs</a>. Refais-les dans les 48 h : c'est là que se fait la progression.</p>
      ${m.secOnly ? '' : (m.total >= tgt ? '<div class="callout good">🎯 Objectif atteint sur ce test. Continue à sécuriser : le jour J, le stress coûte souvent 0.5 bande.</div>' : `<div class="callout warn">Écart à l'objectif : ${(tgt - m.totalCont).toFixed(2)} bande. Concentre 60 % de ton temps sur les priorités ci-dessus.</div>`)}</div>`;
}

/* =========================================================
   VOCABULAIRE
   ========================================================= */
function pageVocab(view, [sub]) {
  if (sub === 'study') return vocabStudy(view);
  if (sub === 'spell') return vocabSpell(view);
  const list = Vocab.list(); const themes = [...new Set(list.map((v) => v.th))];
  const boxCounts = [0, 0, 0, 0, 0, 0, 0]; Object.values(Store.s.vocab).forEach((c) => boxCounts[c.box]++);
  view.innerHTML = `<h1>Vocabulaire académique</h1><p class="t2">${list.length} mots et expressions de niveau B2-C1 choisis pour le TOEFL (Academic Word List + économie/finance + connecteurs), avec répétition espacée : chaque mot revient juste avant que tu l'oublies.</p>
    <div class="grid g4"><div class="card kpi"><span class="label">À réviser aujourd'hui</span><span class="value">${Vocab.dueCount()}</span></div><div class="card kpi"><span class="label">Vus</span><span class="value">${Object.keys(Store.s.vocab).length}</span><span class="sub">sur ${list.length}</span></div><div class="card kpi"><span class="label">Maîtrisés</span><span class="value">${Vocab.learnedCount()}</span><span class="sub">boîte ≥ 3</span></div><div class="card kpi"><span class="label">Aujourd'hui</span><span class="value">${(Store.s.vocabLog || {})[todayStr()] || 0}</span><span class="sub">cartes revues</span></div></div>
    <div class="row mt"><a class="btn primary lg" href="#/vocab/study">Réviser (cartes)</a><a class="btn lg" href="#/vocab/spell">Mode « Complete the Words » (orthographe)</a></div>
    <div class="card mt"><h3>Répartition par boîte</h3><div class="row">${boxCounts.map((c, i) => `<span class="pill">Boîte ${i} : ${c}</span>`).join('')}</div></div>
    <h2 class="mt2">Liste</h2><div class="row mb">${themes.map((t) => `<button class="btn sm th" data-t="${esc(t)}">${esc(t)}</button>`).join('')}<button class="btn sm th primary" data-t="">Tous</button></div>
    <div class="card table-wrap"><table class="tbl vl"></table></div>`;
  const draw = (th) => { $('.vl', view).innerHTML = '<tr><th>Mot</th><th>Français</th><th>Exemple</th><th>Boîte</th></tr>' + list.filter((v) => !th || v.th === th).map((v) => `<tr><td><b>${esc(v.w)}</b><br><span class="small muted">${esc(v.d)}</span></td><td>${esc(v.fr)}</td><td class="small"><i>${esc(v.ex)}</i></td><td>${Store.s.vocab[v.w] ? Store.s.vocab[v.w].box : '—'}</td></tr>`).join(''); };
  $$('.th', view).forEach((b) => b.onclick = () => { $$('.th', view).forEach((x) => x.classList.remove('primary')); b.classList.add('primary'); draw(b.dataset.t); });
  draw('');
}
function vocabStudy(view) {
  const q = Vocab.queue(); let i = 0;
  const sw = new Stopwatch(); App.onLeave(() => Record.minutes(sw.sec / 60));
  const show = () => {
    if (i >= q.length) { view.innerHTML = `<div class="card flash mt2"><div class="hero-num">✓</div><h2 class="mt">Session terminée</h2><p class="t2">${q.length} carte(s) revue(s). Reviens demain : les mots réapparaîtront au bon moment.</p><div class="row" style="justify-content:center"><a class="btn" href="#/">Tableau de bord</a><a class="btn primary" href="#/vocab/spell">Mode orthographe →</a></div></div>`; return; }
    const v = q[i]; const c = Store.s.vocab[v.w];
    view.innerHTML = `<div class="session-top"><a class="btn sm ghost" href="#/vocab">✕</a><span class="title">Vocabulaire</span><span class="muted small">${i + 1}/${q.length}${c ? '' : ' · nouveau'}</span></div>
      <div class="card flash mt2"><div class="muted small">${esc(v.th)}</div><div class="word mt">${esc(v.w)}</div><button class="btn sm ghost say">🔊</button>
      <div class="back" style="display:none"><hr><p class="def"><b>${esc(v.fr)}</b></p><p class="t2">${esc(v.d)}</p><p><i>${esc(v.ex)}</i></p>${v.col ? `<p class="small muted">Collocations : ${esc(v.col)}</p>` : ''}</div>
      <div class="row mt2 act" style="justify-content:center"><button class="btn primary lg rev">Afficher (espace)</button></div></div>`;
    Voice.play([{ t: v.w, g: 'W' }]);
    $('.say', view).onclick = () => Voice.play([{ t: v.w + '. ' + v.ex, g: 'W' }]);
    const reveal = () => {
      $('.back', view).style.display = '';
      $('.act', view).innerHTML = '<button class="btn danger g0">✗ Je ne savais pas (1)</button><button class="btn g1">~ Hésitant (2)</button><button class="btn good g2">✓ Je savais (3)</button>';
      $('.g0', view).onclick = () => { Vocab.grade(v.w, 0); q.push(v); i++; show(); };
      $('.g1', view).onclick = () => { Vocab.grade(v.w, 1); i++; show(); };
      $('.g2', view).onclick = () => { Vocab.grade(v.w, 2); i++; show(); };
    };
    $('.rev', view).onclick = reveal;
  };
  const key = (e) => {
    if (!location.hash.startsWith('#/vocab/study')) return;
    if (e.code === 'Space') { e.preventDefault(); const r = $('.rev', view); r && r.click(); }
    if (['1', '2', '3'].includes(e.key)) { const b = $('.g' + (+e.key - 1), view); b && b.click(); }
  };
  document.addEventListener('keydown', key); App.onLeave(() => document.removeEventListener('keydown', key));
  show();
}
function vocabSpell(view) {
  const seen = Vocab.list().filter((v) => Store.s.vocab[v.w] && /^[a-z]+$/i.test(v.w));
  const pool = shuffle(seen.length >= 10 ? seen : Vocab.list().filter((v) => /^[a-z]+$/i.test(v.w))).slice(0, 15);
  let i = 0, ok = 0;
  const show = () => {
    if (i >= pool.length) { view.innerHTML = `<div class="card flash mt2"><div class="hero-num">${ok}/${pool.length}</div><p class="t2 mt">Orthographe des mots académiques : exactement ce qu'exige Complete the Words.</p><div class="row" style="justify-content:center"><a class="btn" href="#/vocab">Retour</a><a class="btn primary" href="#/practice/ctw?n=3">Complete the Words →</a></div></div>`; return; }
    const v = pool[i]; const keep = Math.floor(v.w.length / 2); const miss = v.w.slice(keep);
    const ex = v.ex.replace(new RegExp('\\b' + v.w + '\\w*', 'i'), '_____');
    view.innerHTML = `<div class="session-top"><a class="btn sm ghost" href="#/vocab">✕</a><span class="title">Orthographe</span><span class="muted small">${i + 1}/${pool.length}</span></div>
      <div class="card flash mt2"><p class="t2">${esc(v.d)} <span class="muted">(${esc(v.fr)})</span></p><p class="small"><i>${esc(ex)}</i></p>
      <div class="passage mt" style="font-size:24px">${esc(v.w.slice(0, keep))}<input class="ctw-input" maxlength="${miss.length}" size="${miss.length}" style="width:${miss.length * 1.05 + 0.6}em;font-size:22px" autocomplete="off" spellcheck="false"></div>
      <div class="fb mt"></div><button class="btn primary mt">Vérifier</button></div>`;
    const inp = $('input', view); inp.focus(); let checked = false;
    const act = () => {
      if (!checked) { checked = true; const good = inp.value.toLowerCase() === miss.toLowerCase(); if (good) ok++; inp.classList.add(good ? 'ok' : 'ko'); $('.fb', view).innerHTML = good ? '<span class="tag-good">✓ Correct</span>' : `<span class="tag-bad">✗ ${esc(v.w)}</span>`; if (!good) Vocab.grade(v.w, 0); $('button.primary', view).textContent = 'Suivant →'; return; }
      i++; show();
    };
    $('button.primary', view).onclick = act; inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') act(); });
  };
  show();
}

/* =========================================================
   CARNET D'ERREURS
   ========================================================= */
function errorLabel(e) {
  const it = Content.get(e.type, e.id); if (!it) return '';
  if (e.type === 'ctw') return `Mot : <b>${esc(e.word || '')}</b> <span class="muted">· ${esc(it.topic || '')}</span>`;
  if (e.type === 'lcr') return `« ${esc(it.p)} »`;
  if (e.type === 'bas') return `« ${esc(it.a)} »`;
  const q = it.qs && it.qs[e.q]; return q ? esc(strip(q.q)) + ` <span class="muted">· ${esc(it.title || it.label || it.ctx || '')}</span>` : '';
}
function pageErrors(view) {
  const errs = Store.s.errors.filter((e) => !e.mastered).sort((a, b) => b.ts - a.ts);
  const mastered = Store.s.errors.filter((e) => e.mastered).length;
  const byType = {}; errs.forEach((e) => { byType[e.type] = (byType[e.type] || 0) + 1; });
  view.innerHTML = `<h1>Carnet d'erreurs</h1><p class="t2">Chaque erreur (entraînement ou test blanc) est enregistrée ici. Elle est considérée comme « maîtrisée » après <b>2 réussites consécutives</b> en révision.</p>
    <div class="grid g3"><div class="card kpi"><span class="label">À retravailler</span><span class="value">${errs.length}</span></div><div class="card kpi"><span class="label">Maîtrisées</span><span class="value">${mastered}</span></div><div class="card"><a class="btn primary lg" style="width:100%" href="#/review">Réviser maintenant →</a></div></div>
    <div class="grid g4 mt">${Object.entries(byType).map(([t, n]) => `<a class="card task-card" style="color:inherit" href="#/review/${t}"><b><i class="dot ${TYPES[t].sec}"></i> ${TYPES[t].name}</b><span class="meta">${n} erreur(s) · réviser →</span></a>`).join('')}</div>
    <h2 class="mt2">Détail</h2><div class="card table-wrap">${errs.length ? `<table class="tbl"><tr><th>Tâche</th><th>Erreur</th><th>Fois</th><th>Date</th></tr>${errs.slice(0, 150).map((e) => `<tr><td class="small"><i class="dot ${TYPES[e.type].sec}"></i> ${TYPES[e.type].name}</td><td class="small">${errorLabel(e)}</td><td>${e.count}</td><td class="small muted">${fmtDate(e.ts)}</td></tr>`).join('')}</table>` : '<p class="muted">Aucune erreur en attente 🎉</p>'}</div>`;
}

/* =========================================================
   SUIVI
   ========================================================= */
function pageProgress(view) {
  snapshot();
  const snaps = Store.s.snapshots || {};
  const days = Object.keys(snaps).sort();
  const series = ['R', 'L', 'W', 'S'].map((s) => ({ name: SECTIONS[s].name, color: SECTIONS[s].color, points: days.filter((d) => snaps[d][s] != null).map((d) => ({ x: parseDay(d).getTime(), y: snaps[d][s] })) }));
  series.push({ name: 'Global', color: 'var(--text)', bold: true, points: days.filter((d) => snaps[d].total != null).map((d) => ({ x: parseDay(d).getTime(), y: snaps[d].total })) });
  const act = Array.from({ length: 28 }, (_, i) => { const k = todayStr(new Date(Date.now() - (27 - i) * 86400000)); return [k, Store.s.activity[k] || 0]; });
  const maxA = Math.max(30, ...act.map((a) => a[1]));
  const totalMin = sum(Object.values(Store.s.activity));
  view.innerHTML = `<h1>Suivi</h1>
    <div class="grid g4"><div class="card kpi"><span class="label">Temps total</span><span class="value">${Math.floor(totalMin / 60)}h${String(Math.round(totalMin % 60)).padStart(2, '0')}</span></div><div class="card kpi"><span class="label">Exercices</span><span class="value">${Store.s.attempts.length}</span></div><div class="card kpi"><span class="label">Tests blancs</span><span class="value">${Store.s.mocks.length}</span></div><div class="card kpi"><span class="label">Productions notées</span><span class="value">${Store.s.writings.length + Store.s.speakings.length}</span></div></div>
    <div class="card mt"><h2>Évolution du niveau estimé (bandes 1-6)</h2><div class="chart"></div></div>
    <div class="card"><h2>Activité — 28 derniers jours</h2><div style="display:flex;align-items:flex-end;gap:4px;height:90px">${act.map(([k, m]) => `<div title="${k} : ${Math.round(m)} min" style="flex:1;height:${Math.max(3, m / maxA * 90)}px;background:${m ? 'var(--primary)' : 'var(--surface-2)'};border-radius:4px 4px 0 0"></div>`).join('')}</div><div class="row between small muted mt"><span>${fmtDate(Date.now() - 27 * 86400000)}</span><span>aujourd'hui</span></div></div>
    <div class="card"><h2>Par tâche</h2><div class="table-wrap"><table class="tbl"><tr><th>Tâche</th><th>Faits</th><th>Réussite récente</th><th>Bande estimée</th><th>Écart objectif</th></tr>${Object.keys(TYPES).map((t) => { const st = Estimator.typeStats(t); const g = st.band != null ? Estimator.targetBand() - st.band : null; return `<tr><td><i class="dot ${TYPES[t].sec}"></i> ${TYPES[t].name}</td><td>${st.count}</td><td>${st.acc != null ? pct(st.acc) : '—'}</td><td>${fmtBand(st.band)}</td><td>${g == null ? '—' : g <= 0 ? '<span class="tag-good">✓</span>' : `<span class="${g > 1 ? 'tag-bad' : ''}">−${g.toFixed(1)}</span>`}</td></tr>`; }).join('')}</table></div></div>
    <div class="card"><h2>Productions écrites et orales</h2><div class="prods"></div></div>`;
  lineChart($('.chart', view), series, { target: Estimator.targetBand() });
  const prods = Store.s.writings.concat(Store.s.speakings.filter((s) => s.kind === 'int')).sort((a, b) => b.ts - a.ts).slice(0, 30);
  $('.prods', view).innerHTML = prods.length ? prods.map((p) => { const it = Content.get(p.kind, p.itemId); return `<details class="fold"><summary>${fmtDate(p.ts)} · ${TYPES[p.kind].name} · <b>${p.score}/5</b>${p.ai ? ' · corrigé par IA' : ''} <span class="muted small">${esc(it ? strip(it.subj || it.course || it.topic || '') : '')}</span></summary><div class="mt">${p.text ? `<div class="model-answer">${esc(p.text)}</div>` : (p.results || []).map((r) => `<p class="small"><b>${esc(r.q)}</b><br>${esc(r.transcript || '—')}</p>`).join('')}${p.ai ? `<div class="mt">${Grade.renderAi(p.ai)}</div>` : ''}</div></details>`; }).join('') : '<p class="muted">Aucune production pour l\'instant.</p>';
}

/* =========================================================
   GUIDE
   ========================================================= */
function pageGuide(view) {
  Store.s.flags = Store.s.flags || {}; if (!Store.s.flags.guideRead) { Store.s.flags.guideRead = true; Store.save(); }
  view.innerHTML = CONTENT.guide ? CONTENT.guide.html() : '<p>Guide indisponible.</p>';
}

/* =========================================================
   RÉGLAGES
   ========================================================= */
function pageSettings(view) {
  const p = Store.s.profile || {}; const s = Store.s.settings;
  view.innerHTML = `<h1>Réglages</h1>
    <div class="card"><h2>Profil & objectif</h2>
      <div class="grid g2"><label class="field"><span>Prénom</span><input type="text" id="s-name" value="${esc(p.name || '')}"></label>
      <label class="field"><span>Date du TOEFL</span><input type="date" id="s-date" value="${esc(p.examDate || '')}"></label>
      <label class="field"><span>Objectif /120</span><input type="number" id="s-target" min="60" max="120" value="${p.target120 || 105}"><small>Bande visée par section : <b id="s-band">${p.targetBand || 5.5}</b></small></label>
      <label class="field"><span>Minutes par jour</span><input type="number" id="s-min" min="15" max="240" step="5" value="${p.minutes || 60}"></label></div>
      <button class="btn primary" id="s-save">Enregistrer</button></div>
    <div class="card"><h2>Audio</h2>
      <label class="field"><span>Vitesse des voix : <b id="s-rate-v">${s.rate}</b>×</span><input type="range" id="s-rate" min="0.8" max="1.25" step="0.05" value="${s.rate}" style="width:100%"><small>1.0 ≈ débit du test. Passe à 1.1 pour t'entraîner « plus dur que le réel ».</small></label>
      <label class="field"><span>Accents</span><select id="s-acc"><option value="mix">Mélange US / UK / Australie (comme au test)</option><option value="us">Américain uniquement</option><option value="gb">Britannique uniquement</option></select></label>
      <label class="field"><input type="checkbox" id="s-replay" ${s.replay ? 'checked' : ''}> Autoriser la réécoute en entraînement (jamais en test blanc)</label>
      <div class="row"><button class="btn" id="s-test">🔊 Tester les voix</button><button class="btn" id="s-mic">🎤 Tester le micro</button><span class="small muted" id="s-mic-st"></span></div>
      <details class="fold mt"><summary>Voix disponibles (${Voice.voices.length}) et conseil qualité</summary><p class="small mt">Pour des voix beaucoup plus naturelles sur Mac : <b>Réglages Système → Accessibilité → Contenu énoncé → Voix du système → Gérer les voix</b>, puis télécharge les voix anglaises « Améliorée/Premium » (ex. Ava, Zoe, Evan, Nathan en US ; Serena, Daniel, Oliver en UK ; Karen, Lee en AU). Redémarre ensuite le navigateur.</p><div class="small">${Voice.voices.map((v) => `${esc(v.name)} <span class="muted">(${v.lang}, ${Voice.gender(v)})</span>`).join(' · ') || 'Aucune voix anglaise détectée.'}</div></details></div>
    <div class="card"><h2>Correction automatique par l'IA — Gemini (gratuit)</h2>
      <p class="small t2">Avec une clé API Google Gemini (offre gratuite, sans carte bancaire), tes e-mails, discussions et entretiens sont notés sur la grille officielle 0-5 et corrigés en détail : erreurs de francophone, version C1 de ta réponse. Le serveur choisit automatiquement le meilleur modèle « Flash » gratuit disponible.</p>
      <ol class="small"><li>Va sur <a href="https://aistudio.google.com/app/apikey" target="_blank">aistudio.google.com/app/apikey</a> et connecte-toi avec ton compte Google.</li><li>Clique sur <b>Create API key</b>, puis copie la clé (elle commence par « AIza… »).</li><li>Colle-la ci-dessous et enregistre.</li></ol>
      <p class="small muted">La clé reste sur ton ordinateur (data/config.json, jamais envoyé sur GitHub). Sur l'offre gratuite, Google peut utiliser les textes envoyés pour améliorer ses modèles : n'y mets rien de confidentiel. Sans clé, le bouton « Copier le prompt » te permet de coller la correction dans gemini.google.com.</p>
      <div class="row"><input type="password" id="s-key" placeholder="${Store.ai ? 'Clé configurée ✓ (laisser vide pour conserver)' : 'AIza…'}" style="max-width:420px"><button class="btn primary" id="s-key-save">Enregistrer la clé</button><span class="small">${Store.server ? (Store.ai ? '<span class="tag-good">Actif</span>' : 'Non configuré') : '<span class="tag-bad">Serveur local non lancé</span>'}</span></div></div>
    <div class="card"><h2>Contenu & affichage</h2>
      <label class="field"><input type="checkbox" id="s-reserve" ${s.reserve ? 'checked' : ''}> Réserver les items des tests blancs fixes (ils restent inédits jusqu'au jour où tu passes le test)</label>
      <label class="field"><span>Thème</span><select id="s-theme"><option value="auto">Automatique</option><option value="light">Clair</option><option value="dark">Sombre</option></select></label></div>
    <div class="card"><h2>Sauvegarde</h2><p class="small t2">${Store.server ? 'Ta progression est enregistrée automatiquement dans <code>data/progression.json</code>, avec une copie quotidienne dans <code>data/sauvegardes/</code>.' : 'Serveur non lancé : la progression est seulement dans le navigateur.'}</p>
      <div class="row"><button class="btn" id="s-export">⬇ Exporter (JSON)</button><label class="btn">⬆ Importer<input type="file" id="s-import" accept=".json" hidden></label><span class="spacer"></span><button class="btn danger" id="s-reset">Tout réinitialiser</button></div></div>`;
  $('#s-acc', view).value = s.accent; $('#s-theme', view).value = s.theme;
  $('#s-target', view).oninput = (e) => { $('#s-band', view).textContent = +e.target.value >= 114 ? 6 : +e.target.value >= 100 ? 5.5 : score120ToBand(+e.target.value) + 0.5; };
  $('#s-save', view).onclick = () => {
    const t = +$('#s-target', view).value;
    Store.s.profile = Object.assign(Store.s.profile || { createdAt: Date.now(), weak: [] }, { name: $('#s-name', view).value.trim(), examDate: $('#s-date', view).value, target120: t, targetBand: t >= 114 ? 6 : t >= 100 ? 5.5 : Math.min(6, score120ToBand(t) + 0.5), minutes: +$('#s-min', view).value });
    Planner.regen(); Store.save(); toast('Profil enregistré — plan recalculé');
  };
  $('#s-rate', view).oninput = (e) => { s.rate = +e.target.value; $('#s-rate-v', view).textContent = s.rate; Store.save(); };
  $('#s-acc', view).onchange = (e) => { s.accent = e.target.value; Store.save(); };
  $('#s-replay', view).onchange = (e) => { s.replay = e.target.checked; Store.save(); };
  $('#s-reserve', view).onchange = (e) => { s.reserve = e.target.checked; Store.save(); };
  $('#s-theme', view).onchange = (e) => { s.theme = e.target.value; Store.save(); applyTheme(); };
  $('#s-test', view).onclick = () => Voice.play([{ t: 'Good morning. Today we will look at how central banks respond to inflation.', g: 'W' }, { t: 'Sounds great. Should I take notes on the main arguments?', g: 'M' }]);
  $('#s-mic', view).onclick = async () => {
    const st = $('#s-mic-st', view); st.textContent = 'Parle 4 secondes en anglais…';
    const r = new Recorder(); await r.start({ onText: (t) => st.textContent = '« ' + t + ' »' });
    await sleep(4000); const out = await r.stop();
    if (out.micError) st.textContent = 'Micro refusé : autorise-le dans le navigateur.';
    else { st.innerHTML = `${out.transcript ? 'Reconnu : « ' + esc(out.transcript) + ' »' : (SR ? 'Rien reconnu (parle plus fort ?)' : 'Reconnaissance vocale indisponible : utilise Chrome.')} ${out.url ? `<audio controls src="${out.url}"></audio>` : ''}`; }
  };
  $('#s-key-save', view).onclick = async () => {
    const k = $('#s-key', view).value.trim(); if (!k) return toast('Colle ta clé API');
    try { const r = await fetch('/api/config', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ gemini_api_key: k }) }).then((x) => x.json()); Store.ai = !!r.ai; toast(r.ai ? 'Clé enregistrée ✓' : 'Échec'); App.render(); } catch (e) { toast('Serveur local non lancé'); }
  };
  $('#s-export', view).onclick = () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(Store.s, null, 1)], { type: 'application/json' })); a.download = `toefl-progression-${todayStr()}.json`; a.click(); };
  $('#s-import', view).onchange = async (e) => { const f = e.target.files[0]; if (!f) return; try { const d = JSON.parse(await f.text()); if (!d.version) throw new Error(); Store.state = Object.assign(defaultState(), d); Store.save(); toast('Progression importée'); App.render(); } catch (err) { toast('Fichier invalide'); } };
  $('#s-reset', view).onclick = () => { if (confirm('Effacer TOUTE ta progression ? (une sauvegarde quotidienne reste dans data/sauvegardes)') && confirm('Vraiment sûr ?')) { Store.state = defaultState(); Store.save(); location.hash = '#/'; App.render(); } };
}

/* =========================================================
   ROUTES + DÉMARRAGE
   ========================================================= */
App.route(/^\/$/, pageHome);
App.route(/^\/plan$/, pagePlan);
App.route(/^\/train$/, pageTrain);
App.route(/^\/practice\/(\w+)$/, pagePractice);
App.route(/^\/strategy\/(\w+)$/, pageStrategy);
App.route(/^\/mocks$/, pageMocks);
App.route(/^\/mock\/(\w+)$/, pageMockRun);
App.route(/^\/report\/(\w+)$/, pageReport);
App.route(/^\/vocab(?:\/(\w+))?$/, pageVocab);
App.route(/^\/errors$/, pageErrors);
App.route(/^\/review(?:\/(\w+))?$/, (v, [t]) => runReview(v, t));
App.route(/^\/progress$/, pageProgress);
App.route(/^\/guide$/, pageGuide);
App.route(/^\/settings$/, pageSettings);

(async function boot() {
  Voice.init();
  await Store.init();
  applyTheme(); updateBadges();
  App.render();
})();
