import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/types/product.model';
import { CartService } from '../../../core/services/cart.service';
import { RatingStarsComponent } from '../../ui/rating-stars/rating-stars.component';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, RatingStarsComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  product = input.required<Product>();

  constructor(private readonly cartService: CartService) {}

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.add(this.product());
  }

  get discountPercent(): number | null {
    const p = this.product();
    if (!p.oldPrice || p.oldPrice <= p.price) return null;
    return Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
  }
}
