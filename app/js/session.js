/* =========================================================
   TOEFL Prep — sessions d'entraînement, révision, tests blancs
   ========================================================= */
'use strict';

/* ---------- Session d'entraînement ---------- */
function runPractice(view, type, items, { title, review = null } = {}) {
  const meta = TYPES[type];
  const sw = new Stopwatch();
  const results = [];
  view.innerHTML = `<div class="session-top"><a class="btn sm ghost" href="#/train">✕</a><span class="title">${esc(title || meta.name)}</span><div class="progress-dots">${items.map(() => '<i></i>').join('')}</div><span class="spacer"></span><a class="btn sm" href="#/strategy/${type}">Méthode</a></div><div class="stage"></div>`;
  const stage = $('.stage', view); const dots = $$('.progress-dots i', view);
  let idx = 0;
  const next = () => {
    if (idx >= items.length) return done();
    dots.forEach((d, i) => { d.className = i < idx ? 'done' : i === idx ? 'cur' : ''; });
    const item = items[idx];
    stage.innerHTML = ''; window.scrollTo(0, 0);
    const ctx = {
      mode: 'practice',
      onDone: (res) => {
        ctx._cleanup && ctx._cleanup();
        Record.attempt({ type, id: item.id, mode: review ? 'review' : 'practice', score: res.score, n: res.n, diff: res.diff || item.diff || 2 });
        (res.wrong || []).forEach((w) => Record.error({ type, id: item.id, q: w.q, word: w.word }));
        if (review) review(item, res);
        results.push(res); idx++; next();
      },
    };
    Tasks[type].render(stage, item, ctx);
  };
  const done = () => {
    const min = sw.sec / 60; Record.minutes(min);
    const tot = sum(results.map((r) => r.n)), got = sum(results.map((r) => r.score * r.n));
    const st = Estimator.typeStats(type);
    dots.forEach((d) => d.className = 'done');
    stage.innerHTML = `<div class="card center" style="max-width:640px;margin:30px auto">
      <div class="muted">Session terminée · ${fmtTime(sw.sec)}</div>
      <div class="hero-num mt">${pct(tot ? got / tot : 0)}</div>
      <p class="t2">${meta.unit === 'phrase' || meta.unit === 'réplique' ? `${Math.round(got)}/${tot} correct(s)` : `score moyen sur ${items.length} ${meta.unit}${items.length > 1 ? 's' : ''}`}</p>
      <hr><div class="row" style="justify-content:center;gap:28px">
        <div class="kpi"><span class="label">Niveau estimé sur cette tâche</span><span class="value">${fmtBand(st.band)}</span><span class="sub">${bandCefr(st.band)} · objectif ${Estimator.targetBand()}</span></div>
        <div class="kpi"><span class="label">Items faits au total</span><span class="value">${st.count}</span><span class="sub">${Content.unseenCount(type)} restants avant le prochain cycle</span></div>
      </div>
      <div class="row mt2" style="justify-content:center"><a class="btn" href="#/">Tableau de bord</a><a class="btn" href="#/errors">Carnet d'erreurs</a><button class="btn primary again">Encore ${items.length} →</button></div></div>`;
    $('.again', stage).onclick = () => { const more = Content.pick(type, items.length); if (!more.length) return toast('Plus de contenu disponible'); runPractice(view, type, more, { title }); };
  };
  next();
}

