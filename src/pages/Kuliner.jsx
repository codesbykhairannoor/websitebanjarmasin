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
  { img: "/kuliner/Nasi_Kuning_Banjar_001.webp", label: "Nasi Kuning" },
  { img: "/kuliner/buras.webp", label: "Lontong Orari" },
  { img: "/kuliner/Nasi_Itik_Gambut_Tenda_Biru.webp", label: "Nasi Itik Gambut" },
  { img: "/kuliner/Gangan_asam_kepala_ikan_di_Cempaka,_Banjarbaru.webp", label: "Gangan Asam" },
  { img: "/kuliner/Bingka.webp", label: "Wadai Bingka" },
  { img: "/kuliner/Iwak_Pakasam_Basanga.webp", label: "Iwak Pakasam" },
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
    desc: "Ketupat keras berpadu kuah santan keruh berbumbu rempah rahasia. Keajaibannya terletak pada Ikan Haruan (Gabus) yang dipanggang asap terlebih dahulu sebelum disiram kuah, memberikan rasa 'smokey' yang luar biasa.",
    aroma: "Santan Krimi & Asap",
    icon: "🥥",
    img: "/kuliner/1920px-Katupat_Kandangan_in_Kandangan.webp",
    location: "Ketupat Kaum",
    maps: "https://maps.google.com/?q=Ketupat+Kandangan+Banjarmasin"
  },
  {
    id: "nasi-kuning",
    title: "Nasi Kuning Bumbu Habang",
    desc: "Sarapan wajib warga Banua! Nasi kuning pulen bertabur serundeng berpadu sempurna dengan Bumbu Habang (Bumbu Merah) yang dimasak dari cabai kering besar tanpa biji—menghasilkan rasa manis, gurih, dan warna merah pekat yang menggoda.",
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
    id: "nasi-itik-gambut",
    title: "Nasi Itik Gambut Tenda Biru",
    desc: "Kuliner ikonis dari kawasan Gambut berbalut bumbu habang berempah pekat. Daging itik sawah dimasak berjam-jam hingga sangat empuk, meresap sempurna, dan disajikan hangat dalam bungkusan daun pisang harupat yang harum.",
    aroma: "Gurih Itik & Bumbu Habang",
    icon: "🦆",
    img: "/kuliner/Nasi_Itik_Gambut_Tenda_Biru.webp",
    location: "Gambut Tenda Biru",
    maps: "https://maps.google.com/?q=Nasi+Itik+Gambut+Tenda+Biru"
  },
  {
    id: "gangan-asam",
    title: "Gangan Asam Kepala Ikan",
    desc: "Sayur kuah kuning segar berpadu rasa asam alami dari potongan buah belimbing wuluh dan tomat liar. Kepala ikan haruan atau patin sungai dimasak dengan rempah kunyit dan kemiri menghasilkan kuah bening gurih menyegarkan.",
    aroma: "Segar Asam Belimbing",
    icon: "🐟",
    img: "/kuliner/Gangan_asam_kepala_ikan_di_Cempaka,_Banjarbaru.webp",
    location: "Rumah Makan Cempaka",
    maps: "https://maps.google.com/?q=Rumah+Makan+Cempaka+Banjarmasin"
  }
];

const wadaiCollection = [
  { name: "Bingka Kentang", tag: "Manis Legit & Lumer", img: "/kuliner/Bingka.webp" },
  { name: "Amparan Tatak", tag: "Krim Santan & Pisang", img: "/kuliner/Resep-Amparan-Tatak-Kue-Khas-Ban.webp" },
  { name: "Bingka Barandam", tag: "Siram Kuah Gula", img: "/kuliner/358-bingka-barandam-khas-banjar.webp" },
  { name: "Klepon Martapura", tag: "Lumer Gula Aren Asli", img: "/kuliner/klepon.webp" },
  { name: "Wadai Kararaban", tag: "Aroma Rempah Adas", img: "/kuliner/wadai-kararaban-khas-banjar-1756.webp" },
];

