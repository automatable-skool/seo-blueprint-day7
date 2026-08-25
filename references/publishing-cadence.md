# Publishing cadence - how fast pages are allowed to go live

The caps on how many pages can publish, and how the drip runs. **`/scale-map` owns the queue end to end** - it is the only thing that creates one, so it sets the machinery up once and it runs by itself after that. `/publish` just ships whatever is ready.
Next: read this before scheduling or publishing anything.

**Who owns what:**

- **`/scale-map` owns the drip.** Bulk generation is the only thing that produces a queue, so the date wiring, the generated listings, the link helper and the rebuild Action are all set up by its first scheduling run - once, self-contained, then a background event.
- **`/publish` just ships.** One page goes live immediately, a launch ships together, and a dated batch simply deploys - the build releases what came due.

**A site with no queue needs none of this**, which is the normal state for someone hand-writing 2-3 posts a week. Those pages publish the day they are written, so no future date ever exists and `/internal-linking` rule 9 never fires. Do not install the machinery until there is a queue to drain.

**Why the caps exist:** building 40 pages is easy now. Publishing 40 pages in one afternoon is how you get them not indexed. One measured case: 80 pages published in a single week indexed at 41 percent, while the same site at 25-30 pages a week indexed at 87 percent. Thin and near-duplicate pages published in bulk are also the exact profile Google's scaled content abuse policy targets - formal policy March 2024, enforced May 2024, strengthened August 2025.

---

## One rule: the launch ships, everything after it drips

**Launch ships together.** The site does not exist yet, and a website where `/contact` shows up in week three is not a website. Home, every core service, the top 3-5 cities, about, contact - all at once. That is 10-25 pages, and it looks like exactly what it is: a business putting up a site.

**Every page added after launch drips, whatever type it is.** Service page, city page, blog post - no distinction. A live site that grows by 40 pages in a weekend is the scaled-content profile regardless of what those pages sell, and Google cannot tell a service page from a blog post by looking at the URL.

**Why the old service-page exemption is gone:** it was never about service pages being special. It was about 25 pages looking like a launch and 200 looking like a content farm. Tying that to page TYPE meant someone could ship 500 service pages and believe they were following the rule. Tying it to launch-versus-after says the same thing with nothing to misread.

**Order still matters within the drip.** Money pages take the earliest slots - they are what the business sells, and a service page usually outearns ten blog posts. But earliest slot is not the same as no slot.

**Frequency is not a ranking factor.**
Mueller, verbatim: *"if we're talking about one page per day, or one page a week, kind of the ability for us to crawl that is trivial."* Nobody is rewarded for daily posting. The only thing cadence buys is indexation and staying clear of the spam policy.

**⛔ A queue in the hundreds is a question about MATERIAL, not about the drip.** 500 rows is always a service × city matrix. That is legitimate when there is genuine local material behind each page and a doorway set when there is not - and `references/hub-spoke-pages.md` bans building the full matrix *by default* for exactly that reason. So do not say "the map is wrong"; say **"how many of these can pass the local-material gate?"** If the answer is 40, build 40 and quarantine the rest until the jobs, photos and reviews exist. If the answer is 5, the map was aspirational and scheduling it over two years would just be a slow way to publish 495 doorway pages.

---

## The caps

**Launch, site going live for the first time**
10-25 pages at once: home, every core service, top 3-5 cities, about, contact. Not 200. This is the only batch that ships together.

**Blog posts specifically**
2-3 per week is the comfortable default, 1 a day is the ceiling on a domain under 6 months. This is a BLOG figure - it is not the site's weekly total, which is the band below.

**New domain, months 1-2**
10-15 pages a week total, everything included.

**Established domain, month 3 onwards**
20-30 pages a week maximum, and only if they are genuinely differentiated.

**⛔ THE CADENCE RAMPS, AND THE MIX INVERTS. Never teach a fixed weekly rhythm.**

The two bands above are a doubling, so "11 a week forever" is wrong. And the shape of those pages changes completely:

