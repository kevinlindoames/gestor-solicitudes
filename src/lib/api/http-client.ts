import type { ApiErrorResponse } from "@/lib/api/api.types";

interface RequestOptions extends RequestInit {
  body?: BodyInit | null;
}

function getApiBaseUrl() {
  return process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
}

function buildUrl(endpoint: string) {
  if (endpoint.startsWith("http")) {
    return endpoint;
  }

  return `${getApiBaseUrl()}${endpoint}`;
}

async function request<TResponse>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<TResponse> {
  const response = await fetch(buildUrl(endpoint), {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let errorMessage = "Ocurrió un error al procesar la solicitud.";

    try {
      const errorResponse = (await response.json()) as ApiErrorResponse;

      if (errorResponse.message) {
        errorMessage = errorResponse.message;
      }
    } catch {
      errorMessage = response.statusText || errorMessage;
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null as TResponse;
  }

  return (await response.json()) as TResponse;
}

export const httpClient = {
  get: <TResponse>(endpoint: string) =>
    request<TResponse>(endpoint, {
      method: "GET",
    }),

  post: <TResponse, TPayload>(endpoint: string, payload: TPayload) =>
    request<TResponse>(endpoint, {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  put: <TResponse, TPayload>(endpoint: string, payload: TPayload) =>
    request<TResponse>(endpoint, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),

  patch: <TResponse, TPayload>(endpoint: string, payload: TPayload) =>
    request<TResponse>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),

  delete: <TResponse>(endpoint: string) =>
    request<TResponse>(endpoint, {
      method: "DELETE",
    }),
};