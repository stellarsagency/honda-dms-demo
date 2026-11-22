"use client";

import { Layers } from "lucide-react";
import { useUser } from "@/components/user-context";
import { featureGroupsForModule, type FeatureColumn } from "@/lib/feature-data";
import { moduleLabels, type ModuleKey } from "@/lib/access";
import { Card, CardHeader, StatusBadge } from "@/components/ui";
import { cn, formatPKR } from "@/lib/utils";

function Cell({ value, column }: { value: string | number | boolean; column: FeatureColumn }) {
  if (column.format === "status") return <StatusBadge status={String(value)} />;
  if (column.format === "currency") return <>{formatPKR(Number(value))}</>;
  if (column.format === "mono") {
    return <span className="font-mono text-[11px] text-stone-500">{value}</span>;
  }
  if (column.format === "bold") return <span className="font-bold text-stone-800">{value}</span>;
  return <>{value}</>;
}

export function FeatureSections({
  module,
  eyebrow = "Department controls",
  title,
  description,
}: {
  module: ModuleKey;
  eyebrow?: string;
  title?: string;
  description?: string;
}) {
  const { canAccessFeature } = useUser();
  const groups = featureGroupsForModule(module).filter((group) => canAccessFeature(group.key));

  if (!groups.length) return null;

  return (
    <section className="mt-8">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-ruby-600">
            <Layers className="h-3.5 w-3.5" /> {eyebrow}
          </p>
          <h2 className="text-[22px] font-bold tracking-tight text-stone-900">
            {title ?? `More ${moduleLabels[module]} controls`}
          </h2>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-stone-500">
            {description ??
              "Standard dealer-management controls included in this demo. Each card is feature-gated by the owner's approval."}
          </p>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-[10px] font-bold text-stone-500 ring-1 ring-stone-200">
          {groups.length} approved feature{groups.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="grid gap-5 lg:grid-cols-12">
        {groups.map((group) => (
          <Card key={group.key} className="lg:col-span-6">
            <CardHeader
              title={group.title}
              subtitle={group.subtitle}
              action={<StatusBadge status="Approved" />}
            />
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    {group.columns.map((column) => (
                      <th key={column.key} className={cn(column.align === "right" && "text-right")}>
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row, index) => (
                    <tr key={`${group.key}-${index}`}>
                      {group.columns.map((column) => (
                        <td
                          key={column.key}
                          className={cn(
                            column.align === "right" && "text-right",
                            column.format === "currency" && "font-semibold text-stone-700",
                            !column.format && "text-stone-600",
                          )}
                        >
                          <Cell value={row[column.key]} column={column} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
