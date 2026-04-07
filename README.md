# ARKON Konstruksi — Website + CMS

Website konstruksi premium dengan CMS lengkap, dibangun dengan **Next.js 14** + **Supabase**.

## Fitur CMS

| Fitur | Keterangan |
|-------|-----------|
| 🔐 Login Admin | Auth dengan JWT, proteksi semua halaman /admin |
| 📁 Proyek | CRUD lengkap + upload foto cover & galeri |
| 📝 Blog | Editor artikel + upload gambar + draft/publish |
| 👥 Tim | Kelola anggota tim + foto profil |
| 💬 Testimoni | Kelola testimoni + rating + foto klien |
| 🖼️ Media Library | Upload, browse, copy URL, hapus gambar |
| ⚙️ Pengaturan | Edit nama, telepon, email, sosmed, alamat |

## Setup (5 Langkah)

### 1. Buat Supabase Project
- Buka **supabase.com** → New Project
- Simpan: Project URL, anon key, service role key

### 2. Jalankan SQL Schema
- Buka Supabase Dashboard → SQL Editor
- Copy-paste isi file `supabase-schema.sql` → Run

### 3. Buat Storage Bucket
- Supabase Dashboard → Storage → New Bucket
- Nama: `media`, centang **Public bucket** → Save

### 4. Set Environment Variables di Vercel
```
NEXT_PUBLIC_SUPABASE_URL     = https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJ...
SUPABASE_SERVICE_ROLE_KEY    = eyJ...
ADMIN_EMAIL                  = admin@perusahaan.com
ADMIN_PASSWORD               = password_kuat_anda
JWT_SECRET                   = random_string_min_32_karakter
```

### 5. Redeploy di Vercel
Push perubahan ke GitHub → Vercel auto-deploy.

## Akses CMS

Setelah deploy:
```
https://domain-anda.com/admin
```

Login dengan `ADMIN_EMAIL` dan `ADMIN_PASSWORD` yang sudah diset.

## Struktur URL Admin

| URL | Fungsi |
|-----|--------|
| `/admin` | Dashboard |
| `/admin/projects` | Kelola proyek |
| `/admin/blog` | Kelola artikel |
| `/admin/team` | Kelola tim |
| `/admin/testimonials` | Kelola testimoni |
| `/admin/media` | Media library |
| `/admin/settings` | Pengaturan situs |

## Development Lokal

```bash
# Copy env
cp .env.example .env.local
# Edit .env.local dengan kredensial Supabase

npm install
npm run dev
```

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database + Storage**: Supabase (PostgreSQL + Object Storage)
- **Auth**: JWT dengan jose
- **Styling**: Tailwind CSS
- **Deploy**: Vercel
