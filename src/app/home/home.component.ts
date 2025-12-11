import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CounterAnimationService } from '../services/counter-animation.service';
import { ThemeService } from '../services/theme.service';
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
      
      // Stop/start video based on theme
      if (this.isLightMode) {
        this.startTitleSlider();
      } else {
        this.stopTitleSlider();
      }
    });
    
    // Start title slider if in light mode
    if (this.isLightMode) {
      this.startTitleSlider();
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
    }, 3000); // Change every 3 seconds
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
