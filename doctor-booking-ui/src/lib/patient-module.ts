import { extractApiErrorMessage } from "@/lib/api";
import type { ApiClientFetch, PaginatedResult } from "@/lib/users";
import type { Appointment, AppointmentStatus } from "@/types/appointment";

type ApiRecord = Record<string, unknown>;

export type PatientDashboardResponse = {
  profile: {
    userId: string;
    patientId: string;
    name: string;
    email: string;
  };
  stats: {
    upcomingAppointments: number;
    medicalRecords: number;
    unreadNotifications: number;
    completedAppointments: number;
  };
  upcomingAppointments: PatientAppointmentListItem[];
  recommendedDoctors: PatientDoctorListItem[];
  notificationsPreview: PatientNotificationItem[];
};

export type PatientProfileResponse = {
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    avatarUrl: string | null;
  };
  patientProfile: {
    id: string;
    dateOfBirth: string;
    gender: "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY" | "";
    bloodGroup: string;
    address: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
  };
};

export type UpdatePatientProfilePayload = {
  name: string;
  phone: string;
  location: string;
  avatarUrl?: string;
  dateOfBirth: string;
  gender: "MALE" | "FEMALE" | "OTHER" | "PREFER_NOT_TO_SAY" | "";
  bloodGroup: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
};

export type PatientDoctorListItem = {
  doctorId: string;
  name: string;
  specialty: string;
  clinic: string;
  experienceYears: number;
  consultationFee: number;
  rating: number;
  about: string;
  isVerified: boolean;
};

export type PatientDoctorDetail = {
  doctorId: string;
  name: string;
  specialty: string;
  clinic: {
    id: string;
    name: string;
    address: string;
  };
  experienceYears: number;
  consultationFee: number;
  qualification: string;
  about: string;
  rating: number;
  reviews: Array<{
    id: string;
    patientName: string;
    rating: number;
    comment: string;
    createdAt: string;
  }>;
  availableDates: string[];
};

export type PatientSlot = {
  slotId: string;
  startAt: string;
  endAt: string;
  isBooked: boolean;
};

export type CreatePatientAppointmentPayload = {
  doctorId: string;
  clinicId: string;
  timeSlotId: string;
  consultationType: "CLINIC_VISIT" | "ONLINE_CONSULTATION";
  reason: string;
  notes?: string;
};

export type PatientAppointmentListItem = Appointment & {
  canCancel?: boolean;
  canReschedule?: boolean;
  canReview?: boolean;
  scheduledStartAt?: string;
  scheduledEndAt?: string;
};

export type PatientAppointmentDetail = {
  id: string;
  status: AppointmentStatus;
  appointmentDate: string;
  scheduledStartAt: string;
  scheduledEndAt: string;
  consultationType: "CLINIC_VISIT" | "ONLINE_CONSULTATION";
  type: "In-person" | "Video";
  reason: string;
  notes: string;
  doctor: {
    id: string;
    name: string;
    specialty: string;
    clinic: {
      id: string;
      name: string;
      address: string;
    };
  };
  clinic: {
    id: string;
    name: string;
    address: string;
  };
  payment: {
    id: string;
    amount: number;
    currency: string;
    method: string;
    status: "paid" | "unpaid" | "failed" | "refunded" | "partially_refunded";
    transactionRef: string;
    paidAt: string;
  } | null;
  medicalRecords: Array<{
    id: string;
    title: string;
    description: string;
    fileUrl: string;
    recordDate: string;
  }>;
  prescriptions: Array<{
    id: string;
    diagnosis: string;
    instructions: string;
    followUpDate: string | null;
  }>;
  review: {
    id: string;
    rating: number;
    comment: string;
  } | null;
};

export type PatientMedicalRecordItem = {
  id: string;
  title: string;
  description: string;
  fileUrl: string;
  recordDate: string;
  doctor: {
    id: string;
    name: string;
  };
  appointmentId: string;
};

