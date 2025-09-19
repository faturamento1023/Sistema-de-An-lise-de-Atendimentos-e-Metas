import * as React from "react";
import { CalendarDays, Grid3X3, DownloadCloud, ShieldAlert } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAgendaData, formatAgendaDate } from "@/hooks/useAgendaData";
import type { Role } from "@/hooks/useAuthRole";

interface AgendaPageProps {
  role: Role;
}

export function AgendaPage({ role }: AgendaPageProps) {
  const { view, setView, dayReference, setDayReference, slots, monthly, conflicts, canEdit } = useAgendaData(role);

  return (
    <section className="space-y-6" aria-labelledby="agenda-title">
      <header className="rounded-3xl border border-white/30 bg-white/50 p-6 shadow-glass backdrop-blur-lg dark:border-slate-800/60 dark:bg-slate-900/60">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Agenda MediMVP</p>
            <h1 id="agenda-title" className="text-2xl font-semibold text-midnight dark:text-slate-100">
              Gestão de slots assistenciais
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">
              Crie e monitore slots por dia, horário, procedimento e capacidade. Exportação em PDF/CSV disponível.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-2xl border border-sky-200/50 bg-sky-100/60 px-4 py-3 text-sm text-sky-700 shadow-inner dark:border-sky-600/40 dark:bg-sky-900/50 dark:text-sky-200">
            <ShieldAlert className="h-5 w-5" aria-hidden />
            <div>
              <p className="text-xs uppercase tracking-wide">Regras</p>
              <p>Agenda sem pacientes: apenas slots.</p>
              <p className="text-xs">{canEdit ? "Gestor pode editar slots" : "Perfil médico em modo leitura"}</p>
            </div>
          </div>
        </div>
      </header>

      <Card>
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Filtros da agenda</CardTitle>
            <CardDescription>Quadro do dia ou visão mensal consolidada com contadores por local/tipo.</CardDescription>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              variant={view === "quadro" ? "default" : "outline"}
              size="sm"
              className="rounded-xl"
              onClick={() => setView("quadro")}
            >
              <Grid3X3 className="mr-1 h-4 w-4" aria-hidden /> Quadro do dia
            </Button>
            <Button
              type="button"
              variant={view === "mensal" ? "default" : "outline"}
              size="sm"
              className="rounded-xl"
              onClick={() => setView("mensal")}
            >
              <CalendarDays className="mr-1 h-4 w-4" aria-hidden /> Calendário mensal
            </Button>
            <input
              type="date"
              className="rounded-xl border border-white/40 bg-white/80 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900/80"
              value={dayReference}
              onChange={(event) => setDayReference(event.target.value)}
              aria-label="Selecionar dia"
            />
            <Button variant="outline" size="sm" className="rounded-xl">
              <DownloadCloud className="mr-1 h-4 w-4" aria-hidden /> Exportar PDF
            </Button>
            <Button variant="outline" size="sm" className="rounded-xl">
              <DownloadCloud className="mr-1 h-4 w-4" aria-hidden /> Exportar CSV
            </Button>
          </div>
        </CardHeader>
      </Card>

      {view === "quadro" ? (
        <Card>
          <CardHeader>
            <CardTitle>Quadro do dia — {formatAgendaDate(dayReference)}</CardTitle>
            <CardDescription>Conferência completa dos slots por local ou médico, com detector de conflitos ativo.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {slots.map((slot) => {
              const occupancy = Math.round((slot.booked / slot.available) * 100);
              return (
                <div
                  key={slot.id}
                  className="flex flex-col gap-3 rounded-2xl border border-white/40 bg-white/80 p-4 shadow-sm transition hover:border-primary/40 dark:border-slate-800 dark:bg-slate-900/70"
                >
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-base font-semibold text-midnight dark:text-slate-100">
                        {slot.locationName} • {slot.procedure}
                      </p>
                      <p className="text-xs text-slate-500">
                        {slot.start} – {slot.end} | {slot.doctorName}
                      </p>
                    </div>
                    <Badge variant={occupancy >= 100 ? "warning" : "outline"}>{occupancy}% ocupação</Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-4">
                    <div>
                      <p className="text-xs uppercase text-slate-500">Disponíveis</p>
                      <p className="text-lg font-semibold text-midnight dark:text-slate-100">{slot.available}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-slate-500">Reservadas</p>
                      <p className="text-lg font-semibold text-midnight dark:text-slate-100">{slot.booked}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-slate-500">Local</p>
                      <p>{slot.locationId}</p>
                    </div>
                    <div>
                      <p className="text-xs uppercase text-slate-500">Médico</p>
                      <p>{slot.doctorId}</p>
                    </div>
                  </div>
                  {canEdit ? (
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <Button variant="secondary" size="sm" className="rounded-xl">
                        Ajustar capacidade
                      </Button>
                      <Button variant="secondary" size="sm" className="rounded-xl">
                        Duplicar slot
                      </Button>
                      <Button variant="ghost" size="sm" className="rounded-xl text-rose-500 hover:text-rose-600">
                        Remover slot
                      </Button>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500">Visualização somente leitura para perfis médicos.</p>
                  )}
                </div>
              );
            })}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Calendário mensal</CardTitle>
            <CardDescription>Resumo diário com contadores por local e tipo de slot. Clique para detalhar.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {monthly.slice(0, 12).map((item) => (
              <div
                key={item.date}
                className="rounded-2xl border border-white/40 bg-white/80 p-4 text-sm shadow-sm transition hover:border-primary/40 dark:border-slate-800 dark:bg-slate-900/70"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-midnight dark:text-slate-100">{formatAgendaDate(item.date)}</p>
                  <Badge variant="outline">{item.totalSlots} slots</Badge>
                </div>
                <p className="text-xs text-slate-500">{item.totalAvailable} vagas disponíveis</p>
                <div className="mt-3 space-y-2">
                  {item.locations.map((location) => (
                    <div key={`${item.date}-${location.id}`} className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2 text-xs shadow-inner dark:bg-slate-800/60">
                      <span>{location.name}</span>
                      <Badge variant="secondary" className="bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-200">
                        {location.procedure} • {location.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Monitor de conflitos</CardTitle>
          <CardDescription>Itens sinalizados pela inteligência do MediMVP para evitar sobreposições de sala/médico.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
          {conflicts.map((conflict) => (
            <div
              key={conflict.id}
              className="rounded-2xl border border-amber-300/50 bg-amber-100/70 px-4 py-3 shadow-inner dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200"
            >
              <p className="font-semibold">{conflict.description}</p>
              <p className="text-xs uppercase tracking-wide">Severidade: {conflict.severity}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

export default AgendaPage;
