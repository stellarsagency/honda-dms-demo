import {
  Car,
  CheckCircle2,
  Merge,
  Plus,
  Search,
  ShieldAlert,
  UserPlus,
  Users,
} from "lucide-react";
import { StatCard, PageHeader, Card, CardHeader, StatusBadge, Avatar } from "@/components/ui";
import { customers, vehicles, customerHistory, duplicateCandidates } from "@/lib/data";
import { formatPKR } from "@/lib/utils";

export default function CustomersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Master data"
        title="Customers & Vehicles"
        description="Shared customer and vehicle master across 3S and 2S branches. VIN is the unique key for vehicle history."
        actions={
          <>
            <button className="btn-secondary">
              <Search className="h-4 w-4" /> Duplicate check
            </button>
            <button className="btn-primary">
              <UserPlus className="h-4 w-4" /> New customer
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Customers" value={String(customers.length)} note="Individual + corporate" tone="blue" icon={Users} />
        <StatCard label="Vehicles" value={String(vehicles.length)} note="VIN-tracked" tone="green" icon={Car} />
        <StatCard label="Corporate accounts" value={String(customers.filter((c) => c.type === "Corporate").length)} note="Credit terms enabled" tone="amber" icon={ShieldAlert} />
        <StatCard label="Duplicate candidates" value={String(duplicateCandidates.length)} note="Review before merge" tone="red" icon={Merge} />
      </div>

      <Card className="mt-6">
        <CardHeader title="Customer master" subtitle="Shared across branches" action={<button className="btn-ghost text-xs">Export</button>} />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Type</th>
                <th>Phone</th>
                <th>CNIC / NTN</th>
                <th>City</th>
                <th>Branch scope</th>
                <th>Vehicles</th>
                <th>Credit terms</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={customer.name} size="sm" />
                      <div>
                        <p className="font-semibold text-stone-800">{customer.name}</p>
                        <p className="text-[10px] text-stone-400">{customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="text-stone-600">{customer.type}</td>
                  <td className="text-stone-600">{customer.phone}</td>
                  <td className="font-mono text-xs text-stone-500">{customer.cnic}</td>
                  <td className="text-stone-600">{customer.city}</td>
                  <td className="text-stone-600">{customer.branch}</td>
                  <td className="text-right font-medium text-stone-700">{customer.vehicles}</td>
                  <td className="text-stone-600">{customer.creditTerms}</td>
                  <td><StatusBadge status={customer.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="mt-6">
        <CardHeader title="Vehicle master" subtitle="VIN, ownership and branch history" />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>VIN / Chassis</th>
                <th>Registration</th>
                <th>Vehicle</th>
                <th>Owner</th>
                <th>Colour</th>
                <th>Odometer</th>
                <th>Warranty</th>
                <th>Branch history</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((vehicle) => (
                <tr key={vehicle.vin}>
                  <td className="font-mono text-xs font-semibold text-stone-500">{vehicle.vin}</td>
                  <td className="font-semibold text-stone-800">{vehicle.reg}</td>
                  <td className="text-stone-700">{vehicle.make} {vehicle.model} {vehicle.variant} ({vehicle.year})</td>
                  <td className="text-stone-600">{vehicle.owner}</td>
                  <td className="text-stone-600">{vehicle.color}</td>
                  <td className="text-right text-stone-600">{vehicle.odometer.toLocaleString("en-PK")} km</td>
                  <td className="text-stone-600">{vehicle.warranty}</td>
                  <td className="text-[11px] text-stone-500">{vehicle.branchHistory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardHeader title="360° customer history" subtitle="Sales, job cards, invoices and payments" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Type</th>
                  <th>Reference</th>
                  <th>Branch</th>
                  <th>Date</th>
                  <th className="text-right">Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {customerHistory.map((item, index) => (
                  <tr key={index}>
                    <td className="font-semibold text-stone-800">{item.customer}</td>
                    <td className="text-stone-600">{item.type}</td>
                    <td className="font-mono text-xs text-stone-500">{item.ref}</td>
                    <td className="text-stone-600">{item.branch}</td>
                    <td className="text-stone-600">{item.date}</td>
                    <td className="text-right font-bold text-stone-800">{formatPKR(item.amount)}</td>
                    <td><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader title="Duplicate detection" subtitle="Merge candidates by phone, CNIC, VIN, registration" action={<button className="btn-secondary text-xs">Merge selected</button>} />
          <div className="space-y-3 p-5">
            {duplicateCandidates.map((candidate) => (
              <div key={candidate.recordA} className="rounded-2xl border border-stone-200/80 bg-stone-50/70 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[12px] font-bold text-stone-800">{candidate.recordA}</p>
                    <p className="mt-1 text-[12px] text-stone-600">{candidate.recordB}</p>
                  </div>
                  <StatusBadge status={candidate.confidence === "100%" ? "Critical" : "High"} />
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px] text-stone-500">
                  <span>Match: {candidate.match}</span>
                  <span>Confidence: {candidate.confidence}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="btn-ghost text-[10px]">Review</button>
                  <button className="btn-primary text-[10px]">{candidate.action}</button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
