import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// DATA SECTION 1: WASTRA & KERAJINAN (SPOTLIGHT)
const sasiranganData = [
  {
    id: 'bayam',
    name: 'Motif Bayam Raja',
    colorName: 'Kuning Kunyit (Kurkuma)',
    hex: '#F4C038',
    image: '/budaya/motif bayam raj.webp',
    filosofi: 'Lambang kebangsawanan dan kepemimpinan luhur. Dahulu diperuntukkan khusus bagi sultan dan kaum bangsawan Banjar.',
    penyembuhan: 'Secara filosofis batatamba digunakan sebagai terapi ketenangan jiwa dan pengusir energi negatif.',
    proses: 'Diikat presisi dengan teknik jelujur, lalu dicelup rebusan akar kuning dan kunyit alami.'
  },
  {
    id: 'naga',
    name: 'Motif Naga Balimbur',
    colorName: 'Hijau Karamunting',
    hex: '#00A896',
    image: '/budaya/naga-balimbur-salah-satu-motif-b.webp',
    filosofi: 'Menggambarkan naga sakti yang sedang mandi di Sungai Martapura, melambangkan kesuburan dan perlindungan alam.',
    penyembuhan: 'Diyakini membawa kesegaran jasmani dan ketabahan menghadapi arus ujian kehidupan.',
    proses: 'Pewarnaan menggunakan ekstrak daun mengkudu dan tarung alami menghasilkan nuansa zamrud borneo.'
  },
  {
    id: 'kembang',
    name: 'Motif Kembang Kacang',
    colorName: 'Merah Mengkudu',
    hex: '#E63946',
    image: '/budaya/motif kembang kacang.webp',
    filosofi: 'Simbol keharuman budi pekerti dan persaudaraan masyarakat Banjar yang erat mengikat seperti sulur tanaman kacang.',
    penyembuhan: 'Menghadirkan kehangatan rasa kasih sayang dan keharmonisan rumah tangga.',
    proses: 'Pencelupan berulang dengan kulit kayu ulin dan buah kesumba untuk merah pekat abadi.'
  },
  {
    id: 'purun',
    name: 'Anyaman Purun Loksado',
    colorName: 'Coklat Kayu Ulin',
    hex: '#8D5B4C',
    image: '/budaya/anyaman-purun.webp',
    filosofi: 'Kerajinan ramah lingkungan dari rumput purun liar di lahan gambut Kalimantan Selatan.',
    penyembuhan: 'Menceritakan ketekunan jemari perempuan pengrajin di pesisir sungai yang menjaga keseimbangan ekosistem.',
    proses: 'Rumput purun dijemur, ditumbuk hingga pipih, lalu dianyam dengan motif geometri segitiga rebung.'
  },
  {
    id: 'haruan',
    name: 'Motif Gigi Haruan',
    colorName: 'Biru Tarum',
    hex: '#1E3A8A',
    image: '/budaya/motif_gigi_haruan.png',
    filosofi: 'Terinspirasi dari ikan haruan (gabus). Melambangkan ketajaman berpikir, kecerdasan, dan ketangguhan dalam menghadapi ujian hidup.',
    penyembuhan: 'Secara magis dipercaya memberikan perlindungan diri serta semangat pantang menyerah bagi orang yang memakainya.',
    proses: 'Diikat dengan teknik zig-zag runcing, kemudian dicelup menggunakan pewarna alami dari daun tarum (indigo).'
  },
  {
    id: 'sarigading',
    name: 'Kain Sarigading (Tenun)',
    colorName: 'Kuning Keemasan',
    hex: '#D4AF37',
    image: '/budaya/kain_sarigading.png',
    filosofi: 'Kain sakral leluhur Banjar dari zaman Negara Dipa. Melambangkan kesucian, ketulusan, dan kekuatan pelindung gaib.',
    penyembuhan: 'Media magis utama dalam ritual Batatamba asli untuk mengobati penyakit non-medis atau teguran gaib (kepuhunan).',
    proses: 'Berbeda dari Sasirangan (jahit-celup), Sarigading dibuat melalui teknik tenun ikat tradisional dengan benang sutra.'
  }
];

