---
description: GBP posts - a month generated to spec (or a single post), queued, and dripped to the Make.com webhook at 2-3/week
argument-hint: [one | offer | event | topic, optional]
---

## STEP 0. The Make.com webhook. Nothing happens before this.

Read CLAUDE.md "## My setup" for `MAKE_WEBHOOK_URL` and `DEFAULT_CTA_URL`. **If either is missing, empty, or still a placeholder (`[YOUR_WEBHOOK_ID]`), your FIRST message is this question and nothing else.** Do not read the spec, do not read context, do not draft a post.

> "Before I write anything: paste your Make.com webhook URL so posts can go live the second they're approved. Don't have one? In Make.com create a scenario, add a 'Webhooks · Custom webhook' trigger, copy the URL. About 30 seconds."

**⛔ Never ask for the GBP account or location.** Those are chosen inside the Make.com "Create Local Post" module from its own dropdowns when the scenario is built. They are not skill config, they are not in the payload, and they are not something the owner can look up in their GBP dashboard. Asking for them is a dead end at step 0.

Save them to "## My setup" so this is never asked twice. Then **fire one real test post** and confirm BOTH signals before generating anything else: the webhook's response status (the Make scenario replies **200 only when the post was actually sent** - a timeout or any other status means it did NOT go through), and the post appearing on the profile. The first run needs both; after that, the 200 response is the per-post confirmation. A webhook nobody has proven is a webhook that fails on the whole month.

**Only if I reply "skip it":** generate the batch paste-ready for manual posting and say plainly that automatic posting is off.

This is the one question asked BEFORE any work happens, and it is mandatory. Later steps do stop for approval - the unsent queue, the angle bank, a missing Pexels key, and the batch itself - but nothing is generated until the webhook question is answered.

## STEP 0.2. ⛔ THE EXISTING QUEUE EATS FIRST. THIS IS YOUR SECOND MESSAGE, BEFORE ANY RESEARCH.

**Read `gbp-posts-queue.md` before anything else.** Not after the voice file, not after the angle bank - immediately after the webhook is confirmed. Generating a fresh month while approved posts sit unsent is the single most wasteful thing this command can do, and it happens because this step is easy to scroll past.

**If the queue holds posts that are approved but never went out** - Pending or Scheduled, no `sent_at`, usually written back when there was no webhook - stop and ask:

> **"You've got 8 approved posts in the queue that never went out - there was no webhook when they were written, and now there is one. Want me to schedule those first? They'd drip Mon/Wed/Fri from [date]. Or I can generate fresh ones and leave these."**

**Check staleness before offering, and say what you find in one line.** A post referencing "next month's deadline" or a feature that has since shipped is not schedulable - flag those individually, offer to refresh just those, and schedule the rest. Never quietly ship a post whose date reference has expired.

**⛔ TITLES ARE 58 CHARACTERS MAX.** Google rejects longer ones and Make only says so after the scenario runs, losing the post. Write to 58 from the start rather than trimming a long headline - the full limit table is in `references/gbp-posts.md`.

**⛔ VALIDATE BEFORE YOU CLAIM ANYTHING IS QUEUED. `python3 code/check_gbp_payload.py gbp-queue` must exit 0.** A payload with `post_type: "UPDATE"`, `cta_type` or `image_url` gets a **200 from Make and publishes nothing** - the Router matches no branch, so the send looks successful and the profile stays empty. That exact payload shipped once. Only three `post_type` values exist: `"Call to action"`, `"Event"`, `"Offer"`. Never report posts as scheduled until the validator passes and the `.yml` files exist on disk.

**On a yes:** write each to `gbp-queue/` as a dated YAML with `send_after` spaced per the caps, and mark them Scheduled in `gbp-posts-queue.md`. Then stop - do not also generate a new month unless I ask.

### ⛔ Then PUSH THE FIRST ONE IMMEDIATELY, as the live proof

A queue nobody has watched work is a queue nobody trusts, and a webhook that has never carried a real post is a webhook that fails on the whole month. So the first post does not wait for the cron:

