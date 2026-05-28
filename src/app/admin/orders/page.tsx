import Link from "next/link";
import { connectDb } from "@/lib/db/connect";
import { OrderModel, ORDER_STATUSES, type LeanOrder } from "@/lib/models/order.model";
import { formatPrice } from "@/content/treasures";

function statusBadge(status: string) {
  const map: Record<string, string> = {
    pending: "bg-amber-500/10 text-amber-700 ring-amber-500/30 dark:text-amber-300",
    paid: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/30 dark:text-emerald-300",
    preparing: "bg-sky-500/10 text-sky-700 ring-sky-500/30 dark:text-sky-300",
    shipped: "bg-indigo-500/10 text-indigo-700 ring-indigo-500/30 dark:text-indigo-300",
    delivered: "bg-muted text-muted-foreground ring-border",
    cancelled: "bg-red-500/10 text-red-700 ring-red-500/30 dark:text-red-300",
  };
  return map[status] ?? "bg-muted text-muted-foreground ring-border";
}

type SearchParams = { status?: string };

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { status } = await searchParams;
  await connectDb();

  const filter: Record<string, unknown> = {};
  if (status && ORDER_STATUSES.includes(status as (typeof ORDER_STATUSES)[number])) {
    filter.status = status;
  }
  const orders = await OrderModel.find(filter)
    .sort({ createdAt: -1 })
    .lean<LeanOrder[]>();

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-serif text-3xl text-foreground md:text-4xl">Orders</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {orders.length} {orders.length === 1 ? "order" : "orders"}
          {status ? ` · filtered by ${status}` : ""}.
        </p>
      </header>

      {/* Status filter pills */}
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Link
          href="/admin/orders"
          className={
            "rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] ring-1 transition-colors " +
            (!status
              ? "bg-primary/10 text-primary ring-primary/30"
              : "text-muted-foreground ring-border hover:text-foreground hover:ring-primary/40")
          }
        >
          All
        </Link>
        {ORDER_STATUSES.map((s) => (
          <Link
            key={s}
            href={`/admin/orders?status=${s}`}
            className={
              "rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] ring-1 transition-colors " +
              (status === s
                ? statusBadge(s)
                : "text-muted-foreground ring-border hover:text-foreground hover:ring-primary/40")
            }
          >
            {s}
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-none border border-border bg-card">
        {orders.length === 0 ? (
          <p className="px-6 py-16 text-center text-sm text-muted-foreground">
            No orders match this filter.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/40 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 font-medium">Order #</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Items</th>
                  <th className="px-6 py-3 font-medium">Total</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Placed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {orders.map((o) => (
                  <tr key={String(o._id)} className="hover:bg-accent/40">
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/orders/${o.orderNumber}`}
                        className="font-mono text-primary hover:underline"
                      >
                        {o.orderNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-foreground">
                      {o.customer.firstName} {o.customer.lastName}
                      <div className="text-xs text-muted-foreground">{o.email}</div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {o.items.reduce((n, it) => n + it.quantity, 0)}
                    </td>
                    <td className="px-6 py-4 tabular-nums text-foreground">
                      {formatPrice(o.totalCents)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={
                          "rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] ring-1 " +
                          statusBadge(o.status)
                        }
                      >
                        {o.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-muted-foreground">
                      {o.createdAt ? new Date(o.createdAt).toLocaleString() : "—"}
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