"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  getPatientProfile,
  updatePatientProfile,
  type PatientProfileResponse,
} from "@/lib/patient-module";

export default function PatientProfilePage() {
  const { authFetch } = useAuth();
  const [profile, setProfile] = useState<PatientProfileResponse | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    avatarUrl: "",
    dateOfBirth: "",
    gender: "MALE" as "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY",
    bloodGroup: "",
    address: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadProfile = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await getPatientProfile(authFetch);
      setProfile(response);
      setForm({
        name: response.user.name || "",
        email: response.user.email || "",
        phone: response.user.phone || "",
        location: response.user.location || "",
        avatarUrl: response.user.avatarUrl || "",
        dateOfBirth: response.patientProfile.dateOfBirth || "",
        gender: response.patientProfile.gender || "MALE",
        bloodGroup: response.patientProfile.bloodGroup || "",
        address: response.patientProfile.address || "",
        emergencyContactName: response.patientProfile.emergencyContactName || "",
        emergencyContactPhone: response.patientProfile.emergencyContactPhone || "",
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
    const timer = window.setTimeout(() => {
      void loadProfile();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadProfile]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const updatedProfile = await updatePatientProfile(authFetch, {
        name: form.name,
        phone: form.phone,
        location: form.location,
        avatarUrl: form.avatarUrl || undefined,
        dateOfBirth: form.dateOfBirth,
        gender: form.gender,
        bloodGroup: form.bloodGroup,
        address: form.address,
        emergencyContactName: form.emergencyContactName,
        emergencyContactPhone: form.emergencyContactPhone,
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
        description="This profile now loads from `GET /patient/profile` and saves through `PATCH /patient/profile`."
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
                <span>Full name</span>
                <Input
                  value={form.name}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, name: event.target.value }))
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Email</span>
                <Input value={form.email} disabled />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Phone</span>
                <Input
                  value={form.phone}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, phone: event.target.value }))
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Location</span>
                <Input
                  value={form.location}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, location: event.target.value }))
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
                <span>Avatar URL</span>
                <Input
                  value={form.avatarUrl}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, avatarUrl: event.target.value }))
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Date of birth</span>
                <Input
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, dateOfBirth: event.target.value }))
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Gender</span>
                <select
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-800 outline-none"
                  value={form.gender}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      gender: event.target.value as typeof form.gender,
                    }))
                  }
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHER">Other</option>
                  <option value="PREFER_NOT_TO_SAY">Prefer not to say</option>
                </select>
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Blood group</span>
                <Input
                  value={form.bloodGroup}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, bloodGroup: event.target.value }))
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
                <span>Address</span>
                <Input
                  value={form.address}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, address: event.target.value }))
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Emergency contact name</span>
                <Input
                  value={form.emergencyContactName}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      emergencyContactName: event.target.value,
                    }))
                  }
                />
              </label>
              <label className="space-y-2 text-sm text-slate-600">
                <span>Emergency contact phone</span>
                <Input
                  value={form.emergencyContactPhone}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      emergencyContactPhone: event.target.value,
                    }))
                  }
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
