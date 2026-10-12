import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { Product } from '../../core/products.config';

/** Three phones from a product's walkthrough, fanned on a panel tinted with the product colour. */
@Component({
  selector: 'nw-product-visual',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="pv aspect-[5/4]" [style.--glow]="product().glow">
      @for (p of phones(); track p.file) {
        <img
          class="pv-phone"
          [src]="'images/story/' + p.file + '.webp'"
          [style]="p.style"
          [alt]="p.alt"
          width="560"
          height="1214"
          [attr.loading]="eager() ? null : 'lazy'"
          decoding="async"
        />
      }
    </div>
  `,
})
export class ProductVisual {
  readonly product = input.required<Product>();
  readonly eager = input(false);

  protected readonly phones = computed(() => {
    const story = this.product().story;
    const layout = [
      '--x:6%;--y:-5%;--h:78%;--r:-7deg;z-index:1',
      '--x:64%;--y:-5%;--h:78%;--r:7deg;z-index:1',
      '--x:33%;--y:-8%;--h:92%;--r:0deg;z-index:2',
    ];
    // Left, right, then centre last so the main screen sits in front.
    const picks = [story[1], story[2], story[0]].filter(Boolean);
    return picks.map((s, i) => ({ file: s.file, alt: s.alt, style: layout[i] }));
  });
}
