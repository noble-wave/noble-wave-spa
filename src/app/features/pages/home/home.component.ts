import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CounterAnimationService, ThemeService } from '../../../core/services';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { APP_CONFIG } from '../../../config';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('slideAnimation', [
      transition('* => *', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('800ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private observers: IntersectionObserver[] = [];
  @ViewChild('videoElement', { static: false }) videoElement?: ElementRef<HTMLVideoElement>;
  
  appConfig = APP_CONFIG;
  titles: string[] = [
    'Customized Software Development',
    'Capable Engineers Mature Products',
    'Innovation Meets Excellence'
  ];
  currentSlide: number = 0;
  private slideInterval: any;
  isLightMode = true;

  constructor(
    private counterService: CounterAnimationService,
    public themeService: ThemeService
  ) {}
  
  ngOnInit(): void {
    // Component initialization
    
    // Subscribe to theme changes
    this.themeService.theme$.subscribe(theme => {
      this.isLightMode = theme === 'light';
      
      // Ensure video continues playing after theme change
      setTimeout(() => {
        this.ensureVideoPlaying();
      }, 100);
    });
    
    // Start title slider
    this.startTitleSlider();
  }

  private ensureVideoPlaying(): void {
    const video = this.videoElement?.nativeElement;
    if (video) {
      // Force display and visibility
      video.style.display = 'block';
      video.style.visibility = 'visible';
      video.style.opacity = '1';
      
      const container = video.parentElement;
      if (container) {
        container.style.display = 'block';
        container.style.visibility = 'visible';
        container.style.opacity = '1';
      }
      
      // Reload and play if paused
      if (video.paused) {
        video.play().catch(() => {
          // Retry after a short delay
          setTimeout(() => {
            video.play().catch(() => {});
          }, 500);
        });
      }
    }
  }  ngAfterViewInit(): void {
    // Set up counter animations and video after view is initialized
    setTimeout(() => {
      this.setupCounterAnimations();
      this.initializeVideo();
    }, 100);

    // Additional delayed initialization for video
    setTimeout(() => {
      this.forceVideoLoad();
    }, 500);

    // Monitor video playback continuously
    setInterval(() => {
      this.checkVideoPlayback();
    }, 2000);
  }

  private checkVideoPlayback(): void {
    const video = this.videoElement?.nativeElement;
    if (video) {
      if (video.paused && video.readyState >= 2) {
        video.play().catch(() => {});
      }
    }
  }

  ngOnDestroy(): void {
    // Clean up observers and intervals
    this.observers.forEach(observer => observer.disconnect());
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  private startTitleSlider(): void {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.titles.length;
    }, 3000); 
  }

  private stopTitleSlider(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }

  private forceVideoLoad(): void {
    // Force load video
    const video = this.videoElement?.nativeElement;
    if (video) {
      video.style.display = 'none';
      video.offsetHeight;
      video.style.display = 'block';
      
      if (video.readyState >= 2) {
        video.play().catch(() => {});
      } else {
        video.addEventListener('canplay', () => {
          video.play().catch(() => {});
        }, { once: true });
      }
    }
  }

  private initializeVideo(): void {
    const video = this.videoElement?.nativeElement;
    
    if (video) {
      video.load();
      video.play().catch(() => {});
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
        '', 
        2000 
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
