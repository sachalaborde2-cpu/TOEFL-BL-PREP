// Test bout en bout : sélection -> pastille -> ajout -> liste Vocabulaire -> file de révision
const { spawn } = require('child_process');
const http = require('http');
const base = process.argv[2];
const edge = process.env.EDGE_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
const ch = spawn(edge, ['--headless=new', '--disable-gpu', '--remote-debugging-port=9445', '--window-size=1500,900', 'about:blank'], { stdio: 'ignore' });
const get = (p) => new Promise((res, rej) => http.get({ host: '127.0.0.1', port: 9445, path: p }, (r) => { let d = ''; r.on('data', (c) => d += c); r.on('end', () => res(JSON.parse(d))); }).on('error', rej));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  let tabs; for (let i = 0; i < 40; i++) { try { tabs = await get('/json'); if (tabs.length) break; } catch (e) {} await wait(250); }
  const pg = tabs.find((t) => t.type === 'page') || tabs[0]; const ws = new WebSocket(pg.webSocketDebuggerUrl); let id = 0; const pend = {};
  await new Promise((r) => ws.onopen = r);
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pend[d.id]) pend[d.id](d.result); };
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (expr) => { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) return 'EXC ' + JSON.stringify(r.exceptionDetails).slice(0, 300); return r.result.value; };
  await send('Page.enable');
  const out = {};
  await send('Page.navigate', { url: base + '/#/practice/dl?n=1' }); await wait(5000);
  // 1) sélectionner un mot du document
  out.sel = await ev(`(() => {
    const doc = document.querySelector('.doc'); if (!doc) return 'pas de .doc';
    const w = document.createTreeWalker(doc, NodeFilter.SHOW_TEXT); let n, node = null, idx = -1;
    while ((n = w.nextNode())) { const m = n.nodeValue.match(/[A-Za-z]{6,}/); if (m) { node = n; idx = m.index; var word = m[0]; break; } }
    if (!node) return 'pas de mot';
    const r = document.createRange(); r.setStart(node, idx); r.setEnd(node, idx + word.length);
    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
    document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    window.__word = word; return word;
  })()`);
  await wait(300);
  out.pillVisible = await ev(`(() => { const p = document.getElementById('vocab-pill'); const r = p.getBoundingClientRect(); return JSON.stringify({ hidden: p.hidden, x: Math.round(r.left), y: Math.round(r.top), w: Math.round(r.width) }); })()`);
  const shot = await send('Page.captureScreenshot', { format: 'png' });
  require('fs').writeFileSync(process.argv[3], Buffer.from(shot.data, 'base64'));
  // 2) clic sur la pastille
  out.click = await ev(`(() => { document.getElementById('vocab-pill').click(); return JSON.stringify(Store.s.myVocab); })()`);
  await wait(300);
  out.pillAfter = await ev(`document.getElementById('vocab-pill').hidden`);
  // 3) doublon
  out.dup = await ev(`(() => JSON.stringify(Vocab.add(window.__word, 'x')))()`);
  // 4) raccourci V
  out.keyV = await ev(`(() => {
    const doc = document.querySelector('.doc'); const w = document.createTreeWalker(doc, NodeFilter.SHOW_TEXT); let n, found = [];
    while ((n = w.nextNode())) { for (const m of n.nodeValue.matchAll(/[A-Za-z]{7,}/g)) found.push([n, m.index, m[0]]); }
    const pick = found.find((f) => f[2].toLowerCase() !== window.__word.toLowerCase()); if (!pick) return 'aucun 2e mot';
    const r = document.createRange(); r.setStart(pick[0], pick[1]); r.setEnd(pick[0], pick[1] + pick[2].length);
    const s = getSelection(); s.removeAllRanges(); s.addRange(r); document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
    return new Promise((res) => setTimeout(() => { document.dispatchEvent(new KeyboardEvent('keydown', { key: 'v', bubbles: true })); res(JSON.stringify(Store.s.myVocab.map((m) => m.w))); }, 100));
  })()`);
  // 5) page Vocabulaire
  await send('Page.navigate', { url: base + '/#/vocab' }); await wait(2500);
  out.vocabPage = await ev(`(() => { const rows = [...document.querySelectorAll('.vl tr')].filter((t) => t.textContent.includes('à toi')).map((t) => t.querySelector('b').textContent); return JSON.stringify({ mineRows: rows, intro: document.querySelector('h1 + p').textContent.slice(0, 80) }); })()`);
  // 6) cartes de révision : les mots à toi passent en premier
  out.queue = await ev(`(() => JSON.stringify(Vocab.queue().slice(0, 3).map((v) => [v.w, !!v.mine])))()`);
  // 7) suppression
  out.del = await ev(`(() => { const w = Store.s.myVocab[0].w; Vocab.remove(w); return JSON.stringify(Store.s.myVocab.map((m) => m.w)); })()`);
  console.log(JSON.stringify(out, null, 1));
  ws.close(); ch.kill(); process.exit(0);
})();
