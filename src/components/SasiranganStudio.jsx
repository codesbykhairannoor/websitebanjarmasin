import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SasiranganStudio({ sasiranganData, language, tLocal }) {
  const [activeMotif, setActiveMotif] = useState(sasiranganData[0] || {});
  const [baseColor, setBaseColor] = useState('#F4C038');
  const [patternColor, setPatternColor] = useState('#091422');
  const [blendMode, setBlendMode] = useState('multiply');

  const colorPalette = [
    '#F4C038', '#00A896', '#E63946', '#1E3A8A', '#8D5B4C', '#D4AF37', '#ffffff', '#091422', '#FACC15', '#34D399', '#A78BFA', '#F472B6'
  ];

  const shirtSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 32c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zM96 96c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h32v224c0 35.3 28.7 64 64 64h192c35.3 0 64-28.7 64-64V224h32c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64H96z"/></svg>`;

  return (
    <section className="py-16 max-w-[1240px] mx-auto px-4 border-t border-[var(--glass-border)]">
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
        <span className="text-sm font-black uppercase tracking-widest text-[#F4C038] font-heading block mb-2">
          {language === 'en' ? 'Virtual Studio' : 'Studio Virtual'}
        </span>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[var(--text-main)] font-heading leading-tight mb-4">
          Sasirangan <span className="text-[#33C3B3]">Customizer</span>
        </h2>
        <p className="text-sm md:text-base text-[var(--text-muted)] mx-auto font-body leading-relaxed">
          {language === 'en' 
            ? 'Design your own Sasirangan shirt. Select a motif, base fabric color, and dye color to see it instantly applied on the virtual canvas.'
            : 'Desain kemeja Sasirangan Anda sendiri. Pilih motif, warna dasar kain, dan warna pewarna untuk melihat hasilnya secara instan di kanvas virtual.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[32px] p-6 md:p-10 shadow-md">
        
        {/* LEFT: Controls */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Motif Selector */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-[var(--text-main)] font-heading mb-4 border-b border-[var(--glass-border)] pb-2">
              1. {language === 'en' ? 'Select Motif' : 'Pilih Motif'}
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {sasiranganData.map(motif => (
                <button
                  key={motif.id}
                  onClick={() => setActiveMotif(motif)}
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${activeMotif.id === motif.id ? 'border-[#33C3B3] scale-105 shadow-lg shadow-[#33C3B3]/20' : 'border-[var(--glass-border)] opacity-60 hover:opacity-100 hover:scale-105 hover:border-white/20'}`}
                >
                  <img src={motif.image} alt={motif.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-1">
                    <span className="text-[10px] font-bold text-white text-center leading-tight drop-shadow-md">
                      {motif.name.replace('Motif ', '')}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Base Color Selector */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-[var(--text-main)] font-heading mb-4 border-b border-[var(--glass-border)] pb-2">
              2. {language === 'en' ? 'Fabric Color' : 'Warna Kain Dasar'}
            </h4>
            <div className="flex flex-wrap gap-3">
              {colorPalette.map(color => (
                <button
                  key={`base-${color}`}
                  onClick={() => setBaseColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${baseColor === color ? 'border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.4)]' : 'border-white/10 shadow-sm'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Motif/Dye Color Selector */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-[var(--text-main)] font-heading mb-4 border-b border-[var(--glass-border)] pb-2">
              3. {language === 'en' ? 'Dye Color' : 'Warna Pewarna Motif'}
            </h4>
            <div className="flex flex-wrap gap-3">
              {colorPalette.map(color => (
                <button
                  key={`dye-${color}`}
                  onClick={() => setPatternColor(color)}
                  className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${patternColor === color ? 'border-white scale-110 shadow-[0_0_12px_rgba(255,255,255,0.4)]' : 'border-white/10 shadow-sm'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Blend Mode Options */}
          <div className="pt-2">
             <div className="flex gap-2">
                <button onClick={() => setBlendMode('multiply')} className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors ${blendMode === 'multiply' ? 'bg-[#33C3B3] text-white border-[#33C3B3]' : 'border-[var(--glass-border)] text-[var(--text-muted)] hover:text-white'}`}>Multiply (Gelap)</button>
                <button onClick={() => setBlendMode('screen')} className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-colors ${blendMode === 'screen' ? 'bg-[#33C3B3] text-white border-[#33C3B3]' : 'border-[var(--glass-border)] text-[var(--text-muted)] hover:text-white'}`}>Screen (Terang)</button>
             </div>
          </div>

        </div>

        {/* RIGHT: Live Preview */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[400px] bg-slate-900 rounded-[24px] border border-white/5 overflow-hidden">
          
          {/* Background Ambient Glow */}
          <div className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none transition-colors duration-700" style={{ backgroundColor: baseColor }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] blur-[100px] rounded-full pointer-events-none transition-colors duration-700" style={{ backgroundColor: patternColor, opacity: 0.15 }}></div>
          
          {/* The Shirt Preview Area */}
          <div className="relative w-full max-w-[360px] aspect-square flex items-center justify-center group">
            
            {/* Outline / Drop Shadow for the shirt */}
            <div 
              className="absolute inset-0 bg-black/60 blur-md translate-y-4 pointer-events-none"
              style={{
                WebkitMaskImage: `url('${shirtSvg}')`,
                maskImage: `url('${shirtSvg}')`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat'
              }}
            />

            {/* Main Shirt Mask Container */}
            <motion.div 
              className="absolute inset-4 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] transition-colors duration-500"
              style={{
                backgroundColor: baseColor,
                WebkitMaskImage: `url('${shirtSvg}')`,
                maskImage: `url('${shirtSvg}')`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat'
              }}
              layoutId="shirt-preview"
            >
              
              {/* Pattern Overlay */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeMotif.id}-${blendMode}`}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full opacity-80"
                  style={{
                    backgroundImage: `url('${activeMotif.image}')`,
                    backgroundSize: '200px',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat',
                    mixBlendMode: blendMode
                  }}
                />
              </AnimatePresence>

              {/* Dye Color Tint Overlay */}
              <div 
                className="absolute inset-0 transition-colors duration-500 pointer-events-none mix-blend-overlay opacity-80"
                style={{ backgroundColor: patternColor }}
              />

              {/* Additional Shading for 3D fabric feel */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-white/20 mix-blend-overlay pointer-events-none" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />

            </motion.div>

          </div>

          {/* Save/Download CTA (Visual only for now) */}
          <div className="absolute bottom-6 right-6">
             <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition-all hover:scale-105 shadow-lg">
               📸 {language === 'en' ? 'Snapshot' : 'Simpan Foto'}
             </button>
          </div>

        </div>
      </div>
    </section>
  );
}
