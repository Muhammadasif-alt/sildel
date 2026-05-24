/**
 * Block type registry — single source of truth for every section type the CMS
 * can render. Each entry declares the fields the admin editor exposes and the
 * shape the public renderer reads.
 *
 * To add a new block type:
 *   1. Add a `BlockTypeDef` to BLOCK_TYPES below.
 *   2. Add a matching render branch in `src/components/blocks/blocks-renderer.tsx`.
 */
import type { BlockTypeDef, FieldDef } from "./types";

const ctaFields: FieldDef[] = [
  { key: "ctaLabel", label: "Primary CTA label", type: "text", localized: true },
  { key: "ctaHref", label: "Primary CTA link", type: "url", hint: "e.g. /treasures or https://…" },
  { key: "ctaSecondaryLabel", label: "Secondary CTA label", type: "text", localized: true },
  { key: "ctaSecondaryHref", label: "Secondary CTA link", type: "url" },
];

export const BLOCK_TYPES: BlockTypeDef[] = [
  {
    type: "hero",
    label: "Hero",
    description: "Full-width hero with heading, copy, image and CTAs.",
    icon: "Sparkles",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true, hint: "Small label above heading" },
      { key: "heading", label: "Heading", type: "textarea", localized: true, hint: "One line per visual row" },
      { key: "subheading", label: "Subheading", type: "textarea", localized: true },
      { key: "image", label: "Background image", type: "image" },
      { key: "videoUrl", label: "Background video URL", type: "video", hint: "Optional — MP4 or YouTube" },
      ...ctaFields,
      {
        key: "layout",
        label: "Layout",
        type: "select",
        options: [
          { value: "center", label: "Centered" },
          { value: "left", label: "Image right / copy left" },
          { value: "right", label: "Image left / copy right" },
          { value: "fullbleed", label: "Full-bleed background" },
        ],
        defaultValue: "center",
      },
    ],
  },
  {
    type: "pageHeader",
    label: "Page header",
    description: "Compact page header with eyebrow + heading + intro.",
    icon: "Heading1",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "heading", label: "Heading", type: "textarea", localized: true },
      { key: "body", label: "Intro paragraph", type: "textarea", localized: true },
      { key: "image", label: "Optional banner image", type: "image" },
    ],
  },
  {
    type: "imageText",
    label: "Image + Text",
    description: "Side-by-side image and copy.",
    icon: "LayoutTemplate",
    fields: [
      { key: "image", label: "Image", type: "image" },
      {
        key: "side",
        label: "Image side",
        type: "select",
        options: [
          { value: "left", label: "Left" },
          { value: "right", label: "Right" },
        ],
        defaultValue: "left",
      },
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "heading", label: "Heading", type: "textarea", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      ...ctaFields.slice(0, 2),
    ],
  },
  {
    type: "richText",
    label: "Rich text",
    description: "Heading + paragraph block. Use blank lines for new paragraphs.",
    icon: "AlignLeft",
    fields: [
      { key: "heading", label: "Heading", type: "text", localized: true },
      { key: "body", label: "Body", type: "richText", localized: true, hint: "Blank line = new paragraph" },
      {
        key: "align",
        label: "Alignment",
        type: "select",
        options: [
          { value: "left", label: "Left" },
          { value: "center", label: "Center" },
        ],
        defaultValue: "left",
      },
    ],
  },
  {
    type: "stats",
    label: "Stats / Numbers",
    description: "Row of highlight numbers with labels.",
    icon: "BarChart3",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "heading", label: "Heading", type: "textarea", localized: true },
      {
        key: "items",
        label: "Stats",
        type: "repeater",
        itemLabel: "Stat",
        itemFields: [
          { key: "value", label: "Number / value", type: "text", hint: "e.g. 100%, 1856" },
          { key: "label", label: "Label", type: "text", localized: true },
          { key: "hint", label: "Sub-label", type: "text", localized: true },
        ],
      },
    ],
  },
  {
    type: "gallery",
    label: "Gallery",
    description: "Grid of images with captions.",
    icon: "Images",
    fields: [
      { key: "heading", label: "Heading", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      {
        key: "columns",
        label: "Columns",
        type: "select",
        options: [
          { value: "2", label: "2" },
          { value: "3", label: "3" },
          { value: "4", label: "4" },
        ],
        defaultValue: "3",
      },
      {
        key: "items",
        label: "Images",
        type: "repeater",
        itemLabel: "Image",
        itemFields: [
          { key: "image", label: "Image", type: "image" },
          { key: "caption", label: "Caption", type: "text", localized: true },
          { key: "alt", label: "Alt text", type: "text", localized: true },
        ],
      },
    ],
  },
  {
    type: "faq",
    label: "FAQ",
    description: "Collapsible question-and-answer list.",
    icon: "HelpCircle",
    fields: [
      { key: "heading", label: "Heading", type: "text", localized: true },
      { key: "body", label: "Intro paragraph", type: "textarea", localized: true },
      {
        key: "items",
        label: "Questions",
        type: "repeater",
        itemLabel: "Q&A",
        itemFields: [
          { key: "question", label: "Question", type: "text", localized: true },
          { key: "answer", label: "Answer", type: "textarea", localized: true },
        ],
      },
    ],
  },
  {
    type: "testimonials",
    label: "Testimonials",
    description: "Customer / press quotes.",
    icon: "Quote",
    fields: [
      { key: "heading", label: "Heading", type: "text", localized: true },
      {
        key: "items",
        label: "Quotes",
        type: "repeater",
        itemLabel: "Quote",
        itemFields: [
          { key: "quote", label: "Quote", type: "textarea", localized: true },
          { key: "author", label: "Author", type: "text" },
          { key: "role", label: "Role / source", type: "text", localized: true },
          { key: "avatar", label: "Avatar", type: "image" },
        ],
      },
    ],
  },
  {
    type: "videoEmbed",
    label: "Video",
    description: "Embedded video with optional heading and copy.",
    icon: "Video",
    fields: [
      { key: "heading", label: "Heading", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      { key: "videoUrl", label: "Video URL", type: "video", hint: "YouTube link or .mp4" },
      { key: "poster", label: "Poster image", type: "image" },
    ],
  },
  {
    type: "ctaBanner",
    label: "CTA Banner",
    description: "Wide call-to-action banner with background.",
    icon: "Megaphone",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "heading", label: "Heading", type: "textarea", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      { key: "image", label: "Background image", type: "image" },
      ...ctaFields,
    ],
  },
  {
    type: "processSteps",
    label: "Process steps",
    description: "Numbered steps with images and copy.",
    icon: "ListOrdered",
    fields: [
      { key: "heading", label: "Heading", type: "text", localized: true },
      { key: "body", label: "Intro paragraph", type: "textarea", localized: true },
      {
        key: "items",
        label: "Steps",
        type: "repeater",
        itemLabel: "Step",
        itemFields: [
          { key: "title", label: "Title", type: "text", localized: true },
          { key: "body", label: "Description", type: "textarea", localized: true },
          { key: "image", label: "Image", type: "image" },
        ],
      },
    ],
  },
  {
    type: "productShowcase",
    label: "Product showcase",
    description: "Pick products from the catalog to highlight.",
    icon: "Package",
    fields: [
      { key: "heading", label: "Heading", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      {
        key: "productSlugs",
        label: "Products",
        type: "products",
        hint: "Pick products by slug, comma-separated",
      },
      {
        key: "layout",
        label: "Layout",
        type: "select",
        options: [
          { value: "grid", label: "Grid" },
          { value: "carousel", label: "Carousel" },
        ],
        defaultValue: "grid",
      },
    ],
  },
  {
    type: "spacer",
    label: "Spacer",
    description: "Empty vertical space.",
    icon: "Minus",
    fields: [
      {
        key: "size",
        label: "Size",
        type: "select",
        options: [
          { value: "sm", label: "Small (40px)" },
          { value: "md", label: "Medium (80px)" },
          { value: "lg", label: "Large (160px)" },
          { value: "xl", label: "Extra large (240px)" },
        ],
        defaultValue: "md",
      },
    ],
  },
  {
    type: "customHtml",
    label: "Custom HTML",
    description: "Raw HTML escape hatch (advanced).",
    icon: "Code",
    fields: [
      { key: "html", label: "HTML", type: "richText", localized: true, hint: "Pasted HTML is rendered as-is" },
    ],
  },

  /* ------------------------------------------------------------------------
   * HOME PAGE PRESETS — keeps the existing custom designs while making every
   * piece of copy editable from the admin. One block type per visual section.
   * --------------------------------------------------------------------- */

  {
    type: "home.heroShop",
    label: "Home — Hero (product slider)",
    description: "Main landing hero with rotating product carousel.",
    icon: "Sparkles",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "titleLine1", label: "Title — line 1", type: "text", localized: true },
      { key: "titleLine2", label: "Title — line 2", type: "text", localized: true },
      { key: "titleLine3", label: "Title — line 3", type: "text", localized: true },
      { key: "description", label: "Description", type: "textarea", localized: true },
      { key: "ctaPrimary", label: "Primary CTA label", type: "text", localized: true },
      { key: "ctaSecondary", label: "Secondary CTA label", type: "text", localized: true },
      { key: "socialProof", label: "Social proof line", type: "text", localized: true },
      { key: "featuredLabel", label: "Featured badge label", type: "text", localized: true },
      { key: "stripLeft", label: "Bottom strip — left", type: "text", localized: true },
      { key: "stripMiddle", label: "Bottom strip — middle", type: "text", localized: true },
      { key: "stripRight", label: "Bottom strip — right", type: "text", localized: true },
    ],
  },
  {
    type: "home.shopCategories",
    label: "Home — Shop categories",
    description: "Four-category grid (Sculpture · Tables · Lighting · Fine Arts).",
    icon: "LayoutGrid",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      { key: "piecesSuffix", label: "Count suffix (e.g. 'pieces')", type: "text", localized: true },
      { key: "sculptureLabel", label: "Sculpture — label", type: "text", localized: true },
      { key: "sculptureTagline", label: "Sculpture — tagline", type: "text", localized: true },
      { key: "tablesLabel", label: "Tables — label", type: "text", localized: true },
      { key: "tablesTagline", label: "Tables — tagline", type: "text", localized: true },
      { key: "lightingLabel", label: "Lighting — label", type: "text", localized: true },
      { key: "lightingTagline", label: "Lighting — tagline", type: "text", localized: true },
      { key: "fineArtsLabel", label: "Fine Arts — label", type: "text", localized: true },
      { key: "fineArtsTagline", label: "Fine Arts — tagline", type: "text", localized: true },
    ],
  },
  {
    type: "home.featuredTreasures",
    label: "Home — Featured treasures",
    description: "Featured products carousel pulled from the catalog.",
    icon: "Star",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "viewAll", label: "View all link label", type: "text", localized: true },
      { key: "viewTreasure", label: "Item action label", type: "text", localized: true },
    ],
  },
  {
    type: "home.whySildel",
    label: "Home — Why Sildel",
    description: "Three pillars + four stat numbers.",
    icon: "Award",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      {
        key: "stats",
        label: "Stats",
        type: "repeater",
        itemLabel: "Stat",
        itemFields: [
          { key: "value", label: "Number", type: "number" },
          { key: "suffix", label: "Suffix (e.g. '+')", type: "text" },
          { key: "label", label: "Label", type: "text", localized: true },
        ],
      },
      {
        key: "pillars",
        label: "Pillars",
        type: "repeater",
        itemLabel: "Pillar",
        itemFields: [
          { key: "index", label: "Index (e.g. '01')", type: "text" },
          { key: "title", label: "Title", type: "text", localized: true },
          { key: "body", label: "Body", type: "textarea", localized: true },
        ],
      },
    ],
  },
  {
    type: "home.brandVideo",
    label: "Home — Brand video",
    description: "Cork-harvest brand film embed.",
    icon: "Video",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      { key: "youtubeId", label: "YouTube video ID", type: "text", hint: "e.g. U6N8YkiLSHY (just the ID)" },
      { key: "duration", label: "Duration label", type: "text", localized: true },
    ],
  },
  {
    type: "home.sustainability",
    label: "Home — Sustainability",
    description: "Three-step cork-harvest process + image.",
    icon: "Leaf",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      { key: "image", label: "Hero image", type: "image" },
      { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
      {
        key: "steps",
        label: "Steps",
        type: "repeater",
        itemLabel: "Step",
        itemFields: [
          { key: "number", label: "Number (e.g. '01')", type: "text" },
          { key: "title", label: "Title", type: "text", localized: true },
          { key: "body", label: "Body", type: "textarea", localized: true },
          { key: "image", label: "Image", type: "image" },
        ],
      },
      { key: "ctaLabel", label: "CTA label", type: "text", localized: true },
      { key: "ctaHref", label: "CTA link", type: "url" },
    ],
  },
  {
    type: "home.newsletter",
    label: "Home — Newsletter",
    description: "Email subscribe section with success/error copy.",
    icon: "Mail",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      { key: "placeholder", label: "Email field placeholder", type: "text", localized: true },
      { key: "cta", label: "Submit button label", type: "text", localized: true },
      { key: "loadingLabel", label: "Submitting label", type: "text", localized: true },
      { key: "successTitle", label: "Success — title", type: "text", localized: true },
      { key: "successBody", label: "Success — body", type: "textarea", localized: true },
      { key: "errorMessage", label: "Error message", type: "text", localized: true },
      { key: "privacyNote", label: "Privacy note", type: "text", localized: true },
    ],
  },

  /* ------------------------------------------------------------------------
   * OUR STORY PRESETS — 8 sections, all editable.
   * --------------------------------------------------------------------- */

  {
    type: "ourStory.hero",
    label: "Our Story — Hero",
    description: "Background image hero with eyebrow, title, intro.",
    icon: "Sparkles",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "textarea", localized: true },
      { key: "intro", label: "Intro paragraph", type: "textarea", localized: true },
      { key: "image", label: "Background image", type: "image" },
      { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
    ],
  },
  {
    type: "ourStory.origin",
    label: "Our Story — Origin",
    description: "Side image + two-paragraph editorial block with year badge.",
    icon: "BookOpen",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent (italic)", type: "text", localized: true },
      { key: "body", label: "Body (blank line = new paragraph)", type: "richText", localized: true },
      { key: "image", label: "Image", type: "image" },
      { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
      { key: "year", label: "Year badge label (e.g. Est. 2020)", type: "text", localized: true },
    ],
  },
  {
    type: "ourStory.symbol",
    label: "Our Story — Brand Symbol (Lynx)",
    description: "Iberian-lynx symbol section with editorial portrait + facts.",
    icon: "Star",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body (blank line = new paragraph)", type: "richText", localized: true },
      { key: "image", label: "Portrait image", type: "image" },
      { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
      {
        key: "facts",
        label: "Fact chips",
        type: "repeater",
        itemLabel: "Fact",
        itemFields: [
          { key: "value", label: "Value (e.g. ≤ 1,500)", type: "text" },
          { key: "label", label: "Label", type: "text", localized: true },
        ],
      },
    ],
  },
  {
    type: "ourStory.heritage",
    label: "Our Story — Heritage carousel",
    description: "Image-carousel section with synced editorial copy + fact cards.",
    icon: "Images",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Intro paragraph", type: "textarea", localized: true },
      {
        key: "slides",
        label: "Slides",
        type: "repeater",
        itemLabel: "Slide",
        itemFields: [
          { key: "image", label: "Image", type: "image" },
          { key: "alt", label: "Alt text", type: "text", localized: true },
          { key: "eyebrow", label: "Slide eyebrow", type: "text", localized: true },
          { key: "title", label: "Slide title", type: "text", localized: true },
          { key: "body", label: "Slide body", type: "textarea", localized: true },
          { key: "keywords", label: "Keywords (SEO)", type: "text" },
        ],
      },
      {
        key: "facts",
        label: "Fact cards",
        type: "repeater",
        itemLabel: "Fact",
        itemFields: [
          { key: "value", label: "Value", type: "text" },
          { key: "label", label: "Label", type: "text", localized: true },
        ],
      },
    ],
  },
  {
    type: "ourStory.atelier",
    label: "Our Story — Atelier carousel",
    description: "Atelier-tour carousel with 3 process step cards.",
    icon: "Hammer",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Intro paragraph", type: "textarea", localized: true },
      {
        key: "slides",
        label: "Slides",
        type: "repeater",
        itemLabel: "Slide",
        itemFields: [
          { key: "image", label: "Image", type: "image" },
          { key: "alt", label: "Alt text", type: "text", localized: true },
          { key: "eyebrow", label: "Slide eyebrow", type: "text", localized: true },
          { key: "title", label: "Slide title", type: "text", localized: true },
          { key: "body", label: "Slide body", type: "textarea", localized: true },
          { key: "keywords", label: "Keywords (SEO)", type: "text" },
        ],
      },
      {
        key: "steps",
        label: "Process steps",
        type: "repeater",
        itemLabel: "Step",
        itemFields: [
          { key: "number", label: "Number (e.g. 01)", type: "text" },
          { key: "title", label: "Title", type: "text", localized: true },
          { key: "body", label: "Description", type: "textarea", localized: true },
        ],
      },
    ],
  },
  {
    type: "ourStory.founder",
    label: "Our Story — Founder",
    description: "CEO portrait + pull-quote + body + signature.",
    icon: "User",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "pullQuote", label: "Pull quote", type: "textarea", localized: true },
      { key: "body", label: "Body (blank line = new paragraph)", type: "richText", localized: true },
      { key: "closing", label: "Closing line", type: "text", localized: true },
      { key: "image", label: "Portrait image", type: "image" },
      { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
      { key: "signatureName", label: "Signature — name", type: "text", localized: true },
      { key: "signatureRole", label: "Signature — role", type: "text", localized: true },
    ],
  },
  {
    type: "ourStory.values",
    label: "Our Story — Values",
    description: "Centered statement + 3 pillar cards + pull quote.",
    icon: "Award",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      {
        key: "pillars",
        label: "Pillars",
        type: "repeater",
        itemLabel: "Pillar",
        itemFields: [
          { key: "index", label: "Index (e.g. 01)", type: "text" },
          { key: "title", label: "Title", type: "text", localized: true },
          { key: "body", label: "Body", type: "textarea", localized: true },
        ],
      },
      { key: "quote", label: "Pull quote", type: "textarea", localized: true },
      { key: "quoteAuthor", label: "Quote author", type: "text", localized: true },
    ],
  },
  {
    type: "ourStory.cta",
    label: "Our Story — Closing CTA",
    description: "Two-destination CTA card grid + closing line.",
    icon: "Compass",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      {
        key: "destinations",
        label: "Destinations",
        type: "repeater",
        itemLabel: "Destination",
        itemFields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
          { key: "title", label: "Title", type: "text", localized: true },
          { key: "body", label: "Body", type: "textarea", localized: true },
          { key: "image", label: "Image", type: "image" },
          { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
          { key: "href", label: "Link", type: "url" },
          { key: "cta", label: "CTA label", type: "text", localized: true },
        ],
      },
      { key: "closingLine", label: "Closing line", type: "text", localized: true },
    ],
  },

  /* ------------------------------------------------------------------------
   * AUTHENTIC CORK PRESETS — 6 sections.
   * --------------------------------------------------------------------- */

  {
    type: "authenticCork.hero",
    label: "Authentic Cork — Hero",
    description: "Cork-bark macro hero with eyebrow/title/intro.",
    icon: "Sparkles",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent (italic)", type: "text", localized: true },
      { key: "intro", label: "Intro paragraph", type: "textarea", localized: true },
      { key: "image", label: "Background image", type: "image" },
      { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
    ],
  },
  {
    type: "authenticCork.whatIsCork",
    label: "Authentic Cork — What is cork",
    description: "Editorial copy + Ken Burns image + floating callout.",
    icon: "Leaf",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body (blank line = new paragraph)", type: "richText", localized: true },
      { key: "image", label: "Image", type: "image" },
      { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
      { key: "calloutLabel", label: "Callout — label", type: "text", localized: true },
      { key: "calloutValue", label: "Callout — value (e.g. 200 yrs)", type: "text", localized: true },
    ],
  },
  {
    type: "authenticCork.properties",
    label: "Authentic Cork — Properties",
    description: "Six cork-property cards in a grid.",
    icon: "ShieldCheck",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      {
        key: "items",
        label: "Properties",
        type: "repeater",
        itemLabel: "Property",
        itemFields: [
          { key: "title", label: "Title", type: "text", localized: true },
          { key: "body", label: "Body", type: "textarea", localized: true },
        ],
      },
    ],
  },
  {
    type: "authenticCork.harvest",
    label: "Authentic Cork — Harvest process",
    description: "Image carousel + 3 process step cards.",
    icon: "TreePine",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      {
        key: "images",
        label: "Carousel images",
        type: "repeater",
        itemLabel: "Image",
        itemFields: [
          { key: "image", label: "Image", type: "image" },
          { key: "alt", label: "Alt text", type: "text", localized: true },
        ],
      },
      {
        key: "steps",
        label: "Process steps",
        type: "repeater",
        itemLabel: "Step",
        itemFields: [
          { key: "number", label: "Number", type: "text" },
          { key: "title", label: "Title", type: "text", localized: true },
          { key: "body", label: "Body", type: "textarea", localized: true },
        ],
      },
    ],
  },
  {
    type: "authenticCork.inSildel",
    label: "Authentic Cork — Cork at Sildel",
    description: "Image + body + checklist of points.",
    icon: "CheckCircle2",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      { key: "image", label: "Image", type: "image" },
      { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
      {
        key: "points",
        label: "Checklist points",
        type: "repeater",
        itemLabel: "Point",
        itemFields: [{ key: "text", label: "Text", type: "text", localized: true }],
      },
    ],
  },
  {
    type: "authenticCork.cta",
    label: "Authentic Cork — Closing CTA",
    description: "Two-destination CTA grid.",
    icon: "Compass",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      {
        key: "destinations",
        label: "Destinations",
        type: "repeater",
        itemLabel: "Destination",
        itemFields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
          { key: "title", label: "Title", type: "text", localized: true },
          { key: "body", label: "Body", type: "textarea", localized: true },
          { key: "image", label: "Image", type: "image" },
          { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
          { key: "href", label: "Link", type: "url" },
          { key: "cta", label: "CTA label", type: "text", localized: true },
        ],
      },
      { key: "closingLine", label: "Closing line", type: "text", localized: true },
    ],
  },

  /* ------------------------------------------------------------------------
   * YOU THINK CORK PRESETS — 6 sections.
   * --------------------------------------------------------------------- */

  {
    type: "youThinkCork.hero",
    label: "You Think Cork — Hero",
    description: "Bold reframing hero with eyebrow/title/intro.",
    icon: "Sparkles",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent (italic)", type: "text", localized: true },
      { key: "intro", label: "Intro paragraph", type: "textarea", localized: true },
      { key: "image", label: "Background image", type: "image" },
      { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
    ],
  },
  {
    type: "youThinkCork.perception",
    label: "You Think Cork — Perception",
    description: "Three-stage progression cards (before / during / after).",
    icon: "Eye",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      {
        key: "cards",
        label: "Stage cards",
        type: "repeater",
        itemLabel: "Card",
        itemFields: [
          { key: "index", label: "Index", type: "text" },
          { key: "title", label: "Title", type: "text", localized: true },
          { key: "body", label: "Body", type: "textarea", localized: true },
          {
            key: "tone",
            label: "Tone",
            type: "select",
            options: [
              { value: "before", label: "Before" },
              { value: "during", label: "During" },
              { value: "after", label: "After" },
            ],
          },
        ],
      },
    ],
  },
  {
    type: "youThinkCork.manifesto",
    label: "You Think Cork — Manifesto",
    description: "Centered manifesto with lead, lines (one per line), closing.",
    icon: "Quote",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "image", label: "Image (optional, above the quote)", type: "image", hint: "Shown framed above the quote — leave empty to hide." },
      { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
      { key: "lead", label: "Lead line", type: "textarea", localized: true },
      { key: "lines", label: "Lines (one per line)", type: "textarea", localized: true, hint: "Each newline is a separate line" },
      { key: "closing", label: "Closing line", type: "textarea", localized: true },
      { key: "signature", label: "Signature", type: "text", localized: true },
    ],
  },
  {
    type: "youThinkCork.showcase",
    label: "You Think Cork — Showcase",
    description: "Six-piece asymmetric image grid with title/tagline.",
    icon: "LayoutGrid",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      {
        key: "items",
        label: "Showcase pieces",
        type: "repeater",
        itemLabel: "Piece",
        itemFields: [
          { key: "title", label: "Title", type: "text", localized: true },
          { key: "tagline", label: "Tagline", type: "text", localized: true },
          { key: "image", label: "Image", type: "image" },
        ],
      },
    ],
  },
  {
    type: "youThinkCork.possibilities",
    label: "You Think Cork — Possibilities",
    description: "Four directions cork can take (sculpture / furniture / etc).",
    icon: "Compass",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      {
        key: "items",
        label: "Directions",
        type: "repeater",
        itemLabel: "Direction",
        itemFields: [
          { key: "title", label: "Title", type: "text", localized: true },
          { key: "body", label: "Body", type: "textarea", localized: true },
          { key: "image", label: "Image", type: "image" },
        ],
      },
    ],
  },
  {
    type: "youThinkCork.cta",
    label: "You Think Cork — Closing CTA",
    description: "Two-destination CTA grid.",
    icon: "Compass",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      {
        key: "destinations",
        label: "Destinations",
        type: "repeater",
        itemLabel: "Destination",
        itemFields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
          { key: "title", label: "Title", type: "text", localized: true },
          { key: "body", label: "Body", type: "textarea", localized: true },
          { key: "image", label: "Image", type: "image" },
          { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
          { key: "href", label: "Link", type: "url" },
          { key: "cta", label: "CTA label", type: "text", localized: true },
        ],
      },
      { key: "closingLine", label: "Closing line", type: "text", localized: true },
    ],
  },

  /* ------------------------------------------------------------------------
   * TREASURES PRESETS — 5 sections.
   * --------------------------------------------------------------------- */

  {
    type: "treasures.hero",
    label: "Treasures — Hero",
    description: "Treasures collection hero with badge.",
    icon: "Sparkles",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "intro", label: "Intro paragraph", type: "textarea", localized: true },
      { key: "image", label: "Background image", type: "image" },
      { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
      { key: "badgeLabel", label: "Badge label", type: "text", localized: true },
      { key: "badgeValue", label: "Badge value", type: "text", localized: true },
    ],
  },
  {
    type: "treasures.productGrid",
    label: "Treasures — Product grid",
    description: "Live product grid with category tabs. Products come from catalog.",
    icon: "Package",
    fields: [
      { key: "eyebrow", label: "Section eyebrow", type: "text", localized: true },
      { key: "title", label: "Section title", type: "text", localized: true },
      { key: "titleAccent", label: "Section title — accent", type: "text", localized: true },
      { key: "body", label: "Section body", type: "textarea", localized: true },
      { key: "catEyebrow", label: "Category bar eyebrow", type: "text", localized: true },
      { key: "catTitle", label: "Category bar title", type: "text", localized: true },
      { key: "catTitleAccent", label: "Category bar — accent", type: "text", localized: true },
      {
        key: "categories",
        label: "Category tabs",
        type: "repeater",
        itemLabel: "Category",
        itemFields: [
          { key: "slug", label: "Slug (e.g. 'all', 'sculpture')", type: "text" },
          { key: "label", label: "Label", type: "text", localized: true },
        ],
      },
    ],
  },
  {
    type: "treasures.featured",
    label: "Treasures — Featured spotlight",
    description: "Featured-product spotlight with image, specs and CTA.",
    icon: "Star",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "label", label: "Badge label (e.g. Limited Edition)", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      { key: "image", label: "Image", type: "image" },
      { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
      {
        key: "specs",
        label: "Specs",
        type: "repeater",
        itemLabel: "Spec",
        itemFields: [
          { key: "label", label: "Label", type: "text", localized: true },
          { key: "value", label: "Value", type: "text", localized: true },
        ],
      },
      { key: "ctaLabel", label: "CTA label", type: "text", localized: true },
      { key: "ctaHref", label: "CTA link", type: "url" },
    ],
  },
  {
    type: "treasures.promise",
    label: "Treasures — Our Promise",
    description: "Four assurance cards (signed / numbered / made in PT / etc).",
    icon: "Award",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      {
        key: "items",
        label: "Promise cards",
        type: "repeater",
        itemLabel: "Promise",
        itemFields: [
          { key: "title", label: "Title", type: "text", localized: true },
          { key: "body", label: "Body", type: "textarea", localized: true },
        ],
      },
    ],
  },
  {
    type: "treasures.cta",
    label: "Treasures — Closing CTA",
    description: "Two-destination CTA grid.",
    icon: "Compass",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      {
        key: "destinations",
        label: "Destinations",
        type: "repeater",
        itemLabel: "Destination",
        itemFields: [
          { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
          { key: "title", label: "Title", type: "text", localized: true },
          { key: "body", label: "Body", type: "textarea", localized: true },
          { key: "image", label: "Image", type: "image" },
          { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
          { key: "href", label: "Link", type: "url" },
          { key: "cta", label: "CTA label", type: "text", localized: true },
        ],
      },
      { key: "closingLine", label: "Closing line", type: "text", localized: true },
    ],
  },

  /* ------------------------------------------------------------------------
   * BLOG (JOURNAL) PRESETS — 3 sections. Posts come from DB; only copy is CMS.
   * --------------------------------------------------------------------- */

  {
    type: "blog.hero",
    label: "Blog — Hero",
    description: "Journal page hero header.",
    icon: "BookOpen",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent (italic)", type: "text", localized: true },
      { key: "intro", label: "Intro paragraph", type: "textarea", localized: true },
    ],
  },
  {
    type: "blog.featured",
    label: "Blog — Featured post",
    description: "Featured post card. Auto-loads first/featured post from DB.",
    icon: "Star",
    fields: [
      { key: "eyebrow", label: "Side eyebrow (e.g. 'Latest letter')", type: "text", localized: true },
      { key: "featuredLabel", label: "Featured badge label", type: "text", localized: true },
      { key: "readLabel", label: "Read CTA label", type: "text", localized: true },
    ],
  },
  {
    type: "blog.grid",
    label: "Blog — Posts grid",
    description: "All-posts grid with subscribe link. Posts come from DB.",
    icon: "LayoutGrid",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Heading", type: "text", localized: true },
      { key: "subscribeLabel", label: "Subscribe link label", type: "text", localized: true },
      { key: "subscribeHref", label: "Subscribe link target", type: "url" },
    ],
  },

  /* ------------------------------------------------------------------------
   * CONTACT PRESETS — 4 sections.
   * --------------------------------------------------------------------- */

  {
    type: "contact.hero",
    label: "Contact — Hero",
    description: "Atelier-background hero with email + phone strip.",
    icon: "Mail",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent (italic)", type: "text", localized: true },
      { key: "intro", label: "Intro paragraph", type: "textarea", localized: true },
      { key: "badge", label: "Location badge (e.g. Esmoriz · Portugal)", type: "text", localized: true },
      { key: "image", label: "Background image", type: "image" },
      { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
    ],
  },
  {
    type: "contact.form",
    label: "Contact — Form + atelier card",
    description: "The contact form on the left, atelier info card on the right.",
    icon: "Send",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Heading", type: "textarea", localized: true },
      { key: "cardImage", label: "Atelier card — image", type: "image" },
      { key: "cardImageAlt", label: "Atelier card — image alt", type: "text", localized: true },
      { key: "cardEyebrow", label: "Atelier card — eyebrow", type: "text", localized: true },
      { key: "cardLocation", label: "Atelier card — location", type: "text", localized: true },
      { key: "emailLabel", label: "Email row label", type: "text", localized: true },
      { key: "phoneLabel", label: "Phone row label", type: "text", localized: true },
      { key: "phoneNote", label: "Phone row note", type: "text", localized: true },
      { key: "addressLabel", label: "Address row label", type: "text", localized: true },
      { key: "hoursLabel", label: "Hours row label", type: "text", localized: true },
      { key: "hoursValue", label: "Hours row value", type: "text", localized: true },
      { key: "hoursNote", label: "Hours row note", type: "text", localized: true },
    ],
  },
  {
    type: "contact.visit",
    label: "Contact — Visit the atelier",
    description: "Visit-by-appointment section with image, body and perks.",
    icon: "CalendarCheck",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent (italic)", type: "text", localized: true },
      { key: "body", label: "Body", type: "textarea", localized: true },
      { key: "image", label: "Image", type: "image" },
      { key: "imageAlt", label: "Image alt text", type: "text", localized: true },
      {
        key: "perks",
        label: "Perks",
        type: "repeater",
        itemLabel: "Perk",
        itemFields: [
          { key: "title", label: "Title", type: "text", localized: true },
          { key: "body", label: "Body", type: "text", localized: true },
        ],
      },
      { key: "ctaLabel", label: "CTA label", type: "text", localized: true },
      { key: "ctaHref", label: "CTA link target", type: "url" },
    ],
  },
  {
    type: "contact.faq",
    label: "Contact — FAQ",
    description: "Collapsible question-and-answer list.",
    icon: "HelpCircle",
    fields: [
      { key: "eyebrow", label: "Eyebrow", type: "text", localized: true },
      { key: "title", label: "Title", type: "text", localized: true },
      { key: "titleAccent", label: "Title — accent", type: "text", localized: true },
      { key: "intro", label: "Intro paragraph", type: "textarea", localized: true },
      { key: "emailCta", label: "Email CTA label", type: "text", localized: true },
      {
        key: "items",
        label: "Questions",
        type: "repeater",
        itemLabel: "Q&A",
        itemFields: [
          { key: "question", label: "Question", type: "text", localized: true },
          { key: "answer", label: "Answer", type: "textarea", localized: true },
        ],
      },
    ],
  },
];

export function findBlockType(type: string): BlockTypeDef | undefined {
  return BLOCK_TYPES.find((b) => b.type === type);
}

/** Build the default content map when a block is first added. */
export function defaultContentFor(type: string): Record<string, unknown> {
  const def = findBlockType(type);
  if (!def) return {};
  const out: Record<string, unknown> = {};
  for (const f of def.fields) {
    if (f.defaultValue !== undefined) out[f.key] = f.defaultValue;
    else if (f.type === "repeater") out[f.key] = [];
    else if (f.type === "boolean") out[f.key] = false;
    else if (f.localized) out[f.key] = { pt: "", en: "" };
    else out[f.key] = "";
  }
  return out;
}
