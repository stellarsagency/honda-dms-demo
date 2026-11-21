-- ============================================================================
-- Honda DMS — Demo Seed (safe for a fresh database)
-- Run after schema.sql:  psql -U dms -d dms -f seed.sql
-- ============================================================================

begin;

do $$
declare
  v_group uuid;
  v_3s uuid;
  v_2s uuid;
begin
  insert into groups (name, legal_name)
  values ('Demo Honda Group', 'Demo Honda (Pvt) Ltd')
  returning id into v_group;

  insert into branches (group_id, code, name, type, city, invoice_prefix, job_card_prefix)
  values (v_group, '3S-01', 'Honda 3S — Main', '3S', 'Lahore', '3S-INV', '3S-JC')
  returning id into v_3s;

  insert into branches (group_id, code, name, type, city, invoice_prefix, job_card_prefix)
  values (v_group, '2S-01', 'Honda 2S — City', '2S', 'Lahore', '2S-INV', '2S-JC')
  returning id into v_2s;

  insert into roles (group_id, code, name, is_system) values
    (v_group, 'owner',             'Owner / Group Admin',      true),
    (v_group, 'group_admin',       'Group Administrator',      true),
    (v_group, 'branch_manager',    'Branch Manager',           true),
    (v_group, 'service_advisor',   'Service Advisor',          true),
    (v_group, 'technician',        'Technician',               true),
    (v_group, 'parts_manager',     'Parts Manager',            true),
    (v_group, 'cashier',           'Cashier',                  true),
    (v_group, 'sales_consultant',  'Sales Consultant',         true),
    (v_group, 'corporate_desk',    'Corporate Desk',           true),
    (v_group, 'auditor',           'Auditor (read-only)',      true),
    (v_group, 'system_admin',      'System Administrator',     true);

  insert into doc_sequences (branch_id, doc_type, prefix)
  select b.id, d.doc_type, b.code || '-' || d.prefix
  from branches b
  cross join (values
    ('job_card',       'JC'),
    ('invoice',        'INV'),
    ('quotation',      'QTN'),
    ('booking',        'BKG'),
    ('sales_order',    'SO'),
    ('gate_pass',      'GP'),
    ('purchase_order', 'PO'),
    ('grn',            'GRN'),
    ('payment',        'PAY'),
    ('credit_note',    'CN'),
    ('work_order',     'WO'),
    ('stock_transfer', 'ST'),
    ('stock_take',     'STK')
  ) as d(doc_type, prefix)
  where b.id in (v_3s, v_2s);

  insert into warehouses (branch_id, name, type)
  select b.id, b.code || ' Main Store', 'main'
  from branches b
  where b.id in (v_3s, v_2s);

  insert into bins (warehouse_id, code, description)
  select w.id, 'A-01', 'Default bin'
  from warehouses w
  where w.branch_id in (v_3s, v_2s);

  raise notice 'Seeded group %, 3S branch %, 2S branch %', v_group, v_3s, v_2s;
end;
$$;

-- ---------------------------------------------------------------------------
-- Global permission catalogue
-- ---------------------------------------------------------------------------
insert into permissions (code, module, action, description) values
  ('customer.view',        'customer', 'view',        'View customers and vehicles'),
  ('customer.manage',      'customer', 'manage',      'Create/update customers and vehicles'),
  ('customer.merge',       'customer', 'merge',       'Merge duplicate records'),

  ('sales.view',           'sales',    'view',        'View leads, quotations and bookings'),
  ('sales.manage',         'sales',    'manage',      'Create/update sales records'),
  ('sales.discount',       'sales',    'discount',    'Apply sales discount within limit'),
  ('sales.approve',        'sales',    'approve',     'Approve sales discounts'),

  ('service.view',         'service',  'view',        'View job cards'),
  ('service.create',       'service',  'create',      'Create job cards and estimates'),
  ('service.manage',       'service',  'manage',      'Update job cards, assign technicians'),
  ('service.discount',     'service',  'discount',    'Apply service discount within limit'),
  ('service.approve',      'service',  'approve',     'Approve service discounts and amendments'),
  ('service.close',        'service',  'close',       'QC and close job cards'),

  ('parts.view',           'parts',    'view',        'View parts and stock'),
  ('parts.cost',           'parts',    'cost',        'View cost price'),
  ('parts.manage',         'parts',    'manage',      'Create/update parts, PO, GRN'),
  ('parts.issue',          'parts',    'issue',       'Issue parts against job card'),
  ('parts.transfer',       'parts',    'transfer',    'Inter-branch stock transfer'),
  ('parts.adjust',         'parts',    'adjust',      'Stock adjustment'),
  ('parts.approve',        'parts',    'approve',     'Approve stock adjustment/transfer'),

  ('corporate.view',       'corporate','view',        'View corporate accounts, MOU, WO'),
  ('corporate.manage',     'corporate','manage',      'Create/update MOU and work orders'),
  ('corporate.approve',    'corporate','approve',     'Approve MOU and credit limits'),

  ('billing.view',         'billing',  'view',        'View invoices and payments'),
  ('billing.create',       'billing',  'create',      'Create invoices and receipts'),
  ('billing.void',         'billing',  'void',        'Void invoices'),
  ('billing.credit_note',  'billing',  'credit_note', 'Create credit notes'),
  ('billing.approve',      'billing',  'approve',     'Approve voids and credit notes'),

  ('reports.view',         'reports',  'view',        'View operational reports'),
  ('reports.financial',    'reports',  'financial',   'View financial reports'),
  ('reports.leakage',      'reports',  'leakage',     'View leakage/exception reports'),

  ('admin.users',          'admin',    'users',       'Manage users and roles'),
  ('admin.branches',       'admin',    'branches',    'Manage branches'),
  ('admin.settings',       'admin',    'settings',    'Manage settings and price lists'),
  ('admin.audit',          'admin',    'audit',       'View audit log'),
  ('admin.integrations',   'admin',    'integrations','Manage integrations')
on conflict (code) do nothing;

-- Owner gets every permission. Fine-grained role mapping is configured in the app.
insert into role_permissions (role_id, permission_id)
select r.id, p.id
from roles r
cross join permissions p
where r.code = 'owner'
on conflict do nothing;

commit;

-- Show what was created
select b.code, b.name, b.type
from branches b
order by b.code;
