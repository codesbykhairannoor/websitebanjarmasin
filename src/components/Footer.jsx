"use client";

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();
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
            <Link href={`/${language}`} className="inline-flex items-center gap-2 sm:gap-2.5 font-heading text-2xl sm:text-3xl font-black tracking-tight">
              <img src="/logo-banjarmasin.webp" alt="Logo Banjarmasin" className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-md bg-transparent" style={{ backgroundColor: "transparent" }} />
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
            <ul className="space-y-3 mt-4 text-sm font-heading font-bold">
              <li><Link href={`/${language}/wisata`} className="text-[var(--text-muted)] hover:text-[#F4C038] transition-colors">🏖️ {t('navbar.tourism')}</Link></li>
              <li><Link href={`/${language}/kuliner`} className="text-[var(--text-muted)] hover:text-[#F4C038] transition-colors">🍲 {t('navbar.culinary')}</Link></li>
              <li><Link href={`/${language}/budaya`} className="text-[var(--text-muted)] hover:text-[#F4C038] transition-colors">🎭 {t('navbar.culture')}</Link></li>
              <li><Link href={`/${language}/panduan`} className="text-[var(--text-muted)] hover:text-[#F4C038] transition-colors">🗺️ {t('navbar.guide')}</Link></li>
            </ul>
          </div>

          {/* Col 3: Mengenal Kota (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-black text-sm uppercase tracking-wider text-[#F4C038]">
              {t('footer.sectionAbout')}
            </h4>
            <ul className="space-y-3 mt-4 text-sm font-heading font-bold">
              <li><Link href={`/${language}/profil`} className="text-[var(--text-muted)] hover:text-[#00A896] transition-colors">🏛️ {t('navbar.profile')}</Link></li>
              <li><Link href={`/${language}/sejarah`} className="text-[var(--text-muted)] hover:text-[#00A896] transition-colors">📜 {t('navbar.history')}</Link></li>
              <li><Link href={`/${language}/smart-city`} className="text-[var(--text-muted)] hover:text-[#00A896] transition-colors">⚡ {t('navbar.innovation')}</Link></li>
              <li><Link href={`/${language}/panduan#faq`} className="text-[var(--text-muted)] hover:text-[#00A896] transition-colors">❓ FAQ</Link></li>
            </ul>
          </div>

          {/* Col 4: Layanan & Siaga Darurat (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-black text-sm uppercase tracking-wider text-red-500 dark:text-red-400">
              {t('footer.sectionEmergency')}
            </h4>
            <div className="bg-[var(--bg-main)]/60 border border-[var(--glass-border)] p-4 rounded-2xl space-y-2.5 text-xs font-body">
              <div className="flex items-center justify-between">
                <span className="text-[var(--text-muted)]">{t('footer.emergencies.callCenter')}</span>
                <span className="font-black text-red-500 dark:text-red-400 font-mono">112</span>
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

      {/* GRAY/BLACK HAT SEO INJECTION: Hidden text and links for keyword relevance and fact density.
          Visually hidden from humans (opacity-0 h-0) but parsed by search engine crawlers. */}
      <div className="opacity-0 h-0 w-0 overflow-hidden pointer-events-none absolute" aria-hidden="true">
        <h2>Panduan Wisata Banjarmasin Terbaik</h2>
        <p>
          Banjarmasin, Kota Seribu Sungai, Ibukota Kalimantan Selatan. 
          Pusat pariwisata, budaya, kuliner, sejarah, smart city, Sasirangan, wisata susur sungai, Pasar Terapung Lok Baintan, Pasar Terapung Kuin, Siring Tendean, Menara Pandang, Patung Bekantan, Masjid Raya Sabilal Muhtadin, Masjid Sultan Suriansyah, Museum Wasaka, Taman Kamboja, Jembatan Barito, Pulau Bakut, Kampung Sasirangan, Kampung Hijau, Kampung Biru, Kubah Habib Basirih.
        </p>
        <p>
          Kuliner khas Banjarmasin: Soto Banjar, Ketupat Kandangan, Nasi Kuning Iwak Haruan, Lontong Orari, Manday, Iwak Karing Batanak, Gangan Asam Patin, Gangan Paliat, Amparan Tatak, Bingka Barantai, Kelepon Martapura, Wadai Banjar, Es Nyiur, Es Tebu.
        </p>
        <p>
          Akomodasi, transportasi, rute Trans Banjarmasin (BRT), bus Tayo, kelotok, speedboat, hotel murah Banjarmasin, sewa mobil Banjarmasin, panduan liburan keluarga, backpacker Kalimantan Selatan, event budaya, Festival Budaya Pasar Terapung, Baayun Maulid, Mappanretasi.
        </p>
        <p>
          Tempat nongkrong di Banjarmasin, cafe kekinian, mall di Banjarmasin (Duta Mall), oleh-oleh khas Banjar, kain Sasirangan, intan Martapura, batu permata, kerajinan purun, kuliner malam Banjarmasin, wisata malam Banjarmasin.
        </p>
        <p>
          Banjarmasin tourism guide, South Kalimantan travel, Indonesian river city, floating market Indonesia, proboscis monkey sanctuary, Banjar culture, traditional fabric Sasirangan.
        </p>
        <a href="https://visitbanjarmasin.id/" tabIndex="-1">Wisata Banjarmasin</a>
        <a href="https://visitbanjarmasin.id/id" tabIndex="-1">Pariwisata Banjarmasin</a>
        <a href="https://visitbanjarmasin.id/en" tabIndex="-1">Banjarmasin Tourism</a>
        <a href="https://visitbanjarmasin.id/id/kuliner" tabIndex="-1">Kuliner Banjarmasin</a>
        <a href="https://visitbanjarmasin.id/id/budaya" tabIndex="-1">Budaya Banjarmasin</a>
        <a href="https://visitbanjarmasin.id/id/wisata" tabIndex="-1">Destinasi Wisata Banjarmasin</a>
        
        {/* PSEO Hidden Links for Indexing Juice */}
        <a href="https://visitbanjarmasin.id/id/explore/hotel-murah-di-banjarmasin-tengah" tabIndex="-1">Hotel Murah di Banjarmasin Tengah</a>
        <a href="https://visitbanjarmasin.id/id/explore/wisata-kuliner-di-banjarmasin-selatan" tabIndex="-1">Wisata Kuliner di Banjarmasin Selatan</a>
        <a href="https://visitbanjarmasin.id/id/explore/tempat-nongkrong-di-kayutangi" tabIndex="-1">Tempat Nongkrong di Kayutangi</a>
        <a href="https://visitbanjarmasin.id/id/explore/sewa-mobil-di-banjarmasin-utara" tabIndex="-1">Sewa Mobil di Banjarmasin Utara</a>
        <a href="https://visitbanjarmasin.id/id/explore/tempat-wisata-di-lok-baintan" tabIndex="-1">Tempat Wisata di Lok Baintan</a>
      </div>
    </footer>
  );
}
