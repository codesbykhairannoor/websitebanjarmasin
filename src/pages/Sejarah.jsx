import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Data Section 1: Timeline Interaktif
const timelineData = [
  {
    year: "1526",
    title: "Lahirnya Kesultanan Banjar",
    subtitle: "24 September 1526 — Tonggak Awal Peradaban",
    desc: "Sultan Suriansyah (Raden Samudera) memeluk agama Islam dan mendirikan Kesultanan Banjar di Kuin, Banjarmasin Utara. Peristiwa ini ditetapkan sebagai Hari Jadi Kota Banjarmasin dan menandai awal kejayaan budaya Islam di Nusantara.",
    img: "/sejarah/Kesultanan-Banjar.webp",
    tag: "Awal Mula"
  },
  {
    year: "1606",
    title: "Era Keemasan Bandar Lada",
    subtitle: "Pusat Perdagangan Internasional Nusantara",
    desc: "Banjarmasin berkembang pesat menjadi bandar perdagangan rempah dunia. Kualitas lada Banjar yang masyhur menarik minat kapal-kapal dagang Eropa (VOC Belanda dan Inggris), Tiongkok, hingga Arab untuk bertransaksi di muara Sungai Barito.",
    img: "/profil kota/pelabuhan trisakti.webp",
    tag: "Perdagangan"
  },
  {
    year: "1859",
    title: "Meletusnya Perang Banjar",
    subtitle: "Perlawanan Patriotik Rakyat Semesta",
    desc: "Dicuplik oleh intervensi Belanda terhadap takhta kesultanan, Pangeran Antasari dan Pangeran Hidayatullah memimpin perang gerilya semesta. Perang ini menjadi salah satu perlawanan anti-kolonial terlama dan paling merugikan bagi Belanda.",
    img: "/sejarah/PERANG_BANJAR_1857-1859.webp",
    tag: "Patriotisme"
  },
  {
    year: "1945",
    title: "Gerbang Kemerdekaan & Revolusi",
    subtitle: "Divisi IV ALRI Pertahanan Kalimantan",
    desc: "Masyarakat Banjar berjuang mempertahankan kemerdekaan Republik Indonesia melalui Proklamasi Gubernur ALRI Divisi IV pertahanan Kalimantan oleh Hasan Basry pada 17 Mei 1949, menyatukan Kalimantan ke pangkuan Ibu Pertiwi.",
    img: "/sejarah/bendera-merah-putih.webp",
    tag: "Kemerdekaan"
  },
  {
    year: "Kini",
    title: "Metropolitan Seribu Sungai",
    subtitle: "Kota Baiman (Barasih wan Nyaman)",
    desc: "Banjarmasin terus bertransformasi menjadi kota perdagangan modern dan gerbang logistik Kalimantan, tanpa meninggalkan identitas bahari serta budaya pasar terapung yang mengakar kuat pada peradaban sungai.",
    img: "/sejarah/banjarmasin baiman.webp",
    tag: "Modernitas"
  }
];

// Data Section 4: Perang Banjar Accordion
const perangBanjarData = [
  {
    id: 1,
    title: "Strategi Perang Benteng Sungai",
    date: "1859 - 1862",
    content: "Pejuang Banjar memanfaatkan rute rawa dan sungai-sungai kecil yang rumit sebagai benteng pertahanan alami. Kapal-kapal uap Belanda kerap terjebak di perairan dangkal dan diserang secara dadakan menggunakan perahu jukung berkecepatan tinggi."
  },
  {
    id: 2,
    title: "Tenggelamnya Kapal Onrust",
    date: "26 Desember 1859",
    content: "Di bawah komando Tumenggung Suriawati dan Pangeran Antasari, pejuang Banjar berhasil menenggelamkan kapal perang canggih Belanda, benteng terapung 'Onrust', di Sungai Barito bagian Lontar yang mengguncang mental militer kolonial."
  },
  {
    id: 3,
    title: "Semboyan Waja Sampai Kaputing",
    date: "Sumpah Pangeran Antasari",
    content: "Dalam surat balasan kepada Belanda yang membujuknya menyerah, Pangeran Antasari menegaskan pendiriannya: 'Haram Manyerah Waja Sampai Kaputing'—sebuah tekad baja perjuangan yang pantang padam hingga titik darah penghabisan."
  }
];

