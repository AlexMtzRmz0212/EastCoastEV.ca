/**
 * Seeds the EastCoastEV catalog into Supabase.
 *
 * For each product in seed-data.ts it:
 *   1. collects the product's photos, either by fetching the manufacturer's
 *      live Shopify product JSON (`source`) or from manually supplied files
 *      and URLs (`images`) for brands whose store has no usable feed,
 *   2. uploads them to the `product-images` Storage bucket (re-hosted, not
 *      hotlinked),
 *   3. upserts brand / category / product / color / image rows.
 *
 * A product with neither `source` nor `images` seeds its row with no photos
 * and logs a warning, so a new brand can go live before its pictures arrive.
 *
 * Run from the eastcoastev/ directory (schema.sql must already be applied):
 *   npx tsx --env-file=.env.local scripts/seed.ts
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in the environment.
 * Idempotent: re-running replaces a product's colors/images and updates its row.
 */
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
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
// Where manually supplied photos live, for brands with no usable Shopify feed.
const LOCAL_IMAGE_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'product-images',
);

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

// Works for both URLs (may carry a query string) and plain file paths.
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

async function fetchBytes(imageUrl: string): Promise<Uint8Array> {
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`download ${imageUrl} → HTTP ${res.status}`);
  return new Uint8Array(await res.arrayBuffer());
}

