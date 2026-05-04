# AGENTS.md

Briefing for AI coding agents working in this repo.

## What this is

Noble Wave's marketing SPA — a static Angular site deployed to GitHub Pages (`npm run dist`).

## Stack

- Angular 21 — **standalone components**, **zoneless** change detection, **inject()** pattern (no constructor DI)
- TypeScript 5.9
- Tailwind 4 + SCSS, Angular Material (indigo-pink prebuilt theme)
- Vitest (not Karma/Jasmine) for unit tests
- ESLint via `@angular-eslint` + `typescript-eslint`
- Build: `@angular/build:application` (esbuild, not webpack)

## Commands

```
npm start          # ng serve, http://localhost:4200
npm run build      # production build (default config)
npm run build:prod # build with --base-href https://noble-wave.com
npm test           # vitest
npm run lint       # eslint
npm run dist       # deploy dist/noble-wave/browser to gh-pages
```

There is no e2e suite.

## Project structure

```
src/app/
├── app.ts, app.html, app.scss, app.spec.ts   # root component (no .component suffix)
├── app.config.ts                             # ApplicationConfig + providers
├── app.routes.ts                             # Routes
├── config/      app constants, lucide icon picks (barrel: index.ts)
├── core/        singleton services (theme, counter-animation)
├── shared/      reusable components (header, footer)
└── features/
    └── pages/   route-level pages (home, about, main, details, privacy, terms)
```

Every folder has an `index.ts` barrel — **import via the barrel**, not deep paths:

```ts
import { ThemeService } from './core/services';
import { HeaderComponent } from './shared/components';
import { COMPANY_INFO, lucideIcons } from './config';
```

## Conventions to follow

- **No `.component` / `.service` file suffixes.** Files are `header.ts`, `theme.ts`, etc. (Angular 20+ style — see commit `a4b93c8`).
- **Standalone components only.** No NgModules. Wire providers in `app.config.ts`.
- **Use `inject()`**, not constructor DI (enforced by recent ESLint sweep — commit `04ef758`).
- **Zoneless** — don't reintroduce `provideZoneChangeDetection` or assume zone.js patches are running.
- **Selectors:** components `app-` kebab-case, directives `app` camelCase (eslint config).
- **Constants** go in `src/app/config/app.constants.ts`. Don't hardcode company info, social links, or nav.
- **Icons:** Lucide icons must be added to `config/lucide-icons.config.ts` and picked via `LucideAngularModule.pick(lucideIcons)`.

## Privacy / third-party policy

This site avoids third-party requests on principle (GDPR / IP-leak concern). All fonts and icons are **self-hosted** via npm:

- Inter / Poppins / Roboto → `@fontsource-variable/inter`, `@fontsource/poppins`, `@fontsource/roboto`
- Material Icons → `material-icons`
- DevIcon → `devicon`

**Do not** add `<link>` tags pointing at `fonts.googleapis.com`, `fonts.gstatic.com`, `cdn.jsdelivr.net`, or any other third-party CDN for fonts/icons/scripts. If you need a new font or icon set, install it from npm and `@import` it in `src/styles.css` (see commit `ba6113c` for the pattern).

## Build budgets (`angular.json`)

- Initial bundle: warn 2 MB / error 3 MB
- Per-component styles: warn 50 KB / error 100 KB

`about.scss` currently exceeds the warning — known.

## Routing

`provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' }))` — always scrolls to top on navigation. Don't add `RouterModule.forRoot`.

## Stale docs

`ARCHITECTURE.md` predates the Angular 21 / standalone / Vitest migrations and references `app.module.ts`, Karma, `.component.ts` naming, and Angular 16. Treat this file (AGENTS.md) as the source of truth; cross-check `ARCHITECTURE.md` against the code before relying on it.
