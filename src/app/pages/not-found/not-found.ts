import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { Icon } from '../../shared/ui/icon';

@Component({
  selector: 'nw-not-found',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-glow">
      <div class="container-page py-24 text-center sm:py-32">
        <p class="eyebrow justify-center">Error 404</p>
        <h1 class="h-display mt-5">This page <span class="gradient-text">could not be found</span></h1>
        <p class="lead mx-auto mt-6">The link may be broken, or the page may have moved. Try one of these instead.</p>
        <div class="mt-9 flex flex-wrap justify-center gap-3">
          <a routerLink="/" class="btn btn-primary">Back to home <nw-icon name="arrow-right" /></a>
          <a routerLink="/products" class="btn btn-secondary">Our products</a>
          <a routerLink="/contact" class="btn btn-secondary">Contact us</a>
        </div>
      </div>
    </section>
  `,
})
export class NotFound {
  constructor() {
    inject(SeoService).set({
      title: 'Page not found',
      description: 'The page you were looking for could not be found.',
      path: '/404',
      noindex: true,
    });
  }
}
