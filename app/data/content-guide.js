/* GUIDE — analyse du test, méthodes par tâche, tests blancs fixes */

/* Tests blancs : items du module 1 (Reading/Listening) + Writing + Speaking.
   Le module 2 (adaptatif) est tiré de la banque selon ta performance au module 1. */
CONTENT.mocks = [
  { id: 'diag', name: 'Diagnostic', items: { ctw: ['c03'], dl: ['d02'], ap: ['a04'], lcr: ['l004', 'l011', 'l016', 'l023', 'l033', 'l047'], conv: ['v02', 'v12'], talk: ['t04'], bas: ['b03', 'b05', 'b08', 'b13', 'b21', 'b29'], email: ['e01'], rep: ['r01'], int: ['i01'] } },
  { id: 'm1', name: 'Test blanc 1', desc: 'Thèmes : économie urbaine, finance comportementale, entrepreneuriat.', items: { ctw: ['c06', 'c07'], dl: ['d06', 'd13'], ap: ['a09'], lcr: ['l007', 'l013', 'l019', 'l026', 'l029', 'l035', 'l041', 'l051', 'l057'], conv: ['v03', 'v09', 'v13'], ann: ['n02'], talk: ['t02', 't06'], bas: ['b01', 'b06', 'b10', 'b14', 'b18', 'b23', 'b26', 'b31', 'b35', 'b40'], email: ['e02'], disc: ['q01'], rep: ['r02'], int: ['i03'] } },
  { id: 'm2', name: 'Test blanc 2', desc: 'Thèmes : linguistique, marchés financiers, politiques publiques.', items: { ctw: ['c10', 'c12'], dl: ['d09', 'd16'], ap: ['a13'], lcr: ['l022', 'l030', 'l037', 'l044', 'l049', 'l055', 'l062', 'l069', 'l074'], conv: ['v06', 'v15', 'v19'], ann: ['n06'], talk: ['t09', 't10'], bas: ['b04', 'b09', 'b15', 'b19', 'b25', 'b33', 'b37', 'b42', 'b47', 'b51'], email: ['e06'], disc: ['q05'], rep: ['r04'], int: ['i06'] } },
  { id: 'm3', name: 'Test blanc 3', desc: 'Thèmes : technologie, marketing, écologie. Le plus proche du jour J.', items: { ctw: ['c18', 'c20'], dl: ['d18', 'd25'], ap: ['a16'], lcr: ['l078', 'l081', 'l082', 'l085', 'l087', 'l090', 'l093', 'l095', 'l003'], conv: ['v21', 'v24', 'v27'], ann: ['n11'], talk: ['t14', 't15'], bas: ['b43', 'b46', 'b50', 'b53', 'b56', 'b61', 'b65', 'b69', 'b73', 'b76'], email: ['e08'], disc: ['q10'], rep: ['r07'], int: ['i12'] } },
];

