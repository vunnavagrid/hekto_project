import { Component, input } from '@angular/core';

export type PromoBannerVariant = 'hero' | 'feature' | 'discount';
export type PromoImagePosition = 'left' | 'right';

@Component({
  selector: 'app-promo-banner',
  standalone: true,
  templateUrl: './promo-banner.component.html',
  styleUrl: './promo-banner.component.scss',
})
export class PromoBannerComponent {
  variant = input<PromoBannerVariant>('hero');
  imagePosition = input<PromoImagePosition>('right');
  eyebrow = input<string | undefined>(undefined);
  title = input.required<string>();
  description = input<string | undefined>(undefined);
  features = input<string[] | undefined>(undefined);
  ctaLabel = input<string>('Shop Now');
  image = input.required<string>();
  badgeLabel = input<string | undefined>(undefined);
  badgeSub = input<string | undefined>(undefined);
  showDots = input<boolean>(false);
}
