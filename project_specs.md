# Project spec - proposals move to Supabase

**Status: DRAFT, awaiting approval. No code written yet.**

Written 24 August 2026. Scope agreed with Jono: **Supabase for the database, dynamic URL. No open tracking** (deferred - it changes the schema, so it is called out here rather than half-built).

---

## What this changes

Today a proposal is a TypeScript file committed to the repo. `/proposal/[slug]` reads a hardcoded registry at `content/proposals/index.ts`, `generateStaticParams()` freezes the slug list at build time, and `dynamicParams = false` 404s anything else. A new client means a new file, a registry edit, a commit and a redeploy.

After this change a proposal is a **row in Supabase**. The page fetches it by slug on the server at request time. New client = one insert. No commit, no redeploy.

---

## The blocker this has to clear first

`next.config.mjs` sets `output: "export"` - a pure static export. No server components at request time, no API routes. This is also why `/api/lead` currently 404s (already logged in `website-index.md` blockers).

**Decision: remove `output: "export"`.**

- Everything else on the site keeps prerendering - Next statically generates by default, we just stop forcing it globally.
- `images: { unoptimized: true }` stays (harmless).
- `vercel.json` redirects and the `X-Robots-Tag` header are host-layer and unaffected.
- The `out/` directory stops being produced. Nothing reads it.
- **Bonus:** unblocks `/api/lead`, which is currently a publish blocker.

**Risk:** this touches every route, not just proposals. Mitigation is in the test plan - full build plus a route-by-route 200 check before anything ships.

---

## Schema

One table. The proposal body is stored as `jsonb`, not exploded into columns.

```sql
create table proposals (
  slug         text primary key,
  client_name  text not null,
  data         jsonb not null,
  expires_at   date,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table proposals enable row level security;
-- No policies. Anon and authenticated get nothing.
-- Reads happen server-side with the service role key, which bypasses RLS.
```

**Why `jsonb` and not real columns:** the proposal shape is owned by `components/proposal/types.ts` (`ProposalData`), and the blueprint spec changes as the offer changes. A 40-column table means a migration every time a section is added. The TypeScript type stays the contract; the database stores the blob and indexes the slug.

---

## Security model

Proposals contain client pricing. A leak shows one client another client's numbers.

1. **RLS on, zero policies.** The anon key cannot read the table at all. Reads only ever happen server-side with `SUPABASE_SERVICE_ROLE_KEY`.
2. **The service key never reaches the browser.** No `NEXT_PUBLIC_` prefix. Server components only.
3. **Slugs are unguessable.** `<client-slug>-<8 random hex>`, e.g. `joes-plumbing-a7f3c9e2`. Today's `automatable` is trivially guessable and so is every client name. This replaces the protection currently provided by `dynamicParams = false`.
4. **noindex stays in all three places** - page metadata `robots`, exclusion from `app/sitemap.ts`, `Disallow: /proposal/` in `app/robots.ts`. Verified every run, unchanged from today.
5. **Unknown slug returns `notFound()`** - a plain 404, never an error page that reveals the row was missing versus the query failing.

---

## Route design

`app/proposal/[slug]/page.tsx` becomes a server component:

- Delete `generateStaticParams()` and `dynamicParams = false`
- `export const revalidate = 0` so an edited row shows immediately
- Fetch: `select('data, client_name, expires_at').eq('slug', slug).maybeSingle()`
- Null result or any error → `notFound()`
- `generateMetadata` fetches the same row; keeps `robots: { index: false, follow: false }` on every path including the 404 case
- Rendering is unchanged - the same `ProposalData` object flows into the same section components

New file: `lib/supabase.ts` - a server-only client, imported nowhere in a `"use client"` file.

---

## Environment

| Key | Where |
|---|---|
| `SUPABASE_URL` | `.env` locally, Vercel project env vars |
| `SUPABASE_SERVICE_ROLE_KEY` | same - **never** `NEXT_PUBLIC_` |

`.env.example` gets both, with a comment that the service key is server-only.

---

## Migration of the existing proposal

`content/proposals/automatable.ts` becomes a row. One-time script reads the existing TS export and upserts it, with a fresh unguessable slug.

**The old files are NOT deleted in this change** - `content/proposals/` stays on disk, unreferenced, until Jono explicitly approves removal. The registry import is dropped from the route so nothing loads it.

---

## What changes in `proposal.md` (the skill)

- **Step 5** stops writing `content/proposals/<slug>.ts`. It generates the slug with its random suffix, builds the `ProposalData` object, and upserts one row.
- **First run** additionally: create the table, set RLS, write `lib/supabase.ts`, add both env keys locally and on Vercel, and confirm a read works before writing anything.
- **Step 6** (noindex, three places) unchanged.
- **Step 7** (build + screenshot at 1440 and 390) unchanged, but now also loads the live URL, because a build pass no longer proves the data resolves.
- **Focus mode** `/proposal <slug> refresh` updates the row instead of rewriting a file.

Synced to `seo-blueprint-pro` and `seo-test-drive`. The proposal skill does not exist in the Ads repos, so they are untouched.

---

## Test plan - what "done" means

1. `npm run build` passes with `output: "export"` removed.
2. **Every existing route returns 200** - home, /services and all children, /blog and all children, /about, /contact, /pricing, /quote, /reviews, /thank-you. This is the regression risk of dropping the static export and it gets checked explicitly, not assumed.
3. Proposal at its real slug renders fully, with correct data.
4. A wrong slug returns 404, not an error page.
5. `curl` the page and confirm the service key appears nowhere in the HTML or any JS chunk.
6. Anon-key read against the table returns zero rows (proves RLS).
7. noindex present in all three places.
8. Screenshots at 1440px and 390px both look right.
9. Edit a row in Supabase, reload, change appears with no redeploy. **This is the whole point of the change - if it fails, nothing else matters.**

---

## Explicitly out of scope

- **Open tracking** (who opened it, when, how often). Deferred by decision. Worth revisiting - it is the highest-value thing this architecture unlocks.
- Accept/sign actions.
- Any admin UI. Rows are written by the skill and edited in the Supabase dashboard.
- Deleting `content/proposals/`.
