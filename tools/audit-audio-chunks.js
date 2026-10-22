// Applique le vrai Voice.chunks de l'appli à tous les textes du Listening.
const fs = require('fs'), vm = require('vm'), path = require('path');
const base = path.join(__dirname, '..', 'app') + '/';
const el = () => new Proxy(function () {}, { get: (t, k) => k === 'classList' ? { toggle() {}, add() {}, remove() {} } : el(), apply: () => el(), set: () => true });
const ctx = { console, setTimeout, clearTimeout, setInterval, clearInterval, Date, Math, JSON, URL, Blob: function () {}, CONTENT: {},
  document: { querySelector: () => ({ textContent: '', classList: { add() {}, remove() {}, toggle() {} } }), querySelectorAll: () => [], createElement: () => el(), body: { classList: { toggle() {} } }, documentElement: {}, addEventListener() {} },
  localStorage: { getItem: () => null, setItem() {} }, location: { hash: '' }, history: {}, navigator: {}, speechSynthesis: undefined, fetch: () => Promise.reject(new Error('x')) };
ctx.window = ctx; ctx.addEventListener = () => {}; ctx.matchMedia = () => ({ matches: false });
vm.createContext(ctx);
const html = fs.readFileSync(base + 'index.html', 'utf8');
for (const m of html.matchAll(/src="((?:data|js)\/[^"]+)"/g)) { if (/pages|motion|tasks|session|lookup/.test(m[1])) continue; vm.runInContext(fs.readFileSync(base + m[1], 'utf8'), ctx, { filename: m[1] }); }
const out = vm.runInContext(`
  const stats = { turns: 0, chunks: 0, maxLen: 0, over240: 0, over420: 0, empty: 0, tiny: 0 }; const examples = [];
  const check = (id, g, t) => { stats.turns++; const cs = Voice.chunks(t); stats.chunks += cs.length; for (const c of cs) { stats.maxLen = Math.max(stats.maxLen, c.length); if (c.length > 240) stats.over240++; if (c.length > 420) { stats.over420++; examples.push(id + ' LONG ' + c.length); } if (!c.trim()) stats.empty++; if (c.length < 4) { stats.tiny++; examples.push(id + ' TINY ' + JSON.stringify(c)); } } return cs; };
  for (const type of ['lcr', 'conv', 'ann', 'talk']) for (const it of CONTENT[type]) {
    if (it.lines) it.lines.forEach((l) => check(it.id, l[0], l[1])); else check(it.id, it.g, it.text || it.p);
  }
  const show = (id) => { const it = ['lcr','conv','ann','talk'].map((t) => CONTENT[t].find((x) => x.id === id)).find(Boolean); const t = it.lines ? it.lines.map((l) => l[1]).join(' | ') : (it.text || it.p); return JSON.stringify({ id, chunks: Voice.chunks(t).length, firstWithDot: Voice.chunks(t).filter((c) => /Dr\\.|Ms\\.|a\\.m\\.|3\\.5/.test(c)).map((c) => c.slice(0, 90)) }); };
  JSON.stringify({ stats, examples: examples.slice(0, 8), dr: show('lza098'), ms: show('vx007'), am: show('lza071'), dec: show('lza040') });
`, ctx);
console.log(out);
