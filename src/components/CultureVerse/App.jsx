import React from 'react';
import Navbar from './components/ui/Navbar';
import LoadingScreen from './components/ui/LoadingScreen';
import HeroOverlay from './components/ui/HeroOverlay';
import SdgModal from './components/ui/SdgModal';
import MotifDetailModal from './components/ui/MotifDetailModal';
import AudioPlayer from './components/ui/AudioPlayer';
import MobileLandscapeOverlay from './components/ui/MobileLandscapeOverlay';
import SettingsModal from './components/ui/SettingsModal';
import AboutModal from './components/ui/AboutModal';
import MobileJoystickOverlay from './components/ui/MobileJoystickOverlay';
import Scene from './components/canvas/Scene';

export default function App() {
  return (
    <div className="relative w-full h-screen overflow-hidden select-none bg-slate-950 font-sans">
      {/* 0. Mobile Landscape Blocker */}
      <MobileLandscapeOverlay />

      {/* 1. UI Overlay Layer (Drei useProgress & HTML Overlays) */}
      <LoadingScreen />
      <Navbar />
      <HeroOverlay />
      <SdgModal />
      <MotifDetailModal />
      <AudioPlayer />
      <SettingsModal />
      <AboutModal />
      <MobileJoystickOverlay />

      {/* 2. WebGL 3D Canvas Layer */}
      <Scene />
    </div>
  );
}
