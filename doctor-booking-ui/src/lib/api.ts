const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

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
    const message =
      payload &&
      typeof payload === "object" &&
      "message" in payload &&
      typeof payload.message === "string"
        ? payload.message
        : "Request failed.";
    throw new Error(message);
  }

  return payload as T;
}
