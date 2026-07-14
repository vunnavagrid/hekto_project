import { Component, computed, signal } from '@angular/core';
import { Product } from '../../core/types/product.model';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/cards/product-card/product-card.component';
import { ProductListItemComponent } from '../../shared/catalog/product-list-item/product-list-item.component';
import { SidebarFilterComponent, ProductFilters } from '../../shared/catalog/sidebar-filter/sidebar-filter.component';
import { PaginationComponent } from '../../shared/ui/pagination/pagination.component';
import { PageTitleComponent } from '../../layout/page-title/page-title.component';

type ViewMode = 'list' | 'grid';
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc';

const PRICE_CEILING = 1600;

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    ProductCardComponent,
    ProductListItemComponent,
    SidebarFilterComponent,
    PaginationComponent,
    PageTitleComponent,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  readonly priceCeiling = PRICE_CEILING;

  readonly allProducts = signal<Product[]>([]);
  readonly viewMode = signal<ViewMode>('list');
  readonly sortOption = signal<SortOption>('default');
  readonly pageSize = signal<number>(9);
  readonly currentPage = signal<number>(1);

  readonly filters = signal<ProductFilters>({
    brands: [],
    categories: [],
    minRating: null,
    maxPrice: PRICE_CEILING,
  });

  constructor(private readonly productService: ProductService) {
    this.productService.getAll().subscribe((products) => this.allProducts.set(products));
  }

  readonly brandOptions = computed(() => this.buildFacets((p) => p.brand));
  readonly categoryOptions = computed(() => this.buildFacets((p) => p.category));

  readonly filteredProducts = computed(() => {
    const { brands, categories, minRating, maxPrice } = this.filters();
    return this.allProducts().filter((p) => {
      if (brands.length && (!p.brand || !brands.includes(p.brand))) return false;
      if (categories.length && !categories.includes(p.category)) return false;
      if (minRating !== null && p.rating < minRating) return false;
      if (p.price > maxPrice) return false;
      return true;
    });
  });

  readonly sortedProducts = computed(() => {
    const products = [...this.filteredProducts()];
    switch (this.sortOption()) {
      case 'price-asc':
        return products.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return products.sort((a, b) => b.price - a.price);
      case 'rating-desc':
        return products.sort((a, b) => b.rating - a.rating);
      case 'name-asc':
        return products.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products;
    }
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.sortedProducts().length / this.pageSize()))
  );

  readonly pagedProducts = computed(() => {
    const page = this.currentPage();
    const size = this.pageSize();
    const start = (page - 1) * size;
    return this.sortedProducts().slice(start, start + size);
  });

  setViewMode(mode: ViewMode): void {
    this.viewMode.set(mode);
  }

  onSortChange(value: string): void {
    this.sortOption.set(value as SortOption);
    this.currentPage.set(1);
  }

  onPageSizeChange(value: string): void {
    this.pageSize.set(Number(value));
    this.currentPage.set(1);
  }

  onFiltersChange(filters: ProductFilters): void {
    this.filters.set(filters);
    this.currentPage.set(1);
  }

  onPageChange(page: number): void {
    this.currentPage.set(page);
  }

  private buildFacets(pick: (p: Product) => string | undefined): { name: string; count: number }[] {
    const counts = new Map<string, number>();
    for (const product of this.allProducts()) {
      const key = pick(product);
      if (!key) continue;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return Array.from(counts.entries()).map(([name, count]) => ({ name, count }));
  }
}
