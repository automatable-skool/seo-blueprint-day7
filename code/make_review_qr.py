#!/usr/bin/env python3
"""Make the review QR code.

Reads the Google review URL out of website/lib/review.config.ts (so there is
still only ONE place you ever paste it), and writes two files:

    website/public/review-qr.png   - for print: invoices, counter cards, trucks
    website/public/review-qr.svg   - vector, scales to any size without blurring

Run it:
    Code/.venv/bin/python Code/make_review_qr.py

Or point it at any URL directly, without touching the config:
    Code/.venv/bin/python Code/make_review_qr.py https://g.page/r/XXXX/review

Error correction is set to H (30% recoverable). That is deliberate - a QR on a
truck door or a greasy invoice gets scratched, wet and partly covered, and H is
the level that still scans when a chunk of it is gone.
"""

import re
import sys
from pathlib import Path

try:
    import segno
except ImportError:
    sys.exit(
        "segno is not installed. Run:\n"
        "  python3 -m venv Code/.venv && Code/.venv/bin/pip install segno\n"
        "then re-run this with Code/.venv/bin/python"
    )

ROOT = Path(__file__).resolve().parent.parent
CONFIG = ROOT / "website" / "lib" / "review.config.ts"
OUT_DIR = ROOT / "website" / "public"

# Accent from design/design-system.md (--accent). A coloured QR still scans as
# long as the modules stay much darker than the background - this one does.
# Swap this if the design system's accent changes, then re-run and RESCAN it.
DARK = "#b4502c"
LIGHT = "#ffffff"  # white, not parchment: print needs maximum contrast


def url_from_config() -> str | None:
    """Pull googleReviewUrl out of the TS config without needing a JS parser."""
    if not CONFIG.exists():
        return None
    match = re.search(
        r"googleReviewUrl:\s*[\"']([^\"']+)[\"']", CONFIG.read_text(encoding="utf-8")
    )
    return match.group(1) if match else None


def main() -> int:
    url = sys.argv[1] if len(sys.argv) > 1 else url_from_config()

    if not url:
        print(
            "No review URL found.\n\n"
            "Fix it one of two ways:\n"
            f"  1. Paste your g.page review link into {CONFIG.relative_to(ROOT)}\n"
            "     (replace `null` with the URL in quotes), then re-run this.\n"
            "  2. Or pass it straight in:  make_review_qr.py https://g.page/r/.../review"
        )
        return 1

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    qr = segno.make(url, error="h")

    png = OUT_DIR / "review-qr.png"
    svg = OUT_DIR / "review-qr.svg"

    # Scale is worked out from the code's own size so the PNG always lands
    # around 1,200px wide - that prints crisp at 4 inches / 300dpi, whatever
    # length of URL Google hands you.
    border = 4
    modules = qr.symbol_size(scale=1, border=border)[0]
    scale = max(8, round(1200 / modules))

    qr.save(png, scale=scale, border=border, dark=DARK, light=LIGHT)
    qr.save(svg, scale=scale, border=border, dark=DARK, light=LIGHT)

    print(f"QR code points at: {url}\n")
    print(f"  {png.relative_to(ROOT)}")
    print(f"  {svg.relative_to(ROOT)}")
    print("\nScan it with your own phone before printing anything.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
