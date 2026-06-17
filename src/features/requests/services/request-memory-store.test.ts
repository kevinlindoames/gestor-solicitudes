import {
  closeRequest,
  createRequest,
  getRequestById,
  getRequests,
  updateRequest,
  updateRequestPriority,
} from "./request-memory-store";

describe("request-memory-store", () => {
  it("should return initial requests", () => {
    const requests = getRequests();

    expect(requests.length).toBeGreaterThan(0);
    expect(requests[0]).toHaveProperty("id");
    expect(requests[0]).toHaveProperty("title");
  });

  it("should get a request by id", () => {
    const request = getRequestById("REQ-001");

    expect(request).toBeDefined();
    expect(request?.id).toBe("REQ-001");
  });

  it("should create a new request", () => {
    const request = createRequest({
      title: "Nueva solicitud desde test",
      description: "Descripción válida para crear una solicitud desde test.",
      requester: "Kevin Lindo",
      category: "Soporte técnico",
      priority: "medium",
    });

    expect(request.id).toMatch(/^REQ-/);
    expect(request.title).toBe("Nueva solicitud desde test");
    expect(request.status).toBe("pending");
  });

  it("should update an existing request", () => {
    const updatedRequest = updateRequest("REQ-001", {
      title: "Solicitud actualizada",
      description: "Descripción actualizada desde test.",
      category: "Accesos",
      priority: "critical",
      status: "in_review",
    });

    expect(updatedRequest).toBeDefined();
    expect(updatedRequest?.title).toBe("Solicitud actualizada");
    expect(updatedRequest?.priority).toBe("critical");
    expect(updatedRequest?.status).toBe("in_review");
  });

  it("should update request priority", () => {
    const updatedRequest = updateRequestPriority("REQ-002", {
      priority: "critical",
    });

    expect(updatedRequest).toBeDefined();
    expect(updatedRequest?.priority).toBe("critical");
  });

  it("should close an existing request", () => {
    const closedRequest = closeRequest("REQ-003");

    expect(closedRequest).toBeDefined();
    expect(closedRequest?.status).toBe("closed");
  });

  it("should return undefined when request does not exist", () => {
    expect(getRequestById("REQ-999")).toBeUndefined();

    expect(
      updateRequest("REQ-999", {
        title: "No existe",
        description: "No debería actualizarse.",
        category: "Accesos",
        priority: "low",
        status: "pending",
      })
    ).toBeUndefined();

    expect(
      updateRequestPriority("REQ-999", {
        priority: "high",
      })
    ).toBeUndefined();

    expect(closeRequest("REQ-999")).toBeUndefined();
  });
});