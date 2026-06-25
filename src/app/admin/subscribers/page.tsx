import { prisma } from "@/lib/db/prisma";

export const dynamic = "force-dynamic";

export default async function AdminSubscribersPage() {
  let subscribers: Awaited<ReturnType<typeof prisma.subscriber.findMany>> = [];
  try {
    subscribers = await prisma.subscriber.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch {
    // DB unreachable — render empty state.
  }

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-serif text-2xl text-foreground sm:text-3xl md:text-4xl">Newsletter</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {subscribers.length} {subscribers.length === 1 ? "subscriber" : "subscribers"}.
        </p>
      </header>

      <div className="overflow-hidden rounded-none border border-border bg-card">
        {subscribers.length === 0 ? (
          <p className="px-6 py-16 text-center text-sm text-muted-foreground">
            No subscribers yet — they&apos;ll appear here as people sign up.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-muted/40 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Source</th>
                  <th className="px-6 py-3 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {subscribers.map((s) => (
                  <tr key={s.id} className="hover:bg-accent/40">
                    <td className="px-6 py-4 text-foreground">{s.email}</td>
                    <td className="px-6 py-4 text-muted-foreground">{s.source}</td>
                    <td className="px-6 py-4 text-xs text-muted-foreground">
                      {s.createdAt.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}