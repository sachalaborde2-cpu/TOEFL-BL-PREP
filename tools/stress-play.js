// Test de robustesse du vrai Voice.play de l'appli (Edge headless, voix réseau réelles).
// Scénario "enchaîné" : N répliques courtes lues l'une après l'autre (comme les exercices qui s'enchaînent).
// Scénario "interrompu" : on relance une lecture 1,5 s après le début de la précédente (clic sur ▶ pendant l'écoute).
// Usage : node tools/stress-play.js http://localhost:PORT [N=10]
const { spawn } = require('child_process');
const http = require('http');
const base = process.argv[2], N = +process.argv[3] || 10;
const edge = process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const ch = spawn(edge, ['--headless=new', '--remote-debugging-port=9450', '--autoplay-policy=no-user-gesture-required', 'about:blank'], { stdio: 'ignore' });
const get = (p) => new Promise((res, rej) => http.get({ host: '127.0.0.1', port: 9450, path: p }, (r) => { let d = ''; r.on('data', (c) => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  let tabs; for (let i = 0; i < 40; i++) { try { tabs = await get('/json'); if (tabs.length) break; } catch (e) { /* attente */ } await wait(250); }
  const pg = tabs.find((t) => t.type === 'page') || tabs[0]; const ws = new WebSocket(pg.webSocketDebuggerUrl); let id = 0; const pend = {};
  await new Promise((r) => ws.onopen = r);
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d.result); };
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) return 'EXC ' + JSON.stringify(r.exceptionDetails).slice(0, 500); return r.result.value; };
  await send('Page.enable'); await send('Page.navigate', { url: base + '/#/' }); await wait(4000);
  const out = await ev(`(async () => {
    const items = CONTENT.lcr.slice(0, ${N + 12});
    const seg = (it) => [{ t: it.p, g: it.g || 'W' }];
    const res = { chained: { ok: 0, partial: 0, silent: 0, blocked: 0 }, interrupted: { ok: 0, partial: 0, silent: 0, blocked: 0, interruptedFirst: 0 }, details: [] };
    const bucket = (b, r) => { if (r.blocked) b.blocked++; else if (r.total && r.played === r.total) b.ok++; else if (r.played) b.partial++; else if (!r.interrupted) b.silent++; };
    for (let i = 0; i < ${N}; i++) { const r = await Voice.play(seg(items[i])); bucket(res.chained, r); if (!(r.played === r.total)) res.details.push('chained ' + items[i].id + ' ' + JSON.stringify(r)); }
    for (let i = ${N}; i < ${N} + 6; i++) {
      const first = Voice.play(seg(items[i - 6])); await new Promise((r) => setTimeout(r, 1500));
      const second = Voice.play(seg(items[i])); const r1 = await first; const r2 = await second;
      if (r1.interrupted) res.interrupted.interruptedFirst++; bucket(res.interrupted, r2); if (!(r2.played === r2.total)) res.details.push('interrupted ' + items[i].id + ' ' + JSON.stringify(r2));
    }
    return JSON.stringify(res);
  })()`);
  console.log(out);
  ws.close(); ch.kill(); process.exit(0);
})();
