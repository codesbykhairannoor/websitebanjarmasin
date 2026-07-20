import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { ArrowLeft, Sparkles, Shield, CheckCircle, Info, MapPin, ShoppingCart } from 'lucide-react';
import { getLocalizedMotif } from '../../data/motifsData';
import { useLanguage } from '../../../../context/LanguageContext';

export default function MotifDetailModal() {
  const { currentView, selectedMotif, exitPortal } = useAppStore();
  const { language, t } = useLanguage();

  if (currentView !== 'portal-inspect' || !selectedMotif) return null;

  const motif = getLocalizedMotif(selectedMotif.id, language);

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center sm:justify-end p-1.5 sm:p-4 md:p-8 pointer-events-none animate-fade-in font-sans">
      <div className="max-w-[98vw] sm:max-w-sm md:max-w-md lg:max-w-lg w-full glass-panel p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl md:rounded-3xl border border-white/20 shadow-2xl space-y-2.5 sm:space-y-3 md:space-y-4 pointer-events-auto backdrop-blur-2xl relative overflow-hidden max-h-[65vh] sm:max-h-[75vh] md:max-h-[85vh] overflow-y-auto">
        
        {/* Glow Accent */}
        <div 
          className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-40"
          style={{ backgroundColor: selectedMotif.color }}
        />

        {/* Top Navigation */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 font-game font-bold">
          <button
            onClick={exitPortal}
            className="flex items-center gap-1 md:gap-2 px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-all text-[10px] md:text-xs border border-white/10 group cursor-pointer tracking-wide"
          >
            <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{language === 'en' ? 'Back' : language === 'ms' ? 'Kembali' : language === 'zh' ? '返回' : 'Kembali'}</span>
          </button>

          <span className="text-[9px] md:text-[11px] px-2.5 py-1 rounded-full bg-white/10 text-slate-300 tracking-wide font-medium">
            3D Room • {language === 'en' ? 'Inspect' : language === 'ms' ? 'Pemeriksaan' : language === 'zh' ? '检查' : 'Inspeksi'}
          </span>
        </div>

        {/* Title & Badge (Title Case Formatting - No ALL CAPS!) */}
        <div className="space-y-1.5 md:space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] md:text-xs font-game font-bold tracking-wide" style={{ backgroundColor: `${motif.color}25`, color: motif.color, border: `1px solid ${motif.color}50` }}>
            <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" />
            <span>{language === 'en' ? 'Cultural Heritage' : language === 'ms' ? 'Warisan Budaya' : language === 'zh' ? '文化遗产' : 'Warisan Budaya'}</span>
          </div>
          
          <h2 className="text-base sm:text-lg md:text-2xl font-title font-black tracking-tight text-white capitalize leading-tight">
            {motif.title}
          </h2>
          <h3 className="text-[10px] sm:text-xs md:text-sm font-game font-bold text-slate-300 italic tracking-wide">
            "{motif.subtitle}"
          </h3>
        </div>

        {/* Philosophy */}
        <div className="space-y-1.5 md:space-y-2">
          <h4 className="text-[10px] md:text-xs font-game font-bold tracking-wide text-amber-400 flex items-center gap-1.5">
            <Info className="w-3 h-3 md:w-3.5 md:h-3.5" /> {language === 'en' ? 'Philosophy & Ancestral Meaning' : language === 'zh' ? '哲学与祖先意义' : 'Filosofi & Makna Leluhur'}
          </h4>
          <p className="text-slate-200 text-[10px] sm:text-[11px] md:text-sm leading-relaxed text-justify p-2 md:p-3 rounded-lg md:rounded-xl bg-slate-900/80 border border-white/15 font-medium">
            {motif.philosophy}
          </p>
        </div>



        {/* Key Facts */}
        <div className="space-y-1.5 md:space-y-2">
          <h4 className="text-[10px] md:text-xs font-game font-bold tracking-wide text-slate-400">
            {language === 'en' ? 'Interesting Facts:' : language === 'zh' ? '有趣的事实：' : 'Fakta Menarik :'}
          </h4>
          <div className="space-y-1.5 md:space-y-2">
            {motif.facts.map((fact, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[9px] sm:text-[10px] md:text-sm text-slate-300 p-1.5 sm:p-2 rounded-md md:rounded-xl bg-slate-900/60 font-medium border border-white/5">
                <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 text-rose-400 shrink-0 mt-0.5" />
                <span>{fact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-1.5 sm:pt-2 flex flex-row gap-2">
          <a
            href={motif.shopLink || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 sm:py-3 rounded-lg sm:rounded-xl md:rounded-2xl font-game font-bold text-[9px] sm:text-[10px] md:text-sm text-slate-900 shadow-lg transition-all flex items-center justify-center gap-1 cursor-pointer tracking-wide bg-gradient-to-r from-amber-400 to-amber-500"
            style={{ boxShadow: `0 0 12px rgba(251, 191, 36, 0.3)` }}
          >
            <ShoppingCart className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" />
            <span>{language === 'en' ? 'Explore' : 'Jelajahi'}</span>
          </a>

          <button
            onClick={exitPortal}
            className="flex-1 py-2 sm:py-3 rounded-lg sm:rounded-xl md:rounded-2xl font-game font-bold text-[9px] sm:text-[10px] md:text-sm text-white shadow-lg transition-all flex items-center justify-center gap-1 cursor-pointer tracking-wide"
            style={{ backgroundColor: motif.color, boxShadow: `0 0 12px ${motif.color}40` }}
          >
            <span>{language === 'en' ? 'Close' : 'Tutup'}</span>
            <ArrowLeft className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rotate-180" />
          </button>
        </div>

      </div>
    </div>
  );
}