const olehOleh = [
  {
    title: "Mandai 'Daging Nabati'",
    desc: "Fermentasi kulit buah Cempedak yang diawetkan dengan garam. Saat digoreng, teksturnya berserat menyerupai daging sapi dengan rasa umami asam-gurih yang sangat adiktif.",
    img: "/kuliner/Screenshot_20241126_150106_Googl.webp",
    span: "col-span-1 md:col-span-2 row-span-2 h-[300px] md:h-auto",
  },
  {
    title: "Kerupuk Amplang",
    desc: "Camilan renyah berbahan dasar Ikan Pipih atau Tenggiri khas Banua.",
    img: "/kuliner/IMG-20251017-WA0002.webp",
    span: "col-span-1 row-span-1 h-[250px]",
  },
  {
    title: "Iwak Pakasam Basanga",
    desc: "Ikan fermentasi beras sangrai bumbu kunyit yang digoreng garing harum.",
    img: "/kuliner/Iwak_Pakasam_Basanga.webp",
    span: "col-span-1 row-span-1 h-[250px]",
  },
  {
    title: "Sambal Acan Raja Banjar",
    desc: "Terasi legendaris dipadu asam segar buah mangga/binjai khas rawa.",
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
            }
            @media (max-width: 640px) {
              @keyframes spinDrum {
                from { transform: translateZ(-350px) rotateY(0deg); }
                to { transform: translateZ(-350px) rotateY(-360deg); }
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
              ✦ GASTRONOMI OTENTIK BORNEO
            </span>
            <h1 className="hero-title !mb-3">
              Surga Cita Rasa <br className="hidden sm:inline" />
              <span className="text-sasirangan">Kota Seribu Sungai</span>
            </h1>
            <p className="hero-subtitle mx-auto !mb-6 !max-w-2xl px-2">
              Eksplorasi mahakarya kuliner dari warisan resep leluhur, disajikan hangat dengan sentuhan cinta dari dapur para *Acil* di tepian sungai.
            </p>
          </motion.div>
        </div>

        {/* 3D DRUM CAROUSEL (CSS MURNI - INFINITE SCROLL, NO LAG) */}
        <div className="w-full relative h-[280px] sm:h-[400px] md:h-[500px] flex justify-center items-center [perspective:1500px]">
          <div className="relative w-full h-full flex justify-center items-center drum-container">
            {/* Duplikasi array menjadi 10 item untuk membentuk silinder tertutup */}
            {[...galleryCards, ...galleryCards.slice(0, 2)].map((card, idx) => (
              <div 
                key={idx}
                className="drum-card absolute w-[140px] h-[200px] sm:w-[220px] sm:h-[320px] md:w-[300px] md:h-[450px]"
                // Rotasi dibagi 10 (36 derajat). Jarak (translateZ) otomatis diatur dari @keyframes wrapper (karena ini convex)
                style={{ 
                  transform: `rotateY(${idx * 36}deg) translateZ(clamp(350px, 40vw, 600px))` 
                }}
              >
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] relative bg-[var(--card-bg)]">
                  <img loading="lazy" decoding="async" src={card.img} alt={card.label} className="w-full h-full object-cover pointer-events-auto transform-gpu" />
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] sm:text-xs md:text-sm font-bold border border-white/20 inline-block">
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
            SECTION 1: INTERACTIVE SPOTLIGHT (MAHAKARYA GASTRONOMI)
            ========================================================= */}
        <section className="py-24 border-t border-[var(--glass-border)]">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 text-[var(--text-main)]">Mahakarya Gastronomi</h2>
            <p className="max-w-2xl mx-auto text-[var(--text-muted)] text-lg">Pilar utama kuliner Banua peninggalan pelaut dan saudagar abad pertengahan.</p>
          </div>

          <div className="bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--glass-border)] rounded-[2.5rem] p-6 md:p-10 shadow-xl">
            {/* Tabs Bar */}
            <div className="flex flex-wrap gap-3 mb-10 justify-center">
              {mainDishes.map((dish) => (
                <button
                  key={dish.id}
                  onClick={() => setActiveTab(dish)}
                  className={`px-6 py-3 rounded-full text-sm md:text-base font-bold transition-all duration-300 ${activeTab.id === dish.id ? 'bg-[#F4C038] text-[var(--martapura-deep)] shadow-[0_4px_20px_rgba(244,192,56,0.4)]' : 'bg-[var(--card-bg)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--glass-border)] border border-[var(--glass-border)]'}`}
                >
                  {dish.title}
                </button>
              ))}
            </div>

            {/* Content Showcase */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center"
              >
                <div className="w-full md:w-1/2 h-[350px] md:h-[450px] rounded-[2rem] overflow-hidden relative shadow-2xl group">
                  <img loading="lazy" decoding="async" src={activeTab.img} alt={activeTab.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 transform-gpu" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div>
                      <p className="text-white/80 text-sm font-bold uppercase tracking-wider mb-1">Paling Dicari</p>
                      <p className="text-white font-heading font-black text-2xl drop-shadow-md">{activeTab.location}</p>
                    </div>
                    <a href={activeTab.maps} target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-full bg-[#33C3B3] text-black flex items-center justify-center hover:bg-[#F4C038] transition-colors shadow-lg">
                      📍
                    </a>
                  </div>
                </div>

                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 bg-[#33C3B3]/20 border border-[#33C3B3]/40 px-4 py-2 rounded-full mb-6 w-fit">
                    <span className="text-lg">{activeTab.icon}</span>
                    <span className="text-[#33C3B3] font-bold text-sm">{activeTab.aroma}</span>
                  </div>
                  
                  <h3 className="text-4xl md:text-5xl font-black font-heading text-[var(--text-main)] mb-6 leading-tight">
                    {activeTab.title}
                  </h3>
                  
                  <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-8">
                    {activeTab.desc}
                  </p>
                  
                  <a href={activeTab.maps} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-[#F4C038] text-[#F4C038] font-bold rounded-full hover:bg-[#F4C038] hover:text-black transition-all group w-fit">
                    Telusuri Kedai Terbaik <span className="group-hover:translate-x-1 transition-transform">➔</span>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: HORIZONTAL SHOWCASE (41 WADAI BANJAR)
            ========================================================= */}
        <section className="py-24 border-t border-[var(--glass-border)]">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-[#F4C038] font-bold tracking-widest text-sm uppercase mb-2 block">Warisan Manis</span>
              <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 text-[var(--text-main)]">Khazanah Wadai Tradisional</h2>
              <p className="text-[var(--text-muted)] text-lg">
                Kue manis khas Banjar (disebut *Wadai*) tidak hanya sekadar hidangan penutup, melainkan warisan budaya bernilai filosofis tinggi berbalut legit santan dan gula aren. Berikut adalah deretan wadai terfavorit pilihan wisatawan.
              </p>
            </div>
          </div>

          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 snap-x snap-mandatory wadai-scroll hide-scrollbar px-4 sm:px-0">
            {wadaiCollection.map((wadai, idx) => (
              <div key={idx} className="min-w-[280px] sm:min-w-[320px] h-[400px] flex-shrink-0 snap-center relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-lg border border-[var(--glass-border)]">
                <img loading="lazy" decoding="async" src={wadai.img} alt={wadai.name} className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 transform-gpu" />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-white mb-3">
                    {wadai.tag}
                  </span>
                  <h3 className="text-2xl font-black font-heading text-white">{wadai.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================
            SECTION 3: TRADISI PASAR TERAPUNG (PARALLAX + CTA)
            ========================================================= */}
        <section className="py-24 border-t border-[var(--glass-border)]">
          <div className="relative w-full rounded-[3rem] overflow-hidden h-[500px] md:h-[600px] flex items-center shadow-lg border border-[var(--glass-border)]">
            <div className="absolute inset-0">
              <img loading="lazy" decoding="async" src="/wisata/960px-Pasar_Terapung_Siring_Banj.webp" alt="Pasar Terapung Lok Baintan" className="w-full h-full object-cover scale-105 transform-gpu" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            </div>

            <div className="relative z-10 p-8 md:p-16 max-w-2xl">
              <div className="bg-black/40 backdrop-blur-xl border border-white/20 p-8 md:p-12 rounded-[2.5rem] shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
                <span className="text-[#33C3B3] font-bold tracking-widest uppercase text-sm mb-4 block">Sarapan Pagi di Atas Jukung</span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white mb-6 leading-tight">
                  Eksotika <span className="text-[var(--sasirangan-gold)]">Pasar Terapung</span>
                </h2>
                <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-8">
                  Tinggalkan hiruk pikuk daratan. Di Sentra Kuliner Banua Anyar dan Pasar Terapung Lok Baintan, Anda tidak hanya membeli makanan, tapi membeli pengalaman magis menyantap hidangan hangat ditemani goyangan ombak sungai dan perahu kelotok yang melintas.
                </p>
                <a 
                  href="https://maps.google.com/?q=Sentra+Kuliner+Banua+Anyar+Banjarmasin" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[var(--sasirangan-gold)] text-black font-black rounded-full hover:bg-white hover:text-black transition-colors shadow-lg"
                >
                  📍 Navigasi ke Banua Anyar
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: ASYMMETRIC BENTO (OLEH-OLEH EKSTREM & LEGENDA)
            ========================================================= */}
        <section className="py-24 border-t border-[var(--glass-border)] mb-20">
          <div className="text-center mb-16">
            <span className="text-[#33C3B3] font-bold tracking-widest text-sm uppercase mb-2 block">Bawa Pulang Kenangan</span>
            <h2 className="text-4xl md:text-5xl font-heading font-black mb-4 text-[var(--text-main)]">Oleh-Oleh Tak Terlupakan</h2>
            <p className="max-w-2xl mx-auto text-[var(--text-muted)] text-lg">Cendera mata kuliner legendaris yang akan membangkitkan rindu Anda pada Kota Seribu Sungai.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 auto-rows-[auto]">
            {olehOleh.map((item, idx) => (
              <div key={idx} className={`${item.span} rounded-3xl overflow-hidden relative group shadow-lg border border-[var(--glass-border)]`}>
                <img loading="lazy" decoding="async" src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 absolute inset-0 transform-gpu" />
                <div className="relative h-full min-h-[250px] bg-gradient-to-t from-black/95 via-black/40 to-transparent p-6 md:p-8 flex flex-col justify-end">
                  <h3 className="text-2xl md:text-3xl font-black font-heading text-white mb-2">{item.title}</h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">{item.desc}</p>
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
