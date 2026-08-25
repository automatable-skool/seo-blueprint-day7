---
description: Customise the pre-built site to this business - style pick, real copy, proof, photos. Never a rebuild.
---

**A guided walkthrough, not a batch job.** Every step: say what it is in one line → do it → show the result (link, screenshot, exact values) → wait at every decision. Never chain steps silently.

**The site is already built.** Two styles + a picker ship in `website/`. This command swaps WORDS, PHOTOS and ONE COLOUR. It never touches structure, layout or `components/ds/`. Want a different design? Only if I say so - drop a Claude design kit in `design/kit/` or paste a screenshot.

## Step 0 ⛔ Ask, then wait

First message is this question and nothing else:

> "Do you already have a live website? If yes, give me the URL - we'll decide together whether to restructure it (keeping rankings, full 301 map) or start fresh from the template. If no, you'll see the template in two minutes."

**This command has three lanes, and every rule in it applies to all three** - the pyramid, the placeholders ban, the wiring, the gates:

- **Template lane** (no site yet): everything below as written.
- **Import lane** (existing site, any stack): the pyramid is built IN THEIR site - restructure their pages into the tree, map every old URL to its new home, `vercel.json` (or their router's) 301s, never let a ranking URL die. Their design stays unless they ask for the template. Gates run against their dev server: `python3 code/check_site_complete.py --base http://localhost:PORT`.
- **WordPress lane** (via Novamira): the tree is built as parent/child PAGES through Novamira, all as drafts - same pyramid, same hub rules, wiring via WP menus and in-content links. `website/` is unused. Gates run against the live site AFTER `/publish`: `--base https://their-domain.com` (drafts can't be fetched; verify draft content through Novamira reads instead, then gate on publish).

The gate scripts take `--base URL` and discover pages by crawling from `/`, so they work on any site regardless of stack or folder layout.

## Step 1 ⛔ Show both, let me pick, then wait

`cd website && npm install && npm run dev` - actually run it, confirm 200s, then:

> "Open **localhost:3000/bold** (trades - loud, phone-forward) and **localhost:3000/calm** (professional services - quiet, credential-led). Which one is this business?"

Recommend one from `context/business.md` if it's obvious; the choice is mine. Record `SITE_STYLE` in CLAUDE.md "## My setup".

Then promote the pick to the root - **style names never appear in live URLs**:
1. `app/[style]/page.tsx` → `app/page.tsx` (keep the picker as `app/_picker.tsx.bak`)
2. `app/[style]/services|about|blog|contact` → `app/services` etc.
3. Delete `app/bold/` and `app/calm/`
4. Rewrite every `href="/bold/..."`/`"/calm/..."` → `"/..."`
5. Verify: `grep -r "/bold\|/calm" app/` is empty, every nav link resolves

## Step 2 ⛔ The pyramid - the #1 deliverable, and the FIRST build action

The moment the style is picked, this happens - before any copy, photos or colour. A run that polishes the homepage while the pyramid doesn't exist has done the decoration and skipped the building. (Skip only if `keyword-map.md` doesn't exist yet.)

Show me the tree first - every page with its primary keyword, three layers max, blog posts flat. Then **build it as STUBS**: for every keyword-map row, `cp` the chosen style's services (or blog) page to its route - city spokes at `/services/[service]/[city]` - and set ONLY the H1, title and metadata to that row's keyword. **The body stays template placeholder content on purpose.** Then **wire the tree per `references/pyramid-structure.md` - read it first, it IS the spec:**

- **Nav on every page** links Home · Services · Blog · About · Contact
- **`/services` and `/blog` are INDEX pages, and this means page TYPE, not just links (rule 7 of the spec).** Each is the hub page of its branch: a kicker and H1 that NAME the branch, a short intro, then one descriptive-anchor link per child. The template now SHIPS both as real index shapes at `/services` and `/blog` (top-level routes) - your job is to FILL them: one section per keyword-map service (name, 2-4 real sentences, photo, descriptive link) replacing the three placeholder sections, and `/blog-post` appends post entries to the blog index's POSTS list. Keep their shape exactly; never replace an index with an article or a sales page. On the import and WordPress lanes the indexes don't pre-exist - building them to this same shape IS this step. The test: someone landing on `/blog` sees the blog, not a post; someone landing on `/services` sees the branch, not one offer. Any article content already living at `/blog` moves to its own flat post URL first - content is moved, never deleted.
- **Every service hub links DOWN to each of its city spokes**; every spoke links UP to its hub
- **`/blog` links every post**; each post links up to `/blog` and across to its money page
- **3-click rule:** every page reachable within 3 clicks of home. An orphan is a linking failure, not a folder problem.

These pages exist to show the structure, carry that wiring, and hold the URL - `/service-page` and `/blog-post` write the real copy later, hubs first. Do not write real copy for them in this command, and do not polish them. A keyword-map row without a route is the run failing its main job; a stub with placeholder copy is the run working as designed.

## Step 3 Swap the words, in place

Every placeholder is a unique string in the chosen style's page files:

- `Business Name`, phone, email, address, licence → `context/business.md`
- Every number (`00+`, `0,000`, `000 reviews`, `4.9`) → `context/proof/proof-inventory.md`. **Not in the inventory = stays a placeholder, flagged.**
- Services + `From $000` → real services and prices
- Reviews → real ones, word for word. Never written by you.
- FAQ answers, towns, hours, team names → real values (placeholder text says what belongs there)
- Headline/lede: keep the sentence's shape, make it theirs

Context thin? Ask for name, trade, city, phone, email inline and continue.

## Step 4 Photos

Ladder: `context/proof/images/` → stock via `python3 code/fetch_stock_photos.py "[trade]" "[trade] team working" "[trade] tools closeup" --count 8` (no `PEXELS_API_KEY`? ask: pexels.com/api → Get Started, free, 30 seconds) → keep the labelled frame. **Overfetch on purpose: pull a pool 2-3x bigger than the frames need, across 2-3 different queries, LOOK at all of them, and pick the best fit per frame.** Never place the same photo twice on the site - a repeated stock photo reads as a template - and delete the rejects (file + manifest row) so a later run doesn't grab them. Then **replace each placeholder frame ENTIRELY with an `<img>`** - the frame's label text ("CREW & VAN", "JOB PHOTO") must be deleted with it, never left rendering on top of a real photo. **Look at every photo. Stock is atmosphere, never proof.**

**People photos go where people belong.** A team or crew photo lives in the team/about section - NEVER the hero. The hero sells the WORK: the job site, the finished result, the van outside a house. Portraits only in slots that name a person, faces only in sections about the people - and never a stock face presented as a real team member.

## Step 5 Accent

Their brand colour (logo, or ask for one) → regenerate the nine `--blue-*` values in `app/ds.css`, same lightness ladder. The graphite accent stays.

## Step 6 Lead form

Forms POST to `/api/lead` → `leadWebhook` in `site.config.ts` → 303 redirect to **`/thank-you`**. The template ships that page pre-built, noindexed and out of the sitemap - keep all of that (see `references/pyramid-structure.md`). **Import and WordPress lanes: it does not exist yet - build it before any form goes live**, since it is the page conversion tracking fires on. Confirm the redirect actually lands there when you send the test below. Get `LEAD_WEBHOOK_URL` from "## My setup" or ask (GHL → Automation → new workflow → Inbound Webhook → copy URL · no GHL? $1/month: https://www.skool.com/automatable/classroom/32447943?md=47d1df7d71c449baa5ab88c94340718c). Send one test, confirm it lands.

## Step 7 The exit gate, then ship

```
python3 code/check_site_complete.py
python3 code/check_css_integrity.py
```

**Both gates, every run.** The second one catches what nothing else can: an undefined `var(--token)` or a className no stylesheet defines are both LEGAL CSS, so `next build` passes, no error appears, and the page just renders flat. Step 5 regenerates the nine `--blue-*` values in `app/ds.css`, which is exactly when a token gets orphaned. A green build is not proof the design survived.

**The loop rule: the gate decides when you're done, not you.** Run the gate → fix every failure → run it again. Repeat until it passes. Do not report progress instead of finishing, do not ask permission to keep fixing, do not stop because a fix is tedious (37 routes to build means 37 routes get built), and never present a failing site with an explanation attached. The ONLY reasons to stop early: you need a value only I have (a key, a webhook, a photo), or a real decision is mine to make. Everything else, you finish.

It fails the run on: any route that errors, any placeholder text still visible on any page, any keyword-map row without a route, any dead internal link on any page, any orphan page. **A dead link never gets solved silently** - if the target genuinely doesn't exist yet, ask me: remove the link, point it somewhere real, or build the page. Never invent a page just to make a link resolve, and never leave the link dead. **A failing gate means /build-website is not done** - fix and re-run until it passes. Only exception: a placeholder I explicitly told you to leave (no real number yet) - name each one in the report.

**The gate is the floor; your eyes are the bar.** After it passes, screenshot EVERY page - the main five plus every pyramid page - at 1440px and 390px, and LOOK at each: no overlay labels on real photos, no broken sections, no empty bands. A page can return 200 and still look wrong; status codes never count as verification.

Report: **one clickable localhost URL per page, one line each** - never "12 pages created". Plus: filled from real data · deliberately left placeholder and why (no real value = ask me, don't leave it) · next command (`/service-page`). On approval run `/publish` the same day.
