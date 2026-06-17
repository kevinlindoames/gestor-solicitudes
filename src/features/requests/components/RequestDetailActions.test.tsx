import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import { RequestDetailActions } from "./RequestDetailActions";
import { ToastProvider } from "@/shared/components";
import type { Request } from "@/features/requests/types";

const routerPush = vi.fn();
const updatePriorityMutate = vi.fn();
const closeRequestMutate = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: routerPush,
  }),
}));

vi.mock("@/features/requests/hooks", () => ({
  useUpdateRequestPriority: () => ({
    mutate: updatePriorityMutate,
    isPending: false,
    isError: false,
  }),
  useCloseRequest: () => ({
    mutate: closeRequestMutate,
    isPending: false,
    isError: false,
  }),
}));

const requestMock: Request = {
  id: "REQ-001",
  title: "Solicitud de prueba",
  description: "Descripción válida para la solicitud de prueba.",
  requester: "Kevin Lindo",
  category: "Soporte técnico",
  priority: "medium",
  status: "pending",
  creationDate: "2026-06-01T10:00:00.000Z",
  lastChangeDate: "2026-06-01T10:00:00.000Z",
};

function renderComponent(request: Request = requestMock) {
  return render(
    <ToastProvider>
      <RequestDetailActions request={request} />
    </ToastProvider>
  );
}

describe("RequestDetailActions", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    updatePriorityMutate.mockImplementation((_variables, options) => {
      options?.onSuccess?.({
        ...requestMock,
        priority: "high",
      });
    });

    closeRequestMutate.mockImplementation((_variables, options) => {
      options?.onSuccess?.({
        ...requestMock,
        status: "closed",
      });
    });
  });

  it("should render quick actions", () => {
    renderComponent();

    expect(screen.getByText("Acciones rápidas")).toBeInTheDocument();
    expect(screen.getByLabelText("Cambiar prioridad")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cerrar solicitud" })
    ).toBeInTheDocument();
  });

  it("should update priority when selected priority changes", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.selectOptions(screen.getByLabelText("Cambiar prioridad"), "high");

    expect(updatePriorityMutate).toHaveBeenCalledWith(
      {
        id: "REQ-001",
        payload: {
          priority: "high",
        },
      },
      expect.any(Object)
    );

    expect(screen.getByText("Prioridad actualizada correctamente")).toBeInTheDocument();
    expect(routerPush).toHaveBeenCalledWith("/solicitudes/REQ-001");
  });

  it("should not update priority when selected priority is the same", async () => {
    const user = userEvent.setup();

    renderComponent();

    await user.selectOptions(
      screen.getByLabelText("Cambiar prioridad"),
      "medium"
    );

    expect(updatePriorityMutate).not.toHaveBeenCalled();
  });

  it("should close request when user confirms action", async () => {
    const user = userEvent.setup();

    vi.spyOn(window, "confirm").mockReturnValueOnce(true);

    renderComponent();

    await user.click(screen.getByRole("button", { name: "Cerrar solicitud" }));

    expect(closeRequestMutate).toHaveBeenCalledWith(
      {
        id: "REQ-001",
      },
      expect.any(Object)
    );

    expect(screen.getByText("Solicitud cerrada correctamente")).toBeInTheDocument();
    expect(routerPush).toHaveBeenCalledWith("/solicitudes/REQ-001");
  });

  it("should not close request when user cancels action", async () => {
    const user = userEvent.setup();

    vi.spyOn(window, "confirm").mockReturnValueOnce(false);

    renderComponent();

    await user.click(screen.getByRole("button", { name: "Cerrar solicitud" }));

    expect(closeRequestMutate).not.toHaveBeenCalled();
  });

  it("should disable actions when request is closed", () => {
    renderComponent({
      ...requestMock,
      status: "closed",
    });

    expect(screen.getByLabelText("Cambiar prioridad")).toBeDisabled();
    expect(
      screen.getByRole("button", { name: "Solicitud cerrada" })
    ).toBeDisabled();
  });
});