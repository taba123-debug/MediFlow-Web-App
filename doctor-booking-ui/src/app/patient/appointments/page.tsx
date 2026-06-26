import { appointments } from "@/data/mock-appointments";
import { PageHeader } from "@/components/common/page-header";
import { AppointmentCard } from "@/components/appointments/appointment-card";

export default function PatientAppointmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="My appointments"
        title="View upcoming, past, and rescheduled visits"
        description="All appointment actions are visual placeholders for now, ready to connect once backend flows arrive."
      />
      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            href={`/patient/appointments/${appointment.id}`}
          />
        ))}
      </div>
    </div>
  );
}