- **Money pages are a FINITE BUILD, not a weekly rhythm - but the finish line is set by MATERIAL, not by a number.** `references/hub-spoke-pages.md` says 10-15 city pages, and that figure is the number you can build **without real material for each one**. It is not a ceiling on a business that has the material. A roofer with 40 real Toronto-area jobs, photos and reviews can legitimately have 40 city pages; `roofing-seo/toronto`, `/mississauga`, `/brampton` is a real structure, not a trick.

  **The gate is the cap.** Every city page needs 3 of 4 from `context/proof/` - a real job there, real neighbourhoods or a local condition, a city-specific FAQ answer, a real photo or review from there. Build as many as pass. Almost everyone runs out of material long before they run out of cities, which is why 10-15 is the useful default.

  **The evidence is about clones, not counts.** The 33,620-page site that indexed at 18% was templated. Wiideman's 300-page study found hyperlocal content gave +107% outranking probability and custom local photos +84%. Differentiated city pages work at volume; cloned ones fail at any volume.

  So: build them, run out of material, then stop - and the weekly rhythm shifts to blogs.
- **Blogs are the only unlimited supply**, so they are what carries the cadence once the map is built. Throttling blogs while pushing service pages is backwards.
- **The ceiling on young domains is 1 blog a day** - five a week, not two. That figure is a convention in this file with no study behind it, unlike the 87%→41% indexation split, which is measured. Say which is which.

| | Money pages | Blog | Weekly total |
|---|---|---|---|
| Month 1-2 | most of it - the finite build | 2-3 | 10-15 |
| Month 3+ | close to zero, the map is done | the rest | 20-30 |
| Month 6+ | zero | up to 4/day is reachable | 20-30 |

**4 blog posts a day is legitimate - at month 6, not month 1.** It sits inside the 20-30 band; what stops it earlier is the 1-a-day rule on domains under six months.

**Any site, any month**
Never more than 1 page a day of blog content on a domain under 6 months old.

**Spread within the week.** Two posts on Tuesday and Thursday, not two on Monday morning. Weekdays only, unless the business is genuinely weekend-facing.

**Money pages take the earliest slots.** If both are waiting, every service and location page gets a date before the first blog post - but they all still get dates.

**A near-duplicate never publishes.** If two pages differ only by city name with no real local differentiator - actual jobs, local pricing, real photos, real reviews - it does not get a slot. Send it back to be thickened. Thin and near-duplicate city pages are the number one and number two reasons pages never get indexed.

---

## How scheduling executes

**One mechanism, and it is the build - not a script.** Every page carries `publishDate: YYYY-MM-DD`. The build excludes future-dated pages from routes, listings and `sitemap.xml`. So **any rebuild publishes exactly what has come due** - nothing else has to happen, nothing has to be flipped, nothing gets committed back.

That single fact makes everything else fall out:

- **A push publishes.** Vercel rebuilds on every push, so a member shipping 2-3 posts a week never needs a scheduler at all - due pages go live as a side effect of normal work.
- **The daily Action is insurance, not the engine.** `.github/workflows/daily-rebuild.yml` hits the Vercel deploy hook each morning so the queue keeps draining through weeks with no pushes. **Add it when `/scale-map` queues a batch**, not before - a one-page-a-week site does not need a cron.
- **Nothing runs on the member's machine.** launchd and crontab are banned: a sleeping laptop misses days, then publishes the backlog in a clump on wake, which defeats the drip - and a plist that silently unloads tells nobody.

**There is no `publish_due.py` path.** A script that rewrites `publish-schedule.md` and commits `Live` flips back needs Python in CI, `contents: write`, and a schedule file that must never drift from the pages themselves - three failure modes bought for a status column nobody reads. The schedule file is a human-readable record of intent; the dates in the pages are the truth.

### Wire it - one time, done by `/scale-map`'s first scheduling run

**1. Static / Next.js lane - the build wiring (this is the load-bearing part):**

