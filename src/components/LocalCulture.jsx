import React from 'react';

export default function LocalCulture() {
  return (
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
              src="https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?fit=crop&w=1000&q=75&fm=webp" 
              alt="Acil Pasar Terapung Lok Baintan" 
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
  );
}
