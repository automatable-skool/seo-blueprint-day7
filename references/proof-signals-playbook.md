# Proof Signals Playbook - the ultimate context file (proof-signals-playbook.md)

The complete source matrix for `/context-layer`'s sweep: every place proof hides, the tool that extracts it, and what it becomes. The goal is a proof inventory so dense that pages and ads write themselves.

**Why the effort is worth it (the numbers):** 92% of consumers hesitate to buy when reviews are missing · trust judgments form in ~50 milliseconds · security and trust badges lift checkout conversion 22-42% · customer photos beat text-only testimonials by ~35% · 72% of consumers trust user photos over stock · video testimonials lift conversion up to ~80%. Proof isn't decoration, it's the highest-ROI content on any page.

**What it costs.** The Apify calls are real money: a headless-browser site crawl runs roughly $0.50 to $5 per 1,000 pages, the review scraper about $0.002 per review, and the social actors a dollar or two. A typical business comes in between $1 and $5. Quote the estimate before spending it. Everything else here is free.

---

## ⛔ Three rules that override the whole matrix

### 1. Relevance first. A file in their account is not proof it is theirs.

Somebody can have a twenty-year-old Google Drive, Gmail and Slack. Most of what is in them belongs to a previous business, an employer, a side project, a spouse sharing the account, or an agency's clients. **Pulling somebody else's life into the proof file is the biggest single risk in the connected-account sweep**, and it is silent: a testimonial from a company that folded in 2019 reads exactly like a current one.

**Set the identity anchors before any connected-account query runs.** Take them from `business.md` if they exist, ask for whatever is missing. They are cheap and they gate everything after them:

- The domain or domains this business owns
- The brand name, plus any former or trading name
- The legal entity name as registered
- Roughly when the business started, month and year
- The key people - the owner, and anyone who has done client work under this brand

**Then test every candidate fact against the anchors:**

- Does it name this brand, this domain, this entity, or one of these people?
- Does it fall inside the business's lifetime? **Date-bound by the life of the business, never by an arbitrary window.** Something dated before the business existed belongs to a previous company, a side project, or somebody else
- Matches none of the anchors? It is not this business's proof. Do not write it in

**Watch specifically for:** a previous business or employer · a spouse or family member sharing the account · an agency's clients read as their own · personal files · old projects that were wound down.

**Anything ambiguous is UNCONFIRMED with the ambiguity NAMED**, never quietly included:

```
"Best contractor we've ever used" · UNCONFIRMED · relevance
> Drive file, dated March 2019, business started 2022
Ask: this testimonial predates the business by two years - is it from your previous company?
```

**Hard rule: proof about a DIFFERENT business the owner ran is not automatically usable.** It can be excellent E-E-A-T for an about page ("ran a 12-person crew for nine years before starting this") and it is NOT a client result for this company. Say which one it is, every time.

Everything the gate flags gets **grouped in the read-back** so the owner can strike the lot in one pass.

### 2. MEASURE, never read. Every number on a site is a claim.

On a real run the website said 150,000 subscribers, the community page said 140,000, and the platform's own page said 153,000 that day. **Self-reported numbers on a business's own properties are stale by default.** They were true once and nobody went back.

So every number found on any owned property is a **CLAIM**, and the job is to go and measure it:

- Subscribers, followers, members · read the platform's own page or API today
- Review count and star rating · the profile itself, never the homepage badge
- Years in business · the corporate registry, not the about page
- Client count and repeat rate · the CRM or the payment processor, not the marketing copy
- Team size · LinkedIn company page or the owner, not the "meet the team" grid

**When claim and measurement disagree, record both with both dates** and flag the site copy as needing a fix. Never quietly pick one. This rule alone catches a wrong number on most sites.

### 3. Discover the properties. Never ask the owner to list them.

