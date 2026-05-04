import { ApplicationConfig, importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

import { routes } from './app.routes';
import { lucideIcons } from './config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
  ],
};
