import { Routes } from '@angular/router';
import { SiteLayout } from './layout/site-layout';

export const routes: Routes = [
  {
    path: '',
    component: SiteLayout,
    children: [
      { path: '', pathMatch: 'full', loadComponent: () => import('./pages/home/home').then((m) => m.Home) },
      { path: 'about', loadComponent: () => import('./pages/about/about').then((m) => m.About) },
      { path: 'products', loadComponent: () => import('./pages/products/products').then((m) => m.Products) },
      // The app used to be called Rent Manager; keep links to its old address working.
      { path: 'products/rent-manager', redirectTo: '/products/rentiva' },
      {
        path: 'products/:slug',
        loadComponent: () => import('./pages/product-detail/product-detail').then((m) => m.ProductDetail),
      },
      { path: 'contact', loadComponent: () => import('./pages/contact/contact').then((m) => m.Contact) },
      {
        path: 'privacy',
        data: { doc: 'privacy' },
        loadComponent: () => import('./pages/legal/legal').then((m) => m.Legal),
      },
      {
        path: 'terms',
        data: { doc: 'terms' },
        loadComponent: () => import('./pages/legal/legal').then((m) => m.Legal),
      },
      { path: '**', loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound) },
    ],
  },
];
