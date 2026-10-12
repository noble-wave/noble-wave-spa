import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../core/site.config';
import { Icon } from './icon';

/** Full-width call to action that closes most pages. */
@Component({
  selector: 'nw-cta-banner',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section !pt-0" aria-labelledby="cta-title">
      <div class="container-page">
        <div
          class="relative overflow-hidden rounded-[2rem] px-6 py-14 text-on-brand sm:px-14 sm:py-16"
          style="background: radial-gradient(70% 120% at 100% 0%, color-mix(in srgb, var(--accent) 45%, transparent), transparent 65%), linear-gradient(135deg, var(--brand-strong), var(--brand))"
        >
          <h2 id="cta-title" class="h-section relative max-w-2xl">{{ title() }}</h2>
          <p class="relative mt-4 max-w-xl text-lg opacity-90">{{ text() }}</p>
          <div class="relative mt-8 flex flex-wrap items-center gap-3">
            <a routerLink="/contact" class="btn bg-bg text-text hover:opacity-90">
              Start a project <nw-icon name="arrow-right" />
            </a>
            <a [href]="'mailto:' + site.email" class="btn border-white/40 text-on-brand hover:bg-white/10">
              <nw-icon name="mail" /> {{ site.email }}
            </a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CtaBanner {
  protected readonly site = SITE;
  readonly title = input('Have a project in mind?');
  readonly text = input('Tell us what you are building. We reply within one business day.');
}
