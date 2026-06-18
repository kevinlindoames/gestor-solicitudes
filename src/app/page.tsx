import Link from "next/link";
import { Plus } from "lucide-react";

import { RequestsDashboard } from "@/features/requests/components";
import { Button, Container, PageHeader } from "@/shared/components";

export default function HomePage() {
  return (
    <main>
      <Container className="space-y-6">
        <PageHeader
          title="Gestor de Solicitudes"
          description="Dashboard para registrar, consultar, actualizar y visualizar solicitudes internas de la organización."
          actions={
            <Button asChild>
              <Link href="/solicitudes/nueva">
                <Plus className="h-4 w-4" aria-hidden="true" />
                Nueva solicitud
              </Link>
            </Button>
          }
        />

        <RequestsDashboard />
      </Container>
    </main>
  );
}