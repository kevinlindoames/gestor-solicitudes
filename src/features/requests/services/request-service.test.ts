import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { requestService } from "./request-service";
import type { Request } from "@/features/requests/types";

const requestMock: Request = {
  id: "REQ-001",
  title: "Solicitud de prueba",
  description: "Descripción válida de una solicitud de prueba.",
  requester: "Kevin Lindo",
  category: "Accesos",
  priority: "high",
  status: "pending",
  creationDate: "2026-06-01T10:00:00.000Z",
  lastChangeDate: "2026-06-01T10:00:00.000Z",
};

function mockFetchResponse<TResponse>(response: TResponse, status = 200) {
  const ok = status >= 200 && status < 300;

  global.fetch = vi.fn().mockResolvedValue({
    ok,
    status,
    statusText: ok ? "OK" : "Error",
    json: vi.fn().mockResolvedValue(response),
  }) as unknown as typeof fetch;
}

describe("requestService", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "http://localhost:8080");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("should get all requests", async () => {
    mockFetchResponse<Request[]>([requestMock]);

    const requests = await requestService.getAll();

    expect(requests).toEqual([requestMock]);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/solicitudes",
      expect.objectContaining({
        method: "GET",
      })
    );
  });

  it("should return empty array when getAll response is null", async () => {
    mockFetchResponse<Request[] | null>(null);

    const requests = await requestService.getAll();

    expect(requests).toEqual([]);
  });

  it("should get request by id", async () => {
    mockFetchResponse<Request>(requestMock);

    const request = await requestService.getById("REQ-001");

    expect(request).toEqual(requestMock);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/solicitudes/REQ-001",
      expect.objectContaining({
        method: "GET",
      })
    );
  });

  it("should create request", async () => {
    mockFetchResponse<Request>(requestMock, 201);

    const request = await requestService.create({
      title: "Solicitud de prueba",
      description: "Descripción válida de una solicitud de prueba.",
      requester: "Kevin Lindo",
      category: "Accesos",
      priority: "high",
    });

    expect(request).toEqual(requestMock);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/solicitudes",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({
          title: "Solicitud de prueba",
          description: "Descripción válida de una solicitud de prueba.",
          requester: "Kevin Lindo",
          category: "Accesos",
          priority: "high",
        }),
      })
    );
  });

  it("should update request", async () => {
    mockFetchResponse<Request>({
      ...requestMock,
      status: "in_review",
    });

    const request = await requestService.update("REQ-001", {
      title: "Solicitud de prueba",
      description: "Descripción válida de una solicitud de prueba.",
      requester: "Kevin Lindo",
      category: "Accesos",
      priority: "high",
      status: "in_review",
    });

    expect(request.status).toBe("in_review");
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/solicitudes/REQ-001",
      expect.objectContaining({
        method: "PUT",
      })
    );
  });

  it("should update request priority", async () => {
    mockFetchResponse<Request>({
      ...requestMock,
      priority: "critical",
    });

    const request = await requestService.updatePriority("REQ-001", {
      priority: "critical",
    });

    expect(request.priority).toBe("critical");
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/solicitudes/REQ-001",
      expect.objectContaining({
        method: "PATCH",
        body: JSON.stringify({
          priority: "critical",
        }),
      })
    );
  });

  it("should close request", async () => {
    mockFetchResponse<Request>({
      ...requestMock,
      status: "closed",
    });

    const request = await requestService.close("REQ-001");

    expect(request.status).toBe("closed");
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:8080/api/v1/solicitudes/REQ-001",
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });

  it("should throw error when API response is not ok", async () => {
    mockFetchResponse(
      {
        message: "Solicitud no encontrada.",
      },
      404
    );

    await expect(requestService.getById("REQ-999")).rejects.toThrow(
      "Solicitud no encontrada."
    );
  });
});