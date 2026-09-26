/* =========================================================
   TOEFL Prep — moteurs des 12 types de tâches
   Chaque tâche : Tasks[type].render(el, item, ctx)
   ctx = { mode: 'practice'|'exam', onDone(result), onAudio(playing) }
   result = { score (0-1), n (points), diff, wrong: [{q, ...}], production? }
   ========================================================= */
'use strict';

const Tasks = {};

/* ---------- MCQ générique ---------- */
function renderMCQ(container, rawQuestions, ctx, { onChange } = {}) {
  // options mélangées à chaque affichage : la position de la bonne réponse ne se devine pas
  const questions = rawQuestions.map((q) => {
    const order = shuffle(q.o.map((_, i) => i));
    return Object.assign({}, q, { o: order.map((i) => q.o[i]), a: order.indexOf(q.a) });
  });
  const answers = new Array(questions.length).fill(null);
  container.innerHTML = questions.map((q, qi) => `
    <div class="q" data-qi="${qi}">
      <div class="stem">${questions.length > 1 ? (qi + 1) + '. ' : ''}${q.q}</div>
      <div class="opts">${q.o.map((o, oi) => `<button class="opt" data-oi="${oi}"><span class="l">${LETTERS[oi]}</span><span>${o}</span></button>`).join('')}</div>
      <div class="expl-slot"></div>
    </div>`).join('');
  $$('.q', container).forEach((qEl) => {
    const qi = +qEl.dataset.qi;
    $$('.opt', qEl).forEach((b) => b.addEventListener('click', () => {
      if (container.dataset.locked) return;
      answers[qi] = +b.dataset.oi;
      $$('.opt', qEl).forEach((x) => x.classList.toggle('sel', x === b));
      onChange && onChange(answers);
    }));
  });
  return {
    answers,
    complete: () => answers.every((a) => a != null),
    reveal() {
      container.dataset.locked = '1';
      questions.forEach((q, qi) => {
        const qEl = $(`.q[data-qi="${qi}"]`, container);
        $$('.opt', qEl).forEach((b) => {
          const oi = +b.dataset.oi; b.disabled = true;
          if (oi === q.a) b.classList.add('right'); else if (oi === answers[qi]) b.classList.add('wrong');
        });
        if (q.x) $('.expl-slot', qEl).innerHTML = `<div class="expl">${answers[qi] === q.a ? '<span class="tag-good">✓</span> ' : '<span class="tag-bad">✗</span> '}${q.x}</div>`;
      });
    },
    result() {
      const wrong = []; let ok = 0;
      questions.forEach((q, qi) => { if (answers[qi] === q.a) ok++; else wrong.push({ q: qi, given: answers[qi] }); });
      return { ok, total: questions.length, wrong };
    },
  };
}

/* Bouton d'action en bas de tâche : en entraînement « Vérifier » puis « Suivant » ; en examen « Suivant » */
function actionBar(el, ctx, { canSubmit = () => true, onCheck, onNext, label } = {}) {
  const bar = h(`<div class="row mt"><span class="kbd-hint">${ctx.mode === 'exam' ? 'Pas de retour en arrière possible, comme au vrai test.' : 'Entrée ↵ pour valider'}</span><span class="spacer"></span><button class="btn primary lg">${label || (ctx.mode === 'exam' ? 'Suivant →' : 'Vérifier')}</button></div>`);
  el.appendChild(bar);
  const btn = $('button', bar);
  let checked = false;
  const act = () => {
    if (btn.disabled) return;
    if (ctx.mode === 'exam') { if (!canSubmit() && !confirm('Certaines réponses sont vides. Continuer quand même ?')) return; btn.disabled = true; onNext(); return; }
    if (!checked) { if (!canSubmit() && !confirm('Certaines réponses sont vides. Vérifier quand même ?')) return; checked = true; onCheck && onCheck(); btn.textContent = 'Suivant →'; btn.focus(); return; }
    btn.disabled = true; onNext();
  };
  btn.addEventListener('click', act);
  const key = (e) => { if (e.key === 'Enter' && !e.shiftKey && !(e.target.tagName === 'TEXTAREA')) { e.preventDefault(); act(); } };
  document.addEventListener('keydown', key); App.onLeave(() => document.removeEventListener('keydown', key));
  ctx._cleanup = () => document.removeEventListener('keydown', key);
  return { btn, force: () => { btn.disabled = false; act(); } };
}
function taskHead(type, extra = '') {
  const t = TYPES[type];
  return `<div class="task-head"><span class="pill ${t.sec}"><i class="dot ${t.sec}"></i>${SECTIONS[t.sec].name}</span><strong>${t.name}</strong>${extra}</div>`;
}

/* =========================================================
   READING
   ========================================================= */

