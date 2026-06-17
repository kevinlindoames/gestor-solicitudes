import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import type { RequestFormValues } from "@/features/requests/schemas";

import { RequestForm } from "./RequestForm";

const defaultValues: RequestFormValues = {
  title: "",
  description: "",
  requester: "",
  category: "Accesos",
  priority: "medium",
  status: "pending",
};

describe("RequestForm", () => {
  it("should render validation messages when required fields are empty", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <RequestForm
        defaultValues={defaultValues}
        submitLabel="Crear solicitud"
        onSubmit={onSubmit}
      />
    );

    await user.click(screen.getByRole("button", { name: /crear solicitud/i }));

    expect(
      await screen.findByText("El título debe tener al menos 3 caracteres.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("La descripción debe tener al menos 10 caracteres.")
    ).toBeInTheDocument();

    expect(
      screen.getByText("El solicitante debe tener al menos 3 caracteres.")
    ).toBeInTheDocument();

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("should submit valid values in create mode", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <RequestForm
        defaultValues={defaultValues}
        submitLabel="Crear solicitud"
        onSubmit={onSubmit}
      />
    );

    await user.type(
      screen.getByLabelText("Título"),
      "Acceso a plataforma interna"
    );

    await user.type(
      screen.getByLabelText("Descripción"),
      "Necesito acceso para revisar reportes internos del área."
    );

    await user.type(screen.getByLabelText("Solicitante"), "Kevin Lindo");

    await user.selectOptions(screen.getByLabelText("Categoría"), "Accesos");
    await user.selectOptions(screen.getByLabelText("Prioridad"), "high");

    await user.click(screen.getByRole("button", { name: /crear solicitud/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        {
          title: "Acceso a plataforma interna",
          description:
            "Necesito acceso para revisar reportes internos del área.",
          requester: "Kevin Lindo",
          category: "Accesos",
          priority: "high",
          status: "pending",
        },
        expect.anything()
      );
    });
  });

  it("should render and submit status field in edit mode", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    render(
      <RequestForm
      mode="edit"
        defaultValues={{
          title: "Solicitud existente",
          description: "Descripción válida de una solicitud existente.",
          requester: "María López",
          category: "Soporte técnico",
          priority: "medium",
          status: "pending",
        }}
        submitLabel="Guardar cambios"
        onSubmit={onSubmit}
      />
    );

    expect(screen.getByLabelText("Estado")).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText("Estado"), "approved");

    await user.click(screen.getByRole("button", { name: /guardar cambios/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        {
          title: "Solicitud existente",
          description: "Descripción válida de una solicitud existente.",
          requester: "María López",
          category: "Soporte técnico",
          priority: "medium",
          status: "approved",
        },
        expect.anything()
      );
    });
  });
});