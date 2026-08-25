---
description: The month-1 finale - build + optimize EVERY remaining page in the map, batch by batch, until the map is done
argument-hint: [batch size, optional - default 3]
---

Scale the map. This command finishes the job - **every remaining keyword in `keyword-map.md` becomes a built, optimized, linked, published page.** Batch size: $ARGUMENTS (default 3).

**⛔ The drip is THIS command's job, and it is self-contained.** Bulk generation is the only thing that creates a queue - a hand-written post publishes the day it is written, so nothing else on the site ever needs a future date. That makes scheduling cohesive with scale-map, not with `/publish`. Set it up once, here, and it runs on its own from then on. `/publish` does not need to know it exists.

**One-time setup, first scheduling run only.** Four things get built: `publishDate` on every page with the build filtering future dates out of routes/listings/`sitemap.xml`, listings generated from that filter, the date-aware link helper, and the daily rebuild Action. **The implementation steps live in ONE place - the scheduling section at the bottom of this file - so they cannot drift.** Do not build from this paragraph; it is the summary.

**After setup it is a background event.** Any rebuild ships exactly what came due - routes, listings, sitemap and links in the same deploy. A push is enough; the Action covers the quiet weeks.

**Business Profile posts - BLOG POSTS ONLY, and this command never writes one.**

**⛔ Never for a service or city page.** "We now offer drain cleaning" is a nothing-post: the service is not new, nobody is waiting for the announcement, and it burns a slot a real offer or customer story should have had. Do not ask about money pages, ever.

**Blog posts are different** - they are genuinely new, they are useful on their own, and they route the reader to the money page anyway. So for every BLOG in an approved batch, add one line to the **`## GBP candidates`** section of `gbp-posts-queue.md` (create the section if missing):

```
- /blog/how-much-does-a-plumber-cost · added 24 Aug · angle: the price question people actually search
```

**That is a candidate, not a post.** `/scale-map` writes no YAML, touches nothing in `gbp-queue/`, and schedules nothing - a file in `gbp-queue/` ships on the next cron, and an auto-generated announcement has not been ranked against anything. `/gbp-posts` picks these up on its next monthly run and judges them against its own angle bank, so a candidate only becomes a post if it beats the alternatives. Most months, some will not - that is the filter working.

Mention it in one line at the checkpoint (`3 blogs added as GBP candidates`) and move on. No question, because nothing is being published.

**⛔ Do not confuse this with the unsent-queue step at the end of this file.** They are different acts: adding a blog as a CANDIDATE is silent and needs no permission because nothing ships. Scheduling posts that are ALREADY written and approved but never sent DOES need a yes, and that step is required. "Never ask about GBP" applies to announcing money pages - nothing else.

**Read `references/hub-spoke-pages.md` before any batch containing hubs, pillars, or city pages** - it holds the researched formula (pillar = short router with a section per spoke; city caps and the doorway evidence; the linking numbers) and every page built here must land conforming, including growing the hub's section for each new spoke in the same batch.

**This is the stamping step.** Every page built here is stamped from the two template pages confirmed in the preflight below - real pages that have passed `/seo-optimization` at 100%, not the raw `/build-website` output and not a markdown spec. Same structure, same section pattern, same schema, same CTA placement. **Do not invent a new page shape here.** If a page genuinely needs a different structure, stop and say so rather than quietly diverging: a one-off shape inside a 60-page site is an inconsistency nobody maintains.

