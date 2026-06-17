import { z } from "zod";

import type { RequestPriority, RequestStatus } from "@/features/requests/types";

const categoryValues: [string, ...string[]] = [
  "Accesos",
  "Soporte técnico",
  "Recursos humanos",
  "Infraestructura",
  "Compras",
  "Finanzas",
  "Legal",
  "Otros",
];

const priorityValues: [RequestPriority, ...RequestPriority[]] = [
  "low",
  "medium",
  "high",
  "critical",
];

const statusValues: [RequestStatus, ...RequestStatus[]] = [
  "pending",
  "in_review",
  "approved",
  "rejected",
  "closed",
];

export const requestFormSchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres.")
    .max(80, "El título no debe superar los 80 caracteres."),
  description: z
    .string()
    .min(10, "La descripción debe tener al menos 10 caracteres.")
    .max(500, "La descripción no debe superar los 500 caracteres."),
  requester: z
    .string()
    .min(3, "El solicitante debe tener al menos 3 caracteres.")
    .max(80, "El solicitante no debe superar los 80 caracteres."),
  category: z.enum(categoryValues, {
    required_error: "Selecciona una categoría.",
  }),
  priority: z.enum(priorityValues, {
    required_error: "Selecciona una prioridad.",
  }),
  status: z.enum(statusValues, {
    required_error: "Selecciona un estado.",
  }),
});

export type RequestFormValues = z.infer<typeof requestFormSchema>;