# NÜenergy website migration

Standalone Vue version of https://www.nuenergy-nutrition.com/, adapted from the owner's Hostinger backup. Original design and Vue components by the original website developer; migration and static-hosting adaptation prepared with Natasha.

## Local preview

Use Node.js 22 or newer. Open a terminal inside this folder:

```powershell
npm ci
npm run dev
```

Open the localhost address printed by Vite. Do not double-click index.html.

For a production preview:

```powershell
npm run build
npm run preview
```

The build prerenders the homepage into dist/index.html. Vue hydrates it in the browser; no PHP, database, or running Node.js server is needed on the host.

## Edit content

| Content | File |
| --- | --- |
| Product descriptions, colours, order URLs | src/content/flavours.json |
| Rotating hero messages | src/js/Components/Hero.vue |
| About | src/js/Components/About.vue |
| Pouch section | src/js/Components/Inovative.vue |
| Info | src/js/Components/Info.vue |
| Benefits | src/js/Components/Benefits.vue |
| Nutrition | src/js/Components/NutritionFact.vue |
| Footer/social/contact links | src/js/Components/Footer.vue |
| Header menu | src/App.vue and src/js/Components/Navbar.vue |
| Styles | src/css/app.css and tailwind.config.cjs |
| Title, description, canonical URL | index.html |
| Images/fonts | src/images and src/fonts |
| Product images | public/storage/img |

Edit description in flavours.json; use \n for new lines. Formatting is derived automatically. Keep valid JSON. Product data was captured from the public homepage on 30 September 2026 UTC; compare with the downloaded database if products changed since the backup.

## Cloudflare Pages settings

- Build command: npm run build
- Output directory: dist
- Root directory: blank when this folder's contents are at the GitHub repository root
- Node version: 22 (NODE_VERSION=22 if needed)

Review the temporary pages.dev site before connecting the domain. Keep Hostinger until the site works and email/other hosted sites are accounted for. Domain renewal and email are separate from free static hosting. Only publish dist for a direct upload; do not publish the Hostinger backup.

## Changes and remaining review

Preserved the seven sections, copy, images, colours and rotating hero messages. Replaced Laravel/Inertia with standalone Vue and moved flavours into JSON. The menu is now controlled by Vue; it closes through its button, backdrop, Escape and navigation links. Kept favicons/manifest and added prerendering, a 404 page and reduced-motion styling.

Original footer contact/social links remain '#' placeholders. Order Now still points to coconutrate.com for both flavours, matching the live site. Confirm intended destinations before publishing. Original nutrition and health claims were kept unchanged for business-owner review.

Authentication, dashboard, flavour-management backend, database, SQL backups and credentials are excluded. Future edits use source code. No live domain or hosting changes were made.

## Portfolio

Credit the original developer's design/code; describe your work as migration, static-hosting adaptation, content updates, and subsequent improvements. Confirm rights to publish third-party code/assets before making the repository public. No new open-source license has been assigned.

## Validation

Production build and prerender passed. Output asset references were checked locally. Browser verification could not run because the browser download was unavailable; check desktop/mobile appearance, menu, animations and similarity with the live site locally before deployment.

## Animation fix

Moved AOS attributes from Vue transition wrappers onto the actual HTML elements, corrected the Vue 3 hero fade class, and refresh animation positions after mounting. The original timing values are retained. Reduced-motion preferences are respected. Without JavaScript, content stays visible.
