"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ isReady }) => {
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => setShouldRender(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[99999] bg-[#0D1117] flex flex-col items-center justify-center overflow-hidden splash-container"
        >
          {/* Background Batik/Sasirangan subtle pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="sasirangan-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M50 0 L100 50 L50 100 L0 50 Z" fill="none" stroke="#FFFFFF" strokeWidth="0.5"></path>
                  <circle cx="50" cy="50" r="10" fill="none" stroke="#FFFFFF" strokeWidth="0.5"></circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#sasirangan-pattern)"></rect>
            </svg>
          </div>

          <div className="flex flex-col items-center justify-center gap-8 relative z-10 w-full">
            <div className="text-center space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl sm:text-6xl md:text-7xl font-black tracking-widest uppercase text-white font-heading drop-shadow-2xl px-4"
              >
                Visit <span className="text-[#00B4D8]">Banjarmasin</span>
              </motion.h1>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex items-center justify-center gap-4 opacity-80"
              >
                <div className="h-[2px] w-12 sm:w-16 bg-[#00B4D8]"></div>
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-300 tracking-[0.4em] font-light uppercase">
                  Kota Seribu Sungai
                </p>
                <div className="h-[2px] w-12 sm:w-16 bg-[#00B4D8]"></div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
              className="relative h-[2px] mt-6 bg-gray-800 rounded-full overflow-hidden w-full max-w-xs shadow-inner"
            >
              <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#00B4D8] to-transparent animate-[flow_1.5s_ease-in-out_infinite]" />
              <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#F4C038] to-transparent animate-[flow_2s_ease-in-out_infinite_0.5s] mix-blend-screen" />
            </motion.div>
            
            {/* Subtle Water Wave animation effect at the bottom */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              transition={{ delay: 0.5, duration: 2 }}
              className="absolute bottom-0 left-0 w-full h-32 pointer-events-none"
            >
              <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.34,197.8,111.45,240.23,106.34,281.42,88.75,321.39,56.44Z" fill="#00B4D8"></path>
              </svg>
            </motion.div>
          </div>

          <style>{`
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
