import Budaya from "../../../views/Budaya";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const seoDB = {
    id: {
      title: "Seni & Budaya Banjar | Visit Banjarmasin",
      description: "Eksplorasi mahakarya kain Sasirangan, arsitektur Rumah Adat Bubungan Tinggi, tarian tradisional, hingga seni Madihin.",
      keywords: "budaya banjar, kain sasirangan, motif sasirangan, rumah adat bubungan tinggi, rumah banjar, madihin, john tralala, baayun maulid, tradisi kalimantan selatan, tarian baksa kembang, seni budaya banjarmasin, sejarah sasirangan",
    },
    en: {
      title: "Arts & Culture | Visit Banjarmasin",
      description: "Explore the masterpiece of Sasirangan fabric, Bubungan Tinggi traditional house architecture, traditional dances, and Madihin art.",
      keywords: "banjarese culture, sasirangan fabric, traditional indonesian textile, bubungan tinggi house, borneo traditional house, baksa kembang dance, kalimantan culture, madihin traditional art, south kalimantan heritage",
    },
    ms: {
      title: "Seni & Budaya Banjar | Visit Banjarmasin",
      description: "Terokai karya agung kain Sasirangan, seni bina Rumah Adat Bubungan Tinggi, tarian tradisional, hingga seni Madihin.",
      keywords: "budaya banjar kalimantan, kain sasirangan asli, rumah adat kalimantan, tarian tradisional kalimantan, warisan budaya borneo, seni madihin",
    },
    zh: {
      title: "艺术与文化 | 马辰旅游",
      description: "探索Sasirangan织物杰作、Bubungan Tinggi传统民居建筑、传统舞蹈和Madihin艺术。",
      keywords: "马辰文化, 婆罗洲传统文化, Sasirangan 蜡染布, 印尼传统建筑, Bubungan Tinggi 房屋, 加里曼丹传统舞蹈",
    }
  };

  const currentSEO = seoDB[lang] || seoDB.id;

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: currentSEO.keywords,
    alternates: {
      canonical: `/${lang}/budaya`,
      languages: {
        "id-ID": "/id/budaya",
        "en-US": "/en/budaya",
        "ms-MY": "/ms/budaya",
        "zh-CN": "/zh/budaya",
        "x-default": "/id/budaya"
      }
    },
    openGraph: {
      title: currentSEO.title,
      description: currentSEO.description,
      url: `https://visitbanjarmasin.id/${lang}/budaya`,
      images: ["/home/hero_kain_sasirangan.webp"],
    }
  };
}

export default function BudayaPage() {
  return <Budaya />;
}
