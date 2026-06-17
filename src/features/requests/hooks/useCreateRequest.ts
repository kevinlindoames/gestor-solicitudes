import { useMutation, useQueryClient } from "@tanstack/react-query";

import { requestQueryKeys } from "@/features/requests/constants";
import { requestService } from "@/features/requests/services";

export function useCreateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: requestService.create,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: requestQueryKeys.lists(),
      });
    },
  });
}