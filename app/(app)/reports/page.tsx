import {
  BarChart3,
  Download,
  FileText,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";
import { StatCard, PageHeader, Card, CardHeader, StatusBadge } from "@/components/ui";
import { ProfitChart, DepartmentRevenueBars } from "@/components/charts";
import { reportKpis, leakageFlags, departmentRevenue } from "@/lib/data";
import { formatPKR } from "@/lib/utils";

const reportCards = [
  { title: "Daily Sales Register", desc: "Unit-wise sales, margins and consultant performance", icon: TrendingUp },
  { title: "Service Productivity", desc: "Bay utilisation, turnaround and technician hours", icon: BarChart3 },
  { title: "Parts Stock & Movement", desc: "Stock valuation, low stock and slow movers", icon: FileText },
  { title: "Leakage Exceptions", desc: "Discounts, manual issues, closed-without-invoice", icon: ShieldAlert },
  { title: "Corporate Receivables", desc: "MOU utilisation, aging and collection trends", icon: FileText },
  { title: "HR & Payroll", desc: "Headcount, attendance and payroll registers", icon: BarChart3 },
];

export default function ReportsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Reports & Leakage Control"
        description="Operational, financial and leakage reports with drill-down by branch and department."
        actions={
          <>
            <button className="btn-secondary">
              <Download className="h-4 w-4" /> Export all
            </button>
            <button className="btn-primary">
              <FileText className="h-4 w-4" /> Schedule report
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {reportKpis.map((kpi, index) => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            note={kpi.sub}
            tone={index === 0 ? "green" : index === 1 ? "blue" : index === 2 ? "red" : "amber"}
            icon={[TrendingUp, BarChart3, ShieldAlert, FileText][index]}
          />
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <CardHeader title="Profit trend" subtitle="Revenue, cost and profit · last 6 months (PKR in M)" />
          <div className="px-2 pb-4 sm:px-4">
            <ProfitChart />
          </div>
        </Card>
        <Card className="lg:col-span-4">
          <CardHeader title="Revenue by department" subtitle="Current month (PKR in Cr)" />
          <div className="px-2 pb-4 sm:px-4">
            <DepartmentRevenueBars />
          </div>
          <div className="space-y-2 border-t border-slate-100 px-5 py-4">
            {departmentRevenue.map((dept) => (
              <div key={dept.dept} className="flex items-center justify-between text-[11px]">
                <span className="flex items-center gap-2 font-medium text-slate-600">
                  <span className="h-2 w-2 rounded-full" style={{ background: dept.color }} />
                  {dept.dept}
                </span>
                <span className="font-bold text-slate-800">
                  PKR {dept.revenue} Cr · {dept.margin}% margin
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader
          title="Leakage exception register"
          subtitle="Discounts without approval, manual parts issues, closed jobs without invoices, gate passes before payment"
          action={<button className="btn-secondary text-xs">Investigate all</button>}
        />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Flag</th>
                <th>Type</th>
                <th>Reference</th>
                <th>Branch</th>
                <th className="text-right">Amount</th>
                <th>Severity</th>
                <th>Owner</th>
                <th>Status</th>
                <th>Detected</th>
              </tr>
            </thead>
            <tbody>
              {leakageFlags.map((flag) => (
                <tr key={flag.id}>
                  <td className="font-mono text-xs font-bold text-slate-500">{flag.id}</td>
                  <td className="font-medium text-slate-700">{flag.type}</td>
                  <td className="font-mono text-xs">{flag.ref}</td>
                  <td className="text-slate-600">{flag.branch}</td>
                  <td className="text-right font-bold text-slate-800">{formatPKR(flag.amount)}</td>
                  <td>
                    <StatusBadge status={flag.severity} />
                  </td>
                  <td className="text-slate-600">{flag.owner}</td>
                  <td>
                    <StatusBadge status={flag.status} />
                  </td>
                  <td className="text-slate-600">{flag.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reportCards.map((report) => {
          const Icon = report.icon;
          return (
            <Card key={report.title} className="group cursor-pointer p-5 transition hover:-translate-y-0.5 hover:shadow-lift">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition group-hover:bg-honda-50 group-hover:text-honda-600">
                  <Icon className="h-[18px] w-[18px]" />
                </span>
                <div>
                  <p className="text-[13px] font-bold text-slate-800">{report.title}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500">{report.desc}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[10px] font-semibold text-honda-600">
                <span>Open report</span>
                <span className="transition group-hover:translate-x-0.5">→</span>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-5">
        <CardHeader title="Leakage report matrix" subtitle="Exception reports and control checks" />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Report</th>
                <th>Purpose</th>
                <th>Frequency</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {[
                { report: "Discount by advisor", purpose: "Who is giving away margin", frequency: "Daily", owner: "Branch Manager" },
                { report: "Below-cost sales", purpose: "Parts/labour sold under cost", frequency: "Daily", owner: "Parts Manager" },
                { report: "Parts issued without job card", purpose: "Manual issues", frequency: "Daily", owner: "Parts Manager" },
                { report: "Job cards closed without invoice", purpose: "Revenue leakage", frequency: "Daily", owner: "Service Advisor" },
                { report: "Gate passes without payment", purpose: "Vehicle release control", frequency: "Daily", owner: "Security Desk" },
                { report: "Stock variance", purpose: "System vs physical", frequency: "Weekly", owner: "Parts Manager" },
                { report: "Warranty consumption vs claims", purpose: "Claim recovery", frequency: "Monthly", owner: "Service Manager" },
                { report: "Corporate credit breach", purpose: "Credit limit control", frequency: "Daily", owner: "Corporate Desk" },
                { report: "Cancelled/amended invoices", purpose: "Financial audit trail", frequency: "Daily", owner: "Accounts" },
                { report: "Branch comparison", purpose: "Performance comparison", frequency: "Monthly", owner: "Group Admin" },
              ].map((item) => (
                <tr key={item.report}>
                  <td className="font-semibold text-stone-800">{item.report}</td>
                  <td className="text-stone-600">{item.purpose}</td>
                  <td><StatusBadge status={item.frequency} /></td>
                  <td className="text-stone-600">{item.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
