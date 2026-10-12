import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE } from './site.config';

export interface PageMeta {
  /** Page title without the site name; omit for the home page. */
  readonly title?: string;
  readonly description: string;
  /** Path starting with "/", used for the canonical URL and social URL. */
  readonly path: string;
  readonly image?: string;
  readonly imageAlt?: string;
  readonly noindex?: boolean;
  /** Structured data (schema.org JSON-LD) for this page, replacing the previous page's. */
  readonly jsonLd?: readonly object[];
}

/** Sets the document title, description, canonical link and social-card tags for each page. */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  set(page: PageMeta): void {
    const fullTitle = page.title ? `${page.title} | ${SITE.name}` : `${SITE.name} | ${SITE.tagline}`;
    const url = SITE.url + (page.path === '/' ? '/' : page.path);
    const image = SITE.url + (page.image ?? SITE.ogImage);

    this.title.setTitle(fullTitle);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ name: 'robots', content: page.noindex ? 'noindex, nofollow' : 'index, follow' });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:locale', content: 'en_IN' });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: page.imageAlt ?? `${SITE.name}: ${SITE.tagline}` });
    this.meta.updateTag({ name: 'twitter:image:alt', content: page.imageAlt ?? `${SITE.name}: ${SITE.tagline}` });
    this.meta.updateTag({ property: 'og:site_name', content: SITE.name });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);

    this.setJsonLd(page.jsonLd ?? []);
  }

  private setJsonLd(items: readonly object[]): void {
    this.doc.querySelectorAll('script[data-nw-jsonld]').forEach((el) => el.remove());
    for (const item of items) {
      const script = this.doc.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('data-nw-jsonld', '');
      // "<" is escaped so structured data can never close the script tag.
      script.textContent = JSON.stringify({ '@context': 'https://schema.org', ...item }).replace(/</g, '\\u003c');
      this.doc.head.appendChild(script);
    }
  }
}