Owners forget the properties that matter most, the same way they forget media features. Start from the domain and derive the footprint: site footer and header icons, every social account (including a LinkedIn company page separate from the personal one), YouTube, community platforms (Skool, Circle, Discord, Substack, Patreon), review profiles, podcast appearances via Listen Notes and Apple Podcasts, the corporate registry entry, and any second domain they own. Read the list back and ask only "anything missing?"

---

## The connected-accounts pass - runs cold, before the interview

These sources need nothing from the owner and they **shorten the interview**, because half the questions answer themselves. On a real run Fireflies and Drive were both connected and neither was touched, and between them they held a whole revenue line, the real client roster, a price said out loud and 34 proof assets.

Ranked by what they yield: meeting recordings · Google Drive · Search Console · Google Analytics · Stripe or QuickBooks · Calendar · Gmail · Slack · CRM · past Claude Code sessions. Run the relevance gate on everything they return.

### 1. Meeting recordings - the highest-value source there is

Recorded calls are buyer objections in the buyer's own words, timestamped and dated. Nothing else in this playbook comes close for persona work, and on the one live run it was also the biggest miss.

- **Where** - Fireflies, Fathom, Otter, Grain, or plain Zoom cloud recordings
- **How** - list recent transcripts, then search the corpus for objection language: "how much", "how long", "worried", "the last guy", "we tried", "what if", "guarantee", "why is it", "can you just", "my concern"
- **Keep the buyer's words verbatim** with the call date and timestamp
- **Keep the owner's answers too** - explaining the offer out loud is better voice material than anything they have written down

**What 25 recordings actually held on a real run:**

- **A whole revenue line absent from the website and from `business.md`.** The meeting titles were literally "60 Minute Consultation", "2 Hours Consultation", "4 Hours Consultation" - they sell paid consulting by the hour and nothing else said so anywhere
- **The real client roster by industry** - florist, dog training school, bookkeeper, marketing agency, ecommerce brand, art marketplace. That answers "which industries actually convert" with behaviour instead of opinion
- **A price said out loud in a live sales call** - "$3,000 plus an onboarding fee, about 10 hours"
- **Buyer objections in the buyer's own words**

**This is the primary input to `buyers.md`.** The business's own FAQ is one side of a conversation. A transcript is the other side.

**Call history surfaces contradictions the owner will not volunteer.** A person described as gone was running client calls three months ago. **Surface the tension and ask about it.** Never record the answer flat as though there was no conflict - the conflict is the information.

**Tiering:** the owner speaking is tier A. The buyer speaking is tier B, quoted and dated. **Privacy:** no third-party personal data, no credentials, and permission before naming a client.

### 2. Google Drive - find containers, then enumerate. NEVER search for files.

**Tested live, and it changed the answer completely.** A keyword search found 5 video testimonials. Enumerating the folders found 34 assets - 13 videos and 21 screenshots.

The 8 extra videos were named `IMG_2436.mov`, `2025-08-18 12-29-11.mp4`, `Zight Camera Recording 2025-07-24.mp4`. Camera defaults, invisible to any keyword search. The 21 screenshots (`Screenshot 2025-02-04 at 12.22.13 PM.png`) are almost certainly screenshots of written praise, the format this playbook calls the most persuasive proof there is, and not one of them contains a searchable word.

**The rule: media files have no body text to search, and humans do not rename them. A keyword sweep systematically misses exactly the assets that convert best.**

**Step 1 - find the containers**

```
mimeType = 'application/vnd.google-apps.folder' and (title contains 'testimonial' or title contains 'review' or title contains 'case study' or title contains 'client' or title contains 'proof' or title contains 'before' or title contains 'brand' or title contains 'press' or title contains 'photo')
```

**Step 2 - enumerate every folder found, in full**

```
parentId = '<folder id>'
```

Page all the way through it, and recurse into every child folder. **Every folder that matched, not the first one.**

**Step 3 - the keyword hunts, which work because documents have body text**

Written praise:

```
fullText contains 'testimonial' or fullText contains 'case study' or fullText contains 'thank you so much' or fullText contains 'highly recommend' or fullText contains 'saved us'
```

