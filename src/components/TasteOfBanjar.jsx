import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TasteOfBanjar() {
  const [activeTab, setActiveTab] = useState(1);

  const foods = [
    {
      id: 1,
      name: "Soto Banjar Rempah Kapulaga",
      tabTitle: "🥣 Soto Banjar Rempah",
      aroma: "Harum Rempah Kapulaga, Kayu Manis & Cengkeh",
      desc: "Kaldu ayam kampung keemasan yang dimasak perlahan dengan rempah pilihan. Disajikan bersama suwiran daging ayam hangat, perkedel kentang lembut, dan ketupat pulen khas Banjar.",
      price: "Rp 25.000",
      img: "/kuliner/soto banjar.webp"
    },
    {
      id: 2,
      name: "Ketupat Kandangan Haruan Asap",
      tabTitle: "🥘 Ketupat Kandangan",
      aroma: "Gurih Santan Kental & Aroma Smokey Ikan Haruan",
      desc: "Ketupat pulen yang disiram kuah santan kaya bumbu kuning tradisional. Dipadukan dengan lauk ikan haruan (gabus) panggang asap yang memberikan cita rasa mendalam yang tiada duanya.",
      price: "Rp 30.000",
      img: "/kuliner/ketupat kandangan.webp"
    },
    {
      id: 3,
      name: "Lontong Orari Legendaris",
      tabTitle: "🌙 Lontong Orari",
      aroma: "Perpaduan Manis Gurih Bumbu Habang Khas Banjar",
      desc: "Lontong segitiga berukuran jumbo dengan siraman bumbu habang (merah) yang pekat. Disertai lauk telur bebek dan ayam kampung yang meresap sempurna hingga ke serat daging.",
      price: "Rp 35.000",
      img: "/kuliner/lontong orari.webp"
    },
    {
      id: 4,
      name: "Bingka Kentang Kembang",
      tabTitle: "🍯 Bingka Kentang",
      aroma: "Legit Lembut Aroma Santan Bakar & Kentang",
      desc: "Kue basah tradisional berbentuk kelopak bunga kembang bundar. Memiliki tekstur super lembut dan manis legit alami dari campuran kentang premium serta santan kelapa bakar.",
      price: "Rp 45.000",
      img: "/kuliner/bingka.webp"
    }
  ];

  const currentFood = foods.find(f => f.id === activeTab);

  return (
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
            <img loading="lazy" src={currentFood.img} alt={currentFood.name} className="spotlight-img" />
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
  );
}
