import { landingSchema, type Landing } from './schema'

/**
 * Forensics landing copy, transcribed from the GTM copy deck
 * (Forensics-Expert-Witness-GTM/landing-copy.md, draft-v1 2026-07-17).
 *
 * The deck is explicit that the hero and closing are scaffolding pending a
 * rewrite in Rob's voice, and that the rewrite gates publication. Those two
 * blocks carry `draft: true`, which fails production builds until they are
 * rewritten. Everything else is transcribed as written.
 *
 * Deliberately NOT included here: the service one-pager, referral one-pager,
 * and directory bio from the deck. Those are print and outreach collateral,
 * not site content.
 */
const copy: Landing = landingSchema.parse({
  meta: {
    title: 'Root System — AI & Machine-Learning Dispute Analysis | Expert Witness',
    description:
      'Reproducible AI/ML expert analysis for litigation — every opinion is a query the other side can re-run. Built by someone who builds these systems.',
  },

  hero: {
    // SCAFFOLDING — awaiting own-voice rewrite. Tagline not yet chosen; the
    // deck offers three, with the bank in messaging-worksheet.md section 5:
    //   1. "We show our work." (paired sub carries the rest)
    //   2. "The expert on what your AI did — built by someone who builds them."
    //   3. "When the dispute is what the model actually did."
    draft: true,
    eyebrow: 'AI & Machine-Learning Dispute Analysis',
    headline: 'We show our work.',
    subhead:
      'Technical analysis of what an AI or machine-learning system actually did — how it was built, what data it used, whether it performed as claimed. Every opinion is a query the other side can re-run, proved with a controlled experiment, not an assertion.',
    proof:
      'A genuine bulk copy of 9,000 files smears its access timestamps across hundreds of seconds. The opposing exhibit clustered thousands of files into a single second — a batch process, not a human copy. Same data; the shape tells the truth.',
    cta: 'Scope a case',
  },

  positioning: {
    body: 'When a matter turns on what an AI/ML system, its training data, or an algorithm actually did, most experts can offer one half of what you need: academics who study models but don’t ship them, economic consultancies who read AI through an economics lens and concede the black box, or digital-forensics vendors who recover bytes but don’t interpret model behavior. Root System is the practitioner who builds these systems and runs the reproducible experiment that makes an opinion hold up under cross-examination.',
  },

  pillars: [
    {
      title: 'Reproducible, not assertive.',
      body: 'Findings are a query plus its output — re-runnable by opposing counsel. Not "trust me."',
    },
    {
      title: 'Even-handed.',
      body: 'We concede what’s genuinely uncertain and label the unknown unverifiable, not false. It’s what separates an expert from a hired gun — and what survives cross.',
    },
    {
      title: 'Depth in machine-generated evidence.',
      body: 'Timestamp-shape, file-system semantics, at-scale artifacts — where a forensics checklist stops, the real question starts.',
    },
    {
      title: 'Cross-document rigor.',
      body: 'We diff an opponent’s own successive filings for dropped caveats and silent overstatements — a technique most vendors don’t perform.',
    },
    {
      title: 'Built by a builder.',
      body: 'Disputes over what AI/ML systems did, argued by the practitioner who ships them — a credential the market is short on.',
    },
  ],

  caseStudy: {
    label: 'Representative matter · anonymized',
    headline:
      'A mass-copying claim, refuted with an experiment the other side could re-run.',
    body: [
      'An opposing digital-forensics expert filed a declaration asserting that tens of thousands of files had been "accessed in rapid succession" — evidence, he said, of mass copying. We did not argue the unfalsifiable "a copy leaves no trace." We characterized the file system’s actual timestamp policy, then measured a real bulk copy on like media. A genuine sequential copy smears its access timestamps across hundreds of seconds; the opposing exhibit clustered thousands of files into a handful of seconds — the signature of an automatic batch process, not a human copy. The distribution’s shape was the discriminator, and we conceded openly what was fair: copying is not timestamp-silent.',
      'Then we impeached the expert on his own record. His earlier declaration, on the same numbers, had carried qualifiers — that grouped accesses "can be caused by copying, searching, and other automated processes." The later federal declaration dropped them while the numbers stayed identical. Same data, stronger claim, deleted caveats.',
    ],
    pullQuote: 'The matter settled.',
  },

  services: {
    label: 'How we work',
    intro: 'Four modes, one on-ramp.',
    modes: [
      {
        title: 'Opposing-expert rebuttal.',
        body: 'Refute a technical declaration with a reproducible counter-experiment and cross-document impeachment.',
      },
      {
        title: 'Affirmative analysis & testimony.',
        body: 'Establish, provably, what a system, corpus, or algorithm did.',
      },
      {
        title: 'Consulting (non-testifying).',
        body: 'Behind-the-scenes analysis, case strategy, vetting the other side’s expert — work-product protected.',
      },
      {
        title: 'Early-case assessment.',
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
        body: 'A fixed-fee, fixed-scope read: a reproducible-experiment analysis and a written assessment of the claim and its strength. Predictable cost, defined deliverable. If the matter proceeds to a full engagement, the assessment fee is credited.',
      },
      {
        name: 'Full Engagement',
        price: '$400/hr',
        body: 'Retainer plus hourly for a live matter through analysis, expert report, and testimony. Expedited turnaround and deposition/trial testimony are billed at a premium; large or long-running matters are eligible for volume rates.',
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
        gap: '—',
        isUs: true,
      },
    ],
  },

  faq: [
    {
      question: 'You’ve testified once.',
      answer:
        'A reproducible opinion doesn’t rest on tenure. Every finding is a query the other side can re-run — it’s defensible on its own terms, not on reputation. A first-principles, reproducible analysis is more durable under Daubert than a veteran’s say-so.',
    },
    {
      question: 'Why not a big-name firm or lab?',
      answer:
        'Big firms apply AI as a tool inside economics testimony and concede the interpretability problem. This is the practitioner who builds the systems, delivering the experiment itself — not a brand markup on a subcontracted analysis.',
    },
    {
      question: 'Aren’t you a hired gun?',
      answer:
        'The method is the answer. We concede what’s fair, label the uncertain unverifiable, and hand the other side a query they can re-run. Independence is built into the deliverable.',
    },
    {
      question: 'This sounds expensive.',
      answer:
        'A reproducible opinion that survives a 702 motion is cheaper than one excluded. Start with the $2,500 assessment — see the read before you commit to full analysis.',
    },
  ],

  closing: {
    // SCAFFOLDING — awaiting own-voice rewrite.
    draft: true,
    headline: 'Have a matter that turns on what a model did?',
    body: 'Start with a fixed-fee assessment. You’ll get a reproducible read on the claim and what a full engagement would test — before you commit.',
    button: 'Scope a case',
  },

  contact: {
    email: 'partners@rootsystem.com',
    footer: 'Root System · Forensic & expert-witness services',
  },
})

export default copy
