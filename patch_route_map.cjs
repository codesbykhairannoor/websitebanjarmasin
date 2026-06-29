const fs = require('fs');

const data = {
  id: {
    routeMapExt: `
      routeMap: {
        tag: "✦ NAVIGASI & AKSESIBILITAS TERPADU",
        title: "Peta Rute",
        titleSpan: "Banjarmasin",
        subtitle: "Jelajahi panduan rute transportasi publik, dermaga wisata, dan lokasi akomodasi strategis di Kota Seribu Sungai.",
        lokasiTerpilih: "Titik Terpilih",
        bukaRute: "Buka Rute ➔",
        categories: ["Semua", "🚌 Rute BRT", "🏝️ Destinasi Wisata", "🛶 Dermaga Sungai", "🏨 Hotel Pilihan", "🚨 Posko Darurat"],
        locations: [
          { title: "Halte Bandara Syamsudin Noor", category: "🚌 Rute BRT", desc: "Titik keberangkatan bus BRT Trans Banjarbakula (Rute Bandara 1) menuju Terminal Gambut Barakat Km 17. Bayar cashless QRIS Rp 5.000.", info: "Tarif Flat Rp 5.000" },
          { title: "Terminal Gambut Barakat (Km 17)", category: "🚌 Rute BRT", desc: "Hub transit utama bagi seluruh koridor Trans Banjarbakula. Tempat transit perpindahan bus dari arah bandara menuju pusat kota Banjarmasin.", info: "Hub Transit Utama" },
          { title: "Halte Siring Menara Pandang (Km 0)", category: "🚌 Rute BRT", desc: "Halte pemberhentian Koridor 2 di pusat keramaian wisata Siring Menara Pandang dan Pasar Terapung Tendean.", info: "Koridor 2 (Pusat Kota)" },
          { title: "Halte Pasar Sudimampir", category: "🚌 Rute BRT", desc: "Halte strategis di kawasan niaga dan perbelanjaan lawas Sudimampir, dekat dengan akses kuliner tradisional.", info: "Akses Pusat Niaga" },
          { title: "Halte Universitas Lambung Mangkurat", category: "🚌 Rute BRT", desc: "Halte Koridor 1 di kawasan pendidikan Kayutangi, melayani akses mobilitas mahasiswa dan masyarakat umum utara kota.", info: "Koridor 1 (Kayutangi)" },
          { title: "Menara Pandang & Siring Martapura", category: "🏝️ Destinasi Wisata", desc: "Landmark ikonik di pusat kota dengan pemandangan 360 derajat Sungai Martapura dan pusat keramaian siring.", info: "Landmark Ikonik 360°" },
          { title: "Patung Maskot Bekantan", category: "🏝️ Destinasi Wisata", desc: "Patung perunggu raksasa satwa endemik Borneo yang menyemburkan air langsung ke arah Sungai Martapura.", info: "Ikon Kota 24 Jam" },
          { title: "Masjid Bersejarah Sultan Suriansyah", category: "🏝️ Destinasi Wisata", desc: "Masjid tertua di Kalimantan Selatan yang dibangun pada tahun 1526, berarsitektur kayu ulin khas Banjar.", info: "Wisata Sejarah 1526" },
          { title: "Dermaga Kuliner Soto Bang Amat", category: "🏝️ Destinasi Wisata", desc: "Kuliner soto Banjar autentik di tepian sungai sembari menikmati pertunjukan musik Panting khas Banjar.", info: "Gastronomi Soto Banjar" },
          { title: "Dermaga Kelotok Siring Tendean", category: "🛶 Dermaga Sungai", desc: "Pusat persewaan perahu kelotok wisata resmi. Melayani susur sungai reguler (Rp 15.000/orang) dan carter rombongan ke Pasar Terapung Lok Baintan.", info: "Susur Sungai & Carter" },
          { title: "Pasar Terapung Lok Baintan", category: "🛶 Dermaga Sungai", desc: "Tujuan utama perahu wisata subuh menyusuri Sungai Martapura. Rasakan sensasi bertransaksi di atas perahu jukung tradisional.", info: "Waktu Subuh (05.30 WITA)" },
          { title: "Pelabuhan Trisakti Banjarmasin", category: "🛶 Dermaga Sungai", desc: "Gerbang utama transportasi kapal laut penumpang dan logistik yang menghubungkan Kalimantan Selatan dengan Pulau Jawa.", info: "Gerbang Kapal Laut" },
          { title: "Swiss-Belhotel Borneo Riverfront", category: "🏨 Hotel Pilihan", desc: "Hotel bintang empat dengan dermaga pribadi dan teras restoran terbuka langsung menghadap lalu lintas Sungai Martapura.", info: "Bintang 4 • Dermaga Pribadi" },
          { title: "Favehotel Kapt. Tendean", category: "🏨 Hotel Pilihan", desc: "Tepat di seberang Menara Pandang. Pilihan terbaik bagi pejalan kaki yang ingin menjelajahi Siring Tendean kapan saja.", info: "1 Mnt Jalan Kaki ke Siring" },
          { title: "Summer Bed & Breakfast", category: "🏨 Hotel Pilihan", desc: "Boutique hotel berdesain kayu estetik dengan kafe rooftop favorit pelancong muda untuk bersantai menikmati sunset sungai.", info: "Boutique & Kafe Rooftop" },
          { title: "Rattan Inn & Resort", category: "🏨 Hotel Pilihan", desc: "Nuansa resort tropis dengan kolam renang bergaya Bali. Berada di jalan protokol utama menuju Bandara Syamsudin Noor.", info: "Resort & Akses Bandara" },
          { title: "RSUD Ulin Banjarmasin", category: "🚨 Posko Darurat", desc: "Rumah sakit pusat rujukan tingkat provinsi terlengkap di Kalimantan Selatan dengan fasilitas IGD modern siaga 24 jam.", info: "IGD 24 Jam • (0511) 3252180" },
          { title: "Mako Polairud Polda Kalsel (Siring)", category: "🚨 Posko Darurat", desc: "Posko kepolisian perairan di kawasan Siring. Siaga menjaga keamanan ketertiban masyarakat dan keselamatan perahu wisata.", info: "Darurat Keamanan • Call 110" },
          { title: "Posko Tourist Information Center (TIC)", category: "🚨 Posko Darurat", desc: "Pusat pelayanan informasi wisata resmi Pemkot Banjarmasin di Siring Menara Pandang. Siaga membantu panduan rute wisatawan.", info: "Pusat Bantuan Wisatawan" }
        ]
      },`
  },
  en: {
    routeMapExt: `
      routeMap: {
        tag: "✦ INTEGRATED NAVIGATION & ACCESSIBILITY",
        title: "Route Map",
        titleSpan: "Banjarmasin",
        subtitle: "Explore public transportation routes, tourist piers, and strategic accommodation locations in the City of a Thousand Rivers.",
        lokasiTerpilih: "Selected Point",
        bukaRute: "Open Route ➔",
        categories: ["All", "🚌 BRT Route", "🏝️ Tourist Destinations", "🛶 River Piers", "🏨 Selected Hotels", "🚨 Emergency Posts"],
        locations: [
          { title: "Syamsudin Noor Airport Bus Stop", category: "🚌 BRT Route", desc: "Departure point for BRT Trans Banjarbakula (Airport Route 1) to Gambut Barakat Terminal Km 17. Cashless QRIS payment Rp 5,000.", info: "Flat Fare Rp 5,000" },
          { title: "Gambut Barakat Terminal (Km 17)", category: "🚌 BRT Route", desc: "Main transit hub for all Trans Banjarbakula corridors. Transfer point from the airport to downtown Banjarmasin.", info: "Main Transit Hub" },
          { title: "Menara Pandang Siring Bus Stop (Km 0)", category: "🚌 BRT Route", desc: "Corridor 2 stop at the tourist hub of Siring Menara Pandang and Tendean Floating Market.", info: "Corridor 2 (Downtown)" },
          { title: "Sudimampir Market Bus Stop", category: "🚌 BRT Route", desc: "Strategic stop in the old Sudimampir commercial and shopping district, close to traditional culinary access.", info: "Commercial Center Access" },
          { title: "Lambung Mangkurat University Bus Stop", category: "🚌 BRT Route", desc: "Corridor 1 stop in the Kayutangi education area, serving student and public mobility in the north of the city.", info: "Corridor 1 (Kayutangi)" },
          { title: "Menara Pandang & Siring Martapura", category: "🏝️ Tourist Destinations", desc: "Iconic downtown landmark with 360-degree views of the Martapura River and the bustling siring center.", info: "Iconic 360° Landmark" },
          { title: "Proboscis Monkey Mascot Statue", category: "🏝️ Tourist Destinations", desc: "Giant bronze statue of Borneo's endemic animal spraying water directly into the Martapura River.", info: "24-Hour City Icon" },
          { title: "Sultan Suriansyah Historical Mosque", category: "🏝️ Tourist Destinations", desc: "The oldest mosque in South Kalimantan built in 1526, featuring distinctive Banjar ironwood architecture.", info: "Historical Tourism 1526" },
          { title: "Soto Bang Amat Culinary Dock", category: "🏝️ Tourist Destinations", desc: "Authentic Banjar soto on the riverbank while enjoying traditional Banjar Panting music performances.", info: "Banjar Soto Gastronomy" },
          { title: "Siring Tendean Tourist Boat Dock", category: "🛶 River Piers", desc: "Official tourist boat rental center. Serves regular river cruising (Rp 15,000/person) and group charters to Lok Baintan Floating Market.", info: "River Cruise & Charter" },
          { title: "Lok Baintan Floating Market", category: "🛶 River Piers", desc: "Main destination for dawn tourist boats along the Martapura River. Experience bartering on a traditional jukung boat.", info: "Dawn Time (05:30 WITA)" },
          { title: "Trisakti Port Banjarmasin", category: "🛶 River Piers", desc: "Main gateway for passenger and logistics sea transportation connecting South Kalimantan with Java Island.", info: "Sea Ship Gateway" },
          { title: "Swiss-Belhotel Borneo Riverfront", category: "🏨 Selected Hotels", desc: "Four-star hotel with a private dock and open restaurant terrace directly facing Martapura River traffic.", info: "4-Star • Private Dock" },
          { title: "Favehotel Kapt. Tendean", category: "🏨 Selected Hotels", desc: "Right across from Menara Pandang. Best choice for pedestrians wishing to explore Siring Tendean at any time.", info: "1 Min Walk to Siring" },
          { title: "Summer Bed & Breakfast", category: "🏨 Selected Hotels", desc: "Aesthetic wooden design boutique hotel with a rooftop cafe favored by young travelers to relax and enjoy the river sunset.", info: "Boutique & Rooftop Cafe" },
          { title: "Rattan Inn & Resort", category: "🏨 Selected Hotels", desc: "Tropical resort nuances with a Bali-style pool. Located on the main protocol road to Syamsudin Noor Airport.", info: "Resort & Airport Access" },
          { title: "RSUD Ulin Banjarmasin", category: "🚨 Emergency Posts", desc: "The most complete provincial-level referral central hospital in South Kalimantan with a 24-hour modern ER facility.", info: "24-Hour ER • (0511) 3252180" },
          { title: "Water Police Headquarters Kalsel (Siring)", category: "🚨 Emergency Posts", desc: "Water police post in the Siring area. Standing by to maintain public order and tourist boat safety.", info: "Security Emergency • Call 110" },
          { title: "Tourist Information Center (TIC) Post", category: "🚨 Emergency Posts", desc: "Official tourist information service center of Banjarmasin City Government in Siring Menara Pandang.", info: "Tourist Assistance Center" }
        ]
      },`
  },
  ms: {
    routeMapExt: `
      routeMap: {
        tag: "✦ NAVIGASI & KEBOLEHCAPAIAN BERSEPADU",
        title: "Peta Laluan",
        titleSpan: "Banjarmasin",
        subtitle: "Terokai panduan laluan pengangkutan awam, dermaga pelancong, dan lokasi penginapan strategik di Kota Seribu Sungai.",
        lokasiTerpilih: "Titik Dipilih",
        bukaRute: "Buka Laluan ➔",
        categories: ["Semua", "🚌 Laluan BRT", "🏝️ Destinasi Pelancongan", "🛶 Dermaga Sungai", "🏨 Hotel Pilihan", "🚨 Pos Kecemasan"],
        locations: [
          { title: "Hentian Bas Lapangan Terbang Syamsudin Noor", category: "🚌 Laluan BRT", desc: "Titik perlepasan bas BRT Trans Banjarbakula (Laluan Lapangan Terbang 1) ke Terminal Gambut Barakat Km 17. Bayar tanpa tunai QRIS Rp 5,000.", info: "Kadar Rata Rp 5,000" },
          { title: "Terminal Gambut Barakat (Km 17)", category: "🚌 Laluan BRT", desc: "Hab transit utama bagi semua koridor Trans Banjarbakula. Tempat transit pemindahan bas dari lapangan terbang ke pusat bandar Banjarmasin.", info: "Hab Transit Utama" },
          { title: "Hentian Bas Siring Menara Pandang (Km 0)", category: "🚌 Laluan BRT", desc: "Hentian Koridor 2 di pusat pelancongan Siring Menara Pandang dan Pasar Terapung Tendean.", info: "Koridor 2 (Pusat Bandar)" },
          { title: "Hentian Bas Pasar Sudimampir", category: "🚌 Laluan BRT", desc: "Hentian strategik di kawasan perniagaan dan beli-belah lama Sudimampir, berdekatan dengan akses kulinari tradisional.", info: "Akses Pusat Perniagaan" },
          { title: "Hentian Bas Universiti Lambung Mangkurat", category: "🚌 Laluan BRT", desc: "Hentian Koridor 1 di kawasan pendidikan Kayutangi, melayani pergerakan pelajar dan orang awam di utara bandar.", info: "Koridor 1 (Kayutangi)" },
          { title: "Menara Pandang & Siring Martapura", category: "🏝️ Destinasi Pelancongan", desc: "Mercu tanda ikonik pusat bandar dengan pemandangan 360 darjah Sungai Martapura dan pusat keramaian siring.", info: "Mercu Tanda Ikonik 360°" },
          { title: "Patung Maskot Bekantan", category: "🏝️ Destinasi Pelancongan", desc: "Patung gangsa gergasi haiwan endemik Borneo yang menyemburkan air terus ke arah Sungai Martapura.", info: "Ikon Bandar 24 Jam" },
          { title: "Masjid Bersejarah Sultan Suriansyah", category: "🏝️ Destinasi Pelancongan", desc: "Masjid tertua di Kalimantan Selatan yang dibina pada tahun 1526, menampilkan seni bina kayu belian khas Banjar.", info: "Pelancongan Sejarah 1526" },
          { title: "Dermaga Kuliner Soto Bang Amat", category: "🏝️ Destinasi Pelancongan", desc: "Kulinari soto Banjar asli di tebing sungai sambil menikmati persembahan muzik tradisional Panting Banjar.", info: "Gastronomi Soto Banjar" },
          { title: "Dermaga Kelotok Siring Tendean", category: "🛶 Dermaga Sungai", desc: "Pusat sewaan bot pelancong rasmi. Melayan pelayaran sungai biasa (Rp 15,000/orang) dan sewaan berkumpulan ke Pasar Terapung Lok Baintan.", info: "Pelayaran Sungai & Sewaan" },
          { title: "Pasar Terapung Lok Baintan", category: "🛶 Dermaga Sungai", desc: "Destinasi utama bot pelancong subuh menyusuri Sungai Martapura. Rasai pengalaman berjual beli di atas perahu jukung tradisional.", info: "Waktu Subuh (05.30 WITA)" },
          { title: "Pelabuhan Trisakti Banjarmasin", category: "🛶 Dermaga Sungai", desc: "Gerbang utama pengangkutan kapal laut penumpang dan logistik yang menghubungkan Kalimantan Selatan dengan Pulau Jawa.", info: "Gerbang Kapal Laut" },
          { title: "Swiss-Belhotel Borneo Riverfront", category: "🏨 Hotel Pilihan", desc: "Hotel bertaraf empat bintang dengan dermaga peribadi dan teres restoran terbuka yang menghadap terus lalu lintas Sungai Martapura.", info: "Bintang 4 • Dermaga Peribadi" },
          { title: "Favehotel Kapt. Tendean", category: "🏨 Hotel Pilihan", desc: "Betul-betul di seberang Menara Pandang. Pilihan terbaik untuk pejalan kaki yang ingin menjelajah Siring Tendean bila-bila masa.", info: "1 Minit Jalan Kaki ke Siring" },
          { title: "Summer Bed & Breakfast", category: "🏨 Hotel Pilihan", desc: "Hotel butik reka bentuk kayu estetik dengan kafe bumbung kegemaran pelancong muda untuk bersantai menikmati matahari terbenam sungai.", info: "Butik & Kafe Bumbung" },
          { title: "Rattan Inn & Resort", category: "🏨 Hotel Pilihan", desc: "Suasana resort tropika dengan kolam renang gaya Bali. Terletak di jalan protokol utama ke Lapangan Terbang Syamsudin Noor.", info: "Resort & Akses Lapangan Terbang" },
          { title: "RSUD Ulin Banjarmasin", category: "🚨 Pos Kecemasan", desc: "Hospital pusat rujukan peringkat wilayah yang paling lengkap di Kalimantan Selatan dengan kemudahan Kecemasan moden 24 jam.", info: "Kecemasan 24 Jam • (0511) 3252180" },
          { title: "Ibu Pejabat Polis Air Kalsel (Siring)", category: "🚨 Pos Kecemasan", desc: "Pos polis perairan di kawasan Siring. Siap sedia mengekalkan keselamatan awam dan keselamatan bot pelancong.", info: "Kecemasan Keselamatan • Hubungi 110" },
          { title: "Pos Pusat Maklumat Pelancong (TIC)", category: "🚨 Pos Kecemasan", desc: "Pusat perkhidmatan maklumat pelancong rasmi Kerajaan Bandar Banjarmasin di Siring Menara Pandang.", info: "Pusat Bantuan Pelancong" }
        ]
      },`
  },
  zh: {
    routeMapExt: `
      routeMap: {
        tag: "✦ 综合导航与无障碍",
        title: "路线图",
        titleSpan: "马辰",
        subtitle: "探索公共交通路线，旅游码头和千河之城的战略住宿地点。",
        lokasiTerpilih: "选定点",
        bukaRute: "打开路线 ➔",
        categories: ["全部", "🚌 快捷巴士路线", "🏝️ 旅游目的地", "🛶 河流码头", "🏨 精选酒店", "🚨 紧急援助站"],
        locations: [
          { title: "Syamsudin Noor 机场公交站", category: "🚌 快捷巴士路线", desc: "Trans Banjarbakula 快捷巴士（机场1号线）的起点，开往 Gambut Barakat 客运站 17公里处。使用 QRIS 无现金支付 5,000 印尼盾。", info: "统一票价 Rp 5,000" },
          { title: "Gambut Barakat 客运站 (Km 17)", category: "🚌 快捷巴士路线", desc: "所有 Trans Banjarbakula 走廊的主要中转枢纽。从机场到马辰市中心的巴士换乘点。", info: "主要中转枢纽" },
          { title: "观景塔 Siring 公交站 (Km 0)", category: "🚌 快捷巴士路线", desc: "位于 Siring 观景塔和 Tendean 水上市场旅游中心的 2号线站点。", info: "2号线 (市中心)" },
          { title: "Sudimampir 市场公交站", category: "🚌 快捷巴士路线", desc: "位于老牌 Sudimampir 商业购物区的战略性站点，靠近传统美食街。", info: "商业中心通道" },
          { title: "Lambung Mangkurat 大学公交站", category: "🚌 快捷巴士路线", desc: "位于 Kayutangi 教育区的 1号线站点，服务于城市北部的学生和公众出行。", info: "1号线 (Kayutangi)" },
          { title: "观景塔 & 马塔普拉河滨", category: "🏝️ 旅游目的地", desc: "市中心的标志性建筑，可360度全景俯瞰马塔普拉河及繁华的 Siring 中心。", info: "360° 标志性建筑" },
          { title: "长鼻猴吉祥物雕像", category: "🏝️ 旅游目的地", desc: "婆罗洲特有动物的巨型青铜雕像，直接向马塔普拉河喷水。", info: "24小时城市标志" },
          { title: "苏丹苏里安夏历史清真寺", category: "🏝️ 旅游目的地", desc: "南加里曼丹最古老的清真寺，建于1526年，采用独特的班查尔铁木建筑风格。", info: "1526年历史旅游" },
          { title: "Bang Amat 索托美食码头", category: "🏝️ 旅游目的地", desc: "在河畔享用正宗的班查尔索托汤，同时欣赏传统的班查尔潘廷音乐表演。", info: "班查尔索托美食" },
          { title: "Siring Tendean 旅游游船码头", category: "🛶 河流码头", desc: "官方旅游游船租赁中心。提供定期内河巡游（15,000印尼盾/人）和前往 Lok Baintan 水上市场的包船服务。", info: "内河巡游与包船" },
          { title: "Lok Baintan 水上市场", category: "🛶 河流码头", desc: "马塔普拉河黎明旅游船的主要目的地。体验在传统小木船上的水上交易。", info: "黎明时分 (05:30 WITA)" },
          { title: "马辰 Trisakti 港口", category: "🛶 河流码头", desc: "连接南加里曼丹与爪哇岛的主要客运和物流海上交通门户。", info: "海上门户" },
          { title: "Swiss-Belhotel Borneo Riverfront", category: "🏨 精选酒店", desc: "四星级酒店，设有私人码头和直接面向马塔普拉河交通的开放式餐厅露台。", info: "四星级 • 私人码头" },
          { title: "Favehotel Kapt. Tendean", category: "🏨 精选酒店", desc: "就在观景塔对面。是想要随时探索 Siring Tendean 的步行动客的最佳选择。", info: "步行1分钟至 Siring" },
          { title: "Summer Bed & Breakfast", category: "🏨 精选酒店", desc: "采用美学木制设计的精品酒店，拥有深受年轻旅客喜爱的屋顶咖啡厅，可在此放松欣赏河畔日落。", info: "精品酒店与屋顶咖啡厅" },
          { title: "Rattan Inn & Resort", category: "🏨 精选酒店", desc: "拥有巴厘岛风格游泳池的热带度假村氛围。位于通往 Syamsudin Noor 机场的主要协议道路上。", info: "度假村与机场通道" },
          { title: "马辰 Ulin 地区综合医院", category: "🚨 紧急援助站", desc: "南加里曼丹省最完善的省级转诊中心医院，拥有24小时现代化的急诊设施。", info: "24小时急诊 • (0511) 3252180" },
          { title: "南加里曼丹水警总部 (Siring)", category: "🚨 紧急援助站", desc: "位于 Siring 地区的水警哨所。随时待命以维持公共秩序和旅游船只安全。", info: "安全紧急情况 • 拨打 110" },
          { title: "旅游信息中心 (TIC) 哨所", category: "🚨 紧急援助站", desc: "位于 Siring 观景塔的马辰市政府官方旅游信息服务中心。随时待命为游客提供路线指导。", info: "旅游援助中心" }
        ]
      },`
  }
};

