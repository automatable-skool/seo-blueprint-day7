---
description: The context layer - discover every property, sweep the site, sweep the connected accounts, then an impact-ordered interview to confirm it. Every other command reads this.
argument-hint: [website url, optional] [focus: discover | anchors | sweep | accounts | drive | calls | reviews | interview | verify | images]
---

Build my context layer: `context/business.md`, `context/proof/proof-inventory.md` and `context/voice.md`. This is the file set every page pulls trust and personality from - the one thing competitors can't copy. Proof is what makes people believe you. Voice is what makes them keep reading. They come from the same sources, so they get built in one pass.

**Focus mode:** name a stage (`/context-layer reviews`, `/context-layer drive`) and run only that part.

**Read `references/proof-signals-playbook.md` and `context/voice.md` (Part 1, the house style) FIRST.** The playbook holds the long-form mechanics this command only names: the full source matrix, the relevance gate, the Google Drive folder-first method with its exact queries, the tested Apify actor IDs, the Gmail query sets, the JavaScript bundle grep targets, and the integrity line. The second sets the entertainment bar and helps find MY specific kind of funny (dry, dad-joke, deadpan, exaggerated) rather than a generic comedian.

**Read `references/output-format.md` before writing any file.** Bullets by default, one item per line, no tables unless the data is genuinely 3-4 short-cell columns.

**The finished shape of everything this command writes is in `references/examples/` - open the matching one before you write it, not after.** `voice-example.md` for `context/voice.md` · `proof-inventory-example.md` for the proof file · `buyers-example.md` for `context/buyers.md`. They are a fictional plumbing business: match the SHAPE, never copy the content.

## What this costs. Say it before you spend it.

This run makes real Apify calls. It is dollars, not free. Give me the estimate and wait for a yes before the first paid call:

- Website crawl, 30 to 60 pages on a headless browser · roughly $0.05 to $0.30
- Review scraper · about $0.002 per review, so 200 reviews is about $0.40
- Google Maps reviews on a local business · usually the biggest single win and still cents
- Instagram, TikTok, YouTube and LinkedIn actors · roughly $0.50 to $2.00 combined
- **Typical total: $1 to $5.** A large site with thousands of reviews can reach $15

Everything else in the sweep (Gmail, Drive, Fireflies, Calendar, Analytics, Search Console, Stripe, Slack, past sessions, Google search) is free. If I have no `APIFY_TOKEN`, say so and walk me through the apify.com signup before quoting anything.

## 1. Discover the properties. Never ask me to list them.

Owners forget the properties that matter most, exactly the way they forget media features. Start from the domain and derive the footprint yourself using the discovery rule in the playbook: footer and header icons, every social, YouTube, community platforms, review profiles, podcast appearances, the corporate registry entry, and any second domain they own.

Name every property found with its URL, say which ones you could not get into, then ask one question: **"Here is everything I found. Anything missing?"**

## 2. ⛔ Identity anchors - set these BEFORE touching a connected account

A Google Drive, a Gmail and a Slack can be twenty years old. Most of what is in them belongs to a previous business, an employer, a side project, a spouse sharing the account, or an agency's clients. **A file in the owner's Drive is not evidence it belongs to this business.** Pulling somebody else's life into the proof file is the single biggest risk in the account sweep, and it is silent - a testimonial from a company that no longer exists reads exactly like a current one.

So before any connected-account query runs, establish the anchors. They are cheap, they take a minute, and they gate everything after them. Take them from `business.md` if they are already there, and ask for whatever is missing:

- **The domain or domains** this business owns
- **The brand name**, plus any former name or trading name
- **The legal entity name** as registered
- **Roughly when the business started** - month and year is enough
- **The key people** - the owner, anyone who has done client work under this brand

Then apply the gate to every candidate fact, from every account, without exception:

- **Does it name this brand, this domain, this entity, or one of these people?** If yes, in scope.
- **Does it fall inside the business's lifetime?** Date-bound by the life of the business, never by an arbitrary window. Something dated before the business existed belongs to a previous company, a side project, or somebody else.
- **Matches none of the anchors?** It is not this business's proof. Do not write it in.

Watch specifically for a previous business or employer · a spouse or family member sharing the account · an agency's clients being read as their own · personal files · old projects that were wound down.

**Anything ambiguous is UNCONFIRMED with the ambiguity named out loud**, never quietly included:

```
"Best contractor we've ever used" · UNCONFIRMED · relevance
> Drive file, dated March 2019, business started 2022
Ask: this testimonial predates the business by two years - is it from your previous company?
```

**Hard rule: proof about a DIFFERENT business the owner ran is not automatically usable here.** It can be excellent E-E-A-T for an about page ("ran a 12-person roofing crew for nine years before starting this") and it is NOT a client result for this company. Say which one it is, every time.

Everything the gate flags gets **grouped together in the read-back** so I can strike the lot in one pass.

## 2b. ⛔ SOURCE PRECEDENCE - the published site wins. Always.

Every fact recorded in `business.md`, `buyers.md` or `proof-inventory.md` carries a source, and sources are not equal. When two sources disagree, this order decides it and it is not negotiable:

1. **The live published website** - pricing, offers, guarantees, service lists, terms. It is public, it is what a customer will hold them to, and it is what Google has indexed.
2. **Other published material** - the Google Business Profile, published social posts, printed collateral, anything a customer can see.
3. **Written private material** - Gmail, Slack, Drive documents, proposals.
4. **Spoken material** - Fireflies transcripts, call recordings, meeting notes.

**A number said on a call NEVER overrides a number published on the site.** A call price is one conversation with one prospect on one day, often a discount, an experiment or a misremembering. The site price is the public commitment. Recording the call number as the truth puts a price on their pages they never agreed to publish.

