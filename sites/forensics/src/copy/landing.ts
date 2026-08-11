import { landingSchema, type Landing } from './schema'

/**
 * Forensics landing copy.
 *
 * Rewritten 2026-08-11 against the "peer areas" positioning (product-marketing
 * v7). The practice claims technical disputes generally -- software and source
 * code, data and systems evidence, machine learning, and software failure --
 * with the reproducible-experiment method as the through-line that makes one
 * practice out of four kinds of matter. AI/ML is one area among four and is
 * given no special billing in the title tag, the hero, the ordering, or the
 * tier names. The prior copy led with AI/ML as the whole category claim, which
 * a paralegal reviewing the site read as an AI/ML-only practice; Rob reversed
 * the v4 scope decision on that read.
 *
 * Rules this file is written under, all of them capability lines rather than
 * style preferences:
 *   - We analyze evidence; we never claim to acquire it. Imaging, preservation,
 *     chain of custody and recovery belong to the digital-forensics vendors in
 *     the contrast table and stay listed as their strength.
 *   - There is exactly one representative matter. `practiceAreas[].examples`
 *     are kinds of dispute, never a claim that one has been handled.
 *   - Published pricing is the published pricing. The volume adjustment, the
 *     negotiability of the base rate, and the rate ladder stay off the page.
 *   - Testimony history is thin and is answered honestly rather than dressed.
 *
 * Deliberately NOT included here: the service one-pager, referral one-pager,
 * and directory bio from the GTM deck. Those are print and outreach collateral,
 * not site content.
 */
