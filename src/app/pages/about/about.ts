import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MISSION, PROCESS, TECH_GROUPS, VALUES, VISION } from '../../core/content.config';
import { SeoService } from '../../core/seo.service';
import { SITE } from '../../core/site.config';
import { CtaBanner } from '../../shared/ui/cta-banner';
import { Icon } from '../../shared/ui/icon';
import { SectionHeading } from '../../shared/ui/section-heading';
import { TechIcon } from '../../shared/ui/tech-icon';

@Component({
  selector: 'nw-about',
  imports: [RouterLink, Icon, SectionHeading, CtaBanner, TechIcon],
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
            keeping up with daily prayers and managing rentals. We build, host and support each one ourselves.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <a routerLink="/products" class="btn btn-primary">See our products <nw-icon name="arrow-right" /></a>
            <a routerLink="/contact" class="btn btn-secondary">Get in touch</a>
          </div>
        </div>
        <img
          src="images/about1.jpg"
          alt="The Noble Wave team at work"
          class="aspect-[4/3] w-full rounded-[2rem] border border-border object-cover"
          width="1200"
          height="900"
          fetchpriority="high"
        />
      </div>
    </section>

    <section class="section">
      <div class="container-page grid gap-6 lg:grid-cols-2">
        <article class="card">
          <span class="icon-tile"><nw-icon name="compass" [size]="24" /></span>
          <h2 class="mt-5 text-2xl">Our mission</h2>
          <p class="mt-3 text-muted">{{ mission }}</p>
        </article>
        <article class="card">
          <span class="icon-tile"><nw-icon name="shield-check" [size]="24" /></span>
          <h2 class="mt-5 text-2xl">Our vision</h2>
          <p class="mt-3 text-muted">{{ vision }}</p>
        </article>
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
        <div class="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          @for (g of tech; track g.label) {
            <div>
              <h3 class="text-sm font-bold uppercase tracking-wider text-muted">{{ g.label }}</h3>
              <ul class="mt-3 flex flex-wrap gap-2">
                @for (t of g.items; track t) {
                  <li class="chip gap-2"><nw-tech-icon [name]="t" [size]="16" />{{ t }}</li>
                }
              </ul>
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
  protected readonly mission = MISSION;
  protected readonly vision = VISION;
  protected readonly values = VALUES;
  protected readonly process = PROCESS;
  protected readonly tech = TECH_GROUPS;

  constructor() {
    inject(SeoService).set({
      title: 'About Noble Wave',
      description: `${SITE.name} is a small product team in ${SITE.location} that designs, builds and runs the apps we ship: PDF Workshop, Noble Salah Guide and Rent Manager.`,
      path: '/about',
    });
  }
}
