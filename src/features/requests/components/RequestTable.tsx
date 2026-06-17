import Link from "next/link";
import { Eye, Pencil } from "lucide-react";

import {
  RequestPriorityBadge,
  RequestStatusBadge,
} from "@/features/requests/components";
import type { Request } from "@/features/requests/types";
import { Button, Card } from "@/shared/components";
import { formatDate } from "@/shared/utils";

interface RequestTableProps {
  requests: Request[];
}

export function RequestTable({ requests }: RequestTableProps) {
  return (
    <Card className="overflow-hidden">
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-surface-muted text-xs uppercase tracking-wide text-text-muted">
            <tr>
              <th className="px-5 py-3 font-semibold">ID</th>
              <th className="px-5 py-3 font-semibold">Solicitud</th>
              <th className="px-5 py-3 font-semibold">Solicitante</th>
              <th className="px-5 py-3 font-semibold">Categoría</th>
              <th className="px-5 py-3 font-semibold">Prioridad</th>
              <th className="px-5 py-3 font-semibold">Estado</th>
              <th className="px-5 py-3 font-semibold">Creación</th>
              <th className="px-5 py-3 text-right font-semibold">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border-subtle">
            {requests.map((request) => (
              <tr key={request.id} className="bg-surface-card hover:bg-surface-muted">
                <td className="whitespace-nowrap px-5 py-4 font-medium text-text-primary">
                  {request.id}
                </td>

                <td className="px-5 py-4">
                  <p className="font-medium text-text-primary">{request.title}</p>
                  <p className="mt-1 line-clamp-1 max-w-xs text-xs text-text-muted">
                    {request.description}
                  </p>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-text-secondary">
                  {request.requester}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-text-secondary">
                  {request.category}
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <RequestPriorityBadge priority={request.priority} />
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <RequestStatusBadge status={request.status} />
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-text-secondary">
                  {formatDate(request.creationDate)}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Button asChild variant="secondary" size="sm">
                      <Link
                        href={`/solicitudes/${request.id}`}
                        aria-label={`Ver detalle de ${request.id}`}
                      >
                        <Eye className="h-4 w-4" aria-hidden="true" />
                        Ver
                      </Link>
                    </Button>

                    <Button asChild variant="ghost" size="sm">
                      <Link
                        href={`/solicitudes/${request.id}/editar`}
                        aria-label={`Editar solicitud ${request.id}`}
                      >
                        <Pencil className="h-4 w-4" aria-hidden="true" />
                        Editar
                      </Link>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divide-y divide-border-subtle md:hidden">
        {requests.map((request) => (
          <article key={request.id} className="space-y-4 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-text-muted">{request.id}</p>
                <h3 className="mt-1 font-semibold text-text-primary">
                  {request.title}
                </h3>
                <p className="mt-1 text-sm text-text-secondary">
                  {request.requester}
                </p>
              </div>

              <RequestStatusBadge status={request.status} />
            </div>

            <p className="line-clamp-2 text-sm text-text-secondary">
              {request.description}
            </p>

            <div className="flex flex-wrap gap-2">
              <RequestPriorityBadge priority={request.priority} />
              <span className="rounded-full border border-border-subtle px-2.5 py-0.5 text-xs text-text-secondary">
                {request.category}
              </span>
              <span className="rounded-full border border-border-subtle px-2.5 py-0.5 text-xs text-text-secondary">
                {formatDate(request.creationDate)}
              </span>
            </div>

            <div className="flex gap-2">
              <Button asChild variant="secondary" size="sm" className="flex-1">
                <Link
                  href={`/solicitudes/${request.id}`}
                  aria-label={`Ver detalle de ${request.id}`}
                >
                  Ver
                </Link>
              </Button>

              <Button asChild variant="ghost" size="sm" className="flex-1">
                <Link
                  href={`/solicitudes/${request.id}/editar`}
                  aria-label={`Editar solicitud ${request.id}`}
                >
                  Editar
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}   