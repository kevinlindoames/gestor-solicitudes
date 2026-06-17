import type { Request } from "@/features/requests/types";

export const requestsMock: Request[] = [
  {
    id: "REQ-001",
    title: "Acceso al sistema financiero",
    description:
      "Solicitud de acceso al módulo de reportes financieros para el cierre mensual.",
    requester: "María López",
    category: "Accesos",
    priority: "high",
    status: "pending",
    creationDate: "2026-06-10T09:30:00.000Z",
    lastChangeDate: "2026-06-10T09:30:00.000Z",
  },
  {
    id: "REQ-002",
    title: "Actualización de equipo portátil",
    description:
      "El equipo actual presenta lentitud y requiere evaluación para renovación.",
    requester: "Carlos Ramírez",
    category: "Infraestructura",
    priority: "medium",
    status: "in_review",
    creationDate: "2026-06-11T14:15:00.000Z",
    lastChangeDate: "2026-06-12T10:00:00.000Z",
  },
  {
    id: "REQ-003",
    title: "Corrección de datos en planilla",
    description:
      "Se requiere corregir información personal registrada en el sistema de recursos humanos.",
    requester: "Lucía Torres",
    category: "Recursos humanos",
    priority: "low",
    status: "approved",
    creationDate: "2026-06-08T16:45:00.000Z",
    lastChangeDate: "2026-06-09T08:20:00.000Z",
  },
  {
    id: "REQ-004",
    title: "Compra de licencias de software",
    description:
      "Solicitud para adquirir licencias adicionales de herramientas de diseño y productividad.",
    requester: "Jorge Medina",
    category: "Compras",
    priority: "critical",
    status: "rejected",
    creationDate: "2026-06-07T11:10:00.000Z",
    lastChangeDate: "2026-06-08T13:35:00.000Z",
  },
  {
    id: "REQ-005",
    title: "Soporte por error en VPN",
    description:
      "El usuario no puede conectarse a la VPN corporativa desde su equipo asignado.",
    requester: "Ana Castillo",
    category: "Soporte técnico",
    priority: "high",
    status: "closed",
    creationDate: "2026-06-05T08:00:00.000Z",
    lastChangeDate: "2026-06-06T17:45:00.000Z",
  },
  {
    id: "REQ-006",
    title: "Validación de contrato proveedor",
    description:
      "Revisión legal de contrato antes de proceder con la firma del proveedor.",
    requester: "Fernando Salazar",
    category: "Legal",
    priority: "medium",
    status: "in_review",
    creationDate: "2026-06-13T15:25:00.000Z",
    lastChangeDate: "2026-06-14T09:10:00.000Z",
  },
  {
    id: "REQ-007",
    title: "Aprobación de presupuesto trimestral",
    description:
      "Solicitud de revisión y aprobación del presupuesto correspondiente al siguiente trimestre.",
    requester: "Patricia Gómez",
    category: "Finanzas",
    priority: "critical",
    status: "pending",
    creationDate: "2026-06-15T10:50:00.000Z",
    lastChangeDate: "2026-06-15T10:50:00.000Z",
  },
  {
    id: "REQ-008",
    title: "Alta de usuario en plataforma interna",
    description:
      "Creación de usuario y asignación de permisos para nuevo colaborador.",
    requester: "Diego Vargas",
    category: "Accesos",
    priority: "medium",
    status: "approved",
    creationDate: "2026-06-09T12:40:00.000Z",
    lastChangeDate: "2026-06-10T16:00:00.000Z",
  },
];