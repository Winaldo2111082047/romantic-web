# 🌹 Romantic Web App

Aplikasi web romantis berbasis Next.js App Router, Tailwind CSS, Prisma, PostgreSQL (Neon), dan Cloudinary. Dirancang dengan UI/UX mobile-first untuk memberikan pengalaman interaktif yang emosional dan estetik.

## 🚀 Deployment Guide (Vercel)

Aplikasi ini sudah dioptimalkan dan siap di-deploy ke Vercel.

### 1. Persiapan Database (Neon)
1. Buat akun di [Neon.tech](https://neon.tech/)
2. Buat project baru (PostgreSQL)
3. Salin `DATABASE_URL` dari dashboard Neon. (Pastikan menggunakan *pooled connection* atau format standar Neon).

### 2. Persiapan Penyimpanan Gambar (Cloudinary)
1. Buat akun di [Cloudinary](https://cloudinary.com/)
2. Buka Dashboard, salin kredensial berikut:
   - Cloud Name
   - API Key
   - API Secret

### 3. Deploy ke Vercel
1. Push kode ini ke GitHub/GitLab/Bitbucket repositori Anda.
2. Buka [Vercel](https://vercel.com/) dan buat Project baru.
3. Import repositori Anda.
4. Di bagian **Environment Variables**, tambahkan variabel berikut:
   - `DATABASE_URL` (dari Neon)
   - `CLOUDINARY_CLOUD_NAME` (dari Cloudinary)
   - `CLOUDINARY_API_KEY`
   - `CLOUDINARY_API_SECRET`
5. Di bagian **Build Command**, pastikan perintahnya adalah:
   ```bash
   npx prisma generate && next build
   ```
   *(Catatan: Anda bisa mengubahnya di Vercel Settings > Build & Development Settings jika diperlukan, namun default Vercel biasanya sudah cukup asal script `postinstall` atau command build diperbarui, tapi Vercel akan otomatis mendeteksi Next.js. Sebaiknya update `package.json` scripts).*
6. Klik **Deploy**.

### 4. Setup Database Schema di Vercel
Karena ini menggunakan database produksi baru (Neon), Anda perlu membuat tabel.
Setelah deploy selesai, pergi ke tab **Settings > Environment Variables** di Vercel, salin URL database, lalu jalankan di terminal lokal Anda (opsional, jika ingin push schema dari lokal ke produksi):
```bash
npx prisma db push
```
Atau, Anda bisa menambahkan script di `package.json` untuk menjalankan migrate secara otomatis saat build (hati-hati untuk production).

## 🛠 Teknologi
- Next.js 14 (App Router)
- Tailwind CSS
- Framer Motion
- Prisma ORM
- Cloudinary
