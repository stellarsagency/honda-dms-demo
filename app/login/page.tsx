"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useUser } from "@/components/user-context";
import { featureCatalog, moduleCatalog } from "@/lib/access";

const modulesOnLeft = ["Sales", "Service", "Parts", "Corporate", "Accounts", "HR"];

function statusStyles(status: string) {
  switch (status) {
    case "Active":
      return { dot: "bg-emerald-500", text: "text-emerald-700", chip: "bg-emerald-50 text-emerald-700 ring-emerald-200/70", initials: "bg-emerald-50 text-emerald-700 ring-emerald-100" };
    case "Pending":
      return { dot: "bg-amber-500", text: "text-amber-700", chip: "bg-amber-50 text-amber-700 ring-amber-200/70", initials: "bg-amber-50 text-amber-700 ring-amber-100" };
    default:
      return { dot: "bg-rose-500", text: "text-rose-700", chip: "bg-rose-50 text-rose-700 ring-rose-200/70", initials: "bg-rose-50 text-rose-700 ring-rose-100" };
  }
}

export default function LoginPage() {
  const router = useRouter();
  const { accounts, login, hydrated } = useUser();
  const [email, setEmail] = useState("zeeshan@demohonda.pk");
  const [password, setPassword] = useState("demo1234");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(true);

  const demoAccounts = useMemo(() => {
    const order = { Active: 0, Pending: 1, Suspended: 2, Rejected: 3 };
    return [...accounts].sort((a, b) => {
      if (a.isOwner) return -1;
      if (b.isOwner) return 1;
      return order[a.status] - order[b.status];
    });
  }, [accounts]);

  function signIn(nextEmail: string, nextPassword: string) {
    setError("");
    const result = login(nextEmail, nextPassword);
    if (!result.ok) {
      setError(result.error);
      setEmail(nextEmail);
      setPassword(nextPassword);
      return;
    }
    router.push(result.user.home);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    signIn(email, password);
  }

  return (
    <div className="min-h-screen bg-[#07090f]">
      <div className="grid min-h-screen lg:grid-cols-[1.08fr_0.92fr]">
        {/* ---------------------------------------------------------- Hero */}
        <div className="relative hidden overflow-hidden bg-[#07090f] lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-40 -top-48 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(225,29,46,0.26),transparent_66%)] blur-3xl" />
            <div className="absolute -bottom-52 -right-32 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(217,199,163,0.16),transparent_66%)] blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.16] [mask-image:linear-gradient(to_bottom,black_0%,transparent_88%)]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
                backgroundSize: "46px 46px",
              }}
            />
            <div className="absolute -right-16 bottom-10 select-none text-[24rem] font-black italic leading-none text-white/[0.025]">
              H
            </div>
            <div className="absolute left-12 top-1/2 hidden h-56 w-px bg-gradient-to-b from-transparent via-champagne/40 to-transparent xl:block" />
          </div>

          <div className="relative max-w-2xl">
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-[#ff4b5c] via-[#e11d2e] to-[#7f0d1c] text-2xl font-black italic text-white shadow-[0_18px_45px_-16px_rgba(225,29,46,0.95)]">
                H
              </span>
              <span className="leading-none">
                <span className="block text-[19px] font-black tracking-[0.2em] text-white">HONDA</span>
                <span className="mt-1.5 block text-[9px] font-semibold tracking-[0.34em] text-champagne/75">
                  DEALER MANAGEMENT
                </span>
              </span>
            </div>

            <p className="mt-14 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.32em] text-champagne/80">
              <Sparkles className="h-3.5 w-3.5" /> Private dealer network · 3S + 2S
            </p>

            <h1 className="mt-5 max-w-xl font-serif text-[3.15rem] font-medium leading-[1.04] tracking-[-0.035em] text-white xl:text-[3.7rem]">
              One command center for{" "}
              <span className="bg-gradient-to-r from-[#f7e8c8] via-[#d9c7a3] to-[#fff4dd] bg-clip-text italic text-transparent">
                every Honda branch
              </span>
              .
            </h1>

            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-slate-300/90">
              Sales, service, parts, corporate, accounts and HR — unified in one luxury workspace with branch isolation,
              owner approval and feature-level access control.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {modulesOnLeft.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.055] px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-300 backdrop-blur"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-honda-500 shadow-[0_0_10px_rgba(245,45,67,0.9)]" />
                  {item}
                </span>
              ))}
            </div>

            <div className="relative mt-10 max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.055] p-5 backdrop-blur-xl">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/70 to-transparent" />
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-champagne/25 to-champagne/5 text-champagne ring-1 ring-champagne/25">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-champagne">Approval-first access</p>
                  <p className="mt-2 text-[12px] leading-relaxed text-slate-300/90">
                    The owner creates each department account, selects the exact modules and features, then approves it.
                    Pending accounts cannot sign in — what you see is only what was approved for you.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative grid grid-cols-2 gap-x-8 gap-y-5 border-t border-white/10 pt-8 sm:grid-cols-4">
            {[
              { label: "Branches", value: "2", note: "3S + 2S" },
              { label: "Modules", value: String(moduleCatalog.length - 1), note: "Permissioned" },
              { label: "Feature controls", value: String(featureCatalog.length), note: "Owner approved" },
              { label: "Demo accounts", value: String(accounts.length), note: "Ready to sign in" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
                <p className="mt-1.5 font-serif text-3xl font-medium text-white">{item.value}</p>
                <p className="mt-0.5 text-[10px] text-slate-500">{item.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ----------------------------------------------------------- Form */}
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ivory px-4 py-8 sm:px-8 sm:py-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(225,29,46,0.1),transparent_68%)] blur-2xl" />
            <div className="absolute -bottom-40 -left-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(217,199,163,0.28),transparent_68%)] blur-2xl" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.65),transparent_45%)]" />
          </div>

          <div className="relative w-full max-w-[470px] animate-fade-up">
            <div className="mb-6 flex items-center justify-between lg:hidden">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#ff4b5c] via-[#e11d2e] to-[#7f0d1c] text-lg font-black italic text-white shadow-[0_14px_30px_-14px_rgba(225,29,46,0.9)]">
                  H
                </span>
                <span className="leading-none">
                  <span className="block text-base font-black tracking-[0.16em] text-stone-900">HONDA</span>
                  <span className="mt-1 block text-[8px] font-semibold tracking-[0.26em] text-stone-500">
                    DEALER MANAGEMENT
                  </span>
                </span>
              </div>
              <span className="rounded-full border border-stone-200 bg-white/80 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-stone-500 backdrop-blur">
                Demo
              </span>
            </div>

            <div className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-[0_36px_90px_-48px_rgba(15,23,42,0.5)] backdrop-blur-xl sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.26em] text-honda-700">
                    <Sparkles className="h-3.5 w-3.5" /> Secure demo workspace
                  </p>
                  <h2 className="mt-3 font-serif text-[2.15rem] font-medium leading-tight tracking-[-0.03em] text-stone-900">
                    Welcome back.
                  </h2>
                  <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-stone-500">
                    Sign in to your approved dealer workspace. Every module is permissioned by the owner.
                  </p>
                </div>
                <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-stone-900 text-sm font-black italic text-white shadow-lg sm:flex">
                  H
                </span>
              </div>

              <div className="my-6 h-px bg-gradient-to-r from-stone-200 via-stone-100 to-transparent" />

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    className="mb-2 block text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <input
                      id="email"
                      className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50/70 pl-11 pr-4 text-sm font-medium text-stone-900 outline-none transition placeholder:font-normal placeholder:text-stone-400 focus:border-honda-500 focus:bg-white focus:ring-4 focus:ring-honda-600/10"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      autoComplete="username"
                      placeholder="name@demohonda.pk"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <span className="text-[10px] font-semibold text-stone-400">Demo: demo1234</span>
                  </div>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                    <input
                      id="password"
                      className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50/70 pl-11 pr-12 text-sm font-medium tracking-wide text-stone-900 outline-none transition placeholder:font-normal placeholder:tracking-normal placeholder:text-stone-400 focus:border-honda-500 focus:bg-white focus:ring-4 focus:ring-honda-600/10"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      autoComplete="current-password"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-stone-400 transition hover:bg-white hover:text-stone-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-honda-500/40"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 pt-0.5">
                  <label className="flex cursor-pointer items-center gap-2.5 text-[11px] font-medium text-stone-600">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(event) => setRemember(event.target.checked)}
                      className="h-4 w-4 rounded border-stone-300 text-honda-600 focus:ring-honda-500"
                    />
                    Remember this device
                  </label>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-emerald-700">
                    <ShieldCheck className="h-3.5 w-3.5" /> Encrypted demo
                  </span>
                </div>

                {error ? (
                  <div className="flex items-start gap-3 rounded-2xl border border-rose-200/80 bg-rose-50/90 p-3.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-600 ring-1 ring-rose-200/70">
                      <AlertCircle className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-rose-600">Sign-in blocked</p>
                      <p className="mt-1 text-[11px] leading-relaxed text-rose-800">{error}</p>
                    </div>
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={!hydrated}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#c2182b] via-[#e11d2e] to-[#a50f20] text-[13px] font-bold tracking-wide text-white shadow-[0_20px_40px_-20px_rgba(185,28,44,0.95)] transition hover:from-[#d01e33] hover:to-[#8f0d1c] focus:outline-none focus-visible:ring-4 focus-visible:ring-honda-600/25 disabled:cursor-wait disabled:opacity-60"
                >
                  {hydrated ? "Sign in to workspace" : "Preparing workspace…"}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </button>

                <div className="flex items-center gap-2.5 rounded-2xl border border-stone-200/80 bg-stone-50/70 px-3.5 py-3">
                  <Lock className="h-3.5 w-3.5 shrink-0 text-stone-400" />
                  <p className="text-[10px] leading-relaxed text-stone-500">
                    Pending department accounts stay locked until the owner approves them in Admin.
                  </p>
                </div>
              </form>
            </div>

            {/* ------------------------------------------------ Demo accounts */}
            <div className="mt-5 rounded-[1.75rem] border border-stone-200/80 bg-gradient-to-b from-white to-stone-50/60 p-4 shadow-[0_24px_60px_-42px_rgba(15,23,42,0.45)] backdrop-blur sm:p-5">
              <div className="flex items-center justify-between gap-3 px-1">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">Quick demo access</p>
                  <p className="mt-1 text-[10px] text-stone-400">
                    {hydrated ? "One click · no typing required" : "Loading accounts…"}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-stone-900 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-champagne">
                  <Sparkles className="h-3 w-3" /> Live
                </span>
              </div>

              <div className="mt-3 space-y-1">
                {hydrated ? (
                  demoAccounts.map((account) => {
                    const styles = statusStyles(account.status);
                    return (
                      <button
                        key={account.email}
                        onClick={() => signIn(account.email, "demo1234")}
                        className="group flex w-full items-center gap-3 rounded-2xl border border-transparent px-2.5 py-2.5 text-left transition hover:border-stone-200 hover:bg-white hover:shadow-[0_10px_24px_-18px_rgba(15,23,42,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-honda-500/30"
                      >
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold ring-1 ${styles.initials}`}
                        >
                          {account.initials}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[12px] font-semibold text-stone-800">
                            {account.email}
                          </span>
                          <span className="mt-0.5 block truncate text-[10px] text-stone-500">
                            {account.role} · {account.modules.length} modules
                          </span>
                        </span>
                        <span className="flex shrink-0 items-center gap-1.5">
                          <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                          <span className={`text-[9px] font-bold uppercase tracking-wide ${styles.text}`}>
                            {account.status}
                          </span>
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 shrink-0 text-stone-300 transition group-hover:translate-x-0.5 group-hover:text-stone-500" />
                      </button>
                    );
                  })
                ) : (
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-center gap-3 rounded-2xl px-2.5 py-2.5">
                      <span className="h-9 w-9 animate-pulse rounded-xl bg-stone-200" />
                      <span className="flex-1 space-y-2">
                        <span className="block h-2.5 w-2/3 animate-pulse rounded-full bg-stone-200" />
                        <span className="block h-2 w-1/2 animate-pulse rounded-full bg-stone-100" />
                      </span>
                    </div>
                  ))
                )}
              </div>

              <p className="mt-3 border-t border-stone-200/70 px-1 pt-3 text-[10px] leading-relaxed text-stone-400">
                The Sales account is intentionally pending — sign in as the owner to approve it and watch the Sales module
                appear for that account.
              </p>
            </div>

            <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[9px] uppercase tracking-[0.16em] text-stone-400">
              <ShieldCheck className="h-3 w-3" /> Demo build · All data is fictional · No real database
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
