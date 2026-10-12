import { DOCUMENT } from '@angular/common';
import { afterNextRender, Injectable, inject, signal } from '@angular/core';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'nw-theme';

/**
 * Light/dark theme. The initial value is applied by the inline script in index.html
 * (so there is no flash); this service reads it back after the first render, which
 * keeps the server-rendered and hydrated markup identical.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly root = inject(DOCUMENT).documentElement;

  readonly theme = signal<Theme>('light');

  constructor() {
    afterNextRender(() => {
      this.theme.set(this.root.dataset['theme'] === 'dark' ? 'dark' : 'light');
    });
  }

  toggle(): void {
    this.set(this.theme() === 'dark' ? 'light' : 'dark');
  }

  set(theme: Theme): void {
    this.theme.set(theme);
    this.root.dataset['theme'] = theme;
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be blocked (private mode); the theme still applies for this visit.
    }
  }
}
