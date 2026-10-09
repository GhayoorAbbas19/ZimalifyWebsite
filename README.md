# Zimalify website

Static marketing site for Zimalify: app portfolio, services, process, reviews, FAQ, contact, plus legal and support pages required by the app stores.

No build step. Open `index.html` in a browser, or run a tiny server:

```bash
python3 -m http.server 8080
```

## Files

| File | What it is |
|---|---|
| `index.html` | Main one-page site |
| `js/apps-data.js` | **Edit this** to add/change apps, store links, testimonials. Each app has an optional `it` block for Italian copy |
| `js/i18n.js` | **All UI text in English and Italian.** Edit strings here; HTML uses `data-i18n="key"` hooks |
| `js/main.js` | Filters, animations, form handling |
| `css/styles.css` | All styling; brand colors are in `:root` at the top |
| `privacy.html`, `terms.html` | Legal pages (link these from App Store Connect / Play Console) |
| `support.html` | Support URL for store listings; lists every app automatically |
| `404.html` | Not-found page (GitHub Pages and Netlify pick it up automatically) |
| `assets/` | Favicon; put app icons and screenshots here |

## To-do before going live

1. **Apps:** five real apps are in `js/apps-data.js` (CleanerZX, Finovo, MealBurn, PulseState, SipTrack), all iOS-only. When an Android version ships, add its `playStore` URL and `"android"` to `platforms`. To add a new app, copy an entry and drop its icon and screenshots into `assets/apps/<slug>/`.
2. **Contact form:** create a free form at https://formspree.io, then replace `YOUR_FORM_ID` in `index.html` with your form ID.
3. **Emails:** all contact and support links point to `contact@zimalify.com`.
4. **Domain:** zimalify.com is set in `CNAME`, the canonical URL, `robots.txt` and `sitemap.xml`.
5. **Social preview:** `assets/og-image.png` (1200×630) is generated; replace with a designed one any time.
6. **Legal:** `privacy.html` and `terms.html` are written for on-device apps using Apple Health, ads (MealBurn) and subscriptions. Re-read them when an app's data use changes.
7. **About:** update the founder quote if you like; social links are limited to GitHub and email until you want more.
8. **Hero numbers:** the four hero stats (`data-count` attributes in `index.html`) currently say 5 apps, 3 categories, 100% native Swift, 24h reply. Update when apps or claims change.
10. **Testimonials:** the section is removed from `index.html` for launch. Example data remains in `js/apps-data.js`; when you have real reviews, re-add the section (see git history) and replace the quotes.
9. **Store badges:** the site uses lightweight CSS badges. If you prefer the official artwork, download it from Apple (App Store Marketing Guidelines) and Google (Play Badge Generator) and swap the markup in `js/main.js` → `badges()`.

## Deploy to GitHub Pages with zimalify.com

1. **GitHub Desktop:** File → Add Local Repository → choose this folder → "create a repository" when prompted. Commit all files, then **Publish repository** (public, name it `zimalify-website` or similar).
2. **Enable Pages:** on github.com open the repo → Settings → Pages → Source "Deploy from a branch", branch `main`, folder `/ (root)` → Save. The `CNAME` file in this folder tells GitHub the custom domain automatically.
3. **DNS at your domain registrar** (where you bought zimalify.com), add these records:

   | Type | Host | Value |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | `<your-github-username>.github.io` |

4. Back in Settings → Pages, confirm the custom domain shows `zimalify.com`, wait for the DNS check to pass (minutes to a few hours), then tick **Enforce HTTPS**.
5. Every later change: commit and push from GitHub Desktop; the site updates within about a minute.

**Alternatives:** Netlify/Vercel (drag the folder onto the dashboard, no build command, root as publish directory, then add the domain in their UI), or cPanel/FTP (upload everything to `public_html`).

## Languages

The home page is bilingual (English / Italian) with a switch in the nav. The language is chosen in this order: `?lang=it` in the URL, the visitor's saved choice, then the browser language, falling back to English. Legal and support pages stay in English.

- UI strings: `js/i18n.js` (`en` and `it` blocks, same keys). Strings containing HTML tags are inserted as HTML.
- App copy: the `it: { tagline, description, highlights }` block on each app in `js/apps-data.js`.
- To add a language: add a code to `ZIMALIFY_LANGS`, copy the `it` block in `js/i18n.js`, translate, and optionally add the same code block to each app.
- Share an Italian link with `https://zimalify.com/?lang=it`.

## Animations

Hero words rise in one by one, the gradient text shimmers, hero glows drift, cards stagger in as you scroll, the hero phone tilts toward the cursor, cards get a cursor spotlight, buttons have a shine sweep, the process line draws in, and a progress bar tracks scroll at the top. Everything is disabled automatically when the visitor's OS has "Reduce motion" on.

## Brand

- Name: Zimalify. Tagline: "We build mobile apps people love to keep."
- Colors: blue `#3B82F6` → violet `#8B5CF6` gradient on dark `#070A12`, cyan `#22D3EE` accent.
- Fonts: Outfit (headings), Inter (body), both from Google Fonts.
