import React from "react";
import "../index.css";
import "../App.css";
import Providers from "../components/Providers";

export const metadata = {
  title: "Visit Banjarmasin | Portal Eksplorasi Wisata & Budaya Kota Seribu Sungai",
  description: "Explore Banjarmasin City! The official guide to BRT routes, river cruise destinations, Banjar Soto culinary, Sasirangan culture, and Smart City Interactive Map.",
  keywords: "banjarmasin tourism, city of a thousand rivers, siring tendean, lok baintan floating market, soto banjar, proboscis monkey, south kalimantan, wisata banjarmasin",
  openGraph: {
    title: "Visit Banjarmasin | Tourism & Cultural Exploration Portal",
    description: "Explore Banjarmasin City! The official guide to BRT routes, river cruise destinations, Banjar Soto culinary, Sasirangan culture, and Smart City Interactive Map.",
    url: "https://visitbanjarmasin.id",
    siteName: "Visit Banjarmasin",
    images: [
      {
        url: "https://visitbanjarmasin.id/wisata/960px-Pasar_Terapung_Siring_Banj.webp",
        width: 1200,
        height: 630,
        alt: "Visit Banjarmasin",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visit Banjarmasin | Tourism & Cultural Exploration Portal",
    description: "Explore Banjarmasin City! The official guide to BRT routes, river cruise destinations, Banjar Soto culinary, Sasirangan culture, and Smart City Interactive Map.",
    images: ["https://visitbanjarmasin.id/wisata/960px-Pasar_Terapung_Siring_Banj.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/favicon.webp", type: "image/webp" },
    ],
    apple: "/favicon.png",
  },
  other: {
    "theme-color": "#091422",
    "geo.region": "ID-KS",
    "geo.placename": "Banjarmasin",
    "geo.position": "-3.316694;114.590111",
    "ICBM": "-3.316694, 114.590111",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        {/* Preconnect & DNS Prefetch to Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Preload LCP Hero Images */}
        <link rel="preload" as="image" href="/home/hero-mobile-menara-pandang.webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/home/banjarmasinkota.webp" fetchPriority="high" media="(min-width: 768px)" />
        
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400..800;1,400..800&family=Space+Grotesk:wght@400..700&display=swap"
          rel="stylesheet"
        />

        {/* Google Tag Manager */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-B6DSED8QNG" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-B6DSED8QNG');
            `,
          }}
        />
      </head>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var currentTheme = localStorage.getItem('theme');
                  if (currentTheme) {
                    document.documentElement.setAttribute('data-theme', currentTheme);
                  } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    localStorage.setItem('theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
