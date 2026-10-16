import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, input, signal } from '@angular/core';
import { Product } from '../../core/products.config';

/**
 * Interactive walkthrough: a list of steps beside one large device. Choosing a step (or waiting,
 * when the page is in view and the visitor has not chosen one) swaps the screen on the device.
 * Works as a tab list, so it is usable with the keyboard and screen readers.
 */
@Component({
  selector: 'nw-product-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div
      class="showcase"
      [class.is-paused]="paused()"
      [style.--glow]="product().glow"
      (mouseenter)="paused.set(true)"
      (mouseleave)="paused.set(false)"
      (focusin)="paused.set(true)"
      (focusout)="paused.set(false)"
    >
      <div
        class="showcase-stage"
        role="tabpanel"
        [id]="uid + '-panel'"
        [attr.aria-labelledby]="uid + '-tab-' + index()"
      >
        <div class="showcase-panel pv" [class.is-wide]="wide()">
          @if (wide()) {
            @for (s of product().story; track s.file; let i = $index) {
              <img
                class="showcase-shot"
                [class.is-active]="i === index()"
                [src]="'images/products/' + s.file + '.webp'"
                [alt]="s.alt"
                [attr.aria-hidden]="i === index() ? null : 'true'"
                width="1600"
                height="893"
                loading="lazy"
                decoding="async"
              />
            }
          } @else {
            <!-- One fixed phone; only the screen inside it changes. -->
            <div class="showcase-device">
              <div class="showcase-screen">
                @for (s of product().story; track s.file; let i = $index) {
                  <img
                    class="showcase-img"
                    [class.is-active]="i === index()"
                    [src]="'images/screens/' + s.file + '.webp'"
                    [alt]="s.alt"
                    [attr.aria-hidden]="i === index() ? null : 'true'"
                    width="480"
                    height="1040"
                    loading="lazy"
                    decoding="async"
                  />
                }
              </div>
            </div>
          }
        </div>
      </div>

      <div class="showcase-steps" role="tablist" aria-orientation="vertical" [attr.aria-label]="product().name + ' walkthrough'">
        @for (s of product().story; track s.file; let i = $index) {
          <button
            type="button"
            role="tab"
            class="showcase-step"
            [class.is-active]="i === index()"
            [id]="uid + '-tab-' + i"
            [attr.aria-selected]="i === index()"
            [attr.aria-controls]="uid + '-panel'"
            [tabindex]="i === index() ? 0 : -1"
            (click)="choose(i)"
            (keydown)="onKey($event, i)"
          >
            <span class="showcase-num" aria-hidden="true">0{{ i + 1 }}</span>
            <span class="showcase-body">
              <span class="showcase-title">{{ s.title }}</span>
              <span class="showcase-text"><span>{{ s.text }}</span></span>
            </span>
            @if (i === index() && playing()) {
              <span class="showcase-progress" aria-hidden="true" (animationend)="advance()"></span>
            }
          </button>
        }
      </div>
    </div>
  `,
})
export class ProductShowcase {
  readonly product = input.required<Product>();

  protected readonly uid = `showcase-${Math.random().toString(36).slice(2, 8)}`;
  protected readonly index = signal(0);
  protected readonly paused = signal(false);
  /** True while the steps advance by themselves: in view, motion allowed, nothing chosen yet. The progress bar's animation drives the timing. */
  protected readonly playing = signal(false);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private manual = false;
  private visible = false;

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce || typeof IntersectionObserver === 'undefined') {
        return;
      }
      const io = new IntersectionObserver(([entry]) => {
        this.visible = entry.isIntersecting;
        this.sync();
      }, { threshold: 0.4 });
      io.observe(this.host.nativeElement);
      destroyRef.onDestroy(() => io.disconnect());
    });
  }

  protected wide(): boolean {
    return this.product().device === 'desktop';
  }

  protected choose(i: number): void {
    this.manual = true;
    this.index.set(i);
    this.sync();
  }

  protected onKey(event: KeyboardEvent, i: number): void {
    const n = this.product().story.length;
    let next = -1;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      next = (i + 1) % n;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      next = (i - 1 + n) % n;
    } else if (event.key === 'Home') {
      next = 0;
    } else if (event.key === 'End') {
      next = n - 1;
    }
    if (next < 0) {
      return;
    }
    event.preventDefault();
    this.choose(next);
    this.host.nativeElement.querySelector<HTMLElement>(`#${this.uid}-tab-${next}`)?.focus();
  }

  /** The progress bar finished its run (it pauses while the visitor hovers or focuses): next step. */
  protected advance(): void {
    this.index.update((i) => (i + 1) % this.product().story.length);
  }

  private sync(): void {
    this.playing.set(this.visible && !this.manual);
  }
}
