"use client";

import Link from "next/link";
import { ArrowRight, Plus } from "lucide-react";

import {
  RequestPriorityBadge,
  RequestsDashboardSkeleton,
  RequestStatusBadge,
  RequestSummaryCards,
} from "@/features/requests/components";
import { useRequests } from "@/features/requests/hooks";
import { getRequestSummary } from "@/features/requests/utils";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  EmptyState,
  ErrorState,
} from "@/shared/components";
import { formatDate } from "@/shared/utils";

export function RequestsDashboard() {
  const { data: requests = [], isLoading, isError, refetch } = useRequests();

  if (isLoading) {
  return <RequestsDashboardSkeleton />;
}

  if (isError) {
    return (
      <ErrorState
        title="No se pudo cargar el dashboard"
        description="Ocurrió un problema al obtener las solicitudes."
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  const summary = getRequestSummary(requests);
  const latestRequests = requests.slice(0, 5);

  return (
    <div className="space-y-6">
      <RequestSummaryCards summary={summary} />

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Últimas solicitudes</CardTitle>
                <CardDescription>
                  Solicitudes registradas recientemente en la organización.
                </CardDescription>
              </div>

              <Link href="/solicitudes">
                <Button variant="secondary" size="sm">
                  Ver bandeja
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              </Link>
            </div>
          </CardHeader>

          <CardContent>
            {latestRequests.length > 0 ? (
              <div className="divide-y divide-border-subtle">
                {latestRequests.map((request) => (
                  <article
                    key={request.id}
                    className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="text-xs font-medium text-text-muted">
                        {request.id} · {formatDate(request.creationDate)}
                      </p>
                      <h3 className="mt-1 font-semibold text-text-primary">
                        {request.title}
                      </h3>
                      <p className="mt-1 text-sm text-text-secondary">
                        {request.requester} · {request.category}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <RequestPriorityBadge priority={request.priority} />
                      <RequestStatusBadge status={request.status} />
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No hay solicitudes recientes"
                description="Cuando se registren solicitudes, aparecerán en esta sección."
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Acciones rápidas</CardTitle>
            <CardDescription>
              Gestiona el flujo principal de solicitudes internas.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Link href="/solicitudes/nueva" className="block">
              <Button className="w-full justify-between">
                Nueva solicitud
                <Plus className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>

            <Link href="/solicitudes" className="block">
              <Button variant="secondary" className="w-full justify-between">
                Ir a bandeja
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Link>

            <div className="rounded-card border border-border-subtle bg-surface-muted p-4">
              <p className="text-sm font-medium text-text-primary">
                Flujo soportado
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                Registro, consulta, edición, actualización de prioridad y cierre
                lógico de solicitudes.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}