"use client";

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { usePathname } from 'next/navigation';

export default function SEO() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const domain = typeof window !== 'undefined' ? window.location.origin : "https://visitbanjarmasin.id";
  const canonicalUrl = `${domain}${pathname === '/' ? '' : pathname}`;

  const titles = {
    id: "Visit Banjarmasin | Portal Eksplorasi Wisata & Budaya",
    en: "Visit Banjarmasin | Tourism & Cultural Exploration Portal",
    ms: "Visit Banjarmasin | Portal Penerokaan Pelancongan & Budaya",
    zh: "Visit Banjarmasin | 旅游与文化探索门户"
  };

  const descriptions = {
    id: "Eksplorasi Kota Banjarmasin! Panduan resmi rute BRT, destinasi susur sungai, kuliner Soto Banjar, budaya Sasirangan, dan Peta Interaktif Smart City.",
    en: "Explore Banjarmasin City! The official guide to BRT routes, river cruise destinations, Banjar Soto culinary, Sasirangan culture, and Smart City Interactive Map.",
    ms: "Terokai Bandar Banjarmasin! Panduan rasmi laluan BRT, pelayaran sungai, masakan Soto Banjar, budaya Sasirangan, dan Peta Interaktif Smart City.",
    zh: "探索班贾尔马辛市！BRT路线、河流游轮目的地、Banjar Soto美食、Sasirangan文化和智能城市交互式地图的官方指南。"
  };

  const title = titles[language] || titles.id;
  const description = descriptions[language] || descriptions.id;

  // Schemas are now statically injected in index.html during build for maximum SEO resilience

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      <link rel="alternate" hrefLang="id" href={`${domain}/?lang=id`} />
      <link rel="alternate" hrefLang="en" href={`${domain}/?lang=en`} />
      <link rel="alternate" hrefLang="ms" href={`${domain}/?lang=ms`} />
      <link rel="alternate" hrefLang="zh" href={`${domain}/?lang=zh`} />
      <link rel="alternate" hrefLang="x-default" href={domain} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
