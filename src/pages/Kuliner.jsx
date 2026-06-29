import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// ==========================================
// DATA STRUCTURES
// ==========================================

const galleryCards = [
  { img: "/kuliner/Soto_banjar,_Pak_Ahmat,_Martapura,_South_Kalimantan,_2018-07-28_02.webp", label: "Soto Banjar" },
  { img: "/kuliner/1920px-Katupat_Kandangan_in_Kandangan.webp", label: "Ketupat Kandangan" },
  { img: "/kuliner/buras.webp", label: "Lontong Orari" },
  { img: "/kuliner/Bingka.webp", label: "Bingka Kentang" },
  { img: "/kuliner/Iwak_Pakasam_Basanga.webp", label: "Iwak Pakasam" },
  { img: "/kuliner/Nasi_Itik_Gambut_Tenda_Biru.webp", label: "Nasi Itik Gambut" },
];

const mainDishes = [
  {
    id: "soto-banjar",
    title: "Soto Banjar Legendaris",
    desc: "Kuah kaldu ayam bening keemasan yang diinfus rempah kapulaga, cengkeh, dan kayu manis. Dihidangkan dengan ketupat, suwiran ayam kampung, dan perkedel kentang super lembut. Sebuah kehangatan di tepi sungai.",
    aroma: "Rempah Hangat & Gurih",
    icon: "🍲",
    img: "/kuliner/Soto_banjar,_Pak_Ahmat,_Martapura,_South_Kalimantan,_2018-07-28_02.webp",
    location: "Soto Bang Amat",
    maps: "https://maps.google.com/?q=Soto+Bang+Amat+Banjarmasin"
  },
  {
    id: "ketupat-kandangan",
    title: "Ketupat Kandangan Asap",
    desc: "Ketupat keras berpadu kuah santan keruh berbumbu rempah rahasia. Keajaibannya terletak pada Ikan Haruan (Gabus) yang dipanggang asap terlebih dahulu sebelum disiram kuah, memberikan rasa smokey yang luar biasa.",
    aroma: "Santan Krimi & Asap",
    icon: "🥥",
    img: "/kuliner/1920px-Katupat_Kandangan_in_Kandangan.webp",
    location: "Ketupat Kaum",
    maps: "https://maps.google.com/?q=Ketupat+Kandangan+Banjarmasin"
  },
  {
    id: "nasi-kuning",
    title: "Nasi Kuning Bumbu Habang",
    desc: "Sarapan wajib warga Banua! Nasi kuning pulen bertabur serundeng berpadu sempurna dengan Bumbu Habang (Bumbu Merah) yang dimasak dari cabai kering besar tanpa biji menghasilkan rasa manis, gurih, dan warna merah pekat yang menggoda.",
    aroma: "Kunyit & Karamel Pedas",
    icon: "🍛",
    img: "/kuliner/Nasi_Kuning_Banjar_001.webp",
    location: "Nasi Kuning Cempaka",
    maps: "https://maps.google.com/?q=Nasi+Kuning+Cempaka+Banjarmasin"
  },
  {
    id: "lontong-orari",
    title: "Lontong Orari Jumbo",
    desc: "Lontong unik berbentuk segitiga berpasangan. Disajikan dengan sayur nangka muda kuah santan cair, ikan gabus atau telur itik rebus bumbu habang, dan taburan bawang goreng melimpah. Porsi kuli, rasa priyayi!",
    aroma: "Gurih Santan",
    icon: "🥣",
    img: "/kuliner/buras.webp",
    location: "Lontong Orari Sungai Baru",
    maps: "https://maps.google.com/?q=Lontong+Orari+Banjarmasin"
  },
  {
    id: "gangan-asam",
    title: "Gangan Asam Kepala Patin",
    desc: "Sayur kuah kuning segar berpadu asam terong, timun, dan kubis dengan potongan kepala atau daging Ikan Patin / Haruan khas perairan Kalimantan. Perpaduan rasa asam, gurih, dan manis alami dari kaldu ikan segar yang sangat menyegarkan.",
    aroma: "Asam Segar & Kunyit",
    icon: "🐟",
    img: "/kuliner/Gangan_asam_kepala_ikan_di_Cempaka,_Banjarbaru.webp",
    location: "RM Gangan Asam Cempaka",
    maps: "https://maps.google.com/?q=Gangan+Asam+Banjarmasin"
  },
  {
    id: "nasi-itik-gambut",
    title: "Nasi Itik Gambut",
    desc: "Kuliner ikonik kawasan Gambut bertekstur daging itik super empuk yang dimasak berjam-jam dalam bumbu habang kental beraroma kayu manis dan gula aren gurih. Disajikan hangat dalam bungkusan daun pisang harum yang memikat.",
    aroma: "Bumbu Habang & Daun Pisang",
    icon: "🦆",
    img: "/kuliner/Nasi_Itik_Gambut_Tenda_Biru.webp",
    location: "Nasi Itik Gambut Tenda Biru",
    maps: "https://maps.google.com/?q=Nasi+Itik+Gambut"
  }
];

