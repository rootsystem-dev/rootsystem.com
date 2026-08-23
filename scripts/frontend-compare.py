#!/usr/bin/env -S uv run --script
# /// script
# requires-python = ">=3.11"
# dependencies = ["playwright>=1.40"]
# ///
"""Build several versions of a site side by side and look at them locally.

Front-end changes are judged by looking, and the cheapest way to look at two
versions is not to deploy two previews -- it is to build both locally, label
them so a stray tab is always identifiable, and put them in one window with
their scrolling tied together.

    scripts/frontend-compare.py up forensics working rob/forensics-copy-e
    scripts/frontend-compare.py shots forensics working --route / --route /method/
    scripts/frontend-compare.py probe forensics working --selector 'h2=.wrap h2'

`working` is a ref like any other and means the current working tree, so
uncommitted changes can be compared against a branch. Real refs are built by
checking them out in turn, so the tree must be clean for those; the original
branch is restored at the end even if a build fails.

The badge and the scroll-sync shim are injected into the *built copies* under
the system temp directory, never into source, so there is nothing to strip out
of the repository afterwards. Re-running is safe: the stamp is idempotent.
"""

from __future__ import annotations

import argparse
import http.server
import json
import os
import pathlib
import shutil
import socketserver
import subprocess
import sys
import tempfile
import threading

REPO = pathlib.Path(__file__).resolve().parent.parent
MARKER = ".frontend-compare"
BASE_PORT = 8800
WORKING = "working"

# Colours for the badges, in the order refs are given. Chosen to stay legible
# on both the light and dark grounds a site might paint behind them.
BADGE_COLOURS = ["#242b36", "#2f855a", "#b7791f", "#6b46c1", "#2b6cb0", "#c53030"]


# --------------------------------------------------------------------------
# shell helpers


def run(cmd: list[str], cwd: pathlib.Path | None = None, quiet: bool = True) -> str:
    """Run a command, raising with the captured output if it fails."""
    proc = subprocess.run(
        cmd,
        cwd=cwd or REPO,
        capture_output=True,
        text=True,
    )
    if proc.returncode != 0:
        sys.exit(
            f"\n$ {' '.join(cmd)}\n(in {cwd or REPO})\n"
            f"{proc.stdout[-2000:]}{proc.stderr[-2000:]}"
        )
    if not quiet:
        print(proc.stdout.strip())
    return proc.stdout.strip()


def git(*args: str) -> str:
    return run(["git", *args])


def current_branch() -> str:
    return git("rev-parse", "--abbrev-ref", "HEAD")


def tree_is_clean() -> bool:
    """Untracked files are ignored: they survive a checkout, so they do not
    make switching refs unsafe, and refusing on them would block a run for a
    stray scratch file."""
    return git("status", "--porcelain", "--untracked-files=no") == ""


def slug(ref: str) -> str:
    return ref.replace("/", "-").replace(" ", "-")


def tool_root() -> pathlib.Path:
    """A scratch directory this tool owns, keyed by repository name."""
    root = pathlib.Path(tempfile.gettempdir()) / f"frontend-compare-{REPO.name}"
    root.mkdir(parents=True, exist_ok=True)
    (root / MARKER).touch()
    return root


def wipe(path: pathlib.Path) -> None:
    """Delete a directory, but only inside this tool's own scratch root.

    The marker check is the point: a bad --site or a stray argument should fail
    here rather than remove something that matters.
    """
    # Both sides are resolved before comparing: on macOS the temp directory is
    # reached through /var, which is a symlink to /private/var, so an unresolved
    # root never appears in a resolved path's parents.
    root = tool_root().resolve()
    path = path.resolve()
    if not (root / MARKER).exists():
        sys.exit("refusing to delete: scratch marker missing")
    if root not in path.parents and path != root:
        sys.exit(f"refusing to delete outside the scratch root: {path}")
    if path.exists():
        shutil.rmtree(path)


# --------------------------------------------------------------------------
# stamping


