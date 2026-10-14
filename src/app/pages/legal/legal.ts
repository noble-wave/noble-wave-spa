import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Icon } from '../../shared/ui/icon';
import { SeoService } from '../../core/seo.service';
import { SITE, WHATSAPP_URL } from '../../core/site.config';

interface Section {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly list?: readonly string[];
  /** Optional button shown under the text (for example, emailing a privacy request). */
  readonly action?: { readonly label: string; readonly href: string };
}

interface LegalDoc {
  readonly title: string;
  /** Page headline as [plain part, highlighted part]. */
  readonly headline: readonly [string, string];
  readonly intro: string;
  /** Three short points shown in the "at a glance" box. */
  readonly highlights: readonly string[];
  /** The other legal document, linked at the bottom of the page. */
  readonly other: { readonly label: string; readonly path: string };
  readonly path: string;
  readonly sections: readonly Section[];
}

const UPDATED = 'October 2026';

const PRIVACY: LegalDoc = {
  title: 'Privacy Policy',
  headline: ['Privacy', 'Policy'],
  path: '/privacy',
  other: { label: 'Terms of Service', path: '/terms' },
  highlights: [
    'We only collect what you choose to send us.',
    'No advertising or tracking cookies.',
    'We never sell your information.',
  ],
  intro: `This policy explains what personal information ${SITE.name} collects through this website, why, and the choices you have.`,
  sections: [
    {
      heading: 'Who we are',
      paragraphs: [`${SITE.name} is a software company based in ${SITE.location}. You can reach us at ${SITE.email}.`],
    },
    {
      heading: 'What we collect',
      paragraphs: ['We collect only what you choose to send us and the minimum technical data needed to run the site.'],
      list: [
        'Details you enter in the contact form: name, email address, optional phone number, topic of interest and your message.',
        'Messages you send us by email or WhatsApp, including your number or address and anything you write.',
        'Standard technical logs created by our hosting provider, such as IP address, browser type and pages requested.',
      ],
    },
    {
      heading: 'How we use it',
      paragraphs: ['We use contact form details to reply to your message and, if you ask, to discuss a possible project. We do not sell your information and we do not use it for advertising.'],
    },
    {
      heading: 'Cookies and tracking',
      paragraphs: ['This website does not set advertising or tracking cookies. If we add analytics in future, we will update this policy and ask for consent where required.'],
    },
    {
      heading: 'Sharing',
      paragraphs: ['We share information only with service providers who help us run the website and handle messages, such as our hosting provider and the email delivery service that passes contact form messages to us. We share only what is needed for that purpose, or what the law requires. WhatsApp messages are handled by WhatsApp under its own privacy policy.'],
    },
    {
      heading: 'Third-party links and apps',
      paragraphs: ['This site links to our apps and to services such as Google Play. Those services and apps have their own privacy policies.'],
    },
    {
      heading: 'How long we keep it',
      paragraphs: ['We keep enquiry emails for as long as needed to respond and to keep a record of the conversation, then delete them when they are no longer needed.'],
    },
    {
      heading: 'Your choices',
      paragraphs: [`You can ask us to access, correct or delete the personal information we hold about you by emailing ${SITE.email}.`],
      action: { label: 'Email a privacy request', href: `mailto:${SITE.email}?subject=${encodeURIComponent('Privacy request')}` },
    },
    {
      heading: 'Changes to this policy',
      paragraphs: ['We may update this policy from time to time. The date at the top shows when it last changed.'],
    },
  ],
};

const TERMS: LegalDoc = {
  title: 'Terms of Service',
  headline: ['Terms of', 'Service'],
  path: '/terms',
  other: { label: 'Privacy Policy', path: '/privacy' },
  highlights: [
    'Please use the site for lawful purposes only.',
    'Our apps may have their own terms.',
    'Site content belongs to Noble Wave.',
  ],
  intro: `These terms apply to your use of the ${SITE.name} website. By using the site you agree to them.`,
  sections: [
    {
      heading: 'Use of this website',
      paragraphs: ['You may use this website for lawful purposes only. Please do not attempt to disrupt it, probe it for vulnerabilities, or use it to send spam or harmful content.'],
    },
    {
      heading: 'Our content',
      paragraphs: [`The text, design, logos and images on this site belong to ${SITE.name} or its licensors. You may not copy or reuse them without our written permission.`],
    },
    {
      heading: 'Products and third-party services',
      paragraphs: ['Our apps, including PDF Workshop, Noble Salah Guide, Rent Manager and Noble Qaida, may be subject to separate terms and the policies of the stores or platforms that distribute them.'],
    },
    {
      heading: 'Information on this site',
      paragraphs: ['We work to keep the information accurate and up to date, but we provide it as is, without warranties. Descriptions of services are not a binding offer; any project is governed by a written agreement between us and you.'],
    },
    {
      heading: 'Limitation of liability',
      paragraphs: ['To the extent permitted by law, we are not liable for any loss arising from your use of this website or from reliance on its content.'],
    },
    {
      heading: 'Changes',
      paragraphs: ['We may update these terms from time to time. Continued use of the site after a change means you accept the updated terms.'],
    },
    {
      heading: 'Contact',
      paragraphs: [`Questions about these terms can be sent to ${SITE.email}.`],
    },
  ],
};

