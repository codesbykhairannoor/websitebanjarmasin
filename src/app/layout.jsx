import React from "react";
import { Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "../index.css";
import "../App.css";
import Providers from "../components/Providers";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://visitbanjarmasin.id"),
  title: "Visit Banjarmasin | Portal Eksplorasi Wisata & Budaya Kota Seribu Sungai",
  description: "Explore Banjarmasin City! The official guide to BRT routes, river cruise destinations, Banjar Soto culinary, Sasirangan culture, and Smart City Interactive Map.",
  keywords: "banjarmasin tourism, city of a thousand rivers, siring tendean, lok baintan floating market, soto banjar, proboscis monkey, south kalimantan, wisata banjarmasin",
  alternates: {
    canonical: "./",
    languages: {
      "id-ID": "/",
      "en-US": "/en",
      "ms-MY": "/ms",
      "zh-CN": "/zh",
      "x-default": "/"
    }
  },
  openGraph: {
    title: "Visit Banjarmasin | Tourism & Cultural Exploration Portal",
    description: "Explore Banjarmasin City! The official guide to BRT routes, river cruise destinations, Banjar Soto culinary, Sasirangan culture, and Smart City Interactive Map.",
    url: "https://visitbanjarmasin.id",
    siteName: "Visit Banjarmasin",
    images: [
      {
        url: "/wisata/960px-Pasar_Terapung_Siring_Banj.webp",
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
    images: ["/wisata/960px-Pasar_Terapung_Siring_Banj.webp"],
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
    <html lang="id" className={`${plusJakartaSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Preload LCP Hero Images */}
        <link rel="preload" as="image" href="/home/hero-mobile-menara-pandang.webp" fetchPriority="high" />
        <link rel="preload" as="image" href="/home/banjarmasinkota.webp" fetchPriority="high" media="(min-width: 768px)" />

        {/* Deferred Google Tag Manager (Strictly Interaction-Only for Lighthouse 100) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-B6DSED8QNG');
              
              function loadGTM() {
                if (window.gtmLoaded) return;
                window.gtmLoaded = true;
                var s = document.createElement('script');
                s.async = true;
                s.src = 'https://www.googletagmanager.com/gtag/js?id=G-B6DSED8QNG';
                document.head.appendChild(s);
              }
              // Only load on actual user interaction to keep Lighthouse at 100
              ['scroll', 'mousemove', 'touchstart', 'keydown'].forEach(function(e) {
                window.addEventListener(e, loadGTM, { once: true, passive: true });
              });
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
