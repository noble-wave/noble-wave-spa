import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../core/contact.service';
import { SERVICES } from '../../core/content.config';
import { SeoService } from '../../core/seo.service';
import { SITE, WHATSAPP_URL } from '../../core/site.config';
import { Faq } from '../../shared/ui/faq';
import { Icon } from '../../shared/ui/icon';

type Status = 'idle' | 'sending' | 'sent' | 'mailto' | 'error';

@Component({
  selector: 'nw-contact',
  imports: [ReactiveFormsModule, Icon, Faq],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="page-glow">
      <div class="container-page py-10 sm:py-14 lg:py-16">
        <p class="eyebrow">Contact</p>
        <h1 class="h-display mt-4 max-w-4xl">Questions, feedback or <span class="gradient-text">a project idea?</span></h1>
        <p class="lead mt-4">Ask about our apps, report a problem or talk to us about working together. We reply within one business day.</p>
      </div>
    </section>

    <section class="section !pt-2 !pb-12 sm:!pb-16">
      <div class="container-page grid items-start gap-8 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)] lg:gap-12">
        <aside aria-label="Contact details">
          <h2 class="text-base font-bold">Get in touch</h2>
          <ul class="contact-list mt-4">
            <li>
              <span class="contact-icon"><nw-icon name="mail" [size]="18" /></span>
              <span><span class="contact-label">Email</span><a class="contact-value" [href]="'mailto:' + site.email">{{ site.email }}</a></span>
            </li>
            <li>
              <span class="contact-icon"><nw-icon name="phone" [size]="18" /></span>
              <span><span class="contact-label">Phone</span><a class="contact-value" [href]="'tel:' + site.phone">{{ site.phoneDisplay }}</a></span>
            </li>
            <li>
              <span class="contact-icon contact-icon-wa"><nw-icon name="whatsapp" [size]="18" /></span>
              <span><span class="contact-label">WhatsApp</span><a class="contact-value" [href]="whatsappUrl" target="_blank" rel="noopener" aria-label="Message us on WhatsApp (opens in a new tab)">Message us on WhatsApp</a></span>
            </li>
            <li>
              <span class="contact-icon"><nw-icon name="map-pin" [size]="18" /></span>
              <span><span class="contact-label">Location</span><span class="contact-value">{{ site.location }}</span></span>
            </li>
            <li>
              <span class="contact-icon"><nw-icon name="clock" [size]="18" /></span>
              <span><span class="contact-label">Response time</span><span class="contact-value">Within one business day</span></span>
            </li>
          </ul>
        </aside>

        <div class="contact-card">
          @if (status() === 'sent' || status() === 'mailto') {
            <div role="status" class="py-8 text-center">
              <span class="icon-tile !h-12 !w-12"><nw-icon name="check" [size]="24" /></span>
              <h2 class="mt-5 text-xl">
                {{ status() === 'sent' ? 'Message sent' : 'Your email app should open' }}
              </h2>
              <p class="mx-auto mt-3 max-w-md text-muted">
                @if (status() === 'sent') {
                  Thank you. We will reply to {{ form.controls.email.value }} within one business day.
                } @else {
                  We opened a pre-filled email to {{ site.email }}. Press send there to finish. If nothing opened,
                  write to us directly at the address above.
                }
              </p>
              <button type="button" class="btn btn-secondary mt-8" (click)="reset()">Send another message</button>
            </div>
          } @else {
            <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
              <h2 class="text-xl">Send us a message</h2>
              <p class="mt-1 text-sm text-muted">Fields marked * are required.</p>
              <div class="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label for="c-name" class="field-label">Name <span aria-hidden="true">*</span></label>
                  <input id="c-name" class="field" formControlName="name" autocomplete="name" required [attr.aria-invalid]="invalid('name')" aria-describedby="c-name-err" />
                  @if (invalid('name')) { <p id="c-name-err" class="field-error">Please tell us your name.</p> }
                </div>
                <div>
                  <label for="c-email" class="field-label">Email <span aria-hidden="true">*</span></label>
                  <input id="c-email" type="email" class="field" formControlName="email" autocomplete="email" required [attr.aria-invalid]="invalid('email')" aria-describedby="c-email-err" />
                  @if (invalid('email')) { <p id="c-email-err" class="field-error">Please enter a valid email address.</p> }
                </div>
                <div>
                  <label for="c-phone" class="field-label">Phone <span class="font-normal text-muted">(optional)</span></label>
                  <input id="c-phone" type="tel" class="field" formControlName="phone" autocomplete="tel" />
                </div>
                <div>
                  <label for="c-service" class="field-label">I am interested in</label>
                  <select id="c-service" class="field" formControlName="service">
                    <option value="">Choose a topic</option>
                    <option value="A question about one of our products">A question about one of our products</option>
                    @for (s of services; track s.id) {
                      <option [value]="s.title">{{ s.title }}</option>
                    }
                    <option value="Something else">Something else</option>
                  </select>
                </div>
              </div>
              <div class="mt-4">
                <label for="c-message" class="field-label">Your message <span aria-hidden="true">*</span></label>
                <textarea id="c-message" rows="5" class="field" formControlName="message" required [attr.aria-invalid]="invalid('message')" aria-describedby="c-message-err"></textarea>
                @if (invalid('message')) { <p id="c-message-err" class="field-error">Please add a few details (at least 10 characters).</p> }
              </div>

              <!-- Honeypot: hidden from people, tempting to bots. -->
              <div class="absolute -left-[9999px]" aria-hidden="true">
                <label for="c-company">Company</label>
                <input id="c-company" tabindex="-1" autocomplete="off" formControlName="company" />
              </div>

              @if (status() === 'error') {
                <p role="alert" class="mt-5 rounded-xl border border-red-300 bg-red-50 p-4 text-sm text-red-800">
                  Sorry, we could not send your message. Your details are still here. Please try again, or email us at
                  <a class="underline" [href]="'mailto:' + site.email">{{ site.email }}</a>.
                </p>
              }

              <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                <button type="submit" class="btn btn-primary !min-h-11 !px-6" [disabled]="status() === 'sending'">
                  {{ status() === 'sending' ? 'Sending…' : 'Send message' }}
                  <nw-icon name="arrow-right" />
                </button>
                <p class="text-sm text-muted">We only use your details to reply to this enquiry.</p>
              </div>
            </form>
          }
        </div>
      </div>
    </section>

    <div class="section-alt"><nw-faq /></div>
  `,
})
export class Contact {
  protected readonly site = SITE;
  protected readonly whatsappUrl = WHATSAPP_URL;
  protected readonly services = SERVICES;
  protected readonly status = signal<Status>('idle');

  private readonly fb = inject(FormBuilder).nonNullable;
  private readonly contact = inject(ContactService);

  protected readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
    phone: ['', Validators.maxLength(40)],
    service: [''],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(4000)]],
    company: [''],
  });

  constructor() {
    inject(SeoService).set({
      title: 'Contact',
      description: `Contact ${SITE.name}: ask about PDF Workshop, Noble Salah Guide or Rent Manager, or talk to us about a project. Email, phone or the form; we reply within one business day.`,
      path: '/contact',
    });
  }

  protected invalid(control: 'name' | 'email' | 'message'): boolean {
    const c = this.form.controls[control];
    return c.invalid && (c.touched || c.dirty);
  }

  protected async submit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    if (v.company) {
      // A bot filled the hidden field: pretend success and discard.
      this.status.set('sent');
      return;
    }
    this.status.set('sending');
    try {
      this.status.set(
        await this.contact.submit({ name: v.name, email: v.email, phone: v.phone, service: v.service, message: v.message }),
      );
    } catch {
      this.status.set('error');
    }
  }

  protected reset(): void {
    this.form.reset();
    this.status.set('idle');
  }
}
