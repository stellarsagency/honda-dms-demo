"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, Mail, ShieldCheck } from "lucide-react";
import { demoUsers } from "@/components/user-context";

export default function LoginPage() {
  const router = useRouter();

  function signIn(email: string, href: string) {
    const user = demoUsers[email];
    if (user) window.localStorage.setItem("dms_user", JSON.stringify(user));
    router.push(href);
  }

  return (
    <div className="min-h-screen bg-ink-900">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-ink-950 lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(225,29,46,0.28),transparent_35%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.2),transparent_35%)]" />
          <div className="relative">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-honda-600 text-xl font-black italic text-white shadow-[0_12px_30px_-10px_rgba(225,29,46,0.9)]">
                H
              </span>
              <span className="leading-none">
                <span className="block text-lg font-black tracking-[0.18em] text-white">HONDA</span>
                <span className="mt-1 block text-[10px] font-semibold tracking-[0.3em] text-slate-400">DEALER DMS</span>
              </span>
            </div>
            <h1 className="mt-16 max-w-lg text-4xl font-extrabold leading-tight tracking-tight text-white">
              One system for your 3S and 2S branches.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
              Sales, service, parts, corporate, accounts and HR — with branch isolation, approval control and leakage visibility built in.
            </p>
          </div>
          <div className="relative grid grid-cols-2 gap-3">
            {[
              { label: "Branches", value: "2 (3S + 2S)" },
              { label: "Users", value: "86 employees" },
              { label: "Job cards", value: "47 open" },
              { label: "Leakage flags", value: "6 open" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                <p className="mt-1 text-lg font-extrabold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center bg-mist p-6 sm:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-honda-600 text-lg font-black italic text-white">
                  H
                </span>
                <span className="leading-none">
                  <span className="block text-base font-black tracking-[0.16em] text-slate-900">HONDA</span>
                  <span className="mt-1 block text-[9px] font-semibold tracking-[0.28em] text-slate-500">DEALER DMS</span>
                </span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-honda-600">Welcome back</p>
              <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900">Sign in to your account</h2>
              <p className="mt-1 text-sm text-slate-500">Demo credentials are pre-filled. Click sign in to continue.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="field-label">Email address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input className="field pl-10" defaultValue="zeeshan@demohonda.pk" />
                </div>
              </div>
              <div>
                <label className="field-label">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input className="field pl-10" type="password" defaultValue="demo1234" />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-slate-300 text-honda-600 focus:ring-honda-500" />
                  Remember me
                </label>
                <a href="#" className="font-semibold text-honda-600 hover:text-honda-700">
                  Forgot password?
                </a>
              </div>

              <button onClick={() => signIn("zeeshan@demohonda.pk", "/dashboard")} className="btn-primary flex w-full">
                Sign in
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-3 text-xs text-slate-500">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                Two-factor authentication is enabled for admin accounts. Demo bypasses 2FA.
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Demo accounts</p>
              <div className="mt-3 space-y-2 text-xs">
                {[
                  { email: "zeeshan@demohonda.pk", role: "Owner / Group Administrator", href: "/dashboard" },
                  { email: "hr@demohonda.pk", role: "HR Department Account", href: "/hr" },
                  { email: "service@demohonda.pk", role: "Service Department Account", href: "/service" },
                  { email: "accounts@demohonda.pk", role: "Accounts Department Account", href: "/accounts" },
                  { email: "usman@demohonda.pk", role: "Branch Manager · 3S", href: "/dashboard" },
                  { email: "adeel@demohonda.pk", role: "Service Advisor · 2S", href: "/service" },
                ].map((account) => (
                  <button
                    key={account.email}
                    onClick={() => signIn(account.email, account.href)}
                    className="flex w-full items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 text-left transition hover:bg-stone-100"
                  >
                    <span className="font-mono text-[11px] text-slate-600">{account.email}</span>
                    <span className="text-[10px] font-semibold text-slate-400">{account.role} →</span>
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-6 text-center text-[10px] text-slate-400">
              Demo build · All data is fictional · No real database connected
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
