import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useLanguage } from '../../../../context/LanguageContext';
import { X, BookOpen, Target, Globe, Users } from 'lucide-react';

export default function AboutModal() {
  const { isAboutOpen, setAboutOpen } = useAppStore();
  const { language } = useLanguage();

  if (!isAboutOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/85 backdrop-blur-md"
        onClick={() => setAboutOpen(false)}
      />

      {/* Panel */}
      <div className="relative glass-card w-full max-w-lg p-6 md:p-8 rounded-2xl animate-fade-in border border-amber-500/20 overflow-y-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
          <h2 className="text-2xl md:text-3xl font-title font-bold text-amber-400 uppercase tracking-widest">
            {language === 'en' ? 'About Platform' : language === 'zh' ? '关于平台' : 'Tentang Platform'}
          </h2>
          <button
            onClick={() => setAboutOpen(false)}
            className="p-2 bg-slate-900 hover:bg-rose-500 text-slate-400 hover:text-white rounded-full transition-colors border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5 text-slate-300 font-game">

          <div className="flex gap-4">
            <BookOpen className="w-6 h-6 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-slate-100 uppercase tracking-wide mb-1">
                {language === 'en' ? 'What is Banjarmasin Virtual Tour?' : language === 'zh' ? '什么是马辰虚拟导览？' : 'Apa Itu Banjarmasin Virtual Tour?'}
              </h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {language === 'en' ? 'An interactive 3D virtual museum showcasing traditional culture from South Kalimantan. Explore the gallery, discover motifs, and learn the philosophy behind each cloth.' : language === 'zh' ? '展示南加里曼丹传统文化的互动式 3D 虚拟博物馆。探索画廊，发现图案，并了解每块布料背后的哲学。' : 'Museum virtual 3D interaktif yang menampilkan budaya tradisional dari Kalimantan Selatan. Jelajahi galeri, temukan motif, dan pelajari filosofi di balik setiap kain.'}
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <Globe className="w-6 h-6 text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-bold text-slate-100 uppercase tracking-wide mb-1">
                {language === 'en' ? 'How to Navigate' : language === 'zh' ? '如何导航' : 'Cara Navigasi'}
              </h3>
              <ul className="text-sm text-slate-400 space-y-1 list-none">
                <li>▸ <strong className="text-slate-300">WASD</strong> — {language === 'en' ? 'Walk & Navigate' : language === 'zh' ? '行走 & 导航' : 'Jalan & Navigasi'}</li>
                <li>▸ <strong className="text-slate-300">SPACE</strong> — {language === 'en' ? 'Jump' : language === 'zh' ? '跳跃' : 'Lompat'}</li>
                <li>▸ <strong className="text-slate-300">E / Click</strong> — {language === 'en' ? 'Inspect Painting' : language === 'zh' ? '检查画作' : 'Inspeksi Lukisan'}</li>
                <li>▸ <strong className="text-slate-300">V / F5</strong> — {language === 'en' ? 'Change POV (1st/3rd)' : language === 'zh' ? '切换视角' : 'Ganti POV (1st/3rd)'}</li>
                <li>▸ <strong className="text-slate-300">P</strong> — {language === 'en' ? 'Open Settings' : language === 'zh' ? '打开设置' : 'Buka Pengaturan'}</li>
                <li>▸ <strong className="text-slate-300">ESC</strong> — {language === 'en' ? 'Exit Camera Lock' : language === 'zh' ? '退出视角锁定' : 'Keluar Kamera Lock'}</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/5 text-center">
          <p className="text-[10px] font-game text-slate-500 tracking-widest uppercase">
            Banjarmasin Virtual Tour v1.0 • 100% Client-Side
          </p>
        </div>

      </div>
    </div>
  );
}