/* Complete the Words : 1re phrase intacte, puis 2e moitié d'un mot sur deux effacée (10 trous) */
function buildCtw(text) {
  const m = text.match(/^.*?[.!?](\s+|$)/);
  const first = m ? m[0] : '';
  const rest = text.slice(first.length);
  const tokens = rest.split(/(\s+)/);
  let wi = 0, blanks = 0; const parts = [];
  for (const tok of tokens) {
    if (!tok) continue;
    if (/^\s+$/.test(tok)) { parts.push({ t: tok }); continue; }
    const mm = tok.match(/^([^A-Za-z]*)([A-Za-z]+)([^A-Za-z]*)$/);
    wi++;
    if (!mm) { parts.push({ t: tok }); continue; }
    const [, pre, word, post] = mm;
    if (wi % 2 === 0 && blanks < 10 && word.length >= 2) {
      const keep = Math.floor(word.length / 2);
      parts.push({ t: pre }); parts.push({ blank: true, word, keep: word.slice(0, keep), miss: word.slice(keep) }); parts.push({ t: post });
      blanks++;
    } else parts.push({ t: tok });
  }
  return { first, parts };
}
Tasks.ctw = {
  render(el, item, ctx) {
    const { first, parts } = buildCtw(item.text);
    let bi = 0;
    const html = parts.map((p) => {
      if (!p.blank) return esc(p.t);
      const i = bi++;
      return `<span class="nowrap">${esc(p.keep)}<input class="ctw-input" data-i="${i}" maxlength="${p.miss.length}" size="${p.miss.length}" style="width:${p.miss.length * 1.05 + 0.6}em" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="${'_'.repeat(p.miss.length)}"><span class="ctw-fix" data-f="${i}"></span></span>`;
    }).join('');
    const blanks = parts.filter((p) => p.blank);
    el.innerHTML = `${taskHead('ctw', item.topic ? `<span class="muted small">· ${esc(item.topic)}</span>` : '')}
      <div class="directions">Fill in the missing letters in the paragraph. <span class="muted">(Complète les lettres manquantes : chaque « _ » = une lettre.)</span></div>
      <div class="card"><div class="passage"><p>${esc(first)}${html}</p></div></div>`;
    const inputs = $$('.ctw-input', el);
    inputs.forEach((inp, i) => {
      inp.addEventListener('input', () => { inp.value = inp.value.replace(/[^A-Za-z]/g, ''); if (inp.value.length >= +inp.maxLength && inputs[i + 1]) inputs[i + 1].focus(); });
      inp.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && !inp.value && inputs[i - 1]) { e.preventDefault(); inputs[i - 1].focus(); }
        if (e.key === 'ArrowRight' && inp.selectionStart === inp.value.length && inputs[i + 1]) inputs[i + 1].focus();
        if (e.key === 'ArrowLeft' && inp.selectionStart === 0 && inputs[i - 1]) inputs[i - 1].focus();
      });
    });
    setTimeout(() => inputs[0] && inputs[0].focus(), 50);
    const grade = () => {
      const wrong = []; let ok = 0;
      blanks.forEach((b, i) => { if (inputs[i].value.trim().toLowerCase() === b.miss.toLowerCase()) ok++; else wrong.push({ q: i, word: b.word, given: b.keep + inputs[i].value }); });
      return { ok, wrong };
    };
    actionBar(el, ctx, {
      canSubmit: () => inputs.every((i) => i.value.length),
      onCheck: () => {
        blanks.forEach((b, i) => {
          const good = inputs[i].value.trim().toLowerCase() === b.miss.toLowerCase();
          inputs[i].classList.add(good ? 'ok' : 'ko'); inputs[i].readOnly = true;
          if (!good) $(`[data-f="${i}"]`, el).textContent = ' ' + b.word;
        });
        const g = grade();
        el.querySelector('.card').insertAdjacentHTML('afterend', `<div class="callout ${g.ok >= 8 ? 'good' : g.ok >= 6 ? 'warn' : 'bad'} mt"><b>${g.ok}/10</b> — ${g.ok >= 9 ? 'Niveau C1 sur cette tâche.' : g.ok >= 7 ? 'Solide (B2+). Revois les mots manqués.' : 'Travaille la morphologie : suffixes, familles de mots, mots-outils.'}${item.note ? `<br><span class="small">${item.note}</span>` : ''}</div>`);
      },
      onNext: () => { const g = grade(); ctx.onDone({ score: g.ok / 10, n: 10, diff: item.diff, wrong: g.wrong }); },
    });
  },
};

/* Read in Daily Life */
function renderDoc(doc) {
  const k = doc.kind || 'notice';
  if (k === 'email') return `<div class="doc"><div class="doc-head"><div><b>From:</b> ${doc.from}</div><div><b>To:</b> ${doc.to}</div><div><b>Subject:</b> ${doc.subject}</div></div>${doc.body}</div>`;
  if (k === 'chat' || k === 'sms') return `<div class="doc sms">${doc.head ? `<div class="doc-head">${doc.head}</div>` : ''}${doc.msgs.map((m) => `<div style="margin-bottom:8px"><b>${m[0]}</b> <span class="muted small">${m[2] || ''}</span><div class="bubble" style="background:var(--surface)">${m[1]}</div></div>`).join('')}</div>`;
  return `<div class="doc">${doc.head ? `<div class="doc-head">${doc.head}</div>` : ''}${doc.title ? `<h3>${doc.title}</h3>` : ''}${doc.body}</div>`;
}
Tasks.dl = {
  render(el, item, ctx) {
    el.innerHTML = `${taskHead('dl', `<span class="muted small">· ${esc(item.label || '')}</span>`)}
      <div class="directions">Read the text and answer the questions.</div>
      <div class="split"><div class="sticky">${renderDoc(item.doc)}</div><div class="qs"></div></div>`;
    const mcq = renderMCQ($('.qs', el), item.qs, ctx);
    actionBar(el, ctx, {
      canSubmit: mcq.complete, onCheck: () => mcq.reveal(),
      onNext: () => { const r = mcq.result(); ctx.onDone({ score: r.ok / r.total, n: r.total, diff: item.diff, wrong: r.wrong }); },
    });
  },
};

/* Read an Academic Passage */
Tasks.ap = {
  render(el, item, ctx) {
    el.innerHTML = `${taskHead('ap', `<span class="muted small">· ${esc(item.topic || '')}</span>`)}
      <div class="directions">Read the passage and answer the questions.</div>
      <div class="split"><div class="card sticky"><h3>${esc(item.title)}</h3><div class="passage">${item.text.split(/\n\n+/).map((p) => `<p>${p}</p>`).join('')}</div></div><div class="qs"></div></div>`;
    const mcq = renderMCQ($('.qs', el), item.qs, ctx);
    actionBar(el, ctx, {
      canSubmit: mcq.complete, onCheck: () => mcq.reveal(),
      onNext: () => { const r = mcq.result(); ctx.onDone({ score: r.ok / r.total, n: r.total, diff: item.diff, wrong: r.wrong }); },
    });
  },
};

/* =========================================================
   LISTENING
   ========================================================= */
function audioBox(el, { avatar = '🎧', label = '', ctx, segments, onEnded, allowReplay }) {
  const box = h(`<div class="audio-box"><div class="speaker-avatar">${avatar}</div><div style="flex:1"><div class="small t2">${label}</div><div class="row" style="margin-top:6px"><div class="wave"><i></i><i></i><i></i><i></i><i></i></div><span class="st small muted">Prêt</span></div></div><div class="ctl"></div></div>`);
  el.appendChild(box);
  const wave = $('.wave', box), st = $('.st', box), ctl = $('.ctl', box);
  let plays = 0; const voices = Voice.cast([...new Set(segments.map((s) => s.g || 'W'))]);
  const play = async () => {
    plays++; ctl.innerHTML = ''; wave.classList.add('on'); st.textContent = 'Écoute…';
    ctx.onAudio && ctx.onAudio(true);
    await Voice.play(segments, { voices });
    wave.classList.remove('on'); ctx.onAudio && ctx.onAudio(false);
    st.textContent = allowReplay ? `Écouté ${plays}×` : 'Terminé (une seule écoute, comme au test)';
    if (allowReplay) ctl.innerHTML = '<button class="btn sm">↻ Réécouter</button>', $('button', ctl).onclick = play;
    if (plays === 1) onEnded && onEnded();
  };
  ctl.innerHTML = '<button class="btn primary">▶ Écouter</button>';
  $('button', ctl).onclick = play;
  setTimeout(() => { if (box.isConnected && !plays) play(); }, 600); // lecture automatique, comme au test
  return { play, voices };
}
function transcriptHtml(segments, names = {}) {
  return `<details class="fold mt"><summary>Transcription</summary><div class="transcript mt">${segments.map((s) => `<p>${names[s.g] ? `<b>${names[s.g]} :</b> ` : ''}${esc(s.t)}</p>`).join('')}</div></details>`;
}

