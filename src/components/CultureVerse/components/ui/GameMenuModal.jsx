import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useLanguage } from '../../../../context/LanguageContext';
import { X, Gamepad2, Puzzle, Type } from 'lucide-react';
import { translations } from '../../../../translations';

export default function GameMenuModal() {
  const { isGameMenuOpen, setGameMenuOpen, setMemoryGameOpen, setPuzzleGameOpen, setWordleGameOpen } = useAppStore();
  const { language } = useLanguage();
  
  // Safe fallback if translations are not yet injected properly
  const t = translations[language]?.gameMenuTitle 
    ? translations[language] 
    : translations['id'];

  const handleClose = () => {
    setGameMenuOpen(false);
    if (!document.pointerLockElement && document.body.requestPointerLock) {
      document.body.requestPointerLock();
    }
  };

  if (!isGameMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-3xl lg:max-w-4xl bg-gradient-to-br from-[#0a1929] to-[#0d2137] rounded-t-2xl sm:rounded-3xl border border-[var(--glass-border)] shadow-[0_0_50px_rgba(244,192,56,0.15)] p-3 sm:p-5 md:p-8 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 sm:zoom-in duration-300"
        style={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <div className="w-full flex items-center justify-between pb-4 border-b border-white/10 font-game font-bold mb-6">
          <button
            onClick={handleClose}
            className="flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-white/5 hover:bg-white/20 text-slate-300 hover:text-white transition-all text-xs md:text-sm border border-white/10 group cursor-pointer tracking-wide"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>{language === 'en' ? 'Back to Museum' : 'Kembali ke Museum'}</span>
          </button>
          <span className="text-[10px] md:text-xs px-3 py-1 rounded-full bg-white/10 text-slate-300 tracking-wide font-medium">
            3D Arcade
          </span>
        </div>

        <div className="text-center mb-4 sm:mb-6 md:mb-8 mt-1 sm:mt-2">
          <Gamepad2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-14 md:h-14 text-[#F4C038] mx-auto mb-2 drop-shadow-[0_0_12px_rgba(244,192,56,0.5)]" />
          <h2 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#F4C038] to-[#ffaa00] font-heading mb-1 sm:mb-2">
            {t.gameMenuTitle || "Pilih Mini-Game"}
          </h2>
          <p className="text-[var(--text-muted)] font-body text-[11px] sm:text-sm md:text-base max-w-2xl mx-auto">
            {t.gameMenuDesc || "Mainkan game interaktif untuk mempelajari budaya Banjar!"}
          </p>
        </div>

        {/* Game Cards: Horizontal scroll on mobile, 3-col grid on desktop */}
        <div className="w-full">
          <div className="flex sm:grid sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          {/* Card 1: Memory Game */}
          <div className="group relative bg-[#122b46]/50 rounded-2xl border border-white/10 overflow-hidden hover:border-[#F4C038]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(244,192,56,0.2)] flex flex-col flex-shrink-0 w-[220px] sm:w-auto">
            <div className="h-28 sm:h-32 md:h-36 bg-gradient-to-br from-[#10b981]/20 to-[#064e3b]/40 flex items-center justify-center p-3 sm:p-4">
              <img src="/budaya/tari baksa kembang.webp" alt="Memory" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-xl shadow-lg rotate-[-5deg] group-hover:rotate-0 transition-transform duration-500" />
              <img src="/kuliner/soto banjar.webp" alt="Memory" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover rounded-xl shadow-lg rotate-[15deg] -ml-5 sm:-ml-6 md:-ml-8 group-hover:rotate-0 transition-transform duration-500" />
            </div>
            <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
              <h3 className="text-sm sm:text-base md:text-xl font-bold text-white mb-1">{t.gameMemoryTitle || "Sasirangan Memory"}</h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-slate-400 mb-3 sm:mb-4 md:mb-6 flex-1">{t.gameMemoryDesc || "Cocokkan pasangan gambar warisan budaya secepat mungkin."}</p>
              <button 
                onClick={() => { setGameMenuOpen(false); setMemoryGameOpen(true); }}
                className="w-full py-3 bg-white/10 hover:bg-[#F4C038] hover:text-black text-white rounded-xl font-bold transition-colors"
              >
                {t.gamePlayBtn || "Mainkan Sekarang"}
              </button>
            </div>
          </div>

          {/* Card 2: Puzzle Jigsaw */}
          <div className="group relative bg-[#122b46]/50 rounded-2xl border border-white/10 overflow-hidden hover:border-[#06b6d4]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(6,182,212,0.2)] flex flex-col flex-shrink-0 w-[220px] sm:w-auto">
            <div className="h-28 sm:h-32 md:h-36 bg-gradient-to-br from-[#06b6d4]/20 to-[#164e63]/40 flex items-center justify-center p-3 sm:p-4">
              <Puzzle className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#06b6d4] drop-shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
              <h3 className="text-sm sm:text-base md:text-xl font-bold text-white mb-1">{t.gamePuzzleTitle || "Artefak Puzzle"}</h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-slate-400 mb-3 sm:mb-4 md:mb-6 flex-1">{t.gamePuzzleDesc || "Susun kembali kepingan gambar peninggalan bersejarah."}</p>
              <button 
                onClick={() => { setGameMenuOpen(false); setPuzzleGameOpen(true); }}
                className="w-full py-3 bg-white/10 hover:bg-[#06b6d4] hover:text-white text-white rounded-xl font-bold transition-colors"
              >
                {t.gamePlayBtn || "Mainkan Sekarang"}
              </button>
            </div>
          </div>

          {/* Card 3: Wordle */}
          <div className="group relative bg-[#122b46]/50 rounded-2xl border border-white/10 overflow-hidden hover:border-[#a855f7]/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(168,85,247,0.2)] flex flex-col flex-shrink-0 w-[220px] sm:w-auto">
            <div className="h-28 sm:h-32 md:h-36 bg-gradient-to-br from-[#a855f7]/20 to-[#581c87]/40 flex items-center justify-center p-3 sm:p-4">
              <Type className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 text-[#a855f7] drop-shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover:scale-110 transition-transform duration-500" />
            </div>
            <div className="p-3 sm:p-4 md:p-5 flex-1 flex flex-col">
              <h3 className="text-sm sm:text-base md:text-xl font-bold text-white mb-1">{t.gameWordleTitle || "Kata Banua"}</h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-slate-400 mb-3 sm:mb-4 md:mb-6 flex-1">{t.gameWordleDesc || "Tebak kosakata rahasia dalam Bahasa Banjar."}</p>
              <button 
                onClick={() => { setGameMenuOpen(false); setWordleGameOpen(true); }}
                className="w-full py-3 bg-white/10 hover:bg-[#a855f7] hover:text-white text-white rounded-xl font-bold transition-colors"
              >
                {t.gamePlayBtn || "Mainkan Sekarang"}
              </button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
