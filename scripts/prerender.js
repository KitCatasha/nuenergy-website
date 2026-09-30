import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { render } from '../.ssr/entry-server.js';

const path = new URL('../dist/index.html', import.meta.url);
const template = await readFile(path, 'utf8');

await writeFile(
  path,
  template.replace('<!--app-html-->', await render('/'))
);

let contact = template.replace(
  '<!--app-html-->',
  await render('/contact/')
);

contact = contact
  .replace(
    '<title>NU Energy Nutrition</title>',
    '<title>Contact Us | NÜenergy</title>'
  )
  .replace(
    'href="https://www.nuenergy-nutrition.com/"',
    'href="https://www.nuenergy-nutrition.com/contact/"'
  )
  .replace(
    /(<meta name="description" content=")[^"]+/,
    '$1Contact NÜenergy about our natural energy gels, products and partnerships.'
  );

await mkdir(
  new URL('../dist/contact/', import.meta.url),
  { recursive: true }
);

await writeFile(
  new URL('../dist/contact/index.html', import.meta.url),
  contact
);

console.log('Prerendered homepage and contact page.');