const wadaiCollection = [
  { name: "Bingka Kentang Banjar", tag: "Manis Legit & Lembut", img: "/kuliner/Bingka.webp" },
  { name: "Amparan Tatak Pisang", tag: "Krim Santan Pisang", img: "/kuliner/Resep-Amparan-Tatak-Kue-Khas-Ban.webp" },
  { name: "Bingka Barandam", tag: "Basah Bunga Cengkeh", img: "/kuliner/358-bingka-barandam-khas-banjar.webp" },
  { name: "Klepon Martapura", tag: "Lumer Gula Aren", img: "/kuliner/klepon.webp" },
  { name: "Wadai Kararaban", tag: "Rempah Adas Harum", img: "/kuliner/wadai-kararaban-khas-banjar-1756.webp" },
];

const olehOleh = [
  {
    title: "Mandai 'Daging Nabati'",
    desc: "Fermentasi kulit buah Cempedak yang diawetkan dengan garam. Saat digoreng, teksturnya berserat menyerupai daging sapi dengan rasa umami asam-gurih yang sangat adiktif.",
    img: "/kuliner/IMG-20251017-WA0002.webp",
    span: "col-span-1 md:col-span-2 row-span-2 h-[300px] md:h-auto",
  },
  {
    title: "Kerupuk Amplang",
    desc: "Camilan renyah berbahan dasar Ikan Pipih atau Tenggiri khas sungai Kalimantan.",
    img: "/kuliner/f6cd9fe9a37ece89ca3de6416a14031e.webp",
    span: "col-span-1 row-span-1 h-[250px]",
  },
  {
    title: "Iwak Pakasam",
    desc: "Ikan sungai fermentasi beras sangrai yang digoreng garing renyah.",
    img: "/kuliner/Iwak_Pakasam_Basanga.webp",
    span: "col-span-1 row-span-1 h-[250px]",
  },
  {
    title: "Sambal Acan Raja Banjar",
    desc: "Terasi legendaris dipadu buah mangga/binjai khas rawa yang super pedas dan segar.",
    img: "/kuliner/sambal acan.webp",
    span: "col-span-1 md:col-span-3 row-span-1 h-[250px]",
  }
];

