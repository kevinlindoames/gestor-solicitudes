import type { Request } from "@/features/requests/types";

import { generateRequestId } from "./generate-request-id";

describe("generateRequestId", () => {
  it("should generate the next request id using the current list length", () => {
    const requests = [
      {
        id: "REQ-001",
        title: "Solicitud 1",
        description: "Descripción de prueba",
        requester: "Kevin Lindo",
        category: "Accesos",
        priority: "medium",
        status: "pending",
        creationDate: "2026-06-10T09:30:00.000Z",
        lastChangeDate: "2026-06-10T09:30:00.000Z",
      },
      {
        id: "REQ-002",
        title: "Solicitud 2",
        description: "Descripción de prueba",
        requester: "Kevin Lindo",
        category: "Soporte técnico",
        priority: "high",
        status: "in_review",
        creationDate: "2026-06-11T09:30:00.000Z",
        lastChangeDate: "2026-06-11T09:30:00.000Z",
      },
    ] satisfies Request[];

    expect(generateRequestId(requests)).toBe("REQ-003");
  });

  it("should generate REQ-001 when the list is empty", () => {
    expect(generateRequestId([])).toBe("REQ-001");
  });
});