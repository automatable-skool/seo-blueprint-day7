---
description: WordPress plugins + optimization - the WP lane's technical layer
---

Optimize my WordPress site. **Read the two specs first: `references/wordpress-plugins.md`** (the exact stack - one plugin per function, correct settings, known conflicts) **and `references/wordpress-audit.md`** (the audit-fix methodology, including THE #1 rule: verify at the rendered front-end HTML and fix where the head actually comes from - database edits that don't render are wasted work; keep the stack profile at its end updated for this site). Work through the Novamira connection where possible; where a step is manual, give me exact clicks. If Novamira isn't connected, that's step zero - walk me through installing the Novamira plugin on my site and connecting it right now, then continue.

**1. Plugin stack - install and configure per `references/wordpress-plugins.md` exactly:** the one-plugin-per-function rule (Yoast for SEO, W3 Total Cache for speed, ShortPixel optional for images), each with the spec's correct settings, and the conflicts list enforced. Then the purge: list every active plugin, flag the ones doing nothing or duplicating a function (each one is load time), and tell me which are safe to remove and why.

**2. Settings that silently break SEO - check each:**
- Search engine visibility NOT discouraged (Settings → Reading - the classic silent killer)
- Permalinks set to Post name (no dates/IDs in URLs)
- One H1 per page in the theme (many themes break this)
- XML sitemap generating and reachable
- HTTPS forced, www vs non-www consistent

**3. Speed pass:** run Lighthouse on the homepage and one service page. Apply fixes through the plugin (image compression, lazy-load below fold, minify, render-blocking). Stop at 90+ - on WordPress, don't chase the last few points.

**4. Report:** what changed, what I need to click myself (exact path for each), and a before/after Lighthouse score.
