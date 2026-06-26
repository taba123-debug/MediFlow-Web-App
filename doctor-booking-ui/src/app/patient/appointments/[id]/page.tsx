import { notFound } from "next/navigation";
import { appointments } from "@/data/mock-appointments";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { StatusBadge } from "@/components/common/status-badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { ConfirmationModal } from "@/components/common/confirmation-modal";

export default async function PatientAppointmentDetailPage({
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
        eyebrow="Appointment detail"
        title={`${appointment.doctorName} • ${appointment.specialty}`}
        description="Review timing, payment, visit instructions, and consultation notes from one place."
      />
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <Card>
          <CardContent className="grid gap-6 p-6 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-sm text-slate-500">Appointment status</p>
              <StatusBadge status={appointment.status} />
              <p className="text-sm text-slate-500">Date</p>
              <p className="font-semibold text-slate-900">{formatDate(appointment.date)}</p>
              <p className="text-sm text-slate-500">Time</p>
              <p className="font-semibold text-slate-900">{appointment.time}</p>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-slate-500">Visit mode</p>
              <p className="font-semibold text-slate-900">{appointment.type}</p>
              <p className="text-sm text-slate-500">Clinic</p>
              <p className="font-semibold text-slate-900">{appointment.clinic}</p>
              <p className="text-sm text-slate-500">Payment</p>
              <StatusBadge status={appointment.paymentStatus} />
            </div>
          </CardContent>
        </Card>
        <Card className="h-fit">
          <CardHeader>
            <h2 className="text-2xl font-semibold text-slate-950">Quick actions</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full">Join consultation</Button>
            <Button variant="outline" className="w-full">
              Reschedule
            </Button>
            <ConfirmationModal />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-slate-950">Visit notes</h2>
        </CardHeader>
        <CardContent className="space-y-3 text-sm leading-7 text-slate-600">
          <p>{appointment.reason}</p>
          <p>{appointment.notes ?? "Consultation notes will appear here after the visit."}</p>
        </CardContent>
      </Card>
    </div>
  );
}
