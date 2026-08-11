# Product Marketing Context

**Document version:** v7
**Last updated:** 2026-08-11

Scope: the Root System Forensics property (`forensics.rootsystem.com`, source at
`sites/forensics/`). The parent consultancy at `rootsystem.com` is a different
buyer and is out of scope for this document except where the brand is shared.

Items marked **[INFERRED]** were drafted from the codebase, specs, and copy deck
rather than stated by Rob. They are the first things to correct.

Primary sources outside this repo: the `Forensics-Expert-Witness-GTM` folder in
Rob's Obsidian vault (Dropbox) — `offering-scope.md`, `rate-card.md`,
`icp-target-list.md`, `messaging-worksheet.md`, `market-landscape.md`,
`landing-copy.md`. Tracked in Linear under project *Forensics and Expert Witness
Services* (ROBOPS).

## Product Overview

**One-liner:** We establish what a system actually did — and show the other side
how to check it.

**What it does:** Technical analysis of what happened inside software, for
litigation. Whose code is whose; what the timestamps, logs, and metadata
support; how a model was built and what data went into it; why a system failed.
Findings are stated as a test the other side can run and repeat — the inputs,
the steps, the output — rather than as expert assertion. Delivered as rebuttal,
affirmative analysis and testimony, non-testifying consulting, or an early-case
merits screen.

**The unifying claim is the evidence, not the subject matter.** Everything this
practice examines was written by a machine: source code and its revision
history, access and event logs, timestamps, file systems, model output,
telemetry. Reading that record correctly and proving that you read it correctly
is one competence, not four. The four practice areas below are the concrete
answer to "what kinds of matter," not four separate specialties.

**Product category:** Expert witness / litigation support, technical and
software specialty. The "shelf" is expert-witness directories (JurisPro, SEAK)
and attorney referral networks, not software categories.

Scope is product and technology across four practice areas, of which AI/ML is
one. See **Practice areas** below and the scope reversal recorded in
**The Bench**.

**Product type:** Professional services, delivered by a Root System practice
group — a bench of roughly a dozen experts assembled per matter, not a single
practitioner. The "we" throughout the site copy is literal. See **The bench**
below.

Closed as of the 2026-08-11 rewrite. The lines that still read as a
single-practitioner practice ("the practitioner who builds these systems," the
"Built by a builder" pillar) are gone; the fifth pillar is now "We build this
software for a living" and names the bench, and Rob remains the named lead on
every matter rather than the whole practice.

**Business model:** Fixed-fee on-ramp into hourly engagement.

| Tier | Price | What it is |
|---|---|---|
| Case Assessment | $2,500 flat, up to 10 hours | Fixed-scope analysis plus a written read on the claim and how strong it is. Credited against a full engagement. Renamed from "AI-Dispute Assessment" 2026-08-11 — the tier was never AI-only, and the old name turned away three of the four practice areas at the exact point a reader is deciding. |
| Full Engagement | $450/hr plus retainer | Live matter through analysis, expert report, and testimony. Expedited turnaround and deposition/trial testimony billed at a premium; large or long-running matters eligible for volume rates. |

Rate modifiers, published on `/engagements` as of 2026-08-09. They apply to the
hours they cover, not to the whole engagement.

| When | Adjustment | Rate |
|---|---|---|
| Expedited turnaround | +50% | $675/hr |
| Deposition and trial testimony | +25% | $563/hr |

**They do not stack — the higher rate governs those hours** (Rob, 2026-08-09,
closing the open item in the rate card).

Publishing pricing at all is a deliberate divergence: the competitive scan found
none of the four closest comparables publishes rates.

**Rate benchmark (2026-08-19).** The base moved from $400 to $450 against the
ExpertPages 2026 survey, which puts the all-specialty average expert hourly fee
at $465, up from $451 in 2024, with a reported range from under $200 to over
$1,500 and engineering and finance experts typically $300–600. Because this
practice publishes its rates and the comparables do not, a below-average number
is a public signal rather than a negotiating position, and raising a published
rate later is harder than starting at market and conceding privately — which is
what the held-back volume adjustment already exists to do. $450 sits inside the
engineering band without claiming a premium the testimony record cannot yet
carry; the ladder toward $700 still runs off accrued testimony.

Note the arithmetic: +25% of $450 is $562.50, published as $563. If a rounder
card is wanted, a $440 base yields exactly $660 and $550 at the same
percentages. Open item for Rob.

**Assessment benchmark (2026-08-19).** The same survey reports 74% of experts
require a minimum fee to accept an engagement, and 40% of those set it between
$2,500 and $4,999. The $2,500 assessment therefore sits on the modal
minimum-fee floor and does not read as distinctive on the number alone. The
differentiator is the fixed scope and the written deliverable, and the copy now
states that against what the market does with the same figure rather than
leaving the reader to infer it.

