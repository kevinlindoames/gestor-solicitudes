import { useMutation, useQueryClient } from "@tanstack/react-query";

import { requestQueryKeys } from "@/features/requests/constants";
import { requestService } from "@/features/requests/services";
import type { Request } from "@/features/requests/types";

interface UseCloseRequestVariables {
  id: string;
}

export function useCloseRequest() {
  const queryClient = useQueryClient();

  return useMutation<Request, Error, UseCloseRequestVariables>({
    mutationFn: ({ id }) => requestService.close(id),
    onSuccess: (closedRequest) => {
      queryClient.invalidateQueries({
        queryKey: requestQueryKeys.lists(),
      });

      queryClient.setQueryData(
        requestQueryKeys.detail(closedRequest.id),
        closedRequest
      );
    },
  });
}