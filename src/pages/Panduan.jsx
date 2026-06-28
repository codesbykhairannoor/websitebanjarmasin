import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RouteAccessibilityMap from '../components/RouteAccessibilityMap';

// Katalog Hotel Spesifik (Tanpa Pengulangan di Hero)
const hotelCategories = {
  "Riverfront": [
    {
      name: "Swiss-Belhotel Borneo",
      stars: "⭐️⭐️⭐️⭐️",
      price: "Mulai Rp 650.000 / malam",
      location: "Jl. Pangeran Antasari No. 86",
      desc: "Satu-satunya hotel bintang empat di Banjarmasin dengan akses dermaga kelotok pribadi dan teras restoran terbuka yang menghadap langsung ke aktivitas Sungai Martapura.",
      tag: "Dermaga Pribadi",
      img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      mapsUrl: "https://maps.google.com/?q=Swiss-Belhotel+Borneo+Banjarmasin"
    },
    {
      name: "Summer Bed & Breakfast",
      stars: "⭐️⭐️",
      price: "Mulai Rp 320.000 / malam",
      location: "Jl. Veteran Sungai Bilu",
      desc: "Penginapan boutique berdesain interior kayu estetik. Punya kafe rooftop kekinian yang menjadi spot favorit pelancong muda untuk bersantai menikmati sunset sungai.",
      tag: "Boutique Rooftop",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
      mapsUrl: "https://maps.google.com/?q=Summer+Bed+and+Breakfast+Banjarmasin"
    }
  ],
  "Siring": [
    {
      name: "Favehotel Kapt. Tendean",
      stars: "⭐️⭐️⭐️",
      price: "Mulai Rp 380.000 / malam",
      location: "Jl. Kapten Piere Tendean No. 10",
      desc: "Lokasi terbaik untuk pejalan kaki! Tepat di seberang Menara Pandang dan Siring Tendean. Keluar lobi hotel langsung masuk ke pusat keramaian wisata sungai dan jajanan.",
      tag: "1 Mnt ke Siring",
      img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
      mapsUrl: "https://maps.google.com/?q=Favehotel+Banjarmasin"
    },
    {
      name: "Victoria Hotel River View",
      stars: "⭐️⭐️⭐️",
      price: "Mulai Rp 350.000 / malam",
      location: "Jl. Lambung Mangkurat No. 48",
      desc: "Berada di pusat pemerintahan kota dengan pemandangan muara sungai yang tenang serta akses mudah ke pusat kuliner malam.",
      tag: "Pusat Kota",
      img: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
      mapsUrl: "https://maps.google.com/?q=Hotel+Victoria+Banjarmasin"
    }
  ],
  "Bisnis": [
    {
      name: "Rattan Inn & Resort",
      stars: "⭐️⭐️⭐️⭐️",
      price: "Mulai Rp 700.000 / malam",
      location: "Jl. A. Yani Km 5.7",
      desc: "Nuansa resort tropis dengan kolam renang luas ala Bali. Sangat dekat dengan akses jalan protokol menuju Bandara Syamsudin Noor.",
      tag: "Resort & Bisnis",
      img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
      mapsUrl: "https://maps.google.com/?q=Rattan+Inn+Banjarmasin"
    },
    {
      name: "Galaxy Hotel Banjarmasin",
      stars: "⭐️⭐️⭐️⭐️",
      price: "Mulai Rp 680.000 / malam",
      location: "Jl. A. Yani Km 2.5",
      desc: "Pusat kuliner Chinese & Western eksklusif di dalam hotel, berada di titik strategis pusat perdagangan dan perbelanjaan kota.",
      tag: "Kuliner Premium",
      img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
      mapsUrl: "https://maps.google.com/?q=Galaxy+Hotel+Banjarmasin"
    }
  ]
};

