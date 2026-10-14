/**
 * Single source of truth for company details. Pages, header, footer and SEO
 * metadata all read from here, so a change is made in exactly one place.
 */
export const SITE = {
  name: 'Noble Wave',
  tagline: 'Useful apps for PDFs, prayer and rentals',
  description:
    'Noble Wave builds free apps people use daily: PDF Workshop, Noble Salah Guide, Rent Manager and Noble Qaida, for PDFs, prayer, rentals and learning. Made in New Delhi.',
  url: 'https://noble-wave.com',
  email: 'info@noble-wave.com',
  phone: '+918448462846',
  phoneDisplay: '+91 84484 62846',
  location: 'New Delhi, India',
  /** WhatsApp number in international format, digits only (used for wa.me links). */
  whatsapp: '918448462846',
  /** Default image for link previews (Open Graph / Twitter cards), 1200x630. See scripts/make-og.mjs. */
  ogImage: '/images/og/default.png',
  /**
   * Public profile URLs (LinkedIn, GitHub, X ...). They go into the Organization structured data
   * as `sameAs` so search engines can link the brand to its profiles. Empty until profiles exist.
   */
  social: [] as readonly string[],
} as const;

/**
 * EmailJS settings for the contact form (https://www.emailjs.com). The public key is meant to be
 * visible in the browser; restrict it to noble-wave.com under Account > Security in the EmailJS
 * dashboard. While any value is empty the form falls back to opening the visitor's email app.
 */
export const EMAILJS = {
  serviceId: '',
  templateId: '',
  publicKey: '',
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

/** Opens a WhatsApp chat with the company, with a ready-to-send first line the visitor can edit. */
export const WHATSAPP_URL = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent('Hello Noble Wave, I found you through your website and would like to ask about ')}`;
