import SmartCity from "../../views/SmartCity";

export const metadata = {
  title: "Smart City Banjarmasin | Visit Banjarmasin",
  description: "Transformasi digital Kota Banjarmasin melalui integrasi CCTV publik interaktif, layanan darurat, dan inovasi transportasi pintar.",
  keywords: "smart city banjarmasin, cctv banjarmasin, live cctv banjarmasin, lapor banjarmasin, aplikasi baiman, inovasi digital banjarmasin, command center banjarmasin, transportasi pintar, trans banjarbakula, fasilitas publik banjarmasin, banjarmasin go digital, 112 banjarmasin, layanan darurat banjarmasin, smart government kalimantan selatan, smart city initiative, banjarmasin app",
  alternates: {
    canonical: "/smart-city",
    languages: {
      "id-ID": "/smart-city",
      "en-US": "/en/smart-city",
      "ms-MY": "/ms/smart-city",
      "zh-CN": "/zh/smart-city",
      "x-default": "/smart-city"
    }
  },
  openGraph: {
    title: "Smart City Banjarmasin | Transformasi Digital",
    description: "Transformasi digital Kota Banjarmasin melalui integrasi CCTV publik interaktif, layanan darurat, dan inovasi transportasi pintar.",
    url: "https://visitbanjarmasin.id/smart-city",
    images: ["/profil kota/trans banjarbakula.webp"],
  }
};

export default function SmartCityPage() {
  return <SmartCity />;
}
