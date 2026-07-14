import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  standalone: true,
  templateUrl: './rating-stars.component.html',
  styleUrl: './rating-stars.component.scss',
})
export class RatingStarsComponent {
  rating = input<number>(0);
  reviewCount = input<number | undefined>(undefined);
  size = input<'sm' | 'md'>('sm');

  readonly stars = computed(() => {
    const value = Math.max(0, Math.min(5, this.rating()));
    return Array.from({ length: 5 }, (_, i) => {
      const diff = value - i;
      if (diff >= 1) return 'full';
      if (diff > 0) return 'half';
      return 'empty';
    });
  });
}
