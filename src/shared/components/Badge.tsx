import type { HTMLAttributes } from "react";

import { cn } from "@/shared/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "neutral" | "success" | "warning" | "danger" | "info";
}

const variantClasses: Record<NonNullable<BadgeProps["variant"]>, string> = {
  neutral: "border-slate-200 bg-slate-50 text-slate-700",
  success: "border-success-50 bg-success-50 text-success-700",
  warning: "border-warning-50 bg-warning-50 text-warning-700",
  danger: "border-danger-50 bg-danger-50 text-danger-700",
  info: "border-brand-100 bg-brand-50 text-brand-700",
};

export function Badge({
  className,
  variant = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
}