import { RequestTableSkeleton } from "@/features/requests/components";
import { Card, Container, PageHeader, Skeleton } from "@/shared/components";

export default function RequestsLoadingPage() {
  return (
    <Container>
      <PageHeader
        title="Bandeja de solicitudes"
        description="Consulta, filtra y gestiona las solicitudes registradas."
        actionLabel="Nueva solicitud"
        actionHref="/solicitudes/nueva"
      />

      <div className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="space-y-3 p-5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-32" />
          </Card>
        ))}
      </div>

      <Card className="mt-6 space-y-4 p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <Skeleton className="h-10 md:col-span-2" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      </Card>

      <div className="mt-6">
        <RequestTableSkeleton />
      </div>
    </Container>
  );
}