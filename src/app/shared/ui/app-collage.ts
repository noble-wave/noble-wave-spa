import { ChangeDetectionStrategy, Component } from '@angular/core';

/** Real screens from all four apps, arranged as a collage. Used where a photo would otherwise go. */
@Component({
  selector: 'nw-app-collage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
  template: `
    <div
      class="pv aspect-[4/3]"
      style="--glow: 14 116 144"
      role="img"
      aria-label="Screens from PDF Workshop, Noble Qaida, Noble Salah Guide and Rentiva"
    >
      <img class="pv-shot" src="images/products/pdf-1.webp" alt="" width="1600" height="893" decoding="async" fetchpriority="high"
        style="left:4%;top:7%;width:60%;transform:rotate(-3deg);z-index:1" />
      <img class="pv-shot" src="images/products/qaida-1.webp" alt="" width="1600" height="893" loading="lazy" decoding="async"
        style="left:34%;top:34%;width:62%;transform:rotate(2.5deg);z-index:2" />
      <img class="pv-phone" src="images/story/salah-prayer-times.webp" alt="" width="560" height="1214" loading="lazy" decoding="async"
        style="--x:5%;--y:-9%;--h:66%;--r:-6deg;z-index:3" />
      <img class="pv-phone" src="images/story/rent-portfolio.webp" alt="" width="516" height="1070" loading="lazy" decoding="async"
        style="--x:70%;--y:-12%;--h:64%;--r:6deg;z-index:3" />
    </div>
  `,
})
export class AppCollage {}
