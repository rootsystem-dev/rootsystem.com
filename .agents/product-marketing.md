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

**One-liner:** Technical expert-witness analysis for disputes about what a
system, a codebase, or a dataset actually did — where every opinion is an
experiment the other side can re-run.

**What it does:** Technical analysis in litigation across four co-equal practice
areas: software and source code, data and systems forensics, AI and machine
learning, and software failure and performance. Findings are stated as a
reproducible experiment (a query plus its output) rather than as expert
assertion, so opposing counsel can replicate them. Delivered as rebuttal,
affirmative analysis and testimony, non-testifying consulting, or an early-case
merits screen — all four modes available in all four areas.

**Product category:** Expert witness / litigation support, technical and
technology specialty. The "shelf" is expert-witness directories (JurisPro, SEAK)
and attorney referral networks, not software categories.

Scope is technical disputes generally. No area leads; the reproducible-experiment
method is the through-line that makes four kinds of matter one practice rather
than a generalist shop. See **Practice areas** and **The Bench**.

## Practice areas

Four areas, set by Rob 2026-08-11, presented as peers everywhere on the property
— in the hero, the title tags, the ordering, and the tier names. The array order
on the site is the artifact, the record the systems kept, the systems that learn,
and the systems that failed; AI/ML sits third because that is where it falls in
that progression, not because it was ranked.

| Area | What it covers |
|---|---|
| Software and source code | Source-code comparison in trade-secret and IP matters, the technical read behind patent and infringement claims, code provenance and authorship |
| Data and systems forensics | ESI and metadata, timestamp and log analysis, file-system semantics, breach and security-incident reconstruction |
| AI and machine learning | How a model was built, what data it used, how far its outputs vary, whether it performed as claimed |
| Software failure and performance | Defect and root-cause analysis, outage/SLA and contract-performance disputes, capacity and scaling failures |

All four engagement modes apply to all four areas equally, and the fixed-fee
assessment is the same price in every one. Testimony is not caveated by area.

