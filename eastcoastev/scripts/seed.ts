/**
 * Seeds the EastCoastEV catalog into Supabase.
 *
 * For each product in seed-data.ts it:
 *   1. fetches the manufacturer's live Shopify product JSON,
 *   2. downloads the official photos and uploads them to the
 *      `product-images` Storage bucket (re-hosted, not hotlinked),
 *   3. upserts brand / category / product / color / image rows.
 *
 * Run from the eastcoastev/ directory (schema.sql must already be applied):
 *   npx tsx --env-file=.env.local scripts/seed.ts
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment.
 * Idempotent: re-running replaces a product's colors/images and updates its row.
 */
import { createClient } from '@supabase/supabase-js';
import {
  BRANDS,
  CATEGORIES,
  PRODUCTS,
  STORE_BASE,
  type SeedProduct,
} from './seed-data.ts';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = 'product-images';

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error(
    'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.\n' +
      'Run: npx tsx --env-file=.env.local scripts/seed.ts',
  );
  process.exit(1);
}

const db = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/["']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function extFromUrl(url: string): string {
  const clean = url.split('?')[0];
  const m = clean.match(/\.(webp|jpg|jpeg|png|avif)$/i);
  return m ? m[1].toLowerCase().replace('jpeg', 'jpg') : 'jpg';
}

function contentType(ext: string): string {
  return ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;
}

interface ShopifyImage {
  src: string;
}
interface ShopifyVariant {
  title: string;
  featured_image: { src: string } | null;
}
interface ShopifyProduct {
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  options: { name: string; values: string[] }[];
}

async function fetchProduct(store: keyof typeof STORE_BASE, handle: string) {
  const url = `${STORE_BASE[store]}/products/${handle}.json`;
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (EastCoastEV seed script)' },
  });
  if (!res.ok) throw new Error(`fetch ${url} → HTTP ${res.status}`);
  const { product } = (await res.json()) as { product: ShopifyProduct };
  return product;
}

async function downloadAndUpload(
  imageUrl: string,
  storagePath: string,
): Promise<void> {
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`download ${imageUrl} → HTTP ${res.status}`);
  const bytes = new Uint8Array(await res.arrayBuffer());
  const ext = extFromUrl(imageUrl);
  const { error } = await db.storage
    .from(BUCKET)
    .upload(storagePath, bytes, {
      contentType: contentType(ext),
      upsert: true,
    });
  if (error) throw new Error(`upload ${storagePath} → ${error.message}`);
}

// Map a Shopify variant's "Color / Size" title to its color name.
function variantColorName(variantTitle: string, colorValues: string[]): string | null {
  const parts = variantTitle.split(' / ').map(p => p.trim());
  for (const part of parts) {
    const hit = colorValues.find(c => c.toLowerCase() === part.toLowerCase());
    if (hit) return hit;
  }
  return null;
}

async function upsertReturningId(
  table: string,
  match: Record<string, unknown>,
  row: Record<string, unknown>,
): Promise<string> {
  // Look up by unique key, update or insert, return id.
  const { data: existing } = await db
    .from(table)
    .select('id')
    .match(match)
    .maybeSingle();
  if (existing) {
    const { error } = await db.from(table).update(row).eq('id', existing.id);
    if (error) throw new Error(`update ${table} → ${error.message}`);
    return existing.id as string;
  }
  const { data, error } = await db
    .from(table)
    .insert(row)
    .select('id')
    .single();
  if (error) throw new Error(`insert ${table} → ${error.message}`);
  return data.id as string;
}

async function seedBrandsAndCategories() {
  const brandIds: Record<string, string> = {};
  for (const b of BRANDS) {
    brandIds[b.slug] = await upsertReturningId('brands', { slug: b.slug }, { ...b, is_active: true });
  }
  const categoryIds: Record<string, string> = {};
  for (const c of CATEGORIES) {
    categoryIds[c.slug] = await upsertReturningId('categories', { slug: c.slug }, c);
  }
  console.log(`✓ ${BRANDS.length} brands, ${CATEGORIES.length} categories`);
  return { brandIds, categoryIds };
}

