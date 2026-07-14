import { Component, input } from '@angular/core';
import { BlogPost } from '../../../core/types/blog.model';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss',
})
export class BlogCardComponent {
  post = input.required<BlogPost>();
}