BADGE = """<!--frontend-compare-->
<div style="position:fixed;left:0;bottom:0;z-index:99999;font:600 12px/1 ui-monospace,Menlo,monospace;
letter-spacing:.1em;padding:9px 14px;background:{colour};color:#fff;border-top-right-radius:6px;
pointer-events:none">{label}</div>
<script>
(function () {{
  // Scroll travels as a ratio, not pixels: the builds being compared have
  // different page heights, so pixel sync drifts further apart down the page.
  var lock = false;
  addEventListener('scroll', function () {{
    if (lock || parent === window) return;
    var h = document.documentElement.scrollHeight - innerHeight;
    parent.postMessage({{ __sync: h > 0 ? scrollY / h : 0 }}, '*');
  }}, {{ passive: true }});
  addEventListener('message', function (e) {{
    if (!e.data || typeof e.data.__apply !== 'number') return;
    lock = true;
    var h = document.documentElement.scrollHeight - innerHeight;
    scrollTo(0, e.data.__apply * h);
    setTimeout(function () {{ lock = false; }}, 60);
  }});
}})();
</script>
"""


def stamp(target: pathlib.Path, label: str, colour: str) -> int:
    snippet = BADGE.format(label=label, colour=colour)
    n = 0
    for path in target.rglob("*.html"):
        text = path.read_text(encoding="utf-8")
        if "<!--frontend-compare-->" in text or "</body>" not in text:
            continue
        path.write_text(text.replace("</body>", snippet + "</body>", 1), encoding="utf-8")
        n += 1
    return n


# --------------------------------------------------------------------------
# building


def site_dir(site: str) -> pathlib.Path:
    path = REPO / "sites" / site
    if not (path / "package.json").exists():
        available = sorted(p.name for p in (REPO / "sites").iterdir() if p.is_dir())
        sys.exit(f"no site '{site}'. available: {', '.join(available)}")
    return path


def build_one(site: str, ref: str, index: int) -> pathlib.Path:
    """Build one ref and return the directory holding its static output."""
    out = tool_root() / site / slug(ref)
    label = "WORKING TREE" if ref == WORKING else ref
    print(f"  building {label} …", flush=True)

    run(["npm", "run", "build"], cwd=site_dir(site))

    produced = site_dir(site) / "dist" / "client"
    if not produced.exists():                      # a purely static build
        produced = site_dir(site) / "dist"
    wipe(out)
    out.parent.mkdir(parents=True, exist_ok=True)
    shutil.copytree(produced, out)

    pages = stamp(out, label.upper(), BADGE_COLOURS[index % len(BADGE_COLOURS)])
    print(f"    {pages} pages stamped -> {out}")
    return out


def build_all(site: str, refs: list[str]) -> dict[str, pathlib.Path]:
    real_refs = [r for r in refs if r != WORKING]
    if real_refs and not tree_is_clean():
        sys.exit(
            "working tree is dirty, and building a named ref needs to check it out.\n"
            "commit or stash first, or compare only the 'working' ref."
        )
    for ref in real_refs:
        run(["git", "rev-parse", "--verify", ref])

    started_on = current_branch()
    builds: dict[str, pathlib.Path] = {}
    try:
        # The working tree is built first, before any checkout moves it.
        for i, ref in enumerate(refs):
            if ref != WORKING:
                git("checkout", "--quiet", ref)
            builds[ref] = build_one(site, ref, i)
    finally:
        if current_branch() != started_on:
            git("checkout", "--quiet", started_on)
            print(f"  restored {started_on}")
    return builds


# --------------------------------------------------------------------------
# the compare page


