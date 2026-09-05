"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import DynamicApp from '../../../components/CultureVerse/DynamicApp';

function MobileBackBar({ lang }) {
  const homeHref = lang === 'id' ? '/' : `/${lang}`;
  return (
    <div className="lg:hidden fixed top-0 left-0 w-full z-[100] flex items-center px-4 py-2 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <Link
        href={homeHref}
        className="flex items-center gap-2 text-white font-heading font-bold text-sm px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors"
      >
        <span>←</span>
        <span>Beranda</span>
      </Link>
      <span className="ml-auto text-white font-heading font-black text-sm tracking-wide">🎮 Virtual Tour 3D</span>
    </div>
  );
}

export default function CultureVerseClient({ lang = 'id' }) {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Semantic Accessible SEO Header & Rich Summary for Crawlers */}
      <header className="sr-only">
        <h1>CultureVerse: Museum Virtual 3D Interaktif Seni, Budaya & Sejarah Banjar</h1>
        <p>
          Selamat datang di platform eksplorasi metaverse kebudayaan Kota Banjarmasin. 
          Jelajahi galeri artefak 3D interaktif, sejarah kain Sasirangan, arsitektur Rumah Adat Banjar Bubungan Tinggi, 
          dan permainan edukatif warisan budaya Kalimantan Selatan secara langsung melalui peramban web Anda.
        </p>
        <section>
          <h2>Koleksi Pameran Museum Virtual</h2>
          <ul>
            <li><strong>Kain Sasirangan:</strong> Warisan Budaya Takbenda dengan aneka motif sakral seperti Bayam Raja, Naga Balimbur, Gigi Haruan, dan Kembang Kacang.</li>
            <li><strong>Arsitektur Rumah Tradisional:</strong> Struktur kayu ulin khas Rumah Bubungan Tinggi dan ornamen ukiran flora khas Banjar.</li>
            <li><strong>Peralatan Tradisional & Maritim:</strong> Jukung, Perahu Kelotok, dan alat kehidupan sungai masyarakat Martapura & Barito.</li>
            <li><strong>Permainan Edukatif:</strong> Mini games interaktif susun puzzle, memori kartu motif, dan tebak kosakata bahasa Banjar.</li>
          </ul>
        </section>
      </header>

      {/* Mobile: Minimal back bar. Desktop: Full Navbar */}
      <MobileBackBar lang={lang} />
      <div className="hidden lg:block">
        <Navbar />
      </div>

      {/* Next.js Wrapped 3D Museum */}
      <DynamicApp />
    </div>
  );
}
