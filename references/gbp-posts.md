# Google Business Profile posts - how to write them and how to send them

The rules Claude reads before writing any GBP post, plus the exact payload Make.com expects.
Built as part of the seo-blueprint-pro reference set. Pairs with `tone.md`, `humour.md`, `vocabulary.md` and `business-context.md`.
Next: draft the posts into `gbp-posts-queue.md`, then POST each one to the Make.com webhook.

---

## Never do these - they break the Make.com router

These are the most common mistakes. Never produce any of them.

**Never `type: update`** - wrong field name and wrong value.

**Never `type: standard`** - `STANDARD` is not a valid Make.com post type.

**Never `type: product`** - not a Make.com post type. Use `"Call to action"` instead.

**Never `type: news`, `type: announcement` or `type: tip`** - none are valid.

**Never `cta: Book`** - wrong field name. Use `cta_action: BOOK` plus `cta_url: ...`.

**Never a markdown body below the closing `---`** - the body lives inside `summary: |`.

**Never markdown in the summary** - `**bold**` and `[link]()` render literally. Plain text only.

**⛔ THE TITLE IS 58 CHARACTERS. Count it before you write the next line.** Google's API rejects anything longer, and Make only reports it AFTER the scenario runs - as *"One mapped value is longer than 58 characters"*, which reads like a Make bug and loses the post. Every one of the first eight posts written for this repo came in at 64-70 characters, because a good headline for a markdown queue is longer than a GBP field allows.

**The hard limits, enforced by `code/check_gbp_payload.py`:**

| Field | Cap |
|---|---|
| `title` | **58 characters** |
| `event_title` | 58 characters |
| `coupon_code` | 58 characters |
| `summary` | 1,500 characters |

**Write to 58 first, do not write long and trim.** A trimmed headline reads like a trimmed headline. The constraint is closer to a subject line than a sentence - `"$9,500 USD. Saying the price out loud, which nobody does"` is 56 and lands; the 70-character version says the same thing and gets rejected.

**Always use `post_type:` as the field name**, never `type:`.

**Always put the body inside `summary: |`** as plain text, never as markdown below the YAML.

**Always one of only three values for `post_type`:** `"Call to action"` (with quotes, has a space) · `"Event"` · `"Offer"`

If you find yourself about to output `type: update`, stop. The correct output is `post_type: "Call to action"` with the body inside `summary: |`.

---

## Setting up the webhook once

Set these during client onboarding. The skill POSTs every generated post to `MAKE_WEBHOOK_URL`.

```yaml
MAKE_WEBHOOK_URL: https://hook.make.com/[YOUR_WEBHOOK_ID]
DEFAULT_CTA_URL: https://www.thebrotherhood.ca
```

**Where each one comes from:**

1. **MAKE_WEBHOOK_URL** - in Make.com, create a new scenario, add a "Webhooks · Custom webhook" trigger, copy the URL it generates.
2. **DEFAULT_CTA_URL** - the client's home page. **This is the default link on every post.** A deeper page is an override, not the norm - see "The link on every post" below.

**⛔ The account and the location are NOT skill config.** They are picked once inside the Make.com "Create Local Post" module, from its own dropdowns, when the scenario is built. Never ask for them, never store them, never send them in the payload. Two fields the owner cannot find in their GBP dashboard, asked before a single post exists, is how a five-minute setup turns into a support ticket.

---


## Where the angles come from

**A month written from `context/` alone will be the same three posts, eight times.** The context files did not change since last month, so neither will the posts. Every batch starts by going outside for material - five lanes, run in parallel, before a word is written. The command holds the execution detail; this is what each lane is for.

| Lane | What it produces | Why it beats writing from memory |
|---|---|---|
| **News, last 90 days** | A post that reacts to something that just happened | The only post nobody in the map pack could have written in advance. Check the date - 90 days or it is background, not news |
| **The calendar, next 6 weeks** | Urgency that is real rather than manufactured | Seasonal has a reason to exist NOW. "Book soon" does not |
| **Proof not yet used** | The story sitting unused while two results get recycled | Cross the inventory against the claims log. Unused proof is the cheapest fresh angle you own |
| **Real customer language** | A post built on a sentence somebody actually said | Outperforms what the business wishes they said, every time. Keep it verbatim |
| **Competitors' own posts** | What NOT to write | If the field is all "Happy Friday from our team", the lane is wide open |

Build 15 to 20 candidate angles, then **pick the 8 that are most different from each other - not the 8 best.** Two strong angles resting on the same claim are one post.

### The batch is judged as a batch

An individually fine post can still be the fourth copy of another one. Before anything ships:

- **One claim, one post, one month.** Logged in "the claims used this month".
- **No two posts share a shape.** Story · contrarian claim · a surprising number · a question a customer actually asked · a confession about our own business · a teardown of standard practice · a numbered list · a comparison · a reaction to the news. Nine shapes, eight posts, no repeats.
- **Two client results with the same structure** (client, we automated it, saved $X, video on our homepage) are one post. Ship the stronger, hold the other for next month.
- **Read the eight headlines in a row.** One voice at one volume is the failure state.

### The local reference is a detail, not a keyword

