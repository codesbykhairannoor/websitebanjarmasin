import SmartCity from "../../../views/SmartCity";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const seoDB = {
    id: {
      title: "Smart City Banjarmasin | Visit Banjarmasin",
      description: "Transformasi digital Kota Banjarmasin melalui integrasi CCTV publik interaktif, layanan darurat, dan inovasi transportasi pintar.",
      keywords: "smart city banjarmasin, cctv banjarmasin, live cctv banjarmasin, lapor banjarmasin, aplikasi baiman, inovasi digital banjarmasin, command center banjarmasin, transportasi pintar, trans banjarbakula",
    },
    en: {
      title: "Smart City | Visit Banjarmasin",
      description: "Banjarmasin City's digital transformation through interactive public CCTV integration, emergency services, and smart transportation.",
      keywords: "banjarmasin smart city, public cctv borneo, digital innovation kalimantan, smart transportation banjarmasin, banjarmasin command center, city apps",
    },
    ms: {
      title: "Bandar Pintar | Visit Banjarmasin",
      description: "Transformasi digital Kota Banjarmasin melalui integrasi CCTV awam interaktif, perkhidmatan kecemasan, dan inovasi pengangkutan pintar.",
      keywords: "bandar pintar banjarmasin, cctv awam kalimantan, inovasi digital borneo, pengangkutan pintar banjarmasin",
    },
    zh: {
      title: "智慧城市 | 马辰旅游",
      description: "通过交互式公共闭路电视集成、应急服务和智能交通，实现马辰市的数字化转型。",
      keywords: "马辰智慧城市, 公共闭路电视, 数字化转型, 智能交通",
    }
  };

  const currentSEO = seoDB[lang] || seoDB.id;

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: currentSEO.keywords,
    alternates: {
      canonical: `/${lang}/smart-city`,
      languages: {
        "id-ID": "/id/smart-city",
        "en-US": "/en/smart-city",
        "ms-MY": "/ms/smart-city",
        "zh-CN": "/zh/smart-city",
        "x-default": "/id/smart-city"
      }
    },
    openGraph: {
      title: currentSEO.title,
      description: currentSEO.description,
      url: `https://visitbanjarmasin.id/${lang}/smart-city`,
      images: ["/profil kota/trans banjarbakula.webp"],
    }
  };
}

export default function SmartCityPage() {
  return <SmartCity />;
}
