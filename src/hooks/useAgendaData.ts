import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Role } from "./useAuthRole";

export type AgendaSlot = {
  id: string;
  date: string;
  start: string;
  end: string;
  procedure: "Consulta" | "Exame";
  locationId: string;
  locationName: string;
  doctorId: string;
  doctorName: string;
  available: number;
  booked: number;
};

export type AgendaConflict = {
  id: string;
  description: string;
  severity: "info" | "warning" | "critical";
};

export type AgendaMonthlyItem = {
  date: string;
  totalSlots: number;
  totalAvailable: number;
  locations: { id: string; name: string; procedure: string; count: number }[];
};

export type AgendaData = {
  view: "quadro" | "mensal";
  setView: (view: "quadro" | "mensal") => void;
  dayReference: string;
  setDayReference: (date: string) => void;
  slots: AgendaSlot[];
  monthly: AgendaMonthlyItem[];
  conflicts: AgendaConflict[];
  canEdit: boolean;
  isLoading: boolean;
};

const MOCK_SLOTS: AgendaSlot[] = [
  {
    id: "slot-001",
    date: format(new Date(), "yyyy-MM-dd"),
    start: "08:00",
    end: "12:00",
    procedure: "Consulta",
    locationId: "loc-01",
    locationName: "Matriz - Sala Azul",
    doctorId: "med-02",
    doctorName: "Dr. Lucas Azevedo",
    available: 10,
    booked: 8,
  },
  {
    id: "slot-002",
    date: format(new Date(), "yyyy-MM-dd"),
    start: "13:30",
    end: "17:00",
    procedure: "Exame",
    locationId: "loc-03",
    locationName: "Diagnóstico 24h - Sala 3",
    doctorId: "med-04",
    doctorName: "Dra. Camila Nogueira",
    available: 6,
    booked: 6,
  },
];

const MOCK_MONTHLY: AgendaMonthlyItem[] = Array.from({ length: 30 }).map((_, index) => {
  const date = new Date();
  date.setDate(index + 1);
  return {
    date: format(date, "yyyy-MM-dd"),
    totalSlots: Math.floor(Math.random() * 8) + 2,
    totalAvailable: Math.floor(Math.random() * 30) + 5,
    locations: [
      { id: "loc-01", name: "Matriz", procedure: "Consulta", count: Math.floor(Math.random() * 5) + 1 },
      { id: "loc-02", name: "Unidade Norte", procedure: "Exame", count: Math.floor(Math.random() * 4) },
    ],
  };
});

const MOCK_CONFLICTS: AgendaConflict[] = [
  {
    id: "conf-01",
    description: "Conflito de sala: Matriz - Sala Azul reservada para dois médicos às 13:30.",
    severity: "warning",
  },
];

export function useAgendaData(role: Role): AgendaData {
  const [view, setView] = React.useState<"quadro" | "mensal">("quadro");
  const [dayReference, setDayReference] = React.useState<string>(() => format(new Date(), "yyyy-MM-dd"));

  // TODO: Substituir mocks por endpoints reais de agenda, com filtros e paginação.

  return {
    view,
    setView,
    dayReference,
    setDayReference,
    slots: MOCK_SLOTS,
    monthly: MOCK_MONTHLY,
    conflicts: MOCK_CONFLICTS,
    canEdit: role === "gestor",
    isLoading: false,
  };
}

export function formatAgendaDate(date: string) {
  return format(new Date(date), "dd/MM/yyyy", { locale: ptBR });
}
