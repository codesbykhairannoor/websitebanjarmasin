import Sejarah from "../../../views/Sejarah";

export async function generateMetadata({ params }) {
  const { lang } = await params;

  const seoDB = {
    id: {
      title: "Jejak Sejarah Banjarmasin | Visit Banjarmasin",
      description: "Pelajari sejarah panjang Kesultanan Banjar, perjuangan Pangeran Antasari, dan evolusi Kota Banjarmasin dari masa ke masa.",
      keywords: "sejarah banjarmasin, kesultanan banjar, pangeran antasari, sultan suriansyah, sejarah sungai martapura, perang banjar, masjid sultan suriansyah, makam pangeran antasari, sejarah kalimantan selatan",
    },
    en: {
      title: "Historical Traces | Visit Banjarmasin",
      description: "Learn the long history of the Banjar Sultanate, the struggle of Prince Antasari, and the evolution of Banjarmasin City.",
      keywords: "banjarmasin history, banjar sultanate, prince antasari, sultan suriansyah mosque, borneo history, martapura river history, south kalimantan heritage, banjarmasin old city",
    },
    ms: {
      title: "Jejak Sejarah Banjarmasin | Visit Banjarmasin",
      description: "Pelajari sejarah panjang Kesultanan Banjar, perjuangan Pangeran Antasari, dan evolusi Kota Banjarmasin.",
      keywords: "sejarah kesultanan banjar, pangeran antasari pahlawan, sejarah kalimantan, asal usul banjarmasin, peninggalan sejarah borneo",
    },
    zh: {
      title: "历史遗迹 | 马辰旅游",
      description: "了解班查苏丹国的悠久历史，Antasari 王子的斗争，以及马辰市的演变。",
      keywords: "马辰历史, 班查苏丹国, Antasari 王子, 婆罗洲历史, 加里曼丹历史文化, 苏里安夏苏丹清真寺",
    }
  };

  const currentSEO = seoDB[lang] || seoDB.id;

  return {
    title: currentSEO.title,
    description: currentSEO.description,
    keywords: currentSEO.keywords,
    alternates: {
      canonical: `/${lang}/sejarah`,
      languages: {
        "id-ID": "/id/sejarah",
        "en-US": "/en/sejarah",
        "ms-MY": "/ms/sejarah",
        "zh-CN": "/zh/sejarah",
        "x-default": "/id/sejarah"
      }
    },
    openGraph: {
      title: currentSEO.title,
      description: currentSEO.description,
      url: `https://visitbanjarmasin.id/${lang}/sejarah`,
      images: ["/wisata/masjid sultan suriansyah.webp"],
    }
  };
}

export default function SejarahPage() {
  return <Sejarah />;
}
