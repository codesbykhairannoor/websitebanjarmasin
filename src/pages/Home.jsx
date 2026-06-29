import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Home() {
  const { language, t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 50) setActiveSlide((p) => (p + 1) % showcaseItems.length); // Kiri
    if (distance < -50) setActiveSlide((p) => (p === 0 ? showcaseItems.length - 1 : p - 1)); // Kanan
  };
  // === STATE FOR HERO SLIDES ===
  const showcaseImages = [
    { id: 0, shortTitle: "Sambutan", icon: "✨", btnLink: "#wisata", img: "/hero_sungai_martapura.png" },
    { id: 1, shortTitle: "Sungai", icon: "🛶", btnLink: "/wisata", img: "/hero_pasar_terapung.png" },
    { id: 2, shortTitle: "Kuliner", icon: "🍜", btnLink: "/kuliner", img: "/hero_soto_banjar.png" },
    { id: 3, shortTitle: "Budaya", icon: "🏛️", btnLink: "/sejarah", img: "/hero_kain_sasirangan.png" },
    { id: 4, shortTitle: "Inovasi", icon: "🚀", btnLink: "/smart-city", img: "/hero_menara_pandang.png" }
  ];
  const slides = t('home.hero.slides') || [];
  const showcaseItems = showcaseImages.map((item, idx) => ({
    ...item,
    ...(slides[idx] || {})
  }));

  // === AUTO-PLAY HERO SLIDER (HANYA UNTUK MOBILE) ===
  useEffect(() => {
    const timer = setInterval(() => {
      // Hanya auto-play jika lebar layar < 768px (Mobile)
      if (window.innerWidth < 768) {
        setActiveSlide((prev) => (prev + 1) % showcaseItems.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [showcaseItems.length]);

  // === STATE FOR QUICK DISCOVERY ===
  const spotsImages = [
    { id: 1, img: "/wisata/960px-Pasar_Terapung_Siring_Banj.webp", span: "bento-span-2" },
    { id: 2, img: "/wisata/960px-Menara_Pandang_Banjarmasin.webp", span: "bento-span-1" },
    { id: 3, img: "/wisata/960px-Monumen_Patung_Bekantan_Ba.webp", span: "bento-span-1" },
    { id: 4, img: "/wisata/masjid sultan suriansyah.webp", span: "bento-span-2" }
  ];
  const translatedSpots = t('home.wisata.items') || [];
  const spots = spotsImages.map((spot, idx) => ({
    ...spot,
    ...(translatedSpots[idx] || {})
  }));

  // === STATE FOR TASTE OF BANJAR ===
  const [activeTab, setActiveTab] = useState(1);
  const foodsImages = [
    { id: 1, img: "/kuliner/Soto_banjar,_Pak_Ahmat,_Martapura,_South_Kalimantan,_2018-07-28_02.webp", price: "Rp 25.000" },
    { id: 2, img: "/kuliner/1920px-Katupat_Kandangan_in_Kandangan.webp", price: "Rp 30.000" },
    { id: 3, img: "/kuliner/buras.webp", price: "Rp 35.000" },
    { id: 4, img: "/kuliner/Bingka.webp", price: "Rp 45.000" }
  ];
  const translatedFoods = t('home.kuliner.foods') || [];
  const foods = foodsImages.map((food, idx) => ({
    ...food,
    ...(translatedFoods[idx] || {})
  }));
  const currentFood = foods.find(f => f.id === activeTab) || foods[0];

  // === STATE FOR UTILITY PLANNER ===
  const [activeSpot, setActiveSpot] = useState('lokbaintan');
  const spotsDataTranslated = t('home.planner.spots') || {};
  const spotsData = {
    lokbaintan: {
      ...spotsDataTranslated.lokbaintan,
      coords: "3.3167° S, 114.5901° E",
      mapsUrl: "https://maps.google.com/?q=Pasar+Terapung+Lok+Baintan"
    },
    siring: {
      ...spotsDataTranslated.siring,
      coords: "3.3186° S, 114.5924° E",
      mapsUrl: "https://maps.google.com/?q=Menara+Pandang+Banjarmasin"
    },
    sotoamat: {
      ...spotsDataTranslated.sotoamat,
      coords: "3.3012° S, 114.6035° E",
      mapsUrl: "https://maps.google.com/?q=Soto+Bang+Amat+Banjarmasin"
    },
    pulaukembang: {
      ...spotsDataTranslated.pulaukembang,
      coords: "3.3045° S, 114.5589° E",
      mapsUrl: "https://maps.google.com/?q=Pulau+Kembang+Barito"
    }
  };
  const currentMap = spotsData[activeSpot] || spotsData.lokbaintan;

  // === SEO, GEO & AI STRUCTURED DATA DYNAMIC UPDATE ===
  useEffect(() => {
    const titles = {
      id: "Portal Wisata Resmi Banjarmasin - Kota Seribu Sungai",
      en: "Official Tourism Portal of Banjarmasin - City of a Thousand Rivers",
      ms: "Portal Pelancongan Rasmi Banjarmasin - Kota Seribu Sungai",
      zh: "马辰官方旅游门户网站 - 千河之城"
    };
    const descriptions = {
      id: "Jelajahi keindahan budaya sungai, kuliner legendaris, kain Sasirangan, dan destinasi ikonik Kota Banjarmasin.",
      en: "Explore the beauty of river culture, legendary culinary, Sasirangan fabrics, and iconic destinations of Banjarmasin.",
      ms: "Terokai keindahan budaya sungai, kuliner legenda, kain Sasirangan, dan destinasi ikonik Kota Banjarmasin.",
      zh: "探索马辰河流文化的美丽、传奇美食、萨希朗安扎染布和标志性景点。"
    };

    document.title = titles[language] || titles.id;
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', descriptions[language] || descriptions.id);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + window.location.pathname);

    // AI-Ready Schema.org JSON-LD Structured Data
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "City",
      "name": "Banjarmasin",
      "alternateName": "Banjarmasin City of a Thousand Rivers",
      "description": descriptions[language] || descriptions.id,
      "url": window.location.origin,
      "logo": window.location.origin + "/vite.svg",
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "-3.316694",
        "longitude": "114.590111"
      },
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

  // Akomodasi Images & Badges (Combined with dynamic translation cards)
  const accommodationImages = [
    { img: "/panduan/Swiss-Belhotel Borneo Banjarmasi.webp", badge: "Premium" },
    { img: "/panduan/galaxy hotel.webp", badge: "Bisnis" },
    { img: "/profil kota/trans banjarbakula.webp", badge: "Publik" }
  ];
  const translatedPanduanCards = t('home.panduan.cards') || [];
  const accommodationItems = accommodationImages.map((item, idx) => ({
    ...item,
    ...(translatedPanduanCards[idx] || {})
  }));

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* =========================================================
          HERO SECTION (DISNEY+ SHOWCASE ACCORDION FULL-WIDTH)
          ========================================================= */}
      <section className="relative w-full h-screen min-h-[600px] bg-[var(--bg-main)] pt-[56px] sm:pt-[60px] overflow-hidden flex flex-col border-b border-[var(--glass-border)]">
        
        {/* DESKTOP ACCORDION (Hidden on Mobile) */}
        <div className="hidden md:flex w-full flex-1 gap-[1px] bg-white/10 relative z-10 overflow-hidden">
          {showcaseItems.map((item, i) => {
            const isActive = activeSlide === i;
            return (
              <div
                key={item.id}
                onClick={() => setActiveSlide(i)}
                className={`relative overflow-hidden transition-[flex] duration-500 ease-out select-none ${
                  isActive
                    ? "flex-[8] lg:flex-[10] z-20 shadow-2xl cursor-default"
                    : "flex-[1.2] lg:flex-[1.5] cursor-pointer group border-r border-white/15 last:border-0 hover:brightness-125 hover:shadow-[inset_0_0_35px_rgba(244,192,56,0.4)] transition-[filter,box-shadow] duration-300"
                }`}
              >
                <img loading="lazy" src={item.img} alt={item.title} className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${isActive ? "scale-105 brightness-100" : "grayscale-[30%] brightness-75 group-hover:brightness-100"}`} />
                {isActive ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent w-3/4 lg:w-2/3 z-10 pointer-events-none" />
                    <div className="absolute inset-0 z-20 p-8 md:p-14 lg:p-16 flex flex-col justify-center max-w-xl text-white overflow-y-auto">
                      <span className="text-[#F4C038] font-heading font-extrabold text-xs md:text-sm tracking-[0.2em] uppercase mb-2 block animate-fadeIn">{item.tag}</span>
                      <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-tight mb-3 drop-shadow-md animate-fadeIn text-white">{item.title}</h1>
                      <p className="text-base md:text-xl font-bold text-sasirangan mb-4 font-heading animate-fadeIn">{item.subtitle}</p>
                      <p className="text-sm md:text-base text-gray-200 mb-6 leading-relaxed line-clamp-3 animate-fadeIn">{item.desc}</p>
                      <div className="flex flex-wrap items-center gap-4 animate-fadeIn">
                        {item.btnLink.startsWith('#') ? (
                          <a href={item.btnLink} className="bg-[#F4C038] hover:bg-white text-[#091422] px-8 py-3.5 rounded-full font-heading font-black text-sm shadow-xl transition-all hover:brightness-110 flex items-center gap-2 border border-white/20"><span>⚡</span> {item.btnText}</a>
                        ) : (
                          <Link to={item.btnLink} className="bg-[#F4C038] hover:bg-white text-[#091422] px-8 py-3.5 rounded-full font-heading font-black text-sm shadow-xl transition-all hover:brightness-110 flex items-center gap-2 border border-white/20"><span>⚡</span> {item.btnText}</Link>
                        )}
                        <span className="text-sm font-bold text-gray-300 bg-white/10 backdrop-blur-md px-4 py-3 rounded-full border border-white/20">{item.price}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col justify-between items-center p-4 z-10 pointer-events-none bg-gradient-to-t from-black/90 via-black/20 to-black/60">
                    <div className="flex-1 flex items-center justify-center py-4 overflow-hidden">
                      <span className="block font-heading font-extrabold text-white text-sm tracking-widest uppercase -rotate-90 whitespace-nowrap drop-shadow-lg opacity-70 group-hover:opacity-100 transition-opacity">{item.title}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* MOBILE SLIDER (Hidden on Desktop) */}
        <div 
          className="md:hidden absolute inset-0 w-full h-full z-10 overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {showcaseItems.map((item, i) => {
            const isActive = activeSlide === i;
            return (
              <div key={item.id} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${isActive ? "opacity-100 z-20" : "opacity-0 z-10"}`}>
                <img loading="lazy" src={item.img} alt={item.title} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] ease-out ${isActive ? "scale-110" : "scale-100"}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent w-full z-10 pointer-events-none" />
                <div className={`absolute inset-0 z-20 flex flex-col justify-end pb-32 sm:pb-40 px-6 max-w-5xl text-white transition-all duration-1000 delay-300 ${isActive ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
                  <span className="text-[#F4C038] font-heading font-extrabold text-[10px] tracking-[0.2em] uppercase mb-2 block">{item.tag}</span>
                  <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight leading-tight mb-2 drop-shadow-lg text-white">{item.title}</h1>
                  <p className="text-sm font-bold text-sasirangan mb-3 font-heading drop-shadow-md">{item.subtitle}</p>
                  <p className="text-xs text-gray-200 mb-6 leading-relaxed line-clamp-3 drop-shadow-md">{item.desc}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    {item.btnLink.startsWith('#') ? (
                      <a href={item.btnLink} className="bg-[#F4C038] hover:bg-white text-[#091422] px-6 py-3 rounded-full font-heading font-black text-xs shadow-[0_0_20px_rgba(244,192,56,0.4)] transition-all flex items-center gap-2"><span>⚡</span> {item.btnText}</a>
                    ) : (
                      <Link to={item.btnLink} className="bg-[#F4C038] hover:bg-white text-[#091422] px-6 py-3 rounded-full font-heading font-black text-xs shadow-[0_0_20px_rgba(244,192,56,0.4)] transition-all flex items-center gap-2"><span>⚡</span> {item.btnText}</Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {/* Navigation Dots Indicator */}
          <div className="absolute bottom-8 left-0 w-full z-30 flex justify-center items-center gap-3">
            {showcaseItems.map((_, i) => (
              <button key={i} onClick={() => setActiveSlide(i)} className={`transition-all duration-500 rounded-full ${activeSlide === i ? "w-8 h-2 bg-[#F4C038]" : "w-2 h-2 bg-white/50 hover:bg-white/80"}`} aria-label={`Go to slide ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          KEMBALI MENGGUNAKAN APP-CONTAINER UNTUK SECTION LAIN
          ========================================================= */}
      <div className="app-container">

        {/* 1. WISATA IKONIK (BENTO GRID) */}
        <section id="wisata" className="py-12 md:py-20">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-10 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#F4C038] mb-2 font-heading">
              {t('home.wisata.tag')}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight mb-4">
              {t('home.wisata.title')}
            </h2>
            <p className="hero-subtitle mx-auto px-2 mb-8">
              {t('home.wisata.desc')}
            </p>
          </motion.div>

          <div className="bento-grid">
            {spots.map((s, idx) => (
              <motion.div 
                key={s.id} 
                className={`bento-card ${s.span}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                <img src={s.img} alt={s.title} loading="lazy" className="bento-bg" />
                <div className="bento-overlay">
                  <div className="bento-top">
                    <span className="bento-badge">{s.category}</span>
                    <span className="bento-time hidden sm:flex">{s.time}</span>
                  </div>
                  <div className="bento-bottom">
                    <h3 className="bento-title">{s.title}</h3>
                    <Link to="/wisata" className="btn-bento-action">{t('common.exploreNow')}</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/wisata" className="btn-gateway inline-block">{t('home.wisata.btnText')}</Link>
          </motion.div>
        </section>

        {/* 2. TASTE OF BANJAR (KULINER) */}
        <section id="kuliner" className="py-12 md:py-20">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-10 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#F4C038] mb-2 font-heading">
              {t('home.kuliner.tag')}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight mb-4">
              {t('home.kuliner.title')}
            </h2>
            <p className="text-sm md:text-base text-[var(--text-muted)] font-body leading-relaxed max-w-2xl mx-auto px-2">
              {t('home.kuliner.desc')}
            </p>
          </motion.div>

          <div className="culinary-tabs-bar hide-scrollbar flex flex-nowrap overflow-x-auto gap-4 mb-8 pb-4 snap-x justify-start md:justify-center px-4">
            {foods.map((item) => (
              <button 
                key={item.id}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all border shadow-sm snap-center shrink-0 whitespace-nowrap ${activeTab === item.id ? 'bg-[#33C3B3] border-[#33C3B3] text-white shadow-[#33C3B3]/30' : 'bg-transparent border-[var(--glass-border)] text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.tabTitle}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentFood.id}
              className="max-w-5xl mx-auto bg-[var(--card-bg)] rounded-[40px] p-6 md:p-8 lg:p-10 border border-[var(--glass-border)] shadow-2xl flex flex-col lg:flex-row gap-10 items-center mx-4 lg:mx-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-full lg:w-1/2 relative rounded-[32px] overflow-hidden shadow-lg group">
                <div className="absolute inset-0 bg-[#33C3B3]/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                <img src={currentFood.img} alt={currentFood.name} loading="lazy" className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-[#F4C038] font-black px-4 py-2 rounded-full border border-white/20 z-20 shadow-xl">
                  {currentFood.price}
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
                <h3 className="text-2xl md:text-4xl font-black text-[var(--text-main)] font-heading mb-4 leading-tight">{currentFood.name}</h3>
                
                <div className="inline-flex items-center gap-2 sm:gap-3 bg-[var(--bg-main)] px-4 sm:px-5 py-3 rounded-2xl border border-[var(--glass-border)] mb-6 mx-auto lg:mx-0 w-fit max-w-full overflow-hidden">
                  <span className="text-lg md:text-xl shrink-0">🌿</span>
                  <p className="text-[10px] sm:text-xs md:text-sm font-bold text-[var(--text-main)] uppercase tracking-wider truncate whitespace-normal sm:whitespace-nowrap line-clamp-2 sm:line-clamp-none">{currentFood.aroma}</p>
                </div>

                <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed mb-8">
                  {currentFood.desc}
                </p>

                <Link to="/kuliner" className="btn-gateway inline-block w-full sm:w-max">{t('home.kuliner.btnText')}</Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* 3. JANTUNG BUDAYA & SEJARAH */}
        <section id="budaya" className="py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#F4C038] mb-2 font-heading">
                {t('home.budaya.tag')}
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight mb-6">
                {t('home.budaya.title')}
              </h2>
              <p className="hero-subtitle mx-auto lg:mx-0 mb-8 px-2 lg:px-0">
                {t('home.budaya.desc')}
              </p>
              
              <div className="flex flex-col gap-6 mb-8 text-left px-4 lg:px-0">
                <div className="flex gap-4 items-start p-6 rounded-3xl bg-[var(--card-bg)] border border-[var(--glass-border)] shadow-sm hover:shadow-lg transition-shadow">
                  <span className="text-3xl md:text-4xl shrink-0">🧵</span>
                  <div>
                    <h3 className="font-heading font-bold text-[var(--text-main)] mb-2 text-lg">{t('home.budaya.cards.0.title')}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{t('home.budaya.cards.0.desc')}</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-6 rounded-3xl bg-[var(--card-bg)] border border-[var(--glass-border)] shadow-sm hover:shadow-lg transition-shadow">
                  <span className="text-3xl md:text-4xl shrink-0">🛶</span>
                  <div>
                    <h3 className="font-heading font-bold text-[var(--text-main)] mb-2 text-lg">{t('home.budaya.cards.1.title')}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{t('home.budaya.cards.1.desc')}</p>
                  </div>
                </div>
              </div>

              <Link to="/budaya" className="btn-gateway inline-block">{t('home.budaya.btnText')}</Link>
            </motion.div>

            <motion.div 
              className="relative lg:h-[700px] rounded-[40px] overflow-hidden group shadow-2xl border-4 border-[var(--card-bg)] mx-4 lg:mx-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="/hero_pasar_terapung.png" 
                alt="Pasar Terapung Lok Baintan" 
                loading="lazy"
                className="w-full h-[450px] lg:h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-12">
                <div className="border-l-4 border-[#F4C038] pl-5 md:pl-6 relative">
                  <div className="absolute -left-6 -top-8 text-7xl text-white/20 font-serif">"</div>
                  <p className="text-white text-base md:text-xl italic font-serif leading-relaxed mb-4">
                    {t('home.budaya.quote')}
                  </p>
                  <span className="text-[#F4C038] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] font-heading">
                    {t('home.budaya.quoteAuthor')}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. SMART CITY & EKOLOGI */}
        <section id="smartcity" className="py-16 md:py-24 relative overflow-hidden rounded-[40px] my-8 shadow-2xl border border-[var(--glass-border)] mx-4 md:mx-0">
          <div className="absolute inset-0 z-0">
            <img src="/hero_menara_pandang.png" className="w-full h-full object-cover brightness-[0.7]" alt="Smart City Night" loading="lazy"/>
            <div className="absolute inset-0 bg-gradient-to-r from-[#091422]/95 via-[#091422]/70 to-[#33C3B3]/20"></div>
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 md:px-16 h-full py-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-4 font-heading bg-[#33C3B3]/20 backdrop-blur-md px-4 py-2 rounded-full border border-[#33C3B3]/40">
                {t('home.smartCity.tag')}
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white font-heading leading-tight mb-6">
                {t('home.smartCity.title')}
              </h2>
              <p className="text-gray-200 text-sm md:text-base lg:text-lg mb-8 leading-relaxed max-w-lg">
                {t('home.smartCity.desc')}
              </p>
              <Link to="/smart-city" className="bg-gradient-to-r from-[#33C3B3] to-[#00A896] hover:brightness-110 text-white px-8 py-4 rounded-full font-bold shadow-xl transition-all hover:-translate-y-1 inline-block">
                {t('home.smartCity.btnText')}
              </Link>
            </motion.div>
            
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white/10 backdrop-blur-2xl rounded-[32px] p-5 md:p-6 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-5 hover:bg-white/20 hover:border-white/40 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-blue-500/30 rounded-full flex items-center justify-center text-2xl border border-blue-400/50 shrink-0 shadow-lg">📱</div>
                <div>
                  <h4 className="text-white font-bold text-base md:text-lg">{t('home.smartCity.cards.0.title')}</h4>
                  <p className="text-gray-300 text-xs md:text-sm">{t('home.smartCity.cards.0.desc')}</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-2xl rounded-[32px] p-5 md:p-6 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-5 translate-x-0 md:translate-x-8 hover:bg-white/20 hover:border-white/40 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-green-500/30 rounded-full flex items-center justify-center text-2xl border border-green-400/50 shrink-0 shadow-lg">🚦</div>
                <div>
                  <h4 className="text-white font-bold text-base md:text-lg">{t('home.smartCity.cards.1.title')}</h4>
                  <p className="text-gray-300 text-xs md:text-sm">{t('home.smartCity.cards.1.desc')}</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-2xl rounded-[32px] p-5 md:p-6 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-5 hover:bg-white/20 hover:border-white/40 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-yellow-500/30 rounded-full flex items-center justify-center text-2xl border border-yellow-400/50 shrink-0 shadow-lg">🏛️</div>
                <div>
                  <h4 className="text-white font-bold text-base md:text-lg">{t('home.smartCity.cards.2.title')}</h4>
                  <p className="text-gray-300 text-xs md:text-sm">{t('home.smartCity.cards.2.desc')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5. PANDUAN & AKOMODASI */}
        <section id="panduan-akomodasi" className="py-16 md:py-24 border-t border-[var(--glass-border)]">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-10 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#F4C038] mb-2 font-heading">
              {t('home.panduan.tag')}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight mb-4">
              {t('home.panduan.title')}
            </h2>
            <p className="hero-subtitle mx-auto px-2">
              {t('home.panduan.desc')}
            </p>
          </motion.div>

          <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-6 pb-8 pt-4 snap-x hide-scrollbar px-4 lg:px-0">
            {accommodationItems.map((item, idx) => (
              <motion.div 
                key={idx} 
                className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 bg-[var(--card-bg)] rounded-[40px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-[var(--glass-border)] snap-center group flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="h-[220px] relative overflow-hidden">
                  <img src={item.img} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-4 py-2 rounded-full border border-white/20 uppercase tracking-wider">{item.badge}</span>
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="font-heading font-black text-xl md:text-2xl text-[var(--text-main)] mb-3">{item.title}</h3>
                  <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-6 flex-1">{item.desc}</p>
                  <Link to="/panduan" className="text-[#33C3B3] font-bold text-sm md:text-base hover:text-[#2AA698] flex items-center gap-2 group-hover:gap-4 transition-all">
                    {t('home.panduan.readDetails', 'Baca Detail Panduan')} <span>➔</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Link to="/panduan" className="btn-gateway inline-block">{t('home.panduan.btnText')}</Link>
          </div>
        </section>

        {/* 6. UTILITY PLANNER (RUTE) */}
        <section id="planner" className="py-16 md:py-24 mb-0">
          <div className="planner-glass relative overflow-hidden rounded-[40px] p-6 md:p-12 lg:p-16 border border-[var(--glass-border)] shadow-2xl bg-[var(--card-bg)] flex flex-col lg:flex-row gap-12 items-center mx-4 md:mx-0">
            {/* Ambient background glow */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#33C3B3]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#F4C038]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex-1 relative z-10 w-full">
              <div className="flex items-center gap-4 bg-[var(--bg-main)]/50 backdrop-blur-xl border border-[var(--glass-border)] p-4 rounded-3xl w-max mb-8 shadow-sm">
                <span className="text-3xl">🌤️</span>
                <div>
                  <h4 className="font-heading font-bold text-xs text-[var(--text-muted)] uppercase tracking-wider">Banjarmasin ({t('home.planner.timezone', 'WITA')})</h4>
                  <p className="text-[var(--text-main)] font-black text-sm">31°C • {t('home.planner.weather', 'Tropis Cerah & Hangat')}</p>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-[var(--text-main)] font-heading leading-tight mb-4">
                {t('home.planner.title')}
              </h2>
              <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed mb-8">
                {t('home.planner.desc')}
              </p>

              <div className="flex flex-wrap gap-3">
                <button 
                  className={`map-tab-btn px-5 py-3 rounded-full font-bold text-sm transition-all border shadow-sm ${activeSpot === 'lokbaintan' ? 'bg-[#F4C038] border-[#F4C038] text-[#091422] shadow-[#F4C038]/30' : 'bg-transparent border-[var(--glass-border)] text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                  onClick={() => setActiveSpot('lokbaintan')}
                >
                  🛶 {t('home.planner.spots.lokbaintan.title').split(' ').slice(-2).join(' ')}
                </button>
                <button 
                  className={`map-tab-btn px-5 py-3 rounded-full font-bold text-sm transition-all border shadow-sm ${activeSpot === 'siring' ? 'bg-[#F4C038] border-[#F4C038] text-[#091422] shadow-[#F4C038]/30' : 'bg-transparent border-[var(--glass-border)] text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                  onClick={() => setActiveSpot('siring')}
                >
                  🗼 {t('home.planner.spots.siring.title').split(' ').slice(-2).join(' ')}
                </button>
                <button 
                  className={`map-tab-btn px-5 py-3 rounded-full font-bold text-sm transition-all border shadow-sm ${activeSpot === 'sotoamat' ? 'bg-[#F4C038] border-[#F4C038] text-[#091422] shadow-[#F4C038]/30' : 'bg-transparent border-[var(--glass-border)] text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                  onClick={() => setActiveSpot('sotoamat')}
                >
                  🍲 {t('home.planner.spots.sotoamat.title').split(' ').slice(-2).join(' ')}
                </button>
                <button 
                  className={`map-tab-btn px-5 py-3 rounded-full font-bold text-sm transition-all border shadow-sm ${activeSpot === 'pulaukembang' ? 'bg-[#F4C038] border-[#F4C038] text-[#091422] shadow-[#F4C038]/30' : 'bg-transparent border-[var(--glass-border)] text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                  onClick={() => setActiveSpot('pulaukembang')}
                >
                  🏝️ {t('home.planner.spots.pulaukembang.title').split(' ').slice(-2).join(' ')}
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeSpot}
                className="w-full lg:w-[450px] shrink-0 bg-[var(--bg-main)] rounded-[32px] p-6 md:p-8 border border-[var(--glass-border)] shadow-xl relative z-10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex justify-between items-start sm:items-center mb-6 gap-3">
                  <span className="text-[#33C3B3] font-bold text-xs uppercase tracking-widest bg-[#33C3B3]/10 px-3 py-1.5 rounded-full shrink-0">{currentMap.type}</span>
                  <span className="text-[var(--text-muted)] text-[10px] sm:text-xs font-mono break-all sm:break-normal text-right hidden sm:block">📍 {currentMap.coords}</span>
                </div>

                <h4 className="text-2xl font-black text-[var(--text-main)] font-heading mb-3 leading-tight">{currentMap.title}</h4>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed italic mb-6">"{currentMap.highlight}"</p>

                <div className="space-y-4 mb-8 bg-[var(--card-bg)] p-5 rounded-2xl border border-[var(--glass-border)]">
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">{t('home.planner.transportTitle')}</span>
                    <span className="text-[var(--text-main)] font-bold text-sm">{currentMap.transport}</span>
                  </div>
                  <div className="h-[1px] w-full bg-[var(--glass-border)]"></div>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">{t('home.planner.bestTimeTitle')}</span>
                    <span className="text-[var(--text-main)] font-bold text-sm">{currentMap.bestTime}</span>
                  </div>
                </div>

                <a 
                  href={currentMap.mapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full block text-center bg-[#F4C038] hover:bg-white text-[#091422] font-black text-sm py-4 rounded-full transition-colors shadow-lg"
                >
                  🗺️ {t('home.planner.ctaMaps')}
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}
