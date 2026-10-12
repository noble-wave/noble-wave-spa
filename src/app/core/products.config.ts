export interface Screenshot {
  /** File name (without size suffix or extension) in public/images/products. */
  readonly file: string;
  readonly alt: string;
}

export interface ProductLink {
  readonly kind: 'web' | 'play';
  readonly label: string;
  readonly url: string;
}

/** One screen in a product walkthrough (see public/images/story). */
export interface StoryStep {
  readonly file: string;
  readonly title: string;
  readonly text: string;
  readonly alt: string;
}

export interface Product {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  /** Short platform badges shown next to the name. */
  readonly platforms: readonly string[];
  readonly features: readonly string[];
  readonly links: readonly ProductLink[];
  readonly screenshots: readonly Screenshot[];
  readonly story: readonly StoryStep[];
  /** Brand glow behind the phone, as an "r g b" triplet. */
  readonly glow: string;
}

export const PRODUCTS: readonly Product[] = [
  {
    id: 'noble-salah',
    name: 'Noble Salah Guide',
    tagline: 'Prayer times, Qibla and daily Islamic tools in one app',
    description:
      'Noble Salah Guide helps you keep up with your daily prayers. See accurate prayer times and a countdown to the next prayer, then use the built-in tools for Qibla, the Quran, hadith, the Islamic calendar and more.',
    platforms: ['Web', 'Android'],
    features: [
      'Accurate prayer times with a next-prayer countdown',
      'Qibla compass and a monthly prayer calendar',
      'Quran and hadith in the app',
      'Qada prayer counter and prayer tracking',
      'Wudu and salah guides, morning and evening adhkar',
    ],
    glow: '34 160 100',
    story: [
      { file: 'salah-prayer-times', title: 'Prayer times, always in view', text: 'See the current prayer, when it ends, and a countdown to the next one.', alt: 'Noble Salah Guide home screen with the current prayer, its end time and the next prayer countdown' },
      { file: 'salah-tools', title: 'Everything for your day', text: 'Wudu and salah guides, Qibla, a prayer calendar, a Qada counter and morning and evening adhkar, all in one Tools tab.', alt: 'Noble Salah Guide tools tab with wudu guide, salah guide, Qibla, prayer calendar, Qada prayers and adhkar' },
      { file: 'salah-quran', title: 'The Quran in your pocket', text: 'Browse all 114 surahs in Arabic, with ayah counts and where each was revealed.', alt: 'Noble Salah Guide Quran screen listing surahs in Arabic and English' },
      { file: 'salah-qibla', title: 'Find the Qibla', text: 'A compass that points toward the Kaaba and tells you when you are facing it.', alt: 'Noble Salah Guide Qibla compass pointing toward the Kaaba' },
      { file: 'salah-calendar', title: 'The Islamic calendar', text: 'Hijri and Gregorian dates side by side, with upcoming Islamic dates listed below.', alt: 'Noble Salah Guide Islamic calendar for August 2026 with upcoming Islamic dates' },
    ],
    links: [
      { kind: 'play', label: 'Get it on Google Play', url: 'https://play.google.com/store/apps/details?id=com.noblewave.noblesalah' },
      { kind: 'web', label: 'Open web app', url: 'https://salah.noble-wave.com/' },
    ],
    screenshots: [
      { file: 'salah-prayer-times', alt: 'Noble Salah Guide home screen showing the current prayer, its end time and a countdown to the next prayer' },
      { file: 'salah-tools', alt: 'Noble Salah Guide tools screen with wudu guide, salah guide, Qibla, prayer calendar, Qada prayers and adhkar' },
      { file: 'salah-quran', alt: 'Noble Salah Guide Quran screen' },
      { file: 'salah-qibla', alt: 'Noble Salah Guide Qibla compass screen' },
      { file: 'salah-calendar', alt: 'Noble Salah Guide Islamic calendar screen' },
      { file: 'salah-qada', alt: 'Noble Salah Guide Qada prayers counter screen' },
      { file: 'salah-hadith-1', alt: 'Noble Salah Guide hadith screen, first view' },
      { file: 'salah-hadith-2', alt: 'Noble Salah Guide hadith screen, second view' },
    ],
  },
  {
    id: 'rent-manager',
    name: 'Rent Manager',
    tagline: 'Manage your rentals, hassle free',
    description:
      'Rent Manager keeps landlords organised. Track properties, units and tenants, record rent and utility bills, see who has paid and who still owes, and get reminders before payments are due.',
    platforms: ['Web'],
    features: [
      'Houses, apartments, shops and PG properties',
      'Units and tenants with payment status',
      'Rent and utility bills in one place',
      'Payments by UPI, cash or bank, with monthly summaries',
      'Reminders so you never miss a due date',
    ],
    glow: '52 211 153',
    story: [
      { file: 'rent-portfolio', title: 'Every property at a glance', text: 'Properties, tenants and vacant units, with rent collected against rent due for each property.', alt: 'Rent Manager portfolio listing properties with rent collected and overdue status' },
      { file: 'rent-units', title: 'Units and tenants', text: 'See what is expected, collected and outstanding for every unit, and add tenants to the vacant ones.', alt: 'Rent Manager property screen showing expected, collected and outstanding rent per unit' },
      { file: 'rent-add-property', title: 'Set up in minutes', text: 'Add a house, apartment, shop or PG, then set electricity and additional charges.', alt: 'Rent Manager add property form with house, apartment, shop and PG types' },
      { file: 'rent-payments', title: 'Know who has paid', text: 'Money received this month, what is still owed, and a breakdown by UPI, cash and bank.', alt: 'Rent Manager payments screen with monthly collections by UPI, cash and bank' },
    ],
    links: [{ kind: 'web', label: 'Open web app', url: 'https://rentiva.noble-wave.com/' }],
    screenshots: [
      { file: 'rent-portfolio', alt: 'Rent Manager property portfolio listing properties with rent collected and overdue status' },
      { file: 'rent-units', alt: 'Rent Manager property screen showing expected, collected and outstanding rent for each unit' },
      { file: 'rent-add-property', alt: 'Rent Manager add property form with house, apartment, shop and PG types' },
      { file: 'rent-payments', alt: 'Rent Manager payments screen with monthly collections by UPI, cash and bank' },
    ],
  },
];
