import {
  ArrowLeftRight,
  CalendarDays,
  CircleDollarSign,
  ClipboardCheck,
  Filter,
  Plus,
  Search,
  Wrench,
} from "lucide-react";
import { StatCard, PageHeader, Card, CardHeader, StatusBadge, Avatar, Progress } from "@/components/ui";
import { FeatureSections } from "@/components/feature-sections";
import { FeatureGate } from "@/components/feature-gate";
import { serviceKpis, workshopBays, jobCards, appointments, serviceAppointments, preInspections, estimates, technicianProductivity, qualityChecks, gatePasses, warrantyClaims, serviceFeedback, serviceComplaints, technicianTime, reworkTracking, wheelAlignmentJobs, serviceCustomerProfiles, servicePayments, vehicleInOut, autoInvoices } from "@/lib/data";
import { formatPKR } from "@/lib/utils";

export default function ServicePage() {
  return (
    <>
      <PageHeader
        eyebrow="Operations"
        title="Service Department"
        description="Job cards, workshop bays, estimates and approvals across both branches."
        actions={
          <>
            <button className="btn-secondary">
              <Filter className="h-4 w-4" /> Filters
            </button>
            <button className="btn-primary">
              <Plus className="h-4 w-4" /> New Job Card
            </button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {serviceKpis.map((kpi, index) => (
          <StatCard
            key={kpi.label}
            label={kpi.label}
            value={kpi.value}
            note={kpi.sub}
            tone={index === 0 ? "blue" : index === 1 ? "amber" : index === 2 ? "green" : "red"}
            icon={[Wrench, ClipboardCheck, CalendarDays, ArrowLeftRight][index]}
          />
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-8">
          <CardHeader title="Workshop bays" subtitle="Live bay allocation · 3S Main" action={<button className="btn-ghost text-xs">Open board</button>} />
          <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-3">
            {workshopBays.map((bay) => (
              <div key={bay.bay} className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500">{bay.bay}</span>
                  <StatusBadge status={bay.status} />
                </div>
                <p className="mt-2 text-[13px] font-bold text-slate-800">{bay.vehicle}</p>
                <p className="mt-0.5 font-mono text-[10px] text-slate-400">{bay.job}</p>
                <p className="mt-2 text-[11px] text-slate-500">Technician: {bay.tech}</p>
                <div className="mt-3">
                  <Progress value={bay.pct} tone={bay.pct === 100 ? "green" : "blue"} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader title="Today's appointments" subtitle="Scheduled vehicles" />
          <div className="space-y-2 p-4">
            {appointments.map((item) => (
              <div key={item.id} className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-bold text-slate-400">{item.time}</span>
                  <StatusBadge status={item.status} />
                </div>
                <p className="mt-1 text-[12px] font-bold text-slate-800">{item.customer}</p>
                <p className="text-[10px] text-slate-500">
                  {item.vehicle} · {item.plate}
                </p>
                <p className="mt-1 text-[10px] text-slate-500">{item.service}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader
          title="Job cards"
          subtitle="All open, in-progress and awaiting-approval jobs"
          action={
            <div className="flex gap-2">
              <div className="relative hidden sm:block">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input className="field h-9 w-44 pl-9 text-xs" placeholder="Search job card..." />
              </div>
              <button className="btn-secondary text-xs">Export</button>
            </div>
          }
        />
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Job Card</th>
                <th>Customer / Vehicle</th>
                <th>Service</th>
                <th>Advisor</th>
                <th>Technician</th>
                <th>Branch</th>
                <th>Progress</th>
                <th>Status</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {jobCards.map((job) => (
                <tr key={job.id}>
                  <td className="font-mono text-xs font-bold text-slate-500">{job.id}</td>
                  <td>
                    <div className="flex items-center gap-2.5">
                      <Avatar name={job.customer} size="sm" />
                      <div>
                        <p className="font-semibold text-slate-800">{job.customer}</p>
                        <p className="text-[10px] text-slate-400">
                          {job.vehicle} · {job.plate}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="text-slate-600">{job.service}</td>
                  <td className="text-slate-600">{job.advisor}</td>
                  <td className="text-slate-600">{job.technician}</td>
                  <td className="text-slate-600">{job.branch}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <Progress value={job.progress} tone={job.progress === 100 ? "green" : "blue"} className="w-20" />
                      <span className="text-[10px] font-semibold text-slate-500">{job.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <StatusBadge status={job.status} />
                  </td>
                  <td className="text-right font-bold text-slate-800">
                    {job.amount ? formatPKR(job.amount) : "Free service"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-6">
          <CardHeader title="Service appointments" subtitle="Due by date and kilometres" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Appointment</th>
                  <th>Customer / Vehicle</th>
                  <th>Due</th>
                  <th>Type</th>
                  <th>Advisor</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {serviceAppointments.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                    <td>
                      <p className="font-semibold text-stone-800">{item.customer}</p>
                      <p className="text-[10px] text-stone-400">{item.vehicle}</p>
                    </td>
                    <td className="text-stone-600">{item.date} · {item.kmDue.toLocaleString("en-PK")} km</td>
                    <td className="text-stone-600">{item.type}</td>
                    <td className="text-stone-600">{item.advisor}</td>
                    <td><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-6">
          <CardHeader title="Pre-inspection checklist" subtitle="Odometer, fuel, valuables, photos" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Inspection</th>
                  <th>Job</th>
                  <th>Odometer</th>
                  <th>Fuel</th>
                  <th>Valuables</th>
                  <th>Photos</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {preInspections.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                    <td className="font-mono text-xs">{item.job}</td>
                    <td className="text-stone-600">{item.odometer.toLocaleString("en-PK")} km</td>
                    <td className="text-stone-600">{item.fuel}</td>
                    <td className="text-stone-600">{item.valuables}</td>
                    <td className="text-right font-medium text-stone-700">{item.photos}</td>
                    <td className="text-stone-600">{item.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <CardHeader title="Estimates" subtitle="Labour, parts, consumables, sublet and approval" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Estimate</th>
                  <th>Job</th>
                  <th className="text-right">Labour</th>
                  <th className="text-right">Parts</th>
                  <th className="text-right">Consumables</th>
                  <th className="text-right">Sublet</th>
                  <th className="text-right">Total</th>
                  <th>Approval</th>
                </tr>
              </thead>
              <tbody>
                {estimates.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                    <td className="font-mono text-xs">{item.job}</td>
                    <td className="text-right text-stone-600">{formatPKR(item.labour)}</td>
                    <td className="text-right text-stone-600">{formatPKR(item.parts)}</td>
                    <td className="text-right text-stone-600">{formatPKR(item.consumables)}</td>
                    <td className="text-right text-stone-600">{formatPKR(item.sublet)}</td>
                    <td className="text-right font-bold text-stone-800">{formatPKR(item.total)}</td>
                    <td><StatusBadge status={item.approval} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-5">
          <CardHeader title="Technician productivity" subtitle="Jobs, hours and efficiency" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Technician</th>
                  <th>Branch</th>
                  <th className="text-right">Jobs</th>
                  <th className="text-right">Hours</th>
                  <th>Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {technicianProductivity.map((item) => (
                  <tr key={item.name}>
                    <td className="font-semibold text-stone-800">{item.name}</td>
                    <td className="text-stone-600">{item.branch}</td>
                    <td className="text-right text-stone-600">{item.jobs}</td>
                    <td className="text-right text-stone-600">{item.hours}</td>
                    <td><StatusBadge status={item.efficiency >= "90%" ? "Active" : "Medium"} /> <span className="ml-1 text-stone-600">{item.efficiency}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-4">
          <CardHeader title="Quality control" subtitle="Checklist and rework" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>QC</th>
                  <th>Job</th>
                  <th>Checklist</th>
                  <th>Result</th>
                  <th>Inspector</th>
                  <th>Rework</th>
                </tr>
              </thead>
              <tbody>
                {qualityChecks.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                    <td className="font-mono text-xs">{item.job}</td>
                    <td className="text-stone-600">{item.checklist}</td>
                    <td><StatusBadge status={item.result === "Passed" ? "Completed" : "Partial"} /></td>
                    <td className="text-stone-600">{item.inspector}</td>
                    <td className="text-stone-600">{item.rework}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader title="Gate passes" subtitle="Linked to invoice/payment" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Gate pass</th>
                  <th>Job</th>
                  <th>Invoice</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {gatePasses.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                    <td className="font-mono text-xs">{item.job}</td>
                    <td className="font-mono text-xs">{item.invoice}</td>
                    <td><StatusBadge status={item.payment} /></td>
                    <td><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-4">
          <CardHeader title="Warranty & feedback" subtitle="Claims and CSAT" />
          <div className="space-y-3 p-5">
            {warrantyClaims.map((item) => (
              <div key={item.id} className="rounded-2xl border border-stone-200/80 bg-stone-50/70 p-3">
                <p className="text-[12px] font-bold text-stone-800">{item.id} · {item.part}</p>
                <p className="text-[10px] text-stone-500">{item.job} · Claim {item.claimNo}</p>
                <div className="mt-2"><StatusBadge status={item.status} /></div>
              </div>
            ))}
            {serviceFeedback.map((item) => (
              <div key={item.id} className="rounded-2xl border border-stone-200/80 bg-stone-50/70 p-3">
                <p className="text-[12px] font-bold text-stone-800">{item.customer} · {item.rating}/5</p>
                <p className="text-[10px] text-stone-500">{item.comments}</p>
                <p className="mt-1 text-[10px] text-stone-400">Follow-up: {item.followUp}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <Card className="lg:col-span-6">
          <CardHeader title="Complaints & findings" subtitle="Customer complaint and technician diagnosis" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Complaint</th>
                  <th>Finding</th>
                  <th>Technician</th>
                </tr>
              </thead>
              <tbody>
                {serviceComplaints.map((item) => (
                  <tr key={item.job}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.job}</td>
                    <td className="text-stone-600">{item.complaint}</td>
                    <td className="text-stone-700">{item.finding}</td>
                    <td className="text-stone-600">{item.technician}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-6">
          <CardHeader title="Technician time & rework" subtitle="Time tracking and rework control" />
          <div className="space-y-4 p-5">
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Technician</th>
                    <th>Job</th>
                    <th>Operation</th>
                    <th className="text-right">Hours</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {technicianTime.map((item, index) => (
                    <tr key={index}>
                      <td className="font-semibold text-stone-800">{item.technician}</td>
                      <td className="font-mono text-xs">{item.job}</td>
                      <td className="text-stone-600">{item.operation}</td>
                      <td className="text-right text-stone-600">{item.hours}</td>
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
                    <th>Job</th>
                    <th>Issue</th>
                    <th>Rework by</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {reworkTracking.map((item, index) => (
                    <tr key={index}>
                      <td className="font-mono text-xs font-bold text-stone-500">{item.job}</td>
                      <td className="text-stone-600">{item.issue}</td>
                      <td className="text-stone-600">{item.reworkBy}</td>
                      <td><StatusBadge status={item.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <FeatureGate feature="service.alignment">
        <Card className="lg:col-span-6">
          <CardHeader title="Wheel alignment jobs" subtitle="Opened on specific customer profile" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Job</th>
                  <th>Customer profile</th>
                  <th>Vehicle</th>
                  <th>Alignment</th>
                  <th className="text-right">Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {wheelAlignmentJobs.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                    <td className="font-semibold text-stone-800">{item.customer} · {item.profile}</td>
                    <td className="text-stone-600">{item.vehicle}</td>
                    <td className="text-stone-600">{item.alignment}</td>
                    <td className="text-right font-bold text-stone-800">{formatPKR(item.amount)}</td>
                    <td><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        </FeatureGate>

        <FeatureGate feature="service.profiles">
        <Card className="lg:col-span-6">
          <CardHeader title="Service customer profiles" subtitle="Preferred advisor, history, credit status" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Preferred advisor</th>
                  <th className="text-right">Service history</th>
                  <th>Credit status</th>
                  <th>Last visit</th>
                </tr>
              </thead>
              <tbody>
                {serviceCustomerProfiles.map((item) => (
                  <tr key={item.customer}>
                    <td className="font-semibold text-stone-800">{item.customer}</td>
                    <td className="text-stone-600">{item.vehicle}</td>
                    <td className="text-stone-600">{item.preferredAdvisor}</td>
                    <td className="text-right text-stone-600">{item.serviceHistory}</td>
                    <td><StatusBadge status={item.creditStatus} /></td>
                    <td className="text-stone-600">{item.lastVisit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        </FeatureGate>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <FeatureGate feature="service.payments">
        <Card className="lg:col-span-6">
          <CardHeader title="Service payments" subtitle="Cash or card at service counter" />
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Payment</th>
                  <th>Invoice</th>
                  <th>Method</th>
                  <th className="text-right">Amount</th>
                  <th>Received by</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {servicePayments.map((item) => (
                  <tr key={item.id}>
                    <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                    <td className="font-mono text-xs">{item.invoice}</td>
                    <td><StatusBadge status={item.method} /></td>
                    <td className="text-right font-bold text-stone-800">{formatPKR(item.amount)}</td>
                    <td className="text-stone-600">{item.receivedBy}</td>
                    <td><StatusBadge status={item.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        </FeatureGate>

        <FeatureGate feature="service.vehicleInOut">
        <Card className="lg:col-span-6">
          <CardHeader title="Car in/out & auto invoice" subtitle="Gate pass, WhatsApp invoice, auto generation" />
          <div className="space-y-4 p-5">
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Log</th>
                    <th>Vehicle</th>
                    <th>In</th>
                    <th>Out</th>
                    <th>Gate pass</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleInOut.map((item) => (
                    <tr key={item.id}>
                      <td className="font-mono text-xs font-bold text-stone-500">{item.id}</td>
                      <td className="text-stone-700">{item.vehicle}</td>
                      <td className="text-stone-600">{item.inTime}</td>
                      <td className="text-stone-600">{item.outTime}</td>
                      <td className="font-mono text-xs">{item.gatePass}</td>
                      <td><StatusBadge status={item.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <FeatureGate feature="service.autoInvoice">
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
            </FeatureGate>
          </div>
        </Card>
        </FeatureGate>
      </div>

      <FeatureSections module="service" />
    </>
  );
}
