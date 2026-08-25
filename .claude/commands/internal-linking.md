---
description: The linking machine - wires every page into the hub-and-spoke graph
---

Wire the internal links. Read `website-index.md` (the drafted/published pages) and `keyword-map.md` (which hub each page belongs to), then link the whole graph per the rules in `references/keyword-clusters.md` and the researched numbers in `references/hub-spoke-pages.md` (one exact-match anchor per target then vary - variety is the strongest measured traffic correlate; inlink sweet spot ~40-44 on money pages; links early in body; every page within 3 clicks; new page gets links FROM 2-3 older pages same day).

**⛔ Standalone pages are not failures - read the label before wiring.** Most pages on a real map carry `**Standalone**`: they belong to no cluster, and that is the correct, permanent state for them. Rules 1-2 below simply do not apply to a standalone page, and one appearing with no hub link is NOT an orphan, NOT a gap, and never gets reported as one. Wire it the normal way - contextual body links, sibling links where genuinely related, and its money-page link (rule 3 applies to every blog page, standalone included). **Never invent a hub relationship to give a standalone page somewhere to point.** If wiring one feels like it needs a hub, the honest output is a note that the map has a thin area, routed to `/keyword-research expand` - never a forced link written today.

**The rules:**
1. Every spoke links UP to its hub - and that link goes EARLY (intro or first section), anchored on the hub's primary keyword or a close variant, with the hub referenced by name
2. Every hub links DOWN to all its spokes **as an H2 SECTION with a passage per spoke and the link inside it** (service hubs: the "Areas we serve" pattern with every city; blog pillars: a passage per spoke post). A bare anchor or a naked link list does NOT satisfy this - see "The linking contract" in `references/keyword-clusters.md`. A spoke missing from its hub's section is a fail even if some other link to it exists
3. Every blog page links OUT to at least one money page (services/booking) - blog traffic must have a path to convert. Money pages should end up the most internally-linked pages on the site - that's where the equity concentrates
4. Sibling links: spokes link to other spokes of the same hub where genuinely contextual (segmentation → automation) - clusters are webs, not just wheels
5. Link count scales with length: ~1 contextual link per 200-300 words (3-5 per 1,000 words; 10-20 on a 2,000+ word hub). Never fewer than 2. Hard ceiling ~150 total links on any page counting nav/footer
6. Anchors are descriptive AND varied - the anchor is a ranking signal, but the same exact-match anchor repeated at every link to one page reads as over-optimization. Rotate natural variants
7. Anchors never "click here" / "read more" / bare URLs; links live in the body where contextually natural, not dumped in a "related posts" block
8. Link only to pages worth ranking - never link to a page slated for merge/removal (check `website-index.md` first)
9. **Scheduled pages - only relevant if `/scale-map` has set up a queue. Check first, in one line.** If no page on the site carries a `publishDate`, there are no future pages, the date-aware link helper does not exist, and this rule does not apply: link normally and move on. Say `no queue - standard linking` and say nothing else about it. **This is the normal state for a hand-written site and it is not a gap.**

   **When a queue DOES exist:** wire the FULL graph now, including links to scheduled pages - but every link to a not-yet-live page goes through the date-aware link helper, never a bare `<a>`. The helper (built by `/scale-map`'s first scheduling run) renders the anchor as plain text until the target's `publishDate` arrives, then as a live link, and the publish-day rebuild flips it automatically. So rules 1-8 apply to scheduled pages exactly as to live ones: hub↔spoke, siblings, blog→money, early placement, varied anchors - all wired once, at build time, activating on each page's date with zero later runs. A bare hardcoded link to a future page is banned (dead link until its date); an omitted link is worse (orphan). Listings stay generated from the date-filtered helper.

**The one writing carve-out - growing a hub's section for a late spoke.** When a spoke exists but its hub has no section for it (the linking contract's fail state), inserting a bare link does NOT satisfy the contract - and this is the one case where this command WRITES: a short passage (2-4 sentences) for the hub's spoke section, governed by `context/voice.md` Part 1 and the pillar formula in `references/hub-spoke-pages.md`, with the spoke link inside it and a TOC entry added. Every passage written this way appears verbatim in the report as before/after for veto. This carve-out covers hub spoke-sections ONLY - all other body copy stays untouchable, and if a hub would need more than a passage (a restructure), stop and route it to `/blog-post` or `/service-page` as a named task instead.

**The pass:**
- Build the current link graph from the actual page content (not assumptions). Find: orphans (zero inbound), dead-end pages (zero outbound), spokes not linking their hub, blogs not linking any money page, broken internal links
- Fix by editing the pages: insert links with natural descriptive anchors at contextually sensible sentences. Smallest edits - never rewrite paragraphs to force a link, and never touch voice
- New drafts (Status = Draft): wire them fully and flip to Status = Linked in `website-index.md`

**Verify before reporting:** every inserted link is confirmed rendering and its target resolves. Dev server is a VALID check here - links are markup, not performance - but say so explicitly ("verified on dev, which is valid for links") so the member never learns that dev numbers count for speed. Zero body sentences altered is the expected count; report it.

**Report in outcomes, not file tours.** The before/after graph summary (orphans found → fixed, links added per page), any page that genuinely has no natural link target (flag with WHERE the link will naturally live later, don't force), pages skipped on purpose (stubs whose bodies `/service-page` will replace - linking them now is thrown-away work). Preview URLs for the changed pages, not a list of code files.

**The report ends with three separated lists - what's on whom, unmissable:**
1. **Waiting on you.** Anything blocking the next step, stated so it can't be missed: what's blocked, why, and exactly what to send or paste and where. A publish-blocker (a missing webhook, an unpasted config value) NEVER hides in closing prose - it is the first item here. If nothing is waiting, say so in one line.
2. **Optional recommendations.** Anything deliberately not done, with the trade-off and the exact words to greenlight it.
3. **Deferred on purpose.** Each with its reason and where it WILL happen ("stub pages stay unlinked - `/service-page` rewrites their bodies; they get wired the run after").
