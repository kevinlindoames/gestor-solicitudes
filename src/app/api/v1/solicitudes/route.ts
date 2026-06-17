import { NextResponse } from "next/server";

import {
  createRequest,
  getRequests,
} from "@/features/requests/services/request-memory-store";
import type { CreateRequestPayload } from "@/features/requests/types";

export function GET() {
  return NextResponse.json({
    data: getRequests(),
  });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as CreateRequestPayload;

  if (
    !payload.title ||
    !payload.description ||
    !payload.requester ||
    !payload.category ||
    !payload.priority
  ) {
    return NextResponse.json(
      {
        message: "Datos incompletos para crear la solicitud.",
      },
      {
        status: 400,
      }
    );
  }

  const newRequest = createRequest(payload);

  return NextResponse.json(
    {
      data: newRequest,
      message: "Solicitud creada correctamente.",
    },
    {
      status: 201,
    }
  );
}