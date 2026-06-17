import { render, screen } from "@testing-library/react";

import { LoadingState } from "./LoadingState";

describe("LoadingState", () => {
  it("should render default loading state", () => {
    render(<LoadingState />);

    expect(screen.getByText("Cargando información")).toBeInTheDocument();
    expect(
      screen.getByText("Estamos obteniendo la información solicitada.")
    ).toBeInTheDocument();
  });

  it("should render custom title and description", () => {
    render(
      <LoadingState
        title="Cargando dashboard"
        description="Estamos obteniendo el resumen de solicitudes."
      />
    );

    expect(screen.getByText("Cargando dashboard")).toBeInTheDocument();
    expect(
      screen.getByText("Estamos obteniendo el resumen de solicitudes.")
    ).toBeInTheDocument();
  });

  it("should render message as description when description is not provided", () => {
    render(<LoadingState message="Cargando solicitud..." />);

    expect(screen.getByText("Cargando información")).toBeInTheDocument();
    expect(screen.getByText("Cargando solicitud...")).toBeInTheDocument();
  });
});