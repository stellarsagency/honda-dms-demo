"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  BarChart3,
  Bell,
  Building2,
  Car,
  ChevronDown,
  ChevronsUpDown,
  CircleHelp,
  Command,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  UserCog,
  Users,
  Wallet,
  Wrench,
  X,
} from "lucide-react";
import { BranchProvider, useBranch } from "@/components/branch-context";
import { branches, currentUser, notifications } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Branch } from "@/lib/data";

const navSections = [
  {
    label: "Overview",
    items: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/customers", label: "Customers & Vehicles", icon: Users },
    ],
  },
  {
    label: "Operations",
    items: [
      { href: "/service", label: "Service", icon: Wrench },
      { href: "/sales", label: "Sales", icon: Car, salesOnly: true },
      { href: "/parts", label: "Parts & Inventory", icon: Package },
    ],
  },
  {
    label: "Business",
    items: [
      { href: "/corporate", label: "Corporate", icon: Building2 },
      { href: "/accounts", label: "Accounts", icon: Wallet },
    ],
  },
  {
    label: "People",
    items: [{ href: "/hr", label: "Human Resources", icon: Users }],
  },
  {
    label: "Insights",
    items: [{ href: "/reports", label: "Reports & Leakage", icon: BarChart3 }],
  },
  {
    label: "Administration",
    items: [
      { href: "/admin", label: "Admin & Users", icon: ShieldCheck },
      { href: "/settings", label: "Settings", icon: Settings },
    ],
  },
];

const pageLabels: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/service": "Service Department",
  "/sales": "Sales Department",
  "/parts": "Parts & Inventory",
  "/corporate": "Corporate Accounts",
  "/accounts": "Accounts & Finance",
  "/hr": "Human Resources",
  "/reports": "Reports & Leakage",
  "/admin": "Admin & Users",
  "/settings": "Settings",
};

