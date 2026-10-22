# TOEFL-BL-PREP — lis ce fichier en premier

> **Règle n°1 : ce fichier est la mémoire du projet. Mets-le à jour au fil de l'eau**, dans le même commit que le code : section « État actuel » quand quelque chose change, ligne dans `docs/JOURNAL.md` pour chaque étape terminée, section « À faire » quand une piste s'ouvre ou se ferme. L'utilisateur ouvre souvent une nouvelle conversation et veut reprendre exactement où il en était, sans rien oublier.

## Le projet
Application web de préparation au **TOEFL iBT, format de janvier 2026** (échelle 1-6), pour **Sacha** (francophone, objectif C1 / 100-110, admissions parallèles ESCP Master in Finance). HTML/JS « vanilla » sans build, servie par `server.py` (Python 3 standard, aucune dépendance). Dépôt GitHub : `sachalaborde2-cpu/TOEFL-BL-PREP`, branche `main`. Windows 11 (PowerShell + Git Bash), Edge/Chrome.

- Lancer : `python server.py` puis http://localhost:8765 (variable `TOEFL_PORT`). Sans serveur (double-clic sur `index.html`), la progression n'est que dans le `localStorage` du navigateur.
- Progression : `data/progression.json` + une copie par jour dans `data/sauvegardes/` (**jamais versionnés**, voir `.gitignore`). Le transfert entre ordinateurs se fait par **Réglages > Exporter / Importer (JSON)** ; l'import remplace tout. Clé Gemini (facultative) : `data/config.json`.
- L'utilisateur veut **tout poussé sur GitHub** pour utiliser l'appli sur son autre ordinateur (`git pull`).

## Comment travailler avec l'utilisateur
- Réponds **en français**, concis, sans jargon inutile ; dis clairement ce qui est fait, vérifié, ou non testé.
- Il valide par de courts messages (« tu peux y aller », « stop ») : un « stop » = arrêter tout de suite agents et actions en cours et faire un état des lieux.
- Documentation : à jour en continu (règle n°1). README.md = pour l'utilisateur ; CLAUDE.md = pour toi ; `docs/JOURNAL.md` = historique et mesures.
- Commit + push quand le travail est vérifié (il le demande souvent). Message de commit en français, avec la ligne `Co-Authored-By` demandée par l'environnement.
- **Agents** : au plus ~4 en parallèle (21 agents en même temps ont dépassé le budget API du compte de travail). Un fichier = un agent. Toujours **vérifier un échantillon** de ce qu'un agent écrit avant de le brancher et de pousser (ils écrivent souvent la bonne réponse la plus longue, et des distracteurs trop faciles).
- Ne jamais supprimer ni renommer l'`id` d'un item existant : la progression et les tests blancs fixes y renvoient.
- Captures d'écran fiables : protocole de debug d'Edge en temps réel (`tools/`), pas `--virtual-time-budget` (couleurs et animations faussées).

## Architecture
```
app/index.html          ordre de chargement des scripts (data d'abord, puis js)
app/css/style.css       styles de base ; app/css/theme.css : DA violette + fond animé + plein écran (chargé après)
app/js/core.js          utilitaires, Store (état + sauvegarde), Content (tirage), Record, Estimator (niveau/score), Voice (audio), Recorder, routeur App
app/js/tasks.js         moteurs des 12 types de tâches : Tasks[type].render(el, item, ctx) ; audioBox ; Grade (correction IA)
app/js/session.js       runPractice (entraînement), tests blancs (runMock), révision du carnet d'erreurs
app/js/pages.js         pages : tableau de bord, plan, entraînement, vocabulaire (Vocab), erreurs, suivi, guide, réglages
app/js/motion.js        fond animé (particules canvas), parallaxe, inclinaison 3D des cartes
app/js/lookup.js        sélection d'un mot dans un exercice -> « Mes mots » (pastille « + Vocabulaire » / touche V)
app/data/content-*.js   banques d'exercices (CONTENT.<type> = [...] ou .push([...])) ; content-x2-* = 2e vague de séquences
server.py               serveur statique + /api/progress, /api/config, /api/grade, /api/define (Gemini), sauvegardes
tools/                  scripts de contrôle (voir tools/README.md)
docs/JOURNAL.md         journal chronologique, décisions, mesures
```

### Les 12 types (`CONTENT.<type>`)
Reading : `ctw` (Complete the Words), `dl` (Read in Daily Life), `ap` (Academic Passage). Listening : `lcr` (Listen & Choose a Response), `conv`, `ann`, `talk`. Writing : `bas` (Build a Sentence), `email`, `disc`. Speaking : `rep` (Listen & Repeat), `int` (Interview). Autres : `CONTENT.vocab` (205 mots), `CONTENT.frenchTraps` (pièges de francophone), `CONTENT.mocks` (tests blancs fixes), `CONTENT.guide`.
Chaque item : `{ id, diff, ... }` ; QCM : `qs: [{ q, o[4], a (index de la bonne), x (explication en français) }]`. `bas` : `b` = phrase avec blocs `[entre crochets]` dans le bon ordre, `x` = bloc en trop, `alt` = autres ordres valables. `conv` : `lines: [[W|M, texte], ...]` + `names`. Détails exacts : lire les items existants.

