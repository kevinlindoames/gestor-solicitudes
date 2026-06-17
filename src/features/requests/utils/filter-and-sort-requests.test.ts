import type { Request, RequestFilters } from "@/features/requests/types";

import { filterAndSortRequests } from "./filter-and-sort-requests";

const baseFilters: RequestFilters = {
  search: "",
  status: "all",
  priority: "all",
  sortBy: "creationDate",
  sortDirection: "desc",
};

const requests = [
  {
    id: "REQ-001",
    title: "Acceso al sistema financiero",
    description: "Solicitud de acceso para reportes financieros.",
    requester: "María López",
    category: "Accesos",
    priority: "high",
    status: "pending",
    creationDate: "2026-06-10T09:30:00.000Z",
    lastChangeDate: "2026-06-10T09:30:00.000Z",
  },
  {
    id: "REQ-002",
    title: "Actualización de equipo portátil",
    description: "Evaluación para renovación de equipo.",
    requester: "Carlos Ramírez",
    category: "Infraestructura",
    priority: "medium",
    status: "in_review",
    creationDate: "2026-06-11T14:15:00.000Z",
    lastChangeDate: "2026-06-12T10:00:00.000Z",
  },
  {
    id: "REQ-003",
    title: "Compra de licencias",
    description: "Compra de licencias de software.",
    requester: "Lucía Torres",
    category: "Compras",
    priority: "critical",
    status: "approved",
    creationDate: "2026-06-08T16:45:00.000Z",
    lastChangeDate: "2026-06-09T08:20:00.000Z",
  },
] satisfies Request[];

describe("filterAndSortRequests", () => {
  it("should filter requests by search value", () => {
    const result = filterAndSortRequests(requests, {
      ...baseFilters,
      search: "financiero",
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("REQ-001");
  });

  it("should filter requests by requester", () => {
    const result = filterAndSortRequests(requests, {
      ...baseFilters,
      search: "Carlos",
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("REQ-002");
  });

  it("should filter requests by status", () => {
    const result = filterAndSortRequests(requests, {
      ...baseFilters,
      status: "approved",
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("REQ-003");
  });

  it("should filter requests by priority", () => {
    const result = filterAndSortRequests(requests, {
      ...baseFilters,
      priority: "critical",
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("REQ-003");
  });

  it("should sort requests by creation date descending", () => {
    const result = filterAndSortRequests(requests, {
      ...baseFilters,
      sortBy: "creationDate",
      sortDirection: "desc",
    });

    expect(result.map((request) => request.id)).toEqual([
      "REQ-002",
      "REQ-001",
      "REQ-003",
    ]);
  });

  it("should sort requests by priority descending", () => {
    const result = filterAndSortRequests(requests, {
      ...baseFilters,
      sortBy: "priority",
      sortDirection: "desc",
    });

    expect(result.map((request) => request.id)).toEqual([
      "REQ-003",
      "REQ-001",
      "REQ-002",
    ]);
  });
});