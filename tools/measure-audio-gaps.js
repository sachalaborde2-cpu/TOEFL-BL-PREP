// Mesure les écarts réels entre répliques avec le vrai Voice.play de l'appli (Edge headless, voix réseau réelles).
const { spawn } = require('child_process');
const http = require('http');
const base = process.argv[2]; const ids = (process.argv[3] || 'v01,vza001').split(',');
const edge = process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const ch = spawn(edge, ['--headless=new', '--remote-debugging-port=9448', '--autoplay-policy=no-user-gesture-required', 'about:blank'], { stdio: 'ignore' });
const get = (p) => new Promise((res, rej) => http.get({ host: '127.0.0.1', port: 9448, path: p }, (r) => { let d = ''; r.on('data', (c) => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  let tabs; for (let i = 0; i < 40; i++) { try { tabs = await get('/json'); if (tabs.length) break; } catch (e) {} await wait(250); }
  const pg = tabs.find((t) => t.type === 'page') || tabs[0]; const ws = new WebSocket(pg.webSocketDebuggerUrl); let id = 0; const pend = {};
  await new Promise((r) => ws.onopen = r);
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d.result); };
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) return 'EXC ' + JSON.stringify(r.exceptionDetails).slice(0, 500); return r.result.value; };
  await send('Page.enable'); await send('Page.navigate', { url: base + '/#/' }); await wait(4000);
  for (const itemId of ids) {
    const out = await ev(`(async () => {
      let it = null, type = null; for (const t of ['conv', 'ann', 'talk', 'lcr']) { const f = CONTENT[t].find((x) => x.id === '${itemId}'); if (f) { it = f; type = t; break; } }
      if (!it) return 'introuvable';
      const segs = it.lines ? it.lines.map((l) => ({ t: l[1], g: l[0] })) : [{ t: it.text || it.p, g: it.g || 'W' }];
      const log = []; const T0 = performance.now(); const orig = speechSynthesis.speak.bind(speechSynthesis);
      speechSynthesis.speak = (u) => { const rec = { n: u.text.length, s: null, e: null, err: null }; log.push(rec); u.addEventListener('start', () => rec.s = performance.now() - T0); u.addEventListener('end', () => rec.e = performance.now() - T0); u.addEventListener('error', (ev) => rec.err = ev.error); return orig(u); };
      const t0 = performance.now(); const r = await Voice.play(segs); const total = performance.now() - t0;
      speechSynthesis.speak = orig;
      const gaps = []; for (let i = 1; i < log.length; i++) if (log[i].s != null && log[i - 1].e != null) gaps.push(Math.round(log[i].s - log[i - 1].e));
      const speech = log.reduce((a, x) => a + ((x.e != null && x.s != null) ? x.e - x.s : 0), 0);
      return JSON.stringify({ id: '${itemId}', type, words: segs.map((s) => s.t.split(/\\s+/).length).reduce((a, b) => a + b, 0), turns: segs.length, utterances: log.length, totalMs: Math.round(total), speechMs: Math.round(speech), gapsMs: gaps, meanGap: gaps.length ? Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length) : null, sumGaps: gaps.reduce((a, b) => a + b, 0), errors: log.filter((x) => x.err).map((x) => x.err), result: r });
    })()`);
    console.log(out);
  }
  ws.close(); ch.kill(); process.exit(0);
})();
