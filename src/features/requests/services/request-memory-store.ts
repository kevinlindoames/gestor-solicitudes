import { requestsMock } from "@/mocks/requests.mock";
import type {
  CreateRequestPayload,
  Request,
  UpdateRequestPayload,
  UpdateRequestPriorityPayload,
} from "@/features/requests/types";
import { generateRequestId } from "@/features/requests/utils";

const globalForRequests = globalThis as typeof globalThis & {
  __requestsStore?: Request[];
};

function getStore(): Request[] {
  if (!globalForRequests.__requestsStore) {
    globalForRequests.__requestsStore = [...requestsMock];
  }

  return globalForRequests.__requestsStore;
}

function setStore(requests: Request[]) {
  globalForRequests.__requestsStore = requests;
}

export function getRequests(): Request[] {
  return getStore();
}

export function getRequestById(id: string): Request | undefined {
  return getStore().find((request) => request.id === id);
}

export function createRequest(payload: CreateRequestPayload): Request {
  const requests = getStore();
  const now = new Date().toISOString();

  const newRequest: Request = {
    id: generateRequestId(requests),
    title: payload.title,
    description: payload.description,
    requester: payload.requester,
    category: payload.category,
    priority: payload.priority,
    status: "pending",
    creationDate: now,
    lastChangeDate: now,
  };

  setStore([newRequest, ...requests]);

  return newRequest;
}

export function updateRequest(
  id: string,
  payload: UpdateRequestPayload
): Request | undefined {
  const existingRequest = getRequestById(id);

  if (!existingRequest) return undefined;

const updatedRequest: Request = {
  ...existingRequest,
  title: payload.title,
  description: payload.description,
  requester: payload.requester,
  category: payload.category,
  priority: payload.priority,
  status: payload.status,
  lastChangeDate: new Date().toISOString(),
};

  setStore(
    getStore().map((request) =>
      request.id === id ? updatedRequest : request
    )
  );

  return updatedRequest;
}

export function updateRequestPriority(
  id: string,
  payload: UpdateRequestPriorityPayload
): Request | undefined {
  const existingRequest = getRequestById(id);

  if (!existingRequest) return undefined;

  const updatedRequest: Request = {
    ...existingRequest,
    priority: payload.priority,
    lastChangeDate: new Date().toISOString(),
  };

  setStore(
    getStore().map((request) =>
      request.id === id ? updatedRequest : request
    )
  );

  return updatedRequest;
}

export function closeRequest(id: string): Request | undefined {
  const existingRequest = getRequestById(id);

  if (!existingRequest) return undefined;

  const closedRequest: Request = {
    ...existingRequest,
    status: "closed",
    lastChangeDate: new Date().toISOString(),
  };

  setStore(
    getStore().map((request) =>
      request.id === id ? closedRequest : request
    )
  );

  return closedRequest;
}