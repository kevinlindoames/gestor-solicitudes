import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

import type { RequestFilters as RequestFiltersType } from "@/features/requests/types";

import { RequestFilters } from "./RequestFilters";

const defaultFilters: RequestFiltersType = {
  search: "",
  status: "all",
  priority: "all",
  sortBy: "creationDate",
  sortDirection: "desc",
};

describe("RequestFilters", () => {
  it("should call onFiltersChange when search value changes", async () => {
    const user = userEvent.setup();
    const onFiltersChange = vi.fn();

    render(
      <RequestFilters
        filters={defaultFilters}
        onFiltersChange={onFiltersChange}
      />
    );

    await user.type(screen.getByLabelText("Buscar"), "finanzas");

    expect(onFiltersChange).toHaveBeenCalled();
    expect(onFiltersChange).toHaveBeenLastCalledWith({
      ...defaultFilters,
      search: "s",
    });
  });

  it("should call onFiltersChange when status changes", async () => {
    const user = userEvent.setup();
    const onFiltersChange = vi.fn();

    render(
      <RequestFilters
        filters={defaultFilters}
        onFiltersChange={onFiltersChange}
      />
    );

    await user.selectOptions(screen.getByLabelText("Estado"), "approved");

    expect(onFiltersChange).toHaveBeenCalledWith({
      ...defaultFilters,
      status: "approved",
    });
  });

  it("should call onFiltersChange when priority changes", async () => {
    const user = userEvent.setup();
    const onFiltersChange = vi.fn();

    render(
      <RequestFilters
        filters={defaultFilters}
        onFiltersChange={onFiltersChange}
      />
    );

    await user.selectOptions(screen.getByLabelText("Prioridad"), "critical");

    expect(onFiltersChange).toHaveBeenCalledWith({
      ...defaultFilters,
      priority: "critical",
    });
  });

  it("should call onFiltersChange when sort field changes", async () => {
    const user = userEvent.setup();
    const onFiltersChange = vi.fn();

    render(
      <RequestFilters
        filters={defaultFilters}
        onFiltersChange={onFiltersChange}
      />
    );

    await user.selectOptions(screen.getByLabelText("Ordenar por"), "priority");

    expect(onFiltersChange).toHaveBeenCalledWith({
      ...defaultFilters,
      sortBy: "priority",
    });
  });

  it("should reset filters when clear button is clicked", async () => {
    const user = userEvent.setup();
    const onFiltersChange = vi.fn();

    render(
      <RequestFilters
        filters={{
          search: "abc",
          status: "approved",
          priority: "critical",
          sortBy: "priority",
          sortDirection: "asc",
        }}
        onFiltersChange={onFiltersChange}
      />
    );

    await user.click(screen.getByRole("button", { name: /limpiar/i }));

    expect(onFiltersChange).toHaveBeenCalledWith(defaultFilters);
  });
});