import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export default function SEOMeta() {
  const { language } = useLanguage();

  // Multi-language SEO Content
  const seoData = {
    id: {
      title: "Visit Banjarmasin | Portal Eksplorasi Wisata & Budaya Kota Seribu Sungai",
      description: "Jelajahi Kota Banjarmasin! Panduan resmi rute BRT, destinasi wisata susur sungai, kuliner Soto Banjar, budaya Sasirangan, hingga Peta Interaktif Smart City.",
      keywords: "wisata banjarmasin, kota seribu sungai, siring tendean, pasar terapung lok baintan, soto banjar, bekantan, kalimantan selatan",
      lang: "id-ID"
    },
    en: {
      title: "Visit Banjarmasin | Tourism & Cultural Exploration Portal of the City of a Thousand Rivers",
      description: "Explore Banjarmasin City! The official guide to BRT routes, river cruise destinations, Banjar Soto culinary, Sasirangan culture, and Smart City Interactive Map.",
      keywords: "banjarmasin tourism, city of a thousand rivers, siring tendean, lok baintan floating market, soto banjar, proboscis monkey, south kalimantan",
      lang: "en-US"
    },
    ms: {
      title: "Visit Banjarmasin | Portal Eksplorasi Pelancongan & Budaya Kota Seribu Sungai",
      description: "Terokai Kota Banjarmasin! Panduan rasmi laluan BRT, destinasi pelancongan menyusuri sungai, kulinari Soto Banjar, budaya Sasirangan, dan Peta Interaktif Smart City.",
      keywords: "pelancongan banjarmasin, kota seribu sungai, siring tendean, pasar terapung lok baintan, soto banjar, bekantan, kalimantan selatan",
      lang: "ms-MY"
    },
    zh: {
      title: "Visit Banjarmasin | 千河之城旅游与文化探索门户",
      description: "探索马辰市！BRT 路线、内河巡游旅游目的地、Banjar Soto 美食、Sasirangan 文化和智能城市互动地图的官方指南。",
      keywords: "马辰旅游, 千河之城, siring tendean, lok baintan 水上市场, soto banjar, 长鼻猴, 南加里曼丹",
      lang: "zh-CN"
    }
  };

  const currentSEO = seoData[language] || seoData.id;
  const canonicalUrl = "https://visitbanjarmasin.id";

  // AI-Friendly Structured Data (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristDestination",
    "name": "Banjarmasin - Kota Seribu Sungai",
    "alternateName": ["City of a Thousand Rivers", "马辰", "Banjarmasin City"],
    "description": currentSEO.description,
    "url": canonicalUrl,
    "image": "https://visitbanjarmasin.id/wisata/960px-Pasar_Terapung_Siring_Banj.webp",
    "touristType": [
      "Cultural tourism",
      "River tourism",
      "Culinary tourism",
      "Backpacking"
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -3.316694,
      "longitude": 114.590111
    },
    "publicAccess": true
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={currentSEO.lang} />
      <title>{currentSEO.title}</title>
      <meta name="title" content={currentSEO.title} />
      <meta name="description" content={currentSEO.description} />
      <meta name="keywords" content={currentSEO.keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Multi-language hreflang tags for Google to crawl all versions properly */}
      <link rel="alternate" href={canonicalUrl} hrefLang="id-ID" />
      <link rel="alternate" href={canonicalUrl} hrefLang="en-US" />
      <link rel="alternate" href={canonicalUrl} hrefLang="ms-MY" />
      <link rel="alternate" href={canonicalUrl} hrefLang="zh-CN" />
      <link rel="alternate" href={canonicalUrl} hrefLang="x-default" />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={currentSEO.title} />
      <meta property="og:description" content={currentSEO.description} />
      <meta property="og:image" content="https://visitbanjarmasin.id/wisata/960px-Pasar_Terapung_Siring_Banj.webp" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={currentSEO.title} />
      <meta property="twitter:description" content={currentSEO.description} />
      <meta property="twitter:image" content="https://visitbanjarmasin.id/wisata/960px-Pasar_Terapung_Siring_Banj.webp" />

      {/* AI-Friendly Structured Data (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}
