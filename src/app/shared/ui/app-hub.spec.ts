import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { PRODUCTS } from '../../core/products.config';
import { AppHub } from './app-hub';

function render() {
  TestBed.configureTestingModule({ imports: [AppHub], providers: [provideRouter([])] });
  const fixture = TestBed.createComponent(AppHub);
  fixture.detectChanges();
  return { fixture, el: fixture.nativeElement as HTMLElement };
}

describe('AppHub', () => {
  it('draws one branch per product, each tile showing an icon or a stand-in', () => {
    const { el } = render();
    const tiles = [...el.querySelectorAll('.hub-app')];

    expect(el.querySelectorAll('.hub-branch').length).toBe(PRODUCTS.length);
    for (const tile of tiles) {
      expect(tile.querySelector('image') ?? tile.querySelector('.hub-glyph')).not.toBeNull();
    }
  });

  it('shows a book on the tile of an app that has no icon of its own yet', () => {
    const { el } = render();
    const qaida = [...el.querySelectorAll('.hub-branch')].find((n) => n.textContent?.includes('Noble Qaida'));

    expect(qaida?.querySelector('.hub-app image')).toBeNull();
    expect(qaida?.querySelectorAll('.hub-glyph path').length).toBeGreaterThan(0);
  });

  it('opens the product page when an app is clicked or activated with the keyboard', () => {
    const { el } = render();
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    const apps = el.querySelectorAll<SVGGElement>('.hub-app');

    apps[0].dispatchEvent(new Event('click'));
    expect(navigate).toHaveBeenCalledWith(['/products', PRODUCTS[0].id]);

    apps[1].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    expect(navigate).toHaveBeenCalledWith(['/products', PRODUCTS[1].id]);
  });

  it('fades the other branches while one app is hovered', () => {
    const { fixture, el } = render();
    el.querySelectorAll('.hub-app')[0].dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();

    const branches = el.querySelectorAll('.hub-branch');
    expect(branches[0].classList.contains('is-active')).toBe(true);
    expect(branches[1].classList.contains('is-dim')).toBe(true);

    el.querySelectorAll('.hub-app')[0].dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();
    expect(el.querySelectorAll('.is-dim').length).toBe(0);
  });

  it('links each app to the centre with a zig-zag line, each in its own colour', () => {
    const { el } = render();
    const spokes = [...el.querySelectorAll('.hub-spoke')].map((n) => n.getAttribute('d') ?? '');
    const colours = [...el.querySelectorAll<SVGGElement>('.hub-branch')].map((n) => n.style.getPropertyValue('--rgb'));

    expect(spokes.length).toBe(PRODUCTS.length);
    for (const d of spokes) {
      // M start, two kinks and the end point: four points, so the line is not straight.
      expect(d.match(/[ML]/g)?.length).toBe(4);
    }
    expect(new Set(colours).size).toBe(PRODUCTS.length);
  });
});
