"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, LockKeyhole, ShieldCheck, UserCog } from "lucide-react";
import { useUser } from "@/components/user-context";
import { Avatar, Badge, Card, CardHeader, PageHeader, StatusBadge } from "@/components/ui";
import { featureCatalog, moduleCatalog, moduleLabels } from "@/lib/access";

export default function ProfilePage() {
  const router = useRouter();
  const { user, accounts, canAccessModule, switchAccount } = useUser();

  const modules = moduleCatalog.filter((module) => module.key !== "profile");
  const approved = modules.filter((module) => canAccessModule(module.key));
  const restricted = modules.filter((module) => !canAccessModule(module.key));
  const otherAccounts = accounts.filter(
    (account) => account.email !== user.email && account.status === "Active",
  );

  function quickSwitch(email: string) {
    const result = switchAccount(email);
    if (result.ok) router.push(result.user.home);
  }

  return (
    <>
      <PageHeader
        eyebrow="Account & permissions"
        title="My access"
        description="Your department account, approved modules and the exact features the owner has allowed."
        actions={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5" /> {user.status}
          </span>
        }
      />

      <div className="grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-4">
          <div className="p-6">
            <div className="flex items-center gap-3">
              <Avatar name={user.name} size="lg" />
              <div>
                <p className="text-lg font-bold tracking-tight text-stone-900">{user.name}</p>
                <p className="text-xs text-stone-500">{user.role}</p>
              </div>
            </div>
            <div className="mt-5 space-y-3 text-xs">
              {[
                { label: "Email", value: user.email },
                { label: "Branch scope", value: user.branchScope },
                { label: "Account status", value: user.status },
                { label: "Approved by", value: user.approvedBy ?? "System" },
                { label: "Created", value: user.createdAt ?? "—" },
                { label: "Home module", value: moduleLabels[user.home.replace("/", "") as keyof typeof moduleLabels] ?? user.home },
              ].map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-3 border-b border-stone-100 pb-2.5 last:border-0 last:pb-0">
                  <span className="text-stone-500">{item.label}</span>
                  <span className="max-w-[190px] text-right font-semibold text-stone-800">{item.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-2xl bg-stone-900 p-4 text-white">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-champagne">
                <UserCog className="h-3.5 w-3.5" /> Approval rule
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-stone-300">
                This account can only open the modules and features approved by the owner. Direct URL access to a
                restricted module is blocked.
              </p>
            </div>
          </div>
        </Card>

        <div className="space-y-5 lg:col-span-8">
          <Card>
            <CardHeader
              title="Approved modules"
              subtitle={`${approved.length} of ${modules.length} modules unlocked`}
              action={<Badge tone="success" dot>{approved.length} active</Badge>}
            />
            <div className="grid gap-3 p-5 sm:grid-cols-2">
              {approved.map((module) => {
                const features = featureCatalog.filter(
                  (feature) => feature.module === module.key && (user.isOwner || user.features.includes(feature.key)),
                );
                return (
                  <div key={module.key} className="rounded-2xl border border-stone-200 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-[12px] font-bold text-stone-800">{module.label}</p>
                        <p className="mt-0.5 text-[10px] leading-relaxed text-stone-500">{module.description}</p>
                      </div>
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200">
                        <Check className="h-3 w-3" />
                      </span>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[9px] font-semibold text-stone-600">
                        {user.isOwner ? "All features" : `${features.length} features`}
                      </span>
                      <Link
                        href={`/${module.key}`}
                        className="inline-flex items-center gap-0.5 text-[9px] font-bold text-honda-600 hover:text-honda-700"
                      >
                        Open <ArrowRight className="h-2.5 w-2.5" />
                      </Link>
                    </div>
                    {!user.isOwner && features.length ? (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-[9px] font-semibold text-stone-400 hover:text-stone-600">
                          Show features
                        </summary>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {features.map((feature) => (
                            <span
                              key={feature.key}
                              className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-700"
                            >
                              {feature.label}
                            </span>
                          ))}
                        </div>
                      </details>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </Card>

          {restricted.length ? (
            <Card>
              <CardHeader title="Restricted modules" subtitle="Ask the owner to approve these if required" />
              <div className="grid gap-2 p-5 sm:grid-cols-2">
                {restricted.map((module) => (
                  <div
                    key={module.key}
                    className="flex items-center gap-3 rounded-xl border border-stone-200 bg-stone-50/60 px-3 py-2.5"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-stone-400 ring-1 ring-stone-200">
                      <LockKeyhole className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold text-stone-600">{module.label}</p>
                      <p className="text-[9px] text-stone-400">Not approved for this account</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}

          <Card>
            <CardHeader title="Switch demo account" subtitle="Presentation shortcut — no password required in demo" />
            <div className="grid gap-2 p-5 sm:grid-cols-2">
              {otherAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => quickSwitch(account.email)}
                  className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-left transition hover:border-stone-300 hover:bg-stone-50"
                >
                  <Avatar name={account.name} size="sm" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[11px] font-bold text-stone-800">{account.name}</p>
                    <p className="truncate text-[9px] text-stone-400">{account.role}</p>
                  </div>
                  <StatusBadge status={account.status} />
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
