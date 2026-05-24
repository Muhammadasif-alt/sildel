"use client";

import { useTransition } from "react";
import { ORDER_STATUSES } from "@/lib/models/constants";
import { updateOrderStatusAction } from "@/app/admin/orders/actions";

export function OrderStatusSelect({
  orderNumber,
  current,
}: {
  orderNumber: string;
  current: string;
}) {
  const [pending, start] = useTransition();

  function onChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const next = e.target.value;
    if (next === current) return;
    start(async () => {
      await updateOrderStatusAction(orderNumber, next);
    });
  }

  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-neutral-500">
        Status
      </span>
      <select
        defaultValue={current}
        onChange={onChange}
        disabled={pending}
        className="rounded-md border border-neutral-800 bg-neutral-950 px-4 py-2.5 text-sm uppercase tracking-[0.18em] text-neutral-100 outline-none focus:border-amber-500/60 focus:ring-2 focus:ring-amber-500/20 disabled:opacity-60"
      >
        {ORDER_STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </label>
  );
}
