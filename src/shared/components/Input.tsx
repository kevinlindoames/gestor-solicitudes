import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/shared/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, name, ...props }, ref) => {
    const inputId = id ?? name;

    return (
      <div className="space-y-1.5">
        {label ? (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        ) : null}

        <input
          id={inputId}
          name={name}
          ref={ref}
          className={cn(
            "h-10 w-full rounded-control border border-border-subtle bg-surface-card px-3 text-sm text-text-primary placeholder:text-text-muted transition-colors",
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

Input.displayName = "Input";