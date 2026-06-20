/**
 * One-shot: pull the four Pearl photos from sildel.pt, run them through
 * the same sharp pipeline as scripts/optimize-fotos.mjs, and drop the
 * optimised WebPs into /public/products/ with the existing
 * `{name}-{hash10}.webp` naming convention.
 *
 * Run with:  node scripts/fetch-pearl.mjs
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

// Source files on sildel.pt + the meaningful name we want to use
// locally (no anonymous Pearl2/3/4 — readable content in the filename).
const SOURCES = [
  {
    url: "https://sildel.pt/wp-content/uploads/2022/10/PX-PEARL-SILDEL.webp",
    name: "PEARL_Fundo_BRANCO_Featured",
  },
  {
    url: "https://sildel.pt/wp-content/uploads/2022/10/Pearl2.jpg",
    name: "PEARL_Detail_02",
  },
  {
    url: "https://sildel.pt/wp-content/uploads/2022/10/Pearl3.jpg",
    name: "PEARL_Detail_03",
  },
  {
    url: "https://sildel.pt/wp-content/uploads/2022/10/Pearl4.jpg",
    name: "PEARL_Detail_04",
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

  // Hash the source URL so repeated runs are deterministic and the
  // filename pattern matches the rest of /public/products/.
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
console.log(`\n   Mapping:`);
for (const [k, v] of Object.entries(mapping)) console.log(`     ${k} → ${v}`);

await writeFile(
  path.join(ROOT, "scripts/.pearl-mapping.json"),
  JSON.stringify(mapping, null, 2),
);