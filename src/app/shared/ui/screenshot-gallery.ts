import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Screenshot } from '../../core/products.config';
import { Icon } from './icon';

const BASE = 'images/products/';

/**
 * Horizontal, swipeable screenshot strip. Clicking a screenshot opens it large in a
 * native <dialog> (Esc closes it, arrow keys move between images, focus is trapped).
 */
@Component({
  selector: 'nw-screenshot-gallery',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative">
      <div
        #track
        class="gallery-track"
        role="list"
        tabindex="0"
        [attr.aria-label]="productName() + ' screenshots'"
      >
        @for (s of screenshots(); track s.file; let i = $index) {
          <button
            type="button"
            role="listitem"
            class="gallery-item"
            [class.is-wide]="isWide(s)"
            [class.is-poster]="s.portrait"
            [attr.aria-label]="'View larger: ' + s.alt"
            (click)="open(i)"
          >
            <img
              [src]="thumb(s)"
              [attr.srcset]="isWide(s) ? thumb(s) + ' 960w, ' + full(s) + ' 1600w' : thumb(s) + ' 512w, ' + full(s) + ' 1024w'"
              [attr.sizes]="isWide(s) ? '(min-width: 640px) 440px, 85vw' : '(min-width: 640px) 224px, 62vw'"
              [alt]="s.alt"
              [attr.width]="isWide(s) ? 960 : 512"
              [attr.height]="isWide(s) ? 536 : s.portrait ? 917 : 768"
              loading="lazy"
              decoding="async"
            />
          </button>
        }
      </div>
      <div class="mt-3 hidden justify-end gap-2 sm:flex">
        <button type="button" class="btn btn-secondary !min-h-10 !px-3" aria-label="Scroll screenshots left" (click)="scroll(-1)">
          <nw-icon name="chevron-left" />
        </button>
        <button type="button" class="btn btn-secondary !min-h-10 !px-3" aria-label="Scroll screenshots right" (click)="scroll(1)">
          <nw-icon name="chevron-right" />
        </button>
      </div>
    </div>

    <dialog
      #dialog
      class="gallery-dialog"
      [attr.aria-label]="productName() + ' screenshot viewer'"
      (click)="onBackdrop($event)"
      (keydown)="onKey($event)"
    >
      @if (current(); as s) {
        <div class="gallery-dialog-body" [class.is-wide]="isWide(s)">
          <img [src]="full(s)" [alt]="s.alt" [attr.width]="isWide(s) ? 1600 : 1024" [attr.height]="isWide(s) ? 893 : s.portrait ? 1835 : 1536" />
          <p class="mt-3 text-center text-sm text-white/80" aria-live="polite">
            {{ index() + 1 }} / {{ screenshots().length }}
          </p>
        </div>
        <button type="button" class="gallery-nav gallery-close" aria-label="Close" (click)="close()">
          <nw-icon name="x" [size]="22" />
        </button>
        <button type="button" class="gallery-nav gallery-prev" aria-label="Previous screenshot" (click)="step(-1)">
          <nw-icon name="chevron-left" [size]="24" />
        </button>
        <button type="button" class="gallery-nav gallery-next" aria-label="Next screenshot" (click)="step(1)">
          <nw-icon name="chevron-right" [size]="24" />
        </button>
      }
    </dialog>
  `,
})
export class ScreenshotGallery {
  readonly screenshots = input.required<readonly Screenshot[]>();
  readonly productName = input.required<string>();
  /** Landscape (laptop) screenshots instead of portrait phone screens. */
  readonly wide = input(false);

  private readonly track = viewChild.required<ElementRef<HTMLElement>>('track');
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected readonly index = signal(0);

  protected current(): Screenshot | undefined {
    return this.screenshots()[this.index()];
  }

  /** Landscape or portrait, per image: a `portrait` flag flips the gallery's default. */
  protected isWide(s: Screenshot): boolean {
    return s.portrait ? !this.wide() : this.wide();
  }

  protected thumb(s: Screenshot): string {
    return `${BASE}${s.file}${this.isWide(s) ? '-sm' : '-512'}.webp`;
  }

  protected full(s: Screenshot): string {
    return `${BASE}${s.file}.webp`;
  }

  protected scroll(dir: 1 | -1): void {
    const el = this.track().nativeElement;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' });
  }

  protected open(i: number): void {
    this.index.set(i);
    this.dialog().nativeElement.showModal();
  }

  protected close(): void {
    this.dialog().nativeElement.close();
  }

  protected step(dir: 1 | -1): void {
    const n = this.screenshots().length;
    this.index.update((i) => (i + dir + n) % n);
  }

  protected onKey(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.step(1);
    } else if (event.key === 'ArrowLeft') {
      this.step(-1);
    }
  }

  /** A click on the dark backdrop (the dialog element itself) closes the viewer. */
  protected onBackdrop(event: MouseEvent): void {
    if (event.target === this.dialog().nativeElement) {
      this.close();
    }
  }
}
