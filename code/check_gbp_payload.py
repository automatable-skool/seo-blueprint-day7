#!/usr/bin/env python3
"""Validate every gbp-queue/*.yml against the Make.com schema BEFORE it can send.

Exists because a payload with post_type: "UPDATE", cta_type and image_url was
written, passed every human review, got a 200 from Make, and published nothing
useful - the Router matched no branch. A 200 is not proof of a correct payload.

Run: python3 code/check_gbp_payload.py [path-or-dir]
Exit 0 = every file is sendable. Exit 1 = at least one is not.
"""
import pathlib, re, sys, yaml

LEGAL_TYPES = {"Call to action", "Event", "Offer"}

# wrong name -> right name. These are the ones that have actually shipped.
RENAMED = {
    "type": "post_type", "cta": "cta_action", "cta_type": "cta_action",
    "image_url": "media_items", "image": "media_items", "media": "media_items",
    "images": "media_items", "url": "cta_url", "body": "summary", "text": "summary",
    "coupon": "coupon_code", "terms": "terms_conditions",
}
ALWAYS = ["title", "post_type", "summary", "media_items", "send_after"]
BY_TYPE = {
    "Call to action": ["cta_action", "cta_url"],
    # Matches the Make module's actual Offer fields: Title, Summary, Post type,
    # Coupon code, Redeem Online URL, Terms, Start/End date, Media. NO CTA - the
    # Offer branch has no button, redeem_online_url is the action.
    # Make's Offer branch maps: Title, Summary, Post type, Coupon, Redeem URL,
    # Terms, Start/End date, Media. CTA fields are sent but unused by this branch.
    "Offer": ["coupon_code", "redeem_online_url", "start_date", "end_date"],
    "Event": ["event_title", "start_date", "end_date"],
}
LEGAL_CTA = {"BOOK", "ORDER", "SHOP", "LEARN_MORE", "SIGN_UP", "CALL", "GET_OFFER"}


def check(path):
    errs = []
    try:
        d = yaml.safe_load(path.read_text())
    except Exception as e:
        return [f"unparseable YAML: {e}"]
    if not isinstance(d, dict):
        return ["not a YAML mapping"]

    for wrong, right in RENAMED.items():
        if wrong in d:
            errs.append(f'field "{wrong}" is not read by Make - rename it to "{right}"')

    pt = d.get("post_type")
    if pt not in LEGAL_TYPES:
        errs.append(
            f'post_type is {pt!r} - Make routes on this and only accepts '
            f'{sorted(LEGAL_TYPES)}. An unmatched value returns 200 and publishes nothing.'
        )

    for f in ALWAYS + BY_TYPE.get(pt, []):
        if not str(d.get(f, "")).strip():
            errs.append(f'missing required field for {pt!r}: {f}')

    # NOTE: cta_action/cta_url on an Offer are harmless. The webhook sends a
    # uniform payload for every post type and the Make Router maps only the
    # fields its branch needs - the Offer branch simply ignores them.

    cta = d.get("cta_action")
    if cta and cta not in LEGAL_CTA:
        errs.append(f"cta_action {cta!r} is not one of {sorted(LEGAL_CTA)}")

    # Google's own field limits, enforced by the GBP API. Make surfaces these as
    # "One mapped value is longer than 58 characters" AFTER the scenario runs, so
    # the post is lost and the run is red for a reason that reads like a Make bug.
    LIMITS = {"title": 58, "coupon_code": 58, "event_title": 58, "summary": 1500}
    for field, cap in LIMITS.items():
        v = str(d.get(field, ""))
        if v and len(v) > cap:
            errs.append(f'{field} is {len(v)} characters - Google caps it at {cap}. '
                        f'Shorten it: "{v[:cap - 3]}..."')

    media = str(d.get("media_items", ""))
    if media:
        if not media.startswith("https://"):
            errs.append("media_items must be a public https:// URL - Google fetches it "
                        "itself, so a local path fails silently")
        # Google Business Profile accepts JPG and PNG only. A WebP is fetched fine,
        # then rejected by Google, and Make reports it as a generic "service problem
        # on its side" - which sends you looking at connections and quotas instead.
        elif not media.lower().split("?")[0].endswith((".jpg", ".jpeg", ".png")):
            ext = media.lower().split("?")[0].rsplit(".", 1)[-1]
            errs.append(f"media_items is .{ext} - Google Business Profile accepts JPG "
                        f"and PNG only. WebP is the common trap: it loads in a browser, "
                        f"Google refuses it, and Make blames itself.")

    # Size the image before Google has to. Its hard cap is 5 MB, but large files
    # time out inside Make and surface as "hit a service problem on its side".
    if media.startswith("https://"):
        try:
            import urllib.request
            with urllib.request.urlopen(media, timeout=20) as r:
                mb = len(r.read()) / 1048576
            if mb > 2:
                errs.append(f"media_items is {mb:.1f} MB - compress it under 2 MB. "
                            "Google's cap is 5 MB but Make times out well before that, "
                            "and reports it as a service problem on its own side.")
        except Exception:
            errs.append(f"media_items is unreachable: {media} - Google fetches this "
                        "itself, so an unreachable URL fails the post silently.")

    s = str(d.get("summary", ""))
    for pat, why in [(r"\*\*", "**bold** renders as literal asterisks"),
                     (r"\[[^\]]+\]\([^)]+\)", "[links](url) render literally - use cta_url"),
                     (r"(?m)^#+ ", "# headings render as literal hashes")]:
        if re.search(pat, s):
            errs.append(f"summary contains markdown: {why}")
    if not s.strip():
        errs.append("summary is empty")
    return errs


def main():
    target = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else pathlib.Path("gbp-queue")
    files = sorted(target.glob("*.yml")) if target.is_dir() else [target]
    if not files:
        print(f"No .yml files in {target} - nothing queued, so nothing will ever send.")
        return 1
    bad = 0
    for f in files:
        errs = check(f)
        if errs:
            bad += 1
            print(f"\nFAIL  {f.name}")
            for e in errs:
                print(f"        - {e}")
        else:
            print(f"ok    {f.name}")
    print(f"\n{len(files) - bad}/{len(files)} sendable")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main())
