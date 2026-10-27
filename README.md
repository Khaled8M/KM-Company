# KM-COMPANY Portfolio v2 (Cloudflare Pages)

Static site, 4 languages as real pages: `/` (EN), `/ar/`, `/it/`, `/pt/` (+ `projects.html` in each).

## Before publishing (important)
Replace the `__SITE_URL__` placeholder with your real domain (canonical, hreflang, og:image, sitemap):
- Linux/macOS: `sh set-domain.sh https://your-domain.com`
- Windows PowerShell: `.\set-domain.ps1 https://your-domain.com`

## Deploy
Cloudflare Pages -> upload this folder, empty build command, output directory = root.

## Notes
- Loader: logo + gold effects, ~2.9 s, once per browser session (to show it every visit, delete the `sessionStorage` line in the head script of each page).
- Background: `assets/images/bg-waves.webp` (CSS class `.waves`). Hero: `assets/images/hero.webp`. Founder: `assets/images/founder.webp`.
- Fonts are self-hosted (Inter, Playfair Display, Noto Sans Arabic); no external requests.
- Colours are CSS variables at the top of `css/style.css` (`--gold`, `--ink`, `--bg` ...).
- TERRADUX3K remains labelled as a development concept; AGRI-EYE indicators as screening proxies.
