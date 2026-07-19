"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

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
      {/* Floating Back Button */}
      <Link
        href={`/${lang}`}
        className="absolute top-6 left-6 z-50 px-6 py-3 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white font-bold rounded-full flex items-center gap-2 transition-all hover:-translate-x-1"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Kembali ke Beranda
      </Link>

      {/* Embedded 3D Museum */}
      <iframe 
        src="/culture-verse/index.html" 
        className="w-full h-full border-none"
        title="Sasirangan Culture Verse 3D"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