function Brand() {
  return (
    <Link href="/dashboard" className="flex items-center gap-3">
      <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-ruby-600 to-honda-700 text-xl font-sans italic text-white shadow-[0_14px_30px_-12px_rgba(185,28,44,0.8)]">
        H
        <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-obsidian bg-emerald-300" />
      </span>
      <span className="leading-none">
        <span className="block font-sans text-[19px] font-bold tracking-[0.12em] text-white">HONDA</span>
        <span className="mt-1 block text-[9px] font-medium tracking-[0.32em] text-champagne/80">DEALER DMS</span>
      </span>
    </Link>
  );
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { branch, is2S } = useBranch();

  return (
    <div className="flex h-full flex-col bg-gradient-to-b from-obsidian via-ink-900 to-ink-800 text-slate-200">
      <div className="flex h-16 items-center border-b border-white/10 px-5">
        <Brand />
      </div>

      <div className="px-4 pt-4">
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">Active branch</span>
            <span
              className={cn(
                "rounded-md px-1.5 py-0.5 text-[9px] font-bold",
                is2S ? "bg-blue-500/15 text-blue-300" : "bg-emerald-500/15 text-emerald-300",
              )}
            >
              {branch.type}
            </span>
          </div>
          <p className="mt-1.5 text-[13px] font-semibold text-white">{branch.name}</p>
          <p className="mt-0.5 text-[10px] text-slate-500">
            {branch.code} · {branch.city}
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {navSections.map((section) => {
          const items = section.items.filter((item) => !(item.salesOnly && is2S));
          if (!items.length) return null;
          return (
            <div key={section.label} className="mb-4">
              <p className="mb-1.5 px-3 text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                {section.label}
              </p>
              <div className="space-y-0.5">
                {items.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition",
                        active
                          ? "bg-white/[0.09] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                          : "text-slate-300/75 hover:bg-white/[0.05] hover:text-slate-100",
                      )}
                    >
                      {active ? (
                        <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-honda-500" />
                      ) : null}
                      <Icon
                        className={cn(
                          "h-[17px] w-[17px] shrink-0 transition",
                          active ? "text-honda-400" : "text-slate-500 group-hover:text-slate-300",
                        )}
                        strokeWidth={1.9}
                      />
                      <span className="truncate">{item.label}</span>
                      {item.href === "/reports" ? (
                        <span className="ml-auto rounded-md bg-honda-500/15 px-1.5 py-0.5 text-[9px] font-bold text-honda-300">
                          6
                        </span>
                      ) : null}
                      {item.href === "/service" ? (
                        <span className="ml-auto rounded-md bg-white/[0.07] px-1.5 py-0.5 text-[9px] font-bold text-slate-400">
                          47
                        </span>
                      ) : null}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      <div className="border-t border-white/[0.07] p-3">
        <div className="mb-2 flex items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-500/[0.08] px-3 py-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[10px] font-medium text-emerald-300">Demo environment · Mock data</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl px-2 py-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-[11px] font-bold text-white">
            {currentUser.initials}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[12px] font-semibold text-white">{currentUser.name}</p>
            <p className="truncate text-[9px] text-slate-500">{currentUser.role}</p>
          </div>
          <Link href="/login" className="rounded-lg p-1.5 text-slate-500 transition hover:bg-white/10 hover:text-white" title="Sign out">
            <LogOut className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function BranchSelector() {
  const { branchId, setBranchId, branch } = useBranch();
  return (
    <label className="relative flex items-center">
      <Building2 className="pointer-events-none absolute left-3 h-4 w-4 text-slate-400" />
      <select
        value={branchId}
        onChange={(event) => setBranchId(event.target.value as Branch["id"])}
        className="h-9 w-32 appearance-none rounded-xl border border-slate-200 bg-white pl-9 pr-8 text-xs font-semibold text-slate-700 shadow-sm outline-none transition hover:border-slate-300 focus:border-honda-400 focus:ring-4 focus:ring-honda-500/10 sm:w-auto sm:pr-9"
        aria-label="Switch branch"
      >
        {branches.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      <ChevronsUpDown className="pointer-events-none absolute right-3 h-3.5 w-3.5 text-slate-400" />
      <span className="sr-only">Current branch: {branch.name}</span>
    </label>
  );
}

function NotificationMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const tones = {
    warning: "bg-amber-500",
    danger: "bg-honda-500",
    success: "bg-emerald-500",
    info: "bg-blue-500",
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((value) => !value)} className="icon-btn relative" aria-label="Notifications">
        <Bell className="h-[18px] w-[18px]" />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-honda-500" />
      </button>
      {open ? (
        <div className="absolute right-0 top-11 z-50 w-[340px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lift">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <p className="text-sm font-bold text-slate-900">Notifications</p>
            <span className="rounded-full bg-honda-50 px-2 py-0.5 text-[10px] font-bold text-honda-600">4 new</span>
          </div>
          <div className="max-h-[340px] overflow-y-auto">
            {notifications.map((item) => (
              <div key={item.id} className="flex gap-3 border-b border-slate-50 px-4 py-3 transition last:border-0 hover:bg-slate-50">
                <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", tones[item.tone])} />
                <div>
                  <p className="text-[12px] font-semibold text-slate-800">{item.title}</p>
                  <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">{item.body}</p>
                  <p className="mt-1 text-[10px] text-slate-400">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full border-t border-slate-100 py-2.5 text-center text-[11px] font-semibold text-honda-600 hover:bg-slate-50">
            View all notifications
          </button>
        </div>
      ) : null}
    </div>
  );
}

function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((value) => !value)} className="flex items-center gap-2 rounded-xl p-1 transition hover:bg-slate-100">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-[11px] font-bold text-white">
          {currentUser.initials}
        </span>
        <span className="hidden text-left lg:block">
          <span className="block text-[11px] font-bold leading-tight text-slate-800">{currentUser.name}</span>
          <span className="block text-[9px] leading-tight text-slate-500">Group Admin</span>
        </span>
        <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 lg:block" />
      </button>
      {open ? (
        <div className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lift">
          <div className="border-b border-slate-100 px-4 py-3">
            <p className="text-xs font-bold text-slate-800">{currentUser.name}</p>
            <p className="mt-0.5 text-[10px] text-slate-500">{currentUser.email}</p>
          </div>
          <div className="p-1.5">
            <Link href="/admin" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
              <UserCog className="h-4 w-4 text-slate-400" /> My account
            </Link>
            <Link href="/settings" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
              <Settings className="h-4 w-4 text-slate-400" /> Settings
            </Link>
            <Link href="/reports" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 hover:bg-slate-50">
              <FileText className="h-4 w-4 text-slate-400" /> Audit log
            </Link>
          </div>
          <div className="border-t border-slate-100 p-1.5">
            <Link href="/login" className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-honda-600 hover:bg-honda-50">
              <LogOut className="h-4 w-4" /> Sign out
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { is2S } = useBranch();

  const allItems = useMemo(
    () =>
      navSections
        .flatMap((section) => section.items)
        .filter((item) => !(item.salesOnly && is2S))
        .concat([
          { href: "/service", label: "Job Cards", icon: Wrench },
          { href: "/service", label: "Workshop Board", icon: Wrench },
          { href: "/accounts", label: "Invoices & Receivables", icon: Wallet },
          { href: "/hr", label: "Payroll", icon: Users },
          { href: "/reports", label: "Leakage Exceptions", icon: BarChart3 },
        ]),
    [is2S],
  );

  const filtered = allItems.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-ink-950/40 px-4 pt-[12vh] backdrop-blur-sm" onClick={onClose}>
      <div className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl" onClick={(event) => event.stopPropagation()}>
        <div className="flex items-center gap-3 border-b border-slate-100 px-4">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search modules, job cards, customers..."
            className="h-14 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
          />
          <button onClick={onClose} className="rounded-md border border-slate-200 px-1.5 py-0.5 text-[10px] font-semibold text-slate-400">
            ESC
          </button>
        </div>
        <div className="max-h-[320px] overflow-y-auto p-2">
          <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Quick navigation</p>
          {filtered.length ? (
            filtered.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={`${item.href}-${item.label}-${index}`}
                  onClick={() => {
                    router.push(item.href);
                    onClose();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-50"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                    <Icon className="h-4 w-4" />
                  </span>
                  {item.label}
                  <span className="ml-auto text-[10px] text-slate-400">{item.href}</span>
                </button>
              );
            })
          ) : (
            <p className="px-3 py-8 text-center text-sm text-slate-400">No results found</p>
          )}
        </div>
        <div className="flex items-center gap-4 border-t border-slate-100 bg-slate-50/60 px-4 py-2 text-[10px] text-slate-400">
          <span className="flex items-center gap-1"><Command className="h-3 w-3" /> K to open</span>
          <span>↑↓ navigate</span>
          <span>↵ select</span>
        </div>
      </div>
    </div>
  );
}

function Topbar({ onMenu, onSearch }: { onMenu: () => void; onSearch: () => void }) {
  const pathname = usePathname();
  const label = pageLabels[pathname] ?? "Honda DMS";
  const { is2S } = useBranch();

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-ivory/75 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-7">
        <button className="icon-btn lg:hidden" onClick={onMenu} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden min-w-0 md:block">
          <p className="text-[10px] font-medium text-slate-400">Honda Dealer DMS / {label}</p>
          <p className="mt-0.5 text-[13px] font-bold text-slate-800">{label}</p>
        </div>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={onSearch}
            className="hidden h-9 w-[220px] items-center gap-2 rounded-full border border-stone-200/90 bg-white/70 px-4 text-left text-xs text-stone-500 shadow-sm transition hover:border-stone-300 hover:bg-white md:flex xl:w-[280px]"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="flex-1 truncate">Search anything...</span>
            <kbd className="rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-semibold text-slate-400">⌘K</kbd>
          </button>
          <button onClick={onSearch} className="icon-btn md:hidden" aria-label="Search">
            <Search className="h-[18px] w-[18px]" />
          </button>

          <BranchSelector />

          <span className="mx-1 hidden h-6 w-px bg-slate-200 sm:block" />
          <NotificationMenu />
          <button className="icon-btn hidden sm:inline-flex" aria-label="Help">
            <CircleHelp className="h-[18px] w-[18px]" />
          </button>
          <UserMenu />
        </div>
      </div>

      {is2S && pathname.startsWith("/sales") ? (
        <div className="flex items-center gap-2 border-t border-amber-200 bg-amber-50 px-4 py-2 text-[11px] font-medium text-amber-800 sm:px-6">
          <Sparkles className="h-3.5 w-3.5" />
          Sales module is disabled for 2S branches. Switch to <strong>3S Main</strong> or <strong>All Branches</strong> to view sales.
        </div>
      ) : null}
    </header>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    function handler(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((value) => !value);
      }
      if (event.key === "Escape") setSearchOpen(false);
    }
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <BranchProvider>
      <div className="min-h-screen bg-mist">
        <aside className="fixed inset-y-0 left-0 z-50 hidden w-[260px] lg:block">
          <Sidebar />
        </aside>

        {mobileOpen ? (
          <div className="fixed inset-0 z-[60] lg:hidden">
            <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <aside className="absolute inset-y-0 left-0 w-[280px] shadow-2xl">
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute -right-11 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-700 shadow-lg"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
              <Sidebar onNavigate={() => setMobileOpen(false)} />
            </aside>
          </div>
        ) : null}

        <div className="lg:pl-[260px]">
          <Topbar onMenu={() => setMobileOpen(true)} onSearch={() => setSearchOpen(true)} />
          <main className="mx-auto w-full max-w-[1600px] p-4 sm:p-6 lg:p-7">
            <div className="animate-fade-up">{children}</div>
          </main>
          <footer className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center justify-between gap-2 px-4 pb-6 text-[10px] text-slate-400 sm:px-6 lg:px-7">
            <span>© 2026 Demo Honda Group · Dealer Management System</span>
            <span>Demo build 1.0 · All data is fictional</span>
          </footer>
        </div>

        <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      </div>
    </BranchProvider>
  );
}
