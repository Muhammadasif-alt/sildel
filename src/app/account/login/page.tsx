import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getUserSession } from "@/lib/auth/user";
import { loginAction } from "@/app/account/actions";
import { AuthForm } from "@/components/account/auth-form";

export const metadata = buildMetadata({
  title: "Sign in",
  description: "Sign in to your Sildel collector account.",
  path: "/account/login",
  noIndex: true,
});

export default async function LoginPage() {
  const session = await getUserSession();
  if (session) redirect("/account");

  return (
    <main className="relative flex flex-1">
      <div className="mx-auto grid w-full max-w-[1480px] grid-cols-1 lg:grid-cols-2">
        {/* Left — atmospheric image */}
        <aside className="relative hidden lg:block">
          <div className="sticky top-0 h-screen">
            <Image
              src="/products/ECLIPSE_Fundo_BRANCO_silver_Candeeiro-02_MV_0337_1-e925f86f8b.webp"
              alt="A Sildel cork treasure under warm light."
              fill
              priority
              sizes="50vw"
              className="object-cover"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-tr from-foreground/60 via-foreground/10 to-transparent"
            />
            <div className="absolute bottom-12 left-12 right-12 text-background">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-primary">
                A space for collectors
              </p>
              <h2 className="font-serif text-4xl font-light leading-tight lg:text-5xl">
                Welcome back to the atelier.
              </h2>
            </div>
          </div>
        </aside>

        {/* Right — form */}
        <section className="flex items-center justify-center px-6 py-16 lg:px-12 lg:py-20">
          <div className="w-full max-w-md">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-primary">
              Sign in
            </p>
            <h1 className="font-serif text-4xl font-light leading-tight md:text-5xl">
              Step back in.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Access your order history, saved treasures, and atelier invitations.
            </p>

            <div className="my-8 h-px w-12 bg-primary/60" aria-hidden />

            <AuthForm mode="login" action={loginAction} />

            <p className="mt-8 text-sm text-muted-foreground">
              New to Sildel?{" "}
              <Link
                href="/account/register"
                className="font-medium text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary"
              >
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
