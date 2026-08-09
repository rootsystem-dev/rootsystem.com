#!/usr/bin/env bash
#
# Rasterizes the forensics Open Graph card to PNG.
#
# Headless Chrome rather than resvg or rsvg-convert: Tiempos ships as woff2
# only, which those tools do not read -- they substitute a fallback face and
# succeed, producing a card in the wrong type with no error. Chrome loads the
# woff2 through @font-face exactly as the site does.
#
# Usage: scripts/render-og-card.sh
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
svg="$repo_root/docs/Brand/Social/rootsystem-forensics-social.svg"
fonts="$repo_root/sites/forensics/public/fonts"
out="$repo_root/sites/forensics/public/images/forensics-card.png"
chrome="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
work="$(mktemp -d)"
trap 'rm -rf "$work"' EXIT

[ -f "$svg" ] || { echo "missing $svg" >&2; exit 1; }
[ -x "$chrome" ] || { echo "missing Chrome at $chrome" >&2; exit 1; }

cp "$fonts"/Tiempos-Bold.woff2 "$fonts"/OpenSans-Regular.woff2 "$work/"

# The SVG is inlined into the document so the @font-face rules below apply to
# its <text> elements. A linked <img src="card.svg"> would not inherit them.
{
  printf '%s' '<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:"Tiempos";src:url("Tiempos-Bold.woff2") format("woff2");font-weight:700;}
@font-face{font-family:"Open Sans";src:url("OpenSans-Regular.woff2") format("woff2");font-weight:400;}
html,body{margin:0;padding:0;width:1440px;height:640px;overflow:hidden;}
svg{display:block;}
</style>'
  cat "$svg"
} > "$work/card.html"

"$chrome" \
  --headless \
  --disable-gpu \
  --hide-scrollbars \
  --force-device-scale-factor=1 \
  --window-size=1440,640 \
  --screenshot="$out" \
  "file://$work/card.html" 2>/dev/null

echo "wrote $out"
