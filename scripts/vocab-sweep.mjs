#!/usr/bin/env node
// Phase A — vocabulary sweep. Replaces "handicraft/artesanato" register
// across content + SEO files with luxury maison vocabulary. Single-pass,
// idempotent (running twice does nothing). Run from repo root.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
let totalChanges = 0;

/** Apply ordered substring replacements to a file, log changes. */
function sweep(relPath, edits) {
  const full = resolve(root, relPath);
  let text = readFileSync(full, "utf8");
  let n = 0;
  for (const [from, to] of edits) {
    const before = text;
    text = text.split(from).join(to);
    const count = (before.length - text.length + (to.length - from.length) * (before.split(from).length - 1)) / 1;
    const occurrences = before.split(from).length - 1;
    if (occurrences > 0) {
      console.log(`  ${relPath}: ${occurrences}× "${from.slice(0, 60).replace(/\n/g, "\\n")}..."`);
      n += occurrences;
    }
  }
  if (n > 0) {
    writeFileSync(full, text);
    totalChanges += n;
  } else {
    console.log(`  ${relPath}: no matches (already swept or strings drifted)`);
  }
}

console.log("\n▶ src/content/home.en.ts");
sweep("src/content/home.en.ts", [
  // Hero slide description
  ["Portuguese cork — slow craft, signed and numbered.", "Portuguese cork — shaped by hand, signed and numbered."],
  // whyChoose body second line
  ["Just slow craft, premium cork, and a thirty-year practice the Iberian peninsula has come to know.", "Just a slow practice, premium cork, and thirty years of atelier work the Iberian peninsula has come to know."],
  // sustainability title
  ['title: "Honest craft,",', 'title: "Honest work,",'],
  // brandVideo eyebrow
  ['eyebrow: "Watch the Craft",', 'eyebrow: "Inside the Atelier",'],
  // treasures body
  ["outlast trends. Slow craft, designed in Portugal", "outlast trends. Made slowly, designed in Portugal"],
  // newsletter titleAccent
  ['titleAccent: "to the craft.",', 'titleAccent: "to the atelier.",'],
  // heroShop eyebrow
  ['eyebrow: "Crafted in Portugal",', 'eyebrow: "Made in Portugal",'],
  // whySildel stat label
  ['label: "Master artisans"', 'label: "Sculptors at the bench"'],
  // pillar 1 (title + body, two separate strings)
  ['title: "Slow craft."', 'title: "The material\'s tempo."'],
  ["only time, attention, and the artisan's eye.", "only time, attention, and the sculptor's eye."],
  // pillar 2 body
  ["northern Portugal — a craft tradition that's been honed for centuries.", "northern Portugal — an atelier practice honed for centuries."],
  // pillar 3 body
  ["Every piece carries the artisan's signature and its place in the edition.", "Every piece carries the sculptor's signature and its place in the edition."],
]);

console.log("\n▶ src/content/home.pt.ts");
sweep("src/content/home.pt.ts", [
  // Hero slide description
  ["cortiça portuguesa sustentável — artesanato lento, assinado e numerado.", "cortiça portuguesa sustentável — moldados à mão, assinados e numerados."],
  // whyChoose body second line
  ["Apenas ofício lento, cortiça premium, e três décadas de prática que a península ibérica já conhece.", "Apenas uma prática lenta, cortiça premium, e três décadas de trabalho de atelier que a península ibérica já conhece."],
  // sustainability title
  ['title: "Ofício honesto,",', 'title: "Trabalho honesto,",'],
  // brandVideo eyebrow
  ['eyebrow: "Ver o Ofício",', 'eyebrow: "Dentro do Atelier",'],
  // treasures body
  ["às tendências. Artesanato lento, desenhado em Portugal", "às tendências. Feito lentamente, desenhado em Portugal"],
  // newsletter titleAccent
  ['titleAccent: "do ofício.",', 'titleAccent: "do atelier.",'],
  // whySildel stat label
  ['label: "Mestres artesãos"', 'label: "Escultores"'],
  // pillar 1 title + body
  ['title: "Ofício lento."', 'title: "O tempo do material."'],
  ["apenas tempo, atenção e o olhar do artesão.", "apenas tempo, atenção e o olhar do escultor."],
  // pillar 2 body
  ["uma tradição artesanal aperfeiçoada há séculos.", "uma tradição de atelier aperfeiçoada há séculos."],
  // pillar 3 body
  ["Cada peça leva a assinatura do artesão e o seu lugar na edição.", "Cada peça leva a assinatura do autor e o seu lugar na edição."],
]);

