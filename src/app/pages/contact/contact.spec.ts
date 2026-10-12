import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ContactResult, ContactService } from '../../core/contact.service';
import { Contact } from './contact';

function render(result: ContactResult | Error = 'mailto') {
  const submit = vi.fn(() => (result instanceof Error ? Promise.reject(result) : Promise.resolve(result)));
  TestBed.configureTestingModule({
    imports: [Contact],
    providers: [provideHttpClient(), provideHttpClientTesting(), { provide: ContactService, useValue: { submit } }],
  });
  const fixture = TestBed.createComponent(Contact);
  fixture.detectChanges();
  return { fixture, el: fixture.nativeElement as HTMLElement, submit };
}

function fill(el: HTMLElement, sel: string, value: string) {
  const input = el.querySelector<HTMLInputElement | HTMLTextAreaElement>(sel)!;
  input.value = value;
  input.dispatchEvent(new Event('input'));
}

async function send(fixture: ReturnType<typeof render>['fixture']) {
  (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button[type=submit]')!.click();
  await fixture.whenStable();
  fixture.detectChanges();
}

describe('Contact page', () => {
  it('shows an error for each required field when submitted empty', async () => {
    const { fixture, el, submit } = render();
    await send(fixture);

    expect(el.querySelectorAll('.field-error').length).toBe(3);
    expect(el.querySelector('#c-name')!.getAttribute('aria-invalid')).toBe('true');
    expect(submit).not.toHaveBeenCalled();
  });

  it('rejects an invalid email and a too-short message', async () => {
    const { fixture, el, submit } = render();
    fill(el, '#c-name', 'Asha');
    fill(el, '#c-email', 'nope');
    fill(el, '#c-message', 'hi');
    await send(fixture);

    const texts = [...el.querySelectorAll('.field-error')].map((e) => e.textContent);
    expect(texts.some((t) => t?.includes('valid email'))).toBe(true);
    expect(texts.some((t) => t?.includes('10 characters'))).toBe(true);
    expect(submit).not.toHaveBeenCalled();
  });

  it('submits a valid enquiry without the honeypot field and confirms it', async () => {
    const { fixture, el, submit } = render('mailto');
    fill(el, '#c-name', 'Asha Rao');
    fill(el, '#c-email', 'asha@example.com');
    fill(el, '#c-message', 'We would like a quote for a mobile app.');
    await send(fixture);

    expect(submit).toHaveBeenCalledWith({
      name: 'Asha Rao',
      email: 'asha@example.com',
      phone: '',
      service: '',
      message: 'We would like a quote for a mobile app.',
    });
    expect(el.querySelector('[role=status]')?.textContent).toContain('email app');
  });

  it('keeps the form and shows an alert when sending fails', async () => {
    const { fixture, el } = render(new Error('network'));
    fill(el, '#c-name', 'Asha Rao');
    fill(el, '#c-email', 'asha@example.com');
    fill(el, '#c-message', 'We would like a quote for a mobile app.');
    await send(fixture);

    expect(el.querySelector('[role=alert]')?.textContent).toContain('could not send');
    expect((el.querySelector('#c-name') as HTMLInputElement).value).toBe('Asha Rao');
  });

  it('silently drops submissions that fill the hidden honeypot field', async () => {
    const { fixture, el, submit } = render();
    fill(el, '#c-name', 'Bot');
    fill(el, '#c-email', 'bot@example.com');
    fill(el, '#c-message', 'Cheap offers just for you');
    fill(el, '#c-company', 'Spam Inc');
    await send(fixture);

    expect(submit).not.toHaveBeenCalled();
  });
});
