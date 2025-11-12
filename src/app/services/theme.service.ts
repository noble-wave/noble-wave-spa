import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'app-theme';
  private themeSubject: BehaviorSubject<Theme>;
  public theme$: Observable<Theme>;

  constructor() {
    // Load theme from localStorage or default to 'light'
    const savedTheme = (localStorage.getItem(this.THEME_KEY) as Theme) || 'light';
    this.themeSubject = new BehaviorSubject<Theme>(savedTheme);
    this.theme$ = this.themeSubject.asObservable();
    
    // Apply theme on initialization
    this.applyTheme(savedTheme);
  }

  getCurrentTheme(): Theme {
    return this.themeSubject.value;
  }

  toggleTheme(): void {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    localStorage.setItem(this.THEME_KEY, theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: Theme): void {
    document.body.setAttribute('data-theme', theme);
    
    // Apply inline styles with maximum priority
    if (theme === 'dark') {
      // Exact gradient from production site (noble-wave.com)
      document.body.style.setProperty('background', 'linear-gradient(135deg, rgb(15, 15, 35) 0%, rgb(26, 26, 46) 50%, rgb(22, 33, 62) 100%)', 'important');
      document.body.style.setProperty('background-attachment', 'fixed', 'important');
      document.body.style.setProperty('color', '#ffffff', 'important');
      document.body.style.setProperty('min-height', '100vh', 'important');
    } else {
      // Light mode - white background
      document.body.style.setProperty('background', '#ffffff', 'important');
      document.body.style.setProperty('background-attachment', 'initial', 'important');
      document.body.style.setProperty('color', '#1f2937', 'important');
      document.body.style.removeProperty('min-height');
    }
    
    console.log('🎨 Theme Applied:', theme);
    console.log('📦 Body data-theme:', document.body.getAttribute('data-theme'));
  }

  isDarkMode(): boolean {
    return this.themeSubject.value === 'dark';
  }

  isLightMode(): boolean {
    return this.themeSubject.value === 'light';
  }
}
