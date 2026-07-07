import Kuliner from "../../../views/Kuliner";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  // Language-specific SEO databases
  const seoDB = {
    id: {
      title: "Kuliner Khas Banjarmasin | Visit Banjarmasin",
      description: "Cicipi kelezatan otentik Soto Banjar, Ketupat Kandangan, Lontong Orari, hingga aneka wadai tradisional Banjar.",
      keywords: "kuliner banjarmasin, soto banjar, soto banjar bang amat, resep soto banjar, ketupat kandangan, lontong orari, nasi kuning banjar, wadai bingka, bingka barendam, amparan tatak, iwak karing batanak, manday, kuliner khas kalimantan selatan, makanan khas banjar, wisata kuliner banjarmasin, rumah makan banjarmasin",
    },
    en: {
      title: "Authentic Culinary | Visit Banjarmasin",
      description: "Taste the authentic Soto Banjar, Ketupat Kandangan, Lontong Orari, and various traditional Banjar cakes.",
      keywords: "banjarmasin culinary, banjarese food, soto banjar recipe, authentic indonesian food, borneo culinary, must try food banjarmasin, south kalimantan food guide, banjarmasin restaurants, street food banjarmasin, traditional banjar cake, bingka cake, indonesian soup soto",
    },
    ms: {
      title: "Kulinari Khas Banjarmasin | Visit Banjarmasin",
      description: "Rasai kelazatan asli Soto Banjar, Ketupat Kandangan, Lontong Orari, dan pelbagai kuih tradisional Banjar.",
      keywords: "kulinari banjarmasin, soto banjar sedap, makanan tradisional kalimantan, makanan khas banjar, kuih bingka banjar, soto ayam kalimantan, pelancongan makanan banjarmasin, tempat makan menarik di banjarmasin",
    },
    zh: {
      title: "正宗美食 | 马辰旅游",
      description: "品尝正宗的Soto Banjar、Ketupat Kandangan、Lontong Orari以及各种传统Banjar糕点。",
      keywords: "马辰美食, 婆罗洲美食, 班查鸡汤 Soto Banjar, 印尼传统美食, 南加里曼丹美食指南, 马辰餐厅推荐, 印尼街头美食, 传统糕点 bingka",
    }
  };

  const currentSEO = seoDB[lang] || seoDB.id;

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: currentSEO.keywords,
    alternates: {
      canonical: `/${lang}/kuliner`,
      languages: {
        "id-ID": "/id/kuliner",
        "en-US": "/en/kuliner",
        "ms-MY": "/ms/kuliner",
        "zh-CN": "/zh/kuliner",
        "x-default": "/id/kuliner"
      }
    },
    openGraph: {
      title: currentSEO.title,
      description: currentSEO.description,
      url: `https://visitbanjarmasin.id/${lang}/kuliner`,
      images: ["/kuliner/soto banjar.webp"],
    }
  };
}

export default function KulinerPage() {
  return <Kuliner />;
}
