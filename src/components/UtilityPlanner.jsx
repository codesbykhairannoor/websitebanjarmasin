import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function UtilityPlanner() {
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

  const current = spotsData[activeSpot];

  return (
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

          {/* Interactive Hotspot Selector Tabs */}
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

        {/* Interactive Route Display Card (Replacing PDF Download) */}
        <motion.div 
          key={activeSpot}
          className="interactive-map-card"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="map-card-header">
            <span className="map-spot-type">{current.type}</span>
            <span className="map-coords">📍 {current.coords}</span>
          </div>

          <h4 className="map-spot-title">{current.title}</h4>
          <p className="map-spot-highlight">"{current.highlight}"</p>

          <div className="map-logistics">
            <div className="logistic-item">
              <span className="logistic-label">Akses Transportasi:</span>
              <span className="logistic-val">{current.transport}</span>
            </div>
            <div className="logistic-item">
              <span className="logistic-label">Waktu Terbaik Kunjungan:</span>
              <span className="logistic-val">{current.bestTime}</span>
            </div>
          </div>

          <a 
            href={current.mapsUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-open-maps"
          >
            🗺️ Buka Rute Langsung di Google Maps ➔
          </a>
        </motion.div>
      </div>
    </section>
  );
}
