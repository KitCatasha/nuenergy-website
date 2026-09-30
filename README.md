# NÜenergy website

A migration and frontend update of my father's sports nutrition website, maintained by me. I adapted the original Laravel/Vue/Inertia frontend for static hosting on Cloudflare Pages, updated the visuals and nutritional content, and connected a contact form.

**Live website:** https://www.nuenergy-nutrition.com/

## My contributions

- Migrated the production frontend from Hostinger to Cloudflare Pages.
- Replaced the Laravel/Inertia dependency with a standalone Vue application and editable JSON product data.
- Added build-time prerendering for the homepage and Contact page.
- Updated the homepage illustration, product pouch artwork and nutrition table.
- Updated navigation and footer links, added a themed Contact page, and removed shopping calls to action.
- Configured email forwarding and tested contact form delivery to the receiving inbox.
- Added page-specific SEO metadata, social sharing metadata, robots.txt and a sitemap.

## Original work and attribution

This project builds on the original website design and Vue components by the original developer.

My portfolio contribution is the migration, frontend adaptation, content updates and subsequent improvements. The original website design and code are credited to their original creator. This repository does not assign a new open-source license or grant permission to reuse third-party assets.

## Technology

Vue 3, Vite, Tailwind CSS, AOS, Vue server rendering at build time, Cloudflare Pages, Cloudflare Workers and Turnstile.

The frontend does not require PHP, a database or a running Node.js server in production. Node.js is used during development and builds. Contact submissions use a separately deployed Worker.

