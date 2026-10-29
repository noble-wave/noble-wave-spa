import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PRODUCTS } from '../../core/products.config';
import { ICONS as GLYPHS } from './icon';

/** Short labels for what each app does. They show as small nodes around the app. */
const FEATURE_NODES: Record<string, readonly string[]> = {
  'pdf-workshop': ['Merge', 'Sign', 'OCR'],
  'noble-salah': ['Prayer times', 'Qibla', 'Quran'],
  'rentiva': ['Bills', 'Payments', 'Reports'],
  'noble-qaida': ['Letters', 'Audio', 'Streaks'],
  'noble-relay': ['Mouse', 'Clipboard', 'Files'],
};

/** One colour per app (r g b) for its glow, its zig-zag link and its small nodes, picked to sit with its icon. */
const ACCENT: Record<string, string> = {
  'pdf-workshop': '46 99 229',
  'noble-salah': '13 148 136',
  'rentiva': '34 197 94',
  'noble-qaida': '245 158 11',
  'noble-relay': '99 102 241',
};

/**
 * App icons (web-sized copies in public/images/app-icons). An app without its own icon yet shows a book on a
 * coloured tile instead; add its icon here when it is ready.
 */
const ICONS: Record<string, string> = {
  'pdf-workshop': 'images/app-icons/pdf-workshop.svg',
  'noble-salah': 'images/app-icons/noble-salah.png',
  'rentiva': 'images/app-icons/rentiva.png',
  'noble-relay': 'images/app-icons/noble-relay.png',
};
const TILE = 68;
/** Size of the stand-in glyph on a tile, in picture units. */
const GLYPH_SIZE = 34;
const BOOK_PATHS = GLYPHS['book-open'].paths;

const W = 600;
const H = 610;
/** The small nodes of the outer apps reach past the edges of the 600 x 610 area, so the view starts a little outside it. */
const VIEW_TOP = -30;
const VIEW_LEFT = -40;
const VIEW_W = W - 2 * VIEW_LEFT;
const CX = W / 2;
const CY = 290;
const LEAF_RADIUS = 108;
const LEAF_SPREAD = 0.75;
/** How far the zig-zag swings away from the straight line, in picture units. */
const SPOKE_SWING = 6;
/** The zig-zag starts at the edge of the centre circle and ends at the edge of the app tile, so every kink shows. */
const CENTER_EDGE = 58;
const TILE_EDGE = 38;
const LEAF_SWING = 6;

/** A zig-zag path from (x1, y1) to (x2, y2): `bends` kinks that swing to alternating sides. */
function zigzag(x1: number, y1: number, x2: number, y2: number, bends: number, swing: number, flip = 1): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  let d = `M${x1},${y1}`;
  for (let k = 1; k <= bends; k++) {
    const t = k / (bends + 1);
    const side = (k % 2 === 1 ? 1 : -1) * flip * swing;
    d += ` L${Math.round(x1 + dx * t + nx * side)},${Math.round(y1 + dy * t + ny * side)}`;
  }
  return `${d} L${x2},${y2}`;
}
/** Where each app sits, in the order of PRODUCTS: five points on an oval around the centre, clockwise from the top. */
const APP_POSITIONS: readonly (readonly [number, number])[] = [
  [300, 105],
  [462, 233],
  [400, 440],
  [200, 440],
  [138, 233],
];

/** Zig-zag from the edge of the centre circle to the edge of an app tile. */
function spoke(x: number, y: number, flip: number): string {
  const len = Math.hypot(x - CX, y - CY);
  const ux = (x - CX) / len;
  const uy = (y - CY) / len;
  return zigzag(
    Math.round(CX + ux * CENTER_EDGE),
    Math.round(CY + uy * CENTER_EDGE),
    Math.round(x - ux * TILE_EDGE),
    Math.round(y - uy * TILE_EDGE),
    2,
    SPOKE_SWING,
    flip,
  );
}

interface Leaf {
  readonly label: string;
  /** Zig-zag link from the app to this small node. */
  readonly path: string;
  readonly x: number;
  readonly y: number;
  readonly w: number;
}

interface Branch {
  readonly id: string;
  readonly name: string;
  /** Icon shown on the tile; null while the app has none, which shows a book instead. */
  readonly icon: string | null;
  /** Baseline of the app name, below the node for top apps and above it for bottom apps. */
  readonly nameY: number;
  readonly rgb: string;
  readonly x: number;
  readonly y: number;
  readonly leaves: readonly Leaf[];
  /** Zig-zag link from the centre to the app. */
  readonly spoke: string;
  readonly delay: string;
}

