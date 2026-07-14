import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../../core/types/product.model';
import { CartService } from '../../../core/services/cart.service';
import { RatingStarsComponent } from '../../ui/rating-stars/rating-stars.component';

@Component({
  selector: 'app-product-list-item',
  standalone: true,
  imports: [RouterLink, RatingStarsComponent],
  templateUrl: './product-list-item.component.html',
  styleUrl: './product-list-item.component.scss',
})
export class ProductListItemComponent {
  product = input.required<Product>();

  constructor(private readonly cartService: CartService) {}

  addToCart(): void {
    this.cartService.add(this.product());
  }
}
