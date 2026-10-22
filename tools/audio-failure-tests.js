// Scénarios d'échec audio dans l'appli : lecture bloquée, voix en panne, panne passagère (retry avec autre voix).
const { spawn } = require('child_process');
const http = require('http');
const base = process.argv[2]; const scenario = process.argv[3];
const edge = process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const args = ['--headless=new', '--remote-debugging-port=9449', 'about:blank'];
if (scenario !== 'blocked') args.splice(2, 0, '--autoplay-policy=no-user-gesture-required');
const ch = spawn(edge, args, { stdio: 'ignore' });
const get = (p) => new Promise((res, rej) => http.get({ host: '127.0.0.1', port: 9449, path: p }, (r) => { let d = ''; r.on('data', (c) => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  let tabs; for (let i = 0; i < 40; i++) { try { tabs = await get('/json'); if (tabs.length) break; } catch (e) {} await wait(250); }
  const pg = tabs.find((t) => t.type === 'page') || tabs[0]; const ws = new WebSocket(pg.webSocketDebuggerUrl); let id = 0; const pend = {};
  await new Promise((r) => ws.onopen = r);
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d.result); };
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) return 'EXC ' + JSON.stringify(r.exceptionDetails).slice(0, 500); return r.result.value; };
  // injection AVANT le chargement de l'appli : simule les pannes en remplaçant speechSynthesis.speak
  const patch = {
    blocked: '',
    allfail: `const _s = speechSynthesis.speak.bind(speechSynthesis); speechSynthesis.speak = (u) => { setTimeout(() => u.dispatchEvent(new SpeechSynthesisErrorEvent('error', { utterance: u, error: 'synthesis-failed' })), 50); };`,
    onefail: `const _s = speechSynthesis.speak.bind(speechSynthesis); let n = 0; window.__failedVoice = null; speechSynthesis.speak = (u) => { if (n++ === 0) { window.__failedVoice = u.voice && u.voice.name; setTimeout(() => u.dispatchEvent(new SpeechSynthesisErrorEvent('error', { utterance: u, error: 'synthesis-failed' })), 50); } else _s(u); };`,
  }[scenario] || '';
  await send('Page.enable');
  if (patch) await send('Page.addScriptToEvaluateOnNewDocument', { source: patch });
  await send('Page.navigate', { url: base + '/#/practice/' + (process.argv[4] || 'conv') + '?n=1' });
  await wait(scenario === 'ok' ? 80000 : scenario === 'onefail' ? 16000 : 9000);
  const out = await ev(`(() => { const b = document.querySelector('.audio-box'); if (!b) return 'pas de audio-box'; const q = document.querySelector('.qs'); return JSON.stringify({ status: b.querySelector('.st').textContent, button: (b.querySelector('.ctl button') || {}).textContent || null, questionsVisible: q ? q.style.display !== 'none' : null, transcriptOpen: !!document.querySelector('details.fold[open]'), failedVoice: window.__failedVoice || null, badVoices: [...Voice._bad] }); })()`);
  console.log(scenario, '=>', out);
  ws.close(); ch.kill(); process.exit(0);
})();