COMPARE_PAGE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{site} — compare</title>
<style>
  * {{ box-sizing: border-box; }}
  body {{ margin: 0; background: #0f1216; font: 13px/1.4 ui-monospace, Menlo, monospace; color: #eef2f6; }}
  .bar {{ display: flex; align-items: center; gap: 1.25rem; padding: 0.6rem 1rem; background: #1a1f25;
         position: sticky; top: 0; z-index: 5; flex-wrap: wrap; }}
  .routes {{ display: flex; gap: 0.35rem; margin-right: auto; flex-wrap: wrap; }}
  button {{ font: inherit; background: transparent; color: #8d99a6; border: 1px solid #3a444f;
           border-radius: 4px; padding: 0.25rem 0.6rem; cursor: pointer; }}
  button[aria-pressed="true"] {{ background: #2f855a; border-color: #2f855a; color: #fff; }}
  select {{ font: inherit; background: #0f1216; color: #eef2f6; border: 1px solid #3a444f;
           border-radius: 4px; padding: 0.2rem 0.35rem; }}
  label {{ color: #8d99a6; display: flex; align-items: center; gap: 0.4rem; }}
  .panes {{ display: grid; grid-template-columns: 1fr 1fr; gap: 2px; background: #3a444f; }}
  .pane {{ background: #0f1216; overflow: hidden; }}
  /* The frames render at a real desktop viewport and are scaled down to fit.
     Sizing them to the pane instead would put both under the site's own
     breakpoints, showing two identical narrow layouts. */
  iframe {{ border: 0; transform-origin: top left; display: block; background: #fff; }}
</style>
</head>
<body>
  <div class="bar">
    <div class="routes" id="routes"></div>
    <label>left <select id="pickA"></select></label>
    <label>right <select id="pickB"></select></label>
    <label><input type="checkbox" id="sync" checked> sync</label>
    <label>width <select id="vw">
      <option value="1280">1280</option>
      <option value="1440">1440</option>
      <option value="1024">1024</option>
      <option value="820">820</option>
      <option value="390">390</option>
    </select></label>
    <label>zoom <input type="range" id="zoom" min="25" max="100" value="50" style="width:6rem"></label>
    <span id="zoomval" style="color:#8d99a6">50%</span>
  </div>
  <div class="panes">
    <div class="pane"><iframe id="a"></iframe></div>
    <div class="pane"><iframe id="b"></iframe></div>
  </div>
<script>
  const BUILDS = {builds};
  const ROUTES = {routes};
  const a = document.getElementById('a');
  const b = document.getElementById('b');
  const zoom = document.getElementById('zoom');
  const vw = document.getElementById('vw');
  const sync = document.getElementById('sync');
  let LEFT = BUILDS[0][1];
  let RIGHT = BUILDS[Math.min(1, BUILDS.length - 1)][1];
  let route = ROUTES[0];

  const load = () => {{ a.src = LEFT + route; b.src = RIGHT + route; }};

  function fit() {{
    const scale = zoom.value / 100;
    const width = Number(vw.value);
    document.getElementById('zoomval').textContent = zoom.value + '%';
    const paneH = window.innerHeight - document.querySelector('.bar').offsetHeight;
    for (const f of [a, b]) {{
      f.style.width = width + 'px';
      f.style.height = paneH / scale + 'px';
      f.style.transform = 'scale(' + scale + ')';
    }}
    document.querySelectorAll('.pane').forEach((p) => {{ p.style.height = paneH + 'px'; }});
  }}

  for (const [sel, initial, assign] of [
    [document.getElementById('pickA'), LEFT, (v) => {{ LEFT = v; }}],
    [document.getElementById('pickB'), RIGHT, (v) => {{ RIGHT = v; }}],
  ]) {{
    BUILDS.forEach(([name, url]) => {{
      const opt = document.createElement('option');
      opt.value = url; opt.textContent = name; opt.selected = url === initial;
      sel.append(opt);
    }});
    sel.onchange = () => {{ assign(sel.value); load(); }};
  }}

  const routes = document.getElementById('routes');
  ROUTES.forEach((r) => {{
    const btn = document.createElement('button');
    btn.textContent = r;
    btn.setAttribute('aria-pressed', String(r === route));
    btn.onclick = () => {{
      route = r;
      routes.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === btn)));
      load();
    }};
    routes.append(btn);
  }});

  addEventListener('message', (e) => {{
    if (!sync.checked || !e.data || typeof e.data.__sync !== 'number') return;
    for (const f of [a, b]) {{
      if (f.contentWindow !== e.source) f.contentWindow.postMessage({{ __apply: e.data.__sync }}, '*');
    }}
  }});

  zoom.oninput = fit;
  vw.onchange = fit;
  addEventListener('resize', fit);
  load();
  fit();
</script>
</body>
</html>
"""


def discover_routes(build: pathlib.Path) -> list[str]:
    """Every prerendered route, as the compare page's route buttons."""
    routes = set()
    for path in build.rglob("index.html"):
        rel = path.parent.relative_to(build).as_posix()
        routes.add("/" if rel == "." else f"/{rel}/")
    return sorted(routes, key=lambda r: (r.count("/"), r))


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):  # noqa: D102 - silence per-request logging
        pass


class ReusableServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


def serve(directory: pathlib.Path, port: int) -> int:
    """Serve a directory, walking up from `port` until a free one is found.

    Something else is often already on 8800 -- an earlier run of this tool, or
    any other dev server -- and failing the whole build over it would be a poor
    trade for a number nobody cares about. The port actually used is returned
    and printed.
    """
    handler = lambda *a, **kw: QuietHandler(*a, directory=str(directory), **kw)  # noqa: E731
    for candidate in range(port, port + 40):
        try:
            httpd = ReusableServer(("127.0.0.1", candidate), handler)
        except OSError:
            continue
        threading.Thread(target=httpd.serve_forever, daemon=True).start()
        return candidate
    sys.exit(f"no free port in {port}..{port + 40}")


def serve_each(builds: dict[str, pathlib.Path]) -> dict[str, int]:
    """Serve every build, returning the port each one landed on."""
    ports: dict[str, int] = {}
    next_port = BASE_PORT + 1
    for ref, path in builds.items():
        ports[ref] = serve(path, next_port)
        next_port = ports[ref] + 1
    return ports


def serve_all(site: str, builds: dict[str, pathlib.Path], open_browser: bool) -> None:
    entries = []
    next_port = BASE_PORT + 1
    for ref, path in builds.items():
        port = serve(path, next_port)
        next_port = port + 1
        entries.append([("working tree" if ref == WORKING else ref), f"http://localhost:{port}"])

    page_dir = tool_root() / site / "_compare"
    wipe(page_dir)
    page_dir.mkdir(parents=True)
    compare_port = serve(page_dir, BASE_PORT)
    (page_dir / "index.html").write_text(
        COMPARE_PAGE.format(
            site=site,
            builds=json.dumps(entries),
            routes=json.dumps(discover_routes(next(iter(builds.values())))),
        ),
        encoding="utf-8",
    )

    print(f"\n  compare  http://localhost:{compare_port}")
    for (name, url) in entries:
        print(f"  {url}  {name}")
    print("\n  ctrl-c to stop\n")

    if open_browser:
        subprocess.run(["open", f"http://localhost:{compare_port}"], check=False)
    try:
        threading.Event().wait()
    except KeyboardInterrupt:
        print("stopped")


# --------------------------------------------------------------------------
# playwright subcommands


def with_playwright():
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        sys.exit("playwright is missing. run: uv run --with playwright playwright install chromium")
    return sync_playwright


def cmd_shots(args) -> None:
    builds = build_all(args.site, args.refs)
    ports = serve_each(builds)
    routes = args.route or discover_routes(next(iter(builds.values())))
    out = pathlib.Path(args.out or (tool_root() / args.site / "_shots"))
    out.mkdir(parents=True, exist_ok=True)

    sync_playwright = with_playwright()
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        for ref in builds:
            base = f"http://localhost:{ports[ref]}"
            for width in args.width:
                page = browser.new_page(viewport={"width": width, "height": 1000},
                                        device_scale_factor=args.scale)
                for route in routes:
                    page.goto(base + route, wait_until="networkidle")
                    name = f"{slug(ref)}--{slug(route.strip('/') or 'root')}--{width}.png"
                    page.screenshot(path=str(out / name), full_page=True)
                page.close()
        browser.close()
    print(f"\n  {len(builds) * len(routes) * len(args.width)} screenshots -> {out}")


PROBE_JS = """
(sel) => {
  const el = document.querySelector(sel);
  if (!el) return null;
  const c = getComputedStyle(el);
  const r = el.getBoundingClientRect();
  return {
    font: c.fontFamily.split(',')[0].replace(/["']/g, ''),
    size: c.fontSize, leading: c.lineHeight, weight: c.fontWeight,
    tracking: c.letterSpacing, transform: c.textTransform, colour: c.color,
    margin: c.margin, padding: c.padding,
    width: Math.round(r.width), left: Math.round(r.left),
  };
}
"""

METRICS_JS = """
() => {
  // Characters per line measured from the rendered layout rather than
  // estimated from font size -- the number a measure argument turns on.
  const out = [];
  for (const p of document.querySelectorAll('p, li, dd')) {
    const text = p.textContent.trim();
    if (text.length < 80) continue;
    const cs = getComputedStyle(p);
    const lineH = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2;
    const lines = Math.max(1, Math.round(p.getBoundingClientRect().height / lineH));
    out.push({
      perLine: Math.round(text.length / lines), lines,
      width: Math.round(p.getBoundingClientRect().width),
      size: cs.fontSize, leading: cs.lineHeight, gap: cs.marginBottom,
      opening: text.slice(0, 44),
    });
  }
  return out;
}
"""


def cmd_probe(args) -> None:
    builds = build_all(args.site, args.refs)
    ports = serve_each(builds)
    route = args.route[0] if args.route else "/"
    selectors = dict(s.split("=", 1) for s in args.selector) if args.selector else {}

    sync_playwright = with_playwright()
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        for ref in builds:
            page = browser.new_page(viewport={"width": args.width[0], "height": 1000})
            page.goto(f"http://localhost:{ports[ref]}{route}", wait_until="networkidle")
            print(f"\n=== {ref} {route} at {args.width[0]}px ===")
            if selectors:
                for name, sel in selectors.items():
                    got = page.evaluate(PROBE_JS, sel)
                    print(f"  {name:<18} {got if got else 'NOT FOUND'}")
            else:
                print(f"  {'per-line':>8} {'lines':>5} {'width':>6} {'size':>7} {'leading':>8} {'gap':>6}  opening")
                for m in page.evaluate(METRICS_JS):
                    print(f"  {m['perLine']:>8} {m['lines']:>5} {m['width']:>6} {m['size']:>7} "
                          f"{m['leading']:>8} {m['gap']:>6}  {m['opening']}")
            page.close()
        browser.close()


def cmd_up(args) -> None:
    serve_all(args.site, build_all(args.site, args.refs), args.open)


# --------------------------------------------------------------------------


def main() -> None:
    parser = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    sub = parser.add_subparsers(dest="cmd", required=True)

    def common(p):
        p.add_argument("site", help="a directory under sites/, e.g. forensics or www")
        p.add_argument("refs", nargs="+", help=f"branches, tags or commits; '{WORKING}' means the current tree")
        p.add_argument("--route", action="append", help="repeatable; defaults to every prerendered route")
        p.add_argument("--width", action="append", type=int, help="viewport width; repeatable")
        return p

    up = common(sub.add_parser("up", help="build the refs and serve them side by side"))
    up.add_argument("--open", action="store_true", help="open the compare page in a browser")
    up.set_defaults(func=cmd_up)

    shots = common(sub.add_parser("shots", help="full-page screenshots of every ref and route"))
    shots.add_argument("--out", help="directory for the PNGs")
    shots.add_argument("--scale", type=int, default=2, help="device scale factor (default 2)")
    shots.set_defaults(func=cmd_shots)

    probe = common(sub.add_parser("probe", help="computed styles, or per-block line metrics"))
    probe.add_argument("--selector", action="append", help="name=css, repeatable; omit for line metrics")
    probe.set_defaults(func=cmd_probe)

    args = parser.parse_args()
    if not args.width:
        args.width = [1440]
    args.func(args)


if __name__ == "__main__":
    main()
