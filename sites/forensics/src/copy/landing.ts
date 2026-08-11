import { landingSchema, type Landing } from './schema'

/**
 * Forensics landing copy.
 *
 * Positioning variant B, written 2026-08-11: traditional technical expert work
 * leads, AI is the edge. Source code and data forensics come first because a
 * retaining attorney recognizes those categories without translation; AI and
 * machine learning is present and argued hard, but as the answer to "why this
 * practice over the code-review firm I used last time" rather than as the gate
 * on the practice.
 *
 * The trigger was a paralegal on a target litigation team reading the previous
 * AI/ML-led copy as an AI/ML-only practice, and naming the matters it would
 * turn away. Rob's call (2026-08-11) reverses the v4 scope decision: four
 * practice areas, all four engagement modes available in every one of them.
 * See .agents/product-marketing.md v7.
 *
 * Two disciplines this copy is written against, both of which the traditional
 * lead makes easier to breach:
 *
 * 1. No claim to evidence acquisition. This bench analyzes produced ESI, code,
 *    logs and file-system artifacts. Imaging, collection, chain of custody and
 *    recovery belong to a forensic examiner, and the contrast table keeps that
 *    as their strength rather than borrowing it.
 * 2. No claim of matters handled. There is exactly one representative matter.
 *    Everything in `practiceAreas[].examples` is a kind of dispute, never a
 *    claim that a dispute of that kind has been worked.
 *
 * Deliberately NOT included here: the service one-pager, referral one-pager,
 * and directory bio from the GTM deck. Those are print and outreach collateral,
 * not site content.
 */
