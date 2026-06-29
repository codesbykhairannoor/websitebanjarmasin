import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Data for masonry grid
const column1Images = [
  "/profil kota/LOGO KOTA BANJARMASIN - 328 KB.webp",
  "/sejarah/banjarmasin baiman.webp",
  "/wisata/menara tugu pal 0.webp",
  "/wisata/960px-Masjid_Raya_Sabilal_Muhtad.webp"
];

const column2Images = [
  "/profil kota/sungai.webp",
  "/wisata/960px-Menara_Pandang_Banjarmasin.webp",
  "/wisata/960px-Taman_Siring_Banjarmasin.webp",
  "/wisata/960px-Monumen_Patung_Bekantan_Ba.webp"
];

// We don't need JS duplication, we will duplicate DOM nodes for true seamless marquee

const AnimatedStat = ({ value, label, suffix="", inline=false }) => {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const duration = 2000;
        const startTime = performance.now();
        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          setCount(Math.floor(progress * value));
          if (progress < 1) requestAnimationFrame(updateCount);
        };
        requestAnimationFrame(updateCount);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  if (inline) {
    return <span ref={ref}>{count.toLocaleString('id-ID')}{suffix}</span>;
  }

  return (
    <div ref={ref} className="text-center p-6 sm:p-8 border border-[var(--glass-border)] rounded-3xl bg-[var(--card-bg)] backdrop-blur-md shadow-lg hover:border-[#F4C038]/50 transition-colors duration-500 group">
      <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#F4C038] font-heading mb-2 group-hover:scale-105 transition-transform duration-500">
        {count.toLocaleString('id-ID')}{suffix}
      </h3>
      <p className="text-xs sm:text-sm text-[var(--text-main)] font-bold uppercase tracking-widest">{label}</p>
    </div>
  );
};


