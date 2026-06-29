const fs = require('fs');

const data = {
  id: {
    interactiveMap: `
      interactiveMap: {
        tag: "✦ RADAR EKSPLORASI SERIBU SUNGAI",
        title: "Peta Interaktif",
        titleSpan: "Wisata Banjar",
        subtitle: "Klik destinasi pada daftar atau pin di peta untuk terbang langsung ke lokasi secara dinamis.",
        lokasiTerpilih: "Lokasi Terpilih",
        bukaRute: "Buka Rute ➔",
        categories: ["Semua", "Landmark", "Wisata Bahari", "Ikon Kota", "Wisata Sejarah", "Gastronomi", "Wisata Alam"],
        locations: [
          { title: "Menara Pandang & Siring Martapura", category: "Landmark", desc: "Landmark ikonik di pusat kota dengan pemandangan 360 derajat Sungai Martapura dan aktivitas dermaga kelotok." },
          { title: "Pasar Terapung Lok Baintan", category: "Wisata Bahari", desc: "Pasar atas air tradisional sejak abad ke-16. Rasakan sensasi jual beli menggunakan perahu jukung di waktu subuh." },
          { title: "Patung Maskot Bekantan", category: "Ikon Kota", desc: "Patung perunggu raksasa satwa endemik Borneo yang menyemburkan air langsung ke arah Sungai Martapura." },
          { title: "Masjid Bersejarah Sultan Suriansyah", category: "Wisata Sejarah", desc: "Masjid tertua di Kalimantan Selatan yang dibangun pada tahun 1526, berarsitektur kayu ulin khas Banjar." },
          { title: "Dermaga Kuliner Soto Bang Amat", category: "Gastronomi", desc: "Kuliner soto Banjar autentik di tepian sungai sembari menikmati pertunjukan musik Panting khas Banjar." },
          { title: "Konservasi Pulau Kembang", category: "Wisata Alam", desc: "Pulau delta di tengah Sungai Barito yang menjadi habitat ribuan kera ekor panjang dan pura peninggalan lawas." },
          { title: "Rumah Adat Bubungan Tinggi & Museum Wasaka", category: "Wisata Sejarah", desc: "Mahakarya arsitektur rumah adat Banjar berdinding ukiran kayu ulin tempat menyimpan artefak perjuangan pahlawan Wasaka." },
          { title: "Tugu Nol Kilometer (Pal 0)", category: "Landmark", desc: "Monumen penanda titik nol kilometer acuan jarak Kota Banjarmasin yang dikelilingi taman terbuka hijau di tepi sungai." },
          { title: "Masjid Raya Sabilal Muhtadin", category: "Wisata Sejarah", desc: "Masjid raya terbesar kebanggaan warga Kalsel dengan kubah tembaga megah di tengah hutan kota seluas 10 hektar." },
          { title: "Taman Siring 0 Km", category: "Landmark", desc: "Kawasan pedestrian santai pesisir sungai Martapura yang dilengkapi arena rekreasi keluarga dan dermaga kelotok wisata." }
        ]
      },`,
    routeMap: `
      routeMap: {
        tag: "✦ NAVIGASI & AKSESIBILITAS TERPADU",
        title: "Peta Rute",
        titleSpan: "Banjarmasin",
        subtitle: "Jelajahi panduan rute transportasi publik, dermaga wisata, dan lokasi akomodasi strategis di Kota Seribu Sungai.",
        lokasiTerpilih: "Titik Terpilih",
        bukaRute: "Buka Rute ➔"
      },`
  },
  en: {
    interactiveMap: `
      interactiveMap: {
        tag: "✦ THOUSAND RIVERS EXPLORATION RADAR",
        title: "Interactive Map",
        titleSpan: "Banjarmasin Tourism",
        subtitle: "Click a destination on the list or pin on the map to fly directly to the location dynamically.",
        lokasiTerpilih: "Selected Location",
        bukaRute: "Open Route ➔",
        categories: ["All", "Landmark", "Maritime", "City Icon", "Historical", "Gastronomy", "Nature"],
        locations: [
          { title: "Menara Pandang & Siring Martapura", category: "Landmark", desc: "Iconic downtown landmark with 360-degree views of the Martapura River and traditional boat dock activities." },
          { title: "Lok Baintan Floating Market", category: "Maritime", desc: "Traditional floating market active since the 16th century. Experience bartering on a jukung boat at dawn." },
          { title: "Proboscis Monkey Mascot Statue", category: "City Icon", desc: "Giant bronze statue of Borneo's endemic animal, spraying water directly into the Martapura River." },
          { title: "Sultan Suriansyah Historical Mosque", category: "Historical", desc: "The oldest mosque in South Kalimantan built in 1526, featuring distinctive Banjar ironwood architecture." },
          { title: "Soto Bang Amat Culinary Dock", category: "Gastronomy", desc: "Authentic Banjar soto on the riverbank while enjoying traditional Banjar Panting music performances." },
          { title: "Kembang Island Conservation", category: "Nature", desc: "A delta island in the Barito River that is home to thousands of long-tailed macaques and an ancient temple." },
          { title: "Bubungan Tinggi Traditional House & Wasaka Museum", category: "Historical", desc: "A masterpiece of Banjar traditional architecture with carved ironwood walls, storing artifacts of the Wasaka heroes' struggle." },
          { title: "Zero Kilometer Monument (Pal 0)", category: "Landmark", desc: "A monument marking the zero-kilometer reference point of Banjarmasin, surrounded by green open parks on the riverbank." },
          { title: "Sabilal Muhtadin Grand Mosque", category: "Historical", desc: "The largest grand mosque and pride of South Kalimantan citizens, featuring a majestic copper dome amidst a 10-hectare city forest." },
          { title: "Siring 0 Km Park", category: "Landmark", desc: "A relaxing pedestrian area along the Martapura river coast, equipped with family recreation arenas and tourist boat docks." }
        ]
      },`,
    routeMap: `
      routeMap: {
        tag: "✦ INTEGRATED NAVIGATION & ACCESSIBILITY",
        title: "Route Map",
        titleSpan: "Banjarmasin",
        subtitle: "Explore public transportation routes, tourist piers, and strategic accommodation locations in the City of a Thousand Rivers.",
        lokasiTerpilih: "Selected Point",
        bukaRute: "Open Route ➔"
      },`
  },
  ms: {
    interactiveMap: `
      interactiveMap: {
        tag: "✦ RADAR EKSPLORASI SERIBU SUNGAI",
        title: "Peta Interaktif",
        titleSpan: "Pelancongan Banjar",
        subtitle: "Klik destinasi pada senarai atau pin pada peta untuk terbang terus ke lokasi secara dinamik.",
        lokasiTerpilih: "Lokasi Dipilih",
        bukaRute: "Buka Laluan ➔",
        categories: ["Semua", "Mercu Tanda", "Maritim", "Ikon Bandar", "Bersejarah", "Gastronomi", "Alam Semulajadi"],
        locations: [
          { title: "Menara Pandang & Siring Martapura", category: "Mercu Tanda", desc: "Mercu tanda ikonik pusat bandar dengan pemandangan 360 darjah Sungai Martapura dan aktiviti jeti bot tradisional." },
          { title: "Pasar Terapung Lok Baintan", category: "Maritim", desc: "Pasar terapung tradisional yang aktif sejak abad ke-16. Rasai pengalaman berjual beli di atas perahu jukung pada waktu subuh." },
          { title: "Patung Maskot Bekantan", category: "Ikon Bandar", desc: "Patung gangsa gergasi haiwan endemik Borneo, menyemburkan air terus ke arah Sungai Martapura." },
          { title: "Masjid Bersejarah Sultan Suriansyah", category: "Bersejarah", desc: "Masjid tertua di Kalimantan Selatan yang dibina pada 1526, menampilkan seni bina kayu belian khas Banjar." },
          { title: "Dermaga Kuliner Soto Bang Amat", category: "Gastronomi", desc: "Soto Banjar asli di tebing sungai sambil menikmati persembahan muzik tradisional Panting Banjar." },
          { title: "Pemuliharaan Pulau Kembang", category: "Alam Semulajadi", desc: "Pulau delta di tengah Sungai Barito yang menjadi habitat ribuan kera ekor panjang dan kuil peninggalan purba." },
          { title: "Rumah Tradisional Bubungan Tinggi & Muzium Wasaka", category: "Bersejarah", desc: "Karya agung seni bina tradisional Banjar berdinding ukiran kayu belian yang menyimpan artifak perjuangan wira Wasaka." },
          { title: "Tugu Sifar Kilometer (Pal 0)", category: "Mercu Tanda", desc: "Monumen penanda titik sifar kilometer Banjarmasin, dikelilingi taman hijau terbuka di tebing sungai." },
          { title: "Masjid Raya Sabilal Muhtadin", category: "Bersejarah", desc: "Masjid raya terbesar kebanggaan warga Kalimantan Selatan, dengan kubah tembaga megah di tengah hutan bandar seluas 10 hektar." },
          { title: "Taman Siring 0 Km", category: "Mercu Tanda", desc: "Kawasan pejalan kaki santai di sepanjang pesisir sungai Martapura, dilengkapi arena rekreasi keluarga dan jeti bot pelancong." }
        ]
      },`,
    routeMap: `
      routeMap: {
        tag: "✦ NAVIGASI & KEBOLEHCAPAIAN BERSEPADU",
        title: "Peta Laluan",
        titleSpan: "Banjarmasin",
        subtitle: "Terokai panduan laluan pengangkutan awam, dermaga pelancong, dan lokasi penginapan strategik di Kota Seribu Sungai.",
        lokasiTerpilih: "Titik Dipilih",
        bukaRute: "Buka Laluan ➔"
      },`
  },
  zh: {
    interactiveMap: `
      interactiveMap: {
        tag: "✦ 千河探索雷达",
        title: "互动地图",
        titleSpan: "马辰旅游",
        subtitle: "在列表中点击目的地或在地图上点击图钉，即可动态直接飞往该地点。",
        lokasiTerpilih: "所选位置",
        bukaRute: "打开路线 ➔",
        categories: ["全部", "地标", "海洋旅游", "城市标志", "历史", "美食", "自然"],
        locations: [
          { title: "观景塔 & 马塔普拉河滨", category: "地标", desc: "市中心的标志性建筑，可360度全景俯瞰马塔普拉河及传统游船码头的活动。" },
          { title: "Lok Baintan 水上市场", category: "海洋旅游", desc: "自16世纪活跃至今的传统水上市场。体验黎明时分在小木船上进行以物易物的乐趣。" },
          { title: "长鼻猴吉祥物雕像", category: "城市标志", desc: "婆罗洲特有动物的巨型青铜雕像，直接向马塔普拉河喷水。" },
          { title: "苏丹苏里安夏历史清真寺", category: "历史", desc: "南加里曼丹最古老的清真寺，建于1526年，采用独特的班查尔铁木建筑风格。" },
          { title: "Bang Amat 索托美食码头", category: "美食", desc: "在河畔享用正宗的班查尔索托汤，同时欣赏传统的班查尔潘廷音乐表演。" },
          { title: "Kembang岛自然保护区", category: "自然", desc: "巴里托河中央的一个三角洲岛屿，是数千只长尾猕猴和一座古老寺庙的栖息地。" },
          { title: "Bubungan Tinggi 传统房屋及 Wasaka 博物馆", category: "历史", desc: "班查尔传统建筑的杰作，带有雕刻铁木墙，保存着 Wasaka 英雄斗争的文物。" },
          { title: "零公里纪念碑 (Pal 0)", category: "地标", desc: "标志着马辰市零公里参考点的纪念碑，四周环绕着河畔的绿色开放公园。" },
          { title: "Sabilal Muhtadin 大清真寺", category: "历史", desc: "南加里曼丹人民的骄傲，最大的大清真寺，在10公顷的城市森林中拥有宏伟的铜制圆顶。" },
          { title: "Siring 0公里公园", category: "地标", desc: "沿马塔普拉河岸的休闲步行区，配备了家庭娱乐设施和旅游船码头。" }
        ]
      },`,
    routeMap: `
      routeMap: {
        tag: "✦ 综合导航与无障碍",
        title: "路线图",
        titleSpan: "马辰",
        subtitle: "探索公共交通路线，旅游码头和千河之城的战略住宿地点。",
        lokasiTerpilih: "选定点",
        bukaRute: "打开路线 ➔"
      },`
  }
};

