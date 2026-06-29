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
    // Global Intersection Observer for smooth hardware-accelerated scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            // Unobserve once animated to guarantee buttery smooth scrolling without CPU overhead
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // Function to re-observe elements across all pages
    const observeElements = () => {
      const elements = document.querySelectorAll(
        'section, .bento-card, .section-header, .wisata-reveal, .wisata-reveal-left, .wisata-reveal-right, [class*="rounded-3xl"]:not(button):not(a):not(input), [class*="rounded-[40px]"]:not(button):not(a), [class*="rounded-[32px]"]:not(button):not(a), [class*="rounded-2xl"]:not(button):not(a):not(input), [class*="rounded-xl"]:not(button):not(a):not(input)'
      );
      elements.forEach((el) => {
        if (!el.classList.contains('scroll-animate') && 
            !el.classList.contains('wisata-reveal') && 
            !el.classList.contains('wisata-reveal-left') && 
            !el.classList.contains('wisata-reveal-right') &&
            !el.classList.contains('in-view')) {
          el.classList.add('scroll-animate');
          observer.observe(el);
        } else if (!el.classList.contains('in-view')) {
          observer.observe(el);
        }
      });
    };

    // Observe initially
    observeElements();

    // Debounced Re-observe when DOM changes (e.g. route change or data loading)
    let timeoutId = null;
    const debouncedObserve = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(observeElements, 150);
    };

    const mutationObserver = new MutationObserver(debouncedObserve);
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
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
