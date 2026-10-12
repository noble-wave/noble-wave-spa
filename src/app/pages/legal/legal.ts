import { ChangeDetectionStrategy, Component, computed, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo.service';
import { SITE } from '../../core/site.config';

interface Section {
  readonly heading: string;
  readonly paragraphs: readonly string[];
  readonly list?: readonly string[];
}

interface LegalDoc {
  readonly title: string;
  readonly intro: string;
  readonly path: string;
  readonly sections: readonly Section[];
}

const UPDATED = 'October 2026';

const PRIVACY: LegalDoc = {
  title: 'Privacy Policy',
  path: '/privacy',
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
        'Contact details and project information you enter in the contact form (name, email address, optional phone number, topic of interest and your message).',
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
      paragraphs: ['We share information only with service providers who help us run the website and handle email, and only as needed for that purpose, or when the law requires it.'],
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
    },
    {
      heading: 'Changes to this policy',
      paragraphs: ['We may update this policy from time to time. The date at the top shows when it last changed.'],
    },
  ],
};

const TERMS: LegalDoc = {
  title: 'Terms of Service',
  path: '/terms',
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
      paragraphs: ['Our apps, including PDF Workshop, Noble Salah Guide and Rent Manager, may be subject to separate terms and the policies of the stores or platforms that distribute them.'],
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
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (page(); as d) {
      <section class="page-glow">
        <div class="container-page py-16 sm:py-20">
          <p class="eyebrow">Legal</p>
          <h1 class="h-display mt-5 !text-[clamp(2.25rem,5vw,3.5rem)]">{{ d.title }}</h1>
          <p class="mt-4 text-muted">Last updated {{ updated }}</p>
        </div>
      </section>
      <div class="container-page pb-24">
        <div class="prose-page max-w-3xl">
          <p class="rounded-xl border border-border bg-surface p-4 !text-sm">
            Draft for review. This text was prepared as a starting point and is not legal advice; please have it
            checked before launch.
          </p>
          <p>{{ d.intro }}</p>
          @for (s of d.sections; track s.heading) {
            <h2>{{ s.heading }}</h2>
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
          }
          <p class="mt-10"><a routerLink="/contact">Questions? Contact us.</a></p>
        </div>
      </div>
    }
  `,
})
export class Legal {
  /** Bound from the route's `data: { doc }`. */
  readonly doc = input.required<string>();

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
