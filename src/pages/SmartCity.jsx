import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// 5 Pilar Smart City (Untuk Hero Curved Arc)
const pillarsData = [
  {
    id: "governance",
    title: "Smart Governance",
    subtitle: "Pelayanan Publik Digital",
    icon: "🏛️",
    color: "#00A896",
    gradient: "from-[#00A896] to-[#028090]",
    img: "/profil kota/kantor walikota.webp",
    heightClass: "h-[520px] lg:h-[600px]",
    clipStyle: { clipPath: "polygon(0 0, 100% 50px, 100% 100%, 0 100%)" },
    alignClass: "text-left items-start",
    transformClass: "hover:brightness-110 hover:shadow-[0_0_35px_rgba(0,168,150,0.5)]"
  },
  {
    id: "living",
    title: "Smart Living",
    subtitle: "Trans Banjarbakula & Kesehatan",
    icon: "🚌",
    color: "#E63946",
    gradient: "from-[#E63946] to-[#B81D24]",
    img: "/profil kota/Angkutan-BTS-Trans-Banjarmasin-t.webp",
    heightClass: "h-[440px] lg:h-[510px]",
    clipStyle: { clipPath: "polygon(0 0, 100% 40px, 100% 100%, 0 100%)" },
    alignClass: "text-left items-start",
    transformClass: "hover:brightness-110 hover:shadow-[0_0_35px_rgba(230,57,70,0.5)]"
  },
  {
    id: "environment",
    title: "Smart Environment",
    subtitle: "Sungaiku Baiman & ATCS",
    icon: "🌿",
    color: "#33C3B3",
    gradient: "from-[#33C3B3] to-[#008075]",
    img: "/profil kota/sungai.webp",
    heightClass: "h-[360px] lg:h-[420px]",
    clipStyle: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
    alignClass: "text-center items-center",
    transformClass: "z-20 shadow-[0_0_35px_rgba(51,195,179,0.4)] border-[#33C3B3] hover:brightness-110 hover:shadow-[0_0_45px_rgba(51,195,179,0.7)]"
  },
  {
    id: "economy",
    title: "Smart Economy",
    subtitle: "e-Limpas & UMKM Digital",
    icon: "📊",
    color: "#F4C038",
    gradient: "from-[#F4C038] to-[#D99B00]",
    img: "/profil kota/pasar wadai.webp",
    heightClass: "h-[440px] lg:h-[510px]",
    clipStyle: { clipPath: "polygon(0 40px, 100% 0, 100% 100%, 0 100%)" },
    alignClass: "text-right items-end",
    transformClass: "hover:brightness-110 hover:shadow-[0_0_35px_rgba(244,192,56,0.5)]"
  },
  {
    id: "society",
    title: "Smart Society",
    subtitle: "Literasi & Layanan Kesehatan",
    icon: "🏥",
    color: "#7B2CBF",
    gradient: "from-[#7B2CBF] to-[#5A189A]",
    img: "/profil kota/rs ulin.webp",
    heightClass: "h-[520px] lg:h-[600px]",
    clipStyle: { clipPath: "polygon(0 50px, 100% 0, 100% 100%, 0 100%)" },
    alignClass: "text-right items-end",
    transformClass: "hover:brightness-110 hover:shadow-[0_0_35px_rgba(123,44,191,0.5)]"
  }
];