/**
 * Hub and spoke picture of the company: Noble Wave in the centre, each app around it, and small nodes
 * for what the app does. Lines show what belongs to what; they do not claim the apps share data.
 */
@Component({
  selector: 'nw-app-hub',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <svg
      class="hub"
      [attr.viewBox]="viewBox"
      role="group"
      [attr.aria-label]="label"
    >
      <defs>
        <clipPath id="hub-tile-clip"><rect x="-34" y="-34" width="68" height="68" rx="20" /></clipPath>
      </defs>
      @for (b of branches; track b.id) {
        <g
          class="hub-branch"
          [attr.data-side]="b.y < cy ? 'top' : 'bottom'"
          [class.is-dim]="active() !== null && active() !== b.id"
          [class.is-active]="active() === b.id"
          [style.--rgb]="b.rgb"
        >
          <path class="hub-spoke" [attr.d]="b.spoke" />
          @for (l of b.leaves; track l.label) {
            <path class="hub-leaf-line" [attr.d]="l.path" />
          }
          @for (l of b.leaves; track l.label) {
            <g class="hub-leaf" [attr.transform]="'translate(' + l.x + ' ' + l.y + ')'" aria-hidden="true">
              <rect [attr.x]="-l.w / 2" y="-15" [attr.width]="l.w" height="30" rx="15" />
              <text y="5" text-anchor="middle">{{ l.label }}</text>
            </g>
          }
          <g class="hub-float" [style.animation-delay]="b.delay">
            <g
              class="hub-app"
              [attr.transform]="'translate(' + b.x + ' ' + b.y + ')'"
              role="link"
              tabindex="0"
              [attr.aria-label]="b.name + ': open the product page'"
              (click)="open(b.id)"
              (mouseenter)="active.set(b.id)"
              (mouseleave)="active.set(null)"
              (focus)="active.set(b.id)"
              (blur)="active.set(null)"
              (keydown.enter)="open(b.id)"
              (keydown.space)="open(b.id); $event.preventDefault()"
            >
              <circle class="hub-halo" r="52" />
              <rect x="-34" y="-34" width="68" height="68" rx="20" class="hub-tile" />
              @if (b.icon) {
                <image
                  [attr.href]="b.icon"
                  x="-34"
                  y="-34"
                  [attr.width]="tile"
                  [attr.height]="tile"
                  clip-path="url(#hub-tile-clip)"
                  aria-hidden="true"
                />
              } @else {
                <g class="hub-glyph" [attr.transform]="glyphTransform" aria-hidden="true">
                  @for (d of bookPaths; track d) {
                    <path [attr.d]="d" />
                  }
                </g>
              }
              <text class="hub-name" [attr.y]="b.nameY" text-anchor="middle">{{ b.name }}</text>
            </g>
          </g>
        </g>
      }

      <g class="hub-center" [attr.transform]="'translate(' + cx + ' ' + cy + ')'" aria-hidden="true">
        <circle class="hub-center-ring" r="62" />
        <circle class="hub-center-dot" r="46" />
        <image href="favicon.png" x="-31" y="-31" width="62" height="62" />
      </g>
    </svg>
  `,
  styles: `
    .hub {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;
      font-family: inherit;
    }
    .hub-spoke {
      fill: none;
      stroke: rgb(var(--rgb) / 0.9);
      stroke-width: 1.7;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: stroke-width 0.2s ease;
    }
    .hub-leaf-line {
      fill: none;
      stroke: rgb(var(--rgb) / 0.65);
      stroke-width: 1.2;
      stroke-dasharray: 3 5;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .hub-leaf rect {
      fill: var(--bg);
      stroke: color-mix(in srgb, rgb(var(--rgb)) 45%, var(--border));
      stroke-width: 1;
    }
    .hub-leaf text {
      font-size: 13.5px;
      font-weight: 600;
      fill: var(--muted);
    }
    .hub-branch {
      transition: opacity 0.2s ease;
    }
    .hub-branch.is-dim {
      opacity: 0.35;
    }
    .hub-branch.is-active .hub-spoke {
      stroke-width: 2.6;
    }
    .hub-app {
      cursor: pointer;
      outline: 0;
    }
    .hub-halo {
      fill: rgb(var(--rgb) / 0.14);
      transition: fill 0.2s ease;
    }
    .is-active .hub-halo {
      fill: rgb(var(--rgb) / 0.28);
    }
    .hub-app:focus-visible .hub-tile {
      stroke: var(--text);
      stroke-width: 3;
    }
    .hub-tile {
      fill: rgb(var(--rgb));
      filter: drop-shadow(0 8px 14px rgb(var(--rgb) / 0.35));
    }
    .hub-glyph {
      fill: none;
      stroke: #fff;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .hub-name {
      font-size: 16.5px;
      font-weight: 700;
      fill: var(--text);
      /* A page-coloured outline keeps a link that passes behind the name from cutting through the letters. */
      paint-order: stroke;
      stroke: var(--bg);
      stroke-width: 6px;
      stroke-linejoin: round;
    }
    .hub-center-ring {
      fill: color-mix(in srgb, var(--brand) 10%, transparent);
    }
    .hub-center-dot {
      fill: #fff;
      stroke: color-mix(in srgb, var(--brand) 40%, var(--border));
      stroke-width: 1.5;
      filter: drop-shadow(0 8px 16px color-mix(in srgb, var(--brand) 30%, transparent));
    }
    .hub-float {
      animation: hub-float 6s ease-in-out infinite;
    }
    @keyframes hub-float {
      50% {
        transform: translateY(-6px);
      }
    }
    :host {
      overflow: hidden;
    }
    @media (max-width: 40rem) {
      .hub {
        width: 132%;
        margin-left: -16%;
      }
      .hub-leaf,
      .hub-leaf-line {
        display: none;
      }
      .hub-name {
        font-size: 22px;
      }
      /* With the small nodes hidden there is room to put the names on the outer side, clear of the links. */
      .hub-branch[data-side='top'] .hub-name {
        transform: translateY(-126px);
      }
      .hub-branch[data-side='bottom'] .hub-name {
        transform: translateY(126px);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .hub-float {
        animation: none;
      }
    }
  `,
})
export class AppHub {
  private readonly router = inject(Router);

  /** The app being hovered or focused; the other branches fade back. */
  protected readonly active = signal<string | null>(null);

  protected readonly tile = TILE;
  protected readonly bookPaths = BOOK_PATHS;
  /** Centres the 24 unit book drawing on the tile at GLYPH_SIZE. */
  protected readonly glyphTransform = `translate(${-GLYPH_SIZE / 2} ${-GLYPH_SIZE / 2}) scale(${GLYPH_SIZE / 24})`;
  protected readonly viewBox = `${VIEW_LEFT} ${VIEW_TOP} ${VIEW_W} ${H}`;
  protected readonly label = `Noble Wave and its ${PRODUCTS.length} apps: ${PRODUCTS.map((p) => p.name).join(', ')}`;
  protected readonly w = W;
  protected readonly h = H;
  protected readonly cx = CX;
  protected readonly cy = CY;

  protected readonly branches: readonly Branch[] = PRODUCTS.slice(0, APP_POSITIONS.length).map((p, i) => {
    const [x, y] = APP_POSITIONS[i];
    const outward = Math.atan2(y - CY, x - CX);
    const labels = FEATURE_NODES[p.id] ?? [];
    const leaves = labels.map((label, k) => {
      const angle = outward + (k - (labels.length - 1) / 2) * LEAF_SPREAD;
      const lx = Math.round(x + Math.cos(angle) * LEAF_RADIUS);
      const ly = Math.round(y + Math.sin(angle) * LEAF_RADIUS);
      return {
        label,
        path: zigzag(x, y, lx, ly, 1, LEAF_SWING, k % 2 === 0 ? 1 : -1),
        x: lx,
        y: ly,
        w: Math.round(label.length * 7.9 + 28),
      };
    });
    return {
      id: p.id,
      name: p.name,
      icon: ICONS[p.id] ?? null,
      nameY: y < CY ? 68 : -58,
      rgb: ACCENT[p.id] ?? p.glow,
      x,
      y,
      leaves,
      spoke: spoke(x, y, i % 2 === 0 ? 1 : -1),
      delay: `${-i * 1.4}s`,
    };
  });

  protected open(id: string): void {
    void this.router.navigate(['/products', id]);
  }
}
