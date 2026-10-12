import { IconName } from '../shared/ui/icon';

/** Editorial content shared by several pages. Edit copy here, not in templates. */

export interface Service {
  readonly id: string;
  readonly icon: IconName;
  readonly title: string;
  readonly summary: string;
  readonly description: string;
  readonly benefits: readonly string[];
  readonly tech: readonly string[];
}

export const SERVICES: readonly Service[] = [
  {
    id: 'it-consulting',
    icon: 'compass',
    title: 'IT Consulting',
    summary: 'Strategic guidance that lines technology up with your business goals.',
    description:
      'We review your systems, find where technology is holding the business back, and turn that into an actionable roadmap. From digital transformation plans to stack optimisation, the aim is investment that shows measurable results.',
    benefits: ['Strategic technology roadmaps', 'Cost optimisation and efficiency', 'Risk assessment and mitigation'],
    tech: ['Architecture review', 'Technology roadmaps', 'Cost and risk analysis'],
  },
  {
    id: 'web-development',
    icon: 'code',
    title: 'Web Application Development',
    summary: 'Fast, accessible web applications built to scale.',
    description:
      'From single-page apps to enterprise platforms, we build responsive, high-performance web applications with modern frameworks and clean, maintainable code, so they stay easy to change as your business grows.',
    benefits: ['Modern frameworks (Angular, Node.js)', 'Responsive, mobile-first design', 'High performance and scalability'],
    tech: ['Angular', 'React', 'TypeScript', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 'mobile-development',
    icon: 'smartphone',
    title: 'Mobile App Development',
    summary: 'Cross-platform apps for iOS and Android from one codebase.',
    description:
      'We build apps that feel native on iOS and Android while sharing most of their code, which shortens delivery and lowers cost. They connect to your existing systems and deliver what your users expect.',
    benefits: ['Cross-platform (iOS and Android)', 'Native-like performance with Ionic', 'Faster time to market'],
    tech: ['Ionic', 'Angular', 'Capacitor', 'REST APIs'],
  },
  {
    id: 'product-engineering',
    icon: 'layers',
    title: 'Software Product Engineering',
    summary: 'From first idea to a deployed, maintainable product.',
    description:
      'We handle the whole path: concept, architecture, development, testing and deployment. Agile delivery and good engineering practice give you a secure product that keeps evolving with your business.',
    benefits: ['Full product lifecycle', 'Agile delivery with regular demos', 'Continuous integration and delivery'],
    tech: ['Agile and Scrum', 'CI/CD', 'Automated testing', 'Microservices'],
  },
  {
    id: 'ui-ux-design',
    icon: 'layout',
    title: 'UI/UX Design',
    summary: 'Interfaces that make sense before they are built.',
    description:
      'Our design process is user-centred: research, wireframes, interactive prototypes and usability testing. Every interaction should be meaningful and every element should earn its place.',
    benefits: ['User research and personas', 'Interactive prototypes and wireframes', 'Usability testing and iteration'],
    tech: ['Figma', 'Design systems', 'Prototyping', 'Usability testing'],
  },
  {
    id: 'cloud-devops',
    icon: 'cloud',
    title: 'Cloud Integration & Deployment',
    summary: 'Secure, scalable cloud infrastructure with automated delivery.',
    description:
      'We help you move to the cloud, tidy up your infrastructure and put DevOps practice in place, so releases are routine. Applications stay secure, scalable and available with minimal downtime.',
    benefits: ['Multi-cloud expertise', 'Automated CI/CD pipelines', 'Infrastructure as code'],
    tech: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes'],
  },
];

export interface Step {
  readonly title: string;
  readonly text: string;
}

export const PROCESS: readonly Step[] = [
  { title: 'Start with a real problem', text: 'Every app begins with something people do every day and find harder than it should be.' },
  { title: 'Design it simply', text: 'We keep screens clear and tools easy to find, so a new user can get going without a manual.' },
  { title: 'Build and release', text: 'We build in small steps, test as we go and release on the web and, where it fits, on Android.' },
  { title: 'Keep improving', text: 'We run the apps ourselves, listen to feedback and keep fixing and adding things after launch.' },
];

export interface Principle {
  readonly icon: IconName;
  readonly title: string;
  readonly text: string;
}

export const PRINCIPLES: readonly Principle[] = [
  { icon: 'users', title: 'Built by a small team', text: 'The people who build each app also support it, so feedback goes straight to them.' },
  { icon: 'layout', title: 'Simple to use', text: 'Clear screens and the tools you need up front, designed around everyday tasks.' },
  { icon: 'shield-check', title: 'Privacy respected', text: 'PDF Workshop processes your files in your browser, so they never leave your device.' },
  { icon: 'check', title: 'Free to use', text: 'PDF Workshop, Noble Salah Guide and Rent Manager are all free.' },
];

export const VALUES: readonly Principle[] = [
  { icon: 'layout', title: 'Simple first', text: 'If a new user needs a manual, we have more design work to do.' },
  { icon: 'shield-check', title: 'Respect for privacy', text: 'We collect as little as we can and keep your files on your own device where possible.' },
  { icon: 'check', title: 'Free to use', text: 'Our current apps are free, with no paywalled basics.' },
  { icon: 'code', title: 'Clean, tested code', text: 'Readable code and regular releases keep the apps fast and dependable.' },
  { icon: 'headphones', title: 'We answer', text: 'Tell us what is broken or missing. A real person replies within one business day.' },
  { icon: 'compass', title: 'Always improving', text: 'We keep updating the apps and our tools so nothing gets left behind.' },
];

export interface TechGroup {
  readonly label: string;
  readonly items: readonly string[];
}

export const TECH_GROUPS: readonly TechGroup[] = [
  { label: 'Frontend', items: ['Angular', 'React', 'Vue.js', 'TypeScript', 'Tailwind CSS'] },
  { label: 'Backend', items: ['Node.js', 'NestJS', 'Express', 'Python'] },
  { label: 'Data', items: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis'] },
  { label: 'Cloud and DevOps', items: ['AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD'] },
  { label: 'Mobile and design', items: ['Ionic', 'Capacitor', 'Figma'] },
];

export const MISSION =
  'To build simple, dependable apps that make everyday tasks easier, and to treat the people who use them with respect.';

export const VISION =
  'To be known for a small family of well-made, useful apps that people open every day and recommend to others.';

export interface FaqItem {
  readonly q: string;
  readonly a: string;
}

export const FAQ: readonly FaqItem[] = [
  {
    q: 'Are your apps free?',
    a: 'Yes. PDF Workshop, Noble Salah Guide and Rent Manager are all free to use.',
  },
  {
    q: 'Where can I use them?',
    a: 'All three run in your web browser, so there is nothing to install. Noble Salah Guide is also available on Google Play for Android.',
  },
  {
    q: 'Are my PDF files uploaded anywhere?',
    a: 'No. PDF Workshop does its work in your browser, so your files stay on your device. There is no upload step.',
  },
  {
    q: 'How do I report a problem or suggest a feature?',
    a: 'Send us a message through the contact form or email us. We read everything and reply within one business day.',
  },
  {
    q: 'Can you build something for my business?',
    a: 'This site is about our own apps. If you have a project in mind, send us a message and we will tell you whether and how we can help.',
  },
];
