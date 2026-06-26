import { clinics } from "@/data/mock-specialties";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminClinicsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Clinics"
        title="Manage clinic partners and service locations"
        description="Clinic cards cover address-level management, provider relationships, and future verification workflows."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {clinics.map((clinic) => (
          <Card key={clinic}>
            <CardContent className="space-y-4 p-6">
              <p className="text-xl font-semibold text-slate-900">{clinic}</p>
              <p className="text-sm leading-7 text-slate-500">
                Mock clinic record with room for address, compliance, doctor roster, and availability metadata.
              </p>
              <Button variant="outline">Manage clinic</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
