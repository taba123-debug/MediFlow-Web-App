import { buildApiUrl } from "@/lib/api";

export type AuthRole = "ADMIN" | "DOCTOR" | "PATIENT";

export type AuthUser = {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  phoneNumber?: string;
  role: AuthRole;
  [key: string]: unknown;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type RegisterPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
};

type ApiEnvelope<T> = {
  message?: string;
  error?: string;
  data?: T;
  accessToken?: string;
  refreshToken?: string;
  user?: AuthUser;
  [key: string]: unknown;
};

const authPaths = {
  registerPatient: "/auth/register/patient",
  registerDoctor: "/auth/register/doctor",
  login: "/auth/login",
  refresh: "/auth/refresh",
  me: "/auth/me",
  logout: "/auth/logout",
};

export const authStorageKeys = {
  accessToken: "mediflow.accessToken",
  refreshToken: "mediflow.refreshToken",
  role: "mediflow.role",
};

function extractMessage(payload: ApiEnvelope<unknown> | null) {
  if (!payload) {
    return null;
  }

  if (typeof payload.message === "string" && payload.message) {
    return payload.message;
  }

  if (typeof payload.error === "string" && payload.error) {
    return payload.error;
  }

  return null;
}

function normalizeRole(value: unknown): AuthRole | null {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.toUpperCase();

  if (
    normalized === "ADMIN" ||
    normalized === "DOCTOR" ||
    normalized === "PATIENT"
  ) {
    return normalized;
  }

  return null;
}

function extractTokens(payload: ApiEnvelope<unknown> | null): AuthTokens | null {
  if (!payload) {
    return null;
  }

  const nested =
    payload.data && typeof payload.data === "object"
      ? (payload.data as ApiEnvelope<unknown>)
      : null;

  const accessToken =
    payload.accessToken ||
    (nested && typeof nested.accessToken === "string" ? nested.accessToken : null);
  const refreshToken =
    payload.refreshToken ||
    (nested && typeof nested.refreshToken === "string" ? nested.refreshToken : null);

  if (!accessToken || !refreshToken) {
    return null;
  }

  return { accessToken, refreshToken };
}

function extractUser(payload: ApiEnvelope<AuthUser> | null): AuthUser | null {
  if (!payload) {
    return null;
  }

  const candidate =
    payload.user && typeof payload.user === "object"
      ? payload.user
      : payload.data && typeof payload.data === "object" && "role" in payload.data
        ? (payload.data as AuthUser)
        : "role" in payload
          ? (payload as AuthUser)
          : null;

  if (!candidate) {
    return null;
  }

  const role = normalizeRole(candidate.role);

  return role ? { ...candidate, role } : null;
}

async function parseResponse<T>(response: Response) {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const payload = isJson ? ((await response.json()) as ApiEnvelope<T>) : null;

  return {
    ok: response.ok,
    status: response.status,
    payload,
    message:
      extractMessage(payload) ||
      (response.ok ? "Request completed successfully." : "Request failed."),
  };
}

export function getDashboardPathForRole(role: AuthRole) {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard";
    case "DOCTOR":
      return "/doctor/dashboard";
    case "PATIENT":
    default:
      return "/patient/dashboard";
  }
}

export function readStoredSession() {
  if (typeof window === "undefined") {
    return null;
  }

  const accessToken = window.localStorage.getItem(authStorageKeys.accessToken);
  const refreshToken = window.localStorage.getItem(authStorageKeys.refreshToken);
  const role = normalizeRole(window.localStorage.getItem(authStorageKeys.role));

  if (!accessToken || !refreshToken || !role) {
    return null;
  }

  return { accessToken, refreshToken, role };
}

export function persistSession(tokens: AuthTokens, role: AuthRole) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(authStorageKeys.accessToken, tokens.accessToken);
  window.localStorage.setItem(authStorageKeys.refreshToken, tokens.refreshToken);
  window.localStorage.setItem(authStorageKeys.role, role);
}

export function clearStoredSession() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(authStorageKeys.accessToken);
  window.localStorage.removeItem(authStorageKeys.refreshToken);
  window.localStorage.removeItem(authStorageKeys.role);
}

export async function registerRequest(
  role: "PATIENT" | "DOCTOR",
  body: RegisterPayload,
) {
  const path =
    role === "DOCTOR" ? authPaths.registerDoctor : authPaths.registerPatient;
  const response = await fetch(buildApiUrl(path), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const parsed = await parseResponse<AuthUser>(response);

  return {
    ok: parsed.ok,
    status: parsed.status,
    message: parsed.message,
    user: extractUser(parsed.payload as ApiEnvelope<AuthUser> | null),
  };
}

export async function loginRequest(body: { email: string; password: string }) {
  const response = await fetch(buildApiUrl(authPaths.login), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const parsed = await parseResponse<AuthUser>(response);
  const user = extractUser(parsed.payload as ApiEnvelope<AuthUser> | null);

  return {
    ok: parsed.ok,
    status: parsed.status,
    message: parsed.message,
    tokens: extractTokens(parsed.payload),
    user,
    role: user?.role || null,
  };
}

export async function refreshTokenRequest(refreshToken: string) {
  const response = await fetch(buildApiUrl(authPaths.refresh), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const parsed = await parseResponse<AuthUser>(response);
  const user = extractUser(parsed.payload as ApiEnvelope<AuthUser> | null);
  const tokens = extractTokens(parsed.payload);

  return {
    ok: parsed.ok,
    status: parsed.status,
    message: parsed.message,
    tokens,
    user,
    role: user?.role || null,
  };
}

export async function fetchCurrentUser(accessToken: string) {
  const response = await fetch(buildApiUrl(authPaths.me), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const parsed = await parseResponse<AuthUser>(response);
  const user = extractUser(parsed.payload as ApiEnvelope<AuthUser> | null);

  return {
    ok: parsed.ok,
    status: parsed.status,
    message: parsed.message,
    user,
    role: user?.role || null,
  };
}

export async function logoutRequest(accessToken: string) {
  const response = await fetch(buildApiUrl(authPaths.logout), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const parsed = await parseResponse<unknown>(response);

  return {
    ok: parsed.ok,
    status: parsed.status,
    message: parsed.message,
  };
}
