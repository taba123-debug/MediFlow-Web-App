import {
  CalendarRange,
  Clock3,
  FileStack,
  MessageSquareHeart,
} from "lucide-react";
import { appointments } from "@/data/mock-appointments";
import { doctors } from "@/data/mock-doctors";
import { PageHeader } from "@/components/common/page-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { AppointmentCard } from "@/components/appointments/appointment-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function PatientDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Patient dashboard"
        title="Good afternoon, Sarah"
        description="Track upcoming visits, discover specialists, and keep all care details in one place."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard title="Upcoming appointments" value="3" change="+1 this week" icon={CalendarRange} />
        <StatsCard title="Average wait time" value="15 min" change="On schedule" icon={Clock3} />
        <StatsCard title="Medical records" value="12" change="2 new files" icon={FileStack} />
        <StatsCard title="Unread messages" value="4" change="Doctor replies" icon={MessageSquareHeart} />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {appointments.slice(0, 2).map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              href={`/patient/appointments/${appointment.id}`}
            />
          ))}
        </div>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-slate-950">Recommended doctors</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {doctors.slice(0, 3).map((doctor) => (
              <div key={doctor.id} className="rounded-2xl border border-slate-100 p-4">
                <p className="font-semibold text-slate-900">{doctor.name}</p>
                <p className="text-sm text-slate-500">{doctor.specialty}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{doctor.about}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
