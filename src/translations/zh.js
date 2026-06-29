export const zh = {
  common: {
    loading: "加载中...",
    learnMore: "了解更多 ➔",
    exploreNow: "立即探索 ➔",
    close: "关闭",
    backToHome: "返回首页"
  },
  navbar: {
    brand: "马辰",
    aboutCity: "关于城市",
    profile: "城市概况",
    history: "1526年历史",
    innovation: "智慧城市创新",
    tourism: "景点",
    culinary: "美食",
    culture: "文化与艺术",
    guide: "指南与路线",
    exploreCTA: "探索城市",
    exploreCTA_mobile: "立即探索城市 ➔"
  },
  footer: {
    description: "Lambung Mangkurat 土地旅游与文化探索官方门户。为您提供千河之城马辰的无限旅行指南。",
    mascotTitle: "长鼻猴吉祥物陪伴您",
    mascotSub: "马塔普拉河畔24小时守护",
    sectionTravel: "味道探索",
    sectionAbout: "关于城市",
    sectionEmergency: "服务与应急",
    emergencies: {
      callCenter: "🚨 呼叫中心",
      police: "👮‍♂️ 河警服务",
      hospital: "🏥 乌林医院"
    },
    address: "📍 市政厅: 惹兰 RE Martadinata 1号，中马辰，南加里曼丹。",
    copyright: "© 2026 马辰市政府及旅游协会。保留所有权利。"
  },
  assistant: {
    welcome: "你好，朋友！我是阿集阿姨 AI（Acil AI） 🐵✨ 随时准备为您提供经典美食、运河巡游、快速公交（BRT）路线以及1526年历史的导览。请问有什么我可以帮您的吗？",
    thinking: "阿集阿姨正在思考...",
    rateLimit: "🛡️ 超级安全警报：系统检测到消息发送速度过快。为了服务器安全和防止垃圾信息，请稍等片刻，或者直接点击下方的微信/人工客服按钮。",
    apiKeyWarning: "⚠️ 在.env文件中未检测到Gemini API Key。请添加 VITE_GEMINI_API_KEY 以便我能更智能地回答！在此期间，您可以点击下方的人工客服按钮，朋友。",
    errorMessage: "非常抱歉朋友，我的AI连接目前遇到网络故障。您可以通过下方的 WhatsApp 按钮直接联系人工客服！🙏",
    waButton: "联系人工客服",
    placeholder: "向阿集阿姨提问...",
    title: "阿集阿姨 AI",
    badge: "Gemini",
    status: "24小时在线",
    quickQuestions: [
      "去水上市场的BRT公交路线？",
      "好吃的马辰鸡汤（Soto Banjar）推荐？",
      "参观苏丹苏里安萨清真寺的着装要求？"
    ]
  },
  home: {
    hero: {
      slides: [
        {
          tag: "✦ 加里曼丹主要门户",
          title: "欢迎来到马辰！",
          subtitle: "文明中心与婆罗洲心脏的魅力",
          desc: "准备好在“千河之城”开启一段难忘的探索之旅吧。感受传奇水上文化的异国情调，品尝正宗的香料美食，体验干净、舒适的现代城市布局。",
          price: "探索开始",
          btnText: "开始冒险 ➔"
        },
        {
          tag: "✦ 标志性目的地",
          title: "水上生活的异国情调",
          subtitle: "水上市场与运河巡游的魔幻黎明",
          desc: "亲眼目睹黎明时分木船（jukung）上传统贸易的脉搏，在穿过美丽城市的马塔普拉河上巡游，感受内心的宁静。",
          price: "本地智慧",
          btnText: "打开旅游地图 ➔"
        },
        {
          tag: "✦ 美食遗产",
          title: "正宗婆罗洲香料的交响乐",
          subtitle: "马辰鸡汤与坎丹甘饭的温暖",
          desc: "这是一部由小豆蔻香料高汤、软土豆饼以及烟熏鳢鱼香气交织而成的风味杰作，其原始配方经多代人严密守护传承。",
          price: "传奇风味",
          btnText: "品尝马辰美食 ➔"
        },
        {
          tag: "✦ 文化与历史",
          title: "祖先传统的优雅",
          subtitle: "沙希朗安（Sasirangan）美学与苏丹国足迹",
          desc: "追溯自1526年起马辰苏丹国的辉煌历史，欣赏天然染料缝染面料（Sasirangan）的复杂图案，见证过去铁木建筑的雄伟。",
          price: "文明足迹",
          btnText: "探索历史 ➔"
        },
        {
          tag: "✦ 智慧马辰",
          title: "千河之城的智慧都市",
          subtitle: "数字化服务与生态学的融合",
          desc: "马辰的新面貌——将公共服务超级应用生态系统与河流环境的实时监测相结合，实现现代化、清洁且包容的都市格局。",
          price: "未来之城",
          btnText: "智慧城市生态 ➔"
        }
      ]
    },
    wisata: {
      tag: "✦ 自然与地标探索",
      title: "标志性旅游目的地",
      desc: "探索马塔普拉运河生活的脉搏，以及婆罗洲难忘丛林的异国魅力。",
      btnText: "探索多样的自然与文化目的地 ➔",
      items: [
        { title: "洛拜坦水上市场", category: "河流文化", time: "⏰ 05.30 - 08.00 WITA" },
        { title: "观光塔与河滨步道", category: "城市地标", time: "⏰ 24小时开放" },
        { title: "长鼻猴雕像广场", category: "旅游标志", time: "⏰ 08.00 - 17.00 WITA" },
        { title: "苏丹苏里安萨清真寺", category: "1526文化遗产", time: "⏰ 宗教旅游" }
      ]
    },
    kuliner: {
      tag: "✦ 味道传承",
      title: "传奇马辰美食",
      desc: "每一道菜都是风味的杰作。探索南洋香料的秘方与配比，这些都是马辰人民世世代代坚守的瑰宝。",
      btnText: "探索美食店铺位置 ➔",
      foods: [
        {
          name: "小豆蔻香料马辰鸡汤 (Soto Banjar)",
          tabTitle: "🥣 传统马辰鸡汤",
          aroma: "豆蔻、肉桂与丁香的芬芳",
          desc: "精选本地土鸡配合香料慢火细熬而成的金色鸡汤。搭配热鸡丝、软土豆饼和本地特色米糕。"
        },
        {
          name: "坎丹甘烟熏鱼配饭 (Ketupat Kandangan)",
          tabTitle: "🥘 坎丹甘饭",
          aroma: "浓郁椰奶与烟熏鳢鱼的深邃香气",
          desc: "用传统黄色椰奶浓汤浸泡的米糕。搭配烤烟熏鳢鱼（snakehead fish），带来深邃且无与伦比的风味层次。"
        },
        {
          name: "传奇奥拉里红酱米糕 (Lontong Orari)",
          tabTitle: "🌙 奥拉里米糕",
          aroma: "马辰红辣酱的甜咸交织风味",
          desc: "三角形的巨大米糕，淋上浓郁的红酱（bumbu habang）。搭配完全入味的鸭蛋和走地鸡肉。"
        },
        {
          name: "花型烤椰奶土豆糕 (Bingka Kentang)",
          tabTitle: "🍯 烤椰奶土豆糕",
          aroma: "香甜软糯的烤椰奶与土豆香气",
          desc: "传统花瓣形状的湿糕点。混合了优质土豆与烤椰奶，口感超级松软，甜度天然。"
        }
      ]
    },
    budaya: {
      tag: "✦ 祖先遗产",
      title: "文化核心与历史足迹",
      desc: "不仅是面料和交通工具，它们更象征着马辰人民与河流环境的韧性以及人文和谐。",
      btnText: "探寻文化深度 ➔",
      cards: [
        {
          title: "沙希朗安手工扎染布 (Sasirangan)",
          desc: "通过缝线防染和天然染色工艺制成，自16世纪起就被当地人视为具有神奇疗效的治愈系织物。"
        },
        {
          title: "乌林木船文化 (Jukung)",
          desc: "采用当地铁木制成、不使用金属钉的传统木船，其精妙设计极适合破开加里曼丹河流的湍急水流。"
        }
      ],
      quote: "在木船上，马辰人民的生命源泉和手足情谊世代流淌，历久弥新。",
      quoteAuthor: "— 水上市场商贩"
    },
    smartCity: {
      tag: "✦ 马辰智造",
      title: "智慧城市 生态和谐",
      desc: "公共数字化服务超级应用与保护河流生态承诺的智能化融合。一个包容性未来的真实愿景。",
      btnText: "探索智慧生态 ➔",
      cards: [
        {
          title: "智慧马辰超级应用 (Banjarmasin Pintar)",
          desc: "使用SSO单点登录即可访问所有公共行政服务"
        },
        {
          title: "集中式交通管制系统 (ATCS)",
          desc: "全市交通实时控制与摄像头集成监视系统"
        },
        {
          title: "市民在线服务与数字微企 (UMKM)",
          desc: "从户籍登记到本地微小企业数字产品黄页的全面整合"
        }
      ]
    },
    panduan: {
      tag: "✦ 出行准备",
      title: "住宿与交通",
      desc: "市中心出行完整指南。为您推荐优质酒店和可靠的公共交通方式。",
      btnText: "打开2026完整生存指南 ➔",
      cards: [
        {
          title: "婆罗洲婆罗皇冠假日酒店 (Swiss-Belhotel)",
          desc: "坐落于河畔，可直接前往私家木船游览码头。"
        },
        {
          title: "银河酒店 (Galaxy Hotel)",
          desc: "位于城市入口门户，适合需要往返机场的快速出行者。"
        },
        {
          title: "BRT Trans Banjarbakula 公交",
          desc: "配有空调的舒适客运巴士，运营范围从机场直达市中心0公里处。"
        }
      ]
    },
    planner: {
      tag: "✦ 行程导航",
      title: "路线与交互式行程规划器",
      desc: "利用传奇景点之间的交互式旅行时间估算计算器，规划您在马辰的冒险之旅。",
      selectTitle: "选择旅行目的地:",
      routeTitle: "最佳路线与出行信息",
      timeTitle: "预估旅行时间",
      transportTitle: "首选交通工具",
      bestTimeTitle: "最佳游览时间",
      highlightTitle: "景点核心看点",
      ctaMaps: "打开谷歌地图 ➔",
      spots: {
        lokbaintan: {
          title: "洛拜坦水上市场",
          type: "河流文化旅游",
          transport: "🛶 木船 (从河畔观光码头出发约35分钟)",
          bestTime: "🌅 早晨 05.30 - 07.30 (日出时分)",
          highlight: "见证自16世纪以来一直在木船上进行的、以物易物的传统买卖交易。"
        },
        siring: {
          title: "马塔普拉河畔观光塔",
          type: "市中心地标",
          transport: "🚗 步行 / 乘坐公共交通工具",
          bestTime: "🌆 下午 16.30 - 21.00 (黄昏与夜景)",
          highlight: "马塔普拉河畔的市民休闲中心。享受河风、现场音乐和马辰特色夜间小吃。"
        },
        sotoamat: {
          title: "阿麦鸡汤美食码头",
          type: "美食体验旅游",
          transport: "🛶 观光木船 / 汽车 (距市中心约15分钟车程)",
          bestTime: "🍜 中午 11.00 - 15.00 (伴随传统潘亭器乐午餐)",
          highlight: "在马塔普拉河畔品尝温热的马辰鸡汤，同时欣赏现场演奏的传统潘亭（Panting）弦乐。"
        },
        pulaukembang: {
          title: "金花岛自然保护区 (Pulau Kembang)",
          type: "自然与野生动物旅游",
          transport: "快艇 / 木船 (沿巴里托河行驶约20分钟)",
          bestTime: "☀️ 上午 08.00 - 11.00 (上午时段)",
          highlight: "位于巴里托河中央的三角洲岛屿，是数千只长尾猕猴和婆罗洲本土长鼻猴的天然栖息地。"
        }
      }
    }
  }
};
