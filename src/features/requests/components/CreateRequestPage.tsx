"use client";

import { useRouter } from "next/navigation";

import { RequestForm } from "@/features/requests/components/RequestForm";
import { useCreateRequest } from "@/features/requests/hooks";
import type { RequestFormValues } from "@/features/requests/schemas";
import type { CreateRequestPayload } from "@/features/requests/types";
import {
  Container,
  ErrorState,
  PageHeader,
  useToast,
} from "@/shared/components";

export function CreateRequestPage() {
  const router = useRouter();
  const toast = useToast();
  const createRequestMutation = useCreateRequest();

  function handleSubmit(values: RequestFormValues) {
    const payload: CreateRequestPayload = {
      title: values.title,
      description: values.description,
      requester: values.requester,
      category: values.category,
      priority: values.priority,
    };

    createRequestMutation.mutate(payload, {
      onSuccess: (createdRequest) => {
        toast.success(
          "Solicitud creada correctamente",
          "La solicitud fue registrada y ya está disponible para seguimiento."
        );

        router.push(`/solicitudes/${createdRequest.id}`);
      },
    });
  }

  return (
    <Container className="py-8">
      <div className="space-y-6">
        <PageHeader
          title="Crear solicitud"
          description="Registra una nueva solicitud para que pueda ser revisada y gestionada."
          actionLabel="Volver a solicitudes"
          actionHref="/solicitudes"
        />

        {createRequestMutation.isError ? (
          <ErrorState
            title="No se pudo crear la solicitud"
            description="Ocurrió un problema al registrar la solicitud. Intenta nuevamente."
          />
        ) : null}

        <RequestForm
          mode="create"
          isSubmitting={createRequestMutation.isPending}
          onSubmit={handleSubmit}
        />
      </div>
    </Container>
  );
}