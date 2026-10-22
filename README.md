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
| Vocabulaire | 205 mots académiques, finance et idiomes, plus tes propres mots ajoutés depuis les exercices ; répétition espacée + mode orthographe |
| Carnet d'erreurs | Chaque erreur revient jusqu'à 2 réussites consécutives |
| Suivi | Courbes de progression, activité, historique des productions corrigées |
| Guide | Analyse du test, correspondances score/CECRL, stratégies, checklist du jour J |

Banque d'exercices (tous niveaux B2, C1 ou C2) : 240 paragraphes Complete the Words, 120 documents du quotidien, 60 textes académiques, 492 répliques, 116 conversations, 56 annonces, 63 mini-cours, 420 phrases à reconstruire, 60 e-mails, 60 discussions, 48 séries Listen & Repeat et 56 entretiens, avec réponses modèles de niveau C1. Les séquences d'origine ont été relues une à une (réponses, langue, faits, niveau) ; les nouvelles ont été relues par leur auteur et contrôlées par échantillon.

## Tirage des exercices : aléatoire, sans répétition, adapté à ton niveau

Les séquences sont notées par niveau CECRL : **B2, C1 ou C2**. Il n'y a plus de B1 : B2 est le minimum.

- **Ton niveau suit ta réussite, tâche par tâche.** Tu pars de ton auto-évaluation (Réglages). Au niveau B2, tu reçois des séquences B2, C1 et C2. Dès que ta réussite récente atteint la bande 5.0 (C1), tu ne reçois plus que du C1 et du C2. Si ta moyenne retombe sous 4.5, tu redescends au mélange B2/C1/C2. L'écart entre 4.5 et 5.0 évite de zigzaguer.
- **Un exercice B2 réussi à 100 % compte pour 93 %** dans l'estimation : seul le C1 prouve un niveau C1.
- **Tirage complètement aléatoire dans ta tranche de niveau**, et aucune séquence ne revient avant que tu aies fait **toutes** les autres de cette tranche. Un message annonce la fin du cycle, puis il repart de zéro. La page Entraînement affiche ce qu'il reste dans le cycle et ton niveau actuel.
- Les tests blancs gardent leur module 2 adaptatif : C1/C2 si tu réussis le module 1, B2/C1 sinon.

Le suivi est enregistré dans la progression (`bags`, `cycles`, `lv`). Une ancienne sauvegarde reste compatible : le cycle est reconstruit à partir de ce que tu as déjà fait. Les anciennes séquences encore étiquetées B1 sont traitées comme B2 en attendant leur réécriture.

## Interface

- **Direction artistique violette** (`app/css/theme.css`). Le mode sombre est un **violet profond, jamais noir** ; le mode clair est une lavande douce. Réglages > Thème : Automatique (suit ton système), Lavande clair, Violet profond.
- **Fond animé** : un dégradé qui respire, quatre nappes lumineuses violettes, roses et bleues qui dérivent en continu, des particules qui scintillent et montent doucement (canvas léger, ~35 images/s, en pause quand l'onglet est caché), et des formes 3D flottantes. La souris déplace légèrement les couches (parallaxe).
- **Mouvement 3D** (`app/js/motion.js`) : cartes qui s'inclinent au survol, boutons en relief qui s'enfoncent, entrées animées. Tout est coupé si ton système demande de réduire les animations : le fond reste alors un dégradé fixe.
- **Exercices en plein écran** : pendant une séance, le menu se réduit à des icônes et la zone d'exercice occupe toute la page. Le texte s'agrandit avec la fenêtre (paragraphe à trous, phrases à reconstruire, éditeur).

## Ajouter un mot au vocabulaire depuis un exercice

Dans n'importe quel texte d'exercice (documents, passages, conversations après l'écoute, consignes…), **sélectionne un mot ou une expression** que tu ne comprends pas : double-clic sur un mot, ou glisse sur une expression (jusqu'à 6 mots). Une pastille **« + Vocabulaire »** apparaît ; clique dessus ou appuie sur la touche **V**.

- Le mot est enregistré avec la **phrase d'où il vient**, dans le thème **« Mes mots »** de la page Vocabulaire.
- Il entre aussitôt dans la **révision espacée**, avant les mots du programme et sans limite quotidienne.
- Si une clé Gemini est configurée (Réglages), la **traduction et la définition se remplissent toutes seules** (bouton « ✨ IA » dans la carte si tu veux la relancer). Sinon, tape toi-même ta traduction dans la liste ou sur la carte de révision.
- Page Vocabulaire : ajout manuel d'un mot, modification de la traduction, suppression.
- Tes mots font partie de ta progression : ils sont exportés et importés avec le fichier JSON.

## Audio du Listening

- Les voix sont celles de ton navigateur. Sous Edge/Windows, ce sont des voix « Natural » **en ligne** : il faut une connexion internet. Chaque changement de voix garde un court délai du moteur (0,2 à 0,4 s) ; l'appli enchaîne les répliques sans temps mort supplémentaire.
- Si le navigateur bloque la lecture automatique (par exemple après un rechargement de la page), un bouton **▶ Écouter** apparaît : clique dessus. L'audio n'est pas compté comme écouté tant qu'il n'a pas été lu.
- Si aucune voix ne répond (connexion coupée), la transcription s'ouvre et les questions se débloquent, avec un bouton **↻ Réessayer**.
- Vitesse : Réglages > Vitesse des voix (0,8 à 1,25). Les voix en ligne parlent déjà à un débit de test.

## Correction automatique par l'IA (optionnel, gratuit)

Colle une clé **Google Gemini** (gratuite sur https://aistudio.google.com/app/apikey) dans **Réglages**. Elle est enregistrée dans `data/config.json`, exclu de Git. Les e-mails, discussions et entretiens sont alors notés sur la grille officielle 0-5, avec des corrections détaillées.

## Données

La progression est sauvegardée automatiquement dans `data/progression.json`, avec une copie par jour dans `data/sauvegardes/`. Ces fichiers restent en local et ne sont pas versionnés.

**Changer d'ordinateur :** le code se récupère avec `git pull`, mais la progression ne passe pas par GitHub. Dans Réglages, clique sur **⬇ Exporter (JSON)** à la fin de chaque séance, copie le fichier sur ton Google Drive, puis **⬆ Importer** sur l'autre machine. Importe toujours le fichier le plus récent avant de travailler : l'import remplace toute la progression locale.

Navigateur conseillé : **Google Chrome** (voix de synthèse et reconnaissance vocale pour le Speaking). Pour des voix plus naturelles sur Mac : Réglages Système → Accessibilité → Contenu énoncé → Voix du système → télécharger les voix anglaises « Améliorée ».

## État du chantier

- Fait : niveau adaptatif (minimum B2), relecture complète des banques d'origine, doublement de **tous** les types d'exercices, direction artistique violette avec fond animé, ajout de mots au vocabulaire depuis les exercices.
- Pistes : une relecture croisée des nouvelles séquences par un second relecteur (surtout les distracteurs des répliques B2, parfois simples), et davantage de séquences C2 pour les types encore peu fournis (phrases à reconstruire, textes académiques).

## Pour reprendre le travail (ou ouvrir une nouvelle conversation)

Tout l'état du projet est dans le dépôt : `CLAUDE.md` (contexte, architecture, état actuel, à faire), `docs/JOURNAL.md` (historique, décisions, mesures) et `tools/` (scripts de contrôle). Une nouvelle conversation Claude Code ouverte dans ce dossier lit `CLAUDE.md` automatiquement ; ces fichiers sont tenus à jour à chaque étape et voyagent avec `git pull`.
