import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MISSION, PROCESS, TECH_GROUPS, VALUES, VISION } from '../../core/content.config';
import { SeoService } from '../../core/seo.service';
import { SITE } from '../../core/site.config';
import { AppCollage } from '../../shared/ui/app-collage';
import { CtaBanner } from '../../shared/ui/cta-banner';
import { Icon } from '../../shared/ui/icon';
import { SectionHeading } from '../../shared/ui/section-heading';
import { TechIcon } from '../../shared/ui/tech-icon';

@Component({
  selector: 'nw-about',
  imports: [RouterLink, Icon, SectionHeading, CtaBanner, TechIcon, AppCollage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-glow">
      <div class="container-page grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:py-24">
        <div>
          <p class="eyebrow">About us</p>
          <h1 class="h-display mt-5">
            A small team that <span class="gradient-text">builds and runs</span> its own apps
          </h1>
          <p class="lead mt-6">
            {{ site.name }} is based in {{ site.location }}. We make free apps for everyday needs: working with PDFs,
            keeping up with daily prayers, managing rentals, helping children learn their letters and sharing one keyboard and mouse across computers. We build, host and
            support each one ourselves.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a routerLink="/products" class="btn btn-primary">See our products <nw-icon name="arrow-right" /></a>
            <a routerLink="/contact" class="btn btn-secondary">Get in touch</a>
          </div>
        </div>
        <nw-app-collage />
      </div>
    </section>

    <section class="statement-band" aria-label="Mission and vision">
      <svg class="statement-wave" viewBox="0 0 800 300" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 150 C150 60 250 240 400 150 S650 60 800 130 V300 H0Z" fill="currentColor" opacity=".07" />
        <path d="M0 200 C160 120 280 280 430 200 S680 130 800 190 V300 H0Z" fill="currentColor" opacity=".08" />
      </svg>
      <div class="container-page relative">
        @for (s of statements; track s.label; let i = $index) {
          <div class="statement">
            <h2 class="statement-label"><span>0{{ i + 1 }}</span>{{ s.label }}</h2>
            <p class="statement-text">
              @for (w of s.before; track $index) {<span [class.nb]="w.nb">{{ w.t }}</span>{{ ' ' }}}<span class="statement-accent">@for (w of s.accent; track $index) {<span [class.nb]="w.nb">{{ w.t }}</span>{{ ' ' }}}</span>@for (w of s.after; track $index) {<span [class.nb]="w.nb">{{ w.t }}</span>{{ ' ' }}}
            </p>
          </div>
        }
      </div>
    </section>

    <section class="section section-alt">
      <div class="container-page">
        <nw-section-heading eyebrow="What drives us" title="What we" accent="care about" [center]="true" />
        <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          @for (v of values; track v.title) {
            <article class="card reveal">
              <nw-icon [name]="v.icon" [size]="28" class="text-brand" />
              <h3 class="mt-4 text-lg">{{ v.title }}</h3>
              <p class="mt-2 text-muted">{{ v.text }}</p>
            </article>
          }
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container-page">
        <nw-section-heading eyebrow="How we build" title="From an everyday problem to a" accent="live app" [center]="true" />
        <ol class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          @for (s of process; track s.title; let i = $index) {
            <li class="rounded-[var(--radius-card)] border border-border bg-bg p-6">
              <span class="text-sm font-bold text-brand">0{{ i + 1 }}</span>
              <h3 class="mt-3 text-xl">{{ s.title }}</h3>
              <p class="mt-2 text-muted">{{ s.text }}</p>
            </li>
          }
        </ol>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container-page">
        <nw-section-heading eyebrow="Technology" title="Tools we build with" accent="every day" [center]="true" />
        <div class="tech-sheet mt-12">
          @for (g of tech; track g.label) {
            <div class="tech-row">
              <h3 class="tech-row-label">{{ g.label }}</h3>
              <div class="tech-cells-clip">
                <ul class="tech-cells">
                  @for (t of g.items; track t) {
                    <li class="tech-cell"><nw-tech-icon [name]="t" [size]="30" /><span>{{ t }}</span></li>
                  }
                </ul>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <nw-cta-banner class="mt-24 block" />
  `,
})
export class About {
  protected readonly site = SITE;
  protected readonly statements = [
    statement('Our mission', MISSION, 'simple, dependable apps'),
    statement('Our vision', VISION, 'well-made, useful apps'),
  ];
  protected readonly values = VALUES;
  protected readonly process = PROCESS;
  protected readonly tech = TECH_GROUPS;

  constructor() {
    inject(SeoService).set({
      title: 'About Noble Wave',
      description: `${SITE.name} is a small product team in ${SITE.location} that designs, builds and runs the apps we ship: PDF Workshop, Noble Salah Guide, Rentiva, Noble Qaida and Noble Relay.`,
      path: '/about',
    });
  }
}

interface Word {
  readonly t: string;
  /** Words with a hyphen stay on one line instead of breaking after the hyphen. */
  readonly nb: boolean;
}

const words = (text: string): Word[] => text.split(' ').filter(Boolean).map((t) => ({ t, nb: t.includes('-') }));

/** Splits a statement around the phrase that gets the highlight colour. */
function statement(label: string, text: string, accent: string) {
  const at = text.indexOf(accent);
  return at < 0
    ? { label, before: words(text), accent: [] as Word[], after: [] as Word[] }
    : { label, before: words(text.slice(0, at)), accent: words(accent), after: words(text.slice(at + accent.length)) };
}