**Preflight (hard gates):**
- `context/proof/` + `context/voice.md` filled, site live, `keyword-map.md` approved. Any missing = stop and name the step.
- **⛔ CONFIRM THE TWO TEMPLATE PAGES OUT LOUD, BEFORE ANYTHING ELSE. One question, pre-answered.**

  The template is **a real page that has already passed `/seo-optimization` at 100%** - not a markdown description of one. The page is executable truth: its schema, section order and CTA placement are provably right because they scored. A written spec is a lossy copy that drifts the moment the page changes.

  So: read `website-index.md` and CLAUDE.md "## My setup", pick the **highest-scoring, most recently optimized** page of each type, and confirm rather than ask cold:

  > **"Stamping from these: service pages → `/services/local-seo-services` (100/100, optimized 24 Aug) · blogs → `/blog/seo-vs-google-ads` (100/100, optimized 24 Aug). Both good, or name different ones? Every page in this run inherits their structure."**

  - **Record the answer in CLAUDE.md "## My setup"** (`template:service = ...`, `template:blog = ...`) so it is asked once, not every batch. A later run confirms the saved choice in one line instead of asking again.
  - **A page that has NOT been through `/seo-optimization` cannot be the template.** Stamping from an unoptimized page copies its gaps into 60 pages and the fix is then a 60-page rewrite. If neither type has a passing page, stop and run `/seo-optimization` on the best candidate first.
  - Neither type exists at all? Stop - run `/build-website`, then `/seo-optimization`, then come back.
  - The specs in `references/service-page-template.md` and `references/blog-post-template.md` explain **why** each section exists and are what `/build-website` uses for page one. Once a real optimized page exists, **the page is the authority and the spec is reference** - if they disagree, the page wins.
- Read/create `scale-map-log.md` - resumable across sessions; report progress if a previous run exists ("31 of 52 pages done - continuing").

**The loop (repeats until every approved row has MOVED from `# To build` to `# Written`):**

**⛔ A row's POSITION is its status - there is no `Status:` field on a map row.** `keyword-research.md` forbids one, and two states cannot both be true. Written = the block sits under `# Written`. The single exception is a page the local-material gate refused, which carries `Status: Held` and stays in `# To build` with its reason - that is the only `Status:` line allowed anywhere in the map.
1. **Pull the next batch** in tier order - hubs before spokes, service pages and blogs as the map dictates.

   **⛔ THE FILESYSTEM IS THE AUTHORITY, NOT THE MAP ROW.** Before building anything, check whether a page already exists at that route (`website/app/...`). **A row sitting in `# To build` is not proof the page is unbuilt** - the row is moved by hand and it drifts; the file on disk cannot. If the page exists:
   - **Skip it and move the row to `# Written`.** Never rebuild over it. `/scale-map` overwriting a page that was hand-edited, optimized or already live destroys real work, and nothing would flag it.
   - Say it in one line - `row 1 (SEO audit) already built at /services/seo-audit - row moved, not rebuilt` - so the drift is visible rather than silently corrected.
   - Then take the next unbuilt row so the batch is still the size I asked for.

   Run `python3 code/status.py` first if you want the whole picture in one table; it derives state from disk and git, so it never disagrees with reality.

1b. **⛔ THE LOCAL-MATERIAL GATE - runs BEFORE a single word is written, and it is the whole point of this command.** **Read `references/doorway-pages.md` first** - it holds the full checklist, what Google actually says (and the three things the industry gets wrong), the evidence, and the fix table. A city page built by swapping the city name into the last city's page is a doorway page. Google's doorway policy can suppress the ENTIRE set, not just the copies, and this is the number one way a 40-page local map dies. Catching it at scheduling (step 5) is too late - by then the research, the optimization and the linking have all been spent on a page that gets Held.

   For every city row in the batch, before building it, find the real local material in `context/proof/`:
   - **A real job done in or near that city** - what it was, what it cost, what went wrong
   - **Local specifics** - neighbourhoods, landmarks, the council/permit quirk, the housing stock, the weather problem that city actually has
   - **A city-specific answer** to at least one FAQ - a different answer, not the same answer with the city name in it
   - **A real photo, review, or customer from there**

   **Three or more of those four: build it.** Fewer: `Status: Held`, one-line reason, and it NEVER enters the build - do not research it, do not write it, do not link it. Report held cities to me as a group with what each one is missing, because the fix is mine: a job, a photo, a review from that city.

   **Then the sibling check, also before writing.** For every pair of city pages under the same service, name what will be genuinely different between them BEYOND the city name. If you cannot name it in one sentence per page, they are the same page and only one gets built. **Never write "find and replace the city" as a plan, and never produce two pages whose only difference is a place name** - if that is what the map asks for, the map is wrong and you say so rather than complying.

