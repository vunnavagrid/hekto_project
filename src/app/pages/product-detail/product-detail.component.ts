import { Component, computed, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../core/types/product.model';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { PageTitleComponent } from '../../layout/page-title/page-title.component';
import { RatingStarsComponent } from '../../shared/ui/rating-stars/rating-stars.component';
import { QuantitySelectorComponent } from '../../shared/ui/quantity-selector/quantity-selector.component';
import { TabsComponent } from '../../shared/ui/tabs/tabs.component';
import { ProductCardComponent } from '../../shared/cards/product-card/product-card.component';

interface MockReview {
  author: string;
  rating: number;
  date: string;
  comment: string;
}

const MOCK_REVIEWS: MockReview[] = [
  {
    author: 'Amelia R.',
    rating: 5,
    date: 'June 2, 2026',
    comment:
      'Exactly as described and arrived faster than expected. The build quality feels premium for the price.',
  },
  {
    author: 'Daniel K.',
    rating: 4,
    date: 'May 21, 2026',
    comment: 'Great value overall — comfortable to use daily, though the box packaging was a little plain.',
  },
  {
    author: 'Priya S.',
    rating: 5,
    date: 'May 9, 2026',
    comment: "Second one I've bought as a gift. Consistently good quality across both orders.",
  },
];

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink,
    PageTitleComponent,
    RatingStarsComponent,
    QuantitySelectorComponent,
    TabsComponent,
    ProductCardComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  readonly product = toSignal(
    this.route.paramMap.pipe(
      map((params) => params.get('id')),
      switchMap((id) => this.productService.getById(id ?? ''))
    ),
    { initialValue: undefined }
  );

  readonly relatedProducts$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    switchMap((id) => this.productService.getRelated(id ?? undefined))
  );

  readonly activeImageIndex = signal(0);
  readonly quantity = signal(1);
  readonly activeTabIndex = signal(0);
  readonly addedToCart = signal(false);

  readonly tabs = ['Description', 'Additional Info', 'Reviews', 'Video'];
  readonly reviews = MOCK_REVIEWS;

  readonly galleryImages = computed<string[]>(() => {
    const product = this.product();
    if (!product) return [];
    return product.images && product.images.length ? product.images : [product.image];
  });

  readonly activeImage = computed(() => this.galleryImages()[this.activeImageIndex()] ?? '');

  readonly averageReviewRating = computed(() => {
    const total = this.reviews.reduce((sum, r) => sum + r.rating, 0);
    return total / this.reviews.length;
  });

  selectImage(index: number): void {
    this.activeImageIndex.set(index);
  }

  setQuantity(value: number): void {
    this.quantity.set(value);
  }

  setActiveTab(index: number): void {
    this.activeTabIndex.set(index);
  }

  addToCart(product: Product): void {
    this.cartService.add(product, this.quantity());
    this.addedToCart.set(true);
  }
}
