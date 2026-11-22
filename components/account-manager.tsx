"use client";

import { useMemo, useState } from "react";
import {
  Ban,
  Check,
  KeyRound,
  LockKeyhole,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useUser, type DemoUser } from "@/components/user-context";
import { Avatar, Card, CardHeader, StatusBadge } from "@/components/ui";
import {
  assignableModules,
  featuresForModule,
  moduleLabels,
  type ModuleKey,
} from "@/lib/access";
import { cn } from "@/lib/utils";

type FormState = {
  name: string;
  email: string;
  role: string;
  branchScope: string;
  password: string;
  modules: ModuleKey[];
  features: string[];
};

const emptyForm: FormState = {
  name: "",
  email: "",
  role: "",
  branchScope: "All branches",
  password: "demo1234",
  modules: ["dashboard"],
  features: [],
};

export function AccountManager() {
  const {
    user,
    accounts,
    createAccount,
    updateAccount,
    approveAccount,
    rejectAccount,
    suspendAccount,
    reactivateAccount,
    deleteAccount,
    resetDemo,
  } = useUser();

  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<"create" | "edit" | null>(null);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [formError, setFormError] = useState("");
  const [notice, setNotice] = useState("");

  const counts = useMemo(
    () => ({
      active: accounts.filter((account) => account.status === "Active").length,
      pending: accounts.filter((account) => account.status === "Pending").length,
      blocked: accounts.filter((account) => account.status === "Suspended" || account.status === "Rejected").length,
    }),
    [accounts],
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return accounts;
    return accounts.filter((account) =>
      [account.name, account.email, account.role, account.branchScope].some((value) =>
        value.toLowerCase().includes(term),
      ),
    );
  }, [accounts, search]);

  function openCreate() {
    setMode("create");
    setEditingEmail(null);
    setForm(emptyForm);
    setFormError("");
    setNotice("");
  }

  function openEdit(account: DemoUser) {
    if (account.isOwner) return;
    setMode("edit");
    setEditingEmail(account.email);
    setForm({
      name: account.name,
      email: account.email,
      role: account.role,
      branchScope: account.branchScope,
      password: account.password,
      modules: account.modules,
      features: account.features,
    });
    setFormError("");
    setNotice("");
  }

  function closeModal() {
    setMode(null);
    setEditingEmail(null);
    setFormError("");
  }

  function toggleModule(module: ModuleKey) {
    const moduleFeatures = featuresForModule(module).map((item) => item.key);
    setForm((current) => {
      if (current.modules.includes(module)) {
        return {
          ...current,
          modules: current.modules.filter((item) => item !== module),
          features: current.features.filter((item) => !moduleFeatures.includes(item)),
        };
      }
      return {
        ...current,
        modules: [...current.modules, module],
        features: Array.from(new Set([...current.features, ...moduleFeatures])),
      };
    });
  }

  function toggleFeature(key: string) {
    setForm((current) => ({
      ...current,
      features: current.features.includes(key)
        ? current.features.filter((item) => item !== key)
        : [...current.features, key],
    }));
  }

  function save(approveNow = false) {
    setFormError("");
    if (!form.name.trim() || !form.email.trim() || !form.role.trim()) {
      setFormError("Name, email and role are required.");
      return;
    }
    if (!form.modules.length) {
      setFormError("Select at least one module.");
      return;
    }

    if (mode === "edit" && editingEmail) {
      updateAccount(editingEmail, {
        name: form.name.trim(),
        role: form.role.trim(),
        branchScope: form.branchScope.trim() || "All branches",
        modules: form.modules,
        features: form.features,
      });
      setNotice(`${form.name.trim()} access updated. Changes apply on their next sign-in.`);
      closeModal();
      return;
    }

    const result = createAccount({
      name: form.name,
      email: form.email,
      role: form.role,
      password: form.password,
      branchScope: form.branchScope,
      modules: form.modules,
      features: form.features,
    });
    if (!result.ok) {
      setFormError(result.error ?? "Could not create the account.");
      return;
    }
    if (approveNow) {
      approveAccount(form.email.trim().toLowerCase());
      setNotice(`${form.name.trim()} created and approved. They can sign in with ${form.email.trim().toLowerCase()}.`);
    } else {
      setNotice(`${form.name.trim()} created as pending. Approve it from the table to allow sign-in.`);
    }
    closeModal();
  }

  return (
    <Card className="mt-5 overflow-hidden">
      <CardHeader
        title="Department accounts & permissions"
        subtitle="Owner creates the account, selects modules and features, then approves it. Pending accounts cannot sign in."
        action={
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                resetDemo();
                setNotice("Demo accounts reset to the seeded state.");
              }}
              className="btn-secondary text-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Reset demo
            </button>
            <button onClick={openCreate} className="btn-primary text-xs">
              <UserPlus className="h-3.5 w-3.5" /> New department account
            </button>
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-2 border-y border-stone-100 bg-stone-50/60 px-5 py-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-200">
          <Check className="h-3 w-3" /> {counts.active} active
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-amber-700 ring-1 ring-amber-200">
          <KeyRound className="h-3 w-3" /> {counts.pending} pending approval
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-rose-700 ring-1 ring-rose-200">
          <Ban className="h-3 w-3" /> {counts.blocked} suspended / rejected
        </span>
        <div className="relative ml-auto w-full sm:w-56">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="field h-9 pl-9 text-xs"
            placeholder="Search accounts..."
          />
        </div>
      </div>

      {notice ? (
        <div className="flex items-start gap-2 border-b border-emerald-100 bg-emerald-50 px-5 py-3 text-[11px] text-emerald-800">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
          <span className="flex-1 leading-relaxed">{notice}</span>
          <button onClick={() => setNotice("")} aria-label="Dismiss" className="text-emerald-600">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : null}

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Account</th>
              <th>Role</th>
              <th>Branch scope</th>
              <th>Approved modules</th>
              <th className="text-right">Features</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((account) => (
              <tr key={account.email}>
                <td>
                  <div className="flex items-center gap-2.5">
                    <Avatar name={account.name} size="sm" />
                    <div>
                      <p className="font-semibold text-stone-800">
                        {account.name}
                        {account.isOwner ? (
                          <span className="ml-1.5 rounded bg-ink-900 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white">
                            Owner
                          </span>
                        ) : null}
                      </p>
                      <p className="text-[10px] text-stone-400">{account.email}</p>
                    </div>
                  </div>
                </td>
                <td className="text-stone-600">{account.role}</td>
                <td className="text-stone-600">{account.branchScope}</td>
                <td>
                  <div className="flex max-w-[260px] flex-wrap gap-1">
                    {account.isOwner ? (
                      <span className="rounded-full bg-stone-900 px-2 py-0.5 text-[9px] font-semibold text-white">
                        All modules
                      </span>
                    ) : (
                      <>
                        {account.modules.slice(0, 3).map((module) => (
                          <span
                            key={module}
                            className="rounded-full bg-stone-100 px-2 py-0.5 text-[9px] font-semibold text-stone-600"
                          >
                            {moduleLabels[module]}
                          </span>
                        ))}
                        {account.modules.length > 3 ? (
                          <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-semibold text-stone-500 ring-1 ring-stone-200">
                            +{account.modules.length - 3}
                          </span>
                        ) : null}
                      </>
                    )}
                  </div>
                </td>
                <td className="text-right font-semibold text-stone-700">
                  {account.isOwner ? "All" : account.features.length}
                </td>
                <td>
                  <StatusBadge status={account.status} />
                </td>
                <td>
                  <div className="flex flex-wrap items-center gap-1">
                    {account.status === "Pending" ? (
                      <>
                        <button
                          onClick={() => {
                            approveAccount(account.email);
                            setNotice(`${account.name} approved. They can now sign in with ${account.email}.`);
                          }}
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2 py-1 text-[10px] font-bold text-white transition hover:bg-emerald-700"
                        >
                          <Check className="h-3 w-3" /> Approve
                        </button>
                        <button
                          onClick={() => {
                            rejectAccount(account.email);
                            setNotice(`${account.name} rejected.`);
                          }}
                          className="inline-flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-[10px] font-bold text-rose-600 ring-1 ring-rose-200 transition hover:bg-rose-50"
                        >
                          <X className="h-3 w-3" /> Reject
                        </button>
                      </>
                    ) : null}

                    {account.status === "Active" && !account.isOwner ? (
                      <button
                        onClick={() => {
                          suspendAccount(account.email);
                          setNotice(`${account.name} suspended. Sign-in is blocked until reactivated.`);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-[10px] font-bold text-amber-700 ring-1 ring-amber-200 transition hover:bg-amber-50"
                      >
                        <Ban className="h-3 w-3" /> Suspend
                      </button>
                    ) : null}

                    {account.status === "Suspended" || account.status === "Rejected" ? (
                      <button
                        onClick={() => {
                          reactivateAccount(account.email);
                          setNotice(`${account.name} reactivated.`);
                        }}
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2 py-1 text-[10px] font-bold text-white transition hover:bg-emerald-700"
                      >
                        <RotateCcw className="h-3 w-3" /> Reactivate
                      </button>
                    ) : null}

                    {!account.isOwner ? (
                      <button
                        onClick={() => openEdit(account)}
                        className="inline-flex items-center gap-1 rounded-lg bg-white px-2 py-1 text-[10px] font-bold text-stone-600 ring-1 ring-stone-200 transition hover:bg-stone-50"
                      >
                        <Pencil className="h-3 w-3" /> Edit access
                      </button>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-lg bg-stone-100 px-2 py-1 text-[10px] font-bold text-stone-500">
                        <LockKeyhole className="h-3 w-3" /> Locked
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-xs text-stone-400">
                  No accounts match this search.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 bg-stone-50/60 px-5 py-3 text-[10px] text-stone-400">
        <span className="inline-flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" /> {accounts.length} accounts · signed in as {user.name}
        </span>
        <span>Mock permissions are stored in this browser only.</span>
      </div>

      {mode ? (
        <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-ink-950/50 p-4 backdrop-blur-sm sm:p-8">
          <div className="my-auto w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-stone-100 px-6 py-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-ruby-600">
                  {mode === "create" ? "New department account" : "Edit account access"}
                </p>
                <h3 className="mt-1 text-xl font-bold tracking-tight text-stone-900">
                  {mode === "create" ? "Create account & select features" : form.name}
                </h3>
                <p className="mt-1 text-xs text-stone-500">
                  Owner approval controls which modules and features this account can open.
                </p>
              </div>
              <button onClick={closeModal} className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[62vh] space-y-5 overflow-y-auto px-6 py-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label">Full name</label>
                  <input
                    className="field"
                    value={form.name}
                    onChange={(event) => setForm({ ...form, name: event.target.value })}
                    placeholder="e.g. Service Manager"
                  />
                </div>
                <div>
                  <label className="field-label">Email</label>
                  <input
                    className="field"
                    value={form.email}
                    disabled={mode === "edit"}
                    onChange={(event) => setForm({ ...form, email: event.target.value })}
                    placeholder="service@demohonda.pk"
                  />
                </div>
                <div>
                  <label className="field-label">Role label</label>
                  <input
                    className="field"
                    value={form.role}
                    onChange={(event) => setForm({ ...form, role: event.target.value })}
                    placeholder="Service Department Account"
                  />
                </div>
                <div>
                  <label className="field-label">Branch scope</label>
                  <input
                    className="field"
                    value={form.branchScope}
                    onChange={(event) => setForm({ ...form, branchScope: event.target.value })}
                    placeholder="3S Main"
                  />
                </div>
                {mode === "create" ? (
                  <div className="sm:col-span-2">
                    <label className="field-label">Demo password</label>
                    <input
                      className="field"
                      value={form.password}
                      onChange={(event) => setForm({ ...form, password: event.target.value })}
                      placeholder="demo1234"
                    />
                  </div>
                ) : null}
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone-500">
                    Module access
                  </p>
                  <span className="text-[10px] text-stone-400">
                    {form.modules.length} of {assignableModules.length} modules
                  </span>
                </div>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {assignableModules.map((module) => {
                    const selected = form.modules.includes(module.key);
                    const moduleFeatures = featuresForModule(module.key);
                    return (
                      <div
                        key={module.key}
                        className={cn(
                          "rounded-2xl border p-3 transition",
                          selected ? "border-stone-900 bg-stone-50" : "border-stone-200 bg-white",
                        )}
                      >
                        <label className="flex cursor-pointer items-start gap-2.5">
                          <input
                            type="checkbox"
                            checked={selected}
                            onChange={() => toggleModule(module.key)}
                            className="mt-0.5 h-4 w-4 rounded border-stone-300 text-honda-600 focus:ring-honda-500"
                          />
                          <span>
                            <span className="block text-[12px] font-bold text-stone-800">{module.label}</span>
                            <span className="mt-0.5 block text-[10px] leading-relaxed text-stone-500">
                              {module.description}
                            </span>
                            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-wider text-stone-400">
                              {moduleFeatures.length} feature{moduleFeatures.length === 1 ? "" : "s"}
                            </span>
                          </span>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>

              {form.modules.some((module) => featuresForModule(module).length > 0) ? (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone-500">
                    Feature approvals
                  </p>
                  <p className="mt-1 text-[10px] text-stone-400">
                    Uncheck a feature to hide it from this account even when the module is approved.
                  </p>
                  <div className="mt-3 space-y-4">
                    {form.modules
                      .filter((module) => featuresForModule(module).length > 0)
                      .map((module) => (
                        <div key={module} className="rounded-2xl border border-stone-200 p-3">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[11px] font-bold text-stone-700">{moduleLabels[module]}</p>
                            <button
                              type="button"
                              onClick={() => {
                                const keys = featuresForModule(module).map((item) => item.key);
                                const allSelected = keys.every((key) => form.features.includes(key));
                                setForm((current) => ({
                                  ...current,
                                  features: allSelected
                                    ? current.features.filter((key) => !keys.includes(key))
                                    : Array.from(new Set([...current.features, ...keys])),
                                }));
                              }}
                              className="text-[9px] font-bold uppercase tracking-wider text-honda-600 hover:text-honda-700"
                            >
                              Toggle all
                            </button>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {featuresForModule(module).map((feature) => {
                              const checked = form.features.includes(feature.key);
                              return (
                                <label
                                  key={feature.key}
                                  className={cn(
                                    "inline-flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ring-1 transition",
                                    checked
                                      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                                      : "bg-white text-stone-500 ring-stone-200 hover:bg-stone-50",
                                  )}
                                >
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={() => toggleFeature(feature.key)}
                                    className="sr-only"
                                  />
                                  {checked ? <Check className="h-2.5 w-2.5" /> : null}
                                  {feature.label}
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : null}

              {formError ? (
                <div className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-[11px] font-medium text-rose-700">
                  {formError}
                </div>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stone-100 bg-stone-50/70 px-6 py-4">
              <div>
                {mode === "edit" && editingEmail ? (
                  <button
                    onClick={() => {
                      const target = accounts.find((account) => account.email === editingEmail);
                      if (!target) return;
                      deleteAccount(editingEmail);
                      setNotice(`${target.name} deleted from demo accounts.`);
                      closeModal();
                    }}
                    className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-[10px] font-bold text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete account
                  </button>
                ) : null}
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={closeModal} className="btn-secondary text-xs">
                  Cancel
                </button>
                {mode === "create" ? (
                  <>
                    <button onClick={() => save(false)} className="btn-secondary text-xs">
                      Save as pending
                    </button>
                    <button onClick={() => save(true)} className="btn-primary text-xs">
                      <Plus className="h-3.5 w-3.5" /> Create & approve
                    </button>
                  </>
                ) : (
                  <button onClick={() => save(false)} className="btn-primary text-xs">
                    <Check className="h-3.5 w-3.5" /> Save access
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  );
}
