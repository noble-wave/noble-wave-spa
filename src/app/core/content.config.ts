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
  { title: 'Discover', text: 'We learn your goals, users and constraints before proposing anything.' },
  { title: 'Design', text: 'Clickable prototypes, so you see the product before we build it.' },
  { title: 'Build', text: 'Short iterations with a working demo at the end of each one.' },
  { title: 'Launch and support', text: 'Deployment, monitoring and continued improvements once you are live.' },
];

export interface Principle {
  readonly icon: IconName;
  readonly title: string;
  readonly text: string;
}

export const PRINCIPLES: readonly Principle[] = [
  { icon: 'users', title: 'A hands-on team', text: 'You talk to the people building your product, not an account manager.' },
  { icon: 'layout', title: 'User-centred design', text: 'We design around how people actually work, so the product gets used.' },
  { icon: 'shield-check', title: 'Secure and scalable', text: 'Sound architecture and secure defaults that grow with your business.' },
  { icon: 'headphones', title: 'Support after launch', text: 'Maintenance, monitoring and updates once you are live.' },
];

export const VALUES: readonly Principle[] = [
  { icon: 'code', title: 'Clean code', text: 'Readable, tested code that your team can pick up and carry forward.' },
  { icon: 'users', title: 'Client-focused', text: 'Your business goals decide what we build and how we build it.' },
  { icon: 'clock', title: 'Reliable delivery', text: 'Clear milestones and regular demos keep projects on track.' },
  { icon: 'headphones', title: 'Clear communication', text: 'Plain language, honest status and no surprises.' },
  { icon: 'compass', title: 'Always learning', text: 'We keep our skills and tools current so your product does not age.' },
  { icon: 'check', title: 'Fair pricing', text: 'Transparent scope and pricing, agreed before work begins.' },
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
  'To build reliable, user-friendly web applications and digital solutions that help businesses establish their online presence and connect with their customers effectively. We focus on quality work that meets real business needs.';

export const VISION =
  'To become a trusted technology partner for businesses, helping them grow through well-crafted digital solutions. We aim to build lasting relationships based on quality work and reliable service.';

export interface FaqItem {
  readonly q: string;
  readonly a: string;
}

/** TODO(content): confirm these answers match how Noble Wave really works. */
export const FAQ: readonly FaqItem[] = [
  {
    q: 'How do we get started?',
    a: 'Send us a short description of your project through the contact form. We reply within one business day to arrange a discovery call.',
  },
  {
    q: 'Can you work with our existing codebase?',
    a: 'Yes. We can review what you have, fix and extend it, or plan a gradual modernisation.',
  },
  {
    q: 'How do you price projects?',
    a: 'After discovery we propose a fixed scope or a time-and-materials plan, whichever suits the project, and agree it before work begins.',
  },
  {
    q: 'What happens after launch?',
    a: 'We offer maintenance, monitoring and feature work, so your product keeps improving.',
  },
];
