import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  templateUrl: './quantity-selector.component.html',
  styleUrl: './quantity-selector.component.scss',
})
export class QuantitySelectorComponent {
  value = input.required<number>();
  min = input<number>(1);
  max = input<number>(99);

  valueChange = output<number>();

  decrement(): void {
    const next = this.value() - 1;
    if (next >= this.min()) this.valueChange.emit(next);
  }

  increment(): void {
    const next = this.value() + 1;
    if (next <= this.max()) this.valueChange.emit(next);
  }

  onInput(raw: string): void {
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) return;
    const clamped = Math.min(this.max(), Math.max(this.min(), Math.round(parsed)));
    this.valueChange.emit(clamped);
  }
}
