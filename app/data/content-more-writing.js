/* WRITING (extra bank) — Write an Email (ex001-ex018) + Academic Discussion (dsx001-dsx018). diff : 2 = B2, 3 = C1 */
CONTENT.email.push(
  { id: 'ex001', diff: 2, to: 'Professor Reyes', toAddr: 'Professor Reyes', subj: 'Question about office hours',
    s: 'You are taking an introductory statistics course with Professor Reyes. You did not understand the last chapter on probability, and you would like to talk to her before the quiz next week.',
    t: ['Say who you are and which class you are in', 'Explain what you did not understand', 'Ask when you can meet her'],
    m: `Dear Professor Reyes,

My name is Sacha, and I am in your Tuesday and Thursday morning statistics class. I am writing because I am struggling with the chapter on probability, and the quiz is only a week away.

I have read the chapter twice, yet conditional probability still confuses me. In particular, I cannot work out which formula to apply when two events depend on each other, and the worked examples in the textbook skip several steps.

Would it be possible to meet during your office hours this week? I am free on Wednesday afternoon and Friday morning, but I can adapt to whatever suits you. If it helps, I could send you the exercises I have attempted beforehand so that you can see exactly where I go wrong.

Thank you very much for your time.

Best regards,
Sacha`,
    tips: 'Email efficace : présentation, problème précis (« conditional probability »), disponibilités concrètes, proposition utile (envoyer les exercices). Connecteurs variés (yet, in particular, beforehand) et ton poli.' },
  { id: 'ex002', diff: 2, to: 'your roommate Alex', toAddr: 'Alex', subj: 'Noise in the apartment',
    s: 'You share an apartment with a roommate named Alex. Alex often plays loud music late at night, and you have an important exam next week. You like Alex and do not want to cause a conflict.',
    t: ['Explain the problem politely', 'Describe how it affects you', 'Suggest a solution'],
    m: `Hi Alex,

I hope your week is going well. There is something I would like to raise, and I thought it would be easier to put it in writing.

Over the past few weeks, I have often heard music coming from your room well after midnight. I honestly do not mind it, and I know it helps you unwind, but I have a major exam next week and I have been struggling to fall asleep, which is starting to affect my concentration.

Would you be willing to switch to headphones after 11 p.m., at least until the exam is over? I would be happy to return the favor whenever you have something important coming up, and we could also agree on quiet hours during exam periods.

Thanks so much for understanding. Let me know what you think!

Sacha`,
    tips: 'Registre amical mais respectueux (« I honestly do not mind it »), problème + conséquence + solution réciproque (« return the favor »). Évite tout ton accusateur.' },
  { id: 'ex003', diff: 2, to: 'the university library staff', toAddr: 'Library Service Desk', subj: 'Lost student card',
    s: 'You lost your student card two days ago. You need it to enter the library and to borrow books, and you have an assignment to finish this week.',
    t: ['Explain what happened', 'Say why you need the card quickly', 'Ask how to get a new card'],
    m: `Dear Library Staff,

I am writing because I lost my student card two days ago. I suspect I left it in a classroom on Monday afternoon, but when I went back the next morning, nobody had handed it in.

I need a replacement as soon as possible, as I rely on the library daily and must hand in a major assignment on Friday. Without the card, I can neither enter the building nor borrow the books that my research depends on.

Could you please tell me how to apply for a new card and what it costs? I would also like to know whether a temporary pass could be issued in the meantime. My student number is 20458, in case you need it.

Thank you in advance for your help.

Kind regards,
Sacha`,
    tips: 'Trois consignes = trois paragraphes courts. Le numéro étudiant ajoute du réalisme. Vocabulaire précis (« replacement », « temporary pass », « in the meantime ») et structure « neither… nor ».' },
  { id: 'ex004', diff: 2, to: 'the president of the photography club', toAddr: 'Photography Club President', subj: 'Joining the photography club',
    s: 'You saw a flyer for the university photography club. You are a beginner, but you would like to join because you enjoy taking pictures of cities and landscapes.',
    t: ['Introduce yourself', 'Explain why you want to join', 'Ask about meetings and costs'],
    m: `Dear President,

My name is Sacha, and I am a second-year business student. I came across your flyer in the student center, and I would love to join the photography club, even though I am only a beginner.

I have been taking photos for about two years, mostly of cities and landscapes when I travel. I would like to improve my technique, learn from more experienced members, and meet people who share my passion. A club seems the ideal way to do all three.

Could you let me know when and where the meetings take place? I would also like to find out whether there is a membership fee, and whether a smartphone is good enough for the first sessions or whether I should invest in a proper camera.

Thank you, and I hope to see you soon!

Best regards,
Sacha`,
    tips: 'Présentation courte, motivation honnête (débutant = pas un problème), liste de trois objectifs bien construite, questions pratiques précises (« whether… or whether… »).' },
  { id: 'ex005', diff: 2, to: 'your landlord, Mr. Dawson', toAddr: 'Mr. Dawson', subj: 'Broken washing machine',
    s: 'You rent a small apartment. The washing machine has been leaking water on the bathroom floor for ten days. You already mentioned it to your landlord during a phone call, but nothing has happened.',
    t: ['Describe the problem', 'Remind him of your previous request', 'Suggest a date for the repair'],
    m: `Dear Mr. Dawson,

I am writing about the washing machine in my apartment, which has been leaking water onto the bathroom floor for about ten days. Each time I use it, I have to clean up a large puddle, and I am worried that the water may damage the floor or reach the neighbors below.

As I mentioned when we spoke on the phone on the fifth of the month, I had hoped the problem could be fixed quickly. Unfortunately, it has not been repaired yet, so I am contacting you again in writing so that we have a clear record of the issue.

Would it be possible for a technician to come this week? I am at home on Thursday afternoon and all day on Saturday, so either of those times would be convenient. In the meantime, I have stopped using the machine to avoid more damage.

Thank you for your attention to this matter.

Sincerely,
Sacha`,
    tips: 'Rappel poli d\'une demande antérieure (« so that we have a clear record »), proposition de dates précises, geste responsable (arrêter la machine).' },
  { id: 'ex006', diff: 2, to: 'your manager at the campus bookstore', toAddr: 'Ms. Alvarez', subj: 'Request to swap a shift',
    s: 'You work part-time at the campus bookstore. Next Saturday, you have been invited to a family wedding abroad, and you are scheduled to work. A colleague, Daniel, has said he might be able to take your shift.',
    t: ['Explain why you cannot work', 'Propose a solution', 'Show that you will keep the store running smoothly'],
    m: `Dear Ms. Alvarez,

I am writing to ask whether it would be possible to change my schedule for next Saturday. I have been invited to my cousin's wedding, which is taking place abroad, and unfortunately I will not be able to return in time for my afternoon shift.

I have already spoken to Daniel, and he has told me that he would be willing to take my shift if you agree. In exchange, I would be happy to cover his next two Sunday shifts, so the schedule remains balanced.

I understand that Saturdays are busy because of the start of the semester, so I will make sure that everything is organized before I leave. For example, I can prepare the new textbook display on Friday evening and write a short handover note for Daniel about the orders that are still pending.

Please let me know if this arrangement works for you. Thank you very much for your flexibility.

Best regards,
Sacha`,
    tips: 'Solution déjà préparée (Daniel + échange de shifts) = employé fiable. « In exchange » et « handover note » montrent un vocabulaire professionnel.' },
  { id: 'ex007', diff: 2, to: 'Professor Lindqvist', toAddr: 'Professor Lindqvist', subj: 'Request for a recommendation letter',
    s: 'You are applying to a master\'s program in finance. The application requires a recommendation letter from a professor, and you did very well in Professor Lindqvist\'s corporate finance course last year. The deadline is in five weeks.',
    t: ['Remind the professor who you are', 'Ask for the letter and explain what it is for', 'Offer to provide information to help'],
    m: `Dear Professor Lindqvist,

I hope you are well. I was a student in your corporate finance course last spring, and I particularly enjoyed the case study on leveraged buyouts that I presented with my group.

I am now applying to master's programs in finance, and I am writing to ask whether you would be willing to write a letter of recommendation for me. The first deadline is in five weeks, on the twentieth of November, and the letter would be submitted online through the application portal.

To make the process easier, I would be glad to send you my CV, my transcript, and a short summary of my goals and the programs I am applying to. I could also remind you of the work I did in your course if that would be useful.

I completely understand if your schedule does not allow it, and I thank you in advance for considering my request.

Kind regards,
Sacha`,
    tips: 'Rappel du contexte (cours + projet précis), échéance claire, facilité donnée au professeur (CV, relevé), porte de sortie polie (« I completely understand »).' },
  { id: 'ex008', diff: 2, to: 'the university IT help desk', toAddr: 'IT Help Desk', subj: 'Cannot access my online exam',
    s: 'Tomorrow you have an online midterm exam. When you tried to log in to the course platform today, the system said that your account was locked. You already tried to reset your password, but the reset email never arrived.',
    t: ['Describe the problem', 'Explain what you have already tried', 'Ask for urgent help and explain why it is urgent'],
    m: `Dear IT Help Desk,

I am writing because I cannot log in to the online course platform. Since this morning, the system has displayed a message saying that my account is locked, and I am not able to access any of my courses.

I have already tried to solve the problem on my own. I used the "forgot password" option twice, but I have not received the reset email, even after checking my spam folder. I also tried a different browser and a different computer, with the same result.

This is very urgent, as I have a midterm exam in finance tomorrow at 10 a.m., and it will be taken entirely on the platform. If I cannot get into my account in time, I may miss the exam, which counts for thirty percent of my final grade.

Could you please unlock my account today or tell me who I should contact? My student number is 20458. Thank you very much for your quick help.

Best regards,
Sacha`,
    tips: 'Diagnostic précis, essais déjà faits, urgence chiffrée (« thirty percent of my final grade »). Un bon email de support est factuel et complet.' },
  { id: 'ex009', diff: 2, to: 'the scholarship office', toAddr: 'Scholarship Office', subj: 'Missing document in my application',
    s: 'You applied for a university scholarship. Today you received an automatic message saying that your application is incomplete because a document is missing. You believe you uploaded everything, and the deadline is in three days.',
    t: ['Explain why you are writing', 'Say what you believe you submitted', 'Ask what to do before the deadline'],
    m: `Dear Scholarship Office,

I am writing in reference to my application for the Merit Scholarship (application number 7731). This morning I received an automatic message stating that a document is missing, but it does not say which one.

According to my records, I uploaded all the required documents on the second of the month: my transcript, my motivation letter, my tax statement, and two letters of recommendation. I still have the confirmation emails, and I would be happy to forward them to you. It is possible that one of the files did not upload properly.

Since the deadline is on Friday, I am slightly concerned. Could you please tell me exactly which document is missing and whether I can resubmit it directly by email? If a specific format is required, I will send it immediately.

Thank you in advance for your help.

Kind regards,
Sacha`,
    tips: 'Ton calme et coopératif, preuves mentionnées (« confirmation emails »), question double et précise. Pas d\'accusation envers le service.' },
  { id: 'ex010', diff: 2, to: 'the study abroad coordinator', toAddr: 'Study Abroad Office', subj: 'Exchange program in Canada',
    s: 'Your university offers a one-semester exchange program with a university in Canada. You would like to take part next year, but you are not sure about the requirements.',
    t: ['Say which program you are interested in and why', 'Ask about requirements and deadlines', 'Ask about financial support'],
    m: `Dear Study Abroad Coordinator,

I am a third-year business student, and I am very interested in the exchange program with the University of Toronto for the fall semester of next year. I would like to improve my professional English and discover a different approach to teaching, especially in finance and strategy.

Could you please let me know what the main requirements are? In particular, I would like to know whether there is a minimum grade average, whether I need to submit an English test score, and what the application deadline is.

I would also appreciate some information about financial support. Are there scholarships for exchange students, and is it possible to receive a grant in addition to my regular student aid?

If there is an information session in the coming weeks, I would be glad to attend. Thank you very much for your time.

Best regards,
Sacha`,
    tips: 'Motivation concrète, questions regroupées par thème (conditions, finances) avec des formulations variées (« I would like to know whether… », « Are there… »).' },
  { id: 'ex011', diff: 2, to: 'your teaching assistant, Ms. Okafor', toAddr: 'Ms. Okafor', subj: 'Question about my midterm grade',
    s: 'You just received your marketing midterm. You got 62 out of 100, but you think question 4 was marked incorrectly, because the answer key seems to contradict the lecture slides. You would like a second look, but you do not want to sound rude.',
    t: ['Say which question you are concerned about', 'Explain why you think the answer is correct', 'Ask politely for a re-evaluation'],
    m: `Dear Ms. Okafor,

Thank you for returning the midterms so quickly. I have looked at my paper carefully, and I would like to ask about question 4, for which I received two out of ten points.

In my answer, I argued that the company should use a penetration pricing strategy, because the product was new and the market was highly price-sensitive. When I compared my answer with the lecture slides from week five, it seemed to me that this was consistent with the definition we were given. I may have misunderstood something, so I would be very grateful if you could explain where my reasoning went wrong.

If you agree that my answer deserves partial credit, would it be possible to re-evaluate this question? I would be happy to come to your office hours if that is easier.

Thank you very much for your time and your help.

Best regards,
Sacha`,
    tips: 'Humilité stratégique (« I may have misunderstood »), argument précis relié au cours, demande de réévaluation formulée comme une question, pas une exigence.' },
  { id: 'ex012', diff: 2, to: 'the hotel reservations team', toAddr: 'Reservations, Harbor View Hotel', subj: 'Change of booking dates',
    s: 'You booked a hotel room for a conference from March 12 to 14. The organizers have just announced that the conference will start one day earlier. You need to change your reservation.',
    t: ['Give your booking details', 'Explain the change you need', 'Ask about cost and cancellation conditions'],
    m: `Dear Reservations Team,

I am writing about my booking (confirmation number HV-90417) for a single room from March 12 to 14 under the name Sacha Laborde.

The organizers of the conference I am attending have just announced that the event will begin one day earlier than planned. Therefore, I would like to change my reservation so that I arrive on March 11 and leave on March 14, which would make a total of three nights instead of two.

Could you please confirm whether a room is available for the additional night? I would also like to know whether there will be an extra charge, and whether the same conference rate applies. Finally, if the change is not possible, could you explain your cancellation conditions so that I can decide what to do?

I would appreciate a reply by the end of the week, as the conference registration closes soon.

Yours sincerely,
Sacha Laborde`,
    tips: 'Numéro de réservation, dates exactes, trois questions pratiques et une solution de repli. Registre formel de service client.' },
  { id: 'ex013', diff: 3, to: 'the Dean of Student Affairs', toAddr: 'Dean of Student Affairs', subj: 'Proposal to extend library hours during exams',
    s: 'During the exam period, the main library closes at 8 p.m., and many students cannot find a quiet place to study afterward. You and several classmates would like the university to extend the opening hours.',
    t: ['Describe the problem', 'Propose a specific change', 'Explain how it could be organized or funded'],
    m: `Dear Dean of Student Affairs,

I am writing on behalf of a group of third-year students to suggest a change that, we believe, would significantly improve our preparation for final exams.

At present, the main library closes at 8 p.m., even during the exam period. As a result, many of us are forced to study in crowded cafés or in shared apartments, where concentration is difficult. This is particularly problematic for students who work during the day and can only study in the evening.

We would therefore like to propose extending the opening hours until midnight for the three weeks preceding the exams. Since the building is already open, the additional cost would mainly concern staffing and electricity. We believe this could be managed by hiring a small number of student assistants, which would also create temporary jobs, and potentially by using a portion of the student activity fund.

We would be glad to meet with you to discuss the details or to present the results of a survey we have conducted among our classmates.

Thank you for considering our request.

Respectfully,
Sacha Laborde`,
    tips: 'Position collective (« on behalf of »), solution quantifiée (minuit, trois semaines), financement réaliste avec un bénéfice supplémentaire (emplois étudiants). Registre institutionnel soutenu.' },
  { id: 'ex014', diff: 3, to: 'your internship supervisor, Mr. Hartmann', toAddr: 'Mr. Hartmann', subj: 'Workload and priorities',
    s: 'You are doing a three-month internship in a consulting firm. Over the last two weeks, your workload has doubled because two colleagues left the team, and you are struggling to keep the quality of your work high. You still want to make a good impression.',
    t: ['Express your commitment to the internship', 'Describe the difficulty honestly', 'Propose a way to reorganize your tasks'],
    m: `Dear Mr. Hartmann,

I hope you are well. I would like to start by saying how much I am enjoying my internship; I have learned a great deal from the team, and I am keen to contribute as much as I can.

Over the past two weeks, however, the volume of work assigned to me has increased considerably following the departure of two colleagues. I am doing my best to meet every deadline, but I am concerned that, if this continues, the quality of my analyses could suffer, and I would not want that to happen on projects that matter to the clients.

I would therefore like to suggest a possible solution. Perhaps we could meet briefly on Monday to agree on my priorities for the coming weeks, so that I focus first on the tasks with the greatest impact. I could also prepare a short list of my current assignments with estimated timings, which might help you decide what should be postponed or delegated.

Thank you for taking the time to consider this, and I am grateful for your guidance.

Best regards,
Sacha`,
    tips: 'Équilibre difficile : loyauté d\'abord, problème exposé sans se plaindre, solution proactive (liste + rendez-vous). Nuances C1 : « I would not want that to happen », « Perhaps we could ».' },
  { id: 'ex015', diff: 3, to: 'the customer relations department of an airline', toAddr: 'Customer Relations, SkyLink Airways', subj: 'Delayed luggage and compensation request',
    s: 'You flew to a conference with SkyLink Airways. Your suitcase did not arrive and was only delivered three days later, after the event had ended. You had to buy a suit and toiletries, and you have the receipts.',
    t: ['Describe what happened', 'Explain the consequences for you', 'State what compensation you expect'],
    m: `Dear Customer Relations Team,

I am writing to file a complaint regarding flight SL 417 from Lyon to Chicago on October 3 (booking reference QX48TR).

Upon arrival, I discovered that my suitcase had not been loaded onto the aircraft. Although I reported the problem at the baggage desk immediately, the bag was only delivered to my hotel three days later, after the conference I had come to attend had already finished. During that time, I received no update from your staff, despite calling the helpline four times.

As a result, I had to purchase a business suit, shirts, and basic toiletries in order to present my work at the conference, which cost 285 dollars in total. I have attached the receipts as proof of these expenses.

Under the circumstances, I would expect a full reimbursement of these costs, together with an explanation of why the delay occurred. I would also appreciate a gesture of goodwill for the inconvenience caused. I look forward to receiving your response within two weeks.

Yours faithfully,
Sacha Laborde`,
    tips: 'Faits datés, démarches déjà faites (« called the helpline four times »), pièces jointes, attentes formulées fermement (« I would expect… together with… »). Ton ferme mais jamais agressif.' },
  { id: 'ex016', diff: 3, to: 'Professor Haddad', toAddr: 'Professor Haddad', subj: 'Interest in your research project',
    s: 'Professor Haddad leads a research project on consumer behavior and online shopping. You attended her guest lecture and would like to work as a research assistant next semester, even though you have only limited experience in research.',
    t: ['Explain how you learned about the project and what interests you', 'Describe your relevant skills honestly', 'Ask about the possibility of joining and the next steps'],
    m: `Dear Professor Haddad,

I attended your guest lecture last Thursday on consumer behavior in online shopping, and I found your findings on how default options influence purchasing decisions fascinating. It made me reconsider several of my own habits as a consumer.

I am writing to ask whether there might be an opportunity for me to join your research project as an assistant next semester. I should be honest that my research experience is limited. However, I have completed courses in statistics and marketing analytics, I am comfortable working with Excel and basic Python, and I have helped to design and analyze a customer survey for a student association.

I am a fast learner, and I would be willing to take on any task that would be useful to the team, including data cleaning or literature reviews. Could you let me know whether you are looking for assistants and, if so, what the next steps would be? I would be glad to send my CV and transcript, or to meet at your convenience.

Thank you for your time and consideration.

Sincerely,
Sacha Laborde`,
    tips: 'Détail précis tiré de la conférence (« default options »), honnêteté sur les limites puis compétences concrètes, tâches humbles proposées. Impression de maturité.' },
  { id: 'ex017', diff: 3, to: 'the manager of the university cafeteria', toAddr: 'Cafeteria Manager', subj: 'Suggestion about vegetarian options',
    s: 'The campus cafeteria offers only one vegetarian dish per day, and it is often sold out by 12:30. Many students, including you, would like more choices. You want to be constructive, not just critical.',
    t: ['Explain the problem with specific details', 'Suggest realistic improvements', 'Mention possible benefits for the cafeteria'],
    m: `Dear Manager,

First of all, I would like to thank you and your team for the quality of the food, which I generally appreciate. I am writing to share a suggestion that, I believe, many students would welcome.

At the moment, the cafeteria offers a single vegetarian main dish each day, and on several occasions in recent weeks it was already sold out by 12:30. Students who do not eat meat, for health, ethical, or religious reasons, are therefore left with a side salad or nothing at all.

Without requiring major changes, you could add one extra vegetarian option, such as a lentil curry or a pasta dish, and prepare larger quantities of the existing dish. A simple survey at the entrance could help you identify which meals are most popular.

I believe this would benefit the cafeteria as well. A more varied menu would attract a wider range of customers, reduce food waste from unsold meat dishes, and strengthen the cafeteria's reputation for sustainability.

I would be happy to discuss this further if you wish. Thank you for your attention.

Kind regards,
Sacha Laborde`,
    tips: 'Critique constructive : remerciement initial, faits datés, solutions peu coûteuses, bénéfices pour le destinataire (argument commercial). Structure claire en paragraphes.' },
  { id: 'ex018', diff: 3, to: 'a university alumnus working in consulting', toAddr: 'Mr. Weber', subj: 'Request for a short informational conversation',
    s: 'You found the name of Mr. Weber, an alumnus of your university who now works as a consultant at a major firm. You do not know him personally, but you would like to learn about his career and get advice before applying for jobs.',
    t: ['Introduce yourself and explain how you found him', 'Explain what you would like to learn', 'Suggest a short, convenient format for the conversation'],
    m: `Dear Mr. Weber,

My name is Sacha Laborde, and I am a final-year student in business at the same university from which you graduated in 2015. I found your profile through the alumni network, and I was impressed by your career path from corporate finance to strategy consulting.

I am currently preparing my job applications for next year, and I am considering consulting as one of my options. I would be very grateful for the opportunity to learn from your experience, particularly about how you made the transition between the two fields, what skills you consider most valuable in your current role, and what you would advise someone at my stage to focus on.

I realize that your schedule must be very busy, so I would only ask for twenty minutes, by phone or video call, at whatever time suits you best. If you prefer, I could also send my questions by email.

Thank you very much for considering my request, and I look forward to hearing from you.

Kind regards,
Sacha Laborde`,
    tips: 'Demande à un inconnu : lien commun (alumni), flatterie mesurée et spécifique, demande modeste (20 minutes), alternative asynchrone. Très naturel en contexte professionnel.' }
);

