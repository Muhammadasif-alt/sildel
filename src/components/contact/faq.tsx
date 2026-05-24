import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "How long until I receive a reply?",
    a: "Each enquiry is read by the atelier — usually Isabel or her assistant. We reply within two working days. For urgent matters, the phone line is the fastest route.",
  },
  {
    q: "Can I commission a custom piece?",
    a: "Yes. Commissions are accepted on a small, considered basis. Tell us about the room, the materials you live with, and the silhouette you have in mind. The atelier will respond with a sketch, a price range, and a realistic timeline.",
  },
  {
    q: "Is the atelier open for visits?",
    a: "By appointment only. We host collectors and press twice a year at our Esmoriz studio. Use the form (topic: Visit the atelier) and we'll send the next available dates.",
  },
  {
    q: "Do you ship worldwide?",
    a: "Yes. Every Sildel treasure ships from Portugal with full insurance and tracked delivery. Europe: 4–7 working days. Rest of world: 7–12 working days.",
  },
  {
    q: "What if my piece arrives damaged?",
    a: "Tell us within 7 days. Each piece is hand-packed in a custom wooden crate and insured end-to-end. We replace or repair at our cost, and we collect from your address.",
  },
  {
    q: "Are pieces ever reissued?",
    a: "No. Each Sildel treasure is numbered within its edition and the run closes when the edition closes. The number you receive is the only one of its kind.",
  },
];

export function FAQ() {
  return (
    <ul className="space-y-3">
      {FAQS.map((item, i) => (
        <li key={item.q}>
          <details
            className="group rounded-sm border border-border bg-card transition-colors hover:border-primary/40 open:border-primary/60 open:shadow-lg open:shadow-foreground/5"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 p-6 lg:p-7">
              <div className="flex items-start gap-4">
                <span className="font-serif text-2xl font-light text-primary/40 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-lg font-light leading-snug text-foreground md:text-xl">
                  {item.q}
                </span>
              </div>
              <span
                aria-hidden
                className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-primary transition-transform duration-300 group-open:rotate-45 group-open:border-primary group-open:bg-primary group-open:text-primary-foreground"
              >
                <Plus className="h-4 w-4" strokeWidth={1.5} />
              </span>
            </summary>
            <div className="px-6 pb-7 pl-[3.75rem] lg:px-7 lg:pl-[4rem]">
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {item.a}
              </p>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
