import { TestBed } from '@angular/core/testing';
import { PRODUCTS } from '../../core/products.config';
import { ProductShowcase } from './product-showcase';

function render(id: string) {
  const product = PRODUCTS.find((p) => p.id === id)!;
  const fixture = TestBed.createComponent(ProductShowcase);
  fixture.componentRef.setInput('product', product);
  fixture.detectChanges();
  const el = fixture.nativeElement as HTMLElement;
  const tabs = () => [...el.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const activeImages = () => [...el.querySelectorAll('.showcase-img.is-active, .showcase-shot.is-active')];
  return { fixture, el, product, tabs, activeImages };
}

function press(el: HTMLElement, key: string) {
  el.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
}

describe('ProductShowcase', () => {
  it('lists one tab per walkthrough step and starts on the first', () => {
    const { tabs, product } = render('noble-salah');

    expect(tabs().length).toBe(product.story.length);
    expect(tabs()[0].getAttribute('aria-selected')).toBe('true');
    expect(tabs()[1].getAttribute('aria-selected')).toBe('false');
    expect(tabs().map((t) => t.tabIndex)).toEqual(tabs().map((_, i) => (i === 0 ? 0 : -1)));
  });

  it('shows the chosen step\'s screen and hides the others from assistive technology', () => {
    const { fixture, el, tabs, activeImages } = render('rentiva');

    tabs()[2].click();
    fixture.detectChanges();

    expect(tabs()[2].getAttribute('aria-selected')).toBe('true');
    expect(activeImages().length).toBe(1);
    expect(activeImages()[0].getAttribute('src')).toContain('rent-add-property');
    const hidden = el.querySelectorAll('.showcase-img[aria-hidden="true"]');
    expect(hidden.length).toBe(tabs().length - 1);
  });

  it('moves between steps with the arrow keys and wraps around', () => {
    const { fixture, tabs } = render('pdf-workshop');

    press(tabs()[0], 'ArrowDown');
    fixture.detectChanges();
    expect(tabs()[1].getAttribute('aria-selected')).toBe('true');

    press(tabs()[1], 'End');
    fixture.detectChanges();
    expect(tabs()[tabs().length - 1].getAttribute('aria-selected')).toBe('true');

    press(tabs()[tabs().length - 1], 'ArrowRight');
    fixture.detectChanges();
    expect(tabs()[0].getAttribute('aria-selected')).toBe('true');
  });

  it('uses a flat laptop screen for desktop products and a phone screen otherwise', () => {
    const laptop = render('noble-qaida');
    expect(laptop.el.querySelector('.showcase-laptop')).not.toBeNull();
    expect(laptop.activeImages()[0].getAttribute('src')).toContain('images/screens/qaida-1-screen');

    const phone = render('noble-salah');
    expect(phone.el.querySelector('.showcase-device')).not.toBeNull();
    expect(phone.activeImages()[0].getAttribute('src')).toContain('images/screens/salah-prayer-times');
  });

  it('gives every showcase on a page its own ids', () => {
    const a = render('rentiva');
    const b = render('rentiva');

    expect(a.tabs()[0].id).not.toBe(b.tabs()[0].id);
  });
});
