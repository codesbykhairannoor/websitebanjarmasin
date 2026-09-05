import Budaya from "../../../views/Budaya";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const seoDB = {
    id: {
      title: "Seni & Budaya Banjar: Sasirangan & Warisan | Visit Banjarmasin",
      description: "Eksplorasi mahakarya kain Sasirangan, arsitektur Rumah Adat Bubungan Tinggi, tarian Baksa Kembang, hingga seni tutur Madihin khas Banjar.",
      keywords: "budaya banjar, kain sasirangan, motif sasirangan, rumah adat bubungan tinggi, rumah banjar, madihin, john tralala, baayun maulid, tradisi kalimantan selatan, tarian baksa kembang, seni budaya banjarmasin, sejarah sasirangan",
    },
    en: {
      title: "Arts, Heritage & Banjar Culture Guide | Visit Banjarmasin",
      description: "Explore the masterpiece of Sasirangan textiles, traditional Bubungan Tinggi architecture, Baksa Kembang dance, and rich Banjar heritage.",
      keywords: "banjarese culture, sasirangan fabric, traditional indonesian textile, bubungan tinggi house, borneo traditional house, baksa kembang dance, kalimantan culture, madihin traditional art, south kalimantan heritage",
    },
    ms: {
      title: "Seni & Budaya Banjar: Sasirangan & Warisan | Visit Banjarmasin",
      description: "Terokai karya agung kain Sasirangan, seni bina Rumah Adat Bubungan Tinggi, tarian tradisi Baksa Kembang, dan warisan budaya Kalimantan Selatan.",
      keywords: "budaya banjar kalimantan, kain sasirangan asli, rumah adat kalimantan, tarian tradisional kalimantan, warisan budaya borneo, seni madihin",
    },
    zh: {
      title: "班查传统艺术、Sasirangan织物与文化遗产 | Visit Banjarmasin",
      description: "探索南加里曼丹非物质文化遗产：传统Sasirangan扎染织物、Bubungan Tinggi高脚屋建筑、Baksa Kembang传统舞蹈与Madihin口头艺术。",
      keywords: "马辰文化, 婆罗洲传统文化, Sasirangan 蜡染布, 印尼传统建筑, Bubungan Tinggi 房屋, 加里曼丹传统舞蹈",
    }
  };

  const currentSEO = seoDB[lang] || seoDB.id;

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: currentSEO.keywords,
    alternates: {
      canonical: lang === "id" ? "/budaya" : `/${lang}/budaya`,
      languages: {
        "id-ID": "/budaya",
        "en-US": "/en/budaya",
        "ms-MY": "/ms/budaya",
        "zh-CN": "/zh/budaya",
        "x-default": "/budaya"
      }
    },
    openGraph: {
      title: currentSEO.title,
      description: currentSEO.description,
      url: lang === "id" ? "https://www.visitbanjarmasin.id/budaya" : `https://www.visitbanjarmasin.id/${lang}/budaya`,
      images: ["/home/hero_kain_sasirangan.webp"],
    }
  };
}

export default function BudayaPage() {
  return <Budaya />;
}