Tasks.lcr = {
  render(el, item, ctx) {
    el.innerHTML = `${taskHead('lcr')}<div class="directions">Listen to what a person says and choose the best response.</div>`;
    const segs = [{ t: item.p, g: item.g || 'W' }];
    const qwrap = h('<div class="qs" style="display:none"></div>');
    audioBox(el, { avatar: item.g === 'M' ? '👨' : '👩', label: 'Écoute la phrase, puis choisis la meilleure réponse.', ctx, segments: segs, allowReplay: ctx.mode !== 'exam' && Store.s.settings.replay, onEnded: () => { qwrap.style.display = ''; bar.btn.disabled = false; } });
    el.appendChild(qwrap);
    const mcq = renderMCQ(qwrap, [{ q: 'Choose the best response.', o: item.o, a: item.a, x: item.x }], ctx);
    const bar = actionBar(el, ctx, {
      canSubmit: mcq.complete,
      onCheck: () => { mcq.reveal(); qwrap.insertAdjacentHTML('beforeend', `<div class="transcript mt"><b>Phrase entendue :</b> ${esc(item.p)}</div>`); },
      onNext: () => { const r = mcq.result(); ctx.onDone({ score: r.ok, n: 1, diff: item.diff, wrong: r.wrong }); },
    });
    bar.btn.disabled = true; // pas de réponse avant la fin de l'audio
  },
};

function listeningSet(type, labelFn) {
  return {
    render(el, item, ctx) {
      const segs = item.lines ? item.lines.map((l) => ({ t: l[1], g: l[0] })) : [{ t: item.text, g: item.g || 'W' }];
      el.innerHTML = `${taskHead(type)}<div class="directions">${esc(item.ctx)}</div>`;
      const qwrap = h('<div class="qs" style="display:none"></div>');
      let bar = null;
      const ab = audioBox(el, { avatar: labelFn(item), label: esc(item.ctx), ctx, segments: segs, allowReplay: ctx.mode !== 'exam' && Store.s.settings.replay, onEnded: () => { qwrap.style.display = ''; if (bar) bar.btn.disabled = false; } });
      if (ctx.mode !== 'exam') el.appendChild(h('<p class="small muted">Astuce : prends des notes sur papier pendant l\'écoute (autorisé au vrai test). Les questions n\'apparaissent qu\'après l\'audio.</p>'));
      el.appendChild(qwrap);
      const mcq = renderMCQ(qwrap, item.qs, ctx);
      bar = actionBar(el, ctx, {
        canSubmit: mcq.complete,
        onCheck: () => { mcq.reveal(); qwrap.insertAdjacentHTML('beforeend', transcriptHtml(segs, item.names || {})); },
        onNext: () => { const r = mcq.result(); ctx.onDone({ score: r.ok / r.total, n: r.total, diff: item.diff, wrong: r.wrong }); },
      });
      if (qwrap.style.display === 'none') bar.btn.disabled = true;
      return ab;
    },
  };
}
Tasks.conv = listeningSet('conv', () => '👥');
Tasks.ann = listeningSet('ann', () => '📢');
Tasks.talk = listeningSet('talk', () => '🎓');

/* =========================================================
   WRITING
   ========================================================= */
function parseBas(b) {
  const parts = []; const re = /\[([^\]]+)\]/g; let last = 0, m;
  while ((m = re.exec(b))) { if (m.index > last) parts.push({ fixed: b.slice(last, m.index) }); parts.push({ chunk: m[1] }); last = re.lastIndex; }
  if (last < b.length) parts.push({ fixed: b.slice(last) });
  return parts;
}
Tasks.bas = {
  render(el, item, ctx) {
    const parts = parseBas(item.b);
    const chunks = parts.filter((p) => p.chunk).map((p) => p.chunk);
    const bank = shuffle(chunks.concat(item.x ? [item.x] : []).map((c, i) => ({ c, i })));
    const slots = new Array(chunks.length).fill(null);
    el.innerHTML = `${taskHead('bas')}<div class="directions">Make an appropriate sentence by putting the words in order. <span class="muted">(Clique sur les blocs dans l'ordre ; clique sur un bloc placé pour le retirer.${item.x ? ' Attention : un bloc est en trop.' : ''})</span></div>
      <div class="card"><div class="bas-context"><div class="speaker-avatar" style="width:40px;height:40px;font-size:18px">🙂</div><div class="bubble">${esc(item.a)}</div></div>
      <div class="bas-context"><div class="speaker-avatar" style="width:40px;height:40px;font-size:18px">🧑‍🎓</div><div class="bas-line"></div></div>
      <div class="bank"></div><div class="fb"></div></div>`;
    const line = $('.bas-line', el), bankEl = $('.bank', el);
    let locked = false;
    const draw = () => {
      let si = 0;
      line.innerHTML = parts.map((p) => {
        if (p.fixed) return `<span>${esc(p.fixed.trim())}</span>`;
        const i = si++; const s = slots[i];
        return `<span class="slot" data-s="${i}">${s ? `<button class="chunk" data-b="${s.i}">${esc(s.c)}</button>` : ''}</span>`;
      }).join('');
      bankEl.innerHTML = bank.map((b) => `<button class="chunk ${slots.includes(b) ? 'used' : ''}" data-b="${b.i}">${esc(b.c)}</button>`).join('');
      $$('.chunk', bankEl).forEach((btn) => btn.onclick = () => { if (locked) return; const b = bank.find((x) => x.i === +btn.dataset.b); const free = slots.indexOf(null); if (free >= 0 && !slots.includes(b)) { slots[free] = b; draw(); } });
      $$('.chunk', line).forEach((btn) => btn.onclick = () => { if (locked) return; const k = slots.findIndex((x) => x && x.i === +btn.dataset.b); if (k >= 0) { slots[k] = null; draw(); } });
    };
    draw();
    const isRight = () => { const got = slots.map((s) => s && s.c); if (got.join('|') === chunks.join('|')) return true; return (item.alt || []).some((alt) => alt.join('|') === got.join('|')); };
    const full = () => parts.map((p) => p.fixed ? p.fixed : p.chunk).join('').replace(/\s+/g, ' ').replace(/\s([?.!,])/g, '$1').trim();
    actionBar(el, ctx, {
      canSubmit: () => !slots.includes(null),
      onCheck: () => {
        locked = true; const ok = isRight();
        $('.fb', el).innerHTML = `<div class="callout ${ok ? 'good' : 'bad'} mt">${ok ? '✓ Correct' : '✗ Réponse attendue'} : <b>${esc(full())}</b>${item.g ? `<div class="small mt">${item.g}</div>` : ''}</div>`;
      },
      onNext: () => { const ok = isRight(); ctx.onDone({ score: ok ? 1 : 0, n: 1, diff: item.diff, wrong: ok ? [] : [{ q: 0, given: slots.map((s) => s && s.c).join(' ') }] }); },
    });
  },
};