Commercial facts - prices, scope, named clients:

```
title contains 'proposal' or title contains 'contract' or title contains 'agreement' or title contains 'scope' or title contains 'statement of work' or title contains 'pricing'
```

Credentials:

```
title contains 'license' or title contains 'certificate' or title contains 'insurance' or title contains 'accredit' or title contains 'incorporation'
```

Long-form voice:

```
mimeType = 'application/vnd.google-apps.document' and (title contains 'newsletter' or title contains 'script' or title contains 'blog' or title contains 'about us' or title contains 'story')
```

**Step 4 - the media sweeps keywords cannot reach**

```
mimeType contains 'video/' and modifiedTime > '2024-01-01T00:00:00Z'
```

```
title contains 'Screenshot' and mimeType contains 'image/'
```

```
mimeType contains 'image/' and (title contains 'IMG_' or title contains 'DSC' or title contains 'PXL_')
```

**Step 5 - the one nobody thinks of**

```
sharedWithMe = true and (title contains 'testimonial' or title contains 'case study' or title contains 'brand' or title contains 'logo' or title contains 'contract')
```

**Clients share files INTO a Drive.** An `owner='me'` sweep skips them entirely, and they are often the best proof in there because they came from the customer.

**Four gotchas**

- **`fullText` searches title and body, so it returns nothing useful for images and video.** Never rely on it for media
- **Cap and page properly.** The first live query returned 65,000 characters and blew the context limit. Use `excludeContentSnippets: true` for discovery passes and pull snippets only once you know which files matter
- **Do not date-bound the proof hunts.** A 2023 testimonial is still a testimonial. Date-bound only the noisy media sweeps
- **Two folders can have the same name and hold completely different things.** Enumerate every match, never just the first

### 3. Search Console and Analytics - a persona from behaviour, not opinion

Usually connected, almost never used, because nothing asks for them.

- **Search Console** - top queries by clicks, top pages, and queries with high impressions and low clicks. Which queries actually convert is a persona derived from what people did
- **GA4** - top landing pages by sessions, top pages by conversions, conversion paths, city and device split, last 12 months

Top landing pages plus top converting queries outranks any opinion about who the customer is, including the owner's.

### 4. Stripe or QuickBooks - the numbers without the interview

Real client count, average deal size, retention and repeat rate. **This answers "how many clients do you have" and "what is the average job value" without asking**, and it answers them with money rather than memory.

Owner's own business only. Never a customer's card or personal data. Aggregate figures, not a customer list.

### 5. Calendar - meeting titles reveal the offer structure

The hourly consulting line surfaced from nothing but meeting titles. Sweep recurring meetings, client call names, and anything with a duration, a package name or a price in the title. Cross-check against the site's stated services - a service on the calendar but not on the site is either real and unmarketed, or dead. Both are worth knowing.

### 6. Gmail - sent mail is VOICE, received mail is PROOF

**A naive search fails.** A plain inbox search for "thank you" returned about 3 usable signals in 50 threads on a real run, the rest being hotel bookings, invoices, tax returns and influencer spam. Use the queries below and tune the exclusions to the inbox. Four different jobs, run separately.

Voice, what they wrote:

```
from:me newer_than:2y -in:chats -subject:(invoice OR receipt OR quote OR payment OR scheduled)
from:me newer_than:2y -in:chats subject:(how OR why OR update OR "here's")
```

Voice, their own outbound marketing. Longer-form and more deliberate than anything written to a single customer, and frequently where the origin story lives. The classic miss is looking only for "emails I wrote to customers" and skipping the newsletter:

```
from:me to:me subject:(newsletter OR issue OR broadcast OR "this week")
from:(mailchimp.com OR sendgrid.net OR mailerlite.com OR convertkit.com OR leadconnectorhq.com) subject:(campaign OR broadcast OR sent)
```

Proof, what came in:

```
to:me ("thank you" OR amazing OR lifesaver OR "you saved" OR "highly recommend" OR testimonial) -from:noreply -from:no-reply -from:notifications -subject:(invoice OR receipt OR payment OR unsubscribe OR order) -category:promotions -category:social -category:updates
to:me ("would recommend" OR "referred you" OR "sent you" OR "your name came up") -from:noreply -category:promotions
```

Payment and accounting mail - registry-checkable credentials sitting in an inbox. On a real run the legal entity "1532461 B.C. LTD" came out of a payment-processor payout notification:

```
subject:(payout OR remittance OR "payment received" OR "deposit of") -category:promotions
("incorporation number" OR "business number" OR "registered as" OR "legal name" OR LTD OR LLC OR "Inc.") -category:promotions -from:noreply
```

**Report how many threads each query returned and how many were usable**, so a dead query is visible rather than silently treated as an empty inbox.

### 7. Slack, CRM and past sessions

- **Slack** - for anyone with a team, this is where wins get posted and praise gets screenshotted. Search the wins, general and client channels
- **CRM (GHL or equivalent)** - total client count, repeat-customer rate, years of relationship data, review requests answered
- **Support tickets and DMs** where customers say "this is incredible"
- **Past Claude Code sessions** - see the section further down

---

## The rest of the source matrix

### 8. The website's own data payload - what the page does not render

**The JavaScript bundle.** React and Next sites ship the entire dataset to the browser and render a slice of it. On a real run the page showed 9 testimonials and the bundle held 58, and the complete FAQ was in there too, collapsed behind accordions and invisible to every crawler. This one step roughly six-timesed the proof haul.

- Pull the HTML, collect the script sources: `/_next/static/chunks/*.js` (Next), `/assets/*.js` (Vite), `/static/js/*.js` (Create React App)
- Check the HTML itself for a `__NEXT_DATA__` tag or `self.__next_f.push` payloads - often the whole dataset sits there
- Grep the chunks for the data keys: `quote`, `testimonial`, `author`, `review`, `question`, `answer`, `faq`, `price`, `tier`, `plan`, `result`
- **Report both counts:** rendered on the page versus present in the bundle

**Form fields.** Every booking, contact and application form. Record **every dropdown option verbatim**. A revenue dropdown reading "Under $25K / $25K-$50K / $50K-$100K / $100K-$250K / $250K+" is the business stating who it will and will not take, in its own words, in public. Every service business has one and nobody thinks of it as a source. Capture every select option, every required field, every qualifying question, and the submit-button wording.

**How to crawl.** `apify/website-content-crawler` with the crawler set to `playwright:firefox`. Most sites are client-rendered, so curl returns an empty shell and a raw HTTP crawler returns nothing. **Never use WebFetch to extract a fact** - it is a summariser, it returns a paraphrase, and a paraphrase cannot be quoted. WebFetch is only for checking that a page exists.

**Sweep for VIDEO, not just text.** Every embedded player (YouTube, Vimeo, Wistia, Loom, a raw `<video>` tag) and every testimonial block with a video thumbnail. Video testimonials are the highest-converting proof format and they are invisible to a text scrape. Count them explicitly.

### 9. ⛔ Apify - ship only tested actor IDs

**At 5,000 users a wrong actor ID is a silent zero, not an error.** It does not throw, it returns an empty array, and an empty array reads exactly like "this business has no LinkedIn". Only the IDs below have actually been run.

**Verified working:**

- `apify/website-content-crawler` - set the crawler to `playwright:firefox`
- `apify/instagram-scraper` - follower count, bio claims, top posts, before/after photo posts
- `clockworks/tiktok-scraper` - posts, captions and numbers said out loud that never made the website
- `streamers/youtube-scraper` - channel and video data
- `trudax/reddit-scraper-lite` - posts, comments and keyword search, no login. **The buyer-fear source**: reviews are public and polite, calls have the seller listening, Reddit is buyers talking to each other with nothing at stake. Feeds `context/buyers.md`. **Language and fear only, never proof** - it is anonymous, so a number in a comment is not evidence

