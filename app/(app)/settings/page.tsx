"use client";

import { useState } from "react";
import {
  Bell,
  Building2,
  Database,
  Globe,
  KeyRound,
  Save,
  Settings as SettingsIcon,
  ShieldCheck,
  Sliders,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import { PageHeader, Card, CardHeader, StatusBadge } from "@/components/ui";
import { branches, integrations } from "@/lib/data";

const tabs = [
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "branches", label: "Branches", icon: Building2 },
  { id: "approvals", label: "Approval limits", icon: Sliders },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "integrations", label: "Integrations", icon: Globe },
  { id: "security", label: "Security", icon: ShieldCheck },
  { id: "backup", label: "Backup", icon: Database },
];

const approvalLimits = [
  { role: "Service Advisor", discount: "0%", belowCost: "Not allowed", override: "Manager only" },
  { role: "Supervisor", discount: "Up to 2%", belowCost: "Not allowed", override: "Manager only" },
  { role: "Branch Manager", discount: "Up to 5%", belowCost: "With reason", override: "Owner only" },
  { role: "Group Admin", discount: "Unlimited", belowCost: "Allowed", override: "Owner only" },
  { role: "Owner", discount: "Unlimited", belowCost: "Allowed", override: "—" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [toggles, setToggles] = useState({
    email: true,
    sms: true,
    whatsapp: true,
    dailyDigest: true,
    leakageAlerts: true,
    approvalAlerts: true,
  });

  function Toggle({ value, onChange }: { value: boolean; onChange: () => void }) {
    return (
      <button onClick={onChange} className="text-slate-400 transition hover:text-honda-600">
        {value ? <ToggleRight className="h-6 w-6 text-honda-600" /> : <ToggleLeft className="h-6 w-6" />}
      </button>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow="Administration"
        title="Settings"
        description="System configuration, branch feature flags, approval limits, notifications and security."
        actions={
          <button className="btn-primary">
            <Save className="h-4 w-4" /> Save changes
          </button>
        }
      />

      <div className="grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-3">
          <div className="p-3">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition ${
                    active ? "bg-honda-50 text-honda-700" : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`h-[17px] w-[17px] ${active ? "text-honda-600" : "text-slate-400"}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Card>

        <div className="lg:col-span-9">
          {activeTab === "general" ? (
            <Card>
              <CardHeader title="General settings" subtitle="Company profile, currency and defaults" />
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <div>
                  <label className="field-label">Company name</label>
                  <input className="field" defaultValue="Demo Honda (Pvt) Ltd" />
                </div>
                <div>
                  <label className="field-label">Group admin email</label>
                  <input className="field" defaultValue="admin@demohonda.pk" />
                </div>
                <div>
                  <label className="field-label">Currency</label>
                  <select className="field">
                    <option>PKR — Pakistani Rupee</option>
                    <option>USD — US Dollar</option>
                  </select>
                </div>
                <div>
                  <label className="field-label">Timezone</label>
                  <select className="field">
                    <option>Asia/Karachi (PKT +5)</option>
                  </select>
                </div>
                <div>
                  <label className="field-label">Language</label>
                  <select className="field">
                    <option>English</option>
                    <option>Urdu</option>
                  </select>
                </div>
                <div>
                  <label className="field-label">Default branch</label>
                  <select className="field">
                    <option>All Branches</option>
                    <option>Honda 3S — Main</option>
                    <option>Honda 2S — City</option>
                  </select>
                </div>
              </div>
            </Card>
          ) : null}

          {activeTab === "branches" ? (
            <Card>
              <CardHeader title="Branch configuration" subtitle="3S and 2S feature flags and prefixes" />
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Branch</th>
                      <th>Type</th>
                      <th>City</th>
                      <th>Invoice prefix</th>
                      <th>Job card prefix</th>
                      <th>Sales module</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches
                      .filter((branch) => branch.id !== "all")
                      .map((branch) => (
                        <tr key={branch.id}>
                          <td className="font-semibold text-slate-800">{branch.name}</td>
                          <td>
                            <StatusBadge status={branch.type} />
                          </td>
                          <td className="text-slate-600">{branch.city}</td>
                          <td className="font-mono text-xs text-slate-500">{branch.code}-INV</td>
                          <td className="font-mono text-xs text-slate-500">{branch.code}-JC</td>
                          <td>
                            <StatusBadge status={branch.type === "3S" ? "Active" : "Disabled"} />
                          </td>
                          <td>
                            <StatusBadge status="Active" />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : null}

          {activeTab === "approvals" ? (
            <Card>
              <CardHeader title="Approval limits" subtitle="Discount, below-cost and override rules by role" />
              <div className="table-wrap">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Role</th>
                      <th>Discount limit</th>
                      <th>Below-cost sale</th>
                      <th>Override</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvalLimits.map((limit) => (
                      <tr key={limit.role}>
                        <td className="font-semibold text-slate-800">{limit.role}</td>
                        <td className="text-slate-600">{limit.discount}</td>
                        <td className="text-slate-600">{limit.belowCost}</td>
                        <td className="text-slate-600">{limit.override}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : null}

          {activeTab === "notifications" ? (
            <Card>
              <CardHeader title="Notification channels" subtitle="Customer and internal alert preferences" />
              <div className="space-y-3 p-5">
                {[
                  { key: "email", label: "Email notifications", desc: "Invoices, statements and daily digests" },
                  { key: "sms", label: "SMS reminders", desc: "Payment reminders and appointment confirmations" },
                  { key: "whatsapp", label: "WhatsApp Business", desc: "Job card updates and payment links" },
                  { key: "dailyDigest", label: "Daily digest", desc: "Morning summary to branch managers" },
                  { key: "leakageAlerts", label: "Leakage alerts", desc: "Real-time exceptions to owner and auditor" },
                  { key: "approvalAlerts", label: "Approval alerts", desc: "Discount and below-cost approval requests" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3">
                    <div>
                      <p className="text-[12px] font-bold text-slate-800">{item.label}</p>
                      <p className="text-[10px] text-slate-500">{item.desc}</p>
                    </div>
                    <Toggle
                      value={toggles[item.key as keyof typeof toggles]}
                      onChange={() =>
                        setToggles((state) => ({ ...state, [item.key]: !state[item.key as keyof typeof state] }))
                      }
                    />
                  </div>
                ))}
              </div>
            </Card>
          ) : null}

          {activeTab === "integrations" ? (
            <Card>
              <CardHeader title="Integrations" subtitle="External service connections" />
              <div className="grid gap-3 p-5 sm:grid-cols-2">
                {integrations.map((integration) => (
                  <div key={integration.name} className="rounded-xl border border-slate-100 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] font-bold text-slate-800">{integration.name}</p>
                      <StatusBadge status={integration.status} />
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500">{integration.type}</p>
                    <p className="mt-0.5 text-[10px] text-slate-400">Last sync: {integration.lastSync}</p>
                    <button className="btn-ghost mt-3 text-[10px]">Configure</button>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}

          {activeTab === "security" ? (
            <Card>
              <CardHeader title="Security" subtitle="Authentication and access controls" />
              <div className="space-y-4 p-5">
                <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                  <div>
                    <p className="text-[12px] font-bold text-slate-800">Two-factor authentication</p>
                    <p className="text-[10px] text-slate-500">Required for admin and manager roles</p>
                  </div>
                  <StatusBadge status="Active" />
                </div>
                <div>
                  <label className="field-label">Session timeout (minutes)</label>
                  <input className="field" defaultValue="30" type="number" />
                </div>
                <div>
                  <label className="field-label">IP allowlist (admin panel)</label>
                  <textarea className="field min-h-[80px]" defaultValue="10.0.0.0/8&#10;192.168.1.0/24" />
                </div>
                <div>
                  <label className="field-label">Password policy</label>
                  <select className="field">
                    <option>Strong (12+ chars, symbols, 2FA)</option>
                    <option>Standard (8+ chars)</option>
                  </select>
                </div>
              </div>
            </Card>
          ) : null}

          {activeTab === "backup" ? (
            <Card>
              <CardHeader title="Backup & recovery" subtitle="Database and document backup schedule" />
              <div className="space-y-4 p-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Last backup", value: "Today, 02:00", tone: "text-emerald-600" },
                    { label: "Next backup", value: "Tomorrow, 02:00", tone: "text-blue-600" },
                    { label: "Retention", value: "30 daily + 12 monthly", tone: "text-slate-900" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{item.label}</p>
                      <p className={`mt-1 text-[13px] font-bold ${item.tone}`}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <label className="field-label">Backup destination</label>
                  <select className="field">
                    <option>Cloudflare R2 (encrypted)</option>
                    <option>Local disk</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button className="btn-secondary">Run backup now</button>
                  <button className="btn-ghost">Restore from backup</button>
                </div>
              </div>
            </Card>
          ) : null}
        </div>
      </div>
    </>
  );
}
