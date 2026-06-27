"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { PageHeader } from "@/components/common/page-header";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  createSpecialty,
  deleteSpecialty,
  listSpecialties,
  updateSpecialty,
} from "@/lib/specialties";
import type { Specialty } from "@/types/specialty";

export default function AdminSpecialtiesPage() {
  const { authFetch, isLoading: authLoading } = useAuth();
  const [specialties, setSpecialties] = useState<Specialty[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadSpecialties = useCallback(async () => {
    try {
      setSpecialties(await listSpecialties(authFetch));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load specialties.");
    }
  }, [authFetch]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    const timer = window.setTimeout(() => {
      void loadSpecialties();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [authLoading, loadSpecialties]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");

    try {
      if (editingId) {
        const updated = await updateSpecialty(authFetch, editingId, { name, description });
        setSpecialties((current) => current.map((item) => (item.id === editingId ? updated : item)));
        setSuccess("Specialty updated successfully.");
      } else {
        const created = await createSpecialty(authFetch, { name, description });
        setSpecialties((current) => [created, ...current]);
        setSuccess("Specialty created successfully.");
      }

      setEditingId("");
      setName("");
      setDescription("");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to save specialty.");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Specialties"
        title="Curate specialties and category presentation"
        description="This admin surface now uses `GET`, `POST`, `PATCH`, and `DELETE` specialty APIs."
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
          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
            <Input placeholder="Specialty name" value={name} onChange={(event) => setName(event.target.value)} />
            <Input
              placeholder="Short description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <Button type="submit">{editingId ? "Save specialty" : "Create specialty"}</Button>
          </form>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {specialties.map((specialty) => (
          <Card key={specialty.id}>
            <CardContent className="space-y-4 p-5">
              <p className="text-lg font-semibold text-slate-900">{specialty.name}</p>
              <p className="text-sm text-slate-500">
                {specialty.description || "Active category with featured doctor assignments."}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setEditingId(specialty.id);
                    setName(specialty.name);
                    setDescription(specialty.description || "");
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={async () => {
                    try {
                      await deleteSpecialty(authFetch, specialty.id);
                      setSpecialties((current) => current.filter((item) => item.id !== specialty.id));
                      setSuccess("Specialty deleted successfully.");
                    } catch (deleteError) {
                      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete specialty.");
                    }
                  }}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