// DATA SECTION 2: SENI PERTUNJUKAN & TRADISI BANJAR (Rich Showcase Cards)
const seniPertunjukanData = [
  {
    id: 'panting',
    title: 'Seni Musik Panting',
    subtitle: 'Alunan Petikan Dawai Borneo',
    category: 'Seni Musik WBTb',
    image: '/budaya/panting.webp',
    quote: '"Dipetik dawai panting berdenting, menyambut tamu membawa damai."',
    desc: 'Musik tradisional khas Kalimantan Selatan berinstrumen utama panting (sejenis gambus kecil), babun, dan gong. Mengalun dinamis mengiringi tarian istana maupun syair selawat.',
    badgeColor: 'bg-[#008075]',
    icon: '🎸'
  },
  {
    id: 'madihin',
    title: 'Tradisi Lisan Madihin',
    subtitle: 'Monolog Syair Humor Satir',
    category: 'Tradisi Lisan WBTb',
    image: '/budaya/Kesenian_Madihin.webp',
    quote: '"Bismillah pembuka kata, Madihin Banjar penghibur lara, kritik sosial secara jenaka."',
    desc: 'Seni bertutur lisan oleh seniman yang menabuh rebana tarbang sambil merangkai pantun spontan yang cerdas, jenaka, namun sarat nasihat dan pesan moral.',
    badgeColor: 'bg-[#E63946]',
    icon: '🎤'
  },
  {
    id: 'baksa',
    title: 'Tari Baksa Kembang',
    subtitle: 'Keanggunan Bunga Bogam',
    category: 'Tarian Istana WBTb',
    image: '/budaya/tari baksa kembang.webp',
    quote: '"Gemulai jemari membawa bogam, menebar harum persaudaraan."',
    desc: 'Tarian kebesaran Kesultanan Banjar abad ke-16 penyambut tamu agung. Penari mengenakan mahkota gajah gemuling dengan rangkaian bunga mawar dan melati di hadapan tamu kehormatan.',
    badgeColor: 'bg-[#33C3B3]',
    icon: '🌸'
  },
  {
    id: 'lamut',
    title: 'Seni Bertutur Lamut',
    subtitle: 'Epos Sakral Palamutan',
    category: 'Warisan Lisan WBTb',
    image: '/budaya/Seni Bertutur Lamut.webp',
    quote: '"Kisah Raden Pamadi dari Negeri Pujud, wejangan spiritual leluhur Banjar."',
    desc: 'Pertunjukan bercerita sakral dibawakan seorang Palamutan diringi terbang besar. Digelar sebagai bentuk syukur atas terkabulnya hajat dan nadzar masyarakat.',
    badgeColor: 'bg-[#F4C038]',
    icon: '📖'
  },
  {
    id: 'sinoman',
    title: 'Sinoman Hadrah',
    subtitle: 'Penyambut Tamu & Pengantin',
    category: 'Seni Islami WBTb',
    image: '/budaya/sinoman_hadrah.png',
    quote: '"Sinoman hadir merayakan, hadrah bergema menyambut keberkahan."',
    desc: 'Kesenian tradisional Banjar memadukan qasidah (seni suara) dan tari yang ditampilkan menyambut tamu kehormatan dan dalam rangkaian prosesi perkawinan adat Banjar.',
    badgeColor: 'bg-[#7C3AED]',
    icon: '🕌'
  },
  {
    id: 'mamanda',
    title: 'Seni Teater Mamanda',
    subtitle: 'Sandiwara Tradisional Banjar',
    category: 'Seni Teater WBTb',
    image: '/budaya/teater_mamanda.png',
    quote: '"Kisah Raja dan Wazir, panggung sandiwara cermin kehidupan masyarakat Banjar."',
    desc: 'Seni teater tradisional khas Kalimantan Selatan yang menceritakan kehidupan istana, diselingi humor, interaksi penonton, kritik sosial, dan pesan moral luhur.',
    badgeColor: 'bg-[#D97706]',
    icon: '🎭'
  }
];

