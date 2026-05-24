import Link from "next/link";
import { Package, ShoppingBag, Clock, Mail, ArrowUpRight } from "lucide-react";
import { connectDb } from "@/lib/db/connect";
import { ProductModel } from "@/lib/models/product.model";
import { OrderModel, type LeanOrder } from "@/lib/models/order.model";
import { SubscriberModel } from "@/lib/models/subscriber.model";
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

export default async function AdminDashboardPage() {
  await connectDb();

  const [productCount, orderCount, pendingCount, subscriberCount, recentOrders] =
    await Promise.all([
      ProductModel.countDocuments(),
      OrderModel.countDocuments(),
      OrderModel.countDocuments({ status: "pending" }),
      SubscriberModel.countDocuments({ active: true }),
      OrderModel.find().sort({ createdAt: -1 }).limit(6).lean<LeanOrder[]>(),
    ]);

  const stats = [
    { label: "Products", value: productCount, icon: Package, href: "/admin/products" },
    { label: "Total orders", value: orderCount, icon: ShoppingBag, href: "/admin/orders" },
    { label: "Pending orders", value: pendingCount, icon: Clock, href: "/admin/orders?status=pending" },
    { label: "Subscribers", value: subscriberCount, icon: Mail, href: "/admin/subscribers" },
  ];

  return (
    <div>
      <header className="mb-10">
        <h1 className="font-serif text-3xl text-foreground md:text-4xl">Dashboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A snapshot of the Sildel shop right now.
        </p>
      </header>

      {/* Stat cards */}
      <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.label}
              href={s.href}
              className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/40"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
                  strokeWidth={1.6}
                />
              </div>
              <p className="text-3xl font-light tabular-nums text-foreground">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.22em] text-muted-foreground">
                {s.label}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Recent orders */}
      <section className="rounded-2xl border border-border bg-card">
        <header className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-serif text-xl text-foreground">Recent orders</h2>
          <Link
            href="/admin/orders"
            className="text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary"
          >
            View all →
          </Link>
        </header>

        {recentOrders.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-muted-foreground">
            No orders yet — they'll appear here when a customer checks out.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/40 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 font-medium">Order #</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Total</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Placed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentOrders.map((o) => (
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
      </section>
    </div>
  );
}
