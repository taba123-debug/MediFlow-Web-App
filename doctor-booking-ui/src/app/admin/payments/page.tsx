import { payments } from "@/data/mock-payments";
import { ManagementOverview } from "@/components/dashboard/management-overview";
import { StatusBadge } from "@/components/common/status-badge";
import { formatCurrency } from "@/lib/utils";

export default function AdminPaymentsPage() {
  return (
    <ManagementOverview
      eyebrow="Payments"
      title="Track settlement, refunds, and billing status"
      description="Mock finance workspace showing payment-level visibility for support and reconciliation teams."
      summary={[
        { label: "Gross volume", value: "$126k" },
        { label: "Refunds", value: "$3.2k" },
        { label: "Pending", value: "$8.1k" },
      ]}
      data={payments}
      columns={[
        { key: "id", header: "Payment ID", render: (item) => item.id },
        {
          key: "patient",
          header: "Patient",
          render: (item) => item.patientName,
        },
        {
          key: "amount",
          header: "Amount",
          render: (item) => formatCurrency(item.amount),
        },
        {
          key: "status",
          header: "Status",
          render: (item) => <StatusBadge status={item.status} />,
        },
      ]}
    />
  );
}