Every post needs one and it must be true about the place: a street, a neighbourhood, the weather, a local event, the actual office address. **One per post, maximum.**

**Never bolt the city onto a generic sentence.** These shipped in a real batch and all three are visible from orbit:

> "The audit costs nothing, Vancouver or anywhere else."
> "Most service business owners we meet, here in Vancouver and everywhere else..."
> "Every Metro Vancouver service business we audit in December..."

The one that works in the same batch is *"run out of our East Cordova Street office in Vancouver"*, because it is a fact rather than a placeholder. If the sentence still makes sense with the city deleted, the city was stuffing.

**Never argue against local on a local surface.** "Same build whether you are in Vancouver or three time zones away" and "neither of us has ever needed to be in the same room" both shipped on a Google Business Profile, whose entire ranking job is proximity. Use out-of-town proof freely. Just never point out that geography does not matter, on the one surface where it is the ranking factor.

---

## Write it like copy, not like a summary

Most GBP posts read as a tidy list of facts about the business. Tidy is not the same as good. A post has 25 to 80 words and one job: make one person feel something specific enough to act.

**One idea per post.** The most common failure is stacking four selling points because they are all true. Guarantee, plus month-to-month, plus you-keep-everything, plus service area, is four posts wearing one coat - and a reader remembers none of them. Pick the strongest, spend the whole post on it, save the rest for next week.

**Do not explain the headline. Advance it.** If the headline is "live in 8 weeks or we keep working free", the body restating that as "eight weeks to a working lead machine, if it is not live we keep going" has spent 20 words saying the same thing twice. The body's job is the thing the headline made them wonder: what happens in those eight weeks, or what it costs to keep waiting.

**Start where the reader already is, not where the offer is.** Nobody wakes up wanting a guarantee. They wake up wanting the phone to ring. "Most owners we meet have been quoted six months and a retainer" earns the guarantee that follows it, because now there is something to compare against.

**Be specific to the point of discomfort.** "A working lead machine" is a category. "Your service pages live, your tracking wired, and calls landing in a CRM you own" is a picture. Concrete beats abstract in every measurement there is, and it is the single cheapest upgrade to any draft.

**Give the reader the alternative.** Every offer competes with doing nothing, which is free and requires no decision. A post that never names the cost of waiting is arguing against a competitor it has not mentioned.

**Never end on logistics.** Service area, hours and terms are the weakest lines you own, so they never go last. End on the action, or on the picture of it having worked. The final line is the one they carry.

### The pass to run on every draft

1. **Count the ideas.** More than one means split it into two posts.
2. **Delete the second sentence.** It is usually the headline again in different words. If the post survives without it, it was filler.
3. **Circle the abstractions.** Every category noun (solution, system, service, results, growth) gets replaced with the specific thing or cut.
4. **Read the first 100 characters alone.** That is all most people see. Does it stand up with nothing after it?
5. **Read it out loud.** Anything you would not say to a customer standing in front of you comes out.
6. **Check the last line.** If it is a fact rather than a feeling or an action, move it up and end somewhere better.

### The same post, both ways

**As a summary, which is what most drafts look like:**

> **Live in 8 weeks, or we keep working free**
> That is the deal on every SEO Sprint and Google Ads Sprint. Eight weeks to a working lead machine. If it is not live, we keep going at no cost until it is.
> Month to month. No lock-in. You keep everything, including the logins.
> Vancouver and the Lower Mainland.

Four ideas, the second sentence repeats the headline, "working lead machine" is a category, and it ends on geography.

**As copy:**

> **Live in 8 weeks, or we keep working free**
> Most owners we talk to have been quoted six months and a retainer that never ends.
> Eight weeks from now you could have your service pages live, tracking wired, and calls landing in a CRM you own outright. Or you could be seven weeks into somebody's six-month plan, still waiting.
> Book the free audit and we will tell you honestly if eight weeks is realistic for your business.

Same length. One idea. Names what waiting costs, replaces the category with the picture, ends on the action.

## How often to post

**One to two posts per week.** Weekly is the minimum.

**Updates lose prominence after seven days.** Events and Offers stay visible until their end date.

**Don't post daily.** It looks spammy and there is no extra benefit.

**Consistency beats volume.** One post a week for twelve weeks beats twelve posts in one week.

---

## How long a post should be

Real high-performing posts run shorter than most guides claim.

| Type | Sweet spot | Max |
|---|---|---|
| Offer / Flash sale | 25-50 words | 80 words |
| Event | 30-60 words | 100 words |
| Update (announcement) | 30-80 words | 150 words |
| Update (story / case study) | 100-200 words | 300 words |
| Product spotlight | 30-60 words | 100 words |

**The first 100 characters are critical** - that is what shows before "see more."

---

## What every post must contain

