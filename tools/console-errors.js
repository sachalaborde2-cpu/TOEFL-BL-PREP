// Ouvre les pages principales de l'appli dans Edge (headless) et relève toute erreur JavaScript ou 404.
// Usage : node tools/console-errors.js http://localhost:PORT
const { spawn } = require('child_process');
const http = require('http');
const base = process.argv[2];
const edge = process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const ch = spawn(edge, ['--headless=new', '--remote-debugging-port=9451', '--autoplay-policy=no-user-gesture-required', 'about:blank'], { stdio: 'ignore' });
const get = (p) => new Promise((res, rej) => http.get({ host: '127.0.0.1', port: 9451, path: p }, (r) => { let d = ''; r.on('data', (c) => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const ROUTES = ['/', '/plan', '/train', '/mocks', '/vocab', '/vocab/study', '/errors', '/progress', '/guide', '/settings', '/strategy/conv',
  '/practice/ctw?n=1', '/practice/dl?n=1', '/practice/ap?n=1', '/practice/lcr?n=1', '/practice/conv?n=1', '/practice/ann?n=1', '/practice/talk?n=1',
  '/practice/bas?n=1', '/practice/email?n=1', '/practice/disc?n=1', '/practice/rep?n=1', '/practice/int?n=1'];
(async () => {
  let tabs; for (let i = 0; i < 40; i++) { try { tabs = await get('/json'); if (tabs.length) break; } catch (e) { /* attente */ } await wait(250); }
  const pg = tabs.find((t) => t.type === 'page') || tabs[0]; const ws = new WebSocket(pg.webSocketDebuggerUrl); let id = 0; const pend = {}; const errors = []; let cur = '';
  await new Promise((r) => ws.onopen = r);
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pend[d.id]) return pend[d.id](d.result);
    if (d.method === 'Runtime.exceptionThrown') errors.push(cur + ' EXCEPTION ' + (d.params.exceptionDetails.exception ? d.params.exceptionDetails.exception.description : d.params.exceptionDetails.text).slice(0, 220));
    if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') errors.push(cur + ' console.error ' + d.params.args.map((a) => a.value || a.description || '').join(' ').slice(0, 200));
    if (d.method === 'Network.responseReceived' && d.params.response.status >= 400 && !/favicon|api\/progress/.test(d.params.response.url)) errors.push(cur + ' HTTP ' + d.params.response.status + ' ' + d.params.response.url);
  };
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  await send('Page.enable'); await send('Runtime.enable'); await send('Network.enable');
  for (const r of ROUTES) { cur = r; await send('Page.navigate', { url: base + '/#' + r }); await wait(r.startsWith('/practice') || r === '/' ? 2500 : 1200); }
  console.log('pages testées :', ROUTES.length, '· erreurs :', errors.length);
  errors.forEach((e) => console.log(' ✗', e));
  ws.close(); ch.kill(); process.exit(0);
})();
