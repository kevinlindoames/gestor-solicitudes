import { RequestDetailPage } from "@/features/requests/components";
import { Container, PageHeader } from "@/shared/components";

interface SolicitudDetailRouteProps {
  params: {
    id: string;
  };
}

export default function SolicitudDetailRoute({
  params,
}: SolicitudDetailRouteProps) {
  return (
    <main>
      <Container className="space-y-6">
        <PageHeader
          title="Detalle de solicitud"
          description="Consulta la información completa y el estado actual de la solicitud."
        />

        <RequestDetailPage requestId={params.id} />
      </Container>
    </main>
  );
}