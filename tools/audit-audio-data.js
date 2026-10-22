// Audit des données audio du Listening : tout ce qui est lu par la synthèse vocale.
const fs = require('fs'), vm = require('vm'), path = require('path');
const dir = path.join(__dirname, '..', 'app');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const ctx = { CONTENT: {} }; ctx.window = ctx; vm.createContext(ctx);
for (const m of html.matchAll(/src="(data\/[^"]+)"/g)) vm.runInContext(fs.readFileSync(path.join(dir, m[1]), 'utf8'), ctx);
const C = ctx.CONTENT;
const issues = {}; const add = (k, id, msg) => { (issues[k] = issues[k] || []).push(id + ' ' + msg); };
const ABBR = /\b(Dr|Mr|Mrs|Ms|Prof|St|vs|etc|e\.g|i\.e|Inc|Ltd|Co|No|approx|a\.m|p\.m|U\.S|U\.K|Jr|Sr)\./g;
function textsOf(type, it) {
  if (type === 'lcr') return [[it.g, it.p]];
  if (it.lines) return it.lines.map((l) => [l[0], l[1]]);
  return [[it.g, it.text]];
}
let total = 0, segs = 0, words = 0;
for (const type of ['lcr', 'conv', 'ann', 'talk']) {
  for (const it of C[type]) {
    total++;
    if (type === 'conv') {
      if (!Array.isArray(it.lines) || !it.lines.length) add('conv sans lignes', it.id, '');
      const keys = new Set(Object.keys(it.names || {}));
      for (const l of it.lines || []) {
        if (!Array.isArray(l) || l.length < 2 || typeof l[1] !== 'string') { add('ligne mal formée', it.id, JSON.stringify(l).slice(0, 60)); continue; }
        if (!keys.has(l[0])) add('locuteur absent de names', it.id, l[0]);
        if (!['W', 'M'].includes(l[0])) add('locuteur ni W ni M', it.id, l[0]);
      }
      const sp = new Set((it.lines || []).map((l) => l[0])); if (sp.size < 2) add('un seul locuteur', it.id, [...sp].join(','));
    } else {
      if (!['W', 'M'].includes(it.g)) add('genre g invalide', it.id, String(it.g));
    }
    for (const [g, t] of textsOf(type, it)) {
      segs++; if (typeof t !== 'string' || !t.trim()) { add('texte vide', it.id, ''); continue; }
      words += t.split(/\s+/).length;
      if (ABBR.test(t)) add('abréviation avec point', it.id, (t.match(ABBR) || []).join(' '));
      ABBR.lastIndex = 0;
      if (/[—–…]/.test(t)) add('tiret long / points de suspension', it.id, (t.match(/[—–…]/g) || []).length + 'x');
      if (/\.{2,}/.test(t)) add('points multiples', it.id, '');
      if (/[%$€£&/#*_\[\]{}<>|]/.test(t)) add('symbole à lire', it.id, [...new Set(t.match(/[%$€£&/#*_\[\]{}<>|]/g))].join(''));
      if (/\d/.test(t)) add('chiffres', it.id, (t.match(/[\d][\d.,:%$-]*/g) || []).slice(0, 4).join(' '));
      if (/\b[A-Z]{2,}\b/.test(t)) add('sigle', it.id, (t.match(/\b[A-Z]{2,}\b/g) || []).slice(0, 4).join(' '));
      if (/\(|\)/.test(t)) add('parenthèses', it.id, '');
      if (/["“”]/.test(t)) add('guillemets', it.id, '');
      if (/[A-Za-z]-[A-Za-z]/.test(t) && /\b\w+-\w+-\w+\b/.test(t)) add('mot à tirets multiples', it.id, '');
      if (t.length > 600 && !/[.!?]/.test(t.slice(0, 600))) add('phrase très longue', it.id, '');
      const sentences = t.match(/[^.!?]+[.!?]+["')\]]*|[^.!?]+$/g) || [t];
      const tiny = sentences.filter((s) => s.trim().length > 0 && s.trim().length < 12);
      if (tiny.length) add('fragments < 12 car. (coupure)', it.id, tiny.map((s) => JSON.stringify(s.trim())).slice(0, 3).join(' '));
      if (!/[.!?]["')\]]*\s*$/.test(t.trim())) add('pas de ponctuation finale', it.id, '');
    }
  }
}
console.log('items:', total, 'segments:', segs, 'mots:', words);
for (const [k, v] of Object.entries(issues)) console.log('\n##', k, '(' + v.length + ')', v.slice(0, 6).join(' | '));