/* Éditeur de texte chronométré (Email / Discussion) */
function writingEditor(el, { minutes, ctx, placeholder, onSubmit, head = '' }) {
  const wrap = h(`<div>${head}<textarea class="editor" spellcheck="false" autocorrect="off" autocapitalize="off" placeholder="${esc(placeholder || '')}"></textarea>
    <div class="row mt"><span class="wc">0 mot</span><span class="timer" data-t></span><span class="spacer"></span><button class="btn primary lg">${ctx.mode === 'exam' ? 'Valider et continuer →' : 'Terminer et analyser'}</button></div></div>`);
  el.appendChild(wrap);
  const ta = $('textarea', wrap), wc = $('.wc', wrap), btn = $('button.primary', wrap), tEl = $('[data-t]', wrap);
  const sw = new Stopwatch();
  ta.addEventListener('input', () => { const n = wordCount(ta.value); wc.textContent = n + (n > 1 ? ' mots' : ' mot'); });
  ta.addEventListener('paste', (e) => { if (ctx.mode === 'exam') e.preventDefault(); });
  let done = false;
  const submit = () => { if (done) return; done = true; timer.stop(); btn.disabled = true; ta.readOnly = true; onSubmit(ta.value, sw.sec); };
  const timer = new Countdown(tEl, minutes * 60, {
    onEnd: () => { if (ctx.mode === 'exam') { toast('Temps écoulé'); submit(); } else { tEl.textContent = 'Temps écoulé — termine ta phrase'; tEl.classList.add('low'); } },
  });
  btn.onclick = () => { if (wordCount(ta.value) < 20 && !confirm('Ta réponse est très courte. Valider quand même ?')) return; submit(); };
  setTimeout(() => ta.focus(), 50);
  return { ta };
}

Tasks.email = {
  render(el, item, ctx) {
    el.innerHTML = `${taskHead('email')}
      <div class="directions">You will read some information and use it to write an email. You will have <b>7 minutes</b> to write it.</div>
      <div class="card"><p>${item.s}</p><p><b>Write an email to ${esc(item.to)}. In your email, do the following:</b></p><ul>${item.t.map((t) => `<li>${t}</li>`).join('')}</ul><p class="small muted">Write as much as you can and in complete sentences.</p></div>
      <div class="card"><div class="small t2"><b>To:</b> ${esc(item.toAddr || item.to)}<br><b>Subject:</b> ${esc(item.subj || '')}</div><div class="w-area mt"></div></div>`;
    writingEditor($('.w-area', el), {
      minutes: 7, ctx, placeholder: 'Dear …,',
      onSubmit: (text, sec) => {
        const prod = { kind: 'email', type: 'email', id: item.id, text, sec, words: wordCount(text) };
        if (ctx.mode === 'exam') return ctx.onDone({ pending: true, production: prod, n: 5, diff: 3 });
        Grade.panel(el, prod, item, (score) => ctx.onDone({ score: score / 5, n: 5, diff: 3, production: prod }));
      },
    });
  },
};
const AVA_COLORS = ['#4338ca', '#c2410c', '#0f766e', '#a21caf'];
Tasks.disc = {
  render(el, item, ctx) {
    el.innerHTML = `${taskHead('disc')}
      <div class="directions">Your professor is teaching a class on <b>${esc(item.course)}</b>. Write a post responding to the professor's question. In your response, you should express and support your opinion and make a contribution to the discussion in your own words. <b>10 minutes.</b> An effective response will contain at least 100 words.</div>
      <div class="card discussion">
        <div class="post"><div class="avatar" style="background:${AVA_COLORS[0]}">Pr</div><div><b>${esc(item.prof)}</b><div class="mt" style="margin-top:4px">${item.q}</div></div></div>
        ${item.st.map((s, i) => `<div class="post"><div class="avatar" style="background:${AVA_COLORS[i + 1]}">${esc(s[0][0])}</div><div><b>${esc(s[0])}</b><div style="margin-top:4px">${s[1]}</div></div></div>`).join('')}
      </div><div class="card"><div class="w-area"></div></div>`;
    writingEditor($('.w-area', el), {
      minutes: 10, ctx, placeholder: 'Your response…',
      onSubmit: (text, sec) => {
        const prod = { kind: 'disc', type: 'disc', id: item.id, text, sec, words: wordCount(text) };
        if (ctx.mode === 'exam') return ctx.onDone({ pending: true, production: prod, n: 5, diff: 3 });
        Grade.panel(el, prod, item, (score) => ctx.onDone({ score: score / 5, n: 5, diff: 3, production: prod }));
      },
    });
  },
};

/* =========================================================
   SPEAKING
   ========================================================= */
function ringHtml(total) {
  return `<div class="ring"><svg width="120" height="120"><circle cx="60" cy="60" r="52" stroke="var(--surface-2)" stroke-width="10" fill="none"/><circle class="arc" cx="60" cy="60" r="52" stroke="var(--bad)" stroke-width="10" fill="none" stroke-dasharray="326.7" stroke-dashoffset="0" stroke-linecap="round"/></svg><div class="lbl">${total}</div></div>`;
}
async function recordFor(stage, seconds, { label = 'Parle maintenant', live = true } = {}) {
  stage.innerHTML = `<div class="center"><div class="row" style="justify-content:center">${ringHtml(seconds)}</div><div class="mt"><b style="color:var(--bad)">● ${label}</b></div><div class="live small muted mt" style="min-height:40px;max-width:620px;margin:10px auto 0"></div><button class="btn sm mt stopb">J'ai terminé</button></div>`;
  await beep();
  const rec = new Recorder();
  await rec.start({ asr: true, onText: live ? (t) => { $('.live', stage).textContent = t; } : null });
  const arc = $('.arc', stage), lbl = $('.lbl', stage);
  const t0 = Date.now();
  await new Promise((res) => {
    const iv = setInterval(() => {
      const el = (Date.now() - t0) / 1000; const left = Math.max(0, seconds - el);
      lbl.textContent = Math.ceil(left); arc.setAttribute('stroke-dashoffset', String(326.7 * (el / seconds)));
      if (left <= 0) { clearInterval(iv); res(); }
    }, 100);
    $('.stopb', stage).onclick = () => { clearInterval(iv); res(); };
    App.onLeave(() => { clearInterval(iv); res(); });
  });
  stage.innerHTML = '<div class="center muted">Traitement…</div>';
  const out = await rec.stop();
  if (out.micError) toast('Micro inaccessible : autorise le micro dans le navigateur.');
  return out;
}

