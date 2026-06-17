"use client";

import { useRouter } from "next/navigation";

import { RequestForm } from "@/features/requests/components/RequestForm";
import { useRequest, useUpdateRequest } from "@/features/requests/hooks";
import type { RequestFormValues } from "@/features/requests/schemas";
import type { UpdateRequestPayload } from "@/features/requests/types";
import {
  Container,
  ErrorState,
  LoadingState,
  PageHeader,
  useToast,
} from "@/shared/components";

interface EditRequestPageProps {
  requestId: string;
}

export function EditRequestPage({ requestId }: EditRequestPageProps) {
  const router = useRouter();
  const toast = useToast();

  const {
    data: request,
    isLoading,
    isError,
    refetch,
  } = useRequest({
    id: requestId,
  });

  const updateRequestMutation = useUpdateRequest();

  function handleSubmit(values: RequestFormValues) {
    if (!request) return;

    const payload: UpdateRequestPayload = {
      title: values.title,
      description: values.description,
      requester: values.requester,
      category: values.category,
      priority: values.priority,
      status: values.status,
    };

    updateRequestMutation.mutate(
      {
        id: request.id,
        payload,
      },
      {
        onSuccess: (updatedRequest) => {
          toast.success(
            "Solicitud actualizada correctamente",
            "Los cambios fueron guardados y reflejados en el detalle."
          );

          router.push(`/solicitudes/${updatedRequest.id}`);
        },
      }
    );
  }

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
        <PageHeader
          title="Editar solicitud"
          description={`Actualiza la información de la solicitud ${request.id}.`}
          actionLabel="Volver al detalle"
          actionHref={`/solicitudes/${request.id}`}
        />

        {updateRequestMutation.isError ? (
          <ErrorState
            title="No se pudo actualizar la solicitud"
            description="Ocurrió un problema al guardar los cambios. Intenta nuevamente."
          />
        ) : null}

        <RequestForm
          mode="edit"
          request={request}
          isSubmitting={updateRequestMutation.isPending}
          onSubmit={handleSubmit}
        />
      </div>
    </Container>
  );
}