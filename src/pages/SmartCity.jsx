import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { pagesTranslations } from '../translations/pagesTranslations';

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
  const { language } = useLanguage();
  
  const tLocal = (key) => {
    const keys = key.split('.');
    let translation = pagesTranslations[language]?.smartCity;
    if (!translation) {
      translation = pagesTranslations['id']?.smartCity;
    }
    
    for (const k of keys) {
      if (translation && translation[k] !== undefined) {
        translation = translation[k];
      } else {
        let fallback = pagesTranslations['id']?.smartCity;
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return key;
          }
        }
        return fallback;
      }
    }
    return translation;
  };
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
        <div className="hidden dark:block absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-teal-500/10 blur-[160px] rounded-full pointer-events-none select-none transform-gpu -z-10" />

        <div className="text-center max-w-4xl mx-auto px-4 mb-8 sm:mb-12 relative z-10">
          <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-3 font-heading">
            {tLocal('heroTag')}
          </span>
          <h1 className="hero-title !mb-4">
            {tLocal('heroTitle')} <br/><span className="text-sasirangan">{tLocal('heroTitleSpan')}</span>
          </h1>
          <p className="hero-subtitle mx-auto !mb-4 sm:!mb-8 !max-w-2xl px-2">
            {tLocal('heroSubtitle')}
          </p>
        </div>

        {/* Responsive 5-Pillar Arc (Horizontal Scroll on Mobile, Full on Desktop) */}
        <div className="flex overflow-x-auto snap-x hide-scrollbar md:grid md:grid-cols-5 gap-4 sm:gap-6 md:gap-3 lg:gap-4 max-w-[1300px] mx-auto px-4 md:px-6 mt-4 sm:-mt-2 md:-mt-10 lg:-mt-16 pb-6 md:pb-0 relative z-20 items-end">
          {pillarsData.map((pillar, idx) => {
            const transPillar = (tLocal('pillars') || [])[idx] || {};
            return (
              <div
                key={pillar.id}
                style={pillar.clipStyle}
                className={`group shrink-0 snap-center w-[240px] sm:w-[320px] md:w-auto bg-[var(--card-bg)] border-x border-t border-[var(--glass-border)] border-b-0 overflow-hidden shadow-xl md:shadow-2xl transition-all duration-500 flex flex-col relative rounded-t-2xl ${pillar.heightClass} ${pillar.transformClass}`}
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
                      {transPillar.title || pillar.title}
                    </h3>
                    <span className="hidden sm:block text-[10px] md:text-[11px] font-medium text-white/90 mt-0.5 line-clamp-1">
                      {transPillar.subtitle || pillar.subtitle}
                    </span>
                  </div>
                </div>

                {/* Bottom Image Strip */}
                <div className="flex-1 relative overflow-hidden">
                  <img
                    src={pillar.img}
                    alt={transPillar.title || pillar.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 transform-gpu"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          SECTION 1: SHOWCASE SUPER-APP "BANJARMASIN PINTAR"
          ========================================================= */}
      <motion.section
        id="superapp"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="py-24 bg-[var(--bg-main)] relative overflow-hidden border-t border-[var(--glass-border)]"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
              <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] px-3.5 py-1.5 rounded-full bg-[#33C3B3]/10 border border-[#33C3B3]/30 font-heading shadow-sm">
                {tLocal('superappTag')}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
                {tLocal('superappTitle')} <br/><span className="text-[#F4C038]">{tLocal('superappTitleSpan')}</span>
              </h2>
              <p className="text-[var(--text-muted)] font-body leading-relaxed text-sm sm:text-base max-w-xl mx-auto lg:mx-0">
                {tLocal('superappDesc')}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 max-w-md mx-auto lg:mx-0">
                <div className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--glass-border)] shadow-md text-left">
                  <span className="text-xl sm:text-2xl font-black text-[#33C3B3] font-heading block mb-1">{tLocal('superappCol1Title')}</span>
                  <span className="text-xs text-[var(--text-muted)] font-bold">{tLocal('superappCol1Sub')}</span>
                </div>
                <div className="p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--glass-border)] shadow-md text-left">
                  <span className="text-xl sm:text-2xl font-black text-[#F4C038] font-heading block mb-1">{tLocal('superappCol2Title')}</span>
                  <span className="text-xs text-[var(--text-muted)] font-bold">{tLocal('superappCol2Sub')}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
                <a
                  href="https://play.google.com/store/search?q=banjarmasin+pintar&c=apps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#008075] to-[#00A896] hover:from-[#00665e] hover:to-[#008075] text-white font-black px-8 py-4 rounded-2xl shadow-xl shadow-teal-500/25 transition-all transform hover:-translate-y-1 text-sm sm:text-base"
                >
                  <span className="text-xl">📱</span> {tLocal('superappDownload')}
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
                  <span>💫</span> {tLocal('simulasiTitle')}
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
                  <span className="font-heading font-black text-xs leading-tight line-clamp-1">{tLocal('simulasiTab1')}</span>
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
                  <span className="font-heading font-black text-xs leading-tight line-clamp-1">{tLocal('simulasiTab2')}</span>
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
                  <span className="font-heading font-black text-xs leading-tight line-clamp-1">{tLocal('simulasiTab3')}</span>
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
                  <span className="font-heading font-black text-xs leading-tight line-clamp-1">{tLocal('simulasiTab4')}</span>
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
                  <span className="font-heading font-black text-xs leading-tight line-clamp-1">{tLocal('simulasiTab5')}</span>
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
                  <span className="font-heading font-black text-xs leading-tight line-clamp-1">{tLocal('simulasiTab6')}</span>
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
                    <span>⚡ {tLocal('simulasiSso')}</span>
                    <span className="text-emerald-500 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> {tLocal('simulasiStatus')}</span>
                  </div>

                  {activeAppTab === "parakAcil" && (
                    <div>
                      <span className="text-[10px] font-extrabold text-[#F4C038] uppercase tracking-widest block mb-1">{tLocal('simulasiData.parakAcil.tag')}</span>
                      <h4 className="font-heading font-black text-xl text-[var(--text-main)] mb-2">{tLocal('simulasiData.parakAcil.title')}</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed mb-5">
                        {tLocal('simulasiData.parakAcil.desc')}
                      </p>
                      <span className="inline-block bg-[#F4C038]/15 text-[#F4C038] border border-[#F4C038]/30 px-3.5 py-1.5 rounded-xl text-xs font-bold">{tLocal('simulasiData.parakAcil.badge')}</span>
                    </div>
                  )}
                  {activeAppTab === "baApik" && (
                    <div>
                      <span className="text-[10px] font-extrabold text-[#00A896] uppercase tracking-widest block mb-1">{tLocal('simulasiData.baApik.tag')}</span>
                      <h4 className="font-heading font-black text-xl text-[var(--text-main)] mb-2">{tLocal('simulasiData.baApik.title')}</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed mb-5">
                        {tLocal('simulasiData.baApik.desc')}
                      </p>
                      <span className="inline-block bg-[#00A896]/15 text-[#00A896] border border-[#00A896]/30 px-3.5 py-1.5 rounded-xl text-xs font-bold">{tLocal('simulasiData.baApik.badge')}</span>
                    </div>
                  )}
                  {activeAppTab === "salamRindu" && (
                    <div>
                      <span className="text-[10px] font-extrabold text-[#33C3B3] uppercase tracking-widest block mb-1">{tLocal('simulasiData.salamRindu.tag')}</span>
                      <h4 className="font-heading font-black text-xl text-[var(--text-main)] mb-2">{tLocal('simulasiData.salamRindu.title')}</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed mb-5">
                        {tLocal('simulasiData.salamRindu.desc')}
                      </p>
                      <span className="inline-block bg-[#33C3B3]/15 text-[#33C3B3] border border-[#33C3B3]/30 px-3.5 py-1.5 rounded-xl text-xs font-bold">{tLocal('simulasiData.salamRindu.badge')}</span>
                    </div>
                  )}
                  {activeAppTab === "siSintal" && (
                    <div>
                      <span className="text-[10px] font-extrabold text-[#9D4EDD] uppercase tracking-widest block mb-1">{tLocal('simulasiData.siSintal.tag')}</span>
                      <h4 className="font-heading font-black text-xl text-[var(--text-main)] mb-2">{tLocal('simulasiData.siSintal.title')}</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed mb-5">
                        {tLocal('simulasiData.siSintal.desc')}
                      </p>
                      <span className="inline-block bg-[#9D4EDD]/15 text-[#9D4EDD] border border-[#9D4EDD]/30 px-3.5 py-1.5 rounded-xl text-xs font-bold">{tLocal('simulasiData.siSintal.badge')}</span>
                    </div>
                  )}
                  {activeAppTab === "epbb" && (
                    <div>
                      <span className="text-[10px] font-extrabold text-[#219EBC] uppercase tracking-widest block mb-1">{tLocal('simulasiData.epbb.tag')}</span>
                      <h4 className="font-heading font-black text-xl text-[var(--text-main)] mb-2">{tLocal('simulasiData.epbb.title')}</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed mb-5">
                        {tLocal('simulasiData.epbb.desc')}
                      </p>
                      <span className="inline-block bg-[#219EBC]/15 text-[#219EBC] border border-[#219EBC]/30 px-3.5 py-1.5 rounded-xl text-xs font-bold">{tLocal('simulasiData.epbb.badge')}</span>
                    </div>
                  )}
                  {activeAppTab === "elapor" && (
                    <div>
                      <span className="text-[10px] font-extrabold text-[#E63946] uppercase tracking-widest block mb-1">{tLocal('simulasiData.elapor.tag')}</span>
                      <h4 className="font-heading font-black text-xl text-[var(--text-main)] mb-2">{tLocal('simulasiData.elapor.title')}</h4>
                      <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed mb-5">
                        {tLocal('simulasiData.elapor.desc')}
                      </p>
                      <span className="inline-block bg-[#E63946]/15 text-[#E63946] border border-[#E63946]/30 px-3.5 py-1.5 rounded-xl text-xs font-bold">{tLocal('simulasiData.elapor.badge')}</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </motion.section>

      {/* =========================================================
          SECTION 2: LAYANAN KEPENDUDUKAN & KESEHATAN (DUAL CARDS)
          ========================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="py-24 bg-[var(--card-bg)] border-y border-[var(--glass-border)] relative"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-2 font-heading">
              {tLocal('section2Tag')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
              {tLocal('section2Title')} <span className="text-[#33C3B3]">{tLocal('section2TitleSpan')}</span>
            </h2>
            <p className="text-[var(--text-muted)] font-body mt-3 text-sm sm:text-base">
              {tLocal('section2Desc')}
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
                  {tLocal('section2Card1Title')}
                </h3>
                <p className="text-[var(--text-muted)] font-body text-sm leading-relaxed mb-6">
                  {tLocal('section2Card1Desc')}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]"><span className="text-[#33C3B3]">✓</span> {tLocal('section2Card1Point1')}</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]"><span className="text-[#33C3B3]">✓</span> {tLocal('section2Card1Point2')}</div>
                </div>
              </div>
              <a href="https://parakacil.banjarmasinkota.go.id" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[var(--card-bg)] hover:bg-[#F4C038] hover:text-[#091422] text-[var(--text-main)] font-black text-xs py-3.5 px-6 rounded-xl border border-[var(--glass-border)] transition-all">
                {tLocal('section2Card1Btn')}
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
                  {tLocal('section2Card2Title')}
                </h3>
                <p className="text-[var(--text-muted)] font-body text-sm leading-relaxed mb-6">
                  {tLocal('section2Card2Desc')}
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]"><span className="text-[#00A896]">✓</span> {tLocal('section2Card2Point1')}</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]"><span className="text-[#00A896]">✓</span> {tLocal('section2Card2Point2')}</div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-main)]"><span className="text-[#00A896]">✓</span> {tLocal('section2Card2Point3')}</div>
                </div>
              </div>
              <a href="https://play.google.com/store/search?q=banjarmasin+pintar&c=apps" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[var(--card-bg)] hover:bg-[#00A896] hover:text-white text-[var(--text-main)] font-black text-xs py-3.5 px-6 rounded-xl border border-[var(--glass-border)] transition-all">
                {tLocal('section2Card2Btn')}
              </a>
            </div>

          </div>
        </div>
      </motion.section>

      {/* =========================================================
          SECTION 3: REVOLUSI PERIZINAN & PASAR (STEPPER WORKFLOW)
          ========================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="py-24 bg-[var(--bg-main)] relative overflow-hidden"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#F4C038] mb-2 font-heading">
              {tLocal('section3Tag')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
              {tLocal('section3Title')} <span className="text-[#F4C038]">{tLocal('section3TitleSpan')}</span>
            </h2>
            <p className="text-[var(--text-muted)] font-body mt-3 text-sm sm:text-base">
              {tLocal('section3Desc')}
            </p>
          </div>

          {/* 3-Step Factual Workflow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16 relative before:hidden md:before:block before:absolute before:top-1/2 before:left-10 before:right-10 before:h-[2px] before:bg-[var(--glass-border)] before:-translate-y-12 before:z-0">
            
            <div className="bg-[var(--card-bg)] border border-[var(--glass-border)] p-6 sm:p-8 rounded-3xl relative z-10 text-center shadow-lg hover:border-[#F4C038] transition-all">
              <span className="w-16 h-16 rounded-full bg-[#F4C038] text-[#091422] font-black font-heading text-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(244,192,56,0.4)]">
                01
              </span>
              <h4 className="font-heading font-black text-lg text-[var(--text-main)] mb-2">{(tLocal('section3Steps') || [])[0]?.title || "Daftar Izin Online"}</h4>
              <p className="text-xs text-[var(--text-muted)] font-body leading-relaxed">
                {(tLocal('section3Steps') || [])[0]?.desc || "Pelaku usaha mengajukan permohonan izin melalui sistem OSS RBA atau aplikasi perizinan DPMPTSP tanpa keluar rumah."}
              </p>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--glass-border)] p-6 sm:p-8 rounded-3xl relative z-10 text-center shadow-lg hover:border-[#33C3B3] transition-all">
              <span className="w-16 h-16 rounded-full bg-[#33C3B3] text-[#091422] font-black font-heading text-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(51,195,179,0.4)]">
                02
              </span>
              <h4 className="font-heading font-black text-lg text-[var(--text-main)] mb-2">{(tLocal('section3Steps') || [])[1]?.title || "Verifikasi Digital"}</h4>
              <p className="text-xs text-[var(--text-muted)] font-body leading-relaxed">
                {(tLocal('section3Steps') || [])[1]?.desc || "Tim DPMPTSP melakukan verifikasi berkas dan menerbitkan surat izin resmi secara elektronik dengan tanda tangan digital sah."}
              </p>
            </div>

            <div className="bg-[var(--card-bg)] border border-[var(--glass-border)] p-6 sm:p-8 rounded-3xl relative z-10 text-center shadow-lg hover:border-[#00A896] transition-all">
              <span className="w-16 h-16 rounded-full bg-[#00A896] text-white font-black font-heading text-xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(0,168,150,0.4)]">
                03
              </span>
              <h4 className="font-heading font-black text-lg text-[var(--text-main)] mb-2">{(tLocal('section3Steps') || [])[2]?.title || "Diantar Pos Gratis"}</h4>
              <p className="text-xs text-[var(--text-muted)] font-body leading-relaxed">
                {(tLocal('section3Steps') || [])[2]?.desc || "Bekerja sama dengan PT Pos Indonesia, dokumen fisik izin usaha diantarkan langsung ke alamat rumah pemohon tanpa dipungut biaya (Gratis / Tanpa Bayar)."}
              </p>
            </div>

          </div>

          {/* e-Limpas Banner */}
          <div className="bg-[var(--card-bg)] border-2 border-[#F4C038] rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto text-[var(--text-main)] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
            <div className="space-y-2 relative z-10">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#F4C038] bg-[#F4C038]/15 px-3 py-1 rounded-full inline-block">{tLocal('elimpasTag')}</span>
              <h3 className="text-2xl font-black font-heading text-[var(--text-main)]">{tLocal('elimpasTitle')}</h3>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body max-w-xl leading-relaxed">
                {tLocal('elimpasDesc')}
              </p>
            </div>
            <span className="text-4xl bg-[#F4C038]/20 p-4 rounded-2xl shrink-0 border border-[#F4C038]/40 relative z-10">🏪</span>
          </div>

        </div>
      </motion.section>

      {/* =========================================================
          SECTION 4: SMART MOBILITY & EKOLOGI (INTERACTIVE TABS)
          ========================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="py-24 bg-[var(--card-bg)] border-t border-[var(--glass-border)] relative"
      >
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-2 font-heading">
              {tLocal('section4Tag')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
              {tLocal('section4Title')} <span className="text-[#33C3B3]">{tLocal('section4TitleSpan')}</span>
            </h2>
            <p className="text-[var(--text-muted)] font-body mt-3 text-sm sm:text-base">
              {tLocal('section4Desc')}
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
              🚐 {tLocal('section4Tab1')}
            </button>
            <button
              onClick={() => setActiveTransportTab("transBanjarbakula")}
              className={`px-6 py-3 rounded-full font-heading font-black text-xs sm:text-sm transition-all border ${
                activeTransportTab === "transBanjarbakula"
                  ? 'bg-[#E63946] text-white border-[#E63946] shadow-[0_0_20px_rgba(230,57,70,0.4)] scale-105'
                  : 'bg-[var(--bg-main)] text-[var(--text-muted)] border-[var(--glass-border)] hover:border-[#E63946]'
              }`}
            >
              🚌 {tLocal('section4Tab2')}
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
                    <span className="text-xs font-bold text-[#33C3B3] uppercase tracking-wider block">{tLocal('section4Data.transBanjarmasin.tag')}</span>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading text-[var(--text-main)]">{tLocal('section4Data.transBanjarmasin.title')}</h3>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed">
                      {tLocal('section4Data.transBanjarmasin.desc')}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <span className="inline-block bg-[#33C3B3]/20 text-[#33C3B3] font-bold text-xs px-4 py-2 rounded-xl border border-[#33C3B3]/30">
                        {tLocal('section4Data.transBanjarmasin.point1')}
                      </span>
                      <span className="inline-block bg-[#00A896]/20 text-[#00A896] font-bold text-xs px-4 py-2 rounded-xl border border-[#00A896]/30">
                        {tLocal('section4Data.transBanjarmasin.point2')}
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-5 h-[240px] rounded-2xl overflow-hidden shadow-lg relative">
                    <img loading="lazy" src="/profil kota/Angkutan-BTS-Trans-Banjarmasin-t.webp" alt="Armada Trans Banjarmasin" className="w-full h-full object-cover" />
                    <div className="absolute bottom-3 left-3 bg-[#091422]/80 backdrop-blur-md text-[#33C3B3] text-[10px] font-bold px-3 py-1 rounded-full border border-[#33C3B3]/40">📍 {tLocal('section4Data.transBanjarmasin.badge')}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="md:col-span-7 space-y-4 text-left">
                    <span className="text-xs font-bold text-[#E63946] uppercase tracking-wider block">{tLocal('section4Data.transBanjarbakula.tag')}</span>
                    <h3 className="text-2xl sm:text-3xl font-black font-heading text-[var(--text-main)]">{tLocal('section4Data.transBanjarbakula.title')}</h3>
                    <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed">
                      {tLocal('section4Data.transBanjarbakula.desc')}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <span className="inline-block bg-[#E63946]/20 text-[#E63946] font-bold text-xs px-4 py-2 rounded-xl border border-[#E63946]/30">
                        {tLocal('section4Data.transBanjarbakula.point1')}
                      </span>
                      <span className="inline-block bg-[#F4C038]/20 text-[#F4C038] font-bold text-xs px-4 py-2 rounded-xl border border-[#F4C038]/30">
                        {tLocal('section4Data.transBanjarbakula.point2')}
                      </span>
                    </div>
                  </div>
                  <div className="md:col-span-5 h-[240px] rounded-2xl overflow-hidden shadow-lg relative">
                    <img loading="lazy" decoding="async" src="/profil kota/trans banjarbakula.webp" alt="Trans Banjarbakula Tayo Hijau" className="w-full h-full object-cover transform-gpu" />
                    <div className="absolute bottom-3 left-3 bg-[#091422]/80 backdrop-blur-md text-[#E63946] text-[10px] font-bold px-3 py-1 rounded-full border border-[#E63946]/40">📍 {tLocal('section4Data.transBanjarbakula.badge')}</div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

        </div>
      </motion.section>

      {/* =========================================================
          SECTION 5: SMART SOCIETY & EPILOG (CTA)
          ========================================================= */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="py-28 bg-gradient-to-b from-[var(--card-bg)] to-[var(--bg-main)] relative text-center overflow-hidden border-t border-[var(--glass-border)]"
      >
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="inline-block text-xs font-extrabold tracking-[0.3em] uppercase text-[#7B2CBF] mb-6 font-heading">
            {tLocal('section5Tag')}
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[var(--text-main)] font-heading leading-tight mb-8 drop-shadow-2xl">
            {tLocal('section5Title')} <br/>
            <span className="text-[#33C3B3]">{tLocal('section5TitleSpan')}</span>
          </h2>
          <p className="text-base sm:text-xl text-[var(--text-muted)] font-body max-w-2xl mx-auto leading-relaxed mb-10">
            {tLocal('section5Desc')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/wisata" className="bg-[#F4C038] hover:bg-amber-400 text-[#091422] font-black px-8 py-4 rounded-full shadow-md transition-transform hover:-translate-y-1 text-sm sm:text-base">
              {tLocal('section5Btn1')}
            </Link>
            <Link to="/profil" className="bg-[var(--card-bg)] border border-[var(--glass-border)] hover:border-[#33C3B3] text-[var(--text-main)] font-black px-8 py-4 rounded-full transition-all text-sm sm:text-base">
              {tLocal('section5Btn2')}
            </Link>
          </div>
        </div>
      </motion.section>

      <Footer />
    </>
  );
}