// Data FAQ Wisatawan
const faqList = [
  {
    question: "Kapan waktu terbaik mengunjungi Pasar Terapung Lok Baintan?",
    answer: "Waktu terbaik adalah subuh pukul 05.30 - 07.30 WITA saat matahari terbit dan aktivitas transaksi jual beli di atas perahu jukung tradisional sedang berada di puncak keramaian."
  },
  {
    question: "Apakah pembayaran di transportasi bus BRT dan kelotok bisa cashless?",
    answer: "Bus BRT Trans Banjarbakula sudah 100% mendukung cashless (QRIS & e-Money dengan tarif flat Rp 5.000). Untuk kelotok wisata reguler di Siring sudah mulai menerima QRIS, namun disarankan tetap membawa uang tunai secukupnya untuk carter rombongan atau berbelanja di pasar terapung."
  },
  {
    question: "Bagaimana cara menuju pusat kota dari Bandara Syamsudin Noor jika tiba malam hari?",
    answer: "Bus BRT beroperasi dari bandara hingga pukul 19.00 WITA. Jika Anda tiba di atas jam tersebut, Anda dapat menggunakan taksi resmi bandara atau taksi online dengan tarif berkisar Rp 120.000 - Rp 150.000 menuju pusat kota Banjarmasin."
  },
  {
    question: "Apakah aman menyusuri sungai saat musim hujan?",
    answer: "Sangat aman karena motoris kelotok wisata resmi sudah berpengalaman dan seluruh penumpang diwajibkan mengenakan pelampung (life jacket). Namun hindari susur sungai saat terjadi cuaca ekstrem atau badai angin kencang."
  },
  {
    question: "Bagaimana aturan berpakaian saat mengunjungi tempat ibadah atau situs bersejarah?",
    answer: "Sangat disarankan mengenakan pakaian yang sopan dan tertutup (menutup bahu dan lutut) saat memasuki kawasan Masjid Sultan Suriansyah atau makam bersejarah sebagai bentuk penghormatan terhadap adat istiadat lokal Banjar."
  }
];

