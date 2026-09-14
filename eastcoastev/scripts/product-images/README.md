# Manual product photos

Most of the catalog gets its photos automatically: `scripts/seed.ts` reads the
`source` field on a product and pulls the official images straight from the
manufacturer's Shopify store.

Some manufacturers don't expose a usable feed. Throne lists its e-motos without
color options or per-variant photos, and Surron Canada's product feed is almost
entirely spare parts — the complete bikes live on custom pages. Those products
get their photos from here instead.

## Adding photos for a product

1. Drop the files in `<brand-slug>/<product-slug>/`, for example:

   ```
   scripts/product-images/sur-ron/sur-ron-light-bee-x/carbon-black.webp
   scripts/product-images/sur-ron/sur-ron-light-bee-x/gallery-1.webp
   ```

   Use `.webp`, `.jpg`, `.png`, or `.avif`. The folder names are only for your
   own tidiness — what actually matters is the path you write in step 2.

2. Point the product at them in `scripts/seed-data.ts`:

   ```ts
   images: [
     { file: 'sur-ron/sur-ron-light-bee-x/carbon-black.webp', color: 'Carbon Black' },
     { file: 'sur-ron/sur-ron-light-bee-x/gallery-1.webp' },
   ],
   ```

   An entry with a `color` becomes that swatch's hero shot and must match one of
   the product's `colors` exactly — the seeder stops with an error on a typo
   rather than quietly detaching the photo from its swatch. Entries without a
   `color` become generic gallery shots (first five are kept).

   You can use `{ url: 'https://…' }` instead of `file` to pull an image from
   the web; it gets re-hosted in Supabase Storage the same way, never hotlinked.

3. Run `npm run seed`.

A product with no `source` and no `images` still seeds — it just has no photos
and the seeder prints a warning, so a new brand can go live before its
pictures arrive.

## Before you upload

These are the manufacturers' photographs. Only re-host images the shop has the
right to use, which normally follows from the dealer relationship. If in doubt
for a given brand, ask them first.

Files in this folder are committed to the repo, so keep them reasonably sized
(under ~500 KB each is plenty).
