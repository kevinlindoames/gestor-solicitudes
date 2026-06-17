import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { RequestsListPage } from "@/features/requests/components";
import { Button, Container, PageHeader } from "@/shared/components";

export default function SolicitudesPage() {
  return (
    <main>
      <Container className="space-y-6">
        <PageHeader
          title="Bandeja de solicitudes"
          description="Consulta, filtra, ordena y administra las solicitudes internas registradas."
          actions={
            <Link href="/">
              <Button variant="secondary">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Volver al dashboard
              </Button>
            </Link>
          }
        />

        <RequestsListPage />
      </Container>
    </main>
  );
}