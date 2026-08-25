---
description: The whole-site audit - Search Console, Semrush, backlinks, on-page, technical, AI surfaces, local - scored, then fixed on a loop until it's clean
argument-hint: [url] [focus: gsc | semrush | competitors | gap | backlinks | on-page | technical | ai | index | framework | hidden | keywords | thin | local | structure]
---

Audit AND fix the entire site: $ARGUMENTS (if no URL given, ask for one). Thirteen layers - Search Console, Semrush, the competitor benchmark, backlinks and authority, on-page, technical, AI surfaces, index hygiene, framework traps, hidden content, the keyword reality check, thin and doorway content, and local/Business Profile - graded on every page, reported in full, then - once I approve - fixed on a loop until it's clean.

**The order is always audit → report → approval → fix.** Never fix while auditing, and never touch a file before I've seen the report and said go.

**Focus mode:** name a layer (`/audit ai`, `/audit backlinks`, `/audit local`, `/audit index`) and run ONLY that layer sitewide - same depth, same loop. No focus = all thirteen.

---

## ⛔ THE COPY RULE - read this before you change a single word

**This command does not rewrite copy. Ever.** The words on the page are the owner's - their stories, their jokes, their phrasing, their argument. An audit that "improves" them has destroyed the one thing competitors can't copy and handed back generic AI filler with a better score.

**What you MAY change:**
- Title tags and meta descriptions (these are for Google, not readers - per `references/meta-info.md`)
- Alt text on images
- Heading TAGS where the structure is wrong (an H3 that should be an H2) - **the tag, not the words inside it**
- Adding a missing keyword into an existing heading or the first paragraph, where it fits naturally in the sentence that's already there
- Schema, canonicals, internal link anchors, image formats, file names, URL slugs
- Genuinely broken things: dead links, missing tags, duplicated content blocks

**What you may NOT change, at all:**
- Any sentence in the body copy, for any reason - not for flow, not for clarity, not for "readability", not for keyword density
- Stories, anecdotes, jokes, asides, opinions, the owner's turns of phrase
- The order or structure of an argument
- Anything at all just because it "reads better" your way

**The test before every single edit: is this fixing a mechanical SEO problem, or is this me writing?** If it's the second one, stop. If a page genuinely needs new or rewritten content, that is NOT this command's job - flag it in the report and route it to `/blog-post` or `/service-page`, where the voice files are loaded and the owner approves the draft.

