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
    img: "/hero_sungai_martapura.png"
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
    img: "/hero_pasar_terapung.png"
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
    img: "/hero_soto_banjar.png"
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
    img: "/hero_kain_sasirangan.png"
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
    img: "/hero_menara_pandang.png"
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
      img: "/wisata/960px-Menara_Pandang_Banjarmasin.webp",
      span: "bento-span-1"
    },
    {
      id: 3,
      title: "Monumen Patung Bekantan",
      category: "Ikon Wisata",
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

        {/* 1. WISATA IKONIK (BENTO GRID) */}
        <section id="wisata" className="py-12 md:py-20">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-10 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#F4C038] mb-2 font-heading">
              ✦ EKSPLORASI ALAM & LANDMARK
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight mb-4">
              Destinasi Wisata <span className="text-[#33C3B3]">Ikonik</span>
            </h2>
            <p className="hero-subtitle mx-auto px-2 mb-8">
              Menyusuri denyut kehidupan sungai Martapura hingga pesona eksotis rimba Borneo yang tak akan terlupakan.
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
                    <Link to="/wisata" className="btn-bento-action">Eksplorasi Spot ➔</Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/wisata" className="btn-gateway inline-block">Jelajahi Beragam Destinasi Alam & Budaya ➔</Link>
          </motion.div>
        </section>

        {/* 2. TASTE OF BANJAR (KULINER) */}
        <section id="kuliner" className="py-12 md:py-20">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-10 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#F4C038] mb-2 font-heading">
              ✦ WARISAN CITA RASA
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight mb-4">
              Kuliner <span className="text-[#33C3B3]">Legendaris</span> Banjar
            </h2>
            <p className="text-sm md:text-base text-[var(--text-muted)] font-body leading-relaxed max-w-2xl mx-auto px-2">
              Setiap hidangan adalah mahakarya rasa. Temukan resep rahasia dan perpaduan rempah khas Nusantara yang dijaga ketat oleh masyarakat Banjar melintasi berbagai generasi.
            </p>
          </motion.div>

          <div className="culinary-tabs-bar hide-scrollbar flex overflow-x-auto gap-4 mb-8 pb-4 snap-x justify-start md:justify-center px-4">
            {foods.map((item) => (
              <button 
                key={item.id}
                className={`px-6 py-3 rounded-full font-bold text-sm transition-all border shadow-sm snap-center shrink-0 ${activeTab === item.id ? 'bg-[#33C3B3] border-[#33C3B3] text-white shadow-[#33C3B3]/30' : 'bg-transparent border-[var(--glass-border)] text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                onClick={() => setActiveTab(item.id)}
              >
                {item.tabTitle}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div 
              key={currentFood.id}
              className="max-w-5xl mx-auto bg-[var(--card-bg)] rounded-[40px] p-6 md:p-8 lg:p-10 border border-[var(--glass-border)] shadow-2xl flex flex-col lg:flex-row gap-10 items-center mx-4 lg:mx-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-full lg:w-1/2 relative rounded-[32px] overflow-hidden shadow-lg group">
                <div className="absolute inset-0 bg-[#33C3B3]/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                <img src={currentFood.img} alt={currentFood.name} loading="lazy" className="w-full h-[300px] md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-[#F4C038] font-black px-4 py-2 rounded-full border border-white/20 z-20 shadow-xl">
                  {currentFood.price}
                </div>
              </div>

              <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left">
                <h3 className="text-2xl md:text-4xl font-black text-[var(--text-main)] font-heading mb-4 leading-tight">{currentFood.name}</h3>
                
                <div className="inline-flex items-center gap-3 bg-[var(--bg-main)] px-5 py-3 rounded-2xl border border-[var(--glass-border)] mb-6 mx-auto lg:mx-0 w-max">
                  <span className="text-xl">🌿</span>
                  <p className="text-xs md:text-sm font-bold text-[var(--text-main)] uppercase tracking-wider">{currentFood.aroma}</p>
                </div>

                <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed mb-8">
                  {currentFood.desc}
                </p>

                <Link to="/kuliner" className="btn-gateway inline-block w-full sm:w-max">Jelajahi Lokasi Kuliner Ini ➔</Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* 3. JANTUNG BUDAYA & SEJARAH */}
        <section id="budaya" className="py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#F4C038] mb-2 font-heading">
                ✦ WARISAN LELUHUR
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight mb-6">
                Jantung Budaya & <br className="hidden lg:block"/> Jejak Sejarah
              </h2>
              <p className="hero-subtitle mx-auto lg:mx-0 mb-8 px-2 lg:px-0">
                Lebih dari sekadar kain dan transportasi, keduanya melambangkan ketangguhan serta harmoni manusiawi masyarakat Banjar dengan alam sungainya.
              </p>
              
              <div className="flex flex-col gap-6 mb-8 text-left px-4 lg:px-0">
                <div className="flex gap-4 items-start p-6 rounded-3xl bg-[var(--card-bg)] border border-[var(--glass-border)] shadow-sm hover:shadow-lg transition-shadow">
                  <span className="text-3xl md:text-4xl shrink-0">🧵</span>
                  <div>
                    <h3 className="font-heading font-bold text-[var(--text-main)] mb-2 text-lg">Kain Sasirangan</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">Dibuat melalui teknik menyirang dengan pewarna alami, dipercaya masyarakat sejak abad ke-16 sebagai wastra penyembuh magis.</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-6 rounded-3xl bg-[var(--card-bg)] border border-[var(--glass-border)] shadow-sm hover:shadow-lg transition-shadow">
                  <span className="text-3xl md:text-4xl shrink-0">🛶</span>
                  <div>
                    <h3 className="font-heading font-bold text-[var(--text-main)] mb-2 text-lg">Budaya Jukung</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">Perahu tradisional berbahan kayu ulin tanpa paku logam, didesain sempurna untuk membelah kuatnya arus sungai Kalimantan.</p>
                  </div>
                </div>
              </div>

              <Link to="/budaya" className="btn-gateway inline-block">Pelajari Kedalaman Budaya ➔</Link>
            </motion.div>

            <motion.div 
              className="relative lg:h-[700px] rounded-[40px] overflow-hidden group shadow-2xl border-4 border-[var(--card-bg)] mx-4 lg:mx-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src="/hero_pasar_terapung.png" 
                alt="Pasar Terapung Lok Baintan" 
                loading="lazy"
                className="w-full h-[450px] lg:h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-8 md:p-12">
                <div className="border-l-4 border-[#F4C038] pl-5 md:pl-6 relative">
                  <div className="absolute -left-6 -top-8 text-7xl text-white/20 font-serif">"</div>
                  <p className="text-white text-base md:text-xl italic font-serif leading-relaxed mb-4">
                    Di atas jukung, urat nadi kehidupan dan persaudaraan masyarakat Banjar terus mengalir melintasi lintas generasi dan zaman.
                  </p>
                  <span className="text-[#F4C038] font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] font-heading">
                    — Pedagang Pasar Terapung
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 4. SMART CITY & EKOLOGI (NEW) */}
        <section id="smartcity" className="py-12 md:py-20 relative overflow-hidden rounded-[40px] mb-12 shadow-2xl border border-[var(--glass-border)] mx-4 md:mx-0">
          <div className="absolute inset-0 z-0">
            <img src="/hero_menara_pandang.png" className="w-full h-full object-cover brightness-[0.7]" alt="Smart City Night" loading="lazy"/>
            <div className="absolute inset-0 bg-gradient-to-r from-[#091422]/95 via-[#091422]/70 to-[#33C3B3]/20"></div>
          </div>
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-6 md:px-16 h-full py-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-4 font-heading bg-[#33C3B3]/20 backdrop-blur-md px-4 py-2 rounded-full border border-[#33C3B3]/40">
                ✦ BANJARMASIN BAIMAN
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white font-heading leading-tight mb-6">
                Kota Pintar <br className="hidden md:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#33C3B3] to-[#F4C038]">Harmoni Ekologi</span>
              </h2>
              <p className="text-gray-200 text-sm md:text-base lg:text-lg mb-8 leading-relaxed max-w-lg">
                Integrasi cerdas antara super-app pelayanan digital masyarakat dengan komitmen memelihara kelestarian ekosistem sungai. Sebuah visi nyata menuju masa depan yang inklusif.
              </p>
              <Link to="/smart-city" className="bg-gradient-to-r from-[#33C3B3] to-[#00A896] hover:brightness-110 text-white px-8 py-4 rounded-full font-bold shadow-xl transition-all hover:-translate-y-1 inline-block">
                Eksplorasi Ekosistem ➔
              </Link>
            </motion.div>
            
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white/10 backdrop-blur-2xl rounded-[32px] p-5 md:p-6 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-5 hover:bg-white/20 hover:border-white/40 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-blue-500/30 rounded-full flex items-center justify-center text-2xl border border-blue-400/50 shrink-0 shadow-lg">📱</div>
                <div>
                  <h4 className="text-white font-bold text-base md:text-lg">Super-App Banjarmasin Pintar</h4>
                  <p className="text-gray-300 text-xs md:text-sm">SSO NIK untuk akses semua layanan publik</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-2xl rounded-[32px] p-5 md:p-6 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-5 translate-x-0 md:translate-x-8 hover:bg-white/20 hover:border-white/40 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-green-500/30 rounded-full flex items-center justify-center text-2xl border border-green-400/50 shrink-0 shadow-lg">🚦</div>
                <div>
                  <h4 className="text-white font-bold text-base md:text-lg">Pemantauan ATCS Terpusat</h4>
                  <p className="text-gray-300 text-xs md:text-sm">Kendali lalu lintas dan pantauan kota real-time</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-2xl rounded-[32px] p-5 md:p-6 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center gap-5 hover:bg-white/20 hover:border-white/40 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-yellow-500/30 rounded-full flex items-center justify-center text-2xl border border-yellow-400/50 shrink-0 shadow-lg">🏛️</div>
                <div>
                  <h4 className="text-white font-bold text-base md:text-lg">E-Layanan Warga & UMKM</h4>
                  <p className="text-gray-300 text-xs md:text-sm">Integrasi kependudukan hingga e-Katalog UMKM</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* AI CHAT SECTION */}
        <section id="ai-chat" className="py-12 md:py-20">
          <div className="bg-gradient-to-r from-[#00A896] to-[#028090] rounded-[40px] p-8 md:p-12 lg:p-16 text-center shadow-2xl relative overflow-hidden border border-[#33C3B3]/30 mx-4 lg:mx-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F4C038]/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <span className="text-4xl md:text-6xl mb-6 block drop-shadow-lg">🤖</span>
              <h2 className="text-3xl md:text-5xl font-black text-white font-heading leading-tight mb-4">
                Asisten <span className="text-[#F4C038]">AI Banjarmasin</span>
              </h2>
              <p className="text-white/90 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
                Punya pertanyaan seputar rute, kuliner, atau butuh rekomendasi itinerary personal? Tanya langsung pada Asisten Cerdas AI kami yang siap membantu perjalananmu 24/7!
              </p>
              <Link to="/smart-city" className="bg-[#F4C038] hover:bg-[#D99B00] text-[#050B14] font-black px-8 py-4 rounded-full shadow-[0_10px_25px_rgba(244,192,56,0.4)] transition-transform hover:-translate-y-1 flex items-center gap-3">
                <span>Mulai Ngobrol Sekarang</span> <span className="text-xl">💬</span>
              </Link>
            </div>
          </div>
        </section>

        {/* 5. PANDUAN & AKOMODASI (NEW) */}
        <section id="panduan-akomodasi" className="py-12 md:py-20 border-t border-[var(--glass-border)]">
          <motion.div 
            className="text-center max-w-4xl mx-auto mb-10 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#F4C038] mb-2 font-heading">
              ✦ PERSIAPAN PERJALANAN
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-[var(--text-main)] font-heading leading-tight mb-4">
              Akomodasi & <span className="text-[#33C3B3]">Transportasi</span>
            </h2>
            <p className="hero-subtitle mx-auto px-2">
              Panduan lengkap menuju pusat kota. Temukan hotel berfasilitas perahu pribadi hingga pelajari titik henti Bus Rapid Transit (BRT) andalan.
            </p>
          </motion.div>

          <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-6 pb-8 pt-4 snap-x hide-scrollbar px-4 lg:px-0">
            {[
              { img: "/panduan/Swiss-Belhotel Borneo Banjarmasi.webp", badge: "Premium", title: "Swiss-Belhotel Borneo", desc: "Berada tepat di tepi sungai dengan akses langsung ke dermaga kelotok privat." },
              { img: "/panduan/galaxy hotel.webp", badge: "Bisnis", title: "Galaxy Hotel", desc: "Berada di gerbang masuk kota, cocok untuk mobilitas ekstra cepat via bandara." },
              { img: "/profil kota/Angkutan-BTS-Trans-Banjarmasin-t.webp", badge: "Publik", title: "BRT Trans Banjarbakula", desc: "Bus AC nyaman beroperasi menembus bandara hingga titik Nol Kilometer kota." }
            ].map((item, idx) => (
              <motion.div 
                key={idx} 
                className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 bg-[var(--card-bg)] rounded-[40px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-[var(--glass-border)] snap-center group flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="h-[220px] relative overflow-hidden">
                  <img src={item.img} alt={item.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
                  <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-4 py-2 rounded-full border border-white/20 uppercase tracking-wider">{item.badge}</span>
                </div>
                <div className="p-6 md:p-8 flex-1 flex flex-col">
                  <h3 className="font-heading font-black text-xl md:text-2xl text-[var(--text-main)] mb-3">{item.title}</h3>
                  <p className="text-sm md:text-base text-[var(--text-muted)] leading-relaxed mb-6 flex-1">{item.desc}</p>
                  <Link to="/panduan" className="text-[#33C3B3] font-bold text-sm md:text-base hover:text-[#2AA698] flex items-center gap-2 group-hover:gap-4 transition-all">
                    Baca Detail Panduan <span>➔</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Link to="/panduan" className="btn-gateway inline-block">Buka Survival Guide 2026 Lengkap ➔</Link>
          </div>
        </section>

        {/* 6. UTILITY PLANNER (RUTE) */}
        <section id="planner" className="py-12 md:py-20 mb-0">
          <div className="planner-glass relative overflow-hidden rounded-[40px] p-6 md:p-12 lg:p-16 border border-[var(--glass-border)] shadow-2xl bg-[var(--card-bg)] flex flex-col lg:flex-row gap-12 items-center mx-4 md:mx-0">
            {/* Ambient background glow */}
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#33C3B3]/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#F4C038]/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex-1 relative z-10 w-full">
              <div className="flex items-center gap-4 bg-[var(--bg-main)]/50 backdrop-blur-xl border border-[var(--glass-border)] p-4 rounded-3xl w-max mb-8 shadow-sm">
                <span className="text-3xl">🌤️</span>
                <div>
                  <h4 className="font-heading font-bold text-xs text-[var(--text-muted)] uppercase tracking-wider">Banjarmasin (WITA)</h4>
                  <p className="text-[var(--text-main)] font-black text-sm">31°C • Tropis Cerah & Hangat</p>
                </div>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-[var(--text-main)] font-heading leading-tight mb-4">
                Peta Interaktif <span className="text-[#F4C038]">Rute Wisata</span> & Estimasi Waktu
              </h2>
              <p className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed mb-8">
                Pilih titik destinasi di bawah ini untuk melihat opsi rute transportasi sungai terbaik dan jadwal kunjungan ideal agar tidak kehabisan momen.
              </p>

              <div className="flex flex-wrap gap-3">
                <button 
                  className={`map-tab-btn px-5 py-3 rounded-full font-bold text-sm transition-all border shadow-sm ${activeSpot === 'lokbaintan' ? 'bg-[#F4C038] border-[#F4C038] text-[#091422] shadow-[#F4C038]/30' : 'bg-transparent border-[var(--glass-border)] text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                  onClick={() => setActiveSpot('lokbaintan')}
                >
                  🛶 Pasar Terapung
                </button>
                <button 
                  className={`map-tab-btn px-5 py-3 rounded-full font-bold text-sm transition-all border shadow-sm ${activeSpot === 'siring' ? 'bg-[#F4C038] border-[#F4C038] text-[#091422] shadow-[#F4C038]/30' : 'bg-transparent border-[var(--glass-border)] text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                  onClick={() => setActiveSpot('siring')}
                >
                  🗼 Menara Pandang
                </button>
                <button 
                  className={`map-tab-btn px-5 py-3 rounded-full font-bold text-sm transition-all border shadow-sm ${activeSpot === 'sotoamat' ? 'bg-[#F4C038] border-[#F4C038] text-[#091422] shadow-[#F4C038]/30' : 'bg-transparent border-[var(--glass-border)] text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                  onClick={() => setActiveSpot('sotoamat')}
                >
                  🍲 Soto Bang Amat
                </button>
                <button 
                  className={`map-tab-btn px-5 py-3 rounded-full font-bold text-sm transition-all border shadow-sm ${activeSpot === 'pulaukembang' ? 'bg-[#F4C038] border-[#F4C038] text-[#091422] shadow-[#F4C038]/30' : 'bg-transparent border-[var(--glass-border)] text-[var(--text-main)] hover:bg-[var(--glass-border)]'}`}
                  onClick={() => setActiveSpot('pulaukembang')}
                >
                  🏝️ Pulau Kembang
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div 
                key={activeSpot}
                className="w-full lg:w-[450px] shrink-0 bg-[var(--bg-main)] rounded-[32px] p-6 md:p-8 border border-[var(--glass-border)] shadow-xl relative z-10"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[#33C3B3] font-bold text-xs uppercase tracking-widest bg-[#33C3B3]/10 px-3 py-1.5 rounded-full">{currentMap.type}</span>
                  <span className="text-[var(--text-muted)] text-xs font-mono">📍 {currentMap.coords}</span>
                </div>

                <h4 className="text-2xl font-black text-[var(--text-main)] font-heading mb-3 leading-tight">{currentMap.title}</h4>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed italic mb-6">"{currentMap.highlight}"</p>

                <div className="space-y-4 mb-8 bg-[var(--card-bg)] p-5 rounded-2xl border border-[var(--glass-border)]">
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Akses Transportasi</span>
                    <span className="text-[var(--text-main)] font-bold text-sm">{currentMap.transport}</span>
                  </div>
                  <div className="h-[1px] w-full bg-[var(--glass-border)]"></div>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-1">Waktu Terbaik Kunjungan</span>
                    <span className="text-[var(--text-main)] font-bold text-sm">{currentMap.bestTime}</span>
                  </div>
                </div>

                <a 
                  href={currentMap.mapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full block text-center bg-[#F4C038] hover:bg-white text-[#091422] font-black text-sm py-4 rounded-full transition-colors shadow-lg"
                >
                  🗺️ Buka Langsung di Google Maps ➔
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

      </div>
      <Footer />
    </div>
  );
}
