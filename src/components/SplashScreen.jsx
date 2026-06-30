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
      className={`fixed inset-0 z-[9999] bg-[#050B14] flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
        isReady ? 'opacity-0 translate-y-[-100%]' : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Container Kelotok & Air */}
      <div className="relative w-full max-w-sm h-64 flex flex-col items-center justify-center">
        
        {/* Ombak / Riak Air */}
        <div className="absolute bottom-10 w-[200%] h-12 flex space-x-2 animate-[slideLeft_3s_linear_infinite] opacity-30">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-16 h-4 bg-transparent border-b-2 border-t-0 border-l-0 border-r-0 border-[#33C3B3] rounded-[50%] flex-shrink-0" />
          ))}
        </div>

        {/* Perahu Kelotok Sederhana */}
        <div className="relative z-10 animate-[bounce_2s_ease-in-out_infinite]">
          {/* Layar / Atap */}
          <div className="w-16 h-8 bg-[#F4C038] rounded-t-xl mb-1 ml-4 shadow-lg border-2 border-black/20" />
          {/* Badan Perahu */}
          <div className="w-32 h-6 bg-[#33C3B3] rounded-b-full rounded-t-sm shadow-xl relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>

        {/* Text Loading */}
        <div className="absolute bottom-0 text-center">
          <h2 className="text-[#F4C038] font-heading font-black text-xl tracking-[0.3em] uppercase animate-pulse drop-shadow-md">
            Banjarmasin
          </h2>
          <p className="text-white/60 font-body text-xs tracking-widest mt-2 animate-pulse delay-150">
            Mempersiapkan Pelayaran...
          </p>
        </div>

      </div>

      <style>{`
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
