import { forwardRef, type SelectHTMLAttributes } from "react";

import { cn } from "@/shared/utils";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, id, name, children, ...props }, ref) => {
    const selectId = id ?? name;

    return (
      <div className="space-y-1.5">
        {label ? (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-text-primary"
          >
            {label}
          </label>
        ) : null}

        <select
          id={selectId}
          name={name}
          ref={ref}
          className={cn(
            "h-10 w-full rounded-control border border-border-subtle bg-surface-card px-3 text-sm text-text-primary transition-colors",
            "focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100",
            "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-text-muted",
            error &&
              "border-danger-600 focus:border-danger-600 focus:ring-danger-50",
            className
          )}
          {...props}
        >
          {children}
        </select>

        {error ? <p className="text-xs text-danger-700">{error}</p> : null}
      </div>
    );
  }
);

Select.displayName = "Select";