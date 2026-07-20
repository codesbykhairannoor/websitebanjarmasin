// Base static data (positions, colors, textures)
export const MOTIFS_DATA = [
  {
    id: 'menara-pandang',
    color: '#10b981',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    textureUrl: '/wisata/960px-Menara_Pandang_Banjarmasin.webp',
    position: [0, 5.0, -27.5],
    rotation: [0, 0, 0],
    shopLink: '/{lang}/wisata'
  },
  {
    id: 'tari-baksa-kembang',
    color: '#f43f5e',
    glowColor: 'rgba(244, 63, 94, 0.6)',
    textureUrl: '/budaya/tari baksa kembang.webp',
    position: [-7.5, 5.0, -6],
    rotation: [0, Math.PI / 2, 0],
    shopLink: '/{lang}/budaya'
  },
  {
    id: 'soto-banjar',
    color: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.6)',
    textureUrl: '/kuliner/soto banjar.webp',
    position: [7.5, 5.0, -6],
    rotation: [0, -Math.PI / 2, 0],
    shopLink: '/{lang}/kuliner'
  },
  {
    id: 'pasar-terapung',
    color: '#06b6d4',
    glowColor: 'rgba(6, 182, 212, 0.6)',
    textureUrl: '/wisata/960px-Pasar_Terapung_Siring_Banj.webp',
    position: [-7.5, 5.0, -16],
    rotation: [0, Math.PI / 2, 0],
    shopLink: '/{lang}/wisata'
  },
  {
    id: 'trans-banjarmasin',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.6)',
    textureUrl: '/profil kota/Angkutan-BTS-Trans-Banjarmasin-t.webp',
    position: [7.5, 5.0, -18],
    rotation: [0, -Math.PI / 2, 0],
    shopLink: '/{lang}/smart-city'
  },
  {
    id: 'memory-game',
    title: 'MAIN GAME!',
    color: '#F4C038',
    glowColor: 'rgba(244, 192, 56, 0.6)',
    textureUrl: '',
    position: [0, 1.5, -3],
    rotation: [0, 0, 0],
    shopLink: ''
  }
];

