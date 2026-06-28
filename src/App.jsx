import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AcilAssistant from './components/AcilAssistant';
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

export default function App() {
  React.useEffect(() => {
    // Global Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Optional: observer.unobserve(entry.target) if we only want it to animate once
            // observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Function to re-observe elements
    const observeElements = () => {
      const elements = document.querySelectorAll('section, .bento-card, .section-header, .wisata-reveal, .wisata-reveal-left, .wisata-reveal-right');
      elements.forEach((el) => {
        if (!el.classList.contains('scroll-animate') && 
            !el.classList.contains('wisata-reveal') && 
            !el.classList.contains('wisata-reveal-left') && 
            !el.classList.contains('wisata-reveal-right')) {
          el.classList.add('scroll-animate');
        }
        observer.observe(el);
      });
    };

    // Observe initially
    observeElements();

    // Re-observe when DOM changes (e.g. route change)
    const mutationObserver = new MutationObserver(observeElements);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return (
    <BrowserRouter>
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
      <AcilAssistant />
    </BrowserRouter>
  );
}
