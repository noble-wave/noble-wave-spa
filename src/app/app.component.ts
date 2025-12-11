import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import * as AOS from 'aos';
import { ThemeService } from './services/theme.service';
import { APP_CONFIG, ANIMATION_CONFIG, SCROLL_CONFIG } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = APP_CONFIG.appName;
  currentTheme: string = 'light';
  showScrollButton: boolean = false;

  constructor(private themeService: ThemeService) {
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
