"use client";

import { useMemo, useState } from "react";
import { Search, Wrench, Plus, X } from "lucide-react";
import { serviceJobWorkflow } from "@/lib/data";
import { Card, CardHeader, StatusBadge } from "@/components/ui";
import { formatPKR } from "@/lib/utils";

type JobType = "Mechanical" | "Body Shop";

export function ServiceJobWorkflow() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | JobType>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return serviceJobWorkflow.filter((job) => {
      if (typeFilter !== "all" && job.jobType !== typeFilter) return false;
      if (!term) return true;
      return [job.id, job.plate, job.chassis, job.engine, job.customer, job.cnic, job.testDriveRef, job.advisor, job.pit, job.jobType, job.billingType]
        .some((value) => String(value).toLowerCase().includes(term));
    });
  }, [query, typeFilter]);

  const totals = useMemo(() => {
    const byType: Record<JobType, { count: number; cash: number; credit: number; corporate: number; insurance: number; total: number }> = {
      Mechanical: { count: 0, cash: 0, credit: 0, corporate: 0, insurance: 0, total: 0 },
      "Body Shop": { count: 0, cash: 0, credit: 0, corporate: 0, insurance: 0, total: 0 },
    };
    for (const job of filtered) {
      const t = byType[job.jobType as JobType];
      t.count += 1;
      t.cash += job.cashBill;
      t.credit += job.creditBill;
      t.corporate += job.corporateBill;
      t.insurance += job.insuranceBill;
      t.total += job.cashBill + job.creditBill + job.corporateBill + job.insuranceBill;
    }
    return byType;
  }, [filtered]);

  function startNew(type: JobType) {
    setModalOpen(false);
    setNotice(`Job type selected: ${type}. In production this opens the full ${type.toLowerCase()} job card form.`);
    setTypeFilter(type);
  }

  return (
    <Card className="mt-5">
      <CardHeader
        title="Job card workflow, pit & time"
        subtitle="First choose job type: Mechanical or Body Shop. Then search by plate, chassis, engine, customer, CNIC or test-drive number. Pit time carries over automatically."
        action={
          <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                className="field h-9 w-full pl-9 text-xs sm:w-64"
                placeholder="Search plate, chassis, engine..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <button onClick={() => setModalOpen(true)} className="btn-primary text-xs">
              <Plus className="h-3.5 w-3.5" /> New job card
            </button>
          </div>
        }
      />

      <div className="flex flex-wrap items-center gap-2 border-b border-stone-100 bg-stone-50/60 px-5 py-3">
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">Job type</span>
        {(["all", "Mechanical", "Body Shop"] as const).map((value) => (
          <button
            key={value}
            onClick={() => setTypeFilter(value)}
            className={`rounded-full px-3 py-1 text-[10px] font-bold transition ${
              typeFilter === value
                ? "bg-ruby-600 text-white shadow-sm"
                : "border border-stone-200 bg-white text-stone-600 hover:bg-stone-50"
            }`}
          >
            {value === "all" ? "All jobs" : value}
          </button>
        ))}
        {notice ? (
          <span className="ml-auto text-[10px] font-semibold text-emerald-700">{notice}</span>
        ) : null}
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Job card</th>
              <th>Job type</th>
              <th>Plate / chassis / engine</th>
              <th>Customer / CNIC / test drive</th>
              <th>Advisor / pit</th>
              <th>In / out</th>
              <th className="text-right">Est.</th>
              <th className="text-right">Total</th>
              <th>Billing (cash / credit / corporate / insurance)</th>
              <th>Break service / leather</th>
              <th>Status</th>
              <th>Thanks / CRO</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((job) => (
              <tr key={job.id}>
                <td className="font-mono text-xs font-bold text-slate-500">{job.id}</td>
                <td>
                  <StatusBadge status={job.jobType === "Mechanical" ? "Mechanical" : "Body Shop"} />
                  <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                    {job.billingType}
                  </span>
                </td>
                <td>
                  <p className="font-mono text-[11px] font-bold text-slate-700">{job.plate}</p>
                  <p className="font-mono text-[9px] text-slate-400">{job.chassis}</p>
                  <p className="font-mono text-[9px] text-slate-400">{job.engine}</p>
                </td>
                <td>
                  <p className="font-semibold text-slate-800">{job.customer}</p>
                  <p className="font-mono text-[9px] text-slate-400">{job.cnic}</p>
                  <p className="text-[9px] text-slate-500">Test drive: {job.testDriveRef}</p>
                </td>
                <td>
                  <p className="text-slate-600">{job.advisor}</p>
                  <p className="text-[10px] font-bold text-slate-500">{job.pit}</p>
                </td>
                <td className="text-slate-600">
                  {job.inTime} → {job.outTime}
                </td>
                <td className="text-right text-slate-600">{job.estimatedMinutes}m</td>
                <td className="text-right font-bold text-slate-800">
                  {job.accumulatedMinutes}m
                  {job.accumulatedMinutes > job.estimatedMinutes ? (
                    <span className="block text-[9px] font-normal text-amber-600">
                      +{job.accumulatedMinutes - job.estimatedMinutes}m carry-over
                    </span>
                  ) : null}
                </td>
                <td className="text-slate-600">
                  <span className="block text-[9px]">Cash {formatPKR(job.cashBill)}</span>
                  <span className="block text-[9px]">Credit {formatPKR(job.creditBill)}</span>
                  <span className="block text-[9px]">Corporate {formatPKR(job.corporateBill)}</span>
                  <span className="block text-[9px]">Insurance {formatPKR(job.insuranceBill)}</span>
                </td>
                <td className="text-slate-600">
                  {job.breakService}
                  <span className="block text-[9px] text-slate-400">{job.breakLeather}</span>
                </td>
                <td>
                  <StatusBadge status={job.status} />
                </td>
                <td className="text-slate-600">
                  {job.thanksMessage}
                  <span className="block text-[9px] text-slate-400">{job.croReminder}</span>
                </td>
              </tr>
            ))}
            {!filtered.length ? (
              <tr>
                <td colSpan={12} className="py-8 text-center text-xs text-slate-400">
                  No vehicle or customer matches this search.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 border-t border-stone-100 bg-stone-50/60 px-5 py-4 sm:grid-cols-2">
        {(["Mechanical", "Body Shop"] as JobType[]).map((type) => (
          <div key={type} className="rounded-xl border border-stone-200 bg-white p-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-500">{type}</p>
            <p className="mt-1 text-xs text-stone-700">
              {totals[type].count} job{totals[type].count === 1 ? "" : "s"} · Total {formatPKR(totals[type].total)}
            </p>
            <p className="mt-0.5 text-[9px] text-stone-500">
              Cash {formatPKR(totals[type].cash)} · Credit {formatPKR(totals[type].credit)} · Corporate {formatPKR(totals[type].corporate)} · Insurance {formatPKR(totals[type].insurance)}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-stone-100 bg-stone-50/60 px-5 py-3 text-[10px] text-slate-500">
        <Wrench className="mr-1.5 inline h-3.5 w-3.5" />
        If a pit is busy, the running job time carries over into the new estimate. With 5 minutes left, CRO sends a delivery reminder.
      </div>

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-stone-900">New job card</h3>
              <button onClick={() => setModalOpen(false)} className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-1 text-xs text-stone-500">
              Pehle job ka type select karein. In production yahan complete job card form open hoga.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                onClick={() => startNew("Mechanical")}
                className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-6 text-center transition hover:border-ruby-300 hover:bg-ruby-50"
              >
                <p className="text-sm font-bold text-stone-900">Mechanical</p>
                <p className="mt-1 text-[10px] text-stone-500">Engine, brakes, AC, electrical</p>
              </button>
              <button
                onClick={() => startNew("Body Shop")}
                className="rounded-xl border border-stone-200 bg-stone-50 px-4 py-6 text-center transition hover:border-ruby-300 hover:bg-ruby-50"
              >
                <p className="text-sm font-bold text-stone-900">Body Shop</p>
                <p className="mt-1 text-[10px] text-stone-500">Denting, painting, leather, alignment</p>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  );
}
