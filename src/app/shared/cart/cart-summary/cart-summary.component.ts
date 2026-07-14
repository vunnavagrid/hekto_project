import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-cart-summary',
  standalone: true,
  templateUrl: './cart-summary.component.html',
  styleUrl: './cart-summary.component.scss',
})
export class CartSummaryComponent {
  subtotal = input.required<number>();
  shippingFlat = input<number>(15);
  freeShippingThreshold = input<number>(200);

  checkout = output<void>();

  readonly shipping = computed(() =>
    this.subtotal() >= this.freeShippingThreshold() ? 0 : this.shippingFlat()
  );

  readonly total = computed(() => this.subtotal() + this.shipping());
}
