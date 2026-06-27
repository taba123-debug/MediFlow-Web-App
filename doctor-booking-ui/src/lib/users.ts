export type ApiClientFetch = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

export type UserListItem = {
  id: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  email: string;
  phone?: string;
  phoneNumber?: string;
  role?: string;
  location?: string;
  status?: "active" | "inactive" | "pending";
  joinedAt?: string;
  createdAt?: string;
  [key: string]: unknown;
};

export type UserListParams = {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

function buildQuery(params: UserListParams) {
  const query = new URLSearchParams();

  if (params.page) query.set("page", String(params.page));
  if (params.limit) query.set("limit", String(params.limit));
  if (params.search) query.set("search", params.search);
  if (params.role) query.set("role", params.role);
  if (params.status) query.set("status", params.status);

  const value = query.toString();
  return value ? `?${value}` : "";
}

function normalizeItems<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) {
    return payload as T[];
  }

  if (!payload || typeof payload !== "object") {
    return [];
  }

  const container = payload as Record<string, unknown>;

  if (Array.isArray(container.items)) {
    return container.items as T[];
  }

  if (Array.isArray(container.data)) {
    return container.data as T[];
  }

  if (
    container.data &&
    typeof container.data === "object" &&
    Array.isArray((container.data as Record<string, unknown>).items)
  ) {
    return (container.data as Record<string, unknown>).items as T[];
  }

  return [];
}

function normalizePaginationMeta(payload: unknown, itemsCount: number, fallbackPage: number, fallbackLimit: number) {
  if (!payload || typeof payload !== "object") {
    return {
      total: itemsCount,
      page: fallbackPage,
      limit: fallbackLimit,
      totalPages: Math.max(1, Math.ceil(itemsCount / fallbackLimit)),
    };
  }

  const container = payload as Record<string, unknown>;
  const nestedData =
    container.data && typeof container.data === "object"
      ? (container.data as Record<string, unknown>)
      : null;
  const meta =
    container.meta && typeof container.meta === "object"
      ? (container.meta as Record<string, unknown>)
      : nestedData?.meta && typeof nestedData.meta === "object"
        ? (nestedData.meta as Record<string, unknown>)
        : null;

  const total =
    Number(meta?.total) ||
    Number(container.total) ||
    Number(nestedData?.total) ||
    itemsCount;
  const page =
    Number(meta?.page) ||
    Number(container.page) ||
    Number(nestedData?.page) ||
    fallbackPage;
  const limit =
    Number(meta?.limit) ||
    Number(container.limit) ||
    Number(nestedData?.limit) ||
    fallbackLimit;
  const totalPages =
    Number(meta?.totalPages) ||
    Number(container.totalPages) ||
    Number(nestedData?.totalPages) ||
    Math.max(1, Math.ceil(total / limit));

  return {
    total,
    page,
    limit,
    totalPages,
  };
}

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

export function getUserDisplayName(user: UserListItem) {
  if (user.name) {
    return user.name;
  }

  return [user.firstName, user.lastName].filter(Boolean).join(" ");
}

export function getUserPhone(user: UserListItem) {
  return user.phoneNumber || user.phone || "";
}

export function getUserJoinedAt(user: UserListItem) {
  return user.joinedAt || user.createdAt || "";
}

export async function listUsers(
  authFetch: ApiClientFetch,
  params: UserListParams,
): Promise<PaginatedResult<UserListItem>> {
  const fallbackPage = params.page || 1;
  const fallbackLimit = params.limit || 10;
  const response = await authFetch(`/users${buildQuery(params)}`);
  const payload = await parseJson(response);

  if (!response.ok) {
    throw new Error(extractMessage(payload, "Unable to load users."));
  }

  const items = normalizeItems<UserListItem>(payload);
  const meta = normalizePaginationMeta(payload, items.length, fallbackPage, fallbackLimit);

  return {
    items,
    ...meta,
  };
}

export async function getUserById(authFetch: ApiClientFetch, id: string) {
  const response = await authFetch(`/users/${id}`);
  const payload = await parseJson(response);

  if (!response.ok) {
    throw new Error(extractMessage(payload, "Unable to load user details."));
  }

  if (payload && typeof payload === "object" && "data" in (payload as Record<string, unknown>)) {
    return (payload as { data: UserListItem }).data;
  }

  return payload as UserListItem;
}

export async function updateUser(
  authFetch: ApiClientFetch,
  id: string,
  body: Record<string, unknown>,
) {
  const response = await authFetch(`/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const payload = await parseJson(response);

  if (!response.ok) {
    throw new Error(extractMessage(payload, "Unable to update user."));
  }

  if (payload && typeof payload === "object" && "data" in (payload as Record<string, unknown>)) {
    return (payload as { data: UserListItem }).data;
  }

  return payload as UserListItem;
}

export async function updateUserStatus(
  authFetch: ApiClientFetch,
  id: string,
  status: "active" | "inactive" | "pending",
) {
  const response = await authFetch(`/users/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  const payload = await parseJson(response);

  if (!response.ok) {
    throw new Error(extractMessage(payload, "Unable to update user status."));
  }

  if (payload && typeof payload === "object" && "data" in (payload as Record<string, unknown>)) {
    return (payload as { data: UserListItem }).data;
  }

  return payload as UserListItem;
}
