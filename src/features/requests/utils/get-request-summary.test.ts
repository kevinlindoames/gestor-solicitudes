import type { Request } from "@/features/requests/types";

import { getRequestSummary } from "./get-request-summary";

const baseRequest = {
  title: "Solicitud de prueba",
  description: "Descripción de solicitud de prueba",
  requester: "Kevin Lindo",
  category: "Accesos",
  priority: "medium",
  creationDate: "2026-06-10T09:30:00.000Z",
  lastChangeDate: "2026-06-10T09:30:00.000Z",
} satisfies Omit<Request, "id" | "status">;

describe("getRequestSummary", () => {
  it("should return zero values when there are no requests", () => {
    expect(getRequestSummary([])).toEqual({
      total: 0,
      pending: 0,
      inReview: 0,
      approved: 0,
      rejected: 0,
      closed: 0,
    });
  });

  it("should calculate requests summary by status", () => {
    const requests = [
      {
        ...baseRequest,
        id: "REQ-001",
        status: "pending",
      },
      {
        ...baseRequest,
        id: "REQ-002",
        status: "pending",
      },
      {
        ...baseRequest,
        id: "REQ-003",
        status: "in_review",
      },
      {
        ...baseRequest,
        id: "REQ-004",
        status: "approved",
      },
      {
        ...baseRequest,
        id: "REQ-005",
        status: "rejected",
      },
      {
        ...baseRequest,
        id: "REQ-006",
        status: "closed",
      },
    ] satisfies Request[];

    expect(getRequestSummary(requests)).toEqual({
      total: 6,
      pending: 2,
      inReview: 1,
      approved: 1,
      rejected: 1,
      closed: 1,
    });
  });
});