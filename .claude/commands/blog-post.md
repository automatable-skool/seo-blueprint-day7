---
description: One publish-ready blog post - duplicate the template page, research, write in voice
argument-hint: [keyword, optional - pulls next from keyword-map.md]
---

**Read first:** `references/blog-post-retention.md` (the 41 retention rules - subhead every 150-300 words, answer in the first 40-50 words, the mid-text CTA does 47-93% of the work), `context/voice.md` Part 1 (the humour bar: full standup on blogs; quick answers and FAQ straight - AI lifts those verbatim), and **`references/hub-spoke-pages.md` when the map row is a pillar or a spoke** - a pillar is a short router with an H2 section per spoke (passage + link inside it, section in the TOC) and it grows a section the same day any new spoke ships; a spoke takes one subtopic deep, never the pillar's head term, and references its pillar by name early.

**⛔ Before writing: check the route does not already exist.** No argument = the next unwritten `## N. Blog post:` row in `keyword-map.md`, lowest N. **But the map row is hand-maintained and drifts - the filesystem is the authority.** If `website/app/blog/<slug>/` already exists, skip it, move the row to `# Written`, say so in one line, and take the next row instead. Never overwrite an existing post: it may have been hand-edited, optimized, linked or already live, and a rebuild silently destroys all of it. All rows written? Say so and point at `/keyword-research expand`.

## Which keyword

Never ask. The ladder, top to bottom, no stopping:

1. Next unwritten `## N. Blog post:` row in `keyword-map.md`, lowest N, skipping anything in `website-index.md` or routed under `app/blog/`
2. Map empty of blog rows? Best "saved for later" keyword under difficulty 40
3. Everything taken? A fresh long-tail variant of the closest cluster

State the pick in one line and build. The ONLY stop: a keyword I typed is already written - show me it, ask update-or-new.

## ⛔ Duplicate = `cp` the file

```
cp app/<SITE_STYLE>/blog/page.tsx app/blog/[slug]/page.tsx   # first ever
cp app/blog/[existing]/page.tsx   app/blog/[new-slug]/page.tsx  # every one after
```

Edit ONLY words, images, metadata, schema. Composing a fresh page from components is designing - banned.

## The work

1. **Spec:** top 3 organic results - word count, H2 outline, tables, FAQs. Target = their average ±20%, plus THE GAPS.
2. **Research, 50+ sources:** parallel sub-agents across ranking articles, YouTube transcripts, Reddit, studies, expert quotes - and MY numbers from `context/proof/proof-inventory.md`. Original data is the citation lever. **`references/examples/research-dossier-example.md` is what the gathered material should look like before you write a word** - match its shape, never its content. WordPress lane: `references/examples/wordpress-blog-example.md` is the finished post.
3. **Buyer:** name the ONE buyer from `context/buyers.md`; closest fit if none owns the keyword, say why.
4. **Write INTO `references/blog-post-template.md`'s skeleton** - quick answer → proof line → main table → cluster H2s → field section → FAQ → bridge CTA → author box. Write it STRAIGHT and correct first. Never a disclaimer about proof you don't have - write from what IS true.
5. **The humour rewrite - a separate, full pass, and it is the point.** Rewrite every line against `context/voice.md` Part 1 (the four joke shapes, the placement rhythm, the swipe file as calibration - never as source material). The bar: **at least every second line lands a light beat, like a comedy set the whole way through** - then the useful info lands clean right after. Quick answers, FAQ, tables and numbers stay straight. This is a line-by-line rewrite, not a find-and-replace.
   - **Sweep BOTTOM-UP: last section first, intro last.** Drafts fatigue - the writing copies its own recent output, so humour starts strong and thins through the back half, and a top-down punch-up pass fatigues the exact same way. Working from the end gives the tired sections the freshest attention.
   - **The floor: every H2 section carries at least one line at the drywall-line bar** (the swipe file's top entries). FAQ, quick answers and the CTA are exempt. After the pass, count per section. A section with zero isn't done - a funny intro doesn't carry a dry section six.
   - **The density check: three straight sentences in a row, outside the protected zones, means the pass isn't done there.** The target is a beat every second line - mostly SMALL beats (a word choice, a half-sentence aside, a personification), with one or two big builds per section. Ten set pieces per section is exhausting; ten dry sentences is worse.
   - **Every stat carries a live external link to its source.** An attribution with no link ("per industry data", "Semrush-cited") is not a citation. If the source can't be found and linked, the stat doesn't ship - swap it for one that verifies. Degrade, never decorate.
6. **Images:** hero + one visual per ~350 words. Ladder: real → `code/fetch_stock_photos.py` (overfetch: pool 2-3x the slots, pick the best per slot, never a photo already used on the site) → none. Look at each. **People photos go where people belong:** body images show the work, the tools, the result - not stock faces. A face appears only in the author box (the real author) or beside a real quoted person, never as decoration.
7. **On-page while writing:** `references/on-page-seo.md`; 2-3 title/meta variants per `references/meta-info.md`.

## Gates, then register

```
python3 code/check_page_rhythm.py /blog/[slug]
python3 code/check_voice.py website/app/blog/[slug]/page.tsx
python3 code/check_page_done.py /blog/[slug]
```

**The loop rule: the gate decides when you're done, not you.** Run the gate → fix every failure → run it again. Repeat until it passes. Do not report progress instead of finishing, do not ask permission to keep fixing, do not stop because a fix is tedious (37 routes to build means 37 routes get built), and never present a failing site with an explanation attached. The ONLY reasons to stop early: you need a value only I have (a key, a webhook, a photo), or a real decision is mine to make. Everything else, you finish.

Fix and re-run until all three pass - never show a failing draft with an explanation, and never declare a score. Then screenshot at 1440px and 390px and LOOK at both - no horizontal overflow, no table spilling off a phone screen, images scaling intact. Then: save as draft, verify every internal link target exists, append to `website-index.md`, MOVE the whole map row into `# Written` in `keyword-map.md`, keeping its number - never add a `Status:` field. Publishing is `/publish`; linking is `/internal-linking`.


**⛔ LISTINGS ARE DATA, NOT JSX. Add an ENTRY, never a link.** The `/services` and `/blog` indexes render from `website/content/services.ts` and `website/content/posts.ts`. **Never hand-edit `app/services/page.tsx` or `app/blog/page.tsx`** - when they were hardcoded, every new page's link got appended next to whichever link happened to be last, and four unrelated services ended up filed under the "SEO Audit Services" heading. Data cannot make that mistake: one object in the list renders as its own section, in order, and is filtered by publish date so a held page does not appear at all. City pages go in the parent's `children`, never as top-level entries.

**⛔ Every link to a dated route goes through `<ScheduledLink>`, never a raw `<a>`.** A page that publishes on the 1st linking to one held until the 3rd is a live 404 for two days, and the build stays green throughout. `python3 code/check_scheduled_links.py` must exit 0 before the batch is done - it caught three real instances of this.
