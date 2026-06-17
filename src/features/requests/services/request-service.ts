import { httpClient } from "@/lib/api";
import type {
  CreateRequestPayload,
  Request,
  UpdateRequestPayload,
  UpdateRequestPriorityPayload,
} from "@/features/requests/types";

const REQUESTS_ENDPOINT = "/api/v1/solicitudes";

export const requestService = {
  getAll: async (): Promise<Request[]> => {
    const requests = await httpClient.get<Request[]>(REQUESTS_ENDPOINT);

    return requests ?? [];
  },

  getById: async (id: string): Promise<Request> => {
    return httpClient.get<Request>(`${REQUESTS_ENDPOINT}/${id}`);
  },

  create: async (payload: CreateRequestPayload): Promise<Request> => {
    return httpClient.post<Request, CreateRequestPayload>(
      REQUESTS_ENDPOINT,
      payload
    );
  },

  update: async (
    id: string,
    payload: UpdateRequestPayload
  ): Promise<Request> => {
    return httpClient.put<Request, UpdateRequestPayload>(
      `${REQUESTS_ENDPOINT}/${id}`,
      payload
    );
  },

  updatePriority: async (
    id: string,
    payload: UpdateRequestPriorityPayload
  ): Promise<Request> => {
    return httpClient.patch<Request, UpdateRequestPriorityPayload>(
      `${REQUESTS_ENDPOINT}/${id}`,
      payload
    );
  },

  close: async (id: string): Promise<Request> => {
    return httpClient.delete<Request>(`${REQUESTS_ENDPOINT}/${id}`);
  },
};