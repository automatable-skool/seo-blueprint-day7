#!/usr/bin/env python3
"""Publish whatever is due today, per publish-schedule.md.

This is the cron job. It runs once a day, looks at the schedule, and publishes
only the pages whose date has arrived - then marks them Live so they never
publish twice.

Set up by /scale-map. Run manually any time with:  python3 Code/publish_due.py
Dry run (shows what it WOULD do, changes nothing):  python3 Code/publish_due.py --dry-run

Lanes:
  static  - POSTs a Vercel deploy hook. The site build filters out pages whose
            publishDate is in the future, so a rebuild is all that's needed.
  wordpress - flips each due post from `future`/`draft` to `publish` via the
            WordPress REST API.

Env (in .env next to this repo):
  SITE_LANE=static | wordpress
  VERCEL_DEPLOY_HOOK=https://api.vercel.com/v1/integrations/deploy/...
  WP_URL=https://example.com
  WP_USER=admin
  WP_APP_PASSWORD=xxxx xxxx xxxx xxxx
"""

import argparse
import base64
import json
import os
import re
import sys
import urllib.error
import urllib.request
from datetime import date, datetime
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SCHEDULE = REPO / "publish-schedule.md"
LOG = REPO / "publish-schedule-log.md"

# | Date | Page | Type | Status |  -- Date accepts "Tue 19 Aug" or "2026-08-19"
ROW = re.compile(r"^\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*$")


def load_env() -> None:
    env = REPO / ".env"
    if not env.exists():
        return
    for line in env.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        os.environ.setdefault(k.strip(), v.strip())


def parse_date(raw: str, today: date):
    """Accept 2026-08-19 or 'Tue 19 Aug'. Returns a date, or None if unparseable."""
    raw = raw.strip()
    try:
        return datetime.strptime(raw, "%Y-%m-%d").date()
    except ValueError:
        pass
    cleaned = re.sub(r"^[A-Za-z]{3},?\s+", "", raw)  # drop a leading weekday
    for fmt in ("%d %b %Y", "%d %B %Y"):
        try:
            return datetime.strptime(cleaned, fmt).date()
        except ValueError:
            pass
    # No year in the file - try this year, and next year if that lands far behind us
    for fmt in ("%d %b", "%d %B"):
        for year in (today.year, today.year + 1):
            try:
                d = datetime.strptime(f"{cleaned} {year}", f"{fmt} %Y").date()
            except ValueError:
                continue
            if (today - d).days > 180:
                continue
            return d
    return None


def read_rows(today: date):
    if not SCHEDULE.exists():
        sys.exit(f"No schedule found at {SCHEDULE}. Run /scale-map to build one.")
    rows = []
    for i, line in enumerate(SCHEDULE.read_text(encoding="utf-8").splitlines()):
        m = ROW.match(line)
        if not m:
            continue
        raw_date, page, typ, status = (g.strip() for g in m.groups())
        if raw_date.lower() == "date" or set(raw_date) <= set("-: "):
            continue  # header or separator
        d = parse_date(raw_date, today)
        if d is None:
            print(f"  ! line {i+1}: can't read the date {raw_date!r} - skipping")
            continue
        rows.append({"line": i, "date": d, "page": page, "type": typ, "status": status})
    return rows


def post(url: str, data=None, headers=None, method="POST"):
    body = json.dumps(data).encode() if data is not None else None
    req = urllib.request.Request(url, data=body, method=method,
                                 headers={"Content-Type": "application/json", **(headers or {})})
    with urllib.request.urlopen(req, timeout=60) as r:
        return r.status, r.read().decode()


def wp_headers():
    user, pw = os.environ.get("WP_USER"), os.environ.get("WP_APP_PASSWORD")
    if not user or not pw:
        sys.exit("SITE_LANE=wordpress needs WP_USER and WP_APP_PASSWORD in .env")
    token = base64.b64encode(f"{user}:{pw}".encode()).decode()
    return {"Authorization": f"Basic {token}"}


