import Panduan from "../../../views/Panduan";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const seoDB = {
    id: {
      title: "Panduan Wisata, Hotel & Transportasi BRT | Visit Banjarmasin",
      description: "Panduan praktis transportasi rute BRT Banjarbakula, kelotok susur sungai, tips akomodasi hotel, dan peta aksesibilitas wisata Banjarmasin.",
      keywords: "panduan wisata banjarmasin, rute brt trans banjarmasin, rute kelotok banjarmasin, transportasi umum banjarmasin, hotel di banjarmasin, penginapan murah banjarmasin",
    },
    en: {
      title: "Travel Guide, Hotels & BRT Public Transport | Visit Banjarmasin",
      description: "Practical travel guide for BRT bus routes, river kelotok boat rentals, recommended hotels, and tourist navigation in Banjarmasin City.",
      keywords: "banjarmasin travel guide, brt route banjarmasin, borneo boat rental, banjarmasin public transport, hotels in banjarmasin, borneo travel tips",
    },
    ms: {
      title: "Panduan Pelancongan, Hotel & Pengangkutan Awam | Visit Banjarmasin",
      description: "Panduan praktikal pengangkutan laluan BRT Banjarbakula, sewa bot kelotok sungai, hotel bajet, dan petua navigasi di Banjarmasin.",
      keywords: "panduan pelancongan banjarmasin, laluan bas banjarmasin, pengangkutan awam kalimantan, hotel murah banjarmasin, tips melancong ke borneo",
    },
    zh: {
      title: "马辰旅游实用指南：BRT公交线路与交通贴士 | Visit Banjarmasin",
      description: "马辰旅游实用指南：BRT Trans Banjarmasin公交线路、Kelotok游船租用、酒店住宿推荐与无障碍旅游贴士。",
      keywords: "马辰旅游指南, 马辰交通, 婆罗洲租船, 马辰酒店, 加里曼丹旅行贴士",
    }
  };

  const currentSEO = seoDB[lang] || seoDB.id;

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: currentSEO.keywords,
    alternates: {
      canonical: lang === "id" ? "/panduan" : `/${lang}/panduan`,
      languages: {
        "id-ID": "/panduan",
        "en-US": "/en/panduan",
        "ms-MY": "/ms/panduan",
        "zh-CN": "/zh/panduan",
        "x-default": "/panduan"
      }
    },
    openGraph: {
      title: currentSEO.title,
      description: currentSEO.description,
      url: lang === "id" ? "https://www.visitbanjarmasin.id/panduan" : `https://www.visitbanjarmasin.id/${lang}/panduan`,
      images: ["/profil kota/trans banjarbakula.webp"],
    }
  };
}

export default function PanduanPage() {
  return <Panduan />;
}
