# 🛑 ANTI-AI SLOP: DESIGN SYSTEM & UI/UX GUIDELINES (DESIGN.md)
**Project:** Portal Pariwisata & Budaya Kota Banjarmasin (*The City of a Thousand Rivers*)  
**Status:** Blueprint Landasan Kerja AI (Strict Rules)

---

## 1. ⚔️ DEKLARASI ANTI-AI SLOP (*Core Philosophy*)

Website ini **DILARANG KERAS** menggunakan pola standar hasil *generate* AI generatif yang membosankan (*AI Slop*). Setiap komponen harus dirancang dengan prinsip **Craftsmanship & Human Intentionality**.

### Aturan Paten yang Pantang Dilanggar:
1. **❌ NO "Purple/Indigo SaaS Cliché":** Dilarang menggunakan palet standar AI (Indigo `#6366f1`, Ungu Violet, atau biru generik Tailwind).
2. **❌ NO "Symmetrical 3-Card Grid":** Dilarang membuat layout kaku berupa Hero Section tengah -> 3 kotak kartu fitur sejajar yang monoton.
3. **❌ NO "Cold Mathematical Spacing":** Dilarang memberi margin/padding seragam di semua tempat tanpa hirarki visual. Ruang kosong (*whitespace*) harus diatur estetis untuk memberi "napas" pada konten.
4. **❌ NO "Generic Placeholder Look":** Dilarang menampilkan desain datar (*flat*) tanpa tekstur budaya lokal.

---

## 2. 🎨 CURATED DESIGN TOKENS (*Borneo River Elegance*)

### A. Palet Warna Paten (Tailwind Custom Extension / Vanilla CSS Variables)
* **`--martapura-night` (`#091422`):** Background utama dark mode. Memberikan kedalaman malam di tepian sungai.
* **`--sasirangan-gold` (`#F4C038`):** Warna aksen utama untuk Heading penting, tombol CTA, dan border highlight.
* **`--borneo-emerald` (`#008075`):** Warna sekunder representasi hutan tropis dan air sungai Kalimantan.
* **`--glass-river` (`rgba(255, 255, 255, 0.07)`):** Kartu berlatar kaca buram (*Frosted Glass*) dengan backdrop blur.

### B. Tipografi (*Character Pairing*)
* **Headings (`Outfit`):** Geometris modern, memberikan kesan megah pada judul destinasi seperti *“Pasar Terapung Lok Baintan”*.
* **Body (`Inter`):** Tingkat keterbacaan tinggi untuk penjelasan sejarah, kuliner, dan panduan wisata.

---

## 3. 📐 STRUKTUR LAYOUT ASIMETRIS (*Bento & Fluid Flow*)

1. **🌊 Hero Section Dinamis:**
   * Judul rata kiri (*Asymmetric Left-Aligned*) dengan aksen kaligrafi/sasirangan emas.
   * Efek visual mengalir (*fluid river waves*) di bagian bawah hero.
2. **🍱 Profil Kota Bergaya Bento Grid:**
   * Kombinasi kotak ukuran dinamis untuk menampilkan data: **1.000+ Sungai**, **Sejarah 1526**, dan **Budaya Jukung**.
3. **🍛 Kuliner Showcase (Tactile Cards):**
   * Kartu hidangan dengan badge unik dan micro-interaction zoom saat kursor mendekat.

---

## 4. ✨ TACTILE MICRO-INTERACTIONS (*Human Touch*)

* **Tombol CTA:** Saat ditekan (*active*), wajib memiliki efek `transform: scale(0.98)` agar terasa seperti tombol fisik yang nyata.
* **Hover State:** Kartu wisata memiliki transisi `duration-300` dengan perubahan warna border menjadi Sasirangan Gold menyala.
