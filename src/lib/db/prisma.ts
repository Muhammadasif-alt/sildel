/**
 * Prisma client — cached on globalThis so Next.js dev hot-reload doesn't
 * keep spawning new clients (which would exhaust the MySQL connection
 * pool within a minute). Same trick as connect.ts uses for mongoose.
 *
 * Use anywhere on the server:
 *   import { prisma } from "@/lib/db/prisma";
 *   const products = await prisma.product.findMany();
 */
import { PrismaClient } from "@/generated/prisma";

declare global {
  // eslint-disable-next-line no-var
  var __sildelPrisma: PrismaClient | undefined;
}

export const prisma: PrismaClient =
  globalThis.__sildelPrisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__sildelPrisma = prisma;
}