/* ---------- Plans des tests ---------- */
const MOCK_FULL = [
  { sec: 'R', intro: 'La section Reading est <b>adaptative en 2 modules</b> : ta performance au module 1 détermine si le module 2 est plus difficile (accès aux bandes 5-6) ou plus facile (plafonné). Tu ne peux pas revenir en arrière.',
    modules: [
      { name: 'Reading · Module 1', time: 18 * 60, parts: [['ctw', 2], ['dl', 2], ['ap', 1]] },
      { name: 'Reading · Module 2', time: 11 * 60, adaptive: true, parts: [['ctw', 1], ['dl', 2], ['ap', 1]] },
    ] },
  { sec: 'L', intro: 'Chaque audio n\'est joué <b>qu\'une seule fois</b>. Le chrono est mis en pause pendant l\'audio. Prends des notes sur papier. Section adaptative en 2 modules.',
    modules: [
      { name: 'Listening · Module 1', time: 8 * 60, audioPause: true, parts: [['lcr', 9], ['conv', 3], ['ann', 1], ['talk', 2]] },
      { name: 'Listening · Module 2', time: 6 * 60, audioPause: true, adaptive: true, parts: [['lcr', 8], ['conv', 2], ['ann', 1], ['talk', 1]] },
    ] },
  { sec: 'W', intro: '10 phrases à reconstruire, puis un e-mail (7 min) et une discussion académique (10 min). Copier-coller désactivé, pas de correcteur orthographique.',
    modules: [
      { name: 'Writing · Build a Sentence', time: 6 * 60, parts: [['bas', 10]] },
      { name: 'Writing · Email', time: 0, parts: [['email', 1]] },
      { name: 'Writing · Academic Discussion', time: 0, parts: [['disc', 1]] },
    ] },
  { sec: 'S', intro: 'Micro + casque obligatoires. 7 phrases à répéter puis un entretien de 4 questions (45 s chacune, sans préparation).',
    modules: [
      { name: 'Speaking · Listen and Repeat', time: 0, parts: [['rep', 1]] },
      { name: 'Speaking · Take an Interview', time: 0, parts: [['int', 1]] },
    ] },
];
const MOCK_DIAG = [
  { sec: 'R', intro: 'Diagnostic : version courte de chaque section, dans les conditions du test.', modules: [{ name: 'Reading', time: 12 * 60, parts: [['ctw', 1], ['dl', 1], ['ap', 1]] }] },
  { sec: 'L', intro: 'Audio joué une seule fois.', modules: [{ name: 'Listening', time: 5 * 60, audioPause: true, parts: [['lcr', 6], ['conv', 2], ['talk', 1]] }] },
  { sec: 'W', intro: 'Phrases à reconstruire + e-mail.', modules: [{ name: 'Writing · Build a Sentence', time: 4 * 60, parts: [['bas', 6]] }, { name: 'Writing · Email', time: 0, parts: [['email', 1]] }] },
  { sec: 'S', intro: 'Micro + casque. Phrases à répéter + entretien.', modules: [{ name: 'Speaking · Listen and Repeat', time: 0, parts: [['rep', 1]] }, { name: 'Speaking · Take an Interview', time: 0, parts: [['int', 1]] }] },
];
/* max de points par section pour le calcul du score (W : 10 BaS + 5 + 5 ; S : 7x5 + 4x5 comme dans le blueprint ETS) */

function mockDefinition(kind, secOnly) {
  if (kind === 'diag') return { plan: MOCK_DIAG, fixed: (CONTENT.mocks || []).find((m) => m.id === 'diag') };
  const plan = secOnly ? MOCK_FULL.filter((s) => s.sec === secOnly) : MOCK_FULL;
  return { plan, fixed: (CONTENT.mocks || []).find((m) => m.id === kind) };
}

/* Sélectionne les items d'un module */
function pickForModule(mod, fixed, used, route) {
  const out = [];
  for (const [type, n] of mod.parts) {
    let chosen = [];
    if (fixed && fixed.items[type] && !mod.adaptive) {
      const ids = fixed.items[type].filter((id) => !used.has(type + ':' + id));
      chosen = ids.slice(0, n).map((id) => Content.get(type, id)).filter(Boolean);
    }
    if (chosen.length < n) {
      const diffs = mod.adaptive ? (route === 'upper' ? [3, 2] : [1, 2]) : [1, 2, 3];
      const extra = Content.pick(type, n - chosen.length, { exclude: new Set([...used, ...chosen.map((c) => type + ':' + c.id)]), diffs, allowReserved: !!fixed && !mod.adaptive });
      // pour le module adaptatif : trier par difficulté voulue
      if (mod.adaptive) extra.sort((a, b) => (route === 'upper' ? (b.diff || 2) - (a.diff || 2) : (a.diff || 2) - (b.diff || 2)));
      chosen = chosen.concat(extra);
    }
    chosen.forEach((c) => { used.add(type + ':' + c.id); out.push({ type, item: c }); });
  }
  return out;
}

