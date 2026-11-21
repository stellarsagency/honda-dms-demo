# Honda Multi-Branch DMS — Build Blueprint

**Version:** 1.0  
**Scope:** One dealer group, one **3S** branch (Sales + Service + Spare Parts) and one **2S** branch (Service + Spare Parts), one owner/admin account, branch-level isolation, consolidated reporting.

---

## 1. Product Principles

1. **One codebase, two branch types** — never build two separate systems. Use `branch.type = 3S | 2S` feature flags.
2. **Shared master, separate transactions** — customers and vehicles are shared across branches; stock, job cards, invoices and staff are branch-scoped.
3. **Vehicle history follows the car** — a car sold at the 3S branch must show its full service history at the 2S branch (VIN is the unique key).
4. **No hard deletes** — every financial or job-card record is cancelled/amended with approval, never deleted.
5. **Price control by default** — standard rate cards; service advisors cannot change rates or exceed discount limits; managers approve with a reason; everything is audited.
6. **Exception-driven leakage control** — daily reports for discounts, below-cost sales, manual parts issues, closed-without-invoice jobs, gate passes without payment.
7. **Web first, mobile ready** — responsive web app/PWA for advisors, technicians and managers; native app only in phase 2.
8. **API-first** — every module exposed through a documented REST API for WhatsApp, FBR, Honda and accounting integrations.
9. **Boring, proven technology** — PostgreSQL, TypeScript, Redis, S3-compatible storage. No microservices, no exotic databases.
10. **Local reality** — FBR tax invoices, WhatsApp-first communication, Urdu/English UI, unreliable internet tolerance (retry queues, offline-friendly forms).

---

## 2. Module & Feature Matrix

| Module | 3S | 2S | Notes |
|---|---|---|---|
| Group admin & dashboards | ✅ | ✅ | Admin sees both; branch manager sees own branch |
| Customer & vehicle master | ✅ | ✅ | Shared across branches |
| Sales / CRM / bookings | ✅ | ❌ | 2S has no new-car sales |
| Service / job cards | ✅ | ✅ | Same workflow, branch numbering |
| Parts & inventory | ✅ | ✅ | Inter-branch transfers supported |
| Corporate MOU / work orders | ✅ | ✅ | Work executed at either branch; billing branch-wise |
| Billing & receivables | ✅ | ✅ | Consolidated corporate statement at group level |
| Payment reminders | ✅ | ✅ | WhatsApp/SMS/email, aging-based |
| Reports & leakage control | ✅ | ✅ | Branch + consolidated |
| Integrations | ✅ | ✅ | Honda, FBR, WhatsApp, SMS, accounting |

### Detailed Features

#### 2.1 Platform & Administration
- Group → branches hierarchy; branch type 3S/2S/1S.
- User management, roles, permissions, branch assignment.
- Feature flags per branch (e.g. hide Sales for 2S).
- Document numbering per branch: `3S-JC-2026-000123`, `2S-INV-2026-000045`.
- Approval matrix configuration.
- Audit log (who, when, before/after, IP, device).
- Document vault (MOU, work order, signed job card, gate pass, delivery note).
- Notification templates (WhatsApp, SMS, email, in-app).
- Backup/restore status, integration health, job queue monitor.

#### 2.2 Customer & Vehicle Master
- Individual and corporate customers; CNIC/NTN, contacts, addresses, credit terms.
- Vehicle master: VIN/chassis, engine no., registration, make, model, variant, year, colour, warranty start/end, odometer.
- Ownership history and transfer.
- Full 360° history: sales, job cards, parts replaced, invoices, payments, feedback.
- Duplicate detection by phone, CNIC, VIN, registration.
- Merge duplicate customer/vehicle records (audited).

#### 2.3 Sales (3S only)
- Leads: source, interest, assignment, follow-ups, next-action reminders, lost reasons.
- Test drives: schedule, vehicle, feedback, odometer.
- Quotations with accessories, discounts, taxes, validity.
- Bookings, receipts, allotment, expected delivery.
- PDI checklist, delivery, registration, gate pass.
- Exchange/used-car evaluation.
- Sales targets and incentive calculation.
- Sales funnel and conversion reports.

