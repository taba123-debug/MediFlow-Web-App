import { payments } from "@/data/mock-payments";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/tables/data-table";
import { StatusBadge } from "@/components/common/status-badge";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function DoctorEarningsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Earnings"
        title="Revenue snapshot and recent payouts"
        description="A financial dashboard shell for doctors, built with mock payout and payment data."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["This month", "$8,420"],
          ["Pending payouts", "$1,180"],
          ["Avg per visit", "$156"],
        ].map(([label, value]) => (
          <Card key={label}>
            <CardContent className="p-6">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-3xl font-semibold text-slate-950">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-slate-950">Recent payments</h2>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={payments}
            columns={[
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
                key: "date",
                header: "Date",
                render: (item) => formatDate(item.date),
              },
              {
                key: "status",
                header: "Status",
                render: (item) => <StatusBadge status={item.status} />,
              },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
}