1. **POST it to the Make.com webhook right now** and read the response. **200 means sent - anything else means it did not go**, and a timeout is not a 200. On a non-200, stop: the webhook is wrong and every scheduled post after it would fail the same way, silently, at 9am on a Monday.
2. **Send me to look at the profile** and confirm the post is actually there. The webhook answering 200 proves Make received it; only the profile proves Google published it. **Wait for me to confirm** - do not proceed on the 200 alone.
3. **Move it to `gbp-queue/sent/` with today's `sent_at`** and mark it Published in `gbp-posts-queue.md`, so it can never send twice.
4. **Then say what happens next in one line:** the rest drip Mon/Wed/Fri via `.github/workflows/gbp-posts.yml`, one per run, and each one moves to `sent/` on a 200.

**⛔ THEN DATE THE SECOND POST FOR THE NEXT CRON DAY, AND LEAVE IT ALONE.** Pushing the first post by hand proves the webhook carries a real post. It proves nothing about whether the Action fires on its own, which is the part that has to work every week for a year without anyone watching.

The GBP cron runs **Mon/Wed/Fri**, so set post 2's `send_after` to the next one of those - not "tomorrow", which may not be a run day. Then say exactly what to look for:

> **"Post 2 goes out Wednesday and I'm not touching it. Check your profile Wednesday afternoon - and the Actions page will show a run with no username next to it. That's the scheduler working unattended."**

**Never block on it.** Say it, schedule it, move on. If it has not fired by that evening, check the run log before assuming the webhook broke - GitHub schedules run late under load, and the script also refuses to send if the weekly cap or the minimum gap would be breached, which looks identical to a failure from the outside but is the caps doing their job.

**This runs once, on the first real batch.** After the webhook has carried a live post, later runs schedule everything and push nothing by hand.

## STEP 0.5. Read the voice file. Then write in it, not near it.

**Read `context/voice.md` Part 1 in full before drafting a single post.** Not skim, not "informed by" - the register section and the devices are the spec, and a batch written first and voiced afterwards always reads flat.

Non-negotiable on every post:

- **Contractions throughout.** It's, don't, can't, you're, doesn't. A post with none reads like a legal notice.
- **One line worth screenshotting.** If it wouldn't make somebody read it out to the person next to them, it isn't the line yet - rewrite it rather than settling.
- **Never joke about being bad at what you sell.** Effort, physical toll, personality, taste are all fair. Competence is not. An agency admitting it forgot its own tracking, on its own profile, next to its own price, costs more than the joke earns.
- **Never write a self-audit.** No section at the bottom listing the good lines, no tagging lines with device names, no telling me it's funny. Show me the posts.
- **No tables.** Bullets and plain lines, per `references/output-format.md`.

Then run the gate before showing me anything:

```
python3 code/check_voice.py gbp-posts-queue.md
```

A failing file gets fixed and re-run. It does not get shown to me with an explanation.

**Repo wiring:**
- Voice: write from `context/voice.md` + `context/business.md`. Proof: every number, review stat, and offer traceable to `context/proof/proof-inventory.md` - never invent a discount or review count.
- Dedupe: read `gbp-posts-queue.md` "Published" before generating - never repeat a recent post. Create the queue file if missing (Pending / Scheduled / Published / Archive).

---

## STEP 1. Find the angles BEFORE you write. Never write from memory.

**⛔ A batch written straight from `context/` will be the same three posts eight times.** That is not a style problem, it is an input problem: the same source produces the same posts. Everything the business already knows about itself is stale by definition - it has not changed since the last batch. Go and get material that did not exist last month.

Run these lanes **in parallel sub-agents**, then write. Do not write a single line until the angle bank exists.

**Lane 1 · News in the space, last 90 days.** WebSearch for what actually changed: platform and algorithm changes, AI features landing in the tools this buyer uses, pricing moves, new regulation, a competitor's public stumble. **Anything older than 90 days is not news, it is background** - check the publication date before using it. One post that reacts to something from this month beats four evergreen ones, because it is the only kind of post nobody else in the map pack can have written in advance.

