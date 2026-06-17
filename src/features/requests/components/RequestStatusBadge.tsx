import {
  REQUEST_STATUS_BADGE_CLASSES,
  REQUEST_STATUS_LABELS,
} from "@/features/requests/constants";
import type { RequestStatus } from "@/features/requests/types";
import { Badge } from "@/shared/components";
import { cn } from "@/shared/utils";

interface RequestStatusBadgeProps {
  status: RequestStatus;
}

export function RequestStatusBadge({ status }: RequestStatusBadgeProps) {
  return (
    <Badge className={cn("capitalize", REQUEST_STATUS_BADGE_CLASSES[status])}>
      {REQUEST_STATUS_LABELS[status]}
    </Badge>
  );
}