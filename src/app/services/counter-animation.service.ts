import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CounterAnimationService {

  constructor() { }

  /**
   * Animates a number from start to end value
   * @param element - The DOM element to update
   * @param start - Starting number
   * @param end - Target number
   * @param duration - Animation duration in milliseconds
   * @param suffix - Optional suffix (e.g., '+', '%', 'K')
   */
  animateCounter(
    element: HTMLElement, 
    start: number = 0, 
    end: number, 
    duration: number = 2000,
    suffix: string = ''
  ): void {
    const startTime = performance.now();
    const range = end - start;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(start + (range * easeOutQuart));
      
      element.textContent = this.formatNumber(currentValue) + suffix;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = this.formatNumber(end) + suffix;
      }
    };

    requestAnimationFrame(updateCounter);
  }

  /**
   * Format number with commas for thousands
   */
  private formatNumber(num: number): string {
    return num.toLocaleString();
  }

  /**
   * Create intersection observer for counter animation
   */
  createCounterObserver(
    element: HTMLElement, 
    targetValue: number, 
    suffix: string = '',
    duration: number = 2000
  ): IntersectionObserver {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            entry.target.setAttribute('data-animated', 'true');
            this.animateCounter(entry.target as HTMLElement, 0, targetValue, duration, suffix);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observer.observe(element);
    return observer;
  }
}
