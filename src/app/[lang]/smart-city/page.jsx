import SmartCity from "../../../views/SmartCity";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const seoDB = {
    id: {
      title: "Inovasi Smart City & CCTV Publik Live | Visit Banjarmasin",
      description: "Transformasi digital Kota Banjarmasin melalui integrasi CCTV publik real-time, layanan darurat 112, dan inovasi transportasi pintar Banjarbakula.",
      keywords: "smart city banjarmasin, cctv banjarmasin, live cctv banjarmasin, lapor banjarmasin, aplikasi baiman, inovasi digital banjarmasin, command center banjarmasin, transportasi pintar, trans banjarbakula",
    },
    en: {
      title: "Smart City Innovation & Live Public CCTV | Visit Banjarmasin",
      description: "Discover Banjarmasin City's digital transformation with live public CCTV streams, 112 emergency services, and smart transportation systems.",
      keywords: "banjarmasin smart city, public cctv borneo, digital innovation kalimantan, smart transportation banjarmasin, banjarmasin command center, city apps",
    },
    ms: {
      title: "Inovasi Bandar Pintar & CCTV Awam Langsung | Visit Banjarmasin",
      description: "Transformasi digital Kota Banjarmasin melalui integrasi CCTV awam langsung, perkhidmatan kecemasan 112, dan pengangkutan pintar moden.",
      keywords: "bandar pintar banjarmasin, cctv awam kalimantan, inovasi digital borneo, pengangkutan pintar banjarmasin",
    },
    zh: {
      title: "马辰智慧城市：数字化转型与公共闭路电视 | Visit Banjarmasin",
      description: "了解班贾尔马辛智慧城市建设：实时公共CCTV监控、应急指挥中心、智能化公共交通系统以及Baiman数字化便民服务。",
      keywords: "马辰智慧城市, 公共闭路电视, 数字化转型, 智能交通",
    }
  };

  const currentSEO = seoDB[lang] || seoDB.id;

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: currentSEO.keywords,
    alternates: {
      canonical: lang === "id" ? "/smart-city" : `/${lang}/smart-city`,
      languages: {
        "id-ID": "/smart-city",
        "en-US": "/en/smart-city",
        "ms-MY": "/ms/smart-city",
        "zh-CN": "/zh/smart-city",
        "x-default": "/smart-city"
      }
    },
    openGraph: {
      title: currentSEO.title,
      description: currentSEO.description,
      url: lang === "id" ? "https://visitbanjarmasin.id/smart-city" : `https://visitbanjarmasin.id/${lang}/smart-city`,
      images: ["/profil kota/trans banjarbakula.webp"],
    }
  };
}

export default function SmartCityPage() {
  return <SmartCity />;
}
