export interface Brand {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  website_url: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  sort_order: number;
}

export interface Product {
  id: string;
  brand_id: string;
  category_id: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  price_cents: number | null;
  specs: Record<string, string>;
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface ProductColor {
  id: string;
  product_id: string;
  name: string;
  hex: string | null;
  sort_order: number;
}

export interface ProductImage {
  id: string;
  product_id: string;
  color_id: string | null;
  storage_path: string;
  alt: string | null;
  sort_order: number;
}

export interface ProductWithRelations extends Product {
  brand: Brand;
  category: Category;
  colors: ProductColor[];
  images: ProductImage[];
}
