import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const routeLocations = [
  // 🚌 Rute BRT Trans Banjarbakula
  {
    id: 101,
    title: "Halte Bandara Syamsudin Noor",
    category: "🚌 Rute BRT",
    coords: [-3.4425, 114.7553],
    emoji: "✈️",
    color: "#3B82F6",
    desc: "Titik keberangkatan bus BRT Trans Banjarbakula (Rute Bandara 1) menuju Terminal Gambut Barakat Km 17. Bayar cashless QRIS Rp 5.000.",
    info: "Tarif Flat Rp 5.000",
    mapsUrl: "https://maps.google.com/?q=Bandara+Syamsudin+Noor"
  },
  {
    id: 102,
    title: "Terminal Gambut Barakat (Km 17)",
    category: "🚌 Rute BRT",
    coords: [-3.4011, 114.6834],
    emoji: "🚌",
    color: "#3B82F6",
    desc: "Hub transit utama bagi seluruh koridor Trans Banjarbakula. Tempat transit perpindahan bus dari arah bandara menuju pusat kota Banjarmasin.",
    info: "Hub Transit Utama",
    mapsUrl: "https://maps.google.com/?q=Terminal+Gambut+Barakat+Km+17"
  },
  {
    id: 103,
    title: "Halte Siring Menara Pandang (Km 0)",
    category: "🚌 Rute BRT",
    coords: [-3.3186, 114.5924],
    emoji: "🚏",
    color: "#3B82F6",
    desc: "Halte pemberhentian Koridor 2 di pusat keramaian wisata Siring Menara Pandang dan Pasar Terapung Tendean.",
    info: "Koridor 2 (Pusat Kota)",
    mapsUrl: "https://maps.google.com/?q=Menara+Pandang+Banjarmasin"
  },
  {
    id: 104,
    title: "Halte Pasar Sudimampir",
    category: "🚌 Rute BRT",
    coords: [-3.3218, 114.5891],
    emoji: "🛍️",
    color: "#3B82F6",
    desc: "Halte strategis di kawasan niaga dan perbelanjaan lawas Sudimampir, dekat dengan akses kuliner tradisional.",
    info: "Akses Pusat Niaga",
    mapsUrl: "https://maps.google.com/?q=Pasar+Sudimampir+Banjarmasin"
  },
  {
    id: 105,
    title: "Halte Universitas Lambung Mangkurat",
    category: "🚌 Rute BRT",
    coords: [-3.2985, 114.5842],
    emoji: "🎓",
    color: "#3B82F6",
    desc: "Halte Koridor 1 di kawasan pendidikan Kayutangi, melayani akses mobilitas mahasiswa dan masyarakat umum utara kota.",
    info: "Koridor 1 (Kayutangi)",
    mapsUrl: "https://maps.google.com/?q=Universitas+Lambung+Mangkurat+Banjarmasin"
  },

  // 🏝️ Destinasi Wisata
  {
    id: 151,
    title: "Menara Pandang & Siring Martapura",
    category: "🏝️ Destinasi Wisata",
    coords: [-3.3186, 114.5924],
    emoji: "🗼",
    color: "#F4C038",
    desc: "Landmark ikonik di pusat kota dengan pemandangan 360 derajat Sungai Martapura dan pusat keramaian siring.",
    info: "Landmark Ikonik 360°",
    mapsUrl: "https://maps.google.com/?q=Menara+Pandang+Banjarmasin"
  },
  {
    id: 152,
    title: "Patung Maskot Bekantan",
    category: "🏝️ Destinasi Wisata",
    coords: [-3.3194, 114.5915],
    emoji: "🐵",
    color: "#33C3B3",
    desc: "Patung perunggu raksasa satwa endemik Borneo yang menyemburkan air langsung ke arah Sungai Martapura.",
    info: "Ikon Kota 24 Jam",
    mapsUrl: "https://maps.google.com/?q=Patung+Bekantan+Banjarmasin"
  },
  {
    id: 153,
    title: "Masjid Bersejarah Sultan Suriansyah",
    category: "🏝️ Destinasi Wisata",
    coords: [-3.2988, 114.5761],
    emoji: "🕌",
    color: "#E63946",
    desc: "Masjid tertua di Kalimantan Selatan yang dibangun pada tahun 1526, berarsitektur kayu ulin khas Banjar.",
    info: "Wisata Sejarah 1526",
    mapsUrl: "https://maps.google.com/?q=Masjid+Sultan+Suriansyah"
  },
  {
    id: 154,
    title: "Dermaga Kuliner Soto Bang Amat",
    category: "🏝️ Destinasi Wisata",
    coords: [-3.3012, 114.6035],
    emoji: "🍜",
    color: "#FF7B00",
    desc: "Kuliner soto Banjar autentik di tepian sungai sembari menikmati pertunjukan musik Panting khas Banjar.",
    info: "Gastronomi Soto Banjar",
    mapsUrl: "https://maps.google.com/?q=Soto+Bang+Amat+Banjarmasin"
  },

  // 🛶 Dermaga Sungai
  {
    id: 201,
    title: "Dermaga Kelotok Siring Tendean",
    category: "🛶 Dermaga Sungai",
    coords: [-3.3180, 114.5930],
    emoji: "🚤",
    color: "#00A896",
    desc: "Pusat persewaan perahu kelotok wisata resmi. Melayani susur sungai reguler (Rp 15.000/orang) dan carter rombongan ke Pasar Terapung Lok Baintan.",
    info: "Susur Sungai & Carter",
    mapsUrl: "https://maps.google.com/?q=Dermaga+Siring+Tendean"
  },
  {
    id: 202,
    title: "Pasar Terapung Lok Baintan",
    category: "🛶 Dermaga Sungai",
    coords: [-3.2872, 114.6397],
    emoji: "🛶",
    color: "#00A896",
    desc: "Tujuan utama perahu wisata subuh menyusuri Sungai Martapura. Rasakan sensasi bertransaksi di atas perahu jukung tradisional.",
    info: "Waktu Subuh (05.30 WITA)",
    mapsUrl: "https://maps.google.com/?q=Pasar+Terapung+Lok+Baintan"
  },
  {
    id: 203,
    title: "Pelabuhan Trisakti Banjarmasin",
    category: "🛶 Dermaga Sungai",
    coords: [-3.3190, 114.5650],
    emoji: "🚢",
    color: "#00A896",
    desc: "Gerbang utama transportasi kapal laut penumpang dan logistik yang menghubungkan Kalimantan Selatan dengan Pulau Jawa.",
    info: "Gerbang Kapal Laut",
    mapsUrl: "https://maps.google.com/?q=Pelabuhan+Trisakti+Banjarmasin"
  },

  // 🏨 Hotel Pilihan
  {
    id: 301,
    title: "Swiss-Belhotel Borneo Riverfront",
    category: "🏨 Hotel Pilihan",
    coords: [-3.3225, 114.5950],
    emoji: "🏨",
    color: "#F4C038",
    desc: "Hotel bintang empat dengan dermaga pribadi dan teras restoran terbuka langsung menghadap lalu lintas Sungai Martapura.",
    info: "Bintang 4 • Dermaga Pribadi",
    mapsUrl: "https://maps.google.com/?q=Swiss-Belhotel+Borneo+Banjarmasin"
  },
  {
    id: 302,
    title: "Favehotel Kapt. Tendean",
    category: "🏨 Hotel Pilihan",
    coords: [-3.3178, 114.5935],
    emoji: "🛌",
    color: "#F4C038",
    desc: "Tepat di seberang Menara Pandang. Pilihan terbaik bagi pejalan kaki yang ingin menjelajahi Siring Tendean kapan saja.",
    info: "1 Mnt Jalan Kaki ke Siring",
    mapsUrl: "https://maps.google.com/?q=Favehotel+Banjarmasin"
  },
  {
    id: 303,
    title: "Summer Bed & Breakfast",
    category: "🏨 Hotel Pilihan",
    coords: [-3.3205, 114.6050],
    emoji: "☕",
    color: "#F4C038",
    desc: "Boutique hotel berdesain kayu estetik dengan kafe rooftop favorit pelancong muda untuk bersantai menikmati sunset sungai.",
    info: "Boutique & Kafe Rooftop",
    mapsUrl: "https://maps.google.com/?q=Summer+Bed+and+Breakfast+Banjarmasin"
  },
  {
    id: 304,
    title: "Rattan Inn & Resort",
    category: "🏨 Hotel Pilihan",
    coords: [-3.3389, 114.6185],
    emoji: "🌴",
    color: "#F4C038",
    desc: "Nuansa resort tropis dengan kolam renang bergaya Bali. Berada di jalan protokol utama menuju Bandara Syamsudin Noor.",
    info: "Resort & Akses Bandara",
    mapsUrl: "https://maps.google.com/?q=Rattan+Inn+Banjarmasin"
  },

  // 🚨 Posko Darurat
  {
    id: 401,
    title: "RSUD Ulin Banjarmasin",
    category: "🚨 Posko Darurat",
    coords: [-3.3265, 114.6015],
    emoji: "🏥",
    color: "#E63946",
    desc: "Rumah sakit pusat rujukan tingkat provinsi terlengkap di Kalimantan Selatan dengan fasilitas IGD modern siaga 24 jam.",
    info: "IGD 24 Jam • (0511) 3252180",
    mapsUrl: "https://maps.google.com/?q=RSUD+Ulin+Banjarmasin"
  },
  {
    id: 402,
    title: "Mako Polairud Polda Kalsel (Siring)",
    category: "🚨 Posko Darurat",
    coords: [-3.3175, 114.5920],
    emoji: "👮‍♂️",
    color: "#E63946",
    desc: "Posko kepolisian perairan di kawasan Siring. Siaga menjaga keamanan ketertiban masyarakat dan keselamatan perahu wisata.",
    info: "Darurat Keamanan • Call 110",
    mapsUrl: "https://maps.google.com/?q=Polairud+Polda+Kalsel"
  },
  {
    id: 403,
    title: "Posko Tourist Information Center (TIC)",
    category: "🚨 Posko Darurat",
    coords: [-3.3183, 114.5928],
    emoji: "ℹ️",
    color: "#E63946",
    desc: "Pusat pelayanan informasi wisata resmi Pemkot Banjarmasin di Siring Menara Pandang. Siaga membantu panduan rute wisatawan.",
    info: "Pusat Bantuan Wisatawan",
    mapsUrl: "https://maps.google.com/?q=Menara+Pandang+Banjarmasin"
  }
];

