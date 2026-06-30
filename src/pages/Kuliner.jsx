import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { pagesTranslations } from '../translations/pagesTranslations';

export default function Kuliner() {
  const { language } = useLanguage();
  const scrollRef = useRef(null);

  const tLocal = (key) => {
    return pagesTranslations[language]?.kuliner?.[key] || pagesTranslations['id']?.kuliner?.[key];
  };

  const galleryCardsMeta = [
    { img: "/kuliner/soto banjar.webp", id: "soto-banjar" },
    { img: "/kuliner/ketupat kandangan.webp", id: "ketupat-kandangan" },
    { img: "/kuliner/lontong orari.webp", id: "lontong-orari" },
    { img: "/kuliner/bingka.webp", id: "bingka" },
    { img: "/kuliner/iwak pakasan.webp", id: "iwak-pakasam" },
    { img: "/kuliner/nasi itik gambut.webp", id: "nasi-itik-gambut" }
  ];

  const mainDishesMeta = [
    { id: "soto-banjar", icon: "🍲", img: "/kuliner/soto banjar.webp", maps: "https://maps.google.com/?q=Soto+Bang+Amat+Banjarmasin" },
    { id: "ketupat-kandangan", icon: "🥥", img: "/kuliner/ketupat kandangan.webp", maps: "https://maps.google.com/?q=Ketupat+Kandangan+Banjarmasin" },
    { id: "nasi-kuning", icon: "🍛", img: "/kuliner/nasi kuning bumbu hambang.webp", maps: "https://maps.google.com/?q=Nasi+Kuning+Cempaka+Banjarmasin" },
    { id: "lontong-orari", icon: "🥣", img: "/kuliner/lontong orari.webp", maps: "https://maps.google.com/?q=Lontong+Orari+Banjarmasin" },
    { id: "gangan-asam", icon: "🐟", img: "/kuliner/gangan asam.webp", maps: "https://maps.google.com/?q=Gangan+Asam+Banjarmasin" },
    { id: "nasi-itik-gambut", icon: "🦆", img: "/kuliner/nasi itik gambut.webp", maps: "https://maps.google.com/?q=Nasi+Itik+Gambut" }
  ];

  const translatedMainDishes = tLocal('mainDishes') || [];
  const mainDishes = mainDishesMeta.map((d, idx) => ({
    ...d,
    ...(translatedMainDishes[idx] || {})
  }));

  // Map labels for galleryCards
  const galleryCards = galleryCardsMeta.map((c) => {
    let title = "";
    if (c.id === "soto-banjar") title = mainDishes[0]?.title || "Soto Banjar";
    else if (c.id === "ketupat-kandangan") title = mainDishes[1]?.title || "Ketupat Kandangan";
    else if (c.id === "lontong-orari") title = mainDishes[3]?.title || "Lontong Orari";
    else if (c.id === "bingka") title = language === 'zh' ? '土豆冰卡糕' : 'Bingka Kentang';
    else if (c.id === "iwak-pakasam") title = language === 'zh' ? '发酵鱼' : 'Iwak Pakasam';
    else if (c.id === "nasi-itik-gambut") title = mainDishes[5]?.title || "Nasi Itik Gambut";
    return { ...c, label: title };
  });

  const wadaiCollectionMeta = [
    { img: "/kuliner/bingka.webp" },
    { img: "/kuliner/Banana Amparan Tatak.webp" },
    { img: "/kuliner/bingka barandam.webp" },
    { img: "/kuliner/klepon martapura.webp" },
    { img: "/kuliner/Buat_foto_jadi_super_hd_202606301039.webp" }
  ];
  const translatedWadai = tLocal('wadaiCollection') || [];
  const wadaiCollection = wadaiCollectionMeta.map((w, idx) => ({
    ...w,
    ...(translatedWadai[idx] || {})
  }));

  const olehOlehMeta = [
    { span: "col-span-1 md:col-span-2 row-span-2 h-[300px] md:h-auto", img: "/kuliner/kerupuk ampalang.webp" },
    { span: "col-span-1 row-span-1 h-[250px]", img: "/kuliner/mandai.webp" },
    { span: "col-span-1 row-span-1 h-[250px]", img: "/kuliner/iwak pakasan.webp" },
    { span: "col-span-1 md:col-span-3 row-span-1 h-[250px]", img: "/kuliner/sambal acan.webp" }
  ];
  const translatedOleh = tLocal('olehOleh') || [];
  const olehOleh = olehOlehMeta.map((o, idx) => ({
    ...o,
    ...(translatedOleh[idx] || {})
  }));

  const [activeTab, setActiveTab] = useState(mainDishes[0] || {});

  // Sync activeTab when language changes
  useEffect(() => {
    if (mainDishes.length > 0) {
      const currentId = activeTab?.id || mainDishes[0]?.id;
      const foundDish = mainDishes.find(d => d.id === currentId);
      setActiveTab(foundDish || mainDishes[0]);
    }
  }, [language]);

  // Dynamic Page Metadata (SEO & JSON-LD)
  useEffect(() => {
    const titles = {
      id: "Surga Kuliner Otentik Banjarmasin - Portal Kota Seribu Sungai",
      en: "Authentic Culinary Paradise of Banjarmasin - Portal of Thousand Rivers",
      ms: "Syurga Kuliner Otentik Banjarmasin - Portal Kota Seribu Sungai",
      zh: "马辰非遗美食与风味天堂 - 千河之城门户网站"
    };
    const descriptions = {
      id: "Temukan kelezatan Soto Banjar, Ketupat Kandangan, Lontong Orari, wadai tradisional Bingka Kentang, dan oleh-oleh khas Borneo.",
      en: "Discover the deliciousness of Soto Banjar, Ketupat Kandangan, Lontong Orari, traditional Bingka Kentang cakes, and Borneo souvenirs.",
      ms: "Terokai kelezatan Soto Banjar, Ketupat Kandangan, Lontong Orari, wadai tradisional Bingka Kentang, dan buah tangan khas Borneo.",
      zh: "探索传统马辰鸡汤、柴火熏鱼配米糕、巨无霸三角米糕、土豆冰卡糕及尖蜜双果皮素肉等马辰特产美食。"
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
        "itemListElement": mainDishes.map((d, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": d.title,
          "description": d.desc,
          "image": window.location.origin + d.img
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
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* =========================================================
          HERO SECTION (TEXT IN CONTAINER, IMAGES FULL WIDTH 3D)
          ========================================================= */}
      <section className="relative w-full overflow-hidden pt-20 pb-4 mt-[80px]">
        {/* Style khusus untuk 3D Drum Carousel agar responsif dan murni CSS (anti-lag) */}
        <style>
          {`
            @keyframes spinDrum {
              from { transform: translateZ(-600px) rotateY(0deg); }
              to { transform: translateZ(-600px) rotateY(-360deg); }
            }
            .drum-container {
              animation: spinDrum 40s infinite linear;
              transform-style: preserve-3d;
            }
            .drum-card {
              backface-visibility: hidden;
              --drum-z: 600px;
            }
            @media (max-width: 767px) {
              @keyframes spinDrum {
                from { transform: translateZ(-310px) rotateY(0deg); }
                to { transform: translateZ(-310px) rotateY(-360deg); }
              }
              .drum-card {
                --drum-z: 310px;
              }
            }
            @media (max-width: 639px) {
              @keyframes spinDrum {
                from { transform: translateZ(-210px) rotateY(0deg); }
                to { transform: translateZ(-210px) rotateY(-360deg); }
              }
              .drum-card {
                --drum-z: 210px;
              }
            }
            
            /* Custom scrollbar for horizontal wadai list */
            .wadai-scroll::-webkit-scrollbar {
              height: 6px;
            }
            .wadai-scroll::-webkit-scrollbar-track {
              background: rgba(255,255,255,0.05);
              border-radius: 10px;
            }
            .wadai-scroll::-webkit-scrollbar-thumb {
              background: var(--sasirangan-gold);
              border-radius: 10px;
            }
          `}
        </style>

        {/* TEXT CONTENT (CONTAINERIZED) */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-20 text-center mb-4 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
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
          </motion.div>
        </div>

        {/* 3D DRUM CAROUSEL (DESKTOP RAPI 600px, MOBILE RENGGANG ANTI-DEMPET 360px) */}
        <div className="w-full relative h-[280px] sm:h-[380px] md:h-[500px] flex justify-center items-center [perspective:1500px]">
          <div className="relative w-full h-full flex justify-center items-center drum-container">
            {/* Duplikasi array menjadi 10 item untuk membentuk silinder tertutup */}
            {[...galleryCards, ...galleryCards.slice(0, 4)].map((card, idx) => (
              <div 
                key={idx}
                className="drum-card absolute w-[130px] h-[190px] sm:w-[190px] sm:h-[280px] md:w-[300px] md:h-[450px]"
                style={{ 
                  transform: `rotateY(${idx * 36}deg) translateZ(var(--drum-z))` 
                }}
              >
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] relative bg-[var(--card-bg)]">
                  <img loading="lazy" decoding="async" src={card.img} alt={card.label} className="w-full h-full object-cover pointer-events-auto transform-gpu" />
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <span className="bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] sm:text-xs md:text-sm font-bold border border-white/20 inline-block">
                      {card.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTAINER UTAMA UNTUK SECTIONS
          ========================================================= */}
      <div className="app-container">
        
        {/* =========================================================
            SECTION 1: INTERACTIVE SPOTLIGHT (SAJIAN UTAMA LEGENDA)
            ========================================================= */}
        <section className="py-20 sm:py-24 border-t border-[var(--glass-border)]">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[#F4C038] font-bold tracking-widest text-xs sm:text-sm uppercase mb-2 block">
              {tLocal('section1Tag')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black mb-4 text-[var(--text-main)]">
              {tLocal('section1Title')} <span className="text-[#F4C038]">{tLocal('section1TitleSpan')}</span>
            </h2>
            <p className="max-w-2xl mx-auto text-[var(--text-muted)] text-sm sm:text-base md:text-lg">
              {tLocal('section1Desc')}
            </p>
          </div>

          {/* Side-by-Side Menu & Feature Showcase Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Sidebar Menu Choices (Dari Samping) */}
            <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-col gap-2.5 sm:gap-3">
              {mainDishes.map((dish) => (
                <button
                  key={dish.id}
                  onClick={() => setActiveTab(dish)}
                  className={`p-3.5 sm:p-4 rounded-2xl text-left font-bold transition-all duration-300 flex items-center gap-3 border ${
                    activeTab.id === dish.id 
                      ? 'bg-[#F4C038] text-[var(--martapura-deep)] border-[#F4C038] shadow-[0_4px_20px_rgba(244,192,56,0.3)] lg:translate-x-2' 
                      : 'bg-[var(--card-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-border)] border-[var(--glass-border)]'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl flex-shrink-0">{dish.icon}</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm md:text-base font-black truncate">{dish.title}</span>
                    <span className={`text-[10px] sm:text-xs truncate ${activeTab.id === dish.id ? 'text-black/80 font-semibold' : 'text-[var(--text-muted)]'}`}>{dish.location}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Detail Showcase Card */}
            <div className="lg:col-span-8 flex">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--glass-border)] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                >
                  {/* Left Image Showcase */}
                  <div className="w-full md:w-1/2 h-[260px] sm:h-[350px] md:h-auto relative overflow-hidden group min-h-[260px]">
                    <img loading="lazy" decoding="async" src={activeTab.img} alt={activeTab.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 transform-gpu" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end md:hidden">
                      <span className="bg-black/60 backdrop-blur-md text-[#F4C038] px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                        📍 {activeTab.location}
                      </span>
                    </div>
                  </div>

                  {/* Right Content Area */}
                  <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 bg-[#33C3B3]/20 border border-[#33C3B3]/40 px-3 py-1 rounded-full text-xs font-bold text-[#33C3B3]">
                          ✦ {tLocal('aromaLabel')}: {activeTab.aroma}
                        </span>
                        <span className="hidden md:inline-flex bg-black/40 backdrop-blur-md text-[#F4C038] px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                          📍 {activeTab.location}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-[var(--text-main)] mb-4 leading-tight">
                        {activeTab.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-6">
                        {activeTab.desc}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-[var(--glass-border)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <span className="text-[10px] sm:text-xs text-[var(--text-muted)] italic">
                        {tLocal('verifiedNote')}
                      </span>
                      <a 
                        href={activeTab.maps} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F4C038] text-black font-black rounded-full hover:bg-white hover:text-black transition-all shadow-[0_4px_20px_rgba(244,192,56,0.3)] text-xs sm:text-sm text-center"
                      >
                        {tLocal('navigateBtn')}
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: HORIZONTAL SHOWCASE (WARISAN WADAI BANJAR)
            ========================================================= */}
        <section className="py-20 sm:py-24 border-t border-[var(--glass-border)]">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-[#F4C038] font-bold tracking-widest text-sm uppercase mb-2 block">
                {tLocal('section2Tag')}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black mb-4 text-[var(--text-main)]">
                {tLocal('section2Title')} <span className="text-[#F4C038]">{tLocal('section2TitleSpan')}</span>
              </h2>
              <p className="text-[var(--text-muted)] text-sm sm:text-base md:text-lg leading-relaxed">
                {tLocal('section2Desc')}
              </p>
            </div>
            <div className="flex items-center gap-3 self-start md:self-end">
              <button
                onClick={() => scrollRef.current?.scrollBy({ left: -340, behavior: 'smooth' })}
                className="w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--glass-border)] hover:border-[#F4C038] hover:bg-[#F4C038] hover:text-[#091422] text-[var(--text-main)] flex items-center justify-center transition-all shadow-md text-lg font-bold"
                aria-label="Scroll Left"
              >
                ←
              </button>
              <button
                onClick={() => scrollRef.current?.scrollBy({ left: 340, behavior: 'smooth' })}
                className="w-12 h-12 rounded-full bg-[var(--card-bg)] border border-[var(--glass-border)] hover:border-[#F4C038] hover:bg-[#F4C038] hover:text-[#091422] text-[var(--text-main)] flex items-center justify-center transition-all shadow-md text-lg font-bold"
                aria-label="Scroll Right"
              >
                →
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 snap-x snap-mandatory wadai-scroll px-2 sm:px-0">
            {wadaiCollection.map((wadai, idx) => (
              <div key={idx} className="min-w-[260px] sm:min-w-[300px] md:min-w-[320px] h-[360px] sm:h-[400px] flex-shrink-0 snap-center relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg border border-[var(--glass-border)]">
                <img loading="lazy" decoding="async" src={wadai.img} alt={wadai.name} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 transform-gpu" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-white mb-3">
                    {wadai.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-heading text-white">{wadai.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            SECTION 3: DERMAGA KULINER TEPI SUNGAI (PARALLAX + CTA)
            ========================================================= */}
        <section className="py-20 sm:py-24 border-t border-[var(--glass-border)]">
          <div className="relative w-full rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden h-[450px] sm:h-[500px] md:h-[600px] flex items-center shadow-lg border border-[var(--glass-border)]">
            <div className="absolute inset-0">
              <img loading="lazy" decoding="async" src="/kuliner/soto banjar.webp" alt="Dermaga Kuliner Banua Anyar" className="w-full h-full object-cover scale-105 transform-gpu" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
            </div>

            <div className="relative z-10 p-6 sm:p-8 md:p-16 max-w-2xl">
              <div className="bg-black/40 backdrop-blur-xl border border-white/20 p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <span className="text-[#33C3B3] font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4 block">
                  {tLocal('section3Tag')}
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-white mb-4 sm:mb-6 leading-tight">
                  {tLocal('section3Title')} <span className="text-[var(--sasirangan-gold)]">{tLocal('section3TitleSpan')}</span>
                </h2>
                <p className="text-white/90 text-xs sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                  {tLocal('section3Desc')}
                </p>
                <a 
                  href="https://maps.google.com/?q=Sentra+Kuliner+Banua+Anyar+Banjarmasin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[var(--sasirangan-gold)] text-black font-black rounded-full hover:bg-white hover:text-black transition-colors shadow-lg text-xs sm:text-sm"
                >
                  {tLocal('section3Btn')}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: ASYMMETRIC BENTO (OLEH-OLEH EKSTREM & LEGENDA)
            ========================================================= */}
        <section className="py-20 sm:py-24 border-t border-[var(--glass-border)] mb-16 sm:mb-20">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[#33C3B3] font-bold tracking-widest text-xs sm:text-sm uppercase mb-2 block">
              {tLocal('section4Tag')}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black mb-4 text-[var(--text-main)]">
              {tLocal('section4Title')} <span className="text-[var(--text-main)]">{tLocal('section4TitleSpan')}</span>
            </h2>
            <p className="max-w-2xl mx-auto text-[var(--text-muted)] text-sm sm:text-base md:text-lg">
              {tLocal('section4Desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[auto]">
            {olehOleh.map((item, idx) => (
              <div key={idx} className={`${item.span} rounded-[1.5rem] sm:rounded-3xl overflow-hidden relative group shadow-lg border border-[var(--glass-border)]`}>
                <img loading="lazy" decoding="async" src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 absolute inset-0 transform-gpu" />
                <div className="relative h-full min-h-[220px] sm:min-h-[250px] bg-gradient-to-t from-black/95 via-black/40 to-transparent p-5 sm:p-6 md:p-8 flex flex-col justify-end">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-heading text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
      
      <Footer />
    </div>
  );
}
