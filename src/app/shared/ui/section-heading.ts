import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Eyebrow, title (with an optional gradient tail) and lead paragraph used to open a section. */
@Component({
  selector: 'nw-section-heading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div class="max-w-3xl" [class.mx-auto]="center()" [class.text-center]="center()">
      @if (eyebrow()) {
        <p class="eyebrow" [class.justify-center]="center()">{{ eyebrow() }}</p>
      }
      <h2 class="h-section mt-4">
        {{ title() }}
        @if (accent()) {
          <span class="gradient-text">{{ accent() }}</span>
        }
      </h2>
      @if (lead()) {
        <p class="lead mt-4" [class.mx-auto]="center()">{{ lead() }}</p>
      }
    </div>
  `,
})
export class SectionHeading {
  readonly eyebrow = input('');
  readonly title = input.required<string>();
  readonly accent = input('');
  readonly lead = input('');
  readonly center = input(false);
}
