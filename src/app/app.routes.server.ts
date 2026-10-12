import { RenderMode, ServerRoute } from '@angular/ssr';
import { PRODUCTS } from './core/products.config';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'products/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => PRODUCTS.map((p) => ({ slug: p.id })),
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
