// Writes sitemap.xml into the build output, listing every prerendered route with a real lastmod date
// (the date of the latest commit, so unchanged builds do not claim fresh content).
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { PRODUCTS } from '../src/app/core/products.config.ts';
import { SITE } from '../src/app/core/site.config.ts';

const dir = 'dist/noble-wave/browser';

function lastmod() {
  try {
    const day = execFileSync('git', ['-c', 'safe.directory=*', 'log', '-1', '--format=%cs'], { encoding: 'utf8' }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(day)) {
      return day;
    }
  } catch {
    // Not a git checkout: fall through.
  }
  return new Date().toISOString().slice(0, 10);
}

const date = lastmod();
const routes = [
  ['/', '1.0'],
  ['/products', '0.9'],
  ...PRODUCTS.map((p) => [`/products/${p.id}`, '0.8']),
  ['/about', '0.6'],
  ['/contact', '0.6'],
  ['/privacy', '0.3'],
  ['/terms', '0.3'],
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(([path, priority]) => `  <url><loc>${SITE.url}${path}</loc><lastmod>${date}</lastmod><priority>${priority}</priority></url>`).join('\n')}
</urlset>
`;
writeFileSync(`${dir}/sitemap.xml`, xml);
console.log(`make-sitemap: wrote ${dir}/sitemap.xml (${routes.length} URLs, lastmod ${date})`);
