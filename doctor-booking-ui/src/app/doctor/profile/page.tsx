"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getDoctorById, updateDoctorById } from "@/lib/doctors";
import type { Doctor } from "@/types/doctor";

export default function DoctorProfilePage() {
  const { authFetch, user } = useAuth();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    clinic: "",
    fee: "",
    about: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadDoctor = useCallback(async (id: string) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getDoctorById(id);
      setDoctor(response);
      setForm({
        name: response.name,
        specialty: response.specialty,
        clinic: response.clinic,
        fee: String(response.fee),
        about: response.about,
      });
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load doctor profile.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const timer = window.setTimeout(() => {
      void loadDoctor(String(user.id));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadDoctor, user?.id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!doctor?.id) {
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const updated = await updateDoctorById(authFetch, doctor.id, {
        name: form.name,
        specialty: form.specialty,
        clinic: form.clinic,
        fee: Number(form.fee),
        about: form.about,
      });
      setDoctor(updated);
      setSuccess("Doctor profile updated successfully.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to update doctor profile.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Doctor profile"
        title="Update your public profile and consultation identity"
        description="This screen now loads doctor details from the backend and saves through `PATCH /doctors/:id`."
      />
      {error ? (
        <Card>
          <CardContent className="p-4 text-sm text-rose-600">{error}</CardContent>
        </Card>
      ) : null}
      {success ? (
        <Card>
          <CardContent className="p-4 text-sm text-emerald-600">{success}</CardContent>
        </Card>
      ) : null}
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-semibold text-slate-950">Professional profile</h2>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-slate-500">Loading doctor profile...</p>
          ) : doctor ? (
            <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-600">
                <span>Name</span>
                <Input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Specialty</span>
                <Input
                  value={form.specialty}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, specialty: event.target.value }))
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Clinic</span>
                <Input
                  value={form.clinic}
                  onChange={(event) => setForm((current) => ({ ...current, clinic: event.target.value }))}
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Consultation fee</span>
                <Input
                  value={form.fee}
                  onChange={(event) => setForm((current) => ({ ...current, fee: event.target.value }))}
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
                <span>About</span>
                <Textarea
                  value={form.about}
                  onChange={(event) => setForm((current) => ({ ...current, about: event.target.value }))}
                />
              </label>
              <Button className="md:w-fit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save changes"}
              </Button>
            </form>
          ) : (
            <p className="text-sm text-slate-500">
              No doctor profile could be loaded for the signed-in user.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
