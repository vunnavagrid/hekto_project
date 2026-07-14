import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss',
})
export class NewsletterComponent {
  email = signal('');
  submitted = signal(false);

  onSubmit(): void {
    if (!this.email().trim()) return;
    // Mock-only: no backend wired up.
    this.submitted.set(true);
    this.email.set('');
  }
}
