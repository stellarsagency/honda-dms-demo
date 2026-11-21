import {
  ArrowUpRight,
  CalendarDays,
  CircleDollarSign,
  Package,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import { StatCard, PageHeader, Card, CardHeader, StatusBadge, Avatar, Progress } from "@/components/ui";
import { RevenueChart, BranchSplitBars, JobStatusDonut } from "@/components/charts";
import { appointments, dashboardKpis, jobCards, leakageFlags } from "@/lib/data";
import { formatPKR } from "@/lib/utils";

const statIcons = {
  revenue: CircleDollarSign,
  job: Wrench,
  car: ArrowUpRight,
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
      <section className="mb-6 overflow-hidden rounded-[2rem] border border-stone-200/70 bg-gradient-to-br from-white via-ivory to-champagne/30 p-6 shadow-[0_28px_70px_-40px_rgba(24,21,18,0.35)] sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-ruby-600">Good morning, Zeeshan</p>
            <h1 className="mt-3 font-serif text-4xl font-bold leading-tight tracking-tight text-stone-900 sm:text-5xl">
              Your dealership is running smoothly today.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-stone-600">
              47 open job cards, 31 vehicles in the workshop and PKR 1.24 Cr in receivables. Switch branches from the top bar to drill into 3S Main or 2S City.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button className="btn-secondary">
              <CalendarDays className="h-4 w-4" /> Today’s schedule
            </button>
            <button className="btn-primary">
              <Wrench className="h-4 w-4" /> New job card
            </button>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          {[
            { label: "Branches online", value: "2", note: "3S Main + 2S City" },
            { label: "Vehicles in workshop", value: "31", note: "82% capacity" },
            { label: "Pending approvals", value: "12", note: "Discounts & estimates" },
            { label: "Leakage flags", value: "6", note: "2 critical open" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/70 bg-white/70 p-4 backdrop-blur-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">{item.label}</p>
              <p className="mt-2 font-serif text-2xl font-bold text-stone-900">{item.value}</p>
              <p className="mt-1 text-[11px] text-stone-500">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

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

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <CardHeader
            title="Revenue story"
            subtitle="A twelve-month view across sales, service and parts"
            action={<span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-semibold text-emerald-700">+12.8% this month</span>}
          />
          <div className="px-3 pb-5 sm:px-5">
            <RevenueChart />
          </div>
        </Card>
        <Card className="lg:col-span-4">
          <CardHeader title="Job card flow" subtitle="Current workshop pipeline" />
          <div className="px-5 pb-5">
            <JobStatusDonut />
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-5">
          <CardHeader title="Branch balance" subtitle="Revenue split by branch and department" />
          <div className="px-3 pb-4 sm:px-5">
            <BranchSplitBars />
          </div>
          <div className="mx-5 mb-5 grid grid-cols-3 gap-3 rounded-2xl bg-stone-50/80 p-4 text-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">3S Main</p>
              <p className="mt-1 font-serif text-xl font-bold text-stone-900">PKR 1.0 Cr</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">2S City</p>
              <p className="mt-1 font-serif text-xl font-bold text-stone-900">PKR 1.0 Cr</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400">Group</p>
              <p className="mt-1 font-serif text-xl font-bold text-ruby-600">PKR 2.0 Cr</p>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-7">
          <CardHeader title="Today’s appointments" subtitle="Scheduled vehicles and advisors" action={<button className="btn-ghost text-xs">View all</button>} />
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
                    <td className="font-mono text-xs font-semibold text-stone-500">{item.time}</td>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <Avatar name={item.customer} size="sm" />
                        <span className="font-semibold text-stone-800">{item.customer}</span>
                      </div>
                    </td>
                    <td>
                      <p className="font-medium text-stone-700">{item.vehicle}</p>
                      <p className="text-[10px] text-stone-400">{item.plate}</p>
                    </td>
                    <td className="text-stone-600">{item.service}</td>
                    <td className="text-stone-600">{item.advisor}</td>
                    <td className="text-stone-600">{item.branch}</td>
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

      <Card className="mt-6">
        <CardHeader
          title="Leakage & exception watch"
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
                  <td className="font-mono text-xs font-semibold text-stone-500">{flag.id}</td>
                  <td className="font-medium text-stone-700">{flag.type}</td>
                  <td className="font-mono text-xs">{flag.ref}</td>
                  <td className="text-stone-600">{flag.branch}</td>
                  <td className="font-semibold text-stone-800">{formatPKR(flag.amount)}</td>
                  <td>
                    <StatusBadge status={flag.severity} />
                  </td>
                  <td className="text-stone-600">{flag.owner}</td>
                  <td>
                    <StatusBadge status={flag.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {jobCards.slice(0, 4).map((job) => (
          <Card key={job.id} className="p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-semibold text-stone-400">{job.id}</span>
              <StatusBadge status={job.status} />
            </div>
            <p className="mt-3 font-serif text-lg font-bold text-stone-900">{job.customer}</p>
            <p className="mt-1 text-[11px] text-stone-500">
              {job.vehicle} · {job.plate}
            </p>
            <p className="mt-1 text-[11px] text-stone-500">{job.service}</p>
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-[10px] text-stone-400">
                <span>Progress</span>
                <span className="font-semibold text-stone-600">{job.progress}%</span>
              </div>
              <Progress value={job.progress} tone={job.progress === 100 ? "green" : "red"} />
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px]">
              <span className="text-stone-500">{job.technician}</span>
              <span className="font-bold text-stone-900">{job.amount ? formatPKR(job.amount) : "Free service"}</span>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