**⛔ On a conflict, do all three of these:**

1. **Record the higher-precedence value** as the working fact.
2. **Log the conflict explicitly** next to it, with both values, both sources and both dates.
3. **Raise it in the interview as a question.** Never resolve a pricing or promise conflict on your own judgement.

> "Your site FAQ says $9,500 for a sprint. On the Jadore Les Fleurs call on 10 July you quoted $3,000 plus onboarding for about 10 hours. Which is the number you want on your pages - or are they different products?"

**⛔ Never write that two conflicting sources agree.** A real run recorded a $3,000 call price and then asserted "it matches the $3,000 per project line in your website FAQ, so your call price and your page price agree" - reconciling a genuine conflict into a false confirmation. That is worse than recording the wrong number, because the conflict disappears and nobody ever checks it again. If you find yourself writing a sentence explaining why two different figures are really the same figure, stop: you have found a question, not an answer.

**The one exception:** the owner explicitly says the site is out of date. Then their correction wins, you record the date they said it, and you flag the site page that needs updating.

## 2c. ⛔ `context/voice.md` Part 1 is not yours to rewrite.

`voice.md` is written FOR THE OWNER, not for you. It is the one context file they will actually read, so it stays readable: craft, examples, plain language. Never write machine directives into it - no "do not rewrite this section", no precedence rules, no notes to yourself. Those live here.

**Part 1, the house style, is a repo default and is identical for every member.** You do not rebuild it, reword it, tighten it, or regenerate it from their writing. Leave it byte-for-byte as shipped.

**Part 2, their material, is the only part you write.** Their words, their real jokes, their trade language, the phrases customers use in reviews.

**Style comes from Part 1. Material comes from them.** Most owners are not writers, so extracting a style faithfully means faithfully reproducing weak writing. If they have a clear kind of funny - dry, deadpan, dad-joke - match it in Part 2. If they don't, the house style leads rather than flattening to nothing.

**Part 1 changes in exactly two situations:**

1. **The owner explicitly asks.** They say they want it different. Change it, and say what you changed.
2. **The industry override fires - automatic, no permission, no opt-out.** Read `context/business.md`. If the business is in a zero-humour category - funeral and cremation, personal injury, oncology and serious illness, bankruptcy and debt, addiction and recovery, divorce and family law, criminal defence, end-of-life veterinary, mental health crisis, abuse and trauma services - the dial drops to zero whether or not the owner wants humour on. This is not a preference to respect. It is a business the humour would destroy. Set it, say out loud that you set it and why, and do not offer to turn it back on.

Everything else in Part 1 is left exactly where it is.

## 3. The sweep - the website

