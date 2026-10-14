// Generates the 1200x630 link-preview (Open Graph) cards in public/images/og using headless Chrome.
// Run `node scripts/make-og.mjs` after changing a product or the site tagline. Needs Chrome or Edge.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { PRODUCTS } from '../src/app/core/products.config.ts';
import { SITE } from '../src/app/core/site.config.ts';

const root = resolve(import.meta.dirname, '..');
const outDir = join(root, 'public/images/og');
const img = (p) => pathToFileURL(join(root, 'public/images', p)).href;
const font = pathToFileURL(join(root, 'node_modules/@fontsource-variable/manrope/files/manrope-latin-wght-normal.woff2')).href;
const logo = 'data:image/svg+xml;base64,' + readFileSync(join(root, 'public/images/logo.svg')).toString('base64');

const CHROME = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => p && existsSync(p));
if (!CHROME) {
  console.error('make-og: Chrome or Edge not found. Set CHROME_PATH.');
  process.exit(1);
}

const css = `
@font-face{font-family:M;src:url(${font});font-weight:200 800}
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;overflow:hidden;font-family:M,sans-serif;color:#06232f;position:relative;
 background:radial-gradient(900px 520px at 100% 0%,#bfe6ee 0%,transparent 60%),radial-gradient(700px 500px at 0% 100%,#d9f0e6 0%,transparent 60%),#f4fafc}
.logo{position:absolute;left:64px;top:56px;height:34px}
.wave{position:absolute;left:0;right:0;bottom:0;height:150px;opacity:.9}
.pill{display:inline-block;padding:8px 18px;border-radius:999px;background:#0e7490;color:#fff;font-weight:700;font-size:22px;margin-right:10px}
.pill.o{background:#fff;color:#0a566c;border:2px solid #c5dce5}
`;

const wave = `<svg class="wave" viewBox="0 0 1200 150" preserveAspectRatio="none"><path d="M0 70 C200 10 350 130 600 70 S1000 10 1200 60 V150 H0Z" fill="#0e7490" opacity=".12"/><path d="M0 100 C250 50 400 150 650 100 S1000 60 1200 100 V150 H0Z" fill="#0e7490" opacity=".2"/></svg>`;

const phone = (file, style) => `<img src="${img('story/' + file + '.webp')}" style="position:absolute;filter:drop-shadow(0 24px 40px rgba(6,35,47,.35));${style}">`;

const cards = {
  default: `
    <img class="logo" src="${logo}">
    <div style="position:absolute;left:64px;top:150px;width:560px">
      <h1 style="font-size:64px;line-height:1.05;font-weight:800;letter-spacing:-1.5px">Useful apps for PDFs, prayer and rentals</h1>
      <p style="margin-top:26px;font-size:28px;line-height:1.35;color:#3f5e6b">PDF Workshop, Noble Salah Guide, Rent Manager and Noble Qaida. Made in ${SITE.location}.</p>
    </div>
    ${wave}
    ${phone('salah-prayer-times', 'left:690px;top:70px;height:520px;transform:rotate(-5deg)')}
    ${phone('rent-portfolio', 'left:890px;top:110px;height:520px;transform:rotate(4deg)')}
    <div style="position:absolute;left:640px;top:360px;width:330px;height:206px;border-radius:14px;overflow:hidden;box-shadow:0 24px 40px rgba(6,35,47,.3);border:6px solid #0b2530;background:#0b2530">
      <img src="${img('products/pdf-1.webp')}" style="width:100%;height:100%;object-fit:cover"></div>`,
};

for (const p of PRODUCTS) {
  const visual =
    p.device === 'phone'
      ? [p.story[0], p.story[1] ?? p.story[0]]
          .map((s, i) => phone(s.file, i === 0 ? 'left:700px;top:60px;height:540px;transform:rotate(-4deg)' : 'left:900px;top:110px;height:540px;transform:rotate(4deg)'))
          .join('')
      : `<div style="position:absolute;left:600px;top:130px;width:560px;height:350px;border-radius:16px;overflow:hidden;border:8px solid #0b2530;background:#0b2530;box-shadow:0 30px 50px rgba(6,35,47,.35)"><img src="${img('products/' + p.story[0].file + '.webp')}" style="width:100%;height:100%;object-fit:cover;object-position:top"></div>
         <div style="position:absolute;left:560px;top:488px;width:640px;height:18px;border-radius:0 0 22px 22px;background:#0b2530"></div>`;
  cards[p.id] = `
    <img class="logo" src="${logo}">
    <div style="position:absolute;left:64px;top:170px;width:${p.device === 'phone' ? 580 : 500}px">
      <div>${p.platforms.map((x) => `<span class="pill${x === 'Web' ? '' : ' o'}">${x}</span>`).join('')}</div>
      <h1 style="margin-top:26px;font-size:${p.name.length > 14 ? 66 : 76}px;line-height:1.02;font-weight:800;letter-spacing:-2px">${p.name}</h1>
      <p style="margin-top:22px;font-size:30px;line-height:1.3;color:#3f5e6b">${p.tagline}</p>
    </div>
    ${wave}${visual}`;
}

mkdirSync(outDir, { recursive: true });
const tmp = mkdtempSync(join(tmpdir(), 'nw-og-'));
try {
  for (const [name, body] of Object.entries(cards)) {
    const html = join(tmp, name + '.html');
    writeFileSync(html, `<!doctype html><meta charset="utf-8"><style>${css}</style><body>${body}</body>`);
    const out = join(outDir, name + '.png');
    execFileSync(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files', '--force-device-scale-factor=1', '--window-size=1200,630', `--screenshot=${out}`, '--virtual-time-budget=4000', pathToFileURL(html).href], { stdio: 'ignore' });
    console.log('make-og: wrote public/images/og/' + name + '.png');
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
