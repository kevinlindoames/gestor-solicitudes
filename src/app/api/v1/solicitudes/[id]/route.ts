import { NextResponse } from "next/server";

import {
  closeRequest,
  getRequestById,
  updateRequest,
  updateRequestPriority,
} from "@/features/requests/services/request-memory-store";
import type {
  UpdateRequestPayload,
  UpdateRequestPriorityPayload,
} from "@/features/requests/types";

interface RouteParams {
  params: {
    id: string;
  };
}

function normalizeRequestId(id: string): string {
  return decodeURIComponent(id).trim();
}

export function GET(_request: Request, { params }: RouteParams) {
  const requestId = normalizeRequestId(params.id);
  const request = getRequestById(requestId);

  if (!request) {
    return NextResponse.json(
      { message: `Solicitud ${requestId} no encontrada.` },
      { status: 404 }
    );
  }

  return NextResponse.json({ data: request });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const requestId = normalizeRequestId(params.id);
  const payload = (await request.json()) as UpdateRequestPayload;

  if (
    !payload.title ||
    !payload.description ||
    !payload.requester ||
    !payload.category ||
    !payload.priority ||
    !payload.status
  ) {
    return NextResponse.json(
      { message: "Datos incompletos para actualizar la solicitud." },
      { status: 400 }
    );
  }

  const updatedRequest = updateRequest(requestId, payload);

  if (!updatedRequest) {
    return NextResponse.json(
      { message: `Solicitud ${requestId} no encontrada.` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    data: updatedRequest,
    message: "Solicitud actualizada correctamente.",
  });
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const requestId = normalizeRequestId(params.id);
  const payload = (await request.json()) as UpdateRequestPriorityPayload;

  if (!payload.priority) {
    return NextResponse.json(
      { message: "La prioridad es obligatoria." },
      { status: 400 }
    );
  }

  const updatedRequest = updateRequestPriority(requestId, payload);

  if (!updatedRequest) {
    return NextResponse.json(
      { message: `Solicitud ${requestId} no encontrada.` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    data: updatedRequest,
    message: "Prioridad actualizada correctamente.",
  });
}

export function DELETE(_request: Request, { params }: RouteParams) {
  const requestId = normalizeRequestId(params.id);
  const closedRequest = closeRequest(requestId);

  if (!closedRequest) {
    return NextResponse.json(
      { message: `Solicitud ${requestId} no encontrada.` },
      { status: 404 }
    );
  }

  return NextResponse.json({
    data: closedRequest,
    message: "Solicitud cerrada correctamente.",
  });
}