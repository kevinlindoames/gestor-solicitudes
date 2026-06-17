import { render, screen } from "@testing-library/react";

import type { Request } from "@/features/requests/types";

import { RequestTable } from "./RequestTable";

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
] satisfies Request[];

describe("RequestTable", () => {
  it("should render request information", () => {
    render(<RequestTable requests={requests} />);

    expect(screen.getAllByText("REQ-001").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText("Acceso al sistema financiero").length
    ).toBeGreaterThan(0);
    expect(screen.getAllByText("María López").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Accesos").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Pendiente").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Alta").length).toBeGreaterThan(0);
  });

  it("should render detail and edit links for each request", () => {
    render(<RequestTable requests={requests} />);

    expect(
      screen.getAllByRole("link", { name: /ver/i }).length
    ).toBeGreaterThanOrEqual(2);

    expect(
      screen.getAllByRole("link", { name: /editar/i }).length
    ).toBeGreaterThanOrEqual(2);

    expect(
      screen.getAllByRole("link", { name: /ver/i })[0]
    ).toHaveAttribute("href", "/solicitudes/REQ-001");

    expect(
      screen.getAllByRole("link", { name: /editar/i })[0]
    ).toHaveAttribute("href", "/solicitudes/REQ-001/editar");
  });
});