- **Plain text only.** No markdown (`**bold**`, `[link]()` and so on). GBP renders it literally.
- **Title**, 60-80 characters. The headline or hook, separate from the body.
- **Summary / body**, plain text, 25-300 words depending on type.
- **An image**, 1,200 x 900 pixels (4:3 ratio).
- **A CTA action:** BOOK · CALL · LEARN_MORE · SIGN_UP · ORDER · SHOP
- **A CTA URL**, required for every action except CALL. Defaults to the home page (`DEFAULT_CTA_URL`) - never ask which page.
- **A local reference** baked in - neighborhood, city or landmark.
- **A justification keyword** - a specific service variant.
- **A strong hook in the first 100 characters.**
- **Emojis are fine**, two to three maximum. They render as Unicode.

---

## Picking the image

Check the proof folder first. Stock is the fallback. Never open with a stock suggestion. Work down this list in order and say which rung each post landed on.

**1. Their own photos, in `context/proof/images/`.** Read `images-index.md` and match a real photo to each post. A real van, a real job, a real face beats any stock image, and it is the one thing a competitor cannot copy. If the folder has something usable, use it and stop here.

**2. Ask for the obvious gaps.** If the folder is empty or thin, ask before falling back, and ask specifically, because "send photos" gets nothing: *"Three photos would carry most of this month: your van or storefront, one before-and-after from a recent job, and one of you or the team. Phone quality is fine."* Give them the list, then continue with stock for now and note which posts get upgraded when the photos arrive.

**3. Stock, as the fallback.** Give a plain-English description of the shot, written the way a person would type it into a search box.

**4. AI-generated** via fal.ai (Nano Banana, Imagen). Only for product shots that genuinely have no real or stock equivalent.

**Never publish a post with no image.** Engagement drops sharply without one.

### Download the file. Never hotlink a URL.

Stock images get downloaded and then uploaded to the post, never referenced by their remote URL. A hotlinked image is somebody else's file on somebody else's server: it can be moved, rate-limited, replaced or deleted, and when it goes the post is left with a broken image on a live Google profile that nobody is watching. Unsplash and Pexels URLs also carry tracking parameters and can redirect.

The flow, every time:

1. Search the description, pick the image.
2. **Download it to `context/proof/images/`** with a descriptive filename (`stock-agency-team-two-monitors.jpg`), not to Downloads.
3. Resize to 1,200 x 900 pixels, under 1 MB.
4. Add it to `images-index.md` so it is reusable and never re-sourced twice.
5. **Upload the file** into the Google Business Profile post.

**⛔ COMPRESS THE IMAGE. Under 2 MB, 1200px on the long edge.** Google's cap is 5 MB, but Make times out well below it and reports the timeout as *"the module hit a service problem on its side"* - so an oversized image looks like a Make outage. A full-resolution PNG off a website is routinely 2-3 MB. Resize before queueing:

```bash
sips -Z 1200 source.jpeg --out public/images/stock/gbp-post.png
```

**⛔ An `"Offer"` post takes NO CTA.** No `cta_action`, no `cta_url` - Google's Offer type has no button, `redeem_online_url` IS the action. Sending a CTA on an Offer is rejected, and again Make blames itself.

**⛔ `media_items` must be JPG or PNG. NEVER WebP.** Google Business Profile refuses WebP, and because the fetch succeeds the failure surfaces from Make as *"The Google My Business Create a Post module hit a service problem on its side"* - which sends you checking connections and quotas for an hour. Sites built by `/build-website` serve `.webp` by default for speed, so the fast path is exactly the wrong one here: link the `.jpeg` twin that sits beside it in `public/images/`.

**⛔ `media_items` is ALWAYS a public https URL. Never a local file path.** Make.com passes the URL to Google, and Google downloads the image itself - so it has to be reachable from the open internet. `website/public/images/stock/photo.jpeg` is a path on your laptop, it is not a URL, and it will fail silently.

The URL is the file on the business's own domain (`https://theirsite.com/images/stock/photo.jpeg`), never a hotlink to Pexels or Unsplash. Download it, put it in `website/public/images/`, publish, then send that URL.

**If the site is not published yet, that is a `/publish` job, not a reason to stop.** Never write "photos cannot be attached automatically" in the queue as if it were a permanent condition. Say which images need publishing and offer to run `/publish` - one deploy unblocks the whole month.

Checking licences is part of the job. Unsplash and Pexels are free for commercial use with no attribution, but never assume that for an image found through a general image search.

---

## The monthly mix at two posts a week (eight posts)

**Offer - four posts, 50 percent.** The highest converter. It gets the yellow "Limited Time" badge in the map pack and has the clearest CTA.

**Update - two to three posts, 30 percent.** Seasonal tips and customer stories. This is the freshness signal.

**Event - zero to one post, 10 percent.** Only when you actually have one.

**Product or service - one post, 10 percent.** New launches and bestsellers.

---


## ⛔ Rotate the SUBJECT, not just the post type

The monthly mix above governs the `post_type` field, which is a Make.com value. It says nothing about what a post is ABOUT. Four Offers and four Updates passes that rule and still ships eight posts that all say "buy my thing" in different words - which is what most business profiles look like, and why most business profiles get ignored.

**The test that catches it:** write the eight titles in a column and read them. If a stranger could not tell which business posted them, or if six of them could swap headlines without anyone noticing, the month is one post repeated.

### The rotation - never more than two selling posts in a row

Work down this list. A month pulls from at least four of these seven, and the offer never appears more than three times in eight:

