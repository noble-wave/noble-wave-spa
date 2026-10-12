import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { SeoService } from './seo.service';

describe('SeoService', () => {
  const meta = (sel: string) => TestBed.inject(DOCUMENT).querySelector(sel)?.getAttribute('content');

  it('sets title, description, canonical and social tags for a page', () => {
    TestBed.inject(SeoService).set({ title: 'Services', description: 'What we do.', path: '/services' });
    const doc = TestBed.inject(DOCUMENT);

    expect(doc.title).toBe('Services | Noble Wave');
    expect(meta('meta[name="description"]')).toBe('What we do.');
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://noble-wave.com/services');
    expect(meta('meta[property="og:url"]')).toBe('https://noble-wave.com/services');
    expect(meta('meta[property="og:image"]')).toContain('https://noble-wave.com/');
    expect(meta('meta[name="robots"]')).toBe('index, follow');
  });

  it('uses the tagline as the title on the home page', () => {
    TestBed.inject(SeoService).set({ description: 'Home.', path: '/' });
    expect(TestBed.inject(DOCUMENT).title).toContain('Your Trusted IT Development Partner');
  });

  it('marks noindex pages and reuses a single canonical link', () => {
    const seo = TestBed.inject(SeoService);
    seo.set({ title: 'A', description: 'a', path: '/a' });
    seo.set({ title: 'Missing', description: 'm', path: '/404', noindex: true });
    const doc = TestBed.inject(DOCUMENT);

    expect(meta('meta[name="robots"]')).toBe('noindex, nofollow');
    expect(doc.querySelectorAll('link[rel="canonical"]').length).toBe(1);
  });
});
