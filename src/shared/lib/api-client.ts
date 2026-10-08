import { env } from "@/config/env";

/** Thrown when the server responds with a non-2xx status. */
export class ApiError<TBody = unknown> extends Error {
  readonly name = "ApiError";

  constructor(
    readonly status: number,
    readonly statusText: string,
    readonly body: TBody | null,
    message?: string,
  ) {
    super(message ?? `Request failed with status ${status}`);
  }
}

/** Thrown when the request never got a response (offline, DNS, CORS, abort). */
export class NetworkError extends Error {
  readonly name = "NetworkError";

  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
  }
}

export const isApiError = (e: unknown): e is ApiError => e instanceof ApiError;
export const isNetworkError = (e: unknown): e is NetworkError => e instanceof NetworkError;

type QueryValue = string | number | boolean | null | undefined;

export interface RequestOptions extends Omit<RequestInit, "body" | "method"> {
  /** Plain objects are JSON-encoded; FormData, Blob, strings etc. pass through. */
  body?: unknown;
  query?: Record<string, QueryValue>;
}

function buildUrl(path: string, query?: RequestOptions["query"]): string {
  const url = new URL(path.replace(/^\//, ""), env.NEXT_PUBLIC_API_URL.replace(/\/?$/, "/"));
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

function isJsonBody(body: unknown): boolean {
  return (
    body !== null &&
    typeof body === "object" &&
    !(body instanceof FormData) &&
    !(body instanceof Blob) &&
    !(body instanceof URLSearchParams) &&
    !(body instanceof ArrayBuffer)
  );
}

async function parseBody(res: Response): Promise<unknown> {
  if (res.status === 204 || res.headers.get("content-length") === "0") return null;
  const type = res.headers.get("content-type") ?? "";
  try {
    return type.includes("application/json") ? await res.json() : await res.text();
  } catch {
    return null;
  }
}

async function request<T>(
  method: string,
  path: string,
  { body, query, headers, ...init }: RequestOptions = {},
): Promise<T> {
  const finalHeaders = new Headers(headers);
  finalHeaders.set("Accept", "application/json");

  let payload: BodyInit | undefined;
  if (body !== undefined) {
    if (isJsonBody(body)) {
      finalHeaders.set("Content-Type", "application/json");
      payload = JSON.stringify(body);
    } else {
      payload = body as BodyInit;
    }
  }

  let res: Response;
  try {
    res = await fetch(buildUrl(path, query), {
      ...init,
      method,
      headers: finalHeaders,
      body: payload,
      credentials: "include", // send/receive cookies, including cross-origin
    });
  } catch (cause) {
    throw new NetworkError("Network request failed", { cause });
  }

  const data = await parseBody(res);

  if (!res.ok) {
    const message =
      data && typeof data === "object" && "message" in data && typeof data.message === "string"
        ? data.message
        : undefined;
    throw new ApiError(res.status, res.statusText, data, message);
  }

  return data as T;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) => request<T>("GET", path, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("POST", path, { ...options, body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PUT", path, { ...options, body }),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PATCH", path, { ...options, body }),
  delete: <T>(path: string, options?: RequestOptions) => request<T>("DELETE", path, options),
};