// Translations Dictionary
const TRANSLATIONS = {
  id: {
    'menara-pandang': {
      title: 'Menara Pandang Siring',
      subtitle: 'Ikon Pariwisata Kota',
      philosophy: 'Menara Pandang Siring adalah ikon utama Kota Banjarmasin yang berdiri megah di tepi Sungai Martapura. Tempat ini melambangkan keterbukaan dan visi ke depan kota Seribu Sungai.',
      sdgImpact: 'SDG 11 — Kota Berkelanjutan: Pengembangan kawasan Siring sebagai ruang publik inklusif yang aman dan mudah diakses oleh seluruh lapisan masyarakat.',
      facts: [
        'Menjadi pusat berkumpulnya wisatawan dan warga lokal.',
        'Memiliki arsitektur unik dengan sentuhan ornamen khas Banjar.',
        'Dari puncaknya, pengunjung bisa melihat pemandangan hamparan Sungai Martapura.'
      ],
      shopName: 'Lihat Destinasi Wisata'
    },
    'tari-baksa-kembang': {
      title: 'Tari Baksa Kembang',
      subtitle: 'Keanggunan Budaya Banjar',
      philosophy: 'Tarian klasik keraton Banjar yang diciptakan untuk menyambut tamu kehormatan. Tarian ini melambangkan keramahan, kelembutan budi pekerti, dan penghormatan warga Banjar kepada setiap pendatang.',
      sdgImpact: 'SDG 11.4 — Melestarikan Warisan Budaya: Menjaga kesenian tradisi di tengah arus modernisasi sebagai daya tarik wisata budaya.',
      facts: [
        'Penari wanita biasanya menggunakan mahkota bernama Gajah Oling.',
        'Diiringi oleh alat musik tradisional Panting dan Gamelan Banjar.',
        'Sering dipentaskan dalam acara pernikahan dan penyambutan tokoh.'
      ],
      shopName: 'Jelajahi Budaya Banjar'
    },
    'soto-banjar': {
      title: 'Soto Banjar',
      subtitle: 'Kelezatan Gastronomi Lokal',
      philosophy: 'Kekayaan rempah nusantara berpadu dalam kuah kaldu Soto Banjar. Kuliner ini adalah simbol akulturasi dan keramahan warga yang selalu menyajikan makanan terbaik bagi tamunya.',
      sdgImpact: 'SDG 8 — Pertumbuhan Ekonomi: Memberdayakan UMKM lokal dan sektor kuliner tradisional untuk menciptakan lapangan kerja berkelanjutan.',
      facts: [
        'Kuahnya khas karena menggunakan rempah kayu manis, biji pala, dan cengkeh.',
        'Biasa disajikan dengan ketupat, sate ayam, dan perkedel singkong.',
        'Menjadi menu wajib bagi wisatawan yang datang ke Banjarmasin.'
      ],
      shopName: 'Cicipi Kuliner Khas'
    },
    'pasar-terapung': {
      title: 'Pasar Terapung',
      subtitle: 'Tradisi Perdagangan Sungai',
      philosophy: 'Pasar Terapung bukan sekadar tempat transaksi jual beli, tapi denyut nadi peradaban masyarakat tepian sungai yang saling bergantung dan menjunjung tinggi kearifan lokal.',
      sdgImpact: 'SDG 12 — Konsumsi Bertanggung Jawab: Mempertahankan sistem barter dan perdagangan hasil bumi lokal yang rendah jejak karbon.',
      facts: [
        'Tradisi ini sudah ada sejak ratusan tahun lalu di sepanjang Sungai Barito dan Martapura.',
        'Didominasi oleh "Acil-Acil" (ibu-ibu) yang berjualan di atas jukung.',
        'Pasar Terapung Lok Baintan merupakan salah satu destinasi wisata unggulan nasional.'
      ],
      shopName: 'Telusuri Destinasi Wisata'
    },
    'trans-banjarmasin': {
      title: 'Trans Banjarmasin & BRT',
      subtitle: 'Mobilitas Cerdas (Smart City)',
      philosophy: 'Banjarmasin terus bergerak maju dengan fasilitas transportasi massal berbasis BRT (Bus Rapid Transit) yang nyaman, terintegrasi, dan ramah lingkungan, mewujudkan visi Banjarmasin Smart City.',
      sdgImpact: 'SDG 11 & SDG 13 — Transportasi Berkelanjutan: Mendorong warga beralih ke transportasi publik untuk mengurangi emisi.',
      facts: [
        'Bus Trans Banjarmasin dilengkapi dengan AC dan fasilitas ramah difabel.',
        'Rute menjangkau titik-titik strategis termasuk pelabuhan dan kawasan wisata.',
        'Terkoneksi dengan sistem BRT Banjarbakula (lintas kota/kabupaten).'
      ],
      shopName: 'Pelajari Smart City'
    }
  },
  en: {
    'menara-pandang': {
      title: 'Siring Watchtower',
      subtitle: 'City Tourism Icon',
      philosophy: 'The Siring Watchtower is the main icon of Banjarmasin, standing majestically on the banks of the Martapura River. It symbolizes the openness and forward vision of the City of a Thousand Rivers.',
      sdgImpact: 'SDG 11 — Sustainable Cities: Development of the Siring area as an inclusive public space that is safe and accessible to all levels of society.',
      facts: [
        'A gathering center for tourists and locals.',
        'Features unique architecture with a touch of typical Banjar ornaments.',
        'From the top, visitors can see the expanse of the Martapura River.'
      ],
      shopName: 'View Tourist Destinations'
    },
    'tari-baksa-kembang': {
      title: 'Baksa Kembang Dance',
      subtitle: 'Elegance of Banjar Culture',
      philosophy: 'A classical Banjar royal dance created to welcome guests of honor. This dance symbolizes friendliness, gentleness, and the respect of the Banjar people to every visitor.',
      sdgImpact: 'SDG 11.4 — Safeguard Cultural Heritage: Preserving traditional arts amidst modernization as a cultural tourism attraction.',
      facts: [
        'Female dancers usually wear a crown called Gajah Oling.',
        'Accompanied by traditional Panting music and Banjar Gamelan.',
        'Often performed in weddings and welcoming of figures.'
      ],
      shopName: 'Explore Banjar Culture'
    },
    'soto-banjar': {
      title: 'Soto Banjar',
      subtitle: 'Local Gastronomic Delight',
      philosophy: 'The richness of archipelago spices blends in the broth of Soto Banjar. This culinary is a symbol of acculturation and the hospitality of citizens who always serve the best food to their guests.',
      sdgImpact: 'SDG 8 — Economic Growth: Empowering local MSMEs and traditional culinary sectors to create sustainable jobs.',
      facts: [
        'The broth is distinctive because it uses cinnamon, nutmeg, and cloves.',
        'Usually served with ketupat (rice cake), chicken satay, and cassava croquettes.',
        'A must-try menu for tourists visiting Banjarmasin.'
      ],
      shopName: 'Taste Signature Culinary'
    },
    'pasar-terapung': {
      title: 'Floating Market',
      subtitle: 'River Trade Tradition',
      philosophy: 'The Floating Market is not just a place for buying and selling transactions, but the pulse of the riverbank community civilization that depends on each other and upholds local wisdom.',
      sdgImpact: 'SDG 12 — Responsible Consumption: Maintaining the barter system and trading local produce with low carbon footprint.',
      facts: [
        'This tradition has existed for hundreds of years along the Barito and Martapura Rivers.',
        'Dominated by "Acil-Acil" (women) selling on jukungs (traditional boats).',
        'Lok Baintan Floating Market is one of the national flagship tourist destinations.'
      ],
      shopName: 'Browse Tourist Destinations'
    },
    'trans-banjarmasin': {
      title: 'Trans Banjarmasin & BRT',
      subtitle: 'Smart Mobility (Smart City)',
      philosophy: 'Banjarmasin continues to move forward with comfortable, integrated, and eco-friendly BRT (Bus Rapid Transit) based mass transportation facilities, realizing the vision of Banjarmasin Smart City.',
      sdgImpact: 'SDG 11 & SDG 13 — Sustainable Transport: Encouraging citizens to switch to public transport to reduce emissions.',
      facts: [
        'Trans Banjarmasin buses are equipped with AC and disabled-friendly facilities.',
        'Routes cover strategic points including ports and tourist areas.',
        'Connected with the Banjarbakula BRT system (inter-city/regency).'
      ],
      shopName: 'Learn Smart City'
    }
  },
  ms: {
    'menara-pandang': {
      title: 'Menara Pandang Siring',
      subtitle: 'Ikon Pelancongan Bandar',
      philosophy: 'Menara Pandang Siring adalah ikon utama Bandar Raya Banjarmasin yang berdiri megah di tebing Sungai Martapura. Tempat ini melambangkan keterbukaan dan wawasan ke hadapan Kota Seribu Sungai.',
      sdgImpact: 'SDG 11 — Bandar Mampan: Pembangunan kawasan Siring sebagai ruang awam inklusif yang selamat dan mudah diakses oleh semua lapisan masyarakat.',
      facts: [
        'Menjadi pusat pertemuan pelancong dan penduduk tempatan.',
        'Mempunyai seni bina unik dengan sentuhan perhiasan khas Banjar.',
        'Dari puncaknya, pengunjung boleh melihat hamparan Sungai Martapura.'
      ],
      shopName: 'Lihat Destinasi Pelancongan'
    },
    'tari-baksa-kembang': {
      title: 'Tarian Baksa Kembang',
      subtitle: 'Keanggunan Budaya Banjar',
      philosophy: 'Tarian klasik keraton Banjar yang dicipta untuk menyambut tetamu kehormat. Tarian ini melambangkan keramahan, kelembutan budi pekerti, dan penghormatan warga Banjar kepada setiap pendatang.',
      sdgImpact: 'SDG 11.4 — Memelihara Warisan Budaya: Menjaga kesenian tradisi di tengah arus pemodenan sebagai daya tarikan pelancongan budaya.',
      facts: [
        'Penari wanita biasanya memakai mahkota bernama Gajah Oling.',
        'Diiringi oleh alat muzik tradisional Panting dan Gamelan Banjar.',
        'Sering dipersembahkan dalam acara perkahwinan dan menyambut tokoh.'
      ],
      shopName: 'Jelajahi Budaya Banjar'
    },
    'soto-banjar': {
      title: 'Soto Banjar',
      subtitle: 'Kelazatan Gastronomi Tempatan',
      philosophy: 'Kekayaan rempah nusantara berpadu dalam kuah kaldu Soto Banjar. Kulinari ini adalah simbol akulturasi dan keramahan warga yang selalu menyajikan makanan terbaik bagi tetamunya.',
      sdgImpact: 'SDG 8 — Pertumbuhan Ekonomi: Memperkasa PKS tempatan dan sektor kulinari tradisional untuk mencipta peluang pekerjaan mampan.',
      facts: [
        'Kuahnya khas kerana menggunakan rempah kayu manis, buah pala, dan bunga cengkih.',
        'Biasa dihidangkan dengan ketupat, sate ayam, dan begedil ubi kayu.',
        'Menjadi menu wajib bagi pelancong yang melawat Banjarmasin.'
      ],
      shopName: 'Rasa Kulinari Khas'
    },
    'pasar-terapung': {
      title: 'Pasar Terapung',
      subtitle: 'Tradisi Perdagangan Sungai',
      philosophy: 'Pasar Terapung bukan sekadar tempat urus niaga, tetapi nadi peradaban masyarakat tepian sungai yang saling bergantung dan menjunjung tinggi kearifan tempatan.',
      sdgImpact: 'SDG 12 — Penggunaan Bertanggungjawab: Mengekalkan sistem barter dan perdagangan hasil bumi tempatan yang rendah jejak karbon.',
      facts: [
        'Tradisi ini sudah ada sejak ratusan tahun lalu di sepanjang Sungai Barito dan Martapura.',
        'Didominasi oleh "Acil-Acil" (ibu-ibu) yang berniaga di atas perahu jukung.',
        'Pasar Terapung Lok Baintan merupakan salah satu destinasi pelancongan unggulan nasional.'
      ],
      shopName: 'Telusuri Destinasi Pelancongan'
    },
    'trans-banjarmasin': {
      title: 'Trans Banjarmasin & BRT',
      subtitle: 'Mobiliti Pintar (Smart City)',
      philosophy: 'Banjarmasin terus melangkah ke hadapan dengan kemudahan pengangkutan awam berasaskan BRT (Bus Rapid Transit) yang selesa, terintegrasi, dan mesra alam, merealisasikan visi Banjarmasin Smart City.',
      sdgImpact: 'SDG 11 & SDG 13 — Pengangkutan Mampan: Menggalakkan warga beralih ke pengangkutan awam untuk mengurangkan pelepasan.',
      facts: [
        'Bas Trans Banjarmasin dilengkapi dengan penyaman udara dan kemudahan mesra OKU.',
        'Laluan merangkumi titik-titik strategik termasuk pelabuhan dan kawasan pelancongan.',
        'Disambungkan dengan sistem BRT Banjarbakula (merentas bandar/daerah).'
      ],
      shopName: 'Ketahui Smart City'
    }
  },
  zh: {
    'menara-pandang': {
      title: 'Siring 观景塔',
      subtitle: '城市旅游图标',
      philosophy: 'Siring观景塔是马辰市的主要标志，雄伟地矗立在马塔普拉河畔。它象征着千河之城的开放和前瞻性愿景。',
      sdgImpact: 'SDG 11 — 可持续城市：将Siring地区发展为安全且面向各阶层开放的包容性公共空间。',
      facts: [
        '是游客和当地居民的聚集中心。',
        '具有独特的建筑风格，融入了典型的Banjar装饰。',
        '游客可以从顶部俯瞰马塔普拉河的广阔景色。'
      ],
      shopName: '查看旅游目的地'
    },
    'tari-baksa-kembang': {
      title: 'Baksa Kembang 舞蹈',
      subtitle: 'Banjar 文化的优雅',
      philosophy: '这是一种为迎接贵宾而创作的Banjar古典皇家舞蹈。该舞蹈象征着Banjar人民的友好、温柔以及对每位游客的尊重。',
      sdgImpact: 'SDG 11.4 — 保护文化遗产：在现代化进程中保护传统艺术，作为文化旅游景点。',
      facts: [
        '女舞者通常戴着名为Gajah Oling的皇冠。',
        '伴随着传统的Panting音乐和Banjar Gamelan。',
        '常在婚礼和欢迎重要人物时表演。'
      ],
      shopName: '探索Banjar文化'
    },
    'soto-banjar': {
      title: '马辰索托',
      subtitle: '当地美食佳肴',
      philosophy: '群岛香料的浓郁融入了马辰索托的肉汤中。这道美食是文化交融的象征，也体现了居民总是将最好的食物端给客人的好客精神。',
      sdgImpact: 'SDG 8 — 经济增长：赋能当地中小微企业和传统烹饪行业，创造可持续的就业机会。',
      facts: [
        '肉汤独特，因为使用了肉桂、肉豆蔻和丁香。',
        '通常与马来粽、鸡肉沙爹和木薯炸丸子一起食用。',
        '是来到马辰的游客必尝的菜单。'
      ],
      shopName: '品尝招牌美食'
    },
    'pasar-terapung': {
      title: '水上市场',
      subtitle: '河流贸易传统',
      philosophy: '水上市场不仅是买卖交易的场所，更是河畔社区文明的脉搏，人们相互依存，并高度推崇当地智慧。',
      sdgImpact: 'SDG 12 — 负责任消费：维持低碳足迹的物物交换和本地农产品贸易系统。',
      facts: [
        '这一传统在巴里托河和马塔普拉河沿岸已有数百年历史。',
        '主要由被称为“Acil-Acil”（妇女）的人在传统小船（jukung）上售卖。',
        'Lok Baintan水上市场是国家级的旗舰旅游目的地之一。'
      ],
      shopName: '浏览旅游目的地'
    },
    'trans-banjarmasin': {
      title: 'Trans Banjarmasin & BRT',
      subtitle: '智能出行 (智慧城市)',
      philosophy: '马辰不断向前发展，推出舒适、综合且环保的基于BRT（快速公交）的大众交通设施，实现马辰智慧城市的愿景。',
      sdgImpact: 'SDG 11 & SDG 13 — 可持续交通：鼓励市民转向公共交通，以减少排放。',
      facts: [
        'Trans Banjarmasin巴士配备空调和残疾人友好设施。',
        '路线覆盖港口和旅游区等战略地点。',
        '与Banjarbakula BRT系统（跨城/县）相连。'
      ],
      shopName: '了解智慧城市'
    }
  }
};