### Niveaux et tirage (core.js)
- `diff` : **2 = B2, 3 = C1, 4 = C2**. Il n'y a plus de B1 (un ancien `1` compte comme 2).
- `Estimator.refreshLevel(type)` : niveau par tâche, `Store.s.lv[type]` (2 ou 3). Départ = auto-évaluation du profil ; montée en C1 à la bande ≥ 5.0, redescente sous 4.5. Niveau 2 → tranche [2,3,4] ; niveau 3 → [3,4]. `DIFF_CAP` : B2 réussi à 100 % compte 93 %.
- `Content.pick(type, n)` : tirage **aléatoire dans la tranche, sans répétition** ; sac du cycle `Store.s.bags[type]` ; `markDone` relance le cycle quand toute la tranche est faite (`Store.s.cycles`). Tests blancs adaptatifs : module 2 en [3,4] si module 1 réussi, sinon [2,3].

### État sauvegardé (`Store.s`, `defaultState()` dans core.js)
`profile, attempts, seen, bags, cycles, lv, myVocab, mocks, errors, vocab (cartes Leitner), writings, speakings, activity, settings (rate, accent, replay, reserve, theme, showTranscript), strategySeen, snapshots, vocabLog`. Ajouter un champ = l'ajouter à `defaultState()` (les anciennes sauvegardes se complètent seules).

### Audio (core.js `Voice`, tasks.js `audioBox`) — voir `docs/JOURNAL.md` pour les mesures
- Sur le PC de Sacha (Edge/Windows) il n'y a **que des voix en ligne « Natural »** (45 voix anglaises, aucune locale) : chaque morceau demande un aller-retour réseau (~0,2-0,4 s de démarrage, jusqu'à 1,2 s). Moins de morceaux = moins de blancs.
- `Voice.play(segments, {voices})` renvoie `{ok, blocked, interrupted, played, failed, total}`. Une réplique = 1 morceau ; les longs textes sont coupés vers 240 caractères à la fin d'une phrase (`Voice.chunks`, qui ne coupe pas après « Dr. », « a.m. », « 3.5 »). Le morceau suivant est mis en file dès que le précédent démarre. Un morceau muet est retenté une fois avec une autre voix (la voix défaillante est écartée).
- **Piège n°1 (mesuré)** : après `speechSynthesis.cancel()` d'une lecture active, parler avant ~450 ms échoue (`synthesis-failed`) dans 43 % des cas. `Voice.cancel`/`_settle` attendent donc 450 ms. Ne jamais enchaîner `cancel()` puis `speak()` immédiatement.
- **Piège n°2** : sans interaction préalable avec la page, le navigateur refuse de parler (`not-allowed`) → `audioBox` affiche un bouton ▶ au lieu de compter l'audio comme écouté. Si aucune voix ne répond (réseau coupé), la transcription s'ouvre et les questions se débloquent.

### Design
Violet profond (jamais noir) / lavande claire ; variables CSS dans `theme.css` (`--primary`, `--bg`, `--orb1..4`, `--shr`). Fond : `#bgfx` (nappes CSS animées, dans `index.html`) + `#bgparticles` (canvas) + `#bg3d`. Tout est coupé avec `prefers-reduced-motion`. Pendant un exercice (`body.in-session`) le menu se réduit et l'exercice prend toute la page.

## Contrôles avant de pousser
```
node tools/check-content.js      # doit finir par ALL OK
node tools/level-stats.js        # B2/C1/C2 par type
for f in app/js/*.js app/data/*.js; do node --check $f; done
```
Pour l'audio : `tools/stress-play.js` (fiabilité réelle, à privilégier), `audit-audio-data.js`, `audit-audio-chunks.js`, `console-errors.js` ; `sweep-audio.js` est un test artificiel (démarre puis annule en boucle) : ses échecs ne reflètent pas l'usage réel (voir `tools/README.md` et le journal).

## État actuel (mis à jour le 2026-10-23)
- Banques (tous niveaux B2/C1/C2) : ctw 240, dl 120, ap 60, lcr 492, conv 116, ann 56, talk 63, bas 420, email 60, disc 60, rep 48, int 56. Vocabulaire : 205 mots + « Mes mots ».
- Fait : niveau adaptatif ; relecture de toutes les banques d'origine ; doublement de tous les types ; DA violette + fond animé ; vocabulaire personnel (sélection de texte) ; refonte du moteur audio du Listening (voir journal).
- Dernier push sur GitHub : voir `git log -1` (le journal indique ce qui est poussé ou non).

## À faire / pistes (par priorité)
1. **Audio** : moteur réécrit et validé par mesure (voir journal). Reste à faire par l'utilisateur : écouter quelques conversations et dire si les blancs (~0,2-0,4 s à chaque changement de voix, latence du service en ligne) lui paraissent encore trop longs. Si oui : voix locale, ou petit service TTS côté serveur (`edge-tts`, dépendance optionnelle).
2. Relecture croisée des nouvelles séquences (surtout distracteurs des `lcr` B2, parfois simples) ; plus de C2 pour `bas` et `ap`.
3. Affichage de la correction des Complete the Words : montre le mot entier à côté du trou rouge (« thou_____ thousands »), peu lisible ; proposer de n'afficher que les lettres manquantes (demandé en question par l'utilisateur, pas encore décidé).
4. 25 mots du vocabulaire d'origine ont été remplacés par un agent (analyze, benefit…) : la progression sur ces anciennes fiches n'apparaît plus ; à remettre si l'utilisateur le demande.

## Pièges connus (hors audio)
- Windows : Git convertit LF→CRLF (avertissements sans gravité). Le shell Bash n'a pas `pkill` ; utiliser PowerShell (`Stop-Process`) pour arrêter `python server.py`.
- Les scripts de test qui lancent Edge utilisent un dossier de profil temporaire ; ne jamais les pointer vers le vrai `data/progression.json`.
- Les chaînes JS écrites par script Python dans un `.js` : attention aux `\` et aux apostrophes (déjà arrivé deux fois) ; relire avec `node --check`.
