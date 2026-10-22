// Santé de chaque voix anglaise : démarre-t-elle ? combien de temps avant le 1er son ? durée réelle d'une phrase de référence.
const { spawn } = require('child_process');
const http = require('http');
const edge = process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const ch = spawn(edge, ['--headless=new', '--remote-debugging-port=9447', '--autoplay-policy=no-user-gesture-required', 'about:blank'], { stdio: 'ignore' });
const get = (p) => new Promise((res, rej) => http.get({ host: '127.0.0.1', port: 9447, path: p }, (r) => { let d = ''; r.on('data', (c) => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  let tabs; for (let i = 0; i < 40; i++) { try { tabs = await get('/json'); if (tabs.length) break; } catch (e) {} await wait(250); }
  const pg = tabs.find((t) => t.type === 'page') || tabs[0]; const ws = new WebSocket(pg.webSocketDebuggerUrl); let id = 0; const pend = {};
  await new Promise((r) => ws.onopen = r);
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d.result); };
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) return 'EXC ' + JSON.stringify(r.exceptionDetails).slice(0, 400); return r.result.value; };
  await send('Page.enable'); await send('Page.navigate', { url: 'http://127.0.0.1:9447/json/version' }); await wait(1500);
  const res = await ev(`(async () => {
    await new Promise((r) => { const f = () => speechSynthesis.getVoices().length ? r() : 0; f(); speechSynthesis.onvoiceschanged = f; setTimeout(r, 4000); });
    const vs = speechSynthesis.getVoices().filter((v) => /^en[-_]/i.test(v.lang) && /United States|United Kingdom|Australia|Canada|Ireland/.test(v.name));
    const out = [];
    for (const v of vs) {
      const t0 = performance.now(); const r = { voice: v.name.replace('Microsoft ', '').replace(' Online (Natural) - English', ''), start: null, end: null, err: null };
      await new Promise((res) => {
        const u = new SpeechSynthesisUtterance('I was thinking we could meet after the lecture on Thursday, if that works for you.'); u.voice = v; u.lang = v.lang;
        u.onstart = () => { r.start = Math.round(performance.now() - t0); };
        u.onend = () => { r.end = Math.round(performance.now() - t0); res(); };
        u.onerror = (e) => { r.err = e.error; res(); };
        speechSynthesis.speak(u); setTimeout(() => { if (r.end == null && !r.err) r.err = 'TIMEOUT'; res(); }, 14000);
      });
      speechSynthesis.cancel(); out.push(r);
    }
    return JSON.stringify(out);
  })()`);
  const arr = JSON.parse(res);
  for (const r of arr) console.log(r.voice.padEnd(48), 'start', String(r.start).padStart(5), 'end', String(r.end).padStart(5), r.err ? 'ERREUR ' + r.err : '', r.end ? 'durée parole ' + (r.end - r.start) + ' ms' : '');
  ws.close(); ch.kill(); process.exit(0);
})();