#### 2.4 Service / Workshop
- Appointments and service reminders (due by date/kilometres).
- Job card lifecycle: `Draft → Open → Estimate Pending → Approved → In Progress → QC → Ready → Invoiced → Closed` (+ `Cancelled`).
- Pre-inspection checklist with photos, fuel level, odometer, valuables.
- Customer complaints and technician findings.
- Estimate with labour, parts, consumables, sublet; customer approval by signature/OTP.
- Technician allocation, time tracking, productivity.
- Parts request → issue against job card only.
- Quality control checklist and rework tracking.
- Gate pass linked to invoice/payment status.
- Warranty claim capture and status.
- Customer feedback (CSAT) and follow-up.
- Job card PDF with QR verification.

#### 2.5 Parts & Inventory
- Part master with part number, description, brand, category, unit, tax code.
- Model/VIN compatibility and supersession chain.
- Warehouse, bin and branch-wise stock.
- Purchase orders → GRN → supplier invoice → returns.
- Issue, return, counter sale, adjustment, opening stock.
- Inter-branch stock transfer with dispatch/receive and in-transit stock.
- Stock take and variance approval.
- Min/max/reorder levels and reorder suggestions.
- FIFO/weighted-average valuation.
- Price lists per branch; cost price hidden from advisors.
- Stock aging, dead stock, valuation and movement reports.

#### 2.6 Corporate Desk
- Corporate account with NTN, credit limit, credit terms, statement cycle.
- MOU: validity, branches covered, labour rate, parts discount, credit terms, attached scan.
- Work order: per vehicle/job, authorised person, PO number, amount limit, validity.
- Job card linked to work order; rates auto-applied from MOU.
- Out-of-MOU rate requires manager approval.
- Invoice to company with MOU/WO reference.
- Monthly statement (branch-wise or consolidated).
- Credit-limit breach and aging alerts.

#### 2.7 Billing & Receivables
- Service, parts, vehicle and corporate invoices.
- Tax invoice with FBR QR/reference.
- Receipts: cash, bank, card, cheque, online, credit.
- Payment allocation to one or many invoices.
- Credit notes with approval.
- Aging buckets: 0–15, 16–30, 31–60, 61–90, 90+.
- Automated reminders and escalation; reminder log.
- Promise-to-pay notes and follow-up tasks.
- Daily collection and cashier reconciliation.

#### 2.8 Reports & Leakage Control
- **Discount by advisor** — who is giving away margin.
- **Below-cost sales** — parts/labour sold under cost.
- **Parts issued without job card** — manual issues.
- **Job cards closed without invoice**.
- **Gate passes issued without payment**.
- **Stock variance** — system vs physical.
- **Warranty parts consumption vs claims**.
- **Corporate credit-limit breach**.
- **Cancelled/amended invoices**.
- Branch comparison, service revenue, technician productivity, sales funnel, receivables, stock aging.

#### 2.9 Security
- Role-based access control with branch scope.
- Approval matrix with segregation of duties (creator ≠ approver).
- 2FA for admin/manager accounts.
- Append-only audit log; no hard delete.
- Immutable closed job cards and issued invoices.
- Document hash + QR verification.
- Encrypted backups, restore drills.
- Session timeout, password policy, optional IP allow-list.
- API rate limiting, input validation, OWASP Top 10 controls.

---

## 3. Roles & Permissions