export default function Panduan() {
  const [activeHotelTab, setActiveHotelTab] = useState("Riverfront");
  const [copiedNumber, setCopiedNumber] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = (num) => {
    navigator.clipboard.writeText(num);
    setCopiedNumber(num);
    setTimeout(() => setCopiedNumber(""), 3000);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg-main)]">
      <Navbar />

      {/* =========================================================
          HERO SECTION: THE FLOATING 3D GUIDEBOOK ORNAMENT
          ========================================================= */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 max-w-[1240px] mx-auto min-h-[640px] flex items-center">
        {/* Glow Backgrounds - Hanya di Dark Mode */}
        <div className="hidden dark:block absolute top-1/4 left-10 w-72 h-72 bg-[#00A896]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="hidden dark:block absolute bottom-10 right-10 w-96 h-96 bg-[#F4C038]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
          
          {/* Left Column: Clear High-Impact Typography & Action Anchors */}
          <div className="lg:col-span-7 text-center lg:text-left animate-fadeIn">
            <span className="inline-block bg-[#00A896]/20 text-[#00A896] border border-[#00A896]/40 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] font-heading mb-4">
              ✦ OFFICIAL SURVIVAL GUIDE 2026
            </span>
            <h1 className="text-4xl sm:text-6xl font-black text-[var(--text-main)] font-heading leading-[1.1] mb-6">
              Panduan &amp; Rute <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4C038] via-amber-400 to-[#00A896]">Wisatawan</span>
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-muted)] font-body leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              Satu halaman komprehensif tanpa pengulangan informasi! Pelajari rute bus BRT bandara, kurasi hotel tepi sungai, etika budaya kelotok, hingga nomor panggilan darurat 24 jam.
            </p>

            {/* Quick Navigation Anchors */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
              <button
                onClick={() => scrollToSection('transport')}
                className="px-4 sm:px-5 py-3 rounded-2xl bg-[#F4C038] hover:bg-amber-400 text-[#091422] font-heading font-black text-xs sm:text-sm transition-all shadow-[0_5px_20px_rgba(244,192,56,0.3)] hover:scale-105 flex items-center gap-2"
              >
                <span>✈️</span> Akses &amp; BRT
              </button>
              <button
                onClick={() => scrollToSection('peta-rute')}
                className="px-4 sm:px-5 py-3 rounded-2xl bg-[#00A896] hover:bg-[#008075] text-white font-heading font-black text-xs sm:text-sm transition-all shadow-[0_5px_20px_rgba(0,168,150,0.3)] hover:scale-105 flex items-center gap-2"
              >
                <span>🗺️</span> Peta Rute
              </button>
              <button
                onClick={() => scrollToSection('staycation')}
                className="px-4 sm:px-5 py-3 rounded-2xl bg-[var(--card-bg)] hover:border-[#00A896] text-[var(--text-main)] border border-[var(--glass-border)] font-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow hover:scale-105"
              >
                <span>🏨</span> Hotel Pilihan
              </button>
              <button
                onClick={() => scrollToSection('etika')}
                className="px-4 sm:px-5 py-3 rounded-2xl bg-[var(--card-bg)] hover:border-[#F4C038] text-[var(--text-main)] border border-[var(--glass-border)] font-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow hover:scale-105"
              >
                <span>🌿</span> Etika Budaya
              </button>
              <button
                onClick={() => scrollToSection('darurat')}
                className="px-4 sm:px-5 py-3 rounded-2xl bg-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 font-heading font-black text-xs sm:text-sm transition-all flex items-center gap-2"
              >
                <span>🚨</span> SOS 112
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="px-4 sm:px-5 py-3 rounded-2xl bg-[#00A896]/20 hover:bg-[#00A896] text-[#00A896] hover:text-white border border-[#00A896]/30 font-heading font-black text-xs sm:text-sm transition-all flex items-center gap-2"
              >
                <span>❓</span> FAQ
              </button>
            </div>
          </div>

          {/* Right Column: Decorative Animated 3D Book Graphic ("Cuman Hiasan Buku Animasi") */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <motion.div
              animate={{ y: [-12, 12, -12], rotateZ: [-1, 1, -1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-64 sm:w-80 h-80 sm:h-96 rounded-3xl bg-gradient-to-br from-[#1A2634] via-[#091422] to-[#121E28] border-2 border-[#F4C038]/40 shadow-[0_25px_70px_rgba(0,168,150,0.25)] flex flex-col items-center justify-center p-6 text-center transform -rotate-3"
            >
              {/* Floating Orbiting Badges (Decorative Leaves) */}
              <motion.div
                animate={{ y: [5, -10, 5], x: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 bg-[#F4C038] text-[#091422] p-3.5 rounded-2xl shadow-xl font-black text-2xl border-2 border-white transform rotate-12"
              >
                ✈️
              </motion.div>
              <motion.div
                animate={{ y: [-8, 8, -8], x: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-6 -right-6 bg-[#00A896] text-white p-3.5 rounded-2xl shadow-xl font-black text-2xl border-2 border-white transform -rotate-12"
              >
                🛶
              </motion.div>
              <div className="absolute top-1/2 -right-8 bg-[var(--card-bg)] border border-[var(--glass-border)] text-[var(--text-main)] px-3 py-1.5 rounded-xl text-[10px] font-bold shadow-lg hidden sm:block">
                📍 27 km Bandara
              </div>

              {/* Book Center Illustration */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#F4C038] to-[#00A896] flex items-center justify-center text-5xl shadow-inner mb-4 border-4 border-white/20 animate-pulse">
                📖
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#00A896] mb-1">EDISI RESMI 2026</span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight mb-2">
                Banjarmasin Saku
              </h3>
              <div className="w-12 h-1 bg-[#F4C038] rounded-full mx-auto mb-3" />
              <p className="text-[11px] text-gray-400 font-mono">
                Panduan Bertahan &amp; Eksplorasi Seribu Sungai
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 1 (#transport): ROADMAP TRANSIT BANDARA & RUTE KOTA
          ========================================================= */}
      <section id="transport" className="py-20 max-w-[1240px] mx-auto px-4 sm:px-6 border-t border-[var(--glass-border)]">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fadeIn">
          <span className="text-xs font-black uppercase tracking-widest text-[#00A896] font-heading block mb-2">
            ✦ ROADMAP KEDATANGAN &amp; TRANSIT
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-main)] font-heading mb-3">
            Alur Kedatangan &amp; <span className="text-[#F4C038]">Transit Kota</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body">
            Simulasi langkah demi langkah yang saling terhubung dari mendarat di bandara hingga menyusuri sungai dengan kelotok.
          </p>
        </div>

        {/* 4-Step Connected Interactive Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Step 1 */}
          <div className="bg-[var(--card-bg)] border border-[var(--glass-border)] p-6 rounded-3xl relative overflow-hidden group hover:border-[#F4C038] transition-all shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">🛬</span>
                <span className="w-8 h-8 rounded-full bg-[#F4C038] text-[#091422] font-black font-heading text-sm flex items-center justify-center shadow">1</span>
              </div>
              <span className="text-[10px] font-black bg-[#F4C038]/20 text-[#F4C038] px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                Kedatangan Udara
              </span>
              <h3 className="text-lg font-black text-[var(--text-main)] font-heading mb-2">
                Bandara Syamsudin Noor
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                Terletak di Banjarbaru (27 km dari pusat kota). Waktu tempuh normal menuju Banjarmasin berkisar <strong>45 - 60 menit</strong>.
              </p>
            </div>
            <div className="pt-3 border-t border-[var(--glass-border)] flex items-center justify-between text-[11px] font-bold">
              <span className="text-[#00A896]">🚕 ± Rp 150k</span>
              <a href="https://maps.google.com/?q=Bandara+Syamsudin+Noor" target="_blank" rel="noopener noreferrer" className="bg-[#F4C038]/15 hover:bg-[#F4C038] text-[#F4C038] hover:text-[#091422] px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 border border-[#F4C038]/30">
                <span>🗺️</span> Maps ➔
              </a>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[var(--card-bg)] border border-[var(--glass-border)] p-6 rounded-3xl relative overflow-hidden group hover:border-[#00A896] transition-all shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">🚌</span>
                <span className="w-8 h-8 rounded-full bg-emerald-400 text-[#091422] font-black font-heading text-sm flex items-center justify-center shadow">2</span>
              </div>
              <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                Opsi Hemat Backpacker
              </span>
              <h3 className="text-lg font-black text-[var(--text-main)] font-heading mb-2">
                Bus BRT Banjarbakula
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                Naik bus BRT dari halte bandara menuju <strong>Terminal Gambut Barakat (Km 17)</strong>. Bayar praktis pakai QRIS / e-Money.
              </p>
            </div>
            <div className="pt-3 border-t border-[var(--glass-border)] flex items-center justify-between text-[11px] font-bold">
              <span className="text-[#F4C038]">🎟️ Rp 5.000</span>
              <a href="https://maps.google.com/?q=Terminal+Gambut+Barakat+Km+17" target="_blank" rel="noopener noreferrer" className="bg-[#00A896]/15 hover:bg-[#00A896] text-[#00A896] hover:text-white px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 border border-[#00A896]/30">
                <span>🗺️</span> Maps ➔
              </a>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[var(--card-bg)] border border-[var(--glass-border)] p-6 rounded-3xl relative overflow-hidden group hover:border-[#F4C038] transition-all shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">🏙️</span>
                <span className="w-8 h-8 rounded-full bg-cyan-400 text-[#091422] font-black font-heading text-sm flex items-center justify-center shadow">3</span>
              </div>
              <span className="text-[10px] font-black bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                Transit Pusat Kota
              </span>
              <h3 className="text-lg font-black text-[var(--text-main)] font-heading mb-2">
                Menuju Siring Tendean
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                Dari Km 17, lanjutkan bus rute koridor pusat kota turun di halte Siring Menara Pandang atau Pasar Sudimampir.
              </p>
            </div>
            <div className="pt-3 border-t border-[var(--glass-border)] flex items-center justify-between text-[11px] font-bold">
              <span className="text-[#00A896]">📍 Siring Km 0</span>
              <a href="https://maps.google.com/?q=Menara+Pandang+Banjarmasin" target="_blank" rel="noopener noreferrer" className="bg-[#F4C038]/15 hover:bg-[#F4C038] text-[#F4C038] hover:text-[#091422] px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 border border-[#F4C038]/30">
                <span>🗺️</span> Maps ➔
              </a>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-[var(--card-bg)] border border-[var(--glass-border)] p-6 rounded-3xl relative overflow-hidden group hover:border-[#00A896] transition-all shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">🛶</span>
                <span className="w-8 h-8 rounded-full bg-purple-400 text-[#091422] font-black font-heading text-sm flex items-center justify-center shadow">4</span>
              </div>
              <span className="text-[10px] font-black bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                Eksplorasi Perairan
              </span>
              <h3 className="text-lg font-black text-[var(--text-main)] font-heading mb-2">
                Sewa Kelotok Wisata
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                Dermaga Siring melayani susur sungai reguler. Untuk carter rombongan subuh ke Pasar Terapung Lok Baintan muat hingga 15 orang.
              </p>
            </div>
            <div className="pt-3 border-t border-[var(--glass-border)] flex items-center justify-between text-[11px] font-bold">
              <span className="text-[#F4C038]">🚤 ± Rp 400k</span>
              <a href="https://maps.google.com/?q=Dermaga+Kelotok+Siring+Banjarmasin" target="_blank" rel="noopener noreferrer" className="bg-[#00A896]/15 hover:bg-[#00A896] text-[#00A896] hover:text-white px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 border border-[#00A896]/30">
                <span>🗺️</span> Maps ➔
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 2 (#peta-rute): RADAR AKSESIBILITAS & PETA TERPADU
          ========================================================= */}
      <section id="peta-rute" className="py-20 max-w-[1240px] mx-auto px-4 sm:px-6 border-t border-[var(--glass-border)]">
        <RouteAccessibilityMap />
      </section>

      {/* =========================================================
          SECTION 2 (#staycation): KURASI PENGINAPAN SPESIFIK
          ========================================================= */}
      <section id="staycation" className="py-20 max-w-[1240px] mx-auto px-4 sm:px-6 border-t border-[var(--glass-border)]">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fadeIn">
          <span className="text-xs font-black uppercase tracking-widest text-[#F4C038] font-heading block mb-2">
            ✦ WHERE TO STAY IN BANJARMASIN
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-main)] font-heading mb-3">
            Kurasi <span className="text-[#00A896]">Penginapan Pilihan</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body">
            Pilih kategori penginapan sesuai selera liburanmu: dari pemandangan sungai langsung hingga akses jalan kaki ke landmark.
          </p>
        </div>

        {/* Interactive Spotlight Category Tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {Object.keys(hotelCategories).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveHotelTab(cat)}
              className={`px-6 py-3 rounded-2xl font-heading font-black text-xs sm:text-sm transition-all border flex items-center gap-2 ${
                activeHotelTab === cat
                  ? "bg-[#F4C038] text-[#091422] border-[#F4C038] shadow-[0_0_20px_rgba(244,192,56,0.4)] scale-105"
                  : "bg-[var(--card-bg)] text-[var(--text-muted)] border-[var(--glass-border)] hover:border-[#00A896]"
              }`}
            >
              <span>{cat === "Riverfront" ? "🌅 Riverfront View" : cat === "Siring" ? "🚶‍♂️ Jalan Kaki ke Siring" : "🏢 Resort & Bisnis"}</span>
            </button>
          ))}
        </div>

        {/* Horizontal Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {hotelCategories[activeHotelTab].map((hotel, hIdx) => (
            <div
              key={hIdx}
              className="bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl overflow-hidden shadow-xl hover:border-[#00A896] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={hotel.img}
                    alt={hotel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-white text-[10px] font-black px-3 py-1 rounded-full border border-white/20">
                    {hotel.tag}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-[#F4C038] text-[#091422] font-black text-xs px-3.5 py-1.5 rounded-full shadow-lg">
                    {hotel.price}
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black text-[var(--text-main)] font-heading">
                      {hotel.name}
                    </h3>
                    <span className="text-sm">{hotel.stars}</span>
                  </div>
                  <p className="text-xs text-[#00A896] font-bold mb-4 flex items-center gap-1.5">
                    <span>📍</span> {hotel.location}
                  </p>
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-body">
                    {hotel.desc}
                  </p>
                </div>
              </div>
              <div className="p-6 sm:p-8 pt-0">
                <a
                  href={hotel.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 rounded-2xl bg-[var(--bg-main)] hover:bg-[#00A896] text-[var(--text-main)] hover:text-white border border-[var(--glass-border)] text-xs font-bold transition-all flex items-center justify-center gap-2 shadow"
                >
                  <span>🗺️</span> Buka Lokasi di Google Maps ➔
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          SECTION 3 (#etika): ETIKA SUNGAI (DO'S & DON'TS FOKUS)
          ========================================================= */}
      <section id="etika" className="py-20 max-w-[1240px] mx-auto px-4 sm:px-6 border-t border-[var(--glass-border)]">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fadeIn">
          <span className="text-xs font-black uppercase tracking-widest text-[#00A896] font-heading block mb-2">
            ✦ CULTURAL ETIQUETTE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-main)] font-heading mb-3">
            Aturan Main <span className="text-[#F4C038]">Seribu Sungai</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body">
            Hormati alam dan adat istiadat setempat agar liburanmu selalu disambut senyuman hangat oleh masyarakat lokal Banjar.
          </p>
        </div>

        {/* Full-width 2-Column Side-by-Side Do's vs Don'ts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* DO'S Card */}
          <div className="bg-emerald-500/10 border-2 border-emerald-500/40 p-8 rounded-3xl space-y-5 shadow-xl transition-all hover:border-emerald-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-emerald-400 font-black font-heading text-lg sm:text-xl pb-4 border-b border-emerald-500/20">
                <span className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-xl">✅</span>
                <span>DO'S (Sangat Dianjurkan)</span>
              </div>
              <ul className="space-y-4 text-sm sm:text-base text-[var(--text-main)] font-body leading-relaxed pt-2">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-extrabold text-lg">•</span>
                  <span><strong>Wajib pakai pelampung</strong> (life jacket) selama berada di atas perahu kelotok demi keselamatan.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-extrabold text-lg">•</span>
                  <span>Sapa pedagang wanita dengan panggilan sopan <strong>"Acil"</strong> atau pedagang pria dengan <strong>"Paman"</strong> disertai senyuman ramah.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-extrabold text-lg">•</span>
                  <span>Berpakaian sopan dan tertutup saat mengunjungi situs religius seperti Masjid Bersejarah Sultan Suriansyah.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-400 font-extrabold text-lg">•</span>
                  <span>Menawar barang di Pasar Terapung dengan nada lembut dan wajar sebagai bagian dari interaksi budaya.</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-500/20 text-xs font-bold text-emerald-400 font-mono">
              💡 Nilai plus untuk keramaian dan tata krama
            </div>
          </div>

          {/* DON'TS Card */}
          <div className="bg-rose-500/10 border-2 border-rose-500/40 p-8 rounded-3xl space-y-5 shadow-xl transition-all hover:border-rose-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-rose-400 font-black font-heading text-lg sm:text-xl pb-4 border-b border-rose-500/20">
                <span className="w-10 h-10 rounded-2xl bg-rose-500/20 flex items-center justify-center text-xl">❌</span>
                <span>DON'TS (Pantangan Keras)</span>
              </div>
              <ul className="space-y-4 text-sm sm:text-base text-[var(--text-main)] font-body leading-relaxed pt-2">
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-extrabold text-lg">•</span>
                  <span><strong>HARAM membuang sampah ke sungai!</strong> Sungai adalah urat nadi kehidupan dan kehormatan warga Banjarmasin.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-extrabold text-lg">•</span>
                  <span>Jangan berdiri mendadak, melompat, atau menggoyangkan perahu kelotok saat berpapasan dengan kapal besar.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-extrabold text-lg">•</span>
                  <span>Hindari mengeluarkan kata-kata kasar atau menghina tradisi lokal saat berada di area publik dan pemukiman sungai.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-400 font-extrabold text-lg">•</span>
                  <span>Jangan memotret warga lokal dari jarak dekat tanpa izin terlebih dahulu, terutama saat aktivitas pribadi di sungai.</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-rose-500/20 text-xs font-bold text-rose-400 font-mono">
              ⚠️ Pelanggaran etika berdampak pada kenyamanan bersama
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 4 (#darurat): PUSAT HOTLINE DARURAT 24 JAM
          ========================================================= */}
      <section id="darurat" className="py-20 max-w-[1240px] mx-auto px-4 sm:px-6 border-t border-[var(--glass-border)]">
        <div className="bg-gradient-to-r from-[#1A2634] via-[#091422] to-[#1A2634] border-2 border-[#E63946]/50 rounded-[36px] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#E63946]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
            <span className="inline-block bg-[#E63946] text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest mb-3 animate-pulse">
              🚨 TOURIST EMERGENCY HOTLINE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading mb-3">
              Layanan Bantuan <span className="text-[#F4C038]">Siaga 24 Jam</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-body">
              Tekan tombol salin di bawah ini saat kondisi darurat. Seluruh layanan terintegrasi dengan petugas siaga Pemerintah Kota Banjarmasin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            
            {/* 112 Banjarmasin Pintar */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center hover:border-[#F4C038] transition-all flex flex-col justify-between">
              <div>
                <span className="text-4xl block mb-3">📞</span>
                <h3 className="text-3xl font-black text-white font-heading mb-1">112</h3>
                <p className="text-xs font-bold text-[#F4C038] uppercase tracking-wider mb-3">Call Center Pemkot</p>
                <p className="text-[11px] text-gray-300 leading-relaxed mb-6">
                  Layanan terpadu bebas pulsa 24 jam untuk ambulans medis darurat, pemadam kebakaran, dan penyelamatan.
                </p>
              </div>
              <button
                onClick={() => handleCopy("112")}
                className="w-full py-3.5 rounded-xl bg-[#F4C038] hover:bg-white text-[#091422] font-black text-xs transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {copiedNumber === "112" ? "✅ Tersalin!" : "📋 Salin Nomor 112"}
              </button>
            </div>

            {/* Polisi Air / Polairud */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center hover:border-[#00A896] transition-all flex flex-col justify-between">
              <div>
                <span className="text-4xl block mb-3">🚤</span>
                <h3 className="text-3xl font-black text-white font-heading mb-1">110</h3>
                <p className="text-xs font-bold text-[#00A896] uppercase tracking-wider mb-3">Polairud &amp; Kamtibmas</p>
                <p className="text-[11px] text-gray-300 leading-relaxed mb-6">
                  Unit kepolisian khusus pengamanan perairan Sungai Martapura &amp; Barito. Siaga membantu kendala perahu wisata.
                </p>
              </div>
              <button
                onClick={() => handleCopy("110")}
                className="w-full py-3.5 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white font-black text-xs transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {copiedNumber === "110" ? "✅ Tersalin!" : "📋 Salin Nomor 110"}
              </button>
            </div>

            {/* RSUD Ulin */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center hover:border-[#E63946] transition-all flex flex-col justify-between">
              <div>
                <span className="text-4xl block mb-3">🏥</span>
                <h3 className="text-2xl font-black text-white font-heading mb-1">(0511) 3252180</h3>
                <p className="text-xs font-bold text-[#E63946] uppercase tracking-wider mb-3">RSUD Ulin Banjarmasin</p>
                <p className="text-[11px] text-gray-300 leading-relaxed mb-6">
                  Rumah sakit rujukan tingkat provinsi terlengkap di pusat kota (Jl. A. Yani Km 2.5) dengan fasilitas IGD modern 24 jam.
                </p>
              </div>
              <button
                onClick={() => handleCopy("05113252180")}
                className="w-full py-3.5 rounded-xl bg-[#E63946] hover:bg-red-700 text-white font-black text-xs transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {copiedNumber === "05113252180" ? "✅ Tersalin!" : "📋 Salin Nomor RSUD"}
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5 (#faq): PERTANYAAN UMUM WISATAWAN (FAQ)
          ========================================================= */}
      <section id="faq" className="py-20 max-w-[1000px] mx-auto px-4 sm:px-6 border-t border-[var(--glass-border)]">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fadeIn">
          <span className="text-xs font-black uppercase tracking-widest text-[#00A896] font-heading block mb-2">
            ✦ NEED HELP? WE GOT YOU COVERED
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-main)] font-heading mb-3">
            Pertanyaan <span className="text-[#F4C038]">Umum (FAQ)</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body">
            Temukan jawaban cepat atas pertanyaan yang paling sering diajukan oleh wisatawan sebelum berkunjung ke Banjarmasin.
          </p>
        </div>

        {/* Interactive Accordion FAQ */}
        <div className="space-y-4">
          {faqList.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[var(--card-bg)] border-[#F4C038] shadow-[0_10px_30px_rgba(244,192,56,0.1)]"
                    : "bg-[var(--card-bg)]/60 border-[var(--glass-border)] hover:border-[#00A896]/60"
                }`}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-6 text-left font-heading font-black text-sm sm:text-base text-[var(--text-main)] flex items-center justify-between gap-4"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#00A896]/20 text-[#00A896] flex items-center justify-center text-xs font-black shrink-0">
                      Q{idx + 1}
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <span className={`text-lg transition-transform duration-300 shrink-0 ${isOpen ? "transform rotate-180 text-[#F4C038]" : "text-[var(--text-muted)]"}`}>
                    ▼
                  </span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-2 text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed border-t border-[var(--glass-border)]/50">
                        <p className="pl-11">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}
