/* WRITING — Build a Sentence, Write an Email, Academic Discussion
   bas : a = ce que dit l'interlocuteur ; b = réponse (texte fixe + [blocs] dans l'ordre correct) ; x = bloc en trop ; g = point de grammaire */
CONTENT.bas = [
  { id: 'b01', diff: 1, a: 'Can you come to the study group on Friday?', b: 'That\'s a problem [because] [I already have] [an appointment] [on Friday].', g: 'Ordre de base : sujet + (adverbe de fréquence/« already ») + verbe + complément + temps.' },
  { id: 'b02', diff: 1, a: 'Where did you find that book?', b: 'I [found it] [at the library] [near] [the train station].', g: 'Verbe + pronom objet (« found it ») puis le lieu.' },
  { id: 'b03', diff: 2, a: 'Why was the lecture cancelled?', b: 'Apparently, [the professor] [had to] [leave] [for a conference].', x: 'has', g: '« had to » + base verbale (passé de « must »).' },
  { id: 'b04', diff: 2, a: 'Do you know when the library closes tonight?', b: 'I\'m not sure [what time] [it closes], [but] [I can check].', x: 'does it', g: 'Question indirecte : pas d\'inversion → « what time it closes », jamais « what time does it close ».' },
  { id: 'b05', diff: 2, a: 'How did your presentation go?', b: 'It went [much better] [than] [I had] [expected].', g: 'Comparatif « much better than » + plus-que-parfait pour l\'attente antérieure.' },
  { id: 'b06', diff: 3, a: 'Have you decided which internship to accept?', b: 'Not yet — [I\'m still] [weighing] [the pros and cons] [of each offer].', g: 'Présent continu + « still » avant le verbe principal ; « weigh the pros and cons ».' },
  { id: 'b07', diff: 1, a: 'What are you doing this weekend?', b: 'I\'m [going] [to visit] [my grandparents] [in Lyon].', g: '« be going to » + base verbale pour un projet.' },
  { id: 'b08', diff: 2, a: 'Could you send me the slides from today?', b: 'Sure, [I\'ll email] [them] [to you] [after class].', x: 'you them', g: '« send/email something to someone » : l\'objet direct avant « to + personne ».' },
  { id: 'b09', diff: 3, a: 'Why didn\'t you apply for the scholarship?', b: 'I [would have applied] [if] [I had known] [about the deadline].', x: 'would know', g: 'Conditionnel passé (3e type) : if + plus-que-parfait, would have + participe.' },
  { id: 'b10', diff: 2, a: 'Is the new café on campus any good?', b: 'Yes, [it\'s] [the best place] [I\'ve found] [to study].', g: 'Superlatif + relative sans « that » (« the best place I\'ve found »).' },
  { id: 'b11', diff: 3, a: 'What did the professor say about our essays?', b: 'She asked [whether] [we had] [used] [enough sources].', x: 'did we', g: 'Discours indirect : « whether » + ordre affirmatif + concordance des temps.' },
  { id: 'b12', diff: 1, a: 'Where should we meet tomorrow?', b: 'Let\'s [meet] [in front of] [the main entrance] [at ten].', g: '« Let\'s » + base verbale ; lieu puis heure.' },
  { id: 'b13', diff: 2, a: 'How long have you been learning Spanish?', b: 'I [have been] [studying it] [for] [about three years].', x: 'since', g: '« for » + durée (« since » + point de départ). Piège classique des francophones (« depuis »).' },
  { id: 'b14', diff: 3, a: 'Did the company accept your proposal?', b: 'Not only [did they accept it], [but they] [also offered] [me a job].', g: 'Inversion après « Not only » en début de phrase : « Not only did they… ».' },
  { id: 'b15', diff: 2, a: 'Do you mind if I sit here?', b: 'Not at all, [this seat] [isn\'t] [taken] [by anyone].', g: 'Passif au présent : « isn\'t taken ».' },
  { id: 'b16', diff: 1, a: 'What time does the bus leave?', b: 'The next bus [leaves] [at] [a quarter] [past nine].', g: 'Présent simple pour les horaires ; « a quarter past nine » = 9 h 15.' },
  { id: 'b17', diff: 3, a: 'Why are you so worried about the exam?', b: 'The problem is [that] [I haven\'t] [had] [enough time to prepare].', g: '« The problem is that » + present perfect (pas assez de temps jusqu\'ici).' },
  { id: 'b18', diff: 2, a: 'Can you recommend a good restaurant nearby?', b: 'There\'s [a small Italian place] [that] [my friends] [really like].', g: 'Relative objet avec « that » ; ordre des adjectifs : taille avant origine.' },
  { id: 'b19', diff: 3, a: 'Should we finish the report tonight?', b: 'I\'d rather [we] [waited] [until tomorrow] [to finish it].', x: 'wait', g: '« I\'d rather + sujet + prétérit » pour une préférence sur l\'action d\'autrui.' },
  { id: 'b20', diff: 1, a: 'Who told you about the party?', b: 'My roommate [told me] [about it] [yesterday] [afternoon].', g: '« tell someone about something ».' },
  { id: 'b21', diff: 2, a: 'Is it difficult to get a room in the dorms?', b: 'It depends [on] [when] [you] [submit your application].', x: 'of', g: '« depend on » (jamais « depend of »).' },
  { id: 'b22', diff: 3, a: 'What did you think of the guest speaker?', b: 'I found [her argument] [far more] [convincing] [than I expected].', g: '« find + objet + adjectif » ; « far more » pour renforcer un comparatif.' },
  { id: 'b23', diff: 2, a: 'Why are you taking the stairs?', b: 'The elevator [has been] [out of order] [since] [this morning].', x: 'for', g: 'Present perfect + « since » + point de départ.' },
  { id: 'b24', diff: 1, a: 'Can I borrow your notes?', b: 'Of course, [you can] [have them] [until] [next week].', g: 'Modal + base verbale ; « until » = jusqu\'à.' },
  { id: 'b25', diff: 3, a: 'How was the negotiation with the client?', b: 'Harder than expected; [they] [insisted on] [reducing] [the price].', x: 'to reduce', g: '« insist on + V-ing ».' },
  { id: 'b26', diff: 2, a: 'Where can I find information about exchange programs?', b: 'You should [ask] [the international office], [which is] [next to the library].', g: 'Relative non déterminative avec virgule + « which ».' },
  { id: 'b27', diff: 3, a: 'Did you finish reading the case study?', b: 'Almost; [I only have] [a few pages] [left] [to read].', g: '« have + quantité + left » = il me reste.' },
  { id: 'b28', diff: 1, a: 'How often do you go running?', b: 'I [usually] [go running] [three times] [a week].', g: 'Adverbe de fréquence avant le verbe ; « three times a week ».' },
  { id: 'b29', diff: 2, a: 'Are you coming to the career fair?', b: 'I\'ll come [as long as] [I] [finish] [my assignment in time].', x: 'will finish', g: 'Après « as long as / if / when » : présent, pas « will ».' },
  { id: 'b30', diff: 3, a: 'Why did the startup fail?', b: 'It ran out of cash [before] [it] [could] [attract new investors].', g: '« run out of » + « before + sujet + could ».' },
  { id: 'b31', diff: 2, a: 'Have you ever been to Canada?', b: 'No, but [I\'ve always] [wanted] [to go] [there].', x: 'been', g: 'Present perfect + « always » entre l\'auxiliaire et le participe.' },
  { id: 'b32', diff: 1, a: 'What\'s wrong with your laptop?', b: 'It [won\'t] [turn on] [after] [the update].', g: '« won\'t » = refus/impossibilité (ne veut pas s\'allumer).' },
  { id: 'b33', diff: 3, a: 'What did the advisor recommend?', b: 'She suggested [that] [I] [take] [fewer courses next term].', x: 'to take', g: '« suggest that + sujet + base verbale » (subjonctif) ; jamais « suggest me to ».' },
  { id: 'b34', diff: 2, a: 'Is the museum worth visiting?', b: 'Definitely, [it\'s] [one of] [the most interesting] [places in the city].', g: '« one of the + superlatif + pluriel ».' },
  { id: 'b35', diff: 3, a: 'Why is the project behind schedule?', b: 'Mostly because [the data] [we needed] [were delivered] [two weeks late].', g: 'Passif au passé ; relative sans pronom (« the data we needed »).' },
  { id: 'b36', diff: 1, a: 'Do you want to watch a movie tonight?', b: 'I\'d love to, [but] [I have] [to study] [for an exam].', g: '« have to » = devoir (obligation).' },
  { id: 'b37', diff: 2, a: 'How did you get to campus so quickly?', b: 'A friend [gave me] [a ride] [in] [her car].', g: '« give someone a ride » = emmener en voiture.' },
  { id: 'b38', diff: 3, a: 'What do you plan to do after graduation?', b: 'I\'m hoping [to work] [in corporate finance] [before] [starting a master\'s].', x: 'to start', g: '« before + V-ing ».' },
  { id: 'b39', diff: 2, a: 'Why did you change your major?', b: 'I realized [that] [economics] [was] [more suited to my interests].', g: 'Concordance des temps après « realized » ; « suited to ».' },
  { id: 'b40', diff: 3, a: 'Is the new policy going to affect students?', b: 'It\'s unclear [how much] [it will] [affect] [undergraduates].', x: 'will it', g: 'Question indirecte après « It\'s unclear » : ordre affirmatif.' },
  { id: 'b41', diff: 1, a: 'Where is the nearest post office?', b: 'It\'s [just around] [the corner], [next to] [the bakery].', g: 'Prépositions de lieu : « around the corner », « next to ».' },
  { id: 'b42', diff: 2, a: 'What did you do during the break?', b: 'I spent [most of] [the time] [working] [on my thesis].', x: 'to work', g: '« spend time + V-ing ».' },
  { id: 'b43', diff: 3, a: 'Do you think the interest rate will rise again?', b: 'Most analysts expect [the central bank] [to keep] [rates] [unchanged this year].', x: 'keeping', g: '« expect someone to do something ».' },
  { id: 'b44', diff: 2, a: 'Could you help me with this statistics problem?', b: 'I\'d be happy to, [although] [I\'m] [not an expert] [in statistics].', g: '« although » + proposition complète.' },
  { id: 'b45', diff: 1, a: 'Why are you late?', b: 'Sorry, [I] [missed] [the first bus] [this morning].', g: 'Prétérit pour une action terminée.' },
  { id: 'b46', diff: 3, a: 'How should we present our findings?', b: 'We\'d better [focus on] [the results] [that] [surprised us the most].', g: '« had better + base verbale » ; relative sujet avec « that ».' },
  { id: 'b47', diff: 2, a: 'Did you get the job?', b: 'I don\'t know yet; [they] [said] [they would] [call me next week].', x: 'will', g: 'Discours indirect : « will » → « would ».' },
  { id: 'b48', diff: 3, a: 'Why didn\'t the team hit its target?', b: 'Had [we] [started] [earlier], [we would have met it].', g: 'Inversion conditionnelle formelle : « Had we started… » = If we had started.' },
  { id: 'b49', diff: 1, a: 'What kind of music do you like?', b: 'I [mostly] [listen to] [jazz] [and classical music].', g: '« listen to » (préposition obligatoire).' },
  { id: 'b50', diff: 2, a: 'Is it okay to submit the essay by email?', b: 'The professor prefers [that] [we] [upload it] [to the course website].', g: 'Prefer that + sujet + verbe.' },
  { id: 'b51', diff: 3, a: 'What surprised you most about the internship?', b: 'What surprised me [most] [was] [how much responsibility] [I was given].', g: 'Pseudo-clivée « What surprised me was… » + passif « I was given ».' },
  { id: 'b52', diff: 2, a: 'Are you ready for the exam?', b: 'Not really; [there are] [still] [a few chapters] [I need to review].', g: '« there are still + nom pluriel » + relative sans pronom.' },
  { id: 'b53', diff: 1, a: 'When did you arrive in Paris?', b: 'I [arrived] [two days ago] [by] [train].', g: '« ago » avec le prétérit ; « by train ».' },
  { id: 'b54', diff: 3, a: 'Why is everyone talking about the merger?', b: 'Because [it could] [reshape] [the entire industry] [within a few years].', g: 'Modal « could » (possibilité) + base verbale.' },
  { id: 'b55', diff: 2, a: 'How do you usually prepare for interviews?', b: 'I [try to] [anticipate] [the questions] [they might ask].', g: '« try to + base verbale » ; relative sans pronom.' },
  { id: 'b56', diff: 3, a: 'Should I mention my weaknesses in the interview?', b: 'Only if [you] [can explain] [how] [you are working on them].', g: '« how » + proposition affirmative.' },
  { id: 'b57', diff: 1, a: 'Can you open the window?', b: 'Sure, [it\'s] [really] [hot] [in here].', g: '« it\'s hot in here » : adverbe d\'intensité avant l\'adjectif.' },
  { id: 'b58', diff: 2, a: 'Why do you prefer online classes?', b: 'They allow me [to] [work] [at my own pace] [from home].', x: 'working', g: '« allow someone to do ».' },
  { id: 'b59', diff: 3, a: 'Was the conference useful?', b: 'Very much so; [I made] [several contacts] [who] [could help me later].', g: 'Relative sujet avec « who » pour des personnes.' },
  { id: 'b60', diff: 2, a: 'What should I bring to the lab?', b: 'You\'ll need [your goggles], [a notebook], [and] [a lab coat].', g: 'Énumération : virgules + « and » avant le dernier élément.' },
  { id: 'b61', diff: 3, a: 'How did the market react to the announcement?', b: 'Shares fell sharply, [even though] [the company] [had] [beaten expectations].', g: '« even though » + plus-que-parfait (antériorité).' },
  { id: 'b62', diff: 1, a: 'Do you have any brothers or sisters?', b: 'Yes, [I have] [an older sister] [who lives] [in London].', g: 'Relative « who » ; « older » pour l\'âge.' },
  { id: 'b63', diff: 2, a: 'Why don\'t you take the earlier train?', b: 'It\'s [too early] [for me] [to] [get to the station].', g: '« too + adjectif + for someone + to do ».' },
  { id: 'b64', diff: 3, a: 'What\'s the main risk of the strategy?', b: 'The main risk [is] [that] [competitors] [might copy it quickly].', g: '« The risk is that » + modal de probabilité.' },
  { id: 'b65', diff: 2, a: 'Have you finished the group assignment?', b: 'We\'ve done [most of it], [but] [the conclusion] [still needs work].', x: 'need', g: 'Accord : « the conclusion needs » (3e personne -s).' },
  { id: 'b66', diff: 1, a: 'What did you have for lunch?', b: 'I [had] [a salad] [and] [some soup].', g: '« have lunch/a salad » = manger (prétérit « had »).' },
  { id: 'b67', diff: 3, a: 'Why did you choose this university?', b: 'Mainly [because of] [its strong reputation] [in] [quantitative finance].', x: 'because', g: '« because of + nom » vs « because + proposition ».' },
  { id: 'b68', diff: 2, a: 'Is there anything I can do to help?', b: 'Actually, [could you] [pick up] [some printer paper] [on your way]?', g: 'Demande polie « could you » ; verbe à particule « pick up ».' },
  { id: 'b69', diff: 3, a: 'Did you understand the professor\'s explanation?', b: 'Not entirely; [I wish] [she] [had given] [more examples].', x: 'gave', g: '« I wish + plus-que-parfait » = regret sur le passé.' },
  { id: 'b70', diff: 2, a: 'How far is the stadium from here?', b: 'It\'s [about] [a ten-minute walk] [from] [the main gate].', g: 'Adjectif composé invariable : « a ten-minute walk » (pas « minutes »).' },
  { id: 'b71', diff: 3, a: 'What would you change about the course?', b: 'I\'d make [the assignments] [more closely] [related to] [real business cases].', g: '« make + objet + adjectif » ; « related to ».' },
  { id: 'b72', diff: 1, a: 'Are you free on Saturday?', b: 'Yes, [I don\'t have] [any plans] [for] [the weekend].', g: '« any » dans une phrase négative.' },
  { id: 'b73', diff: 2, a: 'Why did the meeting take so long?', b: 'Everyone [had] [a different opinion] [about] [the budget].', g: '« everyone » + verbe au singulier ; « opinion about ».' },
  { id: 'b74', diff: 3, a: 'Do you regret not studying abroad?', b: 'Sometimes; [I] [would] [have liked] [to live in another culture].', g: '« would have liked to + base verbale » = j\'aurais aimé.' },
  { id: 'b75', diff: 2, a: 'Do you know who is giving the keynote speech?', b: 'I think [it\'s] [the CEO] [of] [a major investment bank].', g: 'Déterminants : « the CEO of a… ».' },
  { id: 'b76', diff: 3, a: 'Why is the professor so popular?', b: 'She manages [to make] [even complex topics] [easy] [to understand].', g: '« manage to do » ; « make + objet + adjectif + to do ».' },
  { id: 'b77', diff: 1, a: 'What\'s your favorite subject?', b: 'I [really enjoy] [economics] [because] [it explains the world].', g: '« enjoy » + nom (ou V-ing).' },
  { id: 'b78', diff: 2, a: 'Why are you studying in the library instead of at home?', b: 'It\'s [easier] [for me] [to concentrate] [here].', g: '« It\'s + adjectif + for someone + to do ».' },
  { id: 'b79', diff: 3, a: 'What\'s your opinion on remote work?', b: 'It works well [provided that] [teams] [communicate] [clearly and regularly].', g: '« provided that » = à condition que + présent.' },
  { id: 'b80', diff: 2, a: 'Did you remember to book the room?', b: 'Oh no, [I] [completely] [forgot] [to do it].', x: 'doing', g: '« forget to do » (oublier de faire) ≠ « forget doing » (oublier avoir fait).' },
];

