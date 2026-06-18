import { Card, Skeleton } from "@/shared/components";

export function RequestTableSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="hidden md:block">
        <div className="grid grid-cols-8 gap-4 border-b border-border-subtle bg-surface-muted px-5 py-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-4" />
          ))}
        </div>

        <div className="divide-y divide-border-subtle">
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-8 gap-4 px-5 py-4">
              {Array.from({ length: 8 }).map((_, cellIndex) => (
                <Skeleton key={cellIndex} className="h-5" />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="divide-y divide-border-subtle md:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-4 p-5">
            <div className="flex justify-between gap-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />

            <div className="flex gap-2">
              <Skeleton className="h-7 w-20 rounded-full" />
              <Skeleton className="h-7 w-24 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}