# Aturan Desain & Pengembangan Agent (Mobile-First Policy)

## 1. Wajib Mobile-First & Super Responsive
- Setiap tata letak (*layout*) section wajib dirancang dengan filosofi **Mobile-First**.
- Pastikan tampilan di perangkat seluler (HP / layar di bawah `768px`) terlihat rapi, proporsional, tidak ada elemen bertumpuk (*overlapping*), dan tidak ada *horizontal scrollbar* yang tidak disengaja.
- Navbar pada mobile wajib memiliki navigasi yang bersih dan fungsional (tidak boleh ada tombol atau teks yang terpotong/rusak).

## 2. Tata Letak Anti-Bento & Anti-Grid Monoton
- Hindari penggunaan grid statis atau bento grid yang berulang pada setiap section agar web tidak terasa membosankan atau seperti *template AI*.
- Untuk sajian konten berganda (seperti kuliner atau peta wisata), gunakan interaksi dinamis seperti **Interactive Spotlight Tabs** atau **Horizontal Showcase Card** yang elegan dan tetap sempurna saat ditampilkan di layar seluler.

## 3. Light & Dark Mode Consistency
- DILARANG KERAS menanamkan kelas statis seperti 	ext-white,  g-black, 	ext-slate-200, dll secara langsung (hardcode) pada teks atau kontainer utama.
- Wajib selalu menggunakan CSS variables (contoh:  ar(--text-main),  ar(--card-bg),  ar(--text-muted)) agar elemen dapat beradaptasi secara otomatis pada pergantian tema Terang/Gelap.
- Pastikan state tema disimpan secara global (misal: di localStorage) agar preferensi tema tidak reset saat navigasi pindah halaman.

## 4. Git Workflow (Wajib Push)
- **Selalu Commit & Push**: Setiap kali sebuah fitur selesai diimplementasikan atau modifikasi kode selesai dilakukan, WAJIB melakukan perintah `git add .`, `git commit -m "..."`, dan `git push` ke repository secara otomatis tanpa perlu menunggu instruksi lanjutan dari user.
- Berikan pesan commit yang deskriptif dan profesional.
