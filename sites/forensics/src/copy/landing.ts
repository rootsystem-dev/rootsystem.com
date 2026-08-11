import { landingSchema, type Landing } from './schema'

/**
 * Forensics landing copy.
 *
 * Rewritten 2026-08-11 against the positioning recorded as v7 in
 * .agents/product-marketing.md. The organizing principle is the job and the
 * deliverable stated in language a paralegal screening experts understands on
 * first read — not a technology category. AI and machine learning is one of
 * four practice areas here, no louder than the other three.
 *
 * The jargon rule this copy set follows, and the reason so many lines read
 * shorter than they used to:
 *
 *   - Terms of art a litigator actually uses stay. Daubert, 702, declaration,
 *     impeachment, cross, work-product, deposition. That is the reader's own
 *     vocabulary, not tech speak.
 *   - Engineering vocabulary is not allowed in a customer-facing position --
 *     the hero, the practice-area summaries, the pillar summaries, the mode
 *     summaries, the root page generally. Model temperature, distributed
 *     systems, stochastic collection and at-scale artifacts moved down into the
 *     /method bodies, where a reader has already decided to go deeper, or went.
 *
 * Two lines are load-bearing and must not be softened into a broader claim
 * than the practice can support:
 *
 *   - This bench analyzes evidence; it does not acquire it. Imaging,
 *     collection, chain of custody and recovery belong to the digital-forensics
 *     vendors named in `contrast`, and that is stated in the open both there
 *     and in the data practice area rather than left to be inferred.
 *   - `caseStudy` is the only matter on the property, and `practiceAreas[].examples`
 *     are matter types rather than matters handled. There is no case count, no
 *     outcome claim and no client name anywhere in this file, deliberately.
 *
 * `meta.title` and `routes.*.title` carry the concrete subject terms the hero
 * deliberately does not. Organic search is one of only three entry paths and
 * "AI expert witness" is a query someone types; the titles are where that is
 * paid for, since a title is read by a search engine and skipped by the
 * referral reader this page is written for.
 */