const HangingFrame = ({ src, className, width, height }) => {
  return (
    <div className={`group transition-transform duration-700 hover:scale-105 z-10 ${className}`}>
      {/* The Nail */}
      <div className="absolute -top-[68px] left-1/2 -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full shadow-[0_4px_4px_rgba(0,0,0,0.5)] z-20 border-2 border-[#1a1a1a]">
        <div className="absolute inset-[2px] rounded-full bg-[#3a3a3a]"></div>
      </div>
      {/* The String */}
      <svg className="absolute -top-16 left-1/2 -translate-x-1/2 w-full h-16 pointer-events-none drop-shadow-md" viewBox="0 0 100 64" preserveAspectRatio="none">
         <path d="M50 0 L10 64" stroke="#8B5A2B" strokeWidth="2" fill="none" />
         <path d="M50 0 L90 64" stroke="#8B5A2B" strokeWidth="2" fill="none" />
      </svg>
      {/* The Frame */}
      <div className={`border-[10px] sm:border-[16px] border-[#c19a6b] bg-white p-2 sm:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${width} ${height} relative`}>
         <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.5)] pointer-events-none z-10"></div>
         <img src={src} className="w-full h-full object-cover grayscale sepia hover:grayscale-0 hover:sepia-0 transition-all duration-700" alt="Sejarah" loading="lazy" />
      </div>
    </div>
  );
};