CONTENT.disc.push(
  { id: 'dsx001', diff: 2, course: 'education', prof: 'Professor Adams',
    q: 'Some schools give students a lot of homework every evening. Others believe that students learn better with little or no homework. Do you think schools should give a lot of homework? Why or why not?',
    st: [['Emma','I think homework is important. It reinforces what students learned in class and helps them develop good study habits and self-discipline for later in life.'],['Jack','I disagree. After a full day at school, students are exhausted. They need time to rest, play sports, and spend time with their family, and too much homework can make them hate learning.']],
    m: `I would argue that the amount of homework matters far less than its quality, so I lean toward a modest workload. Emma is right that practice consolidates what was learned in class, particularly in cumulative subjects like mathematics or languages. Jack, however, raises a point that is often overlooked: when students are exhausted, they tend to rush through assignments, and the exercise loses most of its educational value. From my own experience, thirty or forty minutes a night was enough to review the day's lesson, leaving me time to play football and sleep properly. What I would add is that homework should require genuine thinking rather than mechanical repetition. A single well-designed problem that forces you to apply an idea teaches more than twenty identical questions. Schools should therefore assign less homework, but make it more purposeful.`,
    tips: 'Position nuancée (qualité plutôt que quantité), concession qui reprend les deux étudiants, expérience personnelle, idée nouvelle (devoirs qui font réfléchir). Marqueurs C1 : « I would argue », « is often overlooked », « What I would add ».' },
  { id: 'dsx002', diff: 2, course: 'health sciences', prof: 'Dr. Moreno',
    q: 'Many universities have gyms and sports facilities, but not all students use them. Should universities require students to take at least one physical activity class each year? Why or why not?',
    st: [['Sara','Yes. Students spend hours sitting in classrooms and libraries. A required sports class would help them stay healthy and cope better with stress.'],['Omar','I don\'t think it should be required. Students have different interests, abilities, and schedules, and many already exercise outside the university.']],
    m: `I am sympathetic to Sara's position, but I think the requirement should be flexible rather than uniform. She is right that students spend most of their day seated, and there is solid evidence that regular exercise lowers stress and improves concentration, which is precisely what exam periods demand. Omar's objection is equally valid, though: a student who already trains five times a week would gain nothing from a compulsory class and might resent the time lost. A sensible compromise would be to require some physical activity each year while offering a broad menu, from yoga and swimming to walking clubs, and allowing students who exercise independently to submit proof. That way, the university promotes healthy habits without forcing anyone into an activity they dislike, which would probably be counterproductive anyway.`,
    tips: 'Compromis réaliste (activité obligatoire mais choix libre + justificatif). Nuances C1 : « sympathetic to », « equally valid, though », « counterproductive ».' },
  { id: 'dsx003', diff: 2, course: 'communication', prof: 'Professor Bell',
    q: 'More and more people read the news on social media instead of in newspapers or on news websites. Do you think this is a positive or a negative change? Explain your opinion.',
    st: [['Lily','It\'s positive. News on social media is fast and free, and I can find out what is happening in the world within minutes.'],['Ravi','I\'m not sure. A lot of false information spreads on social media, and it\'s hard to tell what to believe.']],
    m: `On balance, I see it as a mixed development whose outcome depends on how people use it. Lily is right that social media is quick, free, and reaches young people who would never buy a newspaper, which widens the audience for current affairs. Ravi's worry is nonetheless well founded: false stories tend to spread faster than corrections, because shocking headlines get shared before anyone checks them. I have seen friends circulate an obviously misleading article during the last election simply because the title was outrageous. In my view, social media should be treated as a starting point rather than a source: when a story seems important, readers should verify it on a reputable news site. Schools could also teach students how to evaluate sources, a skill that is now as essential as reading itself.`,
    tips: 'Exemple personnel concret, nuance (« a starting point rather than a source »), solution éducative. Structure : opinion, concession, exemple, recommandation.' },
  { id: 'dsx004', diff: 2, course: 'environmental studies', prof: 'Dr. Green',
    q: 'Some people say that cities should have more parks and green spaces, even if this means fewer parking spaces or new buildings. Do you agree? Why or why not?',
    st: [['Nina','Yes, parks make cities nicer and healthier. People can relax there, children can play, and trees help clean the air.'],['Paul','Cities need housing and parking too. Without enough apartments or parking spaces, life becomes more expensive and more difficult.']],
    m: `I agree that cities need more green space, and I do not think it has to be an either-or choice between parks and housing. Nina is right that parks improve well-being, and research consistently links access to green areas with lower stress levels. Paul, however, is correct that housing costs are already a burden, so we cannot simply stop building. One way out is to build higher, denser developments on smaller plots and use the land saved for parks. Another is to convert surface parking lots into gardens, which is realistic wherever public transport is good enough to make car ownership optional. In my own city, a former parking lot became a small park and is now crowded with students and families, which suggests that residents value such spaces more than they expect to. Parks and housing are not rivals; with thoughtful planning, they can reinforce each other.`,
    tips: 'Idée constructive qui dépasse le débat (« either-or choice »), exemple local, solutions concrètes (densité, reconversion de parkings). Conclusion en formule frappante.' },
  { id: 'dsx005', diff: 2, course: 'media studies', prof: 'Professor Cruz',
    q: 'Some people prefer to watch movies at the cinema. Others prefer to watch them at home on streaming platforms. Which do you prefer, and why?',
    st: [['Tara', 'I prefer the cinema. The screen is big, the sound is great, and there are no distractions. It feels like a special experience.'], ['Ben', 'I like streaming at home. It is cheaper, and I can pause the movie, choose any film I want, and watch in comfortable clothes.']],
    m: `My preference depends on the film. Tara is right that a big screen and immersive sound transform the experience, especially for spectacle-driven genres like action or science fiction, where the cinema is hard to beat. Ben, however, makes a fair point about cost and convenience: a ticket, popcorn, and a drink can easily exceed a month's streaming subscription, and at home I can pause a film or split it over two evenings when I am tired. So I tend to reserve the cinema for big, visually ambitious releases that I want to share with friends, and I watch dramas and documentaries at home, where subtitles, pauses, and a comfortable sofa actually improve the experience. In short, the two formats are less rivals than complements.`,
    tips: 'Réponse nuancée (« depends on the film »), comparaison coût/confort, critère de choix clair. Conclusion synthétique (« less rivals than complements »).' },
  { id: 'dsx006', diff: 2, course: 'public policy', prof: 'Dr. Abara',
    q: 'Some countries require young people to complete a period of national service, either military or civilian, such as working in hospitals or environmental projects. Do you think mandatory national service is a good idea? Explain your view.',
    st: [['Isabel', 'I think it would be beneficial. Young people from different backgrounds would meet each other, and they would develop discipline and a sense of responsibility towards society.'], ['Kofi', 'Forcing people to serve is a violation of personal freedom. It also delays their studies and careers, and the people who are not motivated will do a poor job.']],
    m: `I would support national service only if it is voluntary, but strongly encouraged. Isabel is right that a shared experience could bring together young people who would otherwise never meet, which might reduce social divisions. Yet Kofi's objection about freedom is very difficult to answer, because a service performed under compulsion is often performed without commitment. A more effective model would offer attractive incentives, such as tuition credits, housing support, or priority in some public-sector jobs, in exchange for a year of civic service. Programs like this already exist in several countries, and they tend to attract motivated participants rather than reluctant ones. In this way, society could benefit from the energy of young people while respecting individual choice, and the volunteers would indeed develop the responsibility Isabel mentions.`,
    tips: 'Troisième voie (service volontaire + incitations), référence aux deux étudiants, vocabulaire précis (« compulsion », « incentives », « civic service »).' },
  { id: 'dsx007', diff: 2, course: 'economics', prof: 'Professor Lindgren',
    q: 'Some cities are testing a cashless economy, where shops and public services no longer accept physical money. Do you think a fully cashless society would be beneficial? Why or why not?',
    st: [['Maya', 'I think it would be convenient and safer. Digital payments are faster, there is less theft, and it would be harder to hide illegal income.'], ['Victor', 'But not everyone has a bank account or a smartphone. Elderly people and the poor could be excluded. Also, digital payments allow companies to track everything you buy.']],
    m: `I am convinced that a fully cashless society would create more problems than it solves, although a strong move toward digital payments is reasonable. Maya is correct about convenience and about the fight against illegal activity. However, Victor identifies two serious risks that are often underestimated. First, exclusion: millions of people, including homeless or elderly citizens, would be unable to buy basic goods. Second, privacy, since every purchase would be recorded and could be used for commercial or even political purposes. Moreover, in case of a power failure or cyberattack, a cashless economy would simply stop working. For these reasons, I think governments should require shops to accept cash as a minimum option, while continuing to encourage digital payments. This way, the benefits Maya describes are preserved without leaving vulnerable groups behind.`,
    tips: 'Prise de position forte puis nuancée, argument nouveau (résilience : panne ou cyberattaque), ordre logique First / Second / Moreover.' },
  { id: 'dsx008', diff: 2, course: 'higher education', prof: 'Dr. Petrov',
    q: 'Some students take a gap year between high school and university to travel, work, or volunteer. Others think it is better to start university right away. Which approach do you think is better for most students?',
    st: [['Hannah', 'A gap year is valuable. Students become more mature and know better what they want to study, so they are more motivated when they start.'], ['Diego', 'I think it\'s risky. Many students lose their study habits during a year off, and some never go to university at all. It is also expensive.']],
    m: `In my opinion, a gap year is beneficial for students who use it with a clear plan, but it is not ideal for everyone. Hannah is right that maturity and motivation can improve after a year of real-world experience, and several studies show that students who take a gap year often perform better academically. However, Diego raises a legitimate concern: without structure, a year off can easily turn into a year of doing nothing. That is why I believe the quality of the gap year matters most. A student who works in a hospital, learns a language abroad, or runs a volunteering project will return with new skills and confidence. On the other hand, a student who simply stays at home may find it hard to resume studying. Universities could help by offering deferred admission, which would reduce the risk Diego describes.`,
    tips: 'Condition clé (« with a clear plan »), exemples précis d\'activités, solution institutionnelle (deferred admission). Connecteurs : However, That is why, On the other hand.' },
  { id: 'dsx009', diff: 2, course: 'sociology', prof: 'Professor Nwosu',
    q: 'Some people say that students should work part-time during their studies to gain experience and independence. Others argue that students should focus exclusively on their studies. What do you think?',
    st: [['Clara', 'Working teaches responsibility, time management, and skills that you cannot learn in class. Employers also value work experience.'], ['Idris', 'Studies are demanding already. Working twenty hours a week can lower grades and cause exhaustion. Students should concentrate on getting their degree.']],
    m: `I believe part-time work can be valuable, provided that it remains limited and ideally related to the student's field. Clara is right that employers appreciate experience, and handling both classes and a job teaches time management better than any lecture. Nevertheless, Idris's concern is supported by research, which suggests that working more than about fifteen hours a week tends to reduce academic performance. A balanced solution would be a small number of hours, perhaps ten, preferably in a position connected to the degree, such as a research assistant or a junior role in a company. Universities could also help by offering flexible on-campus jobs that adapt to exam periods. In this way, students gain the benefits Clara describes without paying the academic price that worries Idris. Of course, students who must work for financial reasons deserve support, such as grants, so they do not have to choose between income and success.`,
    tips: 'Chiffres plausibles (10-15 h), idée de politique universitaire, ajout d\'une dimension sociale (étudiants contraints de travailler). Argumentation équilibrée.' },
  { id: 'dsx010', diff: 2, course: 'energy policy', prof: 'Dr. Haug',
    q: 'Some countries are building more nuclear power plants to reduce carbon emissions. Others are closing them because of safety concerns. Do you think nuclear energy should be part of the solution to climate change? Why or why not?',
    st: [['Felix', 'Yes. Nuclear energy produces almost no carbon, and it provides stable power day and night, unlike solar or wind energy.'], ['Amara', 'The risks are too high. Accidents like Fukushima show what can go wrong, and nobody has found a perfect solution for radioactive waste.']],
    m: `I think nuclear energy should be part of the transition, mainly because the climate emergency leaves us little time for ideal solutions. Felix is right that nuclear power provides reliable low-carbon electricity, and this is crucial since solar and wind depend on the weather and storage technology is still expensive. Amara's concerns are understandable, but the statistics show that, per unit of energy produced, nuclear power has caused far fewer deaths than coal or gas, which pollute the air every day. As for waste, the volume is surprisingly small compared with other industries, and it is kept in sealed containers while countries such as Finland build deep underground repositories. However, nuclear projects are expensive and slow, so I would not rely on them exclusively. The best strategy is to combine renewable energy with existing and carefully regulated nuclear plants, which would allow us to phase out fossil fuels faster.`,
    tips: 'Argumentation chiffrée (morts par unité d\'énergie), réponse directe aux deux objections, position finale équilibrée. Vocabulaire : « low-carbon », « phase out », « underground repositories ».' },
  { id: 'dsx011', diff: 2, course: 'cultural studies', prof: 'Professor Salazar',
    q: 'Many museums charge an entrance fee, while others are free. Some argue that museums should be free for everyone, funded by the government. Others believe that visitors should pay. What is your opinion?',
    st: [['Yuki', 'Museums are part of our common heritage. If they are free, more people, especially students and low-income families, can access culture and education.'], ['Oliver', 'Running a museum is very expensive. If visitors don\'t pay, the money must come from taxes, which means that people who never visit still have to pay.']],
    m: `I think national museums should be free or very cheap, at least for permanent collections. Yuki is right that access to culture should not depend on income. When several national museums in the United Kingdom dropped their fees in 2001, visitor numbers rose sharply, and many first-time visitors came through the door. Oliver's point about costs is fair, and it explains why I would keep fees for special exhibitions, which are expensive to organize. This hybrid model would let museums collect revenue from those who want a premium experience, while the permanent collection remains open to all. As for taxpayers who never visit, we already fund libraries, parks, and public education that not everyone uses, because society benefits as a whole. In that sense, free museums are an investment in a more informed and cohesive community.`,
    tips: 'Modèle hybride (collections gratuites, expositions payantes), analogie avec les autres services publics pour répondre à Oliver.' },
  { id: 'dsx012', diff: 2, course: 'computer science', prof: 'Dr. Tanaka',
    q: 'Self-driving cars are expected to become common in the next decades. Supporters say they will be safer than human drivers. Critics worry about technical failures and about who is responsible in an accident. Do you think self-driving cars will be a positive development for society?',
    st: [['Grace', 'Yes. Most accidents are caused by human mistakes such as distraction or tiredness. A computer never gets tired, so roads will be safer.'], ['Leon', 'I\'m worried about the legal side. If the car causes an accident, who is responsible, the owner, the manufacturer, or the software company? Also, many drivers will lose their jobs.']],
    m: `Overall, I believe self-driving cars will be a positive development, but only if legislation and employment policies are prepared in advance. Grace is right that human error is behind the vast majority of crashes, so even an imperfect automated system could save many lives. Leon, however, identifies two issues that technology alone cannot solve. As for responsibility, governments should establish clear rules before the cars arrive on the roads, for example by making manufacturers liable when the software is in control. This would also give companies a strong incentive to guarantee safety. Regarding jobs, truck and taxi drivers will certainly be affected, so retraining programs should be financed from the savings generated by fewer accidents. If these conditions are met, self-driving vehicles could make transport safer, cheaper, and more accessible to elderly or disabled people.`,
    tips: 'Anticipation de problèmes sociaux et juridiques, solutions précises (responsabilité du constructeur, reconversion), ajout d\'un bénéfice nouveau (accessibilité).' },
  { id: 'dsx013', diff: 2, course: 'linguistics', prof: 'Professor Ferreira',
    q: 'In many countries, schools require students to study a foreign language, often English. Some people believe that everyone should learn several languages. Others think translation technology makes this unnecessary. What do you think?',
    st: [['Mina', 'Learning languages is still essential. It opens doors to other cultures and jobs, and it trains the brain in ways that translation apps never could.'], ['Pedro', 'With real-time translation on our phones, learning a language takes years for a result that an app can give in seconds. That time could be spent on other subjects.']],
    m: `I disagree with Pedro, although I understand his argument. Translation tools are excellent for practical situations, such as reading a menu or asking for directions. However, they cannot replace the human connection that comes from speaking someone's language. In business, for example, people tend to trust partners who make the effort to communicate directly, and negotiations rely on subtle nuances and tone that an app often misses. Mina is also right that learning a language benefits the brain; some studies suggest that bilingual people are better at switching between tasks. Moreover, depending completely on technology makes us vulnerable, since an app cannot help us during a power cut or in a spontaneous conversation. For these reasons, I think schools should continue to teach languages, but they could use translation tools to focus more on speaking and cultural understanding than on memorizing grammar.`,
    tips: 'Exemple professionnel (négociation), concession à Pedro (utilité pratique), suggestion pédagogique nouvelle. Bon usage de « Moreover », « However ».' },
  { id: 'dsx014', diff: 3, course: 'media studies', prof: 'Dr. Okoye',
    q: 'Some countries are discussing a minimum age of sixteen for using social media platforms. Supporters say this would protect young people. Opponents say it is impossible to enforce and takes away freedom. Do you support a minimum age? Why or why not?',
    st: [['Zoe', 'I support it. Young teenagers are more vulnerable to comparison, cyberbullying, and addiction. A legal limit would force platforms to take responsibility.'], ['Andre', 'It won\'t work. Teenagers will simply lie about their age. It would be better to teach them how to use social media safely.']],
    m: `I support a minimum age, but I agree with Andre that a law alone would not be sufficient. Zoe is right that younger adolescents are especially sensitive to social comparison, and a legal limit sends a clear message to families and platforms. At the same time, Andre's concern about enforcement is realistic, since declaring a false birth date takes five seconds. The solution would be to make companies responsible for verification, using systems similar to those used for online banking, and to impose heavy fines if they fail. Education should complement this approach: schools can teach students how algorithms work and how to protect their privacy, so that when teenagers do join, they are better prepared. By combining regulation and education, we would reduce the risks without relying on either method alone.`,
    tips: 'Position « les deux à la fois » argumentée, détail concret sur l\'application (vérification comme en banque en ligne), contribution personnelle (éducation aux algorithmes).' },
  { id: 'dsx015', diff: 3, course: 'ethics and technology', prof: 'Professor Lindqvist',
    q: 'Some universities are using facial recognition and other biometric systems to take attendance, monitor exams, and control access to buildings. Supporters point to security and efficiency. Critics raise concerns about privacy and surveillance. Do you think universities should adopt these technologies?',
    st: [['Chen', 'I think they can be useful. They reduce cheating during online exams and make campus buildings safer, and they save professors time on administrative tasks.'], ['Marta', 'Students should not be treated like suspects. Biometric data is extremely sensitive, and if it is leaked it cannot be changed like a password.']],
    m: `I would argue that universities should be very cautious, using biometric systems only where a genuine need exists and no less intrusive alternative is available. Chen is right that cheating in online exams is a real problem, but Marta's point about irreversibility is, in my view, decisive: a stolen password can be replaced, whereas a stolen face cannot. This risk is serious because universities are frequent targets of cyberattacks. Moreover, constant monitoring changes the climate of trust between students and institutions, which is essential for education. I would therefore limit such technology to high-security areas, such as research laboratories, and rely on alternatives like oral examinations or open-book assessments to deter cheating. If biometric data is collected at all, it should be stored locally on the user's device rather than in a central database, with explicit and revocable consent. In short, convenience should never outweigh the protection of fundamental rights.`,
    tips: 'Argument décisif repris à Marta et développé (irréversibilité), alternatives concrètes, garanties techniques (stockage local, consentement révocable). Registre soutenu.' },
  { id: 'dsx016', diff: 3, course: 'labor economics', prof: 'Dr. Carvalho',
    q: 'Unpaid internships are common in many industries, particularly in fields such as media, fashion, and politics. Some people argue that they provide valuable experience, while others say they give an advantage to wealthy students. Should unpaid internships be banned?',
    st: [['Hana', 'Unpaid internships create inequality. Only students whose families can support them financially can afford to work for free, so they get all the best opportunities.'], ['Luca', 'Banning them would reduce the number of opportunities. Many small organizations simply cannot afford to pay interns, so they would stop offering positions altogether.']],
    m: `I think unpaid internships should be banned for for-profit companies, but not necessarily for small non-profit organizations. Hana's argument about inequality is compelling: access to a career should depend on talent, not on a family's ability to cover rent in an expensive city. Luca, however, highlights a real trade-off, because a blanket ban might eliminate positions at organizations with very limited budgets. A more targeted policy would distinguish between these cases. Companies that make a profit from the interns' work should pay at least the minimum wage, which would also stop firms from replacing regular employees with free labor. Small non-profits could be allowed to offer unpaid positions, provided that they are short, have a clear educational component, and are partly financed by public grants or university funds. This approach protects fairness without destroying the opportunities Luca is concerned about.`,
    tips: 'Distinction juridique fine (entreprises lucratives / non-profit), argument supplémentaire (substitution à l\'emploi réel), solution de financement public. Vocabulaire : « blanket ban », « trade-off ».' },
  { id: 'dsx017', diff: 3, course: 'cultural heritage', prof: 'Professor Aydin',
    q: 'Many historic neighborhoods face pressure from developers who want to replace old buildings with modern housing or offices. Some argue that cities must preserve their heritage; others say that cities must adapt to the needs of their growing populations. How should cities balance preservation and development?',
    st: [['Sofia', 'Historic buildings are irreplaceable. Once they are demolished, a city loses its identity and its appeal for tourists, and that cannot be recovered.'], ['Mark', 'Cities are living places, not museums. If we protect every old building, housing becomes more expensive, and young people can\'t afford to live in the center.']],
    m: `I believe the real question is not preservation versus development, but which buildings deserve protection and how we allow them to evolve. Sofia is right that demolished heritage is lost forever, yet Mark's concern about affordability is equally valid, since a city that freezes itself becomes an expensive open-air museum. A balanced approach would rely on adaptive reuse: instead of demolishing old factories, warehouses, or even churches, cities can convert them into housing, offices, or cultural spaces while keeping their facades and structures. London's Tate Modern, housed in a former power station, shows that this can bring investment and tourism together. At the same time, protection should be selective and based on historical value, rather than automatically applied to every old building. By allowing taller, modern buildings in less sensitive areas, planners can increase housing supply where it causes the least harm to a city's character.`,
    tips: 'Reformulation de la question (« not X versus Y, but… »), concept précis (adaptive reuse), exemple concret (Tate Modern), protection sélective. Argumentation très C1.' },
  { id: 'dsx018', diff: 3, course: 'sports management', prof: 'Dr. Eriksen',
    q: 'Governments spend large amounts of public money to host major sporting events such as the Olympic Games or the World Cup. Supporters point to economic benefits and national pride; critics say the money would be better spent elsewhere. Do you think hosting these events is a good use of public funds?',
    st: [['Jamal', 'Yes, in most cases. These events bring tourists, create jobs, and improve infrastructure. They also give citizens a sense of unity and pride.'], ['Elise', 'The costs are usually much higher than predicted, and many stadiums are abandoned afterward. Hospitals and schools are a better investment of public money.']],
    m: `In my view, hosting a mega-event is a good use of public funds only under very specific conditions, and the historical record suggests these conditions are rarely met. Jamal is right that such events can accelerate infrastructure projects, but Elise's observation about cost overruns is well supported: most recent Olympic Games ended with budgets far above the initial estimates. The crucial factor is legacy. Cities that reused existing facilities and built only what they needed afterward, such as Barcelona in 1992 with its urban regeneration, gained long-term benefits, whereas others were left with expensive empty stadiums. Therefore, I would argue that governments should only bid if most of the venues already exist or will be converted for public use, and if an independent audit confirms the budget in advance. Pride and unity are valuable, but they should not be financed at the expense of essential services such as healthcare and education.`,
    tips: 'Concept central (legacy), exemple historique pertinent, conditions précises (audit indépendant, installations existantes), conclusion qui hiérarchise les priorités.' }
);
