import { patientUsers } from "@/data/mock-users";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function PatientProfilePage() {
  const patient = patientUsers[0];

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Patient profile"
        title="Keep your personal and care details up to date"
        description="Profile forms are intentionally static for the prototype, with API connection points marked for later."
      />
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-slate-950">Personal information</h2>
        </CardHeader>
        <CardContent className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2 text-sm text-slate-600">
            <span>Full name</span>
            <Input defaultValue={patient.name} />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Email</span>
            <Input defaultValue={patient.email} />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Phone</span>
            <Input defaultValue={patient.phone} />
          </label>
          <label className="space-y-2 text-sm text-slate-600">
            <span>Location</span>
            <Input defaultValue={patient.location} />
          </label>
          <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
            <span>Health notes</span>
            <Textarea placeholder="Allergies, emergency contacts, or care preferences." />
          </label>
          {/* TODO: connect patient profile update form to profile API */}
          <Button className="md:col-span-2 md:w-fit">Save profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}