export default function SmartCity() {
  const [activeAppTab, setActiveAppTab] = useState("parakAcil");
  const [activeEcoTab, setActiveEcoTab] = useState("transBanjarbakula");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />

      {/* =========================================================
          HERO SECTION: CURVED 5-PILLAR ARC SHOWCASE
          ========================================================= */}
      <div className="bg-[var(--bg-main)] pt-28 sm:pt-32 pb-0 overflow-hidden relative">
        <div className="hidden dark:block absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-teal-500/10 blur-[160px] rounded-full pointer-events-none -z-10" />

        <div className="text-center max-w-4xl mx-auto px-4 mb-2 relative z-10">
          <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-3 font-heading">
            ✦ BANJARMASIN BAIMAN SMART CITY
          </span>
          <h1 className="hero-title !mb-4">
            Transformasi <br/><span className="text-sasirangan">Digital & Inovasi</span>
          </h1>
          <p className="hero-subtitle mx-auto !mb-0 !max-w-2xl px-2">
            Mengintegrasikan teknologi informasi dalam tata kelola pemerintahan, pelayanan publik satu pintu, serta pelestarian ekologi Seribu Sungai demi wujudkan kota yang bersih dan nyaman.
          </p>
        </div>

        {/* Desktop Curved 5-Pillar Arc */}
        <div className="hidden md:grid grid-cols-5 gap-3 lg:gap-4 max-w-[1300px] mx-auto px-6 -mt-10 lg:-mt-16 pb-0 relative z-20 items-end">
          {pillarsData.map((pillar) => (
            <div
              key={pillar.id}
              style={pillar.clipStyle}
              className={`group bg-[var(--card-bg)] border-x border-t border-[var(--glass-border)] border-b-0 overflow-hidden shadow-2xl transition-all duration-500 flex flex-col relative ${pillar.heightClass} ${pillar.transformClass}`}
            >
              {/* Top Gradient Header */}
              <div className={`p-5 bg-gradient-to-br ${pillar.gradient} text-white flex flex-col justify-between shrink-0 h-[150px] lg:h-[170px] relative overflow-hidden ${pillar.alignClass}`}>
                <div className="absolute -right-4 -bottom-4 text-6xl opacity-20 pointer-events-none select-none">
                  {pillar.icon}
                </div>
                <span className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl shadow">
                  {pillar.icon}
                </span>
                <div>
                  <h3 className="font-heading font-black text-base lg:text-lg leading-tight">
                    {pillar.title}
                  </h3>
                  <span className="text-[11px] font-medium text-white/90 block mt-0.5">
                    {pillar.subtitle}
                  </span>
                </div>
              </div>

              {/* Bottom Image Strip */}
              <div className="flex-1 relative overflow-hidden">
                <img
                  src={pillar.img}
                  alt={pillar.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                    Faktual Pemko
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Stacked Pillars */}
        <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6 px-4 pt-6 max-w-lg mx-auto">
          {pillarsData.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl overflow-hidden shadow-xl flex flex-col h-[340px]"
            >
              <div className={`p-5 bg-gradient-to-br ${pillar.gradient} text-white flex items-center justify-between`}>
                <div>
                  <h3 className="font-heading font-black text-lg">{pillar.title}</h3>
                  <span className="text-xs text-white/90">{pillar.subtitle}</span>
                </div>
                <span className="text-3xl">{pillar.icon}</span>
              </div>
              <div className="flex-1 relative overflow-hidden">
                <img src={pillar.img} alt={pillar.title} loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <span className="text-[10px] font-bold text-white bg-black/60 px-3 py-1 rounded-full">Faktual Pemko</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================
          SECTION 1: SHOWCASE SUPER-APP "BANJARMASIN PINTAR"
          ========================================================= */}
      <section id="superapp" className="py-24 bg-[var(--bg-main)] relative overflow-hidden border-t border-[var(--glass-border)]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] px-3 py-1 rounded-full bg-[#33C3B3]/10 border border-[#33C3B3]/30 font-heading">
                ✦ SUPER APPS RESMI PEMKO
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
                Satu Akun SSO untuk <br/><span className="text-[#F4C038]">Semua Layanan Warga</span>
              </h2>
              <p className="text-[var(--text-muted)] font-body leading-relaxed text-sm sm:text-base">
                Pemerintah Kota Banjarmasin menghadirkan **"Banjarmasin Pintar"** (Versi 3) sebagai pusat integrasi puluhan aplikasi SKPD. Dengan teknologi *Single Sign-On (SSO)* berbasis NIK-KTP, warga cukup mendaftar satu kali untuk menikmati kemudahan pengurusan dokumen, antrean kesehatan, hingga pemantauan lalu lintas secara real-time.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--glass-border)]">
                  <span className="text-2xl font-black text-[#33C3B3] font-heading block mb-1">SSO NIK</span>
                  <span className="text-xs text-[var(--text-muted)] font-bold">Integrasi KTP Elektronik</span>
                </div>
                <div className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--glass-border)]">
                  <span className="text-2xl font-black text-[#F4C038] font-heading block mb-1">Versi 3.0</span>
                  <span className="text-xs text-[var(--text-muted)] font-bold">Super-App Generasi Terbaru</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4 items-center">
                <a
                  href="https://play.google.com/store/apps/details?id=id.go.banjarmasinkota.banjarmasinpintar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#008075] hover:bg-[#00665e] text-white font-black px-6 py-3.5 rounded-2xl shadow-lg flex items-center gap-3 transition-all transform hover:-translate-y-1 text-sm sm:text-base"
                >
                  <span>📱</span> Unduh Banjarmasin Pintar di Google Play
                </a>
              </div>
            </div>

            {/* Interactive App Drawer Simulation */}
            <div className="lg:col-span-6 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[36px] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs font-bold font-heading text-[var(--text-muted)] uppercase tracking-wider">Simulasi Menu Super-App</span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => setActiveAppTab("parakAcil")}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                    activeAppTab === "parakAcil"
                      ? 'bg-[#F4C038] text-[#091422] border-[#F4C038] shadow-md scale-105'
                      : 'bg-[var(--bg-main)]/50 text-[var(--text-main)] border-[var(--glass-border)] hover:border-[#33C3B3]'
                  }`}
                >
                  <span className="text-2xl">📋</span>
                  <span className="font-heading font-black text-xs text-center">Parak Acil</span>
                </button>
                <button
                  onClick={() => setActiveAppTab("baApik")}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                    activeAppTab === "baApik"
                      ? 'bg-[#00A896] text-white border-[#00A896] shadow-md scale-105'
                      : 'bg-[var(--bg-main)]/50 text-[var(--text-main)] border-[var(--glass-border)] hover:border-[#33C3B3]'
                  }`}
                >
                  <span className="text-2xl">🏥</span>
                  <span className="font-heading font-black text-xs text-center">BaApik RS</span>
                </button>
                <button
                  onClick={() => setActiveAppTab("atcs")}
                  className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                    activeAppTab === "atcs"
                      ? 'bg-[#E63946] text-white border-[#E63946] shadow-md scale-105'
                      : 'bg-[var(--bg-main)]/50 text-[var(--text-main)] border-[var(--glass-border)] hover:border-[#33C3B3]'
                  }`}
                >
                  <span className="text-2xl">📹</span>
                  <span className="font-heading font-black text-xs text-center">CCTV ATCS</span>
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAppTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[var(--bg-main)] p-6 rounded-2xl border border-[var(--glass-border)]"
                >
                  {activeAppTab === "parakAcil" && (
                    <div>
                      <span className="text-[10px] font-bold text-[#F4C038] uppercase tracking-widest block mb-1">Disdukcapil Banjarmasin</span>
                      <h4 className="font-heading font-black text-lg text-[var(--text-main)] mb-2">Parak Acil Online</h4>
                      <p className="text-xs text-[var(--text-muted)] font-body leading-relaxed mb-4">
                        Pelayanan Pendaftaran Penduduk dan Pencatatan Sipil Online. Warga dapat mengajukan cetak KTP-el, Kartu Keluarga, Akta Kelahiran, dan KIA langsung dari HP tanpa perlu antre di kantor dinas.
                      </p>
                      <a href="https://parakacil.banjarmasinkota.go.id" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-[#33C3B3] hover:underline">Buka Portal Resmi Parak Acil ➔</a>
                    </div>
                  )}
                  {activeAppTab === "baApik" && (
                    <div>
                      <span className="text-[10px] font-bold text-[#00A896] uppercase tracking-widest block mb-1">Dinkes & RSUD Sultan Suriansyah</span>
                      <h4 className="font-heading font-black text-lg text-[var(--text-main)] mb-2">Aplikasi BaApik</h4>
                      <p className="text-xs text-[var(--text-muted)] font-body leading-relaxed mb-4">
                        Banjarmasin Aplikasi Pasien Internal Kesehatan. Mempermudah pendaftaran berobat online dan reservasi nomor antrean dokter di seluruh Puskesmas dan RSUD Kota Banjarmasin secara presisi.
                      </p>
                      <span className="text-xs font-bold text-[#00A896]">Terintegrasi langsung di menu Banjarmasin Pintar ✓</span>
                    </div>
                  )}
                  {activeAppTab === "atcs" && (
                    <div>
                      <span className="text-[10px] font-bold text-[#E63946] uppercase tracking-widest block mb-1">Command Center Diskominfotik</span>
                      <h4 className="font-heading font-black text-lg text-[var(--text-main)] mb-2">Live CCTV & ATCS Lalu Lintas</h4>
                      <p className="text-xs text-[var(--text-muted)] font-body leading-relaxed mb-4">
                        Area Traffic Control System. Warga dapat memantau arus lalu lintas di puluhan persimpangan jalan dan situasi debit air di jembatan sungai utama secara real-time demi kenyamanan mobilitas.
                      </p>
                      <span className="text-xs font-bold text-[#E63946]">Aktif 24 Jam Non-Stop ✓</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: LAYANAN KEPENDUDUKAN & KESEHATAN (DUAL CARDS)
          ========================================================= */}
      <section className="py-24 bg-[var(--card-bg)] border-y border-[var(--glass-border)] relative">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-2 font-heading">
              ✦ SMART GOVERNANCE & SMART LIVING
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
              Layanan Unggulan <span className="text-[#33C3B3]">Tanpa Ribet</span>
            </h2>
            <p className="text-[var(--text-muted)] font-body mt-3 text-sm sm:text-base">
              Dua tonggak pelayanan utama yang memangkas birokrasi konvensional menjadi layanan cepat berbasis genggaman.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Card 1: Parak Acil */}
            <div className="bg-[var(--bg-main)] border border-[var(--glass-border)] rounded-[32px] p-6 sm:p-8 hover:border-[#F4C038] transition-all shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-amber-500/20 transition-all"></div>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-14 h-14 rounded-2xl bg-[#F4C038]/20 border border-[#F4C038]/40 flex items-center justify-center text-3xl">🪪</span>
                  <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-[#F4C038]/20 text-[#F4C038]">Disdukcapil</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] font-heading mb-3">
                  Parak Acil Online
                </h3>
                <p className="text-[var(--text-muted)] font-body text-sm leading-relaxed mb-6">
                  Solusi kepengurusan dokumen kependudukan dari rumah. Layanan mencakup penerbitan Akta Kelahiran, Akta Kematian, perbaikan Kartu Keluarga, hingga cetak ulang KTP Elektronik yang rusak atau hilang.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]"><span className="text-[#33C3B3]">✓</span> Tanpa antre di kantor kecamatan</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]"><span className="text-[#33C3B3]">✓</span> Verifikasi berkas digital cepat</div>
                </div>
              </div>
              <a href="https://parakacil.banjarmasinkota.go.id" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[var(--card-bg)] hover:bg-[#F4C038] hover:text-[#091422] text-[var(--text-main)] font-black text-xs py-3.5 px-6 rounded-xl border border-[var(--glass-border)] transition-all">
                Buka Web Resmi Parak Acil ➔
              </a>
            </div>

            {/* Card 2: BaApik */}
            <div className="bg-[var(--bg-main)] border border-[var(--glass-border)] rounded-[32px] p-6 sm:p-8 hover:border-[#00A896] transition-all shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-teal-500/20 transition-all"></div>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-14 h-14 rounded-2xl bg-[#00A896]/20 border border-[#00A896]/40 flex items-center justify-center text-3xl">🩺</span>
                  <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-[#00A896]/20 text-[#00A896]">Dinas Kesehatan</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] font-heading mb-3">
                  Aplikasi BaApik
                </h3>
                <p className="text-[var(--text-muted)] font-body text-sm leading-relaxed mb-6">
                  Sistem registrasi pasien terpadu untuk RSUD Sultan Suriansyah dan seluruh Puskesmas se-Kota Banjarmasin. Pasien dapat memilih jadwal dokter dan mendapatkan kepastian waktu layan tanpa harus datang subuh.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]"><span className="text-[#00A896]">✓</span> Kepastian nomor antrean real-time</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]"><span className="text-[#00A896]">✓</span> Rekam medis elektronik terpadu</div>
                </div>
              </div>
              <a href="https://play.google.com/store/apps/details?id=id.go.banjarmasinkota.banjarmasinpintar" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[var(--card-bg)] hover:bg-[#00A896] hover:text-white text-[var(--text-main)] font-black text-xs py-3.5 px-6 rounded-xl border border-[var(--glass-border)] transition-all">
                Akses via Banjarmasin Pintar ➔
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3: REVOLUSI PERIZINAN & PASAR (STEPPER WORKFLOW)
          ========================================================= */}
      <section className="py-24 bg-[var(--bg-main)] relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#F4C038] mb-2 font-heading">
              ✦ SMART ECONOMY & PERIZINAN
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
              Inovasi <span className="text-[#F4C038]">Si MANTAB</span> & e-Limpas
            </h2>
            <p className="text-[var(--text-muted)] font-body mt-3 text-sm sm:text-base">
              DPMPTSP Kota Banjarmasin menghadirkan program **Si MANTAB** (*Maantar Perizinan Tanpa Bayar*), di mana dokumen izin usaha yang selesai langsung diantar kurir PT Pos Indonesia secara gratis!
            </p>
          </div>

          {/* 3-Step Factual Workflow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16 relative before:hidden md:before:block before:absolute before:top-1/2 before:left-10 before:right-10 before:h-[2px] before:bg-[var(--glass-border)] before:-translate-y-12 before:z-0">
            
            <div className="bg-[var(--card-bg)] border border-[var(--glass-border)] p-6 sm:p-8 rounded-3xl relative z-10 text-center shadow-lg hover:border-[#F4C038] transition-all">
              <span className="w-16 h-16 rounded-full bg-[#F4C038] text-[#091422] font-black font-heading text-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(244,192,56,0.4)]">
                01
              </span>
              <h4 className="font-heading font-black text-lg text-[var(--text-main)] mb-2">Daftar Izin Online</h4>
              <p className="text-xs text-[var(--text-muted)] font-body leading-relaxed">
                Pelaku usaha mengajukan permohonan izin melalui sistem OSS RBA atau aplikasi perizinan DPMPTSP tanpa keluar rumah.
              </p>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--glass-border)] p-6 sm:p-8 rounded-3xl relative z-10 text-center shadow-lg hover:border-[#33C3B3] transition-all">
              <span className="w-16 h-16 rounded-full bg-[#33C3B3] text-[#091422] font-black font-heading text-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(51,195,179,0.4)]">
                02
              </span>
              <h4 className="font-heading font-black text-lg text-[var(--text-main)] mb-2">Verifikasi Digital</h4>
              <p className="text-xs text-[var(--text-muted)] font-body leading-relaxed">
                Tim DPMPTSP melakukan verifikasi berkas dan menerbitkan surat izin resmi secara elektronik dengan tanda tangan digital sah.
              </p>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--glass-border)] p-6 sm:p-8 rounded-3xl relative z-10 text-center shadow-lg hover:border-[#00A896] transition-all">
              <span className="w-16 h-16 rounded-full bg-[#00A896] text-white font-black font-heading text-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(0,168,150,0.4)]">
                03
              </span>
              <h4 className="font-heading font-black text-lg text-[var(--text-main)] mb-2">Diantar Pos Gratis</h4>
              <p className="text-xs text-[var(--text-muted)] font-body leading-relaxed">
                Bekerja sama dengan PT Pos Indonesia, dokumen fisik izin usaha diantarkan langsung ke alamat rumah pemohon tanpa dipungut biaya (*Gratis/Tanpa Bayar*).
              </p>
            </div>

          </div>

          {/* e-Limpas Banner */}
          <div className="bg-[var(--card-bg)] border-2 border-[#F4C038] rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto text-[var(--text-main)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F4C038] bg-[#F4C038]/15 px-3 py-1 rounded-full inline-block">Smart Economy Pasar</span>
              <h3 className="text-2xl font-black font-heading text-[var(--text-main)]">Sistem Retribusi e-Limpas</h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body max-w-xl leading-relaxed">
                Digitalisasi pembayaran retribusi pasar tradisional dan ekosistem *Baiman Store* untuk mewujudkan transparansi ekonomi dan memajukan pedagang UMKM Sasirangan.
              </p>
            </div>
            <span className="text-4xl bg-[#F4C038]/20 p-4 rounded-2xl shrink-0 border border-[#F4C038]/40 relative z-10">🏪</span>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 4: SMART MOBILITY & EKOLOGI (INTERACTIVE TABS)
          ========================================================= */}
      <section className="py-24 bg-[var(--card-bg)] border-t border-[var(--glass-border)] relative">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-2 font-heading">
              ✦ SMART MOBILITY & ENVIRONMENT
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
              Inovasi Transportasi & <span className="text-[#33C3B3]">Ekologi</span>
            </h2>
            <p className="text-[var(--text-muted)] font-body mt-3 text-sm sm:text-base">
              Modernisasi transportasi publik Buy The Service (BTS) terintegrasi serta pemantauan perairan secara digital.
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button
              onClick={() => setActiveEcoTab("transBanjarbakula")}
              className={`px-6 py-3 rounded-full font-heading font-black text-xs sm:text-sm transition-all border ${
                activeEcoTab === "transBanjarbakula"
                  ? 'bg-[#33C3B3] text-[#091422] border-[#33C3B3] shadow-[0_0_20px_rgba(51,195,179,0.4)] scale-105'
                  : 'bg-[var(--bg-main)] text-[var(--text-muted)] border-[var(--glass-border)] hover:border-[#33C3B3]'
              }`}
            >
              🚌 Trans Banjarbakula (Tayo Hijau)
            </button>
            <button
              onClick={() => setActiveEcoTab("cctv")}
              className={`px-6 py-3 rounded-full font-heading font-black text-xs sm:text-sm transition-all border ${
                activeEcoTab === "cctv"
                  ? 'bg-[#E63946] text-white border-[#E63946] shadow-[0_0_20px_rgba(230,57,70,0.4)] scale-105'
                  : 'bg-[var(--bg-main)] text-[var(--text-muted)] border-[var(--glass-border)] hover:border-[#E63946]'
              }`}
            >
              📹 Live CCTV ATCS & Maharagu Sungai
            </button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEcoTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--bg-main)] border border-[var(--glass-border)] rounded-[32px] p-6 sm:p-10 max-w-4xl mx-auto shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              {activeEcoTab === "transBanjarbakula" ? (
                <>
                  <div className="md:col-span-7 space-y-4 text-left">
                    <span className="text-xs font-bold text-[#33C3B3] uppercase tracking-wider block">Kemenhub BTS & Pemprov Kalsel</span>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading text-[var(--text-main)]">Bus Trans Banjarbakula</h3>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed">
                      Populer disebut warga sebagai **"Tayo Hijau"**, sistem Bus Rapid Transit (BRT) modern ini melayani rute aglomerasi Banjarmasin hingga Banjarbaru. Dilengkapi CCTV pengaman, sistem pembayaran 100% *cashless* (e-Money Mandiri, BRI, BNI, BCA), tarif terjangkau (Rp5.000 umum / Rp2.000 pelajar & lansia), serta pelacakan posisi bus real-time via aplikasi **Teman Bus / BTSGo**.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <span className="inline-block bg-[#33C3B3]/20 text-[#33C3B3] font-bold text-xs px-4 py-2 rounded-xl border border-[#33C3B3]/30">
                        100% Cashless & Full AC ✓
                      </span>
                      <span className="inline-block bg-[#F4C038]/20 text-[#F4C038] font-bold text-xs px-4 py-2 rounded-xl border border-[#F4C038]/30">
                        Tarif Pelajar Rp2.000 ✓
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-5 h-[240px] rounded-2xl overflow-hidden shadow-lg relative">
                    <img loading="lazy" src="/profil kota/trans banjarbakula.webp" alt="Trans Banjarbakula Koridor Banjarmasin" className="w-full h-full object-cover" />
                    <div className="absolute bottom-3 left-3 bg-[#091422]/80 backdrop-blur-md text-[#33C3B3] text-[10px] font-bold px-3 py-1 rounded-full border border-[#33C3B3]/40">📍 Koridor Siring & Pal 0</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="md:col-span-7 space-y-4 text-left">
                    <span className="text-xs font-bold text-[#E63946] uppercase tracking-wider block">Diskominfotik & Maharagu Sungai</span>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading text-[var(--text-main)]">Integrasi CCTV & Ekologi</h3>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed">
                      Command Center memantau arus lalu lintas di puluhan persimpangan ATCS dan situasi debit air sungai 24 jam non-stop. Warga dapat memantau kondisi jalan secara live melalui aplikasi **Banjarmasin Pintar**, bersinergi dengan program gotong royong warga *"Maharagu Sungai"* untuk menjaga kebersihan halaman depan kota.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <span className="inline-block bg-[#E63946]/20 text-[#E63946] font-bold text-xs px-4 py-2 rounded-xl border border-[#E63946]/30">
                        Live Stream via HP ✓
                      </span>
                      <span className="inline-block bg-[#00A896]/20 text-[#00A896] font-bold text-xs px-4 py-2 rounded-xl border border-[#00A896]/30">
                        Maharagu Sungai ✓
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-5 h-[240px] rounded-2xl overflow-hidden shadow-lg relative">
                    <img loading="lazy" src="/profil kota/sungai.webp" alt="CCTV & Ekologi Sungai" className="w-full h-full object-cover" />
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[9px] font-black px-2 py-0.5 rounded-full animate-pulse">● LIVE ATCS</div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </section>

      {/* =========================================================
          SECTION 5: SMART SOCIETY & EPILOG (CTA)
          ========================================================= */}
      <section className="py-28 bg-gradient-to-b from-[var(--card-bg)] to-[var(--bg-main)] relative text-center overflow-hidden border-t border-[var(--glass-border)]">
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="inline-block text-xs font-extrabold tracking-[0.3em] uppercase text-[#7B2CBF] mb-6 font-heading">
            ✦ SMART SOCIETY & LITERASI DIGITAL
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[var(--text-main)] font-heading leading-tight mb-8 drop-shadow-2xl">
            "Teknologi Cerdas untuk <br/>
            <span className="text-[#33C3B3]">Masyarakat Bermartabat"</span>
          </h2>
          <p className="text-base sm:text-xl text-[var(--text-muted)] font-body max-w-2xl mx-auto leading-relaxed mb-10">
            Pemerintah Kota Banjarmasin memperluas akses internet publik gratis di taman-taman kota dan balai kelurahan demi mewujudkan ekosistem digital yang merata dan memajukan literasi warga.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/wisata" className="bg-[#F4C038] hover:bg-amber-400 text-[#091422] font-black px-8 py-4 rounded-full shadow-md transition-transform hover:-translate-y-1 text-sm sm:text-base">
              Jelajahi Peta Wisata ➔
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