let content = fs.readFileSync('src/translations/pagesTranslations.js', 'utf8');

// The file currently has routeMap without locations from our previous injection.
// Let's replace the ENTIRE routeMap block cleanly.
const langs = ['id', 'en', 'ms', 'zh'];

langs.forEach(lang => {
  const replaceRegex = /routeMap:\s*\{[\s\S]*?bukaRute:\s*"[^"]*"\s*\},\s*\n?/g;
  content = content.replace(replaceRegex, '');
});

// Write the file first to clean up the existing routeMaps
fs.writeFileSync('src/translations/pagesTranslations.js', content, 'utf8');

// Now read by line and inject properly like before
let lines = content.split('\n');
const injectAt = (lang, pattern) => {
  let count = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(pattern)) {
      count++;
      // panduan block counts: id=1, en=2, ms=3, zh=4
      if ((lang === 'id' && count === 1) ||
          (lang === 'en' && count === 2) ||
          (lang === 'ms' && count === 3) ||
          (lang === 'zh' && count === 4)) {
        lines.splice(i + 1, 0, data[lang].routeMapExt);
        break;
      }
    }
  }
};

langs.forEach(lang => {
  injectAt(lang, 'panduan: {');
});

fs.writeFileSync('src/translations/pagesTranslations.js', lines.join('\n'), 'utf8');
console.log('Successfully injected translated locations into routeMap!');
