const fs = require('fs');

const data = {
  id: {
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

let lines = fs.readFileSync('src/translations/pagesTranslations.js', 'utf8').split('\n');

const injectAt = (pattern, content, after = true) => {
  const index = lines.findIndex(l => l.includes(pattern));
  if (index !== -1) {
    if (after) {
      lines.splice(index + 1, 0, content);
    } else {
      lines.splice(index, 0, content);
    }
  }
};

// We know the exact structure.
// id: { ... panduan: { ... } }
// en: { ... panduan: { ... } }
// ms: { ... panduan: { ... } }
// zh: { ... wisata: { ... }, panduan: { ... } }

// Inject routeMap for ID (find first panduan: {)
let idPanduanIdx = lines.findIndex(l => l.includes('panduan: {'));
if (idPanduanIdx !== -1) lines.splice(idPanduanIdx + 1, 0, data.id.routeMap);

// Inject routeMap for EN (find second panduan: {)
let enPanduanIdx = lines.findIndex((l, i) => i > idPanduanIdx && l.includes('panduan: {'));
if (enPanduanIdx !== -1) lines.splice(enPanduanIdx + 1, 0, data.en.routeMap);

// Inject routeMap for MS (find third panduan: {)
let msPanduanIdx = lines.findIndex((l, i) => i > enPanduanIdx && l.includes('panduan: {'));
if (msPanduanIdx !== -1) lines.splice(msPanduanIdx + 1, 0, data.ms.routeMap);

// Inject interactiveMap for ZH (find fourth wisata: {)
let idWisataIdx = lines.findIndex(l => l.includes('wisata: {'));
let enWisataIdx = lines.findIndex((l, i) => i > idWisataIdx && l.includes('wisata: {'));
let msWisataIdx = lines.findIndex((l, i) => i > enWisataIdx && l.includes('wisata: {'));
let zhWisataIdx = lines.findIndex((l, i) => i > msWisataIdx && l.includes('wisata: {'));
if (zhWisataIdx !== -1) lines.splice(zhWisataIdx + 1, 0, data.zh.interactiveMap);

// Inject routeMap for ZH (find fourth panduan: {)
let zhPanduanIdx = lines.findIndex((l, i) => i > msPanduanIdx && l.includes('panduan: {'));
if (zhPanduanIdx !== -1) lines.splice(zhPanduanIdx + 1, 0, data.zh.routeMap);

fs.writeFileSync('src/translations/pagesTranslations.js', lines.join('\n'), 'utf8');
console.log('Successfully injected exact blocks!');
