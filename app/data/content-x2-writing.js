/* WRITING (x2 bank) — Write an Email (ez001-ez030) + Academic Discussion (dsz001-dsz030). diff : 2 = B2, 3 = C1, 4 = C2 */
(function () {

CONTENT.email.push(
  { id: 'ez001', diff: 2, to: 'the Registrar\'s Office', toAddr: 'Registrar\'s Office', subj: 'Request for an official transcript',
    s: 'You are applying to a master\'s program in finance. The application portal requires an official, stamped transcript, but the version you can download from the student website is not accepted. The deadline is at the end of the month.',
    t: ['Introduce yourself and say which document you need', 'Explain why you need it', 'Ask about processing time, cost, and delivery'],
    m: `Dear Registrar's Office,

My name is Sacha Laborde (student number 20458), and I am a final-year student in the Bachelor of Business Administration. I am writing to request an official copy of my academic transcript, in English if possible.

I need it for my application to a master's program in finance, and the online portal requires a stamped document to be uploaded by the end of the month. Unfortunately, the unofficial version that I can download from the student website is not accepted.

Could you please tell me how long it usually takes to process a request and whether there is a fee? I would also like to know whether the transcript can be sent electronically directly to the university, or whether I should collect a paper copy from your office. If you need any additional information from me, I will provide it right away.

Thank you very much for your help.

Kind regards,
Sacha Laborde`,
    tips: 'Les trois consignes = trois paragraphes courts. Le numéro étudiant et la précision « in English if possible » rendent la demande concrète. Question groupée : délai, prix, mode de livraison (« whether… or whether… »).' },
  { id: 'ez002', diff: 2, to: 'your neighbor in the dormitory, Ms. Larsen', toAddr: 'Ms. Larsen', subj: 'Apology for Saturday night',
    s: 'On Saturday night you invited some friends to your room to celebrate the end of your exams. The music and conversation continued until almost two in the morning, and your neighbor, Ms. Larsen, has complained to the front desk.',
    t: ['Apologize for the noise', 'Explain what happened', 'Promise to avoid the problem in the future and offer to make amends'],
    m: `Dear Ms. Larsen,

I am writing to apologize for the noise coming from my room on Saturday night. I realize that the music and the voices went on until almost two in the morning, and I am truly sorry that they kept you awake.

I had invited a few friends to celebrate the end of our exams, and we honestly lost track of the time. That is not an excuse, though, because I should have thought about how thin the walls are and about the fact that you were working on Sunday morning.

From now on, I will make sure that any gathering ends before 11 p.m., and I will warn you in advance whenever I plan to invite friends. If it would help, I would also be happy to bring you a coffee and a pastry this week to make up for the disturbance.

Please let me know if there is anything else I can do. Thank you for being so patient with me.

Best wishes,
Sacha`,
    tips: 'Excuse sincère sans se justifier à l\'excès (« That is not an excuse, though »), engagement précis (avant 23 h, prévenir à l\'avance) et petit geste final. « I realize that », « make up for » : lexique de l\'excuse.' },
  { id: 'ez003', diff: 2, to: 'the customer service of a gym', toAddr: 'Customer Service, FitZone Gym', subj: 'Payment taken after cancellation',
    s: 'You cancelled your gym membership at the front desk because you were moving to another city, and you were told that no more payments would be taken. A month later, you notice that the gym has charged your bank account again.',
    t: ['Explain that you cancelled your membership', 'Describe the unexpected payment', 'Ask for a refund and a written confirmation'],
    m: `Dear Customer Service,

I am writing about my membership at the FitZone gym on Mill Street (member number 3382). On the first of September, I cancelled my contract in person at the front desk because I was moving to another city, and the receptionist told me that no further payments would be taken.

However, I have just noticed that 39 euros was withdrawn from my bank account on the fifth of October. This is surprising, because I handed in the cancellation form and kept a signed copy, which I can send you if necessary.

I would therefore like to ask you to refund this payment as soon as possible. Could you also confirm in writing that my membership has been cancelled and that I will not be charged again? As a student I have a limited budget, so I would be grateful for a quick answer.

Thank you for your help.

Yours sincerely,
Sacha Laborde`,
    tips: 'Chronologie datée, preuve disponible (« signed copy »), demande double et claire (remboursement + confirmation écrite). « However » marque le contraste entre la promesse et la réalité.' },
  { id: 'ez004', diff: 2, to: 'Professor Novak', toAddr: 'Professor Novak', subj: 'Questions about the research essay',
    s: 'You are in Professor Novak\'s seminar on international trade. A research essay is due in two weeks, but the instructions on the course page leave three points unclear: whether the word limit includes the bibliography, which referencing style to use, and whether you may choose a country that was discussed in the lectures.',
    t: ['Say who you are and which assignment you are asking about', 'Point out what is unclear in the instructions', 'Ask for a short confirmation'],
    m: `Dear Professor Novak,

I am a student in your Tuesday seminar on international trade, and I am writing to clarify a few points about the research essay that is due on the twelfth.

First, the instructions say that the essay should be "between 1,500 and 2,000 words," but it is not clear to me whether this includes the bibliography and footnotes. Second, you mentioned in class that we should use a consistent referencing style, yet the course page does not say which one you prefer. Finally, I am not sure whether we may choose a country that was already discussed in the lectures, or whether the case study should be new.

I do not want to make a mistake that could cost me points, so I would be very grateful if you could confirm these three details. A short reply by email would be perfectly sufficient.

Thank you for your time.

Best regards,
Sacha Laborde`,
    tips: 'Les ambiguïtés sont numérotées (First, Second, Finally) : le lecteur peut répondre point par point. Motif donné pour la question (« cost me points ») et demande minimale (« a short reply »).' },
  { id: 'ez005', diff: 2, to: 'your friend Mia', toAddr: 'Mia', subj: 'I am so sorry about last night',
    s: 'Yesterday was your friend Mia\'s birthday, and she had organized a dinner at a restaurant. You were finishing a group report and completely forgot to go. You did not even send her a message.',
    t: ['Apologize for missing the dinner', 'Explain what happened', 'Suggest a way to make up for it'],
    m: `Hi Mia,

I am so sorry that I missed your birthday dinner last night. I know you booked the table weeks ago, and I feel terrible that I did not even call to warn you.

What happened is that I was finishing a group report that was due this morning, and I completely lost track of time. When I finally looked at my phone, it was already ten o'clock and the dinner was over. I should have sent you a message earlier, and I am really sorry I didn't.

To make it up to you, would you let me take you out for dinner next Friday? I would love to choose a place you like, and it would be my treat. I have also kept a small present for you, so I would be glad to give it to you in person.

Again, I am sorry, and I hope you had a wonderful evening with the others.

Love,
Sacha`,
    tips: 'Registre amical mais sincère : l\'excuse vient d\'abord, l\'explication ensuite (sans se chercher d\'alibi), puis une proposition concrète (« my treat »). « To make it up to you », « lose track of time » : expressions naturelles.' },
  { id: 'ez006', diff: 2, to: 'Ms. Brandt, the recruiter who interviewed you', toAddr: 'Ms. Brandt', subj: 'Thank you for the interview',
    s: 'On Tuesday you had an interview for a summer internship in the risk analysis team of a bank. In the interview, the recruiter described a new credit scoring tool. You have another offer that you must answer by the end of next week.',
    t: ['Thank the recruiter for the interview', 'Mention something from the interview that interested you', 'Ask when you can expect a decision'],
    m: `Dear Ms. Brandt,

Thank you very much for taking the time to meet me on Tuesday about the summer internship in the risk analysis team. I really enjoyed our conversation and learning more about the projects that interns are involved in.

I was particularly interested in what you told me about the new credit scoring tool, because I used a similar method in a statistics project last semester. The interview confirmed that this position matches both my academic background and my career goals, and I would be delighted to contribute to the team.

If you need any additional information, such as my grades or a writing sample, please do not hesitate to ask. I would also be grateful if you could let me know when I can expect a decision, as I have another offer that I must answer by the end of next week.

Thank you again for your time and consideration.

Best regards,
Sacha Laborde`,
    tips: 'Un bon email de suivi cite un détail précis de l\'entretien (« credit scoring tool ») et le relie à son propre parcours. La question sur le calendrier est justifiée par une contrainte réelle, ce qui la rend légitime.' },
  { id: 'ez007', diff: 3, to: 'your landlord, Mrs. Okonkwo', toAddr: 'Mrs. Okonkwo', subj: 'Rent for the lease renewal',
    s: 'Your landlord has informed you that your rent will rise by eight percent when your lease is renewed in January. You have been a reliable tenant for two years and would like to stay, but the increase is more than you can comfortably afford.',
    t: ['Acknowledge the notice and say that you wish to stay', 'Explain why the increase is a problem and make a counter-proposal', 'Offer something in return, such as a longer lease'],
    m: `Dear Mrs. Okonkwo,

Thank you for your letter of 3 October informing me that the rent will rise by eight percent when my lease is renewed in January. I appreciate being told so early, and I would very much like to stay, having been a tenant for two years.

That said, the proposed increase is considerably higher than I had anticipated. It would far exceed the rise in living costs over the past year, and as a student with a part-time income, I would struggle to absorb it. I would therefore like to suggest an increase of three percent, which is broadly in line with inflation and with comparable apartments in the neighborhood.

In return, I would be happy to sign a new two-year lease, which would spare you the cost and uncertainty of finding another tenant. I could also continue to look after the shared garden, as I have done so far.

I would welcome the opportunity to discuss this at your convenience.

Yours sincerely,
Sacha Laborde`,
    tips: 'Négociation : reconnaître, contester poliment (« That said »), contre-proposition chiffrée et justifiée, puis concession en échange (bail de deux ans). On négocie en offrant de la valeur, pas en menaçant.' },
  { id: 'ez008', diff: 3, to: 'Mr. Delgado, Head of Recruitment at Altair Capital', toAddr: 'Mr. Delgado', subj: 'Your offer: Junior Analyst position',
    s: 'Altair Capital has offered you a Junior Analyst position starting on 1 July. You would like to accept, but the final defense of your master\'s thesis is on 10 July, and your degree depends on it.',
    t: ['Express your enthusiasm for the offer', 'Explain why the proposed start date is difficult', 'Propose an alternative start date and a flexible arrangement'],
    m: `Dear Mr. Delgado,

Thank you so much for the offer of the Junior Analyst position, which I was delighted to receive. The role matches precisely what I was hoping for, and I am very enthusiastic about joining the team at Altair Capital.

There is, however, one point I would like to raise. The proposed start date of 1 July falls just before the final defense of my master's thesis, which is scheduled for 10 July. Since my degree depends on it, I want to give it my full attention, and I would not want to arrive in my first week with my mind elsewhere.

Would it be possible to begin on 21 July instead? In the meantime, I would gladly complete any onboarding paperwork or preliminary reading remotely, so that I can be productive from the first day. If a later start is not feasible, I would be open to starting on 1 July on a reduced schedule until the defense.

I look forward to hearing from you.

Kind regards,
Sacha Laborde`,
    tips: 'Enthousiasme avant la difficulté, raison légitime et datée, alternative principale + plan B (« reduced schedule »). « I would not want to… » : formule douce pour justifier un décalage sans paraître réticent.' },
  { id: 'ez009', diff: 3, to: 'Ms. Whitfield, events manager of the Grand Hotel', toAddr: 'Ms. Whitfield', subj: 'Charity gala: booking the ballroom',
    s: 'You are the treasurer of your university\'s Finance Society, which is organizing a charity gala to fund a scholarship. The Grand Hotel\'s ballroom is perfect, but the quoted price is well above your budget.',
    t: ['Introduce the event and explain why the venue suits it', 'Explain your budget constraint', 'Propose specific terms in exchange for a lower price'],
    m: `Dear Ms. Whitfield,

I am the treasurer of the university's Finance Society, and we are organizing a charity gala on 14 March to raise funds for a local scholarship. After visiting several venues, we agreed that the ballroom of the Grand Hotel would be the ideal setting, both for its capacity of 200 guests and for its central location.

Unfortunately, the quoted price of 6,500 euros considerably exceeds what we can afford, since every euro spent on the venue is a euro less for the scholarship. Our maximum budget for the room and catering is 4,500 euros.

To help us reach an agreement, we would like to suggest the following arrangement. We would hold the event on a Sunday evening, when the ballroom is usually free, and we would present the hotel as our main sponsor in all of our communication, including the program, our website, and a banner on the stage.

I would be delighted to discuss this proposal by phone or in person, at your convenience.

Yours sincerely,
Sacha Laborde`,
    tips: 'Négocier un prix en offrant une contrepartie (jour creux + visibilité commerciale). L\'argument moral (« a euro less for the scholarship ») humanise la demande. Chiffres précis des deux côtés.' },
  { id: 'ez010', diff: 3, to: 'Ms. Ito, your former internship supervisor', toAddr: 'Ms. Ito', subj: 'Reference for a scholarship application',
    s: 'Last summer you did an internship in the audit department of a firm, supervised by Ms. Ito. You are now applying for a competitive scholarship that requires a reference from an employer, due in three weeks. The selection committee values reliability and analytical skills.',
    t: ['Remind her of your work in her team', 'Explain the scholarship and what the reference should emphasize', 'Make the request easy by giving the deadline and offering supporting material'],
    m: `Dear Ms. Ito,

I hope you are well. I was an intern in your audit team last summer, and I still remember how much I learned from the inventory review we carried out together for the retail client.

I am now applying for the Hartley Scholarship, which supports graduate study in finance, and the application requires a reference from a former employer. Since you supervised my work directly, I wonder whether you would be willing to write one. The committee particularly values reliability and analytical skills, so if you felt able to comment on those, it would carry great weight.

The letter would be due on 12 November, and it can be uploaded through a secure link that I would forward to you. To save you time, I would be glad to send my CV, a short summary of the tasks I handled, and a draft outline of my goals.

I fully understand if your schedule makes this difficult. Thank you in advance for considering it.

Kind regards,
Sacha Laborde`,
    tips: 'Rappel précis (« inventory review »), critères de sélection donnés pour orienter la lettre, échéance + lien sécurisé + documents proposés : la demande est facile à satisfaire. Porte de sortie polie en fin.' },
  { id: 'ez011', diff: 3, to: 'the customer service of an online outdoor-gear retailer', toAddr: 'Customer Service, TrailPoint', subj: 'Order 66128: product not as described',
    s: 'You bought a backpack described on a website as "completely waterproof." During a rainy hike, water got in and damaged your laptop, and the company has refused to refund the bag because the return period of 14 days has passed.',
    t: ['Describe the order and the gap between the description and reality', 'Explain the consequences and what you have already done', 'State what you expect and by when'],
    m: `Dear Customer Service Team,

I am writing about order 66128, a Ridge 30 backpack that I bought from your website on 2 September. The product page describes it as "completely waterproof," yet during a hike last Sunday, heavy rain soaked through the main compartment and the contents were wet within an hour.

Unfortunately, my laptop was in the bag and has been seriously damaged. I contacted your support line on Monday, and the agent refused a refund on the grounds that the 14-day return period had expired. However, the fault lies with the advertisement, not with my timing: the bag was never as described, so this is a question of misleading information rather than of a change of mind.

I therefore expect a full refund of the backpack. I would also appreciate it if you could review the product description, since other customers may be misled in the same way.

If I do not receive a satisfactory reply within ten days, I will contact a consumer protection association.

Yours faithfully,
Sacha Laborde`,
    tips: 'Plainte argumentée : on déplace le débat de « délai de retour » vers « publicité trompeuse ». Citation exacte de la description, démarche déjà faite, attente claire et délai de dix jours. Fermeté sans agressivité.' },
  { id: 'ez012', diff: 3, to: 'Dr. Yamada, a potential thesis supervisor', toAddr: 'Dr. Yamada', subj: 'Following up on my thesis proposal',
    s: 'Twelve days ago you sent Dr. Yamada a short proposal for a master\'s thesis on household debt, asking if he would supervise it. You have not had a reply, and you must register your thesis topic within three weeks.',
    t: ['Remind him of your earlier message', 'Summarize your research idea in one or two sentences', 'Ask for a decision or a short meeting and mention your timeframe'],
    m: `Dear Dr. Yamada,

I hope you are well. I am following up on the message I sent on 4 March, in which I asked whether you might be willing to supervise my master's thesis. I realize that this is a busy time of the semester, so I completely understand if you have not yet had the chance to reply.

To recall my idea briefly, I would like to examine how changes in interest rates affect household debt repayment in Southern Europe, using the public survey data that your own recent paper relied on. I believe this would build directly on your work and add a comparative perspective.

Since the deadline for registering thesis topics falls in three weeks, would it be possible to meet for fifteen minutes, in person or online, sometime next week? Alternatively, a brief reply telling me whether you have the capacity to supervise would already help me plan my next steps.

Thank you for your time and consideration.

Best regards,
Sacha Laborde`,
    tips: 'Relance sans reproche (« I completely understand »), rappel du projet en une phrase, lien avec le travail du professeur, demande minimale (quinze minutes) et alternative (réponse brève). La contrainte de calendrier est expliquée.' },
  { id: 'ez013', diff: 3, to: 'your project team members', toAddr: 'Project Team', subj: 'Apology for the missed deadline',
    s: 'Your group was supposed to hand in the final report on Friday, and you were responsible for the financial analysis section. You sent it three days late because you underestimated the work, and the whole team lost marks for late submission.',
    t: ['Apologize sincerely to the team', 'Explain what went wrong without making excuses', 'Propose how you will repair the situation and prevent it from happening again'],
    m: `Dear all,

I owe you an apology. The financial analysis section was due on Friday and I delivered it three days late, which meant that our report was submitted after the deadline and we all lost marks. I am very sorry for the stress and extra work that this caused you.

I would like to be honest about the cause: I underestimated how long the sensitivity analysis would take, and instead of telling you early that I was falling behind, I kept hoping to catch up. That was the real mistake, because if I had warned you on Wednesday, we could have shared the work.

To make amends, I will proofread the whole report and take charge of the formatting for the next assignment. For the rest of the course, I also suggest that each of us posts a short progress update every Monday and Thursday, so that any delay becomes visible while there is still time to react.

Thank you for your patience. I will not let you down again.

Sacha`,
    tips: 'Excuse efficace : responsabilité assumée (« I owe you an apology »), vraie cause identifiée (ne pas avoir prévenu), réparation concrète + mécanisme préventif (points d\'étape). « Make amends » : expression C1.' },
  { id: 'ez014', diff: 3, to: 'your bank adviser, Ms. Rossi', toAddr: 'Ms. Rossi', subj: 'Unexpected fees on my student account',
    s: 'You were told that your student bank account was free of charge. This month your statement shows an account maintenance fee and a currency conversion charge on a purchase you made while on an exchange semester. You do not understand why.',
    t: ['Describe the charges you noticed', 'Explain why they surprised you', 'Ask for an explanation and for ways to avoid them in the future'],
    m: `Dear Ms. Rossi,

I hope you are well. I am writing about my student account, number ending 4417, because my latest statement shows two charges that I did not expect: an account maintenance fee of 4.50 euros on 3 October and a conversion fee of 6.20 euros on a card payment I made in Prague.

When I opened the account, I was told that it was free of charge for students under the age of twenty-six, and I do not recall any mention of fees for payments abroad. Naturally, the amounts are small, but I would like to understand the rules, particularly because I will be on an exchange semester until January and expect to use my card regularly.

Could you please explain on what basis these fees were applied and whether the maintenance fee was charged by mistake? I would also appreciate your advice on how to avoid conversion costs, for example through a different card or a specific account option.

Thank you very much for your help.

Kind regards,
Sacha Laborde`,
    tips: 'Demande d\'éclaircissement plutôt que plainte : montants précis, référence à la promesse initiale, minimisation (« Naturally, the amounts are small, but… ») puis vrai enjeu (utilisation future). Deux questions distinctes.' },
  { id: 'ez015', diff: 3, to: 'the editor of the student economics journal', toAddr: 'Editor, Student Economics Review', subj: 'Revisions to my submitted article',
    s: 'Your article on microfinance was accepted for publication subject to revisions. The reviewers asked you to add a new robustness analysis, and the deadline is in five days. You need more time because the new data only became available this week.',
    t: ['Thank the editor for the feedback', 'Explain what the revision involves and why you need more time', 'Propose a new deadline and show your progress'],
    m: `Dear Editor,

Thank you very much for your message and for the reviewers' detailed comments. I found them both encouraging and helpful, and I am grateful for the opportunity to improve the article.

Most of the requested changes are already complete. However, the main revision involves a robustness analysis with the updated loan repayment data, which only became available from the statistics office on Monday. Cleaning and processing this dataset properly will take longer than the five days remaining, and I would rather submit careful work than a hurried version that could weaken the argument.

Would it be possible to extend the deadline by one week, to the 24th? To show that the project is well under way, I can already send you the revised introduction and literature review today, and I will share the preliminary results as soon as they are available.

Thank you for your understanding and flexibility.

Kind regards,
Sacha Laborde`,
    tips: 'Remerciement précis, avancement concret (« already complete »), raison indépendante de votre volonté (données disponibles lundi), nouvelle date exacte + gage de bonne foi (envoi des parties terminées).' },
  { id: 'ez016', diff: 3, to: 'the Accessibility Services office', toAddr: 'Accessibility Services', subj: 'Exam accommodations after an injury',
    s: 'Last week you broke your right wrist in a cycling accident and your arm is in a cast for six weeks. Your final exams begin in ten days, and they are handwritten.',
    t: ['Explain your injury and its timing', 'Request specific accommodations', 'Offer documentation and say when you are available to discuss'],
    m: `Dear Accessibility Services,

I am writing to ask for support during my final exams. Last Tuesday I broke my right wrist in a cycling accident, and my arm will remain in a cast for six weeks, which covers the entire exam period beginning on 5 December.

Because I am right-handed and all of my exams are handwritten, I will not be able to write at a normal speed. I would therefore like to request additional time of at least thirty percent, a separate room, and, if possible, permission to use a laptop to type my answers. I would also appreciate a short break during each exam to rest my arm.

I can provide the medical certificate and the X-ray report from the hospital, and I have attached a scan of the certificate to this message. I am on campus every day except Friday, so I could come to your office whenever it suits you.

Thank you for your help in resolving this quickly.

Sincerely,
Sacha Laborde`,
    tips: 'Faits médicaux concis, aménagements précis et chiffrés (30 %, salle séparée, ordinateur), pièces justificatives jointes. Un email efficace réduit les allers-retours : tout ce dont le service a besoin est déjà là.' },
  { id: 'ez017', diff: 3, to: 'the Foundation\'s scholarship administrator, Mr. Lindeman', toAddr: 'Mr. Lindeman', subj: 'Clarification of clause 7 in the agreement',
    s: 'You have been awarded a scholarship and received the agreement to sign by Friday. Clause 7 says that you may have to repay the grant if you "discontinue your studies," but it does not say whether a change of program or a medical leave counts as discontinuing. You do not want to sign something ambiguous.',
    t: ['Thank the administrator and say which clause you are writing about', 'Explain why the wording is unclear to you', 'Ask for written clarification before the signing deadline'],
    m: `Dear Mr. Lindeman,

Thank you very much for sending me the scholarship agreement, and please pass on my thanks to the selection committee. I am truly honored by the award.

Before signing, I would like to ask about clause 7, which states that the grant must be repaid if I "discontinue my studies." The expression is not defined, and I am therefore unsure whether it would apply in situations such as a change of program within the same university, a semester abroad, or a medical leave approved by the university. I raise the question not because I intend to do any of these things, but because I would like to understand my obligations precisely.

Could you please clarify in writing how the Foundation interprets this clause, or point me to the relevant regulation? Since the agreement must be returned by Friday, I would be very grateful for an answer by Thursday, if at all possible.

Thank you for your help.

Kind regards,
Sacha Laborde`,
    tips: 'Précision juridique polie : citer la clause entre guillemets, énumérer les cas ambigus et préciser son intention (« not because I intend… »). Demander une réponse écrite avant l\'échéance de signature.' },
  { id: 'ez018', diff: 3, to: 'Ms. Hoffmann, head of analytics at the firm where you interned', toAddr: 'Ms. Hoffmann', subj: 'Recommending my classmate Karim Aziz',
    s: 'Ms. Hoffmann mentioned that her team will have a vacancy for a junior data analyst. Your classmate Karim Aziz, with whom you worked on two projects, would be an excellent candidate, and you want to recommend him to her.',
    t: ['Explain why you are writing and how you know Karim', 'Describe two of his qualities with examples', 'Offer to provide more information or introduce him'],
    m: `Dear Ms. Hoffmann,

I hope you are well. When we last spoke, you mentioned that your team would soon be looking for a junior data analyst, and I would like to recommend a classmate, Karim Aziz, who I think would be an excellent fit. We have worked together on two major projects in the past year, so I know his work well.

Karim is exceptionally rigorous: in our econometrics project, he found an error in the dataset that would otherwise have distorted the entire analysis, and he documented every step so clearly that the rest of us could reproduce his results. He is also an excellent communicator. When our group had to present to a panel of bankers, he explained a complex model in a way that everyone could follow.

I am aware that he has not yet worked in a consulting setting, but he learns fast and is very motivated. If it would be useful, I would be happy to put you in touch with him or to answer any further questions.

Best regards,
Sacha Laborde`,
    tips: 'Une recommandation crédible repose sur des exemples précis (erreur trouvée dans les données, présentation devant un jury), pas sur des adjectifs. Une limite reconnue honnêtement (« has not yet worked… ») renforce la sincérité.' },
  { id: 'ez019', diff: 3, to: 'Professor Mbeki', toAddr: 'Professor Mbeki', subj: 'Your offer of a research assistantship',
    s: 'Professor Mbeki has offered you a paid research assistantship for next semester. You are honored, but you have also accepted a demanding internship that leaves you no time for it. You want to decline without damaging the relationship.',
    t: ['Thank her for the offer', 'Explain honestly why you must decline', 'Suggest an alternative, such as recommending someone or collaborating later'],
    m: `Dear Professor Mbeki,

Thank you so much for offering me the research assistantship for next semester. I am genuinely honored that you thought of me, and I have greatly enjoyed working on your project on trade data during the seminar.

After careful consideration, I have unfortunately decided that I cannot accept. A few days ago, I committed to a full-time internship that will take up most of my week, and I would not be able to give your project the attention it deserves. I would rather decline now than accept and then disappoint you or your team.

If it is helpful, I can recommend a classmate, Elisa Moretti, who has strong data skills and a real interest in your research. I would also be very glad to help in a smaller capacity, for instance by reviewing the data documentation during the holidays, and I hope that we can collaborate again in the future.

Thank you again for your trust and understanding.

Kind regards,
Sacha Laborde`,
    tips: 'Refus diplomatique : remerciement sincère, raison honnête (« I would rather decline now than accept and then disappoint »), puis solutions (recommander quelqu\'un, aide ponctuelle). Le but est de préserver la relation à long terme.' },
  { id: 'ez020', diff: 3, to: 'the editor of The Campus Post', toAddr: 'Editor, The Campus Post', subj: 'Correction to your article on the Investment Club',
    s: 'Last week the student newspaper reported that the university\'s Investment Club lost 12 percent of its portfolio last year. In fact the club gained 4 percent, and the 12 percent figure referred to the broader market index. As the club\'s treasurer, you want the error corrected.',
    t: ['Identify the article and the error', 'Give the correct information with supporting evidence', 'Request a correction and explain why it matters'],
    m: `Dear Editor,

I am writing in my capacity as treasurer of the Investment Club about the article "Student Investors Struggle," published in your issue of 10 October. The article states that the club lost 12 percent of its portfolio last year.

Unfortunately, this figure is incorrect. The 12 percent decline refers to the broader market index that was mentioned in the same paragraph, whereas our portfolio actually gained 4 percent over the same period. This is documented in the annual report that we submitted to the Student Affairs Office, and I would gladly send you a copy together with the broker's statements.

I would be grateful if you could publish a correction in your next issue and update the online version. The distinction matters because the article may discourage students from joining the club, and it could also mislead readers about how our members have managed their investments.

I appreciate your attention to this matter and would be happy to speak with the journalist if that would help.

Sincerely,
Sacha Laborde`,
    tips: 'Rectification factuelle : identifier l\'article et la phrase, donner le chiffre correct et la source vérifiable, formuler la demande (correction en ligne + papier) et son enjeu. Ton factuel, sans accuser le journaliste.' },
  { id: 'ez021', diff: 4, to: 'Professor Haldane', toAddr: 'Professor Haldane', subj: 'Concerning the similarity report on my essay',
    s: 'Professor Haldane has told you that the plagiarism-detection software flagged 31 percent of your essay as similar to other sources. You believe that the overlap comes mainly from properly cited quotations, from the bibliography, and from a paragraph quoted from your own earlier course paper, which you referenced.',
    t: ['State that you wish to contest the interpretation of the report, calmly and respectfully', 'Explain the legitimate sources of the overlap', 'Request a meeting and offer evidence such as drafts and notes'],
    m: `Dear Professor Haldane,

Thank you for informing me of the similarity report on my essay. I take the matter extremely seriously, and I would like to respond to it constructively. While I fully understand why a figure of 31 percent warrants scrutiny, I would respectfully contend that the percentage alone may not reflect the actual character of the text.

On closer inspection, the highlighted passages seem to fall into three categories: direct quotations that are enclosed in quotation marks and cited in the footnotes, the bibliography, whose entries inevitably match published records, and a paragraph drawn from my own paper for last year's seminar, which I acknowledged in a footnote. None of these, in my view, constitutes an attempt to pass off another person's work as my own.

I would be grateful for the opportunity to go through the report with you in person. I can bring my handwritten notes, the dated drafts stored on my laptop, and the earlier paper, so that you can assess the process that led to the final text.

Yours sincerely,
Sacha Laborde`,
    tips: 'Contexte sensible : ton calme, vocabulaire précis (« warrants scrutiny », « contend », « pass off… as my own ») et preuves de processus (brouillons datés). On ne nie pas la légitimité de la vérification ; on conteste son interprétation.' },
  { id: 'ez022', diff: 4, to: 'Mr. Voss, a representative of a fossil-fuel company', toAddr: 'Mr. Voss', subj: 'Your generous sponsorship offer',
    s: 'Your university\'s Sustainability Society has been offered 15,000 euros by a fossil-fuel company to sponsor its annual conference. After a long internal debate, the members voted to decline, because accepting would contradict the society\'s mission and could undermine its credibility. You were chosen to write the reply.',
    t: ['Express appreciation for the offer', 'Explain the decision without accusing the company', 'Suggest another form of cooperation'],
    m: `Dear Mr. Voss,

On behalf of the Sustainability Society, I would like to thank you sincerely for your generous offer to sponsor our annual conference. It was clearly made in a constructive spirit, and the committee discussed it at considerable length.

After careful deliberation, however, our members voted to decline. Our decision reflects no judgment on your company's intentions; it stems from a principle we have set for ourselves. Because the society's authority depends on being seen as independent of the industries it studies, we have concluded that accepting funding from any energy producer, however well-meaning, could cast doubt on the integrity of our discussions, regardless of whether our programming were ever influenced.

We would nevertheless welcome a different kind of cooperation. We would be delighted to invite one of your engineers or strategists to speak on a panel about the energy transition, where your perspective would enrich the debate. That would allow a genuine exchange without any financial dependence.

Thank you again for your understanding.

Yours sincerely,
Sacha Laborde`,
    tips: 'Refus à enjeu éthique : on évite l\'accusation (« reflects no judgment on your company\'s intentions »), on formule le principe (indépendance perçue) et on propose une collaboration sans argent (panel). Syntaxe C2 : « however well-meaning », « regardless of whether… ».' },
  { id: 'ez023', diff: 4, to: 'the Dean of Studies', toAddr: 'Dean of Studies', subj: 'The proposed attendance policy',
    s: 'The faculty plans to make attendance compulsory in all courses, with up to 20 percent of the final grade depending on it. As a student representative, you disagree with the principle and want to present arguments and an alternative to the Dean before the policy is voted on.',
    t: ['State your objection to the policy clearly but courteously', 'Present two arguments against it', 'Propose a constructive alternative'],
    m: `Dear Dean,

I am writing as a student representative regarding the proposed attendance policy. I fully share the faculty's concern about disengagement, but I am convinced that linking a fifth of the final grade to attendance would be counterproductive.

My objections are twofold. First, a grade should certify what a student has learned, not where the student was seated. Awarding marks for presence conflates compliance with competence and penalizes those who master the material independently. Second, the rule would fall hardest on students who work, care for relatives, or commute long distances; for them, an absence is rarely a choice, and a quasi-disciplinary measure risks turning a pedagogical problem into a question of fairness.

Instead, I would suggest that the faculty address the root cause by making classes worth attending: active-learning formats, short in-class assessments that count modestly toward the grade, and recordings for students with documented constraints. We would be glad to help design and evaluate a pilot in two or three courses.

Respectfully yours,
Sacha Laborde`,
    tips: 'Argumentation de C2 : on partage d\'abord l\'objectif (« I fully share… »), on distingue des notions voisines (compliance vs competence), on anticipe l\'effet sur les groupes vulnérables, puis on propose un pilote. Vocabulaire : « counterproductive », « conflates », « twofold ».' },
  { id: 'ez024', diff: 4, to: 'Mr. Brandt, a senior analyst on your internship team', toAddr: 'Mr. Brandt', subj: 'A question about the sample in the client model',
    s: 'During your internship, you notice that the forecasting model Mr. Brandt built for a client uses only data from the last five years, a period of unusually low interest rates. You suspect that this may make the forecasts over-optimistic. The client presentation is on Thursday, and you are junior and do not wish to appear presumptuous.',
    t: ['Acknowledge the strengths of his work', 'Raise your concern about the data sample tactfully and specifically', 'Suggest a way to check the issue before the presentation'],
    m: `Dear Mr. Brandt,

I have been going through the client model in preparation for Thursday, and I have to say that I am impressed by the clarity of its structure; the scenario tool in particular is far easier to follow than anything I have seen in my coursework.

There is one point I would like to raise, and I do so with some hesitation, since you know the client far better than I do. As I understand it, the model is calibrated on the last five years of data, a period in which interest rates were exceptionally low. It occurred to me that this might make the projections look more favorable than a longer cycle would justify, and that the client might ask about it.

If it is of any use, I could rerun the model this afternoon with a ten-year window and compare the two sets of results. If the differences prove negligible, we would have a useful robustness argument for the presentation; if not, we would at least be prepared.

I would of course be glad to hear your view.

Best regards,
Sacha Laborde`,
    tips: 'Critique tactique à un supérieur : compliment réel et précis, critique formulée comme une observation (« It occurred to me that… »), offre de travail concret (fenêtre de dix ans) avec bénéfice dans les deux cas. Hedging C2 : « with some hesitation », « might ».' },
  { id: 'ez025', diff: 4, to: 'Dr. Ferreira, a former professor and mentor', toAddr: 'Dr. Ferreira', subj: 'Seeking your candid advice',
    s: 'You have received two job offers: one at a prestigious investment bank with a very high salary and long hours, and one at an international development organization with a lower salary and work that you find more meaningful. You must decide within ten days and would like the opinion of a mentor whom you trust.',
    t: ['Describe the two options briefly', 'Explain the dilemma and what is at stake for you', 'Ask for candid advice and propose a short conversation'],
    m: `Dear Dr. Ferreira,

I hope this message finds you well. I am writing because I have reached a decision that I feel unable to take alone, and your judgment has always been the one I trust most.

I have received two offers. The first is an analyst position at a leading investment bank, which pays very well and offers exceptional training, though at the cost of punishing hours. The second is a role with a development organization, where the salary is roughly half as high but where I would work on financing projects whose purpose I genuinely believe in.

What troubles me is that neither choice is clearly the wiser one. I worry that the second path might foreclose options that the first would keep open, yet I also suspect that I might resent a career whose only justification was its prestige. I must give my answer within ten days.

I would be profoundly grateful for your candid opinion, including any criticism of my reasoning. Would you have twenty minutes for a call next week? I would adapt to whatever time suits you.

With sincere thanks,
Sacha Laborde`,
    tips: 'Demande de conseil honnête : deux options décrites en peu de mots, tension intérieure exposée avec nuance (« foreclose options », « resent »), ouverture à la critique (« including any criticism ») et demande réaliste (vingt minutes).' },
  { id: 'ez026', diff: 4, to: 'Professor Lindholm, your thesis supervisor', toAddr: 'Professor Lindholm', subj: 'Proposed change to the scope of my thesis',
    s: 'Your thesis was meant to analyze loan-level data from a regional bank. Three weeks before you were due to start, the bank withdrew its permission to share the data for confidentiality reasons. Public aggregated data from the central bank are still available, but they would allow only a narrower analysis.',
    t: ['Report the setback clearly', 'Propose a revised scope and show that it remains rigorous', 'Ask for approval and a meeting before a specific date'],
    m: `Dear Professor Lindholm,

I regret to inform you of a setback concerning my thesis. The regional bank has withdrawn its permission to share the loan-level data on which my original design depended, citing confidentiality concerns that I was unable to resolve despite two attempts.

After considering the alternatives, I would like to propose a revised scope. Instead of analyzing individual loans, I would use the aggregated lending statistics published by the central bank, which cover the same region and period. This would undoubtedly narrow the analysis: I could no longer test borrower-level hypotheses. Nevertheless, the research question concerning the transmission of interest rate changes to credit supply can still be addressed at the aggregate level, and the public nature of the data would make the results fully reproducible, which I would regard as a methodological strength rather than a mere consolation.

Since the registration deadline falls on 20 January, I would be grateful for your approval of this change in principle. Could we meet before 10 January to discuss it? I will send a two-page outline beforehand.

Yours sincerely,
Sacha Laborde`,
    tips: 'Gérer un revers : présenter les faits sans dramatiser, reconnaître franchement la perte (« undoubtedly narrow ») avant de défendre la nouvelle option (reproductibilité). Demande datée + document préparé. « Rather than a mere consolation » : renversement élégant.' },
  { id: 'ez027', diff: 4, to: 'the editor of a national business newspaper', toAddr: 'Letters Editor, The Daily Ledger', subj: 'Reply to "The Failure of Economics"',
    s: 'The newspaper has published an opinion piece titled "The Failure of Economics," which claims that economics is a pseudo-science because economists failed to predict the 2008 financial crisis. As an economics student, you disagree with its reasoning and write a letter to the editor.',
    t: ['Refer to the article and its central claim', 'Challenge its reasoning with a counter-argument', 'Conclude with what is nonetheless worth retaining from the criticism'],
    m: `Dear Editor,

In "The Failure of Economics" (3 November), the author argues that the discipline's inability to predict the 2008 crisis proves it to be a pseudo-science. This claim deserves a reply, for it rests on a questionable assumption about what a science is supposed to do.

Predicting the exact timing of a crisis is not, and has never been, the criterion by which a science is judged. Seismologists cannot say when an earthquake will strike, yet nobody concludes that geology is a fraud. What economics can do, and has done, is explain mechanisms: why leverage amplifies losses, why bank runs spread, and which policies contain them. It was precisely this body of knowledge that guided central banks in 2009 and helped avert a repetition of the 1930s.

That said, the article's underlying concern is not misplaced. Too many models neglected the financial sector, and the profession was too confident in the stability of markets. A discipline that acknowledges such blind spots is not discredited by them; it is doing what science is supposed to do.

Yours faithfully,
Sacha Laborde`,
    tips: 'Lettre polémique : attaquer l\'hypothèse implicite (ce qu\'est une science), analogie parlante (sismologie), puis concession finale qui renforce la crédibilité. Structures à retenir : « rests on a questionable assumption », « is not misplaced », « is doing what… is supposed to do ».' },
  { id: 'ez028', diff: 4, to: 'the Investor Relations department of an asset manager', toAddr: 'Investor Relations, Greenfield Asset Management', subj: 'Holdings of the Greenfield Sustainable Equity Fund',
    s: 'You invested part of your savings in the Greenfield Sustainable Equity Fund, which is marketed as excluding companies with significant fossil-fuel activities. Reviewing the annual report, you notice that the top ten holdings include a major oil and gas producer.',
    t: ['Identify the fund and the apparent discrepancy', 'Explain why it matters to you as an investor', 'Request a documented explanation of the selection methodology'],
    m: `Dear Sir or Madam,

I am a unit holder in the Greenfield Sustainable Equity Fund, and I am writing about an apparent inconsistency that I noticed in the annual report. The fund is marketed as excluding companies with significant fossil-fuel activities, yet its tenth-largest holding is Northgate Energy, a major oil and gas producer.

I recognize that sustainability criteria can be defined in several ways, and there may be a reasonable explanation, such as a transition-based approach. For me, however, the issue goes beyond semantics. I chose this fund specifically because of its stated exclusions, and if the label does not correspond to the portfolio, I cannot properly assess either the risks I bear or the values my capital supports.

I would therefore be grateful if you could provide a written explanation of how Northgate Energy satisfies the fund's criteria, together with the full methodology and any exclusion thresholds used. Should the holding prove to be an error or an exception, I would also like to know how such cases are monitored.

I look forward to your reply.

Yours faithfully,
Sacha Laborde`,
    tips: 'Demande documentée à un acteur financier : relever la contradiction sans accuser (« there may be a reasonable explanation »), expliquer le préjudice (confiance dans le label), demander méthodologie et seuils. Lexique : « unit holder », « holding », « thresholds », « satisfies the criteria ».' },
  { id: 'ez029', diff: 4, to: 'Priya, a former project partner', toAddr: 'Priya', subj: 'About our paper and the authorship order',
    s: 'You and your classmate Priya co-wrote a paper for a course. It was later accepted at a student conference, but Priya submitted it with her name first and without consulting you, and you were hurt. You still value the friendship and want to settle it calmly.',
    t: ['Acknowledge the disagreement and your wish to resolve it', 'Explain your perspective without blaming her', 'Propose a fair way forward regarding authorship'],
    m: `Dear Priya,

I have thought a good deal about the conference submission, and I would rather speak to you directly than let a misunderstanding harden into resentment. I value our work together, and our friendship matters more to me than any line on a title page.

I should say plainly where I stand. When I saw the paper submitted with your name first and without a conversation beforehand, I was taken aback. I do not assume bad intentions; you may well have acted in haste, believing that the matter was settled, and I should perhaps have raised authorship earlier myself. But because the order tends to signal who contributed most, and because we divided the analysis and the writing fairly evenly, I felt it ought to have been discussed.

Might I suggest that we take a few minutes, whenever convenient, to list who did what and decide the order accordingly? If our contributions turn out to be equal, we could list our names alphabetically and add a note on equal contribution. I am sure we can find a solution that is fair to us both.

Warm regards,
Sacha`,
    tips: 'Réparer sans accuser : nommer le désaccord, séparer les faits (« taken aback ») des intentions (« I do not assume bad intentions »), partager une part de responsabilité, puis proposer une règle objective (contributions, ordre alphabétique). Registre chaleureux mais soigné.' },
  { id: 'ez030', diff: 4, to: 'the university\'s Research Ethics Committee', toAddr: 'Research Ethics Committee', subj: 'Request for reconsideration of protocol 2024-117',
    s: 'The Ethics Committee rejected your thesis protocol, a behavioral experiment on risk-taking in which participants are not told the true purpose of the study until afterward (deception). The committee fears that participants might be harmed or misled. You believe the risks are minimal and want to answer the concerns.',
    t: ['Refer to the decision and show that you understand the committee\'s concern', 'Respond to the concern by describing the safeguards you will add', 'Request reconsideration or conditional approval'],
    m: `Dear Members of the Committee,

I am writing regarding the rejection of protocol 2024-117 and wish to thank you for the detailed reasons that accompanied the decision. I understand the committee's central concern: that participants who are not told the true purpose of the experiment could be misled in ways that compromise their autonomy or cause distress.

I share the principle behind this concern, and I would like to propose several additional safeguards. First, the deception would be limited to the purpose of the study; participants would be fully informed of every task and its duration beforehand. Second, the stakes involve only small, virtual sums, so no participant can lose real money. Third, every participant would receive a thorough debriefing immediately afterward, with the right to withdraw their data without penalty, and a counselor's contact details.

Since the research question concerns spontaneous risk-taking, disclosure of the purpose would invalidate the results. I would therefore be grateful if the committee could reconsider the protocol or grant conditional approval subject to these measures. I would be happy to attend a meeting to answer questions.

Respectfully,
Sacha Laborde`,
    tips: 'Répondre à une décision défavorable : montrer qu\'on comprend l\'objection, apporter des garanties numérotées (First, Second, Third), justifier la nécessité méthodologique, demander une approbation conditionnelle. Vocabulaire : « safeguards », « debriefing », « withdraw », « invalidate ».' }
);

CONTENT.disc.push(
  { id: 'dsz001', diff: 2, course: 'education', prof: 'Ms. Hartley',
    q: 'Many schools require students to wear uniforms, while others let them choose their own clothes. Supporters say that uniforms create equality and discipline. Opponents say that they limit self-expression. Do you think schools should require uniforms? Explain your opinion.',
    st: [['Ana', 'I think uniforms are a good idea. Nobody has to worry about expensive brands, so there is less pressure and less bullying about clothes.'], ['Ben', 'I disagree. Clothes are a way to express who we are, and teenagers need to learn how to make their own choices.']],
    m: `I lean slightly against compulsory uniforms, although I understand why Ana likes the idea. It is true that uniforms can reduce visible differences in wealth, which may limit teasing about brands. However, I am not convinced that clothing is the main cause of bullying; students who want to pick on someone will always find another reason, such as their phone or their hobbies. Ben is right that choosing what to wear is a small but real way of learning independence. A reasonable compromise would be a simple dress code instead of a uniform: for example, plain colors, no visible logos, and nothing offensive. This keeps the equality that Ana mentions, because nobody can show off an expensive label, while still allowing students to choose clothes that suit their personality. Parents would also save money, since they would not need to buy a special outfit that can only be worn at school.`,
    tips: 'Position nuancée avec un compromis concret (dress code sans logos). Reprise des deux étudiants par leur prénom, puis idée nouvelle (économie pour les parents). Connecteurs : However, instead of, while.' },
  { id: 'dsz002', diff: 2, course: 'psychology', prof: 'Dr. Lang',
    q: 'Many students listen to music while they study or write essays. Some say that it helps them concentrate, while others say that it is a distraction. Do you think listening to music while studying is a good idea? Why or why not?',
    st: [['Mia', 'Yes, for me it works. Music blocks out noise from the street and my flatmates, and I feel more relaxed and motivated when I study.'], ['Noah', 'I cannot concentrate with music, especially if there are lyrics. My brain follows the words instead of the text, so I end up reading the same page three times.']],
    m: `I think the answer depends on the type of task and the type of music. Noah's experience is very common: songs with lyrics compete with the language processing that reading and writing require, so they can really reduce comprehension. Mia, on the other hand, has a point about background noise, since a steady sound can hide sudden distractions such as voices or traffic. Personally, I use both approaches. When I am memorizing formulas or doing repetitive exercises, I listen to instrumental playlists, which keep me calm and help me get started. But when I have to write an essay or understand a difficult text, I work in silence. Students should therefore experiment and observe their own results, perhaps by timing how long a task takes with and without music. That is a much more reliable guide than general advice.`,
    tips: 'Réponse « it depends » mais précise : on distingue types de tâches et types de musique (paroles / instrumental). Expérience personnelle + méthode proposée (chronométrer). « Compete with », « on the other hand ».' },
  { id: 'dsz003', diff: 2, course: 'technology and education', prof: 'Dr. Winters',
    q: 'Some universities are replacing printed textbooks with digital versions that students read on tablets or laptops. Supporters say that digital books are cheaper and easier to carry. Critics say that paper books are better for learning. Which do you prefer for your studies, and why?',
    st: [['Lena', 'Digital books are much better for me. They are cheaper, I can search for a word in seconds, and I do not have to carry five heavy books to class.'], ['Ravi', 'I learn better with paper. When I read on a screen, my eyes get tired and I get distracted by notifications. It is also easier to remember where something was on the page.']],
    m: `I prefer a mix of both, depending on how I use the book. Lena is right that digital textbooks are practical: they cost less, and being able to search a whole chapter for one term saves a lot of time, especially in reference books like accounting manuals. On the other hand, Ravi's point about concentration matches my own experience. When I read a long, difficult chapter on a laptop, I often check my messages after ten minutes. For this reason, I buy paper copies of the books that I need to read carefully and annotate, and I use digital versions for quick consultation. Universities could help by making digital books available in the library with a focus mode that blocks notifications, and by keeping some paper copies for students who learn better that way. Another advantage of digital books that nobody has mentioned is accessibility, since they can be read aloud or enlarged for students with visual difficulties.`,
    tips: 'Position hybride justifiée par l\'usage (consultation vs lecture approfondie). Argument nouveau : accessibilité (lecture à voix haute, agrandissement). Reprise des deux étudiants avec « Lena is right… / Ravi\'s point… ».' },
  { id: 'dsz004', diff: 2, course: 'environmental studies', prof: 'Dr. Marsh',
    q: 'Some universities have banned the sale of bottled water on campus to reduce plastic waste, and they provide free water fountains instead. Do you think this is a good policy? Explain your view.',
    st: [['Fiona', 'I think it is a good policy. Plastic bottles pollute the environment, and tap water is just as safe. It is an easy change that sends a clear message.'], ['Gabriel', 'Banning products takes away choice. Some students prefer sparkling water or do not like the taste of tap water, and a ban might push them toward sugary drinks that are still sold in plastic bottles.']],
    m: `I support the idea, but only if it is done carefully. Fiona is right that the environmental benefit is real: tap water is cheap, safe, and produces almost no waste. However, Gabriel makes an interesting point that is easy to overlook. If the university bans bottled water but continues to sell soft drinks in plastic bottles, students may simply buy less healthy products, and the plastic problem would remain. So the ban should apply to all single-use plastic bottles, not only water. In addition, the university has to make the alternative convenient: it needs enough working fountains and refill stations in every building, and perhaps it could give a reusable bottle to each new student. If sparkling water is important to some students, a machine that dispenses it into your own bottle would solve the problem. With these measures, the policy would reduce waste without limiting choice too much.`,
    tips: 'Soutien conditionnel : on reprend l\'objection de Gabriel pour étendre la mesure (toutes les bouteilles jetables) et proposer des solutions pratiques (fontaines, gourde offerte, distributeur d\'eau gazeuse).' },
  { id: 'dsz005', diff: 2, course: 'arts and society', prof: 'Ms. Valdez',
    q: 'Many cities pay artists to paint large murals on public buildings, while other people believe that city money should be spent on more urgent needs. Should local governments spend public money on public art? Why or why not?',
    st: [['Chloe', 'Yes. Murals make a gray neighborhood more beautiful and attract visitors. They also give young artists a chance to show their work.'], ['Marcus', 'Cities have limited budgets. Roads, schools, and safe housing are more important than paintings, and some people may not even like the art.']],
    m: `I think public art deserves a small share of the city budget, as long as residents are involved in the choices. Marcus is right that basic services must come first, but murals cost very little compared with a new road or a school building, so the two are not really in competition. Chloe mentions tourism, and I would add another benefit: studies in several cities suggest that well-kept murals reduce vandalism, because people tend to respect a wall that looks cared for. The worry that some people will dislike the art is valid, though. To address it, the city could ask neighbors to vote on designs or hire local artists who know the area, so that the painting reflects the community rather than being imposed on it. In that way, public money produces something that residents feel is theirs, which is the best guarantee that it was worth spending.`,
    tips: 'Argument de proportion (coût faible vs services de base), bénéfice nouveau (moins de vandalisme), réponse à l\'objection du goût (vote des habitants, artistes locaux). Expressions : « deserves a small share », « imposed on ».' },
  { id: 'dsz006', diff: 2, course: 'economics', prof: 'Dr. Alvarez',
    q: 'In some countries, restaurant workers earn a low base salary and depend on tips. In others, they receive a higher fixed wage and tipping is rare. Which system do you think is fairer for workers and customers?',
    st: [['Emily', 'Tips are fair because they reward good service. Waiters who work harder and are friendlier earn more, and customers decide who deserves it.'], ['Omar', 'It is unfair because income becomes unpredictable. Workers should not depend on the mood of customers, and some customers tip less because of prejudice.']],
    m: `I believe a fixed wage is fairer overall, although Emily's argument about motivation is not without merit. Tips do encourage friendly service, but they also make a worker's income depend on factors that have nothing to do with performance, such as how busy the restaurant is or whether it rains. Omar is right that this creates insecurity, and research has found that customers sometimes tip according to a waiter's appearance, which is clearly unfair. A better system is one where the menu prices already include a decent wage and a service charge is shared among the whole team, including the kitchen staff, who are usually left out of tipping. This also makes the final bill more transparent for customers, who then know exactly what they will pay. Good service can still be rewarded through bonuses decided by the manager, so motivation is preserved without the unpredictability.`,
    tips: 'Position claire (salaire fixe) avec concession à Emily. Idées nouvelles : cuisine exclue des pourcentages, transparence du prix final, primes décidées par le manager. Vocabulaire : « insecurity », « service charge », « unpredictability ».' },
  { id: 'dsz007', diff: 3, course: 'economics', prof: 'Dr. Kowalski',
    q: 'Some economists propose a universal basic income: a regular payment to every adult, regardless of income or employment. Supporters say that it would reduce poverty and give people security. Critics say that it would be too expensive and discourage work. What is your view?',
    st: [['Elena', 'Pilot programs in Finland and Kenya suggest that people do not stop working; they feel less stressed, and some even start small businesses. Security gives people the freedom to take risks.'], ['Jonas', 'Giving money to everyone, including the wealthy, is an extremely inefficient way to fight poverty. It would be better to target the people who really need help with the same budget.']],
    m: `I am cautiously in favor, because the debate between universal and targeted support is less clear-cut than Jonas suggests. His point about efficiency is fair if we compare a universal payment with a perfectly targeted one. In practice, however, means-tested benefits are complicated to apply for, stigmatizing, and often unclaimed by those eligible, so a considerable share of the poorest never receives them. A universal payment avoids that problem, and if it is financed by progressive taxation, wealthy citizens would pay back more than they receive, which makes the system targeted in its net effect. I would add one reservation to Elena's optimism: the pilot programs she mentions were small and temporary, so we do not know how a permanent payment would affect the labor market. That is why I would introduce it gradually, replacing overlapping benefits step by step and evaluating the results at each stage.`,
    tips: 'Déplacer le débat : « universel vs ciblé » se juge sur l\'effet net après impôt et sur le non-recours aux aides. Réserve honnête sur les expériences pilotes (petites, temporaires). Vocabulaire C1 : « means-tested », « stigmatizing », « net effect ».' },
  { id: 'dsz008', diff: 3, course: 'finance', prof: 'Professor Chen',
    q: 'Many trading apps use features such as confetti animations, daily streaks, and push notifications to encourage users to trade more often. Some argue that this makes investing more accessible, while others say that it encourages reckless behavior. Should regulators restrict these design features?',
    st: [['Tara', 'I do not think restrictions are necessary. These apps have brought millions of young people into the market, and adults should be free to decide how they invest.'], ['Victor', 'Research shows that people who trade frequently tend to earn lower returns. When an app is designed to feel like a game, it exploits our psychological weaknesses.']],
    m: `I think regulators should distinguish between access to investing and the design tricks that encourage frequent trading. Tara is right that opening financial markets to ordinary people is valuable, but that goal does not require confetti or notifications. Victor's point is reinforced by the business model: many of these apps are free for users and earn revenue from every transaction, directly or indirectly, so the company profits when users trade more, even though the evidence suggests that this is precisely what reduces their returns. That is a conflict of interest, and we normally regulate such conflicts rather than trusting users to resist them. Reasonable measures would include banning rewards for trading volume, requiring a short confirmation screen for risky products, and displaying the real cost of each trade clearly. These rules would not limit anyone's freedom to invest; they would simply stop platforms from designing the experience against the interests of the people using it.`,
    tips: 'Distinction clé : accès à la bourse vs techniques incitant à trader. Argument de fond : conflit d\'intérêts du modèle économique. Mesures concrètes et proportionnées. Lexique : « trading volume », « conflict of interest », « confirmation screen ».' },
  { id: 'dsz009', diff: 3, course: 'business ethics', prof: 'Dr. Mendes',
    q: 'In many large companies, chief executives earn hundreds of times more than the average employee. Some people argue that governments should limit this ratio. Others say that pay should reflect market forces. Do you think executive pay should be capped?',
    st: [['Isla', 'Pay ratios of 300 to 1 cannot be justified by any difference in effort. A cap would improve morale and make companies invest more in ordinary workers.'], ['Hugo', 'A cap would just make talented executives move to other countries or companies. If a CEO creates billions in value, it is reasonable for them to receive a share.']],
    m: `I am not convinced that a legal cap is the best tool, but I find Hugo's justification weaker than it sounds. The claim that a CEO creates billions is hard to verify, because company results also depend on luck, such as a falling cost of raw materials, and studies show that executives are often rewarded for market movements they did not cause. Isla is right that extreme ratios can damage morale, but a fixed limit would be arbitrary and easy to circumvent through bonuses and stock options. I would prefer a combination of transparency and accountability. Companies should disclose the pay ratio every year, shareholders should have a binding vote on remuneration, and bonuses should be tied to long-term results over five years or more, with the possibility of recovering them if performance later collapses. This keeps pay linked to genuine value creation while discouraging the short-term risk-taking that high rewards often encourage.`,
    tips: 'Retourner l\'argument de Hugo (rémunération de la chance), rejeter le plafond tout en répondant à Isla, puis proposer des outils précis (ratio publié, vote contraignant, clawback). Vocabulaire : « circumvent », « remuneration », « long-term results ».' },
  { id: 'dsz010', diff: 3, course: 'behavioral psychology', prof: 'Dr. Sorensen',
    q: 'Governments and companies increasingly use "nudges," such as making organ donation or pension saving the default option unless people opt out. Supporters say that nudges help people make better choices without restricting freedom. Critics say that they are a form of manipulation. What is your opinion?',
    st: [['Nadia', 'Nudges are harmless because people can always opt out. Some default has to exist anyway, so it is better to choose one that benefits people.'], ['Peter', 'Most people do not notice the default or do not understand it, so it is not really a free choice. It is manipulation if a government exploits our laziness.']],
    m: `I think the line between acceptable and unacceptable nudges is clearer than this debate suggests, and it rests on two questions. The first is transparency: could the government openly explain the nudge and still expect it to work? Automatic enrolment in a pension plan passes this test, because the default can be announced publicly without losing its effect. Peter's concern applies much better to hidden techniques, such as the pre-ticked boxes and confusing menus that companies use to sell extra products. The second question is whose interest the default serves. Nadia is right that a default must exist, but there is a big difference between one designed to help people achieve their own goals, like saving for retirement, and one designed to maximize the designer's profit. Where a nudge is open, easy to reverse, and aligned with people's own interests, I regard it as respectful of freedom rather than a threat to it.`,
    tips: 'Critères précis pour trancher : transparence (publicity test) et intérêt servi par le défaut. Exemples contrastés (affiliation automatique à la retraite / cases précochées). Structure C1 : « The first… The second… ».' },
  { id: 'dsz011', diff: 3, course: 'sociology', prof: 'Professor Ivanova',
    q: 'Since the pandemic, many employees work from home several days a week. Some sociologists argue that this weakens social ties and workplace culture, while others believe that it improves quality of life. What effect do you think remote work will have on society in the long term?',
    st: [['Lucy', 'Remote work strengthens local communities. People who do not commute spend more time and money in their own neighborhoods, and they have more time for their families.'], ['Tom', 'Offices are where people build trust and learn from each other informally. Younger employees especially lose the chance to be mentored if everybody stays home.']],
    m: `I believe the long-term effect will depend on who gets to work remotely and how companies organize it. Lucy's argument is plausible: neighborhood shops and cafés do benefit when workers stay in their local area. But we should notice that only certain jobs can be done from home, mostly in finance, technology, and administration. Cashiers, nurses, and factory workers cannot, so remote work risks creating a new divide between those with flexibility and those without it. Tom's concern about mentoring is equally serious, since a great deal of professional learning happens by observation rather than formal instruction. I would therefore recommend that companies keep a few shared days in the office, devoted to collaboration and training of newcomers, and allow remote work for concentrated tasks. At the societal level, cities could take advantage of the change by converting empty offices into housing, which would ease the housing shortage that pushes many workers toward distant suburbs.`,
    tips: 'Angle neuf : inégalité entre métiers télétravaillables et les autres. Réponse à Tom (apprentissage par observation) et solution organisationnelle (jours communs). Ouverture urbaine (bureaux vides → logements).' },
  { id: 'dsz012', diff: 3, course: 'environmental economics', prof: 'Dr. Ortiz',
    q: 'Many airlines and companies encourage customers to buy carbon offsets, which fund projects such as tree planting to compensate for emissions. Do you think carbon offsets are a useful tool against climate change or a way to avoid real change?',
    st: [['Kara', 'Offsets at least channel money to projects that protect forests. If people pay for the damage they cause, that is better than doing nothing.'], ['Liam', 'Investigations have shown that many offset projects do not deliver the promised reductions. Offsets give people a clear conscience to keep polluting.']],
    m: `I think offsets are a legitimate tool only for emissions that cannot yet be avoided, and the market needs much stricter quality control. Liam's criticism is supported by the evidence: a project may protect a forest that was never going to be cut down, in which case the offset is not "additional" and nothing is really compensated. Even real projects can be reversed if the trees burn decades later. Kara is right that paying for damage is better than ignoring it, but the order matters. The priority should be to reduce emissions directly, for example by flying less or switching to rail, and to buy offsets only for what remains. Otherwise they work as a license to continue, which psychologists call moral licensing. Governments could improve the market by requiring independent certification, public registries of projects, and, wherever possible, funding technologies that actually remove carbon rather than merely prevent its release.`,
    tips: 'Concepts précis : additionnalité, réversibilité (incendies), ordre de priorité (réduire d\'abord), « moral licensing ». Réponse équilibrée à Kara et Liam avec solutions réglementaires (certification, registres).' },
  { id: 'dsz013', diff: 3, course: 'technology and ethics', prof: 'Professor Baptiste',
    q: 'More and more employers use algorithms to screen job applications and rank candidates. Supporters say that these systems are faster and less biased than human recruiters. Critics argue that they can reproduce discrimination. Should companies rely on algorithms in hiring?',
    st: [['Sophie', 'A well-designed algorithm applies the same criteria to everyone, which human recruiters, with their unconscious biases, rarely do. It also lets companies review thousands of applications.'], ['Marcus', 'Algorithms learn from past hiring data. If the company hired mostly men in the past, the system will learn that men are better candidates. It automates the bias instead of removing it.']],
    m: `I think algorithms can play a useful role, but only as a support tool, never as the final decision-maker. Marcus is right that a system trained on biased data will reproduce that bias, and it will do so at great speed and with an appearance of objectivity. However, Sophie's point deserves attention, because human recruiters are not neutral either. What distinguishes the two is that an algorithm's bias can be measured: companies can test whether candidates of different groups with the same qualifications receive the same scores, which is much harder to do with a person's intuition. For that reason, I would require regular independent audits, a clear explanation of the criteria used, and the right for rejected applicants to ask for a human review. Used this way, the algorithm could even widen the pool of candidates by flagging promising people whose profiles do not fit the traditional pattern, rather than merely filtering them out.`,
    tips: 'Idée centrale : un biais algorithmique est mesurable, donc auditable. Garanties (audit, explicabilité, recours humain) et usage positif (élargir le vivier). Vocabulaire : « audit », « pool of candidates », « filter out ».' },
  { id: 'dsz014', diff: 3, course: 'public finance', prof: 'Dr. Wallace',
    q: 'Some countries make university education free, funded by taxes, while others charge high tuition fees and offer loans. Which system do you think is fairer and more effective?',
    st: [['Rosa', 'Free tuition is fairer. Education benefits the whole society, and fear of debt prevents talented students from poor families from applying.'], ['Dan', 'Why should taxpayers who never went to university pay for graduates who will earn higher salaries? Students who benefit should contribute, and fees make universities compete on quality.']],
    m: `I think the strongest system lies between the two positions: fees paid after graduation, in proportion to income. Under income-contingent repayment, as used in Australia, graduates repay a small percentage of their salary only once it exceeds a threshold, and the remaining debt is cancelled after a fixed period. This answers Dan's fairness argument, since those who benefit financially contribute more, while it also addresses Rosa's worry, because nobody must pay anything upfront or fear being crushed by a fixed debt if their career turns out modestly. Evidence also suggests that the greatest obstacle for poor students is not the fee itself but living costs, such as rent and food. Therefore, I would combine income-contingent loans with generous maintenance grants for low-income students. This could preserve access without asking taxpayers to subsidize the future high earners entirely.`,
    tips: 'Troisième voie avec un exemple réel (remboursement conditionné au revenu, Australie). Point nouveau : le vrai obstacle est le coût de la vie, d\'où les bourses d\'entretien. Vocabulaire : « income-contingent », « threshold », « maintenance grants ».' },
  { id: 'dsz015', diff: 3, course: 'public policy', prof: 'Dr. Pereira',
    q: 'Several countries have introduced a tax on sugary drinks to fight obesity. Supporters claim that it improves public health, while opponents consider it an unfair tax on poor families. Do you think sugar taxes are a good policy?',
    st: [['Hannah', 'The soft-drink levy in the UK led manufacturers to reduce the sugar in their recipes, so people consumed less sugar without even changing their habits.'], ['Ivan', 'Taxes on food hit low-income households the hardest, because they spend a larger share of their income on food. It is regressive and treats adults like children.']],
    m: `On balance, I consider a well-designed sugar tax a good policy, and Hannah's example shows why design matters. The British levy was structured in tiers, so that the more sugar a drink contained, the more the producer paid. This gave companies an incentive to reformulate their products, which is the best outcome because consumers benefit without having to give up anything or even notice. Ivan is right that a flat tax on a product would be regressive in financial terms. Nevertheless, we must also consider who suffers most from the consequences of obesity and diabetes: these conditions are more common in lower-income groups, so the health gains are likely to be larger for poorer households as well. To make the policy fairer still, governments can spend the revenue on free school meals or sports facilities in disadvantaged areas. Then the tax would redistribute both money and health, rather than merely taking from consumers.`,
    tips: 'Idée forte : taxer le producteur par paliers pousse à reformuler. Réponse à l\'argument de la régressivité (gains de santé plus grands chez les plus pauvres) et affectation des recettes. Vocabulaire : « levy », « regressive », « reformulate ».' },
  { id: 'dsz016', diff: 3, course: 'arts and culture', prof: 'Ms. Delacroix',
    q: 'Artificial intelligence programs can now generate paintings, music, and illustrations in seconds. Some argue that this democratizes creativity, while others say that it threatens artists\' livelihoods and the meaning of art. How should we respond to AI-generated art?',
    st: [['Zara', 'AI gives everyone the tools to create. People who never learned to paint can now express their ideas, and artists can use it as another instrument, like a camera.'], ['Theo', 'These systems are trained on works by real artists without their permission or payment. Calling it democratization hides the fact that it is taking from creators.']],
    m: `I think we are mixing two separate questions, and the debate becomes clearer once we pull them apart. The first is about consent and compensation, and here Theo's objection is strong: if a system learns from the work of living artists, they should at least have the right to refuse and to be paid. This can be solved through licensing schemes, opt-in datasets, and royalties, as the music industry did with streaming. The second question is about the value of AI-generated work itself, and here I would be more open-minded than Theo. Zara's comparison with the camera is useful, since photography did not eliminate painting but changed what painters tried to do. What we value in art is often the intention and human experience behind it, which a machine cannot supply. Therefore, AI images should be clearly labeled, so that audiences can decide for themselves what they want to appreciate.`,
    tips: 'Séparer deux questions (consentement/rémunération vs valeur de l\'œuvre). Analogie du streaming pour la solution. Reprise nuancée de l\'analogie de Zara (appareil photo) et solution simple (étiquetage).' },
  { id: 'dsz017', diff: 3, course: 'urban economics', prof: 'Dr. Fitzgerald',
    q: 'In cities where housing is expensive, some governments limit how much landlords can increase rents. Economists often criticize this policy, but many tenants support it. Is rent control a good way to make housing affordable?',
    st: [['Julia', 'Rent control protects tenants from being forced out of their neighborhoods. Without it, long-term residents cannot afford to stay when landlords raise prices.'], ['Mark', 'Most economists agree that it reduces the supply of rental housing. Landlords stop maintaining or renting out their apartments, and newcomers face even higher prices.']],
    m: `I think rent control is a useful short-term protection but a poor long-term solution, so the answer depends on how it is designed. Strict price ceilings do create the problems Mark describes, since they discourage investment and favor those who already have a flat over those who are searching for one. Nevertheless, Julia is right that sudden increases can destroy communities, and a moderate form of regulation, such as limiting annual rises to inflation while exempting new buildings, protects residents without discouraging construction. The real cause of high rents, however, is that too few homes are built, usually because of restrictive zoning and slow permits. Rent regulation treats the symptom, not the disease. A sensible policy would therefore pair it with reforms that allow more building, and with housing allowances for the poorest families, which are better targeted than a rent ceiling that also benefits wealthy tenants.`,
    tips: 'Nuance entre plafonds stricts et stabilisation des loyers avec exemption du neuf. Cause racine (offre insuffisante, zonage), métaphore « symptom, not the disease ». Remarque d\'équité : le contrôle profite aussi aux locataires aisés.' },
  { id: 'dsz018', diff: 3, course: 'business ethics', prof: 'Dr. Rahman',
    q: 'Some governments are considering laws that would require companies to check and publicly report the working conditions of their foreign suppliers. Supporters say that this would reduce exploitation. Critics say that it would raise costs and be impossible to monitor. Should companies be legally responsible for their suppliers\' practices?',
    st: [['Amy', 'Companies profit from cheap labor abroad, so they should be accountable for the conditions. Voluntary codes of conduct have not prevented factory disasters.'], ['Carl', 'A fashion brand may have thousands of suppliers and subcontractors. Strict liability would force companies to stop sourcing from developing countries, which would hurt the workers it is meant to protect.']],
    m: `I think companies should have a legal duty, but it should be a duty of due diligence rather than strict liability for every violation. This distinction answers Carl's concern: a company would have to identify risks in its supply chain, act on them, and report publicly, and it would only be penalized if it failed to take reasonable steps. Amy is right that voluntary codes have not worked, partly because audits arranged and paid for by the brands themselves often miss problems. The most effective approach so far has been binding agreements with trade unions, such as the accord signed after the Rana Plaza collapse in Bangladesh, which allowed independent inspections. I would also point out that brands bear some responsibility for the conditions through their own behavior. If they demand lower prices and last-minute orders, factories are pushed to cut corners. A law should therefore examine purchasing practices as well as factory inspections.`,
    tips: 'Distinction juridique : devoir de diligence (moyens) vs responsabilité stricte (résultat). Exemple réel (accord après Rana Plaza). Angle nouveau : les pratiques d\'achat des marques créent la pression. Lexique : « due diligence », « cut corners ».' },
  { id: 'dsz019', diff: 3, course: 'financial regulation', prof: 'Dr. Abe',
    q: 'Cryptocurrencies such as Bitcoin have attracted millions of investors, but their prices are extremely volatile and many scams have been reported. Should governments treat cryptocurrencies like traditional financial assets and regulate them strictly, or leave the market largely free?',
    st: [['Daniel', 'Strict regulation would protect consumers. If exchanges had to follow the same rules as banks and brokers, there would be fewer collapses and fewer people losing their savings.'], ['Eva', 'Too much regulation will kill innovation, and people will just move to platforms in other countries. Investors know the risks, and they should accept them.']],
    m: `I favor regulation, but focused on the intermediaries rather than on the technology itself. Most of the damage done to ordinary investors came not from Bitcoin as such but from exchanges and lenders that mixed customers' money with their own, made undisclosed risky investments, and then collapsed. Daniel is therefore right that familiar rules would have helped: client assets should be kept separate, companies should be audited, and advertising should include clear risk warnings. Eva's concern about innovation is reasonable, but the principle of "same risk, same rules" does not stop anyone from developing new technology; it simply requires that firms offering financial services behave like financial firms. The argument that investors know the risks is weaker than it sounds, since many buy after seeing promotions by celebrities. Her worry about firms relocating abroad could be addressed by international cooperation, as has been done for banking, and by restricting access to unregistered platforms.`,
    tips: 'Cibler la régulation sur les intermédiaires (bourses, prêteurs), pas sur la technologie. Principe « same risk, same rules ». Contre-arguments à Eva : promotions par des célébrités, coopération internationale. Lexique : « client assets », « undisclosed », « audited ».' },
  { id: 'dsz020', diff: 3, course: 'developmental psychology', prof: 'Dr. Mazur',
    q: 'Some schools offer prizes or money to children who read a certain number of books. Supporters say that rewards motivate reluctant readers. Critics say that rewards destroy the pleasure of reading itself. Do you think schools should reward children for reading?',
    st: [['Ella', 'If a child does not like reading, a reward gives them a reason to start. Once they discover good books, they may continue without the prize.'], ['Sam', 'Psychologists call it the overjustification effect: when you pay someone for something they enjoy, they begin to see it as work and stop doing it when the rewards end.']],
    m: `I think the answer depends less on whether rewards exist than on what kind of reward is chosen. Sam is right that rewarding an activity with money can make children feel that reading is a chore, and the effect is strongest when the reward is controlling, for example one given only for finishing a set number of books. However, Ella has a point that reluctant readers sometimes need a first push. The research suggests that the best rewards are closely connected to the activity itself: letting children choose their own books, giving them a book to keep, or offering extra time in the library. These reinforce interest instead of replacing it. I would also reward engagement, such as sharing a favorite story with the class, rather than the quantity of pages read, and I would fade out the incentives gradually. That way the reward serves as a bridge to reading for pleasure, not as a substitute for it.`,
    tips: 'Passer de « récompenser ou non » à « quelle récompense ». Concept (overjustification effect) repris et nuancé : récompenses liées à l\'activité, qualité plutôt que quantité, retrait progressif. Lexique : « controlling », « fade out », « bridge ».' },
  { id: 'dsz021', diff: 4, course: 'macroeconomics', prof: 'Dr. Haverford',
    q: 'Governments traditionally judge economic success by growth in gross domestic product. Critics argue that GDP ignores inequality, unpaid work, and environmental damage, and that it should be replaced by broader measures of well-being. Is GDP still a useful guide for policy?',
    st: [['Mina', 'GDP is flawed, but it is measurable, comparable across countries, and strongly correlated with life expectancy and education. Replacing it with a vague "happiness index" would make policy easier to manipulate.'], ['Oscar', 'What we measure becomes what we pursue. A metric that counts an oil spill clean-up as growth but ignores caregiving at home distorts our priorities at the deepest level.']],
    m: `Both Mina and Oscar are right, and that suggests that the real mistake lies in using any single number as a compass. GDP was designed to measure market activity, not welfare, and it does that job well; Oscar's examples show a misuse of the statistic rather than a flaw in its construction. Yet Mina's defense overlooks a well-known problem: when a measure becomes a target, it ceases to be a good measure, because governments and firms then optimize for the figure itself. The sensible conclusion is not to replace GDP but to place it within a dashboard of indicators, covering distribution of income, health, environmental depletion, and unpaid work, each with transparent methodology so that it is difficult to manipulate. Such a dashboard would also reveal trade-offs that a single index conceals, for instance where growth coincides with falling life satisfaction. Policy should be judged against the whole set, not by a single figure, however convenient it is to quote.`,
    tips: 'C2 : réconcilier les deux positions en distinguant l\'outil (mesure de l\'activité marchande) de son usage (boussole unique). Loi de Goodhart paraphrasée, proposition d\'un tableau de bord. Syntaxe : « overlooks », « conceals », « however convenient it is to quote ».' },
  { id: 'dsz022', diff: 4, course: 'corporate governance', prof: 'Professor Aldridge',
    q: 'For decades, the dominant view in corporate governance has been that the primary duty of managers is to maximize shareholder value. Others contend that firms owe obligations to employees, communities, and the environment as well. Is shareholder primacy defensible?',
    st: [['Felix', 'Managers are agents spending other people\'s money. If they pursue vague social goals, accountability evaporates, because any decision can be justified by claiming that it served some stakeholder.'], ['Grace', 'Shareholder value is not a law of nature; it is a convention. And long-term value cannot be created while ignoring the workers, customers, and ecosystems on which a firm depends.']],
    m: `I suspect that the dichotomy is less sharp than it appears, since the real dispute concerns time horizons and externalities. Felix is right that accountability requires a clear objective, and a manager who answers to everyone effectively answers to no one. Yet Grace's point is difficult to dispute: no firm can sustain shareholder value over decades while destroying its workforce or its reputation, so "enlightened" shareholder value already incorporates stakeholder interests. The deeper problem is that markets often fail to price harms like pollution, and that is something managers' consciences cannot be expected to correct. Even Milton Friedman, the best-known advocate of shareholder primacy, specified that profit should be pursued within the rules of the game. The logical response is therefore to tighten those rules through environmental regulation, labor protections, and disclosure requirements, and to measure managers against transparent long-term indicators. That preserves accountability while ensuring that the pursuit of profit does not depend on externalizing its costs.`,
    tips: 'Dépasser le faux dilemme : le vrai sujet est l\'horizon temporel et les externalités. Référence correcte à Friedman (« within the rules of the game »). Solution : durcir les règles plutôt que compter sur la conscience des dirigeants. Lexique : « externalities », « incorporate », « tighten ».' },
  { id: 'dsz023', diff: 4, course: 'public policy and ethics', prof: 'Dr. Okafor',
    q: 'Economists use a discount rate to compare costs and benefits that occur at different times, which means that harms to future generations count for less than harms today. Some philosophers argue that this is ethically indefensible, particularly for climate policy. How much weight should policy give to the interests of future generations?',
    st: [['Liam', 'People prefer present benefits and money can grow, so a dollar tomorrow is worth less than a dollar today. Ignoring discounting would justify absurd sacrifices now for benefits in the distant future.'], ['Ayesha', 'That reasoning conflates two things: the productive return on capital and the moral status of people. Someone born in 2100 is not worth less simply because she is not yet born.']],
    m: `I think the disagreement dissolves partly once we separate what discounting is supposed to capture. Ayesha is right to reject pure time preference, the idea that a person's welfare matters less merely because it occurs later; I know of no persuasive ethical defense for it. Liam, however, is correct that other reasons for discounting are legitimate: if future generations are likely to be richer, an extra dollar matters less to them than to the poor today, and uncertainty about whether the benefits will materialize also justifies caution. The difficulty is that these arguments apply to smooth, gradual changes, not to irreversible catastrophes such as the collapse of ecosystems, which a conventional rate can reduce to almost nothing in the calculation. For such cases, I would favor lower or declining discount rates and treat certain thresholds as constraints rather than as items in a cost-benefit table. Institutions that formally represent future citizens could also counterbalance the present bias of electoral politics.`,
    tips: 'Décomposer le concept : préférence pure pour le présent (indéfendable) vs actualisation liée à la croissance/incertitude (défendable). Limite pour les catastrophes irréversibles, d\'où seuils-contraintes. Idée institutionnelle finale. Lexique abstrait : « time preference », « materialize », « counterbalance ».' },
  { id: 'dsz024', diff: 4, course: 'sociology', prof: 'Professor Beaumont',
    q: 'Many societies celebrate meritocracy, the idea that positions and rewards should go to those with the greatest talent and effort. Some sociologists argue that meritocracy is a myth that legitimizes inequality by disguising the advantages of birth. Is meritocracy a worthwhile ideal or an ideological illusion?',
    st: [['Rafael', 'The alternative to meritocracy is nepotism or caste. Imperfect as it is, rewarding competence is the only principle that is both efficient and defensible to those who lose.'], ['Zoe', 'Even a perfectly fair competition would pose a problem: winners come to believe that they deserve everything, and losers are told that they deserve their failure. Talent itself is a matter of luck.']],
    m: `I think we have to distinguish meritocracy as a procedure from meritocracy as a moral story. As a procedure, selecting people for positions according to ability rather than birth is a real achievement, and Rafael is right that the alternatives are worse. Zoe's objection targets the story: the belief that outcomes reflect desert. Since talent and even the capacity for effort are partly the product of genes and upbringing, the winners have no strong claim to having earned their success in a deep sense, and a society that forgets this becomes harsh toward those who fall behind. It is no accident that Michael Young, who coined the word in 1958, intended it as a warning, not as a goal. The reasonable position, then, is to keep the fair procedure while giving up the self-congratulatory narrative: progressive taxation and strong public services can be defended not as charity, but as a recognition that success owes much to circumstances nobody chose.`,
    tips: 'Distinction clé procédure / récit moral. Argument de la chance (Rawls sans le nommer), fait exact : Michael Young a forgé le mot en 1958 comme avertissement satirique. Conclusion normative sur la fiscalité. Lexique : « desert », « self-congratulatory », « owes much to ».' },
  { id: 'dsz025', diff: 4, course: 'technology policy', prof: 'Dr. Nakagawa',
    q: 'Technology companies earn enormous profits from the personal data of their users, usually in exchange for free services. Some propose that individuals should be paid for their data, treating it as a form of property. Others argue that this would be a mistake. Should people be able to sell their personal data?',
    st: [['Jonas', 'Treating data as property would give people bargaining power. Today the exchange is hidden and one-sided; a market with prices would at least make the value visible.'], ['Mei', 'Privacy is a right, not a commodity. Poor people would sell theirs while the wealthy keep theirs, so a market in data turns privacy into a luxury.']],
    m: `I side with Mei's conclusion, but I would add a structural reason that does not depend on the rich-poor divide. Personal data is rarely individual in the way property is. My contact list, my genetic profile, or my location history reveals information about other people who never agreed to anything, so my decision to sell has consequences for third parties. This is a classic externality, and a market of isolated individual transactions cannot price it properly. Jonas is right that the current bargain is opaque and one-sided, but the remedy need not be ownership. Stronger rules would limit the purposes for which data may be used, require firms to act as fiduciaries with a duty to serve users' interests, and allow collective negotiation through data unions that gives individuals genuine leverage. We already accept that certain things, such as the vote, cannot be sold even by those who would gladly do so, because their value to society exceeds their value to the individual.`,
    tips: 'Argument structurel original : les données sont relationnelles, donc la vente individuelle crée des externalités. Alternatives crédibles (devoir fiduciaire, syndicats de données). Analogie avec le vote (bien inaliénable). Lexique : « fiduciaries », « leverage », « opaque ».' },
  { id: 'dsz026', diff: 4, course: 'ecological economics', prof: 'Dr. Fabbri',
    q: 'Some environmental scholars argue that ecological sustainability is incompatible with continuous economic growth and that wealthy countries should deliberately shrink their economies. Others believe that technology can decouple growth from environmental damage. Which view is more convincing?',
    st: [['Hana', 'Absolute decoupling has barely occurred at the global scale. Efficiency gains are consumed by higher consumption, so betting everything on technology is wishful thinking.'], ['Ivo', 'Degrowth is politically suicidal and morally questionable. Billions of people still need to escape poverty, and an economy that shrinks makes the transition harder to finance.']],
    m: `I find the dispute less decisive than it seems, because it treats GDP as if it were a physical quantity. What the planet cares about is material and energy throughput, not the money value of output, and an economy can in principle expand its services while its resource use falls. Hana is right, however, that the historical record of absolute decoupling is thin, and the rebound effect, whereby savings are spent on further consumption, explains why efficiency alone disappoints. Ivo's objection carries equal weight for poorer countries, where growth remains the main route out of deprivation. I would therefore shift the question from "growth or not" to "which growth and whose consumption": expanding renewables, care, and education while contracting fossil-fuel extraction, and recognizing that the wealthiest populations bear the greatest responsibility for cutting back. Binding caps on emissions and resource use would make the outcome empirical, since the economy would have to adapt within planetary limits, whatever happens to the growth rate.`,
    tips: 'Reformuler : le PIB n\'est pas une grandeur physique ; l\'important est le débit de matières et d\'énergie. Notions : découplage absolu, effet rebond. Dépasser l\'opposition : « which growth and whose consumption ». Réponse équilibrée aux deux étudiants.' },
  { id: 'dsz027', diff: 4, course: 'aesthetics and ethics', prof: 'Professor Moreau',
    q: 'When an acclaimed artist, writer, or filmmaker is revealed to have behaved abominably, audiences face a dilemma: should the work still be celebrated, funded, and taught? Or does enjoying it implicate us in the creator\'s conduct? How should we treat art made by morally compromised creators?',
    st: [['Yara', 'A work stands on its own. Once it is published, it belongs to the culture, and refusing to read or watch it punishes us, not the artist, who may well be dead.'], ['Tom', 'Public money and prestige are not neutral. Every award and every syllabus slot is an act of endorsement, and it also marginalizes artists who were harmed or silenced.']],
    m: `I think a clear distinction between private appreciation and public honor resolves much of the dilemma. Yara is right that a reader who learns something troubling about an author is not complicit by continuing to read; ideas and images cannot be recalled, and refusing to engage with them does not repair any harm. Tom's argument, however, concerns a different matter: institutional endorsement. Prizes, retrospectives, and public funding are not neutral, and they involve a choice among many possible candidates. The relevant factors, in my view, are whether the creator is alive and profits from the attention, and whether the wrongdoing is bound up with the work itself, for instance if it exploited the very people depicted. In such cases, it is reasonable to withhold honors. Yet silence is not the best alternative to celebration. Teaching a work together with the creator's biography allows students to see how knowledge of the person changes our reading, which is a more honest response than either idolizing or erasing.`,
    tips: 'Distinction centrale appréciation privée / honneur public. Critères discriminants (créateur vivant ? faute liée à l\'œuvre ?). Troisième voie pédagogique (contextualiser). Lexique : « complicit », « retrospectives », « bound up with », « idolizing or erasing ».' },
  { id: 'dsz028', diff: 4, course: 'philosophy of education', prof: 'Dr. Castellano',
    q: 'Governments increasingly expect universities to prepare students for the labor market and measure their success by graduate salaries. Defenders of the liberal arts tradition argue that universities exist to cultivate critical thinking and civic judgment, whatever the economic payoff. What should be the primary purpose of a university?',
    st: [['Wei', 'Society is investing enormous sums in higher education. It is reasonable to demand that degrees lead to employment; otherwise higher education is an expensive luxury for the privileged.'], ['Anya', 'Skills become obsolete within a decade. What endures is the capacity to think, question, and judge, which no salary statistic captures and which employers eventually demand anyway.']],
    m: `I doubt that a university can have a single primary purpose, and the attempt to rank them obscures a more practical problem: the metric used to evaluate institutions. Wei's concern about public investment is legitimate, and graduates deserve a realistic chance of employment. But salary data are a poor proxy for educational value, since they largely reflect the students' background and the field chosen rather than what the university added. A measure of that kind penalizes institutions that train nurses, teachers, or social workers, and rewards those that simply admit already privileged students. Anya is right that the capacity to think is the true long-term asset, though she undermines her own case when she assumes that employers will always reward it. A fairer approach would assess value added, meaning the progress students make relative to their starting point, in both employability and analytical ability. Such evidence would let us defend the humanities where they succeed, and challenge them where they do not.`,
    tips: 'Faux dilemme : le vrai problème est l\'indicateur (salaires = reflet du milieu d\'origine, pas de la valeur ajoutée). Critique d\'Anya aussi (supposition sur les employeurs). Proposition : mesurer la valeur ajoutée. Lexique : « proxy », « value added », « obscures », « undermines her own case ».' },
  { id: 'dsz029', diff: 4, course: 'behavioral science', prof: 'Dr. Hirsch',
    q: 'In recent years, several well-known findings in psychology and behavioral economics have failed to replicate when other researchers repeated the experiments. Some argue that policymakers should therefore be skeptical of behavioral science. Should governments continue to base policies on behavioral research?',
    st: [['Nina', 'If the foundational experiments do not hold up, then policies built on them rest on sand. Governments should wait until findings are solid before spending public money.'], ['Karl', 'Replication problems show that science is self-correcting. Policy must be made under uncertainty anyway, and doing nothing is also a decision.']],
    m: `I would argue that the failure of some laboratory results is a reason to change how governments use behavioral science, not to abandon it. Nina's caution is justified in one respect: effects found in small, artificial experiments are often smaller in reality, and sometimes disappear entirely. But waiting for certainty, as Karl points out, is itself a policy with costs, since the status quo is not neutral either. The solution is to treat each finding as a hypothesis to be tested in the real setting before it is scaled up. Governments can run randomized trials on a small sample of citizens, such as sending different versions of a tax reminder to different households, and adopt only what works, with published results including the failures. This turns the replication crisis into a method: evidence-based policy means local, repeated experimentation rather than imported conclusions. Behavioral science then offers a source of well-motivated ideas to test, not a collection of laws to apply.`,
    tips: 'Passer de « croire ou non » à « tester localement » : essais randomisés, publication des échecs. Reconnaissance du biais d\'effet (laboratoire vs réel). Réponse équilibrée à Nina et Karl. Lexique : « replicate », « scaled up », « randomized trials », « status quo ».' },
  { id: 'dsz030', diff: 4, course: 'business and society', prof: 'Professor Rees',
    q: 'Companies increasingly speak out on divisive political and social issues, from immigration to climate policy. Some argue that firms have a moral responsibility to take a stand, while others say that corporations should stay neutral and leave politics to citizens. Is corporate activism legitimate?',
    st: [['Dara', 'Companies are powerful social actors. Staying silent about injustice is itself a political position, and employees and customers increasingly expect firms to stand for something.'], ['Evan', 'Corporations are not elected and do not represent the diverse views of their stakeholders. When a CEO speaks for the firm, it is often their own politics, expressed with everyone else\'s money.']],
    m: `I think the legitimacy of corporate activism depends on relevance and consistency, not on a general rule for or against. Evan is right that a company does not have a mandate to pronounce on every controversy, and doing so risks alienating employees who hold different views. Yet Dara's observation that silence is itself a position has force when an issue directly affects the firm's own people or operations, such as laws that discriminate against its workers in a country where it operates. So I would propose a test: speak only when the matter materially concerns the company's employees, customers, or business, and after consulting the staff, so that the statement reflects the organization rather than a single executive. The second criterion is consistency. A firm that publicly endorses a cause while lobbying quietly against it commits a worse offense than one that says nothing, because it turns principle into a marketing tool and ultimately damages public trust in business.`,
    tips: 'Critères de légitimité : pertinence pour l\'entreprise, consultation interne, cohérence (lobbying contraire = hypocrisie). Reprise nuancée de « silence is itself a position ». Lexique : « mandate », « alienating », « materially concerns », « consistency ».' }
);



})();
