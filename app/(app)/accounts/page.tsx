import {
  Banknote,
  CreditCard,
  Download,
  FileText,
  Landmark,
  Plus,
  ReceiptText,
  Send,
} from "lucide-react";
import { StatCard, PageHeader, Card, CardHeader, StatusBadge } from "@/components/ui";
import { CashflowChart, AgingChart } from "@/components/charts";
import { accountsKpis, invoices, aging, cashflow, receipts, paymentAllocations, creditNotes, reminderLog, promiseToPay, cashierReconciliation } from "@/lib/data";
import { formatPKR } from "@/lib/utils";

export default function AccountsPage() {
  const totalReceivables = invoices.reduce((sum, inv) => sum + (inv.amount - inv.paid), 0);

  return (
    <>
      <PageHeader
        eyebrow="Business"
        title="Accounts & Finance"
        description="Invoices, receivables, cash flow and payment reminders across both branches."
        actions={
          <>
            <button className="btn-secondary">
              <Download className="h-4 w-4" /> Export
            </button>
            <button className="btn-primary">
              <Plus className="h-4 w-4" /> New Invoice
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {accountsKpis.map((kpi, index) => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            note={kpi.sub}
            tone={index === 0 ? "red" : index === 1 ? "green" : index === 2 ? "amber" : "blue"}
            icon={[Landmark, Banknote, CreditCard, ReceiptText][index]}
          />
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardHeader title="Cash flow" subtitle="Monthly inflow vs outflow (PKR in M)" />
          <div className="px-2 pb-4 sm:px-4">
            <CashflowChart />
          </div>
        </Card>
        <Card className="lg:col-span-5">
          <CardHeader title="Receivables aging" subtitle="Open receivables by bucket (PKR in Lac)" />
          <div className="px-2 pb-4 sm:px-4">
            <AgingChart />
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader
          title="Invoices & payments"
          subtitle="Recent invoices with collection status"
          action={
            <div className="flex gap-2">
              <button className="btn-secondary text-xs">
                <Send className="h-3.5 w-3.5" /> Send reminders
              </button>
              <button className="btn-ghost text-xs">View all</button>
            </div>
          }
        />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Branch</th>
                <th className="text-right">Amount</th>
                <th className="text-right">Paid</th>
                <th className="text-right">Balance</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="font-mono text-xs font-bold text-slate-500">{invoice.id}</td>
                  <td className="font-semibold text-slate-800">{invoice.customer}</td>
                  <td className="text-slate-600">{invoice.type}</td>
                  <td className="text-slate-600">{invoice.branch}</td>
                  <td className="text-right font-medium text-slate-700">{formatPKR(invoice.amount)}</td>
                  <td className="text-right text-slate-600">{formatPKR(invoice.paid)}</td>
                  <td className="text-right font-bold text-slate-800">{formatPKR(invoice.amount - invoice.paid)}</td>
                  <td>
                    <StatusBadge status={invoice.status} />
                  </td>
                  <td className="text-slate-600">{invoice.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-3 text-[11px]">
          <span className="text-slate-500">
            Open balance: <strong className="text-slate-800">{formatPKR(totalReceivables)}</strong>
          </span>
          <span className="text-slate-500">Overdue invoices: 2 · PKR 22,750</span>
        </div>
      </Card>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-6">
          <CardHeader title="Payment reminders" subtitle="Scheduled WhatsApp & SMS reminders" />
          <div className="space-y-2 p-4">
            {invoices
              .filter((invoice) => invoice.status !== "Paid")
              .map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 p-3">
                  <div>
                    <p className="text-[12px] font-bold text-slate-800">{invoice.customer}</p>
                    <p className="text-[10px] text-slate-500">
                      {invoice.id} · {formatPKR(invoice.amount - invoice.paid)} due
                    </p>
                  </div>
                  <div className="flex gap-1.5">
                    <button className="btn-ghost text-[10px]">SMS</button>
                    <button className="btn-ghost text-[10px]">WhatsApp</button>
                  </div>
                </div>
              ))}
          </div>
        </Card>

        <Card className="lg:col-span-6">
          <CardHeader title="Aging summary" subtitle="Receivables by bucket" />
          <div className="space-y-3 p-5">
            {aging.map((bucket) => (
              <div key={bucket.bucket}>
                <div className="mb-1.5 flex justify-between text-[11px]">
                  <span className="font-medium text-slate-600">{bucket.bucket}</span>
                  <span className="font-bold text-slate-800">PKR {bucket.amount} Lac</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full" style={{ width: `${(bucket.amount / 124) * 100}%`, background: bucket.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-6">
          <CardHeader title="Receipts" subtitle="Cash, bank, card, cheque, online, credit" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Receipt</th>
                  <th>Customer</th>
                  <th>Method</th>
                  <th className="text-right">Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                    <td className="font-semibold text-stone-800">{item.customer}</td>
                    <td className="text-stone-600">{item.method}</td>
                    <td className="text-right font-bold text-stone-800">{formatPKR(item.amount)}</td>
                    <td className="text-stone-600">{item.date}</td>
                    <td><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-6">
          <CardHeader title="Payment allocation" subtitle="One receipt to one or many invoices" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Receipt</th>
                  <th>Invoices</th>
                  <th className="text-right">Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentAllocations.map((item) => (
                  <tr key={item.receipt}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.receipt}</td>
                    <td className="font-mono text-xs text-stone-500">{item.invoices}</td>
                    <td className="text-right font-bold text-stone-800">{formatPKR(item.amount)}</td>
                    <td><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-6">
          <CardHeader title="Credit notes" subtitle="Approval-based adjustments" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Credit note</th>
                  <th>Invoice</th>
                  <th>Reason</th>
                  <th className="text-right">Amount</th>
                  <th>Approval</th>
                </tr>
              </thead>
              <tbody>
                {creditNotes.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                    <td className="font-mono text-xs">{item.invoice}</td>
                    <td className="text-stone-600">{item.reason}</td>
                    <td className="text-right font-bold text-stone-800">{formatPKR(item.amount)}</td>
                    <td><StatusBadge status={item.approval} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-6">
          <CardHeader title="Reminders & promise to pay" subtitle="WhatsApp/SMS/email, escalation, follow-up" />
          <div className="space-y-4 p-5">
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Channel</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reminderLog.map((item, index) => (
                    <tr key={index}>
                      <td className="font-semibold text-stone-800">{item.customer}</td>
                      <td className="text-stone-600">{item.channel}</td>
                      <td className="text-stone-600">{item.date}</td>
                      <td><StatusBadge status={item.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th className="text-right">Amount</th>
                    <th>Promise date</th>
                    <th>Owner</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {promiseToPay.map((item, index) => (
                    <tr key={index}>
                      <td className="font-semibold text-stone-800">{item.customer}</td>
                      <td className="text-right font-bold text-stone-800">{formatPKR(item.amount)}</td>
                      <td className="text-stone-600">{item.promiseDate}</td>
                      <td className="text-stone-600">{item.owner}</td>
                      <td><StatusBadge status={item.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader title="Cashier reconciliation" subtitle="Daily cash, bank and variance" />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Branch</th>
                <th className="text-right">Cash</th>
                <th className="text-right">Bank</th>
                <th className="text-right">Variance</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {cashierReconciliation.map((item) => (
                <tr key={item.branch}>
                  <td className="font-semibold text-stone-800">{item.branch}</td>
                  <td className="text-right text-stone-600">{formatPKR(item.cash)}</td>
                  <td className="text-right text-stone-600">{formatPKR(item.bank)}</td>
                  <td className="text-right font-bold text-stone-800">{formatPKR(item.variance)}</td>
                  <td><StatusBadge status={item.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
