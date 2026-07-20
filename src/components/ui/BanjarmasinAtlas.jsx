"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const mapData = [
  {
    id: 'pasar-terapung',
    title: 'Pasar Terapung Lok Baintan',
    category: 'Budaya & Belanja',
    desc: 'Pasar tradisional di atas sungai Barito/Martapura, pusat transaksi pedagang menggunakan jukung yang sudah ada sejak era Kesultanan Banjar.',
    img: '/wisata/960px-Pasar_Terapung_Siring_Banj.webp',
    x: 30, // percentage
    y: 40,
    color: '#F4C038'
  },
  {
    id: 'menara-pandang',
    title: 'Menara Pandang',
    category: 'Landmark',
    desc: 'Ikon kota di Siring Tendean, menawarkan pemandangan sungai Martapura dan hiruk-pikuk kota dari ketinggian.',
    img: '/home/hero-mobile-menara-pandang.webp',
    x: 60,
    y: 35,
    color: '#33C3B3'
  },
  {
    id: 'patung-bekantan',
    title: 'Patung Bekantan',
    category: 'Landmark',
    desc: 'Maskot kota Banjarmasin yang terletak di tepi sungai, air memancur dari mulutnya ke arah sungai melambangkan identitas flora/fauna lokal.',
    img: '/wisata/Bekantan_statue.webp',
    x: 65,
    y: 55,
    color: '#F4C038'
  },
  {
    id: 'masjid-raya',
    title: 'Masjid Raya Sabilal Muhtadin',
    category: 'Religi',
    desc: 'Masjid terbesar di Banjarmasin dengan arsitektur megah dan kubah berbentuk tanggui (caping) khas Banjar.',
    img: '/wisata/Masjid_Raya_Sabilal_Muhtadin.webp',
    x: 45,
    y: 65,
    color: '#33C3B3'
  }
];

export default function BanjarmasinAtlas() {
  const [activeMarker, setActiveMarker] = useState(null);

  return (
    <div className="w-full relative rounded-[32px] overflow-hidden bg-[#091422] border border-[var(--glass-border)] shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-[500px] sm:h-[600px] flex items-center justify-center">
      {/* Abstract Map Background */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}></div>
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

      {/* The River SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        <motion.path 
          d="M 0,20 C 30,30 40,60 50,50 C 60,40 70,80 100,70"
          stroke="url(#riverGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.path 
          d="M 10,0 C 20,40 40,30 60,60 C 80,90 90,60 100,100"
          stroke="url(#riverGradient2)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="riverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00B4D8" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#33C3B3" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00B4D8" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="riverGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00B4D8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#00B4D8" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Markers */}
      {mapData.map((marker) => (
        <div 
          key={marker.id}
          className="absolute"
          style={{ left: `${marker.x}%`, top: `${marker.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          {/* Marker Dot */}
          <button 
            onClick={() => setActiveMarker(activeMarker?.id === marker.id ? null : marker)}
            className="group relative z-20 flex items-center justify-center focus:outline-none"
            aria-label={`Lihat detail ${marker.title}`}
          >
            <span className="absolute inset-0 rounded-full animate-ping opacity-50" style={{ backgroundColor: marker.color }}></span>
            <div 
              className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 bg-[#091422] shadow-[0_0_15px_rgba(0,0,0,0.8)] flex items-center justify-center transition-all duration-300 ${activeMarker?.id === marker.id ? 'scale-125' : 'scale-100 group-hover:scale-110'}`}
              style={{ borderColor: marker.color }}
            >
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" style={{ backgroundColor: marker.color }}></div>
            </div>
            
            {/* Tooltip Label (Shows on hover if not active) */}
            <div className={`absolute top-full mt-2 w-max px-3 py-1.5 bg-[#091422]/90 backdrop-blur-sm border border-white/10 rounded-full text-xs font-bold text-white shadow-xl transition-all duration-300 pointer-events-none ${activeMarker?.id === marker.id ? 'opacity-0 scale-95' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'}`}>
              {marker.title}
            </div>
          </button>
        </div>
      ))}

      {/* Active Marker Info Card */}
      <AnimatePresence>
        {activeMarker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-30 bottom-4 left-4 right-4 sm:bottom-auto sm:right-auto sm:top-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:translate-x-10 w-auto sm:w-[320px] bg-[#091422]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="h-[160px] relative overflow-hidden bg-black/50">
              <img src={activeMarker.img} alt={activeMarker.title} className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091422] via-[#091422]/40 to-transparent"></div>
              <button 
                onClick={() => setActiveMarker(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors text-sm font-bold border border-white/20"
                aria-label="Tutup detail"
              >
                ✕
              </button>
            </div>
            <div className="p-5 relative -mt-4">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 shadow-md border" style={{ backgroundColor: `${activeMarker.color}15`, color: activeMarker.color, borderColor: `${activeMarker.color}40` }}>
                {activeMarker.category}
              </span>
              <h4 className="text-xl font-black text-white font-heading mb-2 leading-tight">
                {activeMarker.title}
              </h4>
              <p className="text-sm text-gray-300 font-body leading-relaxed opacity-90">
                {activeMarker.desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Title overlay */}
      <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-10 pointer-events-none">
        <h3 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-wider drop-shadow-lg">
          Banjarmasin <span className="text-[#33C3B3]">Atlas</span>
        </h3>
        <p className="text-[10px] sm:text-xs text-[#F4C038] tracking-[0.2em] uppercase font-bold mt-1 drop-shadow-md">Peta Wisata Interaktif</p>
      </div>
    </div>
  );
}
