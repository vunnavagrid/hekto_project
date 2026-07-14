import { Injectable, computed, signal } from '@angular/core';
import { CartItem } from '../types/cart-item.model';
import { Product } from '../types/product.model';
import { PRODUCTS_MOCK } from '../data/products.mock';

function seedCart(): CartItem[] {
  const find = (id: string) => PRODUCTS_MOCK.find((p) => p.id === id);
  return [find('p1'), find('p2'), find('p8')]
    .filter((p): p is Product => !!p)
    .map((product) => ({ product, quantity: 1 }));
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsSignal = signal<CartItem[]>(seedCart());

  readonly items = this.itemsSignal.asReadonly();

  readonly itemCount = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this.itemsSignal().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  add(product: Product, quantity = 1): void {
    this.itemsSignal.update((items) => {
      const existing = items.find((i) => i.product.id === product.id);
      if (existing) {
        return items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...items, { product, quantity }];
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity < 1) {
      this.remove(productId);
      return;
    }
    this.itemsSignal.update((items) =>
      items.map((i) => (i.product.id === productId ? { ...i, quantity } : i))
    );
  }

  remove(productId: string): void {
    this.itemsSignal.update((items) => items.filter((i) => i.product.id !== productId));
  }

  clear(): void {
    this.itemsSignal.set([]);
  }
}
