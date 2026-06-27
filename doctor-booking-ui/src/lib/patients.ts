import type { ApiClientFetch } from "@/lib/users";
import type { PatientProfile } from "@/types/patient";

async function parseJson(response: Response) {
  const contentType = response.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return null;
  }

  return response.json();
}

function extractMessage(payload: unknown, fallback: string) {
  if (!payload || typeof payload !== "object") {
    return fallback;
  }

  const container = payload as Record<string, unknown>;

  if (typeof container.message === "string" && container.message) {
    return container.message;
  }

  if (typeof container.error === "string" && container.error) {
    return container.error;
  }

  return fallback;
}

function normalizePatient(payload: unknown): PatientProfile {
  const data =
    payload && typeof payload === "object" && "data" in (payload as Record<string, unknown>)
      ? (payload as { data: PatientProfile }).data
      : (payload as PatientProfile);

  return {
    id: String(data.id),
    firstName:
      data.firstName ||
      String(data["first_name"] || "").trim(),
    lastName:
      data.lastName ||
      String(data["last_name"] || "").trim(),
    email: data.email || "",
    phoneNumber:
      data.phoneNumber ||
      String(data["phone"] || ""),
    location: typeof data.location === "string" ? data.location : "",
    status:
      data.status === "active" || data.status === "inactive" || data.status === "pending"
        ? data.status
        : undefined,
    notes: typeof data.notes === "string" ? data.notes : "",
    ...data,
  };
}

export async function getPatientById(authFetch: ApiClientFetch, id: string) {
  const response = await authFetch(`/patients/${id}`);
  const payload = await parseJson(response);

  if (!response.ok) {
    throw new Error(extractMessage(payload, "Unable to load patient profile."));
  }

  return normalizePatient(payload);
}

export async function updatePatientById(
  authFetch: ApiClientFetch,
  id: string,
  body: Record<string, unknown>,
) {
  const response = await authFetch(`/patients/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const payload = await parseJson(response);

  if (!response.ok) {
    throw new Error(extractMessage(payload, "Unable to update patient profile."));
  }

  return normalizePatient(payload);
}
