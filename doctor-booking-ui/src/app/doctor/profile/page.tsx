import { doctors } from "@/data/mock-doctors";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function DoctorProfilePage() {
  const doctor = doctors[0];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Doctor profile"
        title="Update your public profile and consultation identity"
        description="These controls model the doctor profile editing experience with no live persistence yet."
      />
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-slate-950">Professional profile</h2>
        </CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600">
            <span>Name</span>
            <Input defaultValue={doctor.name} />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Specialty</span>
            <Input defaultValue={doctor.specialty} />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Clinic</span>
            <Input defaultValue={doctor.clinic} />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Consultation fee</span>
            <Input defaultValue={String(doctor.fee)} />
          </label>
          <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
            <span>About</span>
            <Textarea defaultValue={doctor.about} />
          </label>
          {/* TODO: connect doctor profile editing to provider API */}
          <Button className="md:w-fit">Save changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
