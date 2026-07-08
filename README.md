# Visit Banjarmasin 🌊

Portal Eksplorasi Wisata & Budaya Kota Seribu Sungai (Banjarmasin, Kalimantan Selatan).
Website ini merupakan sebuah sistem informasi pariwisata modern yang dibangun menggunakan framework **Next.js 15 (App Router)**.

## Fitur Utama 🚀
- **Super Fast & SEO Optimized:** Dibangun di atas arsitektur Server-Side Rendering (SSR) & Static Site Generation (SSG) untuk performa dan SEO maksimal.
- **Multilingual Support (i18n):** Mendukung 4 bahasa (Indonesia, English, Melayu, dan Mandarin/Chinese). 
- **Light & Dark Mode:** Mendukung mode terang dan gelap dengan preferensi tema yang tersimpan secara lokal.
- **Background Music Player:** Fitur *audio player global* yang memutar instrumen musik tradisional Sape' / Panting agar pengunjung bisa merasakan *vibes* Kalimantan secara langsung.
- **Smart City Map:** Peta interaktif tempat wisata, kuliner, dan budaya yang tertanam di halaman Smart City.
- **CMS Lokal Terintegrasi:** Memiliki Dashboard Admin (`/admin`) untuk mengelola Konten Blog dan Event tanpa butuh *database external*.
- **Mobile-First Design:** Antarmuka modern *glassmorphism* yang super responsif, terutama pada layar *smartphone*.

## Stack Teknologi 💻
- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (dengan custom CSS Variables di index.css)
- **Animations:** Framer Motion
- **Icons & Map:** Leaflet (React-Leaflet) untuk peta interaktif
- **PWA Ready:** Menggunakan next-pwa

## Struktur Direktori Penting 📂
- `/src/app/[lang]`: Direktori utama aplikasi dengan dukungan *routing* bahasa.
- `/src/components`: Semua komponen *reusable* (Navbar, Footer, SEO, AudioPlayer, dll).
- `/src/data`: Tempat penyimpanan file `.json` sebagai *database* lokal (CMS).
- `/public`: Aset statis seperti gambar (.webp) dan ikon.
- `/src/translations`: Berisi file dictionary untuk penerjemahan (i18n).

## Cara Menjalankan Secara Lokal 🛠️
1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan development server:
   ```bash
   npm run dev
   ```
3. Buka `http://localhost:3000` di *browser*.

*Mari lestarikan keindahan budaya Kalimantan Selatan dan tingkatkan pariwisata Nusantara!*
