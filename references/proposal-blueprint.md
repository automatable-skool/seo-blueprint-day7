# Proposal blueprint

The spec behind `/proposal`. This is not a draft generator. What comes out is a **finished proposal a member sends to a paying client the same hour**, on their own domain, in their own brand.

The bar: if any section still has a placeholder, a `[TBD]`, a bare metric with no consequence attached, or a number that isn't in `context/proof/proof-inventory.md`, it is not finished. Ask the user for the missing piece instead of shipping a gap.

---

## Where it lives

The proposal is a page on the member's OWN site (the one `/build-website` made), not a PDF and not a file on their desktop. They send a link.

| Path | What it is | Built when |
|------|-----------|-----------|
| `website/app/proposal/[slug]/page.tsx` | The renderer | First run only |
| `website/components/proposal/` | The 7 section components + the close | First run only |
| `website/content/proposals/<client-slug>.ts` | One client's data | Every run |

First run builds the chassis and the first client. Every run after writes a data file only, so proposal number two takes about four minutes.

**noindex is mandatory.** Client proposals must never land in Google. Every proposal page exports `robots: { index: false, follow: false }` in its metadata, the `/proposal` tree is excluded from `app/sitemap.ts`, and `app/robots.ts` gets a `Disallow: /proposal/`. Check all three on every run - a member who leaks one client's pricing to another client loses both.

---

## The seven sections. Nothing else.

The order IS the sales argument: score + money lost → the findings → timeline → price → proof → FAQ → one click. **No other section exists.** No "what we'd do" (the timeline is the plan), no "what's not included", no access checklist, no methodology, no evidence appendix. This is a conversion tool, not a DIY guide - the reader should finish wanting the call, not understanding SEO. Every section a buyer would scroll past without feeling something is a section that shouldn't have shipped.

Sections are numbered 01 to 07 and every one has a kicker, a title, and a one-line lead.

**01 · The scorecard.** Four pillars scored **1-100** plus one overall number. Local client: Visibility, Local, Content, Technical. Remote/international client: there IS no Local pillar - substitute **AI visibility** (is the client cited in the AI Overview for its money terms, does the AI answer cite a competitor, are the labels/llms.txt present, AI-assistant sessions in their stats). **Always four boxes - stretch or substitute, never three.** The overall renders as one big ring (the biggest element on screen); the four pillars as ring meters in ONE row on desktop (`repeat(4,1fr)`, 2x2 on phones), coloured by band: under 40 red, 40-69 amber, 70+ green. A one-line reason under each. **Never letter grades** - a 34/100 hurts in a way a "D" doesn't, and it makes the leader's 78 a measurable gap instead of an adjective. No prose above it.

**02 · What this is costing you.** The money section, and the most important one in the document. Missed leads per month, the dollar value of the traffic gap, and months-to-parity at current pace. Derived, never guessed: `(competitor's monthly organic traffic - theirs) x their conversion rate x their average job value`. If the member does not know the client's average job value or close rate, ASK. Never assume an industry average and never ship this section on invented inputs.

**Layout: ONE compact card, about a third of a screen.** The monthly number big and solid-accent on the left; beside it the arithmetic as a SMALL ICON LIST - one factor per row (Lucide icon, bold value, short plain label, × at the row end, then an = row with the total). Never a long mono formula line. Months-to-parity is one sentence inside the card; one muted footnote line names every source.

**03 · The findings.** One section, two jobs: the competitor gap table, then the three to five findings that hurt most. For each competitor: review count, estimated monthly organic traffic, and the one or two numbers that make the gap read at a glance - one column is theirs. Findings are written as consequences, not diagnostics: one line each, a number and what it costs them. Technical evidence (Core Web Vitals, crawl errors, schema) earns at most three rows, and only where a row carries a consequence - the buyer needs one table strong enough to justify the spend to a partner, not an appendix.

