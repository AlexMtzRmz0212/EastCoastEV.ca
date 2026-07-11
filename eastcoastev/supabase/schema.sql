-- EastCoastEV catalog schema
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).
-- Safe to re-run: objects are created with "if not exists" where possible.

-- ============================================================
-- TABLES
-- ============================================================

create table if not exists brands (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  website_url text,
  sort_order int not null default 0,
  is_active boolean not null default true
);

create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,          -- 'e-bikes', 'e-scooters', 'e-dirt-bikes', 'e-trikes'
  name text not null,
  sort_order int not null default 0
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  brand_id uuid not null references brands(id),
  category_id uuid not null references categories(id),
  slug text unique not null,          -- e.g. 'niu-kqi3-pro'
  name text not null,
  tagline text,
  description text,
  price_cents int,                    -- NULL => "Contact for price"
  specs jsonb not null default '{}',  -- { "Range": "50 km", "Top speed": "32 km/h", ... }
  is_published boolean not null default true,
  is_featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists product_colors (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  name text not null,
  hex text,                           -- swatch color, e.g. '#1a1a1a'
  sort_order int not null default 0,
  unique (product_id, name)
);

create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  color_id uuid references product_colors(id) on delete set null,  -- NULL = generic shot
  storage_path text not null,         -- 'niu/kqi3-pro/gray-1.webp' in bucket product-images
  alt text,
  sort_order int not null default 0
);

create table if not exists reservations (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id),
  color_id uuid references product_colors(id),
  customer_name text not null,
  email text not null,
  phone text,
  message text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- Catalog tables: anyone may read published/active rows.
-- Reservations: NO anon access at all — the api/reserve serverless
-- function inserts with the service-role key, which bypasses RLS.
-- "authenticated" full-access policies are the hook for the future
-- owner-only admin page (Supabase Auth login).
-- ============================================================

alter table brands enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table product_colors enable row level security;
alter table product_images enable row level security;
alter table reservations enable row level security;

drop policy if exists "public read" on brands;
create policy "public read" on brands for select using (is_active);

drop policy if exists "public read" on categories;
create policy "public read" on categories for select using (true);

drop policy if exists "public read" on products;
create policy "public read" on products for select using (is_published);

drop policy if exists "public read" on product_colors;
create policy "public read" on product_colors for select using (true);

drop policy if exists "public read" on product_images;
create policy "public read" on product_images for select using (true);

drop policy if exists "owner all" on brands;
create policy "owner all" on brands for all to authenticated using (true) with check (true);

drop policy if exists "owner all" on categories;
create policy "owner all" on categories for all to authenticated using (true) with check (true);

drop policy if exists "owner all" on products;
create policy "owner all" on products for all to authenticated using (true) with check (true);

drop policy if exists "owner all" on product_colors;
create policy "owner all" on product_colors for all to authenticated using (true) with check (true);

drop policy if exists "owner all" on product_images;
create policy "owner all" on product_images for all to authenticated using (true) with check (true);

drop policy if exists "owner all" on reservations;
create policy "owner all" on reservations for all to authenticated using (true) with check (true);

-- ============================================================
-- STORAGE
-- Public bucket for product photos; reads are public via URL,
-- writes happen only through the service-role key (seed script /
-- future admin uploads).
-- ============================================================

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;
