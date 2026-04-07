-- ============================================================
-- ARKON Konstruksi - Supabase Schema
-- Jalankan ini di Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── PROJECTS ──────────────────────────────────────────────
create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  title text not null,
  subtitle text default '',
  slug text not null unique,
  category text default '',
  location text default '',
  area text default '',
  duration text default '',
  year int default extract(year from now()),
  status text default 'ongoing' check (status in ('completed','ongoing','upcoming')),
  client text default '',
  description text default '',
  full_description text default '',
  cover_image text,
  images text[] default '{}',
  tags text[] default '{}',
  featured boolean default false,
  value text,
  architect text
);

-- ── SERVICES ──────────────────────────────────────────────
create table if not exists services (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  title text not null,
  subtitle text default '',
  slug text not null unique,
  description text default '',
  full_description text default '',
  icon text default 'Home',
  cover_image text,
  features text[] default '{}',
  process jsonb default '[]',
  featured boolean default false,
  "order" int default 0
);

-- ── BLOG POSTS ────────────────────────────────────────────
create table if not exists blog_posts (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  title text not null,
  slug text not null unique,
  excerpt text default '',
  content text default '',
  author text default '',
  author_image text,
  category text default '',
  tags text[] default '{}',
  cover_image text,
  published_at timestamptz default now(),
  featured boolean default false,
  read_time int default 5,
  published boolean default false
);

-- ── TEAM ──────────────────────────────────────────────────
create table if not exists team (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  name text not null,
  role text default '',
  bio text default '',
  image text,
  "order" int default 0,
  linkedin text,
  instagram text
);

-- ── TESTIMONIALS ──────────────────────────────────────────
create table if not exists testimonials (
  id uuid primary key default uuid_generate_v4(),
  created_at timestamptz default now(),
  name text not null,
  role text default '',
  company text default '',
  content text default '',
  rating int default 5 check (rating between 1 and 5),
  image text,
  project_id uuid references projects(id) on delete set null,
  featured boolean default false
);

-- ── SETTINGS ──────────────────────────────────────────────
create table if not exists settings (
  id uuid primary key default uuid_generate_v4(),
  updated_at timestamptz default now(),
  key text not null unique,
  value text default ''
);

-- ── STORAGE BUCKETS ───────────────────────────────────────
-- Jalankan di Supabase Dashboard > Storage:
-- Buat bucket bernama "media" dengan setting Public

-- ── RLS POLICIES ──────────────────────────────────────────
-- Public read access
alter table projects enable row level security;
alter table services enable row level security;
alter table blog_posts enable row level security;
alter table team enable row level security;
alter table testimonials enable row level security;
alter table settings enable row level security;

create policy "Public read projects" on projects for select using (true);
create policy "Public read services" on services for select using (true);
create policy "Public read blog" on blog_posts for select using (published = true);
create policy "Public read team" on team for select using (true);
create policy "Public read testimonials" on testimonials for select using (true);
create policy "Public read settings" on settings for select using (true);

-- Service role full access (untuk admin)
create policy "Service role all projects" on projects using (auth.role() = 'service_role');
create policy "Service role all services" on services using (auth.role() = 'service_role');
create policy "Service role all blog" on blog_posts using (auth.role() = 'service_role');
create policy "Service role all team" on team using (auth.role() = 'service_role');
create policy "Service role all testimonials" on testimonials using (auth.role() = 'service_role');
create policy "Service role all settings" on settings using (auth.role() = 'service_role');

-- ── DEFAULT SETTINGS ──────────────────────────────────────
insert into settings (key, value) values
  ('site_name', 'ARKON Konstruksi'),
  ('tagline', 'Membangun Impian, Menciptakan Warisan'),
  ('description', 'Perusahaan konstruksi premium terpercaya dengan pengalaman lebih dari 15 tahun.'),
  ('phone', '+62 21 5555 7890'),
  ('email', 'info@arkonstruksi.com'),
  ('address', 'Menara Sudirman, Lt. 12 Suite A, Jakarta Selatan 12190'),
  ('city', 'Jakarta'),
  ('instagram', ''),
  ('linkedin', ''),
  ('facebook', ''),
  ('youtube', ''),
  ('whatsapp', '')
on conflict (key) do nothing;
