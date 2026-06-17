import { AlertTriangle } from "lucide-react";

import { Button } from "@/shared/components/Button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void | Promise<unknown>;
  onRetry?: () => void | Promise<unknown>;
}

export function ErrorState({
  title = "Ocurrió un error",
  description = "No se pudo completar la operación. Intenta nuevamente.",
  actionLabel = "Intentar nuevamente",
  onAction,
  onRetry,
}: ErrorStateProps) {
  const actionHandler = onAction ?? onRetry;
  const shouldShowAction = Boolean(actionHandler);

  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-card border border-danger-600 bg-danger-50 p-8 text-center text-danger-700">
      <AlertTriangle className="h-8 w-8" aria-hidden="true" />

      <div className="space-y-1">
        <h2 className="text-base font-semibold">{title}</h2>
        <p className="max-w-md text-sm">{description}</p>
      </div>

      {shouldShowAction ? (
        <Button
          type="button"
          variant="danger"
          onClick={() => {
            void actionHandler?.();
          }}
        >
          {actionLabel}
        </Button>
      ) : null}
    </div>
  );
}