**⛔ Competitors are selected by LOCATION + SERVICES OFFERED, never by company name.** Same rules as the Automatable proposal builder: a competitor sells the SAME service to the SAME customers in the SAME city or service area - a company in the wrong city or selling an adjacent service is not a competitor, however recognizable the name. Discovery order: the map pack for their service in their city → keyword-overlap from live SERP data → only then nomination by inference, constrained to same-service-same-area-similar-size (never banks, aggregators, marketplaces, or news sites). Every nominated name gets VERIFIED against real data (SERP presence, a real Places listing, traffic history) before it can appear; unverifiable names are dropped, never shown. A competitor named from memory is banned.

Show the gap. Never show the playbook. Specific target keywords, the cluster map, and the content calendar are the deliverable the client is buying - they do not appear anywhere in the proposal. A proposal that hands over the plan gets shopped to a cheaper freelancer.

**The metric rule, everywhere in 01-03:** no bare number ever ships. Every metric carries a consequence clause with a rank or a dollar in it. "DA 34" is banned. "Domain rank 34 against the leader's 61, which is why you sit on page three for your six highest-value terms" ships.

**04 · Timeline.** The plan and the schedule are one section - each phase is a row with a date and a thing the client will be able to see, written as work landing, not features. Week by week for month one, then monthly. SEO is slow and pretending otherwise creates a refund in month three, so the timeline states plainly where results start showing (typically months 3-6) while listing what lands immediately. Never mention a `/command` name - the client is buying an outcome and has no idea this repo exists.

**05 · Investment.** Pulled from `context/business.md`. Up to three options, recommended one marked - accent border + badge, 46px prices, includes as check-in-tinted-circle rows. Each shows what's included, the price, and the term. If `context/business.md` is still empty, stop and walk the member through filling it before writing anything else - a proposal with a blank price is not a proposal.

**06 · Proof.** Case studies and review quotes, sourced only from `context/proof/proof-inventory.md`. Cards: headshot, name/business, the result as a big solid-accent number, a detail line, a VERBATIM quote from the proof file, and the video thumbnail with play overlay. Equal-height flex columns with the video pinned to the bottom (`marginTop: auto`) so rows start and end level. If the member has no case studies yet, this section becomes their credentials and their process guarantee instead. Never invent a result and never ship a fake logo wall.

**07 · FAQ.** Six to eight questions that kill the real objections: how long until results, what happens if I cancel, do I own the work, why not just run ads, what if I already tried SEO, who actually does the work. Answers are short and direct, in a two-column grid. Scope questions and access questions live here as single answers if they come up in real objections - they never get their own sections.

**The close.** Directly under the FAQ: one action. A solid accent button (no gradient) - a booking link or a signature block, never both and never a list of options. Above it, a single sentence restating the cost of doing nothing from section 02; under it, the expiry line.

---

## The visual evidence layer

A wall of white text loses to a chart of the same fact every time. Every exhibit renders the REAL data step 3 pulled. **The hard rule: a visual that can't be backed by pulled data degrades to nothing - never to a decorative fake.** A made-up graph in a sales document is fabricated proof in a suit. One sanctioned exception: a **labelled demo exhibit** - real data pulled for another market, under a caution alert saying exactly what it is - for a member whose own business can't produce that exhibit and wants the client to see the format. Real data, honest label, never passed off.

**Section 03 is a two-column layout.** LEFT: the gap table → per-metric warning boxes → the visibility chart → the geo grid (local clients only) → the findings list. RIGHT, sticky: the Google-look exhibits as white "screenshots" - the SERP render, then the GBP panel.

