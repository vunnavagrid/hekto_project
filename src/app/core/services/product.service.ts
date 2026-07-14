import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../types/product.model';
import {
  FEATURED_PRODUCT_IDS,
  LATEST_PRODUCT_IDS,
  PRODUCTS_MOCK,
  RELATED_PRODUCT_IDS,
  TRENDING_PRODUCT_IDS,
} from '../data/products.mock';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly products: Product[] = PRODUCTS_MOCK;

  getAll(): Observable<Product[]> {
    return of(this.products);
  }

  getById(id: string): Observable<Product | undefined> {
    return of(this.products.find((p) => p.id === id));
  }

  getBySlug(slug: string): Observable<Product | undefined> {
    return of(this.products.find((p) => p.slug === slug));
  }

  getByIds(ids: string[]): Observable<Product[]> {
    return of(ids.map((id) => this.products.find((p) => p.id === id)).filter(Boolean) as Product[]);
  }

  getFeatured(): Observable<Product[]> {
    return this.getByIds(FEATURED_PRODUCT_IDS);
  }

  getLatest(): Observable<Product[]> {
    return this.getByIds(LATEST_PRODUCT_IDS);
  }

  getTrending(): Observable<Product[]> {
    return this.getByIds(TRENDING_PRODUCT_IDS);
  }

  getRelated(excludeId?: string): Observable<Product[]> {
    const related = this.products.filter(
      (p) => RELATED_PRODUCT_IDS.includes(p.id) && p.id !== excludeId
    );
    return of(related.slice(0, 4));
  }
}