export type PatientReviewItem = {
  id: string;
  appointmentId: string;
  doctor: {
    id: string;
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
};

export type CreatePatientReviewPayload = {
  appointmentId: string;
  rating: number;
  comment: string;
};

export type PatientNotificationItem = {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
};

function toApiRecord(value: unknown): ApiRecord {
  return value && typeof value === "object" ? (value as ApiRecord) : {};
}

async function parseJson(response: Response) {
  const contentType = response.headers.get("content-type");
  return contentType?.includes("application/json") ? response.json() : null;
}

async function request<T>(
  authFetch: ApiClientFetch,
  path: string,
  fallbackMessage: string,
  init?: RequestInit,
) {
  const response = await authFetch(path, init);
  const payload = await parseJson(response);

  if (!response.ok) {
    throw new Error(extractApiErrorMessage(payload, fallbackMessage));
  }

  return payload as T;
}

function buildQuery(params: Record<string, string | number | boolean | undefined>) {
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") {
      query.set(key, String(value));
    }
  }

  const value = query.toString();
  return value ? `?${value}` : "";
}

function normalizeAppointmentStatus(value: unknown): AppointmentStatus {
  const status = String(value || "").toUpperCase();

  switch (status) {
    case "CONFIRMED":
      return "confirmed";
    case "COMPLETED":
      return "completed";
    case "CANCELLED":
      return "cancelled";
    case "RESCHEDULED":
      return "rescheduled";
    case "REJECTED":
      return "rejected";
    case "NO_SHOW":
      return "no_show";
    case "PENDING":
    default:
      return "pending";
  }
}

function normalizePaymentStatus(value: unknown) {
  const status = String(value || "").toUpperCase();

  switch (status) {
    case "PAID":
      return "paid" as const;
    case "FAILED":
      return "failed" as const;
    case "REFUNDED":
      return "refunded" as const;
    case "PARTIALLY_REFUNDED":
      return "partially_refunded" as const;
    case "UNPAID":
    default:
      return "unpaid" as const;
  }
}

function normalizeConsultationType(value: unknown) {
  return String(value).toUpperCase() === "ONLINE_CONSULTATION"
    ? "Video"
    : "In-person";
}

function normalizePaginated<T>(
  payload: unknown,
  normalizer: (item: unknown) => T,
): PaginatedResult<T> {
  const source = toApiRecord(payload);
  const items = Array.isArray(source.data) ? source.data.map(normalizer) : [];
  const meta = toApiRecord(source.meta);

  return {
    items,
    total: Number(meta.total || items.length),
    page: Number(meta.page || 1),
    limit: Number(meta.limit || items.length || 10),
    totalPages: Number(meta.totalPages || 1),
  };
}

function normalizeAppointmentListItem(payload: unknown): PatientAppointmentListItem {
  const source = toApiRecord(payload);
  const doctor = toApiRecord(source.doctor);
  const clinic = toApiRecord(source.clinic);

  return {
    id: String(source.id || ""),
    patientId: "",
    patientName: "",
    doctorId: String(toApiRecord(doctor).id || ""),
    doctorName: String(doctor.name || ""),
    specialty: String(doctor.specialty || ""),
    clinic: String(clinic.name || ""),
    date: String(source.appointmentDate || ""),
    time: String(source.scheduledStartAt || ""),
    status: normalizeAppointmentStatus(source.status),
    type: normalizeConsultationType(source.consultationType),
    reason: String(source.reason || ""),
    notes: String(source.notes || ""),
    paymentStatus: normalizePaymentStatus(source.paymentStatus),
    canCancel: Boolean(source.canCancel),
    canReschedule: Boolean(source.canReschedule),
    canReview: Boolean(source.canReview),
    scheduledStartAt: String(source.scheduledStartAt || ""),
    scheduledEndAt: String(source.scheduledEndAt || ""),
  };
}

