# EastCoastEV — Catalog & Backend Setup

The site is a React + Vite SPA (in this `eastcoastev/` folder) with a Supabase
backend for the product catalog and reservations. This guide covers the
one-time setup the owner needs to do.

## 1. Create the Supabase project

1. Sign up at [supabase.com](https://supabase.com) and create a new project
   (free tier is fine). Pick a region close to Eastern Canada.
2. In **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql) and run it. This creates the
   tables, row-level-security policies, and the public `product-images`
   Storage bucket.
3. In **Project → Settings → API**, copy:
   - **Project URL** → used for both `VITE_SUPABASE_URL` and `SUPABASE_URL`
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ secret — server only)

## 2. Local environment

Fill in [`.env.local`](.env.local) (already gitignored) with the four Supabase
values plus the two Gmail values used by the email functions. Then:

```bash
npm install
npm run seed     # researches + downloads official photos, uploads to Supabase, fills the catalog
npm run dev      # http://localhost:5199
```

`npm run seed` is idempotent — re-run it any time to refresh the catalog.

To exercise the reserve form end-to-end locally (it needs the serverless
function), use `npm run dev:api` (`vercel dev`) instead of `npm run dev`.

## 3. GitHub Pages preview (for showing the customer)

Pushing to the `development` branch auto-deploys a static preview to
`https://alexmtzrmz0212.github.io/EastCoastEV.ca/` via
[`.github/workflows/gh-pages.yml`](../.github/workflows/gh-pages.yml).

One-time setup in the GitHub repo:
- **Settings → Pages → Build and deployment → Source: GitHub Actions**
- **Settings → Secrets and variables → Actions** → add `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_ANON_KEY` (so the preview can read the catalog).

The preview is static, so the reserve form runs in **demo mode** — it confirms
success without sending an email. Real reservations work on Vercel.

## 4. Vercel production deploy

- **Project → Settings → General → Root Directory: `eastcoastev`** (this lets
  Vercel auto-detect the Vite build *and* the `api/` serverless functions).
- **Project → Settings → Environment Variables** — add all six:
  `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_URL`,
  `SUPABASE_SERVICE_ROLE_KEY`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`.

SPA routing + function detection are handled by
[`vercel.json`](vercel.json).

## Notes

- **Product photos** are the manufacturers' official images, re-hosted in
  Supabase Storage. The store owner has confirmed authorized-dealer rights to
  use NIU, E-Ride Pro, Yozma, and Univelo/AIMA product imagery.
- **Prices** are intentionally blank (they show "Contact for price") until the
  owner sets dealer pricing. Specs in `scripts/seed-data.ts` are a researched
  starting point — confirm before launch.
- A future **owner-only admin page** (`/admin`) will use Supabase Auth to let
  the owner add/edit products, colors, prices, and images and view
  reservations. The schema and RLS policies are already set up for it.
