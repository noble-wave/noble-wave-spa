import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EMAILJS, SITE } from './site.config';

export interface EmailJsConfig {
  readonly serviceId: string;
  readonly templateId: string;
  readonly publicKey: string;
}

/** EmailJS settings. Any empty value means "use the mailto fallback". */
export const CONTACT_EMAILJS = new InjectionToken<EmailJsConfig>('CONTACT_EMAILJS', {
  providedIn: 'root',
  factory: () => EMAILJS,
});

export const EMAILJS_SEND_URL = 'https://api.emailjs.com/api/v1.0/email/send';

export interface ContactMessage {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly service: string;
  readonly message: string;
}

/**
 * - 'sent': delivered through EmailJS.
 * - 'mailto': EmailJS is not configured, so the visitor's email app was opened, pre-filled.
 */
export type ContactResult = 'sent' | 'mailto';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly doc = inject(DOCUMENT);
  private readonly emailjs = inject(CONTACT_EMAILJS);

  /** Rejects when the EmailJS request fails, so the page can show an error and keep the input. */
  async submit(msg: ContactMessage): Promise<ContactResult> {
    const { serviceId, templateId, publicKey } = this.emailjs;
    if (serviceId && templateId && publicKey) {
      await firstValueFrom(
        this.http.post(EMAILJS_SEND_URL, {
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: msg.name,
            from_email: msg.email,
            reply_to: msg.email,
            phone: msg.phone || 'Not given',
            service: msg.service || 'Not given',
            message: msg.message,
            subject: `Message from ${msg.name} via noble-wave.com`,
          },
        }, { responseType: 'text' }),
      );
      return 'sent';
    }
    this.doc.defaultView?.open(this.mailto(msg), '_self');
    return 'mailto';
  }

  mailto(msg: ContactMessage): string {
    const subject = `Message from ${msg.name} via noble-wave.com`;
    const lines = [`Name: ${msg.name}`, `Email: ${msg.email}`];
    if (msg.phone) {
      lines.push(`Phone: ${msg.phone}`);
    }
    if (msg.service) {
      lines.push(`Interested in: ${msg.service}`);
    }
    lines.push('', msg.message);
    const body = lines.join('\n');
    return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