2. **Build each page with the FULL engine:** top-3 spec → 30+ source research → **the template page confirmed in the preflight** (a real page that scored 100%; the specs in `references/blog-post-template.md` / `references/service-page-template.md` explain WHY each section exists but the page is the authority) → voice pass → proof count (5+ or back it goes) → on-page + GEO rules applied at write time. The template governs the STRUCTURE; every page's content is researched and written fresh. Never copy body copy between pages.
3. **Optimize:** run the `/seo-optimization` loop on the batch - the same command taught earlier in the track, not a summary of it - every page to 100% on the 80 checks in `references/on-page-seo.md`. **A page that will not reach 100% does not get waved through with a note.** It goes back, or it is held with the reason. Record each page's score; the checkpoint below has to show it.
3b. **⛔ Similarity check - the gate's backstop, run on every batch containing 2+ pages under one service:**
   ```
   # substitute the real service slug - [service] is a placeholder, not literal
   python3 code/check_page_similarity.py --base http://localhost:3000 --pattern /services/local-seo-services/
   ```
   It strips the site's own boilerplate, then flags DUPLICATE (>=85% overlap) and TEMPLATE CLONE (>=80% of one page contained in another) as failures, and near-duplicates (>=50%, Broder 1997) as warnings. **A failure means the page goes back for real differentiation - never publish through it.** If a page reaches here and fails, the step-1b gate let something through: say so, because it means the research and optimization were spent on a page that was never shippable.
4. **Wire:** the `/internal-linking` pass over the new pages + affected hubs
5. **Checkpoint → ⛔ show me the batch, WITH THE EVIDENCE.** One line per page carrying all four numbers, so a batch can never be approved on trust:

   `Emergency plumber Toronto · on-page 80/80 · Lighthouse 96 mobile · proof 7 · template: service-page ✓`

   - **on-page** - the score from step 3. Anything under 100% is named and explained, never rounded up or omitted.
   - **Lighthouse** - mobile, and say "mobile" (a bare number is a soft number).
   - **proof** - the touch count, 5+ or the page went back.
   - **template** - which approved template it was stamped from, and confirmation the structure matches it: same section pattern, same schema, same CTA placement. **If a page diverged from the template, say so here rather than letting it pass** - a one-off shape inside a 60-page site is an inconsistency nobody maintains.

   Plus the best paragraph from the batch, so I can hear the voice. On my approve: **schedule the batch** (below) - never publish it all at once. Log the cycle, pull the next batch.

**Scheduling - the last step of every batch. Read `references/publishing-cadence.md` for the caps; do not invent a cadence.**

- **⛔ ASK THIS FIRST - BEFORE DATES, BEFORE PUSHING, BEFORE ANYTHING ELSE IN THIS SECTION.** Unsent Business Profile posts get offered up front, not at the end. Ask once, here, then carry on and queue them in the SAME pass as the page batch so I approve one thing and both queues fill together.

  Read `gbp-posts-queue.md`. If it holds approved posts with no `sent_at`, **schedule them from this command on my yes.** Telling me to go run `/gbp-posts` is not an answer - you are already looking at eight finished, approved, voice-checked posts and the webhook is already configured. Making me run a second command to ship work that is done is the failure, not the fix.

  **Print this and stop:**

  ```
  ── 8 approved Business Profile posts have never gone out ──

  They were written before the webhook existed. It exists now.

  Schedule them?  Mon/Wed/Fri, one per run, first goes out <date>,
  last goes out <date>.

  I'd also push POST 1 right now, so you can see it land on your
  profile before trusting the other 7 to a cron.

  yes      → push post 1 now, queue the rest
  queue    → queue all 8, push nothing today
  no       → they stay where they are
  ───────────────────────────────────────────────────────────
  ```

  **⛔ Default to pushing the first one immediately, and say why: a webhook that has never carried a real post is a webhook that fails silently at 9am three weeks from now.** The scheduled posts all go through the identical path, so proving it once with a live post is the only thing that makes the other seven trustworthy. This mirrors the page LIVE PROOF above - same reasoning, different channel.

  **On "yes":**
  1. **⛔ Fire it through the WORKFLOW, never a terminal `curl`.** Write post 1 to `gbp-queue/` with today's `send_after`, confirm `MAKE_WEBHOOK_URL` exists (`gh secret list`), push, then send me to run `.github/workflows/gbp-posts.yml` from the Actions page - same as the page proof. **A `curl` from this machine tests the webhook and nothing else**: not the queue, not the cron, not the caps, not the `sent/` move, not the secret - which is where every real failure lives. Read the run log for the 200.
  2. **Send me to look at the profile and WAIT for me to confirm it is there.** The 200 proves Make received it; only the profile proves Google published it. Do not proceed on the status code alone.
  3. Move it to `gbp-queue/sent/` with today's `sent_at` and mark it Published, so it can never send twice.
