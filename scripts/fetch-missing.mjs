/**
 * One-shot: pull Granada / Vitaqua / Vitavele / Bonfire photos from
 * sildel.pt (they have no folder in FOTOS PRODUTO) and optimise into
 * /public/products/ — same pipeline as scripts/fetch-pearl.mjs.
 *
 * Run with:  node scripts/fetch-missing.mjs
 */
import { mkdir, stat, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { Buffer } from "node:buffer";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "public", "products");
const MAX_WIDTH = 1600;
const QUALITY = 82;

const SOURCES = [
  // Granada — single featured shot
  {
    url: "https://sildel.pt/wp-content/uploads/2022/11/PX-GRANADA-SILDEL.webp",
    name: "GRANADA_Fundo_BRANCO_Featured",
  },
  // Vitaqua — 3 shots
  {
    url: "https://sildel.pt/wp-content/uploads/2022/10/Vitaqua-special1-e1717771800485.jpg",
    name: "VITAQUA_Fundo_BRANCO_01",
  },
  {
    url: "https://sildel.pt/wp-content/uploads/2022/10/Vitaqua-special2.jpg",
    name: "VITAQUA_Fundo_BRANCO_02",
  },
  {
    url: "https://sildel.pt/wp-content/uploads/2022/10/Vitaqua-special3.jpg",
    name: "VITAQUA_Fundo_BRANCO_03",
  },
  // Vitavele — 3 shots
  {
    url: "https://sildel.pt/wp-content/uploads/2022/10/Vitavele-special1.jpg",
    name: "VITAVELE_Fundo_BRANCO_01",
  },
  {
    url: "https://sildel.pt/wp-content/uploads/2022/10/Vitavele-special2-e1717771856724.jpg",
    name: "VITAVELE_Fundo_BRANCO_02",
  },
  {
    url: "https://sildel.pt/wp-content/uploads/2022/10/Vitavele-special3.jpg",
    name: "VITAVELE_Fundo_BRANCO_03",
  },
  // Bonfire — 3 shots
  {
    url: "https://sildel.pt/wp-content/uploads/2022/10/Bonfire1.jpg",
    name: "BONFIRE_Fundo_BRANCO_01",
  },
  {
    url: "https://sildel.pt/wp-content/uploads/2022/10/Bonfire2.jpg",
    name: "BONFIRE_Fundo_BRANCO_02",
  },
  {
    url: "https://sildel.pt/wp-content/uploads/2022/10/Bonfire3.jpg",
    name: "BONFIRE_Fundo_BRANCO_03",
  },
];

await mkdir(OUT_DIR, { recursive: true });

const mapping = {};
let bytesIn = 0;
let bytesOut = 0;

for (const { url, name } of SOURCES) {
  process.stdout.write(`  → ${url} `);
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`✗ HTTP ${res.status}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  bytesIn += buf.length;

  const hash = createHash("sha1").update(url).digest("hex").slice(0, 10);
  const outName = `${name}-${hash}.webp`;
  const outPath = path.join(OUT_DIR, outName);
  const outUrl = `/products/${outName}`;

  await sharp(buf)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outPath);

  const outStat = await stat(outPath);
  bytesOut += outStat.size;
  mapping[url] = outUrl;
  console.log(
    `(${(buf.length / 1024).toFixed(0)}KB → ${(outStat.size / 1024).toFixed(0)}KB) ${outName}`,
  );
}

console.log(`\n📊 Done.`);
console.log(`   Files:  ${Object.keys(mapping).length}`);
console.log(`   In:     ${(bytesIn / 1024).toFixed(0)} KB`);
console.log(`   Out:    ${(bytesOut / 1024).toFixed(0)} KB`);

await writeFile(
  path.join(ROOT, "scripts/.fetch-missing-mapping.json"),
  JSON.stringify(mapping, null, 2),
);