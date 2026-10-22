# TOEFL Prep — Objectif C1 (100-110)

Préparation personnalisée au **TOEFL iBT, nouveau format de janvier 2026** (échelle 1-6 alignée sur le CECRL), construite pour viser **100-110 (bandes 5.0-5.5, niveau C1)** en vue des admissions parallèles de l'ESCP (Master in Finance).

## Lancer l'application

1. Double-clique sur **`Lancer TOEFL Prep.command`**. La première fois, macOS peut demander une autorisation : clic droit → Ouvrir.
2. L'appli s'ouvre dans Chrome sur http://localhost:8765. Laisse la fenêtre du terminal ouverte pendant la session.

Tu peux aussi la lancer à la main : `python3 server.py`, puis ouvre http://localhost:8765. Seul Python 3 est nécessaire, aucune dépendance.

## Contenu

| Module | Contenu |
|---|---|
| Tableau de bord | Score estimé (bande, /120, CECRL), niveau par section, plan du jour |
| Mon plan | 5 phases jusqu'au jour J, calendrier des tests blancs, priorités recalculées chaque jour |
| Entraînement | Les 12 types de tâches 2026, avec une fiche méthode par tâche |
| Tests blancs | Diagnostic, 3 tests blancs fixes + tests aléatoires, Reading/Listening adaptatifs |
| Vocabulaire | ~200 mots académiques, finance et idiomes, en répétition espacée + mode orthographe |
| Carnet d'erreurs | Chaque erreur revient jusqu'à 2 réussites consécutives |
| Suivi | Courbes de progression, activité, historique des productions corrigées |
| Guide | Analyse du test, correspondances score/CECRL, stratégies, checklist du jour J |

Banque d'exercices : 120 paragraphes Complete the Words, 60 documents du quotidien, 30 textes académiques, 246 répliques, 58 conversations, 28 annonces, 32 mini-cours, 210 phrases à reconstruire, 30 e-mails, 30 discussions, 24 séries Listen & Repeat et 28 entretiens, avec réponses modèles de niveau C1.

## Tirage des exercices : aléatoire, sans répétition, adapté à ton niveau

Les séquences sont notées par niveau CECRL : **B2, C1 ou C2**. Il n'y a plus de B1 : B2 est le minimum.

- **Ton niveau suit ta réussite, tâche par tâche.** Tu pars de ton auto-évaluation (Réglages). Au niveau B2, tu reçois des séquences B2, C1 et C2. Dès que ta réussite récente atteint la bande 5.0 (C1), tu ne reçois plus que du C1 et du C2. Si ta moyenne retombe sous 4.5, tu redescends au mélange B2/C1/C2. L'écart entre 4.5 et 5.0 évite de zigzaguer.
- **Un exercice B2 réussi à 100 % compte pour 93 %** dans l'estimation : seul le C1 prouve un niveau C1.
- **Tirage complètement aléatoire dans ta tranche de niveau**, et aucune séquence ne revient avant que tu aies fait **toutes** les autres de cette tranche. Un message annonce la fin du cycle, puis il repart de zéro. La page Entraînement affiche ce qu'il reste dans le cycle et ton niveau actuel.
- Les tests blancs gardent leur module 2 adaptatif : C1/C2 si tu réussis le module 1, B2/C1 sinon.

Le suivi est enregistré dans la progression (`bags`, `cycles`, `lv`). Une ancienne sauvegarde reste compatible : le cycle est reconstruit à partir de ce que tu as déjà fait. Les anciennes séquences encore étiquetées B1 sont traitées comme B2 en attendant leur réécriture.

## Interface

- Thème « Aurora » (`app/css/theme.css`) : tons doux bleu-gris et vert sauge, sans blanc ni noir purs, clair et sombre automatiques.
- Mouvement 3D (`app/js/motion.js`) : formes flottantes en arrière-plan, parallaxe à la souris, cartes inclinables, boutons en relief, entrées animées. Tout est coupé si ton système demande de réduire les animations.
- Exercices en plein écran : pendant une séance, le menu se réduit à des icônes et la zone d'exercice occupe toute la page. Le texte s'agrandit avec la fenêtre (paragraphe à trous, phrases à reconstruire, éditeur).

## Correction automatique par l'IA (optionnel, gratuit)

Colle une clé **Google Gemini** (gratuite sur https://aistudio.google.com/app/apikey) dans **Réglages**. Elle est enregistrée dans `data/config.json`, exclu de Git. Les e-mails, discussions et entretiens sont alors notés sur la grille officielle 0-5, avec des corrections détaillées.

## Données

La progression est sauvegardée automatiquement dans `data/progression.json`, avec une copie par jour dans `data/sauvegardes/`. Ces fichiers restent en local et ne sont pas versionnés.

**Changer d'ordinateur :** le code se récupère avec `git pull`, mais la progression ne passe pas par GitHub. Dans Réglages, clique sur **⬇ Exporter (JSON)** à la fin de chaque séance, copie le fichier sur ton Google Drive, puis **⬆ Importer** sur l'autre machine. Importe toujours le fichier le plus récent avant de travailler : l'import remplace toute la progression locale.

Navigateur conseillé : **Google Chrome** (voix de synthèse et reconnaissance vocale pour le Speaking). Pour des voix plus naturelles sur Mac : Réglages Système → Accessibilité → Contenu énoncé → Voix du système → télécharger les voix anglaises « Améliorée ».
