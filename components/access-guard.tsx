"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";
import { useBranch } from "@/components/branch-context";
import { useUser } from "@/components/user-context";
import { moduleForPath, moduleLabels } from "@/lib/access";
import { Card, PageHeader, StatusBadge } from "@/components/ui";

export function AccessGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, canAccessModule } = useUser();
  const { is2S } = useBranch();
  const module = moduleForPath(pathname);

  if (is2S && pathname.startsWith("/sales")) {
    return (
      <Restricted
        title="Sales is disabled for 2S"
        description="The 2S City branch is a service and parts operation. Switch to Honda 3S — Main or All Branches to use the sales module."
        moduleLabel="Sales"
        user={user}
        allowed={user.modules}
      />
    );
  }

  if (module && !canAccessModule(module)) {
    return (
      <Restricted
        title="This module is not approved"
        description={`Your account does not have access to ${moduleLabels[module] ?? "this module"}. The owner controls module and feature access from Admin → Department accounts.`}
        moduleLabel={moduleLabels[module] ?? "Restricted"}
        user={user}
        allowed={user.modules}
      />
    );
  }

  return <>{children}</>;
}

function Restricted({
  title,
  description,
  moduleLabel,
  user,
  allowed,
}: {
  title: string;
  description: string;
  moduleLabel: string;
  user: { name: string; role: string; email: string; home: string; initials: string };
  allowed: string[];
}) {
  return (
    <>
      <PageHeader eyebrow="Access control" title={title} description={description} />
      <div className="grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <div className="p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-100">
                <LockKeyhole className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-600">Restricted</p>
                <h2 className="mt-1 text-xl font-bold tracking-tight text-stone-900">{moduleLabel} access</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-stone-500">
                  Signed in as <strong className="text-stone-800">{user.name}</strong> · {user.role}. This account can only
                  open modules and features approved by the owner. Ask the admin to grant access, or switch to an approved
                  demo account.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50/70 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-stone-500">Your approved modules</span>
                <StatusBadge status="Active" />
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {allowed.length ? (
                  allowed.map((key) => (
                    <span
                      key={key}
                      className="rounded-full bg-white px-2.5 py-1 text-[10px] font-semibold text-stone-600 ring-1 ring-stone-200"
                    >
                      {moduleLabels[key as keyof typeof moduleLabels] ?? key}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-stone-400">No modules approved yet.</span>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Link href={user.home} className="btn-primary">
                Go to my workspace <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className="btn-secondary">
                View my access
              </Link>
              <Link href="/login" className="btn-secondary">
                Switch account
              </Link>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-5">
          <div className="p-6">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <p className="text-sm font-bold text-stone-900">How approval works</p>
            </div>
            <ol className="mt-4 space-y-4">
              {[
                "Owner creates a department account and selects modules + features.",
                "Account starts as Pending and cannot sign in.",
                "Owner approves it from Admin → Department accounts.",
                "The department only sees the approved modules and features.",
              ].map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-stone-900 text-[10px] font-bold text-white">
                    {index + 1}
                  </span>
                  <span className="text-xs leading-relaxed text-stone-600">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-5 rounded-xl bg-stone-900 p-4 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-champagne">Demo tip</p>
              <p className="mt-1 text-[11px] leading-relaxed text-stone-300">
                Sign in as <span className="font-mono text-white">zeeshan@demohonda.pk</span> to approve the pending Sales
                account or change any department permission.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
