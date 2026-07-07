import ProfilKota from "../../views/ProfilKota";

export const metadata = {
  title: "Profil Kota Banjarmasin | Visit Banjarmasin",
  description: "Kenali lebih dekat visi misi, jajaran pimpinan kota, fasilitas publik, dan kemajuan infrastruktur Kota Seribu Sungai.",
  keywords: "profil kota banjarmasin, walikota banjarmasin, ibnu sina, visi misi banjarmasin, pemerintahan kota banjarmasin, demografi banjarmasin, letak geografis banjarmasin, fasilitas publik banjarmasin, penghargaan kota banjarmasin, banjarmasin baiman, kalimantan selatan, pemerintah kalimantan selatan, profil daerah, luas wilayah banjarmasin",
  alternates: {
    canonical: "/profil",
    languages: {
      "id-ID": "/profil",
      "en-US": "/en/profil",
      "ms-MY": "/ms/profil",
      "zh-CN": "/zh/profil",
      "x-default": "/profil"
    }
  },
  openGraph: {
    title: "Profil Kota Banjarmasin | Ibukota Kebudayaan",
    description: "Kenali lebih dekat visi misi, jajaran pimpinan kota, fasilitas publik, dan kemajuan infrastruktur Kota Seribu Sungai.",
    url: "https://visitbanjarmasin.id/profil",
    images: ["/home/banjarmasinkota.webp"],
  }
};

export default function ProfilPage() {
  return <ProfilKota />;
}
