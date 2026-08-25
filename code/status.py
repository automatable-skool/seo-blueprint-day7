#!/usr/bin/env python3
"""One table. Every page, what state it's in, right now.

Nothing here is hand-maintained - it is all DERIVED, so it cannot drift:
  page file exists?      -> BUILT      (scanned from website/app/)
  publishDate in future? -> SCHEDULED  (read from the page itself)
  publishDate passed?    -> LIVE       (the build releases it; date IS the state)
  no publishDate?        -> LIVE       (goes out on the next deploy)
  committed to git?      -> PUSHED     (asked of git, not of a file)
  in keyword-map only?   -> TO BUILD

Run: python3 code/status.py
"""
import datetime
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
APP = ROOT / "website" / "app"
MAP = ROOT / "keyword-map.md"
GBP = ROOT / "gbp-queue"
GBP_MD = ROOT / "gbp-posts-queue.md"
TODAY = datetime.date.today()


def yaml_load(path):
    """Minimal front-matter read - avoids a pyyaml dependency for one field."""
    out = {}
    for line in path.read_text(errors="ignore").splitlines():
        m = re.match(r"^([a-z_]+):\s*(.+)$", line)
        if m:
            out[m.group(1)] = m.group(2).strip().strip('"')
    return out


def git(*args):
    try:
        return subprocess.run(
            ["git", *args], cwd=ROOT, capture_output=True, text=True, timeout=20
        ).stdout.strip()
    except Exception:
        return ""


def publish_date(text):
    m = re.search(r"publishDate['\"]?\s*[:=]\s*['\"](\d{4}-\d{2}-\d{2})", text)
    if not m:
        return None
    try:
        return datetime.date.fromisoformat(m.group(1))
    except ValueError:
        return None


def built_pages():
    """Every real route under website/app (skips _private, route groups, api)."""
    if not APP.is_dir():
        return []
    out = []
    for f in sorted(APP.rglob("page.tsx")):
        rel = f.relative_to(APP).parent
        parts = [p for p in rel.parts if p]
        if any(p.startswith(("_", "(", "[")) for p in parts) or "api" in parts:
            continue
        out.append(("/" + "/".join(parts) if parts else "/", f))
    return out


def map_rows():
    """Rows still in '# To build' - the only thing that decides what gets built next."""
    if not MAP.is_file():
        return []
    text = MAP.read_text()
    start = text.find("# To build")
    if start == -1:
        return []
    end = text.find("\n# Written", start)
    chunk = text[start : end if end != -1 else len(text)]
    return re.findall(r"^## (\d+)\.\s+(.+)$", chunk, re.M)


def main():
    tracked = set(git("ls-files").splitlines())
    uncommitted = {
        line[3:] for line in git("status", "--porcelain").splitlines() if line
    }
    unpushed = git("log", "--oneline", "@{u}..HEAD") if git("rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}") else "NO REMOTE"

    rows, counts = [], {"LIVE": 0, "SCHEDULED": 0, "NOT PUSHED": 0}
    for route, path in built_pages():
        d = publish_date(path.read_text(errors="ignore"))
        rel = str(path.relative_to(ROOT))
        if rel not in tracked or rel in uncommitted:
            state, when = "NOT PUSHED", "commit + push to queue it"
        elif d and d > TODAY:
            state, when = "SCHEDULED", f"goes live {d:%a %d %b} ({(d - TODAY).days}d)"
        elif d:
            state, when = "LIVE", f"since {d:%a %d %b}"
        else:
            state, when = "LIVE", "no date - live on deploy"
        counts[state] += 1
        rows.append((state, route, when))

    order = {"NOT PUSHED": 0, "SCHEDULED": 1, "LIVE": 2}
    rows.sort(key=lambda r: (order[r[0]], r[1]))

    print(f"\n  SITE STATUS · {TODAY:%a %d %b %Y}\n")
    w = max([len(r[1]) for r in rows], default=10) + 2
    last = None
    for state, route, when in rows:
        if state != last:
            print(f"  ── {state} ──")
            last = state
        print(f"    {route:<{w}} {when}")

    # A row can sit in "# To build" while its page already exists - the map is
    # hand-maintained and drifts. Count those separately instead of double-counting.
    all_rows = map_rows()
    drifted = [(n, t) for n, t in all_rows if re.search(r"\bBUILT\b", t)]
    todo = [(n, t) for n, t in all_rows if not re.search(r"\bBUILT\b", t)]

    print(f"\n  ── TO BUILD ── {len(todo)} rows left in keyword-map.md")
    for num, title in todo[:5]:
        print(f"    {num}. {title}")
    if len(todo) > 5:
        print(f"    + {len(todo) - 5} more")
    if drifted:
        print(f"\n  ⛔ MAP DRIFT ── {len(drifted)} row(s) marked BUILT but still under '# To build'")
        for num, title in drifted:
            print(f"    {num}. {title}")
        print("    move these to '# Written' so the build order is honest")

    def count(x, singular, plural=None):
        return f"{x} {singular if x == 1 else (plural or singular + 's')}"

    print()
    print("  ── THE SITE ──")
    print(f"  {count(len(todo), 'keyword')} yet to be built")
    print(
        f"  {count(counts['NOT PUSHED'], 'built page')} waiting to be pushed to GitHub"
        if counts["NOT PUSHED"]
        else "  No built pages waiting to be pushed to GitHub"
    )
    print(
        f"  {count(counts['SCHEDULED'], 'page')} on GitHub scheduled to publish"
        if counts["SCHEDULED"]
        else "  No pages on GitHub scheduled to publish"
    )
    print(f"  {count(counts['LIVE'], 'page')} live")

    # ── Business Profile posts. Derived from the queue directories, never from
    # the markdown - gbp-posts-queue.md is a human draft and it drifts. It once
    # claimed 7 scheduled and 1 sent while the queue held 1 and sent/ was empty.
    if GBP.is_dir():
        q = sorted(GBP.glob("*.yml"))
        held = sorted((GBP / "held").glob("*.yml"))
        sent = sorted((GBP / "sent").glob("*.yml"))
        due = []
        for f in q:
            try:
                d = yaml_load(f)
                stamp = str(d.get("send_after", ""))[:10]
                if stamp and datetime.date.fromisoformat(stamp) <= TODAY:
                    due.append(f)
            except Exception:
                pass
        print()
        print("  ── THE PROFILE ──")
        print(f"  {count(len(q), 'Business Profile post')} queued"
              + (f", {len(due)} due now" if due else ""))
        if held:
            print(f"  {count(len(held), 'post')} held back (gbp-queue/held/)")
        print(f"  {count(len(sent), 'post')} sent")

        # the markdown is the thing that lies - say so when it disagrees
        if GBP_MD.is_file():
            txt = GBP_MD.read_text(errors="ignore")
            claimed_sched = len(re.findall(r"·\s*QUEUED\b", txt))
            claimed_sent = len(re.findall(r"·\s*SENT\b", txt))
            if claimed_sched != len(q) or claimed_sent != len(sent):
                print(f"  ⛔ gbp-posts-queue.md says {claimed_sched} scheduled / "
                      f"{claimed_sent} sent - the files say {len(q)} / {len(sent)}. "
                      "The files are the truth; the markdown is a draft.")

    print()


if __name__ == "__main__":
    sys.exit(main())
