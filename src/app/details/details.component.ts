import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CounterAnimationService } from '../services/counter-animation.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit, AfterViewInit {
  private observer: IntersectionObserver | null = null;

  constructor(
    private counterService: CounterAnimationService,
    private elementRef: ElementRef,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {}

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

  // Method to scroll to contact section
  scrollToContactSection(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
