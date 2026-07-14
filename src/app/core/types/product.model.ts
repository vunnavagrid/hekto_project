export interface Product {
  id: string;
  name: string;
  slug: string;
  image: string;
  images?: string[];
  price: number;
  oldPrice?: number;
  rating: number; // 0–5
  reviewCount?: number;
  brand?: string;
  category: string;
  description?: string;
  detailHighlights?: string[];
  inStock: boolean;
  tag?: 'sale' | 'new' | 'hot';
}
