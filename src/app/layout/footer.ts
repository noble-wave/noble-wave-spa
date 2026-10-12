import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LEGAL_LINKS, NAV_LINKS, SITE } from '../core/site.config';
import { Icon } from '../shared/ui/icon';

@Component({
  selector: 'nw-footer',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="border-t border-border bg-surface">
      <div class="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <a routerLink="/" [attr.aria-label]="site.name + ' home'">
            <img src="images/logo.svg" alt="" class="h-7 w-auto" width="206" height="33" loading="lazy" />
          </a>
          <p class="mt-4 max-w-xs text-muted">{{ site.description }}</p>
          <div class="mt-6 flex gap-2">
            <a class="btn btn-secondary !min-h-10 !px-3" [href]="site.social.linkedin" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer"><nw-icon name="linkedin" /></a>
            <a class="btn btn-secondary !min-h-10 !px-3" [href]="site.social.github" aria-label="GitHub" target="_blank" rel="noopener noreferrer"><nw-icon name="github" /></a>
            <a class="btn btn-secondary !min-h-10 !px-3" [href]="site.social.x" aria-label="X" target="_blank" rel="noopener noreferrer"><nw-icon name="x-social" /></a>
            <a class="btn btn-secondary !min-h-10 !px-3" [href]="site.social.facebook" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><nw-icon name="facebook" /></a>
          </div>
        </div>

        <nav aria-label="Company">
          <h2 class="text-sm font-bold uppercase tracking-wider text-muted">Company</h2>
          <ul class="mt-4 space-y-3">
            @for (l of links; track l.path) {
              <li><a class="hover:text-brand" [routerLink]="l.path">{{ l.label }}</a></li>
            }
          </ul>
        </nav>


        <div>
          <h2 class="text-sm font-bold uppercase tracking-wider text-muted">Get in touch</h2>
          <ul class="mt-4 space-y-4">
            <li class="flex items-start gap-3">
              <nw-icon name="mail" class="mt-0.5 text-brand" />
              <a class="hover:text-brand" [href]="'mailto:' + site.email">{{ site.email }}</a>
            </li>
            <li class="flex items-start gap-3">
              <nw-icon name="phone" class="mt-0.5 text-brand" />
              <a class="hover:text-brand" [href]="'tel:' + site.phone">{{ site.phoneDisplay }}</a>
            </li>
            <li class="flex items-start gap-3">
              <nw-icon name="map-pin" class="mt-0.5 text-brand" />
              <span>{{ site.location }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-border">
        <div class="container-page flex flex-col gap-3 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {{ year }} {{ site.name }}. All rights reserved.</p>
          <ul class="flex gap-6">
            @for (l of legal; track l.path) {
              <li><a class="hover:text-brand" [routerLink]="l.path">{{ l.label }}</a></li>
            }
          </ul>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly site = SITE;
  protected readonly links = NAV_LINKS;
  protected readonly legal = LEGAL_LINKS;
  protected readonly year = new Date().getFullYear();
}
