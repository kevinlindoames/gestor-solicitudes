export const requestQueryKeys = {
  all: ["requests"] as const,
  lists: () => [...requestQueryKeys.all, "list"] as const,
  list: () => [...requestQueryKeys.lists()] as const,
  details: () => [...requestQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...requestQueryKeys.details(), id] as const,
};