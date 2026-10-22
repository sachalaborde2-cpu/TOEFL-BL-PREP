/* =========================================================
   TOEFL Prep — sélection d'un mot ou d'une expression dans un exercice -> « Mes mots » (vocabulaire)
   Sélectionne du texte (double-clic sur un mot, ou glisse sur une expression), puis clique sur la pastille
   « + Vocabulaire » ou appuie sur la touche V. Le mot est enregistré avec la phrase d'où il vient, puis revient
   en révision espacée. Si une clé Gemini est configurée, la traduction se remplit toute seule.
   ========================================================= */
'use strict';
(function () {
  const pill = document.createElement('button');
  pill.id = 'vocab-pill'; pill.type = 'button'; pill.hidden = true;
  pill.innerHTML = '<span class="plus">+</span> Vocabulaire <kbd>V</kbd>';
  document.body.appendChild(pill);
  let cur = null; // { text, ctx }

  const off = () => location.hash.startsWith('#/vocab') || location.hash.startsWith('#/settings');
  const inField = (n) => { const el = n && (n.nodeType === 3 ? n.parentElement : n); return !!(el && el.closest && el.closest('input, textarea, select, #sidebar, .session-top, #vocab-pill')); };

  /* phrase qui contient la sélection, pour garder le contexte */
  function sentenceAround(range, text) {
    let el = range.commonAncestorContainer; if (el.nodeType === 3) el = el.parentElement;
    const block = el && el.closest ? (el.closest('p, li, td, .bubble, .stem, .passage, .doc, .transcript, .directions, .expl') || el) : null;
    // innerText respecte les sauts de ligne entre blocs (titre, en-tête, paragraphe) : on garde la ligne qui contient la sélection
    const raw = (block ? (block.innerText || block.textContent) : text).split(/[\r\n]+/).map((l) => l.replace(/\s+/g, ' ').trim()).filter(Boolean);
    const line = raw.find((l) => l.toLowerCase().includes(text.toLowerCase())) || raw.join(' ');
    const i = line.toLowerCase().indexOf(text.toLowerCase());
    if (i < 0) return line.slice(0, 300);
    const parts = line.split(/(?<=[.!?])\s+/); let pos = 0;
    for (const p of parts) { const j = line.indexOf(p, pos); if (i >= j && i < j + p.length) return p.slice(0, 300); pos = j + p.length; }
    return line.slice(Math.max(0, i - 100), i + text.length + 100);
  }

  function hide() { pill.hidden = true; cur = null; }

  function update() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.rangeCount || off()) return hide();
    const view = document.getElementById('view');
    const range = sel.getRangeAt(0);
    if (!view || !view.contains(range.commonAncestorContainer) || inField(sel.anchorNode) || inField(sel.focusNode)) return hide();
    const text = sel.toString().replace(/\s+/g, ' ').trim();
    if (text.length < 2 || text.length > 80 || text.split(' ').length > 6 || !/[A-Za-z]/.test(text)) return hide();
    cur = { text, ctx: sentenceAround(range, text) };
    const r = range.getBoundingClientRect(); if (!r.width && !r.height) return hide();
    pill.hidden = false;
    const w = pill.offsetWidth || 150;
    const left = Math.max(8, Math.min(innerWidth - w - 8, r.left + r.width / 2 - w / 2));
    const top = r.top - 46 < 8 ? r.bottom + 10 : r.top - 46;
    pill.style.left = left + 'px'; pill.style.top = top + 'px';
  }

  function add() {
    if (!cur) return;
    const { text, ctx } = cur;
    const r = Vocab.add(text, ctx);
    hide(); const s = window.getSelection(); if (s) s.removeAllRanges();
    if (!r) return;
    if (r.status === 'new') {
      toast(`« ${r.w} » ajouté à ton vocabulaire`);
      if (Store.ai) Vocab.define(r.w).then((res) => { if (res && res.fr) toast(`${r.w} = ${res.fr}`, 3600); });
    } else if (r.status === 'mine') toast(`« ${r.w} » est déjà dans tes mots`);
    else toast(`« ${r.w} » est déjà dans le vocabulaire du programme`);
  }

  pill.addEventListener('mousedown', (e) => e.preventDefault()); // garde la sélection
  pill.addEventListener('click', add);
  document.addEventListener('mouseup', () => setTimeout(update, 10));
  document.addEventListener('touchend', () => setTimeout(update, 250));
  document.addEventListener('keyup', (e) => { if (e.shiftKey || e.key.startsWith('Arrow')) setTimeout(update, 10); });
  document.addEventListener('selectionchange', () => { const s = window.getSelection(); if (!s || s.isCollapsed) hide(); });
  document.addEventListener('scroll', hide, { passive: true, capture: true });
  window.addEventListener('hashchange', hide);
  document.addEventListener('keydown', (e) => {
    if (!cur || e.ctrlKey || e.metaKey || e.altKey || e.key.toLowerCase() !== 'v') return;
    const t = e.target; if (t && /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName)) return;
    e.preventDefault(); add();
  });
})();
