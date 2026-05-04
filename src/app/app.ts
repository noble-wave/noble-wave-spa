import { Component, OnInit, AfterViewInit, HostListener, inject } from '@angular/core';
import * as AOS from 'aos';
import { ThemeService } from './core/services';
import { APP_CONFIG, ANIMATION_CONFIG, SCROLL_CONFIG } from './config';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.html',
    styleUrl: './app.scss',
    imports: [RouterOutlet]
})
export class AppComponent implements OnInit, AfterViewInit {
  private themeService = inject(ThemeService);

  title = APP_CONFIG.appName;
  currentTheme = 'light';
  showScrollButton = false;

  constructor() {
    // Subscribe to theme changes
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  ngOnInit() {
    // Initialize AOS after the component loads
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Show button when user scrolls down 300px
    this.showScrollButton = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: SCROLL_CONFIG.behavior
    });
  }

  ngAfterViewInit() {
    AOS.init({
      duration: ANIMATION_CONFIG.aos.duration,
      easing: ANIMATION_CONFIG.aos.easing,
      once: ANIMATION_CONFIG.aos.once,
      mirror: true,
      offset: 100,
      delay: 0,
      disable: false,
      startEvent: 'DOMContentLoaded',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: 50,
      throttleDelay: 99,
    });

    // Refresh AOS after route changes and DOM updates
    setTimeout(() => {
      AOS.refresh();
    }, 1000);
  }
}
