import ProfilKota from "../../../views/ProfilKota";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const seoDB = {
    id: {
      title: "Profil Kota Banjarmasin: Visi, Pimpinan & Tata Kota | Visit Banjarmasin",
      description: "Kenali lebih dekat visi misi, jajaran pimpinan walikota, fasilitas publik, demografi, dan kemajuan infrastruktur Kota Seribu Sungai Banjarmasin.",
      keywords: "profil kota banjarmasin, walikota banjarmasin, ibnu sina, visi misi banjarmasin, pemerintahan kota banjarmasin, demografi banjarmasin",
    },
    en: {
      title: "City Profile & Vision of Banjarmasin | Visit Banjarmasin",
      description: "Get to know the city vision, municipal leadership, public facilities, demographics, and modern infrastructure progress of Banjarmasin City.",
      keywords: "banjarmasin city profile, mayor of banjarmasin, banjarmasin government, south kalimantan capital, banjarmasin demographics",
    },
    ms: {
      title: "Profil Bandar Banjarmasin: Visi & Kemajuan | Visit Banjarmasin",
      description: "Kenali lebih dekat visi misi, barisan pemimpin bandar, kemudahan awam, demografi, dan kemajuan infrastruktur moden Kota Seribu Sungai.",
      keywords: "profil bandar banjarmasin, datuk bandar banjarmasin, pentadbiran banjarmasin, ibu negeri kalimantan selatan",
    },
    zh: {
      title: "马辰城市概况与千河之城发展愿景 | Visit Banjarmasin",
      description: "了解班贾尔马辛城市概况：领导团队、城市发展愿景、地理环境、公共设施与千河之城现代化基础设施建设成就。",
      keywords: "马辰城市概况, 马辰市长, 马辰政府, 南加里曼丹首府, 马辰人口统计",
    }
  };

  const currentSEO = seoDB[lang] || seoDB.id;

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: currentSEO.keywords,
    alternates: {
      canonical: lang === "id" ? "/profil-kota" : `/${lang}/profil-kota`,
      languages: {
        "id-ID": "/profil-kota",
        "en-US": "/en/profil-kota",
        "ms-MY": "/ms/profil-kota",
        "zh-CN": "/zh/profil-kota",
        "x-default": "/profil-kota"
      }
    },
    openGraph: {
      title: currentSEO.title,
      description: currentSEO.description,
      url: lang === "id" ? "https://www.visitbanjarmasin.id/profil-kota" : `https://www.visitbanjarmasin.id/${lang}/profil-kota`,
      images: ["/home/banjarmasinkota.webp"],
    }
  };
}

export default function ProfilKotaPage() {
  return <ProfilKota />;
}
