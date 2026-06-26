import { appointments } from "@/data/mock-appointments";
import { ManagementOverview } from "@/components/dashboard/management-overview";
import { StatusBadge } from "@/components/common/status-badge";

export default function AdminAppointmentsPage() {
  return (
    <ManagementOverview
      eyebrow="Appointments"
      title="Monitor booking activity across the platform"
      description="Bookings, fulfilment, cancellations, and visit channel mix in one operational table."
      summary={[
        { label: "Total bookings", value: "4,832" },
        { label: "Completed", value: "3,991" },
        { label: "Cancellation rate", value: "3.4%" },
      ]}
      data={appointments}
      columns={[
        { key: "id", header: "ID", render: (item) => item.id },
        {
          key: "doctor",
          header: "Doctor / Patient",
          render: (item) => (
            <div>
              <p className="font-semibold text-slate-900">{item.doctorName}</p>
              <p className="text-xs text-slate-500">{item.patientName}</p>
            </div>
          ),
        },
        { key: "date", header: "Date", render: (item) => `${item.date} ${item.time}` },
        {
          key: "status",
          header: "Status",
          render: (item) => <StatusBadge status={item.status} />,
        },
      ]}
    />
  );
}
