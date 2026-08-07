---
title: Form spam gate — Turnstile, spam quarantine, and email notification
created: 2026-08-06
status: draft-v2 — pending review
related: docs/roadmap.md (track 1)
---

# Form spam gate — design

Add Cloudflare Turnstile to both form endpoints, record a spam verdict against
every stored submission, and email the clean ones to a per-property address via
Resend.

v2 replaces the fail-closed posture of v1. v1 rejected anything that failed
verification and stored nothing. v2 stores everything that carries a token,
labels it, and withholds only the notification. Rationale: a labeled corpus of
what the gate actually catches on real traffic is worth more than an early
rejection, and nothing is lost by keeping the rows.

---

## 1. Current state

Two form endpoints, one per property, both writing to the shared D1 database
`rootsystem-forms` (`218e6fe4-44bd-4d12-a630-9a2c17cc863d`):

| Page | Endpoint | Table |
|---|---|---|
| `sites/www/src/pages/contact.astro` | `sites/www/src/pages/api/contact.ts` | `contact_submissions` |
| `sites/forensics/src/pages/scope.astro` | `sites/forensics/src/pages/api/intake.ts` | `case_intake` |

Anti-automation today is one honeypot field. `isBot()` in
`sites/www/src/lib/form.ts` returns true when a hidden `website` input is filled,
and the handler answers with the same 303 success redirect a person receives, so
a bot gets no signal to adapt. The submission is discarded rather than recorded.
There is no rate limit, no challenge, and no notification — submissions sit in
D1 until someone queries the table.

Both form pages are already `prerender = false`, because they read `?sent` and
`?error` back out of the query string. Both print `partners@rootsystem.com` as a
fallback address above and below the form.

### Already provisioned

The Turnstile widget exists. *Source:
`GET /accounts/3add5f61c3e75935c8bd7e085afed9bd/challenges/widgets` on
2026-08-06.*

| Field | Value |
|---|---|
| Name | `RS-web-properties-turnstile` |
| Mode | `managed` |
| Domains | `rootsystem.com` |
| Region | `world` |

A root domain also authorizes every subdomain, so `forensics.rootsystem.com` is
covered without adding it. *Source: Cloudflare Turnstile hostname management
documentation, retrieved 2026-08-06.*

Both keys are referenced from `fnox.toml`, resolving to
`op://Engineering/rs-cloudflare-dot-com-turnstile-secret`.

---

## 2. Decisions

| # | Decision | Reasoning |
|---|---|---|
| S1 | Turnstile in **Managed** mode | Cloudflare selects invisible or interactive per visitor rather than the site fixing the friction level in advance. Already configured this way. |
| S2 | **Quarantine, not rejection** | A submission whose token fails verification is stored with a spam verdict and withheld from notification. Supersedes v1's fail-closed rejection. |
| S3 | **Reject a missing token outright** | No `cf-turnstile-response` field at all means the request did not come from the rendered form. Nothing is stored. This is the one hard block, and it is what the `<noscript>` fallback exists for. |
| S4 | Keep the honeypot, and record its hits | It costs nothing and runs before the network call to `siteverify`. Unlike v1 it now stores the row rather than discarding it. |
| S5 | `spam_reason` and `spam_detail`, no boolean | Spam-ness is `spam_reason IS NOT NULL`. A separate flag would be a second source of truth for the same fact. `spam_reason` is a short category, `spam_detail` is free text. |
| S6 | Resend, sending from `send.rootsystem.com` | A dedicated subdomain carries its own SPF and DKIM, leaving the apex records that serve Google Workspace untouched. |
| S7 | One notification address, `contact@rootsystem.com` | Both properties notify the same mailbox. The subject line carries the property, so the feeds stay filterable without a second mailbox to maintain. Revised 2026-08-06 from the per-property split originally chosen. |
| S8 | Notification awaited, not backgrounded | `ctx.waitUntil` would return the redirect sooner but leaves `status` written after the response. At this volume the accuracy is worth a few hundred milliseconds. |
| S9 | No shared package | `sites/www/src/lib/form.ts` carries a note to extract at a third consumer. This is the second. The duplication stays, though the Turnstile helpers roughly triple the size of the duplicated part. |
| S10 | An unreachable `siteverify` is **not** spam | Added during implementation. A failed verification is a judgment about the submitter; an unreachable endpoint is a fact about our own infrastructure. Folding the second into the first would mean a Cloudflare incident silently converts every genuine enquiry into a held row nobody is notified about. |

---

## 3. Schema

Migration `db/migrations/0002_spam_and_delivery.sql`. `0001` is not edited.

Three columns on each of `contact_submissions` and `case_intake`:

| Column | Type | Meaning |
|---|---|---|
| `status` | `TEXT NOT NULL DEFAULT 'pending'` | Delivery state. Distinct from `handled_at`, which is human triage. |
| `spam_reason` | `TEXT` | Comma-joined categories. `NULL` means clean. |
| `spam_detail` | `TEXT` | Free text supporting the verdict. |

`status` values:

- `pending` — stored, notification not yet attempted
- `notified` — notification accepted by Resend
- `held` — deliberately not sent, because `spam_reason` is set
- `failed` — send attempted and errored

`spam_reason` values, extensible:

- `honeypot` — the decoy field was filled
- `turnstile` — a token was present and `siteverify` did not report success

Both can appear on one row, comma-joined.

`spam_detail` carries the Turnstile `error-codes`, joined, and the honeypot value
truncated to 100 characters — the latter is useful for seeing what is filling the
field. Both are attacker-controlled strings, stored as bound parameters like
every other field.

An index on `status` supports the pending queue.

---

## 4. Request flow

Both endpoints follow the same shape.

1. Content-type check. Unchanged.
2. `await request.formData()`.
3. **No `cf-turnstile-response` field** → 303 to `?error=captcha`. Nothing stored.
4. Verify the token against `siteverify`. The outcome is three-state — `pass`,
   `fail`, or `unavailable` (S10). Only `fail` is a spam reason. `unavailable`
   records a `spam_detail` explaining that the check never ran, and the
   submission proceeds as clean, so an outage degrades screening rather than
   stopping notification.
5. Collect spam reasons: honeypot filled, verification failed, or both.
6. **Spam** → insert with `status = 'held'` and no validation, because rejecting
   spam on a malformed email address would lose the log entry that is the point
   of storing it. Then respond:
   - honeypot → the success redirect, unchanged from today. A person does not
     fill a hidden field, so there is no false positive to worry about.
   - turnstile → `?error=captcha`. Turnstile does produce false positives, and a
     person who failed a challenge needs to be told to retry rather than given a
     silent "thanks" for a message nobody will read.
7. **Clean** → validate fields as today, insert with `status = 'pending'`, send
   the notification, then update `status` to `notified` or `failed`. Respond with
   the success redirect regardless of whether the mail sent — the row is stored
   either way and the submitter cannot act on a mail failure.

Verification precedes validation so an unverified request never reaches the
validation path. The honeypot precedes verification because it is local and free.

Turnstile tokens are single-use and expire after 300 seconds. *Source: Cloudflare
Turnstile client-side rendering documentation, retrieved 2026-08-06.* A
resubmitted or stale token therefore fails for reasons unrelated to the
submitter, so the `error=captcha` copy says to reload and send again rather than
reporting a failed check.

---

## 5. Client

Implicit rendering. Each form page gains the Turnstile script and a container div
inside its existing `<form>`:

```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
...
<div class="cf-turnstile" data-sitekey={sitekey}></div>
```

The widget injects its own `cf-turnstile-response` input into the enclosing form,
so no JavaScript of ours wires the token to the POST.

A `<noscript>` block sits next to the container pointing at the fallback address
already on the page. Without JavaScript the widget never renders, no token is
sent, and S3 rejects the submission.

---

## 6. Notification

`sendNotification()` in a new `notify.ts` alongside `form.ts` in each site. It
POSTs JSON to `https://api.resend.com/emails` with a bearer key, taking `from`,
`to`, `subject`, `text` and `reply_to`. *Source: Resend email-sending
documentation, retrieved 2026-08-06.*

`reply_to` is set to the submitter's address so a reply goes to them directly.

When `RESEND_API_KEY` is absent the function returns `skipped` without calling
out, and the row stays `pending`. This is what lets the rest of the change ship
before the Resend account is configured; a later backfill can sweep `pending`.

| Property | To | Subject |
|---|---|---|
| Contact | `contact@rootsystem.com` | `[rootsystem.com] Contact — <name>` |
| Case intake | `contact@rootsystem.com` | `[forensics] Case intake — <name>` |

The `mailto:` fallback printed on both pages remains `partners@rootsystem.com`.
That is the public address; `contact@` is where the Worker delivers.

### Confidentiality of the intake body

`db/migrations/0001_init.sql` carries a note that `case_intake.matter_summary`
receives free text from litigators that can contain privileged or
client-identifying detail, and that rows should be triaged and cleared promptly
rather than accumulating. Emailing that text copies it into a Gmail mailbox,
which is a second place it persists outside the triage window.

The notification includes the summary. Confirmed by Rob on 2026-08-06, on two
grounds: a litigator is not expected to type privileged detail into a web form,
and the database side is already secured. A notification without the substance
would not support triage.

---

## 7. Configuration

| Name | Where | Value |
|---|---|---|
| `TURNSTILE_SITE_KEY` | `wrangler.jsonc` `vars` | public by design |
| `TURNSTILE_SECRET_KEY` | `wrangler secret put`, per Worker | from 1Password |
| `RESEND_API_KEY` | `wrangler secret put`, per Worker | from 1Password |
| `NOTIFY_TO` | `wrangler.jsonc` `vars` | per property |
| `NOTIFY_FROM` | `wrangler.jsonc` `vars` | `forms@send.rootsystem.com` |

Secrets are piped from fnox at the time of the put so they never land on disk.
`wrangler types` regenerates `worker-configuration.d.ts` in each site.

### DNS

