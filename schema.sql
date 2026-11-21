-- ============================================================================
-- Honda Multi-Branch DMS — PostgreSQL 16 Core Schema
-- Run on a fresh database:  psql -U dms -d dms -f schema.sql
-- ============================================================================

begin;

create extension if not exists pgcrypto;
create extension if not exists citext;

-- ============================================================================
-- ENUMS
-- ============================================================================

create type branch_type as enum ('3S', '2S', '1S');
create type user_status as enum ('active', 'inactive', 'locked');
create type customer_type as enum ('individual', 'corporate');

create type lead_status as enum (
  'new', 'contacted', 'qualified', 'test_drive', 'quoted', 'booked', 'lost', 'delivered'
);
create type quotation_status as enum ('draft', 'sent', 'accepted', 'rejected', 'expired');
create type booking_status as enum ('pending', 'confirmed', 'allotted', 'delivered', 'cancelled');

create type job_card_status as enum (
  'draft', 'open', 'estimate_pending', 'approved', 'in_progress',
  'qc', 'ready', 'invoiced', 'closed', 'cancelled'
);
create type line_status as enum ('pending', 'approved', 'issued', 'cancelled');
create type qc_result as enum ('pass', 'fail', 'rework');

create type stock_movement_type as enum (
  'opening', 'grn', 'issue', 'return', 'transfer_out', 'transfer_in',
  'adjustment', 'counter_sale'
);
create type po_status as enum ('draft', 'sent', 'partially_received', 'received', 'cancelled');
create type grn_status as enum ('draft', 'posted', 'cancelled');
create type transfer_status as enum ('draft', 'dispatched', 'received', 'cancelled');
create type stock_take_status as enum ('open', 'closed', 'cancelled');

create type invoice_type as enum ('service', 'parts', 'vehicle', 'corporate');
create type invoice_status as enum ('draft', 'issued', 'partially_paid', 'paid', 'void');
create type payment_method as enum ('cash', 'bank', 'card', 'cheque', 'online', 'credit');

create type mou_status as enum ('draft', 'active', 'expired', 'terminated');
create type wo_status as enum ('draft', 'active', 'consumed', 'expired', 'cancelled');

create type approval_status as enum ('pending', 'approved', 'rejected', 'cancelled');
create type reminder_status as enum ('scheduled', 'sent', 'failed', 'cancelled');
create type notification_channel as enum ('whatsapp', 'sms', 'email', 'in_app');

-- ============================================================================
-- PLATFORM
-- ============================================================================

create table groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  legal_name text,
  ntn text,
  currency text not null default 'PKR',
  timezone text not null default 'Asia/Karachi',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table branches (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  code text not null,
  name text not null,
  type branch_type not null,
  address text,
  city text,
  phone text,
  email citext,
  tax_reg_no text,
  invoice_prefix text not null default 'INV',
  job_card_prefix text not null default 'JC',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (group_id, code)
);

create table users (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  name text not null,
  email citext not null,
  phone text,
  password_hash text not null,
  status user_status not null default 'active',
  is_group_admin boolean not null default false,
  two_factor_secret text,
  last_login_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (group_id, email)
);

create table roles (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  code text not null,
  name text not null,
  description text,
  is_system boolean not null default false,
  created_at timestamptz not null default now(),
  unique (group_id, code)
);

create table permissions (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  module text not null,
  action text not null,
  description text
);

create table role_permissions (
  role_id uuid not null references roles(id) on delete cascade,
  permission_id uuid not null references permissions(id) on delete cascade,
  primary key (role_id, permission_id)
);

create table user_branch_roles (
  user_id uuid not null references users(id) on delete cascade,
  branch_id uuid not null references branches(id) on delete cascade,
  role_id uuid not null references roles(id) on delete cascade,
  primary key (user_id, branch_id, role_id)
);

