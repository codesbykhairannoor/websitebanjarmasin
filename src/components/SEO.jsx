"use client";

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';
import { usePathname } from 'next/navigation';

export default function SEO() {
  const { language } = useLanguage();
  const pathname = usePathname(); // e.g. /id/kuliner or /en
  const domain = "https://visitbanjarmasin.id";
  
  // Clean pathname by removing language prefix
  const pathWithoutLang = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '');
  const cleanPath = pathWithoutLang === '' ? '' : pathWithoutLang;

  const canonicalUrl = `${domain}/${language}${cleanPath}`;

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${domain}/#website`,
        "url": domain,
        "name": "Visit Banjarmasin",
        "description": "Official Tourism Guide for Banjarmasin City",
        "publisher": {
          "@type": "Organization",
          "name": "Pemerintah Kota Banjarmasin",
          "logo": {
            "@type": "ImageObject",
            "url": `${domain}/favicon.png`
          }
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${domain}/${language}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "City",
        "@id": `${domain}/#city`,
        "name": "Banjarmasin",
        "alternateName": "Kota Seribu Sungai",
        "url": domain,
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-3.316694",
          "longitude": "114.590111"
        },
        "description": description
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${domain}/${language}`
          },
          ...(cleanPath ? [{
            "@type": "ListItem",
            "position": 2,
            "name": cleanPath.replace('/', '').charAt(0).toUpperCase() + cleanPath.replace('/', '').slice(1),
            "item": canonicalUrl
          }] : [])
        ]
      }
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      <link rel="alternate" hrefLang="id" href={`${domain}/id${cleanPath}`} />
      <link rel="alternate" hrefLang="en" href={`${domain}/en${cleanPath}`} />
      <link rel="alternate" hrefLang="ms" href={`${domain}/ms${cleanPath}`} />
      <link rel="alternate" hrefLang="zh" href={`${domain}/zh${cleanPath}`} />
      <link rel="alternate" hrefLang="x-default" href={`${domain}/id${cleanPath}`} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}
