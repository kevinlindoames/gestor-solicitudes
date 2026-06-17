import type { RequestPriority, RequestStatus } from "@/features/requests/types";

export const REQUEST_STATUS_BADGE_CLASSES: Record<RequestStatus, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-700",
  in_review: "border-blue-200 bg-blue-50 text-blue-700",
  approved: "border-emerald-200 bg-emerald-50 text-emerald-700",
  rejected: "border-red-200 bg-red-50 text-red-700",
  closed: "border-slate-200 bg-slate-100 text-slate-700",
};

export const REQUEST_PRIORITY_BADGE_CLASSES: Record<RequestPriority, string> = {
  low: "border-slate-200 bg-slate-50 text-slate-700",
  medium: "border-sky-200 bg-sky-50 text-sky-700",
  high: "border-orange-200 bg-orange-50 text-orange-700",
  critical: "border-red-200 bg-red-50 text-red-700",
};

export const REQUEST_PRIORITY_ORDER: Record<RequestPriority, number> = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
};