**Verified broken:**

- `supreme_coder/linkedin-post` returned zero for a live profile and **failed silently**. Do not treat it as the LinkedIn source. Try it if you like, then fall back to the LinkedIn company page and an advanced Google search (`site:linkedin.com/in "[owner name]"`), and **report the zero out loud**

**Wrong ID, now retired:** `agentx/tiktok-transcript` is not what worked. Use `clockworks/tiktok-scraper`.

**Every actor that returns nothing gets a loud line in the report: "LinkedIn - skipped, zero results."** Never a silent pass, never an empty result written up as an absence of proof.

**Ranked additions:**

- **Google Maps reviews - run this FIRST for any local business.** The single highest-value actor for this audience, and on the one live run it never ran at all because that business had no Business Profile. Most local service businesses have 40 to 400 real Google reviews sitting there, which is their entire proof file in one call
- **Google Ads Transparency Center** and **Meta Ad Library** - not for the owner's proof, for their COMPETITORS'. What rivals are running right now, which angles they repeat, which offers they lead with
- **Trustpilot, G2 and Capterra** - B2B and software businesses
- **YouTube TRANSCRIPTS, not just video metadata.** A channel with hundreds of videos is the deepest voice sample that will ever exist for that person. The live run read only titles and left the whole corpus on the floor

### 10. Review platforms - via Apify

- **Multi-platform review scraper** (`conceivable_extension/multi-platform-review-scraper`): Google Maps, Yelp, TripAdvisor, Trustpilot and Facebook from a business URL - rating, text, reviewer, date, sentiment, about $0.002 per review
- Industry platforms by trade: Angi, HomeAdvisor and Houzz (home services) · Healthgrades and Zocdoc (medical) · Avvo (legal) · TheKnot and WeddingWire (events)
- **Why scrape instead of the API:** Google's Places API returns only FIVE reviews. Scraping is the only way to get the full corpus
- **Extract:** exact star rating and exact count per platform · EVERY quote, each tagged speed, price, quality or trust · the phrases customers repeat verbatim, because those become ad copy · reviewer names and locations for attribution · date spread, since recent reviews mean the business is alive

### 11. Checkable credentials - public registries

The gap between "licensed and insured" and "license #58211, active since 2009, verify here" is the gap between a claim and a fact. **Nothing else in this playbook outranks a public record.**

- **Trade licensing boards** - state or provincial contractor, electrical, plumbing, HVAC, gas. Returns licence number, status, original issue date
- **Business registry** - Companies House (UK), Secretary of State (US), provincial corporate registry (CA). Legal name, incorporation date, officers. This is how "established 2011" becomes provable, and it doubles as the identity anchor for the relevance gate
- **Professional bodies** - law society, medical college, CPA body, engineering association
- **Manufacturer and vendor partner directories** - Lennox Premier Dealer, Trex Pro, Google Partner, HubSpot certified. Most trades run a tiered dealer programme with a public locator, and it is both a checkable credential and a recognisable badge
- **BBB profile** - rating, accreditation date, complaint history
- **Extract:** the number, the issue date, the verification URL. Always the URL, because a credential nobody can check is a claim

**These are per-jurisdiction, so there is no universal scraper.** Ask the trade and the location, find the right board, then pull the record or walk the owner to it.

### 12. Press and authority - advanced search and Semrush

- Google: `"[owner name]"`, `"[company]" review`, `"[owner]" interview OR podcast OR featured`. Media features are top-tier E-E-A-T and owners ALWAYS forget them
- Semrush backlinks report: every linking domain is a potential feature, award list or partner mention worth quoting
- "Best [service] in [city]" roundups that already include the business - quote them, link them

### 13. Badges - earned trust marks

