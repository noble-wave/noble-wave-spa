import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../../core/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  isScrolled = false;
  isInHomeSection = true;

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // Set initial transparent header for home section
    this.updateHeaderStyle();
  }

  // Toggle mobile menu
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    const mobileMenu = document.querySelector('.mobile-menu') as HTMLElement;
    if (mobileMenu) {
      if (this.isMobileMenuOpen) {
        mobileMenu.classList.add('active');
      } else {
        mobileMenu.classList.remove('active');
      }
    }
  }

  // Close mobile menu
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    const mobileMenu = document.querySelector('.mobile-menu') as HTMLElement;
    if (mobileMenu) {
      mobileMenu.classList.remove('active');
    }
  }

  // Listen for scroll events to detect which section we're in
  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Consider we're in home section if we're in the first 70% of viewport
    this.isInHomeSection = scrollPosition < windowHeight * 0.7;
    this.isScrolled = scrollPosition > 50;

    this.updateHeaderStyle();
  }

  // Update header style based on section and scroll position
  private updateHeaderStyle(): void {
    const nav = document.querySelector('nav') as HTMLElement;
    if (nav) {
      if (this.isInHomeSection && !this.isScrolled) {
        // Transparent when in home section and not scrolled
        this.setTransparentHeader();
      } else {
        // Glass-morphism when scrolled or in other sections
        this.setGlassHeader();
      }
    }
  }

  // Set transparent header for home section
  private setTransparentHeader(): void {
    const nav = document.querySelector('nav') as HTMLElement;
    if (nav) {
      nav.style.background = 'transparent';
      nav.style.backdropFilter = 'none';
      nav.style.boxShadow = 'none';
      nav.style.borderBottom = 'none';
      nav.classList.remove('glass-header');
      nav.classList.add('transparent-header');
    }
  }

  // Set glass-morphism header for other sections
  private setGlassHeader(): void {
    const nav = document.querySelector('nav') as HTMLElement;
    if (nav) {
      nav.classList.remove('transparent-header');
      nav.classList.add('glass-header');
    }
  }

  // Navigate to section or route
  scrollToSection(sectionId: string): void {
    // Handle routing for specific pages
    if (sectionId === '#about') {
      this.router.navigate(['/about']);
    } else if (sectionId === '#services') {
      this.router.navigate(['/detail']);
    } else if (sectionId === '#home') {
      this.router.navigate(['/']);
    } else {
      // For sections within the same page (like contact in footer)
      const element = document.getElementById(sectionId.replace('#', ''));
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
    this.closeMobileMenu();
  }
}
