// compress-images.cjs - Image compression with Sharp
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const images = [
  ["public/home/hero-mobile-menara-pandang.webp", 750, 70],
  ["public/home/hero-mobile-pasar-terapung.webp", 750, 70],
  ["public/home/hero-sasirangan-mobile.webp", 750, 70],
  ["public/home/hero-bus-mobile.webp", 750, 70],
  ["public/home/hero-soto-banjar-mobile.webp", 750, 70],
  ["public/home/banjarmasinkota.webp", 1280, 72],
  ["public/home/banjarmasinkota1.webp", 1280, 72],
  ["public/home/hero_pasar_terapung.webp", 1280, 72],
  ["public/home/hero_kain_sasirangan.webp", 1280, 72],
  ["public/home/hero_soto_banjar.webp", 1280, 72],
  ["public/home/hero_sungai_martapura.webp", 1280, 72],
];

async function compressImage(srcPath, maxWidth, quality) {
  const abs = path.resolve(srcPath);
  if (!fs.existsSync(abs)) return;
  const originalSize = fs.statSync(abs).size;
  const tmpPath = abs + ".tmp.webp";
  try {
    const img = sharp(abs);
    const meta = await img.metadata();
    const targetWidth = Math.min(meta.width, maxWidth);
    await img.resize({ width: targetWidth, withoutEnlargement: true }).webp({ quality, effort: 6, smartSubsample: true }).toFile(tmpPath);
    const newSize = fs.statSync(tmpPath).size;
    if (newSize < originalSize) {
      fs.renameSync(tmpPath, abs);
      const saving = ((originalSize - newSize) / originalSize * 100).toFixed(1);
      console.log("Compressed " + path.basename(srcPath) + ": " + (originalSize/1024).toFixed(0) + "KB -> " + (newSize/1024).toFixed(0) + "KB (-" + saving + "%)");
    } else {
      fs.unlinkSync(tmpPath);
      console.log("Skipped (already optimal): " + path.basename(srcPath));
    }
  } catch(e) {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    console.error("Error: " + srcPath + " - " + e.message);
  }
}

async function main() {
  for (const [src, w, q] of images) await compressImage(src, w, q);
  console.log("Done!");
}
main();
