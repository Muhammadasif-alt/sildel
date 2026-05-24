import Link from "next/link";
import { Mail, ShoppingBag, Sparkles } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { requireUser } from "@/lib/auth/user";
import { connectDb } from "@/lib/db/connect";
import { OrderModel } from "@/lib/models/order.model";
import { logoutAction } from "@/app/account/actions";

export const metadata = buildMetadata({
  title: "Account",
  description: "Your Sildel collector account.",
  path: "/account",
  noIndex: true,
});

export default async function AccountPage() {
  const session = await requireUser();

  // Light-touch read — total orders for this user's email.
  await connectDb();
  const orderCount = await OrderModel.countDocuments({ email: session.email });

  return (
    <main className="flex flex-1 flex-col">
      <div className="mx-auto w-full max-w-[1480px] px-6 py-16 lg:px-12 lg:py-20">
        {/* Header */}
        <div className="mb-12 flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-end lg:mb-16">
          <div>
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-primary">
              Your account
            </p>
            <h1 className="font-serif text-4xl font-light leading-[1.05] md:text-5xl lg:text-6xl">
              Welcome,{" "}
              <span className="italic text-primary">
                {session.name.split(" ")[0]}
              </span>
              .
            </h1>
            <p className="mt-3 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-3.5 w-3.5 text-primary" aria-hidden />
              {session.email}
            </p>
          </div>

          <form action={logoutAction}>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-sm border border-border bg-card px-6 py-3 text-xs font-medium uppercase tracking-[0.3em] text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Sign out
            </button>
          </form>
        </div>

        {/* Dashboard cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <DashCard
            eyebrow="Orders"
            title={`${orderCount} treasure${orderCount === 1 ? "" : "s"}`}
            body="Your full order history is on its way. For now, here's the count."
            icon={<ShoppingBag className="h-5 w-5" />}
          />
          <DashCard
            eyebrow="Saved"
            title="Coming soon"
            body="A private edit of treasures you've saved — launching with the next release."
            icon={<Sparkles className="h-5 w-5" />}
          />
          <DashCard
            eyebrow="Atelier"
            title="By invitation"
            body="Visits to our Esmoriz atelier open to collectors twice a year."
            icon={<Mail className="h-5 w-5" />}
          />
        </div>

        {/* CTA strip */}
        <div className="mt-14 flex flex-col items-start justify-between gap-6 rounded-sm border border-border bg-card p-8 md:flex-row md:items-center lg:mt-20 lg:p-10">
          <div>
            <h2 className="font-serif text-2xl font-light md:text-3xl">
              Continue collecting.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              New pieces leave the atelier every season — signed, numbered, never reissued.
            </p>
          </div>
          <Link
            href="/treasures"
            className="inline-flex items-center justify-center rounded-sm bg-primary px-7 py-4 text-xs font-medium uppercase tracking-[0.35em] text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            See treasures
          </Link>
        </div>
      </div>
    </main>
  );
}

function DashCard({
  eyebrow,
  title,
  body,
  icon,
}: {
  eyebrow: string;
  title: string;
  body: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="group relative flex flex-col gap-4 overflow-hidden rounded-sm border border-border bg-card p-6 transition-all duration-300 hover:border-primary/60 hover:shadow-lg hover:shadow-foreground/5 lg:p-8">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/5 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {icon}
      </span>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {eyebrow}
        </p>
        <h3 className="mt-1 font-serif text-2xl font-light text-foreground">
          {title}
        </h3>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>
    </article>
  );
}
