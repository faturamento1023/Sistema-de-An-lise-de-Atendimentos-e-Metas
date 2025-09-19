import * as React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Role } from "./useAuthRole";

export type HomeFilters = {
  periodMode: "mes" | "intervalo";
  month: string; // yyyy-MM
  range: { start: string; end: string };
  locations: string[];
  doctors: string[];
};

export type KpiCard = {
  id: string;
  label: string;
  value: number;
  currency?: boolean;
  trend: {
    value: number;
    label: string;
  };
};

export type PendingItem = {
  id: string;
  title: string;
  description: string;
  type: "producao" | "nf" | "fechamento";
  actionLabel: string;
  actionHref: string;
};

export type ProductionLocation = {
  id: string;
  name: string;
  type: "Clínica" | "Hospital" | "Unidade Móvel";
  quantity: number;
  value: number;
  share: number;
};

export type RankingEntry = {
  id: string;
  doctor: string;
  specialty: string;
  value: number;
  attendances: number;
  trend: "up" | "down" | "equal";
};

export type TimelineEvent = {
  id: string;
  title: string;
  description: string;
  date: string;
  status: "scheduled" | "completed" | "warning";
};

export type HomeData = {
  kpis: KpiCard[];
  pendencias: PendingItem[];
  production: ProductionLocation[];
  ranking: RankingEntry[];
  timeline: TimelineEvent[];
  filters: HomeFilters;
  setFilters: React.Dispatch<React.SetStateAction<HomeFilters>>;
  availableFilters: {
    months: { value: string; label: string }[];
    locations: { id: string; name: string }[];
    doctors: { id: string; name: string }[];
    lockedDoctorId?: string;
  };
  isLoading: boolean;
};

const HomeDataContext = React.createContext<HomeData | null>(null);

const LOCATIONS = [
  { id: "loc-01", name: "Matriz - Bela Vista" },
  { id: "loc-02", name: "Unidade Norte" },
  { id: "loc-03", name: "Centro Diagnóstico 24h" },
];

const DOCTORS = [
  { id: "med-01", name: "Dra. Helena Martins" },
  { id: "med-02", name: "Dr. Lucas Azevedo" },
  { id: "med-03", name: "Dr. Vinícius Prado" },
  { id: "med-04", name: "Dra. Camila Nogueira" },
];

function getDefaultFilters(role: Role): HomeFilters {
  const today = new Date();
  const month = format(today, "yyyy-MM");
  const lockedDoctor = role === "medico" ? DOCTORS[0].id : undefined;
  return {
    periodMode: "mes",
    month,
    range: {
      start: format(today, "yyyy-MM-01"),
      end: format(today, "yyyy-MM-dd"),
    },
    locations: LOCATIONS.map((l) => l.id),
    doctors: lockedDoctor ? [lockedDoctor] : DOCTORS.map((d) => d.id),
  };
}