**⛔ VALIDATE BEFORE YOU CLAIM ANYTHING IS QUEUED. `python3 code/check_gbp_payload.py gbp-queue` must exit 0.** A payload with `post_type: "UPDATE"`, `cta_type` or `image_url` gets a **200 from Make and publishes nothing** - the Router matches no branch, so the send looks successful and the profile stays empty. That exact payload shipped once. Only three `post_type` values exist: `"Call to action"`, `"Event"`, `"Offer"`. Never report posts as scheduled until the validator passes and the `.yml` files exist on disk.

  4. Then queue the rest **in the same pass as the page batch** and report both sets of dates together - pages and posts, one list. I said yes once; do not come back for a second approval.

  **On "queue":** skip the push, queue all 8, and say plainly that the webhook is now unproven - the first scheduled post is the test, and if it fails it fails on a Wednesday morning with nobody watching.

  **Check staleness before any of this** - a post referencing a deadline that has passed is not schedulable; name those individually and offer to refresh just them rather than shipping a post whose date reference has expired.

  **Never generate NEW Business Profile posts here** - that is still `/gbp-posts`, and this command never writes one. Scheduling posts that already exist and are already approved is a different act from writing them.

  If nothing is unsent, say nothing at all.


**⛔ EVERYTHING THIS COMMAND PRODUCES DRIPS. No exceptions, no page-type distinction.** Service pages, city pages and blog posts all get dates. There is no "money pages ship together" carve-out here - that rule belongs to a first launch, and `/scale-map` never runs on one: the site has already been published before this command is used. Every page it makes is an ADDITION to a live site, and additions drip.

Bulk publishing is what drops indexation from ~87% to ~41% and is the exact profile Google's scaled-content policy targets - and Google cannot tell a service page from a blog post by looking at it. So the batch gets dates, not a deploy:

- **Hold anything that shouldn't ship - the backstop, not the filter.** The local-material gate (step 1b) should have caught every near-duplicate city before it was built; anything that still reads thin or cloned here gets `Status: Held` and a one-line reason instead of a date. Say how many you held. **If a page reaches this step and gets held for being a clone, the gate failed - say that too**, because it means research and optimization were spent on a page that was never shippable.
- **Assign dates to EVERY page in the batch.** Money pages take the earliest slots because they earn soonest - but earliest slot is not the same as no slot. Spread across weekdays (Tue/Thu, not both Monday). Respect the weekly cap for the domain's age - 10-15/week in months 1-2, up to 20-30/week from month 3.
- **Write `website/publish-schedule.md`** per `references/output-format.md` - three lines at the top, "Going live this week" first, the rest below, four columns (Date · Page · Type · Status). It lives INSIDE the pushed repo, next to the app root you detected below - never at the blueprint root - and always `git pull` before editing it once the runner is live.
- **Stamp the date on the page itself.** Every page gets `publishDate: YYYY-MM-DD` in its frontmatter. That stamp - not the schedule file - is what the build reads, so it is the only thing that actually controls when a page appears. The schedule file is the human-readable record of the same decision.
**⛔ LISTINGS ARE DATA, NOT JSX. Add an ENTRY, never a link.** The `/services` and `/blog` indexes render from `website/content/services.ts` and `website/content/posts.ts`. **Never hand-edit `app/services/page.tsx` or `app/blog/page.tsx`** - when they were hardcoded, every new page's link got appended next to whichever link happened to be last, and four unrelated services ended up filed under the "SEO Audit Services" heading. Data cannot make that mistake: one object in the list renders as its own section, in order, and is filtered by publish date so a held page does not appear at all. City pages go in the parent's `children`, never as top-level entries.

**⛔ Every link to a dated route goes through `<ScheduledLink>`, never a raw `<a>`.** A page that publishes on the 1st linking to one held until the 3rd is a live 404 for two days, and the build stays green throughout. `python3 code/check_scheduled_links.py` must exit 0 before the batch is done - it caught three real instances of this.

