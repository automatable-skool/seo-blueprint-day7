# Build a page three ways - custom PHP, Gutenberg, Elementor

**What it is:** one page, built three ways via the NovaMira MCP and compared like-for-like: (A) custom PHP, the default, then (B) Gutenberg, then (C) Elementor.
**Standing reference** for the build-a-page-3-ways demo and for picking a build method on real client work.
**Next:** read the non-negotiable rules, then build A from the shared brief below.

The content brief is SHARED. All three builds render the same sections, so the only thing that changes is the method, not the page. That is what makes the comparison fair on camera.

---

## Non-negotiable rules - read first

**1. Editable builds must use editable FIELDS, never code blocks.**

The whole point of Gutenberg and Elementor is that a non-developer can edit the page in the UI. A Custom HTML block in Gutenberg, or an HTML widget in Elementor, is just code in a box. The client cannot edit it as fields, which defeats the entire purpose of an "editable" build.

- **Gutenberg:** use only native core blocks - Heading, Paragraph, List, **Table**, Buttons, and Details (for FAQ). **NEVER the Custom HTML block (`wp:html`).**
- **Elementor:** use only editable widgets - Heading, Text Editor, Icon List, Button, **Accordion** (FAQ), and a real **Data Table** widget (Essential Addons `eael-data-table`, Happy `ha-data-table`, and similar) for tables. **NEVER the HTML widget (`widgetType: "html"`).**
- **Custom PHP (build A) is the ONE place raw HTML is correct.** It is the developer-owned build by definition. Code there is expected; code inside an "editable" build is a bug.

Litmus test before shipping an editable build: open it in the editor and try to change a price by clicking the cell. If you land in a code box, you used the wrong block or widget - redo it.

**2. One header, one footer, never two.**

If the site already injects global chrome, such as a sandbox `apex-chrome.php` hooked on `wp_body_open` and `wp_footer`, a page-specific file must NOT inject its own header and footer on top. That renders two of each.

Let ONE file own the chrome, and have the page file inject content only: open a `<main>` wrapper at `wp_body_open` after the chrome's priority, and close it at `wp_footer` before the chrome's footer priority. Verify the rendered HTML has exactly one `<header>` and one `<footer>`.

---

## 0. The page brief - shared by all three builds

- **Keyword:** how much does a plumber cost. 1,900 searches a month · difficulty 17 · informational intent
- **Slug base:** `how-much-does-a-plumber-cost`
- **SEO title (60 characters max):** How Much Does a Plumber Cost? (2026 Price Guide)
- **Meta description (160 characters max):** How much does a plumber cost? Typical hourly rates, call-out fees, and price ranges for common jobs - plus how to avoid overpaying.
- **Single H1:** How Much Does a Plumber Cost?

**The seven sections (H2s), identical across all three builds**

1. The short answer, an answer-first range up top
2. Plumber hourly rates
3. Call-out and emergency fees
4. Price by common job (table)
5. What affects the price
6. How to avoid overpaying
7. FAQ, three questions and answers

**Must include:** one comparison table (job to price range), one bulleted list, an answer-first paragraph, and a three-question FAQ.

**Intent:** informational, with a soft CTA to a quote or contact at the end.

**Copy rules:** short sentences, real numbers, no hype words, no exclamation marks.

---

## Compare the three methods

**Custom PHP - your default**
Edited afterwards by a developer only. Total control. Lightest output, because you write it. Best Core Web Vitals and SEO if coded well. Low MCP effort. No editability without a dev. Pick it for dev-owned, pixel-perfect, speed-critical pages.

**Gutenberg**
Edited afterwards by the client, using blocks. High control. Light, clean HTML output. Strong Core Web Vitals and SEO thanks to clean markup. Low to medium MCP effort. Edits happen in-editor with no plugin lock-in. Pick it when the client edits content, and for blog and marketing pages.

