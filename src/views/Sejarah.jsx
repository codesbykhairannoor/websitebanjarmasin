"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { pagesTranslations } from '../translations/pagesTranslations';

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
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(1);

  const tLocal = (key) => {
    return pagesTranslations[language]?.sejarah?.[key] || pagesTranslations['id']?.sejarah?.[key];
  };

  const timelineDataMeta = [
    { year: "1526", img: "/sejarah/Kesultanan-Banjar.webp" },
    { year: "1606", img: "/profil kota/pelabuhan trisakti.webp" },
    { year: "1859", img: "/sejarah/PERANG_BANJAR_1857-1859.webp" },
    { year: "1945", img: "/sejarah/bendera-merah-putih.webp" },
    { year: "Kini", img: "/sejarah/banjarmasin baiman.webp" }
  ];
  const translatedTimeline = tLocal('timelineData') || [];
  const timelineData = timelineDataMeta.map((t, idx) => ({
    ...t,
    ...(translatedTimeline[idx] || {})
  }));

  const perangBanjarDataMeta = [
    { id: 1 },
    { id: 2 },
    { id: 3 }
  ];
  const translatedPerang = tLocal('perangBanjarData') || [];
  const perangBanjarData = perangBanjarDataMeta.map((p, idx) => ({
    ...p,
    ...(translatedPerang[idx] || {})
  }));

  // Sync activeTab when language changes to prevent out of bounds (though it has same length)
  useEffect(() => {
    setActiveTab(0);
  }, [language]);

  // Dynamic Page Metadata (SEO & JSON-LD)
  useEffect(() => {
    const titles = {
      id: "Sejarah & Lintas Waktu Kota Banjarmasin - Portal Resmi",
      en: "History & Timeline of Banjarmasin - Official Portal",
      ms: "Sejarah & Lintas Waktu Kota Banjarmasin - Portal Rasmi",
      zh: "马辰市历史与发展沿革 - 官方门户网站"
    };
    const descriptions = {
      id: "Telusuri jejak Kesultanan Banjar sejak 1526, heroisme Perang Banjar Pangeran Antasari, era keemasan lada, hingga transformasi metropolitan modern.",
      en: "Trace the footprints of the Banjar Sultanate since 1526, Prince Antasari's heroism in the Banjar War, the pepper golden age, and modern metropolitan transformation.",
      ms: "Terokai jejak Kesultanan Banjar sejak 1526, semangat waja Perang Banjar Pangeran Antasari, zaman keemasan lada hitam, sehingga transformasi metropolitan moden.",
      zh: "探索自1526年成立的马辰苏丹国历史底蕴、安达沙里王子的抗荷抗争历史、黑胡椒贸易港黄金时代及现代都市转型。"
    };

    document.title = titles[language] || titles.id;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', descriptions[language] || descriptions.id);

    // Inject JSON-LD Schema
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "ItemPage",
      "name": titles[language] || titles.id,
      "description": descriptions[language] || descriptions.id,
      "url": window.location.href,
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": timelineData.map((t, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": t.title,
          "description": t.desc
        }))
      }
    };

    let schemaScript = document.getElementById('jsonld-schema');
    if (!schemaScript) {
      schemaScript = document.createElement('script');
      schemaScript.setAttribute('type', 'application/ld+json');
      schemaScript.setAttribute('id', 'jsonld-schema');
      document.head.appendChild(schemaScript);
    }
    schemaScript.textContent = JSON.stringify(schemaData);

    return () => {
      if (schemaScript) schemaScript.remove();
    };
  }, [language]);

  return (
    <>
      <Navbar />
      
      {/* =========================================================
          HERO SEJARAH: ASYMMETRIC HANGING GALLERY & TYPOGRAPHY
          ========================================================= */}
      <div className="bg-[var(--bg-main)] pt-28 pb-20 overflow-hidden relative border-b border-[var(--glass-border)]">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>

        <div className="max-w-[1300px] mx-auto px-4 sm:px-6 relative flex flex-col items-center">
          
          {/* Typography Box (Teks duluan di atas) */}
          <div className="relative z-30 text-center w-full max-w-3xl px-4 pt-4 mb-12 sm:mb-16 animate-fade-in">
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-3 font-heading">
              {tLocal('heroTag')}
            </span>
            <h1 className="hero-title !mb-4 text-4xl sm:text-5xl lg:text-6xl font-black">
              {tLocal('heroTitle')} <span className="text-sasirangan">{tLocal('heroTitleSpan')}</span>
            </h1>
            <p className="hero-subtitle mx-auto !mb-0 !max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--text-muted)]">
              {tLocal('heroSubtitle')}
            </p>
          </div>

          {/* Asymmetric Horizontal Collage Row (Baru di bawahnya gambar) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 w-full max-w-6xl mx-auto pt-4 pb-6 items-start justify-items-center">
            
            {/* Frame 1 */}
            <div className="transform -rotate-3 lg:-translate-y-6 hover:rotate-0 transition-all duration-500">
              <HangingFrame 
                src="/sejarah/Kesultanan-Banjar.webp" 
                width="w-[155px] sm:w-[210px] lg:w-[230px]"
                height="h-[210px] sm:h-[280px] lg:h-[310px]"
              />
            </div>

            {/* Frame 2 */}
            <div className="transform rotate-3 translate-y-6 lg:translate-y-8 hover:rotate-0 transition-all duration-500">
              <HangingFrame 
                src="/sejarah/PERANG_BANJAR_1857-1859.webp" 
                width="w-[155px] sm:w-[210px] lg:w-[230px]"
                height="h-[210px] sm:h-[280px] lg:h-[310px]"
              />
            </div>

            {/* Frame 3 */}
            <div className="transform -rotate-2 translate-y-2 lg:-translate-y-2 hover:rotate-0 transition-all duration-500">
              <HangingFrame 
                src="/sejarah/250px-Lukisan_Sultan_Suriansyah.webp" 
                width="w-[155px] sm:w-[210px] lg:w-[230px]"
                height="h-[210px] sm:h-[280px] lg:h-[310px]"
              />
            </div>

            {/* Frame 4 */}
            <div className="transform rotate-2 translate-y-8 lg:translate-y-12 hover:rotate-0 transition-all duration-500">
              <HangingFrame 
                src="/sejarah/pangeran antasari.webp" 
                width="w-[155px] sm:w-[210px] lg:w-[230px]"
                height="h-[210px] sm:h-[280px] lg:h-[310px]"
              />
            </div>

          </div>

        </div>
      </div>

      {/* =========================================================
          SECTION 1: GARIS WAKTU INTERAKTIF (INTERACTIVE STEPPER)
          ========================================================= */}
      <section className="py-24 bg-[var(--bg-main)] relative overflow-hidden">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-2 font-heading">
              {tLocal('section1Tag')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
              {tLocal('section1Title')} <span className="text-[#F4C038]">{tLocal('section1TitleSpan')}</span>
            </h2>
            <p className="text-[var(--text-muted)] font-body mt-3">
              {tLocal('section1Desc')}
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="flex sm:justify-center items-center gap-3 sm:gap-4 mb-12 overflow-x-auto hide-scrollbar pb-4 px-4 sm:px-0 snap-x">
            {timelineData.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`shrink-0 snap-center px-6 sm:px-8 py-3 sm:py-4 rounded-full font-heading font-black text-sm sm:text-lg transition-all duration-300 border ${
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
              {tLocal('section2Tag')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
              {tLocal('section2Title')} <span className="text-[#33C3B3]">{tLocal('section2TitleSpan')}</span>
            </h2>
            <p className="text-[var(--text-muted)] font-body mt-3">
              {tLocal('section2Desc')}
            </p>
          </div>

          {/* Horizontal Showcase Cards (Anti-Bento & Uncropped Portrait) */}
          <div className="flex flex-col gap-10 sm:gap-12 max-w-6xl mx-auto">
            
            {/* Tokoh 1: Sultan Suriansyah */}
            <div className="group bg-[var(--bg-main)] border border-[var(--glass-border)] rounded-[36px] overflow-hidden shadow-2xl hover:border-[#F4C038] transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Uncropped Portrait Box */}
              <div className="lg:col-span-5 relative h-[360px] sm:h-[420px] flex items-end justify-center bg-gradient-to-b from-black/20 via-[var(--card-bg)] to-[var(--bg-main)] pt-8 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[#F4C038]/5 rounded-full blur-3xl group-hover:bg-[#F4C038]/15 transition-all duration-700" />
                <img loading="lazy" 
                  src="/sejarah/250px-Lukisan_Sultan_Suriansyah.webp" 
                  alt="Sultan Suriansyah" 
                  className="w-auto h-[320px] sm:h-[380px] object-contain object-bottom filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-all duration-700 relative z-10" 
                />
              </div>
              
              {/* Content Box */}
              <div className="lg:col-span-7 p-8 sm:p-12 text-left relative z-10 flex flex-col justify-between h-full">
                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#F4C038]/15 border border-[#F4C038]/30 text-[#F4C038] font-bold text-xs uppercase tracking-widest mb-4 shadow-sm">
                    {tLocal('tokoh1Tag')}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black text-[var(--text-main)] font-heading mb-4 group-hover:text-[#F4C038] transition-colors">
                    {tLocal('tokoh1Title')}
                  </h3>
                  <p className="text-[var(--text-muted)] font-body text-sm sm:text-base leading-relaxed mb-8">
                    {tLocal('tokoh1Desc')}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-[var(--glass-border)] flex flex-wrap items-center justify-between gap-4 bg-[var(--card-bg)]/50 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🕌</span>
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] block uppercase font-bold tracking-wider">{tLocal('tokoh1FooterTag')}</span>
                      <span className="text-sm font-bold text-[var(--text-main)]">{tLocal('tokoh1FooterVal')}</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#F4C038] bg-[#F4C038]/10 px-3 py-1.5 rounded-xl border border-[#F4C038]/20">{tLocal('tokoh1FooterRight')}</span>
                </div>
              </div>
            </div>

            {/* Tokoh 2: Pangeran Antasari */}
            <div className="group bg-[var(--bg-main)] border border-[var(--glass-border)] rounded-[36px] overflow-hidden shadow-2xl hover:border-[#33C3B3] transition-all duration-500 grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Uncropped Portrait Box (Right on Desktop) */}
              <div className="lg:col-span-5 lg:order-2 relative h-[360px] sm:h-[420px] flex items-end justify-center bg-gradient-to-b from-black/20 via-[var(--card-bg)] to-[var(--bg-main)] pt-8 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-[#33C3B3]/5 rounded-full blur-3xl group-hover:bg-[#33C3B3]/15 transition-all duration-700" />
                <img loading="lazy" 
                  src="/sejarah/pangeran antasari.webp" 
                  alt="Pangeran Antasari" 
                  className="w-auto h-[320px] sm:h-[380px] object-contain object-bottom filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-all duration-700 relative z-10" 
                />
              </div>
              
              {/* Content Box (Left on Desktop) */}
              <div className="lg:col-span-7 lg:order-1 p-8 sm:p-12 text-left relative z-10 flex flex-col justify-between h-full">
                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[#33C3B3]/15 border border-[#33C3B3]/30 text-[#33C3B3] font-bold text-xs uppercase tracking-widest mb-4 shadow-sm">
                    {tLocal('tokoh2Tag')}
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-black text-[var(--text-main)] font-heading mb-4 group-hover:text-[#33C3B3] transition-colors">
                    {tLocal('tokoh2Title')}
                  </h3>
                  <p className="text-[var(--text-muted)] font-body text-sm sm:text-base leading-relaxed mb-6">
                    {tLocal('tokoh2Desc')}
                  </p>
                  
                  {/* Legend Quote Callout */}
                  <div className="mb-6 p-4 rounded-2xl bg-[#33C3B3]/10 border border-[#33C3B3]/30 italic text-sm sm:text-base text-[var(--text-main)] font-heading font-bold shadow-inner">
                    "{tLocal('section5Title')} {tLocal('section5TitleSpan')}"
                  </div>
                </div>
                
                <div className="pt-6 border-t border-[var(--glass-border)] flex flex-wrap items-center justify-between gap-4 bg-[var(--card-bg)]/50 p-4 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🛡️</span>
                    <div>
                      <span className="text-[10px] text-[var(--text-muted)] block uppercase font-bold tracking-wider">{tLocal('tokoh2FooterTag')}</span>
                      <span className="text-sm font-bold text-[var(--text-main)]">{tLocal('tokoh2FooterVal')}</span>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-[#33C3B3] bg-[#33C3B3]/10 px-3 py-1.5 rounded-xl border border-[#33C3B3]/20">{tLocal('tokoh2FooterRight')}</span>
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
                {tLocal('section3Tag')}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight mb-6">
                {tLocal('section3Title')} <br/><span className="text-[#F4C038]">{tLocal('section3TitleSpan')}</span>
              </h2>
              <p className="text-[var(--text-muted)] font-body leading-relaxed mb-6">
                {tLocal('section3Desc')}
              </p>
              <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--glass-border)] space-y-3">
                <div className="flex items-center gap-3 text-sm font-bold text-[var(--text-main)]">
                  <span className="text-[#33C3B3]">✓</span> {tLocal('section3Bul1')}
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[var(--text-main)]">
                  <span className="text-[#33C3B3]">✓</span> {tLocal('section3Bul2')}
                </div>
                <div className="flex items-center gap-3 text-sm font-bold text-[var(--text-main)]">
                  <span className="text-[#33C3B3]">✓</span> {tLocal('section3Bul3')}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4 sm:space-y-6 pt-8 sm:pt-12">
                <div className="h-[200px] sm:h-[260px] rounded-3xl overflow-hidden shadow-xl border border-[var(--glass-border)] relative group">
                  <img loading="lazy" src="/wisata/960px-Pasar_Terapung_Siring_Banj.webp" alt="Pasar Terapung" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white">{tLocal('section3Col1Title')}</div>
                </div>
                <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-center">
                  <span className="text-3xl sm:text-4xl font-black text-[#F4C038] font-heading block mb-1">{tLocal('section3Col2Title')}</span>
                  <span className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider">{tLocal('section3Col2Sub')}</span>
                </div>
              </div>
              <div className="space-y-4 sm:space-y-6">
                <div className="p-6 rounded-3xl bg-teal-500/10 border border-teal-500/30 text-center">
                  <span className="text-3xl sm:text-4xl font-black text-[#33C3B3] font-heading block mb-1">{tLocal('section3Col3Title')}</span>
                  <span className="text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider">{tLocal('section3Col3Sub')}</span>
                </div>
                <div className="h-[200px] sm:h-[260px] rounded-3xl overflow-hidden shadow-xl border border-[var(--glass-border)] relative group">
                  <img loading="lazy" src="/profil kota/sungai.webp" alt="Sungai Martapura" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white">{tLocal('section3Col4Title')}</div>
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
              {tLocal('section4Tag')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
              {tLocal('section4Title')} <span className="text-[#F4C038]">{tLocal('section4TitleSpan')}</span>
            </h2>
            <p className="text-[var(--text-muted)] font-body mt-3">
              {tLocal('section4Desc')}
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
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <span className="inline-block text-xs font-extrabold tracking-[0.3em] uppercase text-[#F4C038] mb-6 font-heading">
            {tLocal('section5Tag')}
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-[var(--text-main)] font-heading leading-tight mb-8 drop-shadow-2xl">
            "{tLocal('section5Title')} <br/>
            <span className="text-[#33C3B3]">{tLocal('section5TitleSpan')}</span>"
          </h2>
          <p className="text-base sm:text-xl text-[var(--text-muted)] font-body max-w-2xl mx-auto leading-relaxed mb-10">
            {tLocal('section5Desc')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/wisata" className="bg-[#F4C038] hover:bg-amber-400 text-[#091422] font-black px-8 py-4 rounded-full shadow-md transition-transform hover:-translate-y-1 text-sm sm:text-base">
              {tLocal('exploreHistory')}
            </Link>
            <Link href="/profil" className="bg-[var(--card-bg)] border border-[var(--glass-border)] hover:border-[#33C3B3] text-[var(--text-main)] font-black px-8 py-4 rounded-full transition-all text-sm sm:text-base">
              {tLocal('backToProfile')}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
