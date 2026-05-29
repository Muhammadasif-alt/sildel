/**
 * Optimize the raw partner photos (client drop in public/PARTNERS, 400+ MB)
 * into small web WebP files under public/partners-web/. The raw folder is
 * git-ignored; only these optimized outputs are committed.
 *
 * Run:  node scripts/optimize-partners.mjs
 */
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const SRC = path.join(ROOT, "public", "PARTNERS");
const OUT = path.join(ROOT, "public", "partners-web");

// src is relative to public/PARTNERS; out relative to public/partners-web.
const JOBS = [
  // ── Porcel — porcelain × cork, Ambiente fair (Germany) ──
  // Primary set (used on /partners):
  { src: "PORCEL/FOTOS_FEIRA AMBIENT_ALEMANHA/IMG_01.jpeg", out: "porcel/porcel-1.webp" },
  { src: "PORCEL/FOTOS_FEIRA AMBIENT_ALEMANHA/IMG_2337.JPG", out: "porcel/porcel-3.webp" },
  { src: "PORCEL/FOTOS_FEIRA AMBIENT_ALEMANHA/IMG_2308.JPG", out: "porcel/porcel-4.webp" },
  { src: "PORCEL/FOTOS_FEIRA AMBIENT_ALEMANHA/IMG_20251231_101731.jpg", out: "porcel/porcel-7.webp" },
  // Alt set (used on You Think Cork):
  { src: "PORCEL/FOTOS_FEIRA AMBIENT_ALEMANHA/IMG_2336.JPG", out: "porcel/porcel-2.webp" },
  { src: "PORCEL/FOTOS_FEIRA AMBIENT_ALEMANHA/IMG_6622.JPEG", out: "porcel/porcel-5.webp" },
  { src: "PORCEL/FOTOS_FEIRA AMBIENT_ALEMANHA/IMG_02.jpeg", out: "porcel/porcel-6.webp" },

  // ── Lightenjin — CORKLUX cork luminaires (transparent cutouts, keep alpha) ──
  // Primary set:
  { src: "LIGHTENJIN/FOTOS_PRODUTO_GAMA CORKLUX/CORKLUX-I-low3.png", out: "lightenjin/corklux-i.webp", alpha: true },
  { src: "LIGHTENJIN/FOTOS_PRODUTO_GAMA CORKLUX/CORKLUX-II-1low.png", out: "lightenjin/corklux-ii.webp", alpha: true },
  { src: "LIGHTENJIN/FOTOS_PRODUTO_GAMA CORKLUX/CORKLUX-III-1low.png", out: "lightenjin/corklux-iii.webp", alpha: true },
  { src: "LIGHTENJIN/FOTOS_PRODUTO_GAMA CORKLUX/CORKLUX-TANGRAM-low.png", out: "lightenjin/corklux-tangram.webp", alpha: true },
  // Alt set (different renders of the same models):
  { src: "LIGHTENJIN/FOTOS_PRODUTO_GAMA CORKLUX/CORKLUX-I-2low.png", out: "lightenjin/corklux-i-b.webp", alpha: true },
  { src: "LIGHTENJIN/FOTOS_PRODUTO_GAMA CORKLUX/CORKLUX-II-low3.png", out: "lightenjin/corklux-ii-b.webp", alpha: true },
  { src: "LIGHTENJIN/FOTOS_PRODUTO_GAMA CORKLUX/CORKLUX-III-low2.png", out: "lightenjin/corklux-iii-b.webp", alpha: true },
  { src: "LIGHTENJIN/FOTOS_PRODUTO_GAMA CORKLUX/CORKLUX-TANGRAM-low2.png", out: "lightenjin/corklux-tangram-b.webp", alpha: true },

  // ── Festival Mental — Sildel crafts the official cork trophy ──
  // Primary set:
  { src: "FESTIVAL MENTAL/X_EDIÇÃO_FESTIVAL MENTAL_TROFÉU_2026/mental-273.jpg", out: "festival-mental/fm-1.webp" },
  { src: "FESTIVAL MENTAL/X_EDIÇÃO_FESTIVAL MENTAL_TROFÉU_2026/mental-286.jpg", out: "festival-mental/fm-2.webp" },
  { src: "FESTIVAL MENTAL/X_EDIÇÃO_FESTIVAL MENTAL_TROFÉU_2026/mental-258.jpg", out: "festival-mental/fm-3.webp" },
  { src: "FESTIVAL MENTAL/IX_EDIÇÃO_FESTIVAL MENTAL_TROFÉU 2025/DSC_4751.jpg", out: "festival-mental/fm-4.webp" },
  // Alt set:
  { src: "FESTIVAL MENTAL/IX_EDIÇÃO_FESTIVAL MENTAL_TROFÉU 2025/DSC_4831.jpg", out: "festival-mental/fm-5.webp" },
  { src: "FESTIVAL MENTAL/X_EDIÇÃO_FESTIVAL MENTAL_TROFÉU_2026/mental-260.jpg", out: "festival-mental/fm-6.webp" },
  { src: "FESTIVAL MENTAL/X_EDIÇÃO_FESTIVAL MENTAL_TROFÉU_2026/mental-268.jpg", out: "festival-mental/fm-7.webp" },
  { src: "FESTIVAL MENTAL/X_EDIÇÃO_FESTIVAL MENTAL_TROFÉU_2026/mental-296.jpg", out: "festival-mental/fm-8.webp" },
];

const MAX = 1600; // longest edge for web

let ok = 0;
let failed = 0;

for (const job of JOBS) {
  const inPath = path.join(SRC, job.src);
  const outPath = path.join(OUT, job.out);
  try {
    await mkdir(path.dirname(outPath), { recursive: true });
    let pipeline = sharp(inPath).rotate().resize({
      width: MAX,
      height: MAX,
      fit: "inside",
      withoutEnlargement: true,
    });
    if (!job.alpha) pipeline = pipeline.flatten({ background: "#ffffff" });
    await pipeline.webp({ quality: 80, effort: 5 }).toFile(outPath);
    ok++;
    console.log(`✓ ${job.out}`);
  } catch (err) {
    failed++;
    console.warn(`✗ ${job.src} — ${err.message}`);
  }
}

console.log(`\nDone: ${ok} optimized, ${failed} failed.`);