| Role | Scope | Key permissions |
|---|---|---|
| Owner / Group Admin | All branches | Everything, price-list changes, final approvals |
| Branch Manager | Own branch | Approve discounts, voids, credit notes, stock adjustments |
| Service Advisor | Own branch | Create job cards, estimates, request parts; **cannot change rates** |
| Technician | Assigned jobs | View assigned job, add findings, log time; no pricing |
| Parts Manager | Own branch | Purchase, GRN, issue, transfer, stock take, price view |
| Cashier | Own branch | Receipts, invoice print, day-end; cannot create discounts |
| Sales Consultant (3S) | Own branch | Leads, quotations, bookings; discount limits apply |
| Corporate Desk | Group | MOU/WO, corporate ledger, statements |
| Auditor | All branches (read-only) | Audit log, reports, documents |
| System Admin | Technical | Users, integrations, backups; no financial posting |

**Rule:** the person who creates a transaction cannot approve their own discount, credit note, stock adjustment or invoice void.

---

## 4. Approval Matrix (Leakage Control)

Example default configuration:

| Transaction | Service Advisor | Supervisor | Branch Manager | Owner |
|---|---|---|---|---|
| Labour discount | 0% | 2% | 5% | 100% |
| Parts discount | 0% | 2% | 5% | 100% |
| Below-cost sale | ❌ | ❌ | ✅ with reason | ✅ |
| Invoice void | ❌ | ❌ | ✅ | ✅ |
| Credit note | ❌ | ❌ | ✅ | ✅ |
| Stock adjustment | ❌ | ❌ | Up to PKR 10,000 | Unlimited |
| Price list change | ❌ | ❌ | ❌ | ✅ |
| Job card amendment after close | ❌ | ❌ | ✅ with reason | ✅ |

Every override stores: requested by, approved by, amount, percentage, reason code, free-text reason, timestamp, branch.

---

## 5. Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  Web app (Next.js)  ·  PWA  ·  Tablet-friendly job card UI   │
└──────────────────────────────┬───────────────────────────────┘
                               │ HTTPS / REST
┌──────────────────────────────▼───────────────────────────────┐
│  API (NestJS)                                                │
│  Auth · Customers · Sales · Service · Parts · Corporate ·    │
│  Billing · Reports · Approvals · Documents · Integrations    │
└───────┬───────────────┬───────────────┬───────────────┬──────┘
        │               │               │               │
