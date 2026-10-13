// Writes llms.txt into the build output: a plain-markdown summary of the site for AI assistants and crawlers
// (https://llmstxt.org). It is generated from the same config the pages use, so it never drifts from the site.
import { writeFileSync } from 'node:fs';
import { PRODUCTS } from '../src/app/core/products.config.ts';
import { FAQ } from '../src/app/core/content.config.ts';
import { SITE } from '../src/app/core/site.config.ts';

const dir = 'dist/noble-wave/browser';

const product = (p) => {
  const links = p.links.map((l) => `[${l.label}](${l.url})`).join(', ');
  return [
    `### [${p.name}](${SITE.url}/products/${p.id})`,
    `${p.tagline}. ${p.description}`,
    '',
    ...p.features.map((f) => `- ${f}`),
    '',
    `Platforms: ${p.platforms.join(', ')}. ${p.free ? 'Free to use.' : ''} ${links}`.replace(/\s+/g, ' ').trim(),
  ].join('\n');
};

const text = `# ${SITE.name}

> ${SITE.description}

${SITE.name} is based in ${SITE.location}. We build, host and support our own apps. Contact: ${SITE.email}.

## Products

${PRODUCTS.map(product).join('\n\n')}

## Pages

- [Home](${SITE.url}/): what ${SITE.name} makes
- [Products](${SITE.url}/products): all apps
- [About](${SITE.url}/about): who we are and how we work
- [Contact](${SITE.url}/contact): email, phone and WhatsApp
- [Privacy Policy](${SITE.url}/privacy)
- [Terms of Service](${SITE.url}/terms)

## Frequently asked questions

${FAQ.map((f) => `**${f.q}** ${f.a}`).join('\n\n')}
`;

writeFileSync(`${dir}/llms.txt`, text);
console.log(`make-llms: wrote ${dir}/llms.txt (${text.length} characters)`);
