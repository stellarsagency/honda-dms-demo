import {
  AlertTriangle,
  CircleDollarSign,
  Filter,
  Package,
  Plus,
  Search,
  Truck,
} from "lucide-react";
import { StatCard, PageHeader, Card, CardHeader, StatusBadge } from "@/components/ui";
import { PartsMovementChart } from "@/components/charts";
import { partsKpis, lowStockParts, parts, purchaseOrders, partsMovement, partCompatibility, grns, stockTransfers, stockTakes, priceLists, stockAging, stockReturns, stockAdjustments, reorderSuggestions } from "@/lib/data";
import { formatPKR } from "@/lib/utils";

export default function PartsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Parts & Inventory"
        description="Stock on hand, low-stock alerts, purchase orders and inter-branch movement."
        actions={
          <>
            <button className="btn-secondary">
              <Filter className="h-4 w-4" /> Filters
            </button>
            <button className="btn-primary">
              <Plus className="h-4 w-4" /> New PO
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {partsKpis.map((kpi, index) => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            note={kpi.sub}
            tone={index === 0 ? "blue" : index === 1 ? "green" : index === 2 ? "red" : "amber"}
            icon={[Package, CircleDollarSign, AlertTriangle, Package][index]}
          />
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardHeader title="Parts movement" subtitle="Issued to jobs vs GRN received · last 7 days" />
          <div className="px-2 pb-4 sm:px-4">
            <PartsMovementChart />
          </div>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader
            title="Low stock alerts"
            subtitle="7 critical · reorder required"
            action={<button className="btn-ghost text-xs">Reorder all</button>}
          />
          <div className="space-y-2 p-4">
            {lowStockParts.map((item) => (
              <div key={item.number} className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-[12px] font-bold text-slate-800">{item.part}</p>
                    <p className="font-mono text-[10px] text-slate-400">{item.number}</p>
                  </div>
                  <StatusBadge status={item.stock <= 5 ? "Critical" : "Low"} />
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <span>
                    Stock <strong className="text-slate-700">{item.stock}</strong> / reorder {item.reorder}
                  </span>
                  <span>ETA {item.eta}</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-honda-500"
                    style={{ width: `${Math.min(100, (item.stock / item.reorder) * 100)}%` }}
                  />
                </div>
                <p className="mt-1.5 text-[10px] text-slate-400">
                  {item.branch} · Supplier: {item.supplier}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader
          title="Stock on hand"
          subtitle="Consolidated across 3S Main and 2S City"
          action={
            <div className="flex gap-2">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input className="field h-9 w-44 pl-9 text-xs" placeholder="Search part number..." />
              </div>
              <button className="btn-secondary text-xs">Stock take</button>
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
                <th className="text-right">Cost</th>
                <th className="text-right">Retail</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {parts.map((part) => (
                <tr key={part.number}>
                  <td className="font-semibold text-slate-800">{part.part}</td>
                  <td className="font-mono text-xs text-slate-500">{part.number}</td>
                  <td className="text-slate-600">{part.category}</td>
                  <td className="text-right font-medium text-slate-700">{part.stock3s}</td>
                  <td className="text-right font-medium text-slate-700">{part.stock2s}</td>
                  <td className="text-right text-slate-600">{formatPKR(part.cost)}</td>
                  <td className="text-right font-bold text-slate-800">{formatPKR(part.price)}</td>
                  <td>
                    <StatusBadge status={part.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="mt-5">
        <CardHeader title="Purchase orders" subtitle="Open, in-transit and received POs" />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>PO Number</th>
                <th>Supplier</th>
                <th className="text-right">Items</th>
                <th className="text-right">Value</th>
                <th>Status</th>
                <th>Ordered</th>
                <th>ETA / Delivered</th>
              </tr>
            </thead>
            <tbody>
              {purchaseOrders.map((po) => (
                <tr key={po.id}>
                  <td className="font-mono text-xs font-bold text-slate-500">{po.id}</td>
                  <td className="font-semibold text-slate-800">{po.supplier}</td>
                  <td className="text-right text-slate-600">{po.items}</td>
                  <td className="text-right font-bold text-slate-800">{formatPKR(po.value)}</td>
                  <td>
                    <StatusBadge status={po.status} />
                  </td>
                  <td className="text-slate-600">{po.date}</td>
                  <td className="text-slate-600">{po.eta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-6">
          <CardHeader title="Part compatibility & supersession" subtitle="Model fitment and supersession chain" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Part</th>
                  <th>Compatible models</th>
                  <th>Supersession</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {partCompatibility.map((item) => (
                  <tr key={item.part}>
                    <td className="font-semibold text-stone-800">{item.part}</td>
                    <td className="text-stone-600">{item.models}</td>
                    <td className="font-mono text-xs text-stone-500">{item.supersession}</td>
                    <td><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-6">
          <CardHeader title="GRN & receiving" subtitle="PO to GRN to supplier invoice" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>GRN</th>
                  <th>PO</th>
                  <th>Supplier</th>
                  <th className="text-right">Items</th>
                  <th>Received</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {grns.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                    <td className="font-mono text-xs">{item.po}</td>
                    <td className="text-stone-600">{item.supplier}</td>
                    <td className="text-right text-stone-600">{item.items}</td>
                    <td className="text-stone-600">{item.received}</td>
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
          <CardHeader title="Inter-branch transfers" subtitle="Dispatch, in-transit and receive" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Transfer</th>
                  <th>From</th>
                  <th>To</th>
                  <th className="text-right">Items</th>
                  <th>Status</th>
                  <th>Dispatch</th>
                  <th>Receive</th>
                </tr>
              </thead>
              <tbody>
                {stockTransfers.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                    <td className="text-stone-600">{item.from}</td>
                    <td className="text-stone-600">{item.to}</td>
                    <td className="text-right text-stone-600">{item.items}</td>
                    <td><StatusBadge status={item.status} /></td>
                    <td className="text-stone-600">{item.dispatch}</td>
                    <td className="text-stone-600">{item.receive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-6">
          <CardHeader title="Stock take & price lists" subtitle="Variance approval and branch pricing" />
          <div className="space-y-4 p-5">
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Stock take</th>
                    <th>Branch</th>
                    <th>Date</th>
                    <th>Variance</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stockTakes.map((item) => (
                    <tr key={item.id}>
                      <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                      <td className="text-stone-600">{item.branch}</td>
                      <td className="text-stone-600">{item.date}</td>
                      <td className="font-bold text-stone-800">{item.variance}</td>
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
                    <th>Branch</th>
                    <th>Part</th>
                    <th className="text-right">Cost</th>
                    <th className="text-right">Retail</th>
                    <th>Effective</th>
                  </tr>
                </thead>
                <tbody>
                  {priceLists.map((item, index) => (
                    <tr key={index}>
                      <td className="text-stone-600">{item.branch}</td>
                      <td className="font-semibold text-stone-800">{item.part}</td>
                      <td className="text-right text-stone-600">{formatPKR(item.cost)}</td>
                      <td className="text-right font-bold text-stone-800">{formatPKR(item.retail)}</td>
                      <td className="text-stone-600">{item.effective}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-6">
          <CardHeader title="Stock aging & dead stock" subtitle="Age buckets and valuation" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Part</th>
                  <th>Age</th>
                  <th className="text-right">Qty</th>
                  <th className="text-right">Value</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stockAging.map((item, index) => (
                  <tr key={index}>
                    <td className="font-semibold text-stone-800">{item.part}</td>
                    <td className="text-stone-600">{item.age}</td>
                    <td className="text-right text-stone-600">{item.qty}</td>
                    <td className="text-right font-bold text-stone-800">{formatPKR(item.value)}</td>
                    <td><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-6">
          <CardHeader title="Returns, adjustments & reorder" subtitle="Supplier returns, stock adjustments, min/max" />
          <div className="space-y-4 p-5">
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Return</th>
                    <th>Part</th>
                    <th className="text-right">Qty</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stockReturns.map((item) => (
                    <tr key={item.id}>
                      <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                      <td className="text-stone-700">{item.part}</td>
                      <td className="text-right text-stone-600">{item.qty}</td>
                      <td className="text-stone-600">{item.reason}</td>
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
                    <th>Adjustment</th>
                    <th>Part</th>
                    <th className="text-right">Qty</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stockAdjustments.map((item) => (
                    <tr key={item.id}>
                      <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                      <td className="text-stone-700">{item.part}</td>
                      <td className="text-right text-stone-600">{item.qty}</td>
                      <td className="text-stone-600">{item.reason}</td>
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
                    <th>Part</th>
                    <th className="text-right">Stock</th>
                    <th className="text-right">Min</th>
                    <th className="text-right">Suggested</th>
                    <th>Supplier</th>
                  </tr>
                </thead>
                <tbody>
                  {reorderSuggestions.map((item, index) => (
                    <tr key={index}>
                      <td className="font-semibold text-stone-800">{item.part}</td>
                      <td className="text-right text-stone-600">{item.stock}</td>
                      <td className="text-right text-stone-600">{item.min}</td>
                      <td className="text-right font-bold text-stone-800">{item.suggestedQty}</td>
                      <td className="text-stone-600">{item.supplier}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}
