"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';

const SplashScreen = ({ isReady }) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (isReady) {
      // Tunggu animasi exit selesai sebelum menghapus dari DOM
      const timer = setTimeout(() => setShouldRender(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-[#050B14] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Lottie Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
            className="w-48 h-48 sm:w-64 sm:h-64 mb-8"
          >
            <Player
              autoplay
              loop
              src="/splash.json"
              style={{ width: '100%', height: '100%' }}
            />
          </motion.div>

          <div className="relative flex flex-col items-center justify-center">
            {/* Cinematic Shimmering Text */}
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative font-heading font-black text-4xl sm:text-6xl tracking-[0.3em] capitalize text-transparent bg-clip-text bg-gradient-to-r from-white/40 via-white to-white/40 animate-[shimmer_2.5s_infinite] bg-[length:200%_auto]"
            >
              Banjarmasin
            </motion.h2>
            
            {/* Minimalist Glowing River Line */}
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
              className="relative h-[2px] mt-6 bg-white/10 rounded-full overflow-hidden w-full max-w-xs"
            >
              <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#33C3B3] to-transparent animate-[flow_1.5s_ease-in-out_infinite]" />
              <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#F4C038] to-transparent animate-[flow_2s_ease-in-out_infinite_0.5s] mix-blend-screen" />
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="text-white/50 font-body text-xs sm:text-sm tracking-[0.4em] mt-8 uppercase font-semibold"
            >
              Kota Seribu Sungai
            </motion.p>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
