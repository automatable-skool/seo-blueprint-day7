---
description: The finished client proposal - a live page on your own site, ready to send
argument-hint: [client website URL]
---

Build a **finished, send-ready proposal** for the prospect at $ARGUMENTS (if empty, ask whose website it is). Not a draft, not a template with gaps. When this run ends the user has a link they can paste into an email to a paying client.

Read `references/proposal-blueprint.md` first - it holds the 7-section spec (score + money lost → findings → timeline → price → proof → FAQ → one click, and NOTHING else), the data sources, and the premium polish bar. Everything below is the run order.

**1. Gate on pricing.** Open `context/business.md`. If the packages table is still empty, stop and walk the user through filling it right now, one field at a time. A proposal with a blank price is not a proposal. Nothing else runs until this file is real.

**2. Gate on context.** `context/proof/proof-inventory.md` feeds the proof section (05) and `context/voice.md` feeds the whole document's tone. Either empty? Run `/context-layer` first, then come back. Never write a proposal in generic agency English and never invent a case study.

**3. Gate on the API keys, then pull the data.** Check `.env` BEFORE the first paid call:
- Member already has Semrush connected? Use it as the data source instead and skip the DataForSEO walkthrough - say the substitution in one line.
- Otherwise: `DATAFORSEO_LOGIN` + `DATAFORSEO_PASSWORD` missing? Ask now, with the walkthrough: "Sign up at dataforseo.com (free, $1 credit, no card) → dashboard → API Access → copy the login and password, paste them here." Save both to `.env` and continue.
- `APIFY_TOKEN` should already exist from `/context-layer` - only if it's genuinely missing, run the same 30-second apify.com walkthrough and save it.
- Never start the pull with a key missing and never silently skip a source because its key wasn't there - a section that runs keyless degrades per the blueprint AND says the key was the reason.

Then pull, free tier first, per the blueprint's source table: their website direct, PageSpeed Insights for Core Web Vitals, DataForSEO for SERP positions + backlinks + domain rank + local pack, Apify for the Google Business Profile and reviews. Identify the three real competitors **by location + services offered, never by company name**: same service, same customers, same city or service area, discovered from the map pack and live SERP data - and every name verified against real data before it appears (a real listing, real traffic). A famous name from memory, a business in the wrong city, or an adjacent-service company is not a competitor. Full rules in the blueprint's section 03.

Warn BEFORE the history pulls specifically (`historical_rank_overview` is ~$0.135 per domain - a 4-domain chart is about half the $1 credit), and before any run spending more than roughly 200 standard queries. The top-up minimum after the $1 signup credit is $50, not $5. Log cumulative spend to CLAUDE.md "## My setup" after every run.

Any source that fails degrades the section and says so in the report. It never becomes an estimate.

**4. Do the money maths out loud.** Section 02 is the one that closes. Ask the user for the client's average job value and close rate if they aren't already known - do not substitute an industry average. Show the arithmetic on one visible line so it reads as maths.

**5. Build it. The proposal lives in Supabase, and the URL is dynamic.**

**Where the data lives:** one row in the `proposals` table, never a file in the repo. The route fetches it by slug at request time, so editing a row shows up on the next page load with no rebuild and no redeploy.

**Three keys, all from `.env`** (`references/proposal-blueprint.md` has the dashboard paths):
- `SUPABASE_DB_URL` - build-time only. Runs the DDL on first setup. Never read by the running site.
- `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` - what the server reads on every request.

Any missing? Stop and walk me through getting them - the connection string is Connect > **Session pooler** (never Direct; it is IPv6-only and fails on most networks), the other two are Settings > API.

**First run only - the setup, in this order:**

1. **Create the table** over `SUPABASE_DB_URL`:
   ```sql
   create table if not exists public.proposals (
     slug        text primary key,
     client_name text not null,
     data        jsonb not null,
     expires_at  date,
     created_at  timestamptz not null default now(),
     updated_at  timestamptz not null default now()
   );
   alter table public.proposals enable row level security;
   revoke all on public.proposals from anon, authenticated;
   ```
   **RLS on with ZERO policies is deliberate, not unfinished.** Anon cannot read a single row; `service_role` bypasses RLS. Never add a policy to "make it work" - if a read fails, the key is wrong, not the policy.
   The body is `jsonb` because `ProposalData` in `components/proposal/types.ts` is the contract. Never explode it into columns - the spec changes whenever the offer does, and that would mean a migration every time.