function normalizeMedicalRecordItem(payload: unknown): PatientMedicalRecordItem {
  const source = toApiRecord(payload);
  const doctor = toApiRecord(source.doctor);

  return {
    id: String(source.id || ""),
    title: String(source.title || ""),
    description: String(source.description || ""),
    fileUrl: String(source.fileUrl || ""),
    recordDate: String(source.recordDate || ""),
    doctor: {
      id: String(doctor.id || ""),
      name: String(doctor.name || ""),
    },
    appointmentId: String(source.appointmentId || ""),
  };
}

function normalizeReviewItem(payload: unknown): PatientReviewItem {
  const source = toApiRecord(payload);
  const doctor = toApiRecord(source.doctor);

  return {
    id: String(source.id || ""),
    appointmentId: String(source.appointmentId || ""),
    doctor: {
      id: String(doctor.id || ""),
      name: String(doctor.name || ""),
    },
    rating: Number(source.rating || 0),
    comment: String(source.comment || ""),
    createdAt: String(source.createdAt || ""),
  };
}

function normalizeNotificationItem(payload: unknown): PatientNotificationItem {
  const source = toApiRecord(payload);

  return {
    id: String(source.id || ""),
    title: String(source.title || ""),
    message: String(source.message || ""),
    type: String(source.type || ""),
    isRead: Boolean(source.isRead),
    createdAt: String(source.createdAt || ""),
  };
}

function normalizeDoctorListItem(payload: unknown): PatientDoctorListItem {
  const source = toApiRecord(payload);

  return {
    doctorId: String(source.doctorId || ""),
    name: String(source.name || ""),
    specialty: String(source.specialty || ""),
    clinic: String(source.clinic || ""),
    experienceYears: Number(source.experienceYears || 0),
    consultationFee: Number(source.consultationFee || 0),
    rating: Number(source.rating || 0),
    about: String(source.about || ""),
    isVerified: Boolean(source.isVerified),
  };
}

export async function getPatientDashboard(authFetch: ApiClientFetch): Promise<PatientDashboardResponse> {
  const payload = await request<unknown>(
    authFetch,
    "/patient/dashboard",
    "Unable to load patient dashboard.",
  );
  const source = toApiRecord(payload);
  const profile = toApiRecord(source.profile);
  const stats = toApiRecord(source.stats);

  return {
    profile: {
      userId: String(profile.userId || ""),
      patientId: String(profile.patientId || ""),
      name: String(profile.name || ""),
      email: String(profile.email || ""),
    },
    stats: {
      upcomingAppointments: Number(stats.upcomingAppointments || 0),
      medicalRecords: Number(stats.medicalRecords || 0),
      unreadNotifications: Number(stats.unreadNotifications || 0),
      completedAppointments: Number(stats.completedAppointments || 0),
    },
    upcomingAppointments: Array.isArray(source.upcomingAppointments)
      ? source.upcomingAppointments.map(normalizeAppointmentListItem)
      : [],
    recommendedDoctors: Array.isArray(source.recommendedDoctors)
      ? source.recommendedDoctors.map(normalizeDoctorListItem)
      : [],
    notificationsPreview: Array.isArray(source.notificationsPreview)
      ? source.notificationsPreview.map(normalizeNotificationItem)
      : [],
  };
}

export async function getPatientProfile(authFetch: ApiClientFetch): Promise<PatientProfileResponse> {
  const payload = await request<unknown>(
    authFetch,
    "/patient/profile",
    "Unable to load patient profile.",
  );
  const source = toApiRecord(payload);
  const user = toApiRecord(source.user);
  const patientProfile = toApiRecord(source.patientProfile);

  return {
    user: {
      id: String(user.id || ""),
      name: String(user.name || ""),
      email: String(user.email || ""),
      phone: String(user.phone || ""),
      location: String(user.location || ""),
      avatarUrl: user.avatarUrl ? String(user.avatarUrl) : null,
    },
    patientProfile: {
      id: String(patientProfile.id || ""),
      dateOfBirth: String(patientProfile.dateOfBirth || ""),
      gender: String(patientProfile.gender || "") as PatientProfileResponse["patientProfile"]["gender"],
      bloodGroup: String(patientProfile.bloodGroup || ""),
      address: String(patientProfile.address || ""),
      emergencyContactName: String(patientProfile.emergencyContactName || ""),
      emergencyContactPhone: String(patientProfile.emergencyContactPhone || ""),
    },
  };
}

