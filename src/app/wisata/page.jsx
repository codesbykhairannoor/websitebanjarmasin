import Wisata from "../../views/Wisata";

export const metadata = {
  title: "Destinasi Wisata Unggulan | Visit Banjarmasin",
  description: "Jelajahi keajaiban Pasar Terapung Lok Baintan, Siring Menara Pandang, Patung Bekantan, hingga desa wisata susur sungai Martapura.",
  keywords: "wisata banjarmasin, pasar terapung, lok baintan, siring menara pandang, patung bekantan, susur sungai martapura, kelotok, tempat wisata di banjarmasin, kalimantan selatan, banjarmasin tourism, floating market, proboscis monkey, muara kuin, pulau kembang, siring tendean, objek wisata kalimantan, liburan di banjarmasin, wisata sungai, klotok tour, kampung sasirangan, maskot bekantan, taman kamboja, wisata malam banjarmasin",
  alternates: {
    canonical: "/wisata",
    languages: {
      "id-ID": "/wisata",
      "en-US": "/en/wisata",
      "ms-MY": "/ms/wisata",
      "zh-CN": "/zh/wisata",
      "x-default": "/wisata"
    }
  },
  openGraph: {
    title: "Destinasi Wisata Banjarmasin | Kota Seribu Sungai",
    description: "Jelajahi keajaiban Pasar Terapung Lok Baintan, Siring Menara Pandang, Patung Bekantan, hingga desa wisata susur sungai Martapura.",
    url: "https://visitbanjarmasin.id/wisata",
    images: ["/wisata/960px-Pasar_Terapung_Siring_Banj.webp"],
  }
};

export default function WisataPage() {
  return <Wisata />;
}
