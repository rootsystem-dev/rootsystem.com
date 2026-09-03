import { landingSchema, type Landing } from './schema'

/**
 * Forensics landing copy — variant E, 2026-08-22.
 *
 * E is a merge, not a new argument. The vetting-first positioning decided on
 * 2026-08-19 (variant D) is unchanged; what changed is sentence shape. Two
 * rewrite concepts were put element by element against D and chosen between:
 *
 *   "Cross"   — the argument from the adversary's side of the table. Short
 *               declaratives, second person. Won the hero, the pillars heading,
 *               pillars 1, 2 and 4, the representative matter, the testimony
 *               objection, and the closing headline.
 *   "Exhibit" — evidence first, claim second, shaped like the deliverable. Won
 *               the proof block, positioning, the practice-areas and engagement
 *               headings, pillars 3 and 5, the assessment line, and the closing
 *               body.
 *
 * Both calls to action stayed as they were: "Scope a case" is the conversion
 * term the masthead and the marketing glossary already use.
 *
 * No claim in here is new. Every number, concession and finding is the one D
 * carried; the standing constraints in docs/forensics-positioning-decision.md
 * all hold — no testimony-volume claim, analysis never acquisition, no
 * characterization of a named comparable.
 *
 * The hero and closing were scaffolding from the GTM copy deck
 * (Forensics-Expert-Witness-GTM/landing-copy.md, draft-v1 2026-07-17) pending a
 * rewrite in Rob's voice. This is that rewrite, so the draftable flags stay
 * false. Set either back to `draft: true` to close the publish gate in
 * assertPublishable again.
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
    // The five criteria are listed in the same order the screening index
    // below uses, and the short one is named rather than counted to.
    //
    // It read "the fifth is short" until 2026-08-26, when two attorneys
    // reviewing the page said they could not tell what it referred to. They
    // were right, and it was worse than ambiguous: in the hero's own list the
    // testimony record was third, so "the fifth" pointed at jury legibility.
    // The ordinal only worked against the index further down, which ordered
    // the same five differently. Naming the criterion removes the counting
    // entirely; matching the two orders removes the trap that produced it.
    eyebrow: 'Software, source code, data and AI · expert witness',
    headline: 'Vet us the way they will.',
    subhead:
      'Counsel screens an expert on five things: hands-on depth, experience with the evidence, independence, whether a jury will follow, and a testimony record. The first four are answered on this page, each with what it rests on. The record is short, and we say so. Rates are published. Rule us out in ten minutes if we are wrong for the matter.',
    // The same finding as before, stated as the four moves it actually was.
    // Nothing here is new: the numbers, the concession, and the discriminator
    // are the ones the matter produced.
    proof: [
      {
        label: 'Claim',
        text: 'Tens of thousands of files “accessed in rapid succession.”',
      },
      { label: 'Test', text: 'Measure a real bulk copy on comparable media.' },
      {
        label: 'Result',
        text: 'A genuine copy smears across hundreds of seconds. The exhibit clustered tens of thousands into a handful.',
      },
      { label: 'Conceded', text: 'Copying is not timestamp-silent.' },
    ],
    cta: 'Scope a case',
  },

  positioning: {
    label: 'The screen \u2014 all five',
    heading: 'What counsel checks, and where we answer it',
    lead: 'Five things you are screening for, and where each is answered on this page.',
    criteria: [
      {
        name: 'Hands-on depth',
        where: 'the four practice areas above, and the matter types each covers.',
      },
      {
        name: 'Evidence experience',
        where: 'the representative matter below, and the finding it turned on.',
      },
      {
        name: 'Independence',
        where: 'the concession inside that matter: copying is not timestamp-silent.',
      },
      {
        name: 'Jury legibility',
        where:
          'the bench, whose working life is making technical systems legible to people who do not build them.',
      },
      // "Short", not "thin", and the same word the objection on the fees page
      // uses. A thin record is close to a term of art -- it is what a judge
      // says about evidence that will not support a finding -- and using it
      // about ourselves concedes more than the fact does.
      //
      // The count went in on 2026-08-26 and came back out the same day. The
      // record is one deposition and no trial testimony, and naming it filters
      // harder than the adjective does -- which is what the page is for, but it
      // hands the screen a clean no before there is any conversation to argue
      // in. Rob's call: the argument for the practice is one he would rather
      // make himself than have a number make for him. Do not re-propose it
      // without that having changed.
      {
        name: 'Testimony record',
        where: 'short. Not buried:',
        link: {
          text: 'answered on the fees page',
          href: '/engagements/#objections',
        },
      },
    ],
    body: [
      'We analyze evidence; we do not acquire it. Imaging, preservation and chain of custody stay with your digital-forensics vendor, and we work alongside the one you retain.',
      'Rates are published because a partner with a deadline should be able to rule us out without a phone call. Ruling us out fast is a good outcome too.',
    ],
  },

  // Base scaffolding, added 2026-08-11 with the practiceAreas schema block.
  // The four areas and the decision that all four engagement modes apply to
  // every one of them are Rob's (2026-08-11); the prose here is placeholder
  // that each positioning variant replaces wholesale. Examples are matter
  // types, not a claim that matters of that type have been handled.
  practiceAreas: {
    label: 'Depth — the first criterion',
    heading: 'Four kinds of dispute, and what we have built in each',
    intro:
      'Counsel screens first for hands-on depth in the technology at issue. Four areas, each with the matter types it covers. All four engagement modes apply to every one. Outside them, we say so.',
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

  pillarsHeading: 'Built for the cross-examination',

  // The five substantive claims are unchanged from the base -- each was earned
  // in a real matter and none is dropped here. What changes is what they are
  // presented as answering: each title now names the screening criterion it
  // satisfies, in the order counsel tends to ask.
  pillars: [
    {
      title: 'We build the systems in dispute.',
      summary:
        'The bench ships and operates these systems. The analysis starts from how the thing works.',
      body: 'The expert across the table is usually an academic or a forensics vendor. Neither has run the behavior at production scale. This bench architects, ships, and operates the kinds of systems these disputes are about, which is why the analysis starts from how the thing actually works rather than from a checklist.',
    },
    {
      title: 'We have read this evidence before.',
      summary:
        'Timestamp shape, model variance, file-system semantics. A checklist does not reach any of them.',
      body: 'Timestamp shape, output variability controlled by fixing model temperature, file-system semantics, artifacts that only appear at scale. A forensics checklist does not reach any of them. This is the specific competence a technical matter turns on, and it is not the same competence as collecting the evidence.',
    },
    {
      title: 'We ship findings as a query and its output.',
      summary:
        'Query in, output out, handed to the other side to run.',
      body: 'Findings are a query plus its output, re-runnable by opposing counsel. Not “trust me.” It is also the answer to the question being asked of every expert this year: an opinion you can re-run is an opinion no one has to take on faith about how it was produced.',
    },
    {
      title: 'We concede in the report, not on the stand.',
      summary:
        'The uncertainty is written down before anyone asks for it.',
      body: 'We concede what’s genuinely uncertain and interrogate the evidence with the same rigor a courtroom demands. It’s what separates an expert from a hired gun, and what survives cross. Independence you can see in the report beats independence asserted in a bio.',
    },
    {
      title: 'Their earlier declaration is on the record too.',
      summary:
        'Successive filings diffed for dropped caveats and silent overstatements. Almost nobody looks.',
      body: 'We diff an opponent’s own successive filings for dropped caveats and silent overstatements. A declaration that quietly strengthens between filings is impeachable on its own record — and almost nobody looks.',
    },
  ],

  caseStudy: {
    label: 'Representative matter · anonymized',
    headline: 'The opposing expert said mass copying. The distribution said batch process.',
    summary:
      'An opposing expert read clustered access timestamps as proof of mass copying. We measured a real bulk copy. A genuine one smears across hundreds of seconds; his exhibit stacked tens of thousands into a handful — a batch process. Then his own earlier declaration turned up, carrying the caveats the later one had dropped.',
    body: [
      'An opposing digital-forensics expert filed a declaration asserting that tens of thousands of files had been “accessed in rapid succession.” That, he said, was mass copying. We characterized the file system’s actual timestamp policy, then measured a real bulk copy on comparable media.',
      'A genuine sequential copy smears its access timestamps across hundreds of seconds; the opposing exhibit clustered tens of thousands of files into a handful of seconds — the signature of an automatic batch process, not a human copying files. The data distribution’s shape was the discriminator, and we conceded openly what was fair: copying is not timestamp-silent.',
      'Then we impeached the expert on his own record. His earlier state-court declaration, on the same numbers, had carried qualifiers: that grouped accesses “can be caused by copying, searching, and other automated processes.” The later federal declaration dropped them while the numbers stayed identical.',
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
      // Both columns were widened 2026-08-26. The old entries named fields;
      // these name what the bench has actually done in them, which is what a
      // reader deciding whether the practice reaches their matter needs.
      //
      // Two constraints held the wording. "Research" was trimmed to two
      // appearances across the twelve -- the block renders as two adjacent
      // columns of short lines, and five identical tails made the columns stop
      // reading as distinct competences. And "commercial software
      // architecture" rather than "software design": the neighbouring entries
      // already carry "defensive design", "UX design" and "monetization
      // design", so "software design" reads as the drawing kind. "Commercial"
      // covers SaaS and packaged alike and points at the pillar's contrast --
      // the expert across the table is usually an academic.
      {
        name: 'Technology leadership',
        disciplines: [
          'Computer science and commercial software architecture',
          'Machine-learning architecture',
          'Technical experimentation and research',
          'Security, threat modeling and defensive design',
          // Measured, not guessed: with "engineering" this was the only
          // two-line entry in the column apart from the first, and dropping
          // that one word takes it to one line while all three terms survive.
          // Every sibling here is engineering, so the word is implied -- it
          // stays on the entry below because data engineering is that
          // discipline's actual name.
          'Distributed systems, performance and resilience',
          'Data engineering, scaling and observability',
        ],
      },
      {
        name: 'Product leadership',
        // Order is unchanged from the base -- only the wording moved.
        //
        // "Product usage analytics and experimentation" keeps the word
        // analytics on purpose: `intro` above argues a dispute turns on "what
        // the metrics were defined to mean", and `provenance` below rests on
        // experimentation being the outcome of the consulting work. Both ties
        // run through this one entry.
        disciplines: [
          'Usability research and UX design',
          'Product definition and market fit',
          'Market and user-needs research',
          'Product usage analytics and experimentation',
          'Operational strategy and support-organization design',
          'Business-model strategy and monetization design',
        ],
      },
    ],
    provenance:
      'These are the fractional CTOs and CPOs who run Root System’s consulting practice, building product for companies that have not yet found a business model. That work makes experimentation and analytical data collection the outcome rather than a report at the end of one. The reproducible experiments filed in a matter come out of the same discipline, not a technique adopted for court.',
    staffing:
      'Every matter is scoped directly rather than routed. Robert Jacques sets the strategic approach, assembles the team to meet it, stays with the work, and runs technical analysis as one of the experts. People are brought in against the approach, not assigned off a rota.',
  },

  services: {
    label: 'Engagement modes',
    // Not "Four ways to engage": this heading lands directly under the practice
    // areas' "Four kinds of dispute", and two consecutive headings opening on
    // the same numeral read as one repeated line. The cross-product is the
    // claim anyway -- four modes against any of the four areas.
    heading: 'The same four modes, whichever kind it is',
    intro:
      'Available on all four practice areas. Conflicts are screened before anything else.',
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
          'Fixed scope, ten hours, one written deliverable. Credited in full if the matter proceeds.',
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
        body: 'Retainer plus hourly for a live matter through analysis, expert report, and testimony. The base rate moves for the kind of hours involved — the adjustments are below rather than described as “a premium.”',
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
        'It is, and we do not dress it up. Tenure is not what makes an opinion hold — reproducibility is. Every finding we file is a query the other side can run themselves, so it stands on its own terms rather than on reputation. Under Daubert, an analysis anyone can replicate is harder to attack than a veteran’s say-so.',
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
    headline: 'Screened us in? Start here.',
    body: 'A fixed-scope read: a reproducible-experiment analysis and a written assessment of the claim and its strength, capped at ten hours and credited in full if the matter proceeds. If the claim is weak, that is what the read will say.',
    button: 'Scope a case',
  },

  expertsPage: {
    label: 'The bench',
    heading: 'Who does the work',
    intro:
      'The bench is a dozen people across technology and product leadership. Profiles are published for the people who lead the analysis in a matter; the disciplines the rest of the bench covers are on the method page.',
  },

  // Written 2026-08-26 from the LinkedIn record, which is authoritative -- an
  // older written profile in Rob's notes disagreed with it on two dates and
  // was set aside rather than reconciled. Nothing here is a claim the record
  // does not carry.
  //
  // Restructured 2026-09-03. Three decisions, all of them about who is
  // reading.
  //
  // The record renders above the narrative. The reader is a retaining
  // attorney checking whether a credential clears a bar, not someone reading
  // a career, and the degree, the publication and the disciplines are the
  // check. The prose that survives is the prose that explains where the
  // method comes from; the rest of the employment history was cut because it
  // connects to nothing this practice sells.
  //
  // Third person, matching every other string on the property. A profile in
  // first person reads as a personal site, and what is being sold is a
  // practice.
  //
  // Deliberately absent: any claim about AI and machine learning, and any
  // testimony history. The documented record supports software, data and
  // systems, and the research depth in machine learning belongs to other
  // people on the bench -- saying nothing is defensible where an overclaim
  // would not survive the first cross-examination. Testimony is held open
  // rather than overlooked: a section with one entry reads thinner than no
  // section at all, and it goes in when there is a list.
  experts: [
    {
      slug: 'robert-jacques',
      name: 'Robert Jacques',
      credential: 'BSEE',
      role: 'Principal',
      summary:
        'Twenty-five years building and operating the kinds of systems these disputes are about — semiconductor process engineering, commercial software, and the companies that ship it.',
      lede: [
        'Robert Jacques runs the technical analysis in a matter and sets the approach the bench works to. What he brings to a dispute is not a reading of the literature: he has built, shipped and operated the kind of system in question, after five years in an environment where a measurement that could not be defended was worthless.',
      ],
      sections: [
        {
          heading: 'Where the method comes from',
          body: [
            'He started at Intel in Albuquerque in 2001, in defect metrology, process integration and yield, in what was then the first 300mm wafer fab in the United States. The work was Pentium 4 process integration: finding out why a measured signal moved, whether the movement was real, and what it cost in yield. Five years of it.',
            'That is also where the publication comes from. “Evaluation of the ‘HiVol’ above-wafer in-situ particle monitoring sensor” was presented at the IEEE/SEMI Advanced Semiconductor Manufacturing Conference in 2000, jointly with Process Metrix/Insitec, SEMATECH and Sandia National Laboratories. The sensor used a scanned beam to widen the detection volume and an autocorrelation algorithm to cut false counts, and the paper demonstrated that what it measured correlated with wafer-level defects and with the yield impact that followed.',
            'That is the same argument this practice makes in a technical dispute twenty-six years later. Separate the true detections from the false ones, characterize what the measurement actually says, and show that the shape of the distribution corresponds to something real. The opposing expert in our representative matter read clustered timestamps as mass copying; the discriminator was the shape of the distribution, and knowing to look there is not a technique picked up for court.',
          ],
        },
        {
          heading: 'Building and running commercial software',
          body: [
            'From 2014 he led product at CodeScience — conception, business case, design and implementation of commercial AppExchange products — and in 2017 started theCodery, incorporated the following year. He ran it as CEO to thirty-five people and $5.5M in revenue before closing it in 2022. Building commercial software is one thing; carrying the payroll, the delivery risk and the technical decisions of a company that does it is a different kind of knowledge, and it is the kind that tells you what a system was actually built under.',
            'He is now managing partner at Root System, which builds product and technology for companies that have not yet found a business model, with recent operating roles as fractional CTO at Tot Squad and CTO at Discourse Engine. That consulting practice is why the reproducible experiment is the deliverable here rather than a technique adopted for litigation: a flattering result that does not replicate is worthless to a founder betting a company on it, and it is worthless to counsel for the same reason.',
          ],
        },
      ],
      education: [
        {
          institution: 'Clarkson University',
          detail: 'BSc, Electrical Engineering, 2001',
        },
      ],
      affiliations: ['IEEE, 2000–2009'],
      publications: [
        {
          title:
            'Evaluation of the ‘HiVol’ above-wafer in-situ particle monitoring sensor',
          where: 'IEEE/SEMI Advanced Semiconductor Manufacturing Conference, 2000',
          note: 'With Process Metrix/Insitec Measurement Systems, SEMATECH and Sandia National Laboratories.',
        },
      ],
    },
  ],

  notFound: {
    title: 'Page not found | Root System Forensics',
    heading: 'That page is not here',
    body: 'The link may be stale, or the page may have moved since it was cited. Everything on this property is one click away below.',
  },

  contact: {
    email: 'partners@rootsystem.com',
    footer:
      'Root System · Forensic & expert-witness services · Robert Jacques, principal',
    // Published because counsel needs it before they decide to write, not
    // after. One business day rather than 24 hours: the promise has to survive
    // a Friday evening enquiry. It is a commitment, not a nicety -- the intake
    // notification copies a named recipient so it reaches someone who can
    // answer (NOTIFY_CC in wrangler.jsonc).
    responseTime: 'We reply within one business day.',
  },
})

export default copy