CONTENT.email = [
  { id: 'e01', to: 'Professor Thompson', toAddr: 'Professor Thompson', subj: 'Request for an extension',
    s: 'You are taking an economics course with Professor Thompson. A research paper is due on Friday, but you have been sick for the past four days and have not been able to work on it.',
    t: ['Explain your situation', 'Ask for an extension and propose a new deadline', 'Offer to provide any documentation she may need'],
    m: `Dear Professor Thompson,

I hope this email finds you well. I am writing about the research paper for ECON 210, which is due this Friday.

Unfortunately, I have been ill with the flu since Monday and was advised by the campus health center to rest for several days. As a result, I have not been able to make meaningful progress on the paper, although I had already completed most of my background reading.

Would it be possible to extend my deadline until next Wednesday? That would give me enough time to write the analysis carefully rather than submitting a rushed draft. I would of course be happy to provide the medical certificate from the health center, or any other documentation you may require.

Thank you very much for your understanding.

Best regards,
Sacha`,
    tips: 'Objet clair dès la 1re phrase, les 3 consignes traitées dans l\'ordre, une date précise proposée, un ton poli mais pas obséquieux, et une justification (« rather than submitting a rushed draft »).' },
  { id: 'e02', to: 'the manager of the campus bookstore', toAddr: 'Campus Bookstore Manager', subj: 'Incorrect textbook order',
    s: 'You ordered a textbook online from the campus bookstore for your finance course. When the package arrived, it was an older edition, and the course requires the latest one. Your first assignment is due next week.',
    t: ['Describe the problem', 'Explain why it is urgent', 'Say what you would like the bookstore to do'],
    m: `Dear Manager,

I am writing regarding an order I placed online last week (order number 4821) for "Principles of Corporate Finance."

When the package arrived yesterday, I realized that I had received the eleventh edition instead of the thirteenth, which is the edition required for my course. The chapters and problem sets have been substantially updated, so unfortunately the older version is not a workable substitute.

This is fairly urgent, as our first graded assignment is based on the new edition and is due next Tuesday. Ideally, I would like to exchange the book for the correct edition as soon as possible. If it is currently out of stock, could you let me know when it will be available, or offer a refund so that I can buy it elsewhere?

Thank you in advance for your help.

Kind regards,
Sacha`,
    tips: 'Détails concrets (numéro de commande, éditions), urgence justifiée par une échéance, solution principale + solution de repli.' },
  { id: 'e03', to: 'your classmate Jordan', toAddr: 'Jordan', subj: 'Our group project',
    s: 'You and your classmate Jordan are working on a group presentation for your marketing class. Jordan has not answered your last two messages, and the presentation is in eight days.',
    t: ['Remind Jordan about the presentation', 'Explain what still needs to be done', 'Suggest a time to meet'],
    m: `Hi Jordan,

I hope everything is okay — I sent you a couple of messages last week but haven't heard back, so I just wanted to check in.

As you know, our marketing presentation is next Thursday, which only gives us about a week. So far, I've drafted the introduction and the competitor analysis, but we still need to finish the customer survey section, design the slides, and rehearse together at least once.

Would you be free to meet on Saturday afternoon, say around 2 p.m. in the library? If that doesn't work for you, just let me know a time that suits you better and I'll adjust. It would also help if you could send me your part of the survey results before then.

Looking forward to hearing from you!

Best,
Sacha`,
    tips: 'Registre semi-informel adapté à un camarade (contractions OK), ton non accusateur (« I hope everything is okay »), tâches restantes précises, proposition de créneau + alternative.' },
  { id: 'e04', to: 'the organizer of a finance conference', toAddr: 'Conference Organizer', subj: 'Volunteering at the conference',
    s: 'You saw a poster saying that a regional finance conference next month is looking for student volunteers. You are interested in volunteering.',
    t: ['Introduce yourself', 'Explain why you would like to volunteer', 'Ask for information about the tasks and schedule'],
    m: `Dear Conference Organizer,

My name is Sacha, and I am a third-year business student with a strong interest in corporate finance. I recently saw your poster announcing that you are looking for student volunteers for next month's regional finance conference, and I would be delighted to help.

I am particularly keen to volunteer because I plan to apply to master's programs in finance, and the conference would give me a valuable opportunity to hear practitioners discuss current market issues. I also have experience helping to organize events through my university's investment club, so I am comfortable with registration desks, logistics, and welcoming speakers.

Could you tell me more about the tasks volunteers are usually assigned and how many hours or days you would expect us to commit? I would also appreciate knowing whether there is a briefing session beforehand.

Thank you for your time, and I look forward to your reply.

Best regards,
Sacha`,
    tips: 'Présentation brève et pertinente, motivation reliée à un projet personnel ET une compétence utile, deux questions précises.' },
  { id: 'e05', to: 'the director of student housing', toAddr: 'Director of Student Housing', subj: 'Heating problem in my room',
    s: 'The heating in your dormitory room has not been working for a week. You reported it to the front desk twice, but nobody has come to fix it. The weather is getting colder.',
    t: ['Describe the problem and how long it has lasted', 'Explain what you have already done', 'Request a specific action'],
    m: `Dear Director,

I am writing to bring to your attention a problem in my room, B-214 in North Hall, where the heating has not been working for the past seven days.

I reported the issue to the front desk last Monday and again on Thursday, and on both occasions I was told that a technician would come within 48 hours. However, nobody has visited so far, and as temperatures have dropped below freezing at night, the room has become genuinely difficult to sleep and study in.

I would therefore be grateful if you could arrange for a technician to inspect the heater within the next two days. If a repair is not possible quickly, could I be provided with a portable heater in the meantime, or temporarily moved to another room?

Thank you for your attention to this matter.

Sincerely,
Sacha`,
    tips: 'Plainte ferme mais courtoise, chronologie précise, conséquences concrètes, demande datée + alternatives. Connecteurs : « However », « therefore », « in the meantime ».' },
  { id: 'e06', to: 'Dr. Patel, your academic advisor', toAddr: 'Dr. Patel', subj: 'Course selection for next semester',
    s: 'You are choosing courses for next semester. You would like to take an advanced econometrics course, but it requires a prerequisite that you have not completed. You believe your experience is equivalent.',
    t: ['Explain which course you want to take and why', 'Describe your relevant experience', 'Ask whether an exception is possible'],
    m: `Dear Dr. Patel,

I hope you are well. I am currently planning my schedule for next semester and would very much like to enroll in Advanced Econometrics (ECON 450), as it is directly relevant to the master's programs in finance I intend to apply to.

The course officially requires Intermediate Statistics, which I have not taken at our university. However, during my exchange semester in Montreal, I completed a course in applied regression analysis that covered most of the same material, including hypothesis testing and multiple regression. I also used these techniques extensively in a research project on housing prices, for which I received an A.

Would it be possible to request a waiver of the prerequisite on this basis? I would be happy to send you the course syllabus from Montreal and my transcript if that would help.

Thank you for considering my request.

Best regards,
Sacha`,
    tips: 'Argumentation structurée (besoin → preuve d\'équivalence → demande), exemples précis, offre de documents.' },
  { id: 'e07', to: 'your friend Emma, who lives in another city', toAddr: 'Emma', subj: 'Your visit next month',
    s: 'Your friend Emma is planning to visit you next month. You have just learned that you will have an important exam during the week she planned to come.',
    t: ['Explain the situation', 'Suggest a different date', 'Describe something you could do together during her visit'],
    m: `Hi Emma,

I'm so excited that you're planning to come and visit! Unfortunately, I just found out that my corporate finance final has been scheduled for the week of the 14th — exactly when you were planning to come. I'd hate to spend your whole visit buried in my notes, so I was wondering if we could move it.

Would the following weekend work for you, from Friday the 22nd to Monday the 25th? By then my exams will be over and I'll be completely free.

If you can come then, I'd love to take you to the old town on Saturday — there's a food market with amazing local cheese, and in the evening we could go to the jazz bar I told you about. On Sunday, if the weather's nice, we could even rent bikes and ride along the river.

Let me know what you think!

Love,
Sacha`,
    tips: 'Registre amical (contractions, exclamations), mais tout aussi structuré ; activités décrites avec des détails vivants (C1 = précision lexicale).' },
  { id: 'e08', to: 'the coordinator of a summer internship program', toAddr: 'Internship Coordinator', subj: 'Question about the application process',
    s: 'You want to apply to a summer internship program at a financial firm. The deadline is in two weeks, but the online application form does not allow you to upload a second recommendation letter, which the website says is required.',
    t: ['Explain your interest in the program', 'Describe the technical problem', 'Ask how you should submit the missing document'],
    m: `Dear Internship Coordinator,

I am currently preparing my application for your Summer Analyst Program, which particularly appeals to me because of its rotation between the equity research and risk management teams.

While completing the online form, I noticed that the portal allows only one recommendation letter to be uploaded, whereas your website states that two letters are required. I have tried using different browsers and file formats, but the second upload field never appears.

Could you please advise me on how to submit the second letter? For example, should my recommender email it to you directly, or is there an alternative upload link? Since the deadline is on the 30th, I would like to make sure my application is complete well in advance.

Thank you very much for your help.

Kind regards,
Sacha`,
    tips: 'Contradiction clairement exposée (« whereas »), démarches déjà faites, question précise avec options, rappel de l\'échéance.' },
  { id: 'e09', to: 'Professor Garcia', toAddr: 'Professor Garcia', subj: 'Missing next week\'s seminar',
    s: 'You have been selected to represent your university at a national case competition. The competition takes place on the same day as Professor Garcia\'s seminar, in which participation is graded.',
    t: ['Inform the professor that you will be absent and explain why', 'Ask how you can make up for the missed participation', 'Ask whether you can receive the materials in advance'],
    m: `Dear Professor Garcia,

I am writing to let you know that I will unfortunately be unable to attend next Tuesday's seminar. I have been selected, along with three classmates, to represent the university at the National Business Case Competition, which takes place in Lyon that same day.

Since participation in the seminar is graded, I would like to make up for my absence in whatever way you consider appropriate. For instance, I could submit a short written response to the discussion questions, or lead part of the discussion the following week.

In addition, would it be possible to receive the readings and discussion questions in advance? That way, I could prepare properly and stay up to date with the rest of the class.

Thank you for your understanding, and I apologize for any inconvenience.

Best regards,
Sacha`,
    tips: 'Prévenir à l\'avance, raison valorisante mais sans se vanter, deux propositions concrètes de rattrapage.' },
  { id: 'e10', to: 'the manager of a local café where you work part-time', toAddr: 'Mr. Collins', subj: 'Schedule change request',
    s: 'You work part-time at a café near campus. Your university has changed your class schedule, and you can no longer work your usual Monday and Wednesday morning shifts.',
    t: ['Explain why you need to change your schedule', 'Say when you are available', 'Suggest a solution that would help the café'],
    m: `Dear Mr. Collins,

I hope you're doing well. I'm writing because my university has just reorganized the timetable for this semester, and two of my core courses now take place on Monday and Wednesday mornings. As a result, I will no longer be able to work my usual morning shifts on those days.

I'm still very keen to keep the same number of hours, though. I'm available on Tuesday and Thursday mornings, as well as on Monday and Wednesday afternoons from 2 p.m. I could also cover weekend shifts if needed.

To make the transition easier, I've spoken with Lina, who is looking for more hours and would be happy to take over my Monday and Wednesday mornings. If you agree, I could also spend a shift with her to go over the opening routine.

Thank you for your flexibility, and please let me know what works best for you.

Best regards,
Sacha`,
    tips: 'La 3e consigne (« help the café ») est remplie par une solution concrète (une remplaçante + formation) : c\'est ce qui fait passer de 4 à 5.' },
  { id: 'e11', to: 'the editor of the student newspaper', toAddr: 'Editor, The Campus Post', subj: 'Proposal for an article',
    s: 'You would like to write an article for the student newspaper about how students can start investing with small amounts of money.',
    t: ['Introduce your idea', 'Explain why it would interest readers', 'Describe your qualifications for writing it'],
    m: `Dear Editor,

I would like to propose an article for The Campus Post on a topic that I believe many students overlook: how to start investing responsibly with small amounts of money.

In my experience, a lot of students assume that investing is only for people with large savings, or they are drawn to risky trends they see on social media. An accessible article explaining key ideas such as diversification, fees, and the power of compound interest could therefore be genuinely useful, and it would fit well in your personal-finance section.

As for my background, I am the treasurer of the university investment club, where I run introductory workshops for new members, and I have completed courses in corporate finance and portfolio management. I would, of course, make it clear that the article is educational rather than financial advice.

I would be happy to send you an outline or a draft of about 800 words.

Best regards,
Sacha`,
    tips: 'Pitch en 3 temps, public cible identifié, crédibilité démontrée, anticipation d\'une objection (« educational rather than financial advice »).' },
  { id: 'e12', to: 'a company\'s customer service department', toAddr: 'Customer Service, TechNova', subj: 'Faulty laptop under warranty',
    s: 'You bought a laptop three months ago. It has started shutting down unexpectedly, and you have lost some of your work. The laptop is still under warranty.',
    t: ['Describe the problem', 'Explain how it has affected you', 'State what you expect the company to do'],
    m: `Dear Customer Service Team,

I am writing about a TechNova Pro 14 laptop that I purchased from your online store three months ago (order no. TN-58213). The device is still under its one-year warranty.

Over the past two weeks, the laptop has repeatedly shut down without warning, sometimes several times a day, even when the battery is fully charged. I have updated all the drivers and run your diagnostic tool, but the problem persists.

This has caused me serious difficulties: I lost several hours of work on a university assignment last week, and I can no longer rely on the computer during online exams.

Given that the fault appeared within the warranty period, I would expect TechNova either to repair the laptop free of charge within a reasonable time or to replace it. Since I need a computer for my studies, I would also appreciate a loan device during the repair if possible.

I look forward to your prompt response.

Yours faithfully,
Sacha`,
    tips: 'Faits vérifiables, démarches déjà faites, impact concret, attente formulée fermement avec « Given that… I would expect ».' },
];

