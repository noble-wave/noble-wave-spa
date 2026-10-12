import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PRODUCTS } from '../../core/products.config';
import { SeoService } from '../../core/seo.service';
import { CtaBanner } from '../../shared/ui/cta-banner';
import { ProductFeature } from '../../shared/ui/product-feature';

@Component({
  selector: 'nw-products',
  imports: [ProductFeature, CtaBanner],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-glow">
      <div class="container-page py-16 sm:py-20 lg:py-24">
        <p class="eyebrow">Our products</p>
        <h1 class="h-display mt-5 max-w-4xl">
          Apps we <span class="gradient-text">built, launched</span> and still run
        </h1>
        <p class="lead mt-6">
          Alongside client projects we build and operate our own products. Try them yourself: all of them are live today.
        </p>
      </div>
    </section>

    <section class="section !pt-8">
      <div class="container-page space-y-24">
        @for (p of products; track p.id; let i = $index) {
          <nw-product-feature [product]="p" [flip]="i % 2 === 1" />
        }
      </div>
    </section>

    <nw-cta-banner title="Want a product like these?" text="We can build and launch yours the same way, from the first prototype to the store listing." />
  `,
})
export class Products {
  protected readonly products = PRODUCTS;

  constructor() {
    inject(SeoService).set({
      title: 'Products',
      description:
        'PDF Workshop for private, in-browser PDF tools, Noble Salah Guide for prayer times and Islamic tools, and Rent Manager for landlords: apps built and run by Noble Wave.',
      path: '/products',
    });
  }
}
