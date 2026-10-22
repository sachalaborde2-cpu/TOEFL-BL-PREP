/* =========================================================
   TOEFL Prep — mouvement : parallaxe, formes 3D flottantes, inclinaison des cartes
   Aucun effet si l'utilisateur a demandé de réduire les animations.
   ========================================================= */
'use strict';
(function () {
  const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (calm.matches) return;
  const root = document.documentElement;
  let px = 0, py = 0;

  /* formes 3D en arrière-plan */
  const bg = document.createElement('div'); bg.id = 'bg3d';
  const shapes = [[8, 14, 90, 18, 2.4], [86, 10, 60, -22, 3.1], [74, 66, 120, 30, 1.6], [12, 72, 70, -35, 2.8], [46, 8, 44, 40, 3.6], [92, 88, 54, -15, 2.2]];
  shapes.forEach(([x, y, s, k, d], i) => {
    const el = document.createElement('i');
    el.style.cssText = `--x:${x}%;--y:${y}%;--s:${s}px;--k:${k};--d:${(d * 4 + i).toFixed(1)}s;--rx:${20 + i * 11}deg;--ry:${-30 + i * 17}deg`;
    bg.appendChild(el);
  });
  document.body.prepend(bg);

  /* particules lumineuses : petites poussières qui montent doucement et scintillent (canvas léger) */
  const cv = document.createElement('canvas'); cv.id = 'bgparticles'; document.body.prepend(cv);
  const g = cv.getContext('2d');
  let W = 0, H = 0, dots = [], rgb = '222,205,255', last = 0, frame = 0, mxp = 0, myp = 0;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.max(28, Math.min(90, Math.round(W * H / 24000)));
    dots = Array.from({ length: n }, () => ({ x: rnd(0, W), y: rnd(0, H), r: rnd(0.7, 2.6), vy: rnd(5, 20), vx: rnd(-6, 6), ph: rnd(0, 6.28), tw: rnd(0.6, 1.8), z: rnd(0.3, 1) }));
  };
  const draw = (t) => {
    requestAnimationFrame(draw);
    const dt = Math.min(0.05, (t - last) / 1000 || 0.016); if (t - last < 28) return; last = t; // ~35 images/s
    if (++frame % 120 === 1) rgb = getComputedStyle(root).getPropertyValue('--pr').trim() || rgb;
    mxp += (px - mxp) * 0.05; myp += (py - myp) * 0.05;
    g.clearRect(0, 0, W, H);
    for (const d of dots) {
      d.y -= d.vy * d.z * dt; d.x += d.vx * d.z * dt + Math.sin(t / 2400 + d.ph) * 0.12;
      if (d.y < -8) { d.y = H + 8; d.x = rnd(0, W); } if (d.x < -8) d.x = W + 8; else if (d.x > W + 8) d.x = -8;
      const a = 0.18 + 0.5 * (0.5 + 0.5 * Math.sin(t / 1000 * d.tw + d.ph));
      const x = d.x + mxp * 60 * d.z, y = d.y + myp * 40 * d.z, R = d.r * (1 + d.z);
      const gr = g.createRadialGradient(x, y, 0, x, y, R * 4);
      gr.addColorStop(0, `rgba(${rgb},${(a * d.z).toFixed(3)})`); gr.addColorStop(1, `rgba(${rgb},0)`);
      g.fillStyle = gr; g.beginPath(); g.arc(x, y, R * 4, 0, 6.2832); g.fill();
    }
  };
  resize(); window.addEventListener('resize', resize, { passive: true }); requestAnimationFrame(draw);

  /* parallaxe douce (une seule écriture par frame) */
  let raf = 0;
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
