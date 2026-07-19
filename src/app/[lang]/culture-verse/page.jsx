"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import DynamicApp from '../../../components/CultureVerse/DynamicApp';

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
      {/* Global Website Navbar on top of the 3D Game! */}
      <Navbar />

      {/* Next.js Wrapped 3D Museum */}
      <DynamicApp />
    </div>
  );
}