const copy: Landing = landingSchema.parse({
  meta: {
    title:
      'Root System — Software, Source Code & Data Forensics | Expert Witness',
    description:
      'Technical expert analysis for litigation: source-code comparison, ESI and metadata, defect and root-cause analysis — and the matters where a model or an algorithm is what the case turns on. Every finding is stated as a query the other side can re-run.',
  },

  routes: {
    method: {
      title: 'Method — how a technical opinion holds up | Root System Forensics',
      heading: 'How a technical opinion holds up under cross',
      description:
        'Findings stated as a query and its output, conceded uncertainty, and depth in machine-generated evidence — timestamps, logs, file-system semantics, and model behavior — plus the bench of engineering and product experts behind it, set against what source-code firms, forensics vendors, academics and economic consultancies each leave out.',
    },
    matters: {
      title:
        'The matters we take — code, data, system failure, AI | Root System Forensics',
      heading: 'The matters we take',
      description:
        'Four kinds of technical dispute: software and source code, data and systems forensics, software failure and performance, and AI and machine learning. Plus a representative matter — an opposing expert read clustered access timestamps as proof of mass copying, and the distribution said otherwise.',
    },
    engagements: {
      title: 'Engagements and fees | Root System Forensics',
      heading: 'Engagements and fees',
      description:
        'Four ways to engage — opposing-expert rebuttal, affirmative analysis and testimony, non-testifying consulting, and early-case assessment — available in every practice area, with a $2,500 fixed-fee assessment that credits toward a full engagement.',
    },
  },

  hero: {
    eyebrow: 'Expert Witness Analysis — Software, Source Code, Data, AI',
    headline: 'We read the code, the metadata, and the model.',
    subhead:
      'Source-code comparison, ESI and metadata, defect and root-cause analysis — the technical expert work a litigation team already retains for. And the matters where a model, an algorithm, or a training set is what the case turns on. Every finding is stated as an experiment the other side can run themselves and check.',
    proof:
      'A genuine bulk copy of 9,000 files smears its access timestamps across hundreds of seconds. The opposing exhibit clustered thousands of files into a single second — a batch process, not a human copy. Same data; the shape tells the truth.',
    cta: 'Scope a case',
  },

  positioning: {
    body: 'Technical expert work in litigation is usually bought from one of two shelves: a source-code firm that will run the comparison but reads a trained system as a black box, or a digital-forensics vendor that images the media and stops where interpreting the system’s behavior starts. Root System is a bench of engineers and product leaders who build these systems for a living. We take the source-code, metadata, and system-failure matters those firms take — and we take them the same way when the thing at the center is a model, an algorithm, or a training set. Every finding is a query and its output, re-runnable by opposing counsel.',
  },

  // Practice areas, ordered to variant B's thesis: the two categories a
  // retaining attorney recognizes without translation lead, system failure
  // third, AI and machine learning fourth. Fourth is not last-and-least here --
  // the grid lands four areas 3 + 1, so the trailing area sits alone on its own
  // row, and the intro frames it as the one the shelf usually concedes.
  //
  // Examples are matter types. They are the kinds of dispute this practice
  // takes, never a claim that a matter of that kind has been handled.
  practiceAreas: {
    label: 'What we take',
    heading: 'The technical disputes we take',
    intro:
      'Three of these are the expert categories a litigation team already knows how to buy. The fourth is the one that usually gets conceded as a black box. We take all four — and every way of engaging us applies to all four, from a first read through testimony.',
    areas: [
      {
        name: 'Software and source code',
        summary:
          'Source-code comparison in trade-secret and IP matters, code provenance and authorship, and the technical read behind an infringement claim.',
        body: 'Line-level and structural comparison of two codebases, the authorship and history record behind them, and the technical substance of an infringement or misappropriation claim. We work from the code and repository history as produced — the comparison and the opinion, not the collection.',
        examples: [
          'Trade-secret misappropriation',
          'Copyright and patent infringement',
          'Code provenance, authorship, and open-source origin',
        ],
      },
      {
        name: 'Data and systems forensics',
        summary:
          'ESI and metadata, timestamp and log analysis, file-system semantics, and reconstructing what the systems actually recorded.',
        body: 'What the record actually shows: metadata and timestamps, application and system logs, file-system semantics, and the reconstruction of a data-handling or security incident from the artifacts a system left behind. We analyze evidence that has been produced or imaged. Acquisition, chain of custody and recovery are a forensic examiner’s work, and we will say so when a matter needs one.',
        examples: [
          'Metadata and timestamp disputes',
          'Data exfiltration and unauthorized access claims',
          'Breach and security-incident reconstruction',
        ],
      },
      {
        name: 'Software failure and performance',
        summary:
          'Defect and root-cause analysis, outage and service-level disputes, capacity and scaling failures.',
        body: 'Why a system did not do what it was contracted to do: defect and root-cause analysis, outage and service-level disputes, capacity and scaling failures, and the technical record behind a failed implementation or a contract-performance claim.',
        examples: [
          'Failed implementation and delivery disputes',
          'Outage and service-level claims',
          'Product defect and root cause',
        ],
      },
      {
        name: 'AI and machine learning',
        summary:
          'How a model was built, what data it used, and whether it performed as claimed — analyzed, not conceded as a black box.',
        body: 'How a model was built and trained, what data it ingested, how far and why its outputs vary, and whether it performed the way it was represented. This is where the practice separates from a code-review firm: a diff does not explain a trained system, and the usual alternative is an expert who concedes the interpretability problem in the first paragraph. Same reproducible method as the three areas above, applied to a system whose behavior is statistical rather than deterministic.',
        examples: [
          'Training-data and model-provenance claims',
          'Algorithmic decision and disparate-impact claims',
          'Representations about AI capability',
        ],
      },
    ],
  },

  pillars: [
    {
      title: 'Reproducible, not assertive.',
      summary:
        'Every finding is a query and its output, re-runnable by the other side.',
      body: 'Findings are a query plus its output — re-runnable by opposing counsel on the same evidence. Not "in my experience."',
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
        'Timestamp shape, file-system semantics, log artifacts, model variability — where a checklist stops.',
      body: 'The distribution of access timestamps, file-system semantics, log and build artifacts, behavior that only appears at scale, and output variability measured with model temperature fixed. A forensics checklist reports the fields. The dispute is usually about what the fields mean.',
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
        'Argued by the people who ship these systems — including the ones with a model inside.',
      body: 'The bench builds production software for a living: codebases, data pipelines, distributed systems, and the machine-learning systems that sit on top of them. That last part is where this practice separates from a code-review firm. When a matter turns on how a model was trained or why it produced a particular output, it does not get subcontracted and it does not get conceded.',
    },
  ],

  caseStudy: {
    label: 'Representative matter · anonymized',
    headline:
      'A mass-copying claim, refuted with an experiment the other side could re-run.',
    summary:
      'An opposing expert read clustered access timestamps as proof of mass copying. We measured a real bulk copy: a genuine one smears across hundreds of seconds, while his exhibit clustered thousands of files into a handful — the signature of a batch process. His own earlier declaration carried the caveats the later one dropped. No model involved: a file system, a distribution, and a measurement anyone can repeat.',
    body: [
      'An opposing digital-forensics expert filed a declaration asserting that tens of thousands of files had been "accessed in rapid succession" — evidence, he said, of mass copying. We did not argue the unfalsifiable "a copy leaves no trace." We characterized the file system’s actual timestamp policy, then measured a real bulk copy on like media. A genuine sequential copy smears its access timestamps across hundreds of seconds; the opposing exhibit clustered thousands of files into a handful of seconds — the signature of an automatic batch process, not a human copy. The distribution’s shape was the discriminator, and we conceded openly what was fair: copying is not timestamp-silent.',
      'Then we impeached the expert on his own record. His earlier declaration, on the same numbers, had carried qualifiers — that grouped accesses "can be caused by copying, searching, and other automated processes." The later federal declaration dropped them while the numbers stayed identical.',
      'Nothing in that matter involved a model or an algorithm. It was a file system, a measurement, and a distribution — the ordinary shape of a data-forensics dispute, worked the way every matter here is worked.',
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
      'A dispute over what a system did rarely stays inside one discipline. It touches how the system was architected, what it recorded and where, how the product presented itself to users, and what the metrics were defined to mean. A single expert covers one of those. And the same people spend their working lives making technical systems legible to decision-makers who do not build them, which is the other half of what a technical opinion has to do in a courtroom.',
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
    // Not "How we work": the root page's expansion link under this section is
    // labelled that, and the eyebrow repeating it read as a stutter.
    label: 'Ways to engage',
    intro:
      'Four ways to engage, available in all four practice areas — and a conflict screen before any of them.',
    modes: [
      {
        title: 'Opposing-expert rebuttal.',
        summary:
          'Refute a technical declaration with a counter-experiment they can run themselves.',
        body: 'Refute a technical declaration with a reproducible counter-experiment and cross-document impeachment — whether the declaration is about a codebase, a set of timestamps, an outage, or a model.',
      },
      {
        title: 'Affirmative analysis & testimony.',
        summary:
          'Establish, provably, what a codebase, a system, or a dataset did — and testify to it.',
        body: 'Establish, provably, what a codebase, a system, a dataset, or a model did, and carry the finding through an expert report, deposition and trial.',
      },
      {
        title: 'Consulting (non-testifying).',
        summary:
          'Case strategy, experiment design, and vetting the other side’s expert — work-product protected.',
        // "stochastic data collection" was the deck's phrase and it is gone.
        // Under a traditional lead, any sentence pairing this practice with the
        // word "collection" reads as evidence collection, which it never is.
        body: 'Behind-the-scenes analysis, case strategy, experiment and sampling design, vetting the other side’s expert — work-product protected.',
      },
      {
        title: 'Early-case assessment.',
        summary:
          'A merits screen before you commit: is the technical claim there, and how strong.',
        body: 'A merits screen before you commit: whether the technical claim is actually there — in the code, in the record, or in the model — and how strong it is.',
      },
    ],
  },

  pricing: {
    label: 'Engagements',
    tiers: [
      {
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
        body: 'A fixed-fee, fixed-scope read on any of the four practice areas: a reproducible-experiment analysis and a written assessment of the claim and its strength. Most experts set a minimum fee to open a file — this is not that. It is a defined piece of work with a written deliverable, capped at ten hours, and credited in full against a full engagement if the matter proceeds.',
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
      note: 'Where more than one applies, the higher rate governs those hours — they do not stack. Large or long-horizon matters are quoted against a volume rate; ask. The same rates apply in every practice area.',
    },
  },

  process: {
    label: 'How an engagement starts',
    heading: 'Conflicts first, then anything else',
    steps: [
      {
        name: 'Conflict screen',
        body: 'Every intake opens with a written conflict questionnaire, walked through with you directly. It captures the named parties and their counsel, affiliated and parent entities, and the specific systems, products, codebases, models and vendors at issue. Root System also builds software and AI systems for companies, and we decline any matter adverse to a current or recent build relationship. Where a conflict is ambiguous, we decline — the reproducibility argument only works if it is unimpeachable.',
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

  // The comparison set changed 2026-08-11 with the positioning. Leading with
  // traditional technical expert work means source-code and software expert
  // firms are the incumbent this practice is actually displacing, so they take
  // the first row rather than going unmentioned. The digital-forensics row
  // keeps acquisition as their strength -- this bench does not do it, and the
  // row is the honest place to say so.
  contrast: {
    label: 'Who else you might retain',
    rows: [
      {
        who: 'Source-code and software expert firms',
        strength: 'Established code-comparison practice, longer testimony records',
        gap: 'A diff does not explain a trained system; model questions get subcontracted',
      },
      {
        who: 'Digital-forensics vendors',
        strength: 'Imaging, collection, chain of custody, recovery',
        gap: 'Recover and preserve the bytes; stop where interpreting behavior starts',
      },
      {
        who: 'Academic experts',
        strength: 'Publications, Daubert-friendly credentials',
        gap: 'Study systems; don’t ship them or reproduce them at production scale',
      },
      {
        who: 'Economic consultancies',
        strength: 'Deep testimony pedigree',
        gap: 'Technology read through an economics lens; concede the black box',
      },
      {
        who: 'Root System',
        strength:
          'Builds the systems — code, data, and models — and states every finding as a re-runnable experiment',
        // A stated limit, not a dash. Every other row names a weakness; the one
        // row that named none was the row belonging to the practice whose
        // second pillar is conceding what is genuinely uncertain. Two limits
        // here, because the traditional lead invites both questions: the
        // testimony record is shorter than the incumbents', and this bench
        // analyzes evidence rather than acquiring it.
        gap: 'Newer practice, shorter testimony record — and we analyze evidence rather than collect it',
        isUs: true,
      },
    ],
  },

  faq: [
    {
      question: 'Your testimony record is short.',
      answer:
        'It is, and we don’t dress it up. The established source-code firms have been at this longer. A reproducible opinion doesn’t rest on tenure: every finding is a query the other side can re-run, so it’s defensible on its own terms rather than on reputation. Under Daubert, a first-principles analysis anyone can replicate is more durable than a veteran’s say-so.',
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
      question: 'Why you and not the source-code firm we used last time?',
      answer:
        'On a straight codebase-to-codebase comparison, that firm is a reasonable choice and we’ll say so. The difference shows up when the matter has a model, a data pipeline, or a statistical system in it — a diff doesn’t answer that question, and the usual response is a subcontractor or a concession that the system is unknowable. We build those systems, so we analyze them with the same method we use on code and metadata. Our rates are also on this page, which is unusual on this shelf.',
    },
    {
      question: 'Do you image drives or handle collection?',
      answer:
        'No. We analyze what has been produced or imaged — code, ESI, metadata, logs, model artifacts — and we work alongside the examiner who did the acquisition. If a matter needs collection or chain of custody established, you need a forensic examiner, and we’ll tell you that in the first call rather than after the retainer.',
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
      'Have a matter that turns on what the code, the record, or the model actually did?',
    body: 'Start with a fixed-fee assessment. You’ll get a reproducible read on the claim and what a full engagement would test — before you commit.',
    button: 'Scope a case',
  },

  contact: {
    email: 'partners@rootsystem.com',
    footer:
      'Root System · Software, data and AI expert-witness services · Rob Jacques, principal',
    // Published because counsel needs it before they decide to write, not
    // after. One business day rather than 24 hours: the promise has to survive
    // a Friday evening enquiry. It is a commitment, not a nicety -- the intake
    // notification copies a named recipient so it reaches someone who can
    // answer (NOTIFY_CC in wrangler.jsonc).
    responseTime: 'We reply within one business day.',
  },
})

export default copy
