# Outils de contrôle

Scripts Node (sans dépendance) pour vérifier le contenu et l'audio. À lancer depuis la racine du dépôt.

| Script | Rôle |
|---|---|
| `node tools/check-content.js` | Intégrité de toutes les banques d'exercices : ids uniques, réponses valides. Doit finir par `ALL OK`. |
| `node tools/level-stats.js` | Répartition B2 / C1 / C2 par type d'exercice et présence de B1 dans les tests blancs. |
| `node tools/audit-audio-data.js` | Repère dans les textes du Listening ce que la synthèse vocale lit mal (abréviations, symboles, chiffres…). |
| `node tools/audit-audio-chunks.js` | Applique le vrai découpage de `Voice.chunks` à tous les textes : morceaux vides, trop longs, abréviations coupées. |
| `node tools/voice-health.js` | Teste chaque voix anglaise d'Edge (démarrage, erreurs). Ouvre Edge en mode headless. |
| `node tools/measure-audio-gaps.js http://localhost:PORT v01,tx004` | Mesure les blancs entre répliques avec le vrai `Voice.play` (serveur lancé avant). |
| `node tools/audio-failure-tests.js http://localhost:PORT SCENARIO TYPE` | Simule les pannes audio. SCENARIO = `blocked` (lecture automatique refusée), `allfail` (toutes les voix en panne), `onefail` (une voix en panne), `ok` (lecture complète). TYPE = `lcr`, `conv`, `ann` ou `talk` (un exercice dont la fiche méthode a déjà été vue). |
| `node tools/e2e-vocab.js http://localhost:PORT capture.png` | Test de bout en bout de l'ajout de mots au vocabulaire. |

Les scripts qui pilotent Edge utilisent `C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe` ; change la variable d'environnement `EDGE_PATH` si besoin.
Pour tester sans toucher à ta vraie progression, copie `app/` et `server.py` dans un dossier temporaire, ajoute un `data/progression.json` de test, puis lance `TOEFL_PORT=8795 python server.py` depuis ce dossier.
Capture d'écran fiable : passer par le protocole de debug d'Edge (temps réel). L'option `--virtual-time-budget` fausse les couleurs et les animations.
