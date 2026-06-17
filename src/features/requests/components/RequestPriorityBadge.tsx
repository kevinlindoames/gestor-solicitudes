import {
  REQUEST_PRIORITY_BADGE_CLASSES,
  REQUEST_PRIORITY_LABELS,
} from "@/features/requests/constants";
import type { RequestPriority } from "@/features/requests/types";
import { Badge } from "@/shared/components";
import { cn } from "@/shared/utils";

interface RequestPriorityBadgeProps {
  priority: RequestPriority;
}

export function RequestPriorityBadge({
  priority,
}: RequestPriorityBadgeProps) {
  return (
    <Badge className={cn(REQUEST_PRIORITY_BADGE_CLASSES[priority])}>
      {REQUEST_PRIORITY_LABELS[priority]}
    </Badge>
  );
}