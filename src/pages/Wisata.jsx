import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import InteractiveMap from "../components/InteractiveMap";

const heroDestinations = [
  {
    id: "pasar-terapung",
    title: "Pasar Terapung",
    tag: "Subuh - Lok Baintan",
    location: "Lok Baintan, Kuin",
    image: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?fit=crop&w=800&q=75&fm=webp",
    badge: "Warisan Dunia",
    desc: "Pasar tradisional di atas perahu kelotok tempat para Acil bertransaksi sayur, buah, dan kuliner khas Banjar sejak fajar menyingsing.",
    heightClass: "h-[300px] lg:h-[360px] w-[130px] lg:w-[160px]",
  },
  {
    id: "siring-martapura",
    title: "Menara Pandang",
    tag: "24 Jam - Siring",
    location: "Menara Pandang, Siring",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?fit=crop&w=800&q=75&fm=webp",
    badge: "Landmark Kota",
    desc: "Kawasan terbuka hijau di tepian Sungai Martapura yang menjadi titik kumpul warga dan pusat susur sungai kelotok.",
    heightClass: "h-[380px] lg:h-[460px] w-[150px] lg:w-[185px]",
  },
  {
    id: "patung-bekantan",
    title: "Patung Bekantan",
    tag: "Ikon - Martapura",
    location: "Siring Sungai Martapura",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?fit=crop&w=800&q=75&fm=webp",
    badge: "Maskot Borneo",
    desc: "Monumen megah maskot satwa endemik Kalimantan Selatan yang menyemburkan air langsung ke arah Sungai Martapura.",
    heightClass: "h-[460px] lg:h-[540px] w-[170px] lg:w-[210px] shadow-[0_0_40px_rgba(244,192,56,0.25)]",
  },
  {
    id: "kampung-hijau",
    title: "Kampung Hijau",
    tag: "Sore - Sungai Bilu",
    location: "Sungai Bilu, Banjarmasin Timur",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=800&q=75&fm=webp",
    badge: "Wisata Tematik",
    desc: "Deretan rumah panggung tradisional yang dicat seragam berwarna hijau cerah menghadap sungai, menawarkan pemandangan visual estetik.",
    heightClass: "h-[380px] lg:h-[460px] w-[150px] lg:w-[185px]",
  },
  {
    id: "pulau-kembang",
    title: "Pulau Kembang",
    tag: "Pagi - Delta Barito",
    location: "Delta Sungai Barito",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=800&q=75&fm=webp",
    badge: "Konservasi",
    desc: "Pulau delta alami di tengah Sungai Barito yang menjadi habitat ratusan monyet ekor panjang serta kera hidung panjang (Bekantan).",
    heightClass: "h-[300px] lg:h-[360px] w-[130px] lg:w-[160px]",
  },
  {
    id: "masjid-suriansyah",
    title: "Masjid Sultan Suriansyah",
    tag: "Religi - Kuin Utara",
    location: "Kuin Utara, Banjarmasin Utara",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?fit=crop&w=800&q=75&fm=webp",
    badge: "Wisata Religi",
    desc: "Masjid bersejarah tertua di Kalimantan Selatan bergaya arsitektur tradisional Banjar dengan ukiran kaligrafi kayu ukir khas abadi.",
    heightClass: "h-[300px] lg:h-[360px] w-[130px] lg:w-[160px]",
  },
];

const itineraryRoadmap = [
  { time: "05:30 WIB", title: "Subuh Fajar di Lok Baintan", desc: "Menyaksikan serbuan ratusan perahu jukung tradisional yang bertransaksi hasil bumi saat matahari terbit.", icon: "sunrise", duration: "3 Jam", highlight: "Pasar Terapung" },
  { time: "08:30 WIB", title: "Sarapan Soto Banjar Autentik", desc: "Menikmati hangatnya kuah rempah Soto Banjar Bang Amat di tepian sungai ditemani petikan musik Panting.", icon: "food", duration: "1.5 Jam", highlight: "Kuliner Legendaris" },
  { time: "14:00 WIB", title: "Eksplorasi Menara Pandang & Siring", desc: "Berfoto di landmark Patung Bekantan dan melihat panorama 360 derajat Kota Banjarmasin dari puncak menara.", icon: "tower", duration: "2 Jam", highlight: "Ikon Kota" },
  { time: "17:00 WIB", title: "Senja di Kampung Hijau & Biru", desc: "Menyusuri permukiman tematik warna-warni di pesisir sungai sambil menikmati angin sore dan lampu tanglung.", icon: "house", duration: "2 Jam", highlight: "Wisata Kampung" },
];

