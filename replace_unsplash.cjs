const fs = require('fs');
const path = require('path');

const urlMap = {
  // Home & Global
  '1596401057633-54a8fe8ef647': '/wisata/960px-Pasar_Terapung_Siring_Banj.webp',
  '1544005313-94ddf0286df2': '/profil kota/sungai.webp',
  '1555126634-323283e090fa': '/kuliner/buras.webp',
  '1617627143750-d86bc21e42bb': '/budaya/motif bayam raj.webp',
  '1518770660439-4636190af475': '/sejarah/banjarmasin baiman.webp',
  '1518548419970-58e3b4079ab2': '/wisata/960px-Monumen_Patung_Bekantan_Ba.webp',
  '1583394838336-acd977736f90': '/wisata/masjid sultan suriansyah.webp',
  '1547592180-85f173990554': '/kuliner/Soto_banjar,_Pak_Ahmat,_Martapura,_South_Kalimantan,_2018-07-28_02.webp',
  '1603894584373-5ac82b2ae398': '/kuliner/1920px-Katupat_Kandangan_in_Kandangan.webp',
  '1578985545062-69928b1d9587': '/kuliner/Bingka.webp',
  
  // Budaya
  '1528459801416-a9e53bbf4e17': '/budaya/motif bayam raj.webp',
  '1606744824163-985d376605aa': '/budaya/naga-balimbur-salah-satu-motif-b.webp',
  '1579783900882-c0d3dad7b119': '/budaya/motif kembang kacang.webp',
  '1501339847302-ac426a4a7cbb': '/budaya/anyaman-purun.webp',
  '1485278537138-4e8911a13c02': '/budaya/panting.webp',
  '1511671782779-c97d3d27a1d4': '/budaya/Kesenian_Madihin.webp',
  '1465847899084-d164df4dedc6': '/budaya/Seni Bertutur Lamut.webp',
  '1534528741775-53994a69daeb': '/budaya/tari baksa kembang.webp',
  '1476514525535-07fb3b4ae5f1': '/budaya/atap bubungan tinggi.webp',
  '1507679799987-c73779587ccf': '/wisata/960px-Rumah_Adat_Bubungan_Tinggi.webp',

  // Kuliner
  '1541592102775-7b56d338a9e1': '/kuliner/Iwak_Pakasam_Basanga.webp',
  '1588661852028-21d15db14028': '/kuliner/f6cd9fe9a37ece89ca3de6416a14031e.webp',
  '1512058564366-18510be2db19': '/kuliner/Nasi_Kuning_Banjar_001.webp',
  '1559598467-f8b76c8155d0': '/kuliner/Resep-Amparan-Tatak-Kue-Khas-Ban.webp',
  '1576618148400-f54bed99fcfd': '/kuliner/wadai-kararaban-khas-banjar-1756.webp',
  '1506084868230-bb9d95c24759': '/kuliner/klepon.webp',
  '1605333396914-2795c329a1ee': '/kuliner/358-bingka-barandam-khas-banjar.webp',
  '1601050690597-df0568f70950': '/kuliner/wadai-kararaban-khas-banjar-1756.webp',
  '1601314002592-b8734bca6604': '/kuliner/Screenshot_20241126_150106_Googl.webp',
  '1604908176997-125f25cc6f3d': '/kuliner/IMG-20251017-WA0002.webp',
  '1626200419188-75ab0a40df6e': '/kuliner/Iwak_Pakasam_Basanga.webp',
  '1596645367610-d3ba0d6b9ef7': '/kuliner/sambal acan.webp',

  // Profil Kota
  '1449844908441-8829872d2607': '/profil kota/Kota-Banjarmasin-Logo.webp',
  '1577495508048-b635879837f1': '/profil kota/Wali_Kota_Banjarmasin_Muhammad_Y-1.webp',
  '1551806235-a053c82e05a8': '/profil kota/ananda.webp',
  '1504386106331-3e4e71712b38': '/profil kota/jasa pariwisata.webp',
  '1578575437130-527eed3abbec': '/profil kota/pelabuhan trisakti.webp',

  // Sejarah
  '1580974582391-a600867863ee': '/sejarah/250px-Lukisan_Sultan_Suriansyah.webp',
  '1605814524227-2c974c93540a': '/sejarah/Kesultanan-Banjar.webp',
  '1599839619722-39751411ea63': '/sejarah/PERANG_BANJAR_1857-1859.webp',
  '1538356111053-748a5634b02a': '/sejarah/bendera-merah-putih.webp',
  '1524813686514-a57563d77865': '/sejarah/pangeran antasari.webp',

  // Wisata
  '1566467005166-508b61c1a938': '/wisata/960px-Masjid_Raya_Sabilal_Muhtad.webp',
  '1513635269975-59663e0ac1ce': '/wisata/960px-Museum_Waja_Sampai_Kaputin.webp',
  '1500446705352-9d324b10b06b': '/wisata/960px-Taman_Siring_Banjarmasin.webp',
  '1565345330364-f655cc2956de': '/wisata/menara tugu pal 0.webp',

  // Fallbacks just in case
  '1590490360182-c33d57733427': '/wisata/960px-Pasar_Terapung_Siring_Banj.webp', // fallback
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('D:/banjarmasinkota/src');
let changedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;

  // Replace all unsplash URLs
  const regex = /https:\/\/images\.unsplash\.com\/photo-([a-zA-Z0-9\-]+)\?[^"'\s]*/g;
  
  newContent = newContent.replace(regex, (match, id) => {
    if (urlMap[id]) {
      return urlMap[id];
    }
    // If not found in map, just pick a random valid image based on what's available
    // to ensure no unsplash links remain
    console.log('Unmapped ID found:', id, 'in file:', file);
    return '/wisata/960px-Pasar_Terapung_Siring_Banj.webp'; 
  });

  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    changedCount++;
  }
});

console.log('Replaced unsplash URLs in ' + changedCount + ' files.');
