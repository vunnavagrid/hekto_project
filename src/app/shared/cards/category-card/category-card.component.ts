import { Component, input } from '@angular/core';
import { Category } from '../../../core/types/category.model';

@Component({
  selector: 'app-category-card',
  standalone: true,
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss',
})
export class CategoryCardComponent {
  category = input.required<Category>();
}
