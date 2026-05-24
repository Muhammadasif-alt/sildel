import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Award, MapPin, ShieldCheck } from "lucide-react";
import { buildMetadata } from "@/lib/seo";
import { getUserSession } from "@/lib/auth/user";
import { registerAction } from "@/app/account/actions";
import { AuthForm } from "@/components/account/auth-form";

export const metadata = buildMetadata({
  title: "Create account",
  description: "Join Sildel — collector account, order history, atelier invitations.",
  path: "/account/register",
  noIndex: true,
});

const PERKS = [
  {
    icon: Award,
    label: "Order history & signed-piece certificates",
  },
  {
    icon: MapPin,
    label: "Atelier visit invitations in Esmoriz, Portugal",
  },
  {
    icon: ShieldCheck,
    label: "First access to limited editions",
  },
];

export default async function RegisterPage() {
  const session = await getUserSession();
  if (session) redirect("/account");

  return (
    <main className="relative flex flex-1">
      <div className="mx-auto grid w-full max-w-[1480px] grid-cols-1 lg:grid-cols-2">
        {/* Left — atmospheric image + perks */}
        <aside className="relative hidden lg:block">
          <div className="sticky top-0 h-screen">
            <Image
              src="/Slidel/Nano Banana 2 - A single sculptural cork art piece displayed on a marble pedestal in a minimalist bl_1.webp"
              alt="A Sildel cork piece on a marble pedestal."
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-tr from-foreground/70 via-foreground/20 to-transparent"
            />
            <div className="absolute bottom-12 left-12 right-12 text-background">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-primary">
                A space for collectors
              </p>
              <h2 className="font-serif text-4xl font-light leading-tight lg:text-5xl">
                Join the collectors of cork.
              </h2>
              <ul className="mt-8 space-y-4">
                {PERKS.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-start gap-3 text-sm text-background/85">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Right — form */}
        <section className="flex items-center justify-center px-6 py-16 lg:px-12 lg:py-20">
          <div className="w-full max-w-md">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-primary">
              Create account
            </p>
            <h1 className="font-serif text-4xl font-light leading-tight md:text-5xl">
              Begin your collection.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              One quiet account — built around the pieces you keep.
            </p>

            <div className="my-8 h-px w-12 bg-primary/60" aria-hidden />

            <AuthForm mode="register" action={registerAction} />

            <p className="mt-8 text-sm text-muted-foreground">
              Already a collector?{" "}
              <Link
                href="/account/login"
                className="font-medium text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
              >
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
