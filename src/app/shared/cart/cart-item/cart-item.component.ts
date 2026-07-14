import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../../core/types/cart-item.model';
import { QuantitySelectorComponent } from '../../ui/quantity-selector/quantity-selector.component';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [RouterLink, QuantitySelectorComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss',
})
export class CartItemComponent {
  item = input.required<CartItem>();

  quantityChange = output<number>();
  remove = output<void>();

  readonly lineTotal = computed(() => this.item().product.price * this.item().quantity);

  onQuantityChange(quantity: number): void {
    this.quantityChange.emit(quantity);
  }

  onRemove(): void {
    this.remove.emit();
  }
}
