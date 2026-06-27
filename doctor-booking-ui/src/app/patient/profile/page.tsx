"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getPatientById, updatePatientById } from "@/lib/patients";
import type { PatientProfile } from "@/types/patient";

export default function PatientProfilePage() {
  const { authFetch, user } = useAuth();
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
    notes: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadProfile = useCallback(async (id: string) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getPatientById(authFetch, id);
      setProfile(response);
      setForm({
        firstName: response.firstName || "",
        lastName: response.lastName || "",
        email: response.email || "",
        phoneNumber: response.phoneNumber || "",
        location: response.location || "",
        notes: response.notes || "",
      });
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Unable to load patient profile.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    if (!user?.id) {
      return;
    }

    const timer = window.setTimeout(() => {
      void loadProfile(String(user.id));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadProfile, user?.id]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!profile?.id) {
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const updatedProfile = await updatePatientById(authFetch, profile.id, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        location: form.location,
        notes: form.notes,
      });

      setProfile(updatedProfile);
      setSuccess("Patient profile updated successfully.");
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Unable to update patient profile.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Patient profile"
        title="Keep your personal and care details up to date"
        description="This profile now loads from `GET /patients/:id` and saves through `PATCH /patients/:id`."
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
          <h2 className="text-2xl font-semibold text-slate-950">Personal information</h2>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-slate-500">Loading patient profile...</p>
          ) : profile ? (
            <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
              <label className="space-y-2 text-sm text-slate-600">
                <span>First name</span>
                <Input
                  value={form.firstName}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, firstName: event.target.value }))
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Last name</span>
                <Input
                  value={form.lastName}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, lastName: event.target.value }))
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Email</span>
                <Input
                  value={form.email}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, email: event.target.value }))
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Phone</span>
                <Input
                  value={form.phoneNumber}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      phoneNumber: event.target.value,
                    }))
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
                <span>Location</span>
                <Input
                  value={form.location}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, location: event.target.value }))
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
                <span>Health notes</span>
                <Textarea
                  value={form.notes}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, notes: event.target.value }))
                  }
                  placeholder="Allergies, emergency contacts, or care preferences."
                />
              </label>
              <Button className="md:col-span-2 md:w-fit" disabled={isSaving}>
                {isSaving ? "Saving..." : "Save profile"}
              </Button>
            </form>
          ) : (
            <p className="text-sm text-slate-500">
              No patient profile could be loaded for the current signed-in user.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
