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
    heightClass: "h-[210px] sm:h-[380px] md:h-[520px] lg:h-[600px]",
    clipStyle: { clipPath: "polygon(0 0, 100% 20px, 100% 100%, 0 100%)" },
    alignClass: "text-center md:text-left items-center md:items-start",
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
    heightClass: "h-[180px] sm:h-[320px] md:h-[440px] lg:h-[510px]",
    clipStyle: { clipPath: "polygon(0 0, 100% 15px, 100% 100%, 0 100%)" },
    alignClass: "text-center md:text-left items-center md:items-start",
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
    heightClass: "h-[155px] sm:h-[260px] md:h-[360px] lg:h-[420px]",
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
    heightClass: "h-[180px] sm:h-[320px] md:h-[440px] lg:h-[510px]",
    clipStyle: { clipPath: "polygon(0 15px, 100% 0, 100% 100%, 0 100%)" },
    alignClass: "text-center md:text-right items-center md:items-end",
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
    heightClass: "h-[210px] sm:h-[380px] md:h-[520px] lg:h-[600px]",
    clipStyle: { clipPath: "polygon(0 20px, 100% 0, 100% 100%, 0 100%)" },
    alignClass: "text-center md:text-right items-center md:items-end",
    transformClass: "hover:brightness-110 hover:shadow-[0_0_35px_rgba(123,44,191,0.5)]"
  }
];

