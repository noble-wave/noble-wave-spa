import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PRINCIPLES, PROCESS } from '../../core/content.config';
import { PRODUCTS } from '../../core/products.config';
import { SeoService } from '../../core/seo.service';
import { organizationData } from '../../core/structured-data';
import { SITE } from '../../core/site.config';
import { CtaBanner } from '../../shared/ui/cta-banner';
import { AppHub } from '../../shared/ui/app-hub';
import { Faq } from '../../shared/ui/faq';
import { Icon } from '../../shared/ui/icon';
import { ProductFeature } from '../../shared/ui/product-feature';
import { SectionHeading } from '../../shared/ui/section-heading';
import { TechMarquee } from '../../shared/ui/tech-marquee';

@Component({
  selector: 'nw-home',
  imports: [RouterLink, Icon, SectionHeading, ProductFeature, TechMarquee, Faq, CtaBanner, AppHub],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero -->
    <section class="page-glow relative overflow-hidden">
      <div class="container-page grid items-center gap-12 pb-20 pt-14 lg:grid-cols-[1fr_1.1fr] lg:pb-28 lg:pt-24">
        <div>
          <p class="eyebrow">Apps made in {{ site.location }}</p>
          <h1 class="h-display mt-5">
            Everyday apps that <span class="gradient-text">just work</span>
          </h1>
          <p class="lead mt-6">
            Noble Wave builds free apps for the things people do every day: working with PDFs, keeping up with
            prayers, managing rentals, helping children learn their letters and sharing one keyboard and mouse across computers. Open one in your browser or download it today.
          </p>
          <div class="mt-9 flex flex-wrap gap-3">
            <a routerLink="/products" class="btn btn-primary">See our products <nw-icon name="arrow-right" /></a>
            <a routerLink="/contact" class="btn btn-secondary">Contact us</a>
          </div>
        </div>

        <div class="mx-auto w-full max-w-xl lg:max-w-none">
          <nw-app-hub />
        </div>
      </div>
      <svg class="wave-divider" viewBox="0 0 1440 96" preserveAspectRatio="none" aria-hidden="true">
        <path fill="currentColor" d="M0 48c120 40 240 48 360 24S600 0 720 8s240 56 360 64 240-24 360-48v72H0Z" />
      </svg>
    </section>

    <!-- Technology marquee -->
    <section class="bg-surface pb-12 pt-2" aria-label="Technologies">
      <nw-tech-marquee />
    </section>

    <!-- Products -->
    <section class="section">
      <div class="container-page">
        <nw-section-heading
          eyebrow="Our products"
          title="Apps we built, launched and still"
          accent="run"
          lead="The best proof of how we work is something you can open today."
          [center]="true"
        />
        <div class="mt-16 space-y-24">
          @for (p of products; track p.id; let i = $index) {
            <nw-product-feature [product]="p" [flip]="i % 2 === 1" />
          }
        </div>
      </div>
    </section>

    <!-- Process and why us -->
    <section class="section section-alt">
      <div class="container-page grid gap-14 lg:grid-cols-2">
        <div>
          <nw-section-heading eyebrow="How we build" title="From an everyday problem to a" accent="live app" />
          <ol class="steps mt-10 space-y-10">
            @for (s of process; track s.title) {
              <li class="step">
                <h3 class="text-lg">{{ s.title }}</h3>
                <p class="mt-1 text-muted">{{ s.text }}</p>
              </li>
            }
          </ol>
        </div>
        <div>
          <nw-section-heading eyebrow="Why Noble Wave" title="Built around" accent="people" />
          <div class="pv mt-8 aspect-[16/10]" style="--glow: 14 116 144">
            <img
              class="pv-phone"
              src="images/story/salah-prayer-times.webp"
              alt="Noble Salah Guide: prayer times and a countdown to the next prayer"
              style="--x:9%;--y:-26%;--h:122%;--r:-5deg;z-index:1"
              width="560"
              height="1214"
              loading="lazy"
              decoding="async"
            />
            <img
              class="pv-phone"
              src="images/story/rent-portfolio.webp"
              alt="Rentiva: a portfolio of properties with rent collected"
              style="--x:50%;--y:-34%;--h:116%;--r:5deg;z-index:2"
              width="516"
              height="1070"
              loading="lazy"
              decoding="async"
            />
          </div>
          <ul class="mt-6 grid gap-4 sm:grid-cols-2">
            @for (w of principles; track w.title) {
              <li class="flex items-start gap-3">
                <span class="icon-tile !h-10 !w-10 shrink-0"><nw-icon [name]="w.icon" /></span>
                <span>
                  <strong class="block">{{ w.title }}</strong>
                  <span class="text-sm text-muted">{{ w.text }}</span>
                </span>
              </li>
            }
          </ul>
        </div>
      </div>
    </section>

    <nw-faq />

    <nw-cta-banner class="mt-24 block" />
  `,
})
export class Home {
  protected readonly site = SITE;
  protected readonly products = PRODUCTS;
  protected readonly principles = PRINCIPLES;
  protected readonly process = PROCESS;

  constructor() {
    inject(SeoService).set({
      description: SITE.description,
      path: '/',
      jsonLd: organizationData(),
    });
  }
}