**Elementor**
Edited afterwards by the client, visually and drag-and-drop. High control, visually. Heaviest output, with extra CSS and JS and more requests. Core Web Vitals and SEO are acceptable with optimization, but watch script weight. High MCP effort, because of verbose JSON plus CSS regeneration. Full visual editing, but plugin lock-in. Pick it when a non-technical client wants visual control.

**Default to custom PHP.** Reach for Gutenberg when the client needs to edit content. Reach for Elementor when a non-technical client needs visual control. Builder comparisons consistently show Gutenberg ships lighter and cleaner code than Elementor, and custom code is lighter still.

---

## A. Build the custom PHP page - the default

**What it is:** a server-rendered page. Full control, version-controlled, fastest. Two valid patterns.

### Pattern A1 - full takeover via `template_redirect` plus `exit()`

The sandbox pattern. Bypasses the theme entirely and emits your own HTML document. This is what `apex-pages.php` does, and it is the right tool when you want a fully custom document, effectively headless for that URL.

```php
// wp-content/novamira-sandbox/cost-plumber-page.php
add_action('template_redirect', function () {
   if (!is_page('how-much-does-a-plumber-cost')) return;
   nocache_headers();
   header('Content-Type: text/html; charset=utf-8');
   // <!doctype html> … full custom <head> + <body> … echo design-system min CSS
   exit; // deliberate: we are taking over this request
}, 0);
```

**Warning, know the caveat.** WordPress' own docs warn that using `template_redirect` plus `exit()` to LOAD a template skips later `template_redirect` hooks. For a full custom-document takeover, which is our case, that is fine and intentional. If instead you want to swap a template inside the theme, use Pattern A2.

### Pattern A2 - theme-integrated via `template_include`

The WordPress-recommended route for templates. Returns a template file path, and the theme's header and footer still run.

```php
add_filter('template_include', function ($template) {
   if (is_page('how-much-does-a-plumber-cost')) {
       return plugin_dir_path(__FILE__) . 'tpl-plumber-cost.php';
   }
   return $template;
});
```

You can also register a selectable template with the `theme_page_templates` filter plus `template_include`, with no physical file required.

### Build steps for Pattern A1, matching the demo

1. `novamira/write-file` the PHP into `wp-content/novamira-sandbox/`.
2. Emit a proper `<head>`: one `<title>` of 60 characters or fewer, a meta description of 160 or fewer, viewport, canonical, and a single `<h1>`.
3. Reuse the Apex design system and load the MINIFIED CSS at `/uploads/jono-test-123/design-system/apex-*.min.css`.
4. Render the seven sections, including a real `<table>` and `<ul>`.
5. Create the WP page so the slug resolves:
   `wp post create --post_type=page --post_status=publish --post_title="How Much Does a Plumber Cost?" --post_name=how-much-does-a-plumber-cost`

**Verify:** fetch the URL and confirm HTTP 200, the correct `<title>`, exactly one `<h1>`, the table present, and no "Fatal error".

**Trade-off:** total control, fastest, no builder bloat, diff-able. Only a dev can edit it.

---

## B. Build the Gutenberg page - client-editable and native

**What it is:** the native block editor, so the client edits without any page builder.

**Key fact:** Gutenberg content is just HTML with block-comment delimiters in `post_content`, in the form `<!-- wp:type {json-attrs} -->markup<!-- /wp:type -->`. Core blocks can be written directly via `wp_insert_post` with no Block Editor Queue required. They render on the front end and stay fully editable in wp-admin.

**Core block markup reference for the seven sections**

```html
<!-- wp:heading -->
<h2 class="wp-block-heading">Plumber hourly rates</h2>
<!-- /wp:heading -->


<!-- wp:paragraph -->
<p>Most plumbers charge $45–$200 per hour…</p>
<!-- /wp:paragraph -->


<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item --><li>Job complexity</li><!-- /wp:list-item --></ul>
<!-- /wp:list -->


<!-- wp:table -->
<figure class="wp-block-table"><table><thead><tr><th>Job</th><th>Price range</th></tr></thead>
<tbody><tr><td>Unclog a drain</td><td>$150–$450</td></tr></tbody></table></figure>
<!-- /wp:table -->
```

