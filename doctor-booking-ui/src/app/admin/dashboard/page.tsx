import {
  BadgeDollarSign,
  Building2,
  CalendarCheck2,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Admin dashboard"
        title="Platform health at a glance"
        description="Review high-level marketplace performance, operations, and trust signals from a centralized admin view."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Monthly bookings" value="4,832" change="+18%" icon={CalendarCheck2} />
        <StatsCard title="Registered patients" value="12,204" change="+340" icon={Users} />
        <StatsCard title="Partner clinics" value="48" change="+4" icon={Building2} />
        <StatsCard title="Gross payments" value="$126k" change="+9%" icon={BadgeDollarSign} />
      </div>
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-slate-950">Operations notes</h2>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {[
            "Doctor approvals are trending faster than last month.",
            "Payment disputes remain below 1.2% for June.",
            "Patient reviews highlight strong booking satisfaction.",
          ].map((note) => (
            <div key={note} className="rounded-2xl border border-slate-100 p-4 text-sm leading-7 text-slate-600">
              {note}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
