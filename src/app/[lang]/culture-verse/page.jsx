import React from 'react';
import CultureVerseClient from './CultureVerseClient';

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const seoDB = {
    id: {
      title: "Virtual Tour 3D Museum Banjar | Visit Banjarmasin",
      description: "Jelajahi museum virtual 3D interaktif kebudayaan Banjar. Eksplorasi motif Sasirangan, mini games edukatif, dan artefak sejarah Kota Seribu Sungai.",
      keywords: "virtual tour banjarmasin, 3d museum banjar, sasirangan 3d, rumah adat banjar 3d, visit banjarmasin cultureverse",
    },
    en: {
      title: "3D Virtual Museum Tour | Visit Banjarmasin",
      description: "Explore the interactive 3D virtual museum of Banjar culture. Discover Sasirangan motifs, educational mini-games, and historical artifacts of Banjarmasin.",
      keywords: "banjarmasin virtual tour, 3d museum borneo, sasirangan 3d, banjar culture 3d tour",
    },
    ms: {
      title: "Lawatan Maya 3D Muzium Banjar | Visit Banjarmasin",
      description: "Terokai muzium maya 3D interaktif kebudayaan Banjar. Terokai motif Sasirangan, permainan mini pendidikan, dan artifak sejarah Banjarmasin.",
      keywords: "lawatan maya 3d banjarmasin, muzium banjar 3d, sasirangan 3d",
    },
    zh: {
      title: "3D虚拟博物馆之旅与文化探索 | 马辰旅游",
      description: "探索班查文化的交互式3D虚拟博物馆。探索Sasirangan萨西兰甘图案、教育小游戏以及班贾尔马辛市的历史文物。",
      keywords: "马辰3D虚拟博物馆, 婆罗洲3D文化之旅, 萨西兰甘3D展示",
    }
  };

  const currentSEO = seoDB[lang] || seoDB.id;
  const canonicalUrl = lang === 'id' ? '/culture-verse' : `/${lang}/culture-verse`;

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: currentSEO.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "id-ID": "/culture-verse",
        "en-US": "/en/culture-verse",
        "ms-MY": "/ms/culture-verse",
        "zh-CN": "/zh/culture-verse",
        "x-default": "/culture-verse"
      }
    },
    openGraph: {
      title: currentSEO.title,
      description: currentSEO.description,
      url: lang === 'id' ? "https://www.visitbanjarmasin.id/culture-verse" : `https://www.visitbanjarmasin.id/${lang}/culture-verse`,
      images: ["/home/hero_kain_sasirangan.webp"],
    }
  };
}

export default async function CultureVersePage({ params }) {
  const { lang } = await params;
  return <CultureVerseClient lang={lang} />;
}