- **A job you just finished.** The most under-used post there is. What the problem was, what you did, how long it took. A real photo. This is the only post a competitor genuinely cannot copy.
- **Something that goes wrong constantly.** The mistake you see every week, and the cheap fix. Costs you nothing to give away and it is the post people actually save.
- **A question a customer asked out loud this month.** Their words in the headline. If one person asked it, a hundred searched it - and this one feeds Ask Maps directly.
- **The seasonal thing.** What breaks in February, what to book before spring, what the busy month is. Useful, timely and it dates the profile as alive.
- **Behind the scenes.** The van, the workshop, the certificate that just came through, the new hire. Small, human, and it proves a real business exists.
- **A warning worth reading.** What to check before hiring anyone in this trade, the quote pattern that means you are being overcharged. Positions you as the honest one without saying the word honest.
- **The offer.** Which is where most profiles start and stop.

### The repetition guard - track CLAIMS, not titles

The dedupe check reads `gbp-posts-queue.md` for published titles, and titles are easy to vary while saying the identical thing. So log the CLAIM each post leans on - the 8-week guarantee, the pay-in-full saving, keep-everything, the free audit - and enforce two rules:

- **A claim gets used once a quarter, not once a month.** If the 8-week guarantee carried a post in March, it is a supporting line in April, not the headline again.
- **Two consecutive posts never share a claim**, whatever their post_type says.

### The honesty check before the batch ships

Read the month back and ask: **would this business actually say all of this, or is this a marketing calendar wearing their name?** A real local business posting weekly talks about work it did, things that broke, and the season. It mentions its offer sometimes. A profile that only ever sells reads as an ad channel, and people scroll ads.

If the proof file has no finished jobs, no photos and no customer questions in it, that is the real problem and the posts are a symptom. Say so, and go get three job photos rather than writing a fifth way to describe the same guarantee.

## Baiting the three justification keywords

Every post should naturally include all three layers. This triggers Google's "Their post mentions..." snippets.

**1. Service variant** - specific phrasing.
Good: "tankless water heater install" · "drain camera inspection" · "burst pipe repair". Bad: "plumbing services", too generic.

**2. Neighborhood or area** - an explicit local reference.
Good: "Riverdale" · "East York" · "King St W". Bad: "the city", too vague.

**3. Long-tail problem** - the customer's exact phrase.
Good: "basement smells like sewage in winter" · "no hot water on weekends".

---

## Choosing the post type

The `post_type` field accepts exactly one of three strings, spelled exactly as Make.com expects. Any other value breaks the router.

**`"Call to action"`** - a post with an action button. Requires `cta_action` and `cta_url`.

**`"Event"`** - a post with start and end dates: workshops, open houses, anniversaries. Requires `start_date` and `end_date`.

**`"Offer"`** - a promo with a coupon code, which earns the yellow badge in the map pack. Requires all of `coupon_code`, `redeem_online_url`, `start_date` and `end_date`. Optional: `terms_conditions`.

**Every post must be one of these three.** Make.com has no "plain" post type - every post needs at minimum a CTA button.

The formulas further down use content categories, not webhook values. Map them like this:

- Offer, flash sale or discount → `"Offer"`
- Update, announcement, news, tip or customer story → `"Call to action"` with "Learn more"
- Event, workshop or open house → `"Event"`
- Product or service spotlight → `"Call to action"` with "Book", "Order" or "Shop"

### Two fields that must be real, never generated

Generating a plausible value for either of these ships a promise the business cannot keep, and the customer finds out, not the owner.

**Coupon codes: confirm, never invent.** A code is a real thing a customer says out loud or types. Generating `FREEAUDIT` and posting it means somebody walks in quoting a code nobody has heard of. Before any Offer post goes out, ask: *"Is FREEAUDIT a code you'll actually honour? I can use it as a mention-this-post tracker, or swap it for one already in your system."* Get a yes. Record confirmed codes in CLAUDE.md under "## My setup" so the same ones get reused rather than reinvented each month.

**Redeem URL: a page that shows the offer beats the home page.** The customer clicks a $2,000 saving and lands on a generic page with no mention of it, which reads as bait. Best is a page that acknowledges the offer: a booking page with the promo pre-applied, or a page that names it. **If no such page exists, use the home page and keep going** - do not stop the batch and do not ask. Add one line to the human action list saying a page naming the offer would convert better and that `/service-page` builds it. An unshipped post converts nothing at all.

Neither of these appears in `gbp-posts-queue.md` as a field. The confirmed coupon and the working link appear in the human action lines.

**(The account and location IDs used to be a third item here. They are gone - they live in the Make.com module, not in this skill. See "Setting up the webhook once".)**

### Offer posts - the five fields you must always fill

Make.com's GBP module marks these as required for Offer posts. Claude must always generate them: no nulls, no empty strings.

**1. `coupon_code`** - use a confirmed code (see above), formatted `[KEYWORD][NUMBER]` or `[KEYWORD][CAMPAIGN]`. Six to twelve characters, uppercase, no spaces.

