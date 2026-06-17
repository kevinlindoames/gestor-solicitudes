import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { EditRequestPage } from "@/features/requests/components";
import { Button, Container, PageHeader } from "@/shared/components";

interface EditSolicitudRouteProps {
  params: {
    id: string;
  };
}

export default function EditSolicitudRoute({
  params,
}: EditSolicitudRouteProps) {
  return (
    <main>
      <Container className="space-y-6">
        <PageHeader
          title="Editar solicitud"
          description="Actualiza la información, prioridad y estado de la solicitud."
          actions={
            <Link href={`/solicitudes/${params.id}`}>
              <Button variant="secondary">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Volver al detalle
              </Button>
            </Link>
          }
        />

        <EditRequestPage requestId={params.id} />
      </Container>
    </main>
  );
}