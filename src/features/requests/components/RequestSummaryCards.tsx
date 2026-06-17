import {
  CheckCircle2,
  Clock,
  FileText,
  SearchCheck,
  ShieldX,
  XCircle,
} from "lucide-react";

import type { RequestSummary } from "@/features/requests/types";
import { Card, CardContent } from "@/shared/components";
import { cn } from "@/shared/utils";

interface RequestSummaryCardsProps {
  summary: RequestSummary;
}

interface SummaryCardItem {
  label: string;
  value: number;
  description: string;
  icon: typeof FileText;
  className: string;
}

export function RequestSummaryCards({ summary }: RequestSummaryCardsProps) {
  const items: SummaryCardItem[] = [
    {
      label: "Total",
      value: summary.total,
      description: "Solicitudes registradas",
      icon: FileText,
      className: "text-brand-600 bg-brand-50",
    },
    {
      label: "Pendientes",
      value: summary.pending,
      description: "Esperando atención",
      icon: Clock,
      className: "text-warning-700 bg-warning-50",
    },
    {
      label: "En revisión",
      value: summary.inReview,
      description: "En proceso de evaluación",
      icon: SearchCheck,
      className: "text-brand-700 bg-brand-50",
    },
    {
      label: "Aprobadas",
      value: summary.approved,
      description: "Solicitudes aprobadas",
      icon: CheckCircle2,
      className: "text-success-700 bg-success-50",
    },
    {
      label: "Rechazadas",
      value: summary.rejected,
      description: "No procedieron",
      icon: XCircle,
      className: "text-danger-700 bg-danger-50",
    },
    {
      label: "Cerradas",
      value: summary.closed,
      description: "Finalizadas",
      icon: ShieldX,
      className: "text-slate-700 bg-slate-100",
    },
  ];

  return (
    <section
      aria-label="Resumen de solicitudes"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.label}>
            <CardContent className="flex items-center gap-4">
              <div
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full",
                  item.className
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>

              <div>
                <p className="text-sm font-medium text-text-secondary">
                  {item.label}
                </p>
                <p className="mt-1 text-2xl font-bold text-text-primary">
                  {item.value}
                </p>
                <p className="mt-1 text-xs text-text-muted">
                  {item.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}