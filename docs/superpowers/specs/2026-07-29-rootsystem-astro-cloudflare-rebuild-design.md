---
title: rootsystem.com — Astro rebuild, expert-witness property, Taproot blog, Cloudflare migration
created: 2026-07-29
status: draft-v1 — pending review
linear_project: Forensics and Expert Witness Services (ROBOPS)
related_issues: [ROBOPS-167, RSE-54]
---

# rootsystem.com rebuild — design

Rebuild rootsystem.com on Astro, add the expert-witness property at `forensics.rootsystem.com`,
restart the blog as **Taproot** at `rootsystem.com/taproot`, and move hosting from Netlify and
Vercel to Cloudflare.

Source material for the expert-witness property already exists as a completed GTM package in the
vault at `RobbyRobZettelkasten/New-products-projects-development/Forensics-Expert-Witness-GTM/`
(15 files, ~1,700 lines, plus two HTML design decks). This work builds the site; it does not
originate the positioning.

---

## 1. Current state

| Property | Stack | Host | Status |
|---|---|---|---|
| rootsystem.com | Next 16, Chakra v3, React 19 | Netlify (`next export` → static) | 4-page brochure, 2024 copy |
| insights.rootsystem.com | Next pages-router, Sanity, Tailwind, React 18 | Vercel | separate repo `rootsystem-blog` |
| forensics.rootsystem.com | — | — | does not exist |

DNS is hosted at DNSimple across four `dnsimple-edge` nameservers. The domain is registered
through DNSimple (registrar of record 1API GmbH), expiring 2027-06-14, with
`clientTransferProhibited` set.

The zone export of 2026-07-29 contains 30 active records: the apex A record and `www` CNAME
pointing at Netlify, five Google Workspace MX records, an SPF record, six third-party
verification TXT records (Google ×2, OpenAI, Slack, 1Password, Miro), `calendar` and `mail`
CNAMEs to Google, three Vercel CNAMEs for the blog and its dev and staging variants, an ngrok
CNAME, a `dev` A record to an AWS us-west-1 address, and two GitHub Pages verification TXT
records.

It also contains **seven DNSimple `URL` records** — a proprietary hosted-redirect type with no
BIND representation, which the export therefore emits as comments, and no Cloudflare equivalent.
Four are live (`meet.rob`, `profile.rob`, `meet.kyle`, `zoom.kyle`); three no longer respond
(`meet.madelin.kyle`, `meet.rob.kyle`, `typeform`). See §7.

**Mail authentication is incomplete:** SPF is present, but there is no DKIM record at any common
selector and no DMARC record.

The branch `rob/rse-54-cve-2025-66478-fix` holds two commits plus uncommitted working-tree
changes. Its content is a dependency rescue — Next 14→16 App Router port, Chakra v2→v3, React 19,
color-mode and hydration fixes. Page content is unchanged from the 2024 brochure.
`components/Landing/Landing.tsx` is an unrelated Tailwind template ("FractionalC") wired to no
route. `pages.old/` remains from an earlier migration.

**Assumption:** none of that branch survives a framework change, because every line of it is
Chakra-v3 and Next-App-Router plumbing. RSE-54's CVE exposure is closed by removing the Next
dependency tree rather than patching it.

---

## 2. Decisions

Recorded so the reasoning survives the conversation that produced it.

