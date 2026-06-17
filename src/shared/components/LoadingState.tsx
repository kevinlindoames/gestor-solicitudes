import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  title?: string;
  description?: string;
  message?: string;
}

export function LoadingState({
  title = "Cargando información",
  description,
  message,
}: LoadingStateProps) {
  const resolvedDescription =
    description ?? message ?? "Estamos obteniendo la información solicitada.";

  return (
    <div className="flex min-h-64 flex-col items-center justify-center gap-3 rounded-card border border-border-subtle bg-surface-card p-8 text-center">
      <Loader2
        className="h-8 w-8 animate-spin text-brand-600"
        aria-hidden="true"
      />

      <div className="space-y-1">
        <h2 className="text-base font-semibold text-text-primary">{title}</h2>
        <p className="max-w-md text-sm text-text-secondary">
          {resolvedDescription}
        </p>
      </div>
    </div>
  );
}