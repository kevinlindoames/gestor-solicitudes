import { useMutation, useQueryClient } from "@tanstack/react-query";

import { requestQueryKeys } from "@/features/requests/constants";
import { requestService } from "@/features/requests/services";
import type {
  Request,
  UpdateRequestPriorityPayload,
} from "@/features/requests/types";

interface UseUpdateRequestPriorityVariables {
  id: string;
  payload: UpdateRequestPriorityPayload;
}

export function useUpdateRequestPriority() {
  const queryClient = useQueryClient();

  return useMutation<Request, Error, UseUpdateRequestPriorityVariables>({
    mutationFn: ({ id, payload }) => requestService.updatePriority(id, payload),
    onSuccess: (updatedRequest) => {
      queryClient.invalidateQueries({
        queryKey: requestQueryKeys.lists(),
      });

      queryClient.setQueryData(
        requestQueryKeys.detail(updatedRequest.id),
        updatedRequest
      );
    },
  });
}