import { landingSchema, type Landing } from './schema'

/**
 * Forensics landing copy, transcribed from the GTM copy deck
 * (Forensics-Expert-Witness-GTM/landing-copy.md, draft-v1 2026-07-17).
 *
 * The deck is explicit that the hero and closing were scaffolding pending a
 * rewrite in Rob's voice, and that the rewrite gates publication. Both blocks
 * are draftable and neither currently sets `draft: true`, so the publish gate
 * in assertPublishable is open. Set it back to true on either block to close
 * the gate again. Everything else is transcribed as written.
 *
 * Deliberately NOT included here: the service one-pager, referral one-pager,
 * and directory bio from the deck. Those are print and outreach collateral,
 * not site content.
 */
const copy: Landing = landingSchema.parse({
  meta: {
    title:
      'Software, Data and AI Expert Witness — Vet Us First | Root System Forensics',
    description:
      'Technical expert analysis of software, source code, data and machine-learning systems. The things counsel screens an expert on — hands-on depth, evidence experience, independence, and whether we can explain it to a jury — are answered on the page, with published rates.',
  },

  routes: {
    method: {
      title:
        'Method — how to check a technical expert’s work | Root System Forensics',
      heading: 'How to check our work',
      description:
        'What a technical opinion has to survive, and how ours is built to survive it: findings stated as a query and its output, uncertainty conceded in the report rather than found on cross, depth where the record was written by a machine — plus the bench behind it and what the alternatives each leave out.',
    },
    matters: {
      title:
        'Matters we take — software, source code, data, AI | Root System Forensics',
      heading: 'The matters we take',
      description:
        'The four kinds of technical dispute we claim hands-on depth in — software and source code, data and systems evidence, AI and machine learning, software failure — and a representative matter showing what that depth produced when an opposing expert misread a timestamp distribution.',
    },
    engagements: {
      title:
        'Engagements, rates, conflicts and objections | Root System Forensics',
      heading: 'Engagements and fees',
      description:
        'Published rates, a conflict screen run before anything else, and straight answers to what counsel actually asks — testimony record, AI disclosure, independence, and cost — with a $2,500 fixed-scope assessment credited toward a full engagement.',
    },
  },

  hero: {
    eyebrow: 'Expert witness and technical analysis',
    headline:
      'Everything you screen an expert on is already on this page.',
    subhead:
      'We take disputes that turn on software and source code, on data and systems evidence, on machine learning, and on software that failed. What you would ask on a screening call — what we have actually built, what evidence we have actually read, what we will concede, what it costs — is answered below rather than held for the call.',
    proof:
      'A genuine bulk copy of 9,000 files smears its access timestamps across hundreds of seconds. The opposing exhibit clustered thousands of files into a single second — a batch process, not a human copy. Same data; the shape tells the truth.',
    cta: 'Scope a case',
  },

  positioning: {
    body: 'Counsel vetting a technical expert screens on the same handful of things: hands-on depth in the exact technology at issue, real experience reading the kind of evidence the case turns on, independence that will survive cross, and whether the expert can make any of it legible to people who do not build software. Most expert sites make you place a call to find out. We have put the answers on the page — including the rates — because a partner with a deadline should be able to rule us in or out before spending an hour on the phone. Ruling us out quickly is a good outcome too.',
  },

  // Base scaffolding, added 2026-08-11 with the practiceAreas schema block.
  // The four areas and the decision that all four engagement modes apply to
  // every one of them are Rob's (2026-08-11); the prose here is placeholder
  // that each positioning variant replaces wholesale. Examples are matter
  // types, not a claim that matters of that type have been handled.
  practiceAreas: {
    label: 'Screening question one',
    heading: 'The technology we can claim hands-on depth in',
    intro:
      'The first thing counsel screens on is whether an expert has actually worked in the technology the case turns on. These are the four kinds of dispute where we can answer that honestly, and every way of engaging us applies to all four. Outside them we will say so and, where we can, point you to someone who does.',
    areas: [
      {
        name: 'Software and source code',
        summary:
          'Source-code comparison, code provenance and authorship, technical read of infringement claims.',
        body: 'Source-code comparison in trade-secret and IP matters, code provenance and authorship, and the technical read behind an infringement or misappropriation claim.',
        examples: [
          'Trade-secret misappropriation',
          'Copyright and patent infringement',
          'Code provenance and authorship',
        ],
      },
      {
        name: 'Data and systems forensics',
        summary:
          'ESI and metadata, timestamp and log analysis, file-system semantics, incident reconstruction.',
        body: 'ESI and metadata, timestamp and log analysis, file-system semantics, and reconstruction of a security or data-handling incident from what the systems recorded.',
        examples: [
          'Metadata and timestamp disputes',
          'Data exfiltration and access claims',
          'Breach and incident reconstruction',
        ],
      },
      {
        name: 'AI and machine learning',
        summary:
          'How a model was built, what data it used, and whether it performed as claimed.',
        body: 'How a model was built and trained, what data it ingested, how its outputs vary, and whether it performed as represented.',
        examples: [
          'Training-data and model-provenance claims',
          'Algorithmic decision and disparate-impact claims',
          'Representations about AI capability',
        ],
      },
      {
        name: 'Software failure and performance',
        summary:
          'Defect and root-cause analysis, outage and SLA disputes, capacity and scaling failures.',
        body: 'Defect and root-cause analysis, outage and service-level disputes, capacity and scaling failures, and the technical record behind a contract-performance claim.',
        examples: [
          'Failed implementation and delivery disputes',
          'Outage and service-level claims',
          'Product defect and root cause',
        ],
      },
    ],
  },

  pillarsHeading: 'The rest of the screening questions, answered',

  // The five substantive claims are unchanged from the base -- each was earned
  // in a real matter and none is dropped here. What changes is what they are
  // presented as answering: each title now names the screening criterion it
  // satisfies, in the order counsel tends to ask.
  pillars: [
    {
      title: 'We build this software for a living.',
      summary:
        'Argued by the people who ship these systems, not by people who only study them.',
      body: 'The expert across the table is usually an academic or a forensics vendor. Neither has run the behavior at production scale. This bench architects, ships, and operates the kinds of systems these disputes are about, which is why the analysis starts from how the thing actually works rather than from a checklist.',
    },
    {
      title: 'We have read this kind of evidence before.',
      summary:
        'Timestamp shape, model variability, file-system semantics — where a forensics checklist stops.',
      body: 'Timestamp shape, output variability controlled by fixing model temperature, file-system semantics, artifacts that only appear at scale — where a forensics checklist stops, the real question starts. This is the specific competence a technical matter turns on, and it is not the same competence as collecting the evidence.',
    },
    {
      title: 'You can re-run every finding.',
      summary:
        'Every finding is a query and its output, re-runnable by the other side.',
      body: 'Findings are a query plus its output — re-runnable by opposing counsel. Not "trust me." It is also the answer to the question being asked of every expert this year: an opinion you can re-run is an opinion no one has to take on faith about how it was produced.',
    },
    {
      title: 'We concede what we cannot prove.',
      summary:
        'We concede what is genuinely uncertain. That is what survives cross.',
      body: 'We concede what’s genuinely uncertain and interrogate the evidence with the same rigor a courtroom demands. It’s what separates an expert from a hired gun — and what survives cross. Independence you can see in the report beats independence asserted in a bio.',
    },
    {
      title: 'We read their filings against each other.',
      summary:
        'We diff an opponent’s own successive filings for dropped caveats and silent overstatements.',
      body: 'We diff an opponent’s own successive filings for dropped caveats and silent overstatements. A declaration that quietly strengthens between filings is impeachable on its own record — and almost nobody looks.',
    },
  ],

  caseStudy: {
    label: 'Representative matter · anonymized',
    headline:
      'A mass-copying claim, refuted with an experiment the other side could re-run.',
    summary:
      'An opposing expert read clustered access timestamps as proof of mass copying. We measured a real bulk copy: a genuine one smears across hundreds of seconds, while his exhibit clustered thousands of files into a handful — the signature of a batch process. His own earlier declaration carried the caveats the later one dropped.',
    body: [
      'An opposing digital-forensics expert filed a declaration asserting that tens of thousands of files had been "accessed in rapid succession" — evidence, he said, of mass copying. We did not argue the unfalsifiable "a copy leaves no trace." We characterized the file system’s actual timestamp policy, then measured a real bulk copy on like media. A genuine sequential copy smears its access timestamps across hundreds of seconds; the opposing exhibit clustered thousands of files into a handful of seconds — the signature of an automatic batch process, not a human copy. The distribution’s shape was the discriminator, and we conceded openly what was fair: copying is not timestamp-silent.',
      'Then we impeached the expert on his own record. His earlier declaration, on the same numbers, had carried qualifiers — that grouped accesses "can be caused by copying, searching, and other automated processes." The later federal declaration dropped them while the numbers stayed identical.',
    ],
    // The pull quote states the finding rather than the outcome. "The matter
    // settled" was the previous line; settlement is not attributable to the
    // work, and a litigator knows that better than anyone.
    pullQuote: 'Same data. The shape tells the truth.',
  },

  bench: {
    label: 'The bench',
    heading: 'A dozen experts, assembled per matter',
    // The closing sentence answers a selection criterion attorneys publish and
    // this practice had left unclaimed: whether an expert can teach the
    // technology to a non-technical jury. It is not an aspiration -- explaining
    // technical systems to non-technical decision-makers is what the product
    // half of this bench does for a living, which is why the claim sits here
    // rather than in the pillars.
    intro:
      'A dispute over what a system did rarely stays inside one discipline. It touches how the system was architected, what data it collected, how the product presented itself to users, and what the metrics were defined to mean. A single expert covers one of those. And the same people spend their working lives making technical systems legible to decision-makers who do not build them, which is the other half of what a technical opinion has to do in a courtroom.',
    groups: [
      {
        name: 'Technology leadership',
        disciplines: [
          'Computer science',
          'Machine-learning architecture',
          'Experimentation and research',
          'Information security',
          'Distributed systems',
        ],
      },
      {
        name: 'Product leadership',
        disciplines: [
          'Usability and user experience',
          'Product strategy',
          'User research',
          'Product analytics and experimentation',
          'Product operations and delivery',
          'Growth and monetization',
        ],
      },
    ],
    provenance:
      'These are the fractional CTOs and CPOs who run Root System’s consulting practice, building product for companies that have not yet found a business model. That work makes experimentation and analytical data collection the outcome rather than a report at the end of one. The reproducible experiments filed in a matter come out of the same discipline, not a technique adopted for court.',
    staffing:
      'Every matter is scoped directly rather than routed. Rob Jacques sets the strategic approach, assembles the team to meet it, stays with the work, and runs technical analysis as one of the experts. People are brought in against the approach, not assigned off a rota.',
  },

  services: {
    label: 'Screening question two',
    intro: 'How you can bring us in — all four ways available on all four kinds of matter, and a conflict screen before any of them.',
    modes: [
      {
        title: 'Opposing-expert rebuttal.',
        summary:
          'Refute a technical declaration with a counter-experiment they can run themselves.',
        body: 'Refute a technical declaration with a reproducible counter-experiment and cross-document impeachment.',
      },
      {
        title: 'Affirmative analysis & testimony.',
        summary: 'Establish, provably, what a system, corpus, or algorithm did.',
        body: 'Establish, provably, what a system, corpus, or algorithm did.',
      },
      {
        title: 'Consulting (non-testifying).',
        summary:
          'Case strategy, experiment design, and vetting the other side’s expert — work-product protected.',
        body: 'Behind-the-scenes analysis, case strategy, experiment definition and stochastic data collection, vetting the other side’s expert — work-product protected.',
      },
      {
        title: 'Early-case assessment.',
        summary:
          'A merits screen before you commit: is there an AI/ML claim, and how strong.',
        body: 'A merits screen before you commit: is there an AI/ML claim, and how strong.',
      },
    ],
  },

  pricing: {
    label: 'Engagements',
    tiers: [
      {
        name: 'AI-Dispute Assessment',
        price: '$2,500 flat (up to 10 hours)',
        summary:
          'A written read on the claim and its strength. Credited against a full engagement if the matter proceeds.',
        // The contrast sentence is deliberate. The 2026 ExpertPages survey puts
        // 74% of experts behind a minimum fee to accept an engagement, 40% of
        // those between $2,500 and $4,999 -- so $2,500 alone reads to counsel as
        // an ordinary retainer minimum rather than as a distinct product. The
        // differentiator was always the fixed scope and the written deliverable;
        // it just was not stated against what the market does with that number.
        body: 'A fixed-fee, fixed-scope read: a reproducible-experiment analysis and a written assessment of the claim and its strength. Most experts set a minimum fee to open a file — this is not that. It is a defined piece of work with a written deliverable, capped at ten hours, and credited in full against a full engagement if the matter proceeds.',
      },
      {
        name: 'Full Engagement',
        price: '$450/hr',
        summary:
          'Retainer plus hourly, through analysis, expert report, and testimony.',
        body: 'Retainer plus hourly for a live matter through analysis, expert report, and testimony. The base rate moves for the kind of hours involved — the adjustments are below rather than described as "a premium."',
      },
    ],
    modifiers: {
      intro:
        'Rate adjustments apply to the hours they cover, not to the whole engagement: testimony hours bill at the testimony rate while analysis hours bill at the base.',
      rows: [
        {
          when: 'Expedited turnaround',
          adjustment: '+50%',
          rate: '$675/hr',
        },
        {
          when: 'Deposition and trial testimony',
          adjustment: '+25%',
          rate: '$563/hr',
        },
      ],
      // Deliberately not listed: the volume adjustment for large or long-horizon
      // matters. It exists, but publishing a discount invites every enquiry to
      // argue it qualifies; it is handled in conversation against an internal
      // bar. Nothing here claims these two are the only adjustments.
      note: 'Where more than one applies, the higher rate governs those hours — they do not stack. Large or long-horizon matters are quoted against a volume rate; ask.',
    },
  },

  process: {
    label: 'How an engagement starts',
    heading: 'Conflicts first, then anything else',
    steps: [
      {
        name: 'Conflict screen',
        body: 'Every intake opens with a written conflict questionnaire, walked through with you directly. It captures the named parties and their counsel, affiliated and parent entities, and the specific AI/ML systems, products, models, or vendors at issue. Root System also builds AI systems for clients, and we decline any matter adverse to a current or recent build relationship. Where a conflict is ambiguous, we decline — the reproducibility argument only works if it is unimpeachable.',
      },
      {
        name: 'NDA',
        body: 'A non-disclosure agreement covering client, company, and product information is executed before any confidential material moves. No case files, code, or model artifacts change hands ahead of it.',
      },
      {
        name: 'Assessment',
        body: 'The fixed-fee assessment: a reproducible-experiment analysis and a written read on the claim and its strength, capped at ten hours. If the matter proceeds, the fee is credited against the full engagement.',
      },
    ],
  },

  contrast: {
    label: 'Who else you might reasonably retain',
    rows: [
      {
        who: 'Academic experts',
        strength: 'Publications, Daubert-friendly credentials',
        gap: 'Study models; don’t ship or reproduce at production scale',
      },
      {
        who: 'Economic consultancies',
        strength: 'Deep testimony pedigree',
        gap: 'AI read through an economics lens; concede the black box',
      },
      {
        who: 'Digital-forensics vendors',
        strength: 'Imaging, chain-of-custody, recovery',
        gap: 'Recover bytes; don’t interpret why a model produced an output',
      },
      {
        who: 'Root System',
        strength:
          'Builds the systems + reproducible experimental rebuttal + even-handed',
        // A stated limit, not a dash. Every other row names a weakness; the one
        // row that named none was the row belonging to the practice whose
        // second pillar is conceding what is genuinely uncertain.
        gap: 'Newer practice — the method is the credential, not the mileage',
        isUs: true,
      },
    ],
  },

  faq: [
    {
      question: 'Your testimony record is short.',
      answer:
        'It is, and we don’t dress it up. A reproducible opinion doesn’t rest on tenure: every finding is a query the other side can re-run, so it’s defensible on its own terms rather than on reputation. Under Daubert, a first-principles analysis anyone can replicate is more durable than a veteran’s say-so.',
    },
    // Added 2026-08-19. AI disclosure became a standing vetting question for
    // retained experts this month: prompt logs are being subpoenaed as
    // discoverable work product, and directories now track disclosure as its
    // own screening axis. This practice is unusually exposed to the question
    // because its category claim is the analysis of AI systems, and a reader
    // skimming fast can collapse "analyzes AI" into "uses AI to write reports."
    //
    // The answer deliberately does not claim we never use software tools --
    // that is a claim that would have to survive cross-examination and is not
    // literally true of any modern analytical practice. It claims disclosure
    // plus reproducibility, which is defensible on the record.
    {
      question: 'Did AI write this report?',
      answer:
        'No — and you should ask that of every expert you retain. Prompt logs are discoverable work product, so an opinion a model assembled is an opinion opposing counsel can pull the transcript of. Ours is the opposite kind of document: the finding is a query and its output, handed over so the other side can run it and check. We use analytical software the way any technical expert does, and the report says which tools produced which result.',
    },
    {
      question: 'Why not a big-name firm or lab?',
      answer:
        'Big firms apply AI as a tool inside economics testimony and concede the interpretability problem. This is the practitioner who builds the systems, delivering the empirical validation itself — not a brand markup on a subcontracted analysis.',
    },
    {
      question: 'Aren’t you a hired gun?',
      answer:
        'The method came before the litigation work. Root System builds product for companies that haven’t found a business model yet, where experimentation and honest data collection are the job — a flattering result that doesn’t replicate is worthless to a founder betting a company on it. The same discipline produces the experiments we file. We concede what’s fair, label the unverifiable, and hand the other side a replication they can run. Independence is built into the deliverable.',
    },
    {
      question: 'This sounds expensive.',
      answer:
        'A reproducible opinion that survives a 702 motion is cheaper than one excluded. Start with the $2,500 assessment — see the read before you commit to full analysis.',
    },
  ],

  closing: {
    headline: 'Screened us in? Here is the next step.',
    body: 'Start with the $2,500 fixed-scope assessment. You will get a written read on the claim and what a full engagement would test — before you commit to one. If we are the wrong fit, we will say so on that call rather than after the retainer.',
    button: 'Scope a case',
  },

  contact: {
    email: 'partners@rootsystem.com',
    footer:
      'Root System · Forensic & expert-witness services · Rob Jacques, principal',
    // Published because counsel needs it before they decide to write, not
    // after. One business day rather than 24 hours: the promise has to survive
    // a Friday evening enquiry. It is a commitment, not a nicety -- the intake
    // notification copies a named recipient so it reaches someone who can
    // answer (NOTIFY_CC in wrangler.jsonc).
    responseTime: 'We reply within one business day.',
  },
})

export default copy