// DATA SECTION 3: ANATOMI ARSITEKTUR BUBUNGAN TINGGI
const hotspotData = [
  {
    id: 'atap',
    title: 'Atap Bubungan Tinggi',
    x: '38%', y: '18%',
    desc: 'Atap meluncur tajam ke langit hingga 45 derajat. Melambangkan pohon hayat dan hubungan vertikal antara manusia dengan Sang Pencipta.',
    filosofi: 'Ketinggian melambangkan martabat kebangsawanan dan kemuliaan budi.'
  },
  {
    id: 'anjung',
    title: 'Anjung Sayap Istana',
    x: '25%', y: '55%',
    desc: 'Sayap bangunan yang menjorok keluar di sisi kiri dan kanan ibarat burung garuda yang sedang membentangkan sayapnya melindungi rakyat.',
    filosofi: 'Melambangkan keseimbangan hidup antara urusan duniawi dan ukhrawi.'
  },
  {
    id: 'ukiran',
    title: 'Ukiran Tatawatan Ulin',
    x: '75%', y: '65%',
    desc: 'Ukiran relief terawang pada pagar jelujur bermotif sulur kembang kacang dan nanas.',
    filosofi: 'Kayu ulin besi anti-lapuk melambangkan keteguhan iman dan kesucian hati masyarakat Banjar.'
  }
];

// DATA SECTION 4: AGENDA FESTIVAL & KOMUNITAS PELESTARI (Terverifikasi & Valid)
const festivalResmiData = [
  {
    title: 'Banjarmasin Sasirangan Festival (BSF)',
    desc: 'Ajang tahunan terbesar (edisi ke-8 pada 2024) yang digelar di kawasan Siring Menara Pandang & Duta Mall Banjarmasin. Menampilkan fashion show, pameran UMKM pengrajin, lomba desain motif, dan pawai basasirangan. Tercatat transaksi ekonomi kreatif mencapai Rp1,7 miliar.',
    portalName: 'Portal Resmi Kota Banjarmasin',
    url: 'https://banjarmasinkota.go.id/',
    tag: 'Festival Wastra'
  },
  {
    title: 'Festival Jukung Hias Tanglong',
    desc: 'Festival tahunan resmi kota yang menampilkan ratusan perahu jukung tradisional yang dihias dengan lampu tanglong (lentera) indah dan diarak di Sungai Martapura pada malam hari. Menjadi agenda budaya unggulan Disbudporapar Kota Banjarmasin.',
    portalName: 'Disbudporapar Kota Banjarmasin',
    url: 'https://banjarmasinkota.go.id/',
    tag: 'Festival Bahari'
  }
];

const sanggarResmiData = [
  {
    name: 'Komunitas & Pengrajin Kampung Sasirangan',
    category: 'Pusat Kerajinan Wastra',
    location: 'Kampung Jelujur & Seberang Mesjid',
    desc: 'Pusat edukasi dan pelestarian pewarnaan kain Sasirangan autentik. Setelah BSF 2024, Kampung Jelujur diresmikan sebagai pusat mata rantai ekonomi kerajinan Sasirangan di Banjarmasin.',
    linkText: '📸 Eksplorasi Karya di Instagram',
    url: 'https://www.instagram.com/explore/tags/kampungsasirangan/'
  },
  {
    name: 'Sanggar Tari & Seni Budaya Banjar',
    category: 'Pelestarian Seni Lisan & Tari',
    location: 'Taman Budaya Kalimantan Selatan',
    desc: 'Wadah berkumpulnya para seniman Madihin, Musik Panting, penari Baksa Kembang, dan seniman Sinoman Hadrah untuk berlatih dan mementaskan karya seni adiluhung Banjar.',
    linkText: '📸 Eksplorasi Pentas Seni Banjar',
    url: 'https://www.instagram.com/explore/tags/tamanbudayakalsel/'
  }
];