**The acquisition boundary is a capability line, not a positioning choice.** This
bench is fractional CTOs and CPOs — engineers and product leaders. They analyze
ESI, metadata, logs, file systems and code. They do not perform forensic imaging,
evidence collection, chain of custody, or data recovery; that is the
digital-forensics vendors' work and it stays listed as their strength in the
contrast table. The site states this in three places (the data-and-systems area
body, the contrast row's own limit, and a dedicated FAQ) because a broader
category claim makes it easier for a reader to assume otherwise.

**Scope decision (2026-08-11) — supersedes v4.** Take conventional technical
matters alongside AI/ML, with AI/ML as one peer area rather than the category
claim. The source is a paralegal on a target litigation team who reviewed the
site and wrote, verbatim:

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

> "Yeah I'll take that critique on the AI focus, it's clearly the right direction
> long term but it is limiting early, I'm working on a copy set where AI is one
> pillar amongst more traditional forensic work."

The trade-off is accepted knowingly: the practice gives up a sharp AI wedge in a
market where AI specialization is the scarcest credential, in exchange for the
broadest addressable read. The goal is that a litigator with a source-code or
metadata matter never bounces on the assumption that this is an AI shop. AI/ML
remains the long-term direction and can be re-sharpened once the referral network
is thick enough to carry a narrow claim.

The structural half of Lauren's note is answered too: the root page now runs hero
→ practice areas → four engagement modes → positioning → pillars → matter, so
what is on offer reads before the methodology argument. Her tech-speak note binds
the practice-area and mode copy specifically — those must be readable by a
paralegal screening experts. The method sections may stay technical.

**Product type:** Professional services, delivered by a Root System practice
group — a bench of roughly a dozen experts assembled per matter, not a single
practitioner. The "we" throughout the site copy is literal. See **The bench**
below.

The v7 copy set closed the single-practitioner drift that v2 flagged: the pillar
reads "Built by builders," the big-name-firm FAQ answers as a bench rather than
as one practitioner, and Rob is named once, as the accountable lead on every
matter, in the bench's staffing note. A bench without a named lead reads as a
vendor pool; a named lead without a bench cannot honestly claim four areas.

**Business model:** Fixed-fee on-ramp into hourly engagement.

| Tier | Price | What it is |
|---|---|---|
| Technical Assessment | $2,500 flat, up to 10 hours | Fixed-scope reproducible-experiment analysis plus a written assessment of the claim and its strength. Credited against a full engagement. Same price in all four practice areas. Renamed from "AI-Dispute Assessment" 2026-08-11 — a tier name that says AI turns away three quarters of the matters it prices. |
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

**Scope decision — superseded.** v4 (2026-08-09) held the practice to product
and technology with AI/ML as the lead pillar and no second practice area. That
decision was reversed on 2026-08-11; see **Practice areas** above for the
reversal, its source, and the trade-off. The fractional-CPO disciplines remain
part of the cross-functional read rather than standalone service lines — the
four practice areas are the service lines, and they are technical.

**What the bench makes possible under the broader claim.** Taking four kinds of
matter is only honest with a bench this wide. A solo AI specialist broadening to
source code and outage forensics would be overreaching; a dozen fractional CTOs
and CPOs assembled per matter is the reason the breadth is real. Breadth of
evidence plus one method is the whole positioning: the bench supplies the
breadth, the reproducible-experiment method supplies the coherence.

## Target Audience

**Target companies:** US litigators and IP/technology counsel handling disputes
that turn on what a system, a codebase, or a dataset actually did — code copying
and provenance, what the metadata and logs establish, how a model was built and
whether it performed as claimed, and why software failed.

**Horizontal by decision, not by default.** "Technical dispute analysis," not a
single vertical and now not a single technology either. Named subfoci emerge
later from customer-call data rather than being picked up front; staying
horizontal keeps referral doors open while the network is thin, and the
2026-08-11 scope reversal widens that on purpose.

The AI/ML demand research below still stands and is still the richest identified
vein — it is now one of four areas rather than the whole target. The unresearched
half is the conventional lane: trade-secret and source-code matters, ESI and
metadata disputes, and software failure/SLA litigation have not been worked into
a comparable target list. **[INFERRED — no docket research exists for the three
non-AI areas. That gap is the first thing v7 should close, because three quarters
of the new claim currently has no named demand behind it.]**

Densest demand *in the AI/ML area*, from the docket and firm-page research in the
GTM workspace (~40 verified firm rows, compiled 2026-07-16):

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
- Establish provably what a system, a codebase, or a dataset did.
- Decide, before committing budget, whether there is a technical claim at all and
  how strong it is.

**Use cases** (the four service modes, verbatim from the site):
- Opposing-expert rebuttal — reproducible counter-experiment plus cross-document
  impeachment.
- Affirmative analysis & testimony.
- Consulting (non-testifying) — case strategy, experiment definition, stochastic
  data collection, vetting the other side's expert; work-product protected.
- Early-case assessment — a merits screen before commitment.

All four are offered in all four practice areas; the site says so explicitly in
the services intro and the assessment tier body, because the natural reader
assumption under a broad claim is that testimony or rebuttal is available in only
some of them.

These four are also the options in the `/scope` intake dropdown, plus "Not sure
yet."

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

**Core problem:** When a matter turns on what a system did, the available experts
each offer half of what counsel needs. Academics study systems they have not
shipped. Economic consultancies read technology through an economics lens and
concede the technical question itself. Digital-forensics vendors collect and
catalog the evidence — the genuinely hard part, and not ours — then stop where
interpreting it starts.

**Why alternatives fall short:**
- An assertion-based opinion ("in my experience, this indicates copying") is
  attackable precisely because it cannot be reproduced.
- Conceding the black box concedes the case's central technical question.
- A checklist stops where the real question starts — timestamp shape,
  file-system semantics, what a log did and did not record,
  model-temperature-controlled variability, at-scale artifacts.
- Retaining one expert per technology means retaining several, or accepting a
  read that stops at one discipline's boundary.

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

These became *more* comparable under the 2026-08-11 reversal, not less: they were
already software-and-source-code practices, and the practice now competes with
them on their own ground rather than beside it. The remaining differences are the
reproducible-experiment method, published pricing, a cross-functional bench, and
a described intake process. Specialization is no longer one of them, which is the
cost of the reversal, stated plainly.

**Secondary** — adjacent expert types solving the same problem differently. From
the site's own contrast table:

| Who | Their strength | Where they fall short |
|---|---|---|
| Academic experts | Publications, Daubert-friendly credentials | Study systems they have not shipped; don't reproduce behavior at production scale |
| Economic consultancies | Deep testimony pedigree | Technology read through an economics lens; concede the technical question itself |
| Digital-forensics vendors | Imaging, preservation, chain of custody, recovery | Collect and catalog the evidence; stop where interpreting it starts |
| Root System | Builds and operates the systems + reproducible experiments + even-handed | Newer practice, and we analyze evidence rather than acquire it — the method is the credential, not the mileage |

The Root System row must always name a real limit. Every other row names a gap,
and the practice's second pillar is conceding uncertainty; a dash there is
self-refuting. The two limits carried are the thin testimony record and the
acquisition boundary — the second doubles as the thing that keeps the
forensics-vendor row above honest.

**Indirect** — retaining no expert and arguing the technical point through fact
witnesses or the client's own engineers. Cheaper and faster; carries no
independence and no Daubert standing. **[INFERRED]**

## Differentiation

**Key differentiators** (the five pillars — the copy deck is explicit that each
was earned in a real matter, not aspirational):

1. **Reproducible, not assertive.** Every finding is a query and its output,
   re-runnable by opposing counsel. Not "trust me."
2. **Even-handed.** We concede what is genuinely uncertain. That is what
   separates an expert from a hired gun, and what survives cross.
3. **Depth in machine-generated evidence.** Timestamp shape, file-system
   semantics, log fidelity, model variability — where a checklist stops.
4. **Cross-document rigor.** We diff an opponent's successive filings for
   dropped caveats and silent overstatements — a technique most vendors don't
   perform.
5. **Built by builders.** Argued by the people who build and operate these
   systems, not by people who only study them.

**Why that's better:** Reproducibility relocates the opinion's authority from
the expert's résumé to the evidence itself. It is the direct answer to the
practice's thinnest credential (limited testimony history) and to its most
likely attack (hired gun).

**Reproducibility is also what holds the four areas together.** Under v6, the
differentiator carrying the most weight was AI/ML specialization; under v7 that
weight moves to the method. One standard applied to a source tree, a file system,
a model, and an outage log is what makes a four-area practice coherent rather
than generalist. Copy should state the method as the through-line explicitly
wherever the breadth is on display — pillar 1, the practice-areas intro, the
bench intro, and the third paragraph of the representative matter all carry it in
the v7 copy set.

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

Verbatim from the site FAQ — these are the five the practice has chosen to
answer in public.

| Objection | Response |
|---|---|
| "Your testimony record is short." | A reproducible opinion doesn't rest on tenure. Every finding is a query the other side can re-run — defensible on its own terms, not on reputation. A first-principles, reproducible analysis is more durable under Daubert than a veteran's say-so. |
| "Why not a big-name firm or lab?" | Large consultancies bill a brand markup on subcontracted analysis and read technology through whichever lens the parent practice owns. This is a bench of engineers and product leaders who build and operate these systems, doing the analysis themselves. |
| "Can you collect and image the evidence?" | No. We analyze evidence; we don't acquire it. Imaging, preservation, chain of custody and recovery belong with a digital-forensics vendor, and we work alongside the one you retain — or tell you that you need one. |
| "Aren't you a hired gun?" | The method came before the litigation work — the same experimentation discipline is run daily for startups betting a company on results that replicate. We concede what's fair, label the unverifiable, and hand the other side a replication they can re-run. |
| "This sounds expensive." | A reproducible opinion that survives a 702 motion is cheaper than one excluded. Start with the $2,500 assessment. |

The acquisition question is new in v7 and is there because of the reversal: a
broader category claim invites a reader to assume collection is in scope, and the
practice would rather answer that on its own page than in a scoping call that
wastes both sides' time.

**Anti-persona:** counsel who wants a predetermined conclusion — the
even-handedness pillar actively repels them, by design. Counsel who needs
evidence *acquired*: forensic imaging, collection, chain of custody, or data
recovery, with no interpretation question behind it. That one is a hard
capability boundary, not a preference, and it survives the reversal unchanged.
And matters too small to carry a $450/hr expert. **[INFERRED — no enquiry has
been declined on any of these grounds yet; they are reasoned from capability and
positioning, not from experience.]**

**No longer an anti-persona:** conventional technical matters with no AI/ML
question. Trade-secret source-code comparison, ESI and metadata disputes, and
software failure/SLA litigation are now core, not out of scope. v6 listed them as
a repel; v7 lists them as three of the four things sold.

## Switching Dynamics

**[INFERRED — the four forces below are reasoned from the copy, not from
interviews.]**

**Push:** An opposing declaration that asserts more than it shows, and no
in-house way to test it. Or a prior expert whose methodology drew a 702
challenge.

**Pull:** A method visible before the first call, a fixed-fee way to see the
read before committing, and published rates in a market that hides them.

**Habit:** Counsel retains the expert their firm has always retained, or the one
their opponent's expert came from. Expert selection is relationship-driven and
the switching cost is reputational.

**Anxiety:** An unfamiliar name that opposing counsel will attack on experience
rather than on method. This is the practice's central adoption risk and the FAQ
leads with it. Testimony history does not blunt it — there is not much across the
bench. What does is the method's provenance and the breadth of expertise behind
it, both of which the site now presents (bench provenance on `/method`, the
hired-gun FAQ on `/engagements`).

**New anxiety introduced by the reversal [INFERRED]:** that a practice claiming
four areas is deep in none of them. This is the specific risk the v7 copy set is
written against, and the answer is structural rather than rhetorical — one
method applied identically across areas, a dozen-person bench that makes the
breadth real, and a named limit in the contrast row. Watch for it in the first
scoping calls; it is the thing most likely to come back as "who exactly would be
testifying on the source code."

## Customer Language

**How they describe the problem:** *no verbatim data.* Attorney discovery
interviews have not been run. Everything currently on the site is written in
Rob's framing, not in a buyer's words. **This is the largest gap in this
document** — verbatim language is what would let downstream copy skills write
in-market rather than in-house.

**How they describe us:** *no verbatim data.*

**Words to use:** reproducible, re-runnable, query and its output, conceded /
concede, even-handed, holds up under cross, Daubert, 702, declaration,
impeachment, distribution, discriminator, empirically validate, matter,
engagement, scope a case. Added in v7 for the broader claim: source code, code
provenance, ESI, metadata, logs, file-system semantics, root cause, service
level, what the system actually did.

**Words to avoid:** cutting-edge, AI-powered, revolutionary, leverage,
game-changing, seamless, and anything that would read as marketing to a
litigator. Also avoid "guarantee," "prove conclusively," or any claim to
certainty the method itself would concede — overclaiming is the exact failure
mode the even-handedness pillar sells against. Avoid "client" for the attorney;
they are counsel, and their client is someone else.

**Glossary:**

| Term | Meaning |
|---|---|
| Daubert / 702 | The federal standard and rule governing admissibility of expert testimony. Exclusion is the risk the whole method sells against. |
| Reproducible finding | A finding stated as a query plus its output, re-runnable by the opposing side |
| Cross-document rigor | Diffing an opponent's successive filings for dropped caveats and silent overstatements |
| Timestamp shape | The distribution of access timestamps; its shape distinguishes a human copy from a batch process |
| Assessment | The $2,500 fixed-fee, ≤10-hour engagement. Named "Technical Assessment" on the page as of v7 |
| Practice area | One of the four kinds of matter the practice takes. Peers, not a hierarchy |
| Acquisition | Imaging, collection, preservation, chain of custody, recovery. **Not ours** — the vendor's |
| Matter | A single litigation engagement |
| Scope a case | The site's conversion action — the `/scope` intake form |

## Brand Voice

**Tone:** Evidentiary and understated. Claims are stated flatly and immediately
substantiated; nothing is amplified. The site concedes its own weaknesses in
public (one testimony; "copying is not timestamp-silent") because the concession
is the credibility mechanism.

**Style:** Direct, technical, specific. Concrete numbers over adjectives — "9,000
files smeared across hundreds of seconds" rather than "extensive analysis." The
visual direction is "Show Your Work" (direction A): a hero built as a query and
its output.

**Personality:** rigorous, even-handed, concrete, practitioner, unshowy.

**Reading level is not uniform across the page (Lauren, 2026-08-11).** "Exactly
what you're offering not bogged down by tech speak." The practice-area copy, the
engagement-mode copy, the tier names and the hero must be readable by a paralegal
screening experts — plain nouns, no jargon that needs a definition. The method
sections (pillars, the representative matter, the bench) may stay technical;
that audience has already self-selected by clicking through.

**Voice caveat carried in the code:** the hero and closing blocks were originally
scaffolding transcribed from the GTM copy deck. Both were rewritten in the v7
copy set and both read `draft: false`. The schema's build-time publish gate
(`assertPublishable`) fails a production build — which includes every preview
deploy — while either block is marked draft, so setting a flag back to `true`
takes the preview down with it.

## Proof Points

**Metrics:** none published. No case count, no win rate, no client list. The
practice is early and the site does not pretend otherwise.

**Customers:** none named. The one matter is anonymized, and is labelled with its
practice area as "Representative matter · Data and systems forensics ·
anonymized."

That labelling is deliberate under v7. The single matter the practice can point
to is a file-system and metadata matter, not an AI matter — it is genuine proof
for the non-AI areas and should be used that way rather than left ambiguous. It
is also the only evidence on the property that the broader claim is not a
retrofit.

**Testimonials:** none. The pull quote from the representative matter states the
finding rather than an outcome:

> "Same data. The shape tells the truth."

**Value themes:**

| Theme | Proof |
|---|---|
| Reproducible beats assertive | The mass-copying rebuttal: a genuine bulk copy of 9,000 files smears its access timestamps across hundreds of seconds; the opposing exhibit clustered thousands into a handful — a batch process, not a human copy. Same data; the shape tells the truth. |
| Cross-document rigor is real, not a slogan | The opposing expert's earlier declaration carried qualifiers ("can be caused by copying, searching, and other automated processes") that the later federal declaration dropped, on identical numbers. |
| Even-handedness is in the deliverable | The same rebuttal openly conceded that copying is not timestamp-silent. |
| Practitioner, not observer | Root System builds, ships and operates software and ML systems in its own products; the same evaluation discipline produces the litigation experiments. |
| The method travels between areas | The one representative matter is a file-system and metadata matter solved by the same characterize-then-measure procedure the AI area uses. It is the proof that the four areas share a method rather than a brochure. |

**Weakest point, stated plainly:** one representative matter and no third-party
validation of any kind. Every proof point above is self-reported. Under v7 that
weakness is sharper, not softer: one matter now stands behind a claim to four
areas rather than one, and three of the four have no published matter at all. The
honest reading is that the bench's disciplines, not a case history, are the
evidence for the breadth.

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

Root System also builds software and AI systems for clients. The rule, now stated
publicly on `/engagements` as the first step of intake rather than left to
post-submission fine print:

1. Every intake opens with a written conflict questionnaire, walked through in
   the intake interview. It captures named parties and their counsel, affiliated
   and parent entities, and the specific systems, products, codebases, models,
   and vendors at issue. The enumeration widened with the practice areas in v7 —
   a screen that only names AI systems misses the conflict a source-code matter
   creates.
2. Decline anything adverse to a current or recent Root System build
   relationship — and screen build-side sales against live or likely expert
   matters, symmetrically.
3. NDA before any confidential material moves. No case files, code, or system
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
2. **No demand research behind three of the four areas.** The AI/ML vein is
   docket-verified; source code, ESI/metadata, and software failure are asserted.
   Until a comparable target list exists for them, the broader claim rests on
   capability rather than on identified buyers.
3. **Mike's read has not happened.** Lauren's note ended by asking for a lawyer's
   review before launch. That has not been done, and it is the cheapest remaining
   check on whether the practice-area language reads correctly to the profession.
4. **How much of the bench to show.** Presented as a bench for now, with named
   profiles held as the later move if a niche demands them. The trigger for that
   change is not defined. The reversal raises the stakes: a four-area claim
   backed by a list of disciplines invites "who specifically" sooner than a
   one-area claim did.
5. **Whether the four areas should get their own pages.** Every direct comparable
   runs per-area landing pages for search. The property is four routes and the
   areas live inside `/matters`. That is a deliberate hold, not an oversight, but
   the SEO argument for splitting them gets stronger under a broader claim.

Closed in v7: the previous question 2 (whether the root page's four-mode summary
needed explanatory clauses) — it now carries a `summary` clause per mode.

## Changelog

*Newest first. One line per revision: what changed and why.*

- v7 (2026-08-11) — **Repositioning, reversing v4.** AI/ML drops from the whole category claim to one of four co-equal practice areas — software and source code, data and systems forensics, AI and machine learning, software failure and performance — under a technical expert-witness category claim, with the reproducible-experiment method as the through-line that makes the breadth coherent. Source: a paralegal on a target litigation team read the AI-led site as an AI-only practice and named the matters it would exclude; Rob accepted the critique the same day. Rewrote Product Overview, added a Practice areas section with the acquisition boundary as a stated capability line, retargeted Audience, Problems, Competitive Landscape, Differentiation and Objections, and moved conventional non-AI technical matters out of the Anti-persona while keeping acquisition-only work in it. Renamed the on-ramp tier from "AI-Dispute Assessment" to "Technical Assessment." Trade-off accepted knowingly: the sharp AI wedge is given up for the broadest addressable read.
- v6 (2026-08-09) — Pricing decisions (Rob): modifiers do not stack, higher rate governs; the volume discount comes off the published list and moves to conversation against an internal bar. Response commitment softened from 24 hours to one business day, with the notification now copying a named recipient. Legal review of the conflict questionnaire and NDA runs in parallel rather than gating the copy.
- v5 (2026-08-09) — Folded in the GTM workspace: the real target list (four demand veins, named firms, docket-sourced) replaces the inferred audience; the rate card's modifiers, and the internal terms that stay unpublished; the conflict-and-confidentiality rule as its own section; and the published 24-hour response commitment with the notification-routing risk attached. Downgraded open question 1 from "no research" to "market research yes, buyer research no."
- v4 (2026-08-09) — Scope decision (Rob): stay on product and technology with AI/ML as the lead pillar, showing the bench's breadth as depth behind the lead rather than as separate practice areas. Closed the broaden-or-narrow open question; the bench belongs on `/method`.
- v3 (2026-08-09) — Added The Bench section: a dozen fractional CTOs and CPOs, their disciplines, the staffing model, and the method's provenance in startup experimentation work. Reordered Differentiation around provenance, cross-functional bench, and the intake process. Set testimony as downplayed by decision rather than by omission. Opened the AI/ML-only-versus-broaden question raised by the product-side half of the bench.
- v2 (2026-08-08) — Repositioned from solo practitioner to a multi-expert practice with a per-matter assigned bench (Rob, correcting v1). Reframed Product Overview, Competitive Landscape, Differentiation, Switching Dynamics, and Proof Points accordingly; noted that site copy still reads single-practitioner and needs revision. Marked the publish-gate draft flags as stale — the own-voice rewrite is in progress.
- v1 (2026-08-08) — Initial context, auto-drafted from `sites/forensics/src/copy/landing.ts`, the IA design spec, the roadmap, and the intake form. Buyer-side sections are inference; no customer research exists yet.
