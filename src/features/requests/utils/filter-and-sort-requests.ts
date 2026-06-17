import { REQUEST_PRIORITY_ORDER } from "@/features/requests/constants";
import type { Request, RequestFilters } from "@/features/requests/types";

function normalizeSearchValue(value: string): string {
  return value.trim().toLowerCase();
}

function matchesSearch(request: Request, search: string): boolean {
  if (!search) {
    return true;
  }

  const normalizedSearch = normalizeSearchValue(search);

  return (
    request.title.toLowerCase().includes(normalizedSearch) ||
    request.description.toLowerCase().includes(normalizedSearch) ||
    request.requester.toLowerCase().includes(normalizedSearch) ||
    request.category.toLowerCase().includes(normalizedSearch) ||
    request.id.toLowerCase().includes(normalizedSearch)
  );
}

function compareByDate(
  firstDate: string,
  secondDate: string,
  direction: RequestFilters["sortDirection"]
): number {
  const firstTime = new Date(firstDate).getTime();
  const secondTime = new Date(secondDate).getTime();

  return direction === "asc" ? firstTime - secondTime : secondTime - firstTime;
}

function compareByPriority(
  firstRequest: Request,
  secondRequest: Request,
  direction: RequestFilters["sortDirection"]
): number {
  const firstPriority = REQUEST_PRIORITY_ORDER[firstRequest.priority];
  const secondPriority = REQUEST_PRIORITY_ORDER[secondRequest.priority];

  return direction === "asc"
    ? firstPriority - secondPriority
    : secondPriority - firstPriority;
}

export function filterAndSortRequests(
  requests: Request[],
  filters: RequestFilters
): Request[] {
  const filteredRequests = requests.filter((request) => {
    const matchesStatus =
      filters.status === "all" || request.status === filters.status;

    const matchesPriority =
      filters.priority === "all" || request.priority === filters.priority;

    return (
      matchesSearch(request, filters.search) &&
      matchesStatus &&
      matchesPriority
    );
  });

  return [...filteredRequests].sort((firstRequest, secondRequest) => {
    if (filters.sortBy === "priority") {
      return compareByPriority(
        firstRequest,
        secondRequest,
        filters.sortDirection
      );
    }

    return compareByDate(
      firstRequest[filters.sortBy],
      secondRequest[filters.sortBy],
      filters.sortDirection
    );
  });
}