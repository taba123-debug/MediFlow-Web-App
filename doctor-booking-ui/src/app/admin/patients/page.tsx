"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/components/auth/auth-provider";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/common/status-badge";
import { Pagination } from "@/components/common/pagination";
import { DataTable } from "@/components/tables/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  getUserById,
  getUserDisplayName,
  getUserJoinedAt,
  getUserPhone,
  listUsers,
  updateUser,
  updateUserStatus,
  type UserListItem,
} from "@/lib/users";
import { formatDate } from "@/lib/utils";

const pageSize = 10;

type EditFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
};

export default function AdminPatientsPage() {
  const { authFetch, isLoading: authLoading } = useAuth();
  const [patients, setPatients] = useState<UserListItem[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchDraft, setSearchDraft] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserListItem | null>(null);
  const [editForm, setEditForm] = useState<EditFormState>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    location: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  const loadPatients = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await listUsers(authFetch, {
        page,
        limit: pageSize,
        search: search || undefined,
        status: status || undefined,
        role: "PATIENT",
      });

      setPatients(response.items);
      setTotal(response.total);
      setTotalPages(response.totalPages);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to load patients.");
    } finally {
      setIsLoading(false);
    }
  }, [authFetch, page, search, status]);

  useEffect(() => {
    if (authLoading) {
      return;
    }

    const timer = window.setTimeout(() => {
      void loadPatients();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [authLoading, loadPatients]);

  async function handleSelectUser(id: string) {
    setSelectedUserId(id);
    setIsLoadingDetails(true);
    setError("");
    setSuccess("");

    try {
      const user = await getUserById(authFetch, id);
      setSelectedUser(user);
      setEditForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNumber: getUserPhone(user),
        location: user.location || "",
      });
    } catch (loadError) {
      setError(
        loadError instanceof Error ? loadError.message : "Unable to load user details.",
      );
    } finally {
      setIsLoadingDetails(false);
    }
  }

  async function handleStatusUpdate(
    id: string,
    nextStatus: "active" | "inactive" | "pending",
  ) {
    setError("");
    setSuccess("");

    try {
      const updatedUser = await updateUserStatus(authFetch, id, nextStatus);
      setPatients((current) =>
        current.map((item) => (item.id === id ? { ...item, ...updatedUser } : item)),
      );
      if (selectedUserId === id) {
        setSelectedUser((current) => (current ? { ...current, ...updatedUser } : current));
      }
      setSuccess(`User status updated to ${nextStatus}.`);
    } catch (statusError) {
      setError(
        statusError instanceof Error
          ? statusError.message
          : "Unable to update user status.",
      );
    }
  }

  async function handleSaveUser(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedUserId) {
      return;
    }

    setIsSaving(true);
    setError("");
    setSuccess("");

    try {
      const updatedUser = await updateUser(authFetch, selectedUserId, {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        email: editForm.email,
        phoneNumber: editForm.phoneNumber,
        location: editForm.location,
      });

      setSelectedUser(updatedUser);
      setPatients((current) =>
        current.map((item) => (item.id === selectedUserId ? { ...item, ...updatedUser } : item)),
      );
      setSuccess("User details updated successfully.");
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Unable to update user.");
    } finally {
      setIsSaving(false);
    }
  }

  const activeCount = patients.filter((item) => item.status === "active").length;
  const pendingCount = patients.filter((item) => item.status === "pending").length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Patients management"
        title="Review patient accounts and backend profile status"
        description="This screen now loads patients from the Users API, supports pagination, and updates user records through backend endpoints."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">Registered patients</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{total}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">Active on this page</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{activeCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-slate-500">Pending on this page</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">{pendingCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="grid gap-4 md:grid-cols-[2fr_1fr_auto]">
            <Input
              placeholder="Search patients by name or email"
              value={searchDraft}
              onChange={(event) => setSearchDraft(event.target.value)}
            />
            <Input
              placeholder="Filter by status"
              value={status}
              onChange={(event) => {
                setStatus(event.target.value);
                setPage(1);
              }}
            />
            <Button
              onClick={() => {
                setPage(1);
                setSearch(searchDraft.trim());
              }}
            >
              Apply filters
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchDraft("");
              setSearch("");
              setStatus("");
              setPage(1);
            }}
          >
            Reset
          </Button>
        </CardContent>
      </Card>

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

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-4">
          <DataTable
            columns={[
              {
                key: "patient",
                header: "Patient",
                render: (item) => (
                  <div>
                    <p className="font-semibold text-slate-900">{getUserDisplayName(item)}</p>
                    <p className="text-xs text-slate-500">{item.email}</p>
                  </div>
                ),
              },
              {
                key: "location",
                header: "Location",
                render: (item) => item.location || "Not set",
              },
              {
                key: "joined",
                header: "Joined",
                render: (item) => {
                  const joinedAt = getUserJoinedAt(item);
                  return joinedAt ? formatDate(joinedAt) : "N/A";
                },
              },
              {
                key: "status",
                header: "Status",
                render: (item) => (
                  <div className="space-y-2">
                    <StatusBadge status={item.status || "inactive"} />
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => void handleStatusUpdate(item.id, "active")}
                      >
                        Active
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => void handleStatusUpdate(item.id, "inactive")}
                      >
                        Inactive
                      </Button>
                    </div>
                  </div>
                ),
              },
              {
                key: "actions",
                header: "Actions",
                render: (item) => (
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => void handleSelectUser(item.id)}
                  >
                    Edit user
                  </Button>
                ),
              },
            ]}
            data={patients}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            totalItems={total}
            pageSize={pageSize}
            onPageChange={setPage}
          />

          {isLoading ? (
            <Card>
              <CardContent className="p-4 text-sm text-slate-500">
                Loading patient accounts...
              </CardContent>
            </Card>
          ) : null}
        </div>

        <Card>
          <CardContent className="space-y-4 p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                User editor
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Update selected patient account
              </h2>
            </div>
            {isLoadingDetails ? (
              <p className="text-sm text-slate-500">Loading selected user...</p>
            ) : selectedUser ? (
              <form onSubmit={handleSaveUser} className="space-y-4">
                <label className="space-y-2 text-sm text-slate-600">
                  <span>First name</span>
                  <Input
                    value={editForm.firstName}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        firstName: event.target.value,
                      }))
                    }
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-600">
                  <span>Last name</span>
                  <Input
                    value={editForm.lastName}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        lastName: event.target.value,
                      }))
                    }
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-600">
                  <span>Email</span>
                  <Input
                    value={editForm.email}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-600">
                  <span>Phone</span>
                  <Input
                    value={editForm.phoneNumber}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        phoneNumber: event.target.value,
                      }))
                    }
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-600">
                  <span>Location</span>
                  <Input
                    value={editForm.location}
                    onChange={(event) =>
                      setEditForm((current) => ({
                        ...current,
                        location: event.target.value,
                      }))
                    }
                  />
                </label>
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save user"}
                </Button>
              </form>
            ) : (
              <p className="text-sm text-slate-500">
                Select a patient row to load `GET /users/:id` and edit with `PATCH /users/:id`.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
