"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import dynamic from 'next/dynamic';
const RouteAccessibilityMap = dynamic(() => import('../components/RouteAccessibilityMap'), { ssr: false });
import { useLanguage } from '../context/LanguageContext';
import { pagesTranslations } from '../translations/pagesTranslations';
import { checklistData } from '../translations/hackathonData';

export default function Panduan() {
  const { language } = useLanguage();
  
  const tLocal = (key) => {
    const keys = key.split('.');
    let translation = pagesTranslations[language]?.panduan;
    if (!translation) {
      translation = pagesTranslations['id']?.panduan;
    }
    
    for (const k of keys) {
      if (translation && translation[k] !== undefined) {
        translation = translation[k];
      } else {
        // Fallback to Indonesian (id)
        let fallback = pagesTranslations['id']?.panduan;
        for (const fk of keys) {
          if (fallback && fallback[fk] !== undefined) {
            fallback = fallback[fk];
          } else {
            return key; // return key if not found
          }
        }
        return fallback;
      }
    }
    return translation;
  };

  const [activeHotelTab, setActiveHotelTab] = useState("Riverfront");
  const [copiedNumber, setCopiedNumber] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});

  const checklist = checklistData[language] || checklistData['id'];

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

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

  const hotelCategories = {
    "Riverfront": [
      {
        name: "Swiss-Belhotel Borneo",
        stars: "⭐️⭐️⭐️⭐️",
        price: tLocal('hotels.swiss.price'),
        location: "Jl. Pangeran Antasari No. 86",
        desc: tLocal('hotels.swiss.desc'),
        tag: tLocal('hotels.swiss.tag'),
        img: "/panduan/Swiss-Belhotel Borneo Banjarmasi.webp",
        mapsUrl: "https://maps.google.com/?q=Swiss-Belhotel+Borneo+Banjarmasin"
      },
      {
        name: "Summer Bed & Breakfast",
        stars: "⭐️⭐️",
        price: tLocal('hotels.summer.price'),
        location: "Jl. Veteran Sungai Bilu",
        desc: tLocal('hotels.summer.desc'),
        tag: tLocal('hotels.summer.tag'),
        img: "/panduan/Summer Bed & Breakfast.webp",
        mapsUrl: "https://maps.google.com/?q=Summer+Bed+and+Breakfast+Banjarmasin"
      }
    ],
    "Siring": [
      {
        name: "Favehotel Kapt. Tendean",
        stars: "⭐️⭐️⭐️",
        price: tLocal('hotels.fave.price'),
        location: "Jl. Kapten Piere Tendean No. 10",
        desc: tLocal('hotels.fave.desc'),
        tag: tLocal('hotels.fave.tag'),
        img: "/panduan/fave hotel.webp",
        mapsUrl: "https://maps.google.com/?q=Favehotel+Banjarmasin"
      },
      {
        name: "Victoria Hotel River View",
        stars: "⭐️⭐️⭐️",
        price: tLocal('hotels.victoria.price'),
        location: "Jl. Lambung Mangkurat No. 48",
        desc: tLocal('hotels.victoria.desc'),
        tag: tLocal('hotels.victoria.tag'),
        img: "/panduan/victoria hotel.webp",
        mapsUrl: "https://maps.google.com/?q=Hotel+Victoria+Banjarmasin"
      }
    ],
    "Bisnis": [
      {
        name: "Rattan Inn & Resort",
        stars: "⭐️⭐️⭐️⭐️",
        price: tLocal('hotels.rattan.price'),
        location: "Jl. A. Yani Km 5.7",
        desc: tLocal('hotels.rattan.desc'),
        tag: tLocal('hotels.rattan.tag'),
        img: "/panduan/Rattan Inn & Resort.webp",
        mapsUrl: "https://maps.google.com/?q=Rattan+Inn+Banjarmasin"
      },
      {
        name: "Galaxy Hotel Banjarmasin",
        stars: "⭐️⭐️⭐️⭐️",
        price: tLocal('hotels.galaxy.price'),
        location: "Jl. A. Yani Km 2.5",
        desc: tLocal('hotels.galaxy.desc'),
        tag: tLocal('hotels.galaxy.tag'),
        img: "/panduan/galaxy hotel.webp",
        mapsUrl: "https://maps.google.com/?q=Galaxy+Hotel+Banjarmasin"
      }
    ]
  };

  const faqList = tLocal('faqs') || [];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--bg-main)]">
      <Navbar />

      {/* =========================================================
          HERO SECTION: THE FLOATING 3D GUIDEBOOK ORNAMENT
          ========================================================= */}
      <section className="relative pt-32 pb-12 sm:pb-20 px-4 sm:px-6 max-w-[1240px] mx-auto flex items-center">
        {/* Glow Backgrounds - Hanya di Dark Mode */}
        <div className="hidden dark:block absolute top-1/4 left-10 w-72 h-72 bg-[#00A896]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="hidden dark:block absolute bottom-10 right-10 w-96 h-96 bg-[#F4C038]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center w-full relative z-10">
          
          {/* Left Column: Clear High-Impact Typography & Action Anchors */}
          <div className="lg:col-span-7 text-center lg:text-left animate-fadeIn">
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#00A896] mb-2 font-heading">
              {tLocal('heroTag')}
            </span>
            <h1 className="hero-title !mb-3">
              {tLocal('heroTitle')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F4C038] via-amber-400 to-[#00A896]">{tLocal('heroTitleSpan')}</span>
            </h1>
            <p className="hero-subtitle mx-auto lg:mx-0 !mb-8 !max-w-2xl px-2">
              {tLocal('heroSubtitle')}
            </p>

            {/* Quick Navigation Anchors */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 sm:gap-3">
              <button
                onClick={() => scrollToSection('transport')}
                className="px-4 sm:px-5 py-3 rounded-2xl bg-[#F4C038] hover:bg-amber-400 text-[#091422] font-heading font-black text-xs sm:text-sm transition-all shadow-[0_5px_20px_rgba(244,192,56,0.3)] hover:scale-105 flex items-center gap-2"
              >
                <span>✈️</span> {tLocal('navAkses')}
              </button>
              <button
                onClick={() => scrollToSection('peta-rute')}
                className="px-4 sm:px-5 py-3 rounded-2xl bg-[#00A896] hover:bg-[#008075] text-white font-heading font-black text-xs sm:text-sm transition-all shadow-[0_5px_20px_rgba(0,168,150,0.3)] hover:scale-105 flex items-center gap-2"
              >
                <span>🗺️</span> {tLocal('navPeta')}
              </button>
              <button
                onClick={() => scrollToSection('staycation')}
                className="px-4 sm:px-5 py-3 rounded-2xl bg-[var(--card-bg)] hover:border-[#00A896] text-[var(--text-main)] border border-[var(--glass-border)] font-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow hover:scale-105"
              >
                <span>🏨</span> {tLocal('navHotel')}
              </button>
              <button
                onClick={() => scrollToSection('etika')}
                className="px-4 sm:px-5 py-3 rounded-2xl bg-[var(--card-bg)] hover:border-[#F4C038] text-[var(--text-main)] border border-[var(--glass-border)] font-heading font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow hover:scale-105"
              >
                <span>🌿</span> {tLocal('navEtika')}
              </button>
              <button
                onClick={() => scrollToSection('darurat')}
                className="px-4 sm:px-5 py-3 rounded-2xl bg-rose-500/20 hover:bg-rose-500 text-rose-400 hover:text-white border border-rose-500/30 font-heading font-black text-xs sm:text-sm transition-all flex items-center gap-2"
              >
                <span>🚨</span> {tLocal('navSos')}
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="px-4 sm:px-5 py-3 rounded-2xl bg-[#00A896]/20 hover:bg-[#00A896] text-[#00A896] hover:text-white border border-[#00A896]/30 font-heading font-black text-xs sm:text-sm transition-all flex items-center gap-2"
              >
                <span>❓</span> {tLocal('navFaq')}
              </button>
            </div>
          </div>

          {/* Right Column: Decorative Animated 3D Book Graphic ("Cuman Hiasan Buku Animasi") */}
          <div className="lg:col-span-5 flex items-center justify-center relative mt-12 lg:mt-0 pb-10 lg:pb-0">
            <motion.div
              animate={{ y: [-12, 12, -12], rotateZ: [-1, 1, -1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[280px] sm:w-[320px] lg:w-80 h-[320px] sm:h-[360px] lg:h-96 rounded-3xl bg-gradient-to-br from-[#1A2634] via-[#091422] to-[#121E28] border-2 border-[#F4C038]/40 shadow-[0_25px_70px_rgba(0,168,150,0.25)] flex flex-col items-center justify-center p-6 text-center transform -rotate-3 mx-auto"
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
                📍 {tLocal('bookDist')}
              </div>

              {/* Book Center Illustration */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#F4C038] to-[#00A896] flex items-center justify-center text-5xl shadow-inner mb-4 border-4 border-white/20 animate-pulse">
                📖
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#00A896] mb-1">{tLocal('bookTag')}</span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading tracking-tight mb-2">
                {tLocal('bookTitle')}
              </h3>
              <div className="w-12 h-1 bg-[#F4C038] rounded-full mx-auto mb-3" />
              <p className="text-[11px] text-gray-400 font-mono">
                {tLocal('bookDesc')}
              </p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* =========================================================
          HACKATHON WINNER FEATURE: RIVER DASHBOARD & TRAVEL KIT
          ========================================================= */}
      <section className="py-16 max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Travel Kit */}
          <div className="lg:col-span-7 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00A896]/5 rounded-full blur-3xl -z-10 group-hover:bg-[#00A896]/10 transition-colors duration-700" />
            <div className="flex items-center gap-3 mb-2">
              <span className="w-10 h-10 rounded-xl bg-[#00A896]/20 flex items-center justify-center text-xl shadow-inner border border-[#00A896]/30 animate-pulse">🎒</span>
              <span className="text-xs font-black uppercase tracking-widest text-[#00A896] font-heading">Hackathon Feature</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-main)] font-heading mb-2">{checklist.title}</h2>
            <p className="text-sm text-[var(--text-muted)] font-body mb-8">{checklist.subtitle}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {checklist.items.map((item) => {
                const isChecked = checkedItems[item.id];
                return (
                  <div 
                    key={item.id} 
                    onClick={() => toggleCheck(item.id)}
                    className={`cursor-pointer border p-4 rounded-2xl flex items-start gap-4 transition-all duration-300 transform hover:-translate-y-1 ${
                      isChecked 
                        ? "bg-[#00A896]/10 border-[#00A896]/50 shadow-[0_0_15px_rgba(0,168,150,0.2)]" 
                        : "bg-[var(--bg-main)] border-[var(--glass-border)] hover:border-[#F4C038]/50"
                    }`}
                  >
                    <div className="relative">
                      <span className={`text-3xl p-2 rounded-xl block transition-transform duration-300 ${isChecked ? "scale-90 opacity-50 bg-transparent" : "scale-100 opacity-100 bg-[var(--card-bg)] shadow-md"}`}>
                        {item.icon}
                      </span>
                      {isChecked && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute inset-0 flex items-center justify-center text-2xl text-[#00A896] drop-shadow-md"
                        >
                          ✔️
                        </motion.div>
                      )}
                    </div>
                    <div>
                      <h4 className={`font-heading font-black text-sm mb-1 transition-all ${isChecked ? "text-[#00A896] line-through opacity-70" : "text-[var(--text-main)]"}`}>
                        {item.name}
                      </h4>
                      <p className={`text-[11px] leading-relaxed transition-all ${isChecked ? "text-[#00A896]/70" : "text-[var(--text-muted)]"}`}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: River Tide Dashboard */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            
            {/* River Tide Dashboard Widget */}
            <div className="bg-gradient-to-br from-[#091422] to-[#121E28] border border-[#00A896]/30 rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,168,150,0.15)] relative overflow-hidden h-full flex flex-col justify-center">
              <div className="absolute inset-0 bg-[url('/wave-pattern.svg')] opacity-5 mix-blend-overlay animate-pulse" />
              <div className="flex justify-between items-start relative z-10 mb-6">
                <div>
                  <h3 className="font-heading font-black text-white mb-1">{checklist.riverContext.title}</h3>
                  <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">Live Estimation</p>
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-ping" />
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-4 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kondisi Air</span>
                  <span className="text-xs font-black text-[#F4C038]">{checklist.riverContext.time}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-heading drop-shadow-md">
                  {checklist.riverContext.status}
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-body relative z-10 mt-2">
                {checklist.riverContext.desc}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 1 (#transport): ROADMAP TRANSIT BANDARA & RUTE KOTA
          ========================================================= */}
      <section id="transport" className="py-20 max-w-[1240px] mx-auto px-4 sm:px-6 border-t border-[var(--glass-border)]">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fadeIn">
          <span className="text-xs font-black uppercase tracking-widest text-[#00A896] font-heading block mb-2">
            {tLocal('section1Tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-main)] font-heading mb-3">
            {tLocal('section1Title')} <span className="text-[#F4C038]">{tLocal('section1TitleSpan')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body">
            {tLocal('section1Desc')}
          </p>
        </div>

        {/* 4-Step Connected Interactive Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {(tLocal('steps') || []).map((step, idx) => {
            const icons = ["🛬", "🚌", "🏙️", "🛶"];
            const colors = ["bg-[#F4C038]", "bg-emerald-400", "bg-cyan-400", "bg-purple-400"];
            const hoverColors = ["hover:border-[#F4C038]", "hover:border-[#00A896]", "hover:border-[#F4C038]", "hover:border-[#00A896]"];
            const textColors = ["text-[#F4C038]", "text-emerald-400", "text-cyan-400", "text-purple-400"];
            const bgBadgeColors = ["bg-[#F4C038]/20", "bg-emerald-500/20", "bg-cyan-500/20", "bg-purple-500/20"];
            const mapUrls = [
              "https://maps.google.com/?q=Bandara+Syamsudin+Noor",
              "https://maps.google.com/?q=Terminal+Gambut+Barakat+Km+17",
              "https://maps.google.com/?q=Menara+Pandang+Banjarmasin",
              "https://maps.google.com/?q=Dermaga+Kelotok+Siring+Banjarmasin"
            ];
            return (
              <div key={idx} className={`bg-[var(--card-bg)] border border-[var(--glass-border)] p-6 rounded-3xl relative overflow-hidden group ${hoverColors[idx]} transition-all shadow-lg flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{icons[idx]}</span>
                    <span className={`w-8 h-8 rounded-full ${colors[idx]} text-[#091422] font-black font-heading text-sm flex items-center justify-center shadow`}>{step.num}</span>
                  </div>
                  <span className={`text-[10px] font-black ${bgBadgeColors[idx]} ${textColors[idx]} px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block`}>
                    {step.tag}
                  </span>
                  <h3 className="text-lg font-black text-[var(--text-main)] font-heading mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                    {step.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--glass-border)] flex items-center justify-between text-[11px] font-bold">
                  <span className="text-[#00A896]">{step.price}</span>
                  <a href={mapUrls[idx]} target="_blank" rel="noopener noreferrer" className="bg-[#F4C038]/15 hover:bg-[#F4C038] text-[#F4C038] hover:text-[#091422] px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 border border-[#F4C038]/30">
                    <span>🗺️</span> Maps ➔
                  </a>
                </div>
              </div>
            );
          })}

        </div>
      </section>

      {/* =========================================================
          SECTION 2 (#peta-rute): RADAR AKSESIBILITAS & PETA TERPADU
          ========================================================= */}
      <section id="peta-rute" className="py-20 max-w-[1240px] mx-auto px-4 sm:px-6 border-t border-[var(--glass-border)]">
        <Suspense fallback={<div className="h-[500px] w-full rounded-3xl bg-[var(--card-bg)] border border-[var(--glass-border)] animate-pulse flex items-center justify-center text-[var(--text-muted)] font-bold">Memuat Peta Rute & Aksesibilitas...</div>}>
          <RouteAccessibilityMap />
        </Suspense>
      </section>

      {/* =========================================================
          SECTION 2 (#staycation): KURASI PENGINAPAN SPESIFIK
          ========================================================= */}
      <section id="staycation" className="py-20 max-w-[1240px] mx-auto px-4 sm:px-6 border-t border-[var(--glass-border)]">
        <div className="text-center max-w-3xl mx-auto mb-12 animate-fadeIn">
          <span className="text-xs font-black uppercase tracking-widest text-[#F4C038] font-heading block mb-2">
            {tLocal('section2Tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-main)] font-heading mb-3">
            {tLocal('section2Title')} <span className="text-[#00A896]">{tLocal('section2TitleSpan')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body">
            {tLocal('section2Desc')}
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
              <span>{cat === "Riverfront" ? tLocal('hotelTab1') : cat === "Siring" ? tLocal('hotelTab2') : tLocal('hotelTab3')}</span>
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
                  <img loading="lazy"
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
                  <span>🗺️</span> {tLocal('hotelBtn')}
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
            {tLocal('section3Tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-main)] font-heading mb-3">
            {tLocal('section3Title')} <span className="text-[#F4C038]">{tLocal('section3TitleSpan')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body">
            {tLocal('section3Desc')}
          </p>
        </div>

        {/* Full-width 2-Column Side-by-Side Do's vs Don'ts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* DO'S Card */}
          <div className="bg-emerald-500/10 border-2 border-emerald-500/40 p-8 rounded-3xl space-y-5 shadow-xl transition-all hover:border-emerald-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-emerald-400 font-black font-heading text-lg sm:text-xl pb-4 border-b border-emerald-500/20">
                <span className="w-10 h-10 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-xl">✅</span>
                <span>{tLocal('dosTitle')}</span>
              </div>
              <ul className="space-y-4 text-sm sm:text-base text-[var(--text-main)] font-body leading-relaxed pt-2">
                {(tLocal('dosList') || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-emerald-400 font-extrabold text-lg">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-500/20 text-xs font-bold text-emerald-400 font-mono">
              {tLocal('dosFooter')}
            </div>
          </div>

          {/* DON'TS Card */}
          <div className="bg-rose-500/10 border-2 border-rose-500/40 p-8 rounded-3xl space-y-5 shadow-xl transition-all hover:border-rose-500 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 text-rose-400 font-black font-heading text-lg sm:text-xl pb-4 border-b border-rose-500/20">
                <span className="w-10 h-10 rounded-2xl bg-rose-500/20 flex items-center justify-center text-xl">❌</span>
                <span>{tLocal('dontsTitle')}</span>
              </div>
              <ul className="space-y-4 text-sm sm:text-base text-[var(--text-main)] font-body leading-relaxed pt-2">
                {(tLocal('dontsList') || []).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-rose-400 font-extrabold text-lg">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-rose-500/20 text-xs font-bold text-rose-400 font-mono">
              {tLocal('dontsFooter')}
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
              {tLocal('section4Tag')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white font-heading mb-3">
              {tLocal('section4Title')} <span className="text-[#F4C038]">{tLocal('section4TitleSpan')}</span>
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 font-body">
              {tLocal('section4Desc')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            
            {/* 112 Banjarmasin Pintar */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center hover:border-[#F4C038] transition-all flex flex-col justify-between">
              <div>
                <span className="text-4xl block mb-3">📞</span>
                <h3 className="text-3xl font-black text-white font-heading mb-1">{tLocal('hotline1Title')}</h3>
                <p className="text-xs font-bold text-[#F4C038] uppercase tracking-wider mb-3">{tLocal('hotline1Sub')}</p>
                <p className="text-[11px] text-gray-300 leading-relaxed mb-6">
                  {tLocal('hotline1Desc')}
                </p>
              </div>
              <button
                onClick={() => handleCopy("112")}
                className="w-full py-3.5 rounded-xl bg-[#F4C038] hover:bg-white text-[#091422] font-black text-xs transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {copiedNumber === "112" ? `✅ ${tLocal('copied')}` : `📋 ${tLocal('hotline1Btn')}`}
              </button>
            </div>

            {/* Polisi Air / Polairud */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center hover:border-[#00A896] transition-all flex flex-col justify-between">
              <div>
                <span className="text-4xl block mb-3">🚤</span>
                <h3 className="text-3xl font-black text-white font-heading mb-1">{tLocal('hotline2Title')}</h3>
                <p className="text-xs font-bold text-[#00A896] uppercase tracking-wider mb-3">{tLocal('hotline2Sub')}</p>
                <p className="text-[11px] text-gray-300 leading-relaxed mb-6">
                  {tLocal('hotline2Desc')}
                </p>
              </div>
              <button
                onClick={() => handleCopy("110")}
                className="w-full py-3.5 rounded-xl bg-[#00A896] hover:bg-[#008075] text-white font-black text-xs transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {copiedNumber === "110" ? `✅ ${tLocal('copied')}` : `📋 ${tLocal('hotline2Btn')}`}
              </button>
            </div>

            {/* RSUD Ulin */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 text-center hover:border-[#E63946] transition-all flex flex-col justify-between">
              <div>
                <span className="text-4xl block mb-3">🏥</span>
                <h3 className="text-2xl font-black text-white font-heading mb-1">{tLocal('hotline3Title')}</h3>
                <p className="text-xs font-bold text-[#E63946] uppercase tracking-wider mb-3">{tLocal('hotline3Sub')}</p>
                <p className="text-[11px] text-gray-300 leading-relaxed mb-6">
                  {tLocal('hotline3Desc')}
                </p>
              </div>
              <button
                onClick={() => handleCopy("05113252180")}
                className="w-full py-3.5 rounded-xl bg-[#E63946] hover:bg-red-700 text-white font-black text-xs transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {copiedNumber === "05113252180" ? `✅ ${tLocal('copied')}` : `📋 ${tLocal('hotline3Btn')}`}
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
            {tLocal('section5Tag')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-main)] font-heading mb-3">
            {tLocal('section5Title')} <span className="text-[#F4C038]">{tLocal('section5TitleSpan')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body">
            {tLocal('section5Desc')}
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
