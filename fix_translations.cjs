const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/translations/pagesTranslations.js');
let content = fs.readFileSync(filePath, 'utf-8');

const insertions = [
  {
    lang: 'id',
    hero: `        { id: "duta-mall", title: "Duta Mall Banjarmasin", tag: "Modern - Pusat Kota", location: "Jl. A. Yani Km 2", badge: "Pusat Belanja", desc: "Pusat perbelanjaan terbesar dan termegah di Kalimantan Selatan, pusat gaya hidup dan hiburan modern kota." },
        { id: "pulau-kembang", title: "Pulau Kembang", tag: "Konservasi - Barito", location: "Sungai Barito", badge: "Habitat Satwa", desc: "Pulau delta di tengah Sungai Barito yang menjadi habitat ribuan kera ekor panjang dan situs konservasi alam." },
        { id: "taman-jahri-saleh", title: "Taman Satwa Jahri Saleh", tag: "Edukasi - Sungai Jingah", location: "Sungai Jingah", badge: "Taman Satwa", desc: "Ruang terbuka hijau dan kebun binatang mini yang menjadi pusat konservasi satwa lokal dan rekreasi keluarga." },\n`,
    map: `          { title: "Taman Satwa Jahri Saleh", category: "Wisata Alam", desc: "Ruang terbuka hijau dan kebun binatang mini yang menjadi pusat konservasi satwa lokal dan rekreasi keluarga." },
          { title: "Duta Mall Banjarmasin", category: "Landmark", desc: "Pusat perbelanjaan terbesar dan termegah di Kalimantan Selatan, pusat gaya hidup dan hiburan modern kota." },\n`
  },
  {
    lang: 'en',
    hero: `        { id: "duta-mall", title: "Duta Mall Banjarmasin", tag: "Modern - City Center", location: "Jl. A. Yani Km 2", badge: "Shopping Center", desc: "The largest and grandest shopping center in South Kalimantan, the city's modern lifestyle and entertainment hub." },
        { id: "pulau-kembang", title: "Kembang Island", tag: "Conservation - Barito", location: "Barito River", badge: "Animal Habitat", desc: "A delta island in the middle of the Barito River which is the habitat of thousands of long-tailed macaques and a nature conservation site." },
        { id: "taman-jahri-saleh", title: "Jahri Saleh Animal Park", tag: "Education - Sungai Jingah", location: "Sungai Jingah", badge: "Animal Park", desc: "Green open space and mini zoo that serves as a local animal conservation center and family recreation area." },\n`,
    map: `          { title: "Jahri Saleh Animal Park", category: "Nature Tourism", desc: "Green open space and mini zoo that serves as a local animal conservation center and family recreation area." },
          { title: "Duta Mall Banjarmasin", category: "Landmark", desc: "The largest and grandest shopping center in South Kalimantan, the city's modern lifestyle and entertainment hub." },\n`
  },
  {
    lang: 'ms',
    hero: `        { id: "duta-mall", title: "Duta Mall Banjarmasin", tag: "Moden - Pusat Bandar", location: "Jl. A. Yani Km 2", badge: "Pusat Membeli-belah", desc: "Pusat membeli-belah terbesar dan terhebat di Kalimantan Selatan, pusat gaya hidup dan hiburan moden bandar." },
        { id: "pulau-kembang", title: "Pulau Kembang", tag: "Pemuliharaan - Barito", location: "Sungai Barito", badge: "Habitat Haiwan", desc: "Pulau delta di tengah Sungai Barito yang menjadi habitat ribuan kera ekor panjang dan tapak pemuliharaan alam." },
        { id: "taman-jahri-saleh", title: "Taman Haiwan Jahri Saleh", tag: "Pendidikan - Sungai Jingah", location: "Sungai Jingah", badge: "Taman Haiwan", desc: "Ruang lapang hijau dan zoo mini yang menjadi pusat pemuliharaan haiwan tempatan dan rekreasi keluarga." },\n`,
    map: `          { title: "Taman Haiwan Jahri Saleh", category: "Pelancongan Alam", desc: "Ruang lapang hijau dan zoo mini yang menjadi pusat pemuliharaan haiwan tempatan dan rekreasi keluarga." },
          { title: "Duta Mall Banjarmasin", category: "Mercu Tanda", desc: "Pusat membeli-belah terbesar dan terhebat di Kalimantan Selatan, pusat gaya hidup dan hiburan moden bandar." },\n`
  },
  {
    lang: 'zh',
    hero: `        { id: "duta-mall", title: "Duta Mall Banjarmasin", tag: "现代 - 市中心", location: "Jl. A. Yani Km 2", badge: "购物中心", desc: "南加里曼丹最大最宏伟的购物中心，城市的现代生活方式和娱乐中心。" },
        { id: "pulau-kembang", title: "Kembang 岛", tag: "保护 - Barito", location: "Barito 河", badge: "动物栖息地", desc: "位于 Barito 河中部的三角洲岛屿，是成千上万只长尾猕猴的栖息地和自然保护区。" },
        { id: "taman-jahri-saleh", title: "Jahri Saleh 动物园", tag: "教育 - Sungai Jingah", location: "Sungai Jingah", badge: "动物园", desc: "绿色开放空间和迷你动物园，作为当地动物保护中心和家庭休闲区。" },\n`,
    map: `          { title: "Jahri Saleh 动物园", category: "自然旅游", desc: "绿色开放空间和迷你动物园，作为当地动物保护中心和家庭休闲区。" },
          { title: "Duta Mall Banjarmasin", category: "地标", desc: "南加里曼丹最大最宏伟的购物中心，城市的现代生活方式和娱乐中心。" },\n`
  }
];

