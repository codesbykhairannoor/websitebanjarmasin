const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/translations/pagesTranslations.js');
let content = fs.readFileSync(filePath, 'utf-8');

const id_hero = `        { id: "taman-jahri-saleh", title: "Taman Satwa Jahri Saleh", tag: "Edukasi - Sungai Jingah", location: "Sungai Jingah", badge: "Taman Satwa", desc: "Ruang terbuka hijau dan kebun binatang mini yang menjadi pusat konservasi satwa lokal dan rekreasi keluarga." },
        { id: "pulau-kembang", title: "Pulau Kembang", tag: "Konservasi - Barito", location: "Sungai Barito", badge: "Habitat Satwa", desc: "Pulau delta di tengah Sungai Barito yang menjadi habitat ribuan kera ekor panjang dan situs konservasi alam." },
        { id: "duta-mall", title: "Duta Mall Banjarmasin", tag: "Modern - Pusat Kota", location: "Jl. A. Yani Km 2", badge: "Pusat Belanja", desc: "Pusat perbelanjaan terbesar dan termegah di Kalimantan Selatan, pusat gaya hidup dan hiburan modern kota." },\n`;

const id_map = `          { title: "Taman Satwa Jahri Saleh", category: "Wisata Alam", desc: "Ruang terbuka hijau dan kebun binatang mini yang menjadi pusat konservasi satwa lokal dan rekreasi keluarga." },
          { title: "Duta Mall Banjarmasin", category: "Landmark", desc: "Pusat perbelanjaan terbesar dan termegah di Kalimantan Selatan, pusat gaya hidup dan hiburan modern kota." },\n`;

const en_hero = `        { id: "taman-jahri-saleh", title: "Jahri Saleh Animal Park", tag: "Education - Sungai Jingah", location: "Sungai Jingah", badge: "Animal Park", desc: "Green open space and mini zoo that serves as a local animal conservation center and family recreation area." },
        { id: "pulau-kembang", title: "Kembang Island", tag: "Conservation - Barito", location: "Barito River", badge: "Animal Habitat", desc: "A delta island in the middle of the Barito River which is the habitat of thousands of long-tailed macaques and a nature conservation site." },
        { id: "duta-mall", title: "Duta Mall Banjarmasin", tag: "Modern - City Center", location: "Jl. A. Yani Km 2", badge: "Shopping Center", desc: "The largest and grandest shopping center in South Kalimantan, the city's modern lifestyle and entertainment hub." },\n`;

const en_map = `          { title: "Jahri Saleh Animal Park", category: "Nature Tourism", desc: "Green open space and mini zoo that serves as a local animal conservation center and family recreation area." },
          { title: "Duta Mall Banjarmasin", category: "Landmark", desc: "The largest and grandest shopping center in South Kalimantan, the city's modern lifestyle and entertainment hub." },\n`;

const ms_hero = `        { id: "taman-jahri-saleh", title: "Taman Haiwan Jahri Saleh", tag: "Pendidikan - Sungai Jingah", location: "Sungai Jingah", badge: "Taman Haiwan", desc: "Ruang lapang hijau dan zoo mini yang menjadi pusat pemuliharaan haiwan tempatan dan rekreasi keluarga." },
        { id: "pulau-kembang", title: "Pulau Kembang", tag: "Pemuliharaan - Barito", location: "Sungai Barito", badge: "Habitat Haiwan", desc: "Pulau delta di tengah Sungai Barito yang menjadi habitat ribuan kera ekor panjang dan tapak pemuliharaan alam." },
        { id: "duta-mall", title: "Duta Mall Banjarmasin", tag: "Moden - Pusat Bandar", location: "Jl. A. Yani Km 2", badge: "Pusat Membeli-belah", desc: "Pusat membeli-belah terbesar dan terhebat di Kalimantan Selatan, pusat gaya hidup dan hiburan moden bandar." },\n`;

const ms_map = `          { title: "Taman Haiwan Jahri Saleh", category: "Pelancongan Alam", desc: "Ruang lapang hijau dan zoo mini yang menjadi pusat pemuliharaan haiwan tempatan dan rekreasi keluarga." },
          { title: "Duta Mall Banjarmasin", category: "Mercu Tanda", desc: "Pusat membeli-belah terbesar dan terhebat di Kalimantan Selatan, pusat gaya hidup dan hiburan moden bandar." },\n`;

const zh_hero = `        { id: "taman-jahri-saleh", title: "Jahri Saleh 动物园", tag: "教育 - Sungai Jingah", location: "Sungai Jingah", badge: "动物园", desc: "绿色开放空间和迷你动物园，作为当地动物保护中心和家庭休闲区。" },
        { id: "pulau-kembang", title: "Kembang 岛", tag: "保护 - Barito", location: "Barito 河", badge: "动物栖息地", desc: "位于 Barito 河中部的三角洲岛屿，是成千上万只长尾猕猴的栖息地和自然保护区。" },
        { id: "duta-mall", title: "Duta Mall Banjarmasin", tag: "现代 - 市中心", location: "Jl. A. Yani Km 2", badge: "购物中心", desc: "南加里曼丹最大最宏伟的购物中心，城市的现代生活方式和娱乐中心。" },\n`;

const zh_map = `          { title: "Jahri Saleh 动物园", category: "自然旅游", desc: "绿色开放空间和迷你动物园，作为当地动物保护中心和家庭休闲区。" },
          { title: "Duta Mall Banjarmasin", category: "地标", desc: "南加里曼丹最大最宏伟的购物中心，城市的现代生活方式和娱乐中心。" },\n`;

content = content.replace(/(id: {.*?wisata: {.*?heroDestinations: \[)/s, "$1\n" + id_hero);
content = content.replace(/(en: {.*?wisata: {.*?heroDestinations: \[)/s, "$1\n" + en_hero);
content = content.replace(/(ms: {.*?wisata: {.*?heroDestinations: \[)/s, "$1\n" + ms_hero);
content = content.replace(/(zh: {.*?wisata: {.*?heroDestinations: \[)/s, "$1\n" + zh_hero);

content = content.replace(/(id: {.*?wisata: {.*?interactiveMap: {.*?locations: \[)/s, "$1\n" + id_map);
content = content.replace(/(en: {.*?wisata: {.*?interactiveMap: {.*?locations: \[)/s, "$1\n" + en_map);
content = content.replace(/(ms: {.*?wisata: {.*?interactiveMap: {.*?locations: \[)/s, "$1\n" + ms_map);
content = content.replace(/(zh: {.*?wisata: {.*?interactiveMap: {.*?locations: \[)/s, "$1\n" + zh_map);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('done modifying pagesTranslations.js');
