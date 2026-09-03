/**
 * The privacy policy, as data, shared by both properties.
 *
 * One document rather than two. rootsystem.com and forensics.rootsystem.com
 * are one controller writing into one D1 database, so two policies would be
 * two descriptions of the same processing -- and the CCPA disclosure is a
 * description of the business, not of a hostname. The pages that render this
 * live in each site because each site has its own layout and type scale; only
 * the words are shared, and they are shared here rather than duplicated.
 *
 * Adapted 2026-09-03 from the General Legal U.S.-only template in
 * business-growth-projects/legal-templates. Everything in the template that
 * describes machinery this business does not have was cut rather than left
 * hedged: accounts and profiles, social login, interest-based advertising,
 * sweepstakes, chat and AI assistants, a mobile application, public
 * user-generated content. A policy that describes cookies we do not set is
 * not a safer policy; it is an inaccurate one, and inaccuracy is the thing a
 * regulator acts on.
 *
 * What was kept whole is the CCPA/CPRA scaffolding, because California
 * compliance is the governing requirement here: the Notice at Collection
 * pointer, the statutory-category table required by Cal. Civ. Code 1798.140,
 * Shine the Light, opt-out preference signals, authorized agents, verification
 * and non-discrimination.
 *
 * Two statements in here are commitments the code does not yet enforce, and
 * both are marked in the repository rather than only in someone's memory:
 * the 90-day purge of the free-text matter description, and the deletion of
 * a contact enquiry at twelve months. Neither has a job behind it today.
 *
 * The 90-day purge is deliberately unconditional -- no "unless it became an
 * engagement" exception. This database is a lead inbox, not the record of an
 * engagement, and it will not be the only system tracking one. A purge job
 * living here cannot decide what became a matter without a truth it does not
 * hold, so it is not asked to: it deletes on time, and anything that becomes
 * an engagement is carried into the engagement record before then. That is a
 * standing assumption about how intake is worked, and the commitment below
 * depends on it.
 *
 * The conflict record names the domain of the address an enquiry arrives from.
 * It is derived at the endpoint and stored, not asked for on the form: `firm`
 * is optional free text, and a website field would be one more question on a
 * form whose argument is that it is short. See db/migrations/0003. A consumer
 * mailbox yields a domain that identifies a mail provider rather than a firm,
 * which is why the policy says "the domain of the address you write from" and
 * does not call it the firm's domain.
 *
 * The block model is deliberately small -- a paragraph, a list, a definition
 * list, a table. A rich-text pipeline for one document that changes twice a
 * year would cost more than it returns.
 */

export type Block =
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  /** Term-and-definition pairs, for the "we collect X, which means Y" lists. */
  | { kind: 'dl'; items: { term: string; detail: string }[] }
  | { kind: 'table'; caption: string; head: string[]; rows: string[][] }

export type Section = {
  /** Anchor id, also the href used by the on-page index. */
  id: string
  heading: string
  blocks: Block[]
}

/** The address that receives privacy requests. A shared mailbox, on purpose:
 *  a rights request must not depend on one person reading their own inbox. */
export const privacyContact = 'contact@rootsystem.com'

export const entity = 'Root System LLC'

/** Displayed, and used as `dateModified` in the WebPage markup. */
export const effective = '2026-09-03'
export const effectiveLabel = 'September 3, 2026'

export const title = 'Privacy Policy'

export const description =
  'How Root System LLC collects, uses, shares and retains personal information submitted through rootsystem.com and forensics.rootsystem.com, including California privacy rights.'

export const intro: Block[] = [
  {
    kind: 'p',
    text: `Effective as of ${effectiveLabel}.`,
  },
  {
    kind: 'p',
    text: 'California Notice at Collection and State Privacy Rights notice: see the State privacy rights section below for the categories of personal information we collect, the purposes we collect them for, how long we keep them, and the rights you have.',
  },
  {
    kind: 'p',
    text: `${entity} ("Root System", "we", "us" or "our") operates rootsystem.com and forensics.rootsystem.com (together, the "Sites"). Root System Forensics is the technical-analysis and expert-witness practice operated by ${entity}. This Privacy Policy describes how we handle personal information collected through the Sites and through email you send to the addresses published on them.`,
  },
  {
    kind: 'p',
    text: 'The Sites are business-to-business. They are not directed at consumers acting for personal, family or household purposes, and nothing on them is sold to individuals.',
  },
]

