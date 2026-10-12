import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../core/products.config';
import { Icon } from './icon';
import { ProductVisual } from './product-visual';

/** A product presented as copy plus visual, with store/web links. Flip it to alternate sides. */
@Component({
  selector: 'nw-product-feature',
  imports: [RouterLink, Icon, ProductVisual],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <article class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16" [attr.aria-labelledby]="product().id + '-name'">
      <div [class.lg:order-2]="flip()">
        <div class="flex flex-wrap items-center gap-2">
          @for (pl of product().platforms; track pl) {
            <span class="badge">{{ pl }}</span>
          }
          <span class="badge !bg-transparent !text-muted ring-1 ring-border">Live</span>
        </div>
        <h3 [id]="product().id + '-name'" class="mt-4 text-3xl sm:text-4xl">{{ product().name }}</h3>
        <p class="mt-2 text-lg font-medium">{{ product().tagline }}</p>
        <p class="mt-4 text-muted">{{ product().description }}</p>
        <ul class="mt-6 space-y-2.5">
          @for (f of product().features.slice(0, 4); track f) {
            <li class="flex gap-3">
              <nw-icon name="check" [size]="18" class="mt-0.5 text-accent" />
              <span>{{ f }}</span>
            </li>
          }
        </ul>
        <div class="mt-8 flex flex-wrap items-center gap-3">
          @for (l of product().links; track l.url; let first = $first) {
            <a
              [href]="l.url"
              class="btn"
              [class.btn-primary]="first"
              [class.btn-secondary]="!first"
              target="_blank"
              rel="noopener noreferrer"
              [attr.aria-label]="l.label + ' (opens in a new tab)'"
            >
              <nw-icon [name]="l.kind === 'play' ? 'play' : 'globe'" />
              {{ l.label }}
            </a>
          }
          @if (details()) {
            <a class="link-arrow ml-1" [routerLink]="['/products', product().id]">
              Details <nw-icon name="arrow-right" [size]="18" />
            </a>
          }
        </div>
      </div>
      <nw-product-visual [product]="product()" />
    </article>
  `,
})
export class ProductFeature {
  readonly product = input.required<Product>();
  readonly flip = input(false);
  readonly details = input(true);
}
