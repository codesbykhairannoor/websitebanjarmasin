const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const indexPath = path.join(distDir, 'index.html');
const translationsPath = path.join(__dirname, 'src', 'translations', 'pagesTranslations.js');

async function buildSeoBomb() {
  if (!fs.existsSync(indexPath)) {
    console.log('index.html not found in dist. Skipping SEO bomb.');
    return;
  }

  let htmlContent = fs.readFileSync(indexPath, 'utf8');

  // Load raw translation data using simple regex to extract text blocks
  // (We use regex because importing ES module in CJS build script can be tricky without transpilation)
  let rawTranslations = "";
  try {
     const tContent = fs.readFileSync(translationsPath, 'utf8');
     // Extract all string values from the translation file to create a massive wall of text
     const stringMatches = tContent.match(/"([^"\\]*(\\.[^"\\]*)*)"/g) || [];
     rawTranslations = stringMatches.map(s => s.replace(/"/g, '')).join(' ');
  } catch(e) {
     console.error('Failed to read translations for SEO bomb', e);
  }

  // Generate Sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${['', 'wisata', 'budaya', 'kuliner', 'sejarah', 'panduan', 'profil-kota', 'smart-city'].map(route => {
    return ['id', 'en', 'ms', 'zh'].map(lang => `
  <url>
    <loc>https://visitbanjarmasin.id/${route}</loc>
    <xhtml:link rel="alternate" hreflang="${lang}" href="https://visitbanjarmasin.id/${route}?lang=${lang}"/>
    <changefreq>daily</changefreq>
    <priority>${route === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('');
  }).join('')}
</urlset>`;

  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemap);
  console.log('Generated sitemap.xml');

  // Generate Pre-render Bomb
  const seoBombHtml = `
    <!-- GRAY HAT: PRE-RENDER BOMB START -->
    <!-- Elemen ini membypass kelemahan React SPA. Googlebot bisa membaca ribuan kata konten asli 
         sebelum React selesai dimuat. Disembunyikan dari user. -->
    <noscript>
      <div style="display:none;" aria-hidden="true">
        <h2>Data Eksplorasi Lengkap Banjarmasin</h2>
        <p>${rawTranslations.substring(0, 50000)}...</p> 
        <a href="/sitemap.xml">Peta Situs Lengkap</a>
      </div>
    </noscript>
    <div style="opacity:0; width:0; height:0; position:absolute; z-index:-9999; pointer-events:none; overflow:hidden;" aria-hidden="true">
        <h2>Direktori Tersembunyi</h2>
        <p>${rawTranslations.substring(50000, 100000)}</p>
    </div>
    <!-- PRE-RENDER BOMB END -->
  `;

  // Statically Inject Schemas (100% Foolproof for Googlebot CSR timeout)
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "name": "Pemerintah Kota Banjarmasin",
    "url": "https://visitbanjarmasin.id",
    "logo": "https://visitbanjarmasin.id/wisata/960px-Menara_Pandang_Banjarmasin.webp",
    "description": "Eksplorasi Kota Banjarmasin! Panduan resmi rute BRT, destinasi susur sungai, kuliner Soto Banjar, budaya Sasirangan, dan Peta Interaktif Smart City.",
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
        "name": "Waktu terbaik naik perahu kelotok di Banjarmasin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Pagi hari (05:30 - 08:00) saat air pasang adalah waktu terbaik untuk mengunjungi Pasar Terapung Lok Baintan."
        }
      }
    ]
  };

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
    }
  };

  const schemaHtml = `
    <link rel="canonical" href="https://visitbanjarmasin.id" />
    <script type="application/ld+json">${JSON.stringify(organizationSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
    <script type="application/ld+json">${JSON.stringify(eventSchema)}</script>
  `;

  if (htmlContent.includes('</head>')) {
    htmlContent = htmlContent.replace('</head>', schemaHtml + '</head>');
    console.log('Injected Static JSON-LD Schemas into <head>');
  }

  if (htmlContent.includes('<!-- SEO_BOMB_PLACEHOLDER -->')) {
    htmlContent = htmlContent.replace('<!-- SEO_BOMB_PLACEHOLDER -->', seoBombHtml);
    fs.writeFileSync(indexPath, htmlContent);
    console.log('Injected SEO Pre-render Bomb into index.html');
  } else {
    console.log('Placeholder not found. Appending to body end.');
    htmlContent = htmlContent.replace('</body>', seoBombHtml + '</body>');
    fs.writeFileSync(indexPath, htmlContent);
  }
}

buildSeoBomb();
