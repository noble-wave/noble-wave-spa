// Fails the build when a prerendered page is missing SEO basics. Run after `ng build` (see postbuild).
import { existsSync, readFileSync, statSync } from 'node:fs';
import { PRODUCTS } from '../src/app/core/products.config.ts';
import { SITE } from '../src/app/core/site.config.ts';

const dir = 'dist/noble-wave/browser';
const pages = [
  ['/', 'index.html'],
  ['/products', 'products/index.html'],
  ...PRODUCTS.map((p) => [`/products/${p.id}`, `products/${p.id}/index.html`]),
  ['/about', 'about/index.html'],
  ['/contact', 'contact/index.html'],
  ['/privacy', 'privacy/index.html'],
  ['/terms', 'terms/index.html'],
];

const problems = [];
const titles = new Map();
const descriptions = new Map();
const attr = (html, re) => html.match(re)?.[1];

for (const [route, file] of pages) {
  const path = `${dir}/${file}`;
  if (!existsSync(path)) {
    problems.push(`${route}: not prerendered (${file} missing)`);
    continue;
  }
  const html = readFileSync(path, 'utf8');
  const fail = (msg) => problems.push(`${route}: ${msg}`);

  const title = attr(html, /<title>([^<]*)<\/title>/);
  if (!title) fail('missing <title>');
  else {
    if (title.length > 70) fail(`title is ${title.length} characters (keep it under 70)`);
    if (titles.has(title)) fail(`title duplicates ${titles.get(title)}`);
    titles.set(title, route);
  }

  const desc = attr(html, /<meta name="description" content="([^"]*)"/);
  if (!desc) fail('missing meta description');
  else {
    if (desc.length < 50 || desc.length > 175) fail(`meta description is ${desc.length} characters (aim for 50 to 175)`);
    if (descriptions.has(desc)) fail(`description duplicates ${descriptions.get(desc)}`);
    descriptions.set(desc, route);
  }

  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const expected = SITE.url + route;
  if (canonical !== expected) fail(`canonical is ${canonical}, expected ${expected}`);

  for (const prop of ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt']) {
    if (!new RegExp(`<meta property="${prop}" content="[^"]+"`).test(html)) fail(`missing ${prop}`);
  }
  const ogImage = attr(html, /<meta property="og:image" content="([^"]*)"/);
  if (ogImage?.startsWith(SITE.url)) {
    const local = `${dir}${ogImage.slice(SITE.url.length)}`;
    if (!existsSync(local) || statSync(local).size === 0) fail(`og:image file not found: ${local}`);
  }

  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) fail(`has ${h1} <h1> elements (expected 1)`);

  for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\balt="/.test(tag)) fail(`image without alt text: ${tag.slice(0, 90)}`);
  }

  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  for (const m of ld) {
    try {
      JSON.parse(m[1]);
    } catch {
      fail('structured data is not valid JSON');
    }
  }
  const types = ld.map((m) => { try { return JSON.parse(m[1])['@type']; } catch { return ''; } });
  if (route === '/' && !types.includes('Organization')) fail('missing Organization structured data');
  if (route.startsWith('/products/') && !types.includes('SoftwareApplication')) fail('missing SoftwareApplication structured data');
}

for (const file of ['sitemap.xml', 'robots.txt', '404.html', 'CNAME']) {
  if (!existsSync(`${dir}/${file}`)) problems.push(`${file} missing from the build output`);
}
if (existsSync(`${dir}/sitemap.xml`)) {
  const sitemap = readFileSync(`${dir}/sitemap.xml`, 'utf8');
  for (const [route] of pages) {
    if (!sitemap.includes(`<loc>${SITE.url}${route}</loc>`)) problems.push(`${route}: not in sitemap.xml`);
  }
}

if (problems.length) {
  console.error('seo-check failed:\n - ' + problems.join('\n - '));
  process.exit(1);
}
console.log(`seo-check: ${pages.length} pages OK`);
