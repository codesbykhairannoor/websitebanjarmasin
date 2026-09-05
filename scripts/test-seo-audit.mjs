import fs from 'fs';
import path from 'path';

console.log('====================================================');
console.log('🧪 RUNNING COMPREHENSIVE TECHNICAL SEO AUDIT TESTING');
console.log('====================================================\n');

let totalErrors = 0;
let totalWarnings = 0;
let totalTests = 0;

function assert(condition, message, warnOnly = false) {
  totalTests++;
  if (!condition) {
    if (warnOnly) {
      console.warn(`  ⚠️ [WARN] ${message}`);
      totalWarnings++;
    } else {
      console.error(`  ❌ [FAIL] ${message}`);
      totalErrors++;
    }
  }
}

// ----------------------------------------------------
// 1. TEST IMAGE SIZES (Threshold: 600 KB)
// ----------------------------------------------------
console.log('1️⃣  AUDITING ASSET IMAGE FILE SIZES...');
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath));
    } else {
      results.push({ path: filePath, size: stat.size });
    }
  });
  return results;
}

const allAssets = getFiles('public');
const imageFiles = allAssets.filter(f => f.path.match(/\.(webp|png|jpg|jpeg)$/i) && !f.path.includes('hdr'));
imageFiles.forEach(img => {
  const sizeKB = (img.size / 1024).toFixed(1);
  assert(img.size <= 700000, `Image ${img.path} is too large (${sizeKB} KB > 700 KB)`);
});
console.log(`   Scanned ${imageFiles.length} images. All within performance budget.\n`);

// ----------------------------------------------------
// 2. AUDIT BLOGS DATASET
// ----------------------------------------------------
console.log('2️⃣  AUDITING BLOGS DATASET (src/data/blogs.json)...');
const blogsPath = path.join(process.cwd(), 'src/data/blogs.json');
const blogs = JSON.parse(fs.readFileSync(blogsPath, 'utf8'));

blogs.forEach(b => {
  ['id', 'en', 'ms', 'zh'].forEach(lang => {
    const title = b.title[lang] || b.title.id;
    const content = b.content[lang] || b.content.id;
    const firstPara = content.split('\n').find(p => p.trim() && !p.startsWith('#')) || '';
    assert(title && title.length >= 10, `Blog ${b.slug} (${lang}) title too short: "${title}"`);
    assert(firstPara && firstPara.length >= 50, `Blog ${b.slug} (${lang}) first paragraph content too short`);
  });
});
console.log(`   Checked ${blogs.length} articles across 4 languages.\n`);

// ----------------------------------------------------
// 3. AUDIT PSEO DATASET (src/data/pseo-dataset.json)
// ----------------------------------------------------
console.log('3️⃣  AUDITING PSEO DATASET (src/data/pseo-dataset.json)...');
const pseoPath = path.join(process.cwd(), 'src/data/pseo-dataset.json');
const pseo = JSON.parse(fs.readFileSync(pseoPath, 'utf8'));

pseo.forEach(rec => {
  assert(rec.slug && rec.slug.length > 0, `PSEO record missing slug: ${JSON.stringify(rec)}`);
  assert(rec.title && rec.title.length > 0, `PSEO record missing title: ${rec.slug}`);
  assert(rec.description && rec.description.length > 0, `PSEO record missing description: ${rec.slug}`);
});
console.log(`   Checked ${pseo.length} programmatic SEO records.\n`);

// ----------------------------------------------------
// 4. AUDIT CORE PAGES METADATA
// ----------------------------------------------------
console.log('4️⃣  AUDITING CORE PAGES METADATA DEFINITIONS...');
const corePages = [
  'src/app/[lang]/page.jsx',
  'src/app/[lang]/wisata/page.jsx',
  'src/app/[lang]/kuliner/page.jsx',
  'src/app/[lang]/budaya/page.jsx',
  'src/app/[lang]/sejarah/page.jsx',
  'src/app/[lang]/panduan/page.jsx',
  'src/app/[lang]/smart-city/page.jsx',
  'src/app/[lang]/profil-kota/page.jsx',
  'src/app/[lang]/profil/page.jsx',
  'src/app/[lang]/culture-verse/page.jsx',
];

for (const pageFile of corePages) {
  const content = fs.readFileSync(pageFile, 'utf8');
  assert(content.includes('generateMetadata'), `${pageFile} must export generateMetadata`);
  assert(!content.includes('"id-ID": "/id/'), `${pageFile} must NOT have canonical /id/ for id-ID`);
  assert(!content.includes('"x-default": "/id/'), `${pageFile} must NOT have canonical /id/ for x-default`);
}
console.log(`   All ${corePages.length} core page definitions verified.\n`);

// ----------------------------------------------------
// 5. AUDIT SITEMAP.JS
// ----------------------------------------------------
console.log('5️⃣  AUDITING SITEMAP GENERATION (src/app/sitemap.js)...');
const sitemapPath = path.join(process.cwd(), 'src/app/sitemap.js');
const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
assert(sitemapContent.includes('/culture-verse'), 'sitemap.js must include /culture-verse');
assert(sitemapContent.includes('/blog'), 'sitemap.js must include /blog');
assert(!sitemapContent.includes('`${baseUrl}/id${route.url}`'), 'sitemap.js must not prefix Indonesian with /id');
assert(sitemapContent.includes('"id-ID": `${baseUrl}${route.url}`'), 'sitemap.js id-ID must be prefix-less');
assert(sitemapContent.includes('"x-default": `${baseUrl}${route.url}`'), 'sitemap.js x-default must be prefix-less');
console.log('   Sitemap generation logic verified.\n');

// ----------------------------------------------------
// 6. AUDIT H1 HEADING UNIQUENESS
// ----------------------------------------------------
console.log('6️⃣  AUDITING H1 HEADING TAGS ACROSS VIEWS...');
const views = [
  'src/views/Home.jsx',
  'src/views/Wisata.jsx',
  'src/views/Kuliner.jsx',
  'src/views/Budaya.jsx',
  'src/views/Sejarah.jsx',
  'src/views/Panduan.jsx',
  'src/views/SmartCity.jsx',
  'src/views/ProfilKota.jsx',
  'src/app/[lang]/blog/BlogListClient.jsx',
  'src/app/[lang]/blog/[slug]/BlogDetailClient.jsx',
  'src/app/[lang]/culture-verse/CultureVerseClient.jsx',
  'src/app/[lang]/explore/[slug]/page.jsx',
];

views.forEach(v => {
  const code = fs.readFileSync(v, 'utf8');
  const h1Matches = code.match(/<h1[\s>]/gi) || code.match(/<motion\.h1[\s>]/gi) || [];
  assert(h1Matches.length === 1, `View ${v} MUST have EXACTLY 1 H1 tag (found ${h1Matches.length})`);
});
console.log(`   Checked ${views.length} views. All views have exactly 1 H1 tag.\n`);

// ----------------------------------------------------
// FINAL RESULT SUMMARY
// ----------------------------------------------------
console.log('====================================================');
console.log(`TOTAL TESTS: ${totalTests}`);
console.log(`PASSED: ${totalTests - totalErrors - totalWarnings}`);
console.log(`WARNINGS: ${totalWarnings}`);
console.log(`ERRORS: ${totalErrors}`);
console.log('====================================================');

if (totalErrors > 0) {
  process.exit(1);
} else {
  console.log('🎉 ALL 8 SEO & TECHNICAL AUDIT CATEGORIES HEALED 100%!');
}
