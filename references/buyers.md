# Deriving buyers - the spec behind context/buyers.md

Read this before writing or updating `context/buyers.md`.
Buyers are DERIVED from sources that already exist. They are never researched from scratch and never invented.

## The three sources, and nothing else

**Sales call recordings give you the fears, and they come first.** Read the call transcripts collected by `/context-layer` (Fireflies, Gong, Fathom, Otter). Every objection a buyer raised on a call, in the buyer's own words, with the call date. This is the primary input to this file.

Why it outranks everything else: a fear taken from the business's own FAQ is the business guessing at the objection. A fear taken from a call is the buyer saying it. If a transcript exists and this file was written without it, the file is wrong and needs rebuilding.

If no calls are recorded, say so in the file rather than filling the gap silently, and fall back to the two sources below.

**`keyword-map.md` gives you the segments.** The intent clusters ARE the buyer types. Emergency terms, cost and price terms, comparison terms, and city terms are not four keyword groups - they are four different people typing on four different days.

- Emergency and "near me" terms · someone with a problem right now
- Cost, price and "how much" terms · someone comparing before they commit
- Comparison and "vs" terms · someone choosing between options
- City terms · the same buyer somewhere else, not a new buyer (see the city rule below)
- Volume-signal terms - "contract", "invoice", "per property", "commercial" · someone buying repeatedly

**Reviews give you the language.** Read `context/proof/reviews/reviews-index.md` and pull the phrases customers actually repeat. If four reviews say "showed up when he said he would", that is a fear and it is written in their words. Never paraphrase a review into marketing language, and never write a fear no review or keyword supports.

**Reddit gives you the fears nobody says to your face.** Reviews are written by people who already bought and are being polite in public. Calls are recorded with the seller listening. Reddit is the buyer talking to other buyers with nothing at stake, and it is the only place the actual objection appears in full: *"is $2,000 a month for SEO a ripoff"*, *"what did you actually pay for a reroof"*, *"my agency did nothing for six months and I couldn't tell"*. **This is where the unspoken objection lives** - the one that kills deals without ever being raised.

Scrape it with `trudax/reddit-scraper-lite` (posts + comments, search term, no login). Run one search per angle:

- `"[service] cost"` and `"how much did you pay [service]"` - real price expectations, which are usually far off what the business assumes
- `"[service] worth it"` and `"is [service] a scam"` - the buying objection, stated plainly
- `"hiring a [trade]"` / `"choosing a [service provider]"` - the decision criteria in their own words
- `r/[city]` plus the service - local recommendation threads, and who gets named
- Trade and industry subreddits - what practitioners say about their own customers, which is where the real qualification criteria hide

**Keep it verbatim, with the thread link and the date.** A paraphrased Reddit comment is worth nothing; the exact wording is the entire value, because that wording is what goes on the page and into the ads.

**Two rules.** Reddit is anonymous, so it is a **language and fear source, never a proof source** - a number in a Reddit comment is not evidence and never gets quoted as one. And check the date: a pricing thread from 2021 will actively mislead.

## The rules

**Three to five buyers. Five is the ceiling.** More than five means every page is written for a fraction of a person and nobody is spoken to directly. If you have found seven, two pairs of them are the same buyer with different wording - merge them.

**Every buyer maps to at least one real page in `keyword-map.md`, by number.** No page, no buyer. A buyer with no page is a daydream: an interesting description of someone the site will never reach. Delete it, or say plainly that the map needs a page for them and let the owner decide.

**The same service can have two buyers with opposite fears - and that is the most useful split in the whole file.** Emergency drain clearing and planned drain replacement are the same trade doing the same work, but one buyer is terrified nobody will answer and price-blind, and the other is terrified of being overcharged and has three quotes open in other tabs. A page written for both reassures neither. When you find a service where the fear inverts, split it. This is the split that changes what the pages actually say.

**Never invent demographics nobody asked for.** No age, no income, no name, no "Sarah is a 34-year-old mum of two who values convenience". That is avatar theatre - it feels like research, it is fiction, and it changes not one line of the page. The only things that go in a buyer block are things pulled from a keyword or a review.

**Fears and choose-reasons must be actionable.** The test is the same one in `output-format.md`: would the page say something different because of this line? "Worried about hidden costs" changes the page - it means a fixed-quote line goes above the fold. "Values quality" changes nothing. Cut it.

**City terms are a modifier, not a buyer.** "Emergency plumber Etobicoke" and "emergency plumber Scarborough" are the same buyer in two places. They become two pages under one buyer, never two buyers. The exception is a genuinely different market - a downtown condo block versus rural acreage - where the fear itself changes.

## When the map only supports one buyer

Say so, write the one, and stop. Do not pad to three.

A single-service business serving one intent honestly has one buyer, and one buyer written properly beats three where two are guesses. Then say which is true:

- **The map is thin.** Run `/keyword-research expand` - the second and third buyers are usually sitting in the cost terms and the commercial terms nobody mapped yet.
- **The business is genuinely one buyer.** Fine. Note it in the file so the next run does not keep trying to invent a second.

## Keeping it current

Re-derive after any `/keyword-research expand` run - new clusters can reveal a buyer the first pass could not see. Re-read the reviews after a `/review-generator` batch, since new reviews are new language. A buyer block is a claim about real people, so it carries the same rule as everything in `context/proof/` - if you cannot point at the keyword or the review it came from, it does not go in.

## Verticals in the map ARE separate buyers

If the keyword map has pages for lawyers, plumbers, dentists, SaaS and ecommerce, that is not one buyer with five landing pages. **A law firm buying SEO and a plumber buying SEO are different people** - different fears, different budgets, different words, different proof.

Read the map's service and vertical pages before writing this file and ask, per vertical: does this buyer fear something different, use different language, or need different proof? Yes to any of the three means a separate buyer block.

**One buyer in a map with seven verticals means the file was not derived, it was assumed.** Two is the floor for any business selling to more than one industry.

**Not everyone in the file is a buyer.** Someone who joins a free community, reads the blog or cannot afford the offer is an audience, not a buyer. Keep them in "the people you turn away" so the pages know who to repel, and never count them toward the 3-5.
