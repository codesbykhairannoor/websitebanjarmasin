import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SasiranganStudio({ sasiranganData, language, tLocal }) {
  const [activeMotif, setActiveMotif] = useState(sasiranganData[0] || {});
  const [baseColor, setBaseColor] = useState('#E63946');
  const [patternColor, setPatternColor] = useState('#091422');
  const [blendMode, setBlendMode] = useState('multiply');
  const [scale, setScale] = useState(100);

  const colorPalette = [
    '#F4C038', '#00A896', '#E63946', '#1E3A8A', '#8D5B4C', '#D4AF37', '#ffffff', '#091422', '#FACC15', '#34D399', '#A78BFA', '#F472B6'
  ];

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
            ? 'Design your own Sasirangan fabric. Select a motif, base color, and dye color to see it instantly applied on photorealistic draped cloth.'
            : 'Desain kain Sasirangan Anda sendiri. Pilih motif, warna dasar, dan warna pewarna untuk melihat hasilnya secara instan pada simulasi kain 3D.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[32px] p-6 md:p-10 shadow-md">
        
        {/* LEFT: Controls */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Motif Selector */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-[var(--text-main)] font-heading mb-4 border-b border-[var(--glass-border)] pb-2 flex justify-between items-center">
              <span>1. {language === 'en' ? 'Select Motif' : 'Pilih Motif'}</span>
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
              2. {language === 'en' ? 'Fabric Base Color' : 'Warna Dasar Kain'}
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

          {/* Dye Color Selector */}
          <div>
            <h4 className="text-sm font-black uppercase tracking-widest text-[var(--text-main)] font-heading mb-4 border-b border-[var(--glass-border)] pb-2">
              3. {language === 'en' ? 'Motif Dye Color' : 'Warna Celup Motif'}
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

          {/* Advanced Controls */}
          <div className="pt-2 flex flex-col sm:flex-row gap-6">
             <div className="flex-1">
               <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                 {language === 'en' ? 'Pattern Size' : 'Ukuran Motif'}
               </label>
               <input 
                 type="range" 
                 min="50" 
                 max="200" 
                 value={scale} 
                 onChange={(e) => setScale(Number(e.target.value))}
                 className="w-full accent-[#33C3B3]"
               />
             </div>
             <div className="flex-1">
               <label className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-2">
                 {language === 'en' ? 'Dye Method' : 'Metode Celup'}
               </label>
               <div className="flex gap-2">
                  <button onClick={() => setBlendMode('multiply')} className={`flex-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1.5 rounded-lg border transition-colors ${blendMode === 'multiply' ? 'bg-[#33C3B3] text-white border-[#33C3B3]' : 'border-[var(--glass-border)] text-[var(--text-muted)] hover:text-white'}`}>Multiply</button>
                  <button onClick={() => setBlendMode('screen')} className={`flex-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1.5 rounded-lg border transition-colors ${blendMode === 'screen' ? 'bg-[#33C3B3] text-white border-[#33C3B3]' : 'border-[var(--glass-border)] text-[var(--text-muted)] hover:text-white'}`}>Screen</button>
               </div>
             </div>
          </div>

        </div>

        {/* RIGHT: Photorealistic Live Preview */}
        <div className="lg:col-span-7 relative flex items-center justify-center min-h-[450px] bg-[#0f172a] rounded-[24px] border border-white/10 overflow-hidden shadow-inner group">
          
          <div className="relative w-full h-full min-h-[450px] overflow-hidden">
            
            {/* Layer 1: Base Fabric Color */}
            <div 
              className="absolute inset-0 transition-colors duration-500 ease-out" 
              style={{ backgroundColor: baseColor }} 
            />

            {/* Layer 2: The Sasirangan Pattern */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeMotif.id}-${blendMode}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full opacity-90"
                style={{
                  backgroundImage: `url('${activeMotif.image}')`,
                  backgroundSize: `${scale}%`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'repeat',
                  mixBlendMode: blendMode
                }}
              />
            </AnimatePresence>

            {/* Layer 3: Dye Color Tint Overlay (Colorizes the pattern) */}
            <div 
              className="absolute inset-0 transition-colors duration-500 ease-out pointer-events-none opacity-80"
              style={{ 
                backgroundColor: patternColor,
                mixBlendMode: 'color'
              }}
            />

            {/* Layer 4: Photorealistic 3D Shadows & Folds (Multiply) */}
            <img 
              src="/fabric-drape.png" 
              alt="Fabric Shadows" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80 pointer-events-none drop-shadow-2xl"
            />
            
            {/* Layer 5: Photorealistic 3D Highlights (Screen) */}
            <img 
              src="/fabric-drape.png" 
              alt="Fabric Highlights" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-30 pointer-events-none"
            />

            {/* Vignette effect for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)] pointer-events-none" />

          </div>

          {/* Save/Download CTA (Visual only for now) */}
          <div className="absolute bottom-6 right-6 z-10">
             <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold py-2.5 px-5 rounded-xl flex items-center gap-2 transition-all hover:scale-105 shadow-xl">
               📸 {language === 'en' ? 'Save Design' : 'Simpan Desain'}
             </button>
          </div>

        </div>
      </div>
    </section>
  );
}
