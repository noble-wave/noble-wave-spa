import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject: BehaviorSubject<string>;
  public theme$: Observable<string>;
  private readonly THEME_KEY = 'noble-wave-theme';

  constructor() {
    // Load theme from localStorage or default to light
    const savedTheme = localStorage.getItem(this.THEME_KEY) || 'light';
    this.themeSubject = new BehaviorSubject<string>(savedTheme);
    this.theme$ = this.themeSubject.asObservable();
    
    // Apply saved theme on initialization
    this.applyTheme(savedTheme);
  }

  toggleTheme(): void {
    const currentTheme = this.themeSubject.value;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: string): void {
    this.themeSubject.next(theme);
    localStorage.setItem(this.THEME_KEY, theme);
    this.applyTheme(theme);
  }

  getCurrentTheme(): string {
    return this.themeSubject.value;
  }

  isDarkMode(): boolean {
    return this.themeSubject.value === 'dark';
  }

  isLightMode(): boolean {
    return this.themeSubject.value === 'light';
  }

  private applyTheme(theme: string): void {
    document.body.setAttribute('data-theme', theme);
    
    if (theme === 'dark') {
      // Apply dark mode styles
      document.body.style.setProperty('background', '#0f172a', 'important');
      document.body.style.setProperty('color', '#e2e8f0', 'important');
    } else {
      // Apply light mode styles
      document.body.style.setProperty('background', '#ffffff', 'important');
      document.body.style.setProperty('color', '#1f2937', 'important');
    }
    document.body.style.setProperty('background-attachment', 'initial', 'important');
  }
}