| # | Decision | Rationale |
|---|---|---|
| D1 | **Astro** (7.x — 7.1.6 at time of scaffold), static output | Content-first workload — marketing pages plus a blog. Zero JS by default, content collections for Taproot, islands available if an interactive surface appears later. SvelteKit was considered and rejected: it is app-first, and there is no app here. |
| D2 | **Abandon** `rob/rse-54-cve-2025-66478-fix` | No salvageable value under D1. The branch is left in place rather than deleted; its working tree was committed as `82bbf56` on 2026-07-29, so the migration work is recoverable from history without a separate patch file. |
| D3 | Expert-witness property on **`forensics.rootsystem.com`**, same repo | Preserves the 2026-06-19 buyer-separation decision (litigators and IP counsel, not founders) while consolidating the build. Supersedes that decision only as to repository location, not brand separation. |
| D4 | Blog is **Taproot**, at `rootsystem.com/taproot` | Botanical house style, consistent with `sapling`, `xylem`, `treeFarm-utils`. Path rather than subdomain so content authority accrues to the apex domain — the main site is thin and the blog is the only surface likely to earn inbound links. The buyer-separation logic that justifies `forensics.` does not apply, since Taproot serves both audiences. |
| D5 | Blog **starts fresh**; existing Sanity posts are archived, not migrated | Explicit restart. `insights.rootsystem.com` 301s to `/taproot`, then the Vercel deployment and Sanity project are decommissioned. |
| D6 | Main site **ports existing copy** | Positioning rewrite for the main brand is out of scope; there is no equivalent GTM package for it. Stack change only. |
| D7 | Build against **draft copy**, gate the deploy | Engineering proceeds without waiting on the own-voice rewrite. See §5. |
| D8 | DNS zone moves to **Cloudflare**; registrar stays at DNSimple | Nameserver change is reversible in minutes; a registrar transfer carries a 60-day ICANN lock and saves roughly $5/year. The architectural benefit lives entirely in the nameserver move. |
| D9 | Hosting target is **Cloudflare Workers** static assets | Follows from D8. Workers custom domains require the zone to be on Cloudflare; with DNS elsewhere the only option was Pages. D8 removes that constraint, and Workers is the platform under active investment. |
| D10 | **Delegate `rob.` and `kyle.` subtrees to DNSimple** rather than rebuilding their redirects as Cloudflare rules | The four surviving redirect hostnames are two labels below the apex. Cloudflare Universal SSL covers only `rootsystem.com` and `*.rootsystem.com`, and Redirect Rules require proxied traffic, which requires a valid certificate — so proxying them breaks TLS. DNSimple already serves a multi-SAN Let's Encrypt certificate covering `*.rob` and `*.kyle`. Delegation costs roughly $12/year against roughly $120/year for Advanced Certificate Manager. This reverses an earlier recommendation made before certificate coverage was checked. |
| D11 | Forensics uses **Direction A, "Show Your Work"** | Direction B sells courtroom gravitas — the axis the practice is weakest on while the record is one settled matter. The messaging worksheet argues reproducibility over reputation, and the FAQ answers "you've testified once" by saying a reproducible opinion does not rest on tenure; B's visual argument would work against that. A renders the differentiator directly, and is the closer sibling to rootsystem.com, which matters because referrals arrive through Rob personally and prospects will see both properties. Reversible: one constant in `Layout.astro`. |

---

## 3. Repository architecture

Yarn workspaces — Yarn 4.18.0 is already in use with `nodeLinker: node-modules`; the `workspaces`
field is added to the root `package.json` as part of Phase 1. Two Astro applications:

```
rootsystem.com/
├── sites/
│   ├── www/                    → rootsystem.com
│   │   ├── src/pages/          → home, about, contact, apply
│   │   ├── src/content/taproot/ → blog collection (MDX)
│   │   └── wrangler.jsonc
│   └── forensics/              → forensics.rootsystem.com
│       ├── src/pages/
│       ├── src/content/copy/   → landing copy as content, not markup
│       └── wrangler.jsonc
├── docs/superpowers/specs/
├── mise.toml                   → node, yarn, fnox, wrangler
├── fnox.toml                   → 1Password-backed secrets
└── .github/workflows/deploy.yml
```

**No shared UI package initially.** The two sites are deliberately different brands. Extracting a
shared package now would mean guessing at a seam before there is evidence of where it belongs;
duplication is the cheaper error and is easy to reverse once a real overlap appears.

Removed wholesale: `app/`, `components/`, `pages.old/`, `next.config.js`, `netlify.toml`,
`jsconfig.json`, `tsconfig.tsbuildinfo`, and the entire Next/Chakra dependency tree.

### Styling

The existing mockups (`microsite-design-mockups.html`) are hand-written CSS using custom-property
design tokens and system font stacks — no framework. They port into Astro close to verbatim. No
CSS framework is introduced; tokens live in a per-site stylesheet.

---

## 4. Content model

### Forensics

`landing-copy.md` maps section-for-section onto the page (§1 hero through §10 footer). Copy is
authored as Astro content with schema-validated frontmatter, not embedded in markup, so the
own-voice rewrite is a content edit rather than a code change.

The companion assets in that file — service one-pager, referral one-pager, directory bio — are
out of scope for the site build. They are print and outreach collateral.

### Taproot

Astro content collection, MDX, schema-validated frontmatter:

```
title, description, publishDate, updatedDate?, tags[], draft
```

