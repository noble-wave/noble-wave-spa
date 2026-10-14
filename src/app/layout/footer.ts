import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRODUCTS } from '../core/products.config';
import { LEGAL_LINKS, NAV_LINKS, SITE, WHATSAPP_URL } from '../core/site.config';
import { Icon } from '../shared/ui/icon';

/** Closing band of every page: brand, navigation, the products, contact details and legal links. */
@Component({
  selector: 'nw-footer',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="site-footer">
      <footer class="footer-body">
        <div class="container-page grid grid-cols-2 gap-x-6 gap-y-9 py-12 lg:grid-cols-[1.5fr_0.7fr_1fr_1.2fr] lg:gap-x-12">
          <div class="col-span-2 lg:col-span-1">
            <a routerLink="/" [attr.aria-label]="site.name + ' home'" class="inline-block">
              <img src="images/logo.svg" alt="" class="h-8 w-auto" width="206" height="33" loading="lazy" />
            </a>
            <p class="footer-tagline mt-4 max-w-xs">{{ site.tagline }}</p>
          </div>

          <nav aria-label="Company">
            <h2 class="footer-heading">Explore</h2>
            <ul class="mt-3">
              @for (l of links; track l.path) {
                <li><a class="footer-link" [routerLink]="l.path">{{ l.label }}</a></li>
              }
            </ul>
          </nav>

          <nav aria-label="Products">
            <h2 class="footer-heading">Our products</h2>
            <ul class="mt-3">
              @for (p of products; track p.id) {
                <li><a class="footer-link" [routerLink]="['/products', p.id]">{{ p.name }}</a></li>
              }
            </ul>
          </nav>

          <div class="col-span-2 lg:col-span-1">
            <h2 class="footer-heading">Get in touch</h2>
            <ul class="mt-3">
              <li class="flex items-center gap-3">
                <nw-icon name="mail" class="footer-accent" />
                <a class="footer-link" [href]="'mailto:' + site.email">{{ site.email }}</a>
              </li>
              <li class="flex items-center gap-3">
                <nw-icon name="phone" class="footer-accent" />
                <a class="footer-link" [href]="'tel:' + site.phone">{{ site.phoneDisplay }}</a>
              </li>
              <li class="flex items-center gap-3">
                <nw-icon name="whatsapp" class="footer-accent" />
                <a class="footer-link" [href]="whatsappUrl" target="_blank" rel="noopener" aria-label="Message us on WhatsApp (opens in a new tab)">WhatsApp us</a>
              </li>
              <li class="flex items-center gap-3">
                <nw-icon name="map-pin" class="footer-accent" />
                <span class="footer-text">{{ site.location }}</span>
              </li>
            </ul>
            <a routerLink="/contact" class="footer-cta mt-4">
              Contact us <nw-icon name="arrow-right" [size]="18" />
            </a>
          </div>
        </div>

        <div class="footer-bar">
          <div class="container-page flex flex-col gap-2 py-4 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p class="footer-text">© {{ year }} {{ site.name }}. All rights reserved.</p>
            <ul class="flex flex-wrap items-center gap-x-6 gap-y-2">
              @for (l of legal; track l.path) {
                <li><a class="footer-link" [routerLink]="l.path">{{ l.label }}</a></li>
              }
              <li>
                <button type="button" class="footer-link inline-flex items-center gap-1.5" (click)="toTop()">
                  Back to top <nw-icon name="arrow-right" [size]="14" class="-rotate-90" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  `,
})
export class Footer {
  protected readonly site = SITE;
  protected readonly whatsappUrl = WHATSAPP_URL;
  protected readonly links = NAV_LINKS;
  protected readonly legal = LEGAL_LINKS;
  protected readonly products = PRODUCTS;
  protected readonly year = new Date().getFullYear();

  private readonly doc = inject(DOCUMENT);

  protected toTop(): void {
    this.doc.defaultView?.scrollTo({ top: 0 });
  }
}
