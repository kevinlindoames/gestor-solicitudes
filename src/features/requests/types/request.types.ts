export type RequestStatus =
  | "pending"
  | "in_review"
  | "approved"
  | "rejected"
  | "closed";

export type RequestPriority = "low" | "medium" | "high" | "critical";

export interface Request {
  id: string;
  title: string;
  description: string;
  requester: string;
  category: string;
  priority: RequestPriority;
  status: RequestStatus;
  creationDate: string;
  lastChangeDate: string;
}

export interface CreateRequestPayload {
  title: string;
  description: string;
  requester: string;
  category: string;
  priority: RequestPriority;
}

export interface UpdateRequestPayload {
  title: string;
  description: string;
  requester: string;
  category: string;
  priority: RequestPriority;
  status: RequestStatus;
}

export interface UpdateRequestPriorityPayload {
  priority: RequestPriority;
}

export interface RequestFilters {
  search: string;
  status: RequestStatus | "all";
  priority: RequestPriority | "all";
  sortBy: "creationDate" | "lastChangeDate" | "priority";
  sortDirection: "asc" | "desc";
}

export interface RequestSummary {
  total: number;
  pending: number;
  inReview: number;
  approved: number;
  rejected: number;
  closed: number;
}