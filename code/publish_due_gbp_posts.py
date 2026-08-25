#!/usr/bin/env python3
"""Publish due GBP posts from gbp-queue/ to the Make.com webhook.

Runs from GitHub Actions on a Mon/Wed/Fri cron (or by hand: python3
code/publish_due_gbp_posts.py). Each run sends AT MOST ONE due post, so the
cron IS the cadence: a full queue ships 3 posts a week, a thin one ships what
it has. A post is due when today >= its send_after date.

On a 200 from the webhook the file moves to gbp-queue/sent/ with sent_at
stamped. Anything else leaves the file in place and exits non-zero so the
Actions run shows red. The Make scenario must reply 200 only after the post
actually publishes (Webhook Response module) - see /gbp-posts.
"""
import datetime
import json
import os
import pathlib
import sys
import urllib.error
import urllib.request

import yaml

sys.path.insert(0, str(pathlib.Path(__file__).resolve().parent))

ROOT = pathlib.Path(__file__).resolve().parent.parent
QUEUE = ROOT / "gbp-queue"
SENT = QUEUE / "sent"
MAX_PER_WEEK = 3
MIN_GAP_DAYS = 2


def sent_dates():
    dates = []
    for f in SENT.glob("*.yml"):
        try:
            stamp = yaml.safe_load(f.read_text()).get("sent_at")
            if stamp:
                dates.append(datetime.date.fromisoformat(str(stamp)[:10]))
        except Exception:
            continue
    return dates


def main():
    url = os.environ.get("MAKE_WEBHOOK_URL")
    if not url:
        sys.exit("MAKE_WEBHOOK_URL is not set (add it as a GitHub Actions secret).")

    today = datetime.date.today()
    SENT.mkdir(parents=True, exist_ok=True)

    dates = sent_dates()
    week_start = today - datetime.timedelta(days=today.weekday())
    if sum(1 for d in dates if d >= week_start) >= MAX_PER_WEEK:
        print("Weekly cap reached - nothing sent.")
        return
    if any((today - d).days < MIN_GAP_DAYS for d in dates):
        print("Too soon after the last post - nothing sent.")
        return

    due = []
    for f in sorted(QUEUE.glob("*.yml")):
        post = yaml.safe_load(f.read_text())
        stamp = post.get("send_after")
        if stamp and datetime.date.fromisoformat(str(stamp)[:10]) <= today:
            due.append((f, post))
    if not due:
        print("No due posts.")
        return

    f, post = due[0]

    # ⛔ Validate before sending. A wrong post_type or field name still returns 200
    # from Make while publishing nothing - the Router simply matches no branch.
    from check_gbp_payload import check as _check
    errs = _check(f)
    if errs:
        sys.exit(f"REFUSING TO SEND {f.name} - invalid payload:\n  " + "\n  ".join(errs))

    payload = {k: v for k, v in post.items() if k not in ("send_after", "sent_at")}
    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"},
    )
    body = ""
    try:
        with urllib.request.urlopen(req, timeout=120) as resp:
            status = resp.status
            body = resp.read().decode("utf-8", "replace").strip()
    except urllib.error.HTTPError as e:
        status = e.code
        body = e.read().decode("utf-8", "replace").strip()
    except Exception as e:
        sys.exit(f"FAILED {f.name}: {e}")

    # ⛔ A bare "Accepted" is Make's INSTANT acknowledgement of receipt. It is
    # returned before the scenario runs, so it says nothing about whether Google
    # published anything. Treating it as success is how a post is marked sent
    # while the profile stays empty - which has already happened once here.
    #
    # The scenario MUST end with a Webhook Response module returning a real body.
    # Recommended: {"published": true, "post": "<the GBP post name>"}
    if status == 200 and body.strip().strip('"').lower() in ("", "accepted"):
        sys.exit(
            f'FAILED {f.name}: Make answered 200 "{body}" - that is the default receipt '
            "acknowledgement, not confirmation the post published.\n"
            "  The scenario has no Webhook Response module, so there is no way to know "
            "whether Google accepted the post.\n"
            "  Fix in Make: add a Webhook Response at the END of the scenario (after the "
            'Create Local Post module) returning {"published": true}, set its status to 200, '
            "and make sure the module's error handling does NOT route around it.\n"
            "  The post stays in the queue and will retry once that is in place."
        )

    if status == 200:
        post["sent_at"] = today.isoformat()
        post["webhook_response"] = body[:300]   # the receipt, kept for audit
        (SENT / f.name).write_text(yaml.safe_dump(post, sort_keys=False, allow_unicode=True))
        f.unlink()
        print(f"Sent {f.name}\n  Make responded: {body[:200]}")
    else:
        sys.exit(f"FAILED {f.name}: webhook answered {status} - {body[:200]}\n  Post left in the queue; the next run retries it.")


if __name__ == "__main__":
    main()