export default function Sejarah() {
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      
      {/* =========================================================
          HERO SEJARAH: HANGING FRAMES & TYPOGRAPHY STANDAR
          ========================================================= */}
      <div className="bg-[var(--bg-main)] pt-24 pb-16 overflow-hidden relative border-b border-[var(--glass-border)]">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

        <div className="max-w-[1400px] mx-auto px-4 relative min-h-[640px] lg:min-h-[750px] flex flex-col md:flex-row items-start justify-center pt-4 md:pt-10">
          
          {/* Desktop Left Group (3 Frames) */}
          <div className="hidden md:block absolute left-2 lg:left-8 top-4 w-full max-w-[360px] pointer-events-none">
            {/* Frame 1: Top Left Outer */}
            <div className="pointer-events-auto">
              <HangingFrame 
                src="/sejarah/Kesultanan-Banjar.webp" 
                className="absolute left-0 top-0 -rotate-3"
                width="w-[180px] lg:w-[240px]"
                height="h-[250px] lg:h-[330px]"
              />
            </div>
            {/* Frame 2: Middle Left Inner */}
            <div className="pointer-events-auto">
              <HangingFrame 
                src="/sejarah/PERANG_BANJAR_1857-1859.webp" 
                className="absolute left-28 lg:left-44 top-48 lg:top-60 z-20 rotate-2"
                width="w-[170px] lg:w-[220px]"
                height="h-[230px] lg:h-[290px]"
              />
            </div>
            {/* Frame 3 (NEW): Bottom Left Center */}
            <div className="pointer-events-auto">
              <HangingFrame 
                src="/sejarah/bendera-merah-putih.webp" 
                className="absolute left-8 lg:left-20 top-[360px] lg:top-[450px] z-10 -rotate-2"
                width="w-[160px] lg:w-[210px]"
                height="h-[220px] lg:h-[280px]"
              />
            </div>
          </div>

          {/* Center Column: Pure Clean Typography */}
          <div className="relative z-30 text-center w-full max-w-2xl px-6 py-6 md:py-0 mx-auto bg-[var(--bg-main)]/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none rounded-3xl flex flex-col items-center">
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-2 font-heading animate-fade-in">
              ✦ LINTAS WAKTU 1526 — KINI
            </span>
            <h1 className="hero-title !mb-4 animate-fade-in">
              Menyelami <br/><span className="text-sasirangan">Sejarah</span>
            </h1>
            <p className="hero-subtitle mx-auto !mb-8 !max-w-2xl px-2 animate-fade-in leading-relaxed">
              Berawal dari bandar rempah di muara Sungai Barito, Banjarmasin telah berevolusi melewati berbagai zaman—dari era Kesultanan Banjar yang masyhur hingga menjadi Metropolitan Seribu Sungai saat ini.
            </p>
          </div>

          {/* Desktop Right Group (3 Frames) */}
          <div className="hidden md:block absolute right-2 lg:right-8 top-0 w-full max-w-[360px] pointer-events-none">
            {/* Frame 4: Top Right Outer */}
            <div className="pointer-events-auto">
              <HangingFrame 
                src="/sejarah/250px-Lukisan_Sultan_Suriansyah.webp" 
                className="absolute right-0 top-0 rotate-3"
                width="w-[180px] lg:w-[240px]"
                height="h-[250px] lg:h-[330px]"
              />
            </div>
            {/* Frame 5: Middle Right Inner */}
            <div className="pointer-events-auto">
              <HangingFrame 
                src="/sejarah/pangeran antasari.webp" 
                className="absolute right-28 lg:right-44 top-44 lg:top-56 z-20 -rotate-2"
                width="w-[170px] lg:w-[220px]"
                height="h-[230px] lg:h-[290px]"
              />
            </div>
            {/* Frame 6 (NEW): Bottom Right Center */}
            <div className="pointer-events-auto">
              <HangingFrame 
                src="/profil kota/pelabuhan trisakti.webp" 
                className="absolute right-8 lg:right-20 top-[350px] lg:top-[440px] z-10 rotate-2"
                width="w-[160px] lg:w-[210px]"
                height="h-[220px] lg:h-[280px]"
              />
            </div>
          </div>

          {/* Mobile Frames (3 Frames Fanned Cluster) */}
          <div className="md:hidden flex justify-center items-center gap-2 mt-12 w-full px-2 pb-8 overflow-hidden">
            <HangingFrame 
              src="/sejarah/Kesultanan-Banjar.webp" 
              className="relative -rotate-6 scale-95 z-10"
              width="w-[115px] sm:w-[150px]"
              height="h-[150px] sm:h-[200px]"
            />
            <HangingFrame 
              src="/sejarah/pangeran antasari.webp" 
              className="relative z-20 -translate-y-2 shadow-2xl"
              width="w-[130px] sm:w-[165px]"
              height="h-[170px] sm:h-[220px]"
            />
            <HangingFrame 
              src="/sejarah/bendera-merah-putih.webp" 
              className="relative rotate-6 scale-95 z-10"
              width="w-[115px] sm:w-[150px]"
              height="h-[150px] sm:h-[200px]"
            />
          </div>

        </div>
      </div>

      {/* =========================================================
          SECTION 1: GARIS WAKTU INTERAKTIF (INTERACTIVE STEPPER)
          ========================================================= */}
      <section id="garis-waktu" className="py-24 bg-[var(--bg-main)] relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-2 font-heading">
              ✦ KRONOLOGI PERADABAN
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
              Jejak Lintas <span className="text-[#F4C038]">Abad</span>
            </h2>
            <p className="text-[var(--text-muted)] font-body mt-3">
              Klik pada tahun untuk menelusuri evolusi Kota Banjarmasin dari masa ke masa.
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="flex justify-center items-center gap-2 sm:gap-4 mb-12 flex-wrap">
            {timelineData.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-5 sm:px-8 py-3 sm:py-4 rounded-full font-heading font-black text-sm sm:text-lg transition-all duration-300 border ${
                  activeTab === index
                    ? 'bg-[#F4C038] text-[#091422] border-[#F4C038] shadow-[0_0_20px_rgba(244,192,56,0.4)] scale-105'
                    : 'bg-[var(--card-bg)] text-[var(--text-muted)] border-[var(--glass-border)] hover:border-[#33C3B3] hover:text-[var(--text-main)]'
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>

          {/* Tab Content Showcase */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[32px] p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-md max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-6 order-2 lg:order-1">
                <span className="inline-block px-3 py-1 rounded-full bg-[#33C3B3]/20 text-[#33C3B3] font-bold text-xs uppercase tracking-widest mb-4 border border-[#33C3B3]/30">
                  {timelineData[activeTab].tag}
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-[var(--text-main)] font-heading leading-tight mb-2">
                  {timelineData[activeTab].title}
                </h3>
                <h4 className="text-sm sm:text-base text-[#F4C038] font-semibold font-body mb-6">
                  {timelineData[activeTab].subtitle}
                </h4>
                <p className="text-[var(--text-muted)] font-body text-sm sm:text-base leading-relaxed">
                  {timelineData[activeTab].desc}
                </p>
              </div>
              <div className="lg:col-span-6 order-1 lg:order-2 h-[260px] sm:h-[350px] rounded-2xl overflow-hidden shadow-lg relative group">
                <img loading="lazy" 
                  src={timelineData[activeTab].img} 
                  alt={timelineData[activeTab].title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* =========================================================
          SECTION 2: TOKOH KEY & PAHLAWAN (DUAL SPOTLIGHT)
          ========================================================= */}
      <section className="py-24 bg-[var(--card-bg)] border-y border-[var(--glass-border)] relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-2 font-heading">
              ✦ SANG PELOPOR & PAHLAWAN
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
              Dua Pilar <span className="text-[#33C3B3]">Sejarah</span>
            </h2>
            <p className="text-[var(--text-muted)] font-body mt-3">
              Mengenal sosok pendiri kesultanan dan pahlawan nasional yang mengukir jiwa kesatria Banjar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Tokoh 1: Sultan Suriansyah */}
            <div className="group relative bg-[var(--bg-main)] border border-[var(--glass-border)] rounded-[32px] overflow-hidden hover:border-[#F4C038] transition-all duration-500 shadow-xl flex flex-col justify-between min-h-[480px]">
              <div className="h-[220px] sm:h-[260px] w-full overflow-hidden relative">
                <img loading="lazy" 
                  src="/sejarah/250px-Lukisan_Sultan_Suriansyah.webp" 
                  alt="Sultan Suriansyah" 
                  className="w-full h-full object-cover grayscale sepia group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-105 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-transparent to-transparent"></div>
                <span className="absolute top-4 left-4 bg-[#F4C038] text-[#091422] font-black text-[10px] px-3 py-1 rounded-full shadow uppercase tracking-wider">
                  Raja Islam Pertama (1526)
                </span>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] font-heading mb-3 group-hover:text-[#F4C038] transition-colors">
                    Sultan Suriansyah
                  </h3>
                  <p className="text-[var(--text-muted)] font-body text-sm sm:text-base leading-relaxed mb-6">
                    Terlahir dengan nama Raden Samudera, beliau adalah raja pertama Kesultanan Banjar yang memeluk Islam. Pemerintahannya di Kuin memancarkan fondasi hukum, adat istiadat, dan arsitektur Masjid Sultan Suriansyah yang bersejarah.
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--glass-border)] flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider">Warisan: Masjid Kuin</span>
                  <span className="text-2xl">🕌</span>
                </div>
              </div>
            </div>

            {/* Tokoh 2: Pangeran Antasari */}
            <div className="group relative bg-[var(--bg-main)] border border-[var(--glass-border)] rounded-[32px] overflow-hidden hover:border-[#33C3B3] transition-all duration-500 shadow-xl flex flex-col justify-between min-h-[480px]">
              <div className="h-[220px] sm:h-[260px] w-full overflow-hidden relative">
                <img loading="lazy" 
                  src="/sejarah/pangeran antasari.webp" 
                  alt="Pangeran Antasari" 
                  className="w-full h-full object-cover grayscale sepia group-hover:grayscale-0 group-hover:sepia-0 group-hover:scale-105 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-transparent to-transparent"></div>
                <span className="absolute top-4 left-4 bg-[#33C3B3] text-[#091422] font-black text-[10px] px-3 py-1 rounded-full shadow uppercase tracking-wider">
                  Pahlawan Nasional (1809-1862)
                </span>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] font-heading mb-3 group-hover:text-[#33C3B3] transition-colors">
                    Pangeran Antasari
                  </h3>
                  <p className="text-[var(--text-muted)] font-body text-sm sm:text-base leading-relaxed mb-6">
                    Pemimpin tertinggi Perang Banjar yang mengobarkan semangat anti-penjajahan. Semboyan legendarisnya *"Haram Manyerah Waja Sampai Kaputing"* menjadi filosofi mental tangguh masyarakat Kalimantan Selatan.
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--glass-border)] flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--text-main)] uppercase tracking-wider">Semboyan: Waja Sampai Kaputing</span>
                  <span className="text-2xl">⚔️</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 3: EVOLUSI BANDAR REMPAH (SHOWCASE DOSSIER)
          ========================================================= */}
      <section className="py-24 bg-[var(--bg-main)] relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-2 font-heading">
                ✦ ABAD KE-17 & 18
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight mb-6">
                Evolusi Bandar <br/><span className="text-[#F4C038]">Rempah Dunia</span>
              </h2>
              <p className="text-[var(--text-muted)] font-body leading-relaxed mb-6">
                Letak Banjarmasin yang strategis di persimpangan sungai Barito dan Martapura menjadikannya magnet perdagangan internasional. Lada hitam Banjar diakui sebagai salah satu komoditas terbaik di dunia pada abad ke-17.
              </p>
              <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--glass-border)] space-y-3">
                <div className="flex items-center gap-3 text-sm font-bold text-[var(--text-main)]">
                  <span className="text-[#33C3B3]">✓</span> Monopoli VOC & Inggris sempat ditolak sultan
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[var(--text-main)]">
                  <span className="text-[#33C3B3]">✓</span> Pasar Terapung jadi urat nadi distribusi lada
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[var(--text-main)]">
                  <span className="text-[#33C3B3]">✓</span> Mata uang kuno & sistem barter antar-bangsa
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-12">
                <div className="h-[200px] sm:h-[260px] rounded-3xl overflow-hidden shadow-xl border border-[var(--glass-border)] relative group">
                  <img loading="lazy" src="/wisata/960px-Pasar_Terapung_Siring_Banj.webp" alt="Pasar Terapung" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white">Pasar Terapung Abad 16</div>
                </div>
                <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-center">
                  <span className="text-3xl sm:text-4xl font-black text-[#F4C038] font-heading block mb-1">500+</span>
                  <span className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider">Tahun Tradisi Sungai</span>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div className="p-6 rounded-3xl bg-teal-500/10 border border-teal-500/30 text-center">
                  <span className="text-3xl sm:text-4xl font-black text-[#33C3B3] font-heading block mb-1">#1</span>
                  <span className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider">Komoditas Lada Terbaik Era VOC</span>
                </div>
                <div className="h-[200px] sm:h-[260px] rounded-3xl overflow-hidden shadow-xl border border-[var(--glass-border)] relative group">
                  <img loading="lazy" src="/profil kota/sungai.webp" alt="Sungai Martapura" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white">Jalur Martapura</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4: KRONIK PERANG BANJAR (ACCORDION CARDS)
          ========================================================= */}
      <section className="py-24 bg-[var(--card-bg)] border-t border-[var(--glass-border)] relative">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-2 font-heading">
              ✦ KRONIK PERLAWANAN 1859 - 1905
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
              Arsip Perang <span className="text-[#F4C038]">Banjar</span>
            </h2>
            <p className="text-[var(--text-muted)] font-body mt-3">
              Strategi perang sungai dan perjuangan rakyat mempertahankan tanah leluhur. Klik untuk membuka catatan.
            </p>
          </div>

          <div className="space-y-4">
            {perangBanjarData.map((item) => {
              const isOpen = openAccordion === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setOpenAccordion(isOpen ? null : item.id)}
                  className={`border rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-300 ${
                    isOpen 
                      ? 'bg-[var(--bg-main)] border-[#F4C038] shadow-[0_10px_30px_rgba(244,192,56,0.15)]' 
                      : 'bg-[var(--bg-main)]/50 border-[var(--glass-border)] hover:border-[#33C3B3]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${isOpen ? 'bg-[#F4C038] text-black' : 'bg-[var(--card-bg)] text-[var(--text-muted)]'}`}>
                        0{item.id}
                      </span>
                      <h3 className="text-lg sm:text-2xl font-black text-[var(--text-main)] font-heading">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#33C3B3] hidden sm:inline">{item.date}</span>
                      <span className={`text-xl transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#F4C038]' : 'text-[var(--text-muted)]'}`}>
                        ▼
                      </span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-6 mt-4 border-t border-[var(--glass-border)] text-[var(--text-muted)] font-body text-sm sm:text-base leading-relaxed">
                          {item.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 5: WARISAN FILOSOFI ABADI (QUOTE WALL EPILOGUE)
          ========================================================= */}
      <section className="py-28 bg-gradient-to-b from-[var(--card-bg)] to-[var(--bg-main)] relative text-center overflow-hidden border-t border-[var(--glass-border)]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="inline-block text-xs font-extrabold tracking-[0.3em] uppercase text-[#F4C038] mb-6 font-heading">
            ✦ EPILOG SEJARAH & MASA DEPAN
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[var(--text-main)] font-heading leading-tight mb-8 drop-shadow-2xl">
            "Haram Manyerah <br/>
            <span className="text-[#33C3B3]">Waja Sampai Kaputing"</span>
          </h2>
          <p className="text-base sm:text-xl text-[var(--text-muted)] font-body max-w-2xl mx-auto leading-relaxed mb-10">
            Sebuah sumpah perjuangan peninggalan leluhur yang kini mengalir dalam darah setiap warga Banjarmasin untuk membangun kota sungai yang bersih, berdaya saing, dan bermartabat.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/wisata" className="bg-[#F4C038] hover:bg-amber-400 text-[#091422] font-black px-8 py-4 rounded-full shadow-[0_0_25px_rgba(244,192,56,0.4)] transition-transform hover:-translate-y-1 text-sm sm:text-base">
              Jelajahi Wisata Sejarah ➔
            </Link>
            <Link to="/profil" className="bg-[var(--card-bg)] border border-[var(--glass-border)] hover:border-[#33C3B3] text-[var(--text-main)] font-black px-8 py-4 rounded-full transition-all text-sm sm:text-base">
              Kembali ke Profil Kota
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
