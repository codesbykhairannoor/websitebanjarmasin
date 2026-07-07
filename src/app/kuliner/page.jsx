import Kuliner from "../../views/Kuliner";

export const metadata = {
  title: "Kuliner Khas Banjarmasin | Visit Banjarmasin",
  description: "Cicipi kelezatan otentik Soto Banjar, Ketupat Kandangan, Lontong Orari, hingga aneka wadai tradisional Banjar.",
  keywords: "kuliner banjarmasin, soto banjar, soto banjar bang amat, resep soto banjar, ketupat kandangan, lontong orari, nasi kuning banjar, wadai bingka, bingka barendam, amparan tatak, iwak karing batanak, manday, kuliner khas kalimantan selatan, makanan khas banjar, wisata kuliner banjarmasin, sate tulang, soto kuah susu, kaldu ayam kampung, rumah makan banjarmasin, banjarmasin food guide, banjarese culinary",
  alternates: {
    canonical: "/kuliner",
    languages: {
      "id-ID": "/kuliner",
      "en-US": "/en/kuliner",
      "ms-MY": "/ms/kuliner",
      "zh-CN": "/zh/kuliner",
      "x-default": "/kuliner"
    }
  },
  openGraph: {
    title: "Kuliner Otentik Banjarmasin | Cita Rasa Legendaris",
    description: "Cicipi kelezatan otentik Soto Banjar, Ketupat Kandangan, Lontong Orari, hingga aneka wadai tradisional Banjar.",
    url: "https://visitbanjarmasin.id/kuliner",
    images: ["/kuliner/soto banjar.webp"],
  }
};

export default function KulinerPage() {
  return <Kuliner />;
}
