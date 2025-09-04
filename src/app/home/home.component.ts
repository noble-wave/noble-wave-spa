import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    // Start counter animations when component is loaded
    this.animateCounters();
  }

  private animateCounters(): void {
    const counters = document.querySelectorAll('.counter');

    const observerOptions = {
      threshold: 0.7,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target as HTMLElement;
          const target = parseInt(counter.getAttribute('data-target') || '0');
          const duration = 2000; // 2 seconds
          const startTime = performance.now();

          const updateCounter = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(easeOutQuart * target);

            counter.textContent = currentValue.toString();

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toString();
            }
          };

          requestAnimationFrame(updateCounter);
          observer.unobserve(counter);
        }
      });
    }, observerOptions);

    counters.forEach((counter) => {
      observer.observe(counter);
    });
  }

  playVideo(): void {
    const videoElement = document.getElementById(
      'videoElement'
    ) as HTMLVideoElement;
    if (videoElement) {
      videoElement.play();
    }
  }
}
