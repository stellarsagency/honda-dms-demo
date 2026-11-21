import {
  Car,
  Filter,
  Plus,
  Search,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { StatCard, PageHeader, Card, CardHeader, StatusBadge } from "@/components/ui";
import { SalesTargetChart, PipelineChart } from "@/components/charts";
import { salesKpis, salesPipeline, bookings, vehicleInventory, salesTrend, leads, testDrives, quotations, pdiDeliveries, exchanges, salesTargets } from "@/lib/data";
import { formatPKR } from "@/lib/utils";

export default function SalesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Operations · 3S only"
        title="Sales Department"
        description="Leads, bookings, vehicle inventory and consultant performance. Disabled automatically for 2S branches."
        actions={
          <>
            <button className="btn-secondary">
              <Filter className="h-4 w-4" /> Filters
            </button>
            <button className="btn-primary">
              <Plus className="h-4 w-4" /> New Booking
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {salesKpis.map((kpi, index) => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            note={kpi.sub}
            tone={index === 0 ? "red" : index === 1 ? "blue" : index === 2 ? "amber" : "green"}
            icon={[Target, TrendingUp, Car, Users][index]}
          />
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardHeader title="Monthly target vs actual" subtitle="Units delivered against target" />
          <div className="px-2 pb-4 sm:px-4">
            <SalesTargetChart />
          </div>
        </Card>
        <Card className="lg:col-span-5">
          <CardHeader title="Sales pipeline" subtitle="Lead stages and conversion value (PKR in Cr)" />
          <div className="px-2 pb-4 sm:px-4">
            <PipelineChart />
          </div>
          <div className="border-t border-slate-100 px-5 py-3">
            <div className="grid grid-cols-5 gap-2 text-center">
              {salesPipeline.map((stage) => (
                <div key={stage.stage}>
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">{stage.stage}</p>
                  <p className="mt-1 text-sm font-extrabold text-slate-900">{stage.count}</p>
                  <p className="text-[9px] text-slate-500">PKR {stage.value} Cr</p>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader
          title="Recent bookings"
          subtitle="Latest sales orders and delivery status"
          action={
            <div className="flex gap-2">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input className="field h-9 w-44 pl-9 text-xs" placeholder="Search booking..." />
              </div>
              <button className="btn-secondary text-xs">Export</button>
            </div>
          }
        />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Booking</th>
                <th>Customer</th>
                <th>Model</th>
                <th>Variant</th>
                <th>Consultant</th>
                <th>Date</th>
                <th>Status</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="font-mono text-xs font-bold text-slate-500">{booking.id}</td>
                  <td className="font-semibold text-slate-800">{booking.customer}</td>
                  <td className="font-medium text-slate-700">{booking.model}</td>
                  <td className="text-slate-600">{booking.variant}</td>
                  <td className="text-slate-600">{booking.consultant}</td>
                  <td className="text-slate-600">{booking.date}</td>
                  <td>
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="text-right font-bold text-slate-800">{formatPKR(booking.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="mt-5">
        <CardHeader title="Vehicle inventory" subtitle="Stock, bookings and in-transit units by model" />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Model</th>
                <th>Colour (primary)</th>
                <th className="text-right">In stock</th>
                <th className="text-right">Booked</th>
                <th className="text-right">In transit</th>
                <th className="text-right">Available</th>
                <th>Demand</th>
              </tr>
            </thead>
            <tbody>
              {vehicleInventory.map((item) => (
                <tr key={item.model}>
                  <td className="font-semibold text-slate-800">{item.model}</td>
                  <td className="text-slate-600">{item.color}</td>
                  <td className="text-right font-medium text-slate-700">{item.inStock}</td>
                  <td className="text-right text-slate-600">{item.booked}</td>
                  <td className="text-right text-slate-600">{item.transit}</td>
                  <td className="text-right font-bold text-slate-800">{item.inStock - item.booked}</td>
                  <td>
                    <StatusBadge status={item.demand === "High" ? "High" : item.demand === "Medium" ? "Medium" : "Low"} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardHeader title="Leads & follow-ups" subtitle="Source, interest, assignment and next action" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Lead</th>
                  <th>Customer</th>
                  <th>Source</th>
                  <th>Interest</th>
                  <th>Assigned</th>
                  <th>Status</th>
                  <th>Next action</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                    <td className="font-semibold text-stone-800">{item.customer}</td>
                    <td className="text-stone-600">{item.source}</td>
                    <td className="text-stone-600">{item.interest}</td>
                    <td className="text-stone-600">{item.assigned}</td>
                    <td><StatusBadge status={item.status} /></td>
                    <td className="text-stone-600">{item.nextAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader title="Test drives" subtitle="Schedule, vehicle, feedback" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Test drive</th>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Date</th>
                  <th>Odometer</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {testDrives.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                    <td className="font-semibold text-stone-800">{item.customer}</td>
                    <td className="text-stone-600">{item.vehicle}</td>
                    <td className="text-stone-600">{item.date}</td>
                    <td className="text-stone-600">{item.odometer}</td>
                    <td className="text-stone-600">{item.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-6">
          <CardHeader title="Quotations" subtitle="Accessories, discounts, taxes, validity" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Quotation</th>
                  <th>Customer</th>
                  <th>Model</th>
                  <th className="text-right">Amount</th>
                  <th>Validity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {quotations.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                    <td className="font-semibold text-stone-800">{item.customer}</td>
                    <td className="text-stone-600">{item.model}</td>
                    <td className="text-right font-bold text-stone-800">{formatPKR(item.amount)}</td>
                    <td className="text-stone-600">{item.validity}</td>
                    <td><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-6">
          <CardHeader title="PDI, delivery & exchange" subtitle="Pre-delivery inspection, gate pass, used-car evaluation" />
          <div className="space-y-4 p-5">
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>PDI</th>
                    <th>Booking</th>
                    <th>PDI status</th>
                    <th>Delivery</th>
                    <th>Gate pass</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {pdiDeliveries.map((item) => (
                    <tr key={item.id}>
                      <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                      <td className="font-mono text-xs">{item.booking}</td>
                      <td><StatusBadge status={item.pdi} /></td>
                      <td className="text-stone-600">{item.deliveryDate}</td>
                      <td className="font-mono text-xs">{item.gatePass}</td>
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
                    <th>Exchange</th>
                    <th>Customer</th>
                    <th>Offered vehicle</th>
                    <th className="text-right">Evaluated</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {exchanges.map((item) => (
                    <tr key={item.id}>
                      <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                      <td className="font-semibold text-stone-800">{item.customer}</td>
                      <td className="text-stone-600">{item.offered}</td>
                      <td className="text-right font-bold text-stone-800">{formatPKR(item.evaluated)}</td>
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
        <CardHeader title="Sales targets & incentives" subtitle="Consultant performance and commission" />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Consultant</th>
                <th className="text-right">Target</th>
                <th className="text-right">Achieved</th>
                <th className="text-right">Incentive</th>
              </tr>
            </thead>
            <tbody>
              {salesTargets.map((item) => (
                <tr key={item.consultant}>
                  <td className="font-semibold text-stone-800">{item.consultant}</td>
                  <td className="text-right text-stone-600">{item.target}</td>
                  <td className="text-right text-stone-600">{item.achieved}</td>
                  <td className="text-right font-bold text-stone-800">{formatPKR(item.incentive)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