async function uploadBytes(
  bytes: Uint8Array,
  storagePath: string,
  ext: string,
): Promise<void> {
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

/**
 * A photo we intend to store, with its bytes not yet loaded. Both the Shopify
 * path and the manual path produce these, so everything downstream — storage
 * paths, ordering, the cap on gallery shots — stays in one place.
 */
interface PendingImage {
  colorName: string | null;
  alt: string | null;
  ext: string;
  /** Distinguishes photos so the same source isn't stored twice. */
  key: string;
  load: () => Promise<Uint8Array>;
}

/** Photos from the manufacturer's live Shopify product JSON. */
async function pendingFromShopify(product: SeedProduct): Promise<PendingImage[]> {
  const source = product.source!;
  const live = await fetchProduct(source.store, source.handle);
  const colorValues = product.colors.map(c => c.name);

  // Which image belongs to which color, taken from the variants' featured images.
  const colorImage: Record<string, string> = {};
  for (const v of live.variants) {
    if (!v.featured_image) continue;
    const colorName = variantColorName(v.title, colorValues);
    if (colorName && !colorImage[colorName]) {
      colorImage[colorName] = v.featured_image.src;
    }
  }

  const pending: PendingImage[] = [];
  for (const c of product.colors) {
    const src = colorImage[c.name];
    if (!src) continue;
    pending.push({
      colorName: c.name,
      alt: `${product.name}, ${c.name}`,
      ext: extFromUrl(src),
      key: src,
      load: () => fetchBytes(src),
    });
  }
  // Everything else becomes a generic gallery shot.
  for (const img of live.images) {
    pending.push({
      colorName: null,
      alt: product.name,
      ext: extFromUrl(img.src),
      key: img.src,
      load: () => fetchBytes(img.src),
    });
  }
  return pending;
}

/** Photos supplied by hand, for brands whose store has no usable feed. */
function pendingFromManual(product: SeedProduct): PendingImage[] {
  const colorNames = new Set(product.colors.map(c => c.name));

  return product.images!.map((img, i) => {
    if (!!img.file === !!img.url) {
      throw new Error(
        `images[${i}]: set exactly one of "file" or "url" (got ${
          img.file && img.url ? 'both' : 'neither'
        })`,
      );
    }
    // A typo here would silently detach the photo from its swatch, so fail loudly.
    if (img.color && !colorNames.has(img.color)) {
      throw new Error(
        `images[${i}]: color "${img.color}" is not one of this product's colors ` +
          `(${[...colorNames].join(', ') || 'none'})`,
      );
    }

    const ref = img.file ?? img.url!;
    const alt = img.alt ?? (img.color ? `${product.name}, ${img.color}` : product.name);
    return {
      colorName: img.color ?? null,
      alt,
      ext: extFromUrl(ref),
      key: ref,
      load: img.file
        ? () => readFile(path.join(LOCAL_IMAGE_DIR, img.file!))
            .then(b => new Uint8Array(b))
            .catch(err => {
              throw new Error(
                `read scripts/product-images/${img.file} → ${
                  err instanceof Error ? err.message : err
                }`,
              );
            })
        : () => fetchBytes(img.url!),
    };
  });
}

async function collectImages(product: SeedProduct): Promise<PendingImage[]> {
  if (product.source) return pendingFromShopify(product);
  if (product.images?.length) return pendingFromManual(product);
  return [];
}

async function seedProduct(
  product: SeedProduct,
  brandId: string,
  categoryId: string,
  index: number,
) {
  // 0. Work out where the photos come from BEFORE touching the database. This
  //    step does the network fetch for Shopify-sourced products and validates
  //    manual entries, and both can fail; doing it first means a product whose
  //    manufacturer handle has gone 404 keeps the rows it already had instead
  //    of being stripped of its images on every run.
  const pending = await collectImages(product);

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
      is_published: product.isPublished ?? true,
      is_featured: product.isFeatured,
      sort_order: index,
    },
  );

  // 2. Replace colors + images for a clean re-run. Check the errors: deleting a
  //    color is blocked while a reservation still references it (reservations
  //    must use ON DELETE SET NULL for this to succeed), and a swallowed failure
  //    here resurfaces as a confusing duplicate-key error on the re-insert below.
  const { error: delImagesError } = await db
    .from('product_images')
    .delete()
    .eq('product_id', productId);
  if (delImagesError) throw new Error(`delete images → ${delImagesError.message}`);
  const { error: delColorsError } = await db
    .from('product_colors')
    .delete()
    .eq('product_id', productId);
  if (delColorsError) throw new Error(`delete colors → ${delColorsError.message}`);

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

  // 3. Store the photos: per-color hero shots first, then a capped run of
  //    generic gallery shots.
  const used = new Set<string>();
  const imageRows: {
    product_id: string;
    color_id: string | null;
    storage_path: string;
    alt: string;
    sort_order: number;
  }[] = [];
  let order = 0;
  let generic = 0;
  const seenColors = new Set<string>();

  for (const img of pending) {
    if (used.has(img.key)) continue;

    let storagePath: string;
    if (img.colorName) {
      // One hero shot per color; extra photos for a color fall through as gallery.
      if (seenColors.has(img.colorName)) continue;
      seenColors.add(img.colorName);
      storagePath = `${product.brandSlug}/${product.slug}/${slugify(img.colorName)}-1.${img.ext}`;
    } else {
      if (generic >= 5) continue; // don't pull dozens of images
      generic++;
      storagePath = `${product.brandSlug}/${product.slug}/gallery-${generic}.${img.ext}`;
    }

    used.add(img.key);
    await uploadBytes(await img.load(), storagePath, img.ext);
    imageRows.push({
      product_id: productId,
      color_id: img.colorName ? colorIds[img.colorName] : null,
      storage_path: storagePath,
      alt: img.alt ?? product.name,
      sort_order: order++,
    });
  }

  if (imageRows.length > 0) {
    const { error } = await db.from('product_images').insert(imageRows);
    if (error) throw new Error(`insert images → ${error.message}`);
  }

  if (imageRows.length === 0) {
    // Not a failure: a brand can go live before its photos arrive.
    console.warn(
      `! ${product.name} (${product.colors.length} colors, no photos yet — ` +
        `add an \`images\` array or drop files in scripts/product-images/${product.brandSlug}/${product.slug}/)`,
    );
  } else {
    console.log(
      `✓ ${product.name} (${product.colors.length} colors, ${imageRows.length} images)`,
    );
  }
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

  // Renaming or dropping a product leaves its old row behind, still published
  // and still on /shop. Report those rather than delete them: the owner may
  // have added a row by hand in the Supabase dashboard that isn't in this file.
  const { data: liveRows } = await db.from('products').select('slug,name');
  const knownSlugs = new Set(PRODUCTS.map(p => p.slug));
  const orphans = (liveRows ?? []).filter(r => !knownSlugs.has(r.slug as string));
  if (orphans.length > 0) {
    console.warn(
      `\n! ${orphans.length} product(s) in the database but not in seed-data.ts:\n` +
        orphans.map(o => `    ${o.name} (${o.slug})`).join('\n') +
        '\n  Delete them in the Supabase dashboard if they are leftovers.',
    );
  }

  console.log(`\nDone: ${ok}/${PRODUCTS.length} products seeded.`);
  if (ok < PRODUCTS.length) process.exit(1);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
