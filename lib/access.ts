export type ModuleKey =
  | "dashboard"
  | "customers"
  | "service"
  | "sales"
  | "parts"
  | "corporate"
  | "accounts"
  | "hr"
  | "reports"
  | "admin"
  | "settings"
  | "profile";

export type AccountStatus = "Active" | "Pending" | "Suspended" | "Rejected";

export type ModuleDef = {
  key: ModuleKey;
  label: string;
  description: string;
  group: string;
};

export const moduleCatalog: ModuleDef[] = [
  { key: "dashboard", label: "Dashboard", description: "Group overview, KPIs and alerts", group: "Overview" },
  { key: "customers", label: "Customers & Vehicles", description: "Customer 360, vehicle master, merge", group: "Overview" },
  { key: "service", label: "Service", description: "Job cards, workshop, QC and gate pass", group: "Operations" },
  { key: "sales", label: "Sales", description: "Leads, bookings, delivery and targets", group: "Operations" },
  { key: "parts", label: "Parts & Inventory", description: "Stock, purchasing, transfers and returns", group: "Operations" },
  { key: "corporate", label: "Corporate", description: "MOU, fleet work orders and receivables", group: "Business" },
  { key: "accounts", label: "Accounts & Finance", description: "Invoices, receipts, banking and tax", group: "Business" },
  { key: "hr", label: "Human Resources", description: "People, attendance, payroll and loans", group: "People" },
  { key: "reports", label: "Reports & Leakage", description: "Profit, branch KPIs and exceptions", group: "Insights" },
  { key: "admin", label: "Admin & Users", description: "Accounts, roles, audit and integrations", group: "Administration" },
  { key: "settings", label: "Settings", description: "Company, branch, approval and security setup", group: "Administration" },
  { key: "profile", label: "My access", description: "Your account and approved features", group: "Administration" },
];

export const assignableModules = moduleCatalog.filter((item) => item.key !== "profile");

export const moduleLabels = moduleCatalog.reduce(
  (acc, item) => ({ ...acc, [item.key]: item.label }),
  {} as Record<ModuleKey, string>,
);

export type FeatureDef = {
  key: string;
  module: ModuleKey;
  label: string;
};

/**
 * Every feature that can be approved by the owner. Core features gate existing
 * page sections; the rest gate the department control-centre cards.
 */
