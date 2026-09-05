import Sejarah from "../../../views/Sejarah";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const seoDB = {
    id: {
      title: "Jejak Sejarah 1526 & Kesultanan Banjar | Visit Banjarmasin",
      description: "Pelajari sejarah panjang Kesultanan Banjar sejak 1526, perjuangan heroik Pangeran Antasari, dan transformasi Kota Banjarmasin dari masa ke masa.",
      keywords: "sejarah banjarmasin, kesultanan banjar, pangeran antasari, sultan suriansyah, sejarah sungai martapura, perang banjar, masjid sultan suriansyah, makam pangeran antasari, sejarah kalimantan selatan",
    },
    en: {
      title: "Historical Traces & 1526 Banjar Sultanate | Visit Banjarmasin",
      description: "Learn the rich history of the Banjar Sultanate since 1526, the legendary struggle of Prince Antasari, and the heritage of South Kalimantan.",
      keywords: "banjarmasin history, banjar sultanate, prince antasari, sultan suriansyah mosque, borneo history, martapura river history, south kalimantan heritage, banjarmasin old city",
    },
    ms: {
      title: "Jejak Sejarah 1526 & Kesultanan Banjar | Visit Banjarmasin",
      description: "Pelajari sejarah panjang Kesultanan Banjar sejak 1526, perjuangan Pangeran Antasari, dan evolusi bandar sungai tertua di Kalimantan Selatan.",
      keywords: "sejarah kesultanan banjar, pangeran antasari pahlawan, sejarah kalimantan, asal usul banjarmasin, peninggalan sejarah borneo",
    },
    zh: {
      title: "班查苏丹国历史与马辰历史遗迹探索 | Visit Banjarmasin",
      description: "探索自1526年以来的班查苏丹国悠久历史、民族英雄Antasari王子的斗争传奇以及苏里安夏苏丹清真寺等古老历史古迹。",
      keywords: "马辰历史, 班查苏丹国, Antasari 王子, 婆罗洲历史, 加里曼丹历史文化, 苏里安夏苏丹清真寺",
    }
  };

  const currentSEO = seoDB[lang] || seoDB.id;

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: currentSEO.keywords,
    alternates: {
      canonical: lang === "id" ? "/sejarah" : `/${lang}/sejarah`,
      languages: {
        "id-ID": "/sejarah",
        "en-US": "/en/sejarah",
        "ms-MY": "/ms/sejarah",
        "zh-CN": "/zh/sejarah",
        "x-default": "/sejarah"
      }
    },
    openGraph: {
      title: currentSEO.title,
      description: currentSEO.description,
      url: lang === "id" ? "https://www.visitbanjarmasin.id/sejarah" : `https://www.visitbanjarmasin.id/${lang}/sejarah`,
      images: ["/wisata/masjid sultan suriansyah.webp"],
    }
  };
}

export default function SejarahPage() {
  return <Sejarah />;
}
