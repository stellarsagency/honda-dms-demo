# Honda Multi-Branch DMS

A dealer management system for one Honda dealer group with a **3S** branch (Sales + Service + Spare Parts) and a **2S** branch (Service + Spare Parts), one admin account, branch-level isolation and consolidated reporting.

## What is in this folder

| File | Purpose |
|---|---|
| `BLUEPRINT.md` | Full product and technical blueprint: modules, features, roles, approval matrix, architecture, stack, hosting, roadmap, costs, risks |
| `schema.sql` | PostgreSQL 16 core schema: 60+ tables, indexes, views, triggers |
| `seed.sql` | Demo group, 3S + 2S branches, roles, document sequences, warehouses, permissions |
| `docker-compose.yml` | Local PostgreSQL + Redis + MinIO + MailHog + Adminer |
| `.env.example` | Environment variable template |

## Demo UI (no database required)

```bash
npm install
npm run dev
# open http://localhost:3000
```

Demo login: `admin@demohonda.pk` / `demo1234`

```bash
npm run build
```

## Quick start (database only)

```bash
# 1. Start local services
docker compose up -d

# 2. Create schema
docker compose exec -T db psql -U dms -d dms < schema.sql

# 3. Seed demo data
docker compose exec -T db psql -U dms -d dms < seed.sql

# 4. Open Adminer
# http://localhost:8080
# System: PostgreSQL, Server: db, User: dms, Password: dms, Database: dms
```

MinIO console: http://localhost:9001 (`minio` / `minio123`)  
MailHog inbox: http://localhost:8025

## Key design decisions

1. **One system, two branch types.** `branches.type = '3S' | '2S'`. The 2S branch simply has the Sales module disabled via feature flags.
2. **Shared customer/vehicle master, branch-scoped transactions.** Every job card, invoice, stock row and payment carries `branch_id`.
3. **No hard deletes.** Financial and job-card records are cancelled/amended with approval. `audit_log` is append-only.
4. **Price control.** `approval_rules` + `job_card_operations` / `job_card_parts` discount fields + `approved_by`/`approval_reason`.
5. **Leakage visibility.** `v_leakage_flags` surfaces discounts without approval, manual parts issues, closed jobs without invoices, and gate passes without payment.
6. **Document numbering** is concurrency-safe via `doc_sequences` and `next_doc_no(branch_id, doc_type)`.

## Next build step

The database is ready. The application scaffold is not generated yet. Recommended order:

1. Monorepo: `apps/web` (Next.js), `apps/api` (NestJS), `packages/db` (Prisma), `packages/ui`, `packages/shared`.
2. Auth + branches + RBAC + approval middleware.
3. Customer/vehicle master.
4. Parts master + stock + GRN + issue.
5. Job card + estimate + invoice + audit.
6. 2S feature flags + inter-branch transfer.
7. Corporate MOU/WO + receivables/reminders.
8. Sales module (3S only).

See `BLUEPRINT.md` section 10 for the full phase plan.

## Security notes

- Change all default passwords in `docker-compose.yml` before any shared/staging use.
- `.env` must never be committed; use `.env.example` as the template.
- Production: TLS everywhere, managed PostgreSQL with PITR, encrypted backups, Sentry, uptime monitoring.
- Run `schema.sql` only on a fresh database; it uses `create type` and will fail on re-run.

## Hosting (cheap + reliable)

Recommended for a private 2-branch deployment:

1. One VPS (Hetzner CX32 Singapore / DigitalOcean Bangalore 4GB) — ~$12–24/month.
2. Coolify or Docker Compose for web + API + PostgreSQL + Redis.
3. Cloudflare R2 for documents and encrypted database backups.
4. Cloudflare free plan for DNS, WAF and SSL.
5. Sentry free + Better Stack free for monitoring.

For client demos, deploy this UI to Vercel or GitHub Pages. GitHub Pages workflow is included in `.github/workflows/pages.yml`.

## Important

- `schema.sql` is a starting point, not a finished product. Business rules (approval limits, tax logic, warranty flow) must be implemented in the API service layer and covered by tests.
- Honda Atlas warranty/parts integration must be confirmed in discovery. If no API is available, use controlled CSV import/export.
