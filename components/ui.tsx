import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn, initials } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <section className={cn("card", className)}>{children}</section>;
}

export function CardHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-start justify-between gap-3 px-5 pb-4 pt-5 sm:px-6 sm:pt-6", className)}>
      <div>
        <h2 className="font-sans text-[17px] font-bold tracking-tight text-stone-900">{title}</h2>
        {subtitle ? <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p> : null}
      </div>
      {action}
    </div>
  );
}

const toneStyles = {
  neutral: "bg-slate-100 text-slate-600 ring-slate-200",
  success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  warning: "bg-amber-50 text-amber-700 ring-amber-200",
  danger: "bg-red-50 text-red-700 ring-red-200",
  info: "bg-blue-50 text-blue-700 ring-blue-200",
  purple: "bg-violet-50 text-violet-700 ring-violet-200",
  dark: "bg-ink-900 text-white ring-ink-900",
};

export type Tone = keyof typeof toneStyles;

export function Badge({
  children,
  tone = "neutral",
  dot = false,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide ring-1 ring-inset",
        toneStyles[tone],
        className,
      )}
    >
      {dot ? <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" /> : null}
      {children}
    </span>
  );
}

const statusToneMap: Record<string, Tone> = {
  paid: "success",
  active: "success",
  connected: "success",
  completed: "success",
  delivered: "success",
  resolved: "success",
  approved: "success",
  healthy: "success",
  present: "success",
  ready: "purple",
  "qc check": "purple",
  "in progress": "info",
  booked: "info",
  confirmed: "info",
  "checked-in": "info",
  "in transit": "info",
  pending: "warning",
  "awaiting approval": "warning",
  "renewal due": "warning",
  financing: "warning",
  investigating: "warning",
  "on leave": "warning",
  partial: "warning",
  low: "warning",
  medium: "warning",
  open: "warning",
  overdue: "danger",
  critical: "danger",
  cancelled: "danger",
  absent: "danger",
  "limit alert": "danger",
  high: "danger",
  invited: "neutral",
  free: "neutral",
  scheduled: "info",
  assigned: "info",
  "picked up": "info",
  "in use": "info",
  reserved: "info",
  submitted: "info",
  allocated: "info",
  interviewing: "info",
  "under review": "warning",
  "documents pending": "warning",
  "valuation pending": "warning",
  "service due": "warning",
  "near limit": "warning",
  "near target": "warning",
  "due today": "warning",
  waiting: "warning",
  negotiating: "warning",
  sourcing: "warning",
  expiring: "warning",
  review: "warning",
  billed: "success",
  sent: "success",
  received: "success",
  cleared: "success",
  filed: "success",
  accrued: "success",
  verified: "success",
  enforced: "success",
  achieved: "success",
  "offer released": "success",
  complete: "success",
  closed: "success",
  clear: "success",
  matched: "success",
  "in stock": "success",
  draft: "neutral",
  discontinued: "neutral",
  mismatch: "danger",
  failed: "danger",
  blocked: "danger",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const tone = statusToneMap[status.toLowerCase()] ?? "neutral";
  return (
    <Badge tone={tone} dot className={className}>
      {status}
    </Badge>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-ruby-600">{eyebrow}</p>
        ) : null}
        <h1 className="font-sans text-[30px] font-bold tracking-tight text-stone-900 sm:text-[34px]">{title}</h1>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-500">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

const statToneMap = {
  red: "bg-honda-50 text-honda-600 ring-honda-100",
  blue: "bg-blue-50 text-blue-600 ring-blue-100",
  green: "bg-emerald-50 text-emerald-600 ring-emerald-100",
  amber: "bg-amber-50 text-amber-600 ring-amber-100",
  purple: "bg-violet-50 text-violet-600 ring-violet-100",
  slate: "bg-slate-100 text-slate-600 ring-slate-200",
};

export function StatCard({
  label,
  value,
  note,
  change,
  trend,
  icon: Icon,
  tone = "slate",
  className,
}: {
  label: string;
  value: string;
  note?: string;
  change?: string;
  trend?: "up" | "down";
  icon?: LucideIcon;
  tone?: keyof typeof statToneMap;
  className?: string;
}) {
  return (
    <div className={cn("card relative overflow-hidden p-6", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold text-slate-500">{label}</p>
          <p className="mt-2 font-sans text-[30px] font-bold leading-none tracking-tight text-stone-900">{value}</p>
        </div>
        {Icon ? (
          <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1", statToneMap[tone])}>
            <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
          </div>
        ) : null}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px]">
        {change ? (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 font-bold",
              trend === "down" ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600",
            )}
          >
            {change}
          </span>
        ) : null}
        {note ? <span className="text-slate-500">{note}</span> : null}
      </div>
    </div>
  );
}

export function Progress({
  value,
  tone = "red",
  className,
}: {
  value: number;
  tone?: "red" | "green" | "amber" | "blue" | "purple";
  className?: string;
}) {
  const bar = {
    red: "bg-honda-500",
    green: "bg-emerald-500",
    amber: "bg-amber-500",
    blue: "bg-blue-500",
    purple: "bg-violet-500",
  }[tone];
  return (
    <div className={cn("h-1.5 w-full overflow-hidden rounded-full bg-slate-100", className)}>
      <div className={cn("h-full rounded-full", bar)} style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
    </div>
  );
}

const avatarTones = [
  "bg-honda-100 text-honda-700",
  "bg-blue-100 text-blue-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-violet-100 text-violet-700",
  "bg-cyan-100 text-cyan-700",
];

export function Avatar({ name, size = "md", className }: { name: string; size?: "sm" | "md" | "lg"; className?: string }) {
  const sizes = { sm: "h-7 w-7 text-[10px]", md: "h-9 w-9 text-xs", lg: "h-11 w-11 text-sm" };
  const tone = avatarTones[name.charCodeAt(0) % avatarTones.length];
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-bold",
        sizes[size],
        tone,
        className,
      )}
      title={name}
    >
      {initials(name)}
    </span>
  );
}

export function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 px-3 pb-1 pt-4">
      <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">{label}</span>
      <span className="h-px flex-1 bg-white/10" />
    </div>
  );
}
