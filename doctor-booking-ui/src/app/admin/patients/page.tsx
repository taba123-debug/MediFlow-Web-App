import { patientUsers } from "@/data/mock-users";
import { ManagementOverview } from "@/components/dashboard/management-overview";
import { StatusBadge } from "@/components/common/status-badge";

export default function AdminPatientsPage() {
  return (
    <ManagementOverview
      eyebrow="Patients management"
      title="Review patient accounts and activity status"
      description="Designed for support teams managing patient account health and profile completeness."
      summary={[
        { label: "Registered patients", value: "12,204" },
        { label: "Pending verification", value: "248" },
        { label: "Support flags", value: "19" },
      ]}
      data={patientUsers}
      columns={[
        {
          key: "patient",
          header: "Patient",
          render: (item) => (
            <div>
              <p className="font-semibold text-slate-900">{item.name}</p>
              <p className="text-xs text-slate-500">{item.email}</p>
            </div>
          ),
        },
        { key: "location", header: "Location", render: (item) => item.location },
        { key: "joined", header: "Joined", render: (item) => item.joinedAt },
        {
          key: "status",
          header: "Status",
          render: (item) => <StatusBadge status={item.status} />,
        },
      ]}
    />
  );
}