Adding `send.rootsystem.com` in Resend produces the SPF and DKIM records it
requires. The zone is at Cloudflare and the API token writes DNS, so the records
can be applied by script. The apex SPF and the Google Workspace MX records are
not touched.

---

## 8. Development and testing

Cloudflare publishes dummy keys so local runs never call the live service.
*Source: Cloudflare Turnstile testing documentation, retrieved 2026-08-06.*

| Purpose | Sitekey | Secret |
|---|---|---|
| Always passes | `1x00000000000000000000AA` | `1x0000000000000000000000000000000AA` |
| Always fails | `2x00000000000000000000AB` | `2x0000000000000000000000000000000AA` |
| Returns `token already spent` | — | `3x0000000000000000000000000000000AA` |
| Forces an interactive challenge | `3x00000000000000000000FF` | — |

`astro dev` reads these from `sites/*/.dev.vars`, which is gitignored;
`.dev.vars.example` is tracked and holds the always-pass pair with an empty
`RESEND_API_KEY`. `wrangler types` reads the same file, which is how the secret
bindings reach `worker-configuration.d.ts`.

The always-pass secret accepts any non-empty token string, so the endpoints can
be exercised with `curl` without rendering a widget. Swapping the secret to the
always-fail or token-already-spent value exercises the quarantine and replay
paths.

Astro's origin check rejects a `POST` whose `Origin` header does not match the
site, before the handler runs. A browser sends it; `curl` does not, and returns
403 until `-H "Origin: http://localhost:<port>"` is added. This predates the
change and is noted because it otherwise looks like the gate rejecting the
request.

---

## 9. Verification

Run against `astro dev` with both migrations applied to the local D1 state on
2026-08-06. Results as observed.

| Case | Response | Row |
|---|---|---|
| No `cf-turnstile-response` | 303 `?error=captcha` | none written |
| Clean, always-pass secret | 303 `?sent=1` | `status=pending`, `spam_reason=NULL` |
| Honeypot filled | 303 `?sent=1` | `status=held`, `spam_reason=honeypot`, detail `honeypot: http://spam.example` |
| Always-fail secret | 303 `?error=captcha` | `status=held`, `spam_reason=turnstile`, detail `turnstile: invalid-input-response` |
| Token-already-spent secret | 303 `?error=captcha` | `status=held`, `spam_reason=turnstile`, detail `turnstile: timeout-or-duplicate` |

Both sites build and `astro check` reports zero errors. `/contact` and `/scope`
render the widget container with the dev sitekey, the `<noscript>` fallback, and
the `?error=captcha` copy.

The `unavailable` branch (S10) is not covered by these runs — reproducing it
means making `challenges.cloudflare.com` unreachable from the Worker.

### Post-deploy, against production

Run on 2026-08-06 after deploying both Workers.

| Check | Result |
|---|---|
| `GET https://rootsystem.com/` | 200 |
| `/contact` markup | production sitekey `0x4AAAAAAEIqxIXHXECV_Vvj`, widget container, `<noscript>` |
| POST with no token | 303 `?error=captcha`, no row |
| POST with a garbage token | 303 `?error=captcha`; remote row id 7 `status=held`, `spam_reason=turnstile`, detail `turnstile: invalid-input-response` |

The last check is the load-bearing one: the error code is
`invalid-input-response` rather than `invalid-input-secret`, so the Worker
reached `siteverify` with a secret Cloudflare accepted.

A real browser submission through the rendered widget followed, recorded as row
id 8: `status = 'notified'`, `spam_reason` null. That covers the remaining path
— a token that passes `siteverify`, a clean insert, and a send Resend accepted.
Delivery to `contact@rootsystem.com` was confirmed by hand for that submission.

Note for future reading of the column: `notified` records acceptance by the
Resend API, not delivery. The two coincided here because delivery was checked
separately.

Row id 7 is the synthetic garbage-token check above, left in place as evidence;
it is `held`, so a backlog sweep will not pick it up.

The four rows that predate this change defaulted to `status = 'pending'`. They
are the synthetic cutover tests from 2026-07-29, not a real backlog.

`docs/teardown-order.md` §1 holds Netlify deletion until a genuine inbound
contact submission from a stranger has landed. That gate measures the path this
change alters, so a live check runs after deploying to the apex, where a deploy
moves production traffic.

---

## 10. Open items

| Item | Owner | Blocks |
|---|---|---|
| — | — | — |

All items from draft-v2 are closed as of 2026-08-06:

- `send.rootsystem.com` is added to Resend and its SPF, DKIM and feedback MX
  records are live in the Cloudflare zone. *Source:
  `GET /zones/6404dc8cf899e2a7d7af28bd94f1b198/dns_records`.*
- The sending key is a send-only, domain-scoped key at
  `op://Engineering/rs-resend-rs-dot-com-sending-api-key`, referenced from
  `fnox.toml`. It cannot read the Resend account, which is why domain status
  here is evidenced from DNS rather than from the Resend API.
- Notification goes to `contact@rootsystem.com` for both properties (S7), so no
  new alias is needed.
- The intake-body question in §6 is resolved.