def publish_wordpress(due):
    base = os.environ.get("WP_URL", "").rstrip("/")
    if not base:
        sys.exit("SITE_LANE=wordpress needs WP_URL in .env")
    headers = wp_headers()
    published = []
    for row in due:
        # find the post by title among scheduled/draft posts
        q = urllib.parse.quote(row["page"])
        url = f"{base}/wp-json/wp/v2/posts?status=future,draft&search={q}&per_page=5"
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=60) as r:
                hits = json.loads(r.read().decode())
        except urllib.error.HTTPError as e:
            print(f"  ! {row['page']}: lookup failed ({e.code}) - left Scheduled")
            continue
        exact = [h for h in hits if h.get("title", {}).get("rendered", "").strip().lower()
                 == row["page"].lower()] or hits
        if not exact:
            print(f"  ! {row['page']}: no matching draft/scheduled post - left Scheduled")
            continue
        pid = exact[0]["id"]
        try:
            status, _ = post(f"{base}/wp-json/wp/v2/posts/{pid}", {"status": "publish"},
                             headers, method="POST")
        except urllib.error.HTTPError as e:
            print(f"  ! {row['page']}: publish failed ({e.code}) - left Scheduled")
            continue
        if 200 <= status < 300:
            print(f"  published: {row['page']}")
            published.append(row)
        else:
            print(f"  ! {row['page']}: unexpected status {status} - left Scheduled")
    return published


def publish_static(due):
    hook = os.environ.get("VERCEL_DEPLOY_HOOK")
    if not hook:
        sys.exit("SITE_LANE=static needs VERCEL_DEPLOY_HOOK in .env "
                 "(Vercel > Project > Settings > Git > Deploy Hooks)")
    try:
        status, _ = post(hook)
    except urllib.error.HTTPError as e:
        print(f"  ! deploy hook failed ({e.code}) - nothing marked Live")
        return []
    if not 200 <= status < 300:
        print(f"  ! deploy hook returned {status} - nothing marked Live")
        return []
    for row in due:
        print(f"  published: {row['page']}")
    return due


def mark_live(published):
    """Flip Scheduled -> Live on exactly the rows we published."""
    if not published:
        return
    lines = SCHEDULE.read_text(encoding="utf-8").splitlines()
    for row in published:
        i = row["line"]
        # replace the last cell only, so a page named "Status update" is safe
        head, sep, _ = lines[i].rstrip().rstrip("|").rpartition("|")
        lines[i] = f"{head}{sep} Live |"
    SCHEDULE.write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_log(published, due, today):
    stamp = today.isoformat()
    entry = (f"- {stamp}: published {len(published)} of {len(due)} due"
             + (" - " + "; ".join(r["page"] for r in published) if published else "")
             + "\n")
    header = "" if LOG.exists() else "# Publish log\n\nOne line per cron run.\n\n"
    with LOG.open("a", encoding="utf-8") as f:
        f.write(header + entry)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="show what would publish, change nothing")
    ap.add_argument("--date", help="pretend today is YYYY-MM-DD")
    args = ap.parse_args()

    load_env()
    today = datetime.strptime(args.date, "%Y-%m-%d").date() if args.date else date.today()

    rows = read_rows(today)
    scheduled = [r for r in rows if r["status"].lower() == "scheduled"]
    due = [r for r in scheduled if r["date"] <= today]
    held = [r for r in rows if r["status"].lower() == "held"]

    print(f"{today} - {len(due)} due, {len(scheduled) - len(due)} still waiting, {len(held)} held")
    if not due:
        write_log([], [], today)
        return

    for r in due:
        print(f"  due: {r['date']}  {r['page']}  ({r['type']})")

    if args.dry_run:
        print("dry run - nothing published")
        return

    lane = os.environ.get("SITE_LANE", "static").lower()
    published = publish_wordpress(due) if lane == "wordpress" else publish_static(due)

    mark_live(published)
    write_log(published, due, today)
    print(f"done - {len(published)} published, {len(due) - len(published)} left Scheduled to retry tomorrow")


if __name__ == "__main__":
    import urllib.parse  # used by the WordPress lane
    main()