let modifiedContent = content;

insertions.forEach(({ lang, hero, map }) => {
  // Find the start of the language block
  const langRegex = new RegExp(\`\\n\\s*\${lang}: {\\n\`);
  const langMatch = modifiedContent.match(langRegex);
  if (!langMatch) {
    console.error(\`Could not find language block \${lang}\`);
    return;
  }
  
  const startIndex = langMatch.index;
  // Next language block or end of file
  let endIndex = modifiedContent.length;
  // A naive way to limit search to current lang: we just use string replacement on the whole string
  // but this is risky if other langs have identical structures.
  
  // Actually, there's only 4 'heroDestinations: [' in the file, in the exact order id, en, ms, zh.
  // Wait, no. Let's do it safely.
});

// Since there is only 1 id, 1 en, 1 ms, 1 zh blocks, and inside each there is exactly 1 'heroDestinations: [' under 'wisata:', let's split the string by languages first.

const langs = ['id', 'en', 'ms', 'zh'];
const pieces = [];
let lastIdx = 0;

for (let i = 0; i < langs.length; i++) {
  const lang = langs[i];
  const regex = new RegExp(\`(^|\\n)\\s*\${lang}: \\{\\n\`);
  const match = content.substring(lastIdx).match(regex);
  if (match) {
    const idx = lastIdx + match.index;
    if (idx > lastIdx) {
      pieces.push(content.substring(lastIdx, idx));
    }
    lastIdx = idx;
  }
}
pieces.push(content.substring(lastIdx));

// pieces[0] is header
// pieces[1] is id block
// pieces[2] is en block
// pieces[3] is ms block
// pieces[4] is zh block

for (let i = 1; i <= 4; i++) {
  let block = pieces[i];
  const langObj = insertions[i - 1];
  
  // Replace heroDestinations
  block = block.replace(/(heroDestinations:\s*\[\s*\n)/, '$1' + langObj.hero);
  
  // Replace interactiveMap locations
  block = block.replace(/(locations:\s*\[\s*\n)/, '$1' + langObj.map);
  
  pieces[i] = block;
}

fs.writeFileSync(filePath, pieces.join(''), 'utf-8');
console.log('Successfully applied translations');
