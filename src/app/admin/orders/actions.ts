"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/admin";
import { connectDb } from "@/lib/db/connect";
import { OrderModel, ORDER_STATUSES } from "@/lib/models/order.model";

export async function updateOrderStatusAction(orderNumber: string, status: string) {
  await requireAdmin();
  if (!ORDER_STATUSES.includes(status as (typeof ORDER_STATUSES)[number])) {
    throw new Error("Invalid status");
  }
  await connectDb();
  await OrderModel.findOneAndUpdate({ orderNumber }, { status });
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderNumber}`);
  revalidatePath("/admin");
}
