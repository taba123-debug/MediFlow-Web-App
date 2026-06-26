import { FileText, Shield } from "lucide-react";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { FileUploadUI } from "@/components/forms/file-upload-ui";

export default function PatientMedicalRecordsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Medical records"
        title="Review your reports, prescriptions, and uploaded files"
        description="The record center is designed for secure upload and access patterns, with backend storage still to come."
      />
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card>
          <CardContent className="space-y-4 p-6">
            {[
              "Lab results • June 2026",
              "Prescription summary • May 2026",
              "Cardiology follow-up notes • April 2026",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-4">
                <div className="rounded-2xl bg-sky-50 p-3 text-sky-700">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">{item}</p>
                  <p className="text-sm text-slate-500">Shared securely with your care team</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <div className="space-y-6">
          <FileUploadUI />
          <Card>
            <CardContent className="space-y-3 p-6 text-sm leading-7 text-slate-600">
              <Shield className="h-5 w-5 text-emerald-600" />
              <p>
                Your medical files are represented with mock data only in this frontend prototype.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
