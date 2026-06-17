"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

import {
  RequestFilters,
  RequestTable,
} from "@/features/requests/components";
import { useRequests } from "@/features/requests/hooks";
import type { RequestFilters as RequestFiltersType } from "@/features/requests/types";
import { filterAndSortRequests } from "@/features/requests/utils";
import {
  Button,
  EmptyState,
  ErrorState,
  LoadingState,
} from "@/shared/components";

const DEFAULT_FILTERS: RequestFiltersType = {
  search: "",
  status: "all",
  priority: "all",
  sortBy: "creationDate",
  sortDirection: "desc",
};

export function RequestsListPage() {
  const [filters, setFilters] = useState<RequestFiltersType>(DEFAULT_FILTERS);

  const { data: requests = [], isLoading, isError, refetch } = useRequests();

  const filteredRequests = useMemo(
    () => filterAndSortRequests(requests, filters),
    [requests, filters]
  );

  if (isLoading) {
    return (
      <LoadingState
        title="Cargando solicitudes"
        description="Estamos obteniendo la bandeja de solicitudes."
      />
    );
  }

  if (isError) {
    return (
      <ErrorState
        title="No se pudo cargar la bandeja"
        description="Ocurrió un problema al obtener las solicitudes."
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  return (
    <div className="space-y-5">
      <RequestFilters filters={filters} onFiltersChange={setFilters} />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-text-secondary">
          Mostrando{" "}
          <span className="font-semibold text-text-primary">
            {filteredRequests.length}
          </span>{" "}
          de{" "}
          <span className="font-semibold text-text-primary">
            {requests.length}
          </span>{" "}
          solicitudes.
        </p>

        <Link href="/solicitudes/nueva">
          <Button size="sm">
            <Plus className="h-4 w-4" aria-hidden="true" />
            Nueva solicitud
          </Button>
        </Link>
      </div>

      {filteredRequests.length > 0 ? (
        <RequestTable requests={filteredRequests} />
      ) : (
        <EmptyState
          title="No encontramos solicitudes"
          description="Prueba ajustando la búsqueda, filtros u ordenamiento."
          action={
            <Button
              type="button"
              variant="secondary"
              onClick={() => setFilters(DEFAULT_FILTERS)}
            >
              Limpiar filtros
            </Button>
          }
        />
      )}
    </div>
  );
}