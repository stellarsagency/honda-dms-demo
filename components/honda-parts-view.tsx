"use client";

import { useMemo, useState } from "react";
import { Filter, ShieldCheck } from "lucide-react";
import { hondaAuthorisedParts } from "@/lib/data";
import { Card, CardHeader, StatusBadge } from "@/components/ui";
import { formatPKR } from "@/lib/utils";

export function HondaPartsView() {
  const [authorisedOnly, setAuthorisedOnly] = useState(true);
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    let result = authorisedOnly
      ? hondaAuthorisedParts.filter((item) => item.hondaAuthorised)
      : hondaAuthorisedParts;
    const term = query.trim().toLowerCase();
    if (term) {
      result = result.filter((item) =>
        [item.part, item.number, item.category, item.companyScope].some((value) =>
          String(value).toLowerCase().includes(term),
        ),
      );
    }
    return result;
  }, [authorisedOnly, query]);

  return (
    <Card className="mt-5">
      <CardHeader
        title="Honda authorised parts view"
        subtitle="Special company-authorised users can view only the Honda Atlas parts and stock required for dealership operations."
        action={
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative hidden sm:block">
              <Filter className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                className="field h-9 w-44 pl-9 text-xs"
                placeholder="Search authorised part..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <button
              onClick={() => setAuthorisedOnly((value) => !value)}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold transition ${
                authorisedOnly
                  ? "bg-emerald-600 text-white shadow-sm hover:bg-emerald-700"
                  : "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50"
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              {authorisedOnly ? "Honda authorised only" : "All parts"}
            </button>
          </div>
        }
      />
      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>Part</th>
              <th>Number</th>
              <th>Category</th>
              <th className="text-right">3S Main</th>
              <th className="text-right">2S City</th>
              <th className="text-right">Retail</th>
              <th>Company</th>
              <th>Honda authorised</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item.number}>
                <td className="font-semibold text-stone-800">{item.part}</td>
                <td className="font-mono text-xs text-stone-500">{item.number}</td>
                <td className="text-slate-600">{item.category}</td>
                <td className="text-right text-slate-600">{item.stock3s}</td>
                <td className="text-right text-slate-600">{item.stock2s}</td>
                <td className="text-right font-bold text-stone-800">{formatPKR(item.price)}</td>
                <td className="text-slate-600">{item.companyScope}</td>
                <td>
                  <StatusBadge status={item.hondaAuthorised ? "Approved" : "Restricted"} />
                </td>
                <td>
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
            {!rows.length ? (
              <tr>
                <td colSpan={9} className="py-8 text-center text-xs text-slate-400">
                  No authorised parts match this search.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
      <div className="border-t border-stone-100 bg-stone-50/60 px-5 py-3 text-[10px] text-slate-500">
        <ShieldCheck className="mr-1.5 inline h-3.5 w-3.5" />
        Honda authorised view limits non-company parts. Use Admin permissions to grant this view to a special Honda user.
      </div>
    </Card>
  );
}