- **The gap table.** `tableLayout: fixed`, NO horizontal scroll, short plain headers: Reviews · Visitors/mo · Searches ranked · Links from other sites. Winner row: green background + inline Crown icon on the same line as the domain (inline-flex, nowrap). Client row: accent tint.
- **Warning boxes.** Every metric where the client trails gets a design-kit alert - tinted background, coloured left edge, icon, one consequence sentence.
- **The visibility chart.** Trend lines of visitors from Google, client vs the three competitors, from the history pull. Inline SVG, endpoints labelled with name + number - **labels never overlap: stagger or leader-line them.**
- **The SERP render - it must ACTUALLY look like Google.** Search pill with magnifier, real per-domain favicons (Google's s2 favicon service), grey breadcrumb lines verbatim from the pull ("310+ comments · 2 years ago"), blue `#1a0dab` titles in Arial, real snippets - and the REAL AI Overview text in its own box at the top (the advanced SERP pull returns it plus its cited sources; an AI answer citing a competitor is a headline finding). Client absent: a red band - "you are not in the top N". A position is never invented or reordered.
- **The GBP exhibit - a faithful knowledge panel + audit, one card.** Top: a real map strip of the location with a red Google-style pin, OSM attribution. Then name, rating + yellow stars, "N Google reviews" link, category/city line, Website/Directions/Call round buttons, their real description. Below, in the same card, "Profile audit": ✓/!/✕ rows (green/amber/red) for Claimed, Address, Phone, Website, Hours, Photos count, Reviews, Description length, Additional categories, Attributes, Q&A. Source: DataForSEO `business_data/google/my_business_info/live` (works by `cid:` from the SERP knowledge graph). **There is NO DataForSEO posts endpoint** (`my_business_updates` 404s) - the audit says posts couldn't be checked, never guesses. **Never render a ghost/empty GBP panel for the client** - "no profile" reads as filler in an empty card; the review warning box and the audit carry that argument.
- **The geo grid** (replaces any "map pack" exhibit). LocalFalcon-style 5x5: 25 GPS points ~2km apart, each a live DataForSEO `serp/google/maps` query - **the live maps endpoint takes ONE task per request: loop, never batch.** Match the business by name-containment. Badges: green rank ≤3, amber 4-10, red × absent. Header "X/25 in the top 3 · Y invisible", legend, plain-words footnote. Badges render over a REAL map of the city: stitch OpenStreetMap tiles at pull time (keyless; mute saturation ~0.55; save to `public/images/proposal/`; frame = grid extent +25% so points land at 10-90%; "© OpenStreetMap contributors" label). Google Static Maps needs a key the member won't have - OSM is the default. Cap the rendered map at ~440px, centered.
- **Remote/international clients:** the geo grid AND GBP sections are null and don't render at all - no headings, no empty shells. The chassis keeps full support; the data file decides.

**Implementation:** exhibits are components in `website/components/proposal/` rendering inline SVG/HTML from the client's data file - no chart library, no key-gated map embeds (OSM tiles are stitched to local images at pull time). If the data behind an exhibit failed to pull, the component renders nothing and the section says plainly which number is missing and what it would take to get it.

---

## Design - light, branded, no gradients

- **LIGHT theme only**, matching the member's site kit. Never a dark page, never gradients on text or boxes. Big numbers are solid accent from the member's ramp, never gradient-clipped.
- Page container 1152px. **Hero:** centered, off-white band (the site's warm neutral) with a hairline bottom border and a faint masked grid texture - NO radial glow. A thin bar above it: "[member name] · Proposal · Confidential". The hero carries the client favicon, a gradient-free headline, the lead, then four stat pills (Score X/100 · Losing $X/mo · Build N weeks · Valid until [date]) and the prepared-by line.
- Sections alternate white / off-white full-bleed bands. Every section: tracked uppercase kicker with one Lucide icon (`npm install lucide-react` at chassis build - part of the chassis, never per-proposal), big H2, one-line lead.
- Cards: white, hairline border, 18px radius, soft shadow. Recommended/premium cards get a solid accent border - no glow ring.

## The jargon ban

Plain words a 10-year-old gets, across the whole document. Numbers stay exact; only the words simplify.

| Banned | Say instead |
|--------|-------------|
| sitemap 404 | "the map your site hands Google is broken" |
| structured data / schema | "the labels that tell Google and AI tools what each page is about" |
| referring domains | "other websites linking to you" |
| organic traffic | "visitors from Google" |
| keywords ranking | "searches you show up for" |
| conversions | "your stats tool counted zero of them" |
| Core Web Vitals / Lighthouse | "speed test" |
| Search Console | "Google's reports for your site" |
| DataForSEO / Semrush | "live search data" |
| 3-pack | "top 3" |

---

## Data sources

Free tier first, always. The member must be able to run their first proposal without paying anything.

| Source | What it gives | Cost |
|--------|--------------|------|
| Their website (direct fetch) | Pages, titles, meta, schema, internal links | Free |
| PageSpeed Insights API | Core Web Vitals, performance scores | Free |
| DataForSEO | SERP positions, volumes, backlinks, domain rank, local pack, on-page | $1 signup credit, then paid |
| Apify | Google Business Profile, reviews, competitor scrape | $5/mo free credit |

**The DataForSEO cost guard.** Signup gives $1 in credit, and a standard SERP query costs about $0.0006 - but the endpoints are wildly uneven: **`historical_rank_overview` costs ~$0.135 PER DOMAIN, so a 4-domain visibility chart is ~54% of the free credit in one run.** Warn BEFORE the history pulls specifically, not just at 200 queries. Reference costs: full proposal refresh ≈ $0.70 · the 25-point maps scan ≈ $0.05 · `my_business_info` ≈ $0.005. The top-up minimum after the $1 credit is **$50, not $5**. Track cumulative spend in `## My setup` in CLAUDE.md after every run, so nobody discovers the $50 wall halfway through building a client proposal.

**Semrush substitution:** if the member already has Semrush connected, use it as the source instead of walking them through DataForSEO signup - the free-on-day-one rule is about cost, and theirs is already paid. Say the substitution in one line.

**When a source fails:** degrade, never fabricate. A missing backlink profile means section 04 loses a row and says so. It never means an estimated number. Any section running on partial data says which number is missing and what it would take to get it.

---

## Voice and polish

- **It has to feel premium.** The bar is a document from a firm that charges five figures without blinking: generous whitespace, a restrained palette from the member's kit, large confident numbers, real visual hierarchy, no walls of text - and the full visual evidence layer above, rendered. If a section reads like a report, cut copy until it reads like an argument; if a fact can be a chart, it is one. Look at the rendered page and ask: would a $15K/year client feel they're buying from the expensive firm or the cheap one?
- **Less writing, less technical, more sales.** Body copy across the whole proposal stays under roughly 900 words outside tables and the FAQ. Every paragraph either scores, costs, proves, or asks - a paragraph that educates gets cut. The client hires the member so they don't have to understand SEO.
- Reads in the member's voice from `context/voice.md`, not in generic agency English. Same anti-slop layer as every other command.
- No em-dashes anywhere, in the page copy or the chat reply. Regular hyphens only.
- No emojis.
- The client's own logo (favicon) and name in the hero, with a prepared-by line, the date, and an expiry date about 14 days out. Expiry creates the deadline that makes a proposal close.
- Design comes from the site the member already built - `design/sites/` for the pre-built look, or `design/kit/` if they dropped in their own kit. It looks like their brand rather than this repo's. If neither exists yet, run `/build-website` first: the proposal is a page on their own domain and it has nothing to inherit from.
- **Mobile first - most proposals get opened on a phone, and the phone render is the one that closes or kills the deal.** The rules: everything stacks to ONE column at phone width (the findings two-column layout becomes left-column content first, then the SERP and GBP exhibits in normal flow - sticky off); pillar meters go 2x2; hero stat pills wrap; the gap table fits 390px with no horizontal scroll (fixed layout + short headers is what makes this possible); the geo grid map scales down intact; every button and FAQ row is a full-width tap target. Verify by SCREENSHOTTING at 390px and LOOKING - a page that renders at 1440px and overflows at 390px is not finished.

## The gate

The 9 out of 10 rule applies to the whole document before the link is handed over. Score it honestly on: does section 02 produce a number that hurts, does section 03 make the gap feel urgent, is the price justified by what came before it, and would the member be comfortable sending this to their best prospect. Say what is dragging it down and fix it before reporting done. Never inflate the score to finish the run.
