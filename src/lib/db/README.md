# `src/lib/db` — MongoDB connection

This folder owns the database connection. Models go in `src/lib/models/`.

## Setting up MongoDB

You have two choices:

### Option A — MongoDB Atlas (cloud, recommended for production)

1. Go to https://www.mongodb.com/cloud/atlas/register (free tier exists).
2. Create a project and a free cluster (M0).
3. In **Database Access** → create a user with read/write permissions.
4. In **Network Access** → allow your IP (or `0.0.0.0/0` for dev).
5. In **Database** → **Connect** → **Drivers** → copy the connection string.
   It looks like:
   ```
   mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Add database name `sildel` before the `?`:
   ```
   mongodb+srv://USER:PASS@cluster0.xxxxx.mongodb.net/sildel?retryWrites=true&w=majority
   ```

### Option B — Local MongoDB (for offline dev)

1. Install MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Start the service (default port 27017).
3. Use connection string:
   ```
   mongodb://127.0.0.1:27017/sildel
   ```

## Wiring it up

1. Copy `.env.local.example` (at the project root) to `.env.local`.
2. Paste your `MONGODB_URI` value.
3. Restart `npm run dev`.
4. Open http://localhost:3000/api/health — you should see
   `{ "status": "ok", "db": "connected" }`.

## How it works

`connect.ts` exports `connectDb()` which returns the live Mongoose connection.
The connection is cached on `globalThis` so Next.js dev hot-reload doesn't open
a new socket on every change.

Always call `await connectDb()` at the top of any route handler that uses a
model. It's a no-op after the first call per process.
