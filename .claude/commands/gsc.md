---
description: Google Search Console - manual setup + first indexing, all clicks, no Cloud Console
---

Get my site into Google Search Console and get my pages indexed - the MANUAL way. Everything here is clicks in a browser, zero API, zero Cloud Console.

Walk me through, one step at a time, checking each is done before the next:

**1. Verify the property** (search.google.com/search-console → Add property):
- Recommend the **Domain property** (covers www/non-www, http/https all at once) → requires one DNS TXT record: tell me exactly where to add it for MY registrar/host (ask which one; Vercel-managed domains: Vercel dashboard → Domains → DNS records)
- Fallback if DNS scares me: **URL-prefix property** with the HTML-file method - static lane: drop the verification file in `public/`, redeploy, verify. Two minutes either way.
- Verification can take a few minutes to propagate - if it fails first try, that's normal, retry.

**2. Submit the sitemap:** Sitemaps → paste `sitemap.xml` → Submit. Status "Success" = done. This is the single most important click in this command.

**3. Request indexing for the money pages** (the manual nudge): URL Inspection → paste each priority URL (homepage, service hubs, the best city pages) → "Request indexing". Google rate-limits this (~10-ish/day) - do the money pages first, the rest arrive via the sitemap. Set the honest expectation: indexing takes days to weeks; requesting is a nudge, not a command.

**4. The 5-minute dashboard tour** (so the reports mean something before automation takes over):
- **Pages (Indexing report)** - indexed vs not, and what the "why not" reasons mean in plain English ("Discovered - currently not indexed" = Google knows, hasn't bothered yet - normal for young sites)
- **Performance** - impressions before clicks: impressions rising = Google is testing you, that's the first win signal, weeks before traffic
- What to glance at weekly: sitemap status, indexed count trending up, any red errors. That's it - no daily checking, the numbers move weekly at best.

**5. Log it:** record verified property + submission date in CLAUDE.md "## My setup". Finish with: "Check back weekly - sitemap status, indexed count trending up, any red errors. The numbers move weekly at best, so daily checking just costs you sleep."