Examples: `TANKLESS50` (tankless install, $50 off) · `WINTER25` (winter promo, 25 percent off) · `FREECONSULT` (free consultation) · `BROTHER1ST` (Brotherhood first-time client) · `BURSTFIX` (burst pipe service).

Why it matters: it tracks which posts drove redemptions, and Make.com requires it to be non-empty.

**2. `redeem_online_url`** - always set. Default is `DEFAULT_CTA_URL` from the webhook config (the client's home page), and that default ships without a question. Better, when it already exists, is a deeper page with the offer pre-applied, such as `https://client.com/book?promo=TANKLESS50`.

**3. `start_date`** - always set. Default is today (the `publish_date`), in ISO 8601 format with the America/Toronto offset: `"2026-05-15T00:00:00-04:00"`.

**4. `end_date`** - always set. Default is seven days after `start_date`, same format: `"2026-05-22T23:59:59-04:00"`. Seven days matches GBP's default offer visibility window. Longer loses urgency, shorter misses traffic.

**5. `terms_conditions`** - optional but recommended. If missing, default to `"Cannot be combined with other offers."`

---

## Writing the copy - formulas by post type

### Offer posts - the highest-converting type

**Formula A: Price + Service + Location + Deadline**
```
[$ off] [specific service] in [neighborhood]. [Deadline].
[1-line social proof or detail]
CTA: Book / Get offer
```

**Example:**
> $50 off **tankless water heater install** in **Toronto + GTA**. Ends Sunday.
> 12-year warranty · 4-hr install · same-day quotes.
> [Book →]

**Formula B: Flash sale shorthand**
```
⚡ [TIME-LIMIT] [DEAL TYPE]
[What's included]
[Deadline + urgency hook]
CTA: Get offer
```

**Example:**
> ⚡ 48-HOUR FLASH SALE
> Buy 2, Get 1 FREE on all skincare. No code needed.
> Ends Friday midnight ✨
> [Order online →]

**Formula C: Removing barrier**
```
Free [service] for new [location] clients.
[1-line trust signal]
CTA: Call now / Book
```

**Example:**
> Free dental exam + x-rays for new **Mississauga** patients this month.
> Family-owned · open Saturdays · 4.9★ (180 reviews).
> [Call now →]

### Update posts - freshness plus expertise

**Formula A: Seasonal tip with local hook**
```
[Season] is here. [Number] things every [city/neighborhood] [customer-type] should do before [trigger].
[Optional bullets]
CTA: Learn more
```

**Example:**
> **Burst pipe season** is here. 3 things every **Toronto basement** owner should do before -10°C.
> 1. Insulate exposed pipes in your basement
> 2. Open cupboard doors under sinks on cold nights
> 3. Keep a drip going on your coldest faucet
> [Learn more →]

**Formula B: Customer story / case study**
```
[Time] emergency call · [neighborhood] · [problem]
[1-2 sentences: what we found, how we fixed it]
[Outcome for customer]
CTA: Call now
```

**Example:**
> 2am emergency call from a **Riverdale family** - flooded basement, burst pipe in the wall.
> Mike was on-site in 28 minutes. Found the break, isolated the line, patched it before the hardwood swelled.
> They were dry by sunrise. This is why we run 24/7.
> [Call now →]

**Formula C: Counter-intuitive tip**
```
Why your [problem] in [season] - and the [$0 / surprising] fix most [pros] don't share.
[1-2 sentence explanation]
CTA: Learn more
```

**Example:**
> Why your basement **smells like sewage** in winter - and the $0 fix.
> When your P-traps dry out from low humidity, sewer gas seeps up through your floor drain. Pour a cup of water down it once a month.
> [Learn more →]

### Event posts - date-anchored urgency

**Formula: Event + Date + Hook + RSVP**
```
[emoji] [Event name] · [date] · [location]
[1-2 sentence value prop]
[Practical detail: cost, who it's for, spots]
CTA: RSVP / Sign up
```

**Example:**
> 🍳 Learn to Cook Authentic Italian Pasta!
> Saturday Jan 20, 2 PM · our **King St W** kitchen
> Hands-on workshop with Chef Marco. All skill levels welcome. Ingredients + recipes provided.
> $45/person · 12 spots only
> [RSVP →]

### Product and service posts - feature what's new

**Formula A: Product + speed claim + warranty**
```
[Product/service name]
[Speed/scope claim] · [warranty or trust signal] · [location served]
[Optional pricing tier]
CTA: See specs / Order online
```

**Example:**
> **Tankless water heaters** installed in 4 hours.
> 12-year warranty · same-day quotes across the **GTA** · financing available.
> [See specs →]

**Formula B: Before/after results**
```
[Service] result: [neighborhood] [property type]
[1-line description of work done]
[Result for customer]
CTA: Book
```

**Example:**
> Drain repair · **East York** semi-detached
> Replaced collapsed clay sewer line with PVC. 6-hour job, no driveway dig (we used a pipe-burst method).
> Homeowner saved $4,200 over the dig-and-replace quote.
> [Book →]

---

## Choosing the CTA button

- Convert to phone · **Call now**
- Convert to booking · **Book**
- Drive to website · **Learn more**
- Capture lead · **Sign up**
- Ecommerce · **Buy / Order online**
- Promo redemption · **Get offer**

**Never post without a CTA.** A post without a destination is a wasted slot.

---

## The link on every post

**⛔ Default `cta_url` to the home page. Never ask which page a post should link to.**

`DEFAULT_CTA_URL` is the home page and it is the answer for every post unless somebody says otherwise. A GBP post is not a landing page funnel - the click is a customer checking the business is real, and the home page does that job. Stopping a batch of eight posts to ask about eight destinations is eight questions for zero gain.

So:

- **No page named = home page.** Fill `cta_url` with `DEFAULT_CTA_URL` and move on. Do not flag it, do not list it as a decision, do not surface it in the queue as something to confirm.
- **A deeper page is an override**, and it only happens two ways: the owner names one, or the post is about one specific service that already has a live page in `website-index.md`. Verify the page exists before using it - a 404 on a live Google profile is worse than the home page.
- **Only ever ask when the owner has already asked.** If they said "point these at the booking page", use that for the batch and remember it. Add it under "## My setup" in CLAUDE.md as `DEFAULT_CTA_URL` so it never gets asked twice.
- **CALL actions have no URL.** That is the one post type where none of this applies.

**Offer posts are the one exception worth caring about.** A coupon that lands on the home page reads as bait - see "Redeem URL" above. Even there, do not stop the batch: use the home page, ship the post, and add one line to the human action list saying a page naming the offer would convert better.

---

## What NOT to do

- **Never post daily** - it looks spammy.
- **Never generic content** - "Happy Monday from our team!"
- **Never stock photos** without a branding overlay.
- **Never keyword stuffing** - write naturally.
- **Never fake urgency** - "ENDS TONIGHT!" when it doesn't.
- **Never blog excerpts that link off-platform** - visitors are in decision mode.
- **Never post without a photo** - it drops engagement by about 60 percent.
- **Never reuse copy across clients** - Google detects duplication.

---

## Why we bother - the four mechanisms posts trigger

1. **Engagement signals.** Clicks, calls and directions are a behavioral ranking signal, roughly 9 percent of the weighting.
2. **AI Overview citations.** Gemini reads posts to write AI summaries about the business.
3. **Profile freshness.** Active profiles get a small ranking preference. Ninety days quiet counts as inactive.
4. **Offer badge conversion.** The yellow "Limited Time Offer" tag visually steals clicks at the current rank.

---

## The machine payload - what gets sent to Make.com

Everything in this section is machine input, not human copy. It gets built at send time and POSTed to the Make.com webhook as plain-text JSON, then logged in `gbp-posts-queue.md` for deduping. None of it belongs in the queue file.

**The entire post lives inside the YAML frontmatter as fields. There is no markdown body section below the closing `---`.**

Wrong, never do this:

```
---
type: update
cta: Book
---

# The same fight, every Sunday night

A client in **Toronto** came in...

[Book →]
```

Right, always do this:

```yaml
---
title: "The same fight, every Sunday night"
post_type: "Call to action"
summary: |
  A client in Toronto came in...
cta_action: BOOK
cta_url: "https://..."
---
```

The body text lives inside `summary: |` - the `|` preserves line breaks. No `**bold**`, no `[link]()`, no `# headings`. Plain text only.

**No markdown in `summary:` or `title:`:**

- Never `**bold**` - it renders as literal asterisks in GBP.
- Never `[Book →](url)` - it renders as literal brackets.
- Never `# headings` - they render as literal hash signs.
- Always plain text with line breaks only.
- Emojis (Unicode) render fine.
- Links go in the `cta_url:` field, never in the body.

### The Make.com router pattern (required)

The `Post type` field in Make.com's GBP module is static - it can't be mapped dynamically, and different post types expose different fields. So one webhook feeds a Router, which feeds separate GBP modules.

```
Webhook (custom)
        ↓
    Router (checks {{1.post_type}})
        ↓
    ┌────────────────┬─────────┬─────────┐
    ↓                ↓         ↓
 Call to action    Event     Offer
 (Title +         (Title +  (Title +
  Summary +        Summary + Summary +
  Action +         dates)    coupon +
  URL)                       dates)
```

The three router branches:

**Branch 1 · Call to action.** Filter: `post_type` = `Call to action`. GBP module config: Post type "Call to action", plus Action type and URL.

**Branch 2 · Event.** Filter: `post_type` = `Event`. GBP module config: Post type "Event", plus Start and End date.

**Branch 3 · Offer.** Filter: `post_type` = `Offer`. GBP module config: Post type "Offer", plus Coupon, Redeem URL, Terms and dates.

### Common payload fields - every post type

Fields vary by `post_type`. These are always present.

```yaml
# === Common (sent to webhook for ALL post types) ===
post_type: "Call to action"   # OR "Event" OR "Offer"
title: "60-80 char headline · plain text"
summary: |
  Body text · plain text · no markdown · 25-300 words
media_items:
  - "https://images.unsplash.com/photo-xxxxx?w=1200"

# === Internal tracking (NOT sent to webhook) ===
id: post-2026-05-15-001
status: pending
publish_date: 2026-05-15
published_at: null
image_query: "stock image search query"
keywords_baited:
  - service variant
  - neighborhood
  - long-tail problem
```

### Payload type 1 · Call to action

Use for announcements, customer stories, tips, product spotlights, anything that drives action via a button.

```yaml
---
post_type: "Call to action"
title: "The same fight, every Sunday night - until it wasn't"
summary: |
  A client in Toronto came in after the same Sunday-night argument
  with his wife had played out for 3 years straight.

  Six sessions of parts-based therapy later, he could see it:
  the anger wasn't about the dishes. It was a 14-year-old part of
  him bracing for criticism that wasn't actually coming.

  This is what online therapy for men in Ontario looks like when
  it's done right. First consultation is free.
media_items:
  - "https://images.unsplash.com/photo-xxxxx?w=1200"

# CTA-specific fields
cta_action: BOOK                                 # BOOK | ORDER | SHOP | LEARN_MORE | SIGN_UP | CALL
cta_url: "https://yourclient.com/book"           # required unless CALL

# Internal tracking
id: post-2026-05-15-002
status: pending
publish_date: 2026-05-17
published_at: null
image_query: "man on laptop video call home office"
keywords_baited:
  - online therapy for men Ontario
  - parts-based therapy
  - emotional regulation
---
```

### Payload type 2 · Event

Use for workshops, open houses, anniversary events, anything with a specific date range.

```yaml
---
post_type: "Event"
title: "Pasta-making workshop with Chef Marco"
summary: |
  Hands-on Italian pasta workshop in our King St W kitchen.
  All skill levels welcome. Ingredients + take-home recipes
  provided. 12 spots only · $45/person.
media_items:
  - "https://images.unsplash.com/photo-xxxxx?w=1200"

# EVENT-specific fields (ISO 8601 with America/Toronto offset)
start_date: "2026-05-20T14:00:00-04:00"
end_date: "2026-05-20T17:00:00-04:00"

# Internal tracking
id: post-2026-05-15-003
status: pending
publish_date: 2026-05-15
published_at: null
image_query: "italian pasta cooking class"
keywords_baited:
  - cooking class Toronto
  - King St W kitchen
  - hands-on pasta workshop
---
```

### Payload type 3 · Offer

Use for discounts, promos and limited-time deals. Auto-displays with the yellow "Limited Time Offer" tag.

```yaml
---
post_type: "Offer"
title: "$50 off tankless water heater install"
summary: |
  $50 off tankless water heater install in Toronto + GTA.
  12-year warranty · 4-hour install · same-day quotes available.
  Mention this post when you book.
media_items:
  - "https://images.unsplash.com/photo-xxxxx?w=1200"

# OFFER-specific fields
coupon_code: "TANKLESS50"                        # optional · leave "" if none
redeem_online_url: "https://yourclient.com/book?promo=TANKLESS50"
terms_conditions: "Valid on new installs only. Cannot combine with other offers."
start_date: "2026-05-15T00:00:00-04:00"
end_date: "2026-05-22T23:59:59-04:00"

# Internal tracking
id: post-2026-05-15-004
status: pending
publish_date: 2026-05-15
published_at: null
image_query: "tankless water heater install"
keywords_baited:
  - tankless water heater install
  - Toronto + GTA
  - 12-year warranty
---
```

### Field mapping in each router branch

| Make.com field | Call to action | Event | Offer |
|---|---|---|---|
| Title | `{{1.title}}` | `{{1.title}}` | `{{1.title}}` |
| Summary | `{{1.summary}}` | `{{1.summary}}` | `{{1.summary}}` |
| Media items | `{{1.media_items[]}}` | `{{1.media_items[]}}` | `{{1.media_items[]}}` |
| Action type | `{{1.cta_action}}` | - | - |
| URL | `{{1.cta_url}}` | - | - |
| Start date | - | `{{1.start_date}}` | `{{1.start_date}}` |
| End date | - | `{{1.end_date}}` | `{{1.end_date}}` |
| Coupon code | - | - | `{{1.coupon_code}}` |
| Redeem Online URL | - | - | `{{1.redeem_online_url}}` |
| Terms & Conditions | - | - | `{{1.terms_conditions}}` |

### The webhook flow, end to end

```
Claude generates post (plain text, structured)
        ↓
POST https://hook.make.com/[YOUR_WEBHOOK_ID]
        ↓
Make.com receives payload
        ↓
Make.com → Google Business Profile · Create Local Post
        ↓
Post goes live on GBP within minutes
        ↓
Make.com responds with success/error
        ↓
Claude updates gbp-posts-queue.md:
  status: published
  published_at: 2026-05-15T09:00:00Z
```

### Building the Make.com scenario, one time

1. Create the scenario with a **Webhook (custom)** trigger.
2. Copy the webhook URL.
3. Add the module **Google Business Profile → Create Local Post**.
4. Map the webhook fields to the GBP module fields: `title` to Title · `summary` to Summary · `post_type` to Post type · `cta_action` and `cta_url` to CTA · `start_date` and `end_date` to Start/End date (for Offer and Event) · `media_url` to Media items. **Account and Location are set in the module's own dropdowns, not mapped from the webhook** - pick them once here and every post lands on the right profile.
5. Save and activate the scenario.
6. Paste the webhook URL into the Claude Code skill config.

---

## Writing gbp-posts-queue.md - the file the owner opens

Never put the YAML payload in `gbp-posts-queue.md`. The payload and the queue file are two different things and they must never be the same thing.

**The payload** is machine input. Build it at send time. If it needs caching, cache it under `code/`.

**`gbp-posts-queue.md`** is what the owner opens. It is a human artifact. Per `output-format.md` rule 9, a raw data blob is never a deliverable, and a queue full of raw field names and ISO timestamps is exactly that.

The test: the owner opens the file on their phone, reads a post, and can paste it into Google Business Profile without decoding anything. Field names, quotes, ISO dates and pipe characters all fail that test.

### The shape of a queue entry

Every post reads as the post, followed by the three things the owner has to do. Same block-per-item shape as `keyword-map.md`. No tables of posts, no code fences, no field names.

```markdown
## 1 · Offer · Tuesday 18 August

**Free lead machine audit for Vancouver service businesses**

Free audit of your business. We map where your leads actually come from, what your site and your ads are doing to them, and which part is quietly leaking money.

Built for Metro Vancouver service businesses past $25K a month. Run out of our East Cordova Street office.

Mention this post when you book.

**Coupon:** FREEAUDIT · **Runs:** 18 to 25 August · **Button:** Book → automatable.co
**Photo to grab:** Vancouver business owner at a laptop, office, natural light
**Terms:** One audit per business. Cannot be combined with other offers.
```

The rules behind that shape:

- **The post body appears as the post**, in plain paragraphs, exactly as it will read on Google. Not inside `summary: |`, not indented, not fenced, not wrapped at 72 characters. The owner selects it and pastes it.
- **Dates in words.** "Tuesday 18 August", "Runs: 18 to 25 August". Never an ISO timestamp - build those at POST time, in the payload.
- **The heading carries number, type and date** so the file scans in one pass.
- **Say "Update", not "Call to action".** That is a Make.com field value, not a word the owner needs. Same for the button: "**Button:** Learn more → automatable.co", never `cta_action: LEARN_MORE`.
- **The photo line names the actual file when one exists**, and only describes a shot when it does not. Use `**Photo:** [van-outside-kitsilano-job.jpg](context/proof/images/van-outside-kitsilano-job.jpg)` when it came from the proof folder, and `**Photo to grab:** agency team working across two monitors, office` when it still has to be sourced. That difference tells the owner at a glance which posts are finished and which are waiting on them.
- **The action lines come last** - coupon, dates, button, photo, terms. Only the ones that apply to that post type. An Update has two lines, an Offer has five.
- **No IDs, no account names, no location names, no status fields, no `keywords_baited` block.** The justification keywords still get baited into the copy, that is the point, they just don't get listed as metadata afterwards.
- **The section a post sits in is its status.** Same rule as `keyword-map.md`.

### No tables in the queue file. None. Not one.

A markdown table is a spreadsheet in disguise: pipes, dashes, cells that wrap at different widths, columns that stop lining up the moment one entry is long. It is unreadable on a phone and unreadable in a plain text editor. **Every table in `gbp-posts-queue.md` is a defect**, including a "month at a glance" summary, a blockers table and a status table.

Use instead:

- **A bold line, then a plain sentence under it.** That is the shape for anything that would have been a two- or three-column row.
- **A short bullet list** where the items are genuinely parallel, one fact per bullet, separated with `·` not pipes.
- **Blank lines and headings** to group things. Whitespace does the work columns were doing.

**No summary index at the top either.** The eight post blocks below already carry number, type and date in their headings, so a table listing them again is the same information twice and one more thing to keep in sync.

### The top of the queue file, and its sections

The top of the file, in order:

1. **A one-line title.**
2. **Two or three short sentences:** how many posts, whether any are published, when it was built.
3. **One "Next:" line** - the single next action, per `output-format.md`.
4. **`# Before any of these go out`** - only if something is genuinely blocking. Each blocker is a bold line naming it, then one or two plain sentences saying what it costs and how to fix it. Never a table, never a bullet grid. If nothing is blocked, the whole section does not exist.

Posts move between sections: `# Waiting to go out` → `# Scheduled` → `# Published` → `# Archive` (older than 90 days). A post's whole block moves down, keeping its number, so numbering is never reused and the history stays readable. **Only write a section that has something in it** - never an empty `## Scheduled` placeholder saying "None".

End the file with a short numbered "Posting one by hand" block, because until the webhook is wired that is the actual workflow.

Why this works: the "Published" section is read before generating to avoid duplicates, there is no external dependency, it stays in version control, and - the point - the owner can actually use it on the day the webhook is not working.

---

## Reference limits

- Body: 1,500 characters maximum
- Image: 1,200 x 900 pixels · 4:3 ratio · 1 MB maximum
- Updates expire: after seven days
- Offers expire: at `end_date`
- Events expire: at `end_date`
- Images per post: 10 maximum
- Videos per post: 1 maximum, 30 seconds, 100 MB