- Every page carries `publishDate: YYYY-MM-DD`.
- The page-fetching helper EXCLUDES future-dated pages from routes, listings and `sitemap.xml`.
- **Listings are GENERATED from that helper**, never hand-maintained - blog index, services index, and each hub's city block. Convert any hardcoded `POSTS`-style array on the first run.
- **Build the date-aware link helper.** In-body links to scheduled pages render as plain text until the target's `publishDate`, then as live links. `/internal-linking` rule 9 wires the FULL hub-and-spoke graph through it at build time, so the rebuild that publishes a page also activates every link into it. No orphans, no dead links, no skill run on publish day.

Record it in CLAUDE.md "## My setup". **Verify before trusting it:** a future-dated page 404s AND appears in no listing; on its date it renders AND its inbound links are live. Without this the schedule is decorative - pages go live the moment they are committed.

**2. WordPress lane:** drafts are created with a future `post_date` and WordPress publishes them itself. No Action, no script, no secret. The date-aware link helper does not apply - wire links when the target is live.

**3. Connect the repo to Vercel - the step everyone misses.** `npx vercel link` ties your LOCAL FOLDER to a project. It does **not** make Vercel watch GitHub, and without that a push deploys nothing. The git root is usually the PARENT of `website/`, so pass the URL explicitly or it fails with "no local Git repository found":

```bash
cd website && npx vercel git connect https://github.com/<user>/<repo> --yes
```

**Then prove it:** push a trivial commit and confirm a deployment appears (`npx vercel ls`) with nobody running a deploy command.

**⛔ If it fails, this is the one step a skill cannot do for you.** `git connect` needs your GitHub account authorised on your Vercel account, which is a browser consent screen. When that is the error: vercel.com → the project → Settings → Git → Connect, pick the repo, come back. One click, once, forever. Say exactly that rather than "check the dashboard".

**4. The daily rebuild Action - no hook, no secret, nothing to configure.**

Vercel has **no reliable public API for minting deploy hooks**, and CLI-created projects are refused outright. Do not try. You do not need one: once the Git integration is live, any push deploys, so the Action just has to cause a push.

```yaml
name: Daily rebuild - publish due pages
on:
  schedule:
    - cron: "0 15 * * *"   # daily, ~8am Pacific
  workflow_dispatch: {}
permissions:
  contents: write
jobs:
  rebuild:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Nudge a deploy so due pages go live
        run: |
          git config user.name "publish-bot"
          git config user.email "bot@users.noreply.github.com"
          git commit --allow-empty -m "chore: daily rebuild"
          git push
```

An empty commit, nothing more. No `VERCEL_DEPLOY_HOOK`, no token, no `gh secret set`. Fire one run (`gh workflow run daily-rebuild.yml`) and watch it go green before trusting it.

**Sitemap timing:** because the build filters future pages, each page enters the sitemap on its publish date, not before. That is correct. A sitemap listing pages that render empty is worse than a small sitemap.

---

## The schedule file

`publish-schedule.md`, written per `references/output-format.md`. Four columns, decision first.

```
# Publish schedule
Built 2026-08-13 · 18 pages queued · next goes live Tue 19 Aug
Next: nothing. WordPress publishes these on their own.

## Going live this week

| Date | Page | Type | Status |
|------|------|------|--------|
| Tue 19 Aug | Emergency plumber Toronto | Service | Scheduled |
| Thu 21 Aug | How much does a burst pipe cost | Blog | Scheduled |

## The rest (16 more)
...
```

`Status` values are `Scheduled`, `Live` and `Held`. Held means it failed the near-duplicate or proof check and needs work before it gets a slot.

---

## How to use this

1. Pages arrive here already built, linked and approved. Scheduling is the last step, never a substitute for the quality gates.
2. Service and location pages fill the earliest slots. Blogs fill the rest at 2-3 a week.
3. If the queue is longer than the cadence allows, that is fine and expected. A 40-page queue is 4 months of drip, and saying so out loud is more honest than publishing it all on Thursday.
4. Never offer to "just publish them all to save time." That is the thing this file exists to prevent.
