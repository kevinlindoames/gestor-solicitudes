"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  REQUEST_CATEGORIES,
  REQUEST_FORM_PRIORITY_OPTIONS,
  REQUEST_FORM_STATUS_OPTIONS,
} from "@/features/requests/constants";
import {
  requestFormSchema,
  type RequestFormValues,
} from "@/features/requests/schemas";
import type { Request } from "@/features/requests/types";
import {
  Button,
  Card,
  CardContent,
  Input,
  Select,
  Textarea,
} from "@/shared/components";

type RequestFormMode = "create" | "edit";

interface RequestFormProps {
  mode?: RequestFormMode;
  request?: Request;
  defaultValues?: RequestFormValues;
  submitLabel?: string;
  isSubmitting?: boolean;
  onSubmit: (values: RequestFormValues) => void;
}

const createDefaultValues: RequestFormValues = {
  title: "",
  description: "",
  requester: "",
  category: "Soporte técnico",
  priority: "medium",
  status: "pending",
};

function getDefaultValues(
  mode: RequestFormMode,
  request?: Request,
  defaultValues?: RequestFormValues
): RequestFormValues {
  if (defaultValues) return defaultValues;

  if (mode === "edit" && request) {
    return {
      title: request.title,
      description: request.description,
      requester: request.requester,
      category: request.category,
      priority: request.priority,
      status: request.status,
    };
  }

  return createDefaultValues;
}

function getSubmitLabel(mode: RequestFormMode, submitLabel?: string): string {
  if (submitLabel) return submitLabel;

  return mode === "edit" ? "Guardar cambios" : "Crear solicitud";
}

export function RequestForm({
  mode = "create",
  request,
  defaultValues,
  submitLabel,
  isSubmitting = false,
  onSubmit,
}: RequestFormProps) {
  const resolvedDefaultValues = getDefaultValues(mode, request, defaultValues);
  const resolvedSubmitLabel = getSubmitLabel(mode, submitLabel);
  const shouldShowStatusField = mode === "edit";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RequestFormValues>({
    resolver: zodResolver(requestFormSchema),
    defaultValues: resolvedDefaultValues,
  });

  return (
    <Card>
      <CardContent className="pt-6">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Título"
            placeholder="Ej. Solicitud de acceso a sistema"
            error={errors.title?.message}
            {...register("title")}
          />

          <Textarea
            label="Descripción"
            placeholder="Describe el motivo de la solicitud..."
            rows={5}
            error={errors.description?.message}
            {...register("description")}
          />

          <Input
            label="Solicitante"
            placeholder="Ej. Kevin Lindo"
            error={errors.requester?.message}
            {...register("requester")}
          />

          <div className="grid gap-5 md:grid-cols-2">
            <Select
              label="Categoría"
              error={errors.category?.message}
              {...register("category")}
            >
              {REQUEST_CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>

            <Select
              label="Prioridad"
              error={errors.priority?.message}
              {...register("priority")}
            >
              {REQUEST_FORM_PRIORITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>

          {shouldShowStatusField ? (
            <Select
              label="Estado"
              error={errors.status?.message}
              {...register("status")}
            >
              {REQUEST_FORM_STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          ) : (
            <input type="hidden" value="pending" {...register("status")} />
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : resolvedSubmitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}