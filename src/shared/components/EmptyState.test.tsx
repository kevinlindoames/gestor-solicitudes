import { render, screen } from "@testing-library/react";

import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("should render empty state title and description", () => {
    render(
      <EmptyState
        title="No hay solicitudes"
        description="No se encontraron solicitudes con los filtros actuales."
      />
    );

    expect(screen.getByText("No hay solicitudes")).toBeInTheDocument();
    expect(
      screen.getByText("No se encontraron solicitudes con los filtros actuales.")
    ).toBeInTheDocument();
  });
});