"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CalendarRange,
  CheckCircle2,
  FileStack,
  MessageSquareHeart,
} from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { PageHeader } from "@/components/common/page-header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { AppointmentCard } from "@/components/appointments/appointment-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getPatientDashboard, type PatientDashboardResponse } from "@/lib/patient-module";

export default function PatientDashboardPage() {
  const { authFetch, user } = useAuth();
  const [dashboard, setDashboard] = useState<PatientDashboardResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const greetingName = dashboard?.profile.name?.trim() || user?.name?.trim();

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getPatientDashboard(authFetch);
      setDashboard(response);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load patient dashboard.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadDashboard();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadDashboard]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Patient dashboard"
        title={greetingName ? `Good afternoon, ${greetingName}` : "Good afternoon"}
        description="Track upcoming visits, discover specialists, and keep all care details in one place."
      />
      {error ? (
        <Card>
          <CardContent className="p-4 text-sm text-rose-600">{error}</CardContent>
        </Card>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatsCard
          title="Upcoming appointments"
          value={isLoading ? "..." : String(dashboard?.stats.upcomingAppointments || 0)}
          change="Scheduled visits"
          icon={CalendarRange}
        />
        <StatsCard
          title="Completed appointments"
          value={isLoading ? "..." : String(dashboard?.stats.completedAppointments || 0)}
          change="Past care visits"
          icon={CheckCircle2}
        />
        <StatsCard
          title="Medical records"
          value={isLoading ? "..." : String(dashboard?.stats.medicalRecords || 0)}
          change="Files on record"
          icon={FileStack}
        />
        <StatsCard
          title="Unread notifications"
          value={isLoading ? "..." : String(dashboard?.stats.unreadNotifications || 0)}
          change="Recent updates"
          icon={MessageSquareHeart}
        />
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {dashboard?.upcomingAppointments.length ? dashboard.upcomingAppointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              href={`/patient/appointments/${appointment.id}`}
            />
          )) : (
            <Card>
              <CardContent className="p-6 text-sm text-slate-500">
                {isLoading ? "Loading appointments..." : "No upcoming appointments found."}
              </CardContent>
            </Card>
          )}
        </div>
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-semibold text-slate-950">Recommended doctors</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboard?.recommendedDoctors.length ? dashboard.recommendedDoctors.map((doctor) => (
              <div key={doctor.id} className="rounded-2xl border border-slate-100 p-4">
                <p className="font-semibold text-slate-900">{doctor.name}</p>
                <p className="text-sm text-slate-500">{doctor.specialty}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{doctor.about}</p>
              </div>
            )) : (
              <p className="text-sm text-slate-500">
                {isLoading ? "Loading doctor recommendations..." : "No recommended doctors available right now."}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
