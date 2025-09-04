import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isMobileMenuOpen = false;
  isScrolled = false;

  constructor() {}

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

  // Listen for scroll events to add/remove scrolled class
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset > 50;
    const nav = document.querySelector('nav') as HTMLElement;
    if (nav) {
      if (this.isScrolled) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.backdropFilter = 'blur(25px)';
      } else {
        nav.style.background = 'rgba(255, 255, 255, 0.08)';
        nav.style.backdropFilter = 'blur(20px)';
      }
    }
  }

  // Smooth scroll to section
  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    this.closeMobileMenu();
  }
}