export const featureCatalog: FeatureDef[] = [
  // Customers
  { key: "customers.loyalty", module: "customers", label: "Loyalty & segments" },
  { key: "customers.reminders", module: "customers", label: "Customer reminders" },
  { key: "customers.consent", module: "customers", label: "Consent & privacy" },
  { key: "customers.documents", module: "customers", label: "Vehicle documents" },
  { key: "customers.nps", module: "customers", label: "Feedback & NPS" },

  // Service
  { key: "service.alignment", module: "service", label: "Wheel alignment jobs" },
  { key: "service.profiles", module: "service", label: "Service customer profiles" },
  { key: "service.payments", module: "service", label: "Service payments (cash/card)" },
  { key: "service.vehicleInOut", module: "service", label: "Car in/out log" },
  { key: "service.autoInvoice", module: "service", label: "Auto invoice & WhatsApp" },
  { key: "service.reminders", module: "service", label: "Service reminders" },
  { key: "service.pickDrop", module: "service", label: "Pick & drop requests" },
  { key: "service.loaner", module: "service", label: "Courtesy & loaner vehicles" },
  { key: "service.insurance", module: "service", label: "Insurance claims" },
  { key: "service.sublet", module: "service", label: "Sublet & outsourced work" },
  { key: "service.health", module: "service", label: "Vehicle health reports" },
  { key: "service.packages", module: "service", label: "Service packages & coupons" },

  // Sales
  { key: "sales.profiles", module: "sales", label: "Sales customer profiles" },
  { key: "sales.payments", module: "sales", label: "Sales payments" },
  { key: "sales.leadSources", module: "sales", label: "Lead sources & campaign ROI" },
  { key: "sales.followUps", module: "sales", label: "Follow-up queue" },
  { key: "sales.waitingList", module: "sales", label: "Waiting list & allocation" },
  { key: "sales.finance", module: "sales", label: "Finance & insurance" },
  { key: "sales.registration", module: "sales", label: "Registration & documents" },
  { key: "sales.delivery", module: "sales", label: "Delivery checklist" },
  { key: "sales.tradeIn", module: "sales", label: "Trade-in valuation" },
  { key: "sales.incentives", module: "sales", label: "Sales incentives" },

  // Parts
  { key: "parts.requisitions", module: "parts", label: "Purchase requisitions" },
  { key: "parts.suppliers", module: "parts", label: "Supplier performance" },
  { key: "parts.bins", module: "parts", label: "Bin locations" },
  { key: "parts.ledger", module: "parts", label: "Stock ledger" },
  { key: "parts.supersession", module: "parts", label: "Supersession chain" },
  { key: "parts.backorders", module: "parts", label: "Backorders" },
  { key: "parts.scrap", module: "parts", label: "Scrap & obsolescence" },

  // Corporate
  { key: "corporate.mouLetters", module: "corporate", label: "MOU letters & requirements" },
  { key: "corporate.carInOut", module: "corporate", label: "Corporate car in/out" },
  { key: "corporate.autoInvoice", module: "corporate", label: "Auto invoice & WhatsApp" },
  { key: "corporate.fleet", module: "corporate", label: "Fleet vehicle registry" },
  { key: "corporate.appointments", module: "corporate", label: "Corporate appointments" },
  { key: "corporate.partsIssue", module: "corporate", label: "Parts issued against work order" },
  { key: "corporate.aging", module: "corporate", label: "Receivables aging" },
  { key: "corporate.creditLimits", module: "corporate", label: "Credit limits" },
  { key: "corporate.feedback", module: "corporate", label: "Corporate feedback" },

  // Accounts
  { key: "accounts.serviceSales", module: "accounts", label: "Service & sales accounts" },
  { key: "accounts.cashBank", module: "accounts", label: "Cash, bank, pay order & credit" },
  { key: "accounts.chart", module: "accounts", label: "Chart of accounts" },
  { key: "accounts.ledger", module: "accounts", label: "General ledger" },
  { key: "accounts.payables", module: "accounts", label: "Vendor payables" },
  { key: "accounts.expenses", module: "accounts", label: "Expense claims" },
  { key: "accounts.pettyCash", module: "accounts", label: "Petty cash" },
  { key: "accounts.bankRec", module: "accounts", label: "Bank reconciliation" },
  { key: "accounts.cheques", module: "accounts", label: "Cheques & PDCs" },
  { key: "accounts.creditControl", module: "accounts", label: "Credit control" },

  // HR
  { key: "hr.employees", module: "hr", label: "Employee directory" },
  { key: "hr.leave", module: "hr", label: "Leave requests" },
  { key: "hr.payroll", module: "hr", label: "Payroll & salary" },
  { key: "hr.attendance", module: "hr", label: "Staff in/out" },
  { key: "hr.staffCredit", module: "hr", label: "Staff credit & reference" },
  { key: "hr.recruitment", module: "hr", label: "Recruitment pipeline" },
  { key: "hr.onboarding", module: "hr", label: "Onboarding checklist" },
  { key: "hr.shifts", module: "hr", label: "Shift roster" },
  { key: "hr.overtime", module: "hr", label: "Overtime" },
  { key: "hr.leaveBalance", module: "hr", label: "Leave balances" },
  { key: "hr.loans", module: "hr", label: "Loans & advances" },
  { key: "hr.gratuity", module: "hr", label: "Gratuity & EOBI" },
  { key: "hr.tax", module: "hr", label: "Income tax" },
  { key: "hr.appraisals", module: "hr", label: "Appraisals" },

  // Reports
  { key: "reports.scheduled", module: "reports", label: "Scheduled reports" },
  { key: "reports.targets", module: "reports", label: "KPI targets" },
  { key: "reports.branch", module: "reports", label: "Branch comparison" },
  { key: "reports.audit", module: "reports", label: "Audit exceptions" },
  { key: "reports.dataQuality", module: "reports", label: "Data quality" },

  // Admin
  { key: "admin.logins", module: "admin", label: "Login history" },
  { key: "admin.sessions", module: "admin", label: "Session control" },
  { key: "admin.backups", module: "admin", label: "Backups" },
  { key: "admin.api", module: "admin", label: "API keys & webhooks" },
  { key: "admin.billing", module: "admin", label: "Subscription & billing" },
  { key: "admin.security", module: "admin", label: "Security policies" },
];

export function featuresForModule(module: ModuleKey) {
  return featureCatalog.filter((item) => item.module === module);
}

export function allFeaturesForModules(modules: ModuleKey[]) {
  return featureCatalog.filter((item) => modules.includes(item.module)).map((item) => item.key);
}

export const allModuleKeys: ModuleKey[] = moduleCatalog.map((item) => item.key);
export const allFeatureKeys: string[] = featureCatalog.map((item) => item.key);

export function moduleForPath(pathname: string): ModuleKey | null {
  if (pathname.startsWith("/profile")) return "profile";
  if (pathname.startsWith("/dashboard")) return "dashboard";
  if (pathname.startsWith("/customers")) return "customers";
  if (pathname.startsWith("/service")) return "service";
  if (pathname.startsWith("/sales")) return "sales";
  if (pathname.startsWith("/parts")) return "parts";
  if (pathname.startsWith("/corporate")) return "corporate";
  if (pathname.startsWith("/accounts")) return "accounts";
  if (pathname.startsWith("/hr")) return "hr";
  if (pathname.startsWith("/reports")) return "reports";
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/settings")) return "settings";
  return null;
}
