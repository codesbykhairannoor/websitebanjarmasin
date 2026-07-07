import Sejarah from "../../views/Sejarah";

export const metadata = {
  title: "Jejak Sejarah Banjarmasin | Visit Banjarmasin",
  description: "Pelajari sejarah panjang Kesultanan Banjar, perjuangan Pangeran Antasari, dan evolusi Kota Banjarmasin dari masa ke masa.",
  keywords: "sejarah banjarmasin, kesultanan banjar, pangeran antasari, sultan suriansyah, sejarah sungai martapura, perang banjar, masjid sultan suriansyah, makam pangeran antasari, sejarah kalimantan selatan, hari jadi kota banjarmasin, asal usul nama banjarmasin, peninggalan belanda di banjarmasin, banjarmasin tempo dulu, sejarah kota seribu sungai, banjarmasin history",
  alternates: {
    canonical: "/sejarah",
    languages: {
      "id-ID": "/sejarah",
      "en-US": "/en/sejarah",
      "ms-MY": "/ms/sejarah",
      "zh-CN": "/zh/sejarah",
      "x-default": "/sejarah"
    }
  },
  openGraph: {
    title: "Jejak Sejarah Banjarmasin | Kesultanan Banjar",
    description: "Pelajari sejarah panjang Kesultanan Banjar, perjuangan Pangeran Antasari, dan evolusi Kota Banjarmasin dari masa ke masa.",
    url: "https://visitbanjarmasin.id/sejarah",
    images: ["/wisata/masjid sultan suriansyah.webp"],
  }
};

export default function SejarahPage() {
  return <Sejarah />;
}