Ships with one scaffold post and the layout, feed, and tag index. No imported content.

### Vault relationship

One-way manual copy, vault to repo. The vault remains the authorship surface for GTM strategy;
once copy lands in the repo it is edited there. No sync automation — a bidirectional sync would
create two sources of truth for the same text.

---

## 5. The publish gate

`landing-copy.md` states that the hero, proof, and closing lines are scaffolding pending a rewrite
in Rob's voice, and that this rewrite gates publication. That constraint is enforced mechanically
rather than by memory:

- Copy entries carry a `draft: true` frontmatter flag.
- Preview builds render drafts with a visible banner.
- Production builds **fail** if any `draft: true` entry is reachable from a published route.

**Assumption:** a build failure is the correct severity. A warning would be ignored, and the
failure mode being prevented — shipping placeholder copy to a litigator audience — is worse than a
blocked deploy.

---

## 6. Deployment

Two Cloudflare Workers projects under account `Root System`
(`3add5f61c3e75935c8bd7e085afed9bd`), each serving static assets from its site's `dist/`:

```jsonc
{
  "name": "rootsystem-www",
  "compatibility_date": "2026-07-29",
  "assets": { "directory": "./dist" }
}
```

GitHub Actions builds and runs `wrangler deploy` per site, with path filters so a change to one
site does not redeploy the other. Pull requests get preview deployments.

Secrets resolve through `fnox` from 1Password, per project convention, and reach CI via `misex`.
`CLOUDFLARE_API_KEY` is already configured and verified active.

**Redirects:** Workers static assets does not process `_redirects` files. Redirects are
implemented as Cloudflare zone Redirect Rules, which has the side benefit of decoupling them from
the build — changing a redirect does not require a deploy.

---

## 7. DNS migration

Two phases, deliberately separated. The nameserver change is executed by Rob, not by this work.

**Phase A — replicate and verify (no user-visible change).**

1. Full zone export from DNSimple in BIND format. **Done** — `docs/rootsystem.com_2026-07-29.txt`.
2. Import into a new Cloudflare zone for `rootsystem.com`.
3. Diff record-by-record against the export. Cloudflare's zone scan is not guaranteed complete,
   so the export is the authority, not the scan.
4. **Handle the seven `URL` records.** BIND cannot represent DNSimple's proprietary `URL` type, so
   they appear in the export as comments and a straight import drops them with no error and no
   diff — the file considers them comments, not records. Three are already dead
   (`meet.madelin.kyle`, `meet.rob.kyle`, `typeform`) and are not carried over. The four live ones
   are preserved by delegating their parent subtrees to DNSimple per D10, not by rebuilding them
   as Cloudflare rules.
5. Add the missing DKIM and DMARC records (see mail authentication below).
6. Verify by querying the Cloudflare nameservers directly (`dig @<cf-ns>`) and comparing every
   answer against the current DNSimple response. Records must match before any nameserver change.
   Redirect hostnames are verified by response code and `Location` header, not by resolution
   alone, since a proxied placeholder A record resolves identically whether or not its redirect
   rule exists.

**Phase B — cut over.**

7. Rob updates nameservers at the registrar.
8. Verify propagation, then verify mail end-to-end — send and receive against a Google Workspace
   address on the domain.
9. Add the site hostnames as Workers custom domains.
10. Add the `insights.rootsystem.com` → `/taproot` redirect rule.
11. Decommission Netlify, then Vercel, then Sanity — in that order, each only after the
    corresponding hostname is confirmed serving from Cloudflare.

**Risk concentration:** the zone is mail-critical. A missing MX record bounces mail; a missing
verification TXT record breaks a third-party integration silently, which is the worse failure
because it surfaces late. Steps 3, 4, and 6 exist specifically for this class of failure — the
`URL` records are the proof case, since they are invisible to a naive import-and-diff.

Rollback for Phase B is pointing the nameservers back to DNSimple, which stays authoritative and
unmodified throughout.

### Mail authentication

The zone publishes SPF but has **no DKIM record** at any common selector and **no DMARC record**.

Two consequences, both material rather than cosmetic. Google and Microsoft apply DKIM and DMARC
requirements to bulk senders, so outreach mail without them is filtered or rejected — and the
expert-witness GTM is built on cold outreach and referral asks to law firms. Separately, absent a
DMARC policy, nothing instructs receivers to reject spoofed `@rootsystem.com` mail, which is a
poor property for a domain that corresponds with opposing counsel.

