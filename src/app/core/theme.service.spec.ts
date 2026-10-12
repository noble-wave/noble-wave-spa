import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  afterEach(() => localStorage.removeItem('nw-theme'));

  it('toggles between light and dark and applies it to <html>', () => {
    const svc = TestBed.inject(ThemeService);
    const root = TestBed.inject(DOCUMENT).documentElement;

    svc.set('light');
    expect(root.dataset['theme']).toBe('light');
    svc.toggle();
    expect(svc.theme()).toBe('dark');
    expect(root.dataset['theme']).toBe('dark');
    svc.toggle();
    expect(svc.theme()).toBe('light');
  });

  it('remembers the choice for the next visit', () => {
    TestBed.inject(ThemeService).set('dark');
    expect(localStorage.getItem('nw-theme')).toBe('dark');
  });
});
