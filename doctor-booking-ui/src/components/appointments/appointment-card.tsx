import Link from "next/link";
import { CalendarDays, Clock4, Video } from "lucide-react";
import { Appointment } from "@/types/appointment";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/common/status-badge";
import { formatDate } from "@/lib/utils";

export function AppointmentCard({
  appointment,
  href,
}: {
  appointment: Appointment;
  href: string;
}) {
  return (
    <Card>
      <CardContent className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-600">
              {appointment.specialty}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-950">
              {appointment.doctorName}
            </h3>
            <p className="text-sm text-slate-500">{appointment.reason}</p>
          </div>
          <StatusBadge status={appointment.status} />
        </div>
        <div className="grid gap-3 text-sm text-slate-500 sm:grid-cols-3">
          <p className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-sky-600" />
            {formatDate(appointment.date)}
          </p>
          <p className="flex items-center gap-2">
            <Clock4 className="h-4 w-4 text-sky-600" />
            {appointment.time}
          </p>
          <p className="flex items-center gap-2">
            <Video className="h-4 w-4 text-sky-600" />
            {appointment.type}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">{appointment.clinic}</p>
          <Link href={href}>
            <Button variant="outline">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