async function seedProduct(
  product: SeedProduct,
  brandId: string,
  categoryId: string,
  index: number,
) {
  const live = await fetchProduct(product.source.store, product.source.handle);
  const colorValues = product.colors.map(c => c.name);

  // 1. Upsert the product row.
  const productId = await upsertReturningId(
    'products',
    { slug: product.slug },
    {
      brand_id: brandId,
      category_id: categoryId,
      slug: product.slug,
      name: product.name,
      tagline: product.tagline,
      description: product.description,
      price_cents: product.priceCents,
      specs: product.specs,
      is_published: true,
      is_featured: product.isFeatured,
      sort_order: index,
    },
  );

  // 2. Replace colors + images for a clean re-run.
  await db.from('product_images').delete().eq('product_id', productId);
  await db.from('product_colors').delete().eq('product_id', productId);

  const colorIds: Record<string, string> = {};
  for (let i = 0; i < product.colors.length; i++) {
    const c = product.colors[i];
    const { data, error } = await db
      .from('product_colors')
      .insert({ product_id: productId, name: c.name, hex: c.hex, sort_order: i })
      .select('id')
      .single();
    if (error) throw new Error(`insert color → ${error.message}`);
    colorIds[c.name] = data.id;
  }

  // 3. Figure out which image belongs to which color (from variant featured
  //    images), and collect the rest as generic gallery shots.
  const colorImage: Record<string, string> = {};
  for (const v of live.variants) {
    if (!v.featured_image) continue;
    const colorName = variantColorName(v.title, colorValues);
    if (colorName && !colorImage[colorName]) {
      colorImage[colorName] = v.featured_image.src;
    }
  }

  const used = new Set<string>();
  const imageRows: {
    product_id: string;
    color_id: string | null;
    storage_path: string;
    alt: string;
    sort_order: number;
  }[] = [];
  let order = 0;

  // Per-color hero shots first.
  for (const c of product.colors) {
    const src = colorImage[c.name];
    if (!src || used.has(src)) continue;
    used.add(src);
    const ext = extFromUrl(src);
    const path = `${product.brandSlug}/${product.slug}/${slugify(c.name)}-1.${ext}`;
    await downloadAndUpload(src, path);
    imageRows.push({
      product_id: productId,
      color_id: colorIds[c.name],
      storage_path: path,
      alt: `${product.name} — ${c.name}`,
      sort_order: order++,
    });
  }

  // Generic gallery shots (cap so we don't pull dozens of images).
  let generic = 0;
  for (const img of live.images) {
    if (used.has(img.src) || generic >= 5) continue;
    used.add(img.src);
    generic++;
    const ext = extFromUrl(img.src);
    const path = `${product.brandSlug}/${product.slug}/gallery-${generic}.${ext}`;
    await downloadAndUpload(img.src, path);
    imageRows.push({
      product_id: productId,
      color_id: null,
      storage_path: path,
      alt: `${product.name}`,
      sort_order: order++,
    });
  }

  if (imageRows.length > 0) {
    const { error } = await db.from('product_images').insert(imageRows);
    if (error) throw new Error(`insert images → ${error.message}`);
  }

  console.log(
    `✓ ${product.name} (${product.colors.length} colors, ${imageRows.length} images)`,
  );
}

async function main() {
  console.log('Seeding EastCoastEV catalog…\n');
  const { brandIds, categoryIds } = await seedBrandsAndCategories();

  let ok = 0;
  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i];
    try {
      await seedProduct(p, brandIds[p.brandSlug], categoryIds[p.categorySlug], i);
      ok++;
    } catch (err) {
      console.error(`✗ ${p.name}: ${err instanceof Error ? err.message : err}`);
    }
  }

  console.log(`\nDone — ${ok}/${PRODUCTS.length} products seeded.`);
  if (ok < PRODUCTS.length) process.exit(1);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