const SDG_TRANSLATIONS = {
  id: {
    title: "SDG 11 : Kota & Komunitas Berkelanjutan",
    subTheme: "Visit Banjarmasin — Smart City Berbudaya",
    target: "Target 11.4 : Memperkuat upaya melestarikan warisan budaya dan alam dunia.",
    description: "Banjarmasin bertransformasi menjadi kota cerdas (Smart City) tanpa meninggalkan akar budayanya. Inovasi seperti transportasi publik BRT, restorasi bantaran sungai, dan ekosistem pariwisata digital memastikan kesejahteraan warga sekaligus melestarikan pesona 'Kota Seribu Sungai' untuk generasi masa depan.",
    stats: [
      { label: "UMKM Lokal Terberdayakan", value: "5,000+" },
      { label: "Ruang Terbuka Hijau & Siring", value: "Diperluas" },
      { label: "Armada Bus Trans Banjarmasin", value: "Terintegrasi" },
      { label: "Peningkatan Wisatawan Global", value: "3.5x" }
    ]
  },
  en: {
    title: "SDG 11 : Sustainable Cities & Communities",
    subTheme: "Visit Banjarmasin — Cultured Smart City",
    target: "Target 11.4 : Strengthen efforts to protect and safeguard the world's cultural and natural heritage.",
    description: "Banjarmasin is transforming into a Smart City without leaving its cultural roots. Innovations like BRT public transport, riverbank restoration, and a digital tourism ecosystem ensure the well-being of citizens while preserving the charm of the 'City of a Thousand Rivers' for future generations.",
    stats: [
      { label: "Empowered Local MSMEs", value: "5,000+" },
      { label: "Green Open Spaces & Siring", value: "Expanded" },
      { label: "Trans Banjarmasin Bus Fleet", value: "Integrated" },
      { label: "Global Tourist Increase", value: "3.5x" }
    ]
  },
  ms: {
    title: "SDG 11 : Bandar & Komuniti Mampan",
    subTheme: "Visit Banjarmasin — Smart City Berbudaya",
    target: "Target 11.4 : Memperkukuh usaha memelihara warisan budaya dan alam dunia.",
    description: "Banjarmasin bertransformasi menjadi Bandar Pintar tanpa meninggalkan akar budayanya. Inovasi seperti pengangkutan awam BRT, pemulihan tebing sungai, dan ekosistem pelancongan digital memastikan kesejahteraan warga sambil memelihara pesona 'Kota Seribu Sungai' untuk generasi masa hadapan.",
    stats: [
      { label: "PKS Tempatan Diperkasakan", value: "5,000+" },
      { label: "Ruang Terbuka Hijau & Siring", value: "Diperluas" },
      { label: "Armada Bas Trans Banjarmasin", value: "Bersepadu" },
      { label: "Peningkatan Pelancong Global", value: "3.5x" }
    ]
  },
  zh: {
    title: "SDG 11 : 可持续城市与社区",
    subTheme: "Visit Banjarmasin — 文化智慧城市",
    target: "目标 11.4 : 加强保护和捍卫世界文化与自然遗产的努力。",
    description: "马辰正在转型为一座不失文化根基的智慧城市。BRT公共交通、河岸修复和数字旅游生态系统等创新，确保了市民的福祉，同时为子孙后代保留了“千河之城”的魅力。",
    stats: [
      { label: "赋能的本地中小微企业", value: "5,000+" },
      { label: "绿色开放空间与Siring", value: "已扩大" },
      { label: "Trans Banjarmasin公交车队", value: "已整合" },
      { label: "全球游客增长", value: "3.5x" }
    ]
  }
};

export const getLocalizedMotif = (id, lang = 'id') => {
  const baseData = MOTIFS_DATA.find(m => m.id === id);
  const translations = TRANSLATIONS[lang]?.[id] || TRANSLATIONS['id'][id];
  
  if (!baseData) return null;
  
  // Replace {lang} in shopLink if it exists
  const localizedShopLink = baseData.shopLink?.replace('{lang}', lang);

  return {
    ...baseData,
    ...translations,
    shopLink: localizedShopLink
  };
};

export const getLocalizedSdg = (lang = 'id') => {
  return SDG_TRANSLATIONS[lang] || SDG_TRANSLATIONS['id'];
};
