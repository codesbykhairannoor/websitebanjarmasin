import ProfilKota from "../../views/ProfilKota";

export const metadata = {
  title: "Profil Kota Banjarmasin | Visit Banjarmasin",
  description: "Kenali lebih dekat visi misi, jajaran pimpinan kota, fasilitas publik, dan kemajuan infrastruktur Kota Seribu Sungai.",
  keywords: "profil kota banjarmasin, walikota banjarmasin, ibnu sina, visi misi banjarmasin, pemerintahan kota banjarmasin, demografi banjarmasin, letak geografis banjarmasin, fasilitas publik banjarmasin, penghargaan kota banjarmasin, banjarmasin baiman, kalimantan selatan, pemerintah kalimantan selatan, profil daerah, luas wilayah banjarmasin",
  alternates: {
    canonical: "/profil-kota",
    languages: {
      "id-ID": "/profil-kota",
      "en-US": "/en/profil-kota",
      "ms-MY": "/ms/profil-kota",
      "zh-CN": "/zh/profil-kota",
      "x-default": "/profil-kota"
    }
  },
  openGraph: {
    title: "Profil Kota Banjarmasin | Ibukota Kebudayaan",
    description: "Kenali lebih dekat visi misi, jajaran pimpinan kota, fasilitas publik, dan kemajuan infrastruktur Kota Seribu Sungai.",
    url: "https://visitbanjarmasin.id/profil-kota",
    images: ["/home/banjarmasinkota.webp"],
  }
};

export default function ProfilKotaPage() {
  return <ProfilKota />;
}
