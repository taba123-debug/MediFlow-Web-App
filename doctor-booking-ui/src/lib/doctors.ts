import { fetchApiJson } from "@/lib/api";
import type { ApiClientFetch } from "@/lib/users";
import type { Doctor } from "@/types/doctor";

type DoctorListParams = {
  page?: number;
  limit?: number;
  search?: string;
  specialty?: string;
  location?: string;
};

function query(params: DoctorListParams) {
  const search = new URLSearchParams();

  if (params.page) search.set("page", String(params.page));
  if (params.limit) search.set("limit", String(params.limit));
  if (params.search) search.set("search", params.search);
  if (params.specialty) search.set("specialty", params.specialty);
  if (params.location) search.set("location", params.location);

  const value = search.toString();
  return value ? `?${value}` : "";
}

function normalizeDoctor(payload: unknown): Doctor {
  const source =
    payload && typeof payload === "object" && "data" in (payload as Record<string, unknown>)
      ? (payload as { data: Record<string, unknown> }).data
      : (payload as Record<string, unknown>);

  return {
    id: String(source.id),
    name: String(source.name || ""),
    specialty: String(source.specialty || ""),
    clinic: String(source.clinic || source.clinicName || ""),
    location: String(source.location || ""),
    experience: Number(source.experience || 0),
    fee: Number(source.fee || source.consultationFee || 0),
    rating: Number(source.rating || 0),
    reviewsCount: Number(source.reviewsCount || 0),
    image: String(source.image || source.avatar || "/vercel.svg"),
    about: String(source.about || source.bio || ""),
    languages: Array.isArray(source.languages)
      ? source.languages.map((item) => String(item))
      : [],
    availability: Array.isArray(source.availability)
      ? source.availability.map((item) => ({
          day: String((item as { day?: string }).day || ""),
          slots: Array.isArray((item as { slots?: unknown[] }).slots)
            ? ((item as { slots: unknown[] }).slots.map((slot) => String(slot)))
            : [],
        }))
      : [],
    tags: Array.isArray(source.tags) ? source.tags.map((item) => String(item)) : [],
    education: Array.isArray(source.education)
      ? source.education.map((item) => String(item))
      : [],
    highlights: Array.isArray(source.highlights)
      ? source.highlights.map((item) => String(item))
      : [],
    reviews: Array.isArray(source.reviews)
      ? source.reviews.map((item) => ({
          patientName: String((item as { patientName?: string }).patientName || ""),
          rating: Number((item as { rating?: number }).rating || 0),
          comment: String((item as { comment?: string }).comment || ""),
          date: String((item as { date?: string }).date || ""),
        }))
      : [],
  };
}

export async function listDoctors(params: DoctorListParams) {
  const payload = await fetchApiJson<unknown>(`/doctors${query(params)}`, {
    cache: "no-store",
  });
  const items = Array.isArray(payload)
    ? payload
    : payload &&
        typeof payload === "object" &&
        "data" in (payload as Record<string, unknown>) &&
        Array.isArray((payload as { data: unknown[] }).data)
      ? (payload as { data: unknown[] }).data
      : payload &&
          typeof payload === "object" &&
          "items" in (payload as Record<string, unknown>) &&
          Array.isArray((payload as { items: unknown[] }).items)
        ? (payload as { items: unknown[] }).items
        : [];

  return items.map(normalizeDoctor);
}

export async function getDoctorById(id: string) {
  const payload = await fetchApiJson<unknown>(`/doctors/${id}`, {
    cache: "no-store",
  });
  return normalizeDoctor(payload);
}

export async function updateDoctorById(
  authFetch: ApiClientFetch,
  id: string,
  body: Record<string, unknown>,
) {
  const response = await authFetch(`/doctors/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const payload = await response.json();

  if (!response.ok) {
    throw new Error(
      payload && typeof payload.message === "string"
        ? payload.message
        : "Unable to update doctor profile.",
    );
  }

  return normalizeDoctor(payload);
}