// MOBILE INTERACTIVE SPOTLIGHT ITEMS (Super Clean & Responsive di HP)
const mobileLookbookItems = [
  {
    tabName: '🌸 Tari Istana',
    title: 'Tari Baksa Kembang',
    tag: 'Tari Kebesaran Banjar',
    desc: 'Tarian klasik kebesaran kerajaan penyambut tamu agung Banjar dengan mahkota gajah gemuling dan bunga bogam.',
    img: '/budaya/tari baksa kembang.webp'
  },
  {
    tabName: '✨ Wastra Adat',
    title: 'Wastra Sasirangan',
    tag: 'Kain Jelujur Alami',
    desc: 'Mahakarya pewarnaan rintang ikat tradisional Banjar yang sarat filosofi pengobatan dan perlindungan spiritual.',
    img: '/budaya/motif bayam raj.webp'
  },
  {
    tabName: '🛶 Susur Sungai',
    title: 'Perahu Kelotok Sungai',
    tag: 'Budaya Bahari Borneo',
    desc: 'Urat nadi pergerakan masyarakat sungai Banjar dalam berdagang di pasar terapung dan menyusuri tepian Martapura.',
    img: '/budaya/atap bubungan tinggi.webp'
  },
  {
    tabName: '🎵 Seni Lisan',
    title: 'Musik Panting & Madihin',
    tag: 'Warisan Bertutur',
    desc: 'Alunan petikan dawai panting dan ketukan rebana tarbang yang mengiringi syair humor kritik sosial sarat pesan moral.',
    img: '/budaya/panting.webp'
  }
];

