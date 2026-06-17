import { useMutation, useQueryClient } from "@tanstack/react-query";

import { requestQueryKeys } from "@/features/requests/constants";
import { requestService } from "@/features/requests/services";
import type {
  Request,
  UpdateRequestPayload,
} from "@/features/requests/types";

interface UseUpdateRequestVariables {
  id: string;
  payload: UpdateRequestPayload;
}

export function useUpdateRequest() {
  const queryClient = useQueryClient();

  return useMutation<Request, Error, UseUpdateRequestVariables>({
    mutationFn: ({ id, payload }) => requestService.update(id, payload),
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