function useProvideHomeData(role: Role): HomeData {
  const [filters, setFilters] = React.useState<HomeFilters>(() => getDefaultFilters(role));

  React.useEffect(() => {
    setFilters(getDefaultFilters(role));
  }, [role]);

  // TODO: Substituir mocks por chamadas às APIs MediFlow (produção, faturamento, NFs, pendências).
  const kpis = React.useMemo<KpiCard[]>(
    () => [
      {
        id: "producao",
        label: "Produção (R$)",
        value: 482_700,
        currency: true,
        trend: { value: 12.4, label: "vs. mês anterior" },
      },
      {
        id: "atendimentos",
        label: "Atendimentos",
        value: 1248,
        trend: { value: 4.1, label: "crescimento mensal" },
      },
      {
        id: "nf-emissao",
        label: "NF Emitidas",
        value: 982,
        trend: { value: 2.3, label: "pagas 86%" },
      },
      {
        id: "pendencias",
        label: "Pendências",
        value: 37,
        trend: { value: -5.2, label: "redução na semana" },
      },
    ],
    [],
  );

  const pendencias = React.useMemo<PendingItem[]>(
    () => [
      {
        id: "pend-producao",
        title: "Produção confirmada sem NF",
        description: "12 registros aguardando emissão de nota fiscal.",
        type: "producao",
        actionLabel: "Gerar NF",
        actionHref: "/faturamento",
      },
      {
        id: "pend-nf",
        title: "NF pendentes",
        description: "08 notas aguardando pagamento ou conciliação.",
        type: "nf",
        actionLabel: "Revisar Notas",
        actionHref: "/notas-fiscais",
      },
      {
        id: "pend-fechamento",
        title: "Fechamentos a conferir",
        description: "Fechamento da unidade Norte vence em 2 dias.",
        type: "fechamento",
        actionLabel: "Abrir Agenda",
        actionHref: "/agenda",
      },
    ],
    [],
  );

  const production = React.useMemo<ProductionLocation[]>(
    () => [
      {
        id: "loc-01",
        name: "Matriz - Bela Vista",
        type: "Clínica",
        quantity: 482,
        value: 245_900,
        share: 51.0,
      },
      {
        id: "loc-02",
        name: "Unidade Norte",
        type: "Hospital",
        quantity: 384,
        value: 148_400,
        share: 31.0,
      },
      {
        id: "loc-03",
        name: "Centro Diagnóstico 24h",
        type: "Unidade Móvel",
        quantity: 188,
        value: 88_400,
        share: 18.0,
      },
    ],
    [],
  );

  const ranking = React.useMemo<RankingEntry[]>(
    () => [
      {
        id: "med-02",
        doctor: "Dr. Lucas Azevedo",
        specialty: "Cardiologia",
        value: 112_900,
        attendances: 182,
        trend: "up",
      },
      {
        id: "med-03",
        doctor: "Dr. Vinícius Prado",
        specialty: "Ortopedia",
        value: 94_300,
        attendances: 158,
        trend: "equal",
      },
      {
        id: "med-04",
        doctor: "Dra. Camila Nogueira",
        specialty: "Dermatologia",
        value: 74_600,
        attendances: 136,
        trend: "down",
      },
    ],
    [],
  );

  const timeline = React.useMemo<TimelineEvent[]>(
    () => [
      {
        id: "event-01",
        title: "Fechamento Mensal",
        description: "Conferência geral do faturamento de abril.",
        date: format(new Date(), "dd/MM/yyyy HH:mm", { locale: ptBR }),
        status: "scheduled",
      },
      {
        id: "event-02",
        title: "Atualização LGPD",
        description: "Auditoria de consentimento renovada com sucesso.",
        date: format(new Date().setDate(new Date().getDate() - 1), "dd/MM/yyyy HH:mm", { locale: ptBR }),
        status: "completed",
      },
      {
        id: "event-03",
        title: "Alerta de conflito",
        description: "Sala híbrida reservada para dois procedimentos no mesmo horário.",
        date: format(new Date().setHours(new Date().getHours() - 3), "dd/MM/yyyy HH:mm", { locale: ptBR }),
        status: "warning",
      },
    ],
    [],
  );

  return {
    kpis,
    pendencias,
    production,
    ranking,
    timeline,
    filters,
    setFilters,
    availableFilters: {
      months: Array.from({ length: 6 }).map((_, index) => {
        const date = new Date();
        date.setMonth(date.getMonth() - index);
        return {
          value: format(date, "yyyy-MM"),
          label: format(date, "MMMM 'de' yyyy", { locale: ptBR }),
        };
      }),
      locations: LOCATIONS,
      doctors: DOCTORS,
      lockedDoctorId: role === "medico" ? DOCTORS[0].id : undefined,
    },
    isLoading: false,
  };
}

export function HomeDataProvider({ role, children }: { role: Role; children: React.ReactNode }) {
  const value = useProvideHomeData(role);
  return <HomeDataContext.Provider value={value}>{children}</HomeDataContext.Provider>;
}

export function useHomeData(): HomeData {
  const context = React.useContext(HomeDataContext);
  if (!context) {
    throw new Error("useHomeData deve ser usado dentro de HomeDataProvider");
  }
  return context;
}
