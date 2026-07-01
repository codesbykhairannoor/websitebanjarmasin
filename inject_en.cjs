const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/translations/pagesTranslations.js');
let content = fs.readFileSync(filePath, 'utf-8');

const en_hero = `        { id: "duta-mall", title: "Duta Mall Banjarmasin", tag: "Modern - City Center", location: "Jl. A. Yani Km 2", badge: "Shopping Center", desc: "The largest and grandest shopping center in South Kalimantan, the city's modern lifestyle and entertainment hub." },
        { id: "pulau-kembang", title: "Kembang Island", tag: "Conservation - Barito", location: "Barito River", badge: "Animal Habitat", desc: "A delta island in the middle of the Barito River which is the habitat of thousands of long-tailed macaques and a nature conservation site." },
        { id: "taman-jahri-saleh", title: "Jahri Saleh Animal Park", tag: "Education - Sungai Jingah", location: "Sungai Jingah", badge: "Animal Park", desc: "Green open space and mini zoo that serves as a local animal conservation center and family recreation area." },\n`;

const en_map = `          { title: "Jahri Saleh Animal Park", category: "Nature Tourism", desc: "Green open space and mini zoo that serves as a local animal conservation center and family recreation area." },
          { title: "Duta Mall Banjarmasin", category: "Landmark", desc: "The largest and grandest shopping center in South Kalimantan, the city's modern lifestyle and entertainment hub." },\n`;

content = content.replace(/(en: {.*?wisata: {.*?heroDestinations: \[)/s, "$1\n" + en_hero);
content = content.replace(/(en: {.*?wisata: {.*?interactiveMap: {.*?locations: \[)/s, "$1\n" + en_map);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('done modifying en block');