const DOCS: Record<string, LegalDoc> = { privacy: PRIVACY, terms: TERMS };

/** Privacy policy and terms, chosen by the route's `doc` data value. */
@Component({
  selector: 'nw-legal',
  imports: [RouterLink, Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (page(); as d) {
      <section class="page-glow">
        <div class="container-page py-12 sm:py-16 lg:py-20">
          <p class="eyebrow">Legal</p>
          <h1 class="h-display mt-5 max-w-3xl">{{ d.headline[0] }} <span class="gradient-text">{{ d.headline[1] }}</span></h1>
          <p class="lead mt-6">{{ d.intro }}</p>
          <div class="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <span class="flex items-center gap-2"><nw-icon name="clock" [size]="16" /> Last updated {{ updated }}</span>
          </div>
        </div>
      </section>

      <section class="container-page" aria-label="The short version">
        <p class="legal-kicker">The short version</p>
        <ol class="legal-points">
          @for (h of d.highlights; track h; let i = $index) {
            <li>
              <span class="legal-point-num">0{{ i + 1 }}</span>
              <span class="legal-point-text">{{ h }}</span>
            </li>
          }
        </ol>
      </section>

      <div class="container-page pb-6 pt-14 sm:pt-20">
        @for (s of d.sections; track s.heading; let i = $index) {
          <article class="legal-row">
            <header class="legal-row-head">
              <span class="legal-index">{{ i < 9 ? '0' : '' }}{{ i + 1 }}</span>
              <h2>{{ s.heading }}</h2>
            </header>
            <div class="legal-row-body">
              @for (para of s.paragraphs; track para) {
                <p>{{ para }}</p>
              }
              @if (s.list) {
                <ul>
                  @for (item of s.list; track item) {
                    <li>{{ item }}</li>
                  }
                </ul>
              }
              @if (s.action; as a) {
                <a class="btn btn-secondary mt-6 !min-h-10 !px-5" [href]="a.href">{{ a.label }} <nw-icon name="arrow-right" [size]="18" /></a>
              }
            </div>
          </article>
        }
      </div>

      <section class="container-page pb-20 pt-10 sm:pb-24" aria-labelledby="legal-contact">
        <div
          class="relative overflow-hidden rounded-[2rem] px-6 py-10 text-on-brand sm:px-12 sm:py-12"
          style="background: radial-gradient(70% 120% at 100% 0%, color-mix(in srgb, var(--accent) 45%, transparent), transparent 65%), linear-gradient(135deg, var(--brand-strong), var(--brand))"
        >
          <h2 id="legal-contact" class="h-section max-w-xl">Questions about your data?</h2>
          <p class="mt-3 max-w-lg opacity-90">Ask us directly. A real person replies within one business day.</p>
          <div class="mt-7 flex flex-wrap items-center gap-3">
            <a class="btn bg-bg text-text hover:opacity-90" [href]="'mailto:' + site.email"><nw-icon name="mail" [size]="18" /> {{ site.email }}</a>
            <a class="btn border-white/40 text-on-brand hover:bg-white/10" [href]="whatsappUrl" target="_blank" rel="noopener"><nw-icon name="whatsapp" [size]="18" /> WhatsApp</a>
          </div>
          <p class="mt-8 text-sm opacity-85">
            Also read our <a class="font-semibold underline underline-offset-4" [routerLink]="d.other.path">{{ d.other.label }}</a>.
          </p>
        </div>
      </section>
    }
  `,
})
export class Legal {
  /** Bound from the route's `data: { doc }`. */
  readonly doc = input.required<string>();

  protected readonly site = SITE;
  protected readonly whatsappUrl = WHATSAPP_URL;
  protected readonly updated = UPDATED;
  protected readonly page = computed(() => DOCS[this.doc()]);

  private readonly seo = inject(SeoService);

  constructor() {
    effect(() => {
      const d = this.page();
      if (d) {
        this.seo.set({ title: d.title, description: d.intro, path: d.path });
      }
    });
  }
}
