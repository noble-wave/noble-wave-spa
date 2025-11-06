import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CounterAnimationService } from '../services/counter-animation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private observers: IntersectionObserver[] = [];
  @ViewChild('videoElement', { static: false }) videoElement?: ElementRef<HTMLVideoElement>;

  constructor(private counterService: CounterAnimationService) {}

  ngOnInit(): void {
    // Component initialization
    console.log('Home component initialized');
  }

  ngAfterViewInit(): void {
    // Set up counter animations and video after view is initialized
    setTimeout(() => {
      this.setupCounterAnimations();
      this.initializeVideo();
    }, 100);

    // Additional delayed initialization for video
    setTimeout(() => {
      this.forceVideoLoad();
    }, 500);
  }

  ngOnDestroy(): void {
    // Clean up observers
    this.observers.forEach(observer => observer.disconnect());
  }

  private forceVideoLoad(): void {
    const video = document.querySelector('.video-bg') as HTMLVideoElement;
    if (video) {
      // Force reflow/repaint
      video.style.display = 'none';
      video.offsetHeight; // Trigger reflow
      video.style.display = 'block';
      
      // Ensure video is loaded and playing
      if (video.readyState >= 2) {
        video.play().catch(err => console.log('Video play error:', err));
      } else {
        video.addEventListener('canplay', () => {
          video.play().catch(err => console.log('Video play error:', err));
        }, { once: true });
      }
      
      console.log('Video force loaded - readyState:', video.readyState);
    } else {
      console.error('Video element not found');
    }
  }

  private initializeVideo(): void {
    const video = document.querySelector('.video-bg') as HTMLVideoElement;
    if (video) {
      console.log('Initializing video...');
      
      // Set video source explicitly if needed
      video.load();

      // Force video to play
      video.play().catch(error => {
        console.log('Video autoplay failed:', error);
        // Fallback: Try to play on user interaction
        document.addEventListener('click', () => {
          video.play().catch(err => console.log('Click play failed:', err));
        }, { once: true });
      });

      // Log video status for debugging
      video.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
      });

      video.addEventListener('canplay', () => {
        console.log('Video can play');
        video.play().catch(err => console.log('Canplay error:', err));
      });

      video.addEventListener('error', (e) => {
        console.error('Video loading error:', e);
        console.error('Video error details:', video.error);
      });

      video.addEventListener('loadstart', () => {
        console.log('Video loading started');
      });
    } else {
      console.error('Video element not found in DOM');
    }
  }

  private setupCounterAnimations(): void {
    // Find all counter elements
    const counterElements = document.querySelectorAll('.counter-number');
    
    counterElements.forEach((element) => {
      const target = parseInt(element.getAttribute('data-target') || '0');
      const htmlElement = element as HTMLElement;
      
      // Create observer for each counter
      const observer = this.counterService.createCounterObserver(
        htmlElement,
        target,
        '', // No suffix for these counters, suffix is in HTML
        2000 // 2 seconds duration
      );
      
      this.observers.push(observer);
    });
  }

  // Method to scroll to contact section
  scrollToContact(): void {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Method to scroll to services section  
  scrollToServices(): void {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
