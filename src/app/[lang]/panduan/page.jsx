import Panduan from "../../../views/Panduan";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const seoDB = {
    id: {
      title: "Panduan Wisata & Transportasi | Visit Banjarmasin",
      description: "Panduan praktis transportasi rute BRT Trans Banjarmasin, kelotok wisata, rute aksesibilitas, dan tips perjalanan bagi wisatawan.",
      keywords: "panduan wisata banjarmasin, rute brt trans banjarmasin, rute kelotok banjarmasin, transportasi umum banjarmasin, hotel di banjarmasin, penginapan murah banjarmasin",
    },
    en: {
      title: "Travel Guide & Transport | Visit Banjarmasin",
      description: "Practical guide for BRT Trans Banjarmasin routes, tourist boats, accessibility routes, and travel tips for tourists.",
      keywords: "banjarmasin travel guide, brt route banjarmasin, borneo boat rental, banjarmasin public transport, hotels in banjarmasin, borneo travel tips",
    },
    ms: {
      title: "Panduan Pelancongan | Visit Banjarmasin",
      description: "Panduan praktikal pengangkutan laluan BRT Trans Banjarmasin, bot pelancong, dan petua perjalanan untuk pelancong.",
      keywords: "panduan pelancongan banjarmasin, laluan bas banjarmasin, pengangkutan awam kalimantan, hotel murah banjarmasin, tips melancong ke borneo",
    },
    zh: {
      title: "旅游指南与交通 | 马辰旅游",
      description: "BRT Trans Banjarmasin 路线、旅游船、无障碍路线以及游客旅行提示的实用指南。",
      keywords: "马辰旅游指南, 马辰交通, 婆罗洲租船, 马辰酒店, 加里曼丹旅行贴士",
    }
  };

  const currentSEO = seoDB[lang] || seoDB.id;

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: currentSEO.keywords,
    alternates: {
      canonical: `/${lang}/panduan`,
      languages: {
        "id-ID": "/id/panduan",
        "en-US": "/en/panduan",
        "ms-MY": "/ms/panduan",
        "zh-CN": "/zh/panduan",
        "x-default": "/id/panduan"
      }
    },
    openGraph: {
      title: currentSEO.title,
      description: currentSEO.description,
      url: `https://visitbanjarmasin.id/${lang}/panduan`,
      images: ["/profil kota/trans banjarbakula.webp"],
    }
  };
}

export default function PanduanPage() {
  return <Panduan />;
}