const copy: Landing = landingSchema.parse({
  meta: {
    title:
      'Root System — Technical Expert Witness for Software, Data, and AI Disputes',
    description:
      'Expert analysis of what a system, a codebase, or a dataset actually did — source code, ESI and metadata, machine-learning systems, and software failure. Every opinion is stated as an experiment opposing counsel can re-run.',
  },

  routes: {
    method: {
      title: 'Method — reproducible technical analysis | Root System Forensics',
      heading: 'How a technical opinion holds up under cross',
      description:
        'One method behind every kind of matter: findings stated as a query and its output, uncertainty conceded on the record, and depth in machine-generated evidence — plus the bench of engineering and product experts behind it, set against what academics, economic consultancies and forensics vendors each leave out.',
    },
    matters: {
      title:
        'Matters — software, data, AI, and system-failure disputes | Root System Forensics',
      heading: 'The matters we take',
      description:
        'Four kinds of technical dispute: software and source code, data and systems forensics, AI and machine learning, and software failure and performance — with a representative matter in which clustered access timestamps were shown to be a batch process rather than a human copy.',
    },
    engagements: {
      title: 'Engagements and fees | Root System Forensics',
      heading: 'Engagements and fees',
      description:
        'Four ways to engage — opposing-expert rebuttal, affirmative analysis and testimony, non-testifying consulting, and early-case assessment — with a $2,500 fixed-fee assessment that credits toward a full engagement.',
    },
  },

  hero: {
    eyebrow: 'Technical Expert-Witness Analysis',
    headline: 'What the system actually did — shown, not asserted.',
    subhead:
      'We take disputes that turn on software and source code, on data and systems evidence, on machine learning, and on software that failed. Every finding is stated as an experiment the other side can run themselves and check.',
    proof:
      'A genuine bulk copy of 9,000 files smears its access timestamps across hundreds of seconds. The opposing exhibit clustered thousands of files into a single second — a batch process, not a human copy. Same data; the shape tells the truth.',
    cta: 'Scope a case',
  },

  positioning: {
    body: 'Whether the artifact is a source tree, a file system’s timestamps, a training corpus, or an outage log, the dispute asks the same two questions: what does the evidence actually show, and can anyone else get the same answer out of it? Most experts answer one of those. Academics study systems they have never shipped. Economic consultancies read technology through an economics lens. Digital-forensics vendors acquire and preserve the evidence — genuinely the hard part, and not ours — then stop where interpretation starts. Root System is a practice of engineers and product leaders who build and operate these systems, and who state every finding as an experiment opposing counsel can run.',
  },

  // The four practice areas, in the order Rob set them (2026-08-11): the
  // artifact, the record the systems kept, the systems that learn, and the
  // systems that failed. Co-equal by design -- no area leads, and AI/ML sits
  // third because that is where it falls in that progression, not because it
  // was ranked. `examples` are matter types, not a claim that matters of that
  // type have been handled.
  practiceAreas: {
    label: 'What we take',
    heading: 'Four kinds of technical dispute',
    intro:
      'Matters that turn on what a system, a codebase, or a dataset actually did. All four areas get the same method and the same four ways of engaging — there is no separate track for any of them.',
    areas: [
      {
        name: 'Software and source code',
        summary:
          'Comparing code to code: what was copied, what was written independently, and who wrote it.',
        body: 'Source-code comparison in trade-secret and IP matters — separating what was copied from what was independently written, and from what everybody in the field writes the same way. The technical read behind an infringement or misappropriation claim. And the provenance of the code itself: what the repository history, the build artifacts, and the code’s own habits say about who wrote it and when.',
        examples: [
          'Trade-secret misappropriation',
          'Copyright and patent infringement',
          'Code provenance and authorship',
        ],
      },
      {
        name: 'Data and systems forensics',
        summary:
          'What the systems recorded — files, metadata, timestamps, logs — and what it can and cannot prove.',
        body: 'ESI and metadata, timestamps, and logs, read for what they establish and what they only appear to. How the file system actually behaves rather than how an exhibit assumes it does. What a log entry does and does not prove. How an access or security incident is reconstructed from the record the systems happened to keep. We analyze the evidence; we do not collect it — imaging, preservation, and chain of custody stay with the forensics vendor, and we work alongside the one you retain.',
        examples: [
          'Metadata and timestamp disputes',
          'Data exfiltration and access claims',
          'Breach and incident reconstruction',
        ],
      },
      {
        name: 'AI and machine learning',
        summary:
          'How a model was built, what data it was trained on, and whether it did what was claimed.',
        body: 'How a model was built and trained, what data it ingested and what that data can be shown to contain, how far its outputs vary and why, and whether the system performed the way it was represented to customers, investors, or a court. The behavior is testable: fix the variables the model leaves loose and the output stops being an anecdote.',
        examples: [
          'Training-data and model-provenance claims',
          'Algorithmic decision and disparate-impact claims',
          'Representations about AI capability',
        ],
      },
      {
        name: 'Software failure and performance',
        summary:
          'Why a system failed, who it failed, and whether it met what was promised.',
        body: 'Defect and root-cause analysis when a system failed: what broke, in what order, and what the record shows about why. Outage and service-level disputes, capacity and scaling failures, and the technical record behind a contract-performance or failed-implementation claim — including the uncomfortable question of what the delivered system was ever going to be capable of.',
        examples: [
          'Failed implementation and delivery disputes',
          'Outage and service-level claims',
          'Product defect and root cause',
        ],
      },
    ],
  },

  pillars: [
    {
      title: 'Reproducible, not assertive.',
      summary:
        'Every finding is a query and its output, re-runnable by the other side.',
      body: 'Findings are a query plus its output — re-runnable by opposing counsel. Not "trust me." It is the same standard whether the evidence is a source tree, a file system, a model, or a log, and that is what makes a practice taking four kinds of matter one practice rather than four.',
    },
    {
      title: 'Even-handed.',
      summary:
        'We concede what is genuinely uncertain. That is what survives cross.',
      body: 'We concede what’s genuinely uncertain and interrogate the evidence with the same rigor a courtroom demands. It’s what separates an expert from a hired gun — and what survives cross.',
    },
    {
      title: 'Depth in machine-generated evidence.',
      summary:
        'Timestamp shape, file-system semantics, log fidelity — where a checklist stops.',
      body: 'Timestamp shape, file-system semantics, what a log did and did not record, output variability controlled by fixing a model’s temperature, artifacts that only appear at scale. A checklist tells you a field’s value. The question in dispute is almost always what that value is capable of meaning.',
    },
    {
      title: 'Cross-document rigor.',
      summary:
        'We diff an opponent’s own successive filings for dropped caveats and silent overstatements.',
      body: 'We diff an opponent’s own successive filings for dropped caveats and silent overstatements. A declaration that quietly strengthens between filings is impeachable on its own record — and almost nobody looks.',
    },
    {
      title: 'Built by builders.',
      summary:
        'Argued by the people who ship and operate these systems, not by people who only study them.',
      body: 'Disputes about software, argued by the people who build and run it. The expert across the table is usually an academic or a vendor working a checklist; neither has had to make the thing behave at production scale, which is where most of these questions are actually settled.',
    },
  ],

  caseStudy: {
    // Labelled with its area. The one matter this practice can point to is a
    // file-system and metadata matter, which is proof for the non-AI areas and
    // is presented as such rather than left ambiguous.
    label: 'Representative matter · Data and systems forensics · anonymized',
    headline:
      'A mass-copying claim, refuted with an experiment the other side could re-run.',
    summary:
      'An opposing expert read clustered access timestamps as proof of mass copying. We measured a real bulk copy: a genuine one smears across hundreds of seconds, while his exhibit clustered thousands of files into a handful — the signature of a batch process. His own earlier declaration carried the caveats the later one dropped.',
    body: [
      'An opposing digital-forensics expert filed a declaration asserting that tens of thousands of files had been "accessed in rapid succession" — evidence, he said, of mass copying. We did not argue the unfalsifiable "a copy leaves no trace." We characterized the file system’s actual timestamp policy, then measured a real bulk copy on like media. A genuine sequential copy smears its access timestamps across hundreds of seconds; the opposing exhibit clustered thousands of files into a handful of seconds — the signature of an automatic batch process, not a human copy. The distribution’s shape was the discriminator, and we conceded openly what was fair: copying is not timestamp-silent.',
      'Then we impeached the expert on his own record. His earlier declaration, on the same numbers, had carried qualifiers — that grouped accesses "can be caused by copying, searching, and other automated processes." The later federal declaration dropped them while the numbers stayed identical.',
      'Nothing in that matter turned on machine learning. It is the method that travels between areas, not the subject: characterize how the system behaves, measure a known case, and hand the other side the measurement.',
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
      'A dispute over what a system did rarely stays inside one discipline. It touches how the system was architected, what data it collected and kept, how the product presented itself to users, and what the metrics were defined to mean. One expert covers one of those. It is also why the practice can take four kinds of matter honestly: the people who read a model read a file system and a failed migration too. And the same people spend their working lives making technical systems legible to decision-makers who do not build them, which is the other half of what a technical opinion has to do in a courtroom.',
    groups: [
      {
        name: 'Technology leadership',
        disciplines: [
          'Computer science',
          'Software architecture and distributed systems',
          'Machine-learning architecture',
          'Experimentation and research',
          'Information security',
          'Data engineering and analytics',
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
      'These are the fractional CTOs and CPOs who run Root System’s consulting practice, building product for companies that have not yet found a business model. That work makes experimentation and analytical data collection the outcome rather than a report at the end of one — a flattering result that does not replicate is worthless to a founder betting a company on it. The reproducible experiments filed in a matter come out of the same discipline, not a technique adopted for court.',
    staffing:
      'Every matter is scoped directly rather than routed. Rob Jacques sets the strategic approach, assembles the team to meet it, stays with the work, and runs technical analysis as one of the experts. People are brought in against the approach, not assigned off a rota.',
  },

  services: {
    label: 'How we work',
    intro:
      'Four ways to engage — the same four whatever the matter turns on — and a conflict screen before any of them.',
    modes: [
      {
        title: 'Opposing-expert rebuttal.',
        summary:
          'Refute a technical declaration with a counter-experiment they can run themselves.',
        body: 'Refute a technical declaration with a reproducible counter-experiment and cross-document impeachment. Where the declaration rests on an assumption about how the system behaves, we test the assumption rather than argue about it.',
      },
      {
        title: 'Affirmative analysis & testimony.',
        summary:
          'Establish, provably, what a system, a codebase, or a dataset did.',
        body: 'Establish, provably, what a system, a codebase, or a dataset did — delivered as a written expert report and, where the matter requires it, as deposition and trial testimony.',
      },
      {
        title: 'Consulting (non-testifying).',
        summary:
          'Case strategy, experiment design, and vetting the other side’s expert — work-product protected.',
        body: 'Behind-the-scenes analysis, case strategy, experiment definition and data collection, and vetting the other side’s expert and their methodology — work-product protected.',
      },
      {
        title: 'Early-case assessment.',
        summary:
          'A merits screen before you commit: is there a technical claim here, and how strong.',
        body: 'A merits screen before you commit: is there a technical claim here, how strong is it, and what would it take to prove or break.',
      },
    ],
  },

  pricing: {
    label: 'Engagements',
    tiers: [
      {
        // Renamed from "AI-Dispute Assessment" (2026-08-11). The on-ramp is
        // the same fixed fee for any of the four areas, and a tier name that
        // says otherwise turns away three quarters of the matters it prices.
        name: 'Technical Assessment',
        price: '$2,500 flat (up to 10 hours)',
        summary:
          'A written read on the claim and its strength. Credited against a full engagement if the matter proceeds.',
        // The contrast sentence is deliberate. The 2026 ExpertPages survey puts
        // 74% of experts behind a minimum fee to accept an engagement, 40% of
        // those between $2,500 and $4,999 -- so $2,500 alone reads to counsel as
        // an ordinary retainer minimum rather than as a distinct product. The
        // differentiator was always the fixed scope and the written deliverable;
        // it just was not stated against what the market does with that number.
        body: 'A fixed-fee, fixed-scope read: a reproducible-experiment analysis and a written assessment of the claim and its strength, at the same price whichever of the four areas the matter sits in. Most experts set a minimum fee to open a file — this is not that. It is a defined piece of work with a written deliverable, capped at ten hours, and credited in full against a full engagement if the matter proceeds.',
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
        body: 'Every intake opens with a written conflict questionnaire, walked through with you directly. It captures the named parties and their counsel, affiliated and parent entities, and the specific systems, products, codebases, models, and vendors at issue. Root System also builds software and AI systems for clients, and we decline any matter adverse to a current or recent build relationship. Where a conflict is ambiguous, we decline — the reproducibility argument only works if it is unimpeachable.',
      },
      {
        name: 'NDA',
        body: 'A non-disclosure agreement covering client, company, and product information is executed before any confidential material moves. No case files, code, or system artifacts change hands ahead of it.',
      },
      {
        name: 'Assessment',
        body: 'The fixed-fee assessment: a reproducible-experiment analysis and a written read on the claim and its strength, capped at ten hours. If the matter proceeds, the fee is credited against the full engagement.',
      },
    ],
  },

  contrast: {
    label: 'Unlike the alternatives',
    rows: [
      {
        who: 'Academic experts',
        strength: 'Publications, Daubert-friendly credentials',
        gap: 'Study systems they have not shipped; don’t reproduce behavior at production scale',
      },
      {
        who: 'Economic consultancies',
        strength: 'Deep testimony pedigree',
        gap: 'Technology read through an economics lens; concede the technical question itself',
      },
      {
        who: 'Digital-forensics vendors',
        strength: 'Imaging, preservation, chain of custody, recovery',
        gap: 'Collect and catalog the evidence; stop where interpreting it starts',
      },
      {
        who: 'Root System',
        strength:
          'Builds and operates the systems + reproducible experiments + even-handed',
        // A stated limit, not a dash. Every other row names a weakness; the one
        // row that named none was the row belonging to the practice whose
        // second pillar is conceding what is genuinely uncertain. Two limits
        // here, both real: the testimony record, and the acquisition boundary
        // that keeps the vendor row above honest.
        gap: 'Newer practice, and we analyze evidence rather than acquire it — the method is the credential, not the mileage',
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
        'Large consultancies bill a brand markup on analysis they subcontract, and they read technology through whichever lens the parent practice owns — economics, accounting, or a standard checklist. This is a bench of engineers and product leaders who build and operate these systems, doing the analysis themselves and handing you the experiment behind it.',
    },
    {
      question: 'Can you collect and image the evidence?',
      answer:
        'No. We analyze evidence; we don’t acquire it. Imaging, preservation, chain of custody, and recovery belong with a digital-forensics vendor, and we work alongside the one you retain — or tell you that you need one. What we do is read what the collection contains and state what it can and cannot establish.',
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
    headline:
      'Have a matter that turns on what a system, a codebase, or a dataset did?',
    body: 'Start with a fixed-fee assessment. You’ll get a reproducible read on the claim and what a full engagement would test — before you commit.',
    button: 'Scope a case',
  },

  contact: {
    email: 'partners@rootsystem.com',
    footer:
      'Root System Forensics · Expert analysis for technical disputes · Rob Jacques, principal',
    // Published because counsel needs it before they decide to write, not
    // after. One business day rather than 24 hours: the promise has to survive
    // a Friday evening enquiry. It is a commitment, not a nicety -- the intake
    // notification copies a named recipient so it reaches someone who can
    // answer (NOTIFY_CC in wrangler.jsonc).
    responseTime: 'We reply within one business day.',
  },
})

export default copy
