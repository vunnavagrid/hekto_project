import { Component, computed, input, output, signal } from '@angular/core';
import { RatingStarsComponent } from '../../ui/rating-stars/rating-stars.component';

export interface ProductFilters {
  brands: string[];
  categories: string[];
  minRating: number | null;
  maxPrice: number;
}

interface FacetOption {
  name: string;
  count: number;
}

@Component({
  selector: 'app-sidebar-filter',
  standalone: true,
  imports: [RatingStarsComponent],
  templateUrl: './sidebar-filter.component.html',
  styleUrl: './sidebar-filter.component.scss',
})
export class SidebarFilterComponent {
  brandOptions = input.required<FacetOption[]>();
  categoryOptions = input.required<FacetOption[]>();
  priceCeiling = input<number>(2000);

  filtersChange = output<ProductFilters>();

  readonly selectedBrands = signal<Set<string>>(new Set());
  readonly selectedCategories = signal<Set<string>>(new Set());
  readonly selectedRating = signal<number | null>(null);
  readonly maxPrice = signal<number>(this.priceCeiling());

  readonly ratingOptions = [5, 4, 3, 2, 1];

  readonly hasActiveFilters = computed(
    () =>
      this.selectedBrands().size > 0 ||
      this.selectedCategories().size > 0 ||
      this.selectedRating() !== null ||
      this.maxPrice() < this.priceCeiling()
  );

  toggleBrand(name: string): void {
    this.selectedBrands.update((set) => {
      const next = new Set(set);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
    this.emit();
  }

  toggleCategory(name: string): void {
    this.selectedCategories.update((set) => {
      const next = new Set(set);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
    this.emit();
  }

  setRating(rating: number): void {
    this.selectedRating.update((current) => (current === rating ? null : rating));
    this.emit();
  }

  onPriceInput(value: string): void {
    this.maxPrice.set(Number(value));
    this.emit();
  }

  clearAll(): void {
    this.selectedBrands.set(new Set());
    this.selectedCategories.set(new Set());
    this.selectedRating.set(null);
    this.maxPrice.set(this.priceCeiling());
    this.emit();
  }

  private emit(): void {
    this.filtersChange.emit({
      brands: Array.from(this.selectedBrands()),
      categories: Array.from(this.selectedCategories()),
      minRating: this.selectedRating(),
      maxPrice: this.maxPrice(),
    });
  }
}
