/**
 * Reads the mapping written by optimize-fotos.mjs and rewrites every reference
 * in the source content files to point to the optimized /products/<hash>.webp.
 *
 * Handles both:
 *   "/FOTOS PRODUTO/foo.jpg"   →   "/products/<hash>.webp"
 *   fp("foo.jpg")               →   "/products/<hash>.webp"
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const mapping = JSON.parse(
  await readFile(path.join(ROOT, "scripts/.fotos-mapping.json"), "utf8"),
);

const SOURCES = [
  "src/content/treasures.ts",
  "src/content/home.en.ts",
  "src/content/home.pt.ts",
];

for (const rel of SOURCES) {
  const file = path.join(ROOT, rel);
  let text = await readFile(file, "utf8");
  let count = 0;

  // Replace fp("...") calls first — needs full-string-literal substitution.
  // Anchor on the surrounding double-quote so paths containing apostrophes match.
  text = text.replace(
    /\bfp\(\s*"([^"]+?\.(?:jpg|jpeg|png|webp))"\s*\)/gi,
    (whole, inner) => {
      const fullKey = `/FOTOS PRODUTO/${inner}`;
      const replacement = mapping[fullKey];
      if (!replacement) {
        console.warn(`  ! no mapping for ${fullKey}`);
        return whole;
      }
      count++;
      return JSON.stringify(replacement);
    },
  );

  // Replace literal "/FOTOS PRODUTO/..." paths (allow inner apostrophes).
  text = text.replace(
    /"\/FOTOS PRODUTO\/[^"]+?\.(?:jpg|jpeg|png|webp)"/gi,
    (whole) => {
      const key = whole.slice(1, -1); // strip quotes
      const replacement = mapping[key];
      if (!replacement) {
        console.warn(`  ! no mapping for ${key}`);
        return whole;
      }
      count++;
      return JSON.stringify(replacement);
    },
  );

  await writeFile(file, text);
  console.log(`✓ ${rel}  (${count} replacements)`);
}

console.log(`\nDone.`);