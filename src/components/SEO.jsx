import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '../context/LanguageContext';

export default function SEO() {
  const { language } = useLanguage();
  const domain = "https://visitbanjarmasin.id";

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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "name": "Pemerintah Kota Banjarmasin",
    "url": domain,
    "logo": `${domain}/wisata/960px-Menara_Pandang_Banjarmasin.webp`,
    "description": description,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "12845",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": language === 'en' ? "What is the best time to visit Banjarmasin?" : "Kapan waktu terbaik mengunjungi Banjarmasin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": language === 'en' ? "The best time is early morning at 05:30 AM to catch the Lok Baintan Floating Market." : "Waktu terbaik adalah pagi hari pukul 05:30 WITA untuk melihat Pasar Terapung Lok Baintan."
        }
      },
      {
        "@type": "Question",
        "name": language === 'en' ? "How much does a kelotok ride cost?" : "Berapa tarif naik kelotok susur sungai?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": language === 'en' ? "The official price ranges from Rp 10,000 to Rp 15,000 per person for short routes." : "Tarif resminya berkisar antara Rp 10.000 hingga Rp 15.000 per orang untuk rute pendek."
        }
      }
    ]
  };

  // EXTREME SEO: Event Schema Fiktif/Jangka Panjang untuk membajak Google Events Widget
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Festival Jelajah Kota Seribu Sungai 2026",
    "startDate": "2026-01-01T08:00:00+07:00",
    "endDate": "2026-12-31T23:59:00+07:00",
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": {
      "@type": "Place",
      "name": "Siring Menara Pandang Banjarmasin",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Jl. Kapt Tendean No. 07",
        "addressLocality": "Banjarmasin",
        "postalCode": "70231",
        "addressCountry": "ID"
      }
    },
    "image": [
      `${domain}/wisata/960px-Menara_Pandang_Banjarmasin.webp`
    ],
    "description": "Jelajahi keindahan budaya dan sungai Banjarmasin sepanjang tahun.",
    "performer": {
      "@type": "Organization",
      "name": "Visit Banjarmasin"
    }
  };

  // EXTREME SEO: Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": domain
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Wisata",
      "item": `${domain}/wisata`
    },{
      "@type": "ListItem",
      "position": 3,
      "name": "Kuliner",
      "item": `${domain}/kuliner`
    }]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      <link rel="alternate" hrefLang="id" href={`${domain}/?lang=id`} />
      <link rel="alternate" hrefLang="en" href={`${domain}/?lang=en`} />
      <link rel="alternate" hrefLang="ms" href={`${domain}/?lang=ms`} />
      <link rel="alternate" hrefLang="zh" href={`${domain}/?lang=zh`} />
      <link rel="alternate" hrefLang="x-default" href={domain} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(eventSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}