let content = fs.readFileSync('src/translations/pagesTranslations.js', 'utf8');

// The file might already have multiple interactiveMaps that I injected previously (or partially)
// First, let's clean up any previous injections to avoid duplicates!
content = content.replace(/\n\s*interactiveMap: \{[\s\S]*?\},\s*\n/g, '\n');
content = content.replace(/\n\s*routeMap: \{[\s\S]*?\},\s*\n/g, '\n');

// Now cleanly inject them right after \`wisata: {\` and \`panduan: {\` for each language block
const langs = ['id', 'en', 'ms', 'zh'];

langs.forEach(lang => {
  // Find language block
  const blockRegex = new RegExp("(^  " + lang + ": \\{[\\\\s\\\\S]*?\\n  \\},)", "m");
  const match = content.match(blockRegex);
  if (match) {
    let block = match[0];
    
    // Inject into wisata
    block = block.replace(/(wisata: \{\s*\n)/, "$1" + data[lang].interactiveMap + "\n");
    
    // Inject into panduan
    block = block.replace(/(panduan: \{\s*\n)/, "$1" + data[lang].routeMap + "\n");
    
    content = content.replace(match[0], block);
  }
});

fs.writeFileSync('src/translations/pagesTranslations.js', content, 'utf8');
console.log('Successfully injected translations!');
