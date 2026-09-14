import { supabase, supabaseUrl } from './supabase';
import type { Brand, Category, ProductWithRelations } from './types';

export function imageUrl(storagePath: string): string {
  return `${supabaseUrl}/storage/v1/object/public/product-images/${storagePath}`;
}

export function formatPrice(cents: number | null): string {
  if (cents == null) return 'Contact for price';
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}

// The catalog is small, so each dataset is fetched once per session and
// shared between /shop and every product page. A failed fetch clears the
// cached promise so navigation retries instead of pinning the error.
let brandsPromise: Promise<Brand[]> | null = null;
let categoriesPromise: Promise<Category[]> | null = null;
let productsPromise: Promise<ProductWithRelations[]> | null = null;

export function getBrands(): Promise<Brand[]> {
  brandsPromise ??= (async () => {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('sort_order');
    if (error) throw new Error(error.message);
    return (data ?? []) as Brand[];
  })().catch((err: unknown) => {
    brandsPromise = null;
    throw err;
  });
  return brandsPromise;
}

/**
 * Brands that actually have something to show. RLS already hides unpublished
 * products, so a brand whose whole lineup is still a draft would otherwise get
 * a filter chip and a homepage link that lead to an empty shop page. Brands
 * reappear on their own as soon as one of their products goes live.
 */
export async function getBrandsInStock(): Promise<Brand[]> {
  const [brands, products] = await Promise.all([getBrands(), getProducts()]);
  const stocked = new Set(products.map(p => p.brand_id));
  return brands.filter(b => stocked.has(b.id));
}

export function getCategories(): Promise<Category[]> {
  categoriesPromise ??= (async () => {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order');
    if (error) throw new Error(error.message);
    return (data ?? []) as Category[];
  })().catch((err: unknown) => {
    categoriesPromise = null;
    throw err;
  });
  return categoriesPromise;
}

export function getProducts(): Promise<ProductWithRelations[]> {
  productsPromise ??= (async () => {
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('products')
      .select(
        '*, brand:brands(*), category:categories(*), colors:product_colors(*), images:product_images(*)',
      )
      .eq('is_published', true)
      .order('sort_order');
    if (error) throw new Error(error.message);
    const products = (data ?? []) as unknown as ProductWithRelations[];
    for (const product of products) {
      product.colors.sort((a, b) => a.sort_order - b.sort_order);
      product.images.sort((a, b) => a.sort_order - b.sort_order);
    }
    return products;
  })().catch((err: unknown) => {
    productsPromise = null;
    throw err;
  });
  return productsPromise;
}

export async function getProductBySlug(
  slug: string,
): Promise<ProductWithRelations | null> {
  const products = await getProducts();
  return products.find(p => p.slug === slug) ?? null;
}
