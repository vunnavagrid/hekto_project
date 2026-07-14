import { Component, inject } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { PageTitleComponent } from '../../layout/page-title/page-title.component';
import { CartItemComponent } from '../../shared/cart/cart-item/cart-item.component';
import { CartSummaryComponent } from '../../shared/cart/cart-summary/cart-summary.component';
import { EmptyStateComponent } from '../../shared/ui/empty-state/empty-state.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [PageTitleComponent, CartItemComponent, CartSummaryComponent, EmptyStateComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  private readonly cartService = inject(CartService);

  readonly items = this.cartService.items;
  readonly subtotal = this.cartService.subtotal;

  onQuantityChange(productId: string, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity);
  }

  onRemove(productId: string): void {
    this.cartService.remove(productId);
  }

  onCheckout(): void {
    window.alert('This is a mock checkout — no payment is processed.');
  }
}