Tasks.rep = {
  render(el, item, ctx) {
    el.innerHTML = `${taskHead('rep')}
      <div class="directions">${esc(item.ctx)} <br>You will hear each sentence <b>once</b>, with no text. Repeat it exactly as you heard it. <span class="muted">(Répète mot pour mot, avec le même rythme et la même intonation.)</span></div>
      <div class="card"><div class="row"><span class="speaker-avatar">${item.g === 'M' ? '👨‍🏫' : '👩‍🏫'}</span><div><b>Sentence <span class="k">1</span> / ${item.s.length}</b><div class="small muted">Écoute → bip → répète</div></div></div><div class="stage mt2"></div></div>`;
    const stage = $('.stage', el); const results = [];
    const voices = { [item.g || 'W']: Voice.pick(item.g || 'W') };
    const start = h(`<div class="center"><button class="btn primary lg">▶ Commencer (7 phrases)</button><p class="small muted mt">Micro requis. Mets un casque pour que ton micro n'enregistre pas la voix de l'ordinateur.</p></div>`);
    stage.appendChild(start);
    const run = async () => {
      for (let i = 0; i < item.s.length; i++) {
        $('.k', el).textContent = i + 1;
        stage.innerHTML = '<div class="center"><div class="wave on" style="justify-content:center"><i></i><i></i><i></i><i></i><i></i></div><p class="muted">Écoute…</p></div>';
        ctx.onAudio && ctx.onAudio(true);
        await Voice.play([{ t: item.s[i], g: item.g || 'W' }], { voices });
        ctx.onAudio && ctx.onAudio(false);
        if (!el.isConnected) return;
        const secs = Math.round(clamp(wordCount(item.s[i]) * 0.55 + 4, 6, 18));
        const out = await recordFor(stage, secs, { label: 'Répète maintenant', live: ctx.mode !== 'exam' });
        const al = out.transcript ? alignWords(item.s[i], out.transcript) : null;
        results.push({ target: item.s[i], transcript: out.transcript, url: out.url, asr: out.asr && !!out.transcript, acc: al ? al.acc : null, ops: al ? al.ops : null, score: al ? accToFive(al.acc) : null });
        if (!el.isConnected) return;
      }
      finish();
    };
    $('button', start).onclick = () => run();
    if (ctx.mode === 'exam') setTimeout(() => run(), 600);
    const finish = () => {
      const needSelf = results.some((r) => r.score == null);
      const prod = { kind: 'rep', type: 'rep', id: item.id, results };
      if (ctx.mode === 'exam') {
        const auto = needSelf ? null : avg(results.map((r) => r.score)) / 5;
        return ctx.onDone(auto == null ? { pending: true, production: prod, n: 7, diff: 3 } : { score: auto, n: 7, diff: 3, production: prod });
      }
      Grade.repPanel(stage, prod, (score5) => ctx.onDone({ score: score5 / 5, n: 7, diff: 3, production: prod }));
    };
  },
};

Tasks.int = {
  render(el, item, ctx) {
    el.innerHTML = `${taskHead('int')}
      <div class="directions">${esc(item.ctx)}<br>You will be asked <b>4 questions</b>. There is <b>no preparation time</b>: after each question, you have <b>45 seconds</b> to answer.</div>
      <div class="card"><div class="row"><span class="speaker-avatar">${item.g === 'M' ? '🧑‍💼' : '👩‍💼'}</span><div><b>Question <span class="k">1</span> / 4</b><div class="small muted">Interviewer · ${esc(item.topic || '')}</div></div></div><div class="qtext mt"></div><div class="stage mt2"></div></div>`;
    const stage = $('.stage', el), qtext = $('.qtext', el); const results = [];
    const voices = { [item.g || 'W']: Voice.pick(item.g || 'W') };
    const start = h(`<div class="center"><button class="btn primary lg">▶ Commencer l'entretien</button><p class="small muted mt">Structure conseillée (45 s) : réponse directe → raison + exemple précis → nuance/2e idée → phrase de conclusion.</p></div>`);
    stage.appendChild(start);
    const run = async () => {
      for (let i = 0; i < item.q.length; i++) {
        $('.k', el).textContent = i + 1;
        qtext.innerHTML = ctx.mode === 'exam' ? '' : `<details class="fold"><summary class="small">Afficher le texte de la question</summary><p class="mt">${esc(item.q[i])}</p></details>`;
        stage.innerHTML = '<div class="center"><div class="wave on" style="justify-content:center"><i></i><i></i><i></i><i></i><i></i></div><p class="muted">L\'interviewer parle…</p></div>';
        ctx.onAudio && ctx.onAudio(true);
        await Voice.play([{ t: item.q[i], g: item.g || 'W' }], { voices });
        ctx.onAudio && ctx.onAudio(false);
        if (!el.isConnected) return;
        const out = await recordFor(stage, 45, { label: 'Réponds maintenant (45 s)', live: ctx.mode !== 'exam' });
        results.push({ q: item.q[i], transcript: out.transcript, url: out.url, duration: out.duration, asr: out.asr });
        if (!el.isConnected) return;
      }
      qtext.innerHTML = '';
      const prod = { kind: 'int', type: 'int', id: item.id, results };
      if (ctx.mode === 'exam') return ctx.onDone({ pending: true, production: prod, n: 4, diff: 3 });
      Grade.panel(stage, prod, item, (score) => ctx.onDone({ score: score / 5, n: 4, diff: 3, production: prod }));
    };
    $('button', start).onclick = () => run();
    if (ctx.mode === 'exam') setTimeout(() => run(), 600);
  },
};

/* =========================================================
   CORRECTION DES PRODUCTIONS (Writing / Speaking)
   ========================================================= */
