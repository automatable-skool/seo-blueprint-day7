---
description: Google Business Profile setup - full research, every field generated, paste-ready in 30 minutes
argument-hint: [focus: categories | services | description | hours | photos | attributes | service-area | products | citations | faq]
---

**Focus mode:** if a subpoint is named (`/gbp citations`, `/gbp services`), run ONLY that section of the spec at full depth - e.g. `/gbp citations` runs just the citation campaign from `references/citations.md`, `/gbp services` just the 30-50 service extraction with keyword volumes. No focus = the full setup below.

Set up (or overhaul) my Google Business Profile. **Read `references/gbp-setup.md` and execute it end to end - it IS the spec.** Follow its steps exactly; this command only adds the repo wiring:

**Repo wiring (before Step 1):**
- Read `context/business.md`, `context/proof/proof-inventory.md`, and `context/voice.md` first - skip every question those files already answer. The proof inventory feeds the description, services, and attributes (identity items like family-owned only if TRUE there).
- **Ask the country FIRST, before any volume lookup.** Semrush keeps a separate keyword database per country and **defaults to the US**. Pull US data for a business in Manchester, Calgary or Auckland and every volume on the profile is for the wrong country - the service list looks researched and is quietly worthless. Ask "which country are your customers searching from?", take it from `context/business.md` if the service area is already recorded there, set the database to match (`us`, `uk`, `ca`, `au`, `nz`, `ie`...), **say on screen which database you're using**, and record it in CLAUDE.md "## My setup" so it's never asked twice.

- **Rank services by `[service] [city]` volume, but NEVER put the city in the service name.** Semrush cannot geo-target below country level, so appending the city is the only way to isolate real local demand - that is why the query has it. The city is a measuring device, not part of the answer.
  - Query: `emergency plumber toronto` → 2,400/mo. **Service name on the profile: "Emergency Plumber".** Never "Emergency Plumber Toronto".
  - Google already knows where the business is - that's what the profile IS. Stuffing the city into service names is the single most common GBP keyword-stuffing pattern and it is a suspension risk, not a ranking one.
  - Between close variants, the city-appended query picks the winner: "couples therapy toronto" 1,300/mo beats "couples counselling toronto" 590/mo, so the service is named **"Couples Therapy"**.
  - Target **70 services - 50 to use plus 20 EXTRAS - ranked by that volume, highest first** - the profile has room and the high-volume ones must not be buried below whatever the website happened to list.
  - Keyword volumes: Semrush where available; autocomplete + judgment otherwise, marked as estimates.
- The citation section (spec section 12): pull the tiers from `references/citations.md` - Tier 1 + 2 hardcoded from there, Tier 3 aggregators noted, Tier 4 industry-specific researched live per that file's rule.

**The spec's own flow (hold me to it):**
1. **Inputs** - the required/recommended/nice-to-have questions, one batch at a time
2b. **Anti-stuffing pass, before anything is finalized** - run the spec's "stuffing rules" over categories AND services: every entry must be something the business actually delivers, one entry per bookable job (merge duplicate phrasings and report what was merged), no city and no keyword strings in any name. Extras are presented as OPTIONS, never as slots to fill. Predefined services get swept exhaustively first, then custom ones with descriptions.

2. **Deep research (always oversupply - see the spec's OVERSUPPLY RULE)** - 20 categories (10 + 10 extras), 70 services (50 + 20 extras), 30 products (20 + 10 extras). People reject some of everything, and an unfilled slot is wasted ranking surface. Every extra carries a one-line "use this if". Then: website fetch, top-3 competitor teardown (their categories, services, reviews), LIVE category verification (never invent - verify via the reference URLs + competitors' actual primaries), nearby cities for SAB, **50 services ranked by `[service] [city]` search volume and named WITHOUT the city**, products, attributes discovery, keyword gap
3. **The research summary checkpoint** - show me the summary block and WAIT for my confirm before generating
4. **Generate `gbp-{business-slug}.md`** - all 12 sections, every rule applied. Categories, services and products each render as TWO blocks: "USE THESE" then "EXTRAS" with the swap-in reason on each. (9 secondary categories filled, description first-100-chars rule, 24/7 only if real, identity attributes, service area ≤20 cities / ≤2h drive)
5. **Suspension-proofing** - run the full checklist; any flag = warn me BEFORE finalizing. **The business name always gets an explicit verdict, clean or not** (per the spec's "name verdict" section) - a clean name is stated as clean, with the keyword-stuffed version of MY name and MY city spelled out in full as the thing never to change it to. Never let the name pass silently: it is rarely stuffed at setup and often stuffed months later by someone acting on bad advice, and it is the one field where a ranking tactic costs the whole profile.
6. **Handoff** - the paste-into-GBP walkthrough, photos brief, and the citation campaign as the follow-up (per `references/citations.md`: Tier 1+2 manually, aggregators for the long tail, industry directories by hand, quarterly NAP re-check)

Output stays legible: the final file is copy-paste sections in plain English, YAML only where the spec requires it.