2. **Confirm `next.config.mjs` has no `output: "export"`.** The template ships without it precisely so this route and `/api/lead` work, so normally there is nothing to do here - just check. A static export has no server at request time, so Supabase cannot be read and the lead form silently 404s. If a member has added it back, remove it and say so. Everything else on the site keeps prerendering - Next statically generates by default - so indexed pages are unchanged. Confirm it on the build output: every route still `○ (Static)` except `/proposal/[slug]`, now `ƒ (Dynamic)`.

3. **Write `lib/supabase.ts`** - a server-only client built from `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`. **Never import it from a `"use client"` file, and never prefix either key with `NEXT_PUBLIC_`** - that ships your clients' pricing to every visitor.

4. **Build the chassis if it does not exist:** `app/proposal/[slug]/page.tsx` plus the section components in `components/proposal/`.

**The route - dynamic, not prebuilt:**
- **Delete `generateStaticParams()` and `dynamicParams = false`.** They are what froze the slug list at build time.
- `export const revalidate = 0` so an edited row appears immediately.
- Fetch `.eq('slug', slug).maybeSingle()`. No row, or any error → `notFound()`. Never an error page that reveals whether the row was missing or the query failed.
- `generateMetadata` keeps `robots: { index: false, follow: false }` on every path, including the not-found one.

**⛔ Slugs must be unguessable: `<client-slug>-<8 random hex>`,** e.g. `joes-plumbing-a7f3c9e2`. `dynamicParams = false` used to be what stopped slug guessing; going dynamic throws that away, and a bare client name is trivially guessable. This replaces it.

**Every run after the first writes ONE ROW** - upsert on `slug`, setting `client_name`, `data` and `expires_at`. No file in `content/proposals/`, no registry edit, no commit, no redeploy.

**If an existing chassis predates the current spec** (extra sections like "What we'd do", "What's not included", an access list, letter grades anywhere - or a missing visual evidence layer: no score meters, no visibility chart, no SERP render, no map pack, no section icons, or one flat white background top to bottom), rebuild the chassis to the current spec before writing the row - never pour new data into a retired structure.

Design comes from the site's existing styles so it wears the user's brand, not this repo's. Hero carries the client's favicon, their name, a prepared-by line, the date, and an expiry 14 days out (or whatever `context/business.md` says).

**6. noindex, three places.** Metadata on the proposal page exports `robots: { index: false, follow: false }`, the `/proposal` tree is excluded from `app/sitemap.ts`, and `app/robots.ts` disallows `/proposal/`. Verify all three every run. A leaked proposal shows one client another client's pricing.

**7. Test it.** Run the build and load the LIVE page before saying a word about it - a green build no longer proves the data resolves, because the data is now fetched at request time. Also verify: a wrong slug returns 404 (not an error page), and `SUPABASE_SERVICE_ROLE_KEY` appears nowhere in the page HTML or any JS chunk (`curl` the page and grep for it - if it is there, stop everything and rotate the key). Then screenshot at 1440px AND 390px and LOOK at both - phones are where proposals get opened, so the mobile render is the one that matters: one column, no horizontal scroll, no overlapping chart labels, tap-sized buttons. A page you didn't open is not a finished proposal, and a page you only saw on desktop is half-tested. Fix anything that breaks, then re-run.

**8. Score it, honestly.** The 9 out of 10 gate covers the whole document: does section 02 produce a number that hurts, does section 03 make the gap urgent, does every exhibit in the visual evidence layer render real pulled data (a missing exhibit says which number is missing - a fake one is an automatic fail), does the page follow the light-theme design spec (alternating white/off-white bands, section icons, no gradients - not one flat scroll), does the price feel justified by everything above it, would the user send this to their best prospect. Under a 9, say exactly what's dragging it down and fix it before reporting done. Never inflate to finish the run.

**9. Hand it over.** Give the live URL, the local preview URL, and a clickable link to every file written. Then tell them the one thing that closes it: send the link, do not attach anything, and follow up before the expiry date.

**Focus mode:** `/proposal pricing` rewrites section 07 from the current `context/business.md`, `/proposal competitors` refreshes section 03's data, `/proposal <client-slug> refresh` re-pulls all data for an existing proposal and updates its date and expiry. All three UPDATE THE ROW - none of them touch a file, and none require a redeploy to take effect.
