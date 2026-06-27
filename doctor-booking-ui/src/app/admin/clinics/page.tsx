"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { PageHeader } from "@/components/common/page-header";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createClinic, listClinics } from "@/lib/clinics";
import type { Clinic } from "@/types/clinic";

export default function AdminClinicsPage() {
  const { authFetch, isLoading: authLoading } = useAuth();
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadClinics = useCallback(async () => {
    try {
      setClinics(await listClinics(authFetch));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load clinics.");
    }
  }, [authFetch]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    const timer = window.setTimeout(() => {
      void loadClinics();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [authLoading, loadClinics]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      const created = await createClinic(authFetch, {
        name,
        address,
        location,
        description,
      });
      setClinics((current) => [created, ...current]);
      setName("");
      setAddress("");
      setLocation("");
      setDescription("");
      setSuccess("Clinic created successfully.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to create clinic.");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Clinics"
        title="Manage clinic partners and service locations"
        description="This screen now loads clinics from the backend and creates new clinic records through the Clinics API."
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
        <CardContent className="space-y-4 p-6">
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <Input placeholder="Clinic name" value={name} onChange={(event) => setName(event.target.value)} />
            <Input placeholder="Location" value={location} onChange={(event) => setLocation(event.target.value)} />
            <Input placeholder="Address" value={address} onChange={(event) => setAddress(event.target.value)} />
            <Input
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <Button className="md:w-fit">Create clinic</Button>
          </form>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        {clinics.map((clinic) => (
          <Card key={clinic.id}>
            <CardContent className="space-y-4 p-6">
              <p className="text-xl font-semibold text-slate-900">{clinic.name}</p>
              <p className="text-sm leading-7 text-slate-500">
                {clinic.description ||
                  clinic.address ||
                  "Clinic record from the backend with room for address, compliance, doctor roster, and availability metadata."}
              </p>
              <Button variant="outline">{clinic.location || "Manage clinic"}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
