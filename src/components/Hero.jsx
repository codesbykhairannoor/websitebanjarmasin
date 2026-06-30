import React, { useState } from 'react';
import { motion } from 'framer-motion';

const heroSlices = [
  {
    id: 1,
    title: "Wisata Bahari",
    subtitle: "Pasar Terapung Lok Baintan Abad 16",
    img: "/wisata/960px-Pasar_Terapung_Siring_Banj.webp",
    color: "from-blue-900 via-blue-800/40"
  },
  {
    id: 2,
    title: "Susur Sungai",
    subtitle: "Eksplorasi Kota 1000 Sungai",
    img: "/profil kota/sungai.webp",
    color: "from-amber-900 via-yellow-800/40"
  },
  {
    id: 3,
    title: "Budaya Banjar",
    subtitle: "Pesona Kain Sasirangan & Tari Tradisional",
    img: "/budaya/motif bayam raj.webp",
    color: "from-purple-900 via-pink-800/40"
  },
  {
    id: 4,
    title: "Jejak Sejarah",
    subtitle: "Menyusuri Peninggalan Kesultanan 1526",
    img: "/wisata/960px-Pasar_Terapung_Siring_Banj.webp",
    color: "from-emerald-900 via-teal-800/40"
  },
  {
    id: 5,
    title: "Kuliner Khas",
    subtitle: "Soto Banjar & Bingka Surgawi",
    img: "/kuliner/soto banjar.webp",
    color: "from-orange-900 via-red-800/40"
  }
];

export default function Hero() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#050B14] flex text-white font-heading">
      
      {/* Title Overlay */}
      <div className="absolute top-20 sm:top-28 left-6 sm:left-12 z-50 pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-5xl md:text-6xl font-black italic tracking-widest text-white drop-shadow-[0_0_25px_rgba(0,0,0,1)] uppercase"
        >
          Pesona<br/>
          <span className="text-[#F4C038]">Banjarmasin</span>
        </motion.h1>
      </div>

      {/* Meet the 5 Watermark */}
      <div className="absolute top-1/4 sm:top-1/3 left-0 w-full text-center z-40 pointer-events-none mix-blend-overlay">
         <h2 className="text-[12vw] font-black uppercase tracking-[0.2em] text-white/40 font-heading">
           EXPLORE THE 5
         </h2>
      </div>

      {/* Angled Slices Container */}
      <div className="flex w-full h-[120vh] -mt-[10vh] transform -skew-x-[10deg] scale-110 -mx-10 sm:-mx-20 overflow-hidden">
        {heroSlices.map((slice, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <div 
              key={slice.id}
              className={`relative h-full overflow-hidden border-r-4 border-black/40 transition-[flex] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ${
                hoveredIndex === null ? 'flex-1' : isHovered ? 'flex-[3] sm:flex-[4]' : 'flex-[0.5] sm:flex-[0.3]'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setHoveredIndex(isHovered ? null : index)} // For mobile tap
            >
              {/* Unskewed Inner Content */}
              <div className="absolute top-0 left-1/2 w-[150vw] sm:w-[100vw] h-full transform skew-x-[10deg] -translate-x-1/2">
                <img loading="lazy" 
                  src={slice.img} 
                  alt={slice.title} 
                  className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${isHovered ? 'scale-110' : 'scale-[1.02]'}`}
                />
                
                {/* Overlays */}
                <div className={`absolute inset-0 bg-gradient-to-t ${slice.color} to-transparent mix-blend-multiply transition-opacity duration-700 ${isHovered ? 'opacity-80' : 'opacity-40'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/40 to-transparent opacity-90" />
              </div>

              {/* Text Content (must be unskewed as well) */}
              <div className="absolute bottom-24 sm:bottom-32 left-1/2 -translate-x-1/2 w-full px-2 sm:px-6 text-center transform skew-x-[10deg] transition-all duration-700 z-20 flex flex-col items-center">
                <h3 
                  className={`font-black uppercase tracking-widest transition-all duration-700 drop-shadow-xl ${
                    isHovered 
                      ? 'text-2xl sm:text-4xl lg:text-5xl text-[#F4C038] mb-2 sm:mb-4' 
                      : 'text-sm sm:text-xl lg:text-2xl text-white mb-0 whitespace-nowrap'
                  }`}
                  style={{ writingMode: hoveredIndex !== null && !isHovered ? 'vertical-rl' : 'horizontal-tb', transform: hoveredIndex !== null && !isHovered ? 'rotate(180deg)' : 'none' }}
                >
                  {slice.title}
                </h3>
                
                <div className={`overflow-hidden transition-all duration-700 w-full max-w-[80%] ${isHovered ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-xs sm:text-base lg:text-lg text-slate-200 font-body font-medium drop-shadow-md">
                    {slice.subtitle}
                  </p>
                  <button className="mt-4 px-6 py-2 bg-white/10 hover:bg-[#F4C038] hover:text-[#091422] border border-white/30 hover:border-[#F4C038] backdrop-blur-md rounded-full text-xs font-bold transition-all uppercase tracking-wider">
                    Jelajahi
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
