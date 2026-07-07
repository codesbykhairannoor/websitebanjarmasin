import Budaya from "../../views/Budaya";

export const metadata = {
  title: "Seni & Budaya Banjar | Visit Banjarmasin",
  description: "Eksplorasi mahakarya kain Sasirangan, arsitektur Rumah Adat Bubungan Tinggi, tarian tradisional, hingga seni Madihin.",
  keywords: "budaya banjar, kain sasirangan, motif sasirangan, rumah adat bubungan tinggi, rumah banjar, madihin, john tralala, baayun maulid, tradisi kalimantan selatan, tarian baksa kembang, seni budaya banjarmasin, sejarah sasirangan, adat istiadat suku banjar, kampung sasirangan sg jingah, banjarese culture, traditional fabric sasirangan, kalimantan art, budaya sungai",
  alternates: {
    canonical: "/budaya",
    languages: {
      "id-ID": "/budaya",
      "en-US": "/en/budaya",
      "ms-MY": "/ms/budaya",
      "zh-CN": "/zh/budaya",
      "x-default": "/budaya"
    }
  },
  openGraph: {
    title: "Seni & Budaya Banjar | Tradisi Kalimantan Selatan",
    description: "Eksplorasi mahakarya kain Sasirangan, arsitektur Rumah Adat Bubungan Tinggi, tarian tradisional, hingga seni Madihin.",
    url: "https://visitbanjarmasin.id/budaya",
    images: ["/home/hero_kain_sasirangan.webp"],
  }
};

export default function BudayaPage() {
  return <Budaya />;
}