CONTENT.disc = [
  { id: 'q01', course: 'business ethics', prof: 'Dr. Evans',
    q: 'Many companies now publish reports on their environmental and social impact. Some people believe these reports genuinely push companies to behave more responsibly. Others think they are mostly a public relations exercise. What is your view, and why?',
    st: [['Claire', 'I think these reports matter. Once a company publishes numbers, like its carbon emissions, journalists and investors can compare them from year to year. That pressure makes it harder for firms to ignore their impact.'], ['Mateo', 'I\'m more skeptical. Companies choose what to include, and they usually highlight positive stories while hiding the bad ones. Without independent checks, the reports are basically advertising.']],
    m: `Both Claire and Mateo make valid points, but I think the answer depends less on the reports themselves than on whether they are standardized. When every company can choose its own metrics, Mateo is right that the exercise easily turns into advertising. However, once reporting follows common rules, the dynamic changes completely. For example, since the European Union introduced mandatory sustainability standards, firms have to disclose the same indicators in the same format, and those figures are increasingly audited. This allows investors to compare companies directly, and a firm that performs poorly can no longer hide behind vague language. In my view, then, voluntary reports are mostly public relations, but standardized and verified reports can genuinely change corporate behavior, because they turn good intentions into measurable commitments that markets can reward or punish.`,
    tips: 'Nouvel angle (la standardisation) au lieu de répéter Claire ou Mateo, référence explicite aux deux, exemple concret, conclusion nuancée.' },
  { id: 'q02', course: 'education', prof: 'Professor Kim',
    q: 'Some universities are considering making all lectures available as recordings online. Supporters say this makes learning more flexible. Critics worry that students will stop attending class. Do you think universities should record all lectures? Why or why not?',
    st: [['Aisha', 'Yes, definitely. Many students work part-time or have long commutes. Recordings let them catch up and review difficult parts at their own pace.'], ['Tom', 'I disagree. If everything is online, a lot of students will keep postponing the videos and end up cramming everything before the exam.']],
    m: `I believe universities should record lectures, but they should also change what happens in the classroom. Tom is right that simply putting recordings online can encourage procrastination, yet the real problem is that many lectures are passive to begin with. If students can get exactly the same content from a video, there is little reason to show up. A better approach is the so-called flipped classroom: students watch a short recorded explanation before class, and the class time is then used for problem-solving, case discussions, and questions. In my statistics course last year, the professor used this model, and attendance actually increased, because the sessions offered something the videos could not. So recordings, in my opinion, are not a threat to attendance; they are an opportunity to make in-person teaching more valuable, which also addresses Aisha's point about flexibility.`,
    tips: 'Position claire dès la 1re phrase, reformulation d\'un argument d\'un étudiant puis dépassement, expérience personnelle comme preuve.' },
  { id: 'q03', course: 'economics', prof: 'Dr. Laurent',
    q: 'Several cities have introduced congestion charges, which require drivers to pay a fee to enter the city center at busy times. Do you think congestion charges are a fair and effective policy? Explain your reasoning.',
    st: [['Ben', 'They work. London and Stockholm both saw traffic drop significantly after introducing charges, and air quality improved. If something is free, people overuse it.'], ['Lina', 'But they\'re unfair to low-income workers who have no choice but to drive, for example people who work night shifts when public transport doesn\'t run.']],
    m: `I think congestion charges are effective, and Lina's concern about fairness can largely be addressed through how the revenue is used. As Ben notes, pricing road space reduces traffic because drivers finally pay for the delay they impose on everyone else. The fairness issue is real, but it is not an argument against the charge itself; it is an argument for designing it carefully. For instance, a city could exempt or discount night-shift workers and, more importantly, reinvest the revenue in public transport. Stockholm did something similar, and support for the charge rose once residents saw better bus services. In fact, the current situation is not particularly fair either: low-income households, who are less likely to own cars, breathe the most polluted air and suffer from slow buses stuck in traffic. A well-designed charge could therefore make the system both more efficient and more equitable.`,
    tips: 'Concession + réfutation, retournement de l\'argument d\'équité (C1 = argumentation fine), vocabulaire précis (« revenue », « equitable », « impose »).' },
  { id: 'q04', course: 'sociology', prof: 'Professor Wright',
    q: 'Social media allows people to stay connected with friends and family around the world. However, some researchers argue that it has made people feel more isolated. Overall, do you think social media has improved or harmed our social relationships?',
    st: [['Nora', 'Improved. My grandparents live in another country, and thanks to video calls and photo sharing, I feel much closer to them than I would otherwise.'], ['Kevin', 'I think it\'s harmed them. People spend hours scrolling through other people\'s lives instead of actually talking to anyone. It\'s connection without real interaction.']],
    m: `In my view, the effect of social media depends mainly on whether it is used actively or passively. Nora's example shows active use: she communicates directly with people she cares about, and research consistently finds that this kind of interaction strengthens relationships. Kevin, on the other hand, describes passive consumption, endlessly scrolling through other people's highlights, which studies have linked to envy and loneliness. What worries me is that platforms are designed to encourage the passive kind, because it keeps users online longer and generates more advertising revenue. So I would argue that social media has the potential to improve relationships, but its current business model pushes it in the opposite direction. The solution is not to abandon it but to use it deliberately, for instance by turning off algorithmic feeds and using apps mainly for messaging and calls.`,
    tips: 'Distinction conceptuelle (actif/passif) qui réconcilie les deux étudiants et ajoute une idée neuve (le modèle économique).' },
  { id: 'q05', course: 'public policy', prof: 'Dr. Osei',
    q: 'Some governments are considering a four-day working week with no reduction in pay. Supporters say it would improve well-being and productivity. Opponents say it would hurt the economy. What do you think, and why?',
    st: [['Julia', 'I support it. Trials in several countries showed that employees were less stressed and just as productive, because they wasted less time in unnecessary meetings.'], ['Marcus', 'That might work in offices, but what about hospitals, schools, or restaurants? You can\'t produce the same amount of care or service in fewer hours.']],
    m: `Marcus raises the crucial point: the four-day week is far easier to implement in some sectors than in others, so I think it should be encouraged rather than imposed. In knowledge-based jobs, Julia's argument is convincing, because output depends on focus rather than on hours spent at a desk, and shorter weeks force teams to cut low-value activities. In services such as healthcare, however, a nationwide rule would simply require hiring more staff, which is expensive and difficult during a labor shortage. A more realistic approach would be to give firms incentives, for example tax benefits, to experiment with shorter weeks where productivity allows it, and to publish the results. That way, the policy could spread where it works without threatening essential services. In short, I support the idea, but only as a flexible option, not as a universal obligation.`,
    tips: 'Position nuancée et proposition de politique concrète (incitations fiscales) = contribution originale.' },
  { id: 'q06', course: 'environmental science', prof: 'Professor Hale',
    q: 'To reduce climate change, should governments focus mainly on changing individual behavior, such as encouraging people to fly less and eat less meat, or on changing the behavior of large companies and industries? Explain your view.',
    st: [['Sam', 'Companies are responsible for most emissions, so that\'s where regulation should focus. Asking individuals to change is a distraction.'], ['Elena', 'But companies only produce what consumers buy. If people change their habits, companies will follow.']],
    m: `I believe governments should focus on companies and infrastructure, but not for the reason Sam gives. The key issue is that individual choices are largely shaped by the options available. For example, it is easy to ask people to drive less, but if there is no reliable train to their workplace, the request is meaningless. Similarly, Elena is right that demand matters, yet consumers cannot choose low-carbon products that do not exist or are far more expensive. Policies that target industry, such as carbon pricing or efficiency standards for buildings, change the default options for everyone at once, so millions of people reduce their emissions without having to make heroic daily decisions. Individual action still matters as a signal, but in terms of impact, reshaping the system is far more effective than relying on personal virtue.`,
    tips: 'Idée neuve : les choix individuels dépendent des options disponibles. Exemples concrets, conclusion forte.' },
  { id: 'q07', course: 'management', prof: 'Dr. Nakamura',
    q: 'When companies hire new graduates, should they focus mainly on academic results, such as grades and the reputation of the university, or on other qualities, such as work experience and personality? Explain your position.',
    st: [['Hugo', 'Grades show that a candidate is disciplined and can learn quickly. They are also objective, which makes recruitment fairer.'], ['Priya', 'Grades don\'t tell you whether someone can work in a team or handle pressure. Internships and interviews reveal much more.']],
    m: `I would argue that companies should treat grades as a threshold rather than as the main criterion. Hugo is right that academic results provide some evidence of discipline, and they are useful for filtering thousands of applications. However, beyond a certain level, higher grades say very little about how someone will perform in a real job. What matters more is the ability to learn in unfamiliar situations and to collaborate, which, as Priya points out, grades barely capture. I would also add a fairness argument that challenges Hugo's view: relying heavily on university reputation tends to favor students from wealthier backgrounds, who could afford better preparation. Structured work-sample tests, where candidates solve a realistic problem, may actually be both fairer and more predictive. For this reason, the best hiring processes combine a minimum academic standard with practical assessments.`,
    tips: 'Contre-argument sur le terrain même de l\'autre étudiant (équité), solution concrète (work-sample tests).' },
  { id: 'q08', course: 'urban planning', prof: 'Professor Diallo',
    q: 'As cities grow, some planners argue that we should build more high-rise apartment buildings to house more people. Others prefer to expand cities outward with houses and gardens. Which approach do you think is better, and why?',
    st: [['Lucas', 'High-rises are better. They use less land, and people can live close to their jobs and public transport.'], ['Mei', 'But many people want space and gardens, especially families. Tall buildings can feel isolating.']],
    m: `I think the best solution lies between the two extremes that Lucas and Mei describe: what cities need is "gentle density," meaning mid-rise buildings of four to six floors. This approach keeps many of the advantages Lucas mentions, since it houses enough people to support shops and frequent public transport, but it avoids some of the drawbacks of towers. Mid-rise neighborhoods, like many parts of Paris or Barcelona, tend to have lively streets because residents are close to the ground and interact in local businesses and parks. Moreover, towers are expensive to build and maintain, so they often end up as luxury housing. In contrast, suburban expansion forces people into long car commutes and destroys farmland. Therefore, mid-rise density offers a balance between efficiency and quality of life, and it also partly answers Mei's concern about isolation.`,
    tips: 'Troisième voie + exemples de villes connues + connecteurs variés (Moreover, In contrast, Therefore).' },
  { id: 'q09', course: 'psychology', prof: 'Dr. Brooks',
    q: 'Some schools have banned smartphones during the school day, including breaks. Supporters say this improves concentration and social life. Others think students should learn to manage their phones responsibly. What is your opinion?',
    st: [['Ines', 'Banning phones is the right choice. Even having a phone on the desk distracts students, and at break time they talk to each other instead of looking at screens.'], ['David', 'A ban doesn\'t teach anything. When students go to university, nobody will take their phone away, so they need to practice self-control.']],
    m: `I agree with David's goal but not with his method. Self-control is indeed an essential skill, yet it develops gradually, and asking a thirteen-year-old to resist an app engineered by thousands of engineers to capture attention is hardly a fair test. In my view, the answer should depend on age. For younger students, a ban during the school day is reasonable, as Ines suggests, because it protects their concentration and their face-to-face friendships while their self-regulation is still developing. For older students, however, schools could progressively introduce responsibility, for example by allowing phones during breaks and teaching explicit strategies such as turning off notifications. This gradual approach would prepare them for university, where, as David rightly says, nobody will impose limits for them.`,
    tips: 'Approche par âge (idée neuve), vocabulaire C1 (« engineered », « self-regulation »), concession explicite.' },
  { id: 'q10', course: 'finance', prof: 'Professor Morel',
    q: 'Some people argue that young adults should start investing in the stock market as early as possible. Others say they should first focus on saving cash and paying off debt. What advice would you give a young person who has just started working, and why?',
    st: [['Rayan', 'Start investing immediately. Thanks to compound interest, even small amounts invested at twenty-two can grow much more than larger amounts invested at forty.'], ['Sophie', 'I\'d say build an emergency fund first. If you lose your job and have to sell your stocks during a crisis, you could lose a lot of money.']],
    m: `I would advise a young worker to follow a clear order of priorities that combines both views. First, as Sophie says, they should build an emergency fund of roughly three to six months of expenses, because it prevents them from being forced to sell investments at the worst possible moment. At the same time, any high-interest debt, such as credit card balances, should be repaid immediately, since no investment reliably earns twenty percent a year. Once these two conditions are met, Rayan's argument becomes very powerful: time in the market is the greatest advantage a young investor has. However, I would add that the choice of investment matters as much as the timing. Rather than picking individual stocks, a young person should invest regularly in a low-cost, diversified index fund, which avoids the temptation to trade based on emotions. This sequence captures the benefits of compounding without taking unnecessary risks.`,
    tips: 'Séquence logique (First / At the same time / Once… / However) + contribution nouvelle sur le choix du support.' },
  { id: 'q11', course: 'technology and society', prof: 'Dr. Fischer',
    q: 'Artificial intelligence tools can now write essays, solve math problems, and generate code. Should universities allow students to use these tools for their coursework? Why or why not?',
    st: [['Anna', 'Universities should allow them. Students will use AI in their future jobs, so they need to learn how to use it well.'], ['Leo', 'If students use AI to do their assignments, they won\'t develop basic skills like writing and reasoning. It should be banned for coursework.']],
    m: `I think universities should allow AI tools, but they need to redesign assessment rather than simply permitting or banning them. Leo's concern is legitimate: if an assignment can be completed entirely by a chatbot, it no longer measures the student's thinking. However, a ban is almost impossible to enforce, so it would mainly penalize honest students. A better strategy would be to assess the process rather than just the final product. For example, students could submit their drafts, explain orally how they reached their conclusions, or critique an AI-generated answer and correct its errors. This last type of exercise is particularly valuable, because it develops exactly the judgment Anna says employers will need. In short, the question is not whether students use AI, but whether assessments still require them to think.`,
    tips: 'Recentre le débat (l\'évaluation), argument d\'applicabilité, exemples d\'exercices concrets, dernière phrase percutante.' },
  { id: 'q12', course: 'international business', prof: 'Professor Ahmed',
    q: 'Some multinational companies are moving production back to their home countries after decades of outsourcing to countries with lower costs. Do you think this trend is a good idea for these companies? Explain why.',
    st: [['Chloé', 'Yes. The pandemic showed how fragile long supply chains are. Producing closer to home reduces the risk of shortages.'], ['Omar', 'But costs will rise significantly, and consumers will pay higher prices. Most companies can\'t afford to give up the savings from outsourcing.']],
    m: `In my opinion, the smartest strategy for most companies is neither full reshoring nor business as usual, but diversification of suppliers. Chloé is right that recent crises exposed the danger of depending on a single region, yet Omar also has a point, since bringing all production home would erase decades of cost advantages. A middle path, sometimes called "friend-shoring" or "China plus one," consists of spreading production across several countries, some of them closer to the main markets. For example, several electronics firms have kept factories in Asia while opening new ones in Mexico or Eastern Europe. This reduces the risk that a single disruption stops everything, while limiting the increase in costs. Moreover, for strategic products such as semiconductors or medicines, governments may justifiably subsidize some domestic production, because the cost of a shortage is far greater than the cost of a slightly higher price.`,
    tips: 'Vocabulaire spécialisé bien employé (reshoring, friend-shoring), exemple réel, distinction produits stratégiques / ordinaires.' },
];
