import { Card, Container, PageHeader, Skeleton } from "@/shared/components";

export default function CreateRequestLoadingPage() {
  return (
    <Container>
      <PageHeader
        title="Nueva solicitud"
        description="Registra una nueva solicitud para su revisión y seguimiento."
      />

      <Card className="space-y-5 p-6">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-full" />

        <div className="grid gap-5 md:grid-cols-2">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>

        <div className="flex justify-end">
          <Skeleton className="h-10 w-36" />
        </div>
      </Card>
    </Container>
  );
}