Two date traps that have shipped in real batches:
- **Every dated claim carries its YEAR in your head before it ships.** "As of 31 July" with no year is how a 2024 event gets dressed as this week's news - a reader who knows the real date reads the whole profile as fake. Old events are allowed as BACKGROUND, phrased as background ("Google killed the chat button back in 2024"), never as the headline.
- **A feature is only "live" where THIS business's customers are.** Check the rollout geography before writing "rolling out now" - a US-only launch is not news in Vancouver, it is a forecast. State the local timing honestly ("live in the US, Canada expected this year"), which usually makes a BETTER hook anyway: real urgency with a real deadline instead of a claim a reader can falsify with one search.

**Lane 2 · The calendar, next 6 weeks.** What is about to happen to this buyer: the season for their trade, the quarter they are planning, the weather, the local event, the deadline. Seasonal beats evergreen because it has a reason to exist NOW - it earns urgency without faking it. Search the actual dates rather than assuming, and check the arithmetic. *(A post dated 12 September opening "Q4 is eight weeks out" shipped in a real batch. Q4 was under three weeks away.)*

**Lane 2b · The GBP candidates queue.** Read the `## GBP candidates` section of `gbp-posts-queue.md` - blog posts `/scale-map` flagged since the last run. **These are suggestions, not entries.** Each one competes with every other angle on merit; a candidate that does not beat the alternatives does not ship, and saying so is the filter working. A blog that DOES win becomes a post pointing at it, because sending profile traffic to a genuinely useful page is better than another offer. Clear the ones you use from the section and leave the rest for next month.

**Lane 3 · The proof file, mined for what has NOT been used.** Read `context/proof/proof-inventory.md` in full and cross it against the "claims used" log in `gbp-posts-queue.md`. **List the proof that has never carried a post.** The best angle is nearly always a real story sitting unused while the same two client results get recycled. If two results are structurally identical (client, we automated it, saved $X), only one of them ships this month.

**Lane 4 · Real customer language, and Reddit is the best of it.** Recent call transcripts, reviews, community questions, sales objections - what did somebody actually say out loud? A post built on a sentence a real customer said outperforms one built on what the business wishes they said.

**Scrape Reddit with the Apify actor `trudax/reddit-scraper-lite`** (posts + comments, search term, no login) - and actually RUN the actor via the Apify API, one call per search term:

```bash
source .env && curl -s -X POST \
  "https://api.apify.com/v2/acts/trudax~reddit-scraper-lite/run-sync-get-dataset-items?token=$APIFY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"searches": ["[service] cost"], "maxItems": 40, "maxPostCount": 20, "maxComments": 10}'
```

⛔ **Google search snippets that quote Reddit are NOT a substitute.** Snippets truncate the thread, hide the comments (where the real objections live), and strip the upvote counts. If `APIFY_TOKEN` is missing from `.env`, stop and ask for it (apify.com, free tier, 30 seconds) - never silently fall back to searching. This lane runs on the scraper or it waits.

Reviews are written in public by people being polite; Reddit is buyers talking to each other with nothing at stake, so the objection appears in full. Search `"[service] cost"`, `"how much did you pay for [service]"`, `"is [service] worth it"`, `"[service] scam"`, and `r/[their city]` plus the service. **A post that answers a question 40 people upvoted is a post with demand already proven.**

**Keep every phrase verbatim, with the date.** The exact wording is the whole value - paraphrasing it into marketing language destroys the reason it was worth collecting. And Reddit is anonymous: it is a **language and fear source, never proof**. Never quote a Reddit number as evidence, and check the date before treating a price thread as current.

**Lane 5 · The local competitors' own GBP posts.** Search the map pack for this service in this city and read what the top 3 are posting. **This lane exists to tell you what NOT to write.** If everyone is posting "Happy Friday from our team", the entire field is open.

