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

export interface ProductFaq {
  readonly q: string;
  readonly a: string;
}

export interface Product {
  readonly id: string;
  readonly name: string;
  /** 'phone' products show portrait phone screens; 'desktop' products show wide laptop screens. */
  readonly device: 'phone' | 'desktop';
  readonly tagline: string;
  readonly description: string;
  /** schema.org applicationCategory, used in the SoftwareApplication structured data. */
  readonly category: 'BusinessApplication' | 'UtilitiesApplication' | 'LifestyleApplication';
  /** True when the product is free to use; it adds a zero-price offer to the structured data. */
  readonly free?: boolean;
  /** Short platform badges shown next to the name. */
  readonly platforms: readonly string[];
  readonly features: readonly string[];
  /** Questions people ask about this product. Shown on its page and in FAQPage structured data. */
  readonly faq: readonly ProductFaq[];
  readonly links: readonly ProductLink[];
  readonly screenshots: readonly Screenshot[];
  readonly story: readonly StoryStep[];
  /** Brand glow behind the phone, as an "r g b" triplet. */
  readonly glow: string;
}

export const PRODUCTS: readonly Product[] = [
  {
    id: 'pdf-workshop',
    name: 'PDF Workshop',
    device: 'desktop',
    category: 'BusinessApplication',
    free: true,
    tagline: 'Every PDF job, done on your own machine',
    description:
      'PDF Workshop is a free web app with close to 100 tools for working with PDFs: merge, edit, sign, convert and make scans searchable. Everything runs in your browser, so your files never leave your device.',
    platforms: ['Web'],
    features: [
      'Merge, split, reorder, rotate and trim pages',
      'Annotate, redact, watermark and add page numbers',
      'Sign PDFs, fill forms and create fillable forms',
      'Convert images and other files to PDF, and PDFs to images and Word',
      'Encrypt, compress and repair, plus OCR in English and Hindi',
      'No upload, no account, no watermarks',
    ],
    faq: [
      { q: 'What is PDF Workshop?', a: 'PDF Workshop is a free web app with close to 100 tools for working with PDFs. You can merge, split, edit, sign, convert, compress and encrypt files, and make scans searchable with OCR.' },
      { q: 'Is PDF Workshop free?', a: 'Yes. It is free to use, with no account to create and no watermarks added to your files.' },
      { q: 'Are my PDF files uploaded anywhere?', a: 'No. PDF Workshop runs in your browser, so your files stay on your device and there is no upload step.' },
      { q: 'Which languages does OCR support?', a: 'OCR, which makes scanned pages searchable, works in English and Hindi.' },
      { q: 'Do I need to install anything?', a: 'No. Open it in your web browser and start working.' },
    ],
    glow: '59 130 246',
    story: [
      { file: 'pdf-1', title: 'Open a PDF, or find a tool', text: 'Drop a PDF anywhere on the page, or search for the tool you need. Everything runs in your browser.', alt: 'PDF Workshop home screen on a laptop: "Every PDF job, done on your own machine", with Open a PDF and tool search' },
      { file: 'pdf-2', title: 'Preview first, then choose', text: 'See the file first, then decide what to do with it. It stays on your device and nothing is uploaded.', alt: 'PDF Workshop Open a PDF screen with a drag-and-drop area, stating that the file stays on your device' },
      { file: 'pdf-3', title: 'Sign and fill forms', text: 'Draw, type or upload a signature, fill in forms directly in the browser (including XFA forms), or build a fillable form.', alt: 'PDF Workshop Sign and forms category showing Sign PDF, PDF Form Filler and Create PDF Form tools' },
      { file: 'pdf-4', title: 'Convert images to PDF', text: 'Bring images into a PDF from many formats, including JPG, PNG, WebP, HEIC and TIFF.', alt: 'PDF Workshop Convert to PDF category listing image formats such as JPG, PNG, WebP, HEIC, TIFF and BMP' },
    ],
    links: [{ kind: 'web', label: 'Open web app', url: 'https://pdf-workshop.noble-wave.com/' }],
    screenshots: [
      { file: 'pdf-1', alt: 'PDF Workshop home screen on a laptop' },
      { file: 'pdf-2', alt: 'PDF Workshop Open a PDF screen with a drag-and-drop area' },
      { file: 'pdf-3', alt: 'PDF Workshop Sign and forms tools' },
      { file: 'pdf-4', alt: 'PDF Workshop Convert to PDF tools for image formats' },
    ],
  },
  {
    id: 'noble-salah',
    name: 'Noble Salah Guide',
    device: 'phone',
    category: 'LifestyleApplication',
    free: true,
    tagline: 'Prayer times, Qibla and daily Islamic tools in one app',
    description:
      'Noble Salah Guide is a free app that helps you keep up with your daily prayers. See accurate prayer times and a countdown to the next prayer, then use the built-in tools for Qibla, the Quran, hadith, the Islamic calendar and more.',
    platforms: ['Web', 'Android'],
    features: [
      'Accurate prayer times with a next-prayer countdown',
      'Qibla compass and a monthly prayer calendar',
      'Quran and hadith in the app',
      'Qada prayer counter and prayer tracking',
      'Wudu and salah guides, morning and evening adhkar',
    ],
    faq: [
      { q: 'What is Noble Salah Guide?', a: 'Noble Salah Guide is a free app that helps you keep up with your daily prayers. It shows prayer times with a countdown to the next prayer, plus tools for Qibla, the Quran, hadith, the Islamic calendar and more.' },
      { q: 'Is Noble Salah Guide free?', a: 'Yes. It is free to use on the web and on Android.' },
      { q: 'Where can I use Noble Salah Guide?', a: 'You can use it in your web browser or install it on Android from Google Play.' },
      { q: 'What else does it include besides prayer times?', a: 'A Qibla compass, a monthly prayer calendar, the Quran and hadith, a Qada prayer counter, wudu and salah guides, and morning and evening adhkar.' },
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
    device: 'phone',
    category: 'BusinessApplication',
    free: true,
    tagline: 'Manage your rentals, hassle free',
    description:
      'Rent Manager is a free web app that keeps landlords organised. Track properties, units and tenants, record rent and utility bills, see who has paid and who still owes, and get reminders before payments are due.',
    platforms: ['Web'],
    features: [
      'Houses, apartments, shops and PG properties',
      'Units and tenants with payment status',
      'Rent and utility bills in one place',
      'Payments by UPI, cash or bank, with monthly summaries',
      'Reminders so you never miss a due date',
    ],
    faq: [
      { q: 'What is Rent Manager?', a: 'Rent Manager is a free web app that keeps landlords organised. You can track properties, units and tenants, record rent and utility bills, and see who has paid and who still owes.' },
      { q: 'Is Rent Manager free?', a: 'Yes. It is free to use in your web browser.' },
      { q: 'What kinds of property can I manage?', a: 'Houses, apartments, shops and PG properties, each with its own units and tenants.' },
      { q: 'How do I record payments?', a: 'Record payments by UPI, cash or bank, and see monthly summaries of what has been collected and what is still owed.' },
      { q: 'Does Rent Manager send reminders?', a: 'Yes. It reminds you before payments are due so you do not miss a due date.' },
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
