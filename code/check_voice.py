#!/usr/bin/env python3
"""Fail a draft that ignores context/voice.md.

    python3 code/check_voice.py gbp-posts-queue.md
    python3 code/check_voice.py website/app/blog/some-post/page.tsx

check_page_quality.py counts pronouns, which any find-and-replace can satisfy.
This checks the things that actually went wrong: stiff expanded forms instead of
contractions, self-audit sections, tables, and jokes aimed at the business's own
competence.
"""

import re
import sys
from pathlib import Path

MIN_CONTRACTION_RATIO = 0.6   # contractions / (contractions + expanded forms)

CONTRACTIONS = r"n't\b|'re\b|'ll\b|'ve\b|'s\b|\bI'm\b"
EXPANDED = (r"\bit is\b|\bdo not\b|\bcannot\b|\bcan not\b|\byou are\b|\bdoes not\b|"
            r"\bis not\b|\bwe are\b|\bthat is\b|\bwill not\b|\bthey are\b|\bhere is\b|"
            r"\bwould not\b|\bhas not\b|\bhave not\b|\bdid not\b|\bare not\b")

# Self-audit: the model grading its own jokes instead of just showing the draft.
SELF_AUDIT = [
    r"the one good line", r"one good line in each", r"·\s*specificity\s*$",
    r"·\s*misdirection\s*$", r"·\s*self-deprecation\s*$", r"·\s*rule of three\s*$",
    r"the house style asks for", r"lines? that lands?\b.*device",
]

# Jokes about being bad at the thing being sold. These read as disqualifying,
# not charming, and the funnier they are the more damage they do.
COMPETENCE_JOKES = [
    # "we checked our own site ... and found ... exactly zero conversions recorded"
    r"\bour own (site|account|tracking|profile|numbers|setup)\b[^.!?]{0,200}"
    r"(zero|none|nothing|blank|broken|missing|forgot|never|hadn't|had not|wasn't|was not)",
    r"\b(we|our team|we'd|we had)\b[^.!?]{0,80}"
    r"(forgot|never got round|never wired|hadn't wired|had not wired|never set up|"
    r"wasn't tracking|were not tracking|weren't tracking)",
    r"physician,? heal thyself",
    r"practi[cs]e what we preach",
    r"(cobbler|shoemaker)'s (children|kids)",
    r"heal thyself",
]


def read(path):
    return Path(path).read_text(encoding="utf-8", errors="replace")


def check(path):
    text = read(path)
    failures = []

    contractions = len(re.findall(CONTRACTIONS, text, re.I))
    expanded = len(re.findall(EXPANDED, text, re.I))
    total = contractions + expanded
    if total:
        ratio = contractions / total
        if ratio < MIN_CONTRACTION_RATIO:
            failures.append(
                f"stiff: {contractions} contractions vs {expanded} expanded forms "
                f"({ratio:.0%}, need {MIN_CONTRACTION_RATIO:.0%}). "
                "Write it's, don't, can't, you're."
            )

    for pattern in SELF_AUDIT:
        if re.search(pattern, text, re.I | re.M):
            failures.append(
                "self-audit present - a section grading its own lines or tagging "
                "them with device names. Delete it and show the draft plain."
            )
            break

    for pattern in COMPETENCE_JOKES:
        m = re.search(pattern, text, re.I)
        if m:
            failures.append(
                f'joke about own competence: "{m.group(0)[:70]}..." - '
                "self-deprecation is fine about effort and taste, never about being "
                "bad at the thing you sell."
            )
            break

    if re.search(r"^\|.*\|", text, re.M):
        failures.append("markdown table - use bullets, per references/output-format.md")

    # Narrating the technique instead of using it - the spec's own language
    # leaking into the copy.
    NARRATION = [
        r"here'?s the line I'?ll pick a fight over", r"let me be blunt",
        r"here'?s the uncomfortable truth", r"here'?s the hot take",
        r"I'?m going to be honest with you", r"let'?s be honest for a second",
        r"here'?s where I'?ll (upset|annoy|lose) (some|a few)",
    ]
    for pattern in NARRATION:
        m = re.search(pattern, text, re.I)
        if m:
            failures.append(
                f'narrating the technique: "{m.group(0)}" - nobody announces an '
                "opinion before having it. Delete the run-up, start at the opinion."
            )
            break

    # The triple-fragment tic: "Same phone, same leads, nobody dialling."
    # Reads as a copywriter performing. Two or more in one file is a pattern.
    triples = re.findall(r"(?<=[.!?])\s+[A-Z][^.!?\n]{0,28},\s[^.!?\n]{0,28},\s[^.!?\n]{0,34}\.", text)
    if len(triples) >= 2:
        failures.append(
            f'{len(triples)} three-fragment sentences, e.g. "{triples[0].strip()[:60]}" - '
            "the most overused construction in AI copy. Rewrite as two sentences."
        )

    # Personality: a draft written entirely in "we" has no narrator, which is
    # the difference between correct copy and copy somebody wrote.
    first_person = len(re.findall(r"\bI\b|\bI'(m|ve|ll|d)\b|\bmy\b", text))
    corporate = len(re.findall(r"\bwe\b|\bour\b|\bus\b", text, re.I))
    if corporate >= 12 and first_person == 0:
        failures.append(
            f'no narrator: {corporate} uses of we/our/us and not one "I". '
            '"We" is right for the offer, but nothing here is anyone\'s opinion or '
            "experience. Put the owner in it somewhere."
        )

    return failures


def main():
    targets = sys.argv[1:]
    if not targets:
        raise SystemExit("usage: check_voice.py <file> [file...]")

    failed = 0
    for target in targets:
        if not Path(target).exists():
            print(f"SKIP  {target} (not found)")
            continue
        failures = check(target)
        if failures:
            failed += 1
            print(f"\nFAIL  {target}")
            for f in failures:
                print(f"      - {f}")
        else:
            print(f"PASS  {target}")

    if failed:
        print(
            f"\nVOICE CHECK FAILED on {failed} file(s).\n"
            "Fix and re-run. Do not show the draft with an explanation attached.\n"
            "Spec: context/voice.md Part 1."
        )
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
