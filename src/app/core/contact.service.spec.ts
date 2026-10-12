import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { CONTACT_EMAILJS, ContactMessage, ContactService, EMAILJS_SEND_URL } from './contact.service';

const MSG: ContactMessage = {
  name: 'Asha Rao',
  email: 'asha@example.com',
  phone: '',
  service: 'Mobile App Development',
  message: 'We need an Android app for field staff.',
};

const KEYS = { serviceId: 'service_x', templateId: 'template_y', publicKey: 'pk_z' };
const NO_KEYS = { serviceId: '', templateId: '', publicKey: '' };

function setup(config: typeof KEYS) {
  const open = vi.fn();
  TestBed.configureTestingModule({
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      { provide: CONTACT_EMAILJS, useValue: config },
      { provide: DOCUMENT, useValue: { defaultView: { open } } },
    ],
  });
  return { open, service: TestBed.inject(ContactService), http: TestBed.inject(HttpTestingController) };
}

describe('ContactService', () => {
  it('builds a mailto link with subject, name, email, service and message', () => {
    const { service } = setup(NO_KEYS);
    const url = service.mailto(MSG);
    const body = decodeURIComponent(url.split('&body=')[1]);

    expect(url.startsWith('mailto:info@noble-wave.com?subject=')).toBe(true);
    expect(decodeURIComponent(url)).toContain('Message from Asha Rao via noble-wave.com');
    expect(body).toContain('Name: Asha Rao');
    expect(body).toContain('Email: asha@example.com');
    expect(body).toContain('Interested in: Mobile App Development');
    expect(body).toContain(MSG.message);
  });

  it('leaves out the phone line when no phone is given', () => {
    const { service } = setup(NO_KEYS);
    expect(decodeURIComponent(service.mailto(MSG))).not.toContain('Phone:');
  });

  it('falls back to opening the email app when EmailJS is not configured', async () => {
    const { service, open } = setup(NO_KEYS);
    await expect(service.submit(MSG)).resolves.toBe('mailto');
    expect(open).toHaveBeenCalledTimes(1);
    expect(open.mock.calls[0][0]).toContain('mailto:');
  });

  it('sends the enquiry through EmailJS when it is configured', async () => {
    const { service, http, open } = setup(KEYS);
    const result = service.submit(MSG);
    const req = http.expectOne(EMAILJS_SEND_URL);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toMatchObject({
      service_id: 'service_x',
      template_id: 'template_y',
      user_id: 'pk_z',
      template_params: {
        from_name: 'Asha Rao',
        from_email: 'asha@example.com',
        reply_to: 'asha@example.com',
        phone: 'Not given',
        service: 'Mobile App Development',
        message: MSG.message,
      },
    });
    req.flush('OK');

    await expect(result).resolves.toBe('sent');
    expect(open).not.toHaveBeenCalled();
  });

  it('rejects when EmailJS fails, so the page can show an error', async () => {
    const { service, http } = setup(KEYS);
    const result = service.submit(MSG);
    http.expectOne(EMAILJS_SEND_URL).flush('nope', { status: 400, statusText: 'Bad Request' });
    await expect(result).rejects.toBeTruthy();
  });
});
