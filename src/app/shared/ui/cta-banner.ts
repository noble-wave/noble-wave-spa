import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SITE } from '../../core/site.config';
import { Icon } from './icon';

/** What a visitor can expect after getting in touch. Matches the promises made on the Contact page and FAQ. */
const NEXT_STEPS = [
  { title: 'Say hello', text: 'Ask about an app, report a problem, suggest a feature or tell us about a project.' },
  { title: 'We reply within a day', text: 'A real person answers within one business day.' },
  { title: 'We follow through', text: 'We fix the issue, answer the question or agree the next step with you.' },
] as const;

/** Full-width call to action that closes most pages. */
@Component({
  selector: 'nw-cta-banner',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="section !pt-0" aria-labelledby="cta-title">
      <div class="container-page">
        <div
          class="relative grid items-center gap-10 overflow-hidden rounded-[2rem] px-6 py-12 text-on-brand sm:px-14 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14"
          style="background: radial-gradient(70% 120% at 100% 0%, color-mix(in srgb, var(--accent) 45%, transparent), transparent 65%), linear-gradient(135deg, var(--brand-strong), var(--brand))"
        >
          <div class="relative">
            <h2 id="cta-title" class="h-section max-w-2xl">{{ title() }}</h2>
            <p class="mt-4 max-w-xl text-lg opacity-90">{{ text() }}</p>
            <div class="mt-8 flex flex-wrap items-center gap-3">
              <a routerLink="/contact" class="btn bg-bg text-text hover:opacity-90">
                Contact us <nw-icon name="arrow-right" />
              </a>
              <a [href]="'mailto:' + site.email" class="btn border-white/40 text-on-brand hover:bg-white/10">
                <nw-icon name="mail" /> {{ site.email }}
              </a>
            </div>
          </div>

          <div class="relative rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm sm:p-7">
            <p class="text-sm font-bold uppercase tracking-widest opacity-80">What happens next</p>
            <ol class="mt-5 space-y-5">
              @for (s of steps; track s.title; let i = $index) {
                <li class="flex gap-4">
                  <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-bg text-sm font-extrabold text-text">{{ i + 1 }}</span>
                  <span>
                    <strong class="block text-base">{{ s.title }}</strong>
                    <span class="mt-0.5 block text-sm opacity-85">{{ s.text }}</span>
                  </span>
                </li>
              }
            </ol>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class CtaBanner {
  protected readonly site = SITE;
  protected readonly steps = NEXT_STEPS;
  readonly title = input('Questions or feedback?');
  readonly text = input('Ask about our apps, tell us what you would like to see next, or talk to us about a project. We reply within one business day.');
}