console.log("\n▶ src/content/our-story.en.ts");
sweep("src/content/our-story.en.ts", [
  ['title: "Slow craft, since the first oak."', 'title: "A slow practice, since the first oak."'],
  ["Sildel atelier interior at golden hour — Portuguese craft in warm light.", "Sildel atelier interior at golden hour — the atelier in warm light."],
  ["the hand of a craftsperson who learned this trade from their elders.", "the hand of a sculptor who learned this trade from their elders."],
  ["A Sildel artisan hand-sanding a cork sculpture at the workbench.", "A Sildel sculptor hand-sanding a cork sculpture at the workbench."],
  ["lives for two centuries or more. Our craft is built on this rhythm.", "lives for two centuries or more. Our practice is built on this rhythm."],
  ['title: "A craft passed by hand."', 'title: "A practice passed by hand."'],
  ['keywords: "cork harvester, descortiçador, hand harvesting, Portuguese craft"', 'keywords: "cork harvester, descortiçador, hand harvesting, Portuguese atelier"'],
  ["Only after this slow cure does the cork become what artisans call", "Only after this slow cure does the cork become what the atelier calls"],
  ['keywords: "amadia cork, cork curing, slow craft, natural material"', 'keywords: "amadia cork, cork curing, slow atelier, natural material"'],
  ["finished by a small team of artisans.", "finished by a small team of sculptors."],
  ['keywords: "Sildel atelier, Esmoriz Portugal, small-batch craft, slow production"', 'keywords: "Sildel atelier, Esmoriz Portugal, small-batch atelier, slow production"'],
  ["Our artisans follow the grain rather than fight it", "Our sculptors follow the grain rather than fight it"],
  ['keywords: "hand-finished cork, Portuguese craftsmanship, cork sculpture, hand tools"', 'keywords: "hand-finished cork, Portuguese atelier, cork sculpture, hand tools"'],
  ["Overhead view of the artisan workbench", "Overhead view of the atelier workbench"],
  ["each piece is oiled, signed by the artisan, and stamped", "each piece is oiled, signed by the sculptor, and stamped"],
  ["the cost of the forest, the craftsperson, or the object itself.", "the cost of the forest, the sculptor, or the object itself."],
  ['title: "The Craftsperson"', 'title: "The Sculptor"'],
  ["A small atelier of artisans, paid fairly", "A small atelier of sculptors, paid fairly"],
]);

console.log("\n▶ src/content/our-story.pt.ts");
sweep("src/content/our-story.pt.ts", [
  ['title: "Ofício lento, desde o primeiro sobreiro."', 'title: "Uma prática lenta, desde o primeiro sobreiro."'],
  ["Interior do atelier Sildel ao pôr-do-sol — ofício português em luz quente.", "Interior do atelier Sildel ao pôr-do-sol — o atelier em luz quente."],
  ["a mão de um artesão que aprendeu este ofício com os seus mais velhos.", "a mão de um escultor que aprendeu este ofício com os seus mais velhos."],
  ["Um artesão Sildel a lixar uma escultura em cortiça na bancada.", "Um escultor Sildel a lixar uma escultura em cortiça na bancada."],
  ["e vive dois séculos ou mais. O nosso ofício constrói-se sobre este ritmo.", "e vive dois séculos ou mais. A nossa prática constrói-se sobre este ritmo."],
  ['title: "Um ofício passado de mão em mão."', 'title: "Uma prática passada de mão em mão."'],
  ['keywords: "descortiçador, colheita manual, ofício português"', 'keywords: "descortiçador, colheita manual, prática portuguesa"'],
  ["o que os artesãos chamam &lsquo;amadia&rsquo;", "o que o atelier chama &lsquo;amadia&rsquo;"],
  ['keywords: "cortiça amadia, cura da cortiça, ofício lento, material natural"', 'keywords: "cortiça amadia, cura da cortiça, prática lenta, material natural"'],
  ["acabado por uma pequena equipa de artesãos.", "acabado por uma pequena equipa de escultores."],
  ["um punhado de artesãos, ferramentas manuais e um ritmo lento.", "um punhado de escultores, ferramentas manuais e um ritmo lento."],
  ['keywords: "atelier Sildel, Esmoriz Portugal, ofício em pequena escala, produção lenta"', 'keywords: "atelier Sildel, Esmoriz Portugal, atelier em pequena escala, produção lenta"'],
  ["Mãos de um artesão português a moldar uma escultura em cortiça sob luz de tungsténio.", "Mãos de um escultor português a moldar uma escultura em cortiça sob luz de tungsténio."],
  ["Os nossos artesãos seguem o grão em vez de o combater", "Os nossos escultores seguem o grão em vez de o combater"],
  ['keywords: "cortiça acabada à mão, ofício português, escultura em cortiça, ferramentas manuais"', 'keywords: "cortiça acabada à mão, atelier português, escultura em cortiça, ferramentas manuais"'],
  ["Vista superior da bancada do artesão — formões, grosas e peças em cortiça sob luz quente.", "Vista superior da bancada do atelier — formões, grosas e peças em cortiça sob luz quente."],
  ["cada peça é olificada, assinada pelo artesão e carimbada", "cada peça é olificada, assinada pelo autor e carimbada"],
  ["à custa da floresta, do artesão ou do próprio objecto.", "à custa da floresta, do escultor ou do próprio objecto."],
  ['title: "O Artesão"', 'title: "O Escultor"'],
  ["Um pequeno atelier de artesãos, justamente pagos", "Um pequeno atelier de escultores, justamente pagos"],
]);