const copy: Landing = landingSchema.parse({
  meta: {
    title:
      'Software, Source-Code, Data and AI Expert Witness | Root System Forensics',
    description:
      'Expert analysis of what a system actually did — source code, data and logs, machine-learning models, and software failures. Every finding is stated as a test opposing counsel can run and check. Fixed-fee $2,500 case assessment.',
  },

  routes: {
    method: {
      title:
        'Method — how a technical expert opinion holds up under cross | Root System Forensics',
      // Distinct from the Pillars component's own hardcoded h2 ("How the work
      // holds up"), which sits directly beneath it.
      heading: 'How a technical opinion holds up under cross',
      description:
        'Findings stated as a test the other side can re-run, uncertainty conceded in the report rather than found on cross, and the depth to read what a system recorded about itself — plus the bench of engineers and product leaders behind it, set against what academics, economic consultancies and forensics vendors each leave out.',
    },
    matters: {
      title:
        'Matters we take — source code, data and logs, AI, software failure | Root System Forensics',
      heading: 'The matters we take',
      description:
        'Four kinds of technical dispute: software and source code, data and logs and metadata, AI and machine learning, and software failure and performance. Plus a representative matter — refuting a mass-copying claim by measuring what a real bulk copy looks like.',
    },
    engagements: {
      title:
        'Engagements, rates and fees — expert witness | Root System Forensics',
      heading: 'Engagements and fees',
      description:
        'Four ways to bring us in — opposing-expert rebuttal, affirmative analysis and testimony, non-testifying consulting, and early-case assessment — with published rates and a $2,500 fixed-fee assessment that credits toward a full engagement.',
    },
  },

  hero: {
    eyebrow: 'Expert witness and technical analysis',
    headline:
      'We establish what a system actually did — and show the other side how to check it.',
    subhead:
      'Counsel brings us in when a matter turns on what happened inside software: whose code is whose, what the records show, how a model was built, why something failed. We answer that from the evidence the systems produced themselves, and we state every finding as a step the other side can repeat.',
    proof:
      'An opposing expert called clustered file-access timestamps proof of mass copying. We copied 9,000 files in bulk on comparable media and measured what that actually looks like: a real copy spreads its timestamps across hundreds of seconds. His exhibit packed thousands of files into a handful. Same data — the shape tells you which one it was.',
    cta: 'Scope a case',
  },

  positioning: {
    body: 'Every one of these disputes runs on a record that a machine wrote: source code and its history, access and event logs, timestamps, file systems, model output. That record does not explain itself and it does not testify. Someone has to read it, say what it means under oath, and hold that position against an expert saying the opposite. Root System is a practice of engineers and product leaders who build software for a living. We read the machine’s record, run the test that settles the question, and write it up so the other side can run the same test and get the same answer.',
  },

  // The practice areas. AI and machine learning sits third: visibly one of
  // four, neither the headline nor the afterthought. Software and source code
  // leads because it is the most common technical dispute and the one a
  // screening reader recognizes fastest; the data area follows it because the
  // representative matter is a data matter, so the claim and its proof are
  // adjacent. Examples are matter types, not matters handled.
  practiceAreas: {
    label: 'What we take',
    heading: 'Four kinds of matter, one kind of evidence',
    intro:
      'The subject changes; the evidence does not. In all four, the record was written by a machine, and the work is reading it correctly and proving that you read it correctly. Every way of engaging us — rebuttal, affirmative testimony, consulting, early-case assessment — applies to all four.',
    areas: [
      {
        name: 'Software and source code',
        summary:
          'Whose code is whose — source-code comparison, authorship and provenance, and the technical read behind an infringement claim.',
        body: 'Comparison of two codebases and what the similarities actually mean: copied, independently written, or both drawn from the same public source. Who wrote what and when, read out of the code and its revision history. And the technical read an infringement or misappropriation claim rests on — what the accused system does, described in terms a court can follow.',
        examples: [
          'Trade-secret misappropriation',
          'Copyright and patent infringement',
          'Code authorship and provenance',
        ],
      },
      {
        name: 'Data, logs, and metadata',
        summary:
          'What the record shows — file timestamps, access and event logs, metadata, and how a file system actually behaves.',
        body: 'Systems write down what happened, in file timestamps, access and event logs, metadata, and the file system’s own bookkeeping. We read that record and say what it supports and what it does not, including reconstructing a security or data-handling incident from what the systems kept. One limit worth stating plainly: we analyze evidence that has already been collected. Imaging, collection and chain of custody are a collection vendor’s work, and we will tell you when you need one.',
        examples: [
          'Metadata and timestamp disputes',
          'Data exfiltration and improper access',
          'Breach and incident reconstruction',
        ],
      },
      {
        name: 'AI and machine learning',
        summary:
          'How a model was built, what data went into it, and whether it did what it was said to do.',
        body: 'How a model was built and trained, what data went into it and where that data came from, how much its answers move from one run to the next, and whether it performed the way it was represented to customers, investors, or the court. The questions are the ordinary ones — what was it made of, what did it do — asked of a system that answers differently each time you ask it.',
        examples: [
          'Training-data and model-provenance claims',
          'Automated decisions and disparate impact',
          'Representations about what a product’s AI can do',
        ],
      },
      {
        name: 'Software failure and performance',
        summary:
          'Why it broke, what it cost, and whose account of the failure the record supports.',
        body: 'Whether a failure was a defect, a capacity limit, an operational decision, or the way the system was always going to behave under that load. Root-cause analysis of outages and defects, and the technical record behind a claim that a delivery, an integration, or a service level was not met.',
        examples: [
          'Failed implementation and delivery disputes',
          'Outage and service-level claims',
          'Product defect and root cause',
        ],
      },
    ],
  },

  // Titles are plain sentences on purpose. The previous set led with nouns
  // ("Reproducible, not assertive", "Depth in machine-generated evidence")
  // that describe the method to someone who already has it. The engineering
  // detail those titles carried has not been dropped -- it moved into `body`,
  // which renders on /method and nowhere else.
  pillars: [
    {
      title: 'Findings you can re-run.',
      summary:
        'Every conclusion comes with the steps that produced it, so the other side can repeat them and see the same thing.',
      body: 'Every conclusion is stated as something you can do and the result you get when you do it: the inputs, the steps, the output. Opposing counsel can hand it to their own expert and repeat it. That is a different kind of exhibit from "in my experience, this indicates copying," and it is a great deal harder to move.',
    },
    {
      title: 'We say what we cannot prove.',
      summary:
        'Where the evidence is genuinely uncertain, the report says so before the other side gets the chance to.',
      body: 'Where the evidence is genuinely uncertain, we write that down ourselves, in the report. In the matter below we conceded outright that copying does not always leave a timestamp trail. The concession cost nothing and took the obvious cross-examination off the table. An opinion with no limits stated is an opinion waiting to have them found for it.',
    },
    {
      title: 'We read what the machine wrote.',
      summary:
        'Timestamps, logs, code history, file systems, model output — the records systems keep about themselves without meaning to.',
      body: 'The evidence that decides these matters is usually something a system recorded about itself that nobody intended as evidence: the shape of a timestamp distribution rather than its count, the difference between what a file system writes on a read and on a copy, output that varies run to run unless the model’s settings are pinned, behavior that only appears once a job is large enough. A checklist stops at the file. The question normally starts there.',
    },
    {
      title: 'We read their filings against each other.',
      summary:
        'A declaration that quietly gets stronger between filings is impeachable on its own record.',
      body: 'We diff an opposing expert’s successive declarations for caveats that disappear and claims that firm up on identical numbers. It happens more often than you would expect, it is impeachable on the expert’s own record, and almost nobody checks.',
    },
    {
      title: 'We build this software for a living.',
      summary:
        'The people writing the opinion ship these systems the rest of the week. They are not describing them from the outside.',
      body: 'This is a bench of working engineers and product leaders — the fractional CTOs and CPOs of Root System’s consulting practice. They architect systems, ship models, run experiments, and answer for the results in front of paying customers rather than only in a deposition. The expert across the table has often studied the behavior in question. Fewer of them have had to produce it.',
    },
  ],

  caseStudy: {
    label: 'Representative matter · anonymized',
    headline:
      'A mass-copying claim, refuted with a test the other side could run.',
    summary:
      'An opposing expert said clustered file-access timestamps proved mass copying. We ran a real bulk copy on comparable media and measured what that actually looks like: a genuine copy spreads its timestamps across hundreds of seconds, while his exhibit packed thousands of files into a handful. Then we found the qualifiers his own earlier declaration had carried and his later one had dropped. Nothing in the finding required taking our word for it.',
    body: [
      'An opposing digital-forensics expert filed a declaration stating that tens of thousands of files had been "accessed in rapid succession" — evidence, he said, of mass copying. We did not argue the unfalsifiable point that a copy can leave no trace at all. We established what the file system actually records when a file is read and when it is copied, then ran a bulk copy of comparable size on comparable media and measured the result. A genuine sequential copy of 9,000 files spreads its access timestamps across hundreds of seconds. The exhibit he filed packed thousands of files into a handful of seconds, which is the signature of an automated process rather than a person copying a folder. The shape of the distribution was the thing that told them apart, and the shape is something anyone can go and measure. We conceded in writing what was fair: copying does not always leave a timestamp trail.',
      'Then we impeached him on his own record. His earlier declaration, working from the same numbers, had said that grouped accesses "can be caused by copying, searching, and other automated processes." The later federal declaration dropped the qualifier while the numbers stayed identical.',
    ],
    // The pull quote states the finding rather than the outcome. "The matter
    // settled" was the previous line; settlement is not attributable to the
    // work, and a litigator knows that better than anyone.
    pullQuote: 'Same data. The shape tells the truth.',
  },

  // The bench block is where engineering vocabulary used to concentrate: two
  // columns of discipline nouns ("distributed systems", "product analytics and
  // experimentation") that read as a resume dump to a legal reader and require
  // translation before they mean anything. The same bench and the same
  // disciplines are now listed as the questions each one answers, which is what
  // a reader is actually checking the list against.
  bench: {
    label: 'The bench',
    heading: 'About a dozen experts, assembled around the matter',
    // The closing sentence answers a selection criterion attorneys publish and
    // this practice had left unclaimed: whether an expert can teach the
    // technology to a non-technical jury. It is not an aspiration -- explaining
    // technical systems to non-technical decision-makers is what the product
    // half of this bench does for a living, which is why the claim sits here
    // rather than in the pillars.
    intro:
      'A dispute over what a system did rarely stays inside one discipline. It touches how the system was built, what it recorded, what it told its users it was doing, and what its numbers were defined to mean. A single expert covers one of those. And the same people spend their working lives making technical systems legible to decision-makers who do not build them, which is the other half of what a technical opinion has to do in a courtroom. Here is what the bench can answer, written as the questions it gets asked.',
    groups: [
      {
        name: 'On the engineering side',
        disciplines: [
          'How systems are designed, and how they fail',
          'How models are built, trained, and evaluated',
          'How data is collected, stored, and moved',
          'How systems are secured, and how they are breached',
          'How software is tested, measured, and proven',
        ],
      },
      {
        name: 'On the product side',
        disciplines: [
          'What a product told its users it was doing',
          'How it was actually used, and by whom',
          'What the numbers on a dashboard were defined to mean',
          'What was promised, what shipped, and what slipped',
          'How the product made money, and off which behavior',
        ],
      },
    ],
    provenance:
      'These are the fractional CTOs and CPOs who make up Root System’s consulting practice. Their day job is building product for companies that have not yet found a business model — work where the only way to know whether something is true is to test it, because a flattering result that does not repeat will sink a founder who bet the company on it. The tests we file in a matter come out of that habit. It is not a posture adopted for court.',
    staffing:
      'Every matter is scoped directly rather than routed. Rob Jacques takes the intake, sets the approach, assembles the people to meet it, stays with the work, and runs technical analysis himself as one of the experts. People are brought in against the approach, not assigned off a rota.',
  },

  // Mode titles match the labels in the /scope intake dropdown (lib/form.ts) on
  // purpose: a reader picks a mode here and then finds the same words in the
  // form. Change one and change the other.
  services: {
    label: 'How we work',
    intro:
      'Four ways to bring us in, on any of the four kinds of matter — and a conflict screen before any of them.',
    modes: [
      {
        title: 'Opposing-expert rebuttal.',
        summary:
          'Take a technical declaration apart by running the test its author did not.',
        body: 'We take the opposing declaration apart on the evidence rather than on adjectives: run the counter-test, hand over the steps that produced it, and read the expert’s own filings against each other for the caveats that went missing between them.',
      },
      {
        title: 'Affirmative analysis & testimony.',
        summary:
          'Establish what happened, in a report, in deposition, and at trial.',
        body: 'Establish what a system, a codebase, or a dataset actually did, and say so in an expert report, in deposition, and on the stand. Available on any of the four kinds of matter.',
      },
      {
        title: 'Consulting (non-testifying).',
        summary:
          'Case strategy, the tests worth running, and a read on the other side’s expert — work-product protected.',
        body: 'Behind the scenes: what the technical theory of the case should be, which tests are worth running and what each one would and would not show, and an honest read on the opposing expert’s methodology. Work-product protected, and we do not appear.',
      },
      {
        title: 'Early-case assessment.',
        summary:
          'Before you commit: is the technical claim there, and how strong is it.',
        body: 'A merits screen before the spend. Is the technical claim actually there, what would it take to prove, and where is the weakest point in it — theirs and ours. This is what the fixed-fee assessment buys.',
      },
    ],
  },

  pricing: {
    label: 'Engagements',
    tiers: [
      {
        // Renamed from "AI-Dispute Assessment" 2026-08-11. The tier was never
        // AI-only and the name was turning away three of the four practice
        // areas at the one point on the page where a reader is deciding.
        name: 'Case Assessment',
        price: '$2,500 flat (up to 10 hours)',
        summary:
          'A written read on the claim and how strong it is. Credited against a full engagement if the matter proceeds.',
        // The contrast sentence is deliberate. The 2026 ExpertPages survey puts
        // 74% of experts behind a minimum fee to accept an engagement, 40% of
        // those between $2,500 and $4,999 -- so $2,500 alone reads to counsel as
        // an ordinary retainer minimum rather than as a distinct product. The
        // differentiator was always the fixed scope and the written deliverable;
        // it just was not stated against what the market does with that number.
        body: 'A fixed fee for a fixed scope: we run the analysis and you get a written read on the technical claim — what the evidence supports, what it does not, and what a full engagement would have to test. Most experts set a minimum fee to open a file; this is not that. It is a defined piece of work, capped at ten hours, and if the matter proceeds the fee is credited against it.',
      },
      {
        name: 'Full Engagement',
        price: '$450/hr',
        summary:
          'Retainer plus hourly, through analysis, expert report, and testimony.',
        body: 'Retainer plus hourly for a live matter, through analysis, expert report, deposition, and trial. The rate moves for certain kinds of hours; those adjustments are listed below rather than described as "a premium."',
      },
    ],
    modifiers: {
      intro:
        'Adjustments apply to the hours they cover, not to the whole engagement: testimony hours bill at the testimony rate while analysis hours bill at the base.',
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
        body: 'Every intake opens with a written conflict questionnaire, walked through with you directly. It captures the named parties and their counsel, affiliated and parent entities, and the specific systems, products, codebases, models, or vendors at issue. Root System also builds software for clients, and we decline any matter adverse to a current or recent build relationship. Where a conflict is ambiguous we decline; one matter is not worth having to answer that question on cross.',
      },
      {
        name: 'NDA',
        body: 'A non-disclosure agreement covering client, company, and product information is executed before any confidential material moves. No case files, code, logs, or model artifacts change hands ahead of it.',
      },
      {
        name: 'Assessment',
        body: 'The fixed-fee assessment: the analysis, plus a written read on the claim and how strong it is, capped at ten hours. If the matter proceeds, the fee is credited against the full engagement.',
      },
    ],
  },

  contrast: {
    label: 'Unlike the alternatives',
    rows: [
      {
        who: 'Academic experts',
        strength: 'Publications, credentials that read well under Daubert',
        gap: 'Study these systems; rarely build or run one',
      },
      {
        who: 'Economic consultancies',
        strength: 'Deep testimony pedigree, courtroom polish',
        gap: 'Read the technology through an economics lens; concede the parts they cannot open',
      },
      {
        // Acquisition is genuinely their strength and is named as such. This
        // practice analyzes evidence and does not collect it, which is stated
        // here and in the data practice area rather than blurred.
        who: 'Digital-forensics vendors',
        strength: 'Imaging, collection, chain of custody, recovery',
        gap: 'Produce and catalog the evidence; stop short of what it means',
      },
      {
        who: 'Root System',
        strength:
          'Build these systems; state findings as a test the other side can re-run; concede what is uncertain',
        // A stated limit, not a dash. Every other row names a weakness; the one
        // row that named none was the row belonging to the practice whose
        // second pillar is conceding what is genuinely uncertain.
        gap: 'Newer practice — short testimony record, and we do not collect evidence',
        isUs: true,
      },
    ],
  },

  faq: [
    {
      question: 'Your testimony record is short.',
      answer:
        'It is, and we don’t dress it up. The point of stating a finding as a repeatable test is that it does not rest on tenure: opposing counsel can hand it to their own expert and get the same result, which is a better position than asking a jury to weigh two résumés. Under Daubert, a first-principles analysis anyone can replicate is more durable than a veteran’s say-so.',
    },
    {
      // Lauren's question, verbatim in substance, answered where a reader looks
      // for objections. It is also the one place in the body copy where the
      // relationship between AI and the other three areas is stated outright.
      question: 'Do you only take AI cases?',
      answer:
        'No. AI and machine learning is one of four kinds of matter we take, alongside software and source code, data and logs, and software failure. What ties them together is the evidence rather than the subject: in all four the record was written by a machine, and the work is reading it correctly and proving that you did. The representative matter on this site is a file-system and timestamp dispute with no model in it anywhere.',
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
        'Large firms apply technology as a tool inside economics testimony and concede the parts of the system they cannot open. Here the people who build these systems do the analysis themselves. You are paying for the work rather than for a brand markup on a subcontracted version of it.',
    },
    {
      question: 'Aren’t you a hired gun?',
      answer:
        'The method came before the litigation work. Root System builds product for companies that haven’t found a business model yet, where a flattering result that doesn’t repeat is worthless to a founder betting the company on it. Testing honestly is simply how that practice works, and the tests we file come out of the same habit. We concede what’s fair, label what cannot be verified, and hand the other side the steps to check us. The independence is in the deliverable rather than in the promise.',
    },
    {
      question: 'This sounds expensive.',
      answer:
        'An opinion that survives a 702 motion is cheaper than one excluded after the spend. Start with the $2,500 assessment — see the read before you commit to full analysis.',
    },
  ],

  closing: {
    headline: 'Have a matter that turns on what a system actually did?',
    body: 'Start with the fixed-fee assessment. You get a written read on the claim and on what a full engagement would test — before you commit to one.',
    button: 'Scope a case',
  },

  contact: {
    email: 'partners@rootsystem.com',
    footer:
      'Root System Forensics · Expert witness and technical analysis for litigation · Rob Jacques, principal',
    // Published because counsel needs it before they decide to write, not
    // after. One business day rather than 24 hours: the promise has to survive
    // a Friday evening enquiry. It is a commitment, not a nicety -- the intake
    // notification copies a named recipient so it reaches someone who can
    // answer (NOTIFY_CC in wrangler.jsonc).
    responseTime: 'We reply within one business day.',
  },
})

export default copy
