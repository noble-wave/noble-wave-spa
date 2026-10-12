import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/common';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SITE } from './site.config';

/** Where messages are POSTed. Defaults to SITE.formEndpoint; empty means "use the mailto fallback". */
export const CONTACT_ENDPOINT = new InjectionToken<string>('CONTACT_ENDPOINT', {
  providedIn: 'root',
  factory: () => SITE.formEndpoint,
});

export interface ContactMessage {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly service: string;
  readonly message: string;
}

/**
 * - 'sent': delivered to the configured form endpoint.
 * - 'mailto': no endpoint is configured, so the visitor's email app was opened, pre-filled.
 */
export type ContactResult = 'sent' | 'mailto';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly doc = inject(DOCUMENT);
  private readonly endpoint = inject(CONTACT_ENDPOINT);

  /** Rejects when the endpoint request fails, so the page can show an error and keep the input. */
  async submit(msg: ContactMessage): Promise<ContactResult> {
    if (this.endpoint) {
      await firstValueFrom(this.http.post(this.endpoint, msg, { headers: { Accept: 'application/json' } }));
      return 'sent';
    }
    this.doc.defaultView?.open(this.mailto(msg), '_self');
    return 'mailto';
  }

  mailto(msg: ContactMessage): string {
    const subject = `Project enquiry from ${msg.name}`;
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
