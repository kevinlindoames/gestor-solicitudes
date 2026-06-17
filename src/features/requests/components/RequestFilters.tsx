import { RotateCcw, Search } from "lucide-react";

import {
  REQUEST_PRIORITY_OPTIONS,
  REQUEST_STATUS_OPTIONS,
} from "@/features/requests/constants";
import type { RequestFilters } from "@/features/requests/types";
import { Button, Card, CardContent, Input, Select } from "@/shared/components";

interface RequestFiltersProps {
  filters: RequestFilters;
  onFiltersChange: (filters: RequestFilters) => void;
}

const DEFAULT_FILTERS: RequestFilters = {
  search: "",
  status: "all",
  priority: "all",
  sortBy: "creationDate",
  sortDirection: "desc",
};

export function RequestFilters({
  filters,
  onFiltersChange,
}: RequestFiltersProps) {
  function updateFilters(partialFilters: Partial<RequestFilters>) {
    onFiltersChange({
      ...filters,
      ...partialFilters,
    });
  }

  function resetFilters() {
    onFiltersChange(DEFAULT_FILTERS);
  }

  return (
    <Card>
      <CardContent>
        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr_auto]">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-9 h-4 w-4 text-text-muted"
              aria-hidden="true"
            />

            <Input
              label="Buscar"
              name="search"
              placeholder="Buscar por ID, título, solicitante o categoría"
              value={filters.search}
              onChange={(event) =>
                updateFilters({
                  search: event.target.value,
                })
              }
              className="pl-9"
            />
          </div>

          <Select
            label="Estado"
            name="status"
            value={filters.status}
            onChange={(event) =>
              updateFilters({
                status: event.target.value as RequestFilters["status"],
              })
            }
          >
            {REQUEST_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            label="Prioridad"
            name="priority"
            value={filters.priority}
            onChange={(event) =>
              updateFilters({
                priority: event.target.value as RequestFilters["priority"],
              })
            }
          >
            {REQUEST_PRIORITY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Select
            label="Ordenar por"
            name="sortBy"
            value={filters.sortBy}
            onChange={(event) =>
              updateFilters({
                sortBy: event.target.value as RequestFilters["sortBy"],
              })
            }
          >
            <option value="creationDate">Fecha de creación</option>
            <option value="lastChangeDate">Última actualización</option>
            <option value="priority">Prioridad</option>
          </Select>

          <Select
            label="Dirección"
            name="sortDirection"
            value={filters.sortDirection}
            onChange={(event) =>
              updateFilters({
                sortDirection: event.target
                  .value as RequestFilters["sortDirection"],
              })
            }
          >
            <option value="desc">Descendente</option>
            <option value="asc">Ascendente</option>
          </Select>

          <div className="flex items-end">
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={resetFilters}
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              Limpiar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}