- **⛔ PUSH THE BATCH. A batch that only exists on this laptop is not scheduled, it is lost.** Once dates are stamped and the schedule file is written, commit and `git push`. The queue cannot drain from a local folder - GitHub has to have the pages before any rebuild can release them.

  **Pushing is NOT publishing:** every page is future-dated and the build excludes future-dated pages from routes, listings and `sitemap.xml`, so the whole batch goes up at once and still appears one page at a time. That separation is the entire reason the date gate exists.

- **⛔ BUILD THE DATE WIRING. FIRST SCHEDULING RUN ONLY, AUTOMATICALLY, WITHOUT ASKING.** The site has already been published before this command is used, so the repo and the Vercel project exist. **Never send me to a dashboard and never hand this to `/publish`** - the only thing `/publish` owns is creating the GitHub repo if there genuinely is not one. Write the code:

  **1. `<app-root>/lib/publishing.ts`** - the one helper everything else reads. `<app-root>` is whatever the detection step below returns (often `website/`, sometimes the repo root - never assume):
  ```ts
  export const isLive = (d?: string) => !d || new Date(d) <= new Date();
  export const live = <T extends { publishDate?: string }>(xs: T[]) => xs.filter(x => isLive(x.publishDate));
  ```

  **2. `export const publishDate = "YYYY-MM-DD"` in every page** this batch creates, and backfill the existing pages with the date they went live (or omit it - no date means live, which is correct for anything already public).

  **3. Future-dated pages 404 and leave the sitemap.** In each dated page: `if (!isLive(publishDate)) notFound();`. In `<app-root>/app/sitemap.ts`, filter with `live()`.

  **4. Convert every hand-maintained listing to use `live()`** - the blog index array, the services index, each hub's city block. A hardcoded `POSTS` array is the single most common reason a "scheduled" page shows up early.

  **5. The date-aware link helper** - a component that renders `children` as plain text when the target's date is in the future and an `<a>` when it is not. `/internal-linking` rule 9 wires the whole graph through it.

  **Then PROVE it before writing a single date into the schedule:** build, confirm a future-dated page 404s AND appears in no listing AND is absent from `sitemap.xml`, then confirm a past-dated one renders. **If that proof fails, stop and fix it** - dates written on top of broken wiring are worse than no dates, because they read as a working queue.

