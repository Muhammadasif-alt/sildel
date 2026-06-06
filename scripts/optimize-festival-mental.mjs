/**
 * Convert every Festival Mental source JPG into a sized WebP under
 * public/partners-web/festival-mental/.
 *
 * Source originals (12-15MB raw camera JPGs) live in the gitignored
 * /public/PARTNERS/FESTIVAL MENTAL/ folder. We resize to max 1800x1800
 * (matches Slidel optimizer) and encode WebP at quality 82.
 *
 * Output naming:
 *   fm-2025-01.webp ... fm-2025-NN.webp  (from IX edition folder)
 *   fm-2026-01.webp ... fm-2026-NN.webp  (from X  edition folder)
 *
 * Run:  node scripts/optimize-festival-mental.mjs
 */
import sharp from "sharp";
import { readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC_BASE = path.join(ROOT, "public", "PARTNERS", "FESTIVAL MENTAL");
const OUT_DIR = path.join(ROOT, "public", "partners-web", "festival-mental");

const EDITIONS = [
  { name: "IX_EDIÇÃO_FESTIVAL MENTAL_TROFÉU 2025", prefix: "fm-2025" },
  { name: "X_EDIÇÃO_FESTIVAL MENTAL_TROFÉU_2026", prefix: "fm-2026" },
];

await mkdir(OUT_DIR, { recursive: true });

let totalSrc = 0;
let totalOut = 0;
let totalCount = 0;

for (const ed of EDITIONS) {
  const srcDir = path.join(SRC_BASE, ed.name);
  let files = [];
  try {
    files = await readdir(srcDir);
  } catch {
    console.warn(`Skipping (not found): ${srcDir}`);
    continue;
  }

  // Filter JPGs, ignore the "(1)" duplicate copies, sort by name.
  const jpgs = files
    .filter((f) => /\.jpe?g$/i.test(f) && !/\(\d+\)/.test(f))
    .sort();

  console.log(`\n${ed.name}: ${jpgs.length} images`);

  let i = 0;
  for (const name of jpgs) {
    i += 1;
    const src = path.join(srcDir, name);
    const outName = `${ed.prefix}-${String(i).padStart(2, "0")}.webp`;
    const out = path.join(OUT_DIR, outName);
    const srcSize = (await stat(src)).size;

    await sharp(src)
      .rotate()
      .resize({
        width: 1800,
        height: 1800,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 82, effort: 5 })
      .toFile(out);

    const outSize = (await stat(out)).size;
    totalSrc += srcSize;
    totalOut += outSize;
    totalCount += 1;
    const pct = Math.round((1 - outSize / srcSize) * 100);
    console.log(
      `  [${String(i).padStart(2, " ")}/${jpgs.length}] ${name} → ${outName}  ${(srcSize / 1024 / 1024).toFixed(1)}MB → ${(outSize / 1024).toFixed(0)}KB  (−${pct}%)`,
    );
  }
}

console.log(
  `\nTotal: ${totalCount} images, ${(totalSrc / 1024 / 1024).toFixed(1)}MB → ${(totalOut / 1024 / 1024).toFixed(1)}MB`,
);