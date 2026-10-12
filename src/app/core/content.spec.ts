import { routes } from '../app.routes';
import { SERVICES } from './content.config';
import { PRODUCTS } from './products.config';
import { LEGAL_LINKS, NAV_LINKS } from './site.config';

const childPaths = (routes.find((r) => r.path === '' && r.children)?.children ?? []).map((r) => r.path);

describe('site content', () => {
  it('every navigation and legal link has a matching route', () => {
    for (const link of [...NAV_LINKS, ...LEGAL_LINKS]) {
      const path = link.path.replace(/^\//, '');
      expect(childPaths, `no route for ${link.path}`).toContain(path);
    }
  });

  it('has a wildcard route for unknown URLs', () => {
    expect(childPaths).toContain('**');
  });

  it('service ids are unique so footer and page anchors never collide', () => {
    const ids = SERVICES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const s of SERVICES) {
      expect(s.benefits.length).toBeGreaterThan(0);
      expect(s.summary.length).toBeGreaterThan(10);
    }
  });

  it('products have unique slugs, https store links and a walkthrough', () => {
    expect(new Set(PRODUCTS.map((p) => p.id)).size).toBe(PRODUCTS.length);
    for (const p of PRODUCTS) {
      expect(p.links.length).toBeGreaterThan(0);
      for (const l of p.links) {
        expect(l.url.startsWith('https://')).toBe(true);
      }
      expect(p.story.length).toBeGreaterThanOrEqual(3);
    }
  });

  it('lists the exact product links the company supplied', () => {
    const urls = PRODUCTS.flatMap((p) => p.links.map((l) => l.url));
    expect(urls).toContain('https://salah.noble-wave.com/');
    expect(urls).toContain('https://play.google.com/store/apps/details?id=com.noblewave.noblesalah');
    expect(urls).toContain('https://rentiva.noble-wave.com/');
  });
});