/* ---------- Test blanc ---------- */
function runMock(view, kind, { secOnly = null } = {}) {
  const def = mockDefinition(kind, secOnly);
  const fixedName = def.fixed ? def.fixed.name : null;
  const title = kind === 'diag' ? 'Diagnostic' : secOnly ? `${SECTIONS[secOnly].name} — conditions réelles` : (fixedName || 'Test blanc aléatoire');
  const used = new Set();
  const log = []; // {sec, module, type, id, diff, score, n, pending, production, wrong}
  const routes = {};
  const sw = new Stopwatch();
  App.guard = () => confirm('Quitter le test en cours ? Ta progression dans ce test sera perdue.');

  const totalMin = def.plan.reduce((s, sec) => s + sec.modules.reduce((a, m) => a + (m.time || 0) / 60, 0), 0) + (def.plan.some((s) => s.sec === 'W') ? 17 : 0) + (def.plan.some((s) => s.sec === 'S') ? 8 : 0) + (def.plan.some((s) => s.sec === 'L') ? 14 : 0);
  view.innerHTML = `<div class="card" style="max-width:720px;margin:20px auto">
    <h1>${esc(title)}</h1>
    <p class="t2">Durée ≈ <b>${Math.round(totalMin)} min</b> · ${def.plan.map((s) => SECTIONS[s.sec].name).join(' → ')} · sans pause, comme le vrai TOEFL iBT 2026.</p>
    <div class="callout warn"><b>Conditions réelles :</b><ul class="fb-list" style="margin:6px 0 0">
      <li>Casque + micro branchés, pièce calme, téléphone en mode avion.</li>
      <li>Une feuille et un crayon pour les notes (autorisé au test).</li>
      <li>Audio joué une seule fois, pas de retour en arrière, chronos stricts.</li>
      <li>Utilise <b>Google Chrome</b> pour la reconnaissance vocale du Speaking.</li></ul></div>
    ${def.plan.some((s) => s.sec === 'S') ? '<div class="row mt"><button class="btn mic">🎤 Tester micro & son</button><span class="mic-st small muted"></span></div>' : ''}
    <div class="row mt2"><a class="btn" href="#/mocks">Annuler</a><span class="spacer"></span><button class="btn primary lg go">Commencer le test →</button></div></div>`;
  const mic = $('.mic', view);
  if (mic) mic.onclick = async () => {
    try { await Mic.get(); $('.mic-st', view).textContent = 'Micro OK ✓ — '; } catch (e) { $('.mic-st', view).textContent = 'Micro refusé ✗ — '; }
    Voice.play([{ t: 'This is a sound check. If you can hear me clearly, you are ready.', g: 'W' }]);
    $('.mic-st', view).textContent += (SR ? 'reconnaissance vocale disponible ✓' : 'reconnaissance vocale indisponible (utilise Chrome)');
  };
  $('.go', view).onclick = () => runSections(0);

  const runSections = async (si) => {
    if (si >= def.plan.length) return finish();
    const sec = def.plan[si];
    view.innerHTML = `<div class="card center" style="max-width:640px;margin:40px auto"><span class="pill ${sec.sec}"><i class="dot ${sec.sec}"></i>Section ${si + 1}/${def.plan.length}</span><h1 class="mt">${SECTIONS[sec.sec].name}</h1><p class="t2">${sec.intro}</p><button class="btn primary lg mt">Commencer la section →</button></div>`;
    await new Promise((r) => { $('button', view).onclick = r; });
    for (let mi = 0; mi < sec.modules.length; mi++) {
      const mod = sec.modules[mi];
      let route = null;
      if (mod.adaptive) {
        const prev = log.filter((l) => l.sec === sec.sec && l.module === 0);
        const p = sum(prev.map((l) => l.score * l.n)) / Math.max(1, sum(prev.map((l) => l.n)));
        route = p >= 0.62 ? 'upper' : 'lower'; routes[sec.sec] = route;
      }
      const units = pickForModule(mod, def.fixed, used, route);
      await runModule(sec, mi, mod, units);
    }
    runSections(si + 1);
  };

  const runModule = (sec, mi, mod, units) => new Promise((resolve) => {
    view.innerHTML = `<div class="session-top"><span class="pill ${sec.sec}"><i class="dot ${sec.sec}"></i>${esc(mod.name)}</span><div class="progress-dots">${units.map(() => '<i></i>').join('')}</div><span class="spacer"></span><span class="timer" data-t></span></div><div class="stage"></div>`;
    const stage = $('.stage', view), dots = $$('.progress-dots i', view), tEl = $('[data-t]', view);
    let idx = 0, ended = false, timer = null;
    if (mod.time) timer = new Countdown(tEl, mod.time, { onEnd: () => { ended = true; toast('Temps écoulé pour ce module'); for (let k = idx; k < units.length; k++) log.push({ sec: sec.sec, module: mi, type: units[k].type, id: units[k].item.id, diff: units[k].item.diff, score: 0, n: guessN(units[k]), timeout: true }); resolve(); } });
    else tEl.style.display = 'none';
    const step = () => {
      if (ended) return;
      if (idx >= units.length) { timer && timer.stop(); return resolve(); }
      dots.forEach((d, i) => { d.className = i < idx ? 'done' : i === idx ? 'cur' : ''; });
      const u = units[idx]; stage.innerHTML = ''; window.scrollTo(0, 0);
      const ctx = {
        mode: 'exam',
        onAudio: (on) => { if (timer && mod.audioPause) timer.paused = on; },
        onDone: (res) => {
          ctx._cleanup && ctx._cleanup();
          if (ended) return;
          log.push({ sec: sec.sec, module: mi, type: u.type, id: u.item.id, diff: u.item.diff, score: res.score ?? null, n: res.n, pending: !!res.pending, production: res.production, wrong: res.wrong || [] });
          idx++; step();
        },
      };
      Tasks[u.type].render(stage, u.item, ctx);
    };
    step();
  });
  const guessN = (u) => ({ ctw: 10, lcr: 1, bas: 1, email: 5, disc: 5, rep: 7, int: 4 }[u.type] || (u.item.qs ? u.item.qs.length : 1));

  /* ---- correction des productions puis rapport ---- */
  const finish = async () => {
    Record.minutes(sw.sec / 60);
    const pend = log.filter((l) => l.pending);
    if (pend.length) {
      view.innerHTML = `<div class="card" style="max-width:820px;margin:20px auto"><h1>Correction des productions</h1><p class="t2">Le test est terminé. Il reste à noter ${pend.length} production(s) orale(s)/écrite(s). ${Store.ai ? 'Gemini corrige automatiquement…' : 'Utilise la grille officielle (ou copie le prompt dans Gemini / ChatGPT) et sois exigeant.'}</p><div class="pend"></div></div>`;
      const wrap = $('.pend', view);
      for (const l of pend) {
        const item = Content.get(l.type, l.id);
        const slot = h(`<div class="mt2"><h2>${TYPES[l.type].name}</h2><div class="inner"></div></div>`); wrap.appendChild(slot);
        const inner = $('.inner', slot);
        if (l.type === 'rep') {
          await new Promise((res) => Grade.repPanel(inner, l.production, (s5) => { l.score = s5 / 5; l.pending = false; res(); }));
        } else {
          if (l.production.kind !== 'int') inner.innerHTML = `<div class="model-answer">${esc(l.production.text || '(vide)')}</div>`;
          await new Promise((res) => {
            Grade.panel(inner, l.production, item, (s) => { l.score = s / 5; l.pending = false; res(); });
            if (Store.ai) { const b = $('.run', inner); b && b.click(); }
          });
        }
        slot.style.opacity = .6;
      }
    }
    // enregistrement des tentatives + carnet d'erreurs
    for (const l of log) {
      if (l.score == null) continue;
      Record.attempt({ type: l.type, id: l.id, mode: 'mock', score: l.score, n: l.n, diff: l.diff || 2 });
      (l.wrong || []).forEach((w) => Record.error({ type: l.type, id: l.id, q: w.q, word: w.word }));
    }
    const report = buildReport(kind, secOnly, title, log, routes, sw.sec);
    Store.s.mocks.push(report); Store.save();
    App.guard = null;
    location.hash = '#/report/' + report.id;
  };
}

