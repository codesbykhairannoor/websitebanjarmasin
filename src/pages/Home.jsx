import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { Link } from 'react-router-dom';

const showcaseItems = [
  {
    id: 0,
    shortTitle: "Sambutan",
    icon: "✨",
    title: "Selamat Datang di Banjarmasin!",
    subtitle: "Pusat Peradaban & Pesona Jantung Borneo",
    desc: "Bersiaplah memulai penjelajahan tak terlupakan di Kota Seribu Sungai. Resapi eksotika budaya terapung yang melegenda, kelezatan rempah kuliner autentik, hingga pesona tata kota modern yang asri dan baiman.",
    tag: "✦ GERBANG UTAMA KALIMANTAN",
    price: "Eksplorasi Dimulai",
    btnText: "Mulai Petualangan ➔",
    btnLink: "#wisata",
    img: "/hero_sungai_martapura.webp"
  },
  {
    id: 1,
    shortTitle: "Sungai",
    icon: "🛶",
    title: "Eksotika Kehidupan di Atas Air",
    subtitle: "Magisnya Fajar di Pasar Terapung & Susur Sungai",
    desc: "Menyaksikan langsung denyut nadi perdagangan tradisional di atas perahu jukung saat fajar menyingsing, dan rasakan ketenangan batin ketika menyusuri aliran Sungai Martapura yang membelah keindahan kota.",
    tag: "✦ DESTINASI IKONIK",
    price: "Kearifan Lokal",
    btnText: "Buka Peta Wisata ➔",
    btnLink: "/wisata",
    img: "/hero_pasar_terapung.webp"
  },
  {
    id: 2,
    shortTitle: "Kuliner",
    icon: "🍜",
    title: "Simfoni Rempah Autentik Borneo",
    subtitle: "Kehangatan Soto Banjar & Ketupat Kandangan",
    desc: "Sebuah mahakarya rasa dari paduan kaldu rempah kapulaga, kelembutan perkedel, dan aroma khas ikan haruan panggang yang resep aslinya dijaga ketat melintasi berbagai generasi.",
    tag: "✦ WARISAN KULINER",
    price: "Cita Rasa Legendaris",
    btnText: "Cicipi Menu Banjar ➔",
    btnLink: "/kuliner",
    img: "/hero_soto_banjar.webp"
  },
  {
    id: 3,
    shortTitle: "Budaya",
    icon: "🏛️",
    title: "Keanggunan Tradisi Leluhur",
    subtitle: "Estetika Sasirangan & Jejak Kesultanan",
    desc: "Menelusuri keagungan sejarah Kesultanan Banjar sejak tahun 1526, mengagumi kerumitan pola wastra Sasirangan pewarna alami, hingga menyaksikan kemegahan arsitektur kayu ulin peninggalan masa lalu.",
    tag: "✦ BUDAYA & SEJARAH",
    price: "Jejak Peradaban",
    btnText: "Jelajahi Sejarah ➔",
    btnLink: "/sejarah",
    img: "/hero_kain_sasirangan.webp"
  },
  {
    id: 4,
    shortTitle: "Inovasi",
    icon: "🚀",
    title: "Smart City Seribu Sungai",
    subtitle: "Integrasi Pelayanan Digital & Ekologi",
    desc: "Wajah baru Banjarmasin yang memadukan ekosistem super-app pelayanan publik dengan komitmen pelestarian lingkungan sungai secara real-time, mewujudkan tata kota yang modern, bersih, dan inklusif.",
    tag: "✦ BANJARMASIN PINTAR",
    price: "Kota Masa Depan",
    btnText: "Ekosistem Smart City ➔",
    btnLink: "/smart-city",
    img: "/hero_menara_pandang.webp"
  }
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);

  // === STATE FOR QUICK DISCOVERY ===
  const spots = [
    {
      id: 1,
      title: "Pasar Terapung Lok Baintan",
      category: "Budaya Sungai",
      time: "⏰ 05.30 - 08.00 WITA",
      img: "/wisata/960px-Pasar_Terapung_Siring_Banj.webp",
      span: "bento-span-2"
    },
    {
      id: 2,
      title: "Menara Pandang & Siring",
      category: "Landmark Kota",
      time: "⏰ Terbuka 24 Jam",
      img: "/profil kota/sungai.webp",
      span: "bento-span-1"
    },
    {
      id: 3,
      title: "Pulau Kembang Borneo",
      category: "Hutan & Ekosistem",
      time: "⏰ 08.00 - 17.00 WITA",
      img: "/wisata/960px-Monumen_Patung_Bekantan_Ba.webp",
      span: "bento-span-1"
    },
    {
      id: 4,
      title: "Masjid Sultan Suriansyah",
      category: "Heritage 1526",
      time: "⏰ Wisata Religi",
      img: "/wisata/masjid sultan suriansyah.webp",
      span: "bento-span-2"
    }
  ];

  // === STATE FOR TASTE OF BANJAR ===
  const [activeTab, setActiveTab] = useState(1);
  const foods = [
    {
      id: 1,
      name: "Soto Banjar Rempah Kapulaga",
      tabTitle: "🥣 Soto Banjar Rempah",
      aroma: "Harum Rempah Kapulaga, Kayu Manis & Cengkeh",
      desc: "Kaldu ayam kampung keemasan yang dimasak perlahan dengan rempah pilihan. Disajikan bersama suwiran daging ayam hangat, perkedel kentang lembut, dan ketupat pulen khas Banjar.",
      price: "Rp 25.000",
      img: "/kuliner/Soto_banjar,_Pak_Ahmat,_Martapura,_South_Kalimantan,_2018-07-28_02.webp"
    },
    {
      id: 2,
      name: "Ketupat Kandangan Haruan Asap",
      tabTitle: "🥘 Ketupat Kandangan",
      aroma: "Gurih Santan Kental & Aroma Smokey Ikan Haruan",
      desc: "Ketupat pulen yang disiram kuah santan kaya bumbu kuning tradisional. Dipadukan dengan lauk ikan haruan (gabus) panggang asap yang memberikan cita rasa mendalam yang tiada duanya.",
      price: "Rp 30.000",
      img: "/kuliner/1920px-Katupat_Kandangan_in_Kandangan.webp"
    },
    {
      id: 3,
      name: "Lontong Orari Legendaris",
      tabTitle: "🌙 Lontong Orari",
      aroma: "Perpaduan Manis Gurih Bumbu Habang Khas Banjar",
      desc: "Lontong segitiga berukuran jumbo dengan siraman bumbu habang (merah) yang pekat. Disertai lauk telur bebek dan ayam kampung yang meresap sempurna hingga ke serat daging.",
      price: "Rp 35.000",
      img: "/kuliner/buras.webp"
    },
    {
      id: 4,
      name: "Bingka Kentang Kembang",
      tabTitle: "🍯 Bingka Kentang",
      aroma: "Legit Lembut Aroma Santan Bakar & Kentang",
      desc: "Kue basah tradisional berbentuk kelopak bunga kembang bundar. Memiliki tekstur super lembut dan manis legit alami dari campuran kentang premium serta santan kelapa bakar.",
      price: "Rp 45.000",
      img: "/kuliner/Bingka.webp"
    }
  ];
  const currentFood = foods.find(f => f.id === activeTab);

  // === STATE FOR UTILITY PLANNER ===
  const [activeSpot, setActiveSpot] = useState('lokbaintan');
  const spotsData = {
    lokbaintan: {
      title: "Pasar Terapung Lok Baintan",
      type: "Wisata Budaya Sungai",
      coords: "3.3167° S, 114.5901° E",
      transport: "🛶 Perahu Kelotok (~35 Menit dari Dermaga Siring)",
      bestTime: "🌅 05.30 - 07.30 WITA (Matahari Terbit)",
      highlight: "Saksikan transaksi jual beli tradisional di atas jukung dengan sistem barter yang telah berlangsung sejak abad ke-16.",
      mapsUrl: "https://maps.google.com/?q=Pasar+Terapung+Lok+Baintan"
    },
    siring: {
      title: "Menara Pandang & Siring Sungai Martapura",
      type: "Landmark Pusat Kota",
      coords: "3.3186° S, 114.5924° E",
      transport: "🚗 Jalan Kaki / Akses Kendaraan Umum",
      bestTime: "🌆 16.30 - 21.00 WITA (Senja & Malam Hari)",
      highlight: "Pusat rekreasi warga di tepian sungai Martapura. Nikmati hembusan angin sungai, live music, dan jajanan malam khas Banjar.",
      mapsUrl: "https://maps.google.com/?q=Menara+Pandang+Banjarmasin"
    },
    sotoamat: {
      title: "Dermaga Kuliner Soto Bang Amat",
      type: "Wisata Gastronomi",
      coords: "3.3012° S, 114.6035° E",
      transport: "🛶 Kelotok Wisata / Mobil (~15 Menit dari Pusat Kota)",
      bestTime: "🍜 11.00 - 15.00 WITA (Makan Siang Live Panting)",
      highlight: "Menikmati semangkuk soto Banjar hangat tepat di pinggir sungai Martapura sembari ditemani alunan musik tradisional Panting.",
      mapsUrl: "https://maps.google.com/?q=Soto+Bang+Amat+Banjarmasin"
    },
    pulaukembang: {
      title: "Delta Konservasi Pulau Kembang",
      type: "Wisata Alam & Satwa",
      coords: "3.3045° S, 114.5589° E",
      transport: "Speedboat / Kelotok (~20 Menit Menyusuri Sungai Barito)",
      bestTime: "☀️ 08.00 - 11.00 WITA (Pagi Hari)",
      highlight: "Pulau delta di tengah sungai Barito yang menjadi habitat alami ribuan kera ekor panjang dan bekantan khas Borneo.",
      mapsUrl: "https://maps.google.com/?q=Pulau+Kembang+Barito"
    }
  };
  const currentMap = spotsData[activeSpot];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />

      {/* =========================================================
          HERO SECTION (DISNEY+ SHOWCASE ACCORDION FULL-WIDTH)
          ========================================================= */}
      <section className="relative w-full h-screen min-h-[600px] bg-[var(--bg-main)] pt-[56px] sm:pt-[60px] overflow-hidden flex flex-col border-b border-[var(--glass-border)]">
        <div className="w-full flex-1 flex flex-col md:flex-row gap-[1px] bg-white/10 relative z-10 overflow-hidden">
          {showcaseItems.map((item, i) => {
            const isActive = activeSlide === i;
            return (
              <div
                key={item.id}
                onClick={() => setActiveSlide(i)}
                className={`relative overflow-hidden transition-[flex] duration-500 ease-out select-none ${
                  isActive
                    ? "flex-[5] sm:flex-[6] md:flex-[8] lg:flex-[10] z-20 shadow-2xl cursor-default"
                    : "flex-[0.85] sm:flex-[1] md:flex-[1.2] lg:flex-[1.5] cursor-pointer group border-b md:border-b-0 md:border-r border-white/15 last:border-0 hover:brightness-125 hover:shadow-[inset_0_0_35px_rgba(244,192,56,0.4)] transition-[filter,box-shadow] duration-300"
                }`}
              >
                {/* Background Image */}
                <img loading="lazy"
                  src={item.img}
                  alt={item.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                    isActive ? "scale-105 brightness-100" : "grayscale-[30%] brightness-75 group-hover:brightness-100"
                  }`}
                />

                {/* Content Overlay when ACTIVE */}
                {isActive ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black via-black/85 to-transparent w-full md:w-3/4 lg:w-2/3 z-10 pointer-events-none" />
                    <div className="absolute inset-0 z-20 p-5 sm:p-8 md:p-14 lg:p-16 flex flex-col justify-end md:justify-center max-w-xl text-white overflow-y-auto">
                      <span className="text-[#F4C038] font-heading font-extrabold text-[10px] sm:text-xs md:text-sm tracking-[0.2em] uppercase mb-1 sm:mb-2 block animate-fadeIn">
                        {item.tag}
                      </span>
                      <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-tight mb-2 sm:mb-3 drop-shadow-md animate-fadeIn text-white">
                        {item.title}
                      </h1>
                      <p className="text-sm sm:text-base md:text-xl font-bold text-sasirangan mb-2 sm:mb-4 font-heading animate-fadeIn">
                        {item.subtitle}
                      </p>
                      <p className="hidden sm:block text-xs md:text-base text-gray-200 mb-4 sm:mb-6 leading-relaxed line-clamp-2 md:line-clamp-3 animate-fadeIn">
                        {item.desc}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 animate-fadeIn">
                        {item.btnLink.startsWith('#') ? (
                          <a
                            href={item.btnLink}
                            className="bg-[#F4C038] hover:bg-white text-[#091422] px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-heading font-black text-xs sm:text-sm shadow-xl transition-all hover:brightness-110 flex items-center gap-2 border border-white/20"
                          >
                            <span>⚡</span> {item.btnText}
                          </a>
                        ) : (
                          <Link
                            to={item.btnLink}
                            className="bg-[#F4C038] hover:bg-white text-[#091422] px-5 sm:px-8 py-2.5 sm:py-3.5 rounded-full font-heading font-black text-xs sm:text-sm shadow-xl transition-all hover:brightness-110 flex items-center gap-2 border border-white/20"
                          >
                            <span>⚡</span> {item.btnText}
                          </Link>
                        )}
                        <span className="text-[11px] sm:text-sm font-bold text-gray-300 bg-white/10 backdrop-blur-md px-3 sm:px-4 py-2 sm:py-3 rounded-full border border-white/20">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Content Overlay when INACTIVE */
                  <>
                    {/* Desktop Inactive: Vertical Text Strip */}
                    <div className="hidden md:flex absolute inset-0 flex-col justify-between items-center p-3 sm:p-4 z-10 pointer-events-none bg-gradient-to-t from-black/90 via-black/20 to-black/60">
                      <span className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-xs font-bold text-[#F4C038] shrink-0">
                        0{i + 1}
                      </span>
                      <div className="flex-1 flex items-center justify-center py-4 overflow-hidden">
                        <span className="block font-heading font-extrabold text-white text-xs sm:text-sm tracking-widest uppercase -rotate-90 whitespace-nowrap drop-shadow-lg">
                          {item.shortTitle}
                        </span>
                      </div>
                      <span className="text-xl shrink-0 drop-shadow">{item.icon}</span>
                    </div>

                    {/* Mobile Inactive: Horizontal Bar Strip */}
                    <div className="md:hidden absolute inset-0 flex items-center justify-between px-5 z-10 pointer-events-none bg-black/75">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-[10px] font-bold text-[#F4C038]">
                          0{i + 1}
                        </span>
                        <span className="font-heading font-extrabold text-white text-xs tracking-widest uppercase drop-shadow-md">
                          {item.shortTitle}
                        </span>
                      </div>
                      <span className="text-lg drop-shadow">{item.icon}</span>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          KEMBALI MENGGUNAKAN APP-CONTAINER UNTUK SECTION LAIN
          ========================================================= */}
      <div className="app-container">
        {/* =========================================================
            QUICK DISCOVERY SECTION
            ========================================================= */}
        <section id="wisata" className="section-container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Jelajah Kota</span>
          <h2 className="section-title">Destinasi Wisata Ikonik</h2>
          <p className="section-desc">
            Menyusuri denyut kehidupan sungai Martapura hingga pesona eksotis alam Borneo.
          </p>
        </motion.div>

        <div className="bento-grid">
          {spots.map((s, idx) => (
            <motion.div 
              key={s.id} 
              className={`bento-card ${s.span}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
            >
              <img src={s.img} alt={s.title} loading="lazy" className="bento-bg" />
              <div className="bento-overlay">
                <div className="bento-top">
                  <span className="bento-badge">{s.category}</span>
                  <span className="bento-time">{s.time}</span>
                </div>
                <div className="bento-bottom">
                  <h3 className="bento-title">{s.title}</h3>
                  <button className="btn-bento-action">Eksplorasi Spot ➔</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="section-footer-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="btn-gateway">Jelajahi Beragam Destinasi Alam & Budaya ➔</button>
        </motion.div>
      </section>

      {/* =========================================================
          TASTE OF BANJAR SECTION
          ========================================================= */}
      <section id="kuliner" className="section-container bg-borneo-deep">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Gastronomi Otentik</span>
          <h2 className="section-title">Kuliner Legendaris Banjar</h2>
          <p className="section-desc">
            Dirancang dengan filosofi *Mobile-First Spotlight Menu*. Pilih menu di bawah ini untuk menjelajahi kelezatan dan filosofi historis setiap hidangan.
          </p>
        </motion.div>

        {/* Interactive Spotlight Selector Tabs */}
        <div className="culinary-tabs-bar">
          {foods.map((item) => (
            <button 
              key={item.id}
              className={`culinary-tab-btn ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.tabTitle}
            </button>
          ))}
        </div>

        {/* Spotlight Showcase Card (Super Responsive Mobile-First Stack) */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentFood.id}
            className="culinary-spotlight-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="spotlight-image-col">
              <img src={currentFood.img} alt={currentFood.name} loading="lazy" className="spotlight-img" />
              <span className="spotlight-price-badge">{currentFood.price}</span>
            </div>

            <div className="spotlight-content-col">
              <h3 className="spotlight-title">{currentFood.name}</h3>
              
              <div className="spotlight-aroma-box">
                <span className="aroma-icon">💡</span>
                <p className="aroma-text">{currentFood.aroma}</p>
              </div>

              <p className="spotlight-desc">{currentFood.desc}</p>

              <button className="btn-spotlight-action">Temukan Lokasi Warung Legendaris Ini ➔</button>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div 
          className="section-footer-cta"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <a href="#planner" className="btn-gateway">Jelajahi Peta Lokasi Kuliner Banjar ➔</a>
        </motion.div>
      </section>

      {/* =========================================================
          LOCAL CULTURE SECTION
          ========================================================= */}
      <section id="budaya" className="section-container">
        <div className="culture-flow">
          <div className="culture-text">
            <span className="section-tag">Warisan Leluhur</span>
            <h2 className="section-title">Filosofi Sasirangan & Perahu Jukung</h2>
            <p className="culture-lead">
              Lebih dari sekadar kain dan transportasi, keduanya melambangkan ketangguhan serta harmoni manusiawi masyarakat Banjar dengan alam sungainya.
            </p>
            
            <div className="culture-points">
              <div className="point-box">
                <h3>🧵 Kain Sasirangan</h3>
                <p>Dibuat melalui teknik menyirang (menjahit lalu mengikat) dengan pewarna alami, dipercaya masyarakat abad ke-16 sebagai penyembuh magis.</p>
              </div>
              <div className="point-box">
                <h3>🛶 Budaya Jukung</h3>
                <p>Perahu tradisional berbahan kayu ulin tanpa paku logam, didesain sempurna untuk membelah kuatnya arus seribu sungai Kalimantan.</p>
              </div>
            </div>

            <button className="btn-gateway mt-4">Pelajari Kronik Sejarah 1526 ➔</button>
          </div>

          <div className="culture-image-side">
            <div className="editorial-frame">
              <img 
                src="/wisata/960px-Pasar_Terapung_Siring_Banj.webp" 
                alt="Acil Pasar Terapung Lok Baintan" 
                loading="lazy"
                className="editorial-img"
              />
              <div className="quote-badge">
                <p>“Di atas jukung, urat nadi kehidupan dan persaudaraan masyarakat Banjar terus mengalir mengarungi zaman.”</p>
                <span>— Acil Pedagang Lok Baintan</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          UTILITY PLANNER SECTION
          ========================================================= */}
      <section id="planner" className="section-container mb-0">
        <div className="planner-glass">
          <div className="planner-left">
            <div className="weather-widget">
              <span className="weather-icon">🌤️</span>
              <div className="weather-info">
                <h4>Banjarmasin, Kalsel (WITA)</h4>
                <p>31°C • Tropis Cerah & Hangat</p>
              </div>
            </div>
            <h3>Peta Interaktif Rute Wisata & Estimasi Waktu</h3>
            <p className="planner-desc">
              Pilih titik destinasi di bawah ini untuk melihat rute transportasi sungai terbaik dan jadwal kunjungan ideal.
            </p>

            <div className="map-tabs">
              <button 
                className={`map-tab-btn ${activeSpot === 'lokbaintan' ? 'active' : ''}`}
                onClick={() => setActiveSpot('lokbaintan')}
              >
                🛶 Pasar Terapung
              </button>
              <button 
                className={`map-tab-btn ${activeSpot === 'siring' ? 'active' : ''}`}
                onClick={() => setActiveSpot('siring')}
              >
                🗼 Menara Pandang
              </button>
              <button 
                className={`map-tab-btn ${activeSpot === 'sotoamat' ? 'active' : ''}`}
                onClick={() => setActiveSpot('sotoamat')}
              >
                🍲 Soto Bang Amat
              </button>
              <button 
                className={`map-tab-btn ${activeSpot === 'pulaukembang' ? 'active' : ''}`}
                onClick={() => setActiveSpot('pulaukembang')}
              >
                🏝️ Pulau Kembang
              </button>
            </div>
          </div>

          <motion.div 
            key={activeSpot}
            className="interactive-map-card"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="map-card-header">
              <span className="map-spot-type">{currentMap.type}</span>
              <span className="map-coords">📍 {currentMap.coords}</span>
            </div>

            <h4 className="map-spot-title">{currentMap.title}</h4>
            <p className="map-spot-highlight">"{currentMap.highlight}"</p>

            <div className="map-logistics">
              <div className="logistic-item">
                <span className="logistic-label">Akses Transportasi:</span>
                <span className="logistic-val">{currentMap.transport}</span>
              </div>
              <div className="logistic-item">
                <span className="logistic-label">Waktu Terbaik Kunjungan:</span>
                <span className="logistic-val">{currentMap.bestTime}</span>
              </div>
            </div>

            <a 
              href={currentMap.mapsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-open-maps"
            >
              🗺️ Buka Rute Langsung di Google Maps ➔
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />

      </div>
    </div>
  );
}
