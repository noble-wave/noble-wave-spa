import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as AOS from 'aos';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'noble-wave';
  currentTheme: string = 'light';

  constructor(private themeService: ThemeService) {
    // Subscribe to theme changes
    this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
    });
  }

  ngOnInit() {
    // Initialize AOS after the component loads
  }

  ngAfterViewInit() {
    AOS.init({
      duration: 800, // Animation duration in milliseconds
      easing: 'ease-out-cubic', // Easing function
      once: false, // Animation happens every time element comes into view
      mirror: true, // Elements animate out while scrolling past them
      offset: 100, // Offset from the original trigger point
      delay: 0, // Global delay in milliseconds
      disable: false, // Disable AOS on certain conditions
      startEvent: 'DOMContentLoaded', // Event on which AOS should initialize
      animatedClassName: 'aos-animate', // Class applied after initialization
      useClassNames: false, // If true, will add content of `data-aos` as classes on scroll
      disableMutationObserver: false, // Disables automatic mutations' detections
      debounceDelay: 50, // Delay on resize
      throttleDelay: 99, // Delay on scroll
    });

    // Refresh AOS after route changes and DOM updates
    setTimeout(() => {
      AOS.refresh();
    }, 1000);
  }
}
