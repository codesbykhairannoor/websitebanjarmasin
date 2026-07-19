"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../context/LanguageContext';

// Global Audio Singleton agar musik TIDAK MATI saat ganti bahasa / navigasi antar halaman
// Global Audio Singleton agar musik TIDAK MATI saat ganti bahasa / navigasi antar halaman
if (typeof window !== 'undefined') {
  window.__globalAudio = window.__globalAudio || {
    instance: null,
    isPlaying: false,
    activeTrackId: 'ampar',
    listeners: new Set()
  };
}

function getGlobalAudio() {
  if (typeof window === 'undefined') {
    return { instance: null, isPlaying: false, activeTrackId: 'ampar', listeners: new Set() };
  }
  window.__globalAudio = window.__globalAudio || {
    instance: null,
    isPlaying: false,
    activeTrackId: 'ampar',
    listeners: new Set()
  };
  return window.__globalAudio;
}

function notifyAudioListeners() {
  const ga = getGlobalAudio();
  ga.listeners.forEach(fn => fn({ isPlaying: ga.isPlaying, activeTrackId: ga.activeTrackId }));
}

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(() => getGlobalAudio().isPlaying);
  const [theme, setTheme] = useState(() => typeof window !== 'undefined' ? (localStorage.getItem('theme') || 'dark') : 'dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openTentangDropdown, setOpenTentangDropdown] = useState(false);
  const [openInfoDropdown, setOpenInfoDropdown] = useState(false);
  const [openLangDropdown, setOpenLangDropdown] = useState(false);
  const [openAudioDropdown, setOpenAudioDropdown] = useState(false);
  const [activeTrackId, setActiveTrackId] = useState(() => getGlobalAudio().activeTrackId);
  
  const pathname = usePathname();
  const location = { pathname };
  const dropdownRef = useRef(null);
  const infoDropdownRef = useRef(null);
  const langDropdownRef = useRef(null);
  const audioDropdownRef = useRef(null);

  const audioTracks = [
    { id: 'ampar', label: t('navbar.trackAmpar'), file: '/audio/ampar_ampar_pisang.mp3' },
    { id: 'paris', label: t('navbar.trackParis'), file: '/audio/paris_barantai.mp3' },
    { id: 'ampat', label: t('navbar.trackAmpat'), file: '/audio/ampat_si_ampat_lima.mp3' },
    { id: 'rindu', label: t('navbar.trackRindu'), file: '/audio/rindu_rindu.mp3' }
  ];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Sync state audio global saat mount/update
  useEffect(() => {
    const listener = (state) => {
      setIsPlaying(state.isPlaying);
      setActiveTrackId(state.activeTrackId);
    };
    window.__globalAudio.listeners.add(listener);
    setIsPlaying(window.__globalAudio.isPlaying);
    setActiveTrackId(window.__globalAudio.activeTrackId);
    return () => {
      window.__globalAudio.listeners.delete(listener);
    };
  }, []);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenTentangDropdown(false);
      }
      if (infoDropdownRef.current && !infoDropdownRef.current.contains(event.target)) {
        setOpenInfoDropdown(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target)) {
        setOpenLangDropdown(false);
      }
      if (audioDropdownRef.current && !audioDropdownRef.current.contains(event.target)) {
        setOpenAudioDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🛡️ PERFORMANCE & ANIMATION: Global Scroll Reveal Animation Observer (GPU Accelerated)
  useEffect(() => {
    const timer = setTimeout(() => {
      const targets = document.querySelectorAll(".wisata-reveal, .wisata-reveal-left, .wisata-reveal-right");
      if (!targets.length) return;
      
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -50px 0px" } // Lebih cepat terpicu di HP
      );
      
      targets.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 150);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Putar atau Hentikan Audio Instrumen Banjar (Secara Global)
  const playSelectedTrack = (trackId) => {
    if (window.__globalAudio.instance) {
      window.__globalAudio.instance.pause();
    }
    const trackObj = audioTracks.find(t => t.id === trackId);
    if (!trackObj) return;
    
    const audio = new Audio(trackObj.file);
    audio.loop = true;
    audio.volume = 0.45;
    audio.play().then(() => {
      window.__globalAudio.isPlaying = true;
      window.__globalAudio.activeTrackId = trackId;
      notifyAudioListeners();
    }).catch(err => {
      console.log("Audio play error:", err);
    });
    window.__globalAudio.instance = audio;
    window.__globalAudio.isPlaying = true;
    window.__globalAudio.activeTrackId = trackId;
    notifyAudioListeners();
  };

  const toggleSound = () => {
    if (window.__globalAudio.isPlaying) {
      if (window.__globalAudio.instance) {
        window.__globalAudio.instance.pause();
        window.__globalAudio.instance = null;
      }
      window.__globalAudio.isPlaying = false;
      notifyAudioListeners();
    } else {
      playSelectedTrack(window.__globalAudio.activeTrackId);
    }
  };

  const currentPath = location.pathname;
  const isTentangActive = ['/profil', '/sejarah', '/smart-city'].some(p => currentPath.includes(p));
  const isInfoActive = ['/panduan', '/blog'].some(p => currentPath.includes(p));

  return (
    <div className="fixed top-0 left-0 w-full z-[100] bg-[var(--nav-bg)] backdrop-blur-md shadow-lg border-b border-[var(--glass-border)] transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-2 sm:py-3">
        <header className="flex items-center justify-between w-full">
          
          {/* Logo - Klik ke Home */}
          <Link href={`/${language}`} className="font-heading text-xl sm:text-2xl font-black text-[var(--text-main)] tracking-tight hover:opacity-90 transition-opacity flex items-center gap-2 sm:gap-2.5">
            <img src="/logo-banjarmasin.webp" alt="Logo Banjarmasin" className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-md bg-transparent" style={{ backgroundColor: "transparent" }} />
            <span>Banjarmasin<span className="text-[#F4C038]">.</span></span>
          </Link>

          {/* Desktop Navigation - Tepat 5 Pilihan */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
            {/* Pilihan 1: Dropdown Tentang Kota */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenTentangDropdown(!openTentangDropdown)}
                onMouseEnter={() => setOpenTentangDropdown(true)}
                className={`text-sm font-heading flex items-center gap-1 transition-colors whitespace-nowrap ${isTentangActive ? 'text-[#F4C038] font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] font-semibold'}`}
              >
                <span>{t('navbar.aboutCity')}</span>
                <span className={`text-[10px] transition-transform duration-200 ${openTentangDropdown ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {openTentangDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    onMouseLeave={() => setOpenDropdown(false)}
                    className="absolute top-full left-0 mt-3 w-56 p-2 rounded-2xl bg-[var(--card-bg)] border border-[var(--glass-border)] shadow-2xl backdrop-blur-xl flex flex-col gap-1 z-50"
                  >
                    <Link
                      href={`/${language}/profil`}
                      onClick={() => setOpenTentangDropdown(false)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-heading flex items-center gap-2.5 transition-all ${currentPath.includes('/profil') ? 'bg-[#F4C038]/20 text-[#F4C038] font-black' : 'text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                    >
                      <span className="text-base">🏛️</span> {t('navbar.profile')}
                    </Link>
                    <Link
                      href={`/${language}/sejarah`}
                      onClick={() => setOpenTentangDropdown(false)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-heading flex items-center gap-2.5 transition-all ${currentPath.includes('/sejarah') ? 'bg-[#F4C038]/20 text-[#F4C038] font-black' : 'text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                    >
                      <span className="text-base">📜</span> {t('navbar.history')}
                    </Link>
                    <Link
                      href={`/${language}/smart-city`}
                      onClick={() => setOpenTentangDropdown(false)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-heading flex items-center gap-2.5 transition-all ${currentPath.includes('/smart-city') ? 'bg-[#F4C038]/20 text-[#F4C038] font-black' : 'text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                    >
                      <span className="text-base">⚡</span> {t('navbar.innovation')}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href={`/${language}/wisata`}
              className={`text-sm font-heading transition-colors whitespace-nowrap ${currentPath.includes('/wisata') ? 'text-[#F4C038] font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] font-semibold'}`}
            >
              {t('navbar.tourism')}
            </Link>

            <Link
              href={`/${language}/kuliner`}
              className={`text-sm font-heading transition-colors whitespace-nowrap ${currentPath.includes('/kuliner') ? 'text-[#F4C038] font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] font-semibold'}`}
            >
              {t('navbar.culinary')}
            </Link>

            <Link
              href={`/${language}/budaya`}
              className={`text-sm font-heading transition-colors whitespace-nowrap ${currentPath.includes('/budaya') ? 'text-[#F4C038] font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] font-semibold'}`}
            >
              {t('navbar.culture')}
            </Link>

            <Link
              href={`/${language}/culture-verse`}
              className={`text-sm font-heading flex items-center gap-1.5 transition-colors whitespace-nowrap ${currentPath.includes('/culture-verse') ? 'text-[#33C3B3] font-black' : 'text-[#33C3B3]/80 hover:text-[#33C3B3] font-bold'}`}
            >
              Virtual Tour 3D
              <span className="bg-[#33C3B3] text-white text-[8px] font-black px-1.5 py-0.5 rounded-full animate-pulse shadow-sm shadow-[#33C3B3]/50">NEW</span>
            </Link>

            <div className="relative" ref={infoDropdownRef}>
              <button
                onClick={() => setOpenInfoDropdown(!openInfoDropdown)}
                onMouseEnter={() => setOpenInfoDropdown(true)}
                className={`text-sm font-heading flex items-center gap-1 transition-colors whitespace-nowrap ${isInfoActive ? 'text-[#F4C038] font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] font-semibold'}`}
              >
                <span>{t('navbar.infoDropdown') || 'Info & Panduan'}</span>
                <span className={`text-[10px] transition-transform duration-200 ${openInfoDropdown ? 'rotate-180' : ''}`}>▼</span>
              </button>

              <AnimatePresence>
                {openInfoDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    onMouseLeave={() => setOpenInfoDropdown(false)}
                    className="absolute top-full right-0 mt-3 w-52 p-2 rounded-2xl bg-[var(--card-bg)] border border-[var(--glass-border)] shadow-2xl backdrop-blur-xl flex flex-col gap-1 z-50"
                  >
                    <Link
                      href={`/${language}/panduan`}
                      onClick={() => setOpenInfoDropdown(false)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-heading flex items-center gap-2.5 transition-all ${currentPath.includes('/panduan') ? 'bg-[#F4C038]/20 text-[#F4C038] font-black' : 'text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                    >
                      <span className="text-base">🗺️</span> {t('navbar.guide')}
                    </Link>
                    <Link
                      href={`/${language}/blog`}
                      onClick={() => setOpenInfoDropdown(false)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-heading flex items-center gap-2.5 transition-all ${currentPath.includes('/blog') ? 'bg-[#F4C038]/20 text-[#F4C038] font-black' : 'text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                    >
                      <span className="text-base">📰</span> {t('navbar.blog') || 'Blog & Artikel'}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Language Selector - Animated Expandable Pill (Hidden on mobile top bar) */}
            <motion.div 
              className="relative hidden sm:flex items-center bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-full h-9 sm:h-10 px-1 shadow-sm overflow-hidden"
              initial={false}
              animate={{ width: openLangDropdown ? '180px' : '40px' }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onHoverStart={() => setOpenLangDropdown(true)}
              onHoverEnd={() => setOpenLangDropdown(false)}
            >
              <AnimatePresence mode="wait">
                {!openLangDropdown ? (
                  <motion.button
                    key="collapsed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full flex items-center justify-center text-lg"
                  >
                    {language === 'id' ? '🇮🇩' : language === 'en' ? '🇬🇧' : language === 'ms' ? '🇲🇾' : '🇨🇳'}
                  </motion.button>
                ) : (
                  <motion.div
                    key="expanded"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1 w-full h-full justify-center px-1"
                  >
                    {[
                      { code: 'id', emoji: '🇮🇩' },
                      { code: 'en', emoji: '🇬🇧' },
                      { code: 'ms', emoji: '🇲🇾' },
                      { code: 'zh', emoji: '🇨🇳' }
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all ${
                          language === lang.code ? 'bg-[#33C3B3]/20 shadow-inner scale-110' : 'hover:bg-[var(--glass-border)] opacity-60 hover:opacity-100 hover:scale-110'
                        }`}
                        title={lang.code.toUpperCase()}
                      >
                        {lang.emoji}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Theme Toggle Icon Only (Hidden on mobile top bar, available in mobile menu) */}
            <button
              onClick={toggleTheme}
              title={t('navbar.tooltipTheme')}
              className="hidden sm:flex w-9 h-9 sm:w-10 sm:h-10 rounded-full items-center justify-center bg-[var(--card-bg)] border border-[var(--glass-border)] hover:border-[#F4C038] text-base sm:text-lg transition-all shadow-sm hover:scale-105 shrink-0"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Soundscape Dropdown & Player (Hidden on mobile top bar, available in mobile menu) */}
            <div className="relative hidden sm:block" ref={audioDropdownRef}>
              <div className="flex items-center">
                <button
                  onClick={toggleSound}
                  title={t('navbar.tooltipAudio')}
                  className={`min-h-[48px] px-4 rounded-l-full flex items-center gap-2 transition-all border shadow-sm hover:scale-105 shrink-0 ${
                    isPlaying
                      ? 'bg-[#00A896]/20 border-[#00A896] text-[#00A896] shadow-[0_0_15px_rgba(0,168,150,0.3)]'
                      : 'bg-[var(--card-bg)] border-[var(--glass-border)] hover:border-[#00A896] text-[var(--text-muted)]'
                  }`}
                >
                  <span className="text-base sm:text-lg leading-none">{isPlaying ? '🔊' : '🔇'}</span>
                  {isPlaying && (
                    <span className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 h-2 bg-[#00A896] animate-pulse rounded-full" />
                      <span className="w-0.5 h-3 bg-[#00A896] animate-pulse rounded-full delay-75" />
                      <span className="w-0.5 h-1.5 bg-[#00A896] animate-pulse rounded-full delay-150" />
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setOpenAudioDropdown(!openAudioDropdown)}
                  title={t('navbar.tooltipAudioMenu')}
                  className={`min-h-[48px] px-3 rounded-r-full border-y border-r transition-all flex items-center justify-center ${
                    isPlaying
                      ? 'bg-[#00A896]/20 border-[#00A896] text-[#00A896]'
                      : 'bg-[var(--card-bg)] border-[var(--glass-border)] hover:border-[#00A896] text-[var(--text-muted)]'
                  }`}
                >
                  <span className={`text-[9px] transition-transform duration-200 ${openAudioDropdown ? 'rotate-180' : ''}`}>▼</span>
                </button>
              </div>

              <AnimatePresence>
                {openAudioDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-64 p-3 rounded-2xl bg-[var(--card-bg)] border border-[var(--glass-border)] shadow-2xl backdrop-blur-xl flex flex-col gap-2 z-50 text-left"
                  >
                    <div className="text-[10px] font-extrabold tracking-widest uppercase text-[#F4C038] px-1 border-b border-[var(--glass-border)] pb-1.5 flex justify-between items-center">
                      <span>{t('navbar.audioMenuTitle')}</span>
                      {isPlaying && <span className="text-[#00A896]">Playing</span>}
                    </div>
                    {audioTracks.map((track) => (
                      <button
                        key={track.id}
                        onClick={() => {
                          playSelectedTrack(track.id);
                          setOpenAudioDropdown(false);
                        }}
                        className={`p-2.5 rounded-xl text-left transition-all flex items-center justify-between w-full font-heading text-xs font-bold ${activeTrackId === track.id && isPlaying ? 'bg-[#00A896]/15 border border-[#00A896]/40 text-[#00A896]' : 'hover:bg-[var(--glass-border)] text-[var(--text-main)]'}`}
                      >
                        <span>{track.label}</span>
                        {activeTrackId === track.id && isPlaying && <span>✓</span>}
                      </button>
                    ))}
                    {isPlaying && (
                      <button
                        onClick={() => {
                          toggleSound();
                          setOpenAudioDropdown(false);
                        }}
                        className="mt-1 py-1.5 px-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-center text-xs font-bold transition-all w-full border border-red-500/20"
                      >
                        {t('navbar.stopAudio')}
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <Link
              href={`/${language}/panduan`}
              className="hidden sm:flex items-center gap-1 px-3 sm:px-4 py-2 rounded-full bg-[#F4C038] hover:bg-amber-400 text-[#091422] font-heading font-black text-xs transition-all shadow-[0_4px_15px_rgba(244,192,56,0.3)] hover:scale-105 shrink-0 max-w-[120px] sm:max-w-[150px] overflow-hidden"
            >
              <span className="truncate">{t('navbar.exploreCTA')}</span>
            </Link>

            {/* Hamburger Button for Mobile */}
            <button
              className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center bg-[var(--card-bg)] border border-[var(--glass-border)] text-lg text-[var(--text-main)]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu Navigation"
            >
              {isMobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

        </header>

        {/* Mobile Glassmorphism Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden mt-3 pt-3 border-t border-[var(--glass-border)] flex flex-col gap-2"
            >
              {/* Mobile Ultra-Compact Preferences Bar (Language, Theme, Audio) */}
              <div className="p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--glass-border)] flex flex-col gap-2 mb-1 shadow-sm">
                {/* Row 1: Language & Theme */}
                <div className="flex items-center justify-between gap-1.5">
                  <div className="flex items-center gap-1 bg-[var(--glass-border)] p-1 rounded-lg">
                    {[
                      { code: 'id', label: '🇮🇩 ID' },
                      { code: 'en', label: '🇬🇧 EN' },
                      { code: 'ms', label: '🇲🇾 MS' },
                      { code: 'zh', label: '🇨🇳 ZH' }
                    ].map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`px-2 py-1 rounded text-[11px] font-bold transition-all ${
                          language === lang.code
                            ? 'bg-[#00A896] text-white shadow-sm'
                            : 'text-[var(--text-main)] hover:bg-white/10'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="h-7 px-2.5 rounded-lg bg-[var(--glass-border)] text-[var(--text-main)] text-[11px] font-bold flex items-center gap-1 shrink-0"
                  >
                    {theme === 'dark' ? t('navbar.themeLight') : t('navbar.themeDark')}
                  </button>
                </div>

                {/* Row 2: Compact Audio Selector */}
                <div className="flex items-center gap-1.5 pt-1.5 border-t border-[var(--glass-border)]">
                  <button
                    onClick={toggleSound}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm shrink-0 transition-all ${isPlaying ? 'bg-[#00A896] text-white shadow-sm' : 'bg-[var(--glass-border)] text-[var(--text-muted)]'}`}
                  >
                    {isPlaying ? '🔊' : '🔇'}
                  </button>

                  <select
                    value={activeTrackId}
                    onChange={(e) => playSelectedTrack(e.target.value)}
                    className="h-7 px-2 rounded-lg bg-[var(--glass-border)] text-[var(--text-main)] text-[11px] font-bold font-heading outline-none border border-transparent focus:border-[#00A896] w-full cursor-pointer"
                  >
                    {audioTracks.map((track) => (
                      <option key={track.id} value={track.id} className="bg-[#091422] text-white">
                        {track.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pl-4 py-1 text-[10px] font-black uppercase tracking-widest text-[#00A896]">{t('navbar.aboutCity')}</div>
              <div className="grid grid-cols-3 gap-2 px-2 mb-1">
                <Link href={`/${language}/profil`} onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--glass-border)] text-center text-xs font-bold text-[var(--text-main)]">🏛️ {t('navbar.profile').split(' ')[0]}</Link>
                <Link href={`/${language}/sejarah`} onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--glass-border)] text-center text-xs font-bold text-[var(--text-main)]">📜 {t('navbar.history').split(' ')[0]}</Link>
                <Link href={`/${language}/smart-city`} onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--glass-border)] text-center text-xs font-bold text-[var(--text-main)]">⚡ {t('navbar.innovation').split(' ')[0]}</Link>
              </div>

              <Link href={`/${language}/wisata`} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl bg-[var(--card-bg)] font-heading font-bold text-sm text-[var(--text-main)]">🏖️ {t('navbar.tourism')}</Link>
              <Link href={`/${language}/kuliner`} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl bg-[var(--card-bg)] font-heading font-bold text-sm text-[var(--text-main)]">🍲 {t('navbar.culinary')}</Link>
              <Link href={`/${language}/budaya`} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl bg-[var(--card-bg)] font-heading font-bold text-sm text-[var(--text-main)]">🎭 {t('navbar.culture')}</Link>
              
              <Link href={`/${language}/culture-verse`} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl bg-[#33C3B3]/10 border border-[#33C3B3]/30 font-heading font-bold text-sm text-[#33C3B3] flex items-center justify-between">
                <span>🚀 Virtual Tour 3D</span>
                <span className="bg-[#33C3B3] text-white text-[9px] font-black px-2 py-0.5 rounded-full animate-pulse">NEW</span>
              </Link>
              <Link href={`/${language}/panduan`} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl bg-[var(--card-bg)] font-heading font-bold text-sm text-[var(--text-main)]">🗺️ {t('navbar.guide')}</Link>
              <Link href={`/${language}/blog`} onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl bg-[var(--card-bg)] font-heading font-bold text-sm text-[var(--text-main)]">📰 {t('navbar.blog') || 'Blog & Artikel'}</Link>
              <Link href={`/${language}/panduan`} onClick={() => setIsMobileMenuOpen(false)} className="mt-2 px-4 py-3 rounded-xl bg-[#F4C038] text-[#091422] font-heading font-black text-center text-sm shadow">{t('navbar.exploreCTA_mobile')}</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