console.log("\n▶ src/content/treasures.ts");
sweep("src/content/treasures.ts", [
  ["the signature of the artisan who finished it. None are reissued.", "the signature of the sculptor who finished it. None are reissued."],
  ['body: "The artisan\'s signature, on every piece."', 'body: "The sculptor\'s signature, on every piece."'],
  ["a assinatura do artesão que o acabou. Nenhum é reeditado.", "a assinatura do autor que o acabou. Nenhum é reeditado."],
  ['body: "A assinatura do artesão em cada peça."', 'body: "A assinatura do autor em cada peça."'],
]);

console.log("\n▶ src/content/product-extras.ts");
sweep("src/content/product-extras.ts", [
  ['"Signed and numbered by the artisan"', '"Signed and numbered by the sculptor"'],
  ["depois um único artesão molda, lixa e termina a peça", "depois um único escultor molda, lixa e termina a peça"],
  ["then a single artisan shapes, sands, and finishes the piece", "then a single sculptor shapes, sands, and finishes the piece"],
  ['"Assinada e numerada pelo artesão"', '"Assinada e numerada pelo autor"'],
]);

console.log("\n▶ src/content/blog.ts");
sweep("src/content/blog.ts", [
  // Tag type — drop "Craft"
  ['tag: "Atelier" | "Forest" | "Craft" | "Material" | "Collectors";', 'tag: "Atelier" | "Forest" | "Material" | "Collectors";'],
  // Post tag reassignment (post "Four marks")
  ['tag: "Craft",', 'tag: "Atelier",'],
  // Excerpts and body prose
  ["Why our craft moves at the speed of bark — and what that means for every piece that leaves the atelier.", "Why our practice moves at the speed of bark — and what that means for every piece that leaves the atelier."],
  ["Six artisans. Three rooms.", "Six sculptors. Three rooms."],
  ["By design. Six artisans work at three benches", "By design. Six sculptors work at three benches"],
  ["Each treasure is signed by the artisan who finished it and numbered within its edition.", "Each treasure is signed by the sculptor who finished it and numbered within its edition."],
  ["First, the artisan's signature in black ink", "First, the sculptor's signature in black ink"],
  ["The signature is a promise of craft. The number is a promise", "The signature is a promise of the hand that made it. The number is a promise"],
  ["Macro of an artisan pressing a hot brass numbering stamp", "Macro of a sculptor pressing a hot brass numbering stamp"],
]);

console.log("\n▶ src/content/partners.en.ts");
sweep("src/content/partners.en.ts", [
  ["Sildel crafts the festival's hand-sculpted cork trophy.", "Sildel sculpts the festival's hand-finished cork trophy."],
]);

console.log("\n▶ src/app/page.tsx");
sweep("src/app/page.tsx", [
  ["each treasure is finished by hand — slow craft, signed and numbered.", "each treasure is finished by hand — made slowly, signed and numbered."],
]);

console.log("\n▶ src/app/(marketing)/our-story/page.tsx");
sweep("src/app/(marketing)/our-story/page.tsx", [
  ["a Portuguese cork atelier in Esmoriz built on slow craft, sustainable harvest", "a Portuguese cork atelier in Esmoriz built on a slow practice, sustainable harvest"],
  ['"slow craft",', '"slow atelier work",'],
  ['"artesanato lento",', '"ritmo do material",'],
  ['"escultura cortiça artesanal",', '"escultura cortiça atelier",'],
  ["a Portuguese cork atelier built on slow craft and sustainable harvest.", "a Portuguese cork atelier built on a slow practice and sustainable harvest."],
]);

console.log("\n▶ src/app/(marketing)/contact/page.tsx");
sweep("src/app/(marketing)/contact/page.tsx", [
  ["Portuguese cork piece designed and crafted at the Sildel atelier", "Portuguese cork piece designed and shaped at the Sildel atelier"],
]);

console.log("\n▶ src/app/(marketing)/blog/page.tsx");
sweep("src/app/(marketing)/blog/page.tsx", [
  ["the slow craft behind every treasure.", "the slow atelier work behind every treasure."],
  ['"cork craftsmanship",', '"cork atelier",'],
  ['"artesanato cortiça",', '"atelier cortiça",'],
]);

console.log("\n▶ src/app/(marketing)/blog/[slug]/page.tsx");
sweep("src/app/(marketing)/blog/[slug]/page.tsx", [
  ['"cork craftsmanship",', '"cork atelier",'],
  ['"artesanato cortiça",', '"atelier cortiça",'],
]);

console.log(`\n✓ Total replacements: ${totalChanges}`);