### Build steps

1. Assemble `post_content` from the block markup above, covering all seven sections.
2. Create the page with that content:
   `wp post create --post_type=page --post_status=publish --post_title="How Much Does a Plumber Cost?" --post_name=how-much-does-a-plumber-cost-gutenberg --post_content="…block markup…"`
   Or use `execute-php` calling `wp_insert_post`.
3. Authoring tip: to get exact markup for any block, build it once in the editor, then use the block options menu and choose Edit as HTML, then copy.

**When you DO need the Block Editor Queue:** only for third-party or JS-serialized blocks, such as Elementor blocks and complex custom blocks, that NovaMira finalizes in a hidden editor iframe. For core blocks (heading, paragraph, list, table), skip it. If needed, the order is `gutenberg-get-finalizer-runtime`, then `gutenberg-add-pending-change`, then `gutenberg-enable-batch-finalization`, and the queue page must be open.

**Verify:** open in wp-admin and confirm blocks are editable, the front end renders all seven sections, and there is one `<h1>`, using either a Heading-level-1 block or the post title H1.

**Trade-off:** client-editable, no plugin lock-in, clean and light HTML, strong SEO. Less pixel control than PHP.

---

## C. Build the Elementor page - client-editable and visual

**What it is:** a visual drag-and-drop builder the client edits in the Elementor UI. Layout is stored as JSON in the `_elementor_data` post meta, a WordPress custom field.

**Never use the `html` widget for tables, FAQs or CTAs.** It is a code box the client can't edit. Use the editable widgets below, which are verified against the installed addons.

**Editable widgets - build the seven sections with these**

- `heading` with `{ title, header_size: "h1"|"h2" }`
- `text-editor` with `{ editor: "<p>…</p>" }`. This rich-text field is acceptable because it is WYSIWYG, not a code box.
- `icon-list` with `{ icon_list: [ { text: "Job complexity" }, … ] }` for bulleted lists
- `accordion`, Elementor core, with `{ tabs: [ { tab_title: "Q", tab_content: "<p>A</p>" }, … ], title_html_tag: "h3" }` for the FAQ
- `button` with `{ text: "Request a quote", link: { url: "#" } }` for the CTA
- `eael-data-table` from Essential Addons, the editable table, using two repeaters:
  - `eael_data_table_header_cols_data`: `[ { eael_data_table_header_col: "Header" }, … ]`
  - `eael_data_table_content_rows`: a FLAT list. One `{ eael_data_table_content_row_type: "row" }` opens a `<tr>`, then one cell per column as `{ eael_data_table_content_row_type: "col", eael_data_table_content_type: "textarea", eael_data_table_content_row_title: "cell text" }`.

**Data structure of `_elementor_data`:** an array of elements. Each element has:

- `id`, a unique 7-character id
- `elType`, either `container` for modern flexbox, the legacy `section` or `column`, or `widget`
- `settings`, a `{}` config object
- `elements`, an array of children
- `widgetType`, only when `elType: "widget"`, for example `heading`, `text-editor`, `html`, `icon-list`
- The document wrapper uses `version`, currently **0.4**, plus `type: page` and `content: [...]`.

**Minimal example, a container holding heading and text widgets**

```json
[
 {
   "id": "a1b2c3d", "elType": "container", "isInner": false, "settings": {}, "elements": [
     { "id": "h1head0", "elType": "widget", "widgetType": "heading",
       "settings": { "title": "How Much Does a Plumber Cost?", "header_size": "h1" }, "elements": [] },
     { "id": "t1text0", "elType": "widget", "widgetType": "text-editor",
       "settings": { "editor": "<p>Most plumbers charge $45–$200/hr…</p>" }, "elements": [] }
   ]
 }
]
```

