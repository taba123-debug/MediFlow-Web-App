const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

function flattenValidationErrors(source: Record<string, unknown>) {
  const fieldErrors = source.errors;

  if (!fieldErrors || typeof fieldErrors !== "object") {
    return [];
  }

  return Object.values(fieldErrors).flatMap((value) => {
    if (Array.isArray(value)) {
      return value.filter((item): item is string => typeof item === "string");
    }

    if (typeof value === "string") {
      return [value];
    }

    return [];
  });
}

export function extractApiErrorMessage(payload: unknown, fallback = "Request failed.") {
  if (!payload || typeof payload !== "object") {
    return fallback;
  }

  const source = payload as Record<string, unknown>;
  const validationErrors = flattenValidationErrors(source);

  if (validationErrors.length > 0) {
    return validationErrors.join(", ");
  }

  if (Array.isArray(source.message)) {
    const messages = source.message.filter((item): item is string => typeof item === "string");
    if (messages.length > 0) {
      return messages.join(", ");
    }
  }

  if (typeof source.message === "string" && source.message) {
    return source.message;
  }

  if (typeof source.error === "string" && source.error) {
    return source.error;
  }

  return fallback;
}

export function extractApiFieldErrors(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return {};
  }

  const source = payload as Record<string, unknown>;
  const fieldErrors = source.errors;

  if (!fieldErrors || typeof fieldErrors !== "object") {
    return {};
  }

  return Object.entries(fieldErrors).reduce<Record<string, string>>((result, [key, value]) => {
    if (Array.isArray(value)) {
      const messages = value.filter((item): item is string => typeof item === "string");
      if (messages.length > 0) {
        result[key] = messages.join(", ");
      }
      return result;
    }

    if (typeof value === "string" && value) {
      result[key] = value;
    }

    return result;
  }, {});
}

export function getApiBaseUrl() {
  if (!apiBaseUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_API_BASE_URL. Add it to your .env.local file.",
    );
  }

  return apiBaseUrl.replace(/\/+$/, "");
}

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${getApiBaseUrl()}${normalizedPath}`;
}

export function resolveApiInput(input: RequestInfo | URL) {
  if (input instanceof URL) {
    return input;
  }

  if (typeof input === "string") {
    if (/^https?:\/\//i.test(input)) {
      return input;
    }

    return buildApiUrl(input);
  }

  return input;
}

export async function fetchApiJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(buildApiUrl(path), init);
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");
  const payload = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(extractApiErrorMessage(payload));
  }

  return payload as T;
}
