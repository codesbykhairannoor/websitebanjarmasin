import Home from "../../views/Home";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const seoDB = {
    id: {
      title: "Visit Banjarmasin | Portal Eksplorasi Wisata & Budaya",
      description: "Jelajahi keindahan Kota Seribu Sungai! Panduan resmi terlengkap destinasi wisata, kebudayaan Banjar, kuliner legendaris, dan inovasi Smart City Banjarmasin.",
      keywords: "visit banjarmasin, wisata banjarmasin, kalimantan selatan, kota seribu sungai, soto banjar, pasar terapung, sasirangan",
    },
    en: {
      title: "Visit Banjarmasin | Tourism & Cultural Exploration Portal",
      description: "Explore the City of a Thousand Rivers! Official guide to top destinations, Banjar heritage, culinary delights, river cruises, and Smart City Banjarmasin.",
      keywords: "visit banjarmasin, banjarmasin tourism, south kalimantan, city of a thousand rivers, borneo travel, floating market",
    },
    ms: {
      title: "Visit Banjarmasin | Portal Penerokaan Pelancongan & Budaya",
      description: "Terokai keindahan Kota Seribu Sungai! Panduan rasmi destinasi pelancongan, warisan budaya Banjar, kulinari autentik, dan inovasi pintar Banjarmasin.",
      keywords: "melancong ke banjarmasin, pelancongan kalimantan, kota seribu sungai, pasar terapung, borneo",
    },
    zh: {
      title: "马辰旅游官方指南：探索千河之城景点与文化 | Visit Banjarmasin",
      description: "探索千河之城班贾尔马辛！官方旅游指南为您呈现水上市场、正宗Soto Banjar美食、Sasirangan文化及智慧城市探索。",
      keywords: "马辰旅游, 南加里曼丹, 千河之城, 婆罗洲旅行, 水上市场",
    }
  };

  const currentSEO = seoDB[lang] || seoDB.id;

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: currentSEO.keywords,
    alternates: {
      canonical: lang === "id" ? "/" : `/${lang}`,
      languages: {
        "id-ID": "/",
        "en-US": "/en",
        "ms-MY": "/ms",
        "zh-CN": "/zh",
        "x-default": "/"
      }
    },
    openGraph: {
      title: currentSEO.title,
      description: currentSEO.description,
      url: lang === "id" ? "https://www.visitbanjarmasin.id" : `https://www.visitbanjarmasin.id/${lang}`,
      images: ["/home/hero-desktop-pasar-terapung.webp"],
    }
  };
}

export default function HomePage() {
  return <Home />;
}
