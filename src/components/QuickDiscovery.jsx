import React from 'react';
import { motion } from 'framer-motion';

export default function QuickDiscovery() {
  const spots = [
    {
      id: 1,
      title: "Pasar Terapung Lok Baintan",
      category: "Budaya Sungai",
      time: "⏰ 05.30 - 08.00 WITA",
      img: "https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1000&q=80",
      span: "bento-span-2"
    },
    {
      id: 2,
      title: "Menara Pandang & Siring",
      category: "Landmark Kota",
      time: "⏰ Terbuka 24 Jam",
      img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80",
      span: "bento-span-1"
    },
    {
      id: 3,
      title: "Pulau Kembang Borneo",
      category: "Hutan & Ekosistem",
      time: "⏰ 08.00 - 17.00 WITA",
      img: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80",
      span: "bento-span-1"
    },
    {
      id: 4,
      title: "Masjid Sultan Suriansyah",
      category: "Heritage 1526",
      time: "⏰ Wisata Religi",
      img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
      span: "bento-span-2"
    }
  ];

  return (
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
            <img src={s.img} alt={s.title} className="bento-bg" />
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
  );
}
