import type { Request } from "@/features/requests/types";

export function generateRequestId(requests: Request[]): string {
  const nextNumber = requests.length + 1;

  return `REQ-${String(nextNumber).padStart(3, "0")}`;
}