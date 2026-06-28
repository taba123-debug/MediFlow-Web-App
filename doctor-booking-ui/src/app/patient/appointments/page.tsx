"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { PageHeader } from "@/components/common/page-header";
import { AppointmentCard } from "@/components/appointments/appointment-card";
import { Card, CardContent } from "@/components/ui/card";
import { listPatientAppointments, type PatientAppointmentListItem } from "@/lib/patient-module";

export default function PatientAppointmentsPage() {
  const { authFetch } = useAuth();
  const [appointments, setAppointments] = useState<PatientAppointmentListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAppointments = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await listPatientAppointments(authFetch, {
        page: 1,
        limit: 20,
      });
      setAppointments(response.items);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load appointments.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadAppointments();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadAppointments]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="My appointments"
        title="View upcoming, past, and rescheduled visits"
        description="Appointments now load from the patient module so the list matches real backend status and timing."
      />
      {error ? (
        <Card>
          <CardContent className="p-4 text-sm text-rose-600">{error}</CardContent>
        </Card>
      ) : null}
      <div className="grid gap-4">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
            href={`/patient/appointments/${appointment.id}`}
          />
        ))}
        {!appointments.length ? (
          <Card>
            <CardContent className="p-6 text-sm text-slate-500">
              {isLoading ? "Loading appointments..." : "No appointments found yet."}
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
