import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface FooterLinkGroup {
  title: string;
  links: string[];
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();

  readonly linkGroups: FooterLinkGroup[] = [
    {
      title: 'Categories',
      links: ['Laptop & Computers', 'Headphones', 'Watches & Accessories', 'Home Appliances'],
    },
    {
      title: 'Customer Care',
      links: ['My Account', 'Order Tracking', 'Wish List', 'Customer Service'],
    },
    {
      title: 'Pages',
      links: ['Blog', 'Shop', 'About Us', 'Contact'],
    },
  ];
}
