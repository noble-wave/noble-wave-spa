import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeSubject: BehaviorSubject<string>;
  public theme$: Observable<string>;

  constructor() {
    // Always use light mode
    this.themeSubject = new BehaviorSubject<string>('light');
    this.theme$ = this.themeSubject.asObservable();
    
    // Apply light mode on initialization
    this.applyLightMode();
  }

  getCurrentTheme(): string {
    return 'light';
  }

  private applyLightMode(): void {
    document.body.setAttribute('data-theme', 'light');
    
    // Apply light mode styles
    document.body.style.setProperty('background', '#ffffff', 'important');
    document.body.style.setProperty('background-attachment', 'initial', 'important');
    document.body.style.setProperty('color', '#1f2937', 'important');
    document.body.style.removeProperty('min-height');
  }

  isLightMode(): boolean {
    return true;
  }
}
