# Comparing front-end builds locally

`scripts/frontend-compare.py` builds several versions of a site at once, labels
each one, and serves them side by side with their scrolling tied together.

It exists because deploying a preview per branch stopped working as a way to
judge visual changes. With several variants open at the same time it was no
longer obvious which preview was on screen, and at one point a layout branch
that had never been pushed looked identical to the one that had — the comparison
was against itself.

```bash
scripts/frontend-compare.py up forensics working rob/forensics-copy-e
```

Nothing needs installing first. The script runs under `uv run --script` and
resolves its own dependencies; `uv` is pinned in `mise.toml`.

## Commands

### `up` — build and serve

```bash
scripts/frontend-compare.py up forensics working rob/forensics-copy-e
scripts/frontend-compare.py up www main my-branch --open
```

Prints a URL per build plus a compare page. The compare page holds two builds at
a time — a dropdown per pane, so with three or more refs you can look at any
pair — with route buttons across the top, a viewport-width selector, a zoom
slider, and scroll sync.

Every page carries a coloured badge in the bottom-left naming its ref, so a tab
that drifts away from the compare page is still identifiable.

### `shots` — screenshots

```bash
scripts/frontend-compare.py shots forensics working --width 1440 --width 390
scripts/frontend-compare.py shots forensics working rob/forensics-copy-e --route / --out ./shots
```

Full-page PNGs for every ref × route × width. Defaults to every prerendered
route at 1440px, written under the scratch directory unless `--out` says
otherwise.

### `probe` — measurements

```bash
scripts/frontend-compare.py probe forensics working
scripts/frontend-compare.py probe forensics working --selector 'h2=.wrap h2' --selector 'body=.measure p'
```

With `--selector name=css`, reports computed styles — font, size, leading,
weight, tracking, colour, margin, padding, rendered width — for one matching
node each.

With no selector, reports per-block line metrics for every substantial
paragraph, list item and definition on the page: characters per line, line
count, rendered width, size, leading, and the gap below.

That second mode is the useful one when something reads badly but it is not
obvious why. It found a paragraph gap of 20px sitting under a 26.4px line box —
paragraphs were closer together than the lines inside them — and later that a
card grid had squeezed its columns to 264px and 14–30 characters a line. Both
were invisible in the stylesheet and obvious in the measurements.

## Refs

Any branch, tag or commit works. The literal ref `working` means the current
working tree, so uncommitted changes can be compared against a committed branch:

```bash
scripts/frontend-compare.py up forensics working rob/forensics-copy-e
```

Named refs are built by checking them out in turn, so tracked changes must be
committed or stashed first — the script refuses rather than risking them.
Untracked files are fine, since they survive a checkout. The branch you started
on is restored at the end, including when a build fails partway through.

## Notes

**Badges and the scroll shim go into the built copies only.** They are injected
into the output under the system temp directory, never into source, so there is
nothing to strip out of the repository afterwards. The stamp is idempotent, so
rebuilding and re-stamping is safe.

**The frames render at a real desktop viewport and are scaled down.** Sizing
them to the pane instead would put both under the site's own breakpoints and
show two identical narrow layouts — hiding the thing being compared. Use the
width selector to check a genuine mobile viewport.

**Scroll syncs as a ratio, not in pixels.** Two builds of the same page rarely
have the same height, and pixel sync drifts further apart the further down you
go.

**Ports walk upward from 8800** until they find a free one, so an already-running
dev server does not stop a run. Read the ports it prints rather than assuming
them.

Builds live under `$TMPDIR/frontend-compare-<repo>/<site>/<ref>/` and are
rebuilt from scratch each run. The script only ever deletes inside that
directory, and checks for a marker file before it does.

## Adding a site

Nothing to configure. The first argument is any directory under `sites/` with a
`package.json`; the script runs its `build` script, finds the static output, and
discovers routes from the prerendered `index.html` files it produced.
