# WordPress SEO plugin stack - install, settings and conflicts

**What it is:** the exact plugin stack for a fast, properly optimized WordPress site, with the correct settings for each and the conflicts to avoid.
**Standing reference,** cross-checked against current 2026 WordPress SEO, caching and image-optimization guides.
**Next:** install Yoast SEO and W3 Total Cache with the settings below, then run the verification checklist.

The rule this whole guide runs on: **one plugin per function. Period.** Most people install nine plugins that fight each other. You need two, or three with the optional one, set up right.

---

## The stack - one plugin per function

| Function | Plugin | Cost | Status |
|---|---|---|---|
| SEO (titles, meta, schema, sitemaps) | **Yoast SEO** | Free | Required |
| Caching + speed (cache, minify, lazy-load) | **W3 Total Cache** | Free | Required |
| Image compression (WebP/AVIF) | **ShortPixel** | Free tier (100 imgs/mo) | Optional |

That's it. Each does one job and nothing overlaps. The gains come from setting these up correctly, not from adding more plugins.

**Alternative SEO plugin.** Rank Math is the other strong choice in 2026, being lighter with more schema types in the free tier. Either works. Pick ONE and never run both. This guide uses Yoast because it is the most trusted and is what the masterclass teaches.

---

## 1. Install and configure Yoast SEO

**Install:** Plugins → Add New → search "Yoast SEO" → Install → Activate.

**First-time setup, in the configuration wizard**
- Site type: Business for local and service sites, or Blog
- Organization vs Person: pick Organization for a business, and add name plus logo, which feeds the schema graph
- Search engine visibility: ON. Make sure you are NOT hiding the site from search.

**Key settings to check, under Yoast → Settings**
- **Site features:** XML sitemaps ON, Schema ON. Leave the rest default.
- **Content types → Posts/Pages:** "Show in search results" = ON. Set title and meta templates, for example `%%title%% %%sep%% %%sitename%%`.
- **Title length:** 50-60 characters, focus keyword near the front.
- **Meta description:** 140-160 characters, keyword used naturally.
- **Media → Attachment URLs:** set to redirect to the attachment's parent, which stops thin image-attachment pages getting indexed.
- **Crawl optimization:** turn off unused feeds, RSD and WLW to keep the crawl clean.
- **Sitemap check:** visit `yoursite.com/sitemap_index.xml`. It should load and list your sitemaps.

**What Yoast handles, so nothing else has to:** titles, meta descriptions, canonical tags, the schema graph, XML sitemaps, breadcrumbs and readability. Do NOT install a second plugin for any of these.

---

## 2. Install W3 Total Cache with safe settings

Caching is the easiest plugin to break a site with, so set it up carefully and use Preview Mode.

**Install:** Plugins → Add New → search "W3 Total Cache" → Install → Activate.

**The golden rule - use Preview Mode.** Performance → General Settings → enable Preview mode first. This lets you test settings without affecting live visitors. Click Deploy when a setting is confirmed good, and turn Preview off when finished.

**General settings, the safe baseline**
- **Page Cache:** ON. Method = Disk: Enhanced, which works on any shared host.
- **Minify:** START OFF. Minify is the number one cause of broken layouts. Turn it on only after the rest works, set Minify Mode to Auto, and check the site. If anything breaks, such as broken CSS/JS or a weird layout, switch to Manual, exclude the problem file, or just leave Minify off. A working site beats a slightly smaller one.
- **Browser Cache:** ON, which sets far-future expiry plus gzip.
- **Object/Database Cache:** leave OFF on shared hosting, where it can slow things down. Turn on only with Redis or Memcached.
- **Lazy Load:** ON, so images load as you scroll.
- **Gzip compression:** ON.

**After any change:** Performance → "Empty all caches", then hard-refresh the site and click through 4-5 pages.

---

## 3. Install ShortPixel (optional)

Only add this if your images are heavy and slowing the site. Skip it if pages are already fast.

**Install:** Plugins → Add New → search "ShortPixel Image Optimizer" → Install → Activate → enter the free API key. Email signup gives 100 images per month free.

**Settings, under Settings → ShortPixel**
- **Compression:** Glossy, which is near-lossless and the best quality-to-size for most sites. Use Lossy only if you need maximum savings.
- **WebP/AVIF:** enable WebP, and AVIF if your host supports it. Choose "Serve from locally hosted files."
- **Delivery method:** the `<picture>` tag is most compatible and works on virtually any host. Use `.htaccess` only if you know your server is Apache with `exec()` enabled.
- **Resize large images:** ON, capped at about 2560px wide. Nobody needs a 6000px photo on a web page.
- **Backup originals:** ON, so you can restore if compression is too aggressive.
- Run **Bulk Optimize** once after setup to compress the existing library.

---

