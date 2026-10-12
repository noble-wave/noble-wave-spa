import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TECH_GROUPS } from '../../core/content.config';
import { TechIcon } from './tech-icon';

/** Slow, looping strip of the technologies we use. Pauses on hover and under reduced motion. */
@Component({
  selector: 'nw-tech-marquee',
  imports: [TechIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <p class="mb-5 text-center text-sm font-bold uppercase tracking-widest text-muted">Technologies we work with</p>
    <div class="marquee">
      <ul class="marquee-track" aria-label="Technologies we work with">
        @for (t of tech; track t) {
          <li class="marquee-pill"><nw-tech-icon [name]="t" />{{ t }}</li>
        }
        @for (t of tech; track t) {
          <li class="marquee-pill" aria-hidden="true"><nw-tech-icon [name]="t" />{{ t }}</li>
        }
      </ul>
    </div>
  `,
})
export class TechMarquee {
  protected readonly tech = [...new Set(TECH_GROUPS.flatMap((g) => g.items))];
}