export default function ProfilKota() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      <style>{`
        :root {
          --marquee-gap: 1rem;
        }
        @keyframes scrollUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(calc(-100% - var(--marquee-gap))); }
        }
        @keyframes scrollDown {
          0% { transform: translateY(calc(-100% - var(--marquee-gap))); }
          100% { transform: translateY(0); }
        }
        .marquee-col {
          display: flex;
          flex-direction: column;
          gap: var(--marquee-gap);
          overflow: hidden;
        }
        .marquee-content-up {
          display: flex;
          flex-direction: column;
          gap: var(--marquee-gap);
          animation: scrollUp 20s linear infinite;
        }
        .marquee-content-down {
          display: flex;
          flex-direction: column;
          gap: var(--marquee-gap);
          animation: scrollDown 20s linear infinite;
        }
        .hover-pause:hover .marquee-content-up,
        .hover-pause:hover .marquee-content-down {
          animation-play-state: paused;
        }
      `}</style>

      {/* =========================================================
          HERO SECTION: STREAMA STYLE (PARALLAX MARQUEE)
          ========================================================= */}
      <section className="relative w-full h-[100vh] min-h-[700px] flex items-center overflow-hidden pt-20">
        
        {/* Left Half: Marquee Grid (Full Bleed on Desktop) */}
        <div className="absolute left-0 top-0 w-full lg:w-[55vw] h-full lg:h-[120%] lg:-top-[10%] flex justify-center gap-4 lg:gap-8 opacity-40 lg:opacity-100 z-0 lg:z-10">
          
          {/* Awan / Fade Overlays (Top, Bottom, and Right side) */}
          <div className="absolute top-0 left-0 w-full h-[20vh] lg:h-[25vh] bg-gradient-to-b from-[var(--martapura-night)] to-transparent z-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-full h-[20vh] lg:h-[25vh] bg-gradient-to-t from-[var(--martapura-night)] to-transparent z-20 pointer-events-none" />
          
          {/* Desktop Right Fade (Blends to text side) */}
          <div className="absolute top-0 right-0 w-[20vw] lg:w-[25vw] h-full bg-gradient-to-l from-[var(--martapura-night)] via-[var(--martapura-night)]/80 to-transparent z-20 pointer-events-none hidden lg:block" />
          
          {/* Mobile Overlay (For text readability) */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--martapura-night)] via-[var(--martapura-night)]/80 to-transparent z-20 pointer-events-none lg:hidden" />

          {/* Column 1 (Scrolls Up) */}
          <div className="w-[140px] sm:w-[180px] lg:w-[280px] marquee-col hover-pause pt-10 lg:pt-20 pointer-events-auto relative z-10">
            <div className="marquee-content-up shrink-0">
              {column1Images.map((img, i) => (
                <div key={`c1-a-${i}`} className="w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] h-[200px] sm:h-[260px] lg:h-[400px] cursor-pointer hover:border-[#F4C038] transition-colors">
                  <img src={img} className="w-full h-full object-cover" alt="Banjarmasin" loading="lazy" />
                </div>
              ))}
            </div>
            <div aria-hidden="true" className="marquee-content-up shrink-0">
              {column1Images.map((img, i) => (
                <div key={`c1-b-${i}`} className="w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] h-[200px] sm:h-[260px] lg:h-[400px] cursor-pointer hover:border-[#F4C038] transition-colors">
                  <img src={img} className="w-full h-full object-cover" alt="Banjarmasin" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Column 2 (Scrolls Down) */}
          <div className="w-[140px] sm:w-[180px] lg:w-[280px] marquee-col hover-pause pointer-events-auto relative z-10">
            <div className="marquee-content-down shrink-0">
              {column2Images.map((img, i) => (
                <div key={`c2-a-${i}`} className="w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] h-[200px] sm:h-[260px] lg:h-[400px] cursor-pointer hover:border-[#33C3B3] transition-colors">
                  <img src={img} className="w-full h-full object-cover" alt="Banjarmasin" loading="lazy" />
                </div>
              ))}
            </div>
            <div aria-hidden="true" className="marquee-content-down shrink-0">
              {column2Images.map((img, i) => (
                <div key={`c2-b-${i}`} className="w-full rounded-3xl overflow-hidden shadow-2xl border border-[var(--glass-border)] h-[200px] sm:h-[260px] lg:h-[400px] cursor-pointer hover:border-[#33C3B3] transition-colors">
                  <img src={img} className="w-full h-full object-cover" alt="Banjarmasin" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Half: Typography (Constrained inside max-w) */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 w-full h-full flex justify-end items-center relative z-20 pointer-events-none">
          
          <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left h-full lg:h-auto pointer-events-auto mb-10 lg:mb-0 lg:pl-16">
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-2 font-heading">
              ✦ Profil Pemerintahan
            </span>
            <h1 className="hero-title !mb-3">
              Banjarmasin <span className="text-sasirangan">Baiman.</span>
            </h1>
            <p className="hero-subtitle mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0">
              Mengenal lebih dekat "Kota Seribu Sungai". Membedah visi, misi, sejarah, dan nilai-nilai "Kayuh Baimbai" yang menjadi landasan pemerintahan kota tertua di Kalimantan ini.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button className="bg-[#F4C038] hover:bg-amber-400 text-[#091422] font-black px-8 py-4 rounded-full shadow-[0_0_20px_rgba(244,192,56,0.3)] transition-transform hover:-translate-y-1 w-full sm:w-auto text-sm sm:text-base">
                Eksplorasi Visi
              </button>
              <Link to="/sejarah" className="bg-[var(--card-bg)] backdrop-blur-md border border-[var(--glass-border)] hover:bg-[var(--text-main)] hover:text-[var(--martapura-deep)] text-[var(--text-main)] font-black px-8 py-4 rounded-full transition-all w-full sm:w-auto text-sm sm:text-base text-center">
                Sejarah Kota
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 1: NAKHODA KOTA (CENTERED LEADERS WITH SIDE BIO)
          ========================================================= */}
      <section className="py-24 bg-[var(--bg-main)] relative overflow-hidden border-t border-[var(--glass-border)]">
        {/* Background Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#F4C038]/10 to-[#33C3B3]/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="text-center mb-16 relative z-10 px-4">
          <span className="text-[#F4C038] font-bold tracking-[0.3em] uppercase text-xs mb-2 drop-shadow-md block">Periode 2025 - 2030</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--text-main)] font-heading leading-tight">
            Nakhoda <span className="text-[#33C3B3]">Kota</span>
          </h2>
          <p className="text-[var(--text-muted)] font-body max-w-2xl mx-auto mt-4">
            Kepemimpinan kolaboratif yang membawa Banjarmasin melangkah pasti menuju masa depan Baiman (Barasih wan Nyaman).
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
          
          {/* DESKTOP VIEW (Large screens): Left Bio - Center Photos - Right Bio */}
          <div className="hidden lg:grid grid-cols-12 gap-8 items-center">
            
            {/* Left Bio: H. Muh. Yamin HR */}
            <div className="col-span-3 bg-[var(--card-bg)] backdrop-blur-md border border-[var(--glass-border)] hover:border-[#F4C038] rounded-3xl p-6 shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-[#F4C038]/20 text-[#F4C038] border border-[#F4C038]/40 font-bold text-xs uppercase tracking-wider mb-4">
                Wali Kota
              </span>
              <h3 className="text-2xl font-black text-[var(--text-main)] font-heading mb-2">
                H. Muh. Yamin HR
              </h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
                Memimpin dengan visi tata kelola sungai terpadu, penataan ruang publik modern, serta menghadirkan pelayanan birokrasi yang tanggap dan dekat dengan masyarakat.
              </p>
              <div className="space-y-2 border-t border-[var(--glass-border)] pt-4 text-xs font-semibold text-[var(--text-main)]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F4C038]" /> Tata Kelola Sungai Berkelanjutan
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F4C038]" /> Digitalisasi Pelayanan Publik
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F4C038]" /> Pembangunan Infrastruktur Baiman
                </div>
              </div>
            </div>

            {/* Center Photos: Yamin & Ananda side-by-side */}
            <div className="col-span-6 flex justify-center items-center gap-4 xl:gap-6 px-2">
              
              {/* Photo 1: Wali Kota */}
              <div className="relative w-1/2 max-w-[260px] xl:max-w-[280px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#F4C038]/50 group hover:border-[#F4C038] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(244,192,56,0.25)]">
                <img 
                  loading="lazy" 
                  src="/profil kota/Wali_Kota_Banjarmasin_Muhammad_Y-1.webp" 
                  alt="H. Muh. Yamin HR - Wali Kota Banjarmasin" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute bottom-4 left-0 right-0 text-center px-2">
                  <p className="text-white font-black text-sm md:text-base tracking-wide drop-shadow-md">H. Muh. Yamin HR</p>
                  <p className="text-[#F4C038] font-bold text-[10px] uppercase tracking-widest mt-0.5">Wali Kota</p>
                </div>
              </div>

              {/* Photo 2: Wakil Wali Kota */}
              <div className="relative w-1/2 max-w-[260px] xl:max-w-[280px] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#33C3B3]/50 group hover:border-[#33C3B3] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_15px_35px_rgba(51,195,179,0.25)]">
                <img 
                  loading="lazy" 
                  src="/profil kota/Wakil_Wali_Kota_Banjarmasin_Anan.webp" 
                  alt="Hj. Ananda - Wakil Wali Kota Banjarmasin" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                <div className="absolute bottom-4 left-0 right-0 text-center px-2">
                  <p className="text-white font-black text-sm md:text-base tracking-wide drop-shadow-md">Hj. Ananda</p>
                  <p className="text-[#33C3B3] font-bold text-[10px] uppercase tracking-widest mt-0.5">Wakil Wali Kota</p>
                </div>
              </div>

            </div>

            {/* Right Bio: Hj. Ananda */}
            <div className="col-span-3 bg-[var(--card-bg)] backdrop-blur-md border border-[var(--glass-border)] hover:border-[#33C3B3] rounded-3xl p-6 shadow-xl transition-all duration-300 transform hover:-translate-y-1 text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-[#33C3B3]/20 text-[#33C3B3] border border-[#33C3B3]/40 font-bold text-xs uppercase tracking-wider mb-4">
                Wakil Wali Kota
              </span>
              <h3 className="text-2xl font-black text-[var(--text-main)] font-heading mb-2">
                Hj. Ananda
              </h3>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
                Mengawal pemberdayaan ekonomi kreatif lokal, peningkatan kualitas sumber daya manusia, perlindungan perempuan & anak, serta akselerasi UMKM berdaya saing tinggi.
              </p>
              <div className="space-y-2 border-t border-[var(--glass-border)] pt-4 text-xs font-semibold text-[var(--text-main)]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#33C3B3]" /> Akselerasi UMKM & Ekonomi Kreatif
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#33C3B3]" /> Pemberdayaan Perempuan & Anak
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#33C3B3]" /> Peningkatan SDM Generasi Cerdas
                </div>
              </div>
            </div>

          </div>

          {/* MOBILE & TABLET VIEW (< Large screens): Interactive Showcase Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:hidden">
            
            {/* Wali Kota Mobile Card */}
            <div className="bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="relative w-48 sm:w-44 aspect-[3/4] rounded-2xl overflow-hidden shrink-0 shadow-lg border border-[#F4C038]/50">
                <img 
                  loading="lazy" 
                  src="/profil kota/Wali_Kota_Banjarmasin_Muhammad_Y-1.webp" 
                  alt="H. Muh. Yamin HR" 
                  className="w-full h-full object-cover object-top" 
                />
              </div>
              <div className="flex-1">
                <span className="inline-block px-3 py-1 rounded-full bg-[#F4C038]/20 text-[#F4C038] font-bold text-xs uppercase tracking-wider mb-2">
                  Wali Kota
                </span>
                <h3 className="text-2xl font-black text-[var(--text-main)] font-heading mb-3">
                  H. Muh. Yamin HR
                </h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">
                  Fokus pada tata kelola sungai terpadu, infrastruktur berkelanjutan, dan pelayanan birokrasi yang responsif terhadap warga.
                </p>
                <div className="space-y-1.5 text-xs font-semibold text-[var(--text-main)]">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F4C038]" /> Tata Kelola Sungai Terpadu
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F4C038]" /> Birokrasi Responsif & Cepat
                  </div>
                </div>
              </div>
            </div>

            {/* Wakil Wali Kota Mobile Card */}
            <div className="bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="relative w-48 sm:w-44 aspect-[3/4] rounded-2xl overflow-hidden shrink-0 shadow-lg border border-[#33C3B3]/50">
                <img 
                  loading="lazy" 
                  src="/profil kota/Wakil_Wali_Kota_Banjarmasin_Anan.webp" 
                  alt="Hj. Ananda" 
                  className="w-full h-full object-cover object-top" 
                />
              </div>
              <div className="flex-1">
                <span className="inline-block px-3 py-1 rounded-full bg-[#33C3B3]/20 text-[#33C3B3] font-bold text-xs uppercase tracking-wider mb-2">
                  Wakil Wali Kota
                </span>
                <h3 className="text-2xl font-black text-[var(--text-main)] font-heading mb-3">
                  Hj. Ananda
                </h3>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4">
                  Mengawal ekosistem ekonomi kreatif berdaya saing, pembedayaan perempuan, dan akselerasi UMKM untuk generasi masa depan.
                </p>
                <div className="space-y-1.5 text-xs font-semibold text-[var(--text-main)]">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#33C3B3]" /> Ekonomi Kreatif & UMKM
                  </div>
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#33C3B3]" /> Pemberdayaan Perempuan & SDM
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================
          SECTION 2: FILOSOFI KAYUH BAIMBAI (HORIZONTAL ACCORDION)
          ========================================================= */}
      <section className="relative py-24 bg-[var(--bg-main)] flex flex-col justify-center items-center border-t border-[var(--glass-border)]">
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 w-full text-center mb-16">
          <span className="text-[#33C3B3] font-bold text-xs sm:text-sm tracking-[0.3em] uppercase font-heading mb-4 block drop-shadow-md">
            Filosofi Pembangunan
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-[var(--text-main)] font-heading mb-6 leading-tight">
            Semangat <span className="text-[#F4C038]">Kayuh Baimbai</span>
          </h2>
          <p className="text-base md:text-lg text-[var(--text-muted)] font-body leading-relaxed max-w-3xl mx-auto">
            "Mendayung bersama-sama". Sebuah filosofi leluhur Suku Banjar yang mengakar pada interaksi sosial sungai, kini menjadi fondasi kolaborasi interaktif warga dan pemerintah mewujudkan <strong>Banjarmasin Baiman</strong>.
          </p>
        </div>

        {/* The Pillars (Gotong Royong Synergy - Horizontal Accordion) */}
        <div className="relative z-20 max-w-[1400px] w-full mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-auto lg:h-[450px]">
            {[
              { id: "01", title: "Karakter", desc: "Membangun generasi tangguh yang sehat dan cerdas secara spiritual maupun intelektual.", color: "text-[#F4C038]", borderHover: "hover:border-[#F4C038]" },
              { id: "02", title: "Pelayanan", desc: "Digitalisasi birokrasi pemerintahan untuk pelayanan publik yang cepat, transparan, dan inklusif.", color: "text-[#33C3B3]", borderHover: "hover:border-[#33C3B3]" },
              { id: "03", title: "Ekonomi", desc: "Menciptakan ekosistem usaha lokal yang berdaya saing global melalui ekonomi kreatif.", color: "text-[#F4C038]", borderHover: "hover:border-[#F4C038]" },
              { id: "04", title: "Lingkungan", desc: "Tata kelola sungai dan alam terpadu untuk memastikan keberlanjutan ekosistem delta.", color: "text-[#33C3B3]", borderHover: "hover:border-[#33C3B3]" }
            ].map((pillar, idx) => (
              <div 
                key={idx} 
                className={`relative flex-1 lg:hover:flex-[2.5] transition-all duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)] group rounded-3xl lg:rounded-[40px] border border-[var(--glass-border)] bg-[var(--card-bg)] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl flex flex-col justify-end p-6 lg:p-10 min-h-[160px] lg:min-h-0 ${pillar.borderHover}`}
              >
                {/* Large Background ID */}
                <div className="absolute -bottom-6 -right-4 lg:-bottom-10 lg:-right-6 text-[8rem] lg:text-[12rem] font-black text-[var(--text-main)] opacity-5 group-hover:opacity-10 transition-opacity duration-500 font-heading pointer-events-none select-none leading-none">
                  {pillar.id}
                </div>
                
                <div className="relative z-10 w-full lg:w-[400px]">
                  <h4 className={`text-2xl lg:text-3xl font-black font-heading mb-2 md:mb-4 ${pillar.color} drop-shadow-sm`}>
                    {pillar.title}
                  </h4>
                  <p className="text-[var(--text-muted)] font-body text-sm lg:text-base leading-relaxed opacity-100 lg:opacity-0 lg:translate-y-4 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3: ASYMMETRIC CITY DASHBOARD (GEO & DEMO)
          ========================================================= */}
      <section className="relative py-24 bg-[var(--bg-main)] border-t border-[var(--glass-border)] overflow-hidden">
        {/* Abstract River Flow SVG Background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center">
           <svg viewBox="0 0 1000 300" className="w-full h-full stroke-[#33C3B3] stroke-[1] fill-transparent">
             <path d="M0,150 Q150,50 300,150 T600,150 T900,150 T1200,150" />
             <path d="M0,170 Q150,70 300,170 T600,170 T900,170 T1200,170" opacity="0.5" />
           </svg>
        </div>
        
        <div className="max-w-[1400px] mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-[#F4C038] font-bold text-xs tracking-widest uppercase font-heading block mb-2">Kanvas Data Kota</span>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
              Anatomi <span className="text-[#33C3B3]">Kota Delta</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">
            
            {/* Center Massive Card (Population) */}
            <div className="lg:col-span-8 lg:row-span-2 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[40px] p-8 md:p-12 relative overflow-hidden group shadow-lg flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#F4C038]/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-[#F4C038]/10 transition-colors duration-700" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#F4C038]/20 flex items-center justify-center text-2xl">👥</div>
                  <span className="text-[#F4C038] font-bold tracking-widest uppercase text-sm">Demografi Penduduk (2024)</span>
                </div>
                <h3 className="text-6xl md:text-8xl lg:text-9xl font-black text-[var(--text-main)] font-heading leading-none mb-4 flex items-baseline">
                  <AnimatedStat value={679} label="" suffix="+" inline /> 
                  <span className="text-2xl md:text-4xl text-[var(--text-muted)] ml-2 inline-block">Ribu Jiwa</span>
                </h3>
                <p className="text-lg md:text-xl text-[var(--text-muted)] font-body max-w-xl">
                  Dengan <strong>67% populasi berada di usia produktif</strong>, Banjarmasin memiliki fondasi SDM yang kuat untuk menggerakkan roda ekonomi regional.
                </p>
              </div>
            </div>

            {/* Top Right Card (Elevasi) */}
            <div className="lg:col-span-4 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[40px] p-8 shadow-lg flex flex-col justify-center hover:border-[#33C3B3]/50 transition-colors group">
              <div className="text-5xl mb-4 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all">🌊</div>
              <h4 className="text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading mb-1">-0.16m</h4>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">Rata-rata Di Bawah Permukaan Laut</p>
            </div>

            {/* Middle Right Card (Islands) */}
            <div className="lg:col-span-4 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[40px] p-8 shadow-lg flex flex-col justify-center hover:border-[#33C3B3]/50 transition-colors group">
              <div className="text-5xl mb-4 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all">🏝️</div>
              <h4 className="text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading mb-1">25+ Delta</h4>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">Kepulauan Kecil Pembentuk Kota</p>
            </div>

            {/* Bottom Row - Admin Data */}
            <div className="lg:col-span-6 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[40px] p-8 shadow-lg flex items-center gap-6 group hover:border-[#F4C038]/50 transition-colors">
              <div className="w-20 h-20 shrink-0 rounded-full bg-[#33C3B3]/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">🏛️</div>
              <div>
                <h4 className="text-4xl font-black text-[var(--text-main)] font-heading mb-1">5</h4>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">Kecamatan Administratif</p>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[40px] p-8 shadow-lg flex items-center gap-6 group hover:border-[#F4C038]/50 transition-colors">
              <div className="w-20 h-20 shrink-0 rounded-full bg-[#F4C038]/10 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">🏘️</div>
              <div>
                <h4 className="text-4xl font-black text-[var(--text-main)] font-heading mb-1">52</h4>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-bold">Kelurahan Tersebar</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 4: LAMBANG KOTA (RADIAL CIRCULAR LAYOUT)
          ========================================================= */}
      <section className="py-24 bg-[var(--bg-main)] border-t border-[var(--glass-border)] relative overflow-hidden">
        <div className="text-center mb-16 px-4">
          <span className="text-[#F4C038] font-bold text-xs tracking-widest uppercase font-heading block mb-2">Identitas Visual</span>
          <h2 className="text-4xl md:text-5xl font-black text-[var(--text-main)] font-heading">
            Lambang <span className="text-[#33C3B3]">Daerah</span>
          </h2>
        </div>

        <div className="max-w-[1200px] mx-auto px-4">
          <div className="relative w-full h-auto lg:h-[700px] flex flex-col lg:block items-center justify-center gap-6">
            
            {/* Center Emblem */}
            <div className="relative w-48 h-64 md:w-56 md:h-72 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 z-20 group flex justify-center items-center">
              <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-700 flex justify-center items-center">
                 <img loading="lazy" src="/profil kota/LOGO KOTA BANJARMASIN - 328 KB.webp" alt="Lambang Kota Banjarmasin" className="w-full h-auto object-contain drop-shadow-[0_0_30px_rgba(244,192,56,0.4)]" />
              </div>
            </div>

            {/* Circular Items */}
            {[
              { id: 1, title: "Bentuk Perisai", desc: "Persatuan kuat Dayak & Banjar.", icon: "🛡️", pos: "lg:top-0 lg:left-1/2 lg:-translate-x-1/2" },
              { id: 2, title: "Warna Emas", desc: "Simbol kejayaan & kesuburan.", icon: "✨", pos: "lg:top-[15%] lg:right-0 lg:translate-x-4" },
              { id: 3, title: "Bubungan Tinggi", desc: "Ikon arsitektur khas Banjar.", icon: "🏛️", pos: "lg:bottom-[15%] lg:right-0 lg:translate-x-4" },
              { id: 4, title: "Perahu Tambangan", desc: "Urat nadi ekonomi perairan.", icon: "🛶", pos: "lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2" },
              { id: 5, title: "Daun Nipah", desc: "Kemandirian dari alam rawa.", icon: "🌿", pos: "lg:bottom-[15%] lg:left-0 lg:-translate-x-4" },
              { id: 6, title: "Kayuh Baimbai", desc: "Semangat gotong royong.", icon: "🚣", pos: "lg:top-[15%] lg:left-0 lg:-translate-x-4" }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className={`lg:absolute w-full sm:w-80 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[32px] p-6 shadow-xl hover:shadow-[0_0_30px_rgba(51,195,179,0.3)] hover:border-[#33C3B3] transition-all duration-500 z-10 flex items-center gap-4 ${item.pos}`}
              >
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-[var(--bg-main)] border border-[var(--glass-border)] flex items-center justify-center text-2xl shadow-inner">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-[var(--text-main)] font-heading mb-1">{item.title}</h3>
                  <p className="text-[var(--text-muted)] font-body text-sm leading-snug">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 5: URAT NADI EKONOMI (HORIZONTAL ACCORDION)
          ========================================================= */}
      <section className="py-24 bg-[var(--bg-main)] overflow-hidden border-t border-[var(--glass-border)]">
        <div className="max-w-[1400px] mx-auto px-4 w-full">
          <div className="text-center mb-16">
            <span className="text-[#33C3B3] font-bold text-xs tracking-widest uppercase font-heading block mb-2">Urat Nadi Ekonomi</span>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight">
              Pusat Jasa & <span className="text-[#F4C038]">Perdagangan</span>
            </h2>
            <p className="text-[var(--text-muted)] mt-4 max-w-xl mx-auto font-body text-sm md:text-base">
              Menjadi pintu gerbang utama logistik dan maritim untuk wilayah Kalimantan Selatan dan Kalimantan Tengah.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row h-[800px] lg:h-[600px] gap-2 lg:gap-4 group/accordion">
            {[
              {
                title: "Pelabuhan Trisakti",
                desc: "Salah satu pelabuhan tersibuk dan terbesar di Pulau Kalimantan, menopang arus logistik industri maritim.",
                img: "/profil kota/pelabuhan trisakti.webp"
              },
              {
                title: "Kawasan Niaga",
                desc: "Revitalisasi ruang niaga modern dan pasar tradisional yang mendongkrak ekosistem ekonomi berdaya saing tinggi.",
                img: "/profil kota/sungai.webp"
              },
              {
                title: "Jasa Pariwisata",
                desc: "Pemanfaatan potensi budaya sungai dan hospitality modern sebagai roda penggerak ekonomi warga lokal.",
                img: "/profil kota/jasa pariwisata.webp"
              }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="relative flex-1 lg:hover:flex-[2.5] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] overflow-hidden rounded-3xl group/item cursor-pointer border border-[var(--glass-border)] h-full shadow-lg"
              >
                <img loading="lazy" src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover scale-110 group-hover/item:scale-100 transition-transform duration-1000 grayscale group-hover/item:grayscale-0" />
                
                {/* Gradient Overlay forced to black for contrast against white text */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover/item:opacity-70 transition-opacity duration-700" />
                
                <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full text-left flex flex-col justify-end h-full">
                  <div className="transform translate-y-0 lg:translate-y-16 group-hover/item:translate-y-0 transition-transform duration-700">
                    <div className="w-12 h-1 bg-[#F4C038] mb-4 opacity-100 lg:opacity-0 group-hover/item:opacity-100 transition-opacity duration-700 lg:delay-100" />
                    <h3 className="text-2xl md:text-3xl font-black text-white font-heading mb-2 whitespace-nowrap drop-shadow-md">{item.title}</h3>
                    <p className="text-sm md:text-base text-slate-300 font-body opacity-100 lg:opacity-0 group-hover/item:opacity-100 transition-opacity duration-700 lg:delay-200 max-w-sm line-clamp-3 lg:line-clamp-none drop-shadow-md">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 6: BUDAYA SUNGAI (SPOTLIGHT REVEAL)
          ========================================================= */}
      <section 
        className="relative h-[80vh] min-h-[600px] w-full bg-black overflow-hidden cursor-crosshair flex items-center justify-center border-t border-[var(--glass-border)]"
        onMouseMove={handleMouseMove}
      >
        {/* Latar Belakang Asli (Terang/Penuh Warna) */}
        <div className="absolute inset-0 pointer-events-none">
          <img loading="lazy" src="/wisata/960px-Pasar_Terapung_Siring_Banj.webp" alt="Pasar Terapung" className="w-full h-full object-cover opacity-80" />
        </div>
        
        {/* Spotlight Masking Layer */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300" 
          style={{
            background: `radial-gradient(circle 400px at ${mousePos.x}% ${mousePos.y}%, transparent 0%, rgba(5,11,20,0.95) 100%)`
          }}
        />

        <div className="relative z-20 max-w-4xl px-4 text-center pointer-events-none">
          <h2 className="text-4xl md:text-7xl font-black text-white font-heading leading-tight mb-6 drop-shadow-[0_0_40px_rgba(0,0,0,1)]">
            Nafas <span className="text-[#33C3B3]">Budaya</span> <br className="hidden md:block"/>Masyarakat Sungai
          </h2>
          <p className="text-slate-200 text-base md:text-xl font-body drop-shadow-[0_0_20px_rgba(0,0,0,1)] font-medium max-w-2xl mx-auto">
            Bagi Suku Banjar, sungai bukanlah sekadar batas fisik, melainkan urat nadi tempat berpadunya spiritualitas, perputaran ekonomi, dan interaksi sosial yang hidup sejak berabad-abad lampau.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