export const sections: Section[] = [
  {
    id: 'collect',
    heading: 'Personal information we collect',
    blocks: [
      { kind: 'p', text: 'Information you provide to us.' },
      {
        kind: 'dl',
        items: [
          {
            term: 'Contact data',
            detail:
              'Your name, your email address, and — on the case intake form — the firm or company you are writing on behalf of.',
          },
          {
            term: 'Enquiry content',
            detail:
              'The message you write in the contact form on rootsystem.com.',
          },
          {
            term: 'Case intake data',
            detail:
              'On the intake form at forensics.rootsystem.com: the type of engagement you are asking about, a free-text description of the matter, your timing, and how you heard about the practice.',
          },
          {
            term: 'Email correspondence',
            detail:
              'Anything you send to the addresses published on the Sites, and our replies.',
          },
        ],
      },
      {
        kind: 'p',
        text: 'A note about the free-text fields, because the intake form asks you to describe a live matter. The intake form is a screening step. Submitting it does not create an attorney–client relationship, an expert engagement, or any duty of confidentiality, and the form is not a secure channel. Please do not send privileged material, client-identifying detail, or anything under a protective order through it. A non-disclosure agreement is executed before any confidential material moves; describe the matter at the level you would describe it to someone you had not yet retained.',
      },
      { kind: 'p', text: 'Information collected automatically.' },
      {
        kind: 'dl',
        items: [
          {
            term: 'Device and connection data',
            detail:
              'When you submit a form we record the browser user-agent string and the country our hosting provider derives from your IP address. We do not store your IP address in our own records; our hosting provider logs it as part of delivering and protecting the Sites.',
          },
          {
            term: 'Usage data',
            detail:
              'On forensics.rootsystem.com only, we record a small, fixed set of events: which pages were viewed, whether the rate card was opened, whether an expandable section was opened, and whether the intake form was started and submitted. There is no session recording and no automatic capture of clicks, keystrokes or form contents. rootsystem.com has no analytics of any kind.',
          },
          {
            term: 'Anti-spam data',
            detail:
              'Our forms carry a hidden field that human visitors never fill in and a Cloudflare Turnstile challenge. When a submission is judged automated we record that verdict, the challenge error codes, and a copy of the hidden field truncated to 100 characters, so that we can see what the forms are receiving.',
          },
        ],
      },
    ],
  },

  {
    id: 'tracking',
    heading: 'Cookies and similar technologies',
    blocks: [
      {
        kind: 'p',
        text: 'The Sites set no cookies, and there is no consent banner because there is nothing to consent to.',
      },
      {
        kind: 'p',
        text: 'forensics.rootsystem.com stores one anonymous identifier in your browser’s sessionStorage, which your browser discards when you close the tab. Its only purpose is to join the pages of a single visit together. It does not persist between visits and cannot identify you.',
      },
      {
        kind: 'p',
        text: 'Cloudflare Turnstile, which protects the forms from automated submission, may store data in your browser for that purpose. It is a security control, not an analytics or advertising technology.',
      },
    ],
  },

  {
    id: 'use',
    heading: 'How we use personal information',
    blocks: [
      {
        kind: 'ul',
        items: [
          'To respond to your enquiry, and to reply within the response time the Sites publish.',
          'To run a conflict check, against our record of past enquiries and current engagements.',
          'To scope, price and deliver an engagement, and to administer it.',
          'To operate and secure the Sites, including detecting and blocking automated and abusive submissions.',
          'To understand, in aggregate, how the forensics site is used.',
          'To comply with law, and to establish, exercise or defend legal claims.',
        ],
      },
      {
        kind: 'p',
        text: 'We do not use your personal information for advertising, and we do not use it to train machine-learning models, our own or anyone else’s.',
      },
    ],
  },

  {
    id: 'share',
    heading: 'How we share personal information',
    blocks: [
      {
        kind: 'p',
        text: 'We share personal information with the following categories of recipients, and no others.',
      },
      {
        kind: 'dl',
        items: [
          {
            term: 'Service providers',
            detail:
              'Cloudflare, which hosts the Sites, provides the database in which submissions are stored, and provides bot mitigation; Resend, which delivers the notification email raised by a form submission; and PostHog, which receives the usage events described above from forensics.rootsystem.com only. Each processes personal information on our instructions under contract and is not permitted to use it for its own purposes.',
          },
          {
            term: 'Professional advisers',
            detail:
              'Our own counsel and insurers, where a conflict check, a legal obligation or the defense of a claim requires it.',
          },
          {
            term: 'Authorities and others, for compliance and protection',
            detail:
              'Where we are required to by law or legal process, or where we reasonably believe disclosure is necessary to protect the rights, safety or property of any person.',
          },
          {
            term: 'Business transferees',
            detail:
              'A counterparty and its advisers, in connection with an actual or prospective merger, financing, or sale of all or part of the business.',
          },
        ],
      },
      {
        kind: 'p',
        text: 'We do not sell personal information, and we do not share it for cross-context behavioral advertising, as those terms are defined by the California Consumer Privacy Act and comparable state laws. We have not done so in the twelve months preceding the effective date of this policy.',
      },
    ],
  },

  {
    id: 'retention',
    heading: 'How long we keep personal information',
    blocks: [
      {
        kind: 'dl',
        items: [
          {
            term: 'Case intake — the matter description',
            detail:
              'We delete the free-text description of the matter 90 days after it is submitted. There is no exception to this. Where a matter goes on to become an engagement, the matter record is held in a separate system, not in the one that receives the form.',
          },
          {
            term: 'Case intake — the conflict record',
            detail:
              'We keep your name, email address, the domain of the address you write from, the firm name if you give one, the engagement type and the date for as long as we operate the practice, so that we can check conflicts against new matters.',
          },
          {
            term: 'Engaged matters',
            detail:
              'Where an engagement follows, the records of that engagement are held separately from the intake form and retained for as long as our legal, professional and insurance obligations require, which is longer than any period above.',
          },
          {
            term: 'Contact enquiries',
            detail:
              'Messages sent through the contact form on rootsystem.com are deleted twelve months after they were received, unless they relate to a live matter or engagement.',
          },
          {
            term: 'Submissions judged automated',
            detail:
              'Kept in the form the spam controls recorded them, so the controls themselves can be reviewed, and deleted on the same twelve-month schedule.',
          },
          {
            term: 'Usage data',
            detail:
              'Retained by our analytics provider under its own retention schedule. It is not joined to a form submission and does not identify you.',
          },
        ],
      },
    ],
  },

  {
    id: 'security',
    heading: 'Security',
    blocks: [
      {
        kind: 'p',
        text: 'The Sites are served over HTTPS and submissions are transmitted encrypted. Stored submissions sit in a managed database with access limited to the people who operate the practice. We use technical, organizational and physical safeguards designed to protect personal information, but security risk is inherent in all internet and information technology and we cannot guarantee the security of your information.',
      },
    ],
  },

  {
    id: 'other-sites',
    heading: 'Other sites and services',
    blocks: [
      {
        kind: 'p',
        text: 'The Sites link to services operated by third parties. Those links are not an endorsement, we do not control those services, and this policy does not cover them. Read their privacy policies.',
      },
    ],
  },

  {
    id: 'international',
    heading: 'Where your information is processed',
    blocks: [
      {
        kind: 'p',
        text: `${entity} is based in the United States, and personal information you provide is processed there. Some of our service providers operate infrastructure in other countries, so your information may be processed in a location whose privacy laws differ from those of your own state or country.`,
      },
    ],
  },

  {
    id: 'children',
    heading: 'Children',
    blocks: [
      {
        kind: 'p',
        text: 'The Sites are not intended for anyone under 18, and we do not knowingly collect personal information from children. If you believe we have, contact us at the address below and we will comply with the applicable legal requirement to delete it.',
      },
    ],
  },

  {
    id: 'state-rights',
    heading: 'State privacy rights',
    blocks: [
      {
        kind: 'p',
        text: 'This section applies to residents of U.S. states whose privacy laws apply to us and grant the rights described here (the "State Privacy Laws"). Not every right is available to every resident, and these rights are not absolute — we may decline a request where the law permits.',
      },
      { kind: 'p', text: 'Subject to those limits, you may ask us to:' },
      {
        kind: 'ul',
        items: [
          'Confirm whether we process your personal information, and give you access to it.',
          'Provide a copy in a portable form.',
          'Correct inaccurate personal information.',
          'Delete personal information we hold about you.',
          'Tell you the categories of personal information we collect, the purposes we collect them for, and the categories of third parties we disclose them to. That information is in the table below and in the sections above.',
          'Appeal a decision we make on any of the above, where your state provides an appeal.',
        ],
      },
      {
        kind: 'p',
        text: 'Sale, sharing and targeted advertising. We do not sell your personal information, we do not share it for cross-context behavioral advertising, and we do not use it for targeted advertising. There is accordingly no opt-out to offer you. We recognize the Global Privacy Control ("GPC") as a valid opt-out preference signal; because we do not sell or share, receiving one changes nothing about how we handle your information.',
      },
      {
        kind: 'p',
        text: 'Sensitive personal information. We do not ask for sensitive personal information and do not use any for the purpose of inferring characteristics about you. The intake form has a free-text field, so a submission may contain categories of information we did not request; we treat what arrives there according to this policy and delete it on the schedule above.',
      },
      {
        kind: 'p',
        text: 'Consumers under 16. We have no actual knowledge that we collect, sell or share the personal information of consumers under 16 years of age.',
      },
      {
        kind: 'p',
        text: 'Non-discrimination. You may exercise these rights free from discrimination, as the State Privacy Laws require.',
      },
      {
        kind: 'p',
        text: `Making a request. Email ${privacyContact} with the request you want to make. We do not operate a request webform or a phone line.`,
      },
      {
        kind: 'p',
        text: 'Verifying a request. We will ordinarily verify you by asking you to write from the email address used to submit the form, or by asking for detail that matches a record we hold. We will not ask for government identification unless we cannot verify a request any other way, and we will not use anything you send for verification for any other purpose.',
      },
      {
        kind: 'p',
        text: 'Authorized agents. You may use an authorized agent where your state allows it. We may ask for a copy of a power of attorney, or for your written and signed permission plus direct confirmation from you, before we act on the request.',
      },
      {
        kind: 'table',
        caption:
          'Personal information we collect, use and disclose. Categories are those defined in Cal. Civ. Code § 1798.140. This describes our practices currently and during the twelve months preceding the effective date of this policy. Information you volunteer in a free-text field may contain categories beyond those listed.',
        head: [
          'Personal information we collect',
          'CCPA statutory category',
          'Purposes',
          'Disclosed for a business purpose to',
          'Sold or shared',
        ],
        rows: [
          [
            'Contact data: name, email address, the domain of that address, firm or company',
            'Identifiers; professional or employment-related information',
            'Responding to enquiries; conflict checks; scoping and delivering an engagement; security',
            'Service providers (hosting and database, email delivery); professional advisers',
            'None',
          ],
          [
            'Enquiry and case intake content: your message, engagement type, matter description, timing, referral source',
            'Identifiers; commercial information; and any category you choose to include in a free-text field',
            'Responding to enquiries; conflict checks; scoping and delivering an engagement',
            'Service providers (hosting and database, email delivery); professional advisers where a conflict check or legal obligation requires it',
            'None',
          ],
          [
            'Device and connection data: browser user-agent string, country derived from IP address',
            'Internet or other electronic network activity information; geolocation data, at country level only',
            'Security and spam prevention; distinguishing genuine enquiries from automated ones',
            'Service providers (hosting, bot mitigation)',
            'None',
          ],
          [
            'Usage data from forensics.rootsystem.com: declared page and interaction events, session-scoped anonymous identifier',
            'Internet or other electronic network activity information',
            'Measuring how the site is used',
            'Service provider (product analytics)',
            'None',
          ],
        ],
      },
      {
        kind: 'p',
        text: `Shine the Light. California Civil Code § 1798.83 lets California residents ask whether a business has disclosed their personal information to third parties for those third parties’ own direct marketing. We do not make such disclosures. If you would like that confirmed in writing, email ${privacyContact} with the subject line "Shine the Light Request", your first and last name, your mailing address, and a statement that you are a California resident.`,
      },
    ],
  },

  {
    id: 'changes',
    heading: 'Changes to this policy',
    blocks: [
      {
        kind: 'p',
        text: 'We may modify this Privacy Policy. If we make a material change we will update the effective date above and post the revised policy here. Your use of the Sites after that date indicates that the revised policy applies.',
      },
    ],
  },

  {
    id: 'contact',
    heading: 'How to contact us',
    blocks: [
      {
        kind: 'p',
        text: `${entity} — ${privacyContact}. Write to that address for a privacy request, a question about this policy, or a correction to anything in it.`,
      },
    ],
  },
]
