# Journal du projet

Dernier en premier. Pour chaque étape : ce qui a été fait, pourquoi, comment c'est vérifié, ce qui reste. Mets ce fichier à jour à chaque étape terminée (voir `CLAUDE.md`, règle n°1).

## 2026-10-23 — Audio du Listening revu de fond en comble

**Demande :** les conversations sont trop lentes (trop de temps entre les répliques) et certaines séquences n'ont aucun audio ou des bugs audio. Passer toute la partie Listening au peigne fin.

**Mesures sur le PC de Sacha (Edge 155, Windows 11)** — outils dans `tools/` :
- 321 voix dont 45 anglaises, **toutes en ligne (« Natural »), aucune locale**. Les 28 voix US/UK/AU/CA/IE démarrent toutes (0,2-0,4 s ; Brian et William Multilingual parfois 1,1-1,2 s). Aucune voix cassée.
- Débit normal (environ 165-200 mots par minute selon la voix) : ce n'est **pas** la parole qui est lente, ce sont les **blancs**.
- Données : structure saine (727 items, 1 716 répliques, aucun locuteur invalide ni texte vide). Mais 23 abréviations (« Dr. », « Ms. », « a.m. »), 295 fragments très courts, des nombres comme « 3.5 » : l'ancien découpage coupait à chaque point, donc au milieu d'une phrase.

**Causes trouvées**
1. *Trop de blancs* : un morceau par phrase, chaque morceau relancé après la fin du précédent, plus une pause fixe de 280 ms entre répliques. Mesure de référence : conversation v01 = 10 morceaux, 4,2 s de blancs ; mini-cours tx004 (279 mots) = 19 morceaux, 6,7 s de blancs.
2. *Audio muet — lecture bloquée* : sans clic préalable sur la page (rechargement direct sur un exercice d'écoute), Edge refuse de parler (`not-allowed`) ; l'ancien code comptait quand même l'audio comme « écouté » et affichait les questions.
3. *Audio muet — course après annulation* : après `speechSynthesis.cancel()` d'une lecture active, parler avant ~450 ms échoue (`synthesis-failed`). **Mesuré : 26 échecs sur 60 morceaux à 60 ms, 0 sur 60 à 400 ms.** Se produit quand on relance un audio pendant qu'un autre joue (clic sur ▶ / Réécouter), et pendant une nouvelle tentative immédiate.
4. *Voix par défaut* : la liste des voix pouvait être vide au moment du rendu (chargement asynchrone) → lecture avec une voix par défaut.
5. *Genre des voix* : beaucoup de prénoms Edge (Andrew, Christopher, Eric, Clara, Emily…) n'étaient pas reconnus ; `/male/` reconnaissait aussi « female ».

**Corrections** (`app/js/core.js` `Voice`, `app/js/tasks.js` `audioBox`)
- Découpage tenant compte des abréviations/décimales ; une réplique = un morceau ; longs textes coupés vers 240 caractères ; texte « parlable » (tirets, `&`, `/`, symboles).
- Morceau suivant mis en file dès que le précédent démarre ; plus de pause fixe.
- `ready()` attend le chargement des voix ; voix choisies à la première lecture et gardées à la réécoute.
- `_settle()` : 450 ms d'attente après toute annulation active ; une seule nouvelle tentative avec une autre voix si un morceau ne démarre pas (la voix défaillante est écartée, garde-fou de 8 s).
- `audioBox` : lecture bloquée → message + bouton ▶ (l'audio n'est pas compté) ; aucune voix ne répond → message, transcription ouverte, questions débloquées, bouton « Réessayer » ; lecture interrompue → on ne fait rien.
- Listes de prénoms complétées, `\bmale\b`.

**Résultats mesurés après correction**
- Blancs : v01 4,2 s → 0,9 s ; v12 2,8 s → 1,4 s ; tx004 6,7 s → 3,1 s (nombre de morceaux : 10 → 5, 9 → 5, 19 → 9). Il reste ~0,2-0,4 s à chaque changement de voix : latence du moteur en ligne, incompressible côté navigateur.
- `tools/stress-play.js` : lectures enchaînées 10/10 ; relances en pleine phrase 6/6 (5/6 avant).
- Scénarios de panne (`tools/audio-failure-tests.js`) : `blocked`, `allfail`, `onefail` et `ok` se comportent comme prévu.
- Découpage de toutes les répliques : 2 328 morceaux, aucun vide, aucun > 420 caractères (max 354).
- **Fiabilité en usage réel** (`tools/stress-play.js`, vrai `Voice.play`) : 40 répliques lues à la suite = 40/40 complètes ; 6 relances en pleine phrase = 6/6 ; **1 seule nouvelle tentative nécessaire sur 46 lectures** (et elle a réussi grâce au changement de voix).
- `tools/sweep-audio.js` (échantillon de 291 morceaux de tous les types, voix Aria/Guy fixes) : 23 % d'échecs au 1er essai, 6 % d'échecs permanents, sans aucun point commun entre les textes (phrases ordinaires, tous types mélangés). Ce protocole est **artificiel** (il démarre puis annule chaque lecture en boucle, sans changer de voix) : il sert à repérer un texte que le moteur refuserait systématiquement, pas à mesurer la fiabilité réelle. Conclusion : aucun texte du Listening n'est en cause ; les échecs relèvent du service vocal en ligne, d'où la nouvelle tentative avec une autre voix dans `Voice.play` (`result.retried` compte ces cas).
- Aucune erreur JavaScript sur 23 pages et routes testées (`tools/console-errors.js`).

**Limites honnêtes** : on ne peut pas *entendre* l'audio depuis ici ; les mesures reposent sur les événements du moteur (start/end/error) dans Edge sans carte son. Le test à faire par l'utilisateur : lancer quelques conversations et dire si les blancs lui paraissent encore trop longs (réglage de vitesse : Réglages > Vitesse des voix, 0,8 à 1,25).

**Outils ajoutés** : `tools/` (voir `tools/README.md`).

## 2026-10-22 — Grosse journée (résumé)
- Niveaux B2/C1/C2 et niveau adaptatif ; relecture de toutes les banques d'origine (aucun B1 restant) ; doublement de tous les types d'exercices (fichiers `content-x2-*.js`).
- DA violette (violet profond sans noir, lavande claire), fond animé, mouvement 3D ; exercices en plein écran ; tirage aléatoire sans répétition par cycles.
- Vocabulaire personnel : sélection d'un mot dans un exercice, pastille « + Vocabulaire » (touche V), `Store.s.myVocab`, `/api/define` (Gemini si clé).
- Budget API du compte de travail dépassé par 21 agents en parallèle → l'utilisateur est passé sur son abonnement perso ; règle : ~4 agents max.