create table approval_rules (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  branch_id uuid references branches(id) on delete cascade,
  transaction_type text not null,
  role_id uuid not null references roles(id) on delete cascade,
  max_discount_pct numeric(5,2) not null default 0 check (max_discount_pct between 0 and 100),
  max_amount numeric(14,2) check (max_amount is null or max_amount >= 0),
  requires_role_id uuid references roles(id),
  priority int not null default 100,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table audit_log (
  id bigserial primary key,
  group_id uuid references groups(id),
  branch_id uuid references branches(id),
  user_id uuid references users(id),
  action text not null,
  entity_type text not null,
  entity_id uuid,
  before_data jsonb,
  after_data jsonb,
  ip inet,
  user_agent text,
  created_at timestamptz not null default now()
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  branch_id uuid references branches(id) on delete set null,
  entity_type text not null,
  entity_id uuid,
  file_name text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes >= 0),
  storage_key text not null unique,
  sha256 text not null,
  uploaded_by uuid references users(id),
  created_at timestamptz not null default now()
);

create table doc_sequences (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  doc_type text not null,
  prefix text not null,
  next_number bigint not null default 1 check (next_number > 0),
  reset_yearly boolean not null default true,
  last_reset_year int,
  unique (branch_id, doc_type)
);

create table settings (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  branch_id uuid references branches(id) on delete cascade,
  key text not null,
  value jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create unique index uq_settings_scope
  on settings (group_id, coalesce(branch_id, '00000000-0000-0000-0000-000000000000'::uuid), key);

create table notification_templates (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  code text not null,
  channel notification_channel not null,
  subject text,
  body text not null,
  is_active boolean not null default true,
  unique (group_id, code, channel)
);

create table notifications (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  channel notification_channel not null,
  template_code text,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'queued',
  sent_at timestamptz,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- CUSTOMER & VEHICLE
-- ============================================================================

create table customers (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  type customer_type not null default 'individual',
  name text not null,
  company_name text,
  ntn text,
  cnic text,
  phone text,
  email citext,
  address text,
  city text,
  credit_limit numeric(14,2) not null default 0 check (credit_limit >= 0),
  credit_terms_days int not null default 0 check (credit_terms_days >= 0),
  is_active boolean not null default true,
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table customer_contacts (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references customers(id) on delete cascade,
  name text not null,
  designation text,
  phone text,
  email citext,
  is_primary boolean not null default false
);

create table vehicles (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  vin text not null,
  engine_no text,
  registration_no text,
  make text not null default 'Honda',
  model text not null,
  variant text,
  model_year int,
  color text,
  purchase_date date,
  warranty_start date,
  warranty_end date,
  odometer int check (odometer is null or odometer >= 0),
  sold_branch_id uuid references branches(id) on delete set null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (vin)
);

create unique index uq_vehicles_registration
  on vehicles (registration_no)
  where registration_no is not null;

create table vehicle_owners (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references vehicles(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete restrict,
  from_date date not null,
  to_date date,
  transfer_type text not null default 'sale',
  created_at timestamptz not null default now()
);

-- ============================================================================
-- PARTS & INVENTORY
-- ============================================================================

create table suppliers (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  name text not null,
  ntn text,
  phone text,
  email citext,
  address text,
  payment_terms_days int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table parts (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  part_no text not null,
  description text not null,
  brand text,
  category text,
  unit text not null default 'pcs',
  hsn_code text,
  tax_rate numeric(5,2) not null default 0 check (tax_rate between 0 and 100),
  cost_price numeric(14,2) not null default 0 check (cost_price >= 0),
  selling_price numeric(14,2) not null default 0 check (selling_price >= 0),
  min_stock numeric(14,3) not null default 0,
  max_stock numeric(14,3),
  reorder_qty numeric(14,3) not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (group_id, part_no)
);

create table part_compatibility (
  id uuid primary key default gen_random_uuid(),
  part_id uuid not null references parts(id) on delete cascade,
  model text not null,
  variant text,
  year_from int,
  year_to int,
  notes text
);

create table part_supersessions (
  id uuid primary key default gen_random_uuid(),
  old_part_id uuid not null references parts(id) on delete cascade,
  new_part_id uuid not null references parts(id) on delete cascade,
  notes text,
  unique (old_part_id, new_part_id)
);

create table warehouses (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  name text not null,
  type text not null default 'main',
  is_active boolean not null default true
);

create table bins (
  id uuid primary key default gen_random_uuid(),
  warehouse_id uuid not null references warehouses(id) on delete cascade,
  code text not null,
  description text,
  unique (warehouse_id, code)
);

create table stock (
  id uuid primary key default gen_random_uuid(),
  warehouse_id uuid not null references warehouses(id) on delete cascade,
  part_id uuid not null references parts(id) on delete cascade,
  bin_id uuid not null references bins(id) on delete restrict,
  qty_on_hand numeric(14,3) not null default 0 check (qty_on_hand >= 0),
  qty_reserved numeric(14,3) not null default 0 check (qty_reserved >= 0),
  avg_cost numeric(14,2) not null default 0,
  last_cost numeric(14,2) not null default 0,
  updated_at timestamptz not null default now(),
  unique (warehouse_id, part_id, bin_id)
);

create table stock_movements (
  id bigserial primary key,
  branch_id uuid not null references branches(id) on delete cascade,
  warehouse_id uuid not null references warehouses(id) on delete restrict,
  part_id uuid not null references parts(id) on delete restrict,
  movement_type stock_movement_type not null,
  qty numeric(14,3) not null check (qty <> 0),
  unit_cost numeric(14,2) not null default 0,
  ref_type text,
  ref_id uuid,
  notes text,
  created_by uuid references users(id),
  created_at timestamptz not null default now()
);

create table purchase_orders (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  supplier_id uuid not null references suppliers(id) on delete restrict,
  po_no text not null,
  order_date date not null default current_date,
  expected_date date,
  status po_status not null default 'draft',
  subtotal numeric(14,2) not null default 0,
  tax numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (branch_id, po_no)
);

create table purchase_order_items (
  id uuid primary key default gen_random_uuid(),
  po_id uuid not null references purchase_orders(id) on delete cascade,
  part_id uuid not null references parts(id) on delete restrict,
  qty numeric(14,3) not null check (qty > 0),
  unit_cost numeric(14,2) not null check (unit_cost >= 0),
  tax_rate numeric(5,2) not null default 0,
  amount numeric(14,2) not null default 0
);

create table grns (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  po_id uuid references purchase_orders(id) on delete set null,
  supplier_id uuid not null references suppliers(id) on delete restrict,
  grn_no text not null,
  received_date date not null default current_date,
  supplier_invoice_no text,
  subtotal numeric(14,2) not null default 0,
  tax numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  status grn_status not null default 'draft',
  received_by uuid references users(id),
  created_at timestamptz not null default now(),
  unique (branch_id, grn_no)
);

create table grn_items (
  id uuid primary key default gen_random_uuid(),
  grn_id uuid not null references grns(id) on delete cascade,
  part_id uuid not null references parts(id) on delete restrict,
  qty numeric(14,3) not null check (qty > 0),
  unit_cost numeric(14,2) not null check (unit_cost >= 0),
  tax_rate numeric(5,2) not null default 0,
  bin_id uuid not null references bins(id) on delete restrict,
  amount numeric(14,2) not null default 0
);

create table stock_transfers (
  id uuid primary key default gen_random_uuid(),
  from_branch_id uuid not null references branches(id) on delete restrict,
  to_branch_id uuid not null references branches(id) on delete restrict,
  transfer_no text not null unique,
  status transfer_status not null default 'draft',
  dispatched_at timestamptz,
  received_at timestamptz,
  dispatched_by uuid references users(id),
  received_by uuid references users(id),
  notes text,
  created_at timestamptz not null default now(),
  check (from_branch_id <> to_branch_id)
);

create table stock_transfer_items (
  id uuid primary key default gen_random_uuid(),
  transfer_id uuid not null references stock_transfers(id) on delete cascade,
  part_id uuid not null references parts(id) on delete restrict,
  qty numeric(14,3) not null check (qty > 0),
  unit_cost numeric(14,2) not null default 0
);

create table stock_takes (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  stock_take_no text not null,
  status stock_take_status not null default 'open',
  started_at timestamptz not null default now(),
  closed_at timestamptz,
  created_by uuid references users(id),
  unique (branch_id, stock_take_no)
);

create table stock_take_items (
  id uuid primary key default gen_random_uuid(),
  stock_take_id uuid not null references stock_takes(id) on delete cascade,
  part_id uuid not null references parts(id) on delete restrict,
  bin_id uuid not null references bins(id) on delete restrict,
  system_qty numeric(14,3) not null default 0,
  counted_qty numeric(14,3) not null default 0,
  variance numeric(14,3) generated always as (counted_qty - system_qty) stored
);

create table price_lists (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  name text not null,
  effective_from date not null default current_date,
  effective_to date,
  is_active boolean not null default true
);

create table price_list_items (
  id uuid primary key default gen_random_uuid(),
  price_list_id uuid not null references price_lists(id) on delete cascade,
  part_id uuid not null references parts(id) on delete cascade,
  price numeric(14,2) not null check (price >= 0),
  max_discount_pct numeric(5,2) not null default 0 check (max_discount_pct between 0 and 100),
  unique (price_list_id, part_id)
);

-- ============================================================================
-- SERVICE
-- ============================================================================

create table service_appointments (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete restrict,
  vehicle_id uuid not null references vehicles(id) on delete restrict,
  scheduled_at timestamptz not null,
  service_type text,
  advisor_id uuid references users(id),
  status text not null default 'scheduled',
  notes text,
  created_at timestamptz not null default now()
);

create table technicians (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references users(id) on delete cascade,
  branch_id uuid not null references branches(id) on delete cascade,
  skill_level text,
  hourly_rate numeric(14,2) not null default 0,
  is_active boolean not null default true
);

create table job_cards (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  job_card_no text not null,
  customer_id uuid not null references customers(id) on delete restrict,
  vehicle_id uuid not null references vehicles(id) on delete restrict,
  appointment_id uuid references service_appointments(id) on delete set null,
  advisor_id uuid references users(id),
  lead_technician_id uuid references technicians(id),
  status job_card_status not null default 'draft',
  odometer_in int check (odometer_in is null or odometer_in >= 0),
  fuel_level text,
  complaints jsonb not null default '[]'::jsonb,
  inspection jsonb not null default '{}'::jsonb,
  estimate_total numeric(14,2) not null default 0,
  approved_total numeric(14,2) not null default 0,
  final_total numeric(14,2) not null default 0,
  promised_at timestamptz,
  closed_at timestamptz,
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (branch_id, job_card_no)
);

create table job_card_status_history (
  id bigserial primary key,
  job_card_id uuid not null references job_cards(id) on delete cascade,
  from_status job_card_status,
  to_status job_card_status not null,
  changed_by uuid references users(id),
  changed_at timestamptz not null default now(),
  reason text
);

create table job_card_operations (
  id uuid primary key default gen_random_uuid(),
  job_card_id uuid not null references job_cards(id) on delete cascade,
  operation_code text,
  description text not null,
  labour_hours numeric(6,2) not null default 0 check (labour_hours >= 0),
  rate numeric(14,2) not null default 0 check (rate >= 0),
  discount_pct numeric(5,2) not null default 0 check (discount_pct between 0 and 100),
  discount_amount numeric(14,2) not null default 0 check (discount_amount >= 0),
  approved_by uuid references users(id),
  approval_reason text,
  status line_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table job_card_parts (
  id uuid primary key default gen_random_uuid(),
  job_card_id uuid not null references job_cards(id) on delete cascade,
  part_id uuid not null references parts(id) on delete restrict,
  warehouse_id uuid not null references warehouses(id) on delete restrict,
  qty_requested numeric(14,3) not null default 0 check (qty_requested >= 0),
  qty_issued numeric(14,3) not null default 0 check (qty_issued >= 0),
  unit_price numeric(14,2) not null default 0 check (unit_price >= 0),
  discount_pct numeric(5,2) not null default 0 check (discount_pct between 0 and 100),
  discount_amount numeric(14,2) not null default 0 check (discount_amount >= 0),
  approved_by uuid references users(id),
  approval_reason text,
  status line_status not null default 'pending',
  created_at timestamptz not null default now()
);

create table job_card_approvals (
  id uuid primary key default gen_random_uuid(),
  job_card_id uuid not null references job_cards(id) on delete cascade,
  approval_type text not null,
  requested_by uuid references users(id),
  approved_by uuid references users(id),
  status approval_status not null default 'pending',
  reason text,
  amount numeric(14,2),
  created_at timestamptz not null default now(),
  decided_at timestamptz
);

create table technician_assignments (
  id uuid primary key default gen_random_uuid(),
  job_card_id uuid not null references job_cards(id) on delete cascade,
  technician_id uuid not null references technicians(id) on delete restrict,
  operation_id uuid references job_card_operations(id) on delete cascade,
  started_at timestamptz,
  ended_at timestamptz,
  hours numeric(6,2) not null default 0 check (hours >= 0)
);

create table quality_checks (
  id uuid primary key default gen_random_uuid(),
  job_card_id uuid not null references job_cards(id) on delete cascade,
  checklist jsonb not null default '{}'::jsonb,
  result qc_result not null default 'pass',
  checked_by uuid references users(id),
  checked_at timestamptz not null default now()
);

create table gate_passes (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  job_card_id uuid not null unique references job_cards(id) on delete cascade,
  gate_pass_no text not null,
  issued_by uuid references users(id),
  issued_at timestamptz not null default now(),
  security_verified_by uuid references users(id),
  verified_at timestamptz,
  status text not null default 'issued',
  unique (branch_id, gate_pass_no)
);

create table warranty_claims (
  id uuid primary key default gen_random_uuid(),
  job_card_id uuid not null references job_cards(id) on delete cascade,
  claim_no text,
  status text not null default 'draft',
  submitted_at timestamptz,
  approved_amount numeric(14,2),
  notes text
);

create table service_feedback (
  id uuid primary key default gen_random_uuid(),
  job_card_id uuid not null references job_cards(id) on delete cascade,
  rating int check (rating between 1 and 5),
  comments text,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- CORPORATE
-- ============================================================================

create table corporate_accounts (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null unique references customers(id) on delete cascade,
  credit_limit numeric(14,2) not null default 0 check (credit_limit >= 0),
  credit_terms_days int not null default 0 check (credit_terms_days >= 0),
  statement_cycle text not null default 'monthly',
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table mous (
  id uuid primary key default gen_random_uuid(),
  corporate_account_id uuid not null references corporate_accounts(id) on delete cascade,
  mou_no text not null,
  title text,
  start_date date not null,
  end_date date,
  labour_discount_pct numeric(5,2) not null default 0 check (labour_discount_pct between 0 and 100),
  parts_discount_pct numeric(5,2) not null default 0 check (parts_discount_pct between 0 and 100),
  credit_terms_days int,
  branches jsonb not null default '[]'::jsonb,
  document_id uuid references documents(id) on delete set null,
  status mou_status not null default 'draft',
  approved_by uuid references users(id),
  created_at timestamptz not null default now(),
  unique (corporate_account_id, mou_no)
);

create table mou_rate_items (
  id uuid primary key default gen_random_uuid(),
  mou_id uuid not null references mous(id) on delete cascade,
  service_category text not null,
  labour_rate numeric(14,2) not null default 0,
  parts_discount_pct numeric(5,2) not null default 0
);

create table work_orders (
  id uuid primary key default gen_random_uuid(),
  corporate_account_id uuid not null references corporate_accounts(id) on delete cascade,
  mou_id uuid references mous(id) on delete set null,
  wo_no text not null,
  wo_date date not null default current_date,
  vehicle_id uuid references vehicles(id) on delete set null,
  authorized_person text,
  po_no text,
  amount_limit numeric(14,2),
  valid_until date,
  document_id uuid references documents(id) on delete set null,
  status wo_status not null default 'draft',
  created_at timestamptz not null default now(),
  unique (corporate_account_id, wo_no)
);

create table work_order_items (
  id uuid primary key default gen_random_uuid(),
  wo_id uuid not null references work_orders(id) on delete cascade,
  description text not null,
  qty numeric(14,3) not null default 1 check (qty > 0),
  rate numeric(14,2) not null default 0,
  amount numeric(14,2) not null default 0
);

-- ============================================================================
-- FINANCE
-- ============================================================================

create table invoices (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  invoice_no text not null,
  type invoice_type not null,
  customer_id uuid not null references customers(id) on delete restrict,
  job_card_id uuid references job_cards(id) on delete set null,
  work_order_id uuid references work_orders(id) on delete set null,
  invoice_date date not null default current_date,
  subtotal numeric(14,2) not null default 0,
  discount numeric(14,2) not null default 0,
  tax numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  paid_amount numeric(14,2) not null default 0,
  balance numeric(14,2) not null default 0,
  status invoice_status not null default 'draft',
  fbr_invoice_no text,
  qr_payload text,
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (branch_id, invoice_no)
);

create table invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references invoices(id) on delete cascade,
  item_type text not null,
  description text not null,
  qty numeric(14,3) not null default 1 check (qty > 0),
  rate numeric(14,2) not null default 0,
  discount numeric(14,2) not null default 0,
  tax_rate numeric(5,2) not null default 0,
  tax_amount numeric(14,2) not null default 0,
  amount numeric(14,2) not null default 0,
  ref_id uuid
);

create table payments (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  payment_no text not null,
  customer_id uuid not null references customers(id) on delete restrict,
  payment_date date not null default current_date,
  amount numeric(14,2) not null check (amount > 0),
  method payment_method not null,
  reference text,
  received_by uuid references users(id),
  notes text,
  created_at timestamptz not null default now(),
  unique (branch_id, payment_no)
);

create table payment_allocations (
  id uuid primary key default gen_random_uuid(),
  payment_id uuid not null references payments(id) on delete cascade,
  invoice_id uuid not null references invoices(id) on delete restrict,
  amount numeric(14,2) not null check (amount > 0)
);

create table credit_notes (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  credit_note_no text not null,
  invoice_id uuid not null references invoices(id) on delete restrict,
  reason text not null,
  amount numeric(14,2) not null check (amount > 0),
  approved_by uuid references users(id),
  status approval_status not null default 'pending',
  created_at timestamptz not null default now(),
  unique (branch_id, credit_note_no)
);

create table reminder_schedules (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete cascade,
  invoice_id uuid references invoices(id) on delete cascade,
  due_date date not null,
  channel notification_channel not null,
  template_code text,
  status reminder_status not null default 'scheduled',
  sent_at timestamptz,
  response_notes text,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- SALES
-- ============================================================================

create table leads (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  name text not null,
  phone text,
  email citext,
  source text,
  interest_model text,
  status lead_status not null default 'new',
  assigned_to uuid references users(id),
  next_followup_at timestamptz,
  lost_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table lead_activities (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  type text not null,
  notes text,
  scheduled_at timestamptz,
  completed_at timestamptz,
  user_id uuid references users(id),
  created_at timestamptz not null default now()
);

create table test_drives (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  lead_id uuid references leads(id) on delete set null,
  vehicle_id uuid references vehicles(id) on delete set null,
  scheduled_at timestamptz,
  started_at timestamptz,
  ended_at timestamptz,
  feedback text,
  user_id uuid references users(id),
  created_at timestamptz not null default now()
);

create table quotations (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  customer_id uuid references customers(id) on delete set null,
  quotation_no text not null,
  model text not null,
  variant text,
  color text,
  base_price numeric(14,2) not null default 0,
  accessories jsonb not null default '[]'::jsonb,
  discount numeric(14,2) not null default 0,
  tax numeric(14,2) not null default 0,
  total numeric(14,2) not null default 0,
  valid_until date,
  status quotation_status not null default 'draft',
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  unique (branch_id, quotation_no)
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  quotation_id uuid references quotations(id) on delete set null,
  customer_id uuid not null references customers(id) on delete restrict,
  booking_no text not null,
  booking_date date not null default current_date,
  amount numeric(14,2) not null default 0,
  payment_method payment_method,
  status booking_status not null default 'pending',
  allotted_vehicle_id uuid references vehicles(id) on delete set null,
  expected_delivery date,
  created_by uuid references users(id),
  created_at timestamptz not null default now(),
  unique (branch_id, booking_no)
);

create table sales_orders (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  booking_id uuid references bookings(id) on delete set null,
  customer_id uuid not null references customers(id) on delete restrict,
  vehicle_id uuid references vehicles(id) on delete set null,
  order_no text not null,
  invoice_id uuid references invoices(id) on delete set null,
  delivery_date date,
  registration_no text,
  pdi_checklist jsonb not null default '{}'::jsonb,
  gate_pass_no text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  unique (branch_id, order_no)
);

create table exchanges (
  id uuid primary key default gen_random_uuid(),
  branch_id uuid not null references branches(id) on delete cascade,
  customer_id uuid not null references customers(id) on delete restrict,
  old_vehicle jsonb not null default '{}'::jsonb,
  evaluated_value numeric(14,2) not null default 0,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- ============================================================================
-- APPROVALS & INTEGRATIONS
-- ============================================================================

create table approval_requests (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  branch_id uuid references branches(id) on delete cascade,
  transaction_type text not null,
  entity_type text not null,
  entity_id uuid not null,
  requested_by uuid references users(id),
  approver_role_id uuid references roles(id),
  status approval_status not null default 'pending',
  reason text,
  amount numeric(14,2),
  discount_pct numeric(5,2),
  created_at timestamptz not null default now(),
  decided_by uuid references users(id),
  decided_at timestamptz
);

create table integration_configs (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references groups(id) on delete cascade,
  provider text not null,
  config jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  updated_at timestamptz not null default now(),
  unique (group_id, provider)
);

create table webhook_logs (
  id bigserial primary key,
  provider text not null,
  direction text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'received',
  created_at timestamptz not null default now()
);

create table sync_jobs (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  job_type text not null,
  status text not null default 'queued',
  started_at timestamptz,
  finished_at timestamptz,
  error text,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- INDEXES
-- ============================================================================

create index idx_branches_group on branches(group_id);
create index idx_users_group on users(group_id);
create index idx_customers_group_name on customers(group_id, name);
create index idx_customers_phone on customers(phone);
create index idx_vehicles_customer on vehicles(customer_id);
create index idx_vehicles_vin on vehicles(vin);
create index idx_job_cards_branch_status on job_cards(branch_id, status, created_at desc);
create index idx_job_cards_vehicle on job_cards(vehicle_id);
create index idx_job_card_ops_jc on job_card_operations(job_card_id);
create index idx_job_card_parts_jc on job_card_parts(job_card_id);
create index idx_invoices_branch_status on invoices(branch_id, status, invoice_date desc);
create index idx_invoices_customer on invoices(customer_id);
create index idx_payments_branch_date on payments(branch_id, payment_date desc);
create index idx_stock_part on stock(part_id);
create index idx_stock_movements_part_date on stock_movements(part_id, created_at desc);
create index idx_stock_movements_ref on stock_movements(ref_type, ref_id);
create index idx_audit_entity on audit_log(entity_type, entity_id, created_at desc);
create index idx_audit_branch_date on audit_log(branch_id, created_at desc);
create index idx_documents_entity on documents(entity_type, entity_id);
create index idx_leads_branch_status on leads(branch_id, status, next_followup_at);
create index idx_reminders_status_due on reminder_schedules(status, due_date);

-- ============================================================================
-- VIEWS
-- ============================================================================

create or replace view v_stock_on_hand as
select
  b.group_id,
  w.branch_id,
  p.id as part_id,
  p.part_no,
  p.description,
  w.name as warehouse,
  bin.code as bin_code,
  s.qty_on_hand,
  s.qty_reserved,
  (s.qty_on_hand - s.qty_reserved) as qty_available,
  s.avg_cost,
  round(s.qty_on_hand * s.avg_cost, 2) as stock_value
from stock s
join warehouses w on w.id = s.warehouse_id
join branches b on b.id = w.branch_id
join parts p on p.id = s.part_id
join bins bin on bin.id = s.bin_id;

create or replace view v_receivables_aging as
select
  i.id as invoice_id,
  i.branch_id,
  i.customer_id,
  c.name as customer_name,
  i.invoice_no,
  i.invoice_date,
  i.total,
  i.paid_amount,
  i.balance,
  (current_date - i.invoice_date) as days_outstanding,
  case
    when current_date - i.invoice_date <= 15 then '0-15'
    when current_date - i.invoice_date <= 30 then '16-30'
    when current_date - i.invoice_date <= 60 then '31-60'
    when current_date - i.invoice_date <= 90 then '61-90'
    else '90+'
  end as aging_bucket
from invoices i
join customers c on c.id = i.customer_id
where i.status in ('issued', 'partially_paid')
  and i.balance > 0;

create or replace view v_leakage_flags as
select
  'job_card_discount_without_approval'::text as flag_type,
  jc.branch_id,
  jc.id::text as entity_id,
  jc.job_card_no::text as reference,
  jc.created_at as occurred_at,
  coalesce((
    select sum(o.discount_amount)
    from job_card_operations o
    where o.job_card_id = jc.id and o.approved_by is null
  ), 0) + coalesce((
    select sum(p.discount_amount)
    from job_card_parts p
    where p.job_card_id = jc.id and p.approved_by is null
  ), 0) as amount
from job_cards jc
where exists (
    select 1 from job_card_operations o
    where o.job_card_id = jc.id and o.discount_amount > 0 and o.approved_by is null
  )
  or exists (
    select 1 from job_card_parts p
    where p.job_card_id = jc.id and p.discount_amount > 0 and p.approved_by is null
  )

union all

select
  'parts_issue_without_job_card'::text,
  sm.branch_id,
  sm.id::text,
  coalesce(sm.ref_type, 'manual') || ':' || sm.id::text,
  sm.created_at,
  abs(sm.qty * sm.unit_cost)
from stock_movements sm
where sm.movement_type = 'issue'
  and (sm.ref_type is null or sm.ref_type <> 'job_card')

union all

select
  'closed_job_card_without_invoice'::text,
  jc.branch_id,
  jc.id::text,
  jc.job_card_no::text,
  jc.closed_at,
  jc.final_total
from job_cards jc
where jc.status = 'closed'
  and not exists (
    select 1 from invoices i where i.job_card_id = jc.id
  )

union all

select
  'gate_pass_without_payment'::text,
  gp.branch_id,
  gp.id::text,
  gp.gate_pass_no::text,
  gp.issued_at,
  coalesce(i.balance, 0)
from gate_passes gp
join job_cards jc on jc.id = gp.job_card_id
left join invoices i on i.job_card_id = jc.id
where gp.status = 'issued'
  and (i.id is null or i.balance > 0);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function next_doc_no(p_branch_id uuid, p_doc_type text)
returns text
language plpgsql
as $$
declare
  v_prefix text;
  v_next bigint;
begin
  update doc_sequences
     set next_number = next_number + 1
   where branch_id = p_branch_id
     and doc_type = p_doc_type
  returning prefix, next_number - 1 into v_prefix, v_next;

  if not found then
    raise exception 'No document sequence configured for branch % and doc type %',
      p_branch_id, p_doc_type;
  end if;

  return v_prefix || '-' || lpad(v_next::text, 6, '0');
end;
$$;

create or replace function guard_job_card_lock()
returns trigger
language plpgsql
as $$
begin
  if old.status in ('closed', 'cancelled') then
    if new.status is distinct from old.status then
      raise exception 'Job card % is locked; status changes require an approved amendment',
        old.job_card_no;
    end if;
    if new.estimate_total is distinct from old.estimate_total
       or new.approved_total is distinct from old.approved_total
       or new.final_total is distinct from old.final_total
       or new.customer_id is distinct from old.customer_id
       or new.vehicle_id is distinct from old.vehicle_id then
      raise exception 'Job card % is locked; financial/vehicle changes require an approved amendment',
        old.job_card_no;
    end if;
  end if;
  return new;
end;
$$;

create trigger trg_job_card_lock
before update on job_cards
for each row execute function guard_job_card_lock();

do $$
declare
  t text;
begin
  foreach t in array array[
    'groups', 'branches', 'users', 'customers', 'vehicles', 'suppliers',
    'parts', 'stock', 'purchase_orders', 'job_cards', 'invoices', 'leads',
    'integration_configs'
  ]
  loop
    execute format('drop trigger if exists trg_%s_updated_at on %I', t, t);
    execute format(
      'create trigger trg_%s_updated_at before update on %I for each row execute function set_updated_at()',
      t, t
    );
  end loop;
end;
$$;

commit;
