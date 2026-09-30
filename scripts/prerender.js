import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { render } from '../.ssr/entry-server.js';

const output = new URL('../dist/', import.meta.url);
const template = await readFile(new URL('index.html', output), 'utf8');
const site = 'https://www.nuenergy-nutrition.com';

const routes = [
  {
    path: '/',
    file: 'index.html',
    title: 'NÜenergy | Natural Energy Gels for Athletes',
    description: 'Discover NÜenergy coconut palm and mango energy gels. Each 37 g pouch provides 29 g of carbohydrates, natural electrolytes and 120 calories.',
  },
  {
    path: '/contact/',
    file: 'contact/index.html',
    title: 'Contact Us | NÜenergy',
    description: 'Contact NÜenergy about our natural energy gels, product enquiries and partnerships. Email contact@nuenergy-nutrition.com or use our contact form.',
  },
];

const escape = value => value.replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]);

function setMeta(html, attribute, name, value) {
  const tag = `<meta ${attribute}="${name}" content="${escape(value)}" />`;
  const pattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}="${name}")[^>]*>`, 'i');
  return pattern.test(html) ? html.replace(pattern, () => tag) : html.replace('</head>', `${tag}\n</head>`);
}

for (const route of routes) {
  let html = template.replace('<!--app-html-->', await render(route.path));
  html = html.replace(/<title>[^<]*<\/title>/i, () => `<title>${escape(route.title)}</title>`);
  const canonical = `<link rel="canonical" href="${site}${route.path}" />`;
  html = html.replace(/<link\b(?=[^>]*\brel="canonical")[^>]*>/i, () => canonical);
  html = setMeta(html, 'name', 'description', route.description);
  html = setMeta(html, 'property', 'og:title', route.title);
  html = setMeta(html, 'property', 'og:description', route.description);
  html = setMeta(html, 'property', 'og:url', `${site}${route.path}`);
  html = setMeta(html, 'name', 'twitter:title', route.title);
  html = setMeta(html, 'name', 'twitter:description', route.description);
  const destination = new URL(route.file, output);
  await mkdir(new URL('./', destination), { recursive: true });
  await writeFile(destination, html);
}

console.log('Prerendered homepage and contact page with route-specific SEO metadata.');