**Held back deliberately — do not put these in public copy.**

- **The volume adjustment** (−25%, $300/hr, large scope or long time horizon).
  It exists, but publishing a discount invites every enquiry to argue it
  qualifies. Handled in conversation against an internal bar for "long horizon"
  that is not yet written down. The page says such matters are quoted against a
  volume rate and invites the ask, without naming the number.
- **That the base rate is negotiable early.** List price is what is held
  publicly.
- **The assessment's effective hourly** (~$250) and its role as a budget-fit
  front door rather than the margin engine.
- **The rate ladder** toward $450–$700+ as testimony history accrues.

The Tier-2 retainer amount is still unset in the rate card and appears nowhere
public, which is consistent — the site says "retainer plus hourly" and stops.

## The Bench

About a dozen experts, drawn from the consultancy's fractional-executive
practice. Presented as a bench rather than as named profiles — individual expert
pages are the later move if a niche justifies them.

**Fractional CTOs:** computer science, machine-learning architecture,
experimentation and research, information security, distributed systems.

**Fractional CPOs:** usability and user experience, product strategy, user
research, product analytics and experimentation, product operations and
delivery, growth and monetization.

**Where the method comes from.** The consultancy builds product for companies
that have no established business model yet. That work makes experimentation and
analytical data collection a first-class outcome rather than a reporting
afterthought — a business model cannot be found by assertion. The
reproducible-experiment method sold to litigators is the same discipline these
teams run daily for startup leaders, not a technique invented for court. This is
the strongest available answer to "aren't you a hired gun," and it is currently
absent from the site.

**How a matter is staffed.** Rob is on every matter: he runs the intake, sets
the strategic approach, assembles the team to meet it, stays with the work, and
participates technically as one of the experts. Experts are brought in against
the approach rather than assigned off a rota. The intake process itself — learn
the situation, determine the strategic approach, then staff it — is a described
process no comparable publishes.

**Testimony.** Most of the bench will agree to testify where a matter requires
it, at a premium. Testimony volume is thin across the practice and is
deliberately not a selling point — the expertise is the claim, not the mileage.

**What the bench buys counsel:** a cross-functional read. A dispute over what a
system did rarely stays inside one discipline — it touches how the system was
architected, what data it collected, how the product presented itself to users,
and what the metrics were defined to mean. A single expert covers one of those.
The whole team collaborates on strategic approach, covering the ways technology
is built, implemented, and used, with the same focus on deterministic evidence
and outcomes.

