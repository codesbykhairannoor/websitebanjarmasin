import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Budaya from './pages/Budaya';
import Wisata from './pages/Wisata';
import Kuliner from './pages/Kuliner';
import ProfilKota from './pages/ProfilKota';
import Sejarah from './pages/Sejarah';
import SmartCity from './pages/SmartCity';
import Panduan from './pages/Panduan';
import AcilAssistant from './components/AcilAssistant';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
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
      <AcilAssistant />
    </BrowserRouter>
  );
}
