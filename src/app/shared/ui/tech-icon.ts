import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TECH_ICONS } from '../../core/tech-icons';

/** Logo for a named technology. Renders nothing for names without a logo (the label carries the meaning). */
@Component({
  selector: 'nw-tech-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'inline-flex shrink-0' },
  template: `
    @if (def(); as d) {
      <svg
        class="tech-logo"
        [attr.viewBox]="d.viewBox"
        [attr.width]="size()"
        [attr.height]="size()"
        [style.--ic-l]="d.light ?? 'currentColor'"
        [style.--ic-d]="d.dark ?? 'currentColor'"
        aria-hidden="true"
        focusable="false"
      >
        <path [attr.d]="d.path" />
      </svg>
    }
  `,
})
export class TechIcon {
  readonly name = input.required<string>();
  readonly size = input(20);

  protected readonly def = computed(() => TECH_ICONS[this.name()]);
}
