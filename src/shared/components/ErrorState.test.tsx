import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { ErrorState } from "./ErrorState";

describe("ErrorState", () => {
  it("should render default error state", () => {
    render(<ErrorState />);

    expect(screen.getByText("Ocurrió un error")).toBeInTheDocument();
    expect(
      screen.getByText("No se pudo completar la operación. Intenta nuevamente.")
    ).toBeInTheDocument();
  });

  it("should render custom title and description", () => {
    render(
      <ErrorState
        title="No se pudo cargar el dashboard"
        description="Ocurrió un problema al obtener las solicitudes."
      />
    );

    expect(screen.getByText("No se pudo cargar el dashboard")).toBeInTheDocument();
    expect(
      screen.getByText("Ocurrió un problema al obtener las solicitudes.")
    ).toBeInTheDocument();
  });

  it("should execute onRetry when retry button is clicked", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();

    render(
      <ErrorState
        title="No se pudo cargar"
        description="Intenta nuevamente."
        onRetry={onRetry}
      />
    );

    await user.click(
      screen.getByRole("button", { name: "Intentar nuevamente" })
    );

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("should execute onAction when custom action button is clicked", async () => {
    const user = userEvent.setup();
    const onAction = vi.fn();

    render(
      <ErrorState
        title="No se pudo guardar"
        description="Ocurrió un error al guardar."
        actionLabel="Reintentar guardado"
        onAction={onAction}
      />
    );

    await user.click(screen.getByRole("button", { name: "Reintentar guardado" }));

    expect(onAction).toHaveBeenCalledTimes(1);
  });
});