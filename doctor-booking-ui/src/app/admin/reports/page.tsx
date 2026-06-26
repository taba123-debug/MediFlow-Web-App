import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Reports"
        title="Visual reporting blocks for growth and operations"
        description="Charts are represented as styled placeholders so the UI remains complete before analytics integration."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        {["Bookings trend", "Revenue by clinic", "Doctor performance", "Patient retention"].map((title) => (
          <Card key={title}>
            <CardHeader>
              <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
            </CardHeader>
            <CardContent>
              <div className="grid-fade flex h-72 items-end gap-3 rounded-[28px] border border-slate-100 bg-slate-50 p-6">
                {[40, 60, 80, 55, 72, 94].map((value, index) => (
                  <div key={index} className="flex flex-1 flex-col justify-end gap-2">
                    <div
                      className="rounded-t-2xl bg-gradient-to-t from-sky-600 to-emerald-400"
                      style={{ height: `${value * 1.6}px` }}
                    />
                    <p className="text-center text-xs text-slate-400">W{index + 1}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
