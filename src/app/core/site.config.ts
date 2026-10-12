/**
 * Single source of truth for company details. Pages, header, footer and SEO
 * metadata all read from here, so a change is made in exactly one place.
 *
 * TODO(content): email and phone were carried over from the old site and have not
 * been confirmed as current.
 */
export const SITE = {
  name: 'Noble Wave',
  tagline: 'Your Trusted IT Development Partner',
  description:
    'Noble Wave designs and builds custom software, web and mobile apps, and cloud solutions for businesses from New Delhi, India.',
  url: 'https://noble-wave.com',
  email: 'info@noble-wave.com',
  phone: '+918448462846',
  phoneDisplay: '+91 84484 62846',
  location: 'New Delhi, India',
  /** Image used for link previews (Open Graph / Twitter cards). */
  ogImage: '/images/about1.jpg',
  /**
   * Contact form endpoint (for example a Formspree or Web3Forms URL that accepts a JSON POST).
   * While this is empty the form falls back to opening the visitor's email app, pre-filled.
   */
  formEndpoint: '',
} as const;

export interface NavLink {
  readonly label: string;
  readonly path: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Products', path: '/products' },
  { label: 'Contact', path: '/contact' },
];

export const LEGAL_LINKS: readonly NavLink[] = [
  { label: 'Privacy Policy', path: '/privacy' },
  { label: 'Terms of Service', path: '/terms' },
];
