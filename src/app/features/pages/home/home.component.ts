import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CounterAnimationService, ThemeService } from '../../../core/services';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
  
  titles: string[] = [
    'Customized Software Development',
    'Capable Engineers Mature Products',
    // 'Crafting Modern Web Applications', 
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
    console.log('Home component initialized');
    
    // Subscribe to theme changes
    this.themeService.theme$.subscribe(theme => {
      this.isLightMode = theme === 'light';
      console.log('Theme changed to:', theme);
      
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
      const computedStyle = window.getComputedStyle(video);
      const container = video.parentElement;
      const containerStyle = container ? window.getComputedStyle(container) : null;
      
      console.log('=== VIDEO DEBUG INFO ===');
      console.log('Video element:', {
        exists: !!video,
        paused: video.paused,
        readyState: video.readyState,
        currentTime: video.currentTime,
        duration: video.duration,
        display: computedStyle.display,
        visibility: computedStyle.visibility,
        opacity: computedStyle.opacity,
        zIndex: computedStyle.zIndex
      });
      
      if (containerStyle) {
        console.log('Container:', {
          display: containerStyle.display,
          visibility: containerStyle.visibility,
          opacity: containerStyle.opacity,
          zIndex: containerStyle.zIndex,
          position: containerStyle.position
        });
      }
      
      console.log('Current theme:', this.themeService.getCurrentTheme());
      
      // Force display and visibility
      video.style.display = 'block';
      video.style.visibility = 'visible';
      video.style.opacity = '1';
      
      if (container) {
        container.style.display = 'block';
        container.style.visibility = 'visible';
        container.style.opacity = '1';
      }
      
      // Reload and play if paused
      if (video.paused) {
        console.log('Video is paused, attempting to play...');
        video.play().catch(err => {
          console.error('Video play error:', err);
          // Retry after a short delay
          setTimeout(() => {
            console.log('Retrying video play...');
            video.play().catch(e => console.error('Video play retry error:', e));
          }, 500);
        });
      } else {
        console.log('Video is already playing');
      }
    } else {
      console.error('Video element not found!');
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
      const theme = this.themeService.getCurrentTheme();
      if (video.paused && video.readyState >= 2) {
        console.log(`[${theme}] Video was paused, restarting...`);
        video.play().catch(err => console.log('Auto-restart error:', err));
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
        video.play().catch(err => console.log('Video play error:', err));
      } else {
        video.addEventListener('canplay', () => {
          video.play().catch(err => console.log('Video play error:', err));
        }, { once: true });
      }
      
      console.log('Video force loaded - readyState:', video.readyState);
    }
  }

  private initializeVideo(): void {
    const video = this.videoElement?.nativeElement;
    
    if (video) {
      console.log('Initializing video...');
      video.load();
      video.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });

      video.addEventListener('loadeddata', () => {
        console.log('Video loaded successfully');
      });

      video.addEventListener('canplay', () => {
        console.log('Video can play');
      });

      video.addEventListener('error', (e) => {
        console.error('Video loading error:', e);
      });
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
