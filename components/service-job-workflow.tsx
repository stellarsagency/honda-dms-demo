"use client";

import { useMemo, useState } from "react";
import { Search, Wrench } from "lucide-react";
import { serviceJobWorkflow } from "@/lib/data";
import { Card, CardHeader, StatusBadge } from "@/components/ui";
import { formatPKR } from "@/lib/utils";

export function ServiceJobWorkflow() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return serviceJobWorkflow;
    return serviceJobWorkflow.filter((job) =>
      [job.id, job.plate, job.chassis, job.engine, job.customer, job.cnic, job.testDriveRef, job.advisor, job.pit]
        .some((value) => String(value).toLowerCase().includes(term)),
    );
  }, [query]);

  return (
    <Card className="mt-5">
      <CardHeader
        title="Job card workflow, pit & time"
        subtitle="Search by plate, chassis, engine, customer, CNIC or test-drive number. Pit time is added automatically when a previous job is still running."
        action={
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              className="field h-9 w-full pl-9 text-xs sm:w-64"
              placeholder="Search plate, chassis, engine..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        }
      />
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Job card</th>
              <th>Plate / chassis / engine</th>
              <th>Customer / CNIC / test drive</th>
              <th>Advisor / pit</th>
              <th>In / out</th>
              <th className="text-right">Est.</th>
              <th className="text-right">Total</th>
              <th>Cash given / made</th>
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
                  {formatPKR(job.cashGiven)} / {formatPKR(job.cashMade)}
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
                <td colSpan={11} className="py-8 text-center text-xs text-slate-400">
                  No vehicle or customer matches this search.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="border-t border-slate-100 bg-stone-50/60 px-5 py-3 text-[10px] text-slate-500">
        <Wrench className="mr-1.5 inline h-3.5 w-3.5" />
        If a pit is busy, the running job time carries over into the new estimate. With 5 minutes left, CRO sends a delivery reminder.
      </div>
    </Card>
  );
}