const FILLERS = /\b(um+|uh+|erm|hmm+|euh|like|you know|i mean|kind of|sort of)\b/gi;
const LINKERS = ['however', 'moreover', 'furthermore', 'therefore', 'consequently', 'nevertheless', 'nonetheless', 'whereas', 'although', 'even though', 'for instance', 'for example', 'in addition', 'on the other hand', 'as a result', 'in contrast', 'admittedly', 'that said', 'this is why', 'in other words', 'to illustrate', 'not only', 'which means', 'given that', 'provided that', 'unless', 'while', 'thus', 'hence', 'ultimately', 'overall', 'in fact', 'indeed', 'besides', 'on top of that', 'what is more', 'as long as', 'rather than', 'instead of', 'by contrast', 'similarly', 'likewise', 'first of all', 'to begin with', 'finally', 'in conclusion', 'to sum up', 'all in all', 'as a matter of fact', 'specifically', 'in particular', 'particularly'];
function analyzeText(text, kind) {
  const words = normWords(text); const n = wordCount(text);
  const sentences = text.split(/[.!?]+\s/).filter((s) => s.trim().length > 3);
  const low = ' ' + text.toLowerCase().replace(/[’]/g, "'") + ' ';
  const linkers = LINKERS.filter((l) => low.includes(' ' + l + ' ') || low.includes(' ' + l + ',') || low.includes(l + ' '));
  const content = words.filter((w) => w.length > 3);
  const freq = {}; content.forEach((w) => freq[w] = (freq[w] || 0) + 1);
  const repeated = Object.entries(freq).filter(([w, c]) => c >= 4 && !['that', 'this', 'with', 'they', 'have', 'would', 'will', 'there', 'their', 'what', 'which', 'because', 'about', 'from', 'more', 'when', 'your', 'also', 'were', 'been', 'than', 'them', 'into', 'some', 'could', 'should'].includes(w)).map(([w, c]) => `${w} (${c}×)`);
  const ttr = content.length ? new Set(content).size / content.length : 0;
  const gallicisms = (CONTENT.frenchTraps || []).filter((t) => new RegExp(t.re, 'i').test(text));
  const fillers = (text.match(FILLERS) || []).length;
  const iThink = (low.match(/\bi think\b/g) || []).length;
  const contractions = (text.match(/\b\w+'(s|re|ve|ll|d|t|m)\b/gi) || []).length;
  return { n, sentences: sentences.length, avgLen: sentences.length ? n / sentences.length : 0, linkers, repeated, ttr, gallicisms, fillers, iThink, contractions };
}
const RUBRICS = {
  email: [
    [5, 'Pleinement réussi : les 3 points traités et développés, ton et registre parfaitement adaptés au destinataire, structures variées, vocabulaire précis et idiomatique, quasiment aucune erreur.'],
    [4, 'Globalement réussi : les 3 points traités, registre adapté, bonne variété, quelques erreurs mineures qui ne gênent pas.'],
    [3, 'Partiellement réussi : un point peu développé ou manquant, ou registre inégal ; erreurs visibles de grammaire/vocabulaire.'],
    [2, 'Surtout insuffisant : plusieurs points manquants ou flous, erreurs fréquentes qui gênent la compréhension.'],
    [1, 'Insuffisant : très peu de contenu pertinent, langage très limité.'],
    [0, 'Vide, hors sujet ou recopié.'],
  ],
  disc: [
    [5, 'Contribution pertinente et très claire ; idée nouvelle (pas un simple écho des étudiants) ; explications, exemples et détails bien développés ; syntaxe variée ; vocabulaire précis et idiomatique ; quasiment aucune erreur.'],
    [4, 'Contribution pertinente et facile à suivre ; développement suffisant ; bonne variété de structures ; quelques erreurs sans gêne.'],
    [3, 'Globalement pertinente mais développement partiel ou certaines parties floues ; variété limitée ; erreurs notables.'],
    [2, 'Tentative peu développée ; idées floues ou peu reliées ; erreurs fréquentes.'],
    [1, 'Très peu pertinent ou compréhensible.'],
    [0, 'Vide, hors sujet, recopié.'],
  ],
  int: [
    [5, 'Réponses pertinentes et bien développées ; débit fluide avec de rares hésitations ; prononciation claire, intonation naturelle ; grammaire et vocabulaire variés et précis.'],
    [4, 'Réponses pertinentes et assez développées ; quelques hésitations ; globalement intelligible ; bonne variété, quelques erreurs.'],
    [3, 'Réponses pertinentes mais peu développées ; pauses fréquentes ; erreurs de prononciation ou de grammaire qui demandent un effort à l\'auditeur.'],
    [2, 'Réponses courtes, peu reliées ; débit haché ; intelligibilité limitée.'],
    [1, 'Très peu de contenu, largement inintelligible.'],
    [0, 'Pas de réponse ou hors sujet.'],
  ],
};
const GRADE_SCHEMA = {
  type: 'object',
  properties: {
    score: { type: 'number', description: 'Score on the official 0-5 task scale, in 0.5 steps' },
    band_estimate: { type: 'number', description: 'Equivalent TOEFL 2026 band 1-6 for this skill' },
    cefr: { type: 'string' },
    summary: { type: 'string', description: 'French, 2-3 sentences' },
    strengths: { type: 'array', items: { type: 'string' } },
    improvements: { type: 'array', items: { type: 'string' } },
    corrections: { type: 'array', items: { type: 'object', properties: { original: { type: 'string' }, corrected: { type: 'string' }, explanation: { type: 'string' } }, required: ['original', 'corrected', 'explanation'], additionalProperties: false } },
    upgraded_version: { type: 'string', description: 'The candidate response rewritten at C1 level (5/5), keeping their ideas' },
  },
  required: ['score', 'band_estimate', 'cefr', 'summary', 'strengths', 'improvements', 'corrections', 'upgraded_version'],
  additionalProperties: false,
};
const Grade = {
  buildPrompt(prod, item) {
    const target = Store.s.profile ? `The candidate targets a total score of ${Store.s.profile.target120 || 105}/120 (band ${Estimator.targetBand()}, CEFR C1) for admission to the ESCP Master in Finance. They are a native French speaker.` : 'The candidate is a native French speaker targeting CEFR C1.';
    const system = `You are an experienced, strict and fair TOEFL iBT rater, expert in the TOEFL iBT format introduced in January 2026 (1-6 band scale; Writing and Speaking tasks scored 0-5 by trained AI scoring models calibrated on human raters). ${target}
Grade exactly like the official ETS rubric for the task. Do not inflate scores. Pay special attention to errors typical of French speakers (false friends, word order, prepositions, uncountable nouns, tenses such as present perfect vs. simple past, "since/for", missing third-person -s).
Write summary, strengths, improvements and explanations in FRENCH. Write corrections and upgraded_version in ENGLISH. List up to 10 of the most important corrections.`;
    const rub = (k) => RUBRICS[k].map(([s, d]) => `${s}: ${d}`).join('\n');
    let prompt = '';
    if (prod.kind === 'email') {
      prompt = `TASK: TOEFL 2026 "Write an Email" (7 minutes).\nSituation: ${strip(item.s)}\nWrite an email to ${item.to}. In your email, do the following:\n- ${item.t.map(strip).join('\n- ')}\n\nRUBRIC (0-5, summarized, in French):\n${rub('email')}\n\nCANDIDATE EMAIL (${prod.words} words, written in ${Math.round(prod.sec / 60)} min):\n"""\n${prod.text}\n"""`;
    } else if (prod.kind === 'disc') {
      prompt = `TASK: TOEFL 2026 "Write for an Academic Discussion" (10 minutes, at least 100 words recommended).\nCourse: ${item.course}\nProfessor (${item.prof}): ${strip(item.q)}\n${item.st.map((s) => `Student ${s[0]}: ${strip(s[1])}`).join('\n')}\n\nRUBRIC (0-5, summarized, in French):\n${rub('disc')}\n\nCANDIDATE POST (${prod.words} words):\n"""\n${prod.text}\n"""`;
    } else if (prod.kind === 'int') {
      prompt = `TASK: TOEFL 2026 Speaking "Take an Interview" — 4 questions, no preparation time, 45 seconds per answer. Context: ${item.ctx}\nIMPORTANT: you only have an automatic speech-recognition transcript (no audio): judge content, development, grammar, vocabulary and apparent fluency (length, fillers, broken sentences). Mention in the summary that pronunciation could not be judged. Speech recognition may miss or distort some words: do not penalize obvious recognition errors.\n\nRUBRIC (0-5, summarized, in French):\n${rub('int')}\n\n${prod.results.map((r, i) => `Q${i + 1}: ${r.q}\nTRANSCRIPT (${wordCount(r.transcript || '')} words in ${Math.round(r.duration || 45)} s): """${r.transcript || '(no speech recognized)'}"""`).join('\n\n')}\n\nGive ONE overall score for the 4 answers. For upgraded_version, give a model C1 answer for each question (label Q1..Q4).`;
    }
    return { system, prompt, schema: GRADE_SCHEMA };
  },
  async ai(prod, item) {
    const p = this.buildPrompt(prod, item);
    const r = await fetch('/api/grade', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) });
    const j = await r.json(); if (!r.ok) throw new Error(j.error + (j.detail ? ' — ' + j.detail.slice(0, 200) : ''));
    return j.result;
  },
  copyPrompt(prod, item) {
    const p = this.buildPrompt(prod, item);
    const text = `${p.system}\n\n${p.prompt}\n\nRéponds avec : la note /5, la bande estimée (1-6), le niveau CECRL, un résumé, les points forts, les axes d'amélioration, les corrections (original → corrigé + explication) et une version améliorée niveau C1.`;
    navigator.clipboard.writeText(text).then(() => toast('Prompt copié : colle-le dans gemini.google.com (ou ChatGPT / Claude)'), () => { prompt('Copie ce texte :', text); });
  },
  renderAi(res) {
    return `<div class="callout"><div class="row"><b style="font-size:20px">${res.score}/5</b><span class="cefr">${esc(res.cefr)}</span><span class="muted">≈ bande ${fmtBand(res.band_estimate)}</span></div><p class="mt" style="margin-bottom:0">${esc(res.summary)}</p></div>
      <div class="grid g2 mt"><div><h4>Points forts</h4><ul class="fb-list">${res.strengths.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div><div><h4>À améliorer</h4><ul class="fb-list">${res.improvements.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></div></div>
      ${res.corrections.length ? `<h4 class="mt">Corrections</h4><div class="corr">${res.corrections.map((c) => `<p><span class="o">${esc(c.original)}</span> → <span class="c">${esc(c.corrected)}</span><br><span class="small muted">${esc(c.explanation)}</span></p>`).join('')}</div>` : ''}
      <details class="fold mt"><summary>Ta réponse réécrite au niveau C1</summary><div class="model-answer mt">${esc(res.upgraded_version)}</div></details>`;
  },
  analysisHtml(prod) {
    if (prod.kind === 'int') {
      return prod.results.map((r, i) => {
        const a = analyzeText(r.transcript || '', 'int'); const wpm = r.duration ? Math.round(a.n / (Math.min(45, r.duration) / 60)) : 0;
        return `<div class="card tight mt"><div class="row between"><b>Q${i + 1}.</b><span class="small muted">${a.n} mots · ~${wpm} mots/min · ${a.fillers} hésitation(s)</span></div><p class="small t2">${esc(r.q)}</p>
          ${r.url ? `<audio controls src="${r.url}" style="width:100%"></audio>` : ''}
          <div class="transcript mt">${r.transcript ? esc(r.transcript) : '<i>Aucune transcription (reconnaissance vocale indisponible — utilise Chrome).</i>'}</div>
          <div class="small mt">${a.n < 70 ? '⚠️ Réponse courte : vise 90-120 mots en 45 s (≈ 120-150 mots/min).' : '✓ Longueur correcte.'} ${a.linkers.length ? 'Connecteurs : ' + a.linkers.join(', ') + '.' : 'Aucun connecteur détecté : ajoute « for instance », « on top of that », « that said »…'}</div></div>`;
      }).join('');
    }
    const a = analyzeText(prod.text, prod.kind);
    const tgt = prod.kind === 'email' ? [110, 170] : [120, 180];
    const items = [
      [a.n >= tgt[0], `Longueur : <b>${a.n} mots</b> (visée C1 : ${tgt[0]}-${tgt[1]}). ${a.n < tgt[0] ? 'Trop court pour démontrer un niveau C1 : développe avec un exemple concret.' : ''}`],
      [a.linkers.length >= 4, `Connecteurs logiques : ${a.linkers.length ? a.linkers.join(', ') : 'aucun'} ${a.linkers.length < 4 ? '→ vise 4-6 connecteurs variés.' : ''}`],
      [a.avgLen >= 13 && a.avgLen <= 28, `Longueur moyenne des phrases : ${a.avgLen.toFixed(0)} mots ${a.avgLen < 13 ? '→ combine des phrases (relatives, subordonnées).' : a.avgLen > 28 ? '→ phrases trop longues, risque d\'erreurs.' : ''}`],
      [a.ttr >= 0.6, `Variété lexicale : ${Math.round(a.ttr * 100)} %${a.repeated.length ? ' · répétitions : ' + a.repeated.join(', ') : ''}`],
      [a.iThink <= 1, `« I think » : ${a.iThink}× ${a.iThink > 1 ? '→ varie : I would argue that, In my view, I am convinced that, It seems to me that.' : ''}`],
    ];
    if (prod.kind === 'email') items.push([true, `Contractions : ${a.contractions} ${a.contractions > 3 ? '(ok à l\'oral, mais pour un professeur/un service, reste semi-formel)' : ''}`]);
    return `<ul class="fb-list" style="list-style:none;padding:0">${items.map(([ok, t]) => `<li>${ok ? '✅' : '⚠️'} ${t}</li>`).join('')}</ul>
      ${a.gallicisms.length ? `<div class="callout warn mt"><b>Pièges de francophone détectés :</b><ul class="fb-list">${a.gallicisms.map((g) => `<li><b>${esc(g.bad)}</b> → ${esc(g.good)} <span class="small muted">${esc(g.why)}</span></li>`).join('')}</ul></div>` : '<p class="small tag-good">Aucun gallicisme courant détecté.</p>'}`;
  },
  /* Panneau de correction : analyse auto + IA (si configurée) + auto-évaluation */
  panel(el, prod, item, onScore) {
    const kind = prod.kind;
    const box = h(`<div class="card mt2"><h2>Correction</h2>
      <h3 class="mt">1. Analyse automatique</h3><div class="auto"></div>
      <h3 class="mt">2. Correction détaillée par l'IA (Gemini)</h3><div class="ai"></div>
      <h3 class="mt">3. Modèle niveau C1</h3><div class="model"></div>
      <h3 class="mt">4. Ta note</h3><p class="small muted">Choisis la note qui correspond le mieux (la note de l'IA est présélectionnée si tu l'as utilisée). Sois exigeant : la note alimente ton estimation.</p><div class="rub"></div>
      <div class="row mt"><span class="spacer"></span><button class="btn primary lg go" disabled>Enregistrer et continuer →</button></div></div>`);
    el.appendChild(box);
    $('.auto', box).innerHTML = this.analysisHtml(prod);
    const model = kind === 'int' ? (item.m || []).map((m, i) => `<p><b>Q${i + 1}.</b> ${esc(m)}</p>`).join('') : `<div class="model-answer">${esc(item.m || '')}</div>`;
    $('.model', box).innerHTML = `<details class="fold"><summary>Voir une réponse modèle 5/5</summary><div class="mt">${model || '<p class="muted">—</p>'}</div>${item.tips ? `<p class="small mt"><b>Ce qui fait la différence :</b> ${item.tips}</p>` : ''}</details>`;
    let chosen = null, aiRes = null;
    const rubEl = $('.rub', box);
    rubEl.innerHTML = `<div class="opts">${RUBRICS[kind].map(([s, d]) => `<button class="opt" data-s="${s}"><span class="l">${s}</span><span class="small">${d}</span></button>`).join('')}</div>`;
    const select = (s) => { chosen = s; $$('.opt', rubEl).forEach((b) => b.classList.toggle('sel', +b.dataset.s === Math.floor(s))); $('.go', box).disabled = false; };
    $$('.opt', rubEl).forEach((b) => b.onclick = () => select(+b.dataset.s));
    const aiEl = $('.ai', box);
    const drawAiButtons = () => {
      aiEl.innerHTML = `<div class="row">${Store.ai ? '<button class="btn primary run">✨ Corriger avec Gemini (gratuit)</button>' : '<span class="small muted">Correction automatique non configurée (Réglages → clé API Gemini gratuite).</span>'}<button class="btn cp">📋 Copier le prompt (à coller dans Gemini, ChatGPT ou Claude)</button></div>`;
      $('.cp', aiEl).onclick = () => this.copyPrompt(prod, item);
      const run = $('.run', aiEl); if (run) run.onclick = async () => {
        aiEl.innerHTML = '<p class="muted">Gemini corrige ta production (≈ 10-40 s)…</p>';
        try { aiRes = await this.ai(prod, item); aiEl.innerHTML = this.renderAi(aiRes); select(aiRes.score); }
        catch (e) { aiEl.innerHTML = `<div class="callout bad">${esc(e.message)}</div>`; setTimeout(drawAiButtons, 4000); }
      };
    };
    drawAiButtons();
    $('.go', box).onclick = () => {
      const rec = { id: uid(), ts: Date.now(), kind, itemId: item.id, score: chosen, ai: aiRes, text: prod.text, results: prod.results ? prod.results.map((r) => ({ q: r.q, transcript: r.transcript })) : undefined };
      (kind === 'int' ? Store.s.speakings : Store.s.writings).push(rec); Store.save();
      onScore(chosen);
    };
    box.scrollIntoView({ behavior: 'smooth', block: 'start' });
  },
  repPanel(el, prod, onScore) {
    const rs = prod.results; const needSelf = rs.some((r) => r.score == null);
    el.innerHTML = `<h3>Résultats</h3>${rs.map((r, i) => `<div class="card tight mt"><div class="row between"><b>${i + 1}.</b>${r.score != null ? `<span class="${r.score >= 4 ? 'tag-good' : r.score >= 3 ? '' : 'tag-bad'}">${r.score}/5 · ${Math.round(r.acc * 100)} % des mots</span>` : '<span class="muted small">auto-évaluation</span>'}</div>
      <div class="diff mt">${r.ops ? r.ops.map(([k, w]) => `<span class="${k}">${esc(w)}</span>`).join(' ') : esc(r.target)}</div>
      ${r.transcript ? `<div class="small muted mt">Reconnu : « ${esc(r.transcript)} »</div>` : ''}
      ${r.url ? `<audio controls src="${r.url}" style="width:100%;margin-top:6px"></audio>` : ''}
      ${r.score == null ? `<div class="row mt selfr" data-i="${i}">${[0, 1, 2, 3, 4, 5].map((s) => `<button class="btn sm" data-s="${s}">${s}</button>`).join('')}<span class="small muted">5 = mot pour mot, fluide</span></div>` : ''}</div>`).join('')}
      <p class="small muted mt">Légende : <span class="diff"><span class="hit">mot répété</span> · <span class="miss">mot manqué</span> · <span class="extra">mot ajouté/déformé</span></span>. La reconnaissance vocale peut se tromper sur un accent : réécoute-toi.</p>
      <div class="row mt"><span class="spacer"></span><button class="btn primary lg go" ${needSelf ? 'disabled' : ''}>Continuer →</button></div>`;
    $$('.selfr', el).forEach((row) => $$('button', row).forEach((b) => b.onclick = () => {
      rs[+row.dataset.i].score = +b.dataset.s; $$('button', row).forEach((x) => x.classList.toggle('primary', x === b));
      $('.go', el).disabled = rs.some((r) => r.score == null);
    }));
    $('.go', el).onclick = () => { Store.s.speakings.push({ id: uid(), ts: Date.now(), kind: 'rep', itemId: prod.id, score: avg(rs.map((r) => r.score)), results: rs.map((r) => ({ target: r.target, transcript: r.transcript, score: r.score })) }); Store.save(); onScore(avg(rs.map((r) => r.score))); };
  },
};
function strip(html) { return String(html).replace(/<[^>]+>/g, ''); }
