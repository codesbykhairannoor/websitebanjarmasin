import React, { Suspense, lazy, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { HelmetProvider } from 'react-helmet-async';
import SEO from './components/SEO';
import ScrollToTop from './components/ScrollToTop';
import AcilAssistant from './components/AcilAssistant';
import SplashScreen from './components/SplashScreen';
import './App.css';

// Lazy load pages for performance optimization
const Home = lazy(() => import('./pages/Home'));
const Budaya = lazy(() => import('./pages/Budaya'));
const Wisata = lazy(() => import('./pages/Wisata'));
const Kuliner = lazy(() => import('./pages/Kuliner'));
const ProfilKota = lazy(() => import('./pages/ProfilKota'));
const Sejarah = lazy(() => import('./pages/Sejarah'));
const SmartCity = lazy(() => import('./pages/SmartCity'));
const Panduan = lazy(() => import('./pages/Panduan'));

// Loading fallback component
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw', backgroundColor: 'var(--martapura-night)' }}>
    <div style={{ width: '40px', height: '40px', border: '4px solid var(--glass-river)', borderTop: '4px solid var(--sasirangan-gold)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

// Error Boundary to catch ChunkLoadErrors (404 on old JS files after new deploy)
class ChunkLoadErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Chunk load error caught by boundary:", error, errorInfo);
    // If it's a dynamic import error, force reload the page to get new index.html
    const isChunkError = error?.message && /loading dynamically imported module|Importing a module script failed/i.test(error.message);
    const hasReloaded = sessionStorage.getItem('chunk_reloaded');
    
    if (isChunkError && !hasReloaded) {
      sessionStorage.setItem('chunk_reloaded', 'true');
      window.location.reload(true);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#fff', backgroundColor: 'var(--martapura-night)', height: '100vh' }}>
          <h2>Memuat versi terbaru...</h2>
          <p>Jika halaman tidak termuat otomatis, silakan muat ulang (refresh) halaman ini.</p>
          <button onClick={() => window.location.reload(true)} style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer', background: 'var(--sasirangan-gold)', border: 'none', borderRadius: '5px' }}>
            Muat Ulang
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Lightweight Route-aware Scroll Observer (Zero CPU Overhead during scrolling)
const ScrollObserver = () => {
  const location = useLocation();

  React.useEffect(() => {
    // Track SPA route navigation with Google Analytics 4
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', 'G-B6DSED8QNG', {
        page_path: location.pathname + location.search
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px 80px 0px' }
    );

    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(
        '.section-header, .wisata-reveal, .wisata-reveal-left, .wisata-reveal-right'
      );
      elements.forEach((el) => {
        if (!el.classList.contains('scroll-animate') && !el.classList.contains('in-view')) {
          el.classList.add('scroll-animate');
          observer.observe(el);
        } else if (!el.classList.contains('in-view')) {
          observer.observe(el);
        }
      });
    }, 120);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  return null;
};

export default function App() {
  const initialSeen = typeof window !== 'undefined' && sessionStorage.getItem('hasSeenSplash') === 'true';
  const [isAppReady, setIsAppReady] = useState(initialSeen);
  const [showSplash, setShowSplash] = useState(!initialSeen);

  useEffect(() => {
    // Preload semua bundle halaman di background agar saat pindah page antar menu langsung INSTAN 0 milidetik
    const timer = setTimeout(() => {
      import('./pages/Home');
      import('./pages/Wisata');
      import('./pages/Kuliner');
      import('./pages/Budaya');
      import('./pages/ProfilKota');
      import('./pages/Sejarah');
      import('./pages/SmartCity');
      import('./pages/Panduan');
    }, 1000);

    if (initialSeen) {
      return () => clearTimeout(timer);
    }

    // Daftar foto-foto utama yang PALING BERAT dan PALING AWAL dilihat user
    const criticalImages = [
      '/home/banjarmasinkota.webp',
      '/home/hero-mobile-menara-pandang.webp',
      '/home/hero_pasar_terapung.webp',
      '/home/hero-mobile-pasar-terapung.webp',
      '/profil kota/hero.webp',
      '/wisata/960px-Pasar_Terapung_Siring_Banj.webp'
    ];

    const preloadImage = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = resolve;
      });
    };

    // Eksekusi preload di background
    Promise.all(criticalImages.map(img => preloadImage(img)))
      .then(() => {
        setTimeout(() => {
          setIsAppReady(true);
          sessionStorage.setItem('hasSeenSplash', 'true');
        }, 1200);
      });

    return () => clearTimeout(timer);
  }, [initialSeen]);

  return (
    <HelmetProvider>
      <LanguageProvider>
        
        {/* INITIAL SPLASH SCREEN - HANYA MUNCUL 1X SAAT AWAL LOAD WEB (Di sesi yang sama) */}
        {showSplash && <SplashScreen isReady={isAppReady} />}

        {/* HIDE KONTEN SELAMA BELUM READY */}
        <div style={{ opacity: isAppReady ? 1 : 0, transition: showSplash ? 'opacity 0.5s ease-in' : 'none' }}>
          <BrowserRouter>
            <SEO />
            <ScrollToTop />
            <ScrollObserver />
            <ChunkLoadErrorBoundary>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/wisata" element={<Wisata />} />
                  <Route path="/kuliner" element={<Kuliner />} />
                  <Route path="/budaya" element={<Budaya />} />
                  <Route path="/profil" element={<ProfilKota />} />
                  <Route path="/sejarah" element={<Sejarah />} />
                  <Route path="/smart-city" element={<SmartCity />} />
                  <Route path="/panduan" element={<Panduan />} />
                </Routes>
              </Suspense>
            </ChunkLoadErrorBoundary>
            <AcilAssistant />
          </BrowserRouter>
        </div>
      </LanguageProvider>
    </HelmetProvider>
  );
}
