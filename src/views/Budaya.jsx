"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { pagesTranslations } from '../translations/pagesTranslations';


export default function Budaya() {
  const { language } = useLanguage();

  // Helper to load localized data
  const tLocal = (key) => {
    return pagesTranslations[language]?.budaya?.[key] || pagesTranslations['id']?.budaya?.[key];
  };

  const sasiranganImages = [
    { id: 'bayam', hex: '#F4C038', image: '/budaya/motif bayam raj.webp' },
    { id: 'naga', hex: '#00A896', image: '/budaya/naga-balimbur-salah-satu-motif-b.webp' },
    { id: 'kembang', hex: '#E63946', image: '/budaya/motif kembang kacang.webp' },
    { id: 'purun', hex: '#8D5B4C', image: '/budaya/anyaman-purun.webp' },
    { id: 'haruan', hex: '#1E3A8A', image: '/budaya/motif_gigi_haruan.webp' },
    { id: 'sarigading', hex: '#D4AF37', image: '/budaya/kain_sarigading.webp' }
  ];
  const translatedSasirangan = tLocal('sasiranganData') || [];
  const sasiranganData = sasiranganImages.map((s, idx) => ({
    ...s,
    ...(translatedSasirangan[idx] || {})
  }));

  const seniPertunjukanMeta = [
    { id: 'panting', image: '/budaya/panting.webp', badgeColor: 'bg-[#008075]', icon: '🎸' },
    { id: 'madihin', image: '/budaya/Kesenian_Madihin.webp', badgeColor: 'bg-[#E63946]', icon: '🎤' },
    { id: 'baksa', image: '/budaya/tari baksa kembang.webp', badgeColor: 'bg-[#33C3B3]', icon: '🌸' },
    { id: 'lamut', image: '/budaya/Seni Bertutur Lamut.webp', badgeColor: 'bg-[#F4C038]', icon: '📖' },
    { id: 'sinoman', image: '/budaya/tari-sinoman-hadrah-kolosal-lgjw.webp', badgeColor: 'bg-[#7C3AED]', icon: '🕌' },
    { id: 'mamanda', image: '/budaya/mamanda.webp', badgeColor: 'bg-[#D97706]', icon: '🎭' }
  ];
  const translatedSeni = tLocal('seniPertunjukanData') || [];
  const seniPertunjukanData = seniPertunjukanMeta.map((s, idx) => ({
    ...s,
    ...(translatedSeni[idx] || {})
  }));

  const hotspotCoords = [
    { id: 'atap', x: '72%', y: '25%' },
    { id: 'anjung', x: '88%', y: '55%' },
    { id: 'ukiran', x: '35%', y: '65%' }
  ];
  const translatedHotspot = tLocal('hotspotData') || [];
  const hotspotData = hotspotCoords.map((h, idx) => ({
    ...h,
    ...(translatedHotspot[idx] || {})
  }));

  const festivalMeta = [
    { url: 'https://banjarmasinkota.go.id/' },
    { url: 'https://banjarmasinkota.go.id/' }
  ];
  const translatedFestival = tLocal('festivalResmiData') || [];
  const [festivalResmiData, setFestivalResmiData] = useState(
    festivalMeta.map((f, idx) => ({ ...f, ...(translatedFestival[idx] || {}) }))
  );

  useEffect(() => {
    fetch('/api/events')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          // Format dynamic data to match the UI structure
          const formatted = data.map(ev => ({
            title: ev.title[language] || ev.title.id,
            desc: ev.desc[language] || ev.desc.id,
            tag: ev.tag[language] || ev.tag.id,
            portalName: ev.portalName,
            url: `/${language}/blog/${ev.slug}` // Just linking to blog/slug or self
          }));
          setFestivalResmiData(formatted);
        }
      })
      .catch(console.error);
  }, [language]);

  const sanggarMeta = [
    { url: 'https://www.instagram.com/explore/tags/kampungsasirangan/' },
    { url: 'https://www.instagram.com/explore/tags/tamanbudayakalsel/' }
  ];
  const translatedSanggar = tLocal('sanggarResmiData') || [];
  const sanggarResmiData = sanggarMeta.map((s, idx) => ({
    ...s,
    ...(translatedSanggar[idx] || {})
  }));

  // State Section 1: Sasirangan Spotlight
  const [activeMotif, setActiveMotif] = useState(sasiranganData[0] || {});

  // State Section 3: Hotspot Blueprint
  const [activePin, setActivePin] = useState(hotspotData[0] || {});

  // Dynamic Page Metadata (SEO & JSON-LD)
  useEffect(() => {
    const titles = {
      id: "Jantung Budaya & Wastra Sasirangan - Portal Banjarmasin",
      en: "Heart of Culture & Sasirangan Fabric - Banjarmasin Portal",
      ms: "Jantung Budaya & Wastra Sasirangan - Portal Banjarmasin",
      zh: "文化中心与萨希朗安织物 - 马辰门户网站"
    };
    const descriptions = {
      id: "Temukan keindahan budaya sungai, motif Sasirangan, seni pertunjukan Madihin, Panting, tari Baksa Kembang, dan arsitektur Bubungan Tinggi.",
      en: "Discover the beauty of river culture, Sasirangan motifs, performing arts like Madihin, Panting, Baksa Kembang dance, and Bubungan Tinggi architecture.",
      ms: "Terokai keindahan budaya sungai, motif Sasirangan, seni pertunjukan Madihin, Panting, tari Baksa Kembang, dan seni bina Bubungan Tinggi.",
      zh: "探索马辰河流文化、萨希朗安图案、马迪欣说唱、潘廷音乐、巴克萨克邦舞蹈和高屋脊传统建筑的美丽。"
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
      "@type": "TouristAttraction",
      "name": "Budaya Banjarmasin",
      "description": descriptions[language] || descriptions.id,
      "url": window.location.href,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Banjarmasin",
        "addressRegion": "Kalimantan Selatan",
        "addressCountry": "ID"
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

  // Sync active states when language changes
  useEffect(() => {
    if (sasiranganData.length > 0) {
      const currentMotifId = activeMotif.id || sasiranganData[0].id;
      const foundMotif = sasiranganData.find(m => m.id === currentMotifId);
      setActiveMotif(foundMotif || sasiranganData[0]);
    }
    if (hotspotData.length > 0) {
      const currentPinId = activePin.id || hotspotData[0].id;
      const foundPin = hotspotData.find(p => p.id === currentPinId);
      setActivePin(foundPin || hotspotData[0]);
    }
  }, [language]);

  return (
    <div className="app-container min-h-screen overflow-x-hidden">
      <Navbar />

      {/* =========================================================================
          HERO SECTION: SUBJUDUL KEMBALI HADIR + JUDUL & DESKRIPSI 1 BARIS
          Optimasi Gambar async & lazy untuk performa maksimal
          ========================================================================= */}
      <section className="pt-28 sm:pt-32 pb-12 max-w-[1240px] mx-auto px-4 overflow-hidden">

        {/* Header Konsisten dengan Home */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-2 font-heading">
            {tLocal('heroTag')}
          </span>

          <h1 className="hero-title !mb-3">
            {tLocal('heroTitle')} <br className="hidden sm:inline" />
            <span className="text-sasirangan">{tLocal('heroTitleSpan')}</span>
          </h1>

          <p className="hero-subtitle mx-auto !mb-6 !max-w-2xl px-2">
            {tLocal('heroSubtitle')}
          </p>
        </div>

        {/* Responsive Grid Layout (Mobile 2-Cols with Centerpiece on top, Desktop 5-Cols) */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6 items-center relative">

          {/* KOLOM 3 (CENTERPIECE: Tari Baksa Kembang) - Di mobile naik ke atas order-1 */}
          <div className="col-span-2 md:col-span-1 order-1 md:order-3 relative flex flex-col items-center justify-center">
            <div className="w-full max-w-[320px] md:max-w-[260px] h-[340px] md:h-[440px] rounded-[32px] md:rounded-[40px] overflow-hidden border-2 border-[#F4C038] shadow-lg relative group bg-[#050B14] mx-auto hover:-translate-y-1 transition-transform duration-200">
              <img
                src="/budaya/tari baksa kembang.webp"
                alt="Tari Baksa Kembang"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/90 via-[#050B14]/20 to-transparent p-4 flex flex-col justify-end text-center pb-6 md:pb-8">
                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-[#33C3B3] mb-1 font-heading">
                  {tLocal('centerpieceTag')}
                </span>
                <h3 className="text-lg md:text-xl font-black text-white mb-0 font-heading">
                  {tLocal('centerpieceTitle')}
                </h3>
              </div>
            </div>
          </div>

          {/* KOLOM 1 */}
          <div className="col-span-1 order-2 md:order-1 flex flex-col justify-center">
            <div className="relative rounded-[24px] md:rounded-[32px] overflow-hidden h-[180px] md:h-[260px] bg-amber-500/10 border border-[var(--glass-border)] shadow-md group hover:border-[#F4C038] transition-all duration-200">
              <img
                src="/budaya/motif bayam raj.webp"
                alt="Wastra Sasirangan"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-2 left-2 bg-[#091422]/90 text-[#F4C038] font-black text-[8px] md:text-[9px] px-2.5 py-1 rounded border border-white/10 shadow-md">
                Sasirangan
              </span>
            </div>
          </div>

          {/* KOLOM 2 */}
          <div className="col-span-1 order-3 md:order-2 flex flex-col gap-3 md:gap-4">
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden h-[120px] md:h-[160px] bg-teal-500/10 border border-[var(--glass-border)] shadow-md group hover:border-[#33C3B3] transition-all duration-200">
              <img
                src="/budaya/atap bubungan tinggi.webp"
                alt="Rumah Adat Bubungan Tinggi"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-2 left-2 bg-[#091422]/90 text-[#F4C038] font-black text-[8px] md:text-[9px] px-2.5 py-1 rounded border border-white/10 shadow-md">
                {language === 'zh' ? '建筑' : language === 'en' ? 'Architecture' : language === 'ms' ? 'Seni Bina' : 'Arsitektur'}
              </span>
            </div>
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden h-[120px] md:h-[160px] bg-yellow-500/10 border border-[var(--glass-border)] shadow-md group hover:border-[#F4C038] transition-all duration-200">
              <img
                src="/budaya/anyaman-purun.webp"
                alt="Anyaman Kayu Ulin"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-2 left-2 bg-[#091422]/90 text-[#F4C038] font-black text-[8px] md:text-[9px] px-2.5 py-1 rounded border border-white/10 shadow-md">
                {language === 'zh' ? '编织' : language === 'en' ? 'Weaving' : 'Anyaman'}
              </span>
            </div>
          </div>

          {/* KOLOM 4 */}
          <div className="col-span-1 order-4 md:order-4 flex flex-col gap-3 md:gap-4">
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden h-[120px] md:h-[160px] bg-orange-500/10 border border-[var(--glass-border)] shadow-md group hover:border-[#F4C038] transition-all duration-200">
              <img
                src="/budaya/mamanda.webp"
                alt="Teater Mamanda"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-2 right-2 bg-[#091422]/90 text-[#F4C038] font-black text-[8px] md:text-[9px] px-2.5 py-1 rounded border border-white/10 shadow-md">
                {language === 'en' ? 'Mamanda Theatre' : 'Teater Mamanda'}
              </span>
            </div>
            <div className="relative rounded-xl md:rounded-2xl overflow-hidden h-[120px] md:h-[160px] bg-sky-500/10 border border-[var(--glass-border)] shadow-md group hover:border-[#33C3B3] transition-all duration-200">
              <img
                src="/budaya/tari-sinoman-hadrah-kolosal-lgjw.webp"
                alt="Sinoman Hadrah"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-2 right-2 bg-[#091422]/90 text-[#F4C038] font-black text-[8px] md:text-[9px] px-2.5 py-1 rounded border border-white/10 shadow-md">
                Sinoman Hadrah
              </span>
            </div>
          </div>

          {/* KOLOM 5 */}
          <div className="col-span-1 order-5 md:order-5 flex flex-col justify-center relative">
            <div className="relative rounded-[24px] md:rounded-[32px] overflow-hidden h-[180px] md:h-[260px] bg-emerald-500/10 border border-[var(--glass-border)] shadow-md group hover:border-[#33C3B3] transition-all duration-200">
              <img
                src="/budaya/panting.webp"
                alt="Musik Panting"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-2 right-2 md:bottom-3 md:right-3 bg-[#091422]/90 text-[#F4C038] font-black text-[8px] md:text-[9px] px-2.5 py-1 rounded border border-white/10 shadow-md">
                {language === 'en' ? 'Panting Music' : 'Musik Panting'}
              </span>
            </div>
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 1: FILOSOFI BATATAMBA & WASTRA SASIRANGAN
          ========================================================================= */}
      <section className="py-16 max-w-[1240px] mx-auto px-4 border-t border-[var(--glass-border)]">
        <div className="text-center md:text-left mb-10 md:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="mx-auto md:mx-0 max-w-2xl">
            <span className="text-sm font-black uppercase tracking-widest text-[#F4C038] font-heading block mb-2">
              {tLocal('section1Tag')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-main)] font-heading leading-tight mb-2 md:mb-0">
              {tLocal('section1Title')} <span className="text-[#33C3B3]">{tLocal('section1TitleSpan')}</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-[var(--text-muted)] max-w-md mx-auto md:mx-0 font-body leading-relaxed">
            {tLocal('section1Desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-none snap-x">
            {sasiranganData.map((motif) => {
              const isSelected = activeMotif.id === motif.id;
              return (
                <button
                  key={motif.id}
                  onClick={() => setActiveMotif(motif)}
                  className={`flex-shrink-0 snap-start text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between min-w-[220px] lg:min-w-0 ${isSelected
                      ? 'bg-[var(--card-bg)] border-[#F4C038] shadow-md scale-[1.01]'
                      : 'bg-transparent border-[var(--glass-border)] opacity-70 hover:opacity-100 hover:translate-x-1'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm border border-white/20"
                      style={{ backgroundColor: motif.hex }}
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-main)] font-heading">
                        {motif.name}
                      </h4>
                      <span className="text-[10px] text-[var(--text-muted)] block font-body">
                        {motif.colorName}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-bold ${isSelected ? 'text-[#F4C038]' : 'text-slate-500'}`}>
                    {isSelected ? '●' : '○'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[32px] p-6 md:p-8 shadow-md relative overflow-hidden">
            {/* Dynamic colour accent bar */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 rounded-t-[32px]"
              animate={{ backgroundColor: activeMotif.hex || '#F4C038' }}
              transition={{ duration: 0.5 }}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMotif.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
              >
                <div className="relative rounded-2xl overflow-hidden h-[260px] md:h-[320px] bg-slate-900 border border-white/10 shadow-inner group">
                  <img
                    src={activeMotif.image}
                    alt={activeMotif.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#091422]/95 px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeMotif.hex }} />
                    <span className="text-[10px] font-black text-white">{activeMotif.hex}</span>
                  </div>
                </div>

                <div className="flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#33C3B3] font-heading block mb-1">
                      {tLocal('maknaFilosofi')}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-[var(--text-main)] font-heading mb-3">
                      {activeMotif.name}
                    </h3>

                    <div className="space-y-3 text-xs md:text-sm text-[var(--text-muted)] font-body leading-relaxed">
                      <p className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[var(--text-main)]">
                        <strong>{tLocal('kisahKebangsawanan')}</strong> {activeMotif.filosofi}
                      </p>
                      <p>
                        <strong>{tLocal('ritualBatatamba')}</strong> {activeMotif.penyembuhan}
                      </p>
                      <p>
                        <strong>{tLocal('prosesPewarnaan')}</strong> {activeMotif.proses}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--glass-border)] flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-[#F4C038]">{tLocal('unescoWbtb')}</span>
                      <a
                        href="https://www.instagram.com/explore/tags/sasiranganbanjarmasin/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-black text-[#33C3B3] hover:underline flex items-center gap-1"
                      >
                        {tLocal('viewGallery')}
                      </a>
                    </div>
                    {/* UMKM CTA Buttons */}
                    <div className="flex items-center gap-2">
                      <a
                        href="https://www.tokopedia.com/search?st=product&q=kain+sasirangan+banjarmasin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-2 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white text-xs font-bold transition-colors"
                      >
                        🛍️ Tokopedia
                      </a>
                      <a
                        href="https://shopee.co.id/search?keyword=kain+sasirangan+banjarmasin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-2 rounded-xl bg-[#F4C038] hover:bg-amber-400 text-[#091422] text-xs font-bold transition-colors"
                      >
                        🧡 Shopee
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      {/* 3D Museum CTA Banner */}
      <div className="max-w-[1240px] mx-auto px-4 mt-12 mb-8">
        <div className="bg-gradient-to-r from-slate-900 to-[#091422] border border-[#33C3B3]/30 rounded-3xl p-8 md:p-12 relative overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-[url('/budaya/motif_gigi_haruan.webp')] opacity-5 mix-blend-screen bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00A896]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left max-w-xl">
              <span className="inline-block px-3 py-1 rounded-full bg-[#F4C038]/10 border border-[#F4C038]/30 text-[#F4C038] text-[10px] font-black uppercase tracking-widest mb-4">
                🚀 {language === 'en' ? 'New Virtual Tour' : 'Tur Virtual Baru'}
              </span>
              <h3 className="text-3xl md:text-4xl font-black text-white font-heading mb-3">
                Banjarmasin <span className="text-[#33C3B3]">Virtual Tour 3D</span>
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed font-body">
                {language === 'en'
                  ? 'Step into a fully immersive 3D virtual museum. Explore the landmark, interact with traditional motifs, and experience our culture in the Metaverse.'
                  : 'Masuk ke dalam museum virtual 3D yang imersif. Jelajahi landmark ikonik Banjarmasin, berinteraksi dengan pameran, dan rasakan perpaduan budaya serta teknologi modern.'}
              </p>
            </div>
            
            <a 
              href={`/${language}/culture-verse`}
              className="relative overflow-hidden px-8 py-4 bg-[#33C3B3] hover:bg-[#2AA395] text-white font-black rounded-2xl transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(51,195,179,0.4)] flex items-center gap-3 group"
            >
              <span className="relative z-10">{language === 'en' ? 'Enter 3D Museum' : 'Masuk Museum 3D'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="relative z-10 transition-transform group-hover:translate-x-1">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>

      {/* =========================================================================
          SECTION 2: SENI PERTUNJUKAN & TRADISI BANJAR (Grid 3 kolom, mobile 1 kolom)
          ========================================================================= */}
      <section className="py-16 border-t border-[var(--glass-border)]">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <span className="text-sm font-black uppercase tracking-widest text-[#33C3B3] font-heading block mb-2">
              {tLocal('section2Tag')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-main)] font-heading leading-tight mb-4">
              {tLocal('section2Title')} <span className="text-[#F4C038]">{tLocal('section2TitleSpan')}</span>
            </h2>
            <p className="text-sm md:text-base text-[var(--text-muted)] mx-auto font-body leading-relaxed">
              {tLocal('section2Desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {seniPertunjukanData.map((stage) => (
              <div
                key={stage.id}
                className="bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl overflow-hidden shadow-md hover:border-[#F4C038] hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Image Area - Square Crop, Fixed Height */}
                <div className="h-[200px] relative overflow-hidden flex-shrink-0 bg-slate-900">
                  <img
                    src={stage.image}
                    alt={stage.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`${stage.badgeColor} text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow`}>
                      {stage.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-2xl">
                    {stage.icon}
                  </div>
                </div>

                {/* Content Area - Fixed, Clean */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#33C3B3] uppercase tracking-wider block mb-1 font-heading">
                      {stage.subtitle}
                    </span>
                    <h3 className="text-base font-black text-[var(--text-main)] font-heading mb-3 group-hover:text-[#F4C038] transition-colors leading-snug">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-body leading-relaxed line-clamp-3">
                      {stage.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--glass-border)] flex items-center justify-between text-[11px] font-bold text-[#33C3B3]">
                    <span>✦ WBTb Indonesia</span>
                    <span className="text-[var(--text-main)] group-hover:text-[#F4C038] transition-colors">Eksplorasi ➔</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: ANATOMI ARSITEKTUR BUBUNGAN TINGGI
          ========================================================================= */}
      <section className="py-16 max-w-[1240px] mx-auto px-4 border-t border-[var(--glass-border)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 relative rounded-[36px] overflow-hidden border border-[var(--glass-border)] shadow-md bg-slate-900 h-[360px] md:h-[480px]">
            <img
              src="/wisata/960px-Rumah_Adat_Bubungan_Tinggi.webp"
              alt="Arsitektur Bubungan Tinggi"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#091422] via-transparent to-transparent opacity-70" />

            {hotspotData.map((pin) => {
              const isActive = activePin.id === pin.id;
              return (
                <button
                  key={pin.id}
                  onClick={() => setActivePin(pin)}
                  style={{ left: pin.x, top: pin.y }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-transform duration-200 ${isActive ? 'scale-125' : 'hover:scale-110'
                    }`}
                  title={pin.title}
                >
                  <span className={`relative w-7 h-7 rounded-full border-2 border-white flex items-center justify-center font-black text-xs shadow-md ${isActive ? 'bg-[#F4C038] text-[#091422]' : 'bg-[#091422] text-white'
                    }`}>
                    +
                  </span>
                </button>
              );
            })}

            <div className="absolute bottom-4 left-4 bg-[#091422]/95 px-4 py-2 rounded-2xl border border-white/10">
              <span className="text-[10px] font-black text-[#F4C038] uppercase tracking-wider block">{tLocal('istanaTitle')}</span>
              <span className="text-xs font-bold text-white">{tLocal('istanaSubtitle')}</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[32px] p-6 md:p-8 shadow-md">
            <span className="text-sm font-black uppercase tracking-widest text-[#33C3B3] font-heading block mb-2">
              {tLocal('section3Tag')}
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={activePin.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <h2 className="text-3xl md:text-4xl font-black text-[var(--text-main)] font-heading leading-tight mb-4">
                  {activePin.title}
                </h2>

                <div className="space-y-4 text-xs md:text-sm text-[var(--text-muted)] font-body leading-relaxed">
                  <p className="p-3.5 rounded-2xl bg-teal-500/5 border border-teal-500/20 text-[var(--text-main)] font-medium">
                    {activePin.desc}
                  </p>
                  <div>
                    <h4 className="text-xs font-bold text-[#F4C038] uppercase tracking-wider mb-1">{tLocal('maknaSpiritual')}</h4>
                    <p>{activePin.filosofi}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 pt-6 border-t border-[var(--glass-border)] flex items-center gap-2 overflow-x-auto pb-1">
              {hotspotData.map((pin) => (
                <button
                  key={pin.id}
                  onClick={() => setActivePin(pin)}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border flex-shrink-0 transition-all ${activePin.id === pin.id
                      ? 'bg-[#F4C038] text-[#091422] border-[#F4C038] shadow-sm'
                      : 'bg-transparent text-[var(--text-muted)] border-[var(--glass-border)] hover:border-[#33C3B3]'
                    }`}
                >
                  📍 {pin.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: ETALASE FESTIVAL & DIREKTORI RESMI PELESTARI BUDAYA
          ========================================================================= */}
      <section className="py-16 border-t border-[var(--glass-border)]">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <span className="text-sm font-black uppercase tracking-widest text-[#33C3B3] font-heading block mb-2">
              {tLocal('section4Tag')}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-main)] font-heading leading-tight mb-4">
              {tLocal('section4Title')} <span className="text-[#F4C038]">{tLocal('section4TitleSpan')}</span>
            </h2>
            <p className="text-sm md:text-base text-[var(--text-muted)] mx-auto font-body leading-relaxed">
              {tLocal('section4Desc')}
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-lg font-black text-[var(--text-main)] font-heading mb-6 flex items-center gap-2">
              <span>{tLocal('festivalsTitle')}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {festivalResmiData.map((fest, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl p-6 md:p-8 shadow-md flex flex-col justify-between hover:border-[#F4C038] hover:-translate-y-1 transition-all duration-200"
                >
                  <div>
                    <span className="inline-block bg-[#008075] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3 shadow">
                      {fest.tag}
                    </span>
                    <h4 className="text-xl font-black text-[var(--text-main)] font-heading mb-2">
                      {fest.title}
                    </h4>
                    <p className="text-xs md:text-sm text-[var(--text-muted)] font-body leading-relaxed mb-6">
                      {fest.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--glass-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <span className="text-[11px] font-bold text-[#33C3B3]">🌐 {fest.portalName}</span>
                    <a
                      href={fest.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto text-center bg-[#F4C038] text-[#091422] text-xs font-black px-5 py-2.5 rounded-xl hover:bg-amber-400 transition-all shadow flex items-center justify-center gap-1.5"
                    >
                      {tLocal('visitPortal')}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-[var(--text-main)] font-heading mb-6 flex items-center gap-2">
              <span>{tLocal('communitiesTitle')}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sanggarResmiData.map((komunitas, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl p-6 md:p-8 shadow-md flex flex-col justify-between hover:border-[#33C3B3] hover:-translate-y-1 transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black text-[#F4C038] bg-[#F4C038]/10 px-3 py-1 rounded-full border border-[#F4C038]/20">
                        ● {komunitas.category}
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] font-medium">📍 {komunitas.location}</span>
                    </div>
                    <h4 className="text-xl font-black text-[var(--text-main)] font-heading mb-2">
                      {komunitas.name}
                    </h4>
                    <p className="text-xs md:text-sm text-[var(--text-muted)] font-body leading-relaxed mb-6">
                      {komunitas.desc}
                    </p>
                  </div>

                  <a
                    href={komunitas.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center bg-[#008075] hover:bg-[#006e65] text-white text-xs font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow"
                  >
                    <span>{komunitas.linkText}</span>
                    <span>➔</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
