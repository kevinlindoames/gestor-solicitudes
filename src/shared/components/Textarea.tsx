import { forwardRef, type TextareaHTMLAttributes } from "react";

import { cn } from "@/shared/utils";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, name, ...props }, ref) => {
    const textareaId = id ?? name;

    return (
      <div className="space-y-1.5">
        {label ? (
          <label
            htmlFor={textareaId}
            className="text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        ) : null}

        <textarea
          id={textareaId}
          name={name}
          ref={ref}
          className={cn(
            "min-h-28 w-full rounded-control border border-border-subtle bg-surface-card px-3 py-2 text-sm text-text-primary placeholder:text-text-muted transition-colors",
            "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100",
            "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-muted",
            error && "border-danger-600 focus:border-danger-600 focus:ring-danger-50",
            className
          )}
          {...props}
        />

        {error ? <p className="text-xs text-danger-700">{error}</p> : null}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";