import type { Request, RequestSummary } from "@/features/requests/types";

export function getRequestSummary(requests: Request[]): RequestSummary {
  return requests.reduce<RequestSummary>(
    (summary, request) => {
      summary.total += 1;

      if (request.status === "pending") {
        summary.pending += 1;
      }

      if (request.status === "in_review") {
        summary.inReview += 1;
      }

      if (request.status === "approved") {
        summary.approved += 1;
      }

      if (request.status === "rejected") {
        summary.rejected += 1;
      }

      if (request.status === "closed") {
        summary.closed += 1;
      }

      return summary;
    },
    {
      total: 0,
      pending: 0,
      inReview: 0,
      approved: 0,
      rejected: 0,
      closed: 0,
    }
  );
}