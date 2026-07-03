"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLanguage } from '../context/LanguageContext';
import { pagesTranslations } from '../translations/pagesTranslations';

const column1Images = [
  "/profil kota/kantor-walikota.webp",
  "/profil kota/kawasan niaga.webp",
  "/profil kota/pelabuhan trisakti.webp",
  "/profil kota/trans banjarbakula.webp"
];

const column2Images = [
  "/profil kota/sungai.webp",
  "/profil kota/jasa pariwisata.webp",
  "/profil kota/rs ulin.webp",
  "/profil kota/pasar wadai.webp"
];

// We don't need JS duplication, we will duplicate DOM nodes for true seamless marquee

const AnimatedStat = ({ value, label, suffix="", inline=false }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const duration = 2000;
        const startTime = performance.now();
        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setCount(Math.floor(progress * value));
          if (progress < 1) requestAnimationFrame(updateCount);
        };
        requestAnimationFrame(updateCount);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  if (inline) {
    return <span ref={ref}>{count.toLocaleString('id-ID')}{suffix}</span>;
  }

  return (
    <div ref={ref} className="text-center p-6 sm:p-8 border border-[var(--glass-border)] rounded-3xl bg-[var(--card-bg)] backdrop-blur-md shadow-lg hover:border-[#F4C038]/50 transition-colors duration-500 group">
      <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#F4C038] font-heading mb-2 group-hover:scale-105 transition-transform duration-500">
        {count.toLocaleString('id-ID')}{suffix}
      </h3>
      <p className="text-xs sm:text-sm text-[var(--text-main)] font-bold uppercase tracking-widest">{label}</p>
    </div>
  );
};

