import { useQuery } from "@tanstack/react-query";

import { requestQueryKeys } from "@/features/requests/constants";
import { requestService } from "@/features/requests/services";

interface UseRequestParams {
  id: string;
}

export function useRequest({ id }: UseRequestParams) {
  return useQuery({
    queryKey: requestQueryKeys.detail(id),
    queryFn: () => requestService.getById(id),
    enabled: Boolean(id),
  });
}