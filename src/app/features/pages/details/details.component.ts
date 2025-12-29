import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CounterAnimationService, ThemeService } from '../../../core/services';
import { APP_CONFIG } from '../../../config';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, AfterViewInit {
  private observer: IntersectionObserver | null = null;
  appConfig = APP_CONFIG;
  // --- Software Development Service Details ---
  item = {
    id: 'nw-dev-001',
    title: 'Enterprise Software Development',
    subtitle: 'Custom software solutions built with cutting-edge technologies',
    rating: 4.9,
    reviews: 156,
    price: 'Custom',
    currency: '',
    tags: ['Full-Stack', 'Cloud', 'Scalable', 'Agile'],
    images: [
      'assets/noble/teamwork.png',
      'assets/noble/about1.jpg',
      'assets/noble/teamwork1.jpg',
      'assets/noble/teamwork2.jpg'
    ],
    features: [
      'Full-Stack Web & Mobile Development',
      'Cloud-Native Architecture & DevOps',
      'RESTful & GraphQL API Development',
      'Microservices & Scalable Infrastructure'
    ],
    specs: {
      frontend: 'Angular, React, Vue.js, TypeScript',
      backend: 'Node.js, NestJS, Express, Python',
      database: 'PostgreSQL, MongoDB, Redis, MySQL',
      cloud: 'AWS, Azure, Google Cloud, Docker, Kubernetes',
      methodology: 'Agile, Scrum, CI/CD, TDD',
    },
    description:
      'NobleWave delivers enterprise-grade software solutions tailored to your business needs. From web applications to cloud infrastructure, we leverage modern technologies and best practices to build scalable, secure, and high-performance systems.'
  };

  selectedImageIndex = 0;
  lightboxOpen = false;

  // Computed specs array for template iteration
  specsArray: {label: string; value: string}[] = [];

  constructor(
    private counterService: CounterAnimationService,
    private elementRef: ElementRef,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // Build specs array from specs object dynamically
    this.specsArray = Object.entries(this.item.specs).map(([key, value]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value: value as string
    }));
  }

  ngAfterViewInit(): void {
    this.setupCounterAnimation();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupCounterAnimation(): void {
    const statsSection = this.elementRef.nativeElement.querySelector('.stats-counter-section');
    
    if (!statsSection) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounters();
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.observer.observe(statsSection);
  }

  private animateCounters(): void {
    // Animate Technologies counter (15+)
    const techElement = this.elementRef.nativeElement.querySelector('#tech-counter');
    if (techElement) {
      this.counterService.animateCounter(techElement, 0, 15, 2000, '+');
    }

    // Animate Success Rate counter (98%)
    const uptimeElement = this.elementRef.nativeElement.querySelector('#uptime-counter');
    if (uptimeElement) {
      this.counterService.animateCounter(uptimeElement, 0, 98, 2500, '%');
    }

    // Animate Code Quality - special handling
    const supportElement = this.elementRef.nativeElement.querySelector('#support-counter');
    if (supportElement) {
      supportElement.textContent = '0';
      setTimeout(() => {
        supportElement.textContent = '100%';
      }, 1500);
    }

    // Animate Possibilities (∞) - special effect
    const possibilitiesElement = this.elementRef.nativeElement.querySelector('#possibilities-counter');
    if (possibilitiesElement) {
      possibilitiesElement.textContent = '0';
      setTimeout(() => {
        possibilitiesElement.style.opacity = '0';
        setTimeout(() => {
          possibilitiesElement.textContent = '∞';
          possibilitiesElement.style.opacity = '1';
        }, 300);
      }, 2000);
    }
  }

  // Method to scroll to services section
  scrollToServicesSection(): void {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // --- New interactive helpers for gallery / CTA ---
  selectImage(idx: number): void {
    if (idx >= 0 && idx < this.item.images.length) {
      this.selectedImageIndex = idx;
    }
  }

  nextImage(): void {
    this.selectedImageIndex = (this.selectedImageIndex + 1) % this.item.images.length;
  }

  prevImage(): void {
    this.selectedImageIndex = (this.selectedImageIndex - 1 + this.item.images.length) % this.item.images.length;
  }

  toggleLightbox(open?: boolean): void {
    this.lightboxOpen = typeof open === 'boolean' ? open : !this.lightboxOpen;
  }

  addToCart(): void {
    // Minimal placeholder behaviour for now
    alert(`${this.item.title} added to cart`);
  }

  onImgError(event: Event): void {
    const el = event.target as HTMLImageElement;
    if (el && el.src && !el.dataset['fallback']) {
      el.dataset['fallback'] = '1';
      el.src = 'assets/noble/banner.jpg';
    }
  }

  // Method to scroll to contact section
  scrollToContactSection(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