**Required post meta, all five must be set**

- `_elementor_data` = the JSON string, using `wp_slash()` when saving via PHP
- `_elementor_edit_mode` = `builder`
- `_elementor_template_type` = `wp-page`
- `_elementor_version` = the current Elementor version
- `_wp_page_template` = `elementor_canvas`, or `elementor_header_footer`

### Build steps

1. Create the page: `wp post create … --post_name=how-much-does-a-plumber-cost-elementor`
2. Write the five meta keys above, via `execute-php` calling `update_post_meta`, with the JSON passed through `wp_slash`.
3. Regenerate CSS. This is REQUIRED, or the page renders unstyled.
   ```php
   if (did_action('elementor/loaded')) {
    \Elementor\Plugin::instance()->files_manager->clear_cache();
   }
   ```
4. Keep the JSON SMALL for the demo: hero heading, text, one table widget, and an icon-list FAQ. Elementor JSON balloons fast.

**Verify:** open in the Elementor editor and confirm widgets are editable, and that the front end renders AND is styled, which confirms the CSS regeneration worked.

**Trade-off:** non-technical clients get full visual editing. Heaviest output with extra CSS and JS and more requests, JSON is fiddly via MCP, plugin lock-in means disabling Elementor breaks the layout, and it is the slowest to render.

---

## Pick a method - the on-camera summary

- **Custom PHP** for dev-owned, pixel-perfect, speed-critical pages. Your default.
- **Gutenberg** when the client needs to edit content, for blog and most marketing pages. Best speed and SEO of the editable options.
- **Elementor** when a non-technical client needs full visual control and you accept the weight and lock-in.

One line: "Default to custom PHP for control and speed; hand it to Gutenberg when the client edits text; reach for Elementor only when they need to move things visually themselves."

---

## Verification checklist - run for all three

- [ ] URL returns HTTP 200, no "Fatal error"
- [ ] Exactly one `<h1>`, containing the keyword
- [ ] `<title>` 60 characters or fewer, meta description 160 or fewer
- [ ] Table, list and FAQ all present
- [ ] Minified CSS loaded, on the PHP version
- [ ] Elementor: the page is STYLED on the front end, proving CSS was regenerated
- [ ] Gutenberg and Elementor: the page is editable in the right editor
- [ ] **No code blocks in editable builds** - zero `wp:html` in Gutenberg and zero `widgetType:"html"` in Elementor
- [ ] **Exactly one `<header>` and one `<footer>`** in the rendered HTML, with no doubled chrome
- [ ] Log the URLs so the three can be compared side by side

---

## Sources (key references, 40+ consulted)

**WordPress core and PHP**
- developer.wordpress.org - the `template_redirect` hook, which warns to prefer `template_include`
- developer.wordpress.org - the `template_include` filter, and `wp_insert_post()`
- macarthur.me - programmatically create a static page in WordPress
- gist (Maximilianos) - register custom page templates programmatically
- solarisedesign.com - `template_include` vs `template_redirect`

**Gutenberg**
- WordPress/gutenberg GitHub issues 13163, 17200 and 17849 - blocks in `post_content` via `wp_insert_post`
- rudrastyh.com - create block patterns programmatically, using block-comment markup
- kinsta.com - Gutenberg block development · thecode.co - migrating content into blocks

**Elementor**
- developers.elementor.com - data structure, general structure and general elements covering elType, widgetType and version 0.4
- elementor.com/help - Regenerate CSS and Data · GitHub elementor discussions 19166 and 21642 - `files_manager->clear_cache()`
- oreateai.com - unpacking the Elementor template JSON

**Builder comparisons on performance and SEO**
- wedevs.com · unlimited-elements.com · zozothemes.com · amandubey.com · wichitadesigns.com - Gutenberg vs Elementor speed and SEO for 2025-2026. Gutenberg produces lighter and cleaner output; Elementor is heavier and needs optimization.
