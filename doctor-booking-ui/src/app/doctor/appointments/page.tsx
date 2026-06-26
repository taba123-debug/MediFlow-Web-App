import { appointments } from "@/data/mock-appointments";
import { PageHeader } from "@/components/common/page-header";
import { FilterPanel } from "@/components/common/filter-panel";
import { AppointmentCard } from "@/components/appointments/appointment-card";

export default function DoctorAppointmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Doctor appointments"
        title="Review your consultation schedule and visit status"
        description="This list is ready for future filters, search, and real-time schedule syncing."
      />
      <FilterPanel />
      <div className="grid gap-4">
        {appointments.map((appointment) => (
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
