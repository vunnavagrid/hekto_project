import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Breadcrumb {
  label: string;
  link?: string;
}

@Component({
  selector: 'app-page-title',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './page-title.component.html',
  styleUrl: './page-title.component.scss',
})
export class PageTitleComponent {
  title = input.required<string>();
  breadcrumbs = input<Breadcrumb[]>([{ label: 'Home', link: '/' }]);
}
