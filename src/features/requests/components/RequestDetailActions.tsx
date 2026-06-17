"use client";

import { useRouter } from "next/navigation";
import { Archive, AlertTriangle } from "lucide-react";

import { REQUEST_FORM_PRIORITY_OPTIONS } from "@/features/requests/constants";
import {
  useCloseRequest,
  useUpdateRequestPriority,
} from "@/features/requests/hooks";
import type { Request, RequestPriority } from "@/features/requests/types";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  useToast,
} from "@/shared/components";

interface RequestDetailActionsProps {
  request: Request;
}

export function RequestDetailActions({ request }: RequestDetailActionsProps) {
  const router = useRouter();
  const toast = useToast();

  const updatePriorityMutation = useUpdateRequestPriority();
  const closeRequestMutation = useCloseRequest();

  const isClosed = request.status === "closed";

  const isUpdating =
    updatePriorityMutation.isPending || closeRequestMutation.isPending;

  function handlePriorityChange(priority: RequestPriority) {
    if (priority === request.priority) return;

    updatePriorityMutation.mutate(
      {
        id: request.id,
        payload: {
          priority,
        },
      },
      {
        onSuccess: (updatedRequest) => {
          toast.success(
            "Prioridad actualizada correctamente",
            "La prioridad de la solicitud fue actualizada."
          );

          router.push(`/solicitudes/${updatedRequest.id}`);
        },
      }
    );
  }

  function handleCloseRequest() {
    const shouldClose = window.confirm(
      "¿Seguro que deseas cerrar esta solicitud?"
    );

    if (!shouldClose) return;

    closeRequestMutation.mutate(
      {
        id: request.id,
      },
      {
        onSuccess: (closedRequest) => {
          toast.success(
            "Solicitud cerrada correctamente",
            "La solicitud fue marcada como cerrada."
          );

          router.push(`/solicitudes/${closedRequest.id}`);
        },
      }
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones rápidas</CardTitle>
        <CardDescription>
          Actualiza la prioridad o cierra la solicitud desde el detalle.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Select
          id="request-priority-action"
          name="request-priority-action"
          label="Cambiar prioridad"
          value={request.priority}
          disabled={isUpdating || isClosed}
          onChange={(event) =>
            handlePriorityChange(event.target.value as RequestPriority)
          }
        >
          {REQUEST_FORM_PRIORITY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>

        <Button
          type="button"
          variant="danger"
          className="w-full"
          disabled={isUpdating || isClosed}
          onClick={handleCloseRequest}
        >
          <Archive className="h-4 w-4" aria-hidden="true" />
          {isClosed ? "Solicitud cerrada" : "Cerrar solicitud"}
        </Button>

        {updatePriorityMutation.isError || closeRequestMutation.isError ? (
          <div className="flex gap-2 rounded-card border border-danger-600 bg-danger-50 p-3 text-sm text-danger-700">
            <AlertTriangle
              className="mt-0.5 h-4 w-4 shrink-0"
              aria-hidden="true"
            />
            <p>No se pudo completar la acción. Intenta nuevamente.</p>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
}