Remediation is a DKIM key generated in Google Workspace admin plus a DMARC TXT record, published
as part of the Phase A zone build. Recommended DMARC starting policy is `p=none` with aggregate
reporting, tightened to `p=quarantine` once reports confirm legitimate sources pass.

---

## 8. Phases

| Phase | Scope | Depends on |
|---|---|---|
| 0 | Zone replication and verification (§7 Phase A) | zone export |
| 1 | Workspace scaffold, mise/fnox/wrangler, both Workers projects, CI. Deploys to `*.workers.dev`. Nothing public changes. | — |
| 2 | `www` port — existing copy, design system, `/taproot` route shell | 1 |
| 3 | `forensics` — full build from `landing-copy.md` | 1, design direction pick |
| 4 | Taproot — collection, post layout, feed, tag index, scaffold post | 2 |
| 5 | Cutover and decommission (§7 Phase B) | 0, 2, 3, 4 |

Phases 2, 3, and 4 are independent once 1 lands.

---

## 9. Verification

Per phase: build passes, internal link check, Lighthouse budget on the two hero pages, and
redirect assertions via `curl -I`.

Phase 0 gate: every record in the DNSimple export resolves identically from the Cloudflare
nameservers.

Phase 5 gate: each hostname serves the expected content and returns Cloudflare response headers,
and mail delivers both directions, before the corresponding legacy host is decommissioned.

---

## 10. Open items

Status as of 2026-07-29 12:15.

| Item | Owner | Blocks | State |
|---|---|---|---|
| Own-voice rewrite of forensics hero and closing | Rob | forensics production deploy | open |
| Tagline selection — three candidates in `sites/forensics/src/copy/landing.ts` | Rob | same | open |
| CTA mechanism — `mailto:` today, or an intake form | Rob | nothing; swap is one line | open |
| Confirm or revert Direction A (D11), applied without explicit sign-off | Rob | nothing; one constant | open |
| Nameserver change at the registrar | Rob | Phase 5 | open |
| Publish DMARC at DNSimple as well as Cloudflare | Rob | nothing, if the cutover is imminent | open |
| Create `rob.` / `kyle.` DNSimple child zones | Rob | nothing — see below | optional |
| DKIM key in Google Workspace | Rob | — | **done**, matching on both providers |
| `dmarc@rootsystem.com` alias | Rob | — | **done** |
| Cloudflare API token expires 2027-01-27 | Rob | future CI deploys | **diarized** |

**On the delegated subtrees.** The `rob.` and `kyle.` records are currently *flat entries inside
the `rootsystem.com` zone* at DNSimple, not child zones — `dig SOA` returns the parent. After the
nameserver change, Cloudflare refers those subtrees to DNSimple's nameservers, which will still
answer, because the `rootsystem.com` zone continues to exist in the DNSimple account. So the
cutover does not break them.

It is nonetheless an unstable arrangement: it depends on DNSimple continuing to serve a zone for a
domain it is no longer authoritative for, and it pays zone fees for a domain that exists only to
answer four redirects. Creating proper `rob.rootsystem.com` and `kyle.rootsystem.com` zones makes
the delegation correct rather than incidental. `scripts/dns-verify.sh` reports this as a WARN
rather than a failure for exactly that reason.
| Design direction — A "Show Your Work" vs B "On the Record" vs hybrid | Rob | Phase 3 |
| Own-voice rewrite of forensics hero, proof, closing | Rob | Phase 3 production deploy (§5) |
| Tagline selection from the bank in `messaging-worksheet.md` §5 | Rob | Phase 3 |
| CTA mechanism — intake form vs `mailto:` | Rob | Phase 3 |
| Taproot visual identity | undecided | Phase 4 |
| Nameserver change at the registrar | Rob | Phase 5 |

**Noted, not scheduled:** rootsystem.com is registered under a personal DNSimple account rather
than the Root System account. DNSimple supports pushing a domain between accounts. A company
domain held under a personal login is a diligence liability, independent of this work.

---

## 11. Out of scope

- Repositioning or rewriting main-site content (D6)
- Migrating existing Sanity blog content (D5)
- Registrar transfer to Cloudflare (D8)
- Print and outreach collateral from `landing-copy.md`
- Cloudflare proxy tuning beyond defaults — WAF rules, cache rules, bot management
