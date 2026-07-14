# Hekto — Angular 20 E-commerce UI

A complete standalone-components Angular 20 rebuild of the Hekto design
(Figma-only — the deprecated mockups were used solely to understand page
flow, not styling).

## Run locally

```bash
npm install
npm start
```

Then open http://localhost:4200.

> **Note:** this project was authored in a sandboxed environment without
> network access, so `npm install` / `ng build` could not be executed here
> to produce a verified build log. Every file was written and manually
> cross-checked (selectors, `imports: [...]` arrays vs. template usage,
> SCSS partial import paths, signal API usage, route wiring) against
> standard Angular 20 standalone-component conventions. Please run
> `npm install && npm start` locally as the final verification step.

## Pages

| Route           | Page            | Notes                                                                                                                          |
| --------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `/`             | Home            | Hero, Featured/Latest/Trending product rails, Unique Features banner, Discount banner, Top Categories, Newsletter, Latest Blog |
| `/products`     | Product Listing | List View ⇄ Grid View toggle, sidebar filters (brand/rating/category/price), sort, items-per-page, pagination                  |
| `/products/:id` | Product Details | Image gallery with thumbnails, qty + add to cart, tabs (Description / Additional Info / Reviews / Video), Related Products     |
| `/cart`         | Cart            | Editable line items, live subtotal/shipping/total, or the Empty Cart state when there are no items                             |

## Architecture

```
src/
├─ styles/                  Design tokens (_variables, _mixins) + global styles.scss
└─ app/
   ├─ core/
   │  ├─ models/            Product, Category, BlogPost, CartItem
   │  ├─ services/          ProductService (mock data), CartService (signal-based cart state)
   │  └─ mock-data/         products.mock, categories.mock, blogs.mock
   ├─ layout/                Header, Footer, PageTitleBar — shared by every page
   ├─ shared/                Reusable UI: RatingStars, ProductCard, ProductListItem,
   │                         CategoryCard, BlogCard, PromoBanner, Newsletter,
   │                         SidebarFilter, Pagination, QuantitySelector,
   │                         CartItem, CartSummary, Tabs, EmptyState
   └─ pages/                 Home, ProductList, ProductDetails, Cart
```

No component is duplicated: `ProductCard` is reused across Home, Grid View,
and Related Products; `PromoBanner` is one config-driven component powering
the Hero slider, "Unique Features" band, and "Discount Item" banner;
`PageTitleBar` is reused on Products/Product Details/Cart; `RatingStars` is
reused everywhere a star rating appears.

## State & mock data

- `CartService` is signal-based (`items`, `itemCount`, `subtotal` are
  computed signals) and is pre-seeded with a few mock items so the Cart page
  has real content on first load. Removing all items reveals the **Cart
  Empty** state automatically — there's no separate "empty cart" route, it's
  the same page reacting to state.
- `ProductService` exposes mock product data as observables; the Product
  Listing page converts the initial fetch into signals and does real,
  working client-side filtering/sorting/pagination against the mock catalog
  (not static placeholder UI).
- Images use `picsum.photos` placeholder URLs — swap for real product
  photography when available.

## Assumptions made

- Exact hex values, font files, and spacing weren't extractable pixel-by-pixel
  from the screenshots, so the indigo/purple + pink-magenta palette, the
  Jost/Poppins type pairing, and the spacing scale in `_variables.scss` were
  inferred to closely match the visual style shown (purple topbar, lavender
  section backgrounds, pill-shaped buttons, rounded cards) and applied
  consistently everywhere.
- "Additional Info" (specs table), "Reviews" (review list), and "Video" tab
  content on Product Details aren't shown in the source screenshots in
  detail, so reasonable mock content/layout was authored for each.
- Checkout, login, wishlist, and search are out of scope per the brief
  (mock data only, no backend) — the cart's "Proceed to Checkout" button
  shows a mock confirmation rather than navigating to a real checkout flow.