- **Platform badges they may already have** - Google Verified (LSA), BBB Accredited seal, Angi Super Service Award, Houzz badges, Yelp ratings, industry association marks
- **Credential badges** - licensed, insured, bonded, with the license NUMBER, plus certifications and years in business
- **Official embeds** - Google has no native review embed. Third-party widgets (EmbedSocial, Taggbox, WiserReview class) connect via the Places API for live badges. For static sites, render the badge from scraped data (count, stars, "on Google") with a link to the profile
- **The earnable list** - badges the business qualifies for but has not claimed. Flag these as 30-minute wins

### 14. Visual proof

- **Real review screenshots** - a screenshot of an actual Google or Facebook review with stars and platform chrome visible reads as undeniably real, and outperforms a styled quote because it looks native rather than designed. This is why the Drive `Screenshot` sweep matters so much
- **Rendered review cards** - take REAL scraped reviews and render branded card images for pages and posts
- **Customer and job photos** - before and afters from Drive, socials, or the owner's phone, catalogued into `proof/images/` with an index entry
- **Video testimonials** - the highest-impact format, and phone quality beats none

### 15. The GBP itself, beyond reviews

- **Customer-uploaded photos** on the profile - real job photos nobody staged, often the only honest visual proof available. Respect attribution rules

**The Q&A section is GONE. Do not look for it.** Google discontinued Business Profile Q&A on 3 November 2025 (API killed the same day, public sections removed from December 2025). It is replaced by **Ask Maps**, which generates answers live from the website, the reviews and the profile fields. Objection research now comes from sales calls and reviews, and the way to influence Ask Maps is to put the answers on the website. See the FAQ seed section in `gbp-setup.md`.

### 16. Authority and scale

- **YouTube channel** - transcripts (spoken numbers that never reached the website), measured subscriber count, praise in comments
- **LinkedIn company page** - verifiable team size, founding year, follower count
- **Podcast indexes** (Listen Notes, Apple Podcasts) - guest appearances owners forget they did
- **Chamber of Commerce and trade association member lists** - membership with a join date
- **Local sponsorship pages** - sports teams, charities, school programmes. Strong support for family-owned and community positioning
- **Glassdoor and Indeed** - team size and culture claims. **Read before quoting**, since this one cuts both ways

### 17. Category-specific

Sweep only where they apply: G2 and Capterra (B2B software) · app store reviews (if they ship an app) · Shopify, Etsy or Amazon storefront reviews (product businesses) · Google Scholar or patents (technical and engineering firms).

### 18. Past Claude Code sessions - numbers said out loud while working

`~/.claude/projects/` holds one folder per project and one `.jsonl` per session. Run `code/mine_transcripts.py` to sweep them.

People state real numbers conversationally while working that they never write down anywhere public. "The client was paying 4K a month before we took over." "We saved them about 60% of their ad spend." None of that is on the website or in a review, and the owner will not mention it in an interview because to him it is just context.

**What to search for:** currency amounts and percentages in any form · result language ("we saved", "went from X to Y", "doubled", "3x") · timelines · counts of subscribers, leads, clients or jobs · month and year references that date a milestone · anything after the phrase "the client".

**⛔ Everything here is UNCONFIRMED until the owner confirms it.** Conversational numbers are frequently estimates, targets or outright hypotheticals. "Say the client is doing 40K a month" is a worked example, and the transcript does not mark the difference. **A hypothetical quoted as a result is inventing proof.**

**⛔ Relevance applies hardest here.** One projects folder holds every business the owner has ever touched, including clients' businesses and side projects. Run the anchors before anything leaves this sweep.

**⛔ Privacy - three hard limits.** Only facts about the owner's OWN business, never a client's or a competitor's numbers · never a credential, key, token or connection string, dropped rather than redacted · never a third party's personal data.

Output goes to a scratch candidate list the owner works through, never straight into `context/proof/`.

### Explicitly NOT sources

- **Court and lien records** - a negative check, not proof, and storing it is a liability
- **Data brokers and people-search sites** - frequently wrong, and citing one is a bad look
- **Anything requiring a number to be inferred, estimated or rounded up**

---

## ⛔ Capture EVERYTHING. Never a curated sample.

