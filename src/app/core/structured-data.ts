import { FAQ } from './content.config';
import { PRODUCTS, Product } from './products.config';
import { SITE } from './site.config';

const ORG_ID = `${SITE.url}/#organization`;

const abs = (path: string): string => (path.startsWith('http') ? path : SITE.url + path);

/** Where a product's link-preview card lives (see scripts/make-og.mjs). */
export const productOgImage = (p: Product): string => `/images/og/${p.id}.png`;

/** schema.org Organization and WebSite, emitted on the home page. */
export function organizationData(): object[] {
  return [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: SITE.name,
      url: SITE.url,
      logo: abs('/images/logo-512.png'),
      description: SITE.description,
      knowsAbout: ['PDF tools', 'Prayer times and Islamic tools', 'Rental property management', 'Web and mobile apps'],
      address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' },
      contactPoint: { '@type': 'ContactPoint', telephone: SITE.phone, email: SITE.email, contactType: 'customer support' },
      ...(SITE.social.length ? { sameAs: SITE.social } : {}),
    },
    { '@type': 'WebSite', '@id': `${SITE.url}/#website`, url: SITE.url, name: SITE.name, publisher: { '@id': ORG_ID }, inLanguage: 'en' },
    faqPage(FAQ),
  ];
}

/** schema.org ItemList of every product, emitted on the products page. */
export function productListData(): object[] {
  return [
    {
      '@type': 'ItemList',
      name: `${SITE.name} products`,
      itemListElement: PRODUCTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE.url}/products/${p.id}`,
        name: p.name,
      })),
    },
    breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Products', path: '/products' }]),
  ];
}

/** schema.org SoftwareApplication plus breadcrumbs for one product page. */
export function productData(p: Product): object[] {
  const external = p.links.map((l) => l.url);
  return [
    {
      '@type': 'SoftwareApplication',
      name: p.name,
      description: p.description,
      url: `${SITE.url}/products/${p.id}`,
      applicationCategory: p.category,
      operatingSystem: p.platforms.join(', '),
      image: abs(productOgImage(p)),
      screenshot: p.screenshots.map((s) => abs(`/images/products/${s.file}.webp`)),
      featureList: p.features,
      downloadUrl: p.links.find((l) => l.kind === 'play' || l.kind === 'download')?.url,
      sameAs: external,
      author: { '@id': ORG_ID },
      publisher: { '@id': ORG_ID },
      ...(p.free ? { offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' } } : {}),
    },
    faqPage(p.faq),
    breadcrumbs([
      { name: 'Home', path: '/' },
      { name: 'Products', path: '/products' },
      { name: p.name, path: `/products/${p.id}` },
    ]),
  ];
}

/** schema.org FAQPage. Answer engines quote these question and answer pairs directly. */
function faqPage(items: readonly { q: string; a: string }[]): object {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({ '@type': 'Question', name: i.q, acceptedAnswer: { '@type': 'Answer', text: i.a } })),
  };
}

function breadcrumbs(trail: readonly { name: string; path: string }[]): object {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: SITE.url + t.path })),
  };
}