┌───────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
│ PostgreSQL 16│ │ Redis +     │ │ S3 / R2     │ │ External    │
│ single DB    │ │ BullMQ      │ │ documents   │ │ Honda, FBR, │
│ branch_id    │ │ reminders   │ │ PDFs, scans │ │ WhatsApp,   │
│ audit log    │ │ reports     │ │ hash + QR   │ │ SMS, email  │
└──────────────┘ └─────────────┘ └─────────────┘ └─────────────┘
```

**Key decisions**
- **Modular monolith**, not microservices. One deployable API + one web app.
- **Single PostgreSQL database.** Every transactional table carries `branch_id`. Branch isolation enforced in the service layer + optional PostgreSQL RLS.
- **Background jobs** for reminders, aging snapshots, report pre-aggregation, integration retries, backups.
- **Read-only reporting views**; add a read replica only when volume demands it.
- **Object storage** for documents; never store files as BLOBs in PostgreSQL.
- **Outbox pattern** for reliable WhatsApp/SMS/FBR/Honda events.

---

## 6. Recommended Tech Stack

### Primary (recommended)

| Layer | Choice | Why |
|---|---|---|
| Frontend | **Next.js 15 + TypeScript + Tailwind CSS + shadcn/ui** | Fast, responsive, good tables/forms, PWA support |
| Data fetching | TanStack Query + TanStack Table | Caching, server state, complex grids |
| Backend | **NestJS + TypeScript** | Modular, DI, guards/interceptors, OpenAPI |
| ORM | **Prisma** (or Drizzle) | Type-safe schema, migrations, good DX |
| Database | **PostgreSQL 16** | Transactions, JSONB, views, strong constraints |
| Cache/queue | **Redis 7 + BullMQ** | Reminders, report jobs, retries |
| File storage | **Cloudflare R2** (prod) / MinIO (local) | Cheap, S3-compatible, signed URLs |
| Auth | JWT access + refresh, TOTP 2FA, Argon2id hashing | Standard, stateless, mobile-ready |
| PDF | Playwright (HTML → PDF) or React-PDF | Job cards, invoices, statements |
| Excel | ExcelJS | Data import/export |
| Search | PostgreSQL full-text search | Sufficient initially; Meilisearch later |
| Realtime | SSE / Socket.IO | Job card board, notifications |
| API docs | OpenAPI/Swagger | Vendor integrations |
| Testing | Vitest + Playwright | Unit, integration, E2E |
| Monitoring | Sentry + Better Stack/UptimeRobot | Errors, uptime, alerts |
| CI/CD | GitHub Actions + Docker | Repeatable deploys |

### Alternative (faster MVP, less custom UI)

- **Laravel 11 + Filament 3 + PostgreSQL + Redis + Horizon.**
- Why: admin panels, forms, tables, permissions and reports are extremely fast to build. Good if the team is PHP-heavy.
- Trade-off: less flexible for highly custom job-card UX and real-time screens.

### Not recommended
- **MongoDB** — financial data needs relational integrity and reporting.
- **Microservices** — overkill for two branches; operational cost and complexity.
- **Native mobile app first** — responsive PWA is enough for phase 1.
- **WordPress/WooCommerce** — not a DMS.

---

## 7. Database Design

### Conventions
- UUID primary keys (`gen_random_uuid()`), `bigserial` only for high-volume logs.
- `numeric(14,2)` for money, `numeric(14,3)` for quantities, `numeric(5,2)` for percentages.
- `timestamptz` everywhere; store UTC, render in `Asia/Karachi`.
- `branch_id` on every transactional table.
- `created_by`, `created_at`, `updated_at`; `deleted_at` only where soft delete is allowed.
- Document numbers from `doc_sequences` (concurrency-safe).
- Partial indexes for active records; composite indexes on `(branch_id, status, date)`.
- Partition `audit_log` and `stock_movements` by year when they grow.

### Core entities (see `schema.sql`)

- **Platform:** `groups`, `branches`, `users`, `roles`, `permissions`, `role_permissions`, `user_branch_roles`, `approval_rules`, `approval_requests`, `audit_log`, `documents`, `doc_sequences`, `settings`, `notification_templates`, `notifications`.
- **Customer/Vehicle:** `customers`, `customer_contacts`, `vehicles`, `vehicle_owners`.
- **Sales:** `leads`, `lead_activities`, `test_drives`, `quotations`, `bookings`, `sales_orders`, `exchanges`.
- **Parts:** `parts`, `part_compatibility`, `part_supersessions`, `suppliers`, `warehouses`, `bins`, `stock`, `stock_movements`, `purchase_orders`, `purchase_order_items`, `grns`, `grn_items`, `stock_transfers`, `stock_transfer_items`, `stock_takes`, `stock_take_items`, `price_lists`, `price_list_items`.
- **Service:** `service_appointments`, `job_cards`, `job_card_status_history`, `job_card_operations`, `job_card_parts`, `job_card_approvals`, `technicians`, `technician_assignments`, `quality_checks`, `gate_passes`, `warranty_claims`, `service_feedback`.
- **Corporate:** `corporate_accounts`, `mous`, `mou_rate_items`, `work_orders`, `work_order_items`.
- **Finance:** `invoices`, `invoice_items`, `payments`, `payment_allocations`, `credit_notes`, `reminder_schedules`.
- **Integrations:** `integration_configs`, `webhook_logs`, `sync_jobs`.

### Important views
- `v_stock_on_hand` — available quantity and stock value.
- `v_receivables_aging` — invoice-wise aging buckets.
- `v_leakage_flags` — daily exception list (discount without approval, manual parts issue, closed job without invoice, gate pass without payment).

### Integrity rules
- Unique: VIN, `(group_id, part_no)`, `(branch_id, job_card_no)`, `(branch_id, invoice_no)`, `(warehouse_id, part_id, bin_id)`.
- Check: quantities and amounts non-negative; discount percentage 0–100.
- Trigger: `job_cards` locked after `invoiced`/`closed`/`cancelled`.
- Trigger: `updated_at` maintained automatically.

---

## 8. Integrations

| Integration | Purpose | Suggested provider | Notes |
|---|---|---|---|
| Honda Atlas | Warranty claims, parts ordering, vehicle master | Honda dealer portal/API | **Confirm API access before promising.** If no API, use manual import/export. |
| FBR | Tax invoice validation/QR | PRAL-approved integrator | Required for GST invoices; confirm client's registration. |
| WhatsApp | Payment reminders, service reminders, job updates | Meta Cloud API or local BSP (Wati, Interakt, 360dialog) | Template approval needed; opt-in required. |
| SMS | Fallback reminders/OTP | Local aggregator (Jazz/Zong/Telenor) | Cheap, reliable. |
| Email | Invoices, statements | Resend/Postmark/SES | Transactional only. |
| Payment gateway | Online payments | Bank/Alfa/1Link/EasyPaisa/JazzCash | Phase 2; reconcile webhooks. |
| Accounting | GL export | QuickBooks/Peachtree/Xero or CSV | Avoid building full GL in v1 if client already has accounting. |
| Biometric/attendance | Technician attendance | ZKTeco/Suprema | Optional; CSV import first. |
| Backup | Off-site encrypted backups | Backblaze B2/R2 | Nightly + monthly restore test. |

---

## 9. Hosting & DevOps

### Recommended production topology

| Component | Recommendation |
|---|---|
| Region | **Mumbai (ap-south-1)** or **Singapore** — lowest latency for Pakistan |
| App server | 4 vCPU / 8 GB VPS (Hetzner/DigitalOcean/AWS Lightsail), Docker Compose |
| Database | Managed PostgreSQL 16 (DigitalOcean Managed DB, Neon, Supabase, or RDS) with daily backups + PITR |
| Redis | Managed Redis or same VPS (pilot) |
| Object storage | Cloudflare R2 + lifecycle rules |
| CDN/WAF | Cloudflare (DNS, TLS, WAF, rate limiting) |
| Monitoring | Sentry (errors), Better Stack/UptimeRobot (uptime), Grafana Cloud (metrics) |
| Logs | Loki or Better Stack; 30-day retention |
| CI/CD | GitHub Actions → build image → push registry → deploy via SSH/Portainer |
| Environments | `dev`, `staging`, `prod`; separate databases and storage buckets |

### Backup policy (3-2-1)
- Nightly encrypted PostgreSQL dump to R2/B2.
- Managed DB PITR where available.
- Weekly full backup retained 3 months.
- Monthly restore drill into staging; record result.
- Document bucket versioning enabled.

### Estimated monthly cost (pilot)
| Item | USD/month |
|---|---|
| App VPS | 24–48 |
| Managed PostgreSQL | 15–30 |
| Redis | 0–15 |
| R2 storage (50 GB) | 1–5 |
| Monitoring | 0–29 |
| Domain/SSL | ~1–2 |
| WhatsApp/SMS | usage-based |
| **Total** | **~$50–130** |

### Local hosting note
Client ke apne server pe hosting **recommend nahi** — power, internet, backup aur security risk. Agar client insist kare, hybrid karo: cloud primary + local read-only/backup node. Data residency ki koi legal requirement ho to local cloud provider (PTCL/Cybernet/Nexus) evaluate karo, lekin SLA aur disaster recovery likhit lo.

---

## 10. Roadmap

| Phase | Duration | Deliverables |
|---|---|---|
| **0. Discovery & SRS** | 2 weeks | Forms/registers collected, process maps, Honda integration check, data audit, signed SRS |
| **1. Core + Parts + Job Card** | 8 weeks | Auth/roles/branches, customer/vehicle master, parts inventory, GRN, issue, job card, estimate, invoice, audit, basic reports — 3S pilot |
| **2. 2S rollout + Transfers + Payments** | 4 weeks | 2S branch config, inter-branch transfer, receivables, reminders, gate pass, cashier day-end |
| **3. Corporate + Sales** | 6 weeks | MOU/WO, corporate ledger/statements, sales/CRM/bookings (3S) |
| **4. Reports + Integrations + UAT** | 4 weeks | Leakage reports, FBR, WhatsApp/SMS, Honda import/export, data migration, UAT |
| **5. Go-live + Stabilization** | 2–4 weeks | Training, parallel run, go-live, hypercare, AMC handover |

**Total:** ~6 months. **MVP:** 14 weeks (phases 0–2).

### Data migration
- Customers, vehicles, opening parts stock, suppliers, opening receivables/payables, employees.
- Template-based Excel import with validation and dry-run.
- Reconciliation sign-off before go-live.

---

## 11. Team & Effort

| Role | Allocation | Duration |
|---|---|---|
| Business Analyst / PM | 50% | 6 months |
| UI/UX Designer | 50% | first 3 months |
| Senior Full-stack Developer | 100% | 6 months |
| Full-stack Developer | 100% | 6 months |
| QA Engineer | 50% | from month 2 |
| DevOps (part-time) | 20% | setup + go-live |

**Indicative effort:** 30–36 person-months for the full scope; 14–18 person-months for MVP.

**Indicative Pakistan market budget (custom build):**
- MVP: **PKR 18–30 lakh**
- Full system: **PKR 35–60 lakh**
- AMC: **15–20% of build cost per year**
- Infrastructure: **PKR 15,000–35,000/month**

*(Rates vary by team seniority and city; use person-month calculation for a real quote.)*

---

## 12. Commercial Model

1. **Discovery fee** — separate, paid before SRS.
2. **Phase-wise billing** — 30% advance, 40% mid-phase, 30% on UAT sign-off.
3. **Change request process** — written approval, estimated separately.
4. **AMC** — hosting, support, minor changes, monitoring.
5. **IP & data** — client owns data and source code on final payment; vendor retains reusable framework rights.
6. **Warranty** — 60–90 days bug-fix warranty after go-live.
7. **SLA** — P1 response 2 hours, P2 1 business day, P3 3 business days.

---

## 13. Risks & Assumptions

| Risk | Impact | Mitigation |
|---|---|---|
| Honda Atlas API not available | Warranty/parts integration delayed | Confirm in discovery; fallback to CSV import/export |
| Scope creep ("bohut kuch") | Timeline/cost blow-up | Signed SRS + change request process |
| Poor legacy data | Migration delays | Data audit in phase 0; client owns cleanup |
| Advisor resistance to controls | Workarounds/leakage | Manager buy-in, training, exception reports |
| Internet/power issues at branch | Downtime | PWA caching, retry queues, UPS, 4G backup |
| FBR integration complexity | Invoice compliance | Use approved integrator; test early |
| Single developer dependency | Delivery risk | Documented code, CI, code review, handover |

---

## 14. Next Steps

1. **Sign off scope** — 3S vs 2S module matrix and phase 1 boundary.
2. **Collect documents** — job card, MOU, work order, GRN, stock register, invoice, gate pass, delivery note.
3. **Confirm Honda/FBR access** — API credentials, sandbox, approval process.
4. **Set up repo & infrastructure** — monorepo, Docker, staging environment.
5. **Start phase 1** — auth, branches, customer/vehicle, parts, job card, invoice, audit.
6. **Weekly demo** — working software every Friday; no big-bang delivery.

---

## 15. Folder Contents

| File | Purpose |
|---|---|
| `BLUEPRINT.md` | This document |
| `schema.sql` | PostgreSQL 16 core schema, views, triggers |
| `docker-compose.yml` | Local Postgres + Redis + MinIO + MailHog |
| `.env.example` | Environment variables template |
| `README.md` | Quick start and next steps |
