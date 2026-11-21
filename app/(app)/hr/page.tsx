import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  UserPlus,
  Users,
} from "lucide-react";
import { StatCard, PageHeader, Card, CardHeader, StatusBadge, Avatar } from "@/components/ui";
import { HeadcountDonut, AttendanceChart } from "@/components/charts";
import { hrKpis, employees, leaveRequests, attendanceTrend, departmentHeadcount } from "@/lib/data";
import { formatPKR } from "@/lib/utils";

export default function HRPage() {
  return (
    <>
      <PageHeader
        eyebrow="People"
        title="Human Resources"
        description="Employee records, attendance, payroll and leave management for both branches."
        actions={
          <>
            <button className="btn-secondary">
              <CalendarDays className="h-4 w-4" /> Attendance
            </button>
            <button className="btn-primary">
              <UserPlus className="h-4 w-4" /> Add Employee
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {hrKpis.map((kpi, index) => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            note={kpi.sub}
            tone={index === 0 ? "blue" : index === 1 ? "green" : index === 2 ? "amber" : "red"}
            icon={[Users, CheckCircle2, Clock, UserPlus][index]}
          />
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-5">
          <CardHeader title="Headcount by department" subtitle="86 employees across 6 departments" />
          <div className="px-5 pb-5">
            <HeadcountDonut />
          </div>
        </Card>
        <Card className="lg:col-span-7">
          <CardHeader title="Attendance trend" subtitle="Weekly present rate · last 4 weeks" />
          <div className="px-2 pb-4 sm:px-4">
            <AttendanceChart />
          </div>
          <div className="border-t border-slate-100 px-5 py-4">
            <div className="grid grid-cols-4 gap-3 text-center">
              {attendanceTrend.map((week) => (
                <div key={week.week} className="rounded-lg bg-slate-50 p-2">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{week.week}</p>
                  <p className="mt-1 text-sm font-extrabold text-slate-900">{week.present}%</p>
                  <p className="text-[9px] text-slate-500">{week.absent} absent</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader
          title="Employees"
          subtitle="Staff directory and salary register"
          action={
            <div className="flex gap-2">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input className="field h-9 w-44 pl-9 text-xs" placeholder="Search employee..." />
              </div>
              <button className="btn-secondary text-xs">Payroll</button>
            </div>
          }
        />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Designation</th>
                <th>Department</th>
                <th>Branch</th>
                <th>Status</th>
                <th>Joined</th>
                <th className="text-right">Salary</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={employee.name} size="sm" />
                      <div>
                        <p className="font-semibold text-slate-800">{employee.name}</p>
                        <p className="text-[10px] text-slate-400">{employee.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-slate-600">{employee.designation}</td>
                  <td className="text-slate-600">{employee.department}</td>
                  <td className="text-slate-600">{employee.branch}</td>
                  <td>
                    <StatusBadge status={employee.status} />
                  </td>
                  <td className="text-slate-600">{employee.joined}</td>
                  <td className="text-right font-bold text-slate-800">{formatPKR(employee.salary)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardHeader title="Leave requests" subtitle="Pending and recent leave applications" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th className="text-right">Days</th>
                  <th>Status</th>
                  <th>Approver</th>
                </tr>
              </thead>
              <tbody>
                {leaveRequests.map((request) => (
                  <tr key={`${request.employee}-${request.from}`}>
                    <td className="font-semibold text-slate-800">{request.employee}</td>
                    <td className="text-slate-600">{request.type}</td>
                    <td className="text-slate-600">{request.from}</td>
                    <td className="text-slate-600">{request.to}</td>
                    <td className="text-right font-medium text-slate-700">{request.days}</td>
                    <td>
                      <StatusBadge status={request.status} />
                    </td>
                    <td className="text-slate-600">{request.approver}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader title="Payroll summary" subtitle="November 2026" />
          <div className="space-y-3 p-5">
            {[
              { label: "Gross salary", value: "PKR 1.14 Cr", tone: "text-slate-900" },
              { label: "Allowances", value: "PKR 12.4 Lac", tone: "text-emerald-600" },
              { label: "Deductions", value: "PKR 6.8 Lac", tone: "text-honda-600" },
              { label: "Net payable", value: "PKR 1.09 Cr", tone: "text-slate-900" },
              { label: "Paid to date", value: "PKR 62.0 Lac", tone: "text-blue-600" },
              { label: "Outstanding", value: "PKR 47.0 Lac", tone: "text-amber-600" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between border-b border-slate-100 pb-2.5 last:border-0 last:pb-0">
                <span className="text-[12px] text-slate-500">{item.label}</span>
                <span className={cn("text-[13px] font-bold", item.tone)}>{item.value}</span>
              </div>
            ))}
            <button className="btn-primary mt-3 w-full">Run payroll</button>
          </div>
        </Card>
      </div>
    </>
  );
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
