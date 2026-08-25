---
description: Where everything stands - built, scheduled, live, pushed, left to build. One table.
---

Run it and show me the table:

```
python3 code/status.py
```

**Nothing here is stored, so nothing can drift.** Every state is derived fresh on each run: the page files under `website/app/` say what is BUILT, each page's own `publishDate` compared to today says SCHEDULED or LIVE, git says PUSHED, and `keyword-map.md` says what is still TO BUILD. There is no status field anybody maintains by hand, which is the whole point - a typed status can disagree with reality and this cannot.

**Then read it back as TWO SECTIONS. Never a paragraph, never prose, never merged into one list.**

The site and the Business Profile are different pipelines on different crons with different caps. Mixing their counts into one block is how "2 scheduled" becomes ambiguous.

```
THE SITE
  32 keywords yet to be built
  No built pages waiting to be pushed to GitHub
  2 pages on GitHub scheduled to publish
  25 pages live

THE PROFILE
  1 Business Profile post queued, 1 due now
  7 posts held back
  0 posts sent
```

Each line states the count or says "No" plainly, and the shape stays identical every run so it reads at a glance. If a site has no Business Profile queue at all, drop that section entirely rather than printing zeros.

**Then, only if there IS a problem, one line naming it and one question.** Never bury a blocker in the four lines above:

- **Unpushed commits** - those pages can never publish. Offer to push.
- **No git remote** - nothing can publish at all. Route to `/publish`.
- **A page built but still in `keyword-map.md`'s `# To build`** - the map drifted. Offer to move the row; never silently correct it.
- **No date wiring** (nothing reads `publishDate`) - "scheduled" is not real yet; the next `/scale-map` builds it.

If everything is clean, the four lines are the whole answer. Add nothing.
