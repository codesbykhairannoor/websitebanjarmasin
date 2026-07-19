import React from 'react';
import { useAppStore } from '../../store/useAppStore';
import { MOTIFS_DATA } from '../../data/motifsData';
import { Sparkles, Volume2, VolumeX, RotateCcw, Globe, Award, Home, Terminal } from 'lucide-react';

export default function Navbar() {
  const { currentView, setView } = useAppStore();

  if (currentView === 'hero') return null;

  return (
    <header className="fixed top-0 left-0 z-50 pointer-events-none font-sans w-full">
      {/* Removed the Custom Back Button because Global Navbar handles it */}

      {/* Settings Button, flush right */}
      <button 
        onClick={() => useAppStore.getState().setSettingsOpen(true)}
        className="pointer-events-auto absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-xl bg-slate-950/90 backdrop-blur-2xl border border-white/20 text-amber-400 hover:text-amber-300 transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-md"
        title="Buka Pengaturan"
      >
        <span className="text-xl">⚙</span>
      </button>
    </header>
  );
}
