import Link from "next/link";
import type { ReactNode } from "react";

import { Button } from "@/shared/components/Button";
import { cn } from "@/shared/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function PageHeader({
  title,
  description,
  actions,
  actionLabel,
  actionHref,
  className,
}: PageHeaderProps) {
  const shouldShowSimpleAction = Boolean(actionLabel && actionHref);

  return (
    <header
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          {title}
        </h1>

        {description ? (
          <p className="max-w-3xl text-sm leading-6 text-text-secondary sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      {actions ? (
        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
          {actions}
        </div>
      ) : null}

      {!actions && shouldShowSimpleAction && actionHref ? (
        <Button asChild variant="secondary" className="w-full sm:w-auto">
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
    </header>
  );
}