- **⛔ CONNECT THE REPO TO VERCEL, THEN VERIFY. No dashboard, no deploy hook, no secret.** `npx vercel link` only ties the local folder to a project - it does NOT make Vercel watch GitHub, and without that a push deploys nothing. Run it from the app root, and pass the repo URL explicitly - the git root is often the PARENT of the app folder, and without the URL it fails with "no local Git repository found":
  ```bash
  cd website && npx vercel git connect https://github.com/<user>/<repo> --yes
  ```
  Then prove it: push a trivial commit and confirm a deployment appears (`npx vercel ls`) with nobody running a deploy command.

  - **⛔ SET THE COMMIT EMAIL FROM VERCEL. Never ask me for it, never leave the default.** Vercel rejects any deployment whose commit author it cannot match to a seat on your account - error `TEAM_ACCESS_REQUIRED`. The default git identity on a fresh Mac is something like `jono@mac.home`, a hostname that exists nowhere, so **every push deploys and every deploy is blocked, silently.** The site looks frozen while the pushes land fine, which is why this takes hours to find. Read the real address from the API and set it:
    ```bash
    T=$(python3 -c "import json,glob,os;[print(json.load(open(f))['token']) or exit() for f in glob.glob(os.path.expanduser('~/Library/Application Support/com.vercel.cli/auth.json'))+glob.glob(os.path.expanduser('~/.local/share/com.vercel.cli/auth.json'))+glob.glob(os.path.expanduser('~/.vercel/auth.json')) if os.path.exists(f)]")
    EMAIL=$(curl -s https://api.vercel.com/v2/user -H "Authorization: Bearer $T" | python3 -c "import json,sys;print(json.load(sys.stdin)['user']['email'])")
    git config user.email "$EMAIL"
    ```
    **The same address goes in the daily rebuild workflow**, because the Action commits too and its commits hit the identical check. A workflow committing as `bot@users.noreply.github.com` blocks every scheduled deploy forever - the queue will never drain and nothing will say why. Record the email in CLAUDE.md "## My setup".

    **Verify, do not assume:** push a commit and confirm the deployment reaches Building rather than Error in ~3 seconds. A 3-second Error is this check failing.

  - **⛔ FIND WHERE THE APP ACTUALLY LIVES, THEN SET VERCEL'S ROOT DIRECTORY TO IT. Detect it - never assume.**

    Vercel defaults Root Directory to the repo root. If `package.json` is not there, every build fails with no `package.json` found - and it fails *after* the Git integration starts working, which makes it look like a code problem.

    **The app root is wherever `package.json` with a `next` dependency is. It is NOT always `website/`** - some sites are generated at the repo root, some in `website/`, some in `apps/web/`, and a member may have cloned or restructured. Find it:
    ```bash
    # from the repo root - first match wins, ignore node_modules
    find . -name package.json -not -path "*/node_modules/*" -maxdepth 3 \
      -exec grep -l '"next"' {} \; | head
    ```
    Repo root → Root Directory is empty (`""`). One level down → that folder name. Deeper → the full relative path (`apps/web`).

    **Say what you found before setting it** - `package.json is at ./website, so Root Directory = website` - so a wrong guess is visible to me rather than buried in an API call. Then set it, substituting the path you actually found:
    ```bash
    APP_DIR=website      # <- whatever the find above returned, NOT a default
    PROJECT_ID=$(python3 -c "import json;print(json.load(open('.vercel/project.json'))['projectId'])")
    ORG_ID=$(python3 -c "import json;print(json.load(open('.vercel/project.json'))['orgId'])")
    curl -s -X PATCH "https://api.vercel.com/v9/projects/$PROJECT_ID?teamId=$ORG_ID" \
      -H "Authorization: Bearer $T" -H "Content-Type: application/json" \
      -d "{\"rootDirectory\":\"$APP_DIR\"}"
    ```
    Confirm the response echoes the path back, and record it in CLAUDE.md "## My setup".

    **The three Vercel failures in order, because each one masks the next:** Git not connected (pushes deploy nothing) → commit email not on a seat (`TEAM_ACCESS_REQUIRED`, ~3s Error) → Root Directory wrong (build fails, no `package.json` found). Fixing one reveals the next, so verify all three before calling the deploy pipeline done.


- **⛔ THE DAILY REBUILD ACTION - no hook, no secret, nothing to configure.** Vercel has no reliable public API for minting deploy hooks and refuses them on CLI-created projects, so **do not try.** You do not need one: `.github/workflows/daily-rebuild.yml` pushes an EMPTY COMMIT on its cron, the Git integration turns that into a deploy, and the build releases whatever came due. Its first step writes the Publish queue summary to `$GITHUB_STEP_SUMMARY`. **Do NOT fire it yourself** - the LIVE PROOF step below has me trigger the first run from GitHub, and that demonstration is the whole point.

  **No git remote at all?** `/publish` creates the GitHub repo - that is its job and its only job here. Everything after that (the Git integration, the commit email, the root directory, the Action) belongs to THIS command, per the steps above. Say what is missing, run `/publish` if it is just the repo, then continue - never leave a batch stranded locally without telling me.

- **⛔ WORDPRESS LANE: SKIP ALL OF THE ABOVE.** WordPress schedules natively - set a future `post_date` on the draft and WP publishes it itself. No date wiring, no `publishDate` exports, no sitemap filter, no GitHub Action, no Vercel, no secrets. **Never build the static-lane machinery on a WP site**; it is hundreds of lines solving a problem WP solved in 2005.

  **The one real gap on WP: there is no date-aware link helper**, so a link to a scheduled post is a dead link until it publishes. Two honest options - say which you are doing:
  - **Link only to published pages now**, and re-run `/internal-linking` after each publish date to wire the new one in. Costs a run per publish day.
  - **Publish the whole batch immediately** and accept the cadence hit. Only sane for 2-3 pages.

  Never wire a bare link to a future WP post and call it done - that is a 404 on a live site for however many days remain.

