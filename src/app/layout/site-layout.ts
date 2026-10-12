import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, skip } from 'rxjs';
import { Footer } from './footer';
import { Header } from './header';

/** Page chrome shared by every public page: skip link, header, main landmark, footer. */
@Component({
  selector: 'nw-site-layout',
  imports: [RouterOutlet, Header, Footer],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#main">Skip to content</a>
    <nw-header />
    <main id="main" tabindex="-1" class="outline-none">
      <router-outlet />
    </main>
    <nw-footer />
  `,
})
export class SiteLayout {
  constructor() {
    const doc = inject(DOCUMENT);
    // After in-app navigation, move focus to the new page so screen-reader users hear it.
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        skip(1),
        takeUntilDestroyed(),
      )
      .subscribe((e) => {
        if (!(e as NavigationEnd).urlAfterRedirects.includes('#')) {
          doc.getElementById('main')?.focus({ preventScroll: true });
        }
      });
  }
}
