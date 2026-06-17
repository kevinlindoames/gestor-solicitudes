import { useQuery } from "@tanstack/react-query";

import { requestQueryKeys } from "@/features/requests/constants";
import { requestService } from "@/features/requests/services";

export function useRequests() {
  return useQuery({
    queryKey: requestQueryKeys.list(),
    queryFn: requestService.getAll,
  });
}