export default function RouteAccessibilityMap() {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const [activeLoc, setActiveLoc] = useState(routeLocations[0]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const categories = ["Semua", "🚌 Rute BRT", "🏝️ Destinasi Wisata", "🛶 Dermaga Sungai", "🏨 Hotel Pilihan", "🚨 Posko Darurat"];

  const filteredLocations = selectedCategory === "Semua"
    ? routeLocations
    : routeLocations.filter(loc => loc.category === selectedCategory);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Inisialisasi Map pusat di Banjarmasin (zoom 12 agar cakupan ke Km 17 & Bandara terlihat proporsional)
    const map = L.map(mapContainerRef.current, {
      center: [-3.3300, 114.6200],
      zoom: 12,
      zoomControl: false,
      scrollWheelZoom: false
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);
    mapInstanceRef.current = map;

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Markers ketika filter berubah atau render awal
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Bersihkan marker lama
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    filteredLocations.forEach(loc => {
      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `<div style="background-color: ${loc.color}; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 0 18px ${loc.color}; border: 3px solid #ffffff; cursor: pointer; transition: transform 0.2s;">${loc.emoji}</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -22]
      });

      const marker = L.marker(loc.coords, { icon: customIcon }).addTo(map);

      const popupContent = `
        <div style="font-family: 'Space Grotesk', sans-serif; min-width: 230px; padding: 4px;">
          <span style="background: ${loc.color}22; color: ${loc.color}; font-size: 10px; font-weight: 800; padding: 3px 10px; border-radius: 12px; text-transform: uppercase;">${loc.category}</span>
          <h4 style="margin: 8px 0 4px; font-size: 15px; font-weight: 800; color: #091422;">${loc.title}</h4>
          <p style="margin: 0 0 8px; font-size: 12px; color: #475569; line-height: 1.4;">${loc.desc}</p>
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #e2e8f0; padding-top: 8px; margin-top: 4px;">
            <span style="font-size: 11px; font-weight: 700; color: #00A896;">📌 ${loc.info}</span>
            <a href="${loc.mapsUrl}" target="_blank" rel="noopener noreferrer" style="font-size: 11px; font-weight: 800; color: #091422; background: #F4C038; padding: 4px 10px; border-radius: 8px; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; box-shadow: 0 2px 8px rgba(244,192,56,0.4);">🗺️ Rute Maps ➔</a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setActiveLoc(loc);
        map.flyTo(loc.coords, 14, { duration: 1.2 });
      });

      markersRef.current[loc.id] = marker;
    });

    // Sesuaikan view jika ada lokasi yang aktif
    if (filteredLocations.length > 0) {
      const firstLoc = filteredLocations[0];
      setActiveLoc(firstLoc);
      map.flyTo(firstLoc.coords, 13, { duration: 1 });
    }
  }, [selectedCategory]);

  const handleLocationClick = (loc) => {
    setActiveLoc(loc);
    if (mapInstanceRef.current && markersRef.current[loc.id]) {
      mapInstanceRef.current.flyTo(loc.coords, 15, { duration: 1.2 });
      markersRef.current[loc.id].openPopup();
    }
  };

  return (
    <div className="w-full">
      {/* Header Khusus Section Peta Rute & Aksesibilitas */}
      <div className="text-center max-w-3xl mx-auto mb-8 animate-fadeIn">
        <span className="text-xs font-black uppercase tracking-widest text-[#00A896] font-heading block mb-2">
          ✦ RADAR AKSESIBILITAS &amp; KONEKTIVITAS KOTA
        </span>
        <h3 className="text-2xl sm:text-4xl font-black text-[var(--text-main)] font-heading mb-3">
          Peta Rute &amp; <span className="text-[#F4C038]">Titik Strategis</span>
        </h3>
        <p className="text-xs sm:text-sm text-[var(--text-muted)] font-body">
          Lacak posisi halte bus BRT Trans Banjarbakula, destinasi wisata ikonik, dermaga kelotok, hotel pilihan, hingga posko medis darurat secara live.
        </p>
      </div>

      {/* Filter Category Pills */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 sm:px-5 py-2.5 rounded-full font-heading font-black text-xs sm:text-sm transition-all border shadow-sm ${
              selectedCategory === cat
                ? 'bg-[#F4C038] text-[#091422] border-[#F4C038] shadow-[0_0_20px_rgba(244,192,56,0.4)] scale-105'
                : 'bg-[var(--card-bg)] text-[var(--text-muted)] border-[var(--glass-border)] hover:border-[#00A896] hover:text-[var(--text-main)]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Map + Dashboard Command Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[32px] p-4 sm:p-6 shadow-2xl backdrop-blur-md overflow-hidden">
        
        {/* Left List of Locations (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between max-h-[520px] overflow-y-auto pr-2 space-y-3 wadai-scroll order-2 lg:order-1">
          <div className="space-y-3">
            {filteredLocations.map((loc) => {
              const isSelected = activeLoc?.id === loc.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => handleLocationClick(loc)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-[var(--bg-main)] border-[#F4C038] shadow-[0_5px_20px_rgba(244,192,56,0.2)] translate-x-1.5'
                      : 'bg-[var(--bg-main)]/50 border-[var(--glass-border)] hover:border-[#00A896]/60'
                  }`}
                >
                  <span
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-md transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${loc.color}22`, border: `2px solid ${loc.color}` }}
                  >
                    {loc.emoji}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md"
                        style={{ backgroundColor: `${loc.color}22`, color: loc.color }}
                      >
                        {loc.category}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)] font-bold">{loc.info}</span>
                    </div>
                    <h4 className="font-heading font-black text-sm sm:text-base text-[var(--text-main)] mt-1.5 truncate">
                      {loc.title}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] font-body line-clamp-2 mt-1 leading-relaxed">
                      {loc.desc}
                    </p>
                    <div className="mt-3 pt-2.5 border-t border-[var(--glass-border)]/60 flex items-center justify-between gap-2">
                      <span className="text-[10px] font-bold text-[#00A896] truncate">📌 {loc.info}</span>
                      <a
                        href={loc.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-[10px] font-black bg-[#F4C038]/15 hover:bg-[#F4C038] text-[#F4C038] hover:text-[#091422] px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 border border-[#F4C038]/30 hover:border-[#F4C038] shrink-0 shadow-sm"
                      >
                        <span>🗺️</span> Google Maps ➔
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[var(--glass-border)] flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono">
            <span>💡 Klik item untuk fokus di peta</span>
            <span>Total: {filteredLocations.length} Titik</span>
          </div>
        </div>

        {/* Right Interactive Leaflet Map (7 cols) */}
        <div className="lg:col-span-7 h-[380px] sm:h-[520px] rounded-2xl overflow-hidden relative border border-[var(--glass-border)] shadow-inner order-1 lg:order-2">
          <div ref={mapContainerRef} className="w-full h-full z-10" />
          
          {/* Active Location Floating Badge */}
          {activeLoc && (
            <div className="absolute top-4 left-4 right-4 sm:right-auto z-20 bg-black/85 backdrop-blur-md text-white p-3.5 rounded-2xl border border-white/20 shadow-2xl flex items-center justify-between gap-4 animate-fadeIn pointer-events-auto">
              <div className="flex items-center gap-3 min-w-0 pointer-events-none">
                <span className="text-2xl">{activeLoc.emoji}</span>
                <div className="min-w-0">
                  <span className="text-[10px] font-black text-[#F4C038] uppercase tracking-widest block">{activeLoc.category}</span>
                  <h5 className="font-heading font-black text-xs sm:text-sm truncate text-white">{activeLoc.title}</h5>
                </div>
              </div>
              <a
                href={activeLoc.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-black bg-[#F4C038] hover:bg-amber-400 text-[#091422] px-3 py-1.5 rounded-xl transition-all shrink-0 flex items-center gap-1 shadow-[0_2px_10px_rgba(244,192,56,0.4)] hover:scale-105"
              >
                <span>🗺️</span> Buka Maps ➔
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
