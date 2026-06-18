import { Card, Container, PageHeader, Skeleton } from "@/shared/components";

export default function RequestDetailLoadingPage() {
  return (
    <Container>
      <PageHeader
        title="Detalle de solicitud"
        description="Consulta la información completa de la solicitud."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Card className="space-y-5 p-6">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-24 w-full" />

          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
            <Skeleton className="h-16" />
          </div>
        </Card>

        <Card className="space-y-4 p-6">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </Card>
      </div>
    </Container>
  );
}