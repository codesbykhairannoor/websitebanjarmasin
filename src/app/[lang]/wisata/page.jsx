import Wisata from "../../../views/Wisata";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  // Language-specific SEO databases
  const seoDB = {
    id: {
      title: "Destinasi Wisata Unggulan | Visit Banjarmasin",
      description: "Jelajahi keajaiban Pasar Terapung Lok Baintan, Siring Menara Pandang, Patung Bekantan, hingga desa wisata susur sungai Martapura.",
      keywords: "wisata banjarmasin, pasar terapung, lok baintan, siring menara pandang, patung bekantan, susur sungai martapura, kelotok, tempat wisata di banjarmasin, kalimantan selatan, liburan di banjarmasin, wisata sungai, klotok tour, kampung sasirangan, maskot bekantan, taman kamboja, wisata malam banjarmasin, pesona indonesia",
    },
    en: {
      title: "Top Tourist Destinations | Visit Banjarmasin",
      description: "Explore the wonders of Lok Baintan Floating Market, Menara Pandang, Proboscis Monkey Statue, and the Martapura river cruise villages.",
      keywords: "banjarmasin tourism, floating market borneo, lok baintan floating market, menara pandang, proboscis monkey statue, martapura river cruise, kelotok boat tour, things to do in banjarmasin, south kalimantan attractions, borneo holiday, river tourism, klotok tour, sasirangan village, bekantan mascot, kalimantan travel guide",
    },
    ms: {
      title: "Destinasi Pelancongan Menarik | Visit Banjarmasin",
      description: "Terokai keajaiban Pasar Terapung Lok Baintan, Siring Menara Pandang, Patung Bekantan, hingga desa pelancongan menyusuri sungai Martapura.",
      keywords: "pelancongan banjarmasin, pasar terapung, lok baintan, siring menara pandang, patung bekantan, menyusuri sungai martapura, kelotok, tempat menarik di banjarmasin, kalimantan selatan, percutian di banjarmasin, pelancongan sungai, klotok tour, kampung sasirangan, maskot bekantan, pesona kalimantan",
    },
    zh: {
      title: "顶级旅游目的地 | 马辰旅游",
      description: "探索 Lok Baintan 水上市场、Menara Pandang、长鼻猴雕像以及马塔普拉河游船村的奇观。",
      keywords: "马辰旅游, 婆罗洲水上市场, lok baintan 水上市场, 观景塔, 长鼻猴雕像, 马塔普拉河游船, kelotok 游船, 马辰景点, 南加里曼丹景点, 婆罗洲度假, 河流旅游, 萨西兰甘村, bekantan 吉祥物, 加里曼丹旅游指南",
    }
  };

  const currentSEO = seoDB[lang] || seoDB.id;

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: currentSEO.keywords,
    alternates: {
      canonical: `/${lang}/wisata`,
      languages: {
        "id-ID": "/id/wisata",
        "en-US": "/en/wisata",
        "ms-MY": "/ms/wisata",
        "zh-CN": "/zh/wisata",
        "x-default": "/id/wisata"
      }
    },
    openGraph: {
      title: currentSEO.title,
      description: currentSEO.description,
      url: `https://visitbanjarmasin.id/${lang}/wisata`,
      images: ["/wisata/960px-Pasar_Terapung_Siring_Banj.webp"],
    }
  };
}

export default function WisataPage() {
  return <Wisata />;
}
