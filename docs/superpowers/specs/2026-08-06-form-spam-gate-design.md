---
title: Form spam gate — Turnstile on the contact and case-intake endpoints
created: 2026-08-06
status: draft-v1 — pending review
related: docs/roadmap.md (track 1)
---

# Form spam gate — design

Add Cloudflare Turnstile to both form endpoints on both properties, verified
server-side, rejecting submissions without a valid token.

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
a bot gets no signal to adapt. There is no rate limit and no challenge.

Both form pages are already `prerender = false`, because they read `?sent` and
`?error` back out of the query string. Both already print a `mailto:` fallback
address above and below the form.

No Turnstile widget exists on the account. *Source:
`GET /accounts/3add5f61c3e75935c8bd7e085afed9bd/challenges/widgets` on
2026-08-06 returned `total_count: 0`.*

---

## 2. Decisions

| # | Decision | Reasoning |
|---|---|---|
| S1 | Turnstile in **Managed** mode | Cloudflare selects invisible or interactive per visitor rather than the site fixing the friction level in advance. |
| S2 | **Fail closed** | A submission that arrives without a token that passes `siteverify` is rejected, including when `siteverify` itself is unreachable. Selected over fail-open on 2026-08-06. Both form pages already carry a `mailto:` fallback, so a rejected submitter has a route that does not depend on the challenge. |
| S3 | **One widget, both hostnames** | `rootsystem.com` and `forensics.rootsystem.com` on a single widget: one secret in 1Password, one sitekey, one provisioning pass. Trade-off accepted: analytics are pooled and a secret rotation touches both Workers together. |
| S4 | Keep the honeypot | It costs nothing and runs before the network call to `siteverify`. |
| S5 | No shared package | `sites/www/src/lib/form.ts` carries a note to extract at a third consumer. This is the second. The duplication stays. |
| S6 | Sitekey in `vars`, secret via `wrangler secret` | The sitekey is public by design and belongs in `wrangler.jsonc`; both form pages render on demand and can read it from `env`. The secret is encrypted per Worker and never enters the repository. |

---

## 3. Provisioning

The widget does not exist and has to be created with both hostnames in its
domain list.

The Cloudflare API token can read Turnstile widgets, shown above. Read access
does not establish write access — the same token returned 200 on
`GET /rulesets` while lacking Dynamic Redirect write, recorded in the 2026-07-29
handoff. The create call has to be attempted and its result read; if it returns
403, the widget is created in the dashboard instead.

Creating the widget returns the sitekey and the secret. The secret needs a
1Password entry in the Engineering vault, added by Rob — this design does not
write to a vault. Once the entry exists it is referenced from `fnox.toml`
alongside the three secrets already there, then pushed to each Worker:

```bash
wrangler secret put TURNSTILE_SECRET_KEY --config sites/www/wrangler.jsonc
wrangler secret put TURNSTILE_SECRET_KEY --config sites/forensics/wrangler.jsonc
```

The value is piped from fnox at the time of the put so it does not land on disk.

`wrangler types` regenerates `worker-configuration.d.ts` in each site to pick up
the new binding.

---

## 4. Client

Implicit rendering. Each form page gains the Turnstile script and a container
div inside its existing `<form>`:

```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
...
<div class="cf-turnstile" data-sitekey={sitekey}></div>
```

The widget injects its own `cf-turnstile-response` input into the enclosing form,
so no JavaScript of ours is involved in wiring the token to the POST.

A `<noscript>` block sits next to the container and points at the `mailto:`
address already on the page. This is the visible consequence of S2: the widget
cannot render without JavaScript, so the form cannot be submitted without it.

---

## 5. Server

A `verifyTurnstile()` helper is added to `sites/www/src/lib/form.ts` and its
forensics twin. It POSTs to
`https://challenges.cloudflare.com/turnstile/v0/siteverify` with `secret`,
`response`, `remoteip` (from the `cf-connecting-ip` header), and an
`idempotency_key` from `crypto.randomUUID()` so a retry is safe. It returns
whether the response body reported `success`.

*Source: Cloudflare Turnstile server-side validation documentation, retrieved
2026-08-06. The endpoint accepts form-encoded or JSON and always answers JSON.
`remoteip` and `idempotency_key` are optional.*

Handler order in both endpoints becomes:

1. content-type check (unchanged)
2. `await request.formData()` (unchanged)
3. honeypot — discard, answer with the success redirect (unchanged)
4. **Turnstile verification**
5. field validation and `looksLikeEmail` (unchanged)
6. D1 insert (unchanged)

Verification precedes validation so an unverified request never reaches D1. The
honeypot precedes verification because it is local and free.

### Failure handling

Every path that is not a reported `success` redirects to `?error=captcha`:
absent token, `success: false`, a non-200 from `siteverify`, or a thrown fetch.
The distinguishing detail goes to `console.error`, which reaches the Worker logs
— `observability` is enabled in both `wrangler.jsonc` files.

Turnstile tokens are single-use and expire after 300 seconds. *Source: Cloudflare
Turnstile client-side rendering documentation, retrieved 2026-08-06.* A
resubmitted or stale token therefore fails verification for reasons that have
nothing to do with the submitter, so the `error=captcha` copy tells them to
reload the page and send again rather than reporting a failed check.

Both form pages gain an `error === 'captcha'` branch in the existing
`errorMessage` ternary.

---

## 6. Development and testing

Cloudflare publishes dummy keys so local runs and automated tests never call the
live service. *Source: Cloudflare Turnstile testing documentation, retrieved
2026-08-06.*

| Purpose | Sitekey | Secret |
|---|---|---|
| Always passes | `1x00000000000000000000AA` | `1x0000000000000000000000000000000AA` |
| Always fails | `2x00000000000000000000AB` | `2x0000000000000000000000000000000AA` |
| Returns `token already spent` | — | `3x0000000000000000000000000000000AA` |
| Forces an interactive challenge | `3x00000000000000000000FF` | — |

`astro dev` uses the always-pass pair. The always-fail pair exercises the
`error=captcha` branch, and the token-already-spent secret exercises the replay
case, both without touching production keys.

---

## 7. Verification

- Both sites build.
- A submission from a clean browser on each property inserts a row in the
  expected D1 table.
- A POST to each endpoint with no `cf-turnstile-response` field returns 303 to
  `?error=captcha` and inserts nothing.
- Replaying a captured token a second time returns `?error=captcha`.
- With JavaScript disabled, the `<noscript>` fallback is visible and the
  `mailto:` address is reachable.
- The honeypot still answers with the success redirect and inserts nothing.

`docs/teardown-order.md` §1 holds Netlify deletion until a genuine inbound
contact submission from a stranger has landed. That gate measures the path this
change alters, so the checks above run before the change is deployed to the apex,
where a deploy moves production traffic.

---

## 8. Open questions

- Whether the Cloudflare API token can create a Turnstile widget, or the widget
  is created in the dashboard.
- Which 1Password vault entry name to use for the secret, and who creates it.
