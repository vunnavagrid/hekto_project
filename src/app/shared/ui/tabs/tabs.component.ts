import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  standalone: true,
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
})
export class TabsComponent {
  tabs = input.required<string[]>();
  activeIndex = input<number>(0);

  indexChange = output<number>();

  select(index: number): void {
    if (index === this.activeIndex()) return;
    this.indexChange.emit(index);
  }
}
