# Sildel — cPanel deploy guide

Updated 2026-06-21. Stack: Next.js 16 (App Router, ISR) + Prisma 6 + MySQL.

## 1. cPanel side (one-time)

1. **Node.js App** — cPanel home → *Setup Node.js App* → **Create application**
   - Node.js version: **20.x** (16 minimum; 20 LTS recommended)
   - Application mode: **Production**
   - Application root: e.g. `sildel`
   - Application URL: your domain or subdomain
   - Application startup file: `node_modules/next/dist/bin/next` (entry written below)
   - Save. cPanel creates a `passenger_wsgi`-style wrapper under the hood.

2. **MySQL Database** — cPanel home → *MySQL Databases*
   - Create DB, e.g. `cpaneluser_sildel`
   - Create user, e.g. `cpaneluser_sildel` (cPanel often forces the `cpaneluser_` prefix on both — that's fine)
   - Add user → database with **ALL PRIVILEGES**
   - Note hostname (usually `localhost`), port `3306`, db, user, password

3. **SSH / Terminal access** (Hostinger, SiteGround, A2 all enable this by default; some shared plans require a ticket).

## 2. Upload the code

Two equivalent paths:

- **Git deploy** (preferred): cPanel home → *Git Version Control* → clone `https://github.com/Muhammadasif-alt/sildel.git` into the Application root → set up an Auto-Deploy hook.
- **ZIP upload**: zip the local repo (exclude `node_modules`, `.next`, `.git`, `.env.local`), upload via File Manager, extract into the app root.

After upload:

```bash
cd ~/sildel        # the app root
npm install --production=false   # need devDeps so prisma+tsx work for the seed
```

`postinstall` runs `prisma generate` automatically (wired in `package.json`).

## 3. Environment variables

In the cPanel Node.js App panel, scroll to **Environment Variables** and add:

| Variable | Value |
|---|---|
| `DATABASE_URL` | `mysql://USER:PASS@localhost:3306/DBNAME` — URL-encode the password if it has special characters. |
| `ADMIN_EMAIL` | the founder login email |
| `ADMIN_PASSWORD` | strong password |
| `ADMIN_SESSION_SECRET` | 48 random hex bytes (`openssl rand -hex 48`) |
| `SILDEL_SESSION_SECRET` | 48 random hex bytes |
| `NODE_ENV` | `production` |

Click **Save** after adding all of them.

## 4. Migrate + seed the database

From the SSH terminal in the app root:

```bash
# Apply schema to the cPanel MySQL DB
npx prisma migrate deploy

# Optional one-off: copy the static product + blog seed into MySQL
#   (skip if you'll add everything fresh via /admin)
DATABASE_URL="$(grep DATABASE_URL .env | cut -d= -f2- | tr -d '\"')" \
  npx tsx scripts/db-seed.ts
```

`migrate deploy` (not `migrate dev`) is the production command — it just applies whatever's in `prisma/migrations/` and never tries to write back to schema.

## 5. Build + start

```bash
npm run build      # runs `prisma generate` then `next build`
```

In the cPanel Node.js App panel, set **Application startup file** to:

```
node_modules/next/dist/bin/next
```

…and pass `start` as the argument (cPanel exposes a *Run JS script* field; otherwise add a tiny `server.js`):

```js
// server.js — only needed if cPanel Passenger can't pass `start` directly
require("next/dist/bin/next");
```

Then click **Restart**.

## 6. Verify

- Public site: `https://yourdomain.tld/` — should load the home page.
- Catalogue: `https://yourdomain.tld/treasures` — should list all seeded products.
- Admin: `https://yourdomain.tld/admin/login` — log in with `ADMIN_EMAIL` / `ADMIN_PASSWORD`.
- After editing a product or blog in /admin, the public listing updates within the 1-hour ISR window (or instantly because each admin save calls `revalidatePath`).

## 7. Day-to-day ops

- **Add a product** → `/admin/products/new`
- **Edit/delete a product or change its images** → `/admin/products/<slug>`
- **Add a blog post** → `/admin/blogs/new`
- **Upload images** → `/admin/media` (files land in `/public/uploads/YYYY/MM/`)

Nothing else needs admin attention — editorial pages (`/contact`, `/our-story`, `/you-think-cork`, `/partners`, etc.) are driven from static TS files under `src/content/` and require a code change + redeploy.

## 8. Updating after a code change

```bash
cd ~/sildel
git pull
npm install --production=false
npx prisma migrate deploy    # only if schema changed
npm run build
# In cPanel: Node.js App -> Restart
```

## 9. Troubleshooting

| Symptom | Fix |
|---|---|
| `PrismaClientInitializationError: Can't reach database server` | Wrong `DATABASE_URL` or DB user lacks privileges. Re-check cPanel MySQL Databases. |
| `EACCES /home/.../public/uploads` | `chmod 755 public/uploads` (cPanel sometimes drops perms after a Git pull). |
| Admin login redirects to itself | `ADMIN_SESSION_SECRET` missing or shorter than 32 chars. Regenerate, restart app. |
| Public pages still show old content | Wait for ISR (1h) or hit `/admin/products` and save any product — `revalidatePath` clears the cache. |
| `Error: querySrv ENOTFOUND` | Old `MONGODB_URI` env var still set — delete it from cPanel's Environment Variables panel. We no longer use Mongo. |