**The proof file is an inventory, not a highlight reel.** Every review quote, every number, every credential, every story. Not the best four.

- **A sample gets recycled.** Four quotes across forty pages means the same four quotes on forty pages, and a reader who checks two pages sees the trick immediately
- **The right proof is page-specific.** A speed quote belongs on the emergency page, a price quote on the pricing page. You cannot match proof to a page from a shortlist
- **You cannot know now what a page will need later.** The quote that seems unremarkable today is the exact objection-killer on a page written in three months
- **Volume IS the moat.** Forty real review quotes is a thing a competitor cannot fake. Four is a testimonial section

No top-N, no "the strongest ones", no cutting for length. If the list runs to 200 quotes, it runs to 200 quotes. `output-format.md`'s 10-item cap applies to what is DISPLAYED in a section, never to what is stored.

The only filters are truth and relevance: real, sourced, dated, and belonging to THIS business.

## The integrity line (never cross it)

- **NEVER fabricate.** Fake-screenshot generators exist for LinkedIn posts and review images. Using one is inventing proof: it breaks the never-invent rule, poisons every real claim on the site, and is an FTC violation. Every visual is generated FROM a real scraped review with a live source
- **Provenance on everything.** Every item carries its source and date ("Google review, 2026-03-14, [link]"). Unverifiable means tagged UNCONFIRMED until the owner confirms
- **Never borrow another business's proof.** Including a previous business the same owner ran. It is E-E-A-T for an about page, never a client result for this one
- **Permission for private-channel proof.** Praise from emails, Slack, DMs or a recorded call needs the customer's OK before it goes public. Draft the one-line ask ("Loved this note - mind if we quote you on the site? Happy to use first name only"). Offering anonymity raises yes-rates
- **Platform display rules.** Don't doctor platform chrome, don't cherry-pick a 5.0 impression when the profile shows 4.6. Display the real rating, because the honesty IS the trust signal

## Output spec

Everything lands in the proof inventory (SEO: `context/proof/proof-inventory.md` · Ads: `context/proof.md`) with source and date, images into the images folder with index entries, quote bank tagged by what each quote proves, badge list split into HAVE and EARNABLE, a "permission pending" list for private-channel finds, and a **"relevance unclear" list** for anything the identity anchors could not place.

**Every number carries both values when they disagree:** the site's claim with its date, and the measured value with its date.

**Every source that returned zero is named in the report**, so a broken actor or a dead query is visible instead of reading as an absence of proof.

## Key sources

- [Apify website content crawler](https://apify.com/apify/website-content-crawler) · [Apify multi-platform review scraper](https://apify.com/conceivable_extension/multi-platform-review-scraper/api) · [Scraping Google Maps with Apify 2026](https://use-apify.com/blog/scrape-google-maps-apify-2026)
- [Google Drive search query terms](https://developers.google.com/drive/api/guides/ref-search-terms) · [Gmail search operators](https://support.google.com/mail/answer/7190) · [GA4 reporting dimensions and metrics](https://developers.google.com/analytics/devguides/reporting/data/v1/api-schema)
- [75 social proof statistics 2026](https://provesrc.com/blog/social-proof-statistics/) · [Trust signal statistics](https://www.scalify.ai/blog/website-trust-signal-statistics-what-makes-visitors-stay-2026) · [Trust signals placement framework](https://www.digitalapplied.com/blog/social-proof-trust-signals-2026-conversion-placement-framework)
- [Embed Google reviews free 2026](https://embedsocial.com/blog/embed-google-reviews/) · [Google review badges](https://wiserreview.com/blog/google-review-badges/)
- [Automate testimonial collection](https://senja.io/blog/how-to-automate-testimonial-collection) · [Review-to-social image generation](https://www.feedbackrobot.com/review-visualizers) · [BBB accreditation](https://www.bbb.org/get-accredited) · [Angi Super Service Award](https://www.angi.com/standards/super-service-award.htm)