export default function Kuliner() {
  const [activeTab, setActiveTab] = useState(mainDishes[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* =========================================================
          HERO SECTION (TEXT IN CONTAINER, IMAGES FULL WIDTH 3D)
          ========================================================= */}
      <section className="relative w-full overflow-hidden pt-20 pb-4 mt-[80px]">
        {/* Style khusus untuk 3D Drum Carousel agar responsif dan murni CSS (anti-lag) */}
        <style>
          {`
            @keyframes spinDrum {
              from { transform: translateZ(-600px) rotateY(0deg); }
              to { transform: translateZ(-600px) rotateY(-360deg); }
            }
            .drum-container {
              animation: spinDrum 40s infinite linear;
              transform-style: preserve-3d;
            }
            .drum-card {
              backface-visibility: hidden;
              --drum-z: 600px;
            }
            @media (max-width: 767px) {
              @keyframes spinDrum {
                from { transform: translateZ(-460px) rotateY(0deg); }
                to { transform: translateZ(-460px) rotateY(-360deg); }
              }
              .drum-card {
                --drum-z: 460px;
              }
            }
            @media (max-width: 639px) {
              @keyframes spinDrum {
                from { transform: translateZ(-360px) rotateY(0deg); }
                to { transform: translateZ(-360px) rotateY(-360deg); }
              }
              .drum-card {
                --drum-z: 360px;
              }
            }
            
            /* Custom scrollbar for horizontal wadai list */
            .wadai-scroll::-webkit-scrollbar {
              height: 6px;
            }
            .wadai-scroll::-webkit-scrollbar-track {
              background: rgba(255,255,255,0.05);
              border-radius: 10px;
            }
            .wadai-scroll::-webkit-scrollbar-thumb {
              background: var(--sasirangan-gold);
              border-radius: 10px;
            }
          `}
        </style>

        {/* TEXT CONTENT (CONTAINERIZED) */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-20 text-center mb-4 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-2 font-heading">
              ✦ KULINER OTENTIK BORNEO
            </span>
            <h1 className="hero-title !mb-3">
              Surga Cita Rasa <br className="hidden sm:inline" />
              <span className="text-sasirangan">Kota Seribu Sungai</span>
            </h1>
            <p className="hero-subtitle mx-auto !mb-6 !max-w-2xl px-2">
              Eksplorasi mahakarya kuliner dari warisan resep leluhur, disajikan hangat dengan sentuhan cinta dari dapur para <span className="font-bold text-[var(--sasirangan-gold)]">Acil</span> di tepian sungai.
            </p>
          </motion.div>
        </div>

        {/* 3D DRUM CAROUSEL (DESKTOP RAPI 600px, MOBILE RENGGANG ANTI-DEMPET 360px) */}
        <div className="w-full relative h-[280px] sm:h-[380px] md:h-[500px] flex justify-center items-center [perspective:1500px]">
          <div className="relative w-full h-full flex justify-center items-center drum-container">
            {/* Duplikasi array menjadi 10 item untuk membentuk silinder tertutup */}
            {[...galleryCards, ...galleryCards.slice(0, 4)].map((card, idx) => (
              <div 
                key={idx}
                className="drum-card absolute w-[130px] h-[190px] sm:w-[190px] sm:h-[280px] md:w-[300px] md:h-[450px]"
                style={{ 
                  transform: `rotateY(${idx * 36}deg) translateZ(var(--drum-z))` 
                }}
              >
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] relative bg-[var(--card-bg)]">
                  <img loading="lazy" decoding="async" src={card.img} alt={card.label} className="w-full h-full object-cover pointer-events-auto transform-gpu" />
                  <div className="absolute bottom-3 left-3 right-3 text-center">
                    <span className="bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] sm:text-xs md:text-sm font-bold border border-white/20 inline-block">
                      {card.label}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTAINER UTAMA UNTUK SECTIONS
          ========================================================= */}
      <div className="app-container">
        
        {/* =========================================================
            SECTION 1: INTERACTIVE SPOTLIGHT (SAJIAN UTAMA LEGENDA)
            ========================================================= */}
        <section className="py-20 sm:py-24 border-t border-[var(--glass-border)]">
          <div className="text-center mb-10 sm:mb-14">
            <span className="text-[#F4C038] font-bold tracking-widest text-xs sm:text-sm uppercase mb-2 block">Cita Rasa Berat Warisan Leluhur</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black mb-4 text-[var(--text-main)]">Sajian Utama Legendaris</h2>
            <p className="max-w-2xl mx-auto text-[var(--text-muted)] text-sm sm:text-base md:text-lg">Pilar utama kuliner Banua peninggalan pelaut dan saudagar abad pertengahan yang kaya akan rempah.</p>
          </div>

          {/* Side-by-Side Menu & Feature Showcase Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* Sidebar Menu Choices (Dari Samping) */}
            <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-col gap-2.5 sm:gap-3">
              {mainDishes.map((dish) => (
                <button
                  key={dish.id}
                  onClick={() => setActiveTab(dish)}
                  className={`p-3.5 sm:p-4 rounded-2xl text-left font-bold transition-all duration-300 flex items-center gap-3 border ${
                    activeTab.id === dish.id 
                      ? 'bg-[#F4C038] text-[var(--martapura-deep)] border-[#F4C038] shadow-[0_4px_20px_rgba(244,192,56,0.3)] lg:translate-x-2' 
                      : 'bg-[var(--card-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-border)] border-[var(--glass-border)]'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl flex-shrink-0">{dish.icon}</span>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs sm:text-sm md:text-base font-black truncate">{dish.title}</span>
                    <span className={`text-[10px] sm:text-xs truncate ${activeTab.id === dish.id ? 'text-black/80 font-semibold' : 'text-[var(--text-muted)]'}`}>{dish.location}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Right Detail Showcase Card */}
            <div className="lg:col-span-8 flex">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full bg-[var(--card-bg)] backdrop-blur-2xl border border-[var(--glass-border)] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                >
                  {/* Left Image Showcase */}
                  <div className="w-full md:w-1/2 h-[260px] sm:h-[350px] md:h-auto relative overflow-hidden group min-h-[260px]">
                    <img loading="lazy" decoding="async" src={activeTab.img} alt={activeTab.title} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-108 transition-transform duration-700 transform-gpu" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end md:hidden">
                      <span className="bg-black/60 backdrop-blur-md text-[#F4C038] px-3 py-1 rounded-full text-xs font-bold border border-white/20">
                        📍 {activeTab.location}
                      </span>
                    </div>
                  </div>

                  {/* Right Content Area */}
                  <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 bg-[#33C3B3]/20 border border-[#33C3B3]/40 px-3 py-1 rounded-full text-xs font-bold text-[#33C3B3]">
                          ✦ {activeTab.aroma}
                        </span>
                        <span className="hidden md:inline-flex bg-black/40 backdrop-blur-md text-[#F4C038] px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                          📍 {activeTab.location}
                        </span>
                      </div>
                      
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading text-[var(--text-main)] mb-4 leading-tight">
                        {activeTab.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-6">
                        {activeTab.desc}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-[var(--glass-border)] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <span className="text-[10px] sm:text-xs text-[var(--text-muted)] italic">
                        *Kedai terverifikasi
                      </span>
                      <a 
                        href={activeTab.maps} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#F4C038] text-black font-black rounded-full hover:bg-white hover:text-black transition-all shadow-[0_4px_20px_rgba(244,192,56,0.3)] text-xs sm:text-sm text-center"
                      >
                        <span>Navigasi ke Kedai</span>
                        <span>➔</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: HORIZONTAL SHOWCASE (WARISAN WADAI BANJAR)
            ========================================================= */}
        <section className="py-20 sm:py-24 border-t border-[var(--glass-border)]">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-[#F4C038] font-bold tracking-widest text-sm uppercase mb-2 block">Warisan Manis Legendaris</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black mb-4 text-[var(--text-main)]">Warisan Wadai Tradisional Banjar</h2>
              <p className="text-[var(--text-muted)] text-sm sm:text-base md:text-lg leading-relaxed">
                Kue manis tradisional (Wadai) khas Bumi Lambung Mangkurat dengan tekstur lembut, legit, dan aroma santan pandan yang memanjakan lidah di setiap gigitan.
              </p>
            </div>
          </div>

          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory wadai-scroll hide-scrollbar px-2 sm:px-0">
            {wadaiCollection.map((wadai, idx) => (
              <div key={idx} className="min-w-[260px] sm:min-w-[300px] md:min-w-[320px] h-[360px] sm:h-[400px] flex-shrink-0 snap-center relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg border border-[var(--glass-border)]">
                <img loading="lazy" decoding="async" src={wadai.img} alt={wadai.name} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 transform-gpu" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-white mb-3">
                    {wadai.tag}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black font-heading text-white">{wadai.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            SECTION 3: DERMAGA KULINER TEPI SUNGAI (PARALLAX + CTA)
            ========================================================= */}
        <section className="py-20 sm:py-24 border-t border-[var(--glass-border)]">
          <div className="relative w-full rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden h-[450px] sm:h-[500px] md:h-[600px] flex items-center shadow-lg border border-[var(--glass-border)]">
            <div className="absolute inset-0">
              <img loading="lazy" decoding="async" src="/kuliner/Soto_banjar,_Pak_Ahmat,_Martapura,_South_Kalimantan,_2018-07-28_02.webp" alt="Dermaga Kuliner Banua Anyar" className="w-full h-full object-cover scale-105 transform-gpu" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
            </div>

            <div className="relative z-10 p-6 sm:p-8 md:p-16 max-w-2xl">
              <div className="bg-black/40 backdrop-blur-xl border border-white/20 p-6 sm:p-8 md:p-12 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <span className="text-[#33C3B3] font-bold tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-4 block">Santap Senja di Bantaran Sungai</span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-heading font-black text-white mb-4 sm:mb-6 leading-tight">
                  Dermaga Kuliner <span className="text-[var(--sasirangan-gold)]">Tepi Sungai</span>
                </h2>
                <p className="text-white/90 text-xs sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                  Rasakan sensasi menyantap hangatnya Soto Banjar dan hidangan lezat lainnya ditemani semilir angin sungai dan pemandangan perahu kelotok yang melintas di Sentra Kuliner Banua Anyar serta kawasan Siring.
                </p>
                <a 
                  href="https://maps.google.com/?q=Sentra+Kuliner+Banua+Anyar+Banjarmasin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[var(--sasirangan-gold)] text-black font-black rounded-full hover:bg-white hover:text-black transition-colors shadow-lg"
                >
                  📍 Jelajahi Kuliner Tepi Sungai
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: ASYMMETRIC BENTO (OLEH-OLEH EKSTREM & LEGENDA)
            ========================================================= */}
        <section className="py-20 sm:py-24 border-t border-[var(--glass-border)] mb-16 sm:mb-20">
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-[#33C3B3] font-bold tracking-widest text-xs sm:text-sm uppercase mb-2 block">Bawa Pulang Kenangan</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black mb-4 text-[var(--text-main)]">Oleh-Oleh Tak Terlupakan</h2>
            <p className="max-w-2xl mx-auto text-[var(--text-muted)] text-sm sm:text-base md:text-lg">Cendera mata kuliner legendaris yang akan membangkitkan rindu Anda pada Kota Seribu Sungai.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[auto]">
            {olehOleh.map((item, idx) => (
              <div key={idx} className={`${item.span} rounded-[1.5rem] sm:rounded-3xl overflow-hidden relative group shadow-lg border border-[var(--glass-border)]`}>
                <img loading="lazy" decoding="async" src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 absolute inset-0 transform-gpu" />
                <div className="relative h-full min-h-[220px] sm:min-h-[250px] bg-gradient-to-t from-black/95 via-black/40 to-transparent p-5 sm:p-6 md:p-8 flex flex-col justify-end">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-heading text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 text-xs sm:text-sm md:text-base leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
      
      <Footer />
    </div>
  );
}
