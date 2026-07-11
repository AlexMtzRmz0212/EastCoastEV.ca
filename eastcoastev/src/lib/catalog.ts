import { supabase, supabaseUrl } from './supabase';
import type { Brand, Category, ProductWithRelations } from './types';

export function imageUrl(storagePath: string): string {
  return `${supabaseUrl}/storage/v1/object/public/product-images/${storagePath}`;
}

export function formatPrice(cents: number | null): string {
  if (cents == null) return 'Contact for price';
  const whole = cents % 100 === 0;
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: whole ? 0 : 2,
    maximumFractionDigits: whole ? 0 : 2,
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