- **⛔ WALK THE TEST PHASE WITH ME. Never report the pipeline working on inference.** More can fail here than anywhere else in the track, each failure masks the next, and every one of them looks like success from the outside - pushes land, the Action goes green, and the site sits frozen. Run these IN ORDER and show me each result:

  1. **Git integration** - push a trivial commit, then `npx vercel ls`. A new deployment must appear with nobody running a deploy command. Nothing appears → `vercel git connect` did not take.
  2. **Commit author** - that deployment must reach Building. A ~3-second `Error` means `TEAM_ACCESS_REQUIRED`: the commit email is not on a Vercel seat.
  3. **Root Directory** - the build must find `package.json`. "No package.json found" means Root Directory is pointed at the wrong folder.
  4. **The date gate** - a future-dated page 404s, is absent from `sitemap.xml`, and appears in no listing. Then move its date to the past, rebuild, and confirm it renders with its inbound links live. **Put the date back.** This is the only test that proves the queue is real rather than decorative.
  5. **The Action** - do not run it. This is the one step I perform, in the LIVE PROOF above: I fire it from the GitHub Actions page and confirm the green run plus the Publish queue summary. If that has already happened this run, say so and move on.

  **A failure at any step stops the run.** Do not proceed to the next test, do not schedule dates on top of a broken gate, and never say "should work" - each step has a specific observable outcome and you either saw it or you did not. Report the five as a checklist with what you actually observed, not what you expected.

- **⛔ END BY HANDING ME THE VERIFICATION LINK - AND DO NOT FIRE THE RUN YOURSELF.** A schedule I cannot check is a schedule I have to trust. Give me the workflow URL, not a run you triggered:
  ```
  https://github.com/<user>/<repo>/actions/workflows/daily-rebuild.yml
  ```
  **`gh workflow run` is banned in this command.** Firing it for me replaces the one thing that has to be demonstrated - me watching the mechanism work from the page I will use to check it later. If no run exists yet, that is what the LIVE PROOF step above is for; do not shortcut it here.

- **⛔ THE LIVE PROOF. THIS IS THE LAST STEP OF THE RUN - EVERYTHING ELSE MUST BE DONE FIRST.** You stop here and print this block, and nothing else happens until I reply. **So any step that needs a decision from me - the Business Profile queue above especially - has to be asked BEFORE this point, or it never gets asked at all.** Check you have nothing else outstanding before you print. *(Static lane only - on WordPress skip this entirely and instead show me one scheduled post in the WP admin with its future date, since WP publishes it natively.)*

  Not a description of a test - **three clickable URLs and a stop.** I click a dead page, I click a button on GitHub, I reload the dead page and watch it work. If you have not printed these three links and waited, you have not done this step.

  **⛔ THE BLOCKING GATE. Stage the page exactly TWO MINUTES out, then block until it is due. You may not print the block before that.**