Website: $ARGUMENTS (ask if not given, plus the owner's name). Run the sources in parallel where possible.

### 3a. Apify first, and WebFetch is banned for facts

**Mandatory first move: `apify/website-content-crawler` with the crawler set to `playwright:firefox`.** Most modern sites are client-rendered, so `curl` returns an empty shell and a raw HTTP crawler returns nothing useful. Firefox renders the page and returns the real text.

**⛔ WebFetch may not be used to extract any fact.** WebFetch is a summariser. Asked for full page text it returns a tidy paraphrase, which is precisely the failure the quote rule below exists to prevent - a paraphrase cannot be quoted, and an unquotable fact cannot be verified. WebFetch is fine for one job only: checking whether a page exists. For anything the owner will read on their own site, use the crawler output.

Crawl homepage, about, services, every service page, pricing, testimonials, FAQ, contact and the blog index. Then:

- **Count the video.** Every embedded player (YouTube, Vimeo, Wistia, Loom, a raw `<video>` tag) and every testimonial section with a video thumbnail. Video testimonials are the highest-converting proof format and they are invisible to a text scrape. Say how many you found.
- **Log the numbers as claims, not facts.** See the measure rule below.

### 3b. The JavaScript bundle - the biggest single proof win

**Mandatory, not optional.** React and Next sites ship the entire data payload to the browser and render a slice of it. On a real run the page displayed 9 testimonials and the bundle contained 58, and the full FAQ was in there too, collapsed behind accordions and invisible to every crawler. This one step roughly six-timesed the proof haul.

Download the script chunks and grep the data arrays out of them - the exact paths, payload keys and grep targets are in the playbook. **Report both numbers out loud: how many render on the page, how many exist in the bundle.** A gap is proof the site is already sitting on and not using.

### 3c. Form fields - qualification criteria hiding in public

Open every booking, contact and application form and record **every dropdown option verbatim**. A revenue dropdown reading "Under $25K / $25K-$50K / $50K-$100K / $100K-$250K / $250K+" is the business stating who it will and will not take, in its own words, on a public page. Every service business has one and nobody thinks of it as a source.

Capture every select option, every required field, every qualifying question and the submit-button wording. This feeds the DON'T list, the buyer segments and the offer section.

### 3d. Socials, press and backlinks - only tested actor IDs

**Use the verified actor list in the playbook and nothing else.** A wrong actor ID does not error, it returns zero, and zero reads exactly like "this business has no LinkedIn". At scale that is a silent hole in every run.

- **Google Maps reviews go FIRST for any local business.** Forty to four hundred real reviews is the entire proof file in one call
- Google Ads Transparency Center and Meta Ad Library for the COMPETITORS' angles, not the owner's proof
- Trustpilot, G2 and Capterra for B2B and software
- **YouTube transcripts, not just titles.** A channel is the deepest voice sample that will ever exist for that person
- Advanced Google searches: `"[owner name]"`, `"[company name]"`, `"[company name]" review`, `"[owner name]" interview OR podcast OR featured`
- Semrush backlinks - every linking domain is a potential feature, award list or partner mention

**Every actor that returns nothing gets a loud line in the report: "LinkedIn - skipped, zero results."** Never a silent pass.

## 4. ⛔ The connected-accounts pass - run it BEFORE the interview

This tier runs cold, needs nothing from the owner, and it **shortens the interview** because half the questions answer themselves. On a real run Fireflies and Drive were both connected and neither was touched, and between them they held a whole revenue line, the real client roster, a price said out loud and 34 proof assets.

Run the relevance gate from section 2 on everything this pass returns. Ranked by what it yields:

### 4a. Meeting recordings - the single biggest miss

Fireflies, Fathom, Otter, Grain, or plain Zoom cloud recordings. **A first-class step, not a footnote.** On a real run, 25 call recordings held:

- **A whole revenue line absent from the website and from `business.md`.** The meeting titles were literally "60 Minute Consultation", "2 Hours Consultation", "4 Hours Consultation" - they sell paid consulting by the hour and nothing said so anywhere else
- **The real client roster by industry** - florist, dog training school, bookkeeper, marketing agency, ecommerce brand, art marketplace. That answers "which industries actually convert" with behaviour instead of opinion
- **A price said out loud in a live sales call** - "$3,000 plus an onboarding fee, about 10 hours"
- **Buyer objections in the buyer's own words**, timestamped and dated

Search the corpus for the objection language listed in the playbook. Keep the **buyer's** words verbatim with the call date, and keep the **owner's** answers too - explaining the offer out loud is better voice material than anything they have written.

**This is the primary input to `context/buyers.md`.** The business's own FAQ is their side of the conversation. The transcripts are the buyer's side.

**Call history also surfaces contradictions the owner will not volunteer** - a person described as gone was running client calls three months ago. **Surface the tension and ask.** Never record the answer flat as though there was no conflict.

Tiering: the owner speaking is tier A, the buyer speaking is tier B. Privacy is the same as any transcript source: no third-party personal data, no credentials, permission before naming a client.

### 4b. Google Drive - find the containers, then enumerate. Never search for files.

**This was tested live and it changed the answer completely.** A keyword search found 5 video testimonials. Enumerating the folders found 34 assets - 13 videos and 21 screenshots.

The 8 extra videos were named `IMG_2436.mov`, `2025-08-18 12-29-11.mp4`, `Zight Camera Recording 2025-07-24.mp4`. Camera defaults, invisible to any keyword search. The 21 screenshots (`Screenshot 2025-02-04 at 12.22.13 PM.png`) are almost certainly screenshots of written praise, which this playbook itself calls the most persuasive proof format, and not one of them contains a searchable word.

**The rule: media files have no body text to search and humans do not rename them, so a keyword sweep systematically misses exactly the assets that convert best.**

So: **find the containers first, enumerate them in full, and only then run keyword hunts** - which do work, because documents genuinely do have body text. The exact queries, the media sweeps keywords cannot reach, the `sharedWithMe` sweep for files clients shared IN, and the four gotchas (no body text on media · cap and page or blow the context limit · never date-bound a proof hunt · two folders can share a name) are all in the playbook. Follow them literally.

### 4c. Search Console and Analytics - a persona from behaviour, not opinion

Both are usually connected and neither gets used, because nothing asks for them. Ask.

- **Search Console** - top queries by clicks, top pages, and queries with high impressions and low clicks. Which queries actually convert is a persona derived from what people did
- **GA4** - top landing pages by sessions, top pages by conversions, conversion paths, city and device split, last 12 months

This outranks any opinion about who the customer is, including the owner's, and it gives the keyword map a real starting point instead of a guess.

### 4d. Payments and books - Stripe or QuickBooks

Real client count, average deal size, retention and repeat rate. **This answers "how many clients do you have" and "what is the average job value" without asking**, and it answers them with money rather than memory. Owner's own business only.

### 4e. Calendar

Meeting titles alone reveal the offer structure, which is exactly how the hourly consulting line surfaced. Sweep recurring meetings, client call names and anything with a duration or a package name in the title.

### 4f. Gmail - run the playbook's literal queries, not "search for thank you"

A naive inbox search returned about 3 usable signals in 50 threads on a real run, the other 47 being hotel bookings, invoices, tax returns and influencer spam. A less patient operator would have concluded the inbox was empty.

Run all four query sets from the playbook, and treat them as four different jobs:

- **Sent mail is VOICE** - `from:me`, how they actually explain things
- **Their own outbound marketing is the BEST voice sample** - the newsletter is longer-form and more deliberate than anything written to a single customer, and it is often where the origin story lives
- **Received mail is PROOF** - praise, referrals, testimonials, with the noise excluded
- **Payment and accounting mail is CREDENTIALS** - the legal entity "1532461 B.C. LTD" came out of a payout notification on a real run, and that is a registry-checkable fact sitting in an inbox

Report how many threads each query returned and how many were usable, so a dead query is visible rather than silent.

### 4g. Slack, CRM and past sessions

- **Slack** - for anyone with a team, this is where wins get posted and praise gets screenshotted
- **CRM (GHL or equivalent)** - client count, repeat-customer rate, review requests answered
- **Past Claude Code sessions** - run `python3 code/mine_transcripts.py`. It reads `~/.claude/projects/*/*.jsonl` and pulls every line where a real number, result, timeline or client outcome was said in passing. People state real figures conversationally while working and never write them down. Everything it returns is UNCONFIRMED until confirmed, because "say the client is doing 40K a month" is a worked example and reads identically to a result. Owner's own business only, never a credential, never a third party's data

### ⛔ MEASURE, never read. Every number on a site is a claim.

On a real run the site said 150,000 subscribers, the community page said 140,000, and the platform's own page said 153,000. **Self-reported numbers on a business's own properties are stale by default** - they were true once and nobody went back.

So **every number found on any owned property is a CLAIM, and the job is to measure it** against the platform's own page or API, the review profile, the corporate registry or the CRM. The full list is in the playbook.

**When claim and measurement disagree, write both with both dates** and flag the site copy as needing a fix. Never quietly pick one. This single rule catches a wrong number on most sites.

### The sweep fills all three layers

`context/business.md` - **this file is thin by default and thin is useless.** Every page ever written reads it. Cover all of it, and where the sweep cannot reach, that becomes an interview question rather than a shrug:

- **The offer** - every service, its real name, its price, what is included, what it is NOT, in the exact words they sell it in
- **Who it is for** - the customer they want more of, and the one they turn down
- **How it is delivered** - the actual steps, the timeline, who does what, what the client has to do
- **Service area** - cities, radius, remote or on-site, and where they will NOT go
- **The DON'T list** - services they don't offer, jobs they refuse, words they refuse to use. This drives the keyword cut list, so a thin DON'T list means a wasteful map
- **Guarantees, terms, payment** - anything a page will need to state
- **The story** - founded when, by whom, why, what changed since
- **The stack** - only what they confirm they run. Never inferred
- **Competitors** - who they lose to and what those people say
- **Every section carries its tier and date.** No dateless facts

`context/proof/proof-inventory.md` - every credential, number, promise, testimonial, media feature.

`context/proof/reviews/` - review quotes found anywhere, catalogued with source.

`context/voice.md` - **the house style already ships filled in.** Do NOT rebuild it from their writing by default. What gets extracted from real writing is MATERIAL, not style: their actual phrases, the jokes they have genuinely made, their trade language, the words customers use in reviews. Those land in the "Your words" section and in `buyers.md`. Numbers and stories go to `proof-inventory.md`.

**Real writing beats self-description every time.** People describe their voice wrong and write it right.

### ⛔ Sources are NOT equal. Tag every fact with its tier.

The single biggest failure of this command is writing a scraped guess in the same confident prose as something the owner said out loud. Every line carries its tier and its date:

- **A · The owner said it.** Highest. Overrides everything below it, always, even if the site still says otherwise.
- **B · The live site says it, today.** Trustworthy for offers, prices and services. Beats anything from a codebase or an older snapshot.
- **C · Scraped from somewhere else** - a repo, socials, a cached page, an old PDF. **Plausible, frequently stale.** Never written as fact. Tag `UNCONFIRMED (C)` and ask.
- **D · Inferred by me.** Never written down at all. See the ban below.

When tiers disagree, the higher one wins and the loser is marked superseded with its date. Never average two sources into a sentence that is true of neither.

### ⛔ NEVER infer these. Ask, or leave the gap visible.

These read completely plausible and are wrong constantly, because they are the details a business changes without updating anything:

- **The tool stack.** Never write "n8n and Make.com for orchestration" or "Notion or Airtable for boards" because a repo mentioned them or because that is what this kind of business usually uses. Ask what they actually run.
- **The delivery model.** "Done-with-you", "done-for-you", "handover", "retainer", "sprint" - these are positioning words with money attached. Use their words, not a category label that seems to fit.
- **Service area and delivery method.** "Delivered remotely across Canada" is a claim about where they will take work. Ask.
- **Team size, seniority, who does the work.**
- **Anything with a number in it.** That belongs to `proof-inventory.md` and its own rules.

If it is not tier A or B, it is a question, not a sentence. **A visible gap is worth more than a confident guess** - the gap gets filled in 20 seconds, the guess ships to a live page and nobody catches it.

### ⛔ Every tier B and C fact carries the EXACT sentence it came from

**No paraphrase without its quote.** Not a summary of the source, not a tidied version - the actual words, plus where they came from:

```
Revenue qualifier · B · live site homepage, 18 Aug 2026
> "Built for service businesses doing $25K+ a month"
```

This is the rule that makes the other rules work, because it makes the two most common failures visible instead of invisible:

**1. Changing WHO a fact is about.** "Built for businesses doing $25K+ a month" describes the CUSTOMER. Recorded as `Revenue: $25,000+/month` it becomes a claim about the BUSINESS. Same words, different subject, completely wrong - and undetectable once the quote is gone. **Never move a fact from one subject to another.** Ask before every single claim: is this about them, their customer, their competitor, or their market? Write the subject down.

**2. Upgrading an observation into a conclusion.** The address is in Vancouver. That is the fact. "Serves anywhere in Canada" and "Vancouver is the only in-person market" are two conclusions drawn from it, and both were invented. **Record what the source says. Never what it implies.** If the implication matters, it is a question: "Your address is Vancouver - what is your actual service area?"

The test before writing any line: **could I point at the exact sentence this came from, and is it about the same subject?** No to either = it is a question, not a fact.

Everything else lands tagged **UNCONFIRMED** with its tier, source and date. Facts only; skip marketing fluff like "best in town". Sources I don't have access to get listed as skipped, not silently dropped.

## 5. Reviews

**Scrape first, paste only as fallback.** With `APIFY_TOKEN` set, run the playbook's review scrapers on the business URL - Google Maps first for any local business, then Yelp, TripAdvisor, Trustpilot and Facebook, at roughly $0.002 per review. This is the only way to get the full Google corpus, since the Places API returns just five. Add the trade-specific platforms from the playbook. **Only if there is no token** (and after offering the free apify.com signup) fall back to asking me to paste my Google reviews from the GBP dashboard, and say plainly that the paste covers Google alone.

**Keep every single one.** Not the best ten, not a representative sample. Four quotes reused across forty pages is a trick a reader spots on the second page, and the right quote is page-specific: speed on the emergency page, price on the pricing page. Volume is the moat.

Save the raw pull to `context/proof/reviews/reviews-raw.md`, then distill into proof-inventory: exact star rating and review count (measured from the profile, not the homepage badge), the phrases customers repeat, and a quote bank of every single one tagged by what it proves - speed, price, quality or trust. Never round anything up. Catalogue any screenshots I drop into `context/proof/reviews/` in `reviews-index.md`.

Reviews feed voice too: the words customers use about me belong in `vocabulary.md`, because those are the words that should appear on the page.

## 6. ⛔ The interview - ordered by impact, no cap, safe to stop anywhere

**There is no question limit.** Capping it was the wrong fix. Getting the right details matters more than getting done fast, and an artificial cap just moves load-bearing facts into the "we'll do it later" pile.

The real failure was never length. It was that a drop-off partway through **silently degraded everything after it** to "unconfirmed" with nobody noticing. So the fix is ordering plus a safe exit:

- **Order by page-blocking impact.** The questions where a wrong answer ships to a live page run FIRST. Everything cheaper runs after, in descending order of what it unblocks.
- **Keep going as long as I am answering.** Do not wrap up early because it feels long.
- **Stopping is safe at any point.** Whatever is unanswered gets written into the file as an open question naming the page it blocks. Nothing silently degrades, nothing gets quietly filled in.

**Say this up front:** roughly how many questions there are, that they run hardest-first, and that I can stop any time without breaking anything. Then count as you go ("4 of about 18") so the shape is visible.

**The connected-accounts pass in section 4 shortens this list.** Anything already answered by a transcript, a payment record or a calendar becomes a confirm, not an open question. Never ask for something you already found.

### The order, hardest-hitting first

1. **The offer and the price.** Every service, its real name, what it costs, what is included, what is not. Every page states this, so a wrong answer is wrong everywhere. Confirm against the site and the call recordings rather than asking open: "The site lists three packages at these prices, and I heard $3,000 plus onboarding on a call in June - which is current?"
2. **Any revenue line the sweep found that the site does not mention.** Hourly consulting, retainers, a second brand. If the calendar or the transcripts show it and the website does not, it is either real and unmarketed, or dead. Both matter.
3. **Service area.** Cities, radius, remote or on-site, and where they will NOT go. This decides every city page in the keyword map.
4. **The DON'T list.** Services they refuse, jobs they turn down, words they will not use. A thin DON'T list means a keyword map full of pages that attract the wrong work.
5. **Is there a real client result?** One or two, as "what · for who · result-with-number · timeframe". Reject any entry missing one of the four parts. No result means every page runs on claims.
6. **The naming rule.** Can a client be named on the site? Can a number be published? Some businesses have an exit, an NDA or a competitor problem that makes a real result unpublishable, and finding that out after forty pages are written is expensive.
7. **Everything the relevance gate flagged**, as one grouped block. Old testimonials, files that predate the business, clients that might be a previous company's.
8. **The team, plus any contradiction the call history surfaced.** How many, who actually does the work - and if someone described as gone was on client calls three months ago, say so and ask. This is on the about page, in the schema, and in every "we" on the site.
9. **The stack.** What they actually run. Never inferred, ever.
10. **The numbers that disagree.** Read back every place the site's claim and the measured value differ, and get the true one: "Your site says 150,000, the platform says 153,000 today - which goes on the page?"
11. **Which industries to lead with**, checked against the real client roster from the transcripts rather than asked cold.
12. **Then the rest, in whatever order the sweep left gaps:** author byline and photo, guarantee wording, warranty terms, licence and insurance numbers, identity claims (family-owned, veteran-owned, since [year]), media features, permission for private-channel praise, the voice dial, favourite jokes.

### How to run it, and these are not suggestions

- **ONE question at a time. Stop. Wait.** Never a numbered list - that gets one reply answering three and the other five silently dropped.
- **Never ask an open question where a confirm will do.** "What tools do you use?" is work for them. "The repo mentions n8n and Make - is that what you actually run?" gets a correction in two seconds instead of an essay.
- **Show the tier when you ask.** "This came off an old codebase, so it may be stale" tells them how hard to look.
- **Every correction is tier A from that moment** and overwrites the sweep. Say what changed and what else it affects: "That changes the service area on 9 city pages."

### Anything unanswered becomes a written open question

Nothing below the top of the list blocks the files being written. Whatever I don't get to goes into the file naming the page it blocks:

```
Author byline · OPEN QUESTION · blocks: author schema on all 14 blog posts
Ask: name, photo, one-line title
```

Then raise them once, as a single follow-up list, after the files exist. If I stop early that is fine - never quietly fill the rest in. The report names how many are outstanding and which pages they block.

### The voice question, if it comes up at all

The house style ships on and is tuned for retention. Asking someone to describe how they write produces a worse answer than the default. So this is one line late in the list, not an early question:

> **"Your content defaults to the house style - entertaining, concrete, never boring, and it dials humour down automatically for industries where it does not belong. Most people leave it. Want to change anything, or use your own writing style instead?"**

Leave it: nothing to write. They name a dial: record just that line. They want their own style: extract it from published long-form only - articles, posts, scripts, broadcast emails, YouTube transcripts, sales call answers. Never from Slack messages or two-line replies.

**What you DO still collect, because it is material and not style:** their trade language and the phrases they actually say · the words they refuse to use · real stories and jokes they have actually told (those go to `proof-inventory.md`, not a voice file).

## 6b. ⛔ The proof skeleton - fill every slot, then ask for the gaps in ONE message.

`context/proof/proof-inventory.md` ships with a named slot for every kind of social proof. **It is a checklist, not a blank page.** Work it top to bottom and mark each slot:

- **FOUND** - the sweep got it. Record it with its source and the date.
- **MISSING** - it probably exists and hasn't been collected. This goes on the ask list.
- **NONE** - it genuinely doesn't exist. A real answer, and it stops the slot being asked about again.

**A slot left blank with no marker means nobody looked, and that is the failure this replaces.** Hoping the interview happens to surface video testimonials is why no site has any.

### ⛔ 6c. The competitor proof audit - run it BEFORE the tick list

**Read `references/competitor-proof-audit.md` and run it against the actual top 3 in the map pack.** Not who the owner thinks the competitors are - the real three for the money keyword in their real city.

This runs first because it changes what you ask for. A slot the competitors all leave empty is not urgent no matter how good it sounds; a slot all three fill and this business does not is the reason they lose the click. **The gap decides the order of everything after it.**

Score every row: **Impact** is fixed in that file, **You** and **Them** get set per client, **Priority = Impact + (Them - You)**. Score what is VISIBLE - sixty testimonials in a folder is a 0, because the buyer cannot see the folder.

**Write the result as a priority-ordered list, biggest gap first**, into `context/proof/proof-inventory.md`. Name the cost and the effort on the top 5, and flag the two or three signals where this business WINS - that is what the copy leads with.

**A gap closable this week outranks a bigger one that takes six months.** Say which is which.

### The full slot list. Every one gets a FIND attempt before it gets an ASK.

**⛔ Never ask for something the sweep can get.** Follower counts, certifications on a LinkedIn profile, press mentions in the backlink data, years in business from the registry record - go and get them, then confirm the number. An owner asked to look up their own subscriber count is being made to do your job.

Work every slot. Find it, or mark it MISSING and ask:

| Slot | Find it here first | Ask only if the sweep is empty |
|---|---|---|
| **Press and media** | Backlinks, the site's "as seen in", YouTube guest spots, podcast directories | "Any podcasts, news, magazines, TV or industry publications? The small ones count and everyone forgets them" |
| **Recognisable brands** | Client roster in Drive/Stripe/CRM, case studies, logo walls | "Any names people would recognise? One-off projects count" - then permission per name |
| **Client company size** | Revenue signals in transcripts, the roster, their own sites | "Were any of them 8-figure ($10M+/yr)? 7-figure? Be specific" - size is proof the buyer reads instantly |
| **Video testimonials** | Drive, YouTube channel, the site's embeds | "Any client videos or Looms, even rough phone ones? Highest-converting asset there is" |
| **Case studies with hard proof** | Drive, Slack, the site | "Before/after screenshots, dashboards, anything you could attach? List each with the numbers" |
| **Best 4-6 results** | Transcripts and the roster - draft them, then confirm | "BUILT [what] for [who], achieving [number] in [timeframe]" - all four parts or it does not go in |
| **Total projects completed** | Roster count, invoice count | "Paid and unpaid, direct clients, side projects - roughly how many?" |
| **Lifetime hours saved** | Per-client results already on file, multiplied out | "Estimates count if you can defend the math out loud" |
| **Lifetime money generated** | Same | "For you or for clients, lifetime" |
| **People helped** | Audience numbers, client end-user counts | "End users reached, customers served" |
| **Years of experience** | Registry date, LinkedIn, the domain's age | Confirm the number, never ask it cold |
| **Certifications and badges** | LinkedIn, the site's footer, partner directories | "Make.com, GoHighLevel, HubSpot, Google Partner, trade bodies, safety tickets" |
| **Licence, insurance, bonding** | The site's legal pages, the registry | "Numbers and insurer" - never inferred |
| **Online following** | Measure every platform directly | Confirm the measured counts, do not ask for them |
| **The 3-5 reliable outcomes** | Transcripts - this is usually said out loud on sales calls | "Framed as the result, not the activity. Not 'I do SEO'. 'I rank clients top 3 for their main keywords in 4-6 months'" |

**Add slots as you go.** If the sweep surfaces a kind of proof this table does not name - an award, a patent, a published dataset, a waitlist - add the row rather than dropping it because there was nowhere to put it.

### ⛔ The ask is TWO CHECKBOX PASSES. Never a sequence of questions.

**This section overrides the "one question at a time" rule above.** That rule is right for confirming facts, where a wrong answer ships to a live page. It is wrong here. These are inventory questions with yes/no answers, and asking fifteen of them in sequence takes an hour and gets abandoned around question six.

**Pass 1 - the tick list. ONE message, every unfound slot, checkboxes, no detail.**

> "I found your reviews, your subscriber count and the registry record - those are done. Here is everything else that makes a page believable. **Tick what you have. No detail yet:**
>
> - [ ] Press, podcasts, news, magazines, TV
> - [ ] Recognisable brand names you've worked with
> - [ ] Clients at 7-figure or 8-figure revenue
> - [ ] Video testimonials or Looms
> - [ ] Case studies with screenshots or dashboards
> - [ ] Certifications or partner badges
> - [ ] Licence, insurance, bonding
> - [ ] Awards
> - [ ] Workspace or team photos
> - [ ] A guarantee you actually honour
> *(...every remaining MISSING slot, no cap)*
>
> Paste it back with x in the boxes, or just list the ones you have. **Anything you leave blank I mark as none and never ask about again.**"

**Pass 2 - now go one at a time, through the ticked boxes ONLY.** The checkbox filter is what makes this affordable: four yeses is four real conversations, and the eleven noes were settled in a single line without ever being asked about.

Say the shape up front so the end is visible: *"Four ticked - I'll take them one at a time, then we're done."* Then work each slot properly:

> **"Press first. Which outlets, and roughly when? Even a small podcast counts."**
>
> *(answer)*
>
> **"Got it. Video testimonials - who's in them? Drop the files in `context/proof/videos/` and I'll cut them into the service pages. Phone quality is fine."**

Depth is the point here. Get the specifics, the permission, and the file - the same slot re-asked in three months is a failure of this pass.

**Rules for both passes:**

- **Never go one-at-a-time on an unticked slot.** That is the hour this structure exists to save.
- **A blank in Pass 1 is a real answer.** NONE is recorded and never asked again on any future run.
- **One reminder, once, in the final report.** Everything still outstanding goes in a single list with the page it blocks. Never nag mid-run.

Fifteen slots become one message plus four short conversations.

### ⛔ "Yes, that exists" is not the end of the slot. Get the file.

The failure this prevents: an owner says yes to video testimonials, it gets recorded as FOUND, and eleven months later no page has a video on it because nobody ever asked for the file.

**Anything that exists as an asset gets collected in the same breath, with the destination named:**

> "Perfect - drop the video files in `context/proof/videos/` and I'll cut them into the service pages. Phone quality is fine."

- **Asset slots:** video testimonials, case study screenshots, dashboards, logos, certificates, licence documents, press screenshots, workspace photos.
- **⛔ Press and brand mentions mean GO GET THE LOGO.** A podcast, a publication, a TV spot, a recognisable client - the sentence "featured on X" is worth a fraction of the logo, because a logo is recognised before it is read and a line of text has to be believed. Name the file and where it goes, in the same message: *"Grab the podcast's logo - right-click their site header or their podcast artwork, save it into `context/proof/logos/`, and I'll build the as-seen-in strip."* Ask for the episode or article URL alongside it, because an unlinkable claim gets scored down and eventually challenged.
- **Record the state honestly.** `FOUND` means the file is on disk. **`CONFIRMED - AWAITING UPLOAD` is its own state** and it goes on the outstanding list with the page it blocks, never as FOUND.
- **Chase it once, in the final report.** One line naming what was promised and where it goes. Never silently let it slide.
- **Permission is part of collection.** A logo or a client name without a yes on record is `PERMISSION PENDING`, and that slot stays unusable until it changes. Say who needs asking and in what order - the biggest name first.

**Rules for what comes back:**

- ### ⛔ The numbers every business already has. These are never NONE.

Most slots can legitimately come back empty - no press, no awards, no video. **This group cannot.** Every business that has traded for a day has these, they cost nothing to collect, and they are usually the only hard numbers on a page that has no reviews yet:

- **Years in business** · from the registry date, the domain age, or the first invoice. Confirm the number, never ask it cold.
- **Jobs, projects or clients completed** · lifetime. Count the invoices, the roster, the calendar, the CRM. Paid and unpaid both count.
- **Customers served** · distinct people, if it differs from job count.
- **Hours saved, money generated, people reached** · whatever the service actually produces, totalled.
- **Cities, suburbs or regions served** · a countable that doubles as local proof.
- **Team size** · people who touch the work.

**These never come back blank.** If the sweep cannot compute one, it goes on the tick list as a fill-in-the-number, not a yes/no - the answer is always a number, the only question is which.

**Rules:**

- **Estimates are fine if the owner can defend the math out loud.** "Roughly 40 a month for 6 years" is a real answer. Write down the reasoning next to the number so nobody has to reconstruct it later.
- **Round DOWN, always.** 512 becomes "500+". An overstated countable is the easiest claim in the world for a competitor or a customer to challenge.
- **Date every one of them.** They compound - 500 jobs becomes 800 - and an undated countable silently rots into an understatement.
- **The weak-proof threshold still applies.** "12 jobs completed" hurts. Same fix: withhold the number, keep the fact, HOLD with the threshold that flips it.

They are the cheapest credibility on the page and the most commonly left off entirely.

### ⛔ Weak proof costs more than no proof. Say so out loud.

Not everything that comes back should go on a page. Proof below a threshold actively lowers trust, because the buyer reads it as *this is the best they had*. **An empty space says nothing. A weak signal says something bad.**

Score every returned item and tell the owner plainly when it hurts:

- **No-name logos.** An as-seen-in strip full of outlets nobody has heard of reads as padding and drags the recognisable one down with it. **One real name alone beats one real name plus five fillers.** If nothing is recognisable, the honest move is a specific line - "featured on the [Trade] Podcast, March 2026" - not a logo wall.
- **Numbers that undersell.** 3 reviews, 40 followers, 2 projects, "saved a client $400". Publishing these tells the buyer the scale is small. **Withhold the number, keep the fact:** "trusted by home services operators across Metro Vancouver" beats "4 clients". Never fake it, just do not volunteer the weak version.
- **Ratings below ~4.0**, or a perfect 5.0 from a handful of reviews. Both hurt. The second reads as fake.
- **Stale proof.** An award or press mention with no year, or from more than about three years ago, reads as decline the moment somebody checks. Date it or drop it.
- **Anonymous testimonials.** "J.S., business owner" converts close to zero and costs credibility on the ones next to it. Named with a photo, or hold it back until permission exists.
- **Certifications the buyer has never heard of.** Remember the 3-5 badge ceiling - a wall of unrecognised badges measurably reduces credibility.

**How to say it, in one line, without arguing:** *"You have 3 Google reviews. Putting that on the page hurts more than leaving it off - it is the first thing the review machine fixes. Leaving it out until we're past 20."*

**Record the decision, do not delete the fact.** Mark it `HOLD - too weak to publish` with the threshold that would flip it ("publish once past 20 reviews"). That way it gets revisited when it becomes an asset, instead of being rediscovered and re-argued next run. Anything permanently unusable goes to NEVER SAY with the reason.

**A result without a number and a timeframe does not go in.** Send it back and ask for the missing part rather than recording a soft version.
- **Lifetime totals can be estimates** - projects done, hours saved, money generated, people helped - as long as the owner can defend the math out loud. Round down, always.
- **Never invent a slot's contents to fill it in.** MISSING is a fine state for a file to be in. A fabricated testimonial is not.
- **Anything unusable goes to NEVER SAY** with the reason, so it never resurfaces.

## 7. ⛔ The read-back - every claim next to its source, before anything is locked

**The last defence, and the cheapest.** Every wrong fact so far has been wrong in a way that takes the owner two seconds to spot and takes a machine forever, because the machine has no idea what is true about a business it has never seen.

Read back **every tier B and C claim, one per line, as the claim next to the quote it came from**, grouped by topic:

```
Your revenue is $25,000+/month
  from: "Built for service businesses doing $25K+ a month" - homepage
```

Written like that, "that's my customer, not me" is instant. Written as `Revenue: $25,000+/month` it is invisible.

**Rules for the read-back:**
- **Claims that were inferred rather than quoted go FIRST, flagged**, because they are where the errors live: *"I could not find a source for these - I worked them out. Check them hardest."*
- **Everything the relevance gate flagged goes in its own group**, so a whole previous business can be struck in one pass: *"These came out of your connected accounts and I could not tie them to this business. Strike anything that isn't yours."*
- **Never skip a claim because it seems obvious.** Service area, delivery model and tooling read as obvious and are wrong constantly.
- **Corrections become tier A immediately** and overwrite the source. Say what changed and what else it affects.
- **Nothing is written to the final files until this pass is done.** No partial locking, no "I'll fix the rest later."

## 8. ⛔ Verification pass - this one FAILS the run

The command has always mandated a quote on every tier B and C line, and nothing has ever checked it. Now something does. After the files are written and before you report anything, walk every line in `business.md` and `proof-inventory.md` and check:

- Every tier B or C line has an attached quote and a source and a date
- Every tier A line names the interview or call it came from
- No line is tier D
- Every number is either measured or explicitly labelled as the site's claim
- Every fact pulled from a connected account passes the relevance gate, or carries the ambiguity named
- No open question is missing the page it blocks

**If any check fails, the run FAILS.** Do not report success. Print the failing lines, fix them or convert them into open questions, and run the check again. A file that passes silently is the only acceptable outcome, and "mostly fine" is the state that ships a wrong fact.

Report the counts: lines checked, lines by tier, quotes attached, relevance-flagged items, open questions outstanding, and any source that returned zero.

## 9. Lock it

- Write the voice file as instructions to a writer ("write like this, never like this") with real examples embedded
- Add the NEVER SAY section to proof-inventory: unprovable superlatives, competitor names, regulated claims for the trade (ask whether the industry has ad rules)
- Put the three rules at the top, remove every UNCONFIRMED tag that got confirmed
- Show me every file so I can check that each line is real

## 10. ⛔ The author - name, title, photo. Ask for all three, every run.

**Blog posts cannot ship without this**, so it is not an interview item to reach if there is time - it is a required ask. Every post carries an author box and Person schema, and E-E-A-T is the whole reason: Google wants a named human behind the advice, and a post bylined by a logo is a post written by nobody. On a previous run this sat as item 12 of an uncapped interview, never got reached, and blocked the author schema on all 14 posts.

Ask it as one question:

> **"Blog posts need a real byline - Google wants a named human behind the advice, not a company. Three things: your name as you want it published, your title, and a photo of you. A phone selfie against a plain wall is genuinely fine, and it beats a logo every time."**

Record in `context/business.md` under `## Author`:

```
Name:    Dana Whitfield
Title:   Master plumber, owner        <- their real credential, not "Content Team"
Photo:   context/proof/images/dana-whitfield-headshot.jpg
Bio:     One sentence, from proof-inventory. "Licensed 18 years, 4,000+ callouts."
```

**No photo yet?** Record the name and title anyway, log the missing headshot in `images-index.md`, and say plainly that posts will ship with a text byline until it arrives. **Never invent a person, never byline a post to the company name, and never use a stock headshot for a real author** - a stock face attached to a real name is a fabricated person on a live site.

## 11. Photos - ASK for them. Never wait to be handed some.

**Run the Drive enumeration in 4b before asking.** On a real run it turned up 13 videos and 21 screenshots the owner had forgotten existed, so ask about the gap rather than asking from zero.

Nobody volunteers photos, and a site with no real images looks like a template no matter how good the copy is. "Send me some photos" gets nothing, so ask for a **named list** - people hand over what they can picture:

> **"Anything you've already got on your phone beats every stock photo on the internet. Send me whatever exists of these:**
> **· The team** - a group shot, or headshots of whoever meets customers
> **· You** - one clean shot, for the blog byline
> **· The van, truck, storefront or office** - proves you're real
> **· Work in progress** - someone actually doing the job
> **· Before and after** - any two shots of the same job, even from different phones
> **· Finished work** - the results you're proudest of
> **· Equipment, tools, the shop** - texture shots that fill a page
>
> **Phone quality is genuinely fine. Polished stock reads as fake and everybody can tell. Dump whatever you have in a folder and I'll sort, name and place them."**

**Ask for more than the site needs today.** A page needs three photographs; a member who sends thirty never gets asked again, and `/service-page`, `/blog-post`, `/gbp-posts` and `/scale-map` all draw from the same library for months. Running out of photos in week three is what sends a site back to stock.

Take one of three paths, and say which one out loud:

- **They have photos** - into `context/proof/images/`, renamed descriptively, logged in `images-index.md` with what it shows and where it goes
- **They will get photos later** - record exactly which shots are outstanding in `images-index.md` and continue on stock
- **They have none and won't take any** - a legitimate answer that needs a real fallback, not a stalled build. Say plainly that real photos outperform stock, then source stock properly: pick per page, download into `context/proof/images/` with a descriptive name, never hotlink, log it tagged `stock`

**Never leave `images-index.md` empty with no explanation.** An empty index must say which path was chosen and what happens next.
