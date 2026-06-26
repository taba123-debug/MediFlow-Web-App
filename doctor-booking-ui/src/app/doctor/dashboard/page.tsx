import {
  CalendarCheck2,
  CircleDollarSign,
  Clock3,
  Users,
} from "lucide-react";
import { appointments } from "@/data/mock-appointments";
import { PageHeader } from "@/components/common/page-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { AppointmentCard } from "@/components/appointments/appointment-card";

export default function DoctorDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Doctor dashboard"
        title="Practice pulse for today"
        description="Monitor appointments, patient flow, and earnings with a clean clinic operations view."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Today appointments" value="8" change="2 video visits" icon={CalendarCheck2} />
        <StatsCard title="Patients waiting" value="3" change="Live queue" icon={Users} />
        <StatsCard title="Avg consultation" value="19 min" change="Stable" icon={Clock3} />
        <StatsCard title="This month earnings" value="$8.4k" change="+12%" icon={CircleDollarSign} />
      </div>
      <div className="grid gap-4">
        {appointments.slice(0, 3).map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            href={`/doctor/appointments/${appointment.id}`}
          />
        ))}
      </div>
    </div>
  );
}
