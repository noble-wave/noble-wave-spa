export interface Screenshot {
  /** File name (without size suffix or extension) in public/images/products. */
  readonly file: string;
  readonly alt: string;
  /** A tall (1024 x 1835) phone poster. It keeps its own proportions, even next to landscape screenshots. */
  readonly poster?: boolean;
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
  /** Width over height of a desktop product's flattened screens (public/images/screens). Default 1.6. */
  readonly screenRatio?: number;
  readonly tagline: string;
  readonly description: string;
  /** schema.org applicationCategory, used in the SoftwareApplication structured data. */
  readonly category: 'BusinessApplication' | 'UtilitiesApplication' | 'LifestyleApplication' | 'EducationalApplication';
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
    id: 'rentiva',
    name: 'Rentiva',
    device: 'phone',
    category: 'BusinessApplication',
    free: true,
    tagline: 'Manage your rentals, hassle free',
    description:
      'Rentiva is a free web app that keeps landlords organised. Track properties, units and tenants, record rent and utility bills, see who has paid and who still owes, and get reminders before payments are due.',
    platforms: ['Web'],
    features: [
      'Houses, apartments, shops and PG properties',
      'Units and tenants with payment status',
      'Rent and utility bills in one place',
      'Payments by UPI, cash or bank, with monthly summaries',
      'Reminders so you never miss a due date',
    ],
    faq: [
      { q: 'What is Rentiva?', a: 'Rentiva is a free web app that keeps landlords organised. You can track properties, units and tenants, record rent and utility bills, and see who has paid and who still owes.' },
      { q: 'Is Rentiva free?', a: 'Yes. It is free to use in your web browser.' },
      { q: 'What kinds of property can I manage?', a: 'Houses, apartments, shops and PG properties, each with its own units and tenants.' },
      { q: 'How do I record payments?', a: 'Record payments by UPI, cash or bank, and see monthly summaries of what has been collected and what is still owed.' },
      { q: 'Does Rentiva send reminders?', a: 'Yes. It reminds you before payments are due so you do not miss a due date.' },
    ],
    glow: '52 211 153',
    story: [
      { file: 'rent-portfolio', title: 'Every property at a glance', text: 'Properties, tenants and vacant units, with rent collected against rent due for each property.', alt: 'Rentiva portfolio listing properties with rent collected and overdue status' },
      { file: 'rent-units', title: 'Units and tenants', text: 'See what is expected, collected and outstanding for every unit, and add tenants to the vacant ones.', alt: 'Rentiva property screen showing expected, collected and outstanding rent per unit' },
      { file: 'rent-add-property', title: 'Set up in minutes', text: 'Add a house, apartment, shop or PG, then set electricity and additional charges.', alt: 'Rentiva add property form with house, apartment, shop and PG types' },
      { file: 'rent-payments', title: 'Know who has paid', text: 'Money received this month, what is still owed, and a breakdown by UPI, cash and bank.', alt: 'Rentiva payments screen with monthly collections by UPI, cash and bank' },
    ],
    links: [{ kind: 'web', label: 'Open web app', url: 'https://rentiva.noble-wave.com/' }],
    screenshots: [
      { file: 'rentiva-1', poster: true, alt: 'Rentiva dashboard showing which tenants have paid and which are overdue' },
      { file: 'rentiva-2', poster: true, alt: 'Rentiva portfolio of properties with rent collection progress for each one' },
      { file: 'rentiva-3', poster: true, alt: 'Rentiva Bills screen with a Run bill cycle button for each property' },
      { file: 'rentiva-4', poster: true, alt: 'Rentiva bill review with itemised rent, electricity and maintenance for each tenant' },
      { file: 'rentiva-5', poster: true, alt: 'Rentiva sending each tenant their monthly bill as a PDF on WhatsApp' },
      { file: 'rentiva-6', poster: true, alt: 'Rentiva expenses screen tracking repairs and net income for each property' },
      { file: 'rentiva-7', poster: true, alt: 'Rentiva settings for light, dark and system themes, English and Hindi, and Google Drive backup' },
      { file: 'rentiva-8', poster: true, alt: 'Rentiva welcome screen for smart rent management' },
    ],
  },
  {
    id: 'noble-qaida',
    name: 'Noble Qaida',
    device: 'desktop',
    screenRatio: 1.71,
    category: 'EducationalApplication',
    free: true,
    tagline: 'Learn letters and numbers in Arabic, Urdu, Hindi and English',
    description:
      'Noble Qaida is a free web app where children learn the letters and numbers of Arabic, Urdu, Hindi and English. Tap a letter to hear it, follow a guided learning path, and let parents track progress and daily goals.',
    platforms: ['Web'],
    features: [
      'Letters and numbers in Arabic, Urdu, Hindi and English',
      'Tap any letter to hear its sound, or play them all in a row',
      'A guided learning path with a Continue button',
      'Daily goals and a streak to build a learning habit',
      'Progress and Parents sections to follow how a child is doing',
    ],
    faq: [
      { q: 'What is Noble Qaida?', a: 'Noble Qaida is a free web app where children learn the letters and numbers of Arabic, Urdu, Hindi and English, with sounds to hear and a guided learning path.' },
      { q: 'Is Noble Qaida free?', a: 'Yes. It is free to use in your web browser.' },
      { q: 'Which languages can children learn?', a: 'Arabic, Urdu, Hindi and English. You choose the language when you start.' },
      { q: 'Can parents follow progress?', a: 'Yes. The app has Progress and Parents sections, plus daily goals and a streak to keep children motivated.' },
      { q: 'Do I need to install anything?', a: 'No. Open it in your web browser and start learning.' },
    ],
    glow: '20 160 140',
    story: [
      { file: 'qaida-1', title: 'A guided learning path', text: 'Pick up where you left off with Continue, follow the path from Explore to Hear & Pick, and watch the daily goal and streak.', alt: 'Noble Qaida Learn screen on a laptop with a daily goal, a streak, a Continue button and a learning path' },
      { file: 'qaida-2', title: 'Letters you can hear', text: 'Tap a letter to hear how it sounds, or press Play all to go through them one by one. English has capital and lowercase letters, vowels and numbers.', alt: 'Noble Qaida Letters screen showing the English capital letters A to P in colourful tiles with their sounds' },
      { file: 'qaida-3', title: 'Arabic, Urdu and Hindi too', text: 'Switch the language and the reader. Urdu letters can be played in the voice of Qari Sadruddin.', alt: 'Noble Qaida Letters screen showing Urdu letters, with a language picker and a reader called Qari Sadruddin' },
    ],
    links: [{ kind: 'web', label: 'Open web app', url: 'https://qaida.noble-wave.com/learn' }],
    screenshots: [
      { file: 'qaida-1', alt: 'Noble Qaida Learn screen with a daily goal, a streak and a learning path' },
      { file: 'qaida-2', alt: 'Noble Qaida English Letters screen with colourful letter tiles' },
      { file: 'qaida-3', alt: 'Noble Qaida Urdu Letters screen with a reader picker' },
      { file: 'qaida-m-1', poster: true, alt: 'Noble Qaida Learn screen on a phone with a daily goal, a streak and a Continue button' },
      { file: 'qaida-m-2', poster: true, alt: 'Noble Qaida English Letters screen on a phone with capital letters A to P' },
      { file: 'qaida-m-3', poster: true, alt: 'Noble Qaida Hindi Letters screen on a phone showing Hindi letters' },
    ],
  },
];