**Then build the angle bank.** 15 to 20 candidate angles, each one line, each tagged with its lane and the specific fact behind it. Show me the bank before the posts if I asked for the full month - it is a 30-second read and it is the cheapest place to redirect the batch.

**Pick 8 that are maximally DIFFERENT, not the 8 best.** Two brilliant angles from the same lane, resting on the same claim, are one post. Spread across lanes deliberately.

---

## STEP 2. The diversity gate. Run it before you show me anything.

Eight posts that pass individually can still be one post written eight times. Check the batch as a batch:

- **No claim carries two posts.** One appearance per claim per month, logged in "the claims used this month".
- **No two posts share a shape.** Assign each a different one and name it in your head: story · contrarian claim · a number that surprises · the question a customer actually asked · a confession about our own business · a teardown of standard industry practice · a short numbered list · a comparison · a reaction to this month's news. If two posts open the same way, one gets rewritten.
- **At least 3 lanes represented**, and at least one post that could only have been written this month.
- **Read the eight headlines in a row.** If they sound like one voice at one volume, that is the failure. Fix it before I see it.

**⛔ THE LOCAL REFERENCE IS A REAL DETAIL, NOT A KEYWORD.** Every post needs one, and it has to be something true about the place: a street, a neighbourhood, the weather, a local event, a landmark, the actual office. **Never a phrase bolted onto a generic sentence.** "The audit costs nothing, Vancouver or anywhere else" and "here in Vancouver and everywhere else" are keyword stuffing wearing a sentence, and a reader clocks it instantly. One local reference per post, maximum, and it earns its place or it comes out.

**⛔ Never argue against local on a local surface.** "Same build whether you are in Vancouver or three time zones away" is a fine line on a website and a self-inflicted wound on a Google Business Profile, whose entire job is proximity. If the proof is from another city, use it - just do not point out that geography is irrelevant on the one surface where it is the ranking factor.

---

**⛔ VOICE: read `context/voice.md` BEFORE the first sentence.** The dial table in Part 1 sets GBP posts at **one good line each** - not zero. A batch with no joke in it has failed the spec, not played it safe. Part 1 is the house style and it outranks anything in Part 2 that reads as more cautious; where they conflict, Part 1 wins. Specificity is the device that is never switched off: the concrete weird detail IS the joke. The straight zones still apply - prices, timelines, proof and the last line before the ask are written flat, always.

**Which of the four joke shapes fit a GBP post:** the **absurd prop** and the **universal tangent** - both land in one sentence, which is all a post has ("Your water heater doesn't break on a Tuesday afternoon. It waits."). The escalating confession needs three beats of runway a GBP post doesn't have - rarely. The stacked rule-of-three eats half the word count - never. The one line per post aims at the swipe-file bar (voice.md's top entries); everything else in the post is straight, because the reader is minutes from calling and the joke earns the read while the straight sentence earns the call.

**⛔ PEXELS KEY - get it before you need a photo, not after.** Check `.env` for `PEXELS_API_KEY`. Missing or empty? Ask inline, right then:

> "Paste your Pexels API key so I can pull real photos: pexels.com/api → 'Get Started' → copy the key. Free, no card, about 30 seconds."

Save it to `.env` so nothing asks twice. Then pull with `python3 code/fetch_stock_photos.py "[query]" --count 8` - a pool to pick from, not a quota to use: look at all of them, ship the best one per post, never the same photo on two posts, delete the rejects. Photos are DOWNLOADED, never hotlinked. Without a key it falls back to Openverse, which needs no signup but returns amateur photo-library results (a search for "hvac service van" came back with a refurbished tram). Usable in a pinch, never shipped unlooked-at. **Look at every photo before it goes on a page.**

