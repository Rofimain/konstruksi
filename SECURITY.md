# Security Checklist

## Wajib Dilakukan Sebelum Production

### Environment Variables
- [ ] `ADMIN_EMAIL` — gunakan email asli, bukan admin@example.com
- [ ] `ADMIN_PASSWORD` — minimal 16 karakter, kombinasi huruf/angka/simbol
- [ ] `JWT_SECRET` — random string minimal 32 karakter
  - Generate: `openssl rand -base64 32`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` — jangan pernah expose ke frontend
- [ ] Semua env vars sudah diset di Vercel Dashboard

### Supabase
- [ ] RLS (Row Level Security) aktif di semua tabel
- [ ] Storage bucket `media` sudah dibuat dan Public
- [ ] Service role key HANYA digunakan di server-side
- [ ] Anon key boleh di frontend (sudah di NEXT_PUBLIC_)

### Password
- [ ] Ganti dari password default
- [ ] Gunakan password manager untuk generate password kuat
- [ ] Contoh password kuat: `Ar#K0n$tRuKs1!2024`

### Vercel
- [ ] Environment variables sudah diset (bukan di .env file)
- [ ] Domain sudah pakai HTTPS
- [ ] Source maps dimatikan (productionBrowserSourceMaps: false)

## Hal yang TIDAK BOLEH Dilakukan

❌ Commit file `.env` atau `.env.local` ke GitHub  
❌ Share `SUPABASE_SERVICE_ROLE_KEY` ke siapapun  
❌ Gunakan password yang mudah ditebak  
❌ Expose `/admin` ke search engine  
❌ Disable rate limiting di production  

## Cara Generate JWT Secret yang Aman

```bash
# Opsi 1: openssl
openssl rand -base64 32

# Opsi 2: Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Opsi 3: Online (gunakan yang terpercaya)
# https://generate-secret.vercel.app/32
```

## Jika Terjadi Breach

1. Segera ganti `ADMIN_PASSWORD` dan `JWT_SECRET` di Vercel
2. Revoke dan regenerate Supabase keys
3. Cek Supabase logs untuk aktivitas mencurigakan
4. Redeploy aplikasi setelah ganti credentials
