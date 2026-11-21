"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  aging,
  attendanceTrend,
  branchPerformance,
  cashflow,
  corporateReceivables,
  departmentHeadcount,
  departmentRevenue,
  jobCardStatus,
  partsMovement,
  profitTrend,
  revenueData,
  salesPipeline,
  salesTrend,
} from "@/lib/data";

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  boxShadow: "0 12px 32px -12px rgba(16,24,40,0.18)",
  fontSize: 12,
  padding: "10px 12px",
};

const grid = "#eef1f5";
const axis = "#94a3b8";

export function RevenueChart() {
  return (
    <div className="h-[290px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={revenueData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="salesFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e11d2e" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#e11d2e" stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="serviceFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.18} />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="partsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.16} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={grid} vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: axis, fontSize: 11 }} dy={8} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: axis, fontSize: 11 }}
            tickFormatter={(value) => `${value}L`}
          />
          <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`PKR ${value} Lac`]} />
          <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
          <Area type="monotone" dataKey="sales" name="Sales" stroke="#e11d2e" strokeWidth={2.2} fill="url(#salesFill)" />
          <Area type="monotone" dataKey="service" name="Service" stroke="#3b82f6" strokeWidth={2.2} fill="url(#serviceFill)" />
          <Area type="monotone" dataKey="parts" name="Parts" stroke="#f59e0b" strokeWidth={2.2} fill="url(#partsFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BranchSplitBars() {
  return (
    <div className="h-[250px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={branchPerformance} layout="vertical" margin={{ top: 4, right: 20, left: 4, bottom: 0 }} barSize={26}>
          <CartesianGrid stroke={grid} horizontal={false} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="name"
            tickLine={false}
            axisLine={false}
            width={62}
            tick={{ fill: "#475569", fontSize: 11, fontWeight: 600 }}
          />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f8fafc" }} formatter={(value) => [`PKR ${value} Lac`]} />
          <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="sales" name="Sales" stackId="a" fill="#e11d2e" radius={[0, 0, 0, 0]} />
          <Bar dataKey="service" name="Service" stackId="a" fill="#3b82f6" />
          <Bar dataKey="parts" name="Parts" stackId="a" fill="#f59e0b" radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function JobStatusDonut() {
  const total = jobCardStatus.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="relative h-[180px] w-[180px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={jobCardStatus}
              dataKey="value"
              nameKey="name"
              innerRadius={58}
              outerRadius={82}
              paddingAngle={3}
              strokeWidth={0}
            >
              {jobCardStatus.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-slate-900">{total}</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Job cards</span>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-2.5 sm:grid-cols-1">
        {jobCardStatus.map((item) => (
          <div key={item.name} className="flex items-center justify-between gap-3 rounded-lg bg-slate-50/70 px-3 py-2">
            <span className="flex items-center gap-2 text-[11px] font-medium text-slate-600">
              <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
              {item.name}
            </span>
            <span className="text-xs font-bold text-slate-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SalesTargetChart() {
  return (
    <div className="h-[270px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={salesTrend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid stroke={grid} vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: axis, fontSize: 11 }} dy={8} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: axis, fontSize: 11 }} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
          <Bar dataKey="target" name="Target" fill="#e2e8f0" radius={[6, 6, 0, 0]} barSize={22} />
          <Bar dataKey="actual" name="Actual" fill="#e11d2e" radius={[6, 6, 0, 0]} barSize={22} />
          <Line type="monotone" dataKey="actual" name="Trend" stroke="#0f172a" strokeWidth={2} dot={false} legendType="none" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PipelineChart() {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={salesPipeline} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke={grid} vertical={false} />
          <XAxis dataKey="stage" tickLine={false} axisLine={false} tick={{ fill: axis, fontSize: 10 }} dy={8} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: axis, fontSize: 11 }} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f8fafc" }} />
          <Bar dataKey="count" name="Leads" radius={[6, 6, 0, 0]} barSize={34}>
            {salesPipeline.map((entry) => (
              <Cell key={entry.stage} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PartsMovementChart() {
  return (
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={partsMovement} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid stroke={grid} vertical={false} />
          <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fill: axis, fontSize: 11 }} dy={8} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: axis, fontSize: 11 }} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f8fafc" }} />
          <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
          <Bar dataKey="issued" name="Issued to jobs" fill="#e11d2e" radius={[5, 5, 0, 0]} barSize={16} />
          <Bar dataKey="received" name="GRN received" fill="#3b82f6" radius={[5, 5, 0, 0]} barSize={16} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CorporateCollectionChart() {
  return (
    <div className="h-[270px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={corporateReceivables} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke={grid} vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: axis, fontSize: 11 }} dy={8} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: axis, fontSize: 11 }}
            tickFormatter={(value) => `${value}M`}
          />
          <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`PKR ${value}M`]} />
          <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
          <Bar dataKey="billed" name="Billed" fill="#0f172a" radius={[5, 5, 0, 0]} barSize={18} />
          <Bar dataKey="collected" name="Collected" fill="#10b981" radius={[5, 5, 0, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CashflowChart() {
  return (
    <div className="h-[270px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={cashflow} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="inflow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="outflow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e11d2e" stopOpacity={0.16} />
              <stop offset="100%" stopColor="#e11d2e" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke={grid} vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: axis, fontSize: 11 }} dy={8} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: axis, fontSize: 11 }}
            tickFormatter={(value) => `${value}M`}
          />
          <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`PKR ${value}M`]} />
          <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
          <Area type="monotone" dataKey="inflow" name="Inflow" stroke="#10b981" strokeWidth={2.2} fill="url(#inflow)" />
          <Area type="monotone" dataKey="outflow" name="Outflow" stroke="#e11d2e" strokeWidth={2.2} fill="url(#outflow)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AgingChart() {
  return (
    <div className="h-[270px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={aging} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke={grid} vertical={false} />
          <XAxis dataKey="bucket" tickLine={false} axisLine={false} tick={{ fill: axis, fontSize: 10 }} dy={8} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: axis, fontSize: 11 }}
            tickFormatter={(value) => `${value}L`}
          />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f8fafc" }} formatter={(value) => [`PKR ${value} Lac`]} />
          <Bar dataKey="amount" name="Receivables" radius={[6, 6, 0, 0]} barSize={34}>
            {aging.map((entry) => (
              <Cell key={entry.bucket} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function HeadcountDonut() {
  const total = departmentHeadcount.reduce((sum, item) => sum + item.count, 0);
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row">
      <div className="relative h-[170px] w-[170px] shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={departmentHeadcount}
              dataKey="count"
              nameKey="dept"
              innerRadius={54}
              outerRadius={78}
              paddingAngle={3}
              strokeWidth={0}
            >
              {departmentHeadcount.map((entry) => (
                <Cell key={entry.dept} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-extrabold text-slate-900">{total}</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Employees</span>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-1">
        {departmentHeadcount.map((item) => (
          <div key={item.dept} className="flex items-center justify-between gap-2 rounded-lg bg-slate-50/70 px-2.5 py-1.5">
            <span className="flex items-center gap-2 text-[11px] font-medium text-slate-600">
              <span className="h-2 w-2 rounded-full" style={{ background: item.color }} />
              {item.dept}
            </span>
            <span className="text-xs font-bold text-slate-900">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AttendanceChart() {
  return (
    <div className="h-[230px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={attendanceTrend} margin={{ top: 8, right: 12, left: -22, bottom: 0 }}>
          <CartesianGrid stroke={grid} vertical={false} />
          <XAxis dataKey="week" tickLine={false} axisLine={false} tick={{ fill: axis, fontSize: 11 }} dy={8} />
          <YAxis domain={[85, 100]} tickLine={false} axisLine={false} tick={{ fill: axis, fontSize: 11 }} />
          <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`${value}%`]} />
          <Line type="monotone" dataKey="present" name="Present" stroke="#10b981" strokeWidth={2.4} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ProfitChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={profitTrend} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid stroke={grid} vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: axis, fontSize: 11 }} dy={8} />
          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: axis, fontSize: 11 }}
            tickFormatter={(value) => `${value}M`}
          />
          <Tooltip contentStyle={tooltipStyle} formatter={(value) => [`PKR ${value}M`]} />
          <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
          <Bar dataKey="revenue" name="Revenue" fill="#0f172a" radius={[4, 4, 0, 0]} barSize={14} />
          <Bar dataKey="cost" name="Cost" fill="#cbd5e1" radius={[4, 4, 0, 0]} barSize={14} />
          <Line type="monotone" dataKey="profit" name="Profit" stroke="#e11d2e" strokeWidth={2.4} dot={{ r: 3 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DepartmentRevenueBars() {
  return (
    <div className="h-[230px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={departmentRevenue} layout="vertical" margin={{ top: 4, right: 24, left: 4, bottom: 0 }} barSize={22}>
          <CartesianGrid stroke={grid} horizontal={false} />
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="dept"
            tickLine={false}
            axisLine={false}
            width={56}
            tick={{ fill: "#475569", fontSize: 11, fontWeight: 600 }}
          />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f8fafc" }} formatter={(value) => [`PKR ${value} Cr`]} />
          <Bar dataKey="revenue" name="Revenue" radius={[0, 6, 6, 0]}>
            {departmentRevenue.map((entry) => (
              <Cell key={entry.dept} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
