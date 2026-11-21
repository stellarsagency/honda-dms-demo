import {
  ArrowUpRight,
  CalendarDays,
  Car,
  CircleDollarSign,
  Package,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import { StatCard, PageHeader, Card, CardHeader, StatusBadge, Avatar, Progress } from "@/components/ui";
import { RevenueChart, BranchSplitBars, JobStatusDonut } from "@/components/charts";
import {
  appointments,
  dashboardKpis,
  jobCards,
  leakageFlags,
} from "@/lib/data";
import { formatPKR } from "@/lib/utils";

const statIcons = {
  revenue: CircleDollarSign,
  job: Wrench,
  car: Car,
  parts: Package,
};

const statTones = {
  revenue: "red",
  job: "blue",
  car: "green",
  parts: "amber",
} as const;

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        eyebrow="Overview"
        title="Executive Dashboard"
        description="Real-time snapshot of both branches — 3S Main and 2S City. Switch branches from the top bar to drill down."
        actions={
          <>
            <button className="btn-secondary">
              <CalendarDays className="h-4 w-4" /> Today
            </button>
            <button className="btn-primary">
              <ArrowUpRight className="h-4 w-4" /> New Job Card
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardKpis.map((kpi) => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            change={kpi.change}
            trend={kpi.trend}
            note={kpi.note}
            icon={statIcons[kpi.icon as keyof typeof statIcons]}
            tone={statTones[kpi.icon as keyof typeof statTones]}
          />
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardHeader
            title="Revenue trend"
            subtitle="Last 12 months · Sales, Service, Parts (PKR in Lac)"
            action={<StatusBadge status="Paid" />}
          />
          <div className="px-2 pb-4 sm:px-4">
            <RevenueChart />
          </div>
        </Card>
        <Card className="lg:col-span-5">
          <CardHeader title="Job card status" subtitle="Current workshop pipeline" />
          <div className="px-5 pb-5">
            <JobStatusDonut />
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-5">
          <CardHeader title="Branch performance" subtitle="Revenue split by branch and department" />
          <div className="px-2 pb-4 sm:px-4">
            <BranchSplitBars />
          </div>
          <div className="border-t border-slate-100 px-5 py-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">3S Main</p>
                <p className="mt-1 text-lg font-extrabold text-slate-900">PKR 1.0 Cr</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">2S City</p>
                <p className="mt-1 text-lg font-extrabold text-slate-900">PKR 1.0 Cr</p>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Group</p>
                <p className="mt-1 text-lg font-extrabold text-honda-600">PKR 2.0 Cr</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-7">
          <CardHeader title="Today's appointments" subtitle="Scheduled vehicles and advisors" action={<button className="btn-ghost text-xs">View all</button>} />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Service</th>
                  <th>Advisor</th>
                  <th>Branch</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-semibold text-slate-500">{item.time}</td>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={item.customer} size="sm" />
                        <span className="font-semibold text-slate-800">{item.customer}</span>
                      </div>
                    </td>
                    <td>
                      <p className="font-medium text-slate-700">{item.vehicle}</p>
                      <p className="text-[10px] text-slate-400">{item.plate}</p>
                    </td>
                    <td className="text-slate-600">{item.service}</td>
                    <td className="text-slate-600">{item.advisor}</td>
                    <td className="text-slate-600">{item.branch}</td>
                    <td>
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-12">
          <CardHeader
            title="Leakage & exception flags"
            subtitle="Discounts without approval, parts issued without job cards, closed jobs without invoices"
            action={
              <button className="btn-secondary text-xs">
                <ShieldAlert className="h-3.5 w-3.5" /> Open reports
              </button>
            }
          />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Flag</th>
                  <th>Type</th>
                  <th>Reference</th>
                  <th>Branch</th>
                  <th>Amount</th>
                  <th>Severity</th>
                  <th>Owner</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leakageFlags.slice(0, 4).map((flag) => (
                  <tr key={flag.id}>
                    <td className="font-mono text-xs font-semibold text-slate-500">{flag.id}</td>
                    <td className="font-medium text-slate-700">{flag.type}</td>
                    <td className="font-mono text-xs">{flag.ref}</td>
                    <td>{flag.branch}</td>
                    <td className="font-semibold text-slate-800">{formatPKR(flag.amount)}</td>
                    <td>
                      <StatusBadge status={flag.severity} />
                    </td>
                    <td>{flag.owner}</td>
                    <td>
                      <StatusBadge status={flag.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {jobCards.slice(0, 4).map((job) => (
          <Card key={job.id} className="p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-slate-400">{job.id}</span>
              <StatusBadge status={job.status} />
            </div>
            <p className="mt-2 text-sm font-bold text-slate-800">{job.customer}</p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              {job.vehicle} · {job.plate}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">{job.service}</p>
            <div className="mt-3">
              <div className="mb-1 flex justify-between text-[10px] text-slate-400">
                <span>Progress</span>
                <span className="font-semibold text-slate-600">{job.progress}%</span>
              </div>
              <Progress value={job.progress} tone={job.progress === 100 ? "green" : "red"} />
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">{job.technician}</span>
              <span className="font-bold text-slate-800">{job.amount ? formatPKR(job.amount) : "Free service"}</span>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
