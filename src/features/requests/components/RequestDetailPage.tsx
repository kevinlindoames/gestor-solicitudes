"use client";

import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";

import { RequestDetailActions } from "@/features/requests/components/RequestDetailActions";
import {
  RequestPriorityBadge,
  RequestStatusBadge,
} from "@/features/requests/components";
import { useRequest } from "@/features/requests/hooks";
import { formatDate } from "@/shared/utils";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  ErrorState,
  LoadingState,
} from "@/shared/components";

interface RequestDetailPageProps {
  requestId: string;
}

export function RequestDetailPage({ requestId }: RequestDetailPageProps) {
  const {
    data: request,
    isLoading,
    isError,
    refetch,
  } = useRequest({
    id: requestId,
  });

  if (isLoading) {
    return (
      <Container className="py-8">
        <LoadingState message="Cargando solicitud..." />
      </Container>
    );
  }

  if (isError || !request) {
    return (
      <Container className="py-8">
        <ErrorState
          title="No se pudo cargar la solicitud"
          description="La solicitud no existe o ocurrió un problema al obtener la información."
          actionLabel="Intentar nuevamente"
          onAction={() => refetch()}
        />
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button asChild variant="secondary">
            <Link href="/solicitudes">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Volver a solicitudes
            </Link>
          </Button>

          <Button asChild>
            <Link href={`/solicitudes/${request.id}/editar`}>
              <Edit className="h-4 w-4" aria-hidden="true" />
              Editar solicitud
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <CardTitle>{request.title}</CardTitle>
                <CardDescription>{request.id}</CardDescription>
              </div>

              <div className="flex flex-wrap gap-2">
                <RequestStatusBadge status={request.status} />
                <RequestPriorityBadge priority={request.priority} />
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <section className="space-y-2">
              <h2 className="text-sm font-semibold text-text-primary">
                Descripción
              </h2>
              <p className="text-sm leading-6 text-text-secondary">
                {request.description}
              </p>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-card border border-border-subtle bg-surface-muted p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Solicitante
                </p>
                <p className="mt-1 text-sm font-semibold text-text-primary">
                  {request.requester}
                </p>
              </div>

              <div className="rounded-card border border-border-subtle bg-surface-muted p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Categoría
                </p>
                <p className="mt-1 text-sm font-semibold text-text-primary">
                  {request.category}
                </p>
              </div>

              <div className="rounded-card border border-border-subtle bg-surface-muted p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Fecha de creación
                </p>
                <p className="mt-1 text-sm font-semibold text-text-primary">
                  {formatDate(request.creationDate)}
                </p>
              </div>

              <div className="rounded-card border border-border-subtle bg-surface-muted p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                  Última actualización
                </p>
                <p className="mt-1 text-sm font-semibold text-text-primary">
                  {formatDate(request.lastChangeDate)}
                </p>
              </div>
            </section>
          </CardContent>
        </Card>

        <RequestDetailActions request={request} />
      </div>
    </Container>
  );
}