**How the bench is presented (2026-08-11).** The discipline lists on `/method`
used to be raw engineering and product nouns — "distributed systems," "product
analytics and experimentation." To a legal reader that is a résumé dump that
needs translating before it means anything. The same bench and the same
disciplines are now listed as the questions each one answers ("How systems are
designed, and how they fail"; "What the numbers on a dashboard were defined to
mean"). Nothing was dropped; the list was rewritten into the reader's frame.

**Scope decision (2026-08-11) — reverses v4.** The practice takes four
technical practice areas, of which AI/ML is one. AI/ML no longer leads the
category claim, the hero, or the site's own framing of itself; the site leads
with the job and the deliverable instead, and names the four areas as the plain
answer to "what kinds of matter."

The source is a paralegal on a target litigation team reviewing the site, who
wrote, verbatim:

> "I really like the expert witness website so far one question - are you
> limiting yourself by putting AI right at the forefront there's probably a lot
> of other cases you might exclude if they read that as you only work on AI
> machine learning matters
> And I think the four modes one on ramp should be closer to the first thing
> your eye reads
> Exactly what you're offering not bogged down by tech speak
> And then when you feel it's ready we should have Mike look at it from a
> lawyers perspective"

Rob's reply, verbatim:

> "Yeah I'll take that critique on the AI focus, it's clearly the right
> direction long term but it is limiting early, I'm working on a copy set where
> AI is one pillar amongst more traditional forensic work."

Two decisions fall out of that, both binding as of 2026-08-11:

1. **Four practice areas, all in scope** (Rob). Listed below.
2. **All four engagement modes apply to all four practice areas equally.**
   Testimony is not caveated by area. A reader must not come away thinking the
   practice testifies on AI and only consults on the rest.

The v4 decision — "stay on product and technology with AI/ML as the lead pillar
… no second practice area" — is superseded. The reasoning behind v4 was not
wrong about the long term; it was wrong about the cost early, when the referral
network is thin and every excluded matter is a matter the practice cannot afford
to exclude.

## Practice areas

Four, in the order they appear on the site. The array order is the emphasis, so
this order is a decision rather than a listing: the most common and most quickly
recognized technical dispute leads, the data area follows it because the one
representative matter is a data matter (claim and proof adjacent), AI sits third
where it is visibly one of four rather than the headline or the afterthought,
and the contract-flavored area closes.

| Area | What it covers | Example matter types (kinds of dispute, **not** matters handled) |
|---|---|---|
| Software and source code | Source-code comparison in trade-secret and IP matters, patent/infringement technical read, code provenance and authorship | Trade-secret misappropriation; copyright and patent infringement; code authorship and provenance |
| Data, logs, and metadata | ESI and metadata, timestamp and log analysis, file-system semantics, breach and security-incident reconstruction | Metadata and timestamp disputes; data exfiltration and improper access; breach and incident reconstruction |
| AI and machine learning | How a model was built, what data it used, whether it performed as claimed | Training-data and model-provenance claims; automated decisions and disparate impact; representations about what a product's AI can do |
| Software failure and performance | Defect and root-cause analysis, outage/SLA and contract-performance disputes, capacity and scaling failures | Failed implementation and delivery disputes; outage and service-level claims; product defect and root cause |

The second area is named "Data, logs, and metadata" on the site rather than
"data and systems forensics." Two reasons, and both matter: it is plainer, and
the word *forensics* in an area name pulls toward imaging and collection, which
this practice does not do. See the acquisition line under **Differentiation**.

## Target Audience

**Target companies:** US litigators and IP/technology counsel handling disputes
that turn on what happened inside software — whose code is whose, what the
records show, how a model was built, why a system failed.

**Horizontal by decision, not by default.** Four practice areas, one method, no
single vertical. Named subfoci emerge later from customer-call data rather than
being picked up front; staying horizontal keeps referral doors open while the
network is thin. As of 2026-08-11 that horizontality is wider than it was —
the three non-AI areas were previously out of the category claim.

Densest demand, from the docket and firm-page research in the GTM workspace
(~40 verified firm rows, compiled 2026-07-16):

| Vein | Why it fits | Who |
|---|---|---|
| Plaintiff GenAI copyright / training data | Must prove how a model was built and what it ingested — exactly this lane. The single richest vein. | Joseph Saveri, Susman Godfrey lead most active training-data cases |
| Plaintiff AV / driver-assist wrongful death | Turns on telemetry, perception, and decision-system forensics | Singleton Schreiber; copycat wave after the Benavides v. Tesla Autopilot verdict |
| Algorithmic-hiring class actions | In live discovery now, needs affirmative ML and statistics experts; small plaintiff firms most likely to source an outside expert | Mobley v. Workday, Huskey v. State Farm |
| AI-washing securities plaintiff firms | Cleanest cold channel — their playbook already pairs ex-engineers with ML experts to survive motions to dismiss | Hagens Berman, Pomerantz, Rosen |

Defense-side buyers are equally identified (Latham, MoFo, Keker, Orrick,
Crowell) and are the denser spend, but the plaintiff boutiques are the more
reachable first sale for a practice with a thin referral network.

Directories are the discoverability floor, not demand. The credibility flywheel
named in the research is Sedona WG13 → PLI faculty → ABA SciTech → IAPP AIGP.

**Decision-makers:** The retaining attorney — lead trial counsel or the partner
running the matter. **[INFERRED — the target list names attorneys of record, but
nothing confirms who inside a firm actually selects the expert.]**

**Primary use case:** A technical declaration is on file (theirs or ours) and
counsel needs an opinion that survives Daubert and cross-examination.

**Jobs to be done:**
- Refute an opposing expert's technical declaration with something stronger than
  a competing assertion.
- Establish provably what a system, codebase, or dataset did.
- Decide, before committing budget, whether there is a technical claim at all
  and how strong it is.

**Use cases** (the four service modes, verbatim from the site):
- Opposing-expert rebuttal — the counter-test plus cross-document impeachment.
- Affirmative analysis & testimony.
- Consulting (non-testifying) — case strategy, which tests are worth running,
  and a read on the other side's expert; work-product protected.
- Early-case assessment — a merits screen before commitment.

These four are also the options in the `/scope` intake dropdown, plus "Not sure
yet." **All four apply to all four practice areas** (Rob, 2026-08-11) — do not
caveat testimony by area in any copy.

**Entry paths** (established in the IA brainstorm, and the reason the site is
structured as it is): referral or warm intro, expert-witness directory bio, and
organic search. Deliberately **not** outbound collateral. The root page has to
be self-sufficient for a referral reader who scans and never clicks, while
search needs distinct URLs with their own titles.

One finding qualifies the directory path: JurisPro does not link out to experts'
own sites — profiles stay on the directory domain as 50–80 word blurbs. If that
generalizes, a directory reader must search the name separately, which shifts
weight onto organic search.

## Personas

**[INFERRED throughout — no attorney discovery interviews have been run yet.
The IA spec notes they were to run in parallel with the build. This table is a
hypothesis to test, not a finding.]**

| Persona | Cares about | Challenge | Value we promise |
|---|---|---|---|
| Retaining attorney (champion + decision maker) | Whether the opinion survives a 702 motion and cross | Has to bet the technical theory of the case on someone they cannot themselves evaluate | An opinion the other side can re-run and still not break |
| Associate / referral source | Not recommending someone who embarrasses the partner | Screening an unfamiliar expert from a directory blurb | A method visible on the page before any call |
| Client (financial buyer) | Cost predictability | Open-ended expert spend on an uncertain claim | $2,500 fixed-fee, fixed-scope read, credited if it proceeds |
| Opposing counsel (adversary, not buyer) | Finding the soft spot | — | Conceded uncertainty removes the easy attack |

## Problems & Pain Points

**Core problem:** When a matter turns on what happened inside software, the
available experts each offer half of what counsel needs. Academics study these
systems but do not build or run one. Economic consultancies read technology
through an economics lens and concede the parts they cannot open.
Digital-forensics vendors produce and catalog the evidence but stop short of
what it means.

A second problem sits underneath that one and is specific to this buyer:
**counsel screening an expert usually cannot evaluate the technical claims on
the page.** A site written in engineering vocabulary asks a non-technical reader
to take the competence on faith at the exact moment they are trying to assess
it. That is what Lauren's "not bogged down by tech speak" note is really about,
and it is why plain language is treated here as positioning rather than polish.

**Why alternatives fall short:**
- An assertion-based opinion ("in my experience, this indicates copying") is
  attackable precisely because it cannot be reproduced.
- Conceding the parts of the system you cannot open concedes the case's central
  technical question.
- A checklist stops at the file, where the question usually starts — the shape
  of a timestamp distribution rather than its count, what a file system writes
  on a read versus on a copy, output that moves run to run unless the model's
  settings are pinned, behavior that only appears once a job is large enough.

**What it costs them:** An excluded expert. A 702 motion lost on methodology
rather than on merits, after the expert spend is already sunk.

**Emotional tension:** Counsel has to vouch for a technical theory they cannot
independently verify, against an adversary who will look for exactly the seam
between what the expert asserted and what the expert can show.

## Competitive Landscape

**Direct** — software and technology expert-witness providers. Closest
comparables scanned 2026-08-08: Barr Group, Quandary Peak, Eureka Software,
Sidespin Group. All are multi-page firms with per-expertise-area landing pages,
the smallest around fifteen pages; none publishes pricing. One qualification:
their page counts are driven by per-area SEO rather than argument structure.
These are the right comparable set — Root System Forensics is likewise a
multi-expert practice, and the differences that matter are the re-runnable
method, the stated limits, and published pricing rather than headcount.

The v7 reversal moves this practice *closer* to these four rather than further
from them: source-code comparison and software-failure work are what Quandary
Peak and Eureka sell. That is the honest cost of the reversal — it trades a
sparse niche for a populated one — and it is offset by the fact that a sparse
niche the practice cannot fill is worth nothing. Their per-area landing pages
are also the SEO pattern this property does not have and will eventually need.

**Secondary** — adjacent expert types solving the same problem differently. From
the site's own contrast table:

| Who | Their strength | Where they fall short |
|---|---|---|
| Academic experts | Publications, credentials that read well under Daubert | Study these systems; rarely build or run one |
| Economic consultancies | Deep testimony pedigree, courtroom polish | Read the technology through an economics lens; concede the parts they cannot open |
| Digital-forensics vendors | Imaging, collection, chain of custody, recovery | Produce and catalog the evidence; stop short of what it means |
| Root System | Build these systems; state findings as a test the other side can re-run; concede what is uncertain | Newer practice — short testimony record, **and we do not collect evidence** |

The Root System row must always name a real limit. Every other row names a gap;
a dash there refutes the practice's own second pillar. As of 2026-08-11 it names
two, and the second one is load-bearing: the acquisition boundary is stated in
the comparison table itself rather than left for a reader to discover after
retaining.

**Indirect** — retaining no expert and arguing the technical point through fact
witnesses or the client's own engineers. Cheaper and faster; carries no
independence and no Daubert standing. **[INFERRED]**

## Differentiation

**Key differentiators** (the five pillars). Retitled 2026-08-11 as plain
sentences — the previous titles were nouns that described the method to someone
who already had it. The substance is unchanged and the engineering detail those
titles carried moved into the `/method` long forms.

1. **Findings you can re-run.** Every conclusion comes with the steps that
   produced it, so the other side can repeat them and see the same thing.
2. **We say what we cannot prove.** Where the evidence is genuinely uncertain,
   the report says so before the other side gets the chance to.
3. **We read what the machine wrote.** Timestamps, logs, code history, file
   systems, model output — the records systems keep about themselves without
   meaning to.
4. **We read their filings against each other.** A declaration that quietly
   gets stronger between filings is impeachable on its own record.
5. **We build this software for a living.** The people writing the opinion ship
   these systems the rest of the week.

**Why that's better:** Re-runnability relocates the opinion's authority from the
expert's résumé to the evidence itself. It is the direct answer to the practice's
thinnest credential (limited testimony history) and to its most likely attack
(hired gun).

**The acquisition boundary — a hard line, not a nuance.** This bench is
fractional CTOs and CPOs. They *analyze* ESI, metadata, logs, file systems and
code. They do **not** do forensic imaging, evidence collection, chain of
custody, or data recovery. That work belongs to the digital-forensics vendors in
the contrast table and it is genuinely their strength. Plain language raises the
risk of blurring this line — "we read what the machine wrote" is one careless
sentence away from sounding like a full-service forensics shop — so the boundary
is stated outright in two customer-facing places (the data practice area and the
Root System row of the contrast table) rather than implied.

**Not yet used as differentiators, in priority order:**

1. **The method's provenance.** The same experimentation discipline is run daily
   for startups with no business model yet, where analytical data collection is
   the product outcome. Reproducibility is how the practice already works, not a
   posture adopted for litigation. This is a stronger answer to "hired gun" than
   the one the FAQ currently gives.
2. **A cross-functional bench.** A dozen experts across architecture, ML,
   security, distributed systems, and the product disciplines — assembled against
   a matter's strategy rather than one person's calendar. Disputes over what a
   system did cross discipline boundaries; a single expert does not.
3. **A described intake process.** Learn the matter, set the strategic approach,
   then staff it. No comparable publishes how it decides what to do.

Rob's role is the connective tissue and should not be diluted: one accountable
expert on every matter, running intake and strategy and doing technical work,
with a bench behind him. A bench without a named lead reads as a vendor pool.

## Objections

Verbatim from the site FAQ — these are the four the practice has chosen to
answer in public.

| Objection | Response |
|---|---|
| "Your testimony record is short." | It is, and we don't dress it up. A finding stated as a repeatable test does not rest on tenure — opposing counsel can hand it to their own expert and get the same result, which beats asking a jury to weigh two résumés. |
| **"Do you only take AI cases?"** *(added v7 — Lauren's question, and the reason for the reversal)* | No. AI/ML is one of four kinds of matter, alongside software and source code, data and logs, and software failure. What ties them together is the evidence rather than the subject. The representative matter on the site is a file-system and timestamp dispute with no model in it anywhere. |
| "Why not a big-name firm or lab?" | Large firms apply technology as a tool inside economics testimony and concede the parts of the system they cannot open. Here the people who build these systems do the analysis themselves — not a brand markup on a subcontracted version of it. |
| "Aren't you a hired gun?" | The method came before the litigation work. We concede what's fair, label what cannot be verified, and hand the other side the steps to check us. The independence is in the deliverable rather than in the promise. |
| "This sounds expensive." | An opinion that survives a 702 motion is cheaper than one excluded after the spend. Start with the $2,500 assessment. |

**Anti-persona:** counsel who wants a predetermined conclusion (the
even-handedness pillar actively repels them, by design); matters needing
**evidence acquisition** — imaging, collection, recovery, chain of custody —
which this practice does not perform at all and refers out; and matters too
small to carry a $450/hr expert. **[INFERRED, except the acquisition line, which
is a stated capability limit.]**

**No longer an anti-persona, as of 2026-08-11:** conventional non-AI technical
matters. Source-code comparison, timestamp and metadata disputes, and
software-failure work are now first-class practice areas, not out of scope. Only
*acquisition-only* forensics work remains an anti-persona, and the distinction
matters: a matter needing both collection and interpretation is a matter to take
alongside a collection vendor, not one to decline.

## Switching Dynamics

**[INFERRED — the four forces below are reasoned from the copy, not from
interviews.]**

**Push:** An opposing declaration that asserts more than it shows, and no
in-house way to test it. Or a prior expert whose methodology drew a 702
challenge.

**Pull:** A method visible before the first call, a fixed-fee way to see the
read before committing, and published rates in a market that hides them. Added
at v7: the page is legible to the non-technical person who screens the expert
before the partner ever sees the name — which, per Lauren's review, is often who
actually reads it first.

**Habit:** Counsel retains the expert their firm has always retained, or the one
their opponent's expert came from. Expert selection is relationship-driven and
the switching cost is reputational.

**Anxiety:** An unfamiliar name that opposing counsel will attack on experience
rather than on method. This is the practice's central adoption risk and the FAQ
leads with it. Testimony history does not blunt it — there is not much across the
bench. What does is the method's provenance and the breadth of expertise behind
it, both of which the site now presents (the "hired gun" FAQ answer and the
bench block on `/method`).

## Customer Language

**How they describe the problem:** *no verbatim data.* Attorney discovery
interviews have not been run. Everything currently on the site is written in
Rob's framing, not in a buyer's words. **This is the largest gap in this
document** — verbatim language is what would let downstream copy skills write
in-market rather than in-house.

**How they describe us:** *no verbatim data.*

**Words to use:** re-run, repeat the test, the steps that produced it, conceded
/ concede, even-handed, holds up under cross, Daubert, 702, declaration,
impeachment, deposition, work-product, matter, engagement, scope a case. Plain
verbs for the work itself: read, measure, establish, show, check.

**Words to avoid:** cutting-edge, AI-powered, revolutionary, leverage,
game-changing, seamless, and anything that would read as marketing to a
litigator. Also avoid "guarantee," "prove conclusively," or any claim to
certainty the method itself would concede — overclaiming is the exact failure
mode the even-handedness pillar sells against. Avoid "client" for the attorney;
they are counsel, and their client is someone else.

Dropped from the "use" list at v7 because they are engineering vocabulary in a
customer-facing position: *reproducible experiment*, *query and its output*,
*empirically validate*, *distribution*, *discriminator*, *stochastic data
collection*. The ideas survive in plain form — "a test the other side can
re-run," "the steps that produced it," "the shape of the distribution" where the
shape *is* the finding. The technical terms still belong in the `/method` and
`/matters` long forms, where a reader has chosen to go deeper.

**Glossary:**

| Term | Meaning |
|---|---|
| Daubert / 702 | The federal standard and rule governing admissibility of expert testimony. Exclusion is the risk the whole method sells against. |
| Re-runnable finding | A finding stated as steps plus the result they produce, so the opposing side can repeat it. Called a "reproducible experiment" internally; say it the plain way in public. |
| Cross-document rigor | Diffing an opponent's successive filings for dropped caveats and silent overstatements |
| Timestamp shape | The distribution of access timestamps; its shape distinguishes a human copy from a batch process |
| Assessment | The $2,500 fixed-fee, ≤10-hour engagement |
| Matter | A single litigation engagement |
| Scope a case | The site's conversion action — the `/scope` intake form |

## Brand Voice

**Tone:** Evidentiary and understated. Claims are stated flatly and immediately
substantiated; nothing is amplified. The site concedes its own weaknesses in
public (one testimony; "copying is not timestamp-silent") because the concession
is the credibility mechanism.

**Style:** Direct, plain, specific. Concrete numbers over adjectives — "9,000
files spread across hundreds of seconds" rather than "extensive analysis." The
visual direction is "Show Your Work" (direction A).

**Personality:** rigorous, even-handed, concrete, practitioner, unshowy.

### The jargon rule (v7 — this changed materially)

Plain language is positioning here, not a polish pass, and the rule has two
halves that are easy to collapse into one and must not be:

1. **Terms of art a litigator genuinely uses stay.** Daubert, 702, declaration,
   impeachment, cross, deposition, work-product, matter, counsel. That is the
   reader's own vocabulary. Stripping it would read as talking down to them, and
   would cost the credibility that using it correctly buys.
2. **Engineering vocabulary is banned from customer-facing positions.** The
   hero, the practice-area summaries, the pillar summaries, the mode summaries,
   the pricing tier names, the root page generally. Model temperature,
   stochastic data collection, distributed systems, at-scale artifacts,
   production scale, discriminator. These move down into the `/method` and
   `/matters` long forms — where the reader has chosen to go deeper and the term
   can be earned in context — or they go.

Plain does **not** mean soft or salesy. The register stays flat and evidentiary.
The test to apply is whether a paralegal screening experts could read the line
once, at speed, and correctly say what is being offered — not whether the line
is friendly.

**Voice caveat, now closed.** The hero and closing blocks were transcribed from
the GTM copy deck as scaffolding pending a rewrite in Rob's voice; the schema's
build-time publish gate (`assertPublishable`) fails a production build while
either is marked draft. Both were rewritten on 2026-08-11 and both read
`draft: false` honestly now. The hero and closing lines quoted in this document
are the shipped ones.

## Proof Points

**Metrics:** none published. No case count, no win rate, no client list. The
practice is early and the site does not pretend otherwise.

**Customers:** none named. The one matter is anonymized as "Representative
matter · anonymized."

**Testimonials:** none. The site makes no outcome claim at all. The pull quote
from the representative matter states the finding rather than a result:

> "Same data. The shape tells the truth."

("The matter settled" was the earlier line and was removed — settlement is not
attributable to the work, and a litigator knows that better than anyone.)

**Value themes:**

| Theme | Proof |
|---|---|
| A test beats an assertion | The mass-copying rebuttal: a genuine bulk copy of 9,000 files spreads its access timestamps across hundreds of seconds; the opposing exhibit packed thousands into a handful — an automated process, not a person. Same data; the shape tells them apart. |
| Cross-document rigor is real, not a slogan | The opposing expert's earlier declaration carried qualifiers ("can be caused by copying, searching, and other automated processes") that the later federal declaration dropped, on identical numbers. |
| Even-handedness is in the deliverable | The same rebuttal openly conceded that copying is not timestamp-silent. |
| Practitioner, not observer | Root System builds and evaluates these systems in its own products; the same discipline produces the litigation tests. |

**The one matter carries the whole v7 thesis, and should be used hard.** It is a
file-system and timestamp dispute with no model in it anywhere, which is the
cleanest available demonstration that (a) the practice is not AI-only, and (b) a
finding can be explained to a non-technical reader in three sentences and still
be the thing that decides the question. It is the proof for the plain-language
claim as much as for the method claim.

**Weakest point, stated plainly:** one representative matter and no third-party
validation of any kind. Every proof point above is self-reported.

Testimony history is thin across the whole bench and is deliberately not
advertised. Do not manufacture volume claims; the reproducibility argument exists
precisely so the opinion does not have to rest on mileage. The bench's *expertise*
is real and unpublished — a dozen fractional CTOs and CPOs and their disciplines
are proof the practice holds and does not currently spend.

## Goals

**Business goal:** The expert-witness practice is the active revenue vector.
Forensics launch blockers are treated as revenue blockers.

**Conversion action:** A `/scope` intake submission — the fixed-fee assessment
enquiry. Secondary: a direct email to `partners@rootsystem.com`. Submissions land
in D1 (`case_intake`) with a Turnstile spam verdict and are emailed on.

**Published commitment:** we reply within one business day. Stated on `/scope`
before the form and in the confirmation. Business day rather than 24 hours so the
promise survives a Friday evening enquiry.

This is an operational promise, not copy. The intake notification goes to
`contact@rootsystem.com` and copies `rob@rootsystem.com` (`NOTIFY_TO` and
`NOTIFY_CC` in `sites/forensics/wrangler.jsonc`), so it reaches a named person
rather than only a shared mailbox. `sites/www` has no equivalent commitment and
sends no copy.

## Conflicts and confidentiality

Root System also builds software for clients. The rule, now stated publicly on
`/engagements` as the first step of intake rather than left to post-submission
fine print:

1. Every intake opens with a written conflict questionnaire, walked through in
   the intake interview. It captures named parties and their counsel, affiliated
   and parent entities, and the specific systems, products, codebases, models,
   or vendors at issue. Broadened from "AI/ML systems" at v7 — the conflict
   surface is now as wide as the practice areas, and a build relationship on a
   plain software product is exactly as disqualifying as one on a model.
2. Decline anything adverse to a current or recent Root System build
   relationship — and screen build-side sales against live or likely expert
   matters, symmetrically.
3. NDA before any confidential material moves. No case files, code, or model
   artifacts change hands ahead of an executed NDA.
4. When in doubt, decline. An ambiguous conflict is not worth one matter.

Counsel has not yet blessed the questionnaire and NDA templates. That review is
open in the GTM workspace and was originally recorded as gating first external
use; Rob's call (2026-08-09) is to publish the process now and get the review
done in parallel rather than hold the copy for it.

The dual-line position is treated as an asset rather than a problem, but the
framing that makes it one ("we build systems that keep you out of legal
trouble") is explicitly a later message, not a launch message.

**Current metrics:** Traffic is roughly dozens of visits a month, and PostHog is
not instrumented (roadmap track 5, unstarted). A/B testing is therefore not
viable, which is why the site's structure was chosen on reasoning rather than by
experiment, and why it was built to be cheap to reorder.

**Launch state as of 2026-08-08:** the four-route structure and the
forensics-specific OG card are built on `rob/forensics-ia` (PR #53, unmerged).
`forensics.rootsystem.com` has no DNS record and no Worker route — deliberately
unrouted until there is something worth routing to. `robots.txt` allows
crawling.

## Open questions

1. **Market research exists; buyer research does not.** The GTM workspace has a
   real target list built from live dockets and firm case pages. What it does not
   have is a single conversation with a buyer. Personas, Switching Dynamics, and
   above all Customer Language remain inference — there is still no verbatim
   attorney language anywhere, so downstream copy writes in Rob's framing rather
   than in-market. Two prerequisites are recorded in the research and unmet: the
   target list has not been scored against Rob's own network for warm paths, and
   outreach is gated on the public property being live.
2. **The four-mode summary on the root page.** *Closed.* Each mode now carries a
   one-clause summary beside its title, and the block sits directly under the
   practice areas, near the top of the page, per Lauren's second note.
3. **How much of the bench to show.** Presented as a bench for now, with named
   profiles held as the later move if a niche demands them. The trigger for that
   change is not defined.
4. **The SEO cost of the v7 lead.** *Open, and the known weakness of this
   positioning.* Organic search is one of three entry paths, and "AI expert
   witness" is a query people type. The hero no longer contains it. The
   compensation is titles-only — `meta.title` and all three `routes.*.title`
   carry the concrete subject terms ("Software, Source-Code, Data and AI Expert
   Witness"), and the "Do you only take AI cases?" FAQ answer carries them in
   body copy. Whether a title-level claim ranks against competitors running
   per-area landing pages is untested and, with dozens of visits a month and no
   analytics instrumented, currently untestable. The real fix is per-area
   landing pages — which is also what every direct comparable has — and that is
   a build item, not a copy item.
5. **Mike's review.** Lauren asked for a lawyer's read once the site is ready.
   Not yet done. This variant was written to survive that review; the review is
   what would confirm it.

## Changelog

*Newest first. One line per revision: what changed and why.*

- v7 (2026-08-11) — **Scope reversal, superseding v4** (Rob, after a paralegal review by Lauren): four practice areas — software and source code; data, logs and metadata; AI and machine learning; software failure and performance — with all four engagement modes applying to all four, and testimony never caveated by area. Repositioned the whole property off a technology category and onto the job and the deliverable, stated in plain language: the unifying claim is now the nature of the evidence (everything examined was written by a machine) rather than the subject matter. Rewrote the one-liner, Product Overview, pillars (retitled as plain sentences), bench (discipline nouns rewritten as the questions each answers), practice areas, contrast table, FAQ (added "Do you only take AI cases?"), and the assessment tier name (AI-Dispute Assessment → Case Assessment). Wrote the jargon rule down explicitly in Brand Voice: litigator terms of art stay, engineering vocabulary is banned from customer-facing positions and moves into the `/method` long forms. Conventional non-AI technical matters are no longer an anti-persona; acquisition-only forensics still is, and the acquisition boundary is now stated in two customer-facing places. Closed open question 2 and opened question 4 (the SEO cost of leading on job rather than category) and 5 (Mike's lawyer review).
- v6 (2026-08-09) — Pricing decisions (Rob): modifiers do not stack, higher rate governs; the volume discount comes off the published list and moves to conversation against an internal bar. Response commitment softened from 24 hours to one business day, with the notification now copying a named recipient. Legal review of the conflict questionnaire and NDA runs in parallel rather than gating the copy.
- v5 (2026-08-09) — Folded in the GTM workspace: the real target list (four demand veins, named firms, docket-sourced) replaces the inferred audience; the rate card's modifiers, and the internal terms that stay unpublished; the conflict-and-confidentiality rule as its own section; and the published 24-hour response commitment with the notification-routing risk attached. Downgraded open question 1 from "no research" to "market research yes, buyer research no."
- v4 (2026-08-09) — Scope decision (Rob): stay on product and technology with AI/ML as the lead pillar, showing the bench's breadth as depth behind the lead rather than as separate practice areas. Closed the broaden-or-narrow open question; the bench belongs on `/method`.
- v3 (2026-08-09) — Added The Bench section: a dozen fractional CTOs and CPOs, their disciplines, the staffing model, and the method's provenance in startup experimentation work. Reordered Differentiation around provenance, cross-functional bench, and the intake process. Set testimony as downplayed by decision rather than by omission. Opened the AI/ML-only-versus-broaden question raised by the product-side half of the bench.
- v2 (2026-08-08) — Repositioned from solo practitioner to a multi-expert practice with a per-matter assigned bench (Rob, correcting v1). Reframed Product Overview, Competitive Landscape, Differentiation, Switching Dynamics, and Proof Points accordingly; noted that site copy still reads single-practitioner and needs revision. Marked the publish-gate draft flags as stale — the own-voice rewrite is in progress.
- v1 (2026-08-08) — Initial context, auto-drafted from `sites/forensics/src/copy/landing.ts`, the IA design spec, the roadmap, and the intake form. Buyer-side sections are inference; no customer research exists yet.
