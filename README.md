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

Banque d'exercices : 30 paragraphes Complete the Words, 30 documents du quotidien, 16 textes académiques, 96 répliques, 30 conversations, 14 annonces, 18 mini-cours, 80 phrases à reconstruire, 12 e-mails, 12 discussions, 10 séries Listen & Repeat et 12 entretiens, avec réponses modèles de niveau C1.

## Correction automatique par l'IA (optionnel, gratuit)

Colle une clé **Google Gemini** (gratuite sur https://aistudio.google.com/app/apikey) dans **Réglages**. Elle est enregistrée dans `data/config.json`, exclu de Git. Les e-mails, discussions et entretiens sont alors notés sur la grille officielle 0-5, avec des corrections détaillées.

## Données

La progression est sauvegardée automatiquement dans `data/progression.json`, avec une copie par jour dans `data/sauvegardes/`. Ces fichiers restent en local et ne sont pas versionnés.

Navigateur conseillé : **Google Chrome** (voix de synthèse et reconnaissance vocale pour le Speaking). Pour des voix plus naturelles sur Mac : Réglages Système → Accessibilité → Contenu énoncé → Voix du système → télécharger les voix anglaises « Améliorée ».
