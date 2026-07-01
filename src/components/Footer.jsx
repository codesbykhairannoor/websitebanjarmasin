import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="w-full bg-[var(--card-bg)] border-t border-[var(--glass-border)] text-[var(--text-main)] transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Subtle Background Glow */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#00A896]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#F4C038]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-16 relative z-10">
        
        {/* Main Footer Grid (4 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[var(--glass-border)]">
          
          {/* Col 1: Brand & Mascot Story (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 sm:gap-2.5 font-heading text-2xl sm:text-3xl font-black tracking-tight">
              <img src="/logotransparan.png" alt="Logo Banjarmasin" className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-md" />
              <span>Banjarmasin<span className="text-[#F4C038]">.</span></span>
            </Link>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed max-w-sm">
              {t('footer.description')}
            </p>
            <div className="pt-2 flex items-center gap-3">
              <span className="w-10 h-10 rounded-2xl bg-[#F4C038]/20 border border-[#F4C038]/40 flex items-center justify-center text-xl shadow-sm">🐵</span>
              <div className="text-xs">
                <span className="font-heading font-black block text-[var(--text-main)]">{t('footer.mascotTitle')}</span>
                <span className="text-[var(--text-muted)] font-mono text-[11px]">{t('footer.mascotSub')}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Jelajah Wisata (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading font-black text-sm uppercase tracking-wider text-[#00A896]">
              {t('footer.sectionTravel')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-body">
              <li><Link to="/wisata" className="text-[var(--text-muted)] hover:text-[#F4C038] transition-colors">🏖️ {t('navbar.tourism')}</Link></li>
              <li><Link to="/kuliner" className="text-[var(--text-muted)] hover:text-[#F4C038] transition-colors">🍲 {t('navbar.culinary')}</Link></li>
              <li><Link to="/budaya" className="text-[var(--text-muted)] hover:text-[#F4C038] transition-colors">🎭 {t('navbar.culture')}</Link></li>
              <li><Link to="/panduan" className="text-[var(--text-muted)] hover:text-[#F4C038] transition-colors">🗺️ {t('navbar.guide')}</Link></li>
            </ul>
          </div>

          {/* Col 3: Mengenal Kota (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-black text-sm uppercase tracking-wider text-[#F4C038]">
              {t('footer.sectionAbout')}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-body">
              <li><Link to="/profil" className="text-[var(--text-muted)] hover:text-[#00A896] transition-colors">🏛️ {t('navbar.profile')}</Link></li>
              <li><Link to="/sejarah" className="text-[var(--text-muted)] hover:text-[#00A896] transition-colors">📜 {t('navbar.history')}</Link></li>
              <li><Link to="/smart-city" className="text-[var(--text-muted)] hover:text-[#00A896] transition-colors">⚡ {t('navbar.innovation')}</Link></li>
              <li><Link to="/panduan#faq" className="text-[var(--text-muted)] hover:text-[#00A896] transition-colors">❓ FAQ</Link></li>
            </ul>
          </div>

          {/* Col 4: Layanan & Siaga Darurat (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-black text-sm uppercase tracking-wider text-rose-500">
              {t('footer.sectionEmergency')}
            </h4>
            <div className="bg-[var(--bg-main)]/60 border border-[var(--glass-border)] p-4 rounded-2xl space-y-2.5 text-xs font-body">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)]">{t('footer.emergencies.callCenter')}</span>
                <span className="font-black text-rose-500 font-mono">112</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)]">{t('footer.emergencies.police')}</span>
                <span className="font-black text-amber-500 font-mono">110</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)]">{t('footer.emergencies.hospital')}</span>
                <span className="font-black text-emerald-500 font-mono">(0511) 3252180</span>
              </div>
            </div>
            <p className="text-[11px] text-[var(--text-muted)] leading-relaxed pt-1">
              {t('footer.address')}
            </p>
          </div>

        </div>

        {/* Bottom Copyright & Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-body text-[var(--text-muted)]">
          <p>{t('footer.copyright')}</p>
          <div className="flex items-center gap-4 text-sm font-bold">
            <span className="hover:text-[#F4C038] transition-colors cursor-pointer">🌐 banjarmasin.go.id</span>
            <span>•</span>
            <span className="hover:text-[#00A896] transition-colors cursor-pointer">📱 @banjarmasintourism</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
