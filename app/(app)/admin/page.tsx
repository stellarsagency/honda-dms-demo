import {
  Database,
  KeyRound,
  Plus,
  Search,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { StatCard, PageHeader, Card, CardHeader, StatusBadge, Avatar } from "@/components/ui";
import { users, roles, auditLog, integrations, documentVault, notificationTemplates, jobQueue, approvalRequests } from "@/lib/data";
import { formatPKR } from "@/lib/utils";

export default function AdminPage() {
  const activeUsers = users.filter((user) => user.status === "Active").length;
  const twoFA = users.filter((user) => user.twoFA).length;

  return (
    <>
      <PageHeader
        eyebrow="Administration"
        title="Admin & Users"
        description="User accounts, roles, permissions, branches and integration health."
        actions={
          <>
            <button className="btn-secondary">
              <ShieldCheck className="h-4 w-4" /> Roles
            </button>
            <button className="btn-primary">
              <UserPlus className="h-4 w-4" /> Invite user
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total users" value={String(users.length)} note={`${activeUsers} active`} tone="blue" icon={Users} />
        <StatCard label="Roles" value={String(roles.length)} note="System + custom" tone="purple" icon={KeyRound} />
        <StatCard label="2FA enabled" value={String(twoFA)} note={`${users.length - twoFA} pending`} tone="green" icon={ShieldCheck} />
        <StatCard label="Integrations" value={String(integrations.length)} note={`${integrations.filter((i) => i.status === "Connected").length} connected`} tone="red" icon={Database} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <CardHeader
            title="Users"
            subtitle="Account status, roles and last login"
            action={
              <div className="flex gap-2">
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input className="field h-9 w-44 pl-9 text-xs" placeholder="Search user..." />
                </div>
                <button className="btn-secondary text-xs">Export</button>
              </div>
            }
          />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Branch scope</th>
                  <th>Status</th>
                  <th>Last login</th>
                  <th>2FA</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.email}>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={user.name} size="sm" />
                        <div>
                          <p className="font-semibold text-slate-800">{user.name}</p>
                          <p className="text-[10px] text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-slate-600">{user.role}</td>
                    <td className="text-slate-600">{user.branch}</td>
                    <td>
                      <StatusBadge status={user.status} />
                    </td>
                    <td className="text-slate-600">{user.lastLogin}</td>
                    <td>
                      <StatusBadge status={user.twoFA ? "Active" : "Pending"} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader title="Roles & permissions" subtitle="System roles and user counts" />
          <div className="space-y-2 p-4">
            {roles.map((role) => (
              <div key={role.name} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[12px] font-bold text-slate-800">{role.name}</p>
                  <span className="rounded-md bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-500 ring-1 ring-slate-200">
                    {role.users} users
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-slate-500">{role.permissions}</p>
                <p className="mt-0.5 text-[10px] text-slate-400">Scope: {role.scope}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardHeader title="Audit log" subtitle="Recent user actions and security events" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Action</th>
                  <th>Entity</th>
                  <th>IP address</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {auditLog.map((entry, index) => (
                  <tr key={index}>
                    <td className="font-semibold text-slate-800">{entry.user}</td>
                    <td className="text-slate-600">{entry.action}</td>
                    <td className="font-mono text-xs text-slate-500">{entry.entity}</td>
                    <td className="font-mono text-xs text-slate-500">{entry.ip}</td>
                    <td className="text-slate-600">{entry.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader title="Integrations" subtitle="External service health" />
          <div className="space-y-2 p-4">
            {integrations.map((integration) => (
              <div key={integration.name} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3">
                <div>
                  <p className="text-[12px] font-bold text-slate-800">{integration.name}</p>
                  <p className="text-[10px] text-slate-500">
                    {integration.type} · {integration.lastSync}
                  </p>
                </div>
                <StatusBadge status={integration.status} />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-6">
          <CardHeader title="Document vault" subtitle="MOU, job card, gate pass, delivery note with hash/QR" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Branch</th>
                  <th>Uploaded by</th>
                  <th>Hash</th>
                </tr>
              </thead>
              <tbody>
                {documentVault.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                    <td className="font-semibold text-stone-800">{item.name}</td>
                    <td className="text-stone-600">{item.type}</td>
                    <td className="text-stone-600">{item.branch}</td>
                    <td className="text-stone-600">{item.uploadedBy}</td>
                    <td className="font-mono text-xs text-stone-500">{item.hash}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-6">
          <CardHeader title="Approval requests" subtitle="Segregation of duties: creator ≠ approver" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Request</th>
                  <th>Type</th>
                  <th>Requested by</th>
                  <th className="text-right">Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {approvalRequests.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                    <td className="text-stone-600">{item.type}</td>
                    <td className="font-semibold text-stone-800">{item.requestedBy}</td>
                    <td className="text-right font-bold text-stone-800">{formatPKR(item.amount)}</td>
                    <td><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-6">
          <CardHeader title="Notification templates" subtitle="WhatsApp, SMS, email, in-app" />
          <div className="space-y-3 p-5">
            {notificationTemplates.map((item) => (
              <div key={item.name} className="rounded-2xl border border-stone-200/80 bg-stone-50/70 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[12px] font-bold text-stone-800">{item.name}</p>
                  <StatusBadge status={item.channel} />
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-stone-500">{item.template}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-6">
          <CardHeader title="Job queue monitor" subtitle="Reminders, reports, retries" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Status</th>
                  <th className="text-right">Retries</th>
                  <th>Last run</th>
                </tr>
              </thead>
              <tbody>
                {jobQueue.map((item) => (
                  <tr key={item.job}>
                    <td className="font-semibold text-stone-800">{item.job}</td>
                    <td><StatusBadge status={item.status} /></td>
                    <td className="text-right text-stone-600">{item.retries}</td>
                    <td className="text-stone-600">{item.lastRun}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
