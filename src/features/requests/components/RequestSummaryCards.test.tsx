import { render, screen } from "@testing-library/react";

import { RequestSummaryCards } from "./RequestSummaryCards";

describe("RequestSummaryCards", () => {
  it("should render all summary labels and values", () => {
    render(
      <RequestSummaryCards
        summary={{
          total: 8,
          pending: 2,
          inReview: 2,
          approved: 2,
          rejected: 1,
          closed: 1,
        }}
      />
    );

    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Pendientes")).toBeInTheDocument();
    expect(screen.getByText("En revisión")).toBeInTheDocument();
    expect(screen.getByText("Aprobadas")).toBeInTheDocument();
    expect(screen.getByText("Rechazadas")).toBeInTheDocument();
    expect(screen.getByText("Cerradas")).toBeInTheDocument();

    expect(screen.getByText("8")).toBeInTheDocument();
    expect(screen.getAllByText("2")).toHaveLength(3);
    expect(screen.getAllByText("1")).toHaveLength(2);
  });

  it("should expose an accessible section label", () => {
    render(
      <RequestSummaryCards
        summary={{
          total: 0,
          pending: 0,
          inReview: 0,
          approved: 0,
          rejected: 0,
          closed: 0,
        }}
      />
    );

    expect(
      screen.getByRole("region", { name: "Resumen de solicitudes" })
    ).toBeInTheDocument();
  });
});