"use client";

import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLanguage } from '../context/LanguageContext';
import { pagesTranslations } from '../translations/pagesTranslations';

const mapLocations = [
  {
    id: 1,
    title: "Menara Pandang & Siring Martapura",
    category: "Landmark",
    coords: [-3.3186, 114.5924],
    emoji: "🗼",
    color: "#F4C038",
    desc: "Landmark ikonik di pusat kota dengan pemandangan 360 derajat Sungai Martapura dan aktivitas dermaga kelotok.",
    time: "06.00 - 22.00 WITA",
    mapsUrl: "https://maps.google.com/?q=Menara+Pandang+Banjarmasin"
  },
  {
    id: 2,
    title: "Pasar Terapung Lok Baintan",
    category: "Wisata Bahari",
    coords: [-3.2872, 114.6397],
    emoji: "🛶",
    color: "#00A896",
    desc: "Pasar atas air tradisional sejak abad ke-16. Rasakan sensasi jual beli menggunakan perahu jukung di waktu subuh.",
    time: "05.30 - 08.00 WITA",
    mapsUrl: "https://maps.google.com/?q=Pasar+Terapung+Lok+Baintan"
  },
  {
    id: 3,
    title: "Patung Maskot Bekantan",
    category: "Ikon Kota",
    coords: [-3.3194, 114.5915],
    emoji: "🐵",
    color: "#33C3B3",
    desc: "Patung perunggu raksasa satwa endemik Borneo yang menyemburkan air langsung ke arah Sungai Martapura.",
    time: "24 Jam Terbuka",
    mapsUrl: "https://maps.google.com/?q=Patung+Bekantan+Banjarmasin"
  },
  {
    id: 4,
    title: "Masjid Bersejarah Sultan Suriansyah",
    category: "Wisata Sejarah",
    coords: [-3.2988, 114.5761],
    emoji: "🕌",
    color: "#E63946",
    desc: "Masjid tertua di Kalimantan Selatan yang dibangun pada tahun 1526, berarsitektur kayu ulin khas Banjar.",
    time: "04.00 - 21.00 WITA",
    mapsUrl: "https://maps.google.com/?q=Masjid+Sultan+Suriansyah"
  },
  {
    id: 5,
    title: "Dermaga Kuliner Soto Bang Amat",
    category: "Gastronomi",
    coords: [-3.3012, 114.6035],
    emoji: "🍜",
    color: "#FF7B00",
    desc: "Kuliner soto Banjar autentik di tepian sungai sembari menikmati pertunjukan musik Panting khas Banjar.",
    time: "10.00 - 16.00 WITA",
    mapsUrl: "https://maps.google.com/?q=Soto+Bang+Amat+Banjarmasin"
  },
  {
    id: 6,
    title: "Konservasi Pulau Kembang",
    category: "Wisata Alam",
    coords: [-3.3045, 114.5589],
    emoji: "🏝️",
    color: "#8D5B4C",
    desc: "Pulau delta di tengah Sungai Barito yang menjadi habitat ribuan kera ekor panjang dan pura peninggalan lawas.",
    time: "07.00 - 17.00 WITA",
    mapsUrl: "https://maps.google.com/?q=Pulau+Kembang"
  },
  {
    id: 7,
    title: "Rumah Adat Bubungan Tinggi & Museum Wasaka",
    category: "Wisata Sejarah",
    coords: [-3.3031, 114.6082],
    emoji: "🏛️",
    color: "#7B2CBF",
    desc: "Mahakarya arsitektur rumah adat Banjar berdinding ukiran kayu ulin tempat menyimpan artefak perjuangan pahlawan Wasaka.",
    time: "08.00 - 15.00 WITA",
    mapsUrl: "https://maps.google.com/?q=Museum+Wasaka+Banjarmasin"
  },
  {
    id: 8,
    title: "Tugu Nol Kilometer (Pal 0)",
    category: "Landmark",
    coords: [-3.3168, 114.5901],
    emoji: "📍",
    color: "#F4C038",
    desc: "Monumen penanda titik nol kilometer acuan jarak Kota Banjarmasin yang dikelilingi taman terbuka hijau di tepi sungai.",
    time: "24 Jam Terbuka",
    mapsUrl: "https://maps.google.com/?q=Tugu+Nol+Kilometer+Banjarmasin"
  },
  {
    id: 9,
    title: "Masjid Raya Sabilal Muhtadin",
    category: "Wisata Sejarah",
    coords: [-3.3175, 114.5889],
    emoji: "🕌",
    color: "#00A896",
    desc: "Masjid raya terbesar kebanggaan warga Kalsel dengan kubah tembaga megah di tengah hutan kota seluas 10 hektar.",
    time: "04.00 - 22.00 WITA",
    mapsUrl: "https://maps.google.com/?q=Masjid+Raya+Sabilal+Muhtadin"
  },
  {
    id: 10,
    title: "Taman Siring 0 Km",
    category: "Landmark",
    coords: [-3.3179, 114.5910],
    emoji: "🌳",
    color: "#33C3B3",
    desc: "Kawasan pedestrian santai pesisir sungai Martapura yang dilengkapi arena rekreasi keluarga dan dermaga kelotok wisata.",
    time: "06.00 - 22.00 WITA",
    mapsUrl: "https://maps.google.com/?q=Taman+Siring+Banjarmasin"
  }
];