export default function SmartCity() {
  const [activeAppTab, setActiveAppTab] = useState("parakAcil");
  const [activeTransportTab, setActiveTransportTab] = useState("transBanjarmasin");

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

        {/* Responsive 5-Pillar Arc (Ramping on Mobile, Full on Desktop) */}
        <div className="grid grid-cols-5 gap-1 sm:gap-2.5 md:gap-3 lg:gap-4 max-w-[1300px] mx-auto px-1.5 sm:px-4 md:px-6 -mt-4 sm:-mt-10 lg:-mt-16 pb-0 relative z-20 items-end">
          {pillarsData.map((pillar) => (
            <div
              key={pillar.id}
              style={pillar.clipStyle}
              className={`group bg-[var(--card-bg)] border-x border-t border-[var(--glass-border)] border-b-0 overflow-hidden shadow-xl md:shadow-2xl transition-all duration-500 flex flex-col relative rounded-t-xl sm:rounded-t-2xl ${pillar.heightClass} ${pillar.transformClass}`}
            >
              {/* Top Gradient Header */}
              <div className={`p-1.5 sm:p-3 md:p-5 bg-gradient-to-br ${pillar.gradient} text-white flex flex-col justify-between shrink-0 h-[75px] sm:h-[120px] md:h-[150px] lg:h-[170px] relative overflow-hidden ${pillar.alignClass}`}>
                <div className="absolute -right-2 -bottom-2 text-3xl sm:text-5xl md:text-6xl opacity-20 pointer-events-none select-none">
                  {pillar.icon}
                </div>
                <span className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg sm:rounded-xl md:rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xs sm:text-base md:text-xl shadow mx-auto md:mx-0 shrink-0">
                  {pillar.icon}
                </span>
                <div className="w-full text-center md:text-left mt-1 sm:mt-0">
                  <h3 className="font-heading font-black text-[8.5px] sm:text-xs md:text-base lg:text-lg leading-[1.1] sm:leading-tight line-clamp-2">
                    {pillar.title}
                  </h3>
                  <span className="hidden sm:block text-[10px] md:text-[11px] font-medium text-white/90 mt-0.5 line-clamp-1">
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
            
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] px-3.5 py-1.5 rounded-full bg-[#33C3B3]/10 border border-[#33C3B3]/30 font-heading shadow-sm">
                ✦ SUPER APPS RESMI PEMKO
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
                Satu Akun SSO untuk <br/><span className="text-[#F4C038]">Semua Layanan Warga</span>
              </h2>
              <p className="text-[var(--text-muted)] font-body leading-relaxed text-sm sm:text-base max-w-xl mx-auto lg:mx-0">
                Pemerintah Kota Banjarmasin menghadirkan <strong className="text-[var(--text-main)] font-black">Banjarmasin Pintar</strong> (Versi 3) sebagai pusat integrasi puluhan aplikasi SKPD. Dengan teknologi <span className="text-[var(--text-main)] font-bold">Single Sign-On (SSO)</span> berbasis NIK-KTP, warga cukup mendaftar satu kali untuk menikmati kemudahan pengurusan dokumen, antrean kesehatan, hingga pemantauan lalu lintas secara real-time.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 max-w-md mx-auto lg:mx-0">
                <div className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--glass-border)] shadow-md text-left">
                  <span className="text-xl sm:text-2xl font-black text-[#33C3B3] font-heading block mb-1">SSO NIK</span>
                  <span className="text-xs text-[var(--text-muted)] font-bold">Integrasi KTP Elektronik</span>
                </div>
                <div className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--glass-border)] shadow-md text-left">
                  <span className="text-xl sm:text-2xl font-black text-[#F4C038] font-heading block mb-1">Versi 3.0</span>
                  <span className="text-xs text-[var(--text-muted)] font-bold">Super-App Generasi Terbaru</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                <a
                  href="https://play.google.com/store/search?q=banjarmasin+pintar&c=apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#008075] to-[#00A896] hover:from-[#00665e] hover:to-[#008075] text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-teal-500/25 transition-all transform hover:-translate-y-1 text-sm sm:text-base"
                >
                  <span className="text-xl">📱</span> Unduh Banjarmasin Pintar di Google Play
                </a>
              </div>
            </div>

            {/* Interactive App Drawer Simulation */}
            <div className="lg:col-span-6 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[36px] p-5 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-[var(--glass-border)] pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-xs font-bold font-heading text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1.5">
                  <span>💫</span> Simulasi Menu Super-App
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6">
                <button
                  onClick={() => setActiveAppTab("parakAcil")}
                  className={`p-3 rounded-2xl border flex items-center gap-2.5 text-left transition-all ${
                    activeAppTab === "parakAcil"
                      ? 'bg-gradient-to-r from-[#F4C038] to-[#f5b014] text-[#091422] border-transparent shadow-lg shadow-amber-500/25 scale-[1.02]'
                      : 'bg-[var(--bg-main)] text-[var(--text-main)] border-[var(--glass-border)] hover:border-[#F4C038]/50 shadow-sm opacity-90 hover:opacity-100'
                  }`}
                >
                  <span className="w-8 h-8 rounded-xl bg-black/10 dark:bg-white/10 flex items-center justify-center text-lg shrink-0">📋</span>
                  <span className="font-heading font-black text-xs leading-tight line-clamp-1">Parak Acil</span>
                </button>
                <button
                  onClick={() => setActiveAppTab("baApik")}
                  className={`p-3 rounded-2xl border flex items-center gap-2.5 text-left transition-all ${
                    activeAppTab === "baApik"
                      ? 'bg-gradient-to-r from-[#00A896] to-[#008075] text-white border-transparent shadow-lg shadow-teal-500/25 scale-[1.02]'
                      : 'bg-[var(--bg-main)] text-[var(--text-main)] border-[var(--glass-border)] hover:border-[#00A896]/50 shadow-sm opacity-90 hover:opacity-100'
                  }`}
                >
                  <span className="w-8 h-8 rounded-xl bg-white/20 dark:bg-black/10 flex items-center justify-center text-lg shrink-0">🏥</span>
                  <span className="font-heading font-black text-xs leading-tight line-clamp-1">BaApik RS</span>
                </button>
                <button
                  onClick={() => setActiveAppTab("salamRindu")}
                  className={`p-3 rounded-2xl border flex items-center gap-2.5 text-left transition-all ${
                    activeAppTab === "salamRindu"
                      ? 'bg-gradient-to-r from-[#33C3B3] to-[#2aa698] text-[#091422] border-transparent shadow-lg shadow-teal-400/25 scale-[1.02]'
                      : 'bg-[var(--bg-main)] text-[var(--text-main)] border-[var(--glass-border)] hover:border-[#33C3B3]/50 shadow-sm opacity-90 hover:opacity-100'
                  }`}
                >
                  <span className="w-8 h-8 rounded-xl bg-black/10 dark:bg-white/10 flex items-center justify-center text-lg shrink-0">📄</span>
                  <span className="font-heading font-black text-xs leading-tight line-clamp-1">SALAM-RINDU</span>
                </button>
                <button
                  onClick={() => setActiveAppTab("siSintal")}
                  className={`p-3 rounded-2xl border flex items-center gap-2.5 text-left transition-all ${
                    activeAppTab === "siSintal"
                      ? 'bg-gradient-to-r from-[#9D4EDD] to-[#7b36b3] text-white border-transparent shadow-lg shadow-purple-500/25 scale-[1.02]'
                      : 'bg-[var(--bg-main)] text-[var(--text-main)] border-[var(--glass-border)] hover:border-[#9D4EDD]/50 shadow-sm opacity-90 hover:opacity-100'
                  }`}
                >
                  <span className="w-8 h-8 rounded-xl bg-white/20 dark:bg-black/10 flex items-center justify-center text-lg shrink-0">🎁</span>
                  <span className="font-heading font-black text-xs leading-tight line-clamp-1">SI-SINTAL</span>
                </button>
                <button
                  onClick={() => setActiveAppTab("epbb")}
                  className={`p-3 rounded-2xl border flex items-center gap-2.5 text-left transition-all ${
                    activeAppTab === "epbb"
                      ? 'bg-gradient-to-r from-[#219EBC] to-[#187890] text-white border-transparent shadow-lg shadow-cyan-500/25 scale-[1.02]'
                      : 'bg-[var(--bg-main)] text-[var(--text-main)] border-[var(--glass-border)] hover:border-[#219EBC]/50 shadow-sm opacity-90 hover:opacity-100'
                  }`}
                >
                  <span className="w-8 h-8 rounded-xl bg-white/20 dark:bg-black/10 flex items-center justify-center text-lg shrink-0">💳</span>
                  <span className="font-heading font-black text-xs leading-tight line-clamp-1">e-PBB & Pajak</span>
                </button>
                <button
                  onClick={() => setActiveAppTab("elapor")}
                  className={`p-3 rounded-2xl border flex items-center gap-2.5 text-left transition-all ${
                    activeAppTab === "elapor"
                      ? 'bg-gradient-to-r from-[#E63946] to-[#c22d39] text-white border-transparent shadow-lg shadow-red-500/25 scale-[1.02]'
                      : 'bg-[var(--bg-main)] text-[var(--text-main)] border-[var(--glass-border)] hover:border-[#E63946]/50 shadow-sm opacity-90 hover:opacity-100'
                  }`}
                >
                  <span className="w-8 h-8 rounded-xl bg-white/20 dark:bg-black/10 flex items-center justify-center text-lg shrink-0">📣</span>
                  <span className="font-heading font-black text-xs leading-tight line-clamp-1">E-Lapor 112</span>
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeAppTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[var(--bg-main)] p-6 sm:p-7 rounded-2xl border border-[var(--glass-border)] shadow-inner relative overflow-hidden"
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--glass-border)] text-[10px] font-extrabold tracking-widest uppercase text-[var(--text-muted)]">
                    <span>⚡ Single Sign-On NIK</span>
                    <span className="text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Terhubung SKPD</span>
                  </div>

                  {activeAppTab === "parakAcil" && (
                    <div>
                      <span className="text-[10px] font-extrabold text-[#F4C038] uppercase tracking-widest block mb-1">Disdukcapil Banjarmasin</span>
                      <h4 className="font-heading font-black text-xl text-[var(--text-main)] mb-2">Parak Acil Online</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed mb-5">
                        Pelayanan Pendaftaran Penduduk dan Pencatatan Sipil Online. Warga dapat mengajukan cetak KTP-el, Kartu Keluarga, Akta Kelahiran, dan KIA langsung dari ponsel terintegrasi di menu Super-App.
                      </p>
                      <span className="inline-block bg-[#F4C038]/15 text-[#F4C038] border border-[#F4C038]/30 px-3.5 py-1.5 rounded-xl text-xs font-bold">Layanan administrasi tanpa antre ✓</span>
                    </div>
                  )}
                  {activeAppTab === "baApik" && (
                    <div>
                      <span className="text-[10px] font-extrabold text-[#00A896] uppercase tracking-widest block mb-1">Dinkes & RSUD Sultan Suriansyah</span>
                      <h4 className="font-heading font-black text-xl text-[var(--text-main)] mb-2">Aplikasi BaApik</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed mb-5">
                        Banjarmasin Aplikasi Pasien Internal Kesehatan. Mempermudah pendaftaran berobat online, cek jadwal dokter, dan reservasi nomor antrean di seluruh Puskesmas dan RSUD Kota Banjarmasin secara presisi.
                      </p>
                      <span className="inline-block bg-[#00A896]/15 text-[#00A896] border border-[#00A896]/30 px-3.5 py-1.5 rounded-xl text-xs font-bold">Kepastian nomor antrean secara real-time ✓</span>
                    </div>
                  )}
                  {activeAppTab === "salamRindu" && (
                    <div>
                      <span className="text-[10px] font-extrabold text-[#33C3B3] uppercase tracking-widest block mb-1">DPMPTSP Kota Banjarmasin</span>
                      <h4 className="font-heading font-black text-xl text-[var(--text-main)] mb-2">SALAM-RINDU Perizinan</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed mb-5">
                        Sistem aplikasi layanan perizinan usaha maupun non-OSS terpadu. Mempermudah pelaku UMKM dan investor mengajukan izin reklame, izin kesehatan, dan berbagai surat ketetapan daerah secara transparan.
                      </p>
                      <span className="inline-block bg-[#33C3B3]/15 text-[#33C3B3] border border-[#33C3B3]/30 px-3.5 py-1.5 rounded-xl text-xs font-bold">Proses perizinan transparan & cepat ✓</span>
                    </div>
                  )}
                  {activeAppTab === "siSintal" && (
                    <div>
                      <span className="text-[10px] font-extrabold text-[#9D4EDD] uppercase tracking-widest block mb-1">Dinas Sosial Banjarmasin</span>
                      <h4 className="font-heading font-black text-xl text-[var(--text-main)] mb-2">SI-SINTAL Cek Bansos</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed mb-5">
                        Layanan pengecekan Data Terpadu Kesejahteraan Sosial (DTKS) dan informasi penyaluran bantuan sosial (Bansos) bagi warga berhak secara akurat dan tepat sasaran.
                      </p>
                      <span className="inline-block bg-[#9D4EDD]/15 text-[#9D4EDD] border border-[#9D4EDD]/30 px-3.5 py-1.5 rounded-xl text-xs font-bold">Data kesejahteraan transparan ✓</span>
                    </div>
                  )}
                  {activeAppTab === "epbb" && (
                    <div>
                      <span className="text-[10px] font-extrabold text-[#219EBC] uppercase tracking-widest block mb-1">Badan Pengelola Keuangan & Pendapatan</span>
                      <h4 className="font-heading font-black text-xl text-[var(--text-main)] mb-2">e-PBB & Pajak Daerah</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed mb-5">
                        Kemudahan pengecekan tagihan Pajak Bumi dan Bangunan (PBB-P2) serta pembayaran pajak daerah secara online melalui integrasi QRIS dan Virtual Account Bank Kalsel.
                      </p>
                      <span className="inline-block bg-[#219EBC]/15 text-[#219EBC] border border-[#219EBC]/30 px-3.5 py-1.5 rounded-xl text-xs font-bold">Transparan, Cepat, & Aman ✓</span>
                    </div>
                  )}
                  {activeAppTab === "elapor" && (
                    <div>
                      <span className="text-[10px] font-extrabold text-[#E63946] uppercase tracking-widest block mb-1">Diskominfotik & BPBD</span>
                      <h4 className="font-heading font-black text-xl text-[var(--text-main)] mb-2">E-Lapor & Darurat 112</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed mb-5">
                        Saluran pengaduan aspirasi masyarakat, pantauan CCTV lalu lintas ATCS, dan panggilan darurat gratis 112 (kebakaran, ambulans, rescue) dengan pemantauan penanganan langsung.
                      </p>
                      <span className="inline-block bg-[#E63946]/15 text-[#E63946] border border-[#E63946]/30 px-3.5 py-1.5 rounded-xl text-xs font-bold">Respons Cepat 24 Jam ✓</span>
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

            {/* Card 2: Banjarmasin Pintar */}
            <div className="bg-[var(--bg-main)] border border-[var(--glass-border)] rounded-[32px] p-6 sm:p-8 hover:border-[#00A896] transition-all shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-teal-500/20 transition-all"></div>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="w-14 h-14 rounded-2xl bg-[#00A896]/20 border border-[#00A896]/40 flex items-center justify-center text-3xl">📱</span>
                  <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-[#00A896]/20 text-[#00A896]">Diskominfotik</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] font-heading mb-3">
                  Super-App Banjarmasin Pintar
                </h3>
                <p className="text-[var(--text-muted)] font-body text-sm leading-relaxed mb-6">
                  Super-App resmi Pemko Banjarmasin berbasis Single Sign-On (SSO) NIK KTP. Mengintegrasikan puluhan layanan publik daerah: Parak Acil (Kependudukan), BaApik (Antrean Puskesmas & RSUD), SALAM-RINDU (Perizinan Usaha), SI-SINTAL (Cek Bansos), e-PBB, hingga panggilan darurat 112 & CCTV ATCS dalam satu aplikasi.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]"><span className="text-[#00A896]">✓</span> SSO NIK KTP untuk puluhan layanan SKPD</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]"><span className="text-[#00A896]">✓</span> Antrean RSUD/Puskesmas, Perizinan, & Bansos</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]"><span className="text-[#00A896]">✓</span> Unduh gratis di Google Play Store</div>
                </div>
              </div>
              <a href="https://play.google.com/store/search?q=banjarmasin+pintar&c=apps" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[var(--card-bg)] hover:bg-[#00A896] hover:text-white text-[var(--text-main)] font-black text-xs py-3.5 px-6 rounded-xl border border-[var(--glass-border)] transition-all">
                Download Banjarmasin Pintar ➔
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
              DPMPTSP Kota Banjarmasin menghadirkan inovasi <strong className="text-[var(--text-main)] font-black">Si MANTAB</strong> (Maantar Perizinan Tanpa Bayar), di mana dokumen izin usaha yang selesai diproses akan langsung diantarkan oleh kurir PT Pos Indonesia ke alamat rumah pemohon secara gratis!
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
                Bekerja sama dengan PT Pos Indonesia, dokumen fisik izin usaha diantarkan langsung ke alamat rumah pemohon tanpa dipungut biaya (Gratis / Tanpa Bayar).
              </p>
            </div>

          </div>

          {/* e-Limpas Banner */}
          <div className="bg-[var(--card-bg)] border-2 border-[#F4C038] rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto text-[var(--text-main)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F4C038] bg-[#F4C038]/15 px-3 py-1 rounded-full inline-block">Smart Economy Pasar</span>
              <h3 className="text-2xl font-black font-heading text-[var(--text-main)]">Sistem Retribusi e-Limpas</h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body max-w-xl leading-relaxed">
                Aplikasi resmi Layanan Informasi Pasar (e-Limpas) dari Diskominfotik untuk memantau harga komoditas pangan pokok secara transparan dan digitalisasi retribusi pasar tradisional se-Kota Banjarmasin.
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
              ✦ SMART MOBILITY & TRANSPORTASI
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
              Moda Transportasi <span className="text-[#33C3B3]">Modern</span>
            </h2>
            <p className="text-[var(--text-muted)] font-body mt-3 text-sm sm:text-base">
              Mengenal dua armada bus unggulan yang melayani mobilitas warga di dalam kota hingga aglomerasi antar-wilayah.
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <button
              onClick={() => setActiveTransportTab("transBanjarmasin")}
              className={`px-6 py-3 rounded-full font-heading font-black text-xs sm:text-sm transition-all border ${
                activeTransportTab === "transBanjarmasin"
                  ? 'bg-[#33C3B3] text-[#091422] border-[#33C3B3] shadow-[0_0_20px_rgba(51,195,179,0.4)] scale-105'
                  : 'bg-[var(--bg-main)] text-[var(--text-muted)] border-[var(--glass-border)] hover:border-[#33C3B3]'
              }`}
            >
              🚐 Trans Banjarmasin (Bus Dalam Kota)
            </button>
            <button
              onClick={() => setActiveTransportTab("transBanjarbakula")}
              className={`px-6 py-3 rounded-full font-heading font-black text-xs sm:text-sm transition-all border ${
                activeTransportTab === "transBanjarbakula"
                  ? 'bg-[#E63946] text-white border-[#E63946] shadow-[0_0_20px_rgba(230,57,70,0.4)] scale-105'
                  : 'bg-[var(--bg-main)] text-[var(--text-muted)] border-[var(--glass-border)] hover:border-[#E63946]'
              }`}
            >
              🚌 Trans Banjarbakula (Tayo Hijau BRT)
            </button>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTransportTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--bg-main)] border border-[var(--glass-border)] rounded-[32px] p-6 sm:p-10 max-w-4xl mx-auto shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
            >
              {activeTransportTab === "transBanjarmasin" ? (
                <>
                  <div className="md:col-span-7 space-y-4 text-left">
                    <span className="text-xs font-bold text-[#33C3B3] uppercase tracking-wider block">Dishub Kota Banjarmasin</span>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading text-[var(--text-main)]">Bus Trans Banjarmasin</h3>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed">
                      Layanan transportasi umum dalam kota milik Pemerintah Kota Banjarmasin yang berfungsi layaknya armada pengumpan (<span className="font-semibold text-[var(--text-main)]">feeder</span>) untuk menghubungkan mobilitas warga dari kawasan permukiman ke halte koridor utama. Melayani rute strategis mulai dari Terminal KM 6, Pasar Antasari, Kayutangi, Teluk Tiram, hingga Alalak. Armada ber-AC nyaman dengan tarif terjangkau (Rp2.000 pelajar & Rp3.000 umum) berbasis pembayaran non-tunai (QRIS / Kartu Uang Elektronik).
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <span className="inline-block bg-[#33C3B3]/20 text-[#33C3B3] font-bold text-xs px-4 py-2 rounded-xl border border-[#33C3B3]/30">
                        Tarif Pelajar Rp2.000 ✓
                      </span>
                      <span className="inline-block bg-[#00A896]/20 text-[#00A896] font-bold text-xs px-4 py-2 rounded-xl border border-[#00A896]/30">
                        Feeder Dalam Kota ✓
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-5 h-[240px] rounded-2xl overflow-hidden shadow-lg relative">
                    <img loading="lazy" src="/profil kota/Angkutan-BTS-Trans-Banjarmasin-t.webp" alt="Armada Trans Banjarmasin" className="w-full h-full object-cover" />
                    <div className="absolute bottom-3 left-3 bg-[#091422]/80 backdrop-blur-md text-[#33C3B3] text-[10px] font-bold px-3 py-1 rounded-full border border-[#33C3B3]/40">📍 Koridor Dalam Kota</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="md:col-span-7 space-y-4 text-left">
                    <span className="text-xs font-bold text-[#E63946] uppercase tracking-wider block">Kemenhub Teman Bus & Pemprov Kalsel</span>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading text-[var(--text-main)]">Bus Trans Banjarbakula</h3>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed">
                      Populer disapa warga sebagai <strong className="text-[var(--text-main)] font-black">"Tayo Hijau"</strong>, sistem Bus Rapid Transit (BRT) Buy The Service ini beroperasi mirip <span className="font-semibold text-[var(--text-main)]">TransJakarta (TJ)</span> untuk melayani koridor utama aglomerasi lintas kota/kabupaten (Banjarmasin - Banjarbaru - Gambut - Bati-Bati). Dilengkapi CCTV pengaman, pembayaran 100% non-tunai (Tap e-Money Mandiri, BRI, BNI, BCA), tarif Rp5.000 umum (Rp2.000 pelajar/lansia), serta pelacakan posisi bus real-time via aplikasi Teman Bus.
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <span className="inline-block bg-[#E63946]/20 text-[#E63946] font-bold text-xs px-4 py-2 rounded-xl border border-[#E63946]/30">
                        Mirip TransJakarta (BRT) ✓
                      </span>
                      <span className="inline-block bg-[#F4C038]/20 text-[#F4C038] font-bold text-xs px-4 py-2 rounded-xl border border-[#F4C038]/30">
                        Aglomerasi Lintas Kota ✓
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-5 h-[240px] rounded-2xl overflow-hidden shadow-lg relative">
                    <img loading="lazy" src="/profil kota/trans banjarbakula.webp" alt="Trans Banjarbakula Tayo Hijau" className="w-full h-full object-cover" />
                    <div className="absolute bottom-3 left-3 bg-[#091422]/80 backdrop-blur-md text-[#E63946] text-[10px] font-bold px-3 py-1 rounded-full border border-[#E63946]/40">📍 Koridor Siring & Pal 0</div>
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
