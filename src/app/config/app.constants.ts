/**
 * Application Constants
 * Centralized configuration for the entire application
 */

export const APP_CONFIG = {
  appName: 'Noble Wave',
  tagline: 'Leading Digital Innovation',
  description: 'Transforming ideas into powerful digital solutions',
} as const;

export const COMPANY_INFO = {
  name: 'Noble Wave',
  email: 'info@noble-wave.com',
  phone: '+918448462846',
  phoneDisplay: '(+91) 8448462846',
  location: 'New Delhi, India',
  address: 'New Delhi, India',
} as const;

export const SOCIAL_LINKS = {
  linkedin: 'https://linkedin.com/company/noble-wave',
  twitter: 'https://twitter.com/noble-wave',
  github: 'https://github.com/noble-wave',
  facebook: 'https://facebook.com/noble-wave',
} as const;

export const NAVIGATION_LINKS = [
  { label: 'Home', path: '/', fragment: 'home' },
  { label: 'About', path: '/about', fragment: 'about' },
  { label: 'Services', path: '/detail', fragment: 'services' },
  { label: 'Contact', path: '/', fragment: 'contact' },
] as const;

export const SCROLL_CONFIG = {
  behavior: 'smooth' as ScrollBehavior,
  offset: 80, // Header height offset
} as const;

export const ANIMATION_CONFIG = {
  aos: {
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
  },
} as const;

export const EMAIL_CONFIG = {
  supportEmail: COMPANY_INFO.email,
  contactSubject: 'Contact from Noble Wave Website',
} as const;