export default function InteractiveMap() {
  const { language } = useLanguage();
  
  const tMap = (key) => {
    return pagesTranslations[language]?.wisata?.interactiveMap?.[key] || 
           pagesTranslations['id']?.wisata?.interactiveMap?.[key] || 
           "";
  };

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  
  const locationsT = tMap('locations') || [];
  const translatedLocations = mapLocations.map((loc, index) => {
    const locT = locationsT[index] || {};
    return {
      ...loc,
      title: locT.title || loc.title,
      category: locT.category || loc.category,
      desc: locT.desc || loc.desc
    };
  });

  const [activeLoc, setActiveLoc] = useState(translatedLocations[0]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = tMap('categories') || ["Semua", "Landmark", "Wisata Bahari", "Ikon Kota", "Wisata Sejarah", "Gastronomi", "Wisata Alam"];
  const selectedCategoryIndex = categories.indexOf(selectedCategory) !== -1 ? categories.indexOf(selectedCategory) : 0;

  const filteredLocations = selectedCategoryIndex === 0 
    ? translatedLocations 
    : translatedLocations.filter((loc, idx) => {
        // Find original category name to filter correctly, or filter by translated
        const originalCategory = mapLocations[translatedLocations.findIndex(tl => tl.id === loc.id)].category;
        const originalSelectedCat = ["Semua", "Landmark", "Wisata Bahari", "Ikon Kota", "Wisata Sejarah", "Gastronomi", "Wisata Alam"][selectedCategoryIndex];
        return originalCategory === originalSelectedCat;
      });

  useEffect(() => {
    if (!mapContainerRef.current) return;

    let map = mapInstanceRef.current;
    
    // Inisialisasi Map pusat di Banjarmasin hanya sekali
    if (!map) {
      map = L.map(mapContainerRef.current, {
        center: [-3.3100, 114.6000],
        zoom: 13,
        zoomControl: false,
        scrollWheelZoom: false
      });

      // Use standard OpenStreetMap tiles to guarantee reliability and prevent grey maps
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abc',
        maxZoom: 19,
        keepBuffer: 8,
        updateWhenIdle: true,
        updateInterval: 150
      }).addTo(map);

      L.control.zoom({ position: 'bottomright' }).addTo(map);
      mapInstanceRef.current = map;
      setTimeout(() => { if (map) map.invalidateSize(); }, 200);

      // Add ResizeObserver to prevent map disappearing on container resize
      const resizeObserver = new ResizeObserver(() => {
        if (map) map.invalidateSize();
      });
      resizeObserver.observe(mapContainerRef.current);
      
      // Store observer in map object to clean it up later if needed
      map._resizeObserver = resizeObserver;
    }

    // Bersihkan marker lama
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Tambahkan Markers dengan data terjemahan terbaru
    translatedLocations.forEach(loc => {
      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `<div style="background-color: ${loc.color}; width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 0 15px ${loc.color}; border: 3px solid #ffffff; cursor: pointer; transition: transform 0.2s;">${loc.emoji}</div>`,
        iconSize: [38, 38],
        iconAnchor: [19, 19],
        popupAnchor: [0, -22]
      });

      const marker = L.marker(loc.coords, { icon: customIcon }).addTo(map);
      
      const popupContent = `
        <div style="font-family: 'Space Grotesk', sans-serif; min-width: 200px; padding: 4px;">
          <span style="background: ${loc.color}22; color: ${loc.color}; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 12px; text-transform: uppercase;">${loc.category}</span>
          <h4 style="margin: 6px 0 4px; font-size: 15px; font-weight: 800; color: #091422;">${loc.title}</h4>
          <p style="margin: 0; font-size: 12px; color: #475569; line-height: 1.4;">${loc.desc}</p>
        </div>
      `;
      
      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setActiveLoc(loc);
        map.flyTo(loc.coords, 15, { duration: 1.2 });
      });

      markersRef.current[loc.id] = marker;
    });

    // We do not cleanup the map instance here on unmount to prevent double rendering issues in StrictMode,
    // or we can clean it up if needed, but since it's reacting to `language`, we only clean markers.
    return () => {
       // Only clean up markers on re-render, not the whole map to avoid flickering
    };
  }, [language]);

  const handleLocationClick = (loc) => {
    setActiveLoc(loc);
    if (mapInstanceRef.current && markersRef.current[loc.id]) {
      mapInstanceRef.current.flyTo(loc.coords, 15, { duration: 1.2 });
      markersRef.current[loc.id].openPopup();
    }
  };

  return (
    <section className="py-20 max-w-[1240px] mx-auto px-4 border-t border-[var(--glass-border)]">
      <div className="text-center max-w-3xl mx-auto mb-12 wisata-reveal">
        <span className="text-xs font-black uppercase tracking-widest text-[#33C3B3] font-heading block mb-2">
          {tMap('tag') || "✦ RADAR EKSPLORASI SERIBU SUNGAI"}
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-[var(--text-main)] font-heading mb-4">
          {tMap('title') || "Peta Interaktif"} <span className="text-[#F4C038]">{tMap('titleSpan') || "Wisata Banjar"}</span>
        </h2>
        <p className="text-sm sm:text-base text-[var(--text-muted)] font-body">
          {tMap('subtitle') || "Klik destinasi pada daftar atau pin di peta untuk terbang langsung ke lokasi secara dinamis."}
        </p>
      </div>

      {/* Filter Categories */}
      <div className="flex items-center justify-center gap-2 flex-wrap mb-8">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full font-heading font-bold text-xs sm:text-sm transition-all border ${
              selectedCategory === cat
                ? 'bg-[#F4C038] text-[#091422] border-[#F4C038] shadow-[0_0_15px_rgba(244,192,56,0.3)] scale-105'
                : 'bg-[var(--card-bg)] text-[var(--text-muted)] border-[var(--glass-border)] hover:border-[#33C3B3]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Map + Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[32px] p-4 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden">
        
        {/* Left List of Locations */}
        <div className="lg:col-span-5 flex flex-col justify-between max-h-[480px] overflow-y-auto pr-2 space-y-3 wadai-scroll order-2 lg:order-1">
          <div className="space-y-3">
            {filteredLocations.map((loc) => {
              const isSelected = activeLoc?.id === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => handleLocationClick(loc)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border flex items-start gap-3 ${
                    isSelected
                      ? 'bg-[var(--bg-main)] border-[#F4C038] shadow-[0_5px_15px_rgba(244,192,56,0.15)] translate-x-1'
                      : 'bg-[var(--bg-main)]/40 border-[var(--glass-border)] hover:border-[#33C3B3]/50'
                  }`}
                >
                  <span className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 shadow-md" style={{ backgroundColor: `${loc.color}22`, border: `2px solid ${loc.color}` }}>
                    {loc.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded" style={{ backgroundColor: `${loc.color}22`, color: loc.color }}>
                        {loc.category}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] font-semibold">{loc.time}</span>
                    </div>
                    <h4 className="font-heading font-black text-sm sm:text-base text-[var(--text-main)] mt-1 truncate">
                      {loc.title}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] font-body line-clamp-2 mt-1 leading-relaxed">
                      {loc.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Map Canvas */}
        <div className="lg:col-span-7 h-[350px] sm:h-[480px] rounded-2xl overflow-hidden relative border border-[var(--glass-border)] shadow-inner order-1 lg:order-2">
          <div ref={mapContainerRef} className="w-full h-full z-10" />
          
          {/* Floating Action Button inside Map */}
          {activeLoc && (
            <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 z-[400] bg-[var(--card-bg)]/95 backdrop-blur-md border border-[#F4C038] p-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4">
              <div className="min-w-0">
                <span className="text-[10px] text-[#F4C038] font-bold uppercase tracking-wider block">{tMap('lokasiTerpilih') || "Lokasi Terpilih"}</span>
                <h5 className="font-heading font-black text-sm text-[var(--text-main)] truncate">{activeLoc.title}</h5>
              </div>
              <a
                href={activeLoc.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#F4C038] hover:bg-amber-400 text-[#091422] font-black text-xs px-4 py-2.5 rounded-xl shrink-0 shadow-md transition-transform hover:scale-105"
              >
                {tMap('bukaRute') || "Buka Rute ➔"}
              </a>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
