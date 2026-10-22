/* =========================================================
   TOEFL Prep — mouvement : parallaxe, formes 3D flottantes, inclinaison des cartes
   Aucun effet si l'utilisateur a demandé de réduire les animations.
   ========================================================= */
'use strict';
(function () {
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (calm.matches) return;
  const root = document.documentElement;

  /* formes 3D en arrière-plan */
  const bg = document.createElement('div'); bg.id = 'bg3d';
  const shapes = [[8, 14, 90, 18, 2.4], [86, 10, 60, -22, 3.1], [74, 66, 120, 30, 1.6], [12, 72, 70, -35, 2.8], [46, 8, 44, 40, 3.6], [92, 88, 54, -15, 2.2]];
  shapes.forEach(([x, y, s, k, d], i) => {
    const el = document.createElement('i');
    el.style.cssText = `--x:${x}%;--y:${y}%;--s:${s}px;--k:${k};--d:${(d * 4 + i).toFixed(1)}s;--rx:${20 + i * 11}deg;--ry:${-30 + i * 17}deg`;
    bg.appendChild(el);
  });
  document.body.prepend(bg);

  /* parallaxe douce (une seule écriture par frame) */
  let raf = 0, px = 0, py = 0;
  window.addEventListener('pointermove', (e) => {
    px = e.clientX / innerWidth - 0.5; py = e.clientY / innerHeight - 0.5;
    if (!raf) raf = requestAnimationFrame(() => { raf = 0; root.style.setProperty('--mx', px.toFixed(3)); root.style.setProperty('--my', py.toFixed(3)); });
  }, { passive: true });

  /* inclinaison des cartes cliquables (grandes cartes uniquement, jamais pendant un exercice) */
  const SEL = '.task-card, .plan-block, .card.tilt-me';
  document.addEventListener('pointerover', (e) => {
    const t = e.target.closest && e.target.closest(SEL);
    if (t && !t.classList.contains('tilt')) t.classList.add('tilt');
  }, { passive: true });
  document.addEventListener('pointermove', (e) => {
    const t = e.target.closest && e.target.closest('.tilt');
    if (!t || document.body.classList.contains('in-session')) return;
    const r = t.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    t.style.setProperty('--try', ((x - 0.5) * 9).toFixed(2) + 'deg');
    t.style.setProperty('--trx', ((0.5 - y) * 7).toFixed(2) + 'deg');
    t.style.setProperty('--gx', (x * 100).toFixed(0) + '%'); t.style.setProperty('--gy', (y * 100).toFixed(0) + '%');
    t.classList.add('hot');
  }, { passive: true });
  document.addEventListener('pointerout', (e) => {
    const t = e.target.closest && e.target.closest('.tilt');
    if (!t || (e.relatedTarget && t.contains(e.relatedTarget))) return;
    t.classList.remove('hot'); t.style.setProperty('--try', '0deg'); t.style.setProperty('--trx', '0deg');
  }, { passive: true });
})();
