/**
 * One-shot image optimizer for /public/Slidel/*.png and /public/Slidel/*.webp.
 *
 * - Re-encodes PNGs as WebP (quality 80, max dimension 1600px)
 * - Re-encodes large WebPs (>500 KB) at the same target
 * - Skips already-optimised files
 *
 * Run with:  node scripts/optimize-images.mjs
 */
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.resolve(process.cwd(), "public/Slidel");
const MAX_DIMENSION = 1600;
const QUALITY = 80;
const LARGE_WEBP_THRESHOLD = 500 * 1024; // 500 KB

function fmt(bytes) {
  if (bytes > 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

const entries = await readdir(DIR);
const targets = entries.filter((f) => /\.(png|webp)$/i.test(f));

let totalBefore = 0;
let totalAfter = 0;
let converted = 0;
let skipped = 0;

for (const file of targets) {
  const full = path.join(DIR, file);
  const ext = path.extname(file).toLowerCase();
  const base = file.slice(0, -ext.length);
  const outName = `${base}.webp`;
  const out = path.join(DIR, outName);

  const inputStat = await stat(full);
  totalBefore += inputStat.size;

  // Skip if WebP already exists for a PNG AND it's small enough
  if (ext === ".webp") {
    if (inputStat.size <= LARGE_WEBP_THRESHOLD) {
      skipped++;
      totalAfter += inputStat.size;
      continue;
    }
  }

  try {
    const buf = await sharp(full)
      .resize({
        width: MAX_DIMENSION,
        height: MAX_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: QUALITY, effort: 5 })
      .toBuffer();

    // Write to tmp then atomic-rename to avoid corrupting the source if it's the same path
    const tmp = `${out}.tmp`;
    await sharp(buf).toFile(tmp);
    const { rename, unlink } = await import("node:fs/promises");

    // If we're converting a PNG, also drop the original PNG (saved as WebP now)
    if (ext === ".png" && full !== out) {
      await rename(tmp, out);
      await unlink(full);
    } else {
      await unlink(full).catch(() => {});
      await rename(tmp, out);
    }

    const afterStat = await stat(out);
    totalAfter += afterStat.size;
    converted++;
    console.log(
      `  ${file.padEnd(80, " ").slice(0, 80)}  ${fmt(inputStat.size).padStart(10)}  →  ${fmt(afterStat.size).padStart(10)}`,
    );
  } catch (err) {
    console.error(`  ✗ ${file}:`, err.message);
    totalAfter += inputStat.size;
  }
}

console.log("");
console.log(`Converted: ${converted}`);
console.log(`Skipped:   ${skipped}`);
console.log(`Total:     ${fmt(totalBefore)}  →  ${fmt(totalAfter)}`);
console.log(`Saved:     ${fmt(totalBefore - totalAfter)}`);
