import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import lottie, { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements AfterViewInit {

  @ViewChild('codingAnimationContainer', { static: false }) codingAnimationContainer!: ElementRef;
  @ViewChild('targetAnimationContainer', { static: false }) targetAnimationContainer!: ElementRef;
  @ViewChild('deliveryAnimationContainer', { static: false }) deliveryAnimationContainer!: ElementRef;
  @ViewChild('communicationAnimationContainer', { static: false }) communicationAnimationContainer!: ElementRef;
  @ViewChild('learningAnimationContainer', { static: false }) learningAnimationContainer!: ElementRef;
  @ViewChild('priceAnimationContainer', { static: false }) priceAnimationContainer!: ElementRef;

  private codingAnimation!: AnimationItem;
  private targetAnimation!: AnimationItem;
  private deliveryAnimation!: AnimationItem;
  private communicationAnimation!: AnimationItem;
  private learningAnimation!: AnimationItem;
  private priceAnimation!: AnimationItem;

  constructor(public themeService: ThemeService) {}

  ngAfterViewInit(): void {
    this.loadAllAnimations();
  }

  private loadAllAnimations(): void {
    if (this.codingAnimationContainer) {
      this.codingAnimation = lottie.loadAnimation({
        container: this.codingAnimationContainer.nativeElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/lottie-animation/Coding.json'
      });
    }

    if (this.targetAnimationContainer) {
      this.targetAnimation = lottie.loadAnimation({
        container: this.targetAnimationContainer.nativeElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/lottie-animation/Target.json'
      });
    }

    if (this.deliveryAnimationContainer) {
      this.deliveryAnimation = lottie.loadAnimation({
        container: this.deliveryAnimationContainer.nativeElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/lottie-animation/one-time-delivery.json'
      });
    }

    if (this.communicationAnimationContainer) {
      this.communicationAnimation = lottie.loadAnimation({
        container: this.communicationAnimationContainer.nativeElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/lottie-animation/communication.json'
      });
    }

    if (this.learningAnimationContainer) {
      this.learningAnimation = lottie.loadAnimation({
        container: this.learningAnimationContainer.nativeElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/lottie-animation/Learning.json'
      });
    }

    if (this.priceAnimationContainer) {
      this.priceAnimation = lottie.loadAnimation({
        container: this.priceAnimationContainer.nativeElement,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/lottie-animation/Price.json'
      });
    }
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