const polaroidStories = [
  { name: "Rina & Keluarga", origin: "Wisatawan Jakarta", quote: "Pengalaman susur sungai paling berkesan! Acil kelotoknya sangat ramah, pantun madihinnya bikin tertawa sepanjang jalan.", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?fit=crop&w=600&q=75&fm=webp", rotate: "rotate-2 sm:rotate-3 hover:rotate-0" },
  { name: "Acil Imur", origin: "Pemandu Kelotok Resmi", quote: "Ayo dangsanak berataan naik kelotok kami! Keselamatan terjamin, rompi pelampung lengkap, dan rute dijamin puas.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?fit=crop&w=600&q=75&fm=webp", rotate: "-rotate-2 sm:-rotate-3 hover:rotate-0" },
  { name: "Budi Santoso", origin: "Wisatawan Surabaya", quote: "Pasar terapung Lok Baintan saat subuh benar-benar magis. Beli kue bingka langsung dari atas perahu jukung!", img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?fit=crop&w=600&q=75&fm=webp", rotate: "rotate-1 sm:rotate-2 hover:rotate-0" },
];

const heroHeroItems = heroDestinations.slice(0, 5);

const whyHighlights = [
  { emoji: "🛶", label: "Susur Sungai", desc: "1.000+ aliran sungai menjadi jalur wisata tak tertandingi di Nusantara", color: "#33C3B3" },
  { emoji: "🌅", label: "Pasar Subuh", desc: "Pasar terapung Lok Baintan aktif sejak abad ke-16 -- pengalaman tiada dua", color: "#F4C038" },
  { emoji: "🍜", label: "Kuliner Khas", desc: "Soto Banjar, Ketupat Kandangan, hingga Es Cendol legendaris Martapura", color: "#F97316" },
  { emoji: "🕌", label: "Heritage 1526", desc: "Jejak sejarah kerajaan Islam tertua Kalimantan di setiap sudut kota", color: "#A78BFA" },
];

export default function Wisata() {
  const [carouselItems, setCarouselItems] = useState(heroDestinations);

  const handleNext = () => {
    setCarouselItems(prev => {
      const newItems = [...prev];
      const first = newItems.shift();
      newItems.push(first);
      return newItems;
    });
  };

  const handlePrev = () => {
    setCarouselItems(prev => {
      const newItems = [...prev];
      const last = newItems.pop();
      newItems.unshift(last);
      return newItems;
    });
  };

  const handleThumbnailClick = (clickedItem) => {
    setCarouselItems(prev => {
      const idx = prev.findIndex(item => item.id === clickedItem.id);
      if (idx <= 0) return prev;
      return [...prev.slice(idx), ...prev.slice(0, idx)];
    });
  };

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    const targets = document.querySelectorAll(".wisata-reveal, .wisata-reveal-left, .wisata-reveal-right");
    if (!targets.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { entry.target.classList.add("in-view"); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.12 }
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      <section className="pt-28 sm:pt-32 pb-12 max-w-[1240px] mx-auto px-4 relative overflow-hidden">
        <div className="text-center max-w-4xl mx-auto mb-8 relative z-10 wisata-reveal">
          <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-2 font-heading">
            ✦ EKSPLORASI DESTINASI BORNEO
          </span>
          <h1 className="hero-title !mb-3">
            Jelajahi Pesona &amp; <br className="hidden sm:inline" />
            <span className="text-sasirangan">Wisata Seribu Sungai</span>
          </h1>
          <p className="hero-subtitle mx-auto !mb-6 !max-w-2xl px-2">
            Temukan pesona destinasi ikonik dari pasar terapung subuh hingga susur sungai Martapura dengan pesona bahari Borneo.
          </p>
        </div>
      </section>

      {/* =========================================================================
          STATIC FULL-WIDTH OVERLAPPING GALLERY (MENGECIL KE SAMPING)
          ========================================================================= */}
      <section className="w-full relative flex justify-center items-center overflow-hidden pb-20 pt-4 px-0">
          
          {/* Outer Left */}
          <div className="w-[16vw] h-[250px] sm:h-[350px] md:h-[450px] z-10 rounded-2xl md:rounded-3xl overflow-hidden relative brightness-50 shrink-0 shadow-lg hidden sm:block">
            <img src={heroDestinations[0].image} alt={heroDestinations[0].title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/90 via-black/20 to-transparent flex flex-col justify-end items-center text-center p-4">
              <span className="hidden lg:inline-block text-[#F4C038] text-[9px] md:text-[10px] font-bold tracking-widest uppercase mb-1 drop-shadow-md">
                {heroDestinations[0].tag}
              </span>
              <h3 className="text-sm md:text-lg font-black text-white font-heading leading-tight drop-shadow-lg">
                {heroDestinations[0].title}
              </h3>
            </div>
          </div>

          {/* Middle Left */}
          <div className="w-[21vw] h-[350px] sm:h-[450px] md:h-[550px] z-20 rounded-2xl md:rounded-3xl overflow-hidden relative brightness-75 shrink-0 shadow-xl hidden sm:block">
            <img src={heroDestinations[1].image} alt={heroDestinations[1].title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/90 via-black/20 to-transparent flex flex-col justify-end items-center text-center p-5">
              <span className="hidden lg:inline-block text-[#F4C038] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-md">
                {heroDestinations[1].tag}
              </span>
              <h3 className="text-base md:text-2xl font-black text-white font-heading leading-tight drop-shadow-lg">
                {heroDestinations[1].title}
              </h3>
            </div>
          </div>

          {/* Center (Main) */}
          <div className="w-[90vw] sm:w-[26vw] h-[450px] sm:h-[550px] md:h-[650px] z-30 rounded-2xl md:rounded-3xl overflow-hidden relative shadow-[0_20px_50px_rgba(0,0,0,0.6)] shrink-0">
            <img src={heroDestinations[2].image} alt={heroDestinations[2].title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/90 via-black/20 to-transparent flex flex-col justify-end items-center text-center p-6 sm:p-10">
              <span className="hidden lg:inline-block text-[#F4C038] text-xs md:text-sm font-bold tracking-widest uppercase mb-1 drop-shadow-md">
                {heroDestinations[2].tag}
              </span>
              <h3 className="text-3xl md:text-5xl font-black text-white font-heading leading-tight drop-shadow-lg">
                {heroDestinations[2].title}
              </h3>
            </div>
          </div>

          {/* Middle Right */}
          <div className="w-[21vw] h-[350px] sm:h-[450px] md:h-[550px] z-20 rounded-2xl md:rounded-3xl overflow-hidden relative brightness-75 shrink-0 shadow-xl hidden sm:block">
            <img src={heroDestinations[3].image} alt={heroDestinations[3].title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/90 via-black/20 to-transparent flex flex-col justify-end items-center text-center p-5">
              <span className="hidden lg:inline-block text-[#F4C038] text-[10px] md:text-xs font-bold tracking-widest uppercase mb-1 drop-shadow-md">
                {heroDestinations[3].tag}
              </span>
              <h3 className="text-base md:text-2xl font-black text-white font-heading leading-tight drop-shadow-lg">
                {heroDestinations[3].title}
              </h3>
            </div>
          </div>

          {/* Outer Right */}
          <div className="w-[16vw] h-[250px] sm:h-[350px] md:h-[450px] z-10 rounded-2xl md:rounded-3xl overflow-hidden relative brightness-50 shrink-0 shadow-lg hidden sm:block">
            <img src={heroDestinations[4].image} alt={heroDestinations[4].title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050B14]/90 via-black/20 to-transparent flex flex-col justify-end items-center text-center p-4">
              <span className="hidden lg:inline-block text-[#F4C038] text-[9px] md:text-[10px] font-bold tracking-widest uppercase mb-1 drop-shadow-md">
                {heroDestinations[4].tag}
              </span>
              <h3 className="text-sm md:text-lg font-black text-white font-heading leading-tight drop-shadow-lg">
                {heroDestinations[4].title}
              </h3>
            </div>
          </div>

        </section>

      {/* =========================================================================
          SECTION 2: MENGAPA HARUS BANJARMASIN (Container Layout, No Image)
          ========================================================================= */}
      <section className="py-16 sm:py-24 max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="wisata-reveal bg-gradient-to-br from-[#091422] to-[#0f2438] rounded-[32px] sm:rounded-[40px] border border-[var(--glass-border)] p-8 sm:p-12 lg:p-16 relative shadow-2xl flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 blur-[80px] rounded-full pointer-events-none" />

          {/* Left Text */}
          <div className="relative z-10 w-full lg:w-5/12 text-left">
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-4">
              ✦ Mengapa Harus Banjarmasin
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-heading leading-tight mb-6">
              Kota yang Tak Pernah <br className="hidden lg:block" />
              <span className="text-[#F4C038]">Bisa Dilupakan</span>
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-body leading-relaxed mb-8 max-w-md">
              Dari fajar di atas perahu hingga senja di tepian sungai -- setiap sudut kota ini menawarkan cerita dan pesona budaya bahari yang berbeda.
            </p>
          </div>

          {/* Right Cards */}
          <div className="relative z-10 w-full lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {whyHighlights.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 hover:bg-white/10 hover:border-[#F4C038]/30 transition-all duration-300 hover:-translate-y-1 shadow-lg"
              >
                <div className="text-3xl mb-3">{item.emoji}</div>
                <h3 className="font-black text-sm sm:text-base font-heading mb-2" style={{ color: item.color }}>
                  {item.label}
                </h3>
                <p className="text-white/60 text-[11px] sm:text-xs font-body leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: BACKDROP SHOWCASE - TRULY FULL WIDTH (Edge-to-Edge)
          ========================================================================= */}
      <div className="wisata-reveal w-full relative min-h-[600px] sm:min-h-[700px] lg:min-h-[800px] overflow-hidden flex flex-col justify-between py-10 sm:py-16 mt-8 sm:mt-16">
        {(() => {
          const activeShowcase = carouselItems[0];
          const thumbnails = carouselItems.slice(1);
          return (
            <>
              {/* Full Viewport Background Image */}
              <div className="absolute inset-0 z-0 transition-opacity duration-700">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeShowcase.image}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    src={activeShowcase.image}
                    alt={activeShowcase.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>
              <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#050B14]/90 via-[#091422]/60 to-transparent pointer-events-none" />
              <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#050B14]/95 via-black/20 to-black/30 pointer-events-none" />

              {/* Constrained Content Wrapper */}
              <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-end flex-1 relative z-10 pt-16 sm:pt-20 pb-8 sm:pb-12 h-full">
                
                {/* Left Text Content */}
                <div className="w-full lg:w-5/12 flex flex-col justify-center lg:justify-end flex-1 mb-8 lg:mb-0 wisata-reveal-left">
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <span className="w-8 sm:w-12 h-[3px] bg-white" />
                    <span className="text-white font-bold text-xs sm:text-sm tracking-[0.2em] uppercase font-heading drop-shadow">
                      {activeShowcase.location}
                    </span>
                  </div>
                  
                  <h2 className="text-3xl sm:text-5xl lg:text-7xl font-black text-white capitalize tracking-tight font-heading leading-tight mb-3 sm:mb-6 drop-shadow-2xl">
                    {activeShowcase.title}
                  </h2>
                  
                  <p className="text-xs sm:text-base text-slate-200 font-body leading-relaxed mb-5 sm:mb-10 drop-shadow-md max-w-md">
                    {activeShowcase.desc}
                  </p>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex gap-3">
                      <button 
                        onClick={handlePrev}
                        className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all text-white backdrop-blur-sm"
                      >
                        <span className="text-lg">←</span>
                      </button>
                      <button 
                        onClick={handleNext}
                        className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center hover:bg-white/10 hover:border-white transition-all text-white backdrop-blur-sm"
                      >
                        <span className="text-lg">→</span>
                      </button>
                    </div>
                    
                    <a
                      href={`https://wa.me/6281234567890?text=Halo%20Acil%20Travel,%20mau%20pesan%20tur%20ke%20${encodeURIComponent(activeShowcase.title)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 bg-transparent border border-white hover:bg-white hover:text-black text-white font-bold text-xs px-6 py-3 rounded-full transition-all uppercase tracking-widest"
                    >
                      Discover Location
                    </a>
                  </div>
                </div>

                {/* Right Bottom Thumbnails (Slider Cards) */}
                <div className="w-full lg:w-7/12 flex items-end justify-start lg:justify-end overflow-hidden pb-4">
                  <div className="flex gap-4 sm:gap-5 overflow-x-auto lg:overflow-visible scrollbar-none pb-4 lg:pb-0 px-2 min-w-full lg:min-w-0">
                    <AnimatePresence>
                      {thumbnails.map((dest, idx) => (
                        <motion.div
                          key={dest.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.2 }}
                          onClick={() => handleThumbnailClick(dest)}
                          className="w-[100px] sm:w-[150px] lg:w-[170px] h-[140px] sm:h-[200px] lg:h-[230px] flex-shrink-0 rounded-xl sm:rounded-2xl overflow-hidden relative cursor-pointer group shadow-xl border border-white/10"
                        >
                          <img
                            src={dest.image}
                            alt={dest.title}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                          <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 text-left">

                            <h4 className="text-xs sm:text-base font-black text-white font-heading leading-tight capitalize">
                              {dest.title}
                            </h4>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </>
          );
        })()}
      </div>

      {/* Peta Interaktif Wisata Banjarmasin */}
      <InteractiveMap />

      <section className="py-20 max-w-[1240px] mx-auto px-4 border-t border-[var(--glass-border)]">
        <div className="text-center max-w-3xl mx-auto mb-16 wisata-reveal">
          <span className="text-xs font-black uppercase tracking-widest text-[#33C3B3] font-heading block mb-2">ITINERARI RUTE SERIBU SUNGAI</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-main)] font-heading mb-3">Jelajahi Alur <span className="text-[#F4C038]">Waktu Borneo</span></h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body">Simulasi rekomendasi perjalanan satu hari penuh menyusuri urat nadi perairan Kota Banjarmasin dengan kelotok wisata.</p>
        </div>
        <div className="relative max-w-4xl mx-auto pl-6 sm:pl-10 space-y-10 before:content-[''] before:absolute before:left-2 sm:before:left-4 before:top-4 before:bottom-4 before:w-[2px] before:bg-gradient-to-b before:from-[#F4C038] before:via-[#008075] before:to-[#33C3B3]">
          {itineraryRoadmap.map((item, idx) => (
            <div key={idx} className="relative group wisata-reveal">
              <div className="absolute -left-6 sm:-left-10 top-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[var(--card-bg)] border-2 border-[#F4C038] flex items-center justify-center text-sm shadow-[0_0_15px_rgba(244,192,56,0.4)] z-10 group-hover:scale-110 transition-transform">
                {idx + 1}
              </div>
              <div className="bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl p-6 sm:p-8 ml-3 sm:ml-6 hover:border-[#F4C038]/50 transition-all shadow-lg group-hover:-translate-y-1">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="bg-[#F4C038]/15 text-[#F4C038] font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider">{item.time} ({item.duration})</span>
                  <span className="text-xs font-bold text-[#33C3B3] uppercase">{item.highlight}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-[var(--text-main)] font-heading mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20 max-w-[1240px] mx-auto px-4 border-t border-[var(--glass-border)]">
        <div className="text-center max-w-3xl mx-auto mb-16 wisata-reveal">
          <span className="text-xs font-black uppercase tracking-widest text-[#F4C038] font-heading block mb-2">CERITA WISATAWAN &amp; SENYUM ACIL</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--text-main)] font-heading mb-3">Momen Hangat di <span className="text-[#33C3B3]">Atas Kelotok</span></h2>
          <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body">Pengalaman autentik penuh kehangatan dari para penjelajah bahari bersama pemandu lokal berlisensi.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {polaroidStories.map((story, idx) => (
            <div key={idx} className={`wisata-reveal bg-white p-5 rounded-2xl shadow-2xl transition-all duration-300 transform ${story.rotate} text-slate-900 border-4 border-white`}>
              <div className="h-52 rounded-xl overflow-hidden mb-4 relative bg-slate-200 shadow-inner">
                <img src={story.img} alt={story.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                <span className="absolute bottom-2 right-2 bg-[#008075] text-white font-black text-[9px] px-2.5 py-0.5 rounded shadow uppercase">Verified Acil Tour</span>
              </div>
              <p className="text-xs font-body italic text-slate-700 leading-relaxed mb-4">"{story.quote}"</p>
              <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black font-heading text-slate-900">{story.name}</h4>
                  <span className="text-[10px] text-slate-500 font-semibold">{story.origin}</span>
                </div>
                <div className="text-amber-500 text-sm">*****</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}