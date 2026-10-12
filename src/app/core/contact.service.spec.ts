import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { CONTACT_ENDPOINT, ContactMessage, ContactService } from './contact.service';

const MSG: ContactMessage = {
  name: 'Asha Rao',
  email: 'asha@example.com',
  phone: '',
  service: 'Mobile App Development',
  message: 'We need an Android app for field staff.',
};

function setup(endpoint: string) {
  const open = vi.fn();
  TestBed.configureTestingModule({
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      { provide: CONTACT_ENDPOINT, useValue: endpoint },
      { provide: DOCUMENT, useValue: { defaultView: { open } } },
    ],
  });
  return { open, service: TestBed.inject(ContactService), http: TestBed.inject(HttpTestingController) };
}

describe('ContactService', () => {
  it('builds a mailto link with subject, name, email, service and message', () => {
    const { service } = setup('');
    const url = service.mailto(MSG);
    const body = decodeURIComponent(url.split('&body=')[1]);

    expect(url.startsWith('mailto:info@noble-wave.com?subject=')).toBe(true);
    expect(decodeURIComponent(url)).toContain('Project enquiry from Asha Rao');
    expect(body).toContain('Name: Asha Rao');
    expect(body).toContain('Email: asha@example.com');
    expect(body).toContain('Interested in: Mobile App Development');
    expect(body).toContain(MSG.message);
  });

  it('leaves out the phone line when no phone is given', () => {
    const { service } = setup('');
    expect(decodeURIComponent(service.mailto(MSG))).not.toContain('Phone:');
  });

  it('falls back to opening the email app when no endpoint is configured', async () => {
    const { service, open } = setup('');
    await expect(service.submit(MSG)).resolves.toBe('mailto');
    expect(open).toHaveBeenCalledTimes(1);
    expect(open.mock.calls[0][0]).toContain('mailto:');
  });

  it('POSTs JSON to the endpoint when one is configured', async () => {
    const { service, http, open } = setup('https://forms.example/submit');
    const result = service.submit(MSG);
    const req = http.expectOne('https://forms.example/submit');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(MSG);
    req.flush({ ok: true });

    await expect(result).resolves.toBe('sent');
    expect(open).not.toHaveBeenCalled();
  });

  it('rejects when the endpoint fails, so the page can show an error', async () => {
    const { service, http } = setup('https://forms.example/submit');
    const result = service.submit(MSG);
    http.expectOne('https://forms.example/submit').flush('nope', { status: 500, statusText: 'Server Error' });
    await expect(result).rejects.toBeTruthy();
  });
});
