# KM-COMPANY Portfolio — Cloudflare Pages (v6)

Multilingual static portfolio for KM-COMPANY, led by Khaled Al-Bakour. Designed in a black, gold, ivory and beige palette.

## Contents
- `index.html`, `projects.html`: English landing and projects pages.
- `ar/index.html`, `ar/projects.html`, `it/index.html`, `it/projects.html`, `pt/index.html`, `pt/projects.html`: static pages for Arabic, Italian and Portuguese. Language buttons link directly to the matching physical HTML files to avoid directory-index/redirect issues on static hosting.
- `assets/images/`: optimized WebP visuals, including founder, hero, gold-line background and loader artwork.
- `assets/fonts/`: local Noto Sans and Noto Sans Arabic WOFF2 files.
- `assets/videos/km-company-intro.webm`: compressed, muted office video.
- `assets/docs/`: downloadable GIS/remote-sensing CV.
- `_headers`: Cloudflare Pages caching/security headers.
- `_redirects`: only the optional `/en` aliases; locale index pages are not redirected.
- `robots.txt`, `sitemap.xml`: crawler files.

## Current v6 refinements
- Preserved the four desktop language links, while switching to a compact, flag-and-code dropdown on tablet/mobile widths.
- Hid the company name/tagline on narrow screens while keeping the KM logo visible, preventing header overlap with the language, theme and menu controls.
- Kept each language option paired with the equivalent page type (home stays home; projects stays projects) across English, Arabic, Italian and Portuguese.
- Verified all eight language pages, local navigation links and referenced local assets; JavaScript and CSS syntax checks pass. Browser-based visual testing was blocked in the build environment, so final device verification should still be performed after deployment.

## Existing features (v4 baseline)
- Persistent dark/light theme toggle, defaulting to black-and-gold dark mode; the loading splash remains dark.
- Translated Home navigation item across all eight pages.
- Direct language URLs such as `/ar/index.html` and `/ar/projects.html`, avoiding redirect ambiguity for locale switching.
- Additional contact links: `khaled556mb@gmail.com`, `+30 698 193 8474`, and the supplied Facebook profile.
- Casual-copy deterrents block context menus, text selection, copy/cut events, image dragging, common keyboard shortcuts and visible print output. These measures are not strong content protection: browser menus, disabled JavaScript, screenshots and other methods can bypass them. The code deliberately does not detect Developer Tools.
- Extra footer clearance prevents the floating WhatsApp, back-to-top and brand buttons from covering footer content. Header layout is adjusted for RTL and screens narrower than 350px.

## Publish to Cloudflare Pages
Upload the **contents of this folder** as the static site output. Do not upload the ZIP as an archive and do not place this folder inside an extra nested folder. There is no build command; the root directory is the output directory.

## Deployment-specific SEO action
The final Cloudflare Pages hostname has not been supplied for this revision. Replace `YOUR-CLOUDFLARE-PAGES-DOMAIN` in `robots.txt` and `sitemap.xml` with the exact live hostname (without `https://`). Canonical and `hreflang` links in HTML use root-relative paths; ensure social-preview metadata uses the final absolute host for crawlers that do not execute JavaScript.

## Content notes
The Lazio/Sentinel-2 NDVI section is a workflow illustration, not a field-validated Lazio result. TERRADUX3K remains an in-development concept, not certified mine-detection or rescue equipment.

## v5 language-routing and contact-form update

- Language switchers use page-relative links, so the same language page can be reached when previewed at the domain root or below a directory path. Clean language routes are also declared in Cloudflare Pages `_redirects`.
- The contact form is available on the four localized home pages. It does not send data to a backend or store it on this site; submitting opens WhatsApp with a prepared message to the primary contact number. Visitors can edit the name, optional email, service and request details before sending.
- The anti-copy deterrent remains limited to casual browser actions. Text-editing and context-menu behavior is allowed inside the enquiry fields so visitors can complete and correct their own message.

### Publishing note
Upload the **contents** of this folder to Cloudflare Pages, preserving the `ar`, `it`, `pt`, `assets`, `css` and `js` directories. After deployment, test each language from both the home page and projects page.

## V6 language-icon correction
The language picker now uses inline SVG flags/globe symbols rather than emoji glyphs. This avoids device/font-specific broken symbols in the English interface. Desktop language links remain unchanged; mobile menu uses consistent vector icons. English labels are “English”, “Arabic”, “Italian”, and “Portuguese”.