export async function updatePatientProfile(
  authFetch: ApiClientFetch,
  body: UpdatePatientProfilePayload,
) {
  return request<PatientProfileResponse>(
    authFetch,
    "/patient/profile",
    "Unable to update patient profile.",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
}

export async function listPatientDoctors(
  authFetch: ApiClientFetch,
  params: Record<string, string | number | undefined> = {},
) {
  const payload = await request<unknown>(
    authFetch,
    `/patient/doctors${buildQuery(params)}`,
    "Unable to load doctors.",
  );

  return normalizePaginated(payload, normalizeDoctorListItem);
}

export async function getPatientDoctorById(authFetch: ApiClientFetch, id: string): Promise<PatientDoctorDetail> {
  const payload = await request<unknown>(
    authFetch,
    `/patient/doctors/${id}`,
    "Unable to load doctor details.",
  );
  const source = toApiRecord(payload);
  const clinic = toApiRecord(source.clinic);

  return {
    doctorId: String(source.doctorId || ""),
    name: String(source.name || ""),
    specialty: String(source.specialty || ""),
    clinic: {
      id: String(clinic.id || ""),
      name: String(clinic.name || ""),
      address: String(clinic.address || ""),
    },
    experienceYears: Number(source.experienceYears || 0),
    consultationFee: Number(source.consultationFee || 0),
    qualification: String(source.qualification || ""),
    about: String(source.about || ""),
    rating: Number(source.rating || 0),
    reviews: Array.isArray(source.reviews)
      ? source.reviews.map((item) => {
          const review = toApiRecord(item);
          return {
            id: String(review.id || ""),
            patientName: String(review.patientName || ""),
            rating: Number(review.rating || 0),
            comment: String(review.comment || ""),
            createdAt: String(review.createdAt || ""),
          };
        })
      : [],
    availableDates: Array.isArray(source.availableDates)
      ? source.availableDates.map((item) => String(item))
      : [],
  };
}

export async function listPatientDoctorSlots(
  authFetch: ApiClientFetch,
  doctorId: string,
  date: string,
) {
  const payload = await request<unknown>(
    authFetch,
    `/patient/doctors/${doctorId}/slots${buildQuery({ date })}`,
    "Unable to load time slots.",
  );
  const source = toApiRecord(payload);

  return Array.isArray(source.slots)
    ? source.slots.map((item) => {
        const slot = toApiRecord(item);
        return {
          slotId: String(slot.slotId || ""),
          startAt: String(slot.startAt || ""),
          endAt: String(slot.endAt || ""),
          isBooked: Boolean(slot.isBooked),
        } satisfies PatientSlot;
      })
    : [];
}

export async function createPatientAppointment(
  authFetch: ApiClientFetch,
  body: CreatePatientAppointmentPayload,
) {
  return request<unknown>(
    authFetch,
    "/patient/appointments",
    "Unable to create appointment.",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
}

export async function listPatientAppointments(
  authFetch: ApiClientFetch,
  params: Record<string, string | number | undefined> = {},
) {
  const payload = await request<unknown>(
    authFetch,
    `/patient/appointments${buildQuery(params)}`,
    "Unable to load appointments.",
  );

  return normalizePaginated(payload, normalizeAppointmentListItem);
}

export async function getPatientAppointmentById(
  authFetch: ApiClientFetch,
  id: string,
): Promise<PatientAppointmentDetail> {
  const payload = await request<unknown>(
    authFetch,
    `/patient/appointments/${id}`,
    "Unable to load appointment details.",
  );
  const source = toApiRecord(payload);
  const doctor = toApiRecord(source.doctor);
  const doctorClinic = toApiRecord(doctor.clinic);
  const clinic = toApiRecord(source.clinic);
  const payment = source.payment ? toApiRecord(source.payment) : null;

  return {
    id: String(source.id || ""),
    status: normalizeAppointmentStatus(source.status),
    appointmentDate: String(source.appointmentDate || ""),
    scheduledStartAt: String(source.scheduledStartAt || ""),
    scheduledEndAt: String(source.scheduledEndAt || ""),
    consultationType: String(source.consultationType || "CLINIC_VISIT") as PatientAppointmentDetail["consultationType"],
    type: normalizeConsultationType(source.consultationType),
    reason: String(source.reason || ""),
    notes: String(source.notes || ""),
    doctor: {
      id: String(doctor.id || ""),
      name: String(doctor.name || ""),
      specialty: String(doctor.specialty || ""),
      clinic: {
        id: String(doctorClinic.id || clinic.id || ""),
        name: String(doctorClinic.name || clinic.name || ""),
        address: String(doctorClinic.address || clinic.address || ""),
      },
    },
    clinic: {
      id: String(clinic.id || ""),
      name: String(clinic.name || ""),
      address: String(clinic.address || ""),
    },
    payment: payment
      ? {
          id: String(payment.id || ""),
          amount: Number(payment.amount || 0),
          currency: String(payment.currency || ""),
          method: String(payment.method || ""),
          status: normalizePaymentStatus(payment.status),
          transactionRef: String(payment.transactionRef || ""),
          paidAt: String(payment.paidAt || ""),
        }
      : null,
    medicalRecords: Array.isArray(source.medicalRecords)
      ? source.medicalRecords.map((item) => {
          const record = toApiRecord(item);
          return {
            id: String(record.id || ""),
            title: String(record.title || ""),
            description: String(record.description || ""),
            fileUrl: String(record.fileUrl || ""),
            recordDate: String(record.recordDate || ""),
          };
        })
      : [],
    prescriptions: Array.isArray(source.prescriptions)
      ? source.prescriptions.map((item) => {
          const prescription = toApiRecord(item);
          return {
            id: String(prescription.id || ""),
            diagnosis: String(prescription.diagnosis || ""),
            instructions: String(prescription.instructions || ""),
            followUpDate: prescription.followUpDate ? String(prescription.followUpDate) : null,
          };
        })
      : [],
    review: source.review
      ? {
          id: String(toApiRecord(source.review).id || ""),
          rating: Number(toApiRecord(source.review).rating || 0),
          comment: String(toApiRecord(source.review).comment || ""),
        }
      : null,
  };
}

export async function cancelPatientAppointment(authFetch: ApiClientFetch, id: string, reason: string) {
  return request<unknown>(
    authFetch,
    `/patient/appointments/${id}/cancel`,
    "Unable to cancel appointment.",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reason }),
    },
  );
}

