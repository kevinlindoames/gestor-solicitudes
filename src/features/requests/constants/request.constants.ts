import type { RequestPriority, RequestStatus } from "@/features/requests/types";

export const REQUEST_STATUS = {
  PENDING: "pending",
  IN_REVIEW: "in_review",
  APPROVED: "approved",
  REJECTED: "rejected",
  CLOSED: "closed",
} as const satisfies Record<string, RequestStatus>;

export const REQUEST_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
} as const satisfies Record<string, RequestPriority>;

export const REQUEST_STATUS_LABELS: Record<RequestStatus, string> = {
  pending: "Pendiente",
  in_review: "En revisión",
  approved: "Aprobada",
  rejected: "Rechazada",
  closed: "Cerrada",
};

export const REQUEST_PRIORITY_LABELS: Record<RequestPriority, string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
  critical: "Crítica",
};

export const REQUEST_CATEGORIES = [
  "Accesos",
  "Soporte técnico",
  "Recursos humanos",
  "Infraestructura",
  "Compras",
  "Finanzas",
  "Legal",
  "Otros",
] as const;

export const REQUEST_STATUS_OPTIONS = [
  {
    value: "all",
    label: "Todos los estados",
  },
  {
    value: REQUEST_STATUS.PENDING,
    label: REQUEST_STATUS_LABELS.pending,
  },
  {
    value: REQUEST_STATUS.IN_REVIEW,
    label: REQUEST_STATUS_LABELS.in_review,
  },
  {
    value: REQUEST_STATUS.APPROVED,
    label: REQUEST_STATUS_LABELS.approved,
  },
  {
    value: REQUEST_STATUS.REJECTED,
    label: REQUEST_STATUS_LABELS.rejected,
  },
  {
    value: REQUEST_STATUS.CLOSED,
    label: REQUEST_STATUS_LABELS.closed,
  },
] as const;

export const REQUEST_PRIORITY_OPTIONS = [
  {
    value: "all",
    label: "Todas las prioridades",
  },
  {
    value: REQUEST_PRIORITY.LOW,
    label: REQUEST_PRIORITY_LABELS.low,
  },
  {
    value: REQUEST_PRIORITY.MEDIUM,
    label: REQUEST_PRIORITY_LABELS.medium,
  },
  {
    value: REQUEST_PRIORITY.HIGH,
    label: REQUEST_PRIORITY_LABELS.high,
  },
  {
    value: REQUEST_PRIORITY.CRITICAL,
    label: REQUEST_PRIORITY_LABELS.critical,
  },
] as const;

export const REQUEST_FORM_PRIORITY_OPTIONS = [
  {
    value: REQUEST_PRIORITY.LOW,
    label: REQUEST_PRIORITY_LABELS.low,
  },
  {
    value: REQUEST_PRIORITY.MEDIUM,
    label: REQUEST_PRIORITY_LABELS.medium,
  },
  {
    value: REQUEST_PRIORITY.HIGH,
    label: REQUEST_PRIORITY_LABELS.high,
  },
  {
    value: REQUEST_PRIORITY.CRITICAL,
    label: REQUEST_PRIORITY_LABELS.critical,
  },
] as const;

export const REQUEST_FORM_STATUS_OPTIONS = [
  {
    value: REQUEST_STATUS.PENDING,
    label: REQUEST_STATUS_LABELS.pending,
  },
  {
    value: REQUEST_STATUS.IN_REVIEW,
    label: REQUEST_STATUS_LABELS.in_review,
  },
  {
    value: REQUEST_STATUS.APPROVED,
    label: REQUEST_STATUS_LABELS.approved,
  },
  {
    value: REQUEST_STATUS.REJECTED,
    label: REQUEST_STATUS_LABELS.rejected,
  },
  {
    value: REQUEST_STATUS.CLOSED,
    label: REQUEST_STATUS_LABELS.closed,
  },
] as const;