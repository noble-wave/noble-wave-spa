import { provideZonelessChangeDetection } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

export default [
  provideZonelessChangeDetection(),
  provideNoopAnimations(),
  provideRouter([]),
];
