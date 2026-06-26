import { notFound } from "next/navigation";
import { appointments } from "@/data/mock-appointments";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";

export default async function DoctorAppointmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const appointment = appointments.find((item) => item.id === id);

  if (!appointment) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Consultation notes"
        title={`${appointment.patientName} • ${appointment.time}`}
        description="Capture clinical notes, diagnosis summaries, and next steps in one simple writing surface."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-slate-950">Consultation summary</h2>
          </CardHeader>
          <CardContent className="space-y-5">
            <Textarea defaultValue={appointment.notes ?? ""} />
            {/* TODO: connect consultation note save to doctor appointment API */}
            <Button>Save notes</Button>
          </CardContent>
        </Card>
        <Card className="h-fit">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-slate-950">Visit snapshot</h2>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>Patient: {appointment.patientName}</p>
            <p>Reason: {appointment.reason}</p>
            <p>Mode: {appointment.type}</p>
            <div>
              <p className="mb-2">Status</p>
              <StatusBadge status={appointment.status} />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
