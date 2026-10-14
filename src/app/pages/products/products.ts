import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PRODUCTS } from '../../core/products.config';
import { SeoService } from '../../core/seo.service';
import { productListData } from '../../core/structured-data';
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
          We build, host and support these apps ourselves, and all of them are free to use. Open one and try it.
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

    <nw-cta-banner title="Have feedback on our apps?" text="Tell us what works, what does not and what you would like to see next." />
  `,
})
export class Products {
  protected readonly products = PRODUCTS;

  constructor() {
    inject(SeoService).set({
      title: 'Our apps: PDF, prayer, rentals and learning',
      description:
        'PDF Workshop, Noble Salah Guide, Rent Manager and Noble Qaida: free apps for PDFs, prayer times, rentals and learning letters, built and run by Noble Wave.',
      path: '/products',
      jsonLd: productListData(),
    });
  }
}
