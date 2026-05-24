import { connectDb } from "@/lib/db/connect";
import { SubscriberModel } from "@/lib/models/subscriber.model";

export default async function AdminSubscribersPage() {
  await connectDb();
  const subscribers = await SubscriberModel.find().sort({ createdAt: -1 }).lean();

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-foreground md:text-4xl">Newsletter</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {subscribers.length}{" "}
          {subscribers.length === 1 ? "subscriber" : "subscribers"}.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        {subscribers.length === 0 ? (
          <p className="px-6 py-16 text-center text-sm text-muted-foreground">
            No subscribers yet — they'll appear here as people sign up.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/40 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Source</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscribers.map((s) => (
                <tr key={String(s._id)} className="hover:bg-accent/40">
                  <td className="px-6 py-4 text-foreground">{s.email}</td>
                  <td className="px-6 py-4 text-muted-foreground">{s.source}</td>
                  <td className="px-6 py-4">
                    <span
                      className={
                        "rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ring-1 " +
                        (s.active
                          ? "bg-emerald-500/10 text-emerald-700 ring-emerald-500/30 dark:text-emerald-300"
                          : "bg-muted text-muted-foreground ring-border")
                      }
                    >
                      {s.active ? "Active" : "Unsubscribed"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-muted-foreground">
                    {s.createdAt ? new Date(s.createdAt).toLocaleString() : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}