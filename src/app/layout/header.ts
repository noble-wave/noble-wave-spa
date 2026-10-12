import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { NAV_LINKS, SITE } from '../core/site.config';
import { Icon } from '../shared/ui/icon';

/** Floating pill header that stays at the top of the page. */
@Component({
  selector: 'nw-header',
  imports: [RouterLink, RouterLinkActive, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { '(document:keydown.escape)': 'menuOpen.set(false)' },
  template: `
    <header class="sticky top-0 z-50 px-3 pt-3 sm:px-5">
      <div
        class="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 rounded-full border border-border bg-bg/85 px-4 backdrop-blur transition-shadow sm:px-5"
        [class.shadow-[var(--shadow-card)]]="scrolled()"
      >
        <a routerLink="/" class="flex items-center" [attr.aria-label]="site.name + ' home'">
          <img src="images/logo.svg" alt="" class="h-6 w-auto" width="206" height="33" />
        </a>

        <nav aria-label="Primary" class="hidden items-center gap-1 lg:flex">
          @for (l of links; track l.path) {
            <a
              class="nav-link"
              [routerLink]="l.path"
              routerLinkActive="is-active"
              [routerLinkActiveOptions]="{ exact: l.path === '/' }"
              >{{ l.label }}</a
            >
          }
        </nav>

        <div class="flex items-center gap-1.5">
          <a routerLink="/contact" class="btn btn-primary hidden !min-h-10 sm:inline-flex">Contact us</a>
          <button
            type="button"
            class="btn btn-ghost !min-h-10 !px-3 lg:hidden"
            (click)="menuOpen.set(!menuOpen())"
            [attr.aria-expanded]="menuOpen()"
            aria-controls="mobile-nav"
            aria-label="Menu"
          >
            <nw-icon [name]="menuOpen() ? 'x' : 'menu'" />
          </button>
        </div>
      </div>

      @if (menuOpen()) {
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          class="mx-auto mt-2 max-w-6xl rounded-3xl border border-border bg-bg p-3 shadow-[var(--shadow-lift)] lg:hidden"
        >
          <div class="flex flex-col gap-1">
            @for (l of links; track l.path) {
              <a
                class="nav-link !rounded-2xl !py-3 !text-base"
                [routerLink]="l.path"
                routerLinkActive="is-active"
                [routerLinkActiveOptions]="{ exact: l.path === '/' }"
                >{{ l.label }}</a
              >
            }
            <a routerLink="/contact" class="btn btn-primary mt-2 w-full">Contact us</a>
          </div>
        </nav>
      }
    </header>
  `,
})
export class Header {
  protected readonly site = SITE;
  protected readonly links = NAV_LINKS;
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  constructor() {
    inject(Router)
      .events.pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.menuOpen.set(false));

    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const onScroll = (): void => this.scrolled.set(window.scrollY > 8);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
    });
  }
}
