import type { ApiClientFetch } from "@/lib/users";
import type { Specialty } from "@/types/specialty";

function normalizeSpecialty(payload: unknown): Specialty {
  const source =
    payload && typeof payload === "object" && "data" in (payload as Record<string, unknown>)
      ? (payload as { data: Record<string, unknown> }).data
      : (payload as Record<string, unknown>);

  return {
    id: String(source.id || source.name || crypto.randomUUID()),
    name: String(source.name || ""),
    description: typeof source.description === "string" ? source.description : "",
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

export async function listSpecialties(authFetch: ApiClientFetch) {
  const response = await authFetch("/specialties");
  const payload = await parseJson(response);

  if (!response.ok) {
    throw new Error(message(payload, "Unable to load specialties."));
  }

  const items = Array.isArray(payload)
    ? payload
    : payload &&
        typeof payload === "object" &&
        "data" in (payload as Record<string, unknown>) &&
        Array.isArray((payload as { data: unknown[] }).data)
      ? (payload as { data: unknown[] }).data
      : [];

  return items.map(normalizeSpecialty);
}

export async function createSpecialty(
  authFetch: ApiClientFetch,
  body: { name: string; description?: string },
) {
  const response = await authFetch("/specialties", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(message(payload, "Unable to create specialty."));
  }
  return normalizeSpecialty(payload);
}

export async function updateSpecialty(
  authFetch: ApiClientFetch,
  id: string,
  body: { name: string; description?: string },
) {
  const response = await authFetch(`/specialties/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(message(payload, "Unable to update specialty."));
  }
  return normalizeSpecialty(payload);
}

export async function deleteSpecialty(authFetch: ApiClientFetch, id: string) {
  const response = await authFetch(`/specialties/${id}`, {
    method: "DELETE",
  });
  const payload = await parseJson(response);
  if (!response.ok) {
    throw new Error(message(payload, "Unable to delete specialty."));
  }
}
