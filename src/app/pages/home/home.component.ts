import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Product } from '../../core/types/product.model';
import { ProductService } from '../../core/services/product.service';
import { CATEGORIES_MOCK } from '../../core/data/categories.mock';
import { BLOG_POSTS_MOCK } from '../../core/data/blogs.mock';
import { ProductCardComponent } from '../../shared/cards/product-card/product-card.component';
import { CategoryCardComponent } from '../../shared/cards/category-card/category-card.component';
import { BlogCardComponent } from '../../shared/cards/blog-card/blog-card.component';
import { PromoBannerComponent } from '../../shared/marketing/promo-banner/promo-banner.component';
import { NewsletterComponent } from '../../shared/marketing/newsletter/newsletter.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AsyncPipe,
    ProductCardComponent,
    CategoryCardComponent,
    BlogCardComponent,
    PromoBannerComponent,
    NewsletterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly categories = CATEGORIES_MOCK;
  readonly blogPosts = BLOG_POSTS_MOCK;

  readonly featuredProducts$: Observable<Product[]>;
  readonly latestProducts$: Observable<Product[]>;
  readonly trendingProducts$: Observable<Product[]>;

  constructor(private readonly productService: ProductService) {
    this.featuredProducts$ = this.productService.getFeatured();
    this.latestProducts$ = this.productService.getLatest();
    this.trendingProducts$ = this.productService.getTrending();
  }
}
