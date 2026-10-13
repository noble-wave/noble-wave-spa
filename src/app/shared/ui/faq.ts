import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FAQ, FaqItem } from '../../core/content.config';
import { SectionHeading } from './section-heading';

/** Frequently asked questions as native disclosure widgets (keyboard accessible, no JavaScript needed). */
@Component({
  selector: 'nw-faq',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section">
      <div class="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <nw-section-heading
          eyebrow="FAQ"
          title="Questions we"
          accent="hear a lot"
          lead="Can't find yours? Send us a message and we will answer it."
        />
        <div class="space-y-3">
          @for (f of items(); track f.q) {
            <details class="faq">
              <summary>{{ f.q }}</summary>
              <p>{{ f.a }}</p>
            </details>
          }
        </div>
      </div>
    </section>
  `,
})
export class Faq {
  /** Defaults to the site-wide questions; a product page passes its own. */
  readonly items = input<readonly FaqItem[]>(FAQ);
}