export default function Budaya() {
  // State Mobile Hero Spotlight
  const [activeMobileHero, setActiveMobileHero] = useState(mobileLookbookItems[0]);

  // State Section 1: Sasirangan Spotlight
  const [activeMotif, setActiveMotif] = useState(sasiranganData[0]);

  // State Section 3: Hotspot Blueprint
  const [activePin, setActivePin] = useState(hotspotData[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app-container min-h-screen overflow-x-hidden">
      <Navbar />

      {/* =========================================================================
          HERO SECTION: SUBJUDUL KEMBALI HADIR + JUDUL & DESKRIPSI 1 BARIS
          Optimasi Gambar async & lazy untuk performa maksimal
          ========================================================================= */}
      <section className="pt-28 sm:pt-32 pb-12 max-w-[1240px] mx-auto px-4 overflow-hidden">

        {/* Header Konsisten dengan Home */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <span className="inline-block text-[10px] sm:text-xs font-extrabold tracking-[0.25em] uppercase text-[#33C3B3] mb-2 font-heading">
            ✦ EKSPLORASI SENI & FILOSOFI LELUHUR
          </span>

          <h1 className="hero-title !mb-3">
            Keanggunan Warisan & <br className="hidden sm:inline" />
            <span className="text-sasirangan">Wastra Borneo</span>
          </h1>

          <p className="hero-subtitle mx-auto !mb-6 !max-w-2xl px-2">
            Menyelami keharmonisan filosofi masyarakat Banjar melalui liukan kain Sasirangan, Tari Baksa Kembang, dan arsitektur Kesultanan.
          </p>
        </div>

        {/* Desktop 5-Column Grid */}
        <div className="hidden md:grid grid-cols-5 gap-6 items-center relative">

          {/* KOLOM 1 */}
          <div className="col-span-1 flex flex-col justify-center">
            <div className="relative rounded-[32px] overflow-hidden h-[260px] bg-amber-500/10 border border-[var(--glass-border)] shadow-md group hover:border-[#F4C038] transition-all duration-200">
              <img
                src="/budaya/motif bayam raj.webp"
                alt="Wastra Sasirangan"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-3 left-3 bg-[#F4C038] text-[#091422] font-black text-[9px] px-2.5 py-1 rounded-full shadow">
                🌸 Sasirangan
              </span>
            </div>
          </div>

          {/* KOLOM 2 */}
          <div className="col-span-1 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden h-[160px] bg-teal-500/10 border border-[var(--glass-border)] shadow-md group hover:border-[#33C3B3] transition-all duration-200">
              <img
                src="/budaya/atap bubungan tinggi.webp"
                alt="Perahu Kelotok Sungai"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-2 left-2 bg-[#091422]/90 text-[#33C3B3] font-black text-[8px] px-2 py-0.5 rounded border border-white/10">
                🛶 Sungai
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden h-[160px] bg-yellow-500/10 border border-[var(--glass-border)] shadow-md group hover:border-[#F4C038] transition-all duration-200">
              <img
                src="/budaya/anyaman-purun.webp"
                alt="Anyaman Kayu Ulin"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-2 left-2 bg-[#091422]/90 text-[#F4C038] font-black text-[8px] px-2 py-0.5 rounded border border-white/10">
                ✨ Anyaman
              </span>
            </div>
          </div>

          {/* KOLOM 3 */}
          <div className="col-span-1 relative flex flex-col items-center justify-center">
            <span className="text-2xl text-[#F4C038] mb-2 select-none inline-block">✦</span>

            <div className="w-full max-w-[260px] h-[440px] rounded-[40px] overflow-hidden border-2 border-[#F4C038] shadow-lg relative group bg-[#050B14] mx-auto hover:-translate-y-1 transition-transform duration-200">
              <img
                src="/budaya/tari baksa kembang.webp"
                alt="Tari Baksa Kembang"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#050B14] via-[#050B14]/20 to-transparent p-4 flex flex-col justify-end text-center">
                <span className="text-[8px] font-black uppercase tracking-widest text-[#33C3B3] mb-0.5 font-heading">
                  Warisan Abad ke-16
                </span>
                <h3 className="text-lg font-black text-white mb-1 font-heading">
                  Tari Baksa Kembang
                </h3>
                <p className="text-[10px] text-slate-300 leading-relaxed line-clamp-2 font-body">
                  Tarian klasik kebesaran kerajaan penyambut tamu agung Banjar.
                </p>
              </div>
            </div>

            <span className="absolute bottom-2 left-2 text-lg">🌸</span>
            <span className="absolute top-8 right-2 text-lg">🌺</span>
          </div>

          {/* KOLOM 4 */}
          <div className="col-span-1 flex flex-col gap-4">
            <div className="relative rounded-2xl overflow-hidden h-[160px] bg-orange-500/10 border border-[var(--glass-border)] shadow-md group hover:border-[#F4C038] transition-all duration-200">
              <img
                src="/wisata/960px-Rumah_Adat_Bubungan_Tinggi.webp"
                alt="Arsitektur Kayu Ulin"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 right-2 bg-[#008075] text-white font-bold text-[8px] px-2 py-0.5 rounded">
                🏠 Ukiran Ulin
              </span>
            </div>

            <div className="relative rounded-2xl overflow-hidden h-[160px] bg-sky-500/10 border border-[var(--glass-border)] shadow-md group hover:border-[#33C3B3] transition-all duration-200">
              <img
                src="/budaya/panting.webp"
                alt="Alat Musik Panting"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-2 right-2 bg-[#00A896] text-white font-bold text-[8px] px-2 py-0.5 rounded">
                🎵 Musik Panting
              </span>
            </div>
          </div>

          {/* KOLOM 5 */}
          <div className="col-span-1 flex flex-col justify-center relative">
            <div className="hidden md:flex absolute -top-6 -right-3 w-16 h-16 rounded-full bg-[#091422]/95 border border-[#F4C038] items-center justify-center z-20 shadow-md">
              <span className="text-[10px] font-black text-[#F4C038]">✦</span>
            </div>

            <div className="relative rounded-[32px] overflow-hidden h-[260px] bg-emerald-500/10 border border-[var(--glass-border)] shadow-md group hover:border-[#33C3B3] transition-all duration-200">
              <img
                src="/budaya/motif kembang kacang.webp"
                alt="Seni Kalimantan"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 right-3 bg-[#00A896] text-white font-black text-[9px] px-2.5 py-1 rounded-full shadow">
                #Heritage
              </span>
            </div>
          </div>

        </div>

        {/* Mobile / Tablet View (Interactive Spotlight Banner & Tabs) */}
        <div className="flex md:hidden flex-col items-center w-full pt-2 pb-6 px-1">

          {/* Main Hero Card Spotlight */}
          <div className="w-full h-[380px] sm:h-[420px] rounded-[32px] overflow-hidden relative shadow-2xl border border-white/15 bg-slate-900 transition-all duration-300">
            <img
              key={activeMobileHero.img}
              src={activeMobileHero.img}
              alt={activeMobileHero.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover animate-fadeIn"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#091422] via-[#091422]/50 to-transparent opacity-95" />

            <div className="absolute bottom-6 left-5 right-5 text-left">
              <span className="inline-block bg-[#F4C038] text-[#091422] font-black text-[10px] px-3 py-1 rounded-full mb-2 shadow-md uppercase tracking-wider">
                {activeMobileHero.tag}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-heading leading-tight mb-2">
                {activeMobileHero.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-body leading-relaxed line-clamp-3">
                {activeMobileHero.desc}
              </p>
            </div>
          </div>

          {/* Interactive Spotlight Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 mt-5 w-full">
            {mobileLookbookItems.map((item, idx) => {
              const isActive = activeMobileHero.title === item.title;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveMobileHero(item)}
                  className={`px-3.5 py-2 rounded-full text-xs font-bold font-heading transition-all duration-200 border ${isActive
                      ? 'bg-[#F4C038] text-[#091422] border-[#F4C038] shadow-md scale-105'
                      : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                >
                  {item.tabName}
                </button>
              );
            })}
          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 1: FILOSOFI BATATAMBA & WASTRA SASIRANGAN
          ========================================================================= */}
      <section className="py-16 max-w-[1240px] mx-auto px-4 border-t border-[var(--glass-border)]">
        <div className="text-center md:text-left mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#F4C038] font-heading block mb-1">
              • WARISAN KERAJINAN WBTb INDONESIA
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-[var(--text-main)] font-heading">
              Filosofi Batatamba & <span className="text-[#33C3B3]">Wastra Sasirangan</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-muted)] max-w-md font-body leading-relaxed">
            Pilih motif di bawah untuk mengungkap rahasia pewarnaan alami dan filosofi ritual pengobatan tradisional Banjar.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 scrollbar-none snap-x">
            {sasiranganData.map((motif) => {
              const isSelected = activeMotif.id === motif.id;
              return (
                <button
                  key={motif.id}
                  onClick={() => setActiveMotif(motif)}
                  className={`flex-shrink-0 snap-start text-left p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between min-w-[220px] lg:min-w-0 ${isSelected
                      ? 'bg-[var(--card-bg)] border-[#F4C038] shadow-md scale-[1.01]'
                      : 'bg-transparent border-[var(--glass-border)] opacity-70 hover:opacity-100 hover:translate-x-1'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="w-4 h-4 rounded-full flex-shrink-0 shadow-sm border border-white/20"
                      style={{ backgroundColor: motif.hex }}
                    />
                    <div>
                      <h4 className="text-sm font-bold text-[var(--text-main)] font-heading">
                        {motif.name}
                      </h4>
                      <span className="text-[10px] text-[var(--text-muted)] block font-body">
                        {motif.colorName}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-bold ${isSelected ? 'text-[#F4C038]' : 'text-slate-500'}`}>
                    {isSelected ? '●' : '○'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-8 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[32px] p-6 md:p-8 shadow-md relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMotif.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
              >
                <div className="relative rounded-2xl overflow-hidden h-[260px] md:h-[320px] bg-slate-900 border border-white/10 shadow-inner group">
                  <img
                    src={activeMotif.image}
                    alt={activeMotif.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#091422]/95 px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeMotif.hex }} />
                    <span className="text-[10px] font-black text-white">{activeMotif.hex}</span>
                  </div>
                </div>

                <div className="flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#33C3B3] font-heading block mb-1">
                      MAKNA & FILOSOFI
                    </span>
                    <h3 className="text-xl md:text-2xl font-black text-[var(--text-main)] font-heading mb-3">
                      {activeMotif.name}
                    </h3>

                    <div className="space-y-3 text-xs md:text-sm text-[var(--text-muted)] font-body leading-relaxed">
                      <p className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[var(--text-main)]">
                        <strong>Kisah Kebangsawanan:</strong> {activeMotif.filosofi}
                      </p>
                      <p>
                        <strong>Ritual Batatamba:</strong> {activeMotif.penyembuhan}
                      </p>
                      <p>
                        <strong>Proses Pewarnaan:</strong> {activeMotif.proses}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--glass-border)] flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#F4C038]">✦ Diakui UNESCO / WBTb Indonesia</span>
                    <a
                      href="https://www.instagram.com/explore/tags/sasiranganbanjarmasin/"
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-black text-[#33C3B3] hover:underline flex items-center gap-1"
                    >
                      Lihat Galeri Karya ➔
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: SENI PERTUNJUKAN & TRADISI BANJAR (Grid 3 kolom, mobile 1 kolom)
          ========================================================================= */}
      <section className="py-16 border-t border-[var(--glass-border)]">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-[#33C3B3] font-heading block mb-1">
              • SENI PERTUNJUKAN & TRADISI LISAN WBTb
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-[var(--text-main)] font-heading mb-3">
              Panggung Lisan & <span className="text-[#F4C038]">Tradisi Banjar</span>
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-muted)] font-body">
              Enam warisan seni budaya Banjar yang telah diakui sebagai Warisan Budaya Takbenda (WBTb) Indonesia, dari panggung istana hingga ritual adat.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {seniPertunjukanData.map((stage) => (
              <div
                key={stage.id}
                className="bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl overflow-hidden shadow-md hover:border-[#F4C038] hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Image Area - Square Crop, Fixed Height */}
                <div className="h-[200px] relative overflow-hidden flex-shrink-0 bg-slate-900">
                  <img
                    src={stage.image}
                    alt={stage.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`${stage.badgeColor} text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow`}>
                      {stage.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-2xl">
                    {stage.icon}
                  </div>
                </div>

                {/* Content Area - Fixed, Clean */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-[#33C3B3] uppercase tracking-wider block mb-1 font-heading">
                      {stage.subtitle}
                    </span>
                    <h3 className="text-base font-black text-[var(--text-main)] font-heading mb-3 group-hover:text-[#F4C038] transition-colors leading-snug">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] font-body leading-relaxed line-clamp-3">
                      {stage.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[var(--glass-border)] flex items-center justify-between text-[11px] font-bold text-[#33C3B3]">
                    <span>✦ WBTb Indonesia</span>
                    <span className="text-[var(--text-main)] group-hover:text-[#F4C038] transition-colors">Eksplorasi ➔</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: ANATOMI ARSITEKTUR BUBUNGAN TINGGI
          ========================================================================= */}
      <section className="py-16 max-w-[1240px] mx-auto px-4 border-t border-[var(--glass-border)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 relative rounded-[36px] overflow-hidden border border-[var(--glass-border)] shadow-md bg-slate-900 h-[360px] md:h-[480px]">
            <img
              src="/wisata/960px-Rumah_Adat_Bubungan_Tinggi.webp"
              alt="Arsitektur Bubungan Tinggi"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#091422] via-transparent to-transparent opacity-70" />

            {hotspotData.map((pin) => {
              const isActive = activePin.id === pin.id;
              return (
                <button
                  key={pin.id}
                  onClick={() => setActivePin(pin)}
                  style={{ left: pin.x, top: pin.y }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-transform duration-200 ${isActive ? 'scale-125' : 'hover:scale-110'
                    }`}
                  title={pin.title}
                >
                  <span className={`relative w-7 h-7 rounded-full border-2 border-white flex items-center justify-center font-black text-xs shadow-md ${isActive ? 'bg-[#F4C038] text-[#091422]' : 'bg-[#091422] text-white'
                    }`}>
                    +
                  </span>
                </button>
              );
            })}

            <div className="absolute bottom-4 left-4 bg-[#091422]/95 px-4 py-2 rounded-2xl border border-white/10">
              <span className="text-[10px] font-black text-[#F4C038] uppercase tracking-wider block">🏰 ISTANA KESULTANAN</span>
              <span className="text-xs font-bold text-white">Rumah Adat Bubungan Tinggi Kayu Ulin</span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-[32px] p-6 md:p-8 shadow-md">
            <span className="text-xs font-black uppercase tracking-widest text-[#33C3B3] font-heading block mb-1">
              • ANATOMI & FILOSOFI KAYU ULIN
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={activePin.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <h2 className="text-2xl md:text-3xl font-black text-[var(--text-main)] font-heading mb-4">
                  {activePin.title}
                </h2>

                <div className="space-y-4 text-xs md:text-sm text-[var(--text-muted)] font-body leading-relaxed">
                  <p className="p-3.5 rounded-2xl bg-teal-500/5 border border-teal-500/20 text-[var(--text-main)] font-medium">
                    {activePin.desc}
                  </p>
                  <div>
                    <h4 className="text-xs font-bold text-[#F4C038] uppercase tracking-wider mb-1">Makna Spiritual:</h4>
                    <p>{activePin.filosofi}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 pt-6 border-t border-[var(--glass-border)] flex items-center gap-2 overflow-x-auto pb-1">
              {hotspotData.map((pin) => (
                <button
                  key={pin.id}
                  onClick={() => setActivePin(pin)}
                  className={`text-[11px] font-bold px-3 py-1.5 rounded-xl border flex-shrink-0 transition-all ${activePin.id === pin.id
                      ? 'bg-[#F4C038] text-[#091422] border-[#F4C038] shadow-sm'
                      : 'bg-transparent text-[var(--text-muted)] border-[var(--glass-border)] hover:border-[#33C3B3]'
                    }`}
                >
                  📍 {pin.title.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: ETALASE FESTIVAL & DIREKTORI RESMI PELESTARI BUDAYA
          ========================================================================= */}
      <section className="py-16 border-t border-[var(--glass-border)]">
        <div className="max-w-[1240px] mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#33C3B3] font-heading block mb-1">
              • DUKUNG & LESTARIKAN BUDAYA LOKAL
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-[var(--text-main)] font-heading mb-3">
              Etalase Festival & <span className="text-[#F4C038]">Komunitas Budaya</span>
            </h2>
            <p className="text-xs md:text-sm text-[var(--text-muted)] font-body">
              Kunjungi portal resmi dan galeri digital para seniman serta pengrajin untuk mengenal lebih dekat warisan kebanggaan Banjarmasin.
            </p>
          </div>

          <div className="mb-12">
            <h3 className="text-lg font-black text-[var(--text-main)] font-heading mb-6 flex items-center gap-2">
              <span>🎉 Festival Budaya Tahunan Kota Banjarmasin</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {festivalResmiData.map((fest, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl p-6 md:p-8 shadow-md flex flex-col justify-between hover:border-[#F4C038] hover:-translate-y-1 transition-all duration-200"
                >
                  <div>
                    <span className="inline-block bg-[#008075] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-3 shadow">
                      {fest.tag}
                    </span>
                    <h4 className="text-xl font-black text-[var(--text-main)] font-heading mb-2">
                      {fest.title}
                    </h4>
                    <p className="text-xs md:text-sm text-[var(--text-muted)] font-body leading-relaxed mb-6">
                      {fest.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--glass-border)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <span className="text-[11px] font-bold text-[#33C3B3]">🌐 {fest.portalName}</span>
                    <a
                      href={fest.url}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto text-center bg-[#F4C038] text-[#091422] text-xs font-black px-5 py-2.5 rounded-xl hover:bg-amber-400 transition-all shadow flex items-center justify-center gap-1.5"
                    >
                      <span>Kunjungi Portal Resmi</span>
                      <span>➔</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black text-[var(--text-main)] font-heading mb-6 flex items-center gap-2">
              <span>🎨 Komunitas Seniman & Pengrajin Wastra</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sanggarResmiData.map((komunitas, idx) => (
                <div
                  key={idx}
                  className="bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl p-6 md:p-8 shadow-md flex flex-col justify-between hover:border-[#33C3B3] hover:-translate-y-1 transition-all duration-200"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-black text-[#F4C038] bg-[#F4C038]/10 px-3 py-1 rounded-full border border-[#F4C038]/20">
                        ● {komunitas.category}
                      </span>
                      <span className="text-[11px] text-[var(--text-muted)] font-medium">📍 {komunitas.location}</span>
                    </div>
                    <h4 className="text-xl font-black text-[var(--text-main)] font-heading mb-2">
                      {komunitas.name}
                    </h4>
                    <p className="text-xs md:text-sm text-[var(--text-muted)] font-body leading-relaxed mb-6">
                      {komunitas.desc}
                    </p>
                  </div>

                  <a
                    href={komunitas.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center bg-[#008075] hover:bg-[#006e65] text-white text-xs font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow"
                  >
                    <span>{komunitas.linkText}</span>
                    <span>➔</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
