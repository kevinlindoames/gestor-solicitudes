import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { CreateRequestPage } from "@/features/requests/components";
import { Button, Container, PageHeader } from "@/shared/components";

export default function NuevaSolicitudPage() {
  return (
    <main>
      <Container className="space-y-6">
        <PageHeader
          title="Nueva solicitud"
          description="Registra una nueva solicitud interna con la información necesaria para su atención."
          actions={
            <Button asChild variant="secondary">
              <Link href="/solicitudes">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Volver a bandeja
              </Link>
            </Button>
          }
        />

        <CreateRequestPage />
      </Container>
    </main>
  );
}