**The batch (per the spec):**
- **Every post traces to an angle from Step 1.** A post you cannot point back to a lane and a specific fact is a post written from memory - cut it and take the next angle off the bank.
- Cadence 2-3/week (the cap enforced by the publisher) → generate a month (4-8 posts) in the spec's monthly mix: ~50% Offers (the yellow-badge converter), ~30% Updates as "Call to action" posts (seasonal tips, customer stories from my real jobs), Event only if one exists, 1 product/service spotlight
- Every post: the 3 justification-bait layers (specific service variant + ONE real local detail + a long-tail phrase a customer would actually say), first-100-chars hook, image_query for the stock pull (real photos from `context/proof/images/` beat stock - use them first), CTA always. **Baited means woven in so it reads as writing. If you can see the layer, it failed.**
- **⛔ Every post ships with an image. No exceptions.** The ladder: a real photo from `context/proof/images/` → stock via `code/fetch_stock_photos.py` → if the first query returns nothing usable, rewrite the query and pull again until one does. A post with no image is a failed post, not a shipped one - it never goes to the webhook and never lands in the queue as ready.
- **⛔ Team faces and testimonial shots are not decoration.** A team photo goes on a post ABOUT the team (a hire, a milestone, behind-the-scenes); a testimonial image goes on the post telling THAT customer's story. Neither gets slapped on a seasonal tip because it was the nearest "real" photo - a face on an unrelated post reads as filler, and it spends the credibility of the person in it. When the proof folder has nothing that matches the post's actual subject, that's what the stock rung of the ladder is for.
- **⛔ The link is the home page. Never ask which page a post points at.** `cta_url` (and `redeem_online_url`) default to `DEFAULT_CTA_URL` on every post, silently. A deeper page happens only if I named one, or the post covers one service that already has a live page in `website-index.md` - and that page gets verified before it is used. Eight posts is eight silent home-page links, not eight questions. See "The link on every post" in the spec.
- Offer posts: ALL required fields generated per the spec's rules (coupon_code format, redeem URL, ISO dates, 7-day window, terms default)
- Lengths per the spec's real-world table - short beats the guides' claims
- **⛔ Photos go to Make.com as public https URLs, never local paths.** Google downloads the image itself, so `website/public/images/...` fails silently. Download the photo, put it in `website/public/images/`, publish it, send the live URL. Site not published? That is a `/publish` job - say so and offer to run it, never file it as "photos cannot attach automatically".

**Ship:** show me the month as a legible list (title + type + week + the hook line) and get ONE yes on the batch. Then:

- **⛔ Scheduled - THE DEFAULT. One approval covers the whole month.** Write each approved post as a dated YAML file in `gbp-queue/` (payload fields per the spec, plus `send_after: YYYY-MM-DD` spaced across the month). The GitHub Action (`.github/workflows/gbp-posts.yml`, Mon/Wed/Fri cron) ships them with no laptop open: **max one post per run**, and `code/publish_due_gbp_posts.py` independently enforces the 2-3/week cap and a minimum gap between posts, so a mistake in the dates cannot cause a burst. On a 200 the post moves to `gbp-queue/sent/` with a `sent_at` stamp and is deleted from the queue - **it can never send twice.** A non-200 leaves it in the queue and turns the run red, so a miss is visible rather than silent. Needs `MAKE_WEBHOOK_URL` saved once as a GitHub Actions secret - walk me through it the first time.

  **Never ask which lane I want.** Approving the batch means schedule it. A month of posts is written to be read over a month, and firing eight at once buries seven of them - the profile shows the newest and the rest scroll away the same afternoon. Report the dates each post will go out on, then stop.

- **Now - only if I explicitly say "post them all now" or "publish immediately".** POST each to the webhook and read the response per post - **200 means sent, anything else means it did not go.** A 200 flips that post's status in `gbp-posts-queue.md`; a non-200 or timeout leaves it Pending, gets ONE retry, then lands in the failure list with its status code. Never mark a post sent on the strength of having fired the request - the response is the receipt. Report sent/failed per post. **Say what it costs before doing it:** eight posts in one afternoon means seven are buried by the eighth.

`/scale-map`'s page-announcement posts arrive through this same queue and obey the same caps, so a month of content and a batch of new-page announcements cannot collide into a burst.
