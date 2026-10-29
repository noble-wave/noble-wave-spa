import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PLAY_QR } from '../../core/qr';
import { PRODUCTS } from '../../core/products.config';
import { SeoService } from '../../core/seo.service';
import { productData, productOgImage } from '../../core/structured-data';
import { CtaBanner } from '../../shared/ui/cta-banner';
import { ProductShowcase } from '../../shared/ui/product-showcase';
import { Faq } from '../../shared/ui/faq';
import { Icon } from '../../shared/ui/icon';
import { ProductVisual } from '../../shared/ui/product-visual';
import { ScreenshotGallery } from '../../shared/ui/screenshot-gallery';
import { SectionHeading } from '../../shared/ui/section-heading';
import { NotFound } from '../not-found/not-found';

@Component({
  selector: 'nw-product-detail',
  imports: [RouterLink, Icon, ProductVisual, ProductShowcase, ScreenshotGallery, SectionHeading, CtaBanner, Faq, NotFound],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (product(); as p) {
      <section class="page-glow">
        <div class="container-page grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:py-24">
          <div>
            <nav aria-label="Breadcrumb" class="text-sm text-muted">
              <a routerLink="/products" class="hover:text-brand">Products</a>
              <span aria-hidden="true"> / </span>
              <span aria-current="page">{{ p.name }}</span>
            </nav>
            <div class="mt-6 flex flex-wrap items-center gap-2">
              @for (pl of p.platforms; track pl) {
                <span class="badge">{{ pl }}</span>
              }
              <span class="badge !bg-transparent !text-muted ring-1 ring-border">Live</span>
            </div>
            <h1 class="h-display mt-4">{{ p.name }}</h1>
            <p class="lead mt-5">{{ p.tagline }}.</p>
            <p class="mt-4 max-w-xl text-muted">{{ p.description }}</p>
            <div class="mt-8 flex flex-wrap items-center gap-3">
              @for (l of p.links; track l.url; let first = $first) {
                <a [href]="l.url" class="btn" [class.btn-primary]="first" [class.btn-secondary]="!first" target="_blank" rel="noopener noreferrer"
                   [attr.aria-label]="l.label + ' (opens in a new tab)'">
                  <nw-icon [name]="l.kind === 'play' ? 'play' : l.kind === 'download' ? 'download' : 'globe'" />
                  {{ l.label }}
                </a>
              }
            </div>
            @if (p.id === 'noble-salah') {
              <div class="mt-8 hidden items-center gap-4 sm:flex">
                <svg viewBox="0 0 37 37" class="h-24 w-24 shrink-0 rounded-xl bg-white p-2" role="img" aria-label="QR code for the Noble Salah Guide Google Play page">
                  <path [attr.d]="qr.path" fill="none" stroke="#111827" stroke-width="1" shape-rendering="crispEdges" />
                </svg>
                <p class="text-sm"><strong class="block">Scan to install</strong><span class="text-muted">on your Android phone</span></p>
              </div>
            }
          </div>
          <nw-product-visual [product]="p" [eager]="true" />
        </div>
      </section>

      <section class="section">
        <div class="container-page">
          <nw-section-heading eyebrow="Features" title="What" [accent]="'it does'" />
          <ul class="mt-10 grid gap-4 sm:grid-cols-2">
            @for (f of p.features; track f) {
              <li class="card !p-5 flex items-start gap-3">
                <nw-icon name="check" [size]="20" class="mt-0.5 shrink-0 text-accent" />
                <span class="font-medium">{{ f }}</span>
              </li>
            }
          </ul>
        </div>
      </section>

      <section class="section section-alt">
        <div class="container-page">
          <nw-section-heading eyebrow="Walkthrough" title="See how it" accent="works" />
          <div class="mt-12"><nw-product-showcase [product]="p" /></div>
        </div>
      </section>

      <section class="section">
        <div class="container-page">
          <nw-section-heading eyebrow="Screenshots" title="See it" accent="in action" lead="Select any screenshot to view it full size." />
          <div class="mt-10">
            <nw-screenshot-gallery [screenshots]="p.screenshots" [productName]="p.name" [wide]="p.device === 'desktop'" />
          </div>
        </div>
      </section>

      <div class="section-alt"><nw-faq [items]="p.faq" /></div>

      <nw-cta-banner [title]="'Questions about ' + p.name + '?'" text="Send us feedback, report a problem or ask how it works. We reply within one business day." />
    } @else {
      <nw-not-found />
    }
  `,
})
export class ProductDetail {
  /** Bound from the :slug route parameter. */
  readonly slug = input.required<string>();

  protected readonly qr = PLAY_QR;
  protected readonly product = computed(() => PRODUCTS.find((p) => p.id === this.slug()));

  private readonly seo = inject(SeoService);

  constructor() {
    effect(() => {
      const p = this.product();
      if (p) {
        this.seo.set({
          title: p.name,
          description: seoDescription(p),
          path: `/products/${p.id}`,
          image: productOgImage(p),
          imageAlt: `${p.name} on ${p.device === 'desktop' ? 'a laptop' : 'a phone'}: ${p.tagline}`,
          jsonLd: productData(p),
        });
      }
    });
  }
}

/** Meta descriptions read best under about 160 characters, so lead with the tagline and trim the rest. */
function seoDescription(p: { name: string; tagline: string; description: string }): string {
  const text = `${p.name}: ${p.tagline}. ${p.description}`;
  if (text.length <= 160) {
    return text;
  }
  const cut = text.slice(0, 157);
  return cut.slice(0, cut.lastIndexOf(' ')) + '…';
}
