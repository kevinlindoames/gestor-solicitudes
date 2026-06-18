import { RequestTableSkeleton } from "@/features/requests/components";
import { Card, Skeleton } from "@/shared/components";

export function RequestsListSkeleton() {
  return (
    <div className="space-y-5">
      <Card className="space-y-4 p-5">
        <div className="grid gap-4 md:grid-cols-4">
          <Skeleton className="h-10 md:col-span-2" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-9 w-36" />
      </div>

      <RequestTableSkeleton />
    </div>
  );
}