**When you must touch a sentence** (a keyword genuinely has to appear in an H2 that doesn't have it): make the smallest possible insertion into the existing sentence, keep every other word, and show me the before and after so I can veto it. Never silently reword.

After every fix pass, confirm in the report that the copy survived intact - state how many body sentences were altered. The right answer is almost always zero.

---

## ⛔ THE DELETION RULE - you delete nothing

**Nothing gets removed from the site. Not by you, not silently, not "because it was hurting SEO."** No images, no videos, no embeds, no sections, no paragraphs, no pages, no plugins, no scripts. Not a thin page, not a duplicate, not an orphan, not an unoptimized 4MB hero image, not an old blog post with no traffic.

Every one of those has an SEO fix that is NOT deletion:
- Huge image → convert to WebP/AVIF, resize, compress, add width/height. **Don't remove the image.**
- Slow video embed → lazy-load it, use a facade/poster, defer the player script. **Don't remove the video.**
- Render-blocking script → defer, async, or move it. **Don't remove it** without knowing what it does (that "useless" script is often their booking widget, tracking, or chat).
- Thin or duplicate page → improve it, canonical it, consolidate it with a 301. **Don't delete it** - a deleted URL loses its links and its rankings permanently.
- Orphan page → link to it.
- Missing alt text → write alt text.

**When removal genuinely IS the right answer**, it goes in the report as a RECOMMENDATION and waits for an explicit yes from me:
> "Recommend removing: [what it is] · [why] · [what it costs to keep] · [what happens if we remove it, including any redirect needed]"

One line each, grouped at the end of the report under **"Needs your approval to remove."** Then stop and wait. Never bundle a deletion into a batch of fixes and mention it afterwards.

**This applies to redirects and consolidations too.** Merging two pages deletes one of them - that needs the same approval, plus the 301 mapped out before anything moves.

If something is genuinely broken and non-recoverable (a dead embed pointing at a deleted YouTube video, an image file that 404s), fix the reference or flag it - don't quietly strip the element and call it a win.

---

## ⛔ THE SAMPLING RULE - a silent sample is worse than a stated one

**If a layer was sampled rather than run in full, that layer's line in the report says so, in the report, every time.** Not in chat, not implied by a page count somewhere else.

Every layer reports two numbers next to its result: **how many items were graded, and how many were in scope.** "On-page: 82% pass rate (12 of 63 pages graded)" is honest. "On-page: 82% pass rate" reads as all 63 and is not.

**A layer with no number at all reads as covered.** That is the failure this rule exists to stop - a scoreboard that quietly omits a line makes the reader assume it passed. Every required scoreboard line below gets a value or the words "not measured" plus the reason. Never blank, never dropped.

---

**0. Whose site is this?** If the URL isn't mine, say so up front and ask which of the two jobs this is (never guess):

- **Prospect mode** - I'm pitching them. Audit only, fix nothing, and end with a one-page report I could send or walk through on a call - the starting-line summary, the top 5 problems in plain English with what each one is costing them, and what fixing it would take. No jargon, no Semrush screenshots, no fix loop. This is the pitch, not the delivery.
- **Competitor gap mode** (`/audit gap [their-url]`, or just `/audit gap`) - I'm mining them. Same engine, opposite question: not "what's broken on their site" but "what do they have that I don't."

  **No URL given? Find the competitors with Semrush first.** Pull the Organic Competitors report for MY domain - it ranks rivals by real keyword overlap, which beats anyone's guess about who the competition is. Cross it against the Layer 3 selection rules (same service, same customers, same area for local - never aggregators, marketplaces or news sites), show me the top 3-5 with their overlap numbers, and let me confirm or swap before pulling anything expensive. A named URL skips discovery. No Semrush connected? Fall back to the map pack + live SERP method from Layer 3, and say that's what happened.

  Then scan → rank → route, pointed at their domain:
  1. **Keyword gap:** every keyword they rank for that I don't (their organic research vs mine, Search Console first for my side). Filter to commercially relevant, then to REALISTIC - anything above the difficulty ceiling my referring-domain count supports (Layer 4 logic) goes in a "later" bucket, not the list.
  2. **Page gap:** pages and page TYPES they have that I don't - services, cities, comparison pages, calculators. Each one is a candidate keyword-map row.
  3. **Backlink gap:** domains linking to them and not to me - the outreach list.
  4. **Proof gap:** their review count, case studies, and the proof elements their money pages carry that mine don't.
  Then ROUTE, ranked by impact: new map rows → `/keyword-research expand` · missing money pages → `/service-page` · missing content → `/blog-post` · outreach list → handed over. The deliverable is a ranked gap list where every line ends in a command, appended to `audit-report.md`. Fix loop never runs - there is nothing of mine to fix.

The two modes compose: run gap mode on a prospect's top competitor and the output IS the pitch ammunition - "here's what [rival] has that you don't" closes harder than "your alt text is missing." Same command, two runs.

Prospect mode has no Search Console access and usually no Business Profile access. Say which layers that blanks out rather than inferring around it silently - and note that the live AI-surface test (Layer 7) and the map-pack and review checks (Layer 11) both work fine without any credential, which makes them the strongest things to put in front of a prospect.

**0b. Ask for the Search Console exports (Layer 1) before anything else.** They take two minutes and they change what every other layer can prove. Do not begin grading until they have landed or I have explicitly said to run without them.

**1. Get the page list. Ask for the sitemap first.** Say: *"Paste your sitemap URL (usually yoursite.com/sitemap.xml) - or paste the list of your page URLs. If you don't have one, say so and I'll find them."* In order:
- Sitemap pasted → use it, that's the inventory
- Nothing pasted → fetch `sitemap.xml` myself
- Missing, broken, or clearly incomplete → crawl from the homepage following every internal link to discover the real inventory, then **CREATE the sitemap on the spot** (static lane: populate `app/sitemap.ts` from the discovered tree; WordPress: enable/fix it via the SEO plugin through Novamira). A missing sitemap is itself a critical finding - fix it first and note it in the report.

Show me the page count and the list before grading anything, so I can confirm it looks right.

**1b. Then ask me the scope. Never assume the whole site.** A full thirteen-layer grade on 200 pages takes a long time and buries the four findings that matter. Show the page count, then ask:

> **"Audit all N pages, or a slice?"**
> - Everything
> - Money pages only (homepage + services)
> - One page per template (fastest useful read - fixes cascade to every page built from it)
> - Specific URLs you paste

Recommend based on the count: under about 15 pages, say "everything" is fine and quick. Over about 50, recommend the one-page-per-template option first, because a template fix lands on every page built from that template and grading 200 near-identical pages tells you the same thing 200 times. Record the answer and say the scope back at the top of the report - a report that doesn't say what it covered reads as a report that covered everything.

**The site-level layers ALWAYS run full-site, whatever scope I pick.** Search Console (Layer 1), Semrush (Layer 2), the competitor benchmark (Layer 3), backlinks (Layer 4), index hygiene (Layer 8), framework traps (Layer 9), local and Business Profile (Layer 11), and the structure read are properties of the SITE or the business, not of a page. Scoping those to four pages produces a confident wrong verdict - "your sitemap is fine" when it is missing 180 URLs. Only the per-page layers narrow to the chosen scope: on-page (Layer 5), technical (Layer 6), the per-page half of GEO (Layer 7), hidden content (Layer 10), thin and doorway (Layer 13), plus the proof count. Say this distinction plainly when I pick a slice, so I know what the report does and does not prove.

Re-running later with a wider scope appends to `audit-report.md` rather than replacing it, same as any other re-run.

**2. Zero-credential first run.** No Semrush connected? Don't block - score what's scoreable RIGHT NOW: Lighthouse on the homepage + key pages, on-page spot checks against `references/on-page-seo.md`, the AI-access checks from `references/geo.md`, the live AI-surface test, the map pack and review comparison, robots/sitemap/HTTPS. Deliver that report card first (I see my site scored in minute five), THEN say what Semrush unlocks (the full crawl, Site Health, keyword data, and the entire backlink layer) and walk me through connecting it - free account (1 project, 100 pages/month) or the 14-day trial (https://www.semrush.com/partner/jonocatliffseo_7401436/?irclickid=UodwPVRilxyZWxsygXUph16GUkr03ZTt3xLWws0&irgwc=1&afsrc=1) for the full toolkit. The win comes before the credential.

---

## The thirteen layers - grade every page

### Layer 1 - Search Console: what Google actually thinks

**This is a REQUIREMENT of the report, not an optional extra.** Every other layer in this audit is a model of what Google might be doing. This is a readout of what Google is actually doing: real impressions, real average positions, the real indexed count, real field performance data, and whether there is a manual penalty sitting on the domain. Auditing without it is guessing in a place where you could have known.

**It costs the owner about two minutes.** Every Search Console report has an Export button in the top right. Ask for all four before grading anything, with the click path spelled out:

- **Performance.** search.google.com/search-console → pick the property → Performance → Search results → set the date range to Last 3 months → tick Total impressions and Average position so they're in the export → Export → Download CSV. Gives queries, pages, clicks, impressions, CTR and average position.
- **Pages (Indexing).** Indexing → Pages → Export. Gives every URL Google knows about, split into indexed and not indexed, with the reason on each not-indexed URL.
- **Core Web Vitals.** Experience → Core Web Vitals → open Mobile, then Desktop. Record the LCP, INP and CLS numbers and how many URL groups sit in Poor and Needs improvement. **This is field data from real visitors** and it outranks any Lighthouse number in Layer 6.
- **Manual actions.** Security and Manual actions → Manual actions. Screenshot the verdict. "No issues detected" is a finding worth stating, and anything else outranks every other item in the report.

**What each export settles that nothing else can:**
- Which queries the site genuinely appears for, and at what position - not an estimate
- Which pages Google has chosen not to index, and its stated reason for each
- Whether impressions are rising (Google is testing the site) while clicks are flat (the titles and metas are the bottleneck, not the rankings)
- Whether real-user performance matches the lab score

**If there is no Search Console property at all**, that is a critical finding on its own and goes near the top of the report. Route it to `/gsc`, which walks the manual setup.

**⛔ GSC EXPORTS ARE OPTIONAL. NEVER GATE THE AUDIT ON THEM. Score everything that can be scored with no credentials first - that self-serve win in the first five minutes is the point of this command. Then ask for exports to unlock the layers that genuinely need query data (cannibalization, indexation status, striking distance), and if they are not supplied, run without them and say exactly which checks were skipped and why. A member must never hit a credentials wall before seeing a score.**

Do not start grading and collect Search Console later. Open the run by asking for the four exports, wait, and only then begin. Every other layer is better once they land: the keyword reality check reads real positions instead of Semrush estimates, index hygiene compares against Google's own indexed count, and the technical layer gets field data instead of one lab run.

**If they are not supplied, the audit is PAUSED, not downgraded.** Say plainly: *"I can run this without Search Console, but roughly a third of it becomes inference rather than measurement - real positions, what is actually indexed, and field performance all come from there. It is four Export buttons and about two minutes. Want to grab them, or shall I run the inferred version and flag it?"* Then wait for an actual answer.

Running the inferred version is a legitimate choice they can make. Quietly running it because nobody asked is not.

**If they choose to proceed without:** the report opens with a boxed line listing exactly which findings are inference, every affected layer line carries the word "inferred", and the "What this audit did NOT measure" section leads with it. Never let an inferred position or indexed count sit in a report looking like a measurement.

Cross-check the Performance export against Layer 12's ranking data and the Pages export against Layer 8's live index check. Where the two disagree, Search Console wins and the disagreement itself is worth reporting.

### Layer 2 - Semrush

Fetch the Site Audit for the domain. **The connector cannot create projects - it only reads ones that already exist.** If `projects` shows no project for this domain, STOP at this layer and ask - never defer it to a scoreboard footnote: "No Site Audit project exists yet. Setting one up is two minutes in your dashboard and the crawl uses quota (free tier: 100 pages/month). Want to do it now?" On yes, walk it click by click: semrush.com/projects → Create project → enter the domain → open Site Audit → set the page limit → Start Audit → re-check `projects` here. On no, the layer reads "not measured - no Site Audit project; two minutes in the dashboard to close." **The click is always the OWNER'S, in their dashboard - never imply the connector can create the project, and never pretend a crawl ran when no project exists.** Then grab every error, warning and notice, per page. Pull organic research too: every keyword the site ranks for, mapped to its page - that feeds the cannibalization check and Layer 12. Raw material, never the deliverable.

### Layer 3 - The competitor benchmark

**"You rank for 7 keywords" is meaningless without "the three agencies you compete with rank for 400."** A number with no comparison cannot tell anyone whether the site is behind or ahead, and an audit that cannot answer that question has not audited anything.

**Name the three competitors first, and say how they were picked.** In order: the competitors already recorded in `context/business.md`, the businesses holding the map pack for the money term, or the top three organic results for the primary money keyword. Say which method was used - a benchmark against the wrong three is worse than none.

Pull the same six numbers for the site and for each competitor:
- Organic keywords ranked for
- Estimated monthly organic traffic
- Referring domains
- Indexed pages
- Google review count
- Average review rating

**These are required scoreboard lines.** The rule for the whole report: never state a raw site number without the competitor number beside it. "63 pages indexed" tells the owner nothing. "63 indexed, competitors at 210, 340 and 89" tells them where they are.

Where Semrush is not connected, the keyword, traffic and referring-domain columns cannot be filled - say so on the line rather than leaving it blank. Indexed pages, review count and rating are all obtainable with no credential at all, so those three always have values.

### Layer 4 - Backlinks and authority

**Link count is the single biggest input to every difficulty score in the industry - roughly 58% of the weight in Semrush's KD formula.** That makes this layer the thing that decides what the site can realistically target. A site with 4 referring domains chasing a KD-60 keyword is not going to get there no matter how clean the on-page grade is, and an audit that never looked at links cannot say that out loud.

Grade, for the domain:
- **Referring domains** - the count, and how many are genuinely distinct businesses rather than one network
- **Domain authority score** - Semrush Authority Score, stated as the tool's estimate, not as a Google metric
- **Anchor text profile** - the split between branded, naked URL, generic ("click here"), and exact-match commercial anchors. Heavy exact-match commercial anchoring is a risk signal, not a win
- **Toxic or spammy links** - directory farms, foreign-language link pages, comment spam, paid-link footprints. Report the count and the worst offenders by name
- **Lost links** - referring domains dropped in the last 6 to 12 months, and whether anything ranking dropped with them
- **The gap versus the three competitors from Layer 3** - referring domains each, and the specific domains linking to two or more competitors and not to this site. That list is the outreach target list, and it is the most actionable thing this layer produces

Then say the consequence plainly: given this referring-domain count, name the difficulty ceiling the site can realistically target today, and route the keyword implications to Layer 12.

**Semrush covers this layer when connected** (backlinks research plus domain overview). **When it is not connected, say what cannot be assessed rather than skipping silently** - there is no free way to see referring domains, anchor text, toxicity or lost links, so the line reads "not measured - needs Semrush" and the report's "What this audit did NOT measure" section carries it. Never let a missing backlink layer read as a clean backlink layer.

### Layer 5 - On-page

**Grade EVERY indexable page in scope against all 80 checks in `references/on-page-seo.md`.** Titles and metas use `references/meta-info.md` - 2-3 variants, pick the strongest.

**The on-page pass rate is a REQUIRED scoreboard line** and it carries two counts with it: pages actually graded, and pages in scope. "On-page: 78% pass rate, 63 of 63 pages graded" is the target shape. If time or budget forced a sample, the line says "12 of 63 pages graded (sampled)" and the sampling rule above applies - a missing pass rate reads as "covered" when it was not.

Report the failing checks grouped and counted across the site, not page by page, so the owner sees "41 pages missing an H1" rather than 41 separate rows saying the same thing.

### Layer 6 - Technical performance

Lighthouse: Performance, Accessibility, Best Practices, SEO - target 100 on all four.

- Test the REAL thing: production build, never dev mode (dev scores are meaningless). Static lane: `npm run build`, then serve the build locally - `npx next start -p 4321` on this template's default server build, or `npx serve out` if a member has added `output: "export"` back - and run `npx lighthouse` against it, or against the live deployed URL. WordPress: against the live site.
- **Test more than the homepage.** One page per template is the minimum: home, one service page, one blog post, one city page. Template fixes cascade to every page built from them, and a homepage-only score says nothing about the 40 city pages.

**Lighthouse is lab data, and the report must say so on the line.** It is one throttled run, on one machine, at one moment, on a simulated connection. Two runs on the same page routinely differ by 10 points.

Required on every performance figure reported:
- The words "lab data"
- Which pages were tested, by URL
- Which form factor (mobile or desktop) - they are different tests with different numbers, and mobile is the one Google ranks on
- How many runs, if more than one was taken

**Prefer field data when it exists.** The Core Web Vitals export from Layer 1 (and CrUX where available) reflects what actual visitors experienced over 28 days. When field data and lab data disagree, the field data is the truth and the lab number is the diagnostic that explains it. **Never present a single lab number as the site's performance.**

### Layer 7 - AI overviews and AI surfaces (GEO)

Two halves: the paper grade, then the live test. Both are required - 38 checks graded on paper without once asking an AI proves nothing about whether the AIs actually cite this business.

**The paper grade.** Grade against all 38 checks in `references/geo.md`. Site level first: robots.txt allows GPTBot, OAI-SearchBot, ClaudeBot and PerplexityBot; no CDN bot-blocking; llms.txt present; content renders without JS. Then per page: answer-first blocks, first-30% placement, tables, quoted stats with sources, schema, entities, original data. Report a pass rate per page plus the site-level verdict, with the graded-versus-in-scope counts per the sampling rule.

**The live test - and this is the single most demo-able moment in the whole audit.** Ask the actual AI surfaces the actual questions and record who gets named. Nothing else in this report lands with an owner the way watching a competitor get cited by name does.

Run against ChatGPT, Perplexity and Google AI Mode, the same prompts on each:
- The business's top 3-5 money questions, in the words a buyer would use
- "who is [business name]"
- "best [service] in [city]"

For every prompt on every surface, record:
- Which businesses were cited, by name and in order
- Whether this site was cited at all
- Which specific page or source was linked, when one was
- Whether the answer about this business was accurate, when it appeared

**Log the whole thing as the GEO baseline and re-run it monthly.** A single run is a snapshot; the month-over-month movement is the proof that the GEO work did anything. Put the baseline table in `audit-report.md` with its date so the next run has something to compare against.

### Layer 8 - Index hygiene and the live index check

Two directions, both missed by every standard audit tool, plus a live verification that takes thirty seconds and settles what the other two only infer.

**Verify the index live. Do not infer it.** Run `site:domain.com` as a real search and record the approximate result count. Then run `site:domain.com/path` per URL on anything suspected of being wrongly indexed or wrongly missing. This is the difference between "I think that staging route is indexed" and "it is, here it is, it has a snippet."

Cross-check three numbers against each other and report any disagreement, because the disagreement is itself the finding:
- The `site:` result count
- The indexed count from the Layer 1 Search Console Pages export
- The URL count in the sitemap

*Publicly crawlable but shouldn't be.* Crawl for routes that were never meant for the public - A/B variants of live pages (`/b`, `/v2`, `/home-new`), design previews, staging routes, per-customer dashboards, admin, test pages, anything with `demo`/`preview`/`temp` in the path. An A/B variant of the homepage is word-for-word duplicate content competing with the real one. Confirm each one with a `site:` check before reporting it.

**The trap that catches everyone: `Disallow` in robots.txt is NOT `noindex`.** Disallow only asks Google not to crawl - if anything links in, the URL can still be indexed (usually with no snippet, which looks worse). Only a `noindex` tag actually keeps a page out. Also check for the off-by-one: `Disallow: /audit/` does not cover `/audit`. Report each of these with the fix (noindex, or delete the route - and deletion needs approval per the deletion rule).

*Should be findable but isn't.* Money pages with no internal links pointing at them, real service pages sitting at a URL that says something else (an `/about` route that's actually a $10K service page), pages missing from the sitemap, and anything the Search Console export lists as "Discovered - currently not indexed" or "Crawled - currently not indexed" months after publication.

### Layer 9 - Framework traps

Whole categories of failure that look like content problems and are actually build-config problems. Diagnose the CAUSE, never just report the symptom - "every page has the same title" is useless; "your pages are `'use client'` and client components can't export metadata, so everything inherited the root layout" is fixable.

Next.js App Router, check every one:
- **`'use client'` on a page = no `metadata` export.** The page silently inherits the root layout's title and description. Symptom: every URL shares one title. Fix: move metadata to a `layout.tsx` for that route.
- **Root-layout `canonical` is inherited by every route that doesn't set its own.** If the root sets `canonical: '/'`, every page canonicalises to the homepage and Google drops them. This is silent, total, and latent for every future page.
- **`robots.ts` / `sitemap.ts` missing** while robots.txt still advertises `/sitemap.xml` - a 404 sitemap Google has been fetching since launch.
- **Fonts loaded sitewide in the root layout but used on two routes** - render-blocking cost paid on every page for nothing.

WordPress equivalents: the SEO plugin overridden by the theme or builder, canonical set in two places, a caching plugin serving a stale head. Per `references/wordpress-audit.md`, always verify at the RENDERED front-end HTML.

### Layer 10 - Content the crawler can't see

Anything rendered one-at-a-time is one-at-a-time in the HTML. **Accordions and tabs are the big one:** six FAQ answers inside an accordion often means crawlers see one of six - which guts both FAQ schema and AI overview citations. Also check content injected after load, text inside images, and anything behind an interaction. Fix: render all of it in the HTML and hide with CSS, never conditionally mount it.

### Layer 11 - Local SEO and the Google Business Profile

**For a local service business this is the biggest thing a standard audit misses.** The map pack sits above the organic results, it is where local buyers actually click, and none of the twelve other layers looks at it. A site can pass every technical check in this file and still be invisible to everyone within ten miles of it.

**Read `gbp-{business-slug}.md` first if it exists in the project** - it holds the categories, services, service area and attributes already decided, and grading against it beats grading against a guess. If it does not exist, note that and route to `/gbp`.

Grade all of these:
- **Is there a Google Business Profile at all**, and is it **verified**. An unverified or nonexistent profile outranks everything else in this layer
- **Primary category** - what it is, and whether it matches what the business actually sells and what the top map-pack competitors use as theirs. The primary category is the single highest-leverage field on the profile
- **NAP consistency** - name, address and phone across the website, the profile, and the major citations. **The rule is byte-identical**, not "close enough": "Suite 4" and "Ste. 4" are two different businesses to an aggregator, and so are "(604) 555-0100" and "604-555-0100". Report every variant found and where it lives
- **Map pack presence for the money terms** - search each money keyword with the city and record whether the business appears in the three-pack, and who does appear. Do this live
- **Reviews versus the three competitors from Layer 3** - review count and average rating for each, side by side. **Reviews are the number one local ranking factor**, which makes this comparison the most load-bearing number in the layer
- **Review recency** - how many in the last 90 days, for the site and for each competitor. A 200-review profile with nothing in a year loses to a 60-review profile getting four a month
- **Review response rate** - what share of reviews have an owner reply, and how fast
- **Citation coverage** - which of the Tier 1 and Tier 2 directories in `references/citations.md` have a listing, which are missing, and which carry a stale NAP variant

**Routing:** profile setup, categories, services, attributes and the citation campaign go to `/gbp`. Review count, recency and response rate go to `/review-generator`. Neither is fixed inside this command's loop.

**Skip this layer only for a genuinely non-local business** - pure SaaS, ecommerce with no physical presence, a national publisher. When skipping, **say it out loud in the report**: "Local and Business Profile: skipped, this is a [type] with no local service area." A silently absent local layer on a plumber's site is the single most expensive omission this audit can make.

### Layer 12 - The keyword reality check (usually the actual problem)

Pull what the site ACTUALLY ranks for - from the Layer 1 Search Console Performance export first, Semrush second - and compare it against what the business sells:
- How many ranking keywords are commercial, versus brand terms and accidental junk?
- Is there a single keyword that a buyer would search? A site ranking #1 for its own brand name and nothing else is invisible to everyone who doesn't already know it exists.
- Which services have no page at all?
- Given the referring-domain count from Layer 4, which of the target keywords are realistically reachable this year and which are not? A keyword map that ignores the link gap is a wish list.

**Say this plainly when it's true: the technical layer is table stakes, and the missing keyword map is the real bottleneck.** A perfect Lighthouse score on three pages targeting nothing still earns nothing. Route it to `/keyword-research` and rank it ABOVE the technical findings when it's the binding constraint - never let a tidy list of technical fixes bury the fact that there's nothing to rank.

### Layer 13 - Thin content and doorway pages

The two failures that pass every technical audit with a perfect score and still keep a site invisible. Nothing else in this audit catches either one.

*Thin pages.* For every page in scope, compare its real body word count (navigation, footer and boilerplate excluded - count what the page actually says) against the top-3 average for its target keyword, the same benchmark `references/on-page-seo.md` uses at write time so the two never disagree. Flag anything materially under it. Cross-reference two things before calling it: the proof count (a 400-word page with 6 real proof touches beats a padded 1,200-word one) and whether the page answers its query at all. Report as: the page, its word count, the top-3 average, its proof count, and the one sentence on what it is missing.

**Never fix a thin page by padding it.** Adding words to hit a number is the exact thing Google's helpful content guidance targets. The fix is real information gain - a job actually done, a real number, an answer the top 3 do not give - and that is writing, so it routes out of this command.

*Doorway pages - the local SEO killer.* Compare every set of sibling pages that share a template, above all the city pages under a single service (`/services/drain-cleaning/burlington` against `/services/drain-cleaning/oakville`). Measure how much of the body text is identical between them.

- **Above ~80% identical: doorway pages.** Google's own doorway-page guidance targets exactly this, and it can suppress the whole set, not just the duplicates.
- **70-80%: at risk.** Report it before it becomes the first case.
- **Below ~70% with genuine local specifics: fine.** Say so rather than flagging healthy pages.

For every flagged set, **name the only sentences that are actually unique.** That single line does more than any percentage - when a member sees the unique content is the city name in the H1 and nothing else, the problem explains itself.

Run the same comparison on service pages that share a template and on any near-duplicate blog posts. Also flag the reverse: a city named in a title with zero mention of it in the body, which is a doorway page that has not even tried.

**The routing rule for this whole layer.** Thin and doorway findings **never enter this command's fix loop.** Both are fixed by writing real content, and THE COPY RULE says this command does not write. They go in the report ranked by impact and route to `/service-page` (city and service pages) or `/blog-post`, where the voice and proof files load and the owner approves the draft. Deleting or consolidating a doorway page needs approval under THE DELETION RULE like anything else - and it is usually the wrong answer, because the page has a URL worth keeping and a content problem worth fixing.

**Rank this layer high when it fires.** A site with 40 cloned city pages does not have a technical problem, and burying that under a list of alt-text fixes is how a member spends a month on the wrong thing. When doorway pages are present, they go at the top of the report next to the keyword-map finding from Layer 12.

### Plus three site-level reads, graded once

- **Cannibalization** - what each page ACTUALLY ranks for (Search Console first, Semrush second) versus what `keyword-map.md` says it should own. Overlapping pages flagged with the winner named.
- **Proof count** - COUNT the proof touches per page: every real number, review quote, credential, guarantee, named client and original photo (each must trace to `context/proof/proof-inventory.md` - unverifiable claims count against, not for). **Target: 5+ per page.**
- **Structure** - grade the tree against `references/pyramid-structure.md`: 3 tiers max (any URL 4+ folders deep = flagged), the tier-1 set present (/services/, /blog/, /about, /contact, /quote), blog posts flat under /blog/, city pages only at tier 3, hubs for every spoke, sitemap mirrors the tree, orphans, E-E-A-T pages.

---

## ⛔ 3. THE REPORT - and a full stop. Nothing gets changed before I approve it.

**The audit finishes completely and reports BEFORE a single file is touched.** No "I'll fix the easy ones while I'm here." No fixing as you go. Grade everything, show me everything, then stop and wait for my yes.

The report, in plain English and never in Semrush jargon:

**The scoreboard as it stands today.** Every one of these lines is required, with a value or the words "not measured" plus the reason. Never blank, never dropped:
- Semrush Site Health
- Lighthouse per template, labelled lab data, with the pages and form factor named
- Core Web Vitals field data from Search Console, mobile and desktop
- On-page pass rate, with pages graded versus pages in scope
- GEO pass rate, with pages graded versus pages in scope
- Search Console: indexed versus not indexed, top queries, average position, manual actions verdict
- Referring domains and authority score
- The competitor benchmark: the site's keyword count, referring domains, indexed pages, review count and estimated traffic, each with the three competitors' numbers beside it
- Local: map pack presence for the money terms, review count and rating versus competitors
- Cannibalization: how many keyword-overlapping page sets, with the worst offender named (from the site-level read - "0 sets" is the good answer, stated)

Then:
- **What's wrong, grouped and counted** - "23 pages Google can't reach", "41 images missing alt text", "8 broken internal links", "12 pages have no answer-first block for AI overviews"
- **What each one is costing me** in ranking terms, one line each - so I can tell a real problem from a tidy-up
- **The proposed fix list, in the order you'd do it** (errors → warnings → notices), with anything that would touch a body sentence called out individually with before/after
- **Needs your approval to remove** - anything you'd recommend deleting, consolidating or redirecting, with the reason and the cost of keeping it
- **What this audit did NOT measure** - the section below, always present
- **Anything you can't fix from here** - the proposed WAIVED list, with a one-line reason each

### What this audit did NOT measure - always present, never omitted

**This section appears in every report, including the ones where nothing was skipped.** In that case it says "Everything in scope was measured in full" and lists nothing. A section that only appears when there is bad news is a section that gets quietly dropped, and quietly dropped is exactly how the gaps got there.

One line per item, with the reason:
- **Skipped** - the layer did not run at all. "Backlinks and authority: not measured, Semrush not connected."
- **Sampled** - the layer ran on part of the scope. "On-page: 12 of 63 pages graded, sampled for time."
- **Inferred** - the finding is a deduction, not a measurement. "Indexed count: inferred from the sitemap and a site: search, Search Console export not supplied."

Then the one line that makes it useful: **what it would take to close each one.** "Connect Semrush (free tier covers this)" or "Export the four Search Console reports, about two minutes."

Then ask plainly: **"Want me to fix all of this, some of it, or shall we talk through it first?"** and WAIT.

I might only want the errors. I might want to see the meta rewrites before they go in. I might know that "orphan" page is deliberately unlinked. None of that can happen if the fixing already ran.

**Prospect mode ends here** - report only, and never proceed past this gate.

**4. Fix what I approved.** Only what I said yes to, in the order agreed. Work the full list, biggest category first, through my site's lane:
- Static/Next.js: edit the code, redeploy
- WordPress: apply fixes through Novamira per `references/wordpress-audit.md` - the #1 rule from that file: verify every fix at the RENDERED front-end HTML (the head may come from the theme, a builder, or a plugin - fix where it actually renders, and keep the stack profile updated)
- **THE COPY RULE and THE DELETION RULE hold throughout** (see the top of this file): fix the mechanical issue, never touch the writing, never remove anything. Body sentences altered should be zero; things deleted should be zero
- Anything genuinely unfixable from here (server config only the host controls, a flag on an external domain) goes on a short WAIVED list with a one-line reason each - waived means consciously skipped, not forgotten

**5. Re-run and loop.** Re-audit only what was in scope. Trigger a fresh Semrush crawl, re-run Lighthouse against a fresh production build, re-run the live index check, re-grade on-page and GEO. Fix whatever remains. **Keep looping** until:
- Semrush Site Health = 100%
- Lighthouse = 100 on all four, per template, stated as lab data (WordPress lane: if a plugin or theme hard-blocks the last points, 90+ with the blockers named and waived)
- Every page passes every on-page check
- GEO site-level checks all pass
- No manual action in Search Console, and no unexplained gap between the sitemap count, the `site:` count and the Search Console indexed count

Or those numbers minus explicitly waived items only.

Search Console and field Core Web Vitals lag by days to weeks, so they do not gate the loop - record the date they were pulled and re-check on the next run rather than waiting on them.

Sites over ~50 pages: loop template-level + worst offenders first, then batch the long tail. Say exactly what's done and what's queued.

---

**Five honesty rules for the report:**

**1. Separate real fixes from sweeping cosmetic ones.** If a single change touched 41 files (a colour token, a class rename), say so explicitly and say it's cosmetic - otherwise the changed-file count looks alarming and hides the four changes that actually matter. Give the count, the reason, and the one-line description.

**2. Brand and design decisions are the owner's, never yours.** Contrast failures on a brand colour, a CTA background, a logo, or a deliberate design choice (cropped testimonial squares, intentional type scale) get REPORTED with the numbers and the passing alternative - and stop there. Example: *"your CTA is #faf9f5 on #c96442 = 3.7:1, fails WCAG. #b45230 would pass at 4.76:1 - but it's your primary brand button and a conversion surface, so it's your call."* Never change a brand colour or a conversion surface as part of a fix pass.

**3. Say what you deliberately did NOT fix, and why.** A short list: the item, and the one-line reason (owner's decision · intentional design · needs its own session · only reproduces locally). An audit that silently skips things reads as an audit that missed them.

**4. Say what you did NOT measure, and why.** The section above. Skipped, sampled and inferred are three different things and each gets its own word.

**5. Give me the undo.** Every fix pass ends with the exact command to throw all of it away - the `git checkout` plus any files to remove. One line, copy-pasteable. Nobody approves changes they can't reverse.

**The deliverable - one legible report:**
- **The scoreboard:** before → after for every required line above, with the competitor numbers held constant beside them. Plus the one-line brag ("46 → 100 in one run").
- **The page list** - every page, one row, plain English: on-page pass, Lighthouse template, GEO pass, cannibalization flag, proof count (target 5+), thin flag.
- **The AI-surface baseline** - each prompt, each surface, who got cited, whether this site did. Dated, so next month's run has something to compare against.
- **The backlink gap list** - the domains linking to two or more competitors and not to this site. This is the outreach list, so it goes in the report as a list, not as a count.
- **Doorway sets** - each flagged sibling group, its similarity percentage, and the sentences that are genuinely unique. Empty is the good answer, and say so plainly when it is empty.
- **The waived list** - what was consciously skipped in the fix pass and why.
- **What this audit did NOT measure** - skipped, sampled, inferred, and what closes each.
- **The copy report** - how many body sentences were altered, and the before/after for each one. Zero is the expected answer.
- **Needs your approval to remove** - anything I think should be deleted, consolidated or redirected, one line each with the reason and the cost of keeping it. Nothing on this list has been touched.
- **What remains** - the strategy findings ranked by ranking impact, each tagged with its machine, ending with "your next 3 moves, in order."

Fixes this command does NOT make itself, because they're content work, outreach, or someone else's dashboard - route them:
- Thin proof (under 5 touches) → `/context-layer` if the inventory itself is thin, then `/seo-optimization proof`
- **Thin pages (Layer 13)** → `/service-page` or `/blog-post` to add real information gain. Never padded to a word count
- **Doorway / cloned city pages (Layer 13)** → `/service-page` per city, with the anti-clone rule: local jobs from proof, neighbourhoods, city-specific FAQ answers. If there is genuinely no local material for a city, say so - a marked placeholder is honest, invented local detail is what gets a site filtered
- **Business Profile findings (Layer 11)** → `/gbp` for the profile, categories, services and citations; `/gbp-posts` for the posting cadence
- **Review count, recency and response rate (Layer 11)** → `/review-generator`
- **No Search Console property, or a property nobody has looked at (Layer 1)** → `/gsc`
- **Backlink gaps and outreach targets (Layer 4)** → out of scope for this repo's commands; hand the gap list to the owner as the outreach list
- Pages that read like AI filler → `/context-layer`, then rewrite via `/blog-post` or `/service-page`
- Missing pages / cluster gaps → `/blog-post`, `/service-page`
- Structure and merge/redirect plans → `/build-website`, then `/internal-linking`
- Deeper per-page GEO work → `/seo-optimization ai-layer`

---

## The deliverable: `audit-report.md` - a checklist we work through together

**The audit ends in a file, not in chat.** After the report gate above, write every approved finding to `audit-report.md` as a checklist item, then work down it one at a time. A wall of findings in chat gets read once and lost; a file survives the session, and you can stop halfway and come back tomorrow.

**The file is the checklist and nothing else. No intro, no methodology, no summary at the bottom, no "next steps" section - the next step is the top unticked box.** One line at the top with the site and date. That is all the header you get.

The two exceptions, both because they are data the next run compares against, not commentary: the **AI-surface baseline** and the **"What this audit did NOT measure"** list. Both go at the bottom, both dated, both as short as they can be.

```markdown
# Audit: automatable.co · 13 Aug 2026 · 63 pages

### [ ] 1. Create your sitemap · 23 pages Google can't reach

robots.txt has pointed Google at /sitemap.xml since launch. It returns
"not found", so Google has been guessing at your pages.

**Who:** me, in your code
**Time:** 10 min
**Changes:** adds app/sitemap.ts. No existing file edited. No content touched.

### [ ] 2. Give each page its own title · 60 pages share one

Your pages are marked 'use client', which can't set a title, so they
all inherited the site-wide one.

**Who:** me, in your code
**Time:** 30 min
**Changes:** adds a layout file per route. No body copy touched.

### [ ] 3. Export your four Search Console reports · 2 min, and it's yours only

Performance, Pages, Core Web Vitals, Manual actions. Until these land,
your indexed count and positions in this report are estimates.

**Who:** you, in Search Console
**Time:** 2 min
**Changes:** none to the site.

### [x] 4. Fix the canonical tag · was hiding /demo from Google
Done 13 Aug. Root layout was pointing every page at the homepage.
```

**Write it that tight.** Two or three lines of explanation per item, maximum. If an item needs more, it is two items. No paragraph explaining what an audit is, no glossary, no closing summary.

**Then work it.** Top unticked item, do it, tick it, next. **Each gets its own yes** - anything touching body copy or removing something must have said so in its "Changes" line, and ticking the box is the approval. When done: tick, date, one line on what changed.

**"Who" is on every item.** Some are code changes I make; some are clicks only you can do (Search Console, the Business Profile dashboard, hosting). For yours, give the exact click path.

**Re-running `/audit`** updates this file, never replaces it. Ticked items keep their dates, returning problems re-open with a note, new findings append, and the AI-surface baseline gains a new dated row rather than overwriting the old one. Never wipe the history.
