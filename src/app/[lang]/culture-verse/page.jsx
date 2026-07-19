"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import DynamicApp from '../../../components/CultureVerse/DynamicApp';

// Minimal mobile-only back bar for the 3D page (replaces full navbar on mobile)
function MobileBackBar({ lang }) {
  return (
    <div className="lg:hidden fixed top-0 left-0 w-full z-[100] flex items-center px-4 py-2 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
      <Link
        href={`/${lang}`}
        className="flex items-center gap-2 text-white font-heading font-bold text-sm px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors"
      >
        <span>←</span>
        <span>Beranda</span>
      </Link>
      <span className="ml-auto text-[#F4C038] font-heading font-black text-sm tracking-wide">🎮 Virtual Tour 3D</span>
    </div>
  );
}

export default function CultureVersePage({ params }) {
  const [lang, setLang] = useState('id');

  useEffect(() => {
    // Safely unwrap params if it's a promise (Next.js 15+ behavior)
    if (params && params.then) {
      params.then(p => setLang(p.lang || 'id'));
    } else if (params) {
      setLang(params.lang || 'id');
    }
  }, [params]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
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
