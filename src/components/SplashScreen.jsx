import React, { useState, useEffect } from 'react';

const SplashScreen = ({ isReady }) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (isReady) {
      // Tunggu animasi exit selesai sebelum menghapus dari DOM
      const timer = setTimeout(() => setShouldRender(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#050B14] flex flex-col items-center justify-center transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isReady ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="relative flex flex-col items-center justify-center">
        
        {/* Cinematic Shimmering Text */}
        <h2 className="relative font-heading font-black text-3xl sm:text-5xl tracking-[0.4em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-white/20 via-white to-white/20 animate-[shimmer_2s_infinite] bg-[length:200%_auto]">
          Banjarmasin
        </h2>
        
        {/* Minimalist Glowing River Line */}
        <div className="relative w-full h-[2px] mt-6 bg-white/10 rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#33C3B3] to-transparent animate-[flow_1.5s_ease-in-out_infinite]" />
          <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#F4C038] to-transparent animate-[flow_2s_ease-in-out_infinite_0.5s] mix-blend-screen" />
        </div>
        
        <p className="text-white/40 font-body text-xs sm:text-sm tracking-[0.3em] mt-8 uppercase font-semibold">
          Kota Seribu Sungai
        </p>

      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes flow {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