**Two minutes, not ten.** The wait is dead air - I am sitting there watching nothing happen. Two minutes clears the ~40s Vercel deploy with margin and is short enough that waiting is invisible. **Never stage further out than that**, and if you have already staged something long, re-stage it closer rather than serving out the wait.

  The failure this prevents, which has happened repeatedly: the page is staged to go live at 02:32, the block is printed at 02:26, I click, the workflow correctly releases nothing, and the whole thing reads as broken machinery. **It was never broken - I was just asked to click before the page was due.** Asking me to wait does not fix it either; I will click immediately, because you just gave me a link.

  **So YOU wait, not me.** Stage it, then block until it is genuinely ready:

  ```bash
  URL="https://<domain>/services/<the-page>"

  # 1. Stamp the page NOW + 2 MINUTES and push. Vercel starts deploying.
  DUE=$(date -u -v+2M +%Y-%m-%dT%H:%M:%SZ 2>/dev/null || date -u -d "+2 minutes" +%Y-%m-%dT%H:%M:%SZ)
  #    ...write $DUE into the page's publishDate, commit, push...

  # 2. POLL VERCEL until that deploy is Ready. Do not guess how long it takes.
  until npx vercel ls --yes 2>/dev/null | head -3 | grep -qE "Ready|● Ready"; do sleep 5; done
  READY_AT=$(date -u +%s)

  # 3. Did the deploy finish BEFORE the page came due? That is the whole question.
  DUE_S=$(date -u -j -f "%Y-%m-%dT%H:%M:%SZ" "$DUE" +%s 2>/dev/null || date -u -d "$DUE" +%s)
  if [ "$READY_AT" -ge "$DUE_S" ]; then
    echo "DEPLOY OUTRAN THE CLOCK - that build already released the page. Re-stage."
    exit 1
  fi

  # 4. Now wait out the remaining seconds, then confirm it is due AND still 404.
  while [ "$(date -u +%s)" -le "$DUE_S" ]; do sleep 5; done   # 5s granularity - print the block the moment it is due
  CODE=$(curl -s -o /dev/null -w "%{http_code}" "$URL")
  echo "due since $DUE, deploy Ready before it, page returns $CODE"   # want 404
  ```

  **Why poll instead of sleeping:** a Vercel build normally takes ~40s but can take three minutes on a cold cache. If it finishes AFTER the page comes due, that build releases the page and there is nothing left for my click to do - I load the link and it is already live. Polling turns that from a silent failure into a caught one: you know exactly when the deploy landed and whether it beat the clock.

  **Three outcomes and what each means:**
  - **Due, still 404** → this is the state the demo needs. Print the block.
  - **Not due yet** → keep waiting. Do not print. Do not tell me to wait for it.
  - **Due but already 200, or the deploy outran the clock** → that build released it. **Re-stage with a fresh timestamp and start over.** Never print a block whose first link already works - that is the demo failing in front of me.

  **Say one line when the gate passes** - `page due since 02:32Z, still 404, no build since - ready` - so I can see it was verified rather than assumed. Then print the block.

  **Then print exactly this, filled in, and STOP:**

  ```
  ── LIVE PROOF · your turn ──────────────────────────────

  1. CLICK THIS. It should 404. The page is in the repo, its
     publish time has already passed, but nothing has rebuilt
     since - so the site does not know yet.
     https://<your-live-domain>/services/<the-page>

  2. NOW CLICK THIS, then "Run workflow" → main → "Run workflow".
     https://github.com/<user>/<repo>/actions/workflows/daily-rebuild.yml

  3. Wait ~60 seconds for the green tick, then reload URL 1.
     It is now live. Nobody touched a terminal.

  Tell me when you have done it.
  ────────────────────────────────────────────────────────
  ```

  **Hard rules:**
  - **The 404 link must be the PUBLIC deployed domain**, never `localhost`. A localhost 404 proves nothing about the deploy pipeline.
  - **⛔ NEVER run `gh workflow run` yourself here, and NEVER offer to.** Not as a fallback, not after a failed attempt, not "if you'd rather I just trigger it", not to save me time. The entire value of this step is that I press the button on the page I will use to check this forever - firing it for me deletes the demonstration and leaves me with your word that it works.

    **This matters most exactly when it is going badly.** If the timing was staged wrong and I clicked too early, the instinct is to apologise and do it myself to stop wasting my time. That is the failure. Re-stage it properly instead: pick a new timestamp, WAIT for it to pass, confirm the 404, and print the block again. Say "take 2" and own the mistake - do not resolve it by taking the click away from me.

    **If I explicitly tell you to fire it, fire it** - but never propose it.
  - **Never bury these links in a paragraph.** They are the deliverable of this step. Print the block.
  - **Wait for my reply before continuing.** Do not carry on and report the batch complete.

  **After I confirm:** point out that `sitemap.xml` had zero entries for that URL while it was held, so Google was never told about a page that was not there. Then restore the page's real date if today was not genuinely its date, and say you have done so.

- **Tell me the truth about the queue.** A 40-page queue at 2-3 blogs a week is about 4 months of content. That's the right answer, not a problem to fix by publishing faster. If I ask to go faster than the cap, tell me what it costs and log the override in `publish-schedule.md`.

**Done means `# To build` is EMPTY (bar anything Held) and every approved page has a publish date.** Built is not the same as live - a finished map is a queue that drains over the following weeks, and that is correct. Close with the month-1 scoreboard: pages built/published this run and total, proof touches average, on-page pass rate, the site tree as it now stands - and the handoff line: "The map is built. From here it's the weekly `/gsc` glance, `/audit` on a cadence, and `/keyword-research expand` when the map runs dry."

**Rules:** built ≠ published - every batch gets scheduled, never bulk-published · quality never drops to finish faster - if a batch reads like filler, stop and say so · one primary per page, the map is law · every page through the same gates as the hand-built ones · this command builds THE map; refilling it with new keywords is `/keyword-research expand`.
