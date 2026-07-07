import Panduan from "../../views/Panduan";

export const metadata = {
  title: "Panduan Wisata & Transportasi | Visit Banjarmasin",
  description: "Panduan praktis transportasi rute BRT Trans Banjarmasin, kelotok wisata, rute aksesibilitas, dan tips perjalanan bagi wisatawan.",
  keywords: "panduan wisata banjarmasin, rute brt trans banjarmasin, rute kelotok banjarmasin, transportasi umum banjarmasin, hotel di banjarmasin, penginapan murah banjarmasin, akses bandara syamsudin noor, tips liburan ke banjarmasin, cuaca banjarmasin, penyewaan mobil banjarmasin, travel banjarmasin kalimantan selatan, kalimantan selatan travel guide, banjarmasin city guide",
  alternates: {
    canonical: "/panduan",
    languages: {
      "id-ID": "/panduan",
      "en-US": "/en/panduan",
      "ms-MY": "/ms/panduan",
      "zh-CN": "/zh/panduan",
      "x-default": "/panduan"
    }
  },
  openGraph: {
    title: "Panduan Wisata & Transportasi Banjarmasin",
    description: "Panduan praktis transportasi rute BRT Trans Banjarmasin, kelotok wisata, rute aksesibilitas, dan tips perjalanan bagi wisatawan.",
    url: "https://visitbanjarmasin.id/panduan",
    images: ["/profil kota/trans banjarbakula.webp"],
  }
};

export default function PanduanPage() {
  return <Panduan />;
}
