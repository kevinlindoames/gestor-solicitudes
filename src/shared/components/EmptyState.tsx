import type { ReactNode } from "react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function EmptyState({
  title = "Sin resultados",
  description = "No encontramos información para mostrar.",
  action,
}: EmptyStateProps) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-card border border-dashed border-border-strong bg-surface-card p-8 text-center">
      <Inbox className="h-8 w-8 text-text-muted" aria-hidden="true" />

      <h2 className="mt-4 text-base font-semibold text-text-primary">{title}</h2>
      <p className="mt-1 max-w-md text-sm text-text-secondary">{description}</p>

      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}