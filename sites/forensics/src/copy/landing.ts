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
    title: 'Root System — AI & Machine-Learning Dispute Analysis | Expert Witness',
    description:
      'Reproducible AI/ML expert analysis for litigation — every opinion is a query or hard experimental data the other side can re-run and verify. Delivered by engineers who build these systems every day.',
  },

  routes: {
    method: {
      title: 'Method — reproducible AI/ML analysis | Root System Forensics',
      heading: 'How an AI/ML opinion holds up under cross',
      description:
        'How an AI/ML opinion is made to hold up: findings stated as a query and its output, conceded uncertainty, and depth in machine-generated evidence — plus the bench of engineering and product experts behind it, set against what academics, economic consultancies and forensics vendors each leave out.',
    },
    matters: {
      title:
        'Representative matter — refuting a mass-copying claim | Root System Forensics',
      heading: 'A representative matter',
      description:
        'An opposing expert read clustered access timestamps as proof of mass copying. We measured a real bulk copy on like media, showed the distribution’s shape was the discriminator, and impeached the declaration against his own earlier filing.',
    },
    engagements: {
      title: 'Engagements and fees | Root System Forensics',
      heading: 'Engagements and fees',
      description:
        'Four ways to engage — opposing-expert rebuttal, affirmative analysis and testimony, non-testifying consulting, and early-case assessment — with a $2,500 fixed-fee assessment that credits toward a full engagement.',
    },
  },

  hero: {
    eyebrow: 'AI & Machine-Learning Dispute Analysis',
    headline: 'Our experts don\'t speculate — they empirically validate.',
    subhead:
      'Technical analysis of what an AI or machine-learning system actually did — how it was built, what data it used, whether it performed as claimed. Every opinion is stated as an experiment the other side can run themselves and check.',
    proof:
      'A genuine bulk copy of 9,000 files smears its access timestamps across hundreds of seconds. The opposing exhibit clustered thousands of files into a single second — a batch process, not a human copy. Same data; the shape tells the truth.',
    cta: 'Scope a case',
  },

  positioning: {
    body: 'When a matter turns on what an AI/ML system, its training data, or an algorithm actually did, most experts can offer one half of what you need: academics who study models but don’t ship them, economic consultancies who read AI through an economics lens and concede the black box, or digital-forensics vendors who recover bytes but don’t interpret model behavior. Root System is a practice of engineers and product leaders who build these systems, and who run the reproducible experiments that make an opinion hold up under cross-examination.',
  },

  // Base scaffolding, added 2026-08-11 with the practiceAreas schema block.
  // The four areas and the decision that all four engagement modes apply to
  // every one of them are Rob's (2026-08-11); the prose here is placeholder
  // that each positioning variant replaces wholesale. Examples are matter
  // types, not a claim that matters of that type have been handled.
  practiceAreas: {
    label: 'What we take',
    heading: 'Four kinds of technical dispute',
    intro:
      'Matters that turn on what a system, a codebase, or a dataset actually did. AI and machine learning is one of the four, not the gate on the other three.',
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

  pillars: [
    {
      title: 'Reproducible, not assertive.',
      summary:
        'Every finding is a query and its output, re-runnable by the other side.',
      body: 'Findings are a query plus its output — re-runnable by opposing counsel. Not "trust me."',
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
        'Timestamp shape, model variability, file-system semantics — where a forensics checklist stops.',
      body: 'Timestamp shape, output variability controlled by fixing model temperature, file-system semantics, artifacts that only appear at scale — where a forensics checklist stops, the real question starts.',
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
        'Argued by the people who ship these systems, not by people who only study them.',
      body: 'Disputes over what AI/ML systems did, argued by the people who ship them. The expert across the table is usually an academic or a forensics vendor; neither has reproduced the behavior at production scale.',
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
    intro:
      'A dispute over what a system did rarely stays inside one discipline. It touches how the system was architected, what data it collected, how the product presented itself to users, and what the metrics were defined to mean. A single expert covers one of those.',
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
    label: 'How we work',
    intro: 'Four modes, one on-ramp — and a conflict screen before any of them.',
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
        body: 'A fixed-fee, fixed-scope read: a reproducible-experiment analysis and a written assessment of the claim and its strength. Predictable cost, defined deliverable. If the matter proceeds to a full engagement, the assessment fee is credited.',
      },
      {
        name: 'Full Engagement',
        price: '$400/hr',
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
          rate: '$600/hr',
        },
        {
          when: 'Deposition and trial testimony',
          adjustment: '+25%',
          rate: '$500/hr',
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
    label: 'Unlike the alternatives',
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
    headline: 'Have a matter that turns on what a model or machine did?',
    body: 'Start with a fixed-fee assessment. You’ll get a reproducible read on the claim and what a full engagement would test — before you commit.',
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
