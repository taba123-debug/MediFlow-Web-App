import type { ApiClientFetch } from "@/lib/users";
import type { Clinic } from "@/types/clinic";

function normalizeClinic(payload: unknown): Clinic {
  const source =
    payload && typeof payload === "object" && "data" in (payload as Record<string, unknown>)
      ? (payload as { data: Record<string, unknown> }).data
      : (payload as Record<string, unknown>);

  return {
    id: String(source.id || source.name || crypto.randomUUID()),
    name: String(source.name || ""),
    address: typeof source.address === "string" ? source.address : "",
    description: typeof source.description === "string" ? source.description : "",
    location: typeof source.location === "string" ? source.location : "",
    ...source,
  };
}

async function parseJson(response: Response) {
  const contentType = response.headers.get("content-type");
  return contentType?.includes("application/json") ? response.json() : null;
}

function message(payload: unknown, fallback: string) {
  return payload && typeof payload === "object" && "message" in (payload as Record<string, unknown>)
    ? String((payload as { message: string }).message)
    : fallback;
}

export async function listClinics(authFetch: ApiClientFetch) {
  const response = await authFetch("/clinics");
  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(message(payload, "Unable to load clinics."));
  }

  const items = Array.isArray(payload)
    ? payload
    : payload &&
        typeof payload === "object" &&
        "data" in (payload as Record<string, unknown>) &&
        Array.isArray((payload as { data: unknown[] }).data)
      ? (payload as { data: unknown[] }).data
      : [];

  return items.map(normalizeClinic);
}

export async function createClinic(
  authFetch: ApiClientFetch,
  body: { name: string; address?: string; description?: string; location?: string },
) {
  const response = await authFetch("/clinics", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(message(payload, "Unable to create clinic."));
  }
  return normalizeClinic(payload);
}
