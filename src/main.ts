import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { importProvidersFrom, provideZonelessChangeDetection } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { lucideIcons } from './app/config';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideAnimationsAsync(),
    provideRouter(routes, withInMemoryScrolling({ scrollPositionRestoration: 'top' })),
    importProvidersFrom(LucideAngularModule.pick(lucideIcons)),
  ],
}).catch((err) => console.error(err));