## Never install these - they fight your stack

**A second SEO plugin** (Rank Math, AIOSEO or SEOPress alongside Yoast)
Two SEO plugins means duplicate meta tags, two canonicals, conflicting or duplicate XML sitemaps, and clashing schema. A classic ranking killer.

**A second caching plugin** (WP Rocket, WP Super Cache and similar alongside W3 Total Cache)
Two caches means double caching, stale pages and white screens. Pick one cache plugin only.

**A standalone schema plugin** (Schema Pro and similar)
Yoast already outputs the schema graph. Two means duplicate or conflicting structured data.

**WebP Express alongside ShortPixel**
ShortPixel already serves WebP and AVIF. Two WebP layers means double-converted or broken images.

---

## Fix the one real settings conflict - W3 Total Cache vs the Yoast sitemap

This is the most common and most overlooked break. If W3TC caches or minifies your Yoast XML sitemap, the sitemap can show up blank or stale and Google stops crawling properly.

**The fix:** add `sitemap` and `sitemap_index.xml` to these W3 Total Cache exclusion lists.

- Page Cache → Never cache the following pages
- Minify → Never minify the following pages
- Browser Cache → 404 error exception list
- CDN, if used → Rejected files

Then empty all caches and reload `yoursite.com/sitemap_index.xml` to confirm it renders real URLs, not a blank page.

### Host with built-in caching? Don't add W3 Total Cache on top

If your host already runs its own caching, such as SiteGround Speed Optimizer, Kinsta, WP Engine or Cloudways, use THAT and do not also run W3 Total Cache. Two cache layers, host plus plugin, means stale pages and double-caching bugs. On managed hosts the built-in cache is the "one plugin per function" pick for caching. Only use W3 Total Cache on plain or unmanaged hosts that have no caching of their own.

### Other settings hygiene

- Don't let W3TC minify the SEO plugin's output or admin pages.
- If using a CDN later, exclude sitemaps and the wp-admin area.
- Keep Object Cache off on cheap shared hosting unless you have Redis or Memcached.

---

## Verify after every install or settings change

Run this every time after installing, activating or changing settings.

1. **Front-end loads:** open the homepage in an incognito window. No white screen, no broken layout.
2. **Click 5 pages:** home, a service or blog page, contact and so on. Check CSS/JS isn't broken, the classic minify symptom.
3. **Sitemap renders:** visit `/sitemap_index.xml` and confirm real URLs, not blank.
4. **View source:** confirm only ONE title tag, ONE meta description and ONE canonical, which proves there is no duplicate SEO plugin.
5. **Mobile check:** load on a phone or in DevTools mobile view.
6. **Speed check:** run the homepage through PageSpeed Insights or Lighthouse. The score should be the same or better, never worse.
7. **Forms and booking work:** submit a test on any contact or booking form.
8. **Empty all caches** after the final settings change, then re-verify.

**If something breaks:** the culprit is almost always W3TC Minify. Turn Minify off first, empty cache, re-check. If it is still broken, deactivate plugins one at a time to find the conflict, the standard isolation test.

---

## Sources (synthesized from 2026 guides)

- [Rank Math vs Yoast 2026 - WPKube](https://www.wpkube.com/rank-math-vs-yoast-seo/) · [Zapier](https://zapier.com/blog/rank-math-vs-yoast/) · [WPPoland](https://wppoland.com/en/seo-plugins-comparison-2026/)
- [Best WordPress SEO plugins - Searchlab](https://searchlab.nl/en/compare/best-wordpress-seo-plugins) · [SEO for WordPress 2026 - Techcognate](https://www.techcognate.com/wordpress-seo/)
- [Yoast settings guide - Ertano](https://ertano.com/yoast-seo-settings/) · [GrabURL](https://www.graburl.com/blog/yoast-seo-setup-step-by-step-configuration-guide)
- [W3 Total Cache config - Kinsta](https://kinsta.com/blog/w3-total-cache/) · [OnlineMediaMasters](https://onlinemediamasters.com/w3-total-cache-settings/) · [WPBeginner](https://www.wpbeginner.com/plugins/how-to-install-and-setup-w3-total-cache-for-beginners/)
- [Exclude sitemaps from cache - Yoast](https://yoast.com/help/exclude-sitemaps-from-cache/) · [W3TC sitemap exclusions - GitHub gist](https://gist.github.com/anandslab/8de59fe16a2a1d25ad7f)
- [ShortPixel settings - WPMayor](https://wpmayor.com/bulk-optimize-wordpress-images-webp-avif/) · [ShortPixel WebP/AVIF](https://wordpress.org/plugins/shortpixel-image-optimiser/)
- [Common plugin conflicts - ZenCore](https://zencoredigital.com/blog/wordpress-plugin-conflicts/)
