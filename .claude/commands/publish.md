---
description: Ship it - deploy, robots, sitemap, submit to Google
---


## ⛔ Step 0 - the site gate. Nothing deploys past a failure.

```
python3 code/check_site_complete.py
python3 code/check_scheduled_links.py
```

**The second one catches a failure nothing else can see: a page that goes live linking to one that has not.** Page A publishes on the 1st with a raw `<a href>` to page B, which is held until the 3rd. For two days A sits on the internet pointing at a 404, and the build is green the whole time. Every link to a dated route must go through `<ScheduledLink>`, which renders as plain text until the target's date arrives. Three real instances of this shipped before the check existed.

If it fails - any placeholder, dead link, broken route, or missing pyramid page - **publishing stops**. Report the failures and which skill fixes them (`/build-website` for structure and placeholders, `/service-page` / `/blog-post` for page content). The ONLY exception: placeholders the owner explicitly told a skill to leave; name each one and get a yes before deploying with them. A placeholder on a live site is the one failure a visitor sees.

Publish the site (or the batch of Linked drafts in `website-index.md`) **right now**.

## This command SHIPS. `/scale-map` owns the queue and the drip.

Read `references/publishing-cadence.md` for the caps. Everything about scheduling - the date wiring, the dripped dates, the daily Action - belongs to `/scale-map`, because bulk generation is the only thing that creates a queue. This command's job is to get a site live and to ship what is ready.

Three lanes, and you pick without asking:

- **One page → immediate. This is the default, and it is not an exception.** Set `publishDate` to today, push, done. One page is not a clump, and the caps are not a reason to make somebody wait. Never route a single page through a schedule.
- **A first launch** - home, services, top cities, about, contact - ships together. That is correct, not a violation.
- **A batch from `/scale-map`** already carries its own dates and its own drip - that command owns scheduling end to end and set it up as a one-off. Nothing to do here: deploy, and the build releases whatever came due. Never re-schedule a batch that is already dated.

**⛔ The cap guard - the one thing that stops "one-off" becoming a clump.** Before publishing a single page immediately, count what actually went live in the last 7 days (`website/publish-schedule.md` - inside the pushed repo, never the blueprint root rows marked Live, plus anything dated inside the past week). If today's page would breach the weekly cap for the domain's age, say so in one line and offer the next open date. **I can still override and you publish it** - this is a warning, not a gate - but log the override. Five "one-offs" in a day is a bulk publish wearing a disguise, and nothing else in the system would catch it.

**The drip wiring lives in `/scale-map`, not here.** Date-filtered builds, generated listings, the date-aware link helper and the daily rebuild Action are all set up once by that command's first scheduling run, because bulk generation is the only thing that creates a queue. If a queue exists, deploying is all this command has to do - the build releases what came due. See `references/publishing-cadence.md`.

**Pre-flight - refuse politely if these fail:**
1. Drafts being published are Status = Linked in `website-index.md` (if still Draft, run `/internal-linking` first - never publish orphans)
2. No page targets a primary keyword already Published (check `keyword-map.md`)

**Deploy by lane:**
- **Static/Next.js - fully automated via GitHub + Vercel CLIs.** One-time wiring (do it now if missing, walking me through each login):
  - GitHub: check the CLI exists first - `command -v gh` → if missing, install it (`brew install gh` on Mac, `winget install GitHub.cli` on Windows) and continue, never error out. Then `gh auth status` → if not logged in, `gh auth login` (I follow the browser prompt - no GitHub account yet? The same page has "Create an account", sign up there and come back). Then `gh repo create [site-name] --private --source website/ --push` (or plain `git push` if the repo exists).
  - Vercel: `npx vercel login` (browser prompt) → `npx vercel link` in the site folder.
  - **⛔ THEN CONNECT THE REPO TO VERCEL. `vercel link` does NOT do this and it is the step everyone misses.** `link` ties your LOCAL FOLDER to a Vercel project; it does not tell Vercel to watch GitHub. Without the Git integration, pushing changes nothing - deploys only happen when someone runs `npx vercel --prod` by hand, which means the whole scheduled-publishing model silently does not work:
    ```bash
    cd website && npx vercel git connect https://github.com/<user>/<repo> --yes
    ```
    **Verify it rather than assuming** - make a trivial commit, push, and confirm a deployment appears (`npx vercel ls`) without you running a deploy command. If it does not, the integration is not live and nothing that depends on "a push rebuilds the site" is true.
  - Record all three as done in CLAUDE.md "## My setup".

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

  - Every publish after that: `npm run build` locally FIRST (catch errors before they're deploy failures) → commit + push → `npx vercel --prod` → **read the deployment output and logs yourself** (`npx vercel inspect [url] --logs` on failure) - never tell me "check the Vercel dashboard": read the log, find the error, fix it, redeploy, repeat until the deploy is green.
  - Verify the live URLs return 200 before calling it shipped.
- **WordPress:** publish the drafts through Novamira (they were created as WP drafts by the content commands), verify each URL renders live.

**⛔ The custom domain - first deploy only, and ASK before assuming.** A deploy lands on `something.vercel.app`, which is a temporary address, not a business's website. Nothing errors, so nothing flags it - which is exactly why this step is explicit. First question, before any Search Console work:

> "Do you own a domain for this business? If yes, paste it. If not, buy one first - about $12/year at Namecheap, Cloudflare or Porkbun - it takes five minutes and everything below depends on it."

- **They have one:** `npx vercel domains add [their-domain.com]`, then read the exact records Vercel prints and walk them through adding those at their registrar - name the click path for the registrar they actually use (GoDaddy: My Products → DNS → Add · Namecheap: Domain List → Manage → Advanced DNS · Cloudflare: the domain → DNS → Add record; **on Cloudflare set the record to DNS only, not proxied**). Then wait for it to resolve, confirm the real domain serves the site over HTTPS, and record it in CLAUDE.md "## My setup".
- **They don't:** say plainly that the `.vercel.app` URL is temporary, that ranking work should not start until the real domain is live (Search Console, the Business Profile link and every citation all point at the domain - moving later means redoing them), and stop the Google steps below here. Everything else built so far still stands.

Never run `/gsc`, submit a sitemap, or point a citation at a `.vercel.app` URL.

**Make Google (and AI) see it:**
1. `robots.txt` - allows crawling, and explicitly allows the AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) - AI answers are a traffic source now, not a threat
2. `sitemap.xml` - generating, complete, reachable
3. Search Console: first time ever → run `/gsc` (the full manual walkthrough: verify, submit sitemap, request indexing). Already set up → just confirm the sitemap reflects the new pages and request indexing on the biggest new URLs via URL Inspection.

**Close the loop:** flip published rows to Status = Published in `website-index.md` ONLY. **Never write a published state into `keyword-map.md`** - that file stops at `# Written` by design, because a page leaves the build list when it is WRITTEN, not when it goes live. Duplicating the live state into both files is how they drift and neither can be trusted. The map answers "what still needs building"; the index answers "what is live". Report: URLs live, sitemap status, and the honest timeline - Google typically takes days to weeks to index and 2-4 weeks for movement; nothing is broken if rankings don't jump tomorrow.
