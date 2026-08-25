#!/usr/bin/env python3
"""Fail if any page hard-links to a route that is not live yet.

The failure this catches: page A publishes on the 1st and links to page B with
a raw <a href>, but B is held until the 3rd. For two days A is live on the
internet pointing at a 404 - and nothing else on the site would notice.

Every link to a dated route must go through <ScheduledLink>, which renders as
plain text until the target's date arrives. Run from the repo root:
    python3 code/check_scheduled_links.py
"""
import pathlib, re, sys

APP = pathlib.Path("website/app")
SCHED = pathlib.Path("website/lib/publishing.ts")


def scheduled_routes():
    if not SCHED.is_file():
        return set()
    return set(re.findall(r'"(/[a-z0-9/-]+)":\s*"[0-9T:Z.+-]+"', SCHED.read_text()))


def main():
    routes = scheduled_routes()
    if not routes:
        print("No scheduled routes - nothing to check.")
        return 0
    bad = []
    for f in sorted(APP.rglob("*.tsx")):
        if any(p.startswith("_") for p in f.parts):
            continue
        text = f.read_text(errors="ignore")
        own = "/" + "/".join(p for p in f.relative_to(APP).parent.parts)
        for r in routes:
            if r == own:
                continue  # its own canonical/og refs are fine
            for m in re.finditer(r'<a\s[^>]*href=(?:"|\{`)' + re.escape(r) + r'(?:"|`\})', text):
                line = text[: m.start()].count("\n") + 1
                bad.append((f, line, r))
    for f, line, r in bad:
        print(f"FAIL  {f}:{line}\n        raw <a> to {r}, which is date-gated - use <ScheduledLink>")
    print(f"\n{len(bad)} hard link(s) to scheduled routes" if bad
          else f"\nok - {len(routes)} scheduled routes, every link to them is date-aware")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
