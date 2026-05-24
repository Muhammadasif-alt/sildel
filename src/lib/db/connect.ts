/**
 * MongoDB connection — cached for Next.js dev hot-reload.
 *
 * Next.js dev mode hot-reloads files, which would create a new connection on
 * every reload and quickly exhaust the connection pool. We stash the live
 * connection on `globalThis` so subsequent calls reuse it.
 *
 * Usage in a route handler:
 *
 *   import { connectDb } from "@/lib/db/connect";
 *   await connectDb();
 *   const docs = await SomeModel.find().lean();
 */
import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var __sildelMongoose: MongooseCache | undefined;
}

const cached: MongooseCache =
  globalThis.__sildelMongoose ?? { conn: null, promise: null };

if (!globalThis.__sildelMongoose) {
  globalThis.__sildelMongoose = cached;
}

export async function connectDb(): Promise<typeof mongoose> {
  // Read lazily so tsx scripts that load dotenv before calling connectDb()
  // see the value — ES module imports are hoisted, so reading at module top
  // would fire before dotenv populates process.env.
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error(
      "MONGODB_URI is not set. Copy .env.local.example to .env.local and fill it in."
    );
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 10_000,
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