CONTENT.guide = {
  strategies: {
    ctw: {
      what: 'Un paragraphe académique (≈ 70-150 mots). La 1re phrase est intacte, puis la seconde moitié d\'un mot sur deux est effacée : tu tapes les lettres manquantes de 10 mots. C\'est un « C-test » : il mesure en même temps vocabulaire, orthographe, grammaire et compréhension.',
      format: ['1 paragraphe = 10 trous, souvent 3 paragraphes par test (≈ 30 items : la tâche la plus lourde du Reading)', 'Chaque trou affiche le nombre exact de lettres manquantes', 'Environ 3 minutes par paragraphe', 'Aucun point partiel : une faute d\'orthographe = 0'],
      c1: ['Reconnaître instantanément les mots académiques (AWL) et leurs familles (analyze / analysis / analytical)', 'Utiliser la grammaire pour déduire la forme : pluriel, -ed, -ing, -ly, 3e personne -s', 'Orthographe exacte (double consonne, -ible/-able, -ence/-ance)'],
      method: ['Lis toute la 1re phrase : elle donne le sujet et le registre.', 'Repère la nature du mot manquant avec les mots autour : article → nom ; « to » → verbe ; « has » → participe.', 'Compte les lettres : « th__ » = 2 lettres → that/them/then/they/this. Le contexte tranche.', 'Les mots-outils (the, and, which, their, with, from…) représentent souvent la moitié des trous : ne les rate jamais.', 'Vérifie l\'accord et le temps : « recent studi___ » → studies ; « was develop___ » → developed.', 'Relis le paragraphe en entier à la fin : une phrase qui « sonne faux » cache une faute.'],
      traps: ['Oublier le -s du pluriel ou de la 3e personne', 'Écrire la forme française : « developpement » → development, « adresse » → address, « exemple » → example', 'Confondre -ance/-ence, -able/-ible (independence, responsible)', 'Consonnes doubles : occurred, beginning, committee, necessary, accommodation'],
      tools: '<p><b>Suffixes à automatiser :</b> -tion/-sion, -ment, -ness, -ity, -ance/-ence (noms) · -al, -ive, -ous, -able/-ible, -ic (adjectifs) · -ize, -ify, -ate (verbes) · -ly (adverbes).</p><p><b>Entraînement quotidien :</b> le module Vocabulaire → mode « Orthographe » reproduit exactement cette tâche.</p>',
    },
    dl: {
      what: 'Des textes courts de la vie réelle (e-mails, SMS, affiches, menus, horaires, avis, posts) suivis de 2 ou 3 questions. On y teste la compréhension pratique, l\'implicite et les expressions idiomatiques.',
      format: ['Textes de 15 à 150 mots', '2-3 questions par texte, QCM à 4 options', 'Le texte reste visible pendant les questions'],
      c1: ['Comprendre le but d\'un message et le ton (ironie, reproche poli, urgence)', 'Interpréter les idiomes (« bite the bullet », « lifesaver ») et les sous-entendus', 'Repérer vite un détail dans un tableau ou un horaire'],
      method: ['Lis d\'abord la question, puis cherche dans le texte (scanning).', 'Pour « purpose / main idea » : regarde le titre, l\'objet de l\'e-mail et la 1re phrase.', 'Pour l\'inférence : la bonne réponse est une conséquence logique, jamais une info inventée.', 'Pour le vocabulaire : remplace le mot par chaque option dans la phrase.', 'Élimine les options qui reprennent les mots du texte mais changent le sens.'],
      traps: ['Choisir l\'option qui « copie » un mot du texte (piège n°1)', 'Ignorer un mot restrictif : only, except, not, until, at least', 'Faux amis : « eventually » = finalement ; « actually » = en fait'],
    },
    ap: {
      what: 'Un passage académique d\'environ 200 mots (beaucoup plus court qu\'avant 2026) avec environ 5 questions : idée principale, détail, vocabulaire en contexte, inférence, fonction d\'une phrase, référence.',
      format: ['≈ 200 mots, 1 à 3 paragraphes', '≈ 5 questions, QCM', 'Sujets : sciences, histoire, économie, psychologie, arts…'],
      c1: ['Distinguer idée principale et exemple', 'Comprendre pourquoi l\'auteur mentionne quelque chose (fonction rhétorique)', 'Inférer ce qui est impliqué mais non écrit', 'Suivre la structure : théorie → critique → nuance'],
      method: ['Survole le texte en 60-90 s en notant mentalement la fonction de chaque paragraphe.', 'Main idea : la réponse couvre TOUT le texte, pas un seul paragraphe.', '« Why does the author mention X? » : lis la phrase avant et après X ; c\'est presque toujours un exemple ou une preuve.', 'Negative factual (« NOT mentioned ») : coche chaque option dans le texte.', 'Inference : choisis l\'option la plus prudente qui découle directement du texte.'],
      traps: ['Réponses trop fortes : always, never, completely, only', 'Réponses vraies en général mais absentes du texte', 'Confondre l\'avis de l\'auteur et celui d\'un chercheur cité'],
    },
    lcr: {
      what: 'Tu entends une seule phrase (question, remarque, demande) et tu choisis la réponse la plus naturelle parmi 4. Tâche rapide et très nombreuse (≈ 15-19 items) : elle pèse lourd dans le Listening.',
      format: ['Une phrase courte, entendue une seule fois', '4 réponses écrites', '≈ 20-30 s par item'],
      c1: ['Comprendre les réponses indirectes (« I already ate » = non)', 'Décoder les formules : Would you mind…? / Why don\'t we…? / I was wondering if…', 'Connaître les phrasal verbs et idiomes du quotidien'],
      method: ['Identifie la FONCTION de la phrase : question fermée, demande, suggestion, plainte, invitation, information.', 'La bonne réponse est souvent indirecte mais logique.', 'Élimine les réponses qui répètent un mot entendu (écho sonore) : c\'est le piège le plus fréquent.', 'Vérifie le temps : une question au passé appelle une réponse au passé.', 'Question en Wh- (where, when, why…) : la réponse doit contenir l\'info correspondante, jamais « Yes/No ».'],
      traps: ['« Would you mind…? » → « Not at all » = OUI, avec plaisir', '« move up a deadline » = avancer (pas repousser)', 'Homophones : weather/whether, whose/who\'s, close (fermer)/close to (près)'],
    },
    conv: {
      what: 'Une courte conversation (≈ 35-100 mots) entre deux personnes, souvent sur le campus, suivie de 2 questions.',
      format: ['Audio entendu une seule fois', 'Questions affichées APRÈS l\'audio', '≈ 2 questions par conversation'],
      c1: ['Saisir le problème et la solution', 'Comprendre l\'attitude ou l\'intention (« So you\'ve already made up your mind »)', 'Prédire ce qu\'une personne va faire ensuite'],
      method: ['Dès les 2 premières répliques, identifie : qui ? quel problème ?', 'Note sur papier : problème → solution proposée → décision finale.', 'La dernière réplique contient souvent la réponse à « What will the man/woman do? ».', 'Les mots de contraste (but, actually, though) annoncent l\'info importante.'],
      traps: ['Choisir la 1re solution proposée alors qu\'elle est rejetée ensuite', 'Confondre ce que dit l\'homme et ce que dit la femme'],
    },
    ann: {
      what: 'Une annonce de campus ou de cours (≈ 40-85 mots) : changement d\'horaire, consigne, fermeture… 2-3 questions.',
      format: ['Un seul locuteur', 'Questions sur le but, les détails pratiques (quand, où, quoi faire) et les implications'],
      c1: ['Retenir des détails précis (dates, heures, lieux) sans les relire', 'Comprendre la raison d\'un changement'],
      method: ['1re phrase = sujet de l\'annonce (purpose).', 'Note les chiffres, jours et lieux au fur et à mesure.', 'Repère les verbes d\'instruction : please, make sure, don\'t forget, must.', 'Écoute bien « however / unless / except » : c\'est là que se cachent les questions.'],
      traps: ['Confondre l\'horaire initial et le nouvel horaire', 'Oublier une exception (« unless you receive an email »)'],
    },
    talk: {
      what: 'Un mini-cours de 100 à 250 mots (1 à 2 minutes) en biologie, économie, histoire, psychologie… suivi d\'environ 4 questions. C\'est la tâche la plus « C1 » du Listening.',
      format: ['Un professeur, parfois de l\'humour ou des apartés', 'Questions : idée principale, détail, fonction (« Why does the professor mention…? »), attitude, inférence'],
      c1: ['Suivre une structure : idée reçue → correction ; théorie → critique ; problème → solution', 'Comprendre les signaux oraux : « Now, here\'s the interesting part », « so to speak », « Let\'s turn to »', 'Inférer l\'opinion du professeur'],
      method: ['Prends des notes en 2 colonnes : idée principale | exemples.', 'Note les définitions : le prof définit presque toujours le terme clé.', 'Quand tu entends « for example » ou un nom propre, demande-toi : ça illustre QUOI ?', 'Les mots d\'opinion (remarkably, unfortunately, controversial) répondent aux questions d\'attitude.', 'La conclusion du prof résume souvent la réponse à « main idea ».'],
      traps: ['Confondre l\'idée reçue que le prof réfute et sa propre position', 'Se focaliser sur un détail chiffré au détriment de la structure'],
    },
    bas: {
      what: 'Une personne dit quelque chose ; tu reconstruis la réponse en remettant des blocs de mots dans l\'ordre. 10 items. C\'est de la grammaire pure : ordre des mots, questions indirectes, temps, prépositions.',
      format: ['10 phrases, ≈ 6 minutes au total', 'Certains mots sont déjà placés', 'Parfois un bloc en trop (distracteur)', '1 point par phrase, tout ou rien'],
      c1: ['Questions indirectes sans inversion (« I wonder what time it closes »)', 'Inversions formelles (Not only did…, Had I known…)', 'Constructions verbales (suggest that + base verbale, insist on + -ing, expect someone to)'],
      method: ['Lis la phrase de l\'interlocuteur : elle impose le temps et le sujet de la réponse.', 'Trouve d\'abord le sujet + le verbe conjugué, puis construis autour.', 'Place les prépositions de lieu avant celles de temps (at the library on Friday).', 'Adverbes de fréquence avant le verbe principal, après « be ».', 'S\'il reste un bloc, c\'est le distracteur : vérifie qu\'il est bien fautif (ex. « does it » dans une question indirecte).'],
      traps: ['« since » vs « for » (depuis)', '« depend on », « listen to », « insist on » (prépositions)', '« suggest me to » n\'existe pas', 'Question indirecte avec inversion (erreur la plus courante)'],
    },
    email: {
      what: 'Une situation de la vie universitaire ; tu écris un e-mail en 7 minutes qui remplit 3 consignes (expliquer, demander, proposer…). Noté de 0 à 5 par une IA entraînée sur des correcteurs humains.',
      format: ['7 minutes', 'Destinataire imposé (professeur, service, camarade, entreprise)', 'Pas de nombre de mots officiel : vise 120-180 mots pour un niveau C1'],
      c1: ['Les 3 consignes traitées ET développées (pas juste mentionnées)', 'Registre adapté au destinataire', 'Structures variées (conditionnel, passif, relatives) et vocabulaire précis', 'Quasiment aucune erreur'],
      method: ['30 s : lis la situation, souligne les 3 consignes et le destinataire.', 'Salutation adaptée : « Dear Professor Thompson, » / « Hi Jordan, ».', 'Phrase 1 : le motif de l\'e-mail (« I am writing regarding… »).', 'Un paragraphe par consigne, dans l\'ordre, chacun avec un détail concret (date, chiffre, exemple).', 'Formule de clôture + remerciement + « Best regards, Prénom ».', 'Garde 1 minute pour relire : accords, -s, prépositions.'],
      traps: ['Oublier une consigne = impossible d\'avoir plus de 3', 'Ton trop familier avec un professeur, ou trop pompeux avec un camarade', 'Gallicismes : « I permit myself to », « I would like to know if it would be possible that »'],
      tools: '<p><b>Phrases utiles :</b> I am writing regarding… · I was wondering whether it would be possible to… · I would be grateful if you could… · Unfortunately, … As a result, … · Would … work for you? · Please let me know if you need any further information. · Thank you in advance for your help.</p>',
    },
    disc: {
      what: 'Un professeur pose une question sur un forum de cours ; deux étudiants ont déjà répondu. Tu écris ta contribution en 10 minutes. Noté de 0 à 5.',
      format: ['10 minutes', 'Au moins 100 mots recommandés — vise 130-180 pour un 5', 'Tu dois donner ton avis ET faire avancer la discussion'],
      c1: ['Une idée NOUVELLE (ne pas répéter les étudiants)', 'Un exemple concret et développé', 'Référence explicite à un étudiant (accord/désaccord nuancé)', 'Syntaxe variée, vocabulaire précis et idiomatique'],
      method: ['1 min : lis la question et les 2 réponses. Trouve l\'angle que personne n\'a pris (distinction, condition, 3e voie, conséquence cachée).', 'Phrase 1 : ta position claire (« In my view, … depends less on X than on Y »).', 'Développement : raison → exemple précis (pays, entreprise, expérience personnelle, chiffre plausible) → conséquence.', 'Mentionne un étudiant : « While Mateo is right that…, he overlooks… ».', 'Conclusion d\'une phrase qui reformule ta position.', '1 min de relecture.'],
      traps: ['Paraphraser un étudiant = contribution « non originale » → 3 maximum', 'Exemple trop vague (« for example, many people think… »)', 'Abus de « I think » : varie (I would argue that, It seems to me that, I am convinced that)'],
      tools: '<p><b>Structures C1 :</b> Admittedly, … yet … · What matters most is … · Far from …, … · This is precisely why … · Not only does …, but it also … · Were governments to …, they would … · In short, …</p>',
    },
    rep: {
      what: 'Tu entends 7 phrases (sans texte) de plus en plus longues (de ≈ 5 à 25 mots) dans un contexte (bibliothèque, musée…) et tu les répètes exactement. Chaque phrase est notée de 0 à 5 : exactitude, prononciation, intonation, fluidité.',
      format: ['7 phrases, une seule écoute', 'Quelques secondes pour répéter après chaque phrase', 'Environ 64 % des points du Speaking !'],
      c1: ['Répéter les phrases complexes (subordonnées, relatives) presque mot pour mot', 'Garder le rythme et l\'intonation anglaise (mots accentués / mots réduits)', 'Contractions exactes (won\'t, you\'ll, hasn\'t)'],
      method: ['Écoute le SENS, pas les mots isolés : on retient mieux une idée qu\'une liste.', 'Découpe mentalement en groupes de sens : [Students who return materials late] [won\'t be able to borrow anything else] [until the fine is paid].', 'Commence à parler dès le bip, sans hésiter.', 'Si tu perds un mot, continue : un mot manqué coûte moins qu\'une longue pause.', 'Imite la mélodie : accent sur les mots porteurs de sens, réduis « to, of, and, the ».'],
      traps: ['Transformer la phrase avec tes propres mots (paraphrase = points perdus)', 'Oublier les petits mots (the, a, have) et les terminaisons (-ed, -s)', 'Prononcer le « h » muet / oublier le « h » aspiré, « th » en « z »'],
      tools: '<p><b>Entraînement n°1 : le shadowing.</b> 10 min/jour : lance un podcast (BBC 6 Minute English, TED-Ed, NPR) et répète en même temps que le locuteur, avec 0,5 s de décalage. En 3-4 semaines, ta mémoire auditive et ton rythme changent nettement.</p>',
    },
    int: {
      what: 'Un chercheur (vidéo) te pose 4 questions sur un thème ; tu réponds à chacune pendant 45 secondes, SANS temps de préparation. Les questions vont du personnel au plus abstrait (opinion, prédiction).',
      format: ['4 questions, 45 s chacune', '0 seconde de préparation', 'Notation 0-5 : pertinence, développement, fluidité, prononciation, grammaire et vocabulaire'],
      c1: ['Parler 45 s sans blanc, avec 90-120 mots', 'Structurer : réponse directe + raison + exemple + nuance', 'Utiliser des structures variées et un vocabulaire précis', 'Rester intelligible avec une intonation naturelle'],
      method: ['0-5 s : réponse directe, sans répéter la question (« Honestly, I\'d say… »).', '5-20 s : première raison + exemple personnel concret.', '20-35 s : deuxième raison OU nuance (« That said, … »).', '35-45 s : phrase de conclusion (« So overall, … »).', 'Pour gagner 2 secondes de réflexion sans « euh » : « That\'s an interesting question. I\'d say… »'],
      traps: ['S\'arrêter à 25 s (réponse « peu développée » → 3 max)', 'Répéter les mots de la question au lieu de reformuler', 'Remplir avec « like », « you know », « euh »', 'Toujours les mêmes connecteurs (and, but, because)'],
      tools: '<p><b>Amorces utiles :</b> Personally, I tend to… · What I find most … is … · For instance, last year… · On top of that, … · That said, … · It really depends on … · So all in all, … · If I had to choose, I\'d go with …</p>',
    },
  },

  html() {
    const tbl = [[6, 'C2', '114-120'], [5.5, 'C1 (haut)', '107-113'], [5, 'C1', '95-106'], [4.5, 'B2 (haut)', '86-94'], [4, 'B2', '72-85'], [3.5, 'B1 (haut)', '58-71'], [3, 'B1', '44-57'], [2.5, 'A2 (haut)', '34-43'], [2, 'A2', '24-33'], [1.5, 'A1 (haut)', '12-23'], [1, 'A1', '0-11']];
    return `<h1>Guide du TOEFL iBT 2026</h1>
    <p class="t2">Synthèse de la documentation officielle d'ETS (Test Blueprint & Specifications 2026, pages Score Scale et Test Content), croisée avec les guides de préparation publiés depuis le lancement du nouveau format.</p>

    <div class="callout warn mt"><b>⚠️ Le TOEFL a changé le 21 janvier 2026.</b> Nouveau test plus court (≈ 1 h 25), nouvelles tâches, Reading et Listening <b>adaptatifs</b>, et nouvelle échelle de <b>1 à 6</b> alignée sur le CECRL. Jusqu'en 2028, ETS affiche aussi un score équivalent sur l'ancienne échelle 0-120. Méfie-toi des manuels et vidéos d'avant 2026 : ils préparent à un autre examen.</div>

    <div class="card mt"><h2>1. Quel score correspond à quel niveau ?</h2>
      <div class="table-wrap"><table class="tbl"><tr><th>Bande (1-6)</th><th>CECRL</th><th>Équivalent 0-120</th><th></th></tr>
      ${tbl.map(([b, c, s]) => `<tr class="${b === 5 || b === 5.5 ? 'hl' : ''}"><td><b>${b.toFixed(1)}</b></td><td>${c}</td><td>${s}</td><td>${b === 5.5 ? '🎯 objectif haut (≥ 107)' : b === 5 ? '🎯 objectif (100-106)' : b === 4.5 ? 'min. ESCP publié (90)' : ''}</td></tr>`).join('')}</table></div>
      <p class="small t2 mt">Ton objectif de <b>100-110</b> correspond aux bandes <b>5.0 à 5.5, soit un niveau C1</b>. Le score global = moyenne des 4 sections arrondie à la demi-bande la plus proche (5.25 → 5.5). Exemple : R 5.5 · L 5.5 · W 5.0 · S 5.0 → moyenne 5.25 → <b>5.5</b>.</p></div>

    <div class="card"><h2>2. Le nouveau format en un coup d'œil</h2>
      <div class="table-wrap"><table class="tbl"><tr><th>Section</th><th>Tâches</th><th>Items</th><th>Durée</th></tr>
        <tr><td><i class="dot R"></i> Reading</td><td>Complete the Words · Read in Daily Life · Read an Academic Passage</td><td>≈ 50</td><td>≈ 27-30 min</td></tr>
        <tr><td><i class="dot L"></i> Listening</td><td>Listen and Choose a Response · Conversation · Announcement · Academic Talk</td><td>≈ 47</td><td>≈ 25-29 min</td></tr>
        <tr><td><i class="dot W"></i> Writing</td><td>Build a Sentence (×10) · Write an Email (7 min) · Academic Discussion (10 min)</td><td>12</td><td>≈ 23 min</td></tr>
        <tr><td><i class="dot S"></i> Speaking</td><td>Listen and Repeat (×7) · Take an Interview (4 × 45 s)</td><td>11</td><td>≈ 8 min</td></tr></table></div>
      <ul class="fb-list mt">
        <li><b>Adaptatif (Reading & Listening) :</b> un module « routeur » puis un 2e module plus difficile ou plus facile selon ta performance. Pour viser 5+, il faut <b>réussir le 1er module</b> afin d'accéder au module difficile.</li>
        <li><b>Correction par IA</b> pour Writing et Speaking (grille 0-5 par tâche). Build a Sentence est corrigé automatiquement (1 point, tout ou rien).</li>
        <li><b>Points bruts (blueprint ETS) :</b> Reading 35 · Listening 35 · Writing 20 (10 BaS + 5 + 5) · Speaking 55 (7×5 + 4×5). Conséquence : <b>Listen and Repeat pèse ≈ 64 % du Speaking</b> et Build a Sentence ≈ 50 % du Writing.</li>
        <li>Certains items de Reading/Listening sont expérimentaux (non notés) : traite-les tous sérieusement.</li>
        <li>Plus de pause de 10 minutes, audio joué une seule fois, prise de notes autorisée.</li></ul></div>

    <div class="card"><h2>3. Ce que « C1 » veut dire concrètement (descripteurs ETS)</h2>
      <div class="grid g2">
        <div><h3><i class="dot R"></i> Reading</h3><ul class="fb-list"><li>Comprendre des textes complexes et abstraits</li><li>Interpréter les nuances, idiomes, sous-entendus</li><li>Relier les informations à travers le texte, faire des inférences</li><li>Morphologie et syntaxe solides (Complete the Words)</li></ul></div>
        <div><h3><i class="dot L"></i> Listening</h3><ul class="fb-list"><li>Comprendre des cours et discussions complexes</li><li>Inférer attitudes, intentions et sens implicite</li><li>Reconnaître la structure rhétorique (comparaison, cause/effet)</li><li>Accents variés : US, UK, Australie</li></ul></div>
        <div><h3><i class="dot W"></i> Writing</h3><ul class="fb-list"><li>Textes bien structurés et cohérents qui développent un point de vue</li><li>Registre adapté (formel/informel)</li><li>Syntaxe variée, vocabulaire précis, quasiment aucune erreur</li></ul></div>
        <div><h3><i class="dot S"></i> Speaking</h3><ul class="fb-list"><li>Répéter des phrases complexes avec précision, intonation et accentuation justes</li><li>Répondre spontanément et avec aisance à des questions complexes</li><li>Vocabulaire précis, grammaire avancée, parfaitement intelligible</li></ul></div>
      </div></div>

    <div class="card"><h2>4. Ton contexte : ESCP, Master in Finance (AST)</h2>
      <ul class="fb-list">
        <li>Selon les guides d'admissions parallèles 2026, ESCP demande un <b>TOEFL iBT de 90 minimum</b> (≈ bande 4.5, B2+). Viser 100-110 te place nettement au-dessus du seuil : c'est un signal fort pour un master en finance enseigné en anglais.</li>
        <li><b>À vérifier :</b> avec la nouvelle échelle, plusieurs écoles ont révisé leurs minimums début 2026. Vérifie l'exigence exacte (en bande 1-6 et/ou 0-120) sur la page officielle d'ESCP avant de t'inscrire, ainsi que la <b>validité de 2 ans</b> du score.</li>
        <li>Personnalisation : une partie des textes, e-mails, discussions et entretiens porte sur la finance, l'économie et le business, pour que ta préparation serve aussi aux oraux de l'AST.</li></ul></div>

    <div class="card"><h2>5. Où se gagnent les points pour un francophone visant C1</h2>
      <ol class="fb-list">
        <li><b>Listen and Repeat (Speaking) :</b> énorme poids et très entraînable. Shadowing 10 min/jour.</li>
        <li><b>Complete the Words (Reading) :</b> ≈ 30 items. Vocabulaire académique + orthographe exacte : 10 min de cartes par jour.</li>
        <li><b>Build a Sentence (Writing) :</b> 10 points sur 20. Des automatismes de grammaire (questions indirectes, since/for, prépositions).</li>
        <li><b>Listen and Choose a Response :</b> nombreux items rapides : idiomes, phrasal verbs, réponses indirectes.</li>
        <li><b>Email et Discussion :</b> méthode fixe + relecture. Passer de 4 à 5 = une idée originale + un exemple précis + zéro gallicisme.</li>
      </ol></div>

    <div class="card"><h2>6. Méthode de travail recommandée</h2>
      <ul class="fb-list">
        <li><b>Régularité > volume :</b> 45-60 min par jour valent mieux que 5 h le dimanche (effet d'espacement).</li>
        <li><b>Carnet d'erreurs :</b> refaire ses erreurs à J+1 et J+3 est la technique la plus rentable.</li>
        <li><b>Test blanc = analyse :</b> passe autant de temps à analyser un test blanc qu'à le faire.</li>
        <li><b>Immersion ciblée :</b> podcasts économiques (The Economist, Planet Money, FT News Briefing) en shadowing ; lecture d'articles académiques courts.</li>
        <li><b>Test officiel gratuit :</b> fais aussi le test d'entraînement gratuit d'ETS (TOEFL TestReady) 2-3 semaines avant le jour J pour valider ton estimation.</li></ul></div>

    <div class="card"><h2>7. Checklist du jour J</h2>
      <ul class="fb-list">
        <li>Pièce d'identité valide (passeport de préférence), exactement au nom de l'inscription.</li>
        <li>TOEFL à domicile : ordinateur, webcam, micro/casque filaire, connexion stable, bureau vide, miroir ou téléphone pour montrer l'écran, logiciel ETS testé la veille.</li>
        <li>Pas de pause officielle (≈ 1 h 25) : mange et hydrate-toi avant.</li>
        <li>Échauffement 15 min : 1 série Listen & Repeat + 2 questions d'entretien à voix haute.</li>
        <li>Pendant le test : ne bloque jamais sur un item, la note dépend de l'ensemble.</li></ul></div>

    <div class="card"><h2>Sources</h2><ul class="small">
      <li><a href="https://www.ets.org/toefl/institutions/ibt/score-scale-update.html" target="_blank">ETS — TOEFL iBT Score Scale Update (1-6, CEFR, équivalences 0-120)</a></li>
      <li><a href="https://www.ets.org/toefl/test-takers/ibt/about/content.html" target="_blank">ETS — TOEFL iBT Test Content (sections, tâches, durées)</a></li>
      <li><a href="https://www.in.ets.org/content/dam/ets-org/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf" target="_blank">ETS — Test Blueprint and Specifications 2026 (PDF)</a></li>
      <li><a href="https://www.ets.org/toefl/test-takers/ibt/scores/understand-scores.html" target="_blank">ETS — Understand your scores</a></li>
      <li><a href="https://college-council.com/en/blog/toefl-2026-reading-new-tasks-strategies" target="_blank">College Council — Reading 2026</a> · <a href="https://college-council.com/en/blog/toefl-2026-writing-new-tasks-guide" target="_blank">Writing 2026</a> · <a href="https://college-council.com/en/blog/toefl-2026-speaking-listen-repeat-take-interview" target="_blank">Speaking 2026</a></li>
      <li><a href="https://testsucceed.com/materials/tests/toefl_new/en/description/listening/toefl-2026-new-listen-and-choose-reponse.html" target="_blank">TestSucceed — Listen and Choose a Response</a></li>
      <li><a href="https://astprep.com/nos-ressources/admissibilite/escp" target="_blank">ASTPrep — Admissibilité ESCP 2026</a> · <a href="https://www.aurlom.com/ast/escp" target="_blank">Aurlom — Concours AST ESCP</a></li></ul>
      <p class="small muted">Les conversions « % de réussite → bande » de l'appli sont des estimations (ETS ne publie pas ses tables brutes) : elles sont volontairement exigeantes.</p></div>`;
  },
};