const InteractivePillarSpotlight = () => {
  const { language } = useLanguage();
  const t = pagesTranslations[language]?.profil || pagesTranslations['id'].profil;
  const dataList = t.realBanjarmasinData || [];
  const [activeIdx, setActiveIdx] = useState(0);
  const activeData = dataList[activeIdx] || dataList[0] || {};

  if (!activeData || Object.keys(activeData).length === 0) return null;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 relative z-20">
      {/* Spotlight Tabs Header */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {dataList.map((item, idx) => {
          const isActive = activeIdx === idx;
          return (
            <button
              key={item.id}
              onClick={() => setActiveIdx(idx)}
              className={`flex items-center gap-3 p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                isActive 
                  ? "bg-[#33C3B3] text-[#091422] border-[#33C3B3] shadow-lg shadow-[#33C3B3]/25 scale-[1.02] font-black" 
                  : "bg-[var(--card-bg)] text-[var(--text-main)] border-[var(--glass-border)] hover:border-[#33C3B3]"
              }`}
            >
              <span className={`text-xs sm:text-sm font-black font-heading px-2.5 py-1 rounded-lg shrink-0 ${
                isActive ? "bg-[#091422] text-[#33C3B3]" : "bg-black/10 dark:bg-white/10 text-[var(--text-muted)]"
              }`}>
                {item.id}
              </span>
              <span className="font-bold text-sm sm:text-base tracking-wide truncate">
                {item.tabTitle}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Spotlight Display Card */}
      <div className="relative bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl sm:rounded-[36px] p-6 sm:p-10 lg:p-12 shadow-2xl overflow-hidden transition-all duration-500 text-left">
        {/* Ambient background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#33C3B3]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#F4C038]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        
        {/* Giant Watermark ID */}
        <div className="absolute -bottom-6 -right-4 lg:-bottom-10 lg:-right-6 text-[8rem] lg:text-[14rem] font-black text-[var(--text-main)] opacity-5 pointer-events-none select-none font-heading leading-none">
          {activeData.id}
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-center justify-between">
          {/* Left Content */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#33C3B3]/15 border border-[#33C3B3]/30 text-[#33C3B3] font-bold text-xs uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-[#33C3B3] animate-pulse" /> {t.dataFaktaNyata || "Data & Fakta Nyata"}
            </div>
            
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[var(--text-main)] font-heading leading-tight mb-3">
              {activeData.title}
            </h3>
            
            <h4 className="text-base sm:text-lg font-bold text-[#F4C038] mb-6">
              {activeData.subtitle}
            </h4>
            
            <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed max-w-3xl">
              {activeData.desc}
            </p>
          </div>

          {/* Right Statistics Badges */}
          <div className="w-full lg:w-auto shrink-0 flex flex-col sm:flex-row lg:flex-col gap-4">
            {(activeData.stats || []).map((stat, sIdx) => (
              <div 
                key={sIdx}
                className="flex-1 lg:w-64 bg-black/5 dark:bg-white/5 border border-[var(--glass-border)] rounded-2xl p-5 text-left backdrop-blur-sm hover:border-[#F4C038] transition-colors"
              >
                <div className="text-2xl sm:text-3xl font-black text-[var(--text-main)] font-heading tracking-tight mb-1">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-medium text-[var(--text-muted)] leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default function ProfilKota() {
  const { language } = useLanguage();
  const tLocal = (key) => {
    return pagesTranslations[language]?.profil?.[key] || pagesTranslations['id'].profil?.[key] || '';
  };

  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [activeNakhodaTab, setActiveNakhodaTab] = useState('walikota');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      <style>{`
        :root {
          --marquee-gap: 1rem;
        }
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(-100% - var(--marquee-gap))); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(calc(-100% - var(--marquee-gap))); }
          100% { transform: translateY(0); }
        }
        .marquee-col {
          display: flex;
          flex-direction: column;
          gap: var(--marquee-gap);
          overflow: hidden;
        }
        .marquee-content-up {
          display: flex;
          flex-direction: column;
          gap: var(--marquee-gap);
          animation: scrollUp 20s linear infinite;
        }
        .marquee-content-down {
          display: flex;
          flex-direction: column;
          gap: var(--marquee-gap);
          animation: scrollDown 20s linear infinite;
        }
        .hover-pause:hover .marquee-content-up,
        .hover-pause:hover .marquee-content-down {
          animation-play-state: paused;
        }
      `}</style>

      {/* =========================================================
          HERO SECTION: STREAMA STYLE (PARALLAX MARQUEE)
          ========================================================= */}
      <section className="relative w-full h-[100vh] min-h-[700px] flex items-center overflow-hidden pt-20">
        
        {/* Left Half: Marquee Grid (Full Bleed on Desktop) */}
        <div className="absolute left-0 top-0 w-full lg:w-[55vw] h-full lg:h-[120%] lg:-top-[10%] flex justify-center gap-4 lg:gap-8 opacity-40 lg:opacity-100 z-0 lg:z-10">
          
          {/* Awan / Fade Overlays (Top, Bottom, and Right side) */}
          <div className="absolute top-0 left-0 w-full h-[20vh] lg:h-[25vh] bg-gradient-to-b from-[var(--martapura-night)] to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-[20vh] lg:h-[25vh] bg-gradient-to-t from-[var(--martapura-night)] to-transparent z-20 pointer-events-none" />
          
          {/* Desktop Right Fade (Blends to text side) */}
          <div className="absolute top-0 right-0 w-[20vw] lg:w-[25vw] h-full bg-gradient-to-l from-[var(--martapura-night)] via-[var(--martapura-night)]/80 to-transparent z-20 pointer-events-none hidden lg:block" />
          
          {/* Mobile Overlay (For text readability) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--martapura-night)] via-[var(--martapura-night)]/80 to-transparent z-20 pointer-events-none lg:hidden" />

          {/* Column 1 (Scrolls Up) */}
          <div className="w-[140px] sm:w-[180px] lg:w-[280px] marquee-col hover-pause pt-10 lg:pt-20 pointer-events-auto relative z-10">
            <div className="marquee-content-up shrink-0">
              {column1Images.map((img, i) => (
                <div key={`c1-a-${i}`} className="w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] h-[200px] sm:h-[260px] lg:h-[400px] cursor-pointer hover:border-[#F4C038] transition-colors">
                  <img src={img} className="w-full h-full object-cover" alt="Profil Banjarmasin" loading={i === 0 ? "eager" : "lazy"} />
                </div>
              ))}
            </div>
            <div aria-hidden="true" className="marquee-content-up shrink-0">
              {column1Images.map((img, i) => (
                <div key={`c1-b-${i}`} className="w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] h-[200px] sm:h-[260px] lg:h-[400px] cursor-pointer hover:border-[#F4C038] transition-colors">
                  <img src={img} className="w-full h-full object-cover" alt="Profil Banjarmasin" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 (Scrolls Down) */}
          <div className="w-[140px] sm:w-[180px] lg:w-[280px] marquee-col hover-pause pointer-events-auto relative z-10">
            <div className="marquee-content-down shrink-0">
              {column2Images.map((img, i) => (
                <div key={`c2-a-${i}`} className="w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] h-[200px] sm:h-[260px] lg:h-[400px] cursor-pointer hover:border-[#33C3B3] transition-colors">
                  <img src={img} className="w-full h-full object-cover" alt="Profil Banjarmasin" loading="lazy" />
                </div>
              ))}
            </div>
            <div aria-hidden="true" className="marquee-content-down shrink-0">
              {column2Images.map((img, i) => (
                <div key={`c2-b-${i}`} className="w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] h-[200px] sm:h-[260px] lg:h-[400px] cursor-pointer hover:border-[#33C3B3] transition-colors">
                  <img src={img} className="w-full h-full object-cover" alt="Profil Banjarmasin" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Half: Typography (Constrained inside max-w) */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 w-full h-full flex justify-end items-center relative z-20 pointer-events-none">
          
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left h-full lg:h-auto pointer-events-auto mb-10 lg:mb-0 lg:pl-16">
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-2 font-heading">
              {tLocal('heroTag')}
            </span>
            <h1 className="hero-title !mb-3">
              {tLocal('heroTitle')} <span className="text-sasirangan">{tLocal('heroTitleSpan')}</span>
            </h1>
            <p className="hero-subtitle mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0">
              {tLocal('heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button className="bg-[#F4C038] hover:bg-amber-400 text-[#091422] font-black px-8 py-4 rounded-full shadow-[0_0_20px_rgba(244,192,56,0.3)] transition-transform hover:-translate-y-1 w-full sm:w-auto text-sm sm:text-base">
                {tLocal('exploreBtn')}
              </button>
              <Link href="/sejarah" className="bg-[var(--card-bg)] backdrop-blur-md border border-[var(--glass-border)] hover:bg-[var(--text-main)] hover:text-[var(--martapura-deep)] text-[var(--text-main)] font-black px-8 py-4 rounded-full transition-all w-full sm:w-auto text-sm sm:text-base text-center">
                {tLocal('historyBtn')}
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 1: NAKHODA KOTA (CENTERED LEADERS WITH SIDE BIO)
          ========================================================= */}
      <section className="pt-24 pb-0 bg-[var(--bg-main)] relative overflow-hidden border-t border-[var(--glass-border)]">
        {/* Background Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#F4C038]/10 to-[#33C3B3]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="text-center mb-16 relative z-10 px-4">
          <span className="text-[#F4C038] font-bold tracking-[0.3em] uppercase text-xs mb-2 drop-shadow-md block">{tLocal('section1Tag')}</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--text-main)] font-heading leading-tight">
            {tLocal('section1Title')} <span className="text-[#33C3B3]">{tLocal('section1TitleSpan')}</span>
          </h2>
          <p className="text-[var(--text-muted)] font-body max-w-2xl mx-auto mt-4">
            {tLocal('section1Desc')}
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
          
          {/* DESKTOP VIEW (Large screens): Left Bio - Center Photos - Right Bio */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-end">
            
            {/* Left Bio: H. Muh. Yamin HR (Direct Typography, No Box) */}
            <div className="col-span-3 pb-16 text-left">
              <span className="inline-block text-[#F4C038] font-bold text-xs uppercase tracking-widest mb-3 drop-shadow-md">
                Wali Kota
              </span>
              <h3 className="text-3xl xl:text-4xl font-black text-[var(--text-main)] font-heading mb-3 leading-tight">
                {tLocal('nakhoda1Title')}
              </h3>
              <p className="text-[var(--text-muted)] text-sm xl:text-base leading-relaxed mb-6">
                {tLocal('nakhoda1Desc')}
              </p>
              <div className="space-y-2.5 border-t border-[var(--glass-border)] pt-4 text-xs xl:text-sm font-semibold text-[var(--text-main)]">
                {(tLocal('nakhoda1Points') || []).map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#F4C038]" /> {pt}
                  </div>
                ))}
              </div>
            </div>

            {/* Center Photos: Standing grounded touching the bottom border */}
            <div className="col-span-6 flex justify-center items-end gap-4 xl:gap-6 px-2 self-end">
              
              {/* Photo 1: Wali Kota */}
              <div className="relative w-1/2 max-w-[280px] xl:max-w-[310px] h-[460px] xl:h-[520px] rounded-t-3xl overflow-hidden border-t-2 border-x-2 border-[#F4C038]/60 group shadow-2xl self-end">
                <img 
                  loading="lazy" 
                  src="/profil kota/Wali_Kota_Banjarmasin_Muhammad_Y-1.webp" 
                  alt="H. Muh. Yamin HR - Wali Kota Banjarmasin" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute bottom-6 left-0 right-0 text-center px-2">
                  <p className="text-white font-black text-base xl:text-lg tracking-wide drop-shadow-md">{tLocal('nakhoda1Title')}</p>
                  <p className="text-[#F4C038] font-bold text-xs uppercase tracking-widest mt-0.5">Wali Kota</p>
                </div>
              </div>

              {/* Photo 2: Wakil Wali Kota */}
              <div className="relative w-1/2 max-w-[280px] xl:max-w-[310px] h-[460px] xl:h-[520px] rounded-t-3xl overflow-hidden border-t-2 border-x-2 border-[#33C3B3]/60 group shadow-2xl self-end">
                <img 
                  loading="lazy" 
                  src="/profil kota/Wakil_Wali_Kota_Banjarmasin_Anan.webp" 
                  alt="Hj. Ananda - Wakil Wali Kota Banjarmasin" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute bottom-6 left-0 right-0 text-center px-2">
                  <p className="text-white font-black text-base xl:text-lg tracking-wide drop-shadow-md">{tLocal('nakhoda2Title')}</p>
                  <p className="text-[#33C3B3] font-bold text-xs uppercase tracking-widest mt-0.5">Wakil Wali Kota</p>
                </div>
              </div>

            </div>

            {/* Right Bio: Hj. Ananda (Direct Typography, No Box) */}
            <div className="col-span-3 pb-16 text-left">
              <span className="inline-block text-[#33C3B3] font-bold text-xs uppercase tracking-widest mb-3 drop-shadow-md">
                Wakil Wali Kota
              </span>
              <h3 className="text-3xl xl:text-4xl font-black text-[var(--text-main)] font-heading mb-3 leading-tight">
                {tLocal('nakhoda2Title')}
              </h3>
              <p className="text-[var(--text-muted)] text-sm xl:text-base leading-relaxed mb-6">
                {tLocal('nakhoda2Desc')}
              </p>
              <div className="space-y-2.5 border-t border-[var(--glass-border)] pt-4 text-xs xl:text-sm font-semibold text-[var(--text-main)]">
                {(tLocal('nakhoda2Points') || []).map((pt, pIdx) => (
                  <div key={pt} className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#33C3B3]" /> {pt}
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* MOBILE & TABLET VIEW (< Large screens): Interactive Spotlight Tabs (Uncropped Full Portrait) */}
          <div className="flex flex-col items-center gap-6 pb-8 lg:hidden">
            
            {/* Tab Buttons */}
            <div className="flex p-1.5 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-2xl shadow-md w-full max-w-sm">
              <button
                onClick={() => setActiveNakhodaTab('walikota')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  activeNakhodaTab === 'walikota'
                    ? 'bg-[#F4C038] text-[#091422] shadow-lg shadow-[#F4C038]/25 scale-[1.02]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                <span>🎖️</span> Wali Kota
              </button>
              <button
                onClick={() => setActiveNakhodaTab('wakil')}
                className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  activeNakhodaTab === 'wakil'
                    ? 'bg-[#33C3B3] text-[#091422] shadow-lg shadow-[#33C3B3]/25 scale-[1.02]'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
                }`}
              >
                <span>✨</span> Wakil Wali Kota
              </button>
            </div>

            {/* Active Card Showcase with Floating Spacing */}
            {activeNakhodaTab === 'walikota' ? (
              <div className="w-full bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.45)] dark:shadow-[0_20px_50px_rgba(244,192,56,0.15)] animate-fade-in mb-8 sm:mb-12 transform -translate-y-2 transition-all duration-500">
                {/* Uncropped Portrait Container */}
                <div className="relative w-full max-h-[440px] sm:max-h-[500px] flex justify-center items-end overflow-hidden bg-gradient-to-b from-black/10 via-transparent to-[var(--card-bg)] pt-8 px-4">
                  <img 
                    loading="lazy" 
                    src="/profil kota/Wali_Kota_Banjarmasin_Muhammad_Y-1.webp" 
                    alt="H. Muh. Yamin HR - Wali Kota Banjarmasin" 
                    className="w-auto h-[340px] sm:h-[400px] object-contain object-bottom filter drop-shadow-2xl transition-all duration-500" 
                  />
                </div>
                
                <div className="p-6 sm:p-8 text-left relative z-10 border-t border-[var(--glass-border)] bg-[var(--card-bg)]">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#F4C038]/15 border border-[#F4C038]/30 text-[#F4C038] font-bold text-xs uppercase tracking-widest mb-3 shadow-sm">
                    {tLocal('nakhoda1Tag')}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] font-heading mb-3">
                    {tLocal('nakhoda1Title')}
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
                    {tLocal('nakhoda1Desc')}
                  </p>
                  <div className="space-y-2.5 border-t border-[var(--glass-border)] pt-4 text-xs sm:text-sm font-semibold text-[var(--text-main)]">
                    {(tLocal('nakhoda1Points') || []).map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#F4C038]" /> {pt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.45)] dark:shadow-[0_20px_50px_rgba(51,195,179,0.15)] animate-fade-in mb-8 sm:mb-12 transform -translate-y-2 transition-all duration-500">
                {/* Uncropped Portrait Container */}
                <div className="relative w-full max-h-[440px] sm:max-h-[500px] flex justify-center items-end overflow-hidden bg-gradient-to-b from-black/10 via-transparent to-[var(--card-bg)] pt-8 px-4">
                  <img 
                    loading="lazy" 
                    src="/profil kota/Wakil_Wali_Kota_Banjarmasin_Anan.webp" 
                    alt="Hj. Ananda - Wakil Wali Kota Banjarmasin" 
                    className="w-auto h-[340px] sm:h-[400px] object-contain object-bottom filter drop-shadow-2xl transition-all duration-500" 
                  />
                </div>
                
                <div className="p-6 sm:p-8 text-left relative z-10 border-t border-[var(--glass-border)] bg-[var(--card-bg)]">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#33C3B3]/15 border border-[#33C3B3]/30 text-[#33C3B3] font-bold text-xs uppercase tracking-widest mb-3 shadow-sm">
                    {tLocal('nakhoda2Tag')}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] font-heading mb-3">
                    {tLocal('nakhoda2Title')}
                  </h3>
                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
                    {tLocal('nakhoda2Desc')}
                  </p>
                  <div className="space-y-2.5 border-t border-[var(--glass-border)] pt-4 text-xs sm:text-sm font-semibold text-[var(--text-main)]">
                    {(tLocal('nakhoda2Points') || []).map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2.5">
                        <span className="w-2 h-2 rounded-full bg-[#33C3B3]" /> {pt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 2: FILOSOFI KAYUH BAIMBAI (HORIZONTAL ACCORDION)
          ========================================================= */}
      <section className="relative py-24 bg-[var(--bg-main)] flex flex-col justify-center items-center border-t border-[var(--glass-border)]">
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full text-center mb-16">
          <span className="text-[#33C3B3] font-bold text-xs sm:text-sm tracking-[0.3em] uppercase font-heading mb-4 block drop-shadow-md">
            {tLocal('section2Tag')}
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[var(--text-main)] font-heading mb-6 leading-tight">
            {tLocal('section2Title')} <span className="text-[#F4C038]">{tLocal('section2TitleSpan')}</span>
          </h2>
          <p className="text-base md:text-lg text-[var(--text-muted)] font-body leading-relaxed max-w-3xl mx-auto">
            {tLocal('section2Desc')}
          </p>
        </div>

        {/* Interactive Spotlight Showcase with Real Banjarmasin Data */}
        <InteractivePillarSpotlight />
      </section>

      {/* =========================================================
          SECTION 3: ASYMMETRIC CITY DASHBOARD (GEO & DEMO)
          ========================================================= */}
      <section className="relative py-24 bg-[var(--bg-main)] border-t border-[var(--glass-border)] overflow-hidden">
        {/* Lightweight GPU-friendly ambient background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#33C3B3]/10 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-gradient-to-tl from-[#F4C038]/10 to-transparent rounded-full blur-3xl opacity-50 pointer-events-none" />
          
          {/* Subtle static watermark without blend modes */}
          <img 
            loading="lazy"
            src="/profil kota/Wali_Kota_Banjarmasin_Muhammad_Y-1.webp" 
            alt="Wali Kota Watermark" 
            className="absolute right-0 bottom-0 w-full lg:w-1/3 h-auto max-h-full object-contain object-bottom opacity-5 dark:opacity-10 pointer-events-none"
          />
        </div>
        
        <div className="max-w-[1400px] mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#F4C038] font-bold text-xs tracking-widest uppercase font-heading block mb-2">{tLocal('section3Tag')}</span>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
              {tLocal('section3Title')} <span className="text-[#33C3B3]">{tLocal('section3TitleSpan')}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
            
            {/* Center Massive Card (Population) */}
            <div className="lg:col-span-8 lg:row-span-2 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[40px] p-8 md:p-12 relative overflow-hidden group shadow-lg flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F4C038]/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#F4C038]/10 transition-colors duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#F4C038]/20 flex items-center justify-center text-2xl">👥</div>
                  <span className="text-[#F4C038] font-bold tracking-widest uppercase text-sm">{tLocal('section3Col1Tag')}</span>
                </div>
                <h3 className="text-6xl md:text-8xl lg:text-9xl font-black text-[var(--text-main)] font-heading leading-none mb-4 flex items-baseline">
                  <AnimatedStat value={679} label="" suffix="+" inline /> 
                  <span className="text-2xl md:text-4xl text-[var(--text-muted)] ml-2 inline-block">{tLocal('section3Col1Suffix')}</span>
                </h3>
                <p className="text-lg md:text-xl text-[var(--text-muted)] font-body max-w-xl">
                  {tLocal('section3Col1Desc')}
                </p>
              </div>
            </div>

            {/* Top Right Card (Elevasi) */}
            <div className="lg:col-span-4 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[40px] p-8 shadow-lg flex flex-col justify-center hover:border-[#33C3B3]/50 transition-colors group">
              <div className="text-5xl mb-4 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all">🌊</div>
              <h4 className="text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading mb-1">{tLocal('section3Col2Title')}</h4>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">{tLocal('section3Col2Desc')}</p>
            </div>

            {/* Middle Right Card (Islands) */}
            <div className="lg:col-span-4 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[40px] p-8 shadow-lg flex flex-col justify-center hover:border-[#33C3B3]/50 transition-colors group">
              <div className="text-5xl mb-4 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all">🏝️</div>
              <h4 className="text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading mb-1">{tLocal('section3Col3Title')}</h4>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">{tLocal('section3Col3Desc')}</p>
            </div>

            {/* Bottom Row - Admin Data */}
            <div className="lg:col-span-6 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[40px] p-8 shadow-lg flex items-center gap-6 group hover:border-[#F4C038]/50 transition-colors">
              <div className="w-20 h-20 shrink-0 rounded-full bg-[#33C3B3]/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">🏛️</div>
              <div>
                <h4 className="text-4xl font-black text-[var(--text-main)] font-heading mb-1">{tLocal('section3Col4Title')}</h4>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">{tLocal('section3Col4Desc')}</p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[40px] p-8 shadow-lg flex items-center gap-6 group hover:border-[#F4C038]/50 transition-colors">
              <div className="w-20 h-20 shrink-0 rounded-full bg-[#F4C038]/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">🏘️</div>
              <div>
                <h4 className="text-4xl font-black text-[var(--text-main)] font-heading mb-1">{tLocal('section3Col5Title')}</h4>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">{tLocal('section3Col5Desc')}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4: LAMBANG KOTA (RADIAL CIRCULAR LAYOUT)
          ========================================================= */}
      <section className="py-24 bg-[var(--bg-main)] border-t border-[var(--glass-border)] relative overflow-hidden">
        <div className="text-center mb-16 px-4">
          <span className="text-[#F4C038] font-bold text-xs tracking-widest uppercase font-heading block mb-2">{tLocal('section4Tag')}</span>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading">
            {tLocal('section4Title')} <span className="text-[#33C3B3]">{tLocal('section4TitleSpan')}</span>
          </h2>
        </div>

        <div className="max-w-[1200px] mx-auto px-4">
          {/* DESKTOP VIEW (Large screens): 3-Column Grid Layout */}
          <div className="hidden lg:grid grid-cols-3 gap-6 items-center max-w-6xl mx-auto w-full min-h-[600px]">
            
            {/* Left Column */}
            <div className="flex flex-col gap-12 items-end justify-center">
              {[
                { idx: 5, icon: "🚣" },
                { idx: 4, icon: "🌿" }
              ].map((item) => {
                const transItem = tLocal('section4Items')?.[item.idx] || {};
                return (
                  <div key={item.idx} className="w-[340px] bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[32px] p-6 shadow-xl hover:shadow-[0_0_30px_rgba(51,195,179,0.3)] hover:border-[#33C3B3] transition-all duration-500 flex items-center gap-4 text-left">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-[var(--bg-main)] border border-[var(--glass-border)] flex items-center justify-center text-2xl shadow-inner">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-[var(--text-main)] font-heading mb-1">{transItem.title}</h3>
                      <p className="text-[var(--text-muted)] font-body text-xs leading-snug">{transItem.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Center Column (Logo & Top/Bottom Items) */}
            <div className="flex flex-col items-center justify-between h-full py-4 gap-10">
              {[
                { idx: 0, icon: "🛡️" }
              ].map((item) => {
                const transItem = tLocal('section4Items')?.[item.idx] || {};
                return (
                  <div key={item.idx} className="w-[340px] bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[32px] p-6 shadow-xl hover:shadow-[0_0_30px_rgba(51,195,179,0.3)] hover:border-[#33C3B3] transition-all duration-500 flex items-center gap-4 text-left">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-[var(--bg-main)] border border-[var(--glass-border)] flex items-center justify-center text-2xl shadow-inner">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-[var(--text-main)] font-heading mb-1">{transItem.title}</h3>
                      <p className="text-[var(--text-muted)] font-body text-xs leading-snug">{transItem.desc}</p>
                    </div>
                  </div>
                );
              })}

              {/* Logo */}
              <div className="w-64 h-auto relative group flex justify-center items-center my-4">
                 <img loading="lazy" src="/profil kota/LOGO KOTA BANJARMASIN - 328 KB.webp" alt="Lambang Kota Banjarmasin" className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(244,192,56,0.4)] group-hover:scale-105 transition-transform duration-700" />
              </div>

              {[
                { idx: 3, icon: "🛶" }
              ].map((item) => {
                const transItem = tLocal('section4Items')?.[item.idx] || {};
                return (
                  <div key={item.idx} className="w-[340px] bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[32px] p-6 shadow-xl hover:shadow-[0_0_30px_rgba(51,195,179,0.3)] hover:border-[#33C3B3] transition-all duration-500 flex items-center gap-4 text-left">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-[var(--bg-main)] border border-[var(--glass-border)] flex items-center justify-center text-2xl shadow-inner">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-[var(--text-main)] font-heading mb-1">{transItem.title}</h3>
                      <p className="text-[var(--text-muted)] font-body text-xs leading-snug">{transItem.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-12 items-start justify-center">
              {[
                { idx: 1, icon: "✨" },
                { idx: 2, icon: "🏛️" }
              ].map((item) => {
                const transItem = tLocal('section4Items')?.[item.idx] || {};
                return (
                  <div key={item.idx} className="w-[340px] bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[32px] p-6 shadow-xl hover:shadow-[0_0_30px_rgba(51,195,179,0.3)] hover:border-[#33C3B3] transition-all duration-500 flex items-center gap-4 text-left">
                    <div className="w-14 h-14 shrink-0 rounded-2xl bg-[var(--bg-main)] border border-[var(--glass-border)] flex items-center justify-center text-2xl shadow-inner">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-[var(--text-main)] font-heading mb-1">{transItem.title}</h3>
                      <p className="text-[var(--text-muted)] font-body text-xs leading-snug">{transItem.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* MOBILE & TABLET VIEW (< Large screens): Compact Emblem Showcase & Sleek 2-Column Grid */}
          <div className="lg:hidden flex flex-col items-center">
            {/* Center Emblem Mobile */}
            <div className="w-44 sm:w-52 mb-8 relative group">
               <img loading="lazy" src="/profil kota/LOGO KOTA BANJARMASIN - 328 KB.webp" alt="Lambang Kota Banjarmasin" className="w-full h-auto object-contain drop-shadow-[0_0_25px_rgba(244,192,56,0.5)]" />
            </div>

            {/* Compact 2-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full text-left">
              {[
                { id: 1, icon: "🛡️" },
                { id: 2, icon: "✨" },
                { id: 3, icon: "🏛️" },
                { id: 4, icon: "🛶" },
                { id: 5, icon: "🌿" },
                { id: 6, icon: "🚣" }
              ].map((item, idx) => {
                const transItem = tLocal('section4Items')?.[idx] || {};
                return (
                  <div 
                    key={idx} 
                    className="flex items-center gap-3.5 p-4 rounded-2xl bg-[var(--card-bg)] border border-[var(--glass-border)] shadow-md hover:border-[#F4C038] transition-all"
                  >
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-[#F4C038]/10 border border-[#F4C038]/30 flex items-center justify-center text-xl">
                      {item.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-black text-[var(--text-main)] font-heading mb-0.5 truncate">{transItem.title}</h3>
                      <p className="text-[var(--text-muted)] font-body text-xs leading-snug">
                        {transItem.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5: URAT NADI EKONOMI (HORIZONTAL ACCORDION)
          ========================================================= */}
      <section className="py-24 bg-[var(--bg-main)] overflow-hidden border-t border-[var(--glass-border)]">
        <div className="max-w-[1400px] mx-auto px-4 w-full">
          <div className="text-center mb-16">
            <span className="text-[#33C3B3] font-bold text-xs tracking-widest uppercase font-heading block mb-2">{tLocal('section5Tag')}</span>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
              {tLocal('section5Title')} <span className="text-[#F4C038]">{tLocal('section5TitleSpan')}</span>
            </h2>
            <p className="text-[var(--text-muted)] mt-4 max-w-xl mx-auto font-body text-sm md:text-base">
              {tLocal('section5Desc')}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px] group/accordion">
            {[
              {
                img: "/profil kota/pelabuhan trisakti.webp"
              },
              {
                img: "/wisata/960px-Pasar_Terapung_Siring_Banj.webp"
              },
              {
                img: "/profil kota/jasa pariwisata.webp"
              }
            ].map((item, idx) => {
              const transItem = tLocal('section5Items')?.[idx] || {};
              return (
                <div 
                  key={idx} 
                  className="relative flex-1 lg:hover:flex-[2.5] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-3xl group/item cursor-pointer border border-[var(--glass-border)] min-h-[260px] sm:min-h-[300px] lg:min-h-0 h-full shadow-lg"
                >
                  <img loading="lazy" src={item.img} alt={transItem.title} className="absolute inset-0 w-full h-full object-cover scale-110 group-hover/item:scale-100 transition-transform duration-1000 grayscale group-hover/item:grayscale-0" />
                  
                  {/* Gradient Overlay forced to black for contrast against white text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover/item:opacity-70 transition-opacity duration-700" />
                  
                  <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full text-left flex flex-col justify-end h-full">
                    <div className="transform translate-y-0 lg:translate-y-16 group-hover/item:translate-y-0 transition-transform duration-700">
                      <div className="w-12 h-1 bg-[#F4C038] mb-4 opacity-100 lg:opacity-0 group-hover/item:opacity-100 transition-opacity duration-700 lg:delay-100" />
                      <h3 className="text-2xl md:text-3xl font-black text-white font-heading mb-2 whitespace-nowrap drop-shadow-md">{transItem.title}</h3>
                      <p className="text-sm md:text-base text-slate-300 font-body opacity-100 lg:opacity-0 group-hover/item:opacity-100 transition-opacity duration-700 lg:delay-200 max-w-sm line-clamp-3 lg:line-clamp-none drop-shadow-md">
                        {transItem.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 6: BUDAYA SUNGAI (SPOTLIGHT REVEAL)
          ========================================================= */}
      <section 
        className="relative h-[80vh] min-h-[600px] w-full bg-black overflow-hidden cursor-crosshair flex items-center justify-center border-t border-[var(--glass-border)]"
        onMouseMove={handleMouseMove}
      >
        {/* Latar Belakang Asli (Terang/Penuh Warna) */}
        <div className="absolute inset-0 pointer-events-none">
          <img loading="lazy" src="/wisata/960px-Pasar_Terapung_Siring_Banj.webp" alt="Pasar Terapung" className="w-full h-full object-cover opacity-80" />
        </div>
        
        {/* Spotlight Masking Layer */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300" 
          style={{
            background: `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, transparent 0%, rgba(5,11,20,0.95) 100%)`
          }}
        />

        <div className="relative z-20 max-w-4xl px-4 text-center pointer-events-none">
          <h2 className="text-4xl md:text-7xl font-black text-white font-heading leading-tight mb-6 drop-shadow-[0_0_40px_rgba(0,0,0,1)]">
            {tLocal('section6Title')} <span className="text-[#33C3B3]">{tLocal('section6TitleSpan')}</span> <br className="hidden md:block"/>{tLocal('section6TitleEnd')}
          </h2>
          <p className="text-slate-200 text-base md:text-xl font-body drop-shadow-[0_0_20px_rgba(0,0,0,1)] font-medium max-w-2xl mx-auto">
            {tLocal('section6Desc')}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
