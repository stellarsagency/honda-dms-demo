import {
  Building2,
  CreditCard,
  FileText,
  Plus,
  ShieldCheck,
} from "lucide-react";
import { StatCard, PageHeader, Card, CardHeader, StatusBadge, Avatar } from "@/components/ui";
import { FeatureSections } from "@/components/feature-sections";
import { FeatureGate } from "@/components/feature-gate";
import { CorporateCollectionChart } from "@/components/charts";
import { corporateAccounts, workOrders, corporateReceivables, mouRates, workOrderItems, corporateStatements, corporateMouLetters, corporateCarInOut, autoInvoices } from "@/lib/data";
import { formatPKR } from "@/lib/utils";

export default function CorporatePage() {
  const totalCredit = corporateAccounts.reduce((sum, account) => sum + account.credit, 0);
  const totalUsed = corporateAccounts.reduce((sum, account) => sum + account.used, 0);

  return (
    <>
      <PageHeader
        eyebrow="Business"
        title="Corporate Accounts"
        description="MOUs, work orders, credit limits and receivables for fleet and corporate customers."
        actions={
          <>
            <button className="btn-secondary">
              <FileText className="h-4 w-4" /> MOU template
            </button>
            <button className="btn-primary">
              <Plus className="h-4 w-4" /> New Work Order
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active accounts" value={String(corporateAccounts.length)} note="6 corporate fleets" tone="blue" icon={Building2} />
        <StatCard label="Credit limit" value={formatPKR(totalCredit, true)} note="Approved MOU limits" tone="green" icon={CreditCard} />
        <StatCard label="Credit used" value={formatPKR(totalUsed, true)} note={`${Math.round((totalUsed / totalCredit) * 100)}% utilisation`} tone="amber" icon={ShieldCheck} />
        <StatCard label="Open work orders" value={String(workOrders.filter((wo) => wo.status !== "Completed").length)} note="PKR 21.3 Lac in progress" tone="red" icon={FileText} />
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {corporateAccounts.map((account) => {
          const utilisation = Math.round((account.used / account.credit) * 100);
          return (
            <Card key={account.company} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar name={account.company} size="md" />
                  <div>
                    <p className="text-[13px] font-bold text-slate-800">{account.company}</p>
                    <p className="text-[10px] text-slate-500">
                      {account.contact} · {account.vehicles} vehicles
                    </p>
                  </div>
                </div>
                <StatusBadge status={account.status} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-[11px]">
                <div className="rounded-lg bg-slate-50 p-2.5">
                  <p className="text-slate-400">MOU</p>
                  <p className="mt-0.5 font-mono text-xs font-bold text-slate-700">{account.mou}</p>
                </div>
                <div className="rounded-lg bg-slate-50 p-2.5">
                  <p className="text-slate-400">Expiry</p>
                  <p className="mt-0.5 font-semibold text-slate-700">{account.expiry}</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-1.5 flex justify-between text-[11px]">
                  <span className="text-slate-500">Credit utilisation</span>
                  <span className="font-bold text-slate-700">{utilisation}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      utilisation >= 90 ? "bg-honda-500" : utilisation >= 70 ? "bg-amber-500" : "bg-emerald-500",
                    )}
                    style={{ width: `${utilisation}%` }}
                  />
                </div>
                <div className="mt-1.5 flex justify-between text-[10px] text-slate-500">
                  <span>Used {formatPKR(account.used, true)}</span>
                  <span>Limit {formatPKR(account.credit, true)}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardHeader title="Billed vs collected" subtitle="Corporate receivables · last 6 months (PKR in M)" />
          <div className="px-2 pb-4 sm:px-4">
            <CorporateCollectionChart />
          </div>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader title="MOU expiries" subtitle="Renewal pipeline" />
          <div className="space-y-3 p-5">
            {corporateAccounts
              .slice()
              .sort((a, b) => a.expiry.localeCompare(b.expiry))
              .slice(0, 5)
              .map((account) => (
                <div key={account.company} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={account.company} size="sm" />
                    <div>
                      <p className="text-[12px] font-bold text-slate-800">{account.company}</p>
                      <p className="text-[10px] text-slate-500">{account.mou}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[11px] font-semibold text-slate-700">{account.expiry}</p>
                    <StatusBadge status={account.status} />
                  </div>
                </div>
              ))}
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader title="Work orders" subtitle="Corporate and fleet service work orders" action={<button className="btn-secondary text-xs">New WO</button>} />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Work Order</th>
                <th>Company</th>
                <th>Type</th>
                <th className="text-right">Vehicles</th>
                <th className="text-right">Amount</th>
                <th>Approved by</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((wo) => (
                <tr key={wo.id}>
                  <td className="font-mono text-xs font-bold text-slate-500">{wo.id}</td>
                  <td className="font-semibold text-slate-800">{wo.company}</td>
                  <td className="text-slate-600">{wo.type}</td>
                  <td className="text-right font-medium text-slate-700">{wo.vehicles}</td>
                  <td className="text-right font-bold text-slate-800">{formatPKR(wo.amount)}</td>
                  <td className="text-slate-600">{wo.approvedBy}</td>
                  <td>
                    <StatusBadge status={wo.status} />
                  </td>
                  <td className="text-slate-600">{wo.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-6">
          <CardHeader title="MOU rate items" subtitle="Labour rate, parts discount, credit terms" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Labour rate</th>
                  <th>Parts discount</th>
                  <th>Credit terms</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mouRates.map((item) => (
                  <tr key={item.company}>
                    <td className="font-semibold text-stone-800">{item.company}</td>
                    <td className="text-stone-600">{item.labourRate}</td>
                    <td className="text-stone-600">{item.partsDiscount}</td>
                    <td className="text-stone-600">{item.creditTerms}</td>
                    <td><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-6">
          <CardHeader title="Work order items" subtitle="Per vehicle and job" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Work order</th>
                  <th>Vehicle</th>
                  <th>Service</th>
                  <th className="text-right">Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {workOrderItems.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                    <td className="font-mono text-xs">{item.wo}</td>
                    <td className="text-stone-600">{item.vehicle}</td>
                    <td className="text-stone-600">{item.service}</td>
                    <td className="text-right font-bold text-stone-800">{formatPKR(item.amount)}</td>
                    <td><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader title="Corporate statements" subtitle="Billed, collected, balance and aging" />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Company</th>
                <th className="text-right">Billed</th>
                <th className="text-right">Collected</th>
                <th className="text-right">Balance</th>
                <th>Aging</th>
              </tr>
            </thead>
            <tbody>
              {corporateStatements.map((item) => (
                <tr key={item.company}>
                  <td className="font-semibold text-stone-800">{item.company}</td>
                  <td className="text-right text-stone-600">{formatPKR(item.billed)}</td>
                  <td className="text-right text-stone-600">{formatPKR(item.collected)}</td>
                  <td className="text-right font-bold text-stone-800">{formatPKR(item.balance)}</td>
                  <td><StatusBadge status={item.aging} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <FeatureGate feature="corporate.mouLetters">
        <Card className="lg:col-span-6">
          <CardHeader title="Corporate MOU letters" subtitle="Separate MOU, requirements and work order" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>MOU letter</th>
                  <th>Requirements</th>
                  <th>Work order</th>
                  <th>Attachment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {corporateMouLetters.map((item) => (
                  <tr key={item.company}>
                    <td className="font-semibold text-stone-800">{item.company}</td>
                    <td className="font-mono text-xs text-stone-500">{item.mouLetter}</td>
                    <td className="text-stone-600">{item.requirements}</td>
                    <td className="font-mono text-xs">{item.workOrder}</td>
                    <td className="text-stone-600">{item.attachment}</td>
                    <td><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        </FeatureGate>

        <FeatureGate feature="corporate.carInOut">
        <Card className="lg:col-span-6">
          <CardHeader title="Corporate car in/out" subtitle="Appointment and vehicle movement" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Vehicle</th>
                  <th>In</th>
                  <th>Out</th>
                  <th>Work order</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {corporateCarInOut.map((item, index) => (
                  <tr key={index}>
                    <td className="font-semibold text-stone-800">{item.company}</td>
                    <td className="text-stone-600">{item.vehicle}</td>
                    <td className="text-stone-600">{item.inTime}</td>
                    <td className="text-stone-600">{item.outTime}</td>
                    <td className="font-mono text-xs">{item.workOrder}</td>
                    <td><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        </FeatureGate>
      </div>

      <FeatureGate feature="corporate.autoInvoice">
      <Card className="mt-5">
        <CardHeader title="Auto invoice & WhatsApp" subtitle="Auto-generate invoice and send to client" />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th className="text-right">Amount</th>
                <th>Generated</th>
                <th>WhatsApp</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {autoInvoices.map((item) => (
                <tr key={item.invoice}>
                  <td className="font-mono text-xs font-bold text-stone-500">{item.invoice}</td>
                  <td className="text-stone-700">{item.customer}</td>
                  <td className="text-right font-bold text-stone-800">{formatPKR(item.amount)}</td>
                  <td className="text-stone-600">{item.generated}</td>
                  <td><StatusBadge status={item.whatsapp} /></td>
                  <td><StatusBadge status={item.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      </FeatureGate>

      <FeatureSections module="corporate" />
    </>
  );
}

function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