function buildReport(kind, secOnly, title, log, routes, sec) {
  const sections = {};
  for (const s of ['R', 'L', 'W', 'S']) {
    const L = log.filter((l) => l.sec === s && l.score != null);
    if (!L.length) continue;
    const pts = sum(L.map((l) => l.n)), got = sum(L.map((l) => l.score * l.n));
    const p = got / pts;
    let cont = pctToBandCont(p);
    if (routes[s] === 'lower') cont = Math.min(cont, 4.5); // module facile = plafond (comme le vrai test adaptatif)
    const byType = {};
    for (const t of SEC_TYPES[s]) { const T = L.filter((l) => l.type === t); if (T.length) byType[t] = { pct: sum(T.map((l) => l.score * l.n)) / sum(T.map((l) => l.n)), n: sum(T.map((l) => l.n)) }; }
    sections[s] = { pct: p, band: roundHalf(cont), bandCont: cont, route: routes[s] || null, byType };
  }
  const bands = Object.values(sections).map((x) => x.bandCont);
  const complete = !secOnly && Object.keys(sections).length === 4;
  const overallCont = bands.length ? avg(bands) : null;
  return {
    id: uid(), ts: Date.now(), kind, mockId: kind, secOnly, title, complete: complete && kind !== 'diag' ? true : kind === 'diag',
    sections, total: overallCont != null ? roundHalf(avg(Object.values(sections).map((x) => x.band))) : null, totalCont: overallCont,
    total120: overallCont != null ? bandTo120(overallCont) : null, minutes: Math.round(sec / 60),
    items: log.map((l) => ({ sec: l.sec, type: l.type, id: l.id, score: l.score, n: l.n, wrong: (l.wrong || []).map((w) => w.q), timeout: !!l.timeout })),
  };
}

/* ---------- Révision du carnet d'erreurs ---------- */
function runReview(view, type) {
  const errs = Store.s.errors.filter((e) => !e.mastered && (!type || e.type === type));
  if (!errs.length) { view.innerHTML = '<div class="callout good">Aucune erreur à réviser. 🎉</div>'; return; }
  // regroupe par item ; commence par le type le plus fréquent
  const byType = {};
  errs.forEach((e) => { (byType[e.type] = byType[e.type] || new Set()).add(e.id); });
  const t = type || Object.entries(byType).sort((a, b) => b[1].size - a[1].size)[0][0];
  const items = [...byType[t]].slice(0, 6).map((id) => Content.get(t, id)).filter(Boolean);
  runPractice(view, t, items, {
    title: 'Révision · ' + TYPES[t].name,
    review: (item, res) => {
      const wrongQ = new Set((res.wrong || []).map((w) => String(w.q)));
      Store.s.errors.filter((e) => e.type === t && e.id === item.id && !e.mastered).forEach((e) => {
        if (!wrongQ.has(String(e.q))) Record.errorFixed(e.key); else e.streak = 0;
      });
      Store.save();
    },
  });
}
