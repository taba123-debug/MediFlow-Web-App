import { doctors } from "@/data/mock-doctors";
import { ManagementOverview } from "@/components/dashboard/management-overview";
import { Badge } from "@/components/ui/badge";

export default function AdminDoctorsPage() {
  return (
    <ManagementOverview
      eyebrow="Doctors management"
      title="Manage provider onboarding and profile quality"
      description="Admin tools for specialist oversight, clinic alignment, and doctor listing visibility."
      summary={[
        { label: "Total doctors", value: "320" },
        { label: "Pending approvals", value: "12" },
        { label: "Avg rating", value: "4.8" },
      ]}
      data={doctors}
      columns={[
        {
          key: "doctor",
          header: "Doctor",
          render: (item) => (
            <div>
              <p className="font-semibold text-slate-900">{item.name}</p>
              <p className="text-xs text-slate-500">{item.specialty}</p>
            </div>
          ),
        },
        { key: "clinic", header: "Clinic", render: (item) => item.clinic },
        { key: "fee", header: "Fee", render: (item) => `$${item.fee}` },
        {
          key: "tags",
          header: "Tags",
          render: (item) => (
            <div className="flex flex-wrap gap-2">
              {item.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="blue">
                  {tag}
                </Badge>
              ))}
            </div>
          ),
        },
      ]}
    />
  );
}