export async function reschedulePatientAppointment(
  authFetch: ApiClientFetch,
  id: string,
  timeSlotId: string,
  reason: string,
) {
  return request<unknown>(
    authFetch,
    `/patient/appointments/${id}/reschedule`,
    "Unable to reschedule appointment.",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ timeSlotId, reason }),
    },
  );
}

export async function listPatientMedicalRecords(authFetch: ApiClientFetch) {
  const payload = await request<unknown>(
    authFetch,
    "/patient/medical-records",
    "Unable to load medical records.",
  );

  return normalizePaginated(payload, normalizeMedicalRecordItem);
}

export async function listPatientReviews(authFetch: ApiClientFetch) {
  const payload = await request<unknown>(
    authFetch,
    "/patient/reviews",
    "Unable to load reviews.",
  );

  return normalizePaginated(payload, normalizeReviewItem);
}

export async function createPatientReview(
  authFetch: ApiClientFetch,
  body: CreatePatientReviewPayload,
) {
  return request<unknown>(
    authFetch,
    "/patient/reviews",
    "Unable to submit review.",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    },
  );
}

export async function listPatientNotifications(authFetch: ApiClientFetch) {
  const payload = await request<unknown>(
    authFetch,
    "/patient/notifications",
    "Unable to load notifications.",
  );

  return normalizePaginated(payload, normalizeNotificationItem);
}
