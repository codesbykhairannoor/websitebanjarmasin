import ProfilKota from "../../../views/ProfilKota";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const seoDB = {
    id: {
      title: "Profil Kota Banjarmasin | Visit Banjarmasin",
      description: "Kenali lebih dekat visi misi, jajaran pimpinan kota, fasilitas publik, dan kemajuan infrastruktur Kota Seribu Sungai.",
      keywords: "profil kota banjarmasin, walikota banjarmasin, ibnu sina, visi misi banjarmasin, pemerintahan kota banjarmasin, demografi banjarmasin",
    },
    en: {
      title: "City Profile | Visit Banjarmasin",
      description: "Get to know the vision, mission, city leaders, public facilities, and infrastructure progress of the City of a Thousand Rivers.",
      keywords: "banjarmasin city profile, mayor of banjarmasin, banjarmasin government, south kalimantan capital, banjarmasin demographics",
    },
    ms: {
      title: "Profil Bandar Banjarmasin | Visit Banjarmasin",
      description: "Kenali lebih dekat visi misi, barisan pemimpin bandar, kemudahan awam, dan kemajuan infrastruktur Kota Seribu Sungai.",
      keywords: "profil bandar banjarmasin, datuk bandar banjarmasin, pentadbiran banjarmasin, ibu negeri kalimantan selatan",
    },
    zh: {
      title: "城市概况 | 马辰旅游",
      description: "了解千河之城的愿景、使命、城市领导人、公共设施和基础设施进展。",
      keywords: "马辰城市概况, 马辰市长, 马辰政府, 南加里曼丹首府, 马辰人口统计",
    }
  };

  const currentSEO = seoDB[lang] || seoDB.id;

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: currentSEO.keywords,
    alternates: {
      canonical: `/${lang}/profil-kota`,
      languages: {
        "id-ID": "/id/profil-kota",
        "en-US": "/en/profil-kota",
        "ms-MY": "/ms/profil-kota",
        "zh-CN": "/zh/profil-kota",
        "x-default": "/id/profil-kota"
      }
    },
    openGraph: {
      title: currentSEO.title,
      description: currentSEO.description,
      url: `https://visitbanjarmasin.id/${lang}/profil-kota`,
      images: ["/home/banjarmasinkota.webp"],
    }
  };
}

export default function ProfilKotaPage() {
  return <ProfilKota />;
}
