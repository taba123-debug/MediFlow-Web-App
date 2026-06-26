import { patientUsers } from "@/data/mock-users";
import { ManagementOverview } from "@/components/dashboard/management-overview";
import { StatusBadge } from "@/components/common/status-badge";

export default function DoctorPatientsPage() {
  return (
    <ManagementOverview
      eyebrow="Patients"
      title="Browse your assigned patient list"
      description="Track contact details, activity status, and patient touchpoints from your care workspace."
      summary={[
        { label: "Active patients", value: "128" },
        { label: "New this month", value: "14" },
        { label: "Follow-ups due", value: "21" },
      ]}
      data={patientUsers}
      columns={[
        {
          key: "name",
          header: "Patient",
          render: (item) => (
            <div>
              <p className="font-semibold text-slate-900">{item.name}</p>
              <p className="text-xs text-slate-500">{item.email}</p>
            </div>
          ),
        },
        { key: "location", header: "Location", render: (item) => item.location },
        { key: "phone", header: "Phone", render: (item) => item.phone },
        {
          key: "status",
          header: "Status",
          render: (item) => <StatusBadge status={item.status} />,
        },
      ]}
    />
  );
}
