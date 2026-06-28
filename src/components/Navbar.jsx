import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  
  const location = useLocation();
  const dropdownRef = useRef(null);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(false);
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

  // Web Audio API Synthesizer untuk Suara Air Sungai Alami
  const toggleSound = () => {
    if (!isPlaying) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        // Buat Pink/Brown Noise Buffer untuk suara gemercik air sungai
        const bufferSize = ctx.sampleRate * 3;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.15; // Volume lembut
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Filter Lowpass agar bersuara lembut seperti aliran sungai
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 450;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.35;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start(0);
        setIsPlaying(true);
      } catch (e) {
        console.error("Web Audio API error:", e);
        setIsPlaying(!isPlaying);
      }
    } else {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setIsPlaying(false);
    }
  };

  const currentPath = location.pathname;
  const isTentangActive = ['/profil', '/sejarah', '/smart-city'].includes(currentPath);

  return (
    <div className="fixed top-0 left-0 w-full z-[100] bg-[var(--nav-bg)] backdrop-blur-md shadow-lg border-b border-[var(--glass-border)] transition-colors duration-300">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-2 sm:py-3">
        <header className="flex items-center justify-between w-full">
          
          {/* Logo - Klik ke Home */}
          <Link to="/" className="font-heading text-xl sm:text-2xl font-black text-[var(--text-main)] tracking-tight hover:opacity-90 transition-opacity">
            Banjarmasin<span className="text-[#F4C038]">.</span>
          </Link>

          {/* Desktop Navigation - Tepat 5 Pilihan */}
          <nav className="hidden lg:flex items-center gap-7">
            {/* Pilihan 1: Dropdown Tentang Kota */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                onMouseEnter={() => setOpenDropdown(true)}
                className={`text-sm font-heading flex items-center gap-1 transition-colors ${isTentangActive ? 'text-[#F4C038] font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] font-semibold'}`}
              >
                <span>Tentang Kota</span>
                <span className={`text-[10px] transition-transform duration-200 ${openDropdown ? 'rotate-180' : ''}`}>▼</span>
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {openDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    onMouseLeave={() => setOpenDropdown(false)}
                    className="absolute top-full left-0 mt-3 w-56 p-2 rounded-2xl bg-[var(--card-bg)] border border-[var(--glass-border)] shadow-2xl backdrop-blur-xl flex flex-col gap-1 z-50"
                  >
                    <Link
                      to="/profil"
                      onClick={() => setOpenDropdown(false)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-heading flex items-center gap-2.5 transition-all ${currentPath === '/profil' ? 'bg-[#F4C038]/20 text-[#F4C038] font-black' : 'text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                    >
                      <span className="text-base">🏛️</span> Profil Kota
                    </Link>
                    <Link
                      to="/sejarah"
                      onClick={() => setOpenDropdown(false)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-heading flex items-center gap-2.5 transition-all ${currentPath === '/sejarah' ? 'bg-[#F4C038]/20 text-[#F4C038] font-black' : 'text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                    >
                      <span className="text-base">📜</span> Sejarah 1526
                    </Link>
                    <Link
                      to="/smart-city"
                      onClick={() => setOpenDropdown(false)}
                      className={`px-3.5 py-2.5 rounded-xl text-xs font-heading flex items-center gap-2.5 transition-all ${currentPath === '/smart-city' ? 'bg-[#F4C038]/20 text-[#F4C038] font-black' : 'text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                    >
                      <span className="text-base">⚡</span> Inovasi Smart City
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              to="/wisata"
              className={`text-sm font-heading transition-colors ${currentPath === '/wisata' ? 'text-[#F4C038] font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] font-semibold'}`}
            >
              Wisata
            </Link>

            <Link
              to="/kuliner"
              className={`text-sm font-heading transition-colors ${currentPath === '/kuliner' ? 'text-[#F4C038] font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] font-semibold'}`}
            >
              Kuliner
            </Link>

            <Link
              to="/budaya"
              className={`text-sm font-heading transition-colors ${currentPath === '/budaya' ? 'text-[#F4C038] font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] font-semibold'}`}
            >
              Budaya &amp; Seni
            </Link>

            <Link
              to="/panduan"
              className={`text-sm font-heading transition-colors ${currentPath === '/panduan' ? 'text-[#F4C038] font-black' : 'text-[var(--text-muted)] hover:text-[var(--text-main)] font-semibold'}`}
            >
              Panduan &amp; Rute
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Theme Toggle Icon Only */}
            <button
              onClick={toggleTheme}
              title="Ubah Tema Gelap / Terang"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-[var(--card-bg)] border border-[var(--glass-border)] hover:border-[#F4C038] text-base sm:text-lg transition-all shadow-sm hover:scale-105 shrink-0"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* Soundscape Icon Only with Equalizer */}
            <button
              onClick={toggleSound}
              title="Simulasi Suara Air Sungai Alami"
              className={`h-9 sm:h-10 px-3 sm:px-3.5 rounded-full flex items-center gap-1.5 transition-all border shadow-sm hover:scale-105 shrink-0 ${
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

            {/* CTA Button */}
            <Link
              to="/panduan"
              className="hidden sm:flex items-center gap-1 px-4 py-2 rounded-full bg-[#F4C038] hover:bg-amber-400 text-[#091422] font-heading font-black text-xs transition-all shadow-[0_4px_15px_rgba(244,192,56,0.3)] hover:scale-105 shrink-0"
            >
              <span>Jelajah Kota</span>
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
              <div className="pl-4 py-1 text-[10px] font-black uppercase tracking-widest text-[#00A896]">Tentang Kota</div>
              <div className="grid grid-cols-3 gap-2 px-2 mb-1">
                <Link to="/profil" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--glass-border)] text-center text-xs font-bold text-[var(--text-main)]">🏛️ Profil</Link>
                <Link to="/sejarah" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--glass-border)] text-center text-xs font-bold text-[var(--text-main)]">📜 Sejarah</Link>
                <Link to="/smart-city" onClick={() => setIsMobileMenuOpen(false)} className="p-2.5 rounded-xl bg-[var(--card-bg)] border border-[var(--glass-border)] text-center text-xs font-bold text-[var(--text-main)]">⚡ Inovasi</Link>
              </div>

              <Link to="/wisata" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl bg-[var(--card-bg)] font-heading font-bold text-sm text-[var(--text-main)]">🏖️ Destinasi Wisata</Link>
              <Link to="/kuliner" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl bg-[var(--card-bg)] font-heading font-bold text-sm text-[var(--text-main)]">🍲 Kuliner Banjar</Link>
              <Link to="/budaya" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl bg-[var(--card-bg)] font-heading font-bold text-sm text-[var(--text-main)]">🎭 Budaya &amp; Seni</Link>
              <Link to="/panduan" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2.5 rounded-xl bg-[var(--card-bg)] font-heading font-bold text-sm text-[var(--text-main)]">🗺️ Panduan &amp; Rute</Link>
              <Link to="/panduan" onClick={() => setIsMobileMenuOpen(false)} className="mt-2 px-4 py-3 rounded-xl bg-[#F4C038] text-[#091422] font-heading font-black text-center text-sm shadow">Jelajah Kota Sekarang ➔</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
