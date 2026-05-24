import { buildMetadata } from "@/lib/seo";
import { BlocksRenderer } from "@/components/blocks/blocks-renderer";

export const metadata = buildMetadata({
  title: "Journal — Notes from the Sildel Atelier in Portugal",
  description:
    "Notes from the Sildel atelier in Esmoriz, the cork forests of the Alentejo, and the slow craft behind every treasure. Essays on Portuguese cork, design, and sustainability.",
  path: "/blog",
  keywords: [
    // Content type
    "Sildel journal",
    "Sildel blog",
    "cork blog",
    "blog cortiça",
    "cork journal",
    "jornal cortiça",
    // Topics
    "cork stories",
    "histórias cortiça",
    "cork craftsmanship",
    "artesanato cortiça",
    "Portuguese design notes",
    "notas design Portugal",
    "atelier stories",
    "histórias atelier",
    "cork forest stories",
    "histórias floresta cortiça",
    // Editorial
    "luxury cork editorial",
    "design editorial cortiça",
    "Sildel Esmoriz",
  ],
});

export default function BlogPage() {
  return (
    <main className="flex flex-1 flex-col">
      <BlocksRenderer pageKey="blog" />
    </main>
  );
}