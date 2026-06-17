import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

import { cn } from "@/shared/utils";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  children: ReactNode;
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 focus:ring-brand-100 disabled:bg-brand-300",
  secondary:
    "border border-border-subtle bg-surface-card text-text-primary hover:bg-surface-muted focus:ring-brand-100 disabled:bg-surface-muted disabled:text-text-muted",
  danger:
    "bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-50 disabled:bg-danger-300",
  ghost:
    "bg-transparent text-text-primary hover:bg-surface-muted focus:ring-brand-100 disabled:text-text-muted",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-10 px-4 text-sm",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      type = "button",
      asChild = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const buttonClassName = cn(
      "inline-flex items-center justify-center gap-2 rounded-control font-medium transition-colors",
      "focus:outline-none focus:ring-2",
      "disabled:cursor-not-allowed",
      buttonVariants[variant],
      buttonSizes[size],
      className
    );

    if (asChild && isValidElement(children)) {
      const child = children as ReactElement<{
        className?: string;
        children?: ReactNode;
      }>;

      return cloneElement(child, {
        className: cn(buttonClassName, child.props.className),
        children: child.props.children,
      });
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={buttonClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";