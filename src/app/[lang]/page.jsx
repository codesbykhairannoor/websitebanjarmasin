import Home from "../../views/Home";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const seoDB = {
    id: {
      title: "Visit Banjarmasin | Eksplorasi Wisata & Budaya",
      description: "Jelajahi Kota Seribu Sungai! Panduan resmi destinasi wisata, budaya, dan kuliner Banjarmasin.",
      keywords: "visit banjarmasin, wisata banjarmasin, kalimantan selatan, kota seribu sungai, soto banjar, pasar terapung, sasirangan",
    },
    en: {
      title: "Visit Banjarmasin | Explore Tourism & Culture",
      description: "Explore the City of a Thousand Rivers! Official guide to Banjarmasin destinations, culture, and culinary.",
      keywords: "visit banjarmasin, banjarmasin tourism, south kalimantan, city of a thousand rivers, borneo travel, floating market",
    },
    ms: {
      title: "Visit Banjarmasin | Penerokaan Pelancongan",
      description: "Terokai Kota Seribu Sungai! Panduan rasmi destinasi pelancongan, budaya, dan masakan Banjarmasin.",
      keywords: "melancong ke banjarmasin, pelancongan kalimantan, kota seribu sungai, pasar terapung, borneo",
    },
    zh: {
      title: "马辰旅游 | 探索旅游与文化",
      description: "探索千河之城！马辰目的地、文化和美食的官方指南。",
      keywords: "马辰旅游, 南加里曼丹, 千河之城, 婆罗洲旅行, 水上市场",
    }
  };

  const currentSEO = seoDB[lang] || seoDB.id;

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: currentSEO.keywords,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        "id-ID": "/id",
        "en-US": "/en",
        "ms-MY": "/ms",
        "zh-CN": "/zh",
        "x-default": "/id"
      }
    },
    openGraph: {
      title: currentSEO.title,
      description: currentSEO.description,
      url: `https://visitbanjarmasin.id/${lang}`,
      images: ["/home/hero-desktop-pasar-terapung.webp"],
    }
  };
}

export default function HomePage() {
  return <Home />;
}
