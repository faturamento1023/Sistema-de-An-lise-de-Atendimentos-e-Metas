import * as React from "react";
import { Activity, TrendingUp, ArrowUpRight, ArrowDownRight, ArrowRight, Download, AlertTriangle, CheckCircle2, Clock3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollViewport } from "@/components/ui/scroll-area";
import { useHomeData } from "@/hooks/useHomeData";
import { formatCurrency } from "@/lib/utils";

export function HomeDashboard() {
  const { kpis, pendencias, production, ranking, timeline } = useHomeData();

  return (
    <section aria-labelledby="dashboard-home" className="space-y-8">
      <header className="space-y-3 rounded-3xl border border-white/30 bg-white/40 p-8 shadow-glass backdrop-blur-lg transition-shadow duration-200 hover:shadow-lg hover:shadow-sky-200/70 dark:border-slate-800/70 dark:bg-slate-900/60 dark:hover:shadow-sky-500/10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Dashboard</p>
            <h1 id="dashboard-home" className="text-3xl font-semibold text-midnight transition-all duration-200 dark:text-slate-100">
              Bem-vindo ao MediMVP
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
              Visão integrada da operação assistencial, faturamento e governança. Indicadores atualizados respeitando LGPD e trilhas de auditoria.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-2xl border border-sky-200/40 bg-sky-100/60 px-5 py-4 text-sm text-sky-700 shadow-inner dark:border-sky-600/40 dark:bg-sky-900/40 dark:text-sky-200">
            <Activity className="h-9 w-9 text-sky-500 dark:text-sky-300" aria-hidden />
            <div>
              <p className="text-xs uppercase tracking-wide">Slots ativos</p>
              <p className="text-xl font-semibold">124 agendas</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Detectamos 1 conflito potencial hoje</p>
            </div>
          </div>
        </div>
      </header>

      <section aria-label="Indicadores principais" className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.id} className="group overflow-hidden">
            <CardHeader className="relative">
              <Badge variant="secondary" className="w-fit bg-white/70 text-slate-600 dark:bg-slate-800/80 dark:text-slate-200">
                {kpi.label}
              </Badge>
              <CardTitle className="text-3xl font-semibold tracking-tight text-midnight dark:text-slate-100">
                {kpi.currency ? formatCurrency(kpi.value) : kpi.value.toLocaleString("pt-BR")}
              </CardTitle>
              <CardDescription className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-slate-500">
                <TrendingUp className="h-4 w-4 text-sky-500" aria-hidden />
                {kpi.trend.value > 0 ? "+" : ""}
                {kpi.trend.value}% • {kpi.trend.label}
              </CardDescription>
              <div className="pointer-events-none absolute -right-12 top-6 h-24 w-24 rounded-full bg-sky-200/40 blur-2xl transition duration-200 group-hover:scale-110 dark:bg-sky-500/20" aria-hidden />
            </CardHeader>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-3" aria-label="Pendências e Produção">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Pendências prioritárias</CardTitle>
              <Badge variant="warning" className="text-xs">IA Prioriza</Badge>
            </div>
            <CardDescription>
              Fluxos críticos que precisam de atenção imediata. Atualizado em tempo real pelas integrações financeiras e da agenda.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendencias.map((item) => (
              <div
                key={item.id}
                className="group flex items-start justify-between rounded-2xl border border-white/40 bg-white/80 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/15 dark:border-slate-800 dark:bg-slate-900/70"
              >
                <div className="flex items-start gap-3">
                  <Badge variant={item.type === "producao" ? "secondary" : item.type === "nf" ? "outline" : "warning"}>
                    {item.type === "producao" ? "Produção" : item.type === "nf" ? "NF" : "Fechamento"}
                  </Badge>
                  <div>
                    <p className="text-sm font-semibold text-midnight dark:text-slate-100">{item.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-300">{item.description}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  onClick={() => {
                    window.location.href = item.actionHref;
                  }}
                >
                  {item.actionLabel}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Detector de conflitos</CardTitle>
            <CardDescription>Verificações automáticas de sala, médico e horário antes da abertura do slot.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-3 rounded-2xl border border-amber-300/50 bg-amber-100/60 px-4 py-3 text-amber-800 shadow-inner dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
                <AlertTriangle className="h-5 w-5" aria-hidden />
                <div>
                  <p className="font-semibold">Sala Híbrida • 13h30</p>
                  <p className="text-xs">Matriz/Consulta compartilhada com exame. Confirme disponibilidade.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-emerald-300/40 bg-emerald-100/70 px-4 py-3 text-emerald-700 shadow-inner dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-200">
                <CheckCircle2 className="h-5 w-5" aria-hidden />
                <div>
                  <p className="font-semibold">Conflitos resolvidos</p>
                  <p className="text-xs">Agenda do Dr. Lucas sincronizada com prontuário eletrônico.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200/40 bg-white/80 px-4 py-3 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/70">
                <Clock3 className="h-5 w-5 text-sky-500" aria-hidden />
                <div>
                  <p className="font-semibold">Exportar relatórios</p>
                  <p className="text-xs">PDF e CSV disponíveis na Agenda e Produção.</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section aria-label="Produção por local e ranking" className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Produção por local</CardTitle>
              <CardDescription>Quantidade, valor e participação percentual considerando filtros aplicados.</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="rounded-xl" disabled={production.length === 0}>
                <Download className="mr-1 h-4 w-4" aria-hidden /> PDF
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl" disabled={production.length === 0}>
                <Download className="mr-1 h-4 w-4" aria-hidden /> Excel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {production.map((loc) => (
              <div
                key={loc.id}
                className="group flex flex-col gap-3 rounded-2xl border border-white/30 bg-white/70 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 dark:border-slate-800 dark:bg-slate-900/70"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-semibold text-midnight dark:text-slate-100">{loc.name}</p>
                    <p className="text-xs uppercase tracking-wide text-slate-500">{loc.type}</p>
                  </div>
                  <Badge variant="outline">{loc.share}%</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-300 md:grid-cols-4">
                  <div className="rounded-2xl bg-white/80 p-3 shadow-inner dark:bg-slate-800/60">
                    <p className="text-xs uppercase text-slate-500">Atendimentos</p>
                    <p className="text-lg font-semibold text-midnight dark:text-slate-100">{loc.quantity}</p>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-3 shadow-inner dark:bg-slate-800/60">
                    <p className="text-xs uppercase text-slate-500">Valor</p>
                    <p className="text-lg font-semibold text-midnight dark:text-slate-100">{formatCurrency(loc.value)}</p>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-3 shadow-inner dark:bg-slate-800/60">
                    <p className="text-xs uppercase text-slate-500">Vagas livres</p>
                    <p className="text-lg font-semibold text-midnight dark:text-slate-100">{Math.max(loc.quantity - 20, 0)}</p>
                  </div>
                  <div className="rounded-2xl bg-white/80 p-3 shadow-inner dark:bg-slate-800/60">
                    <p className="text-xs uppercase text-slate-500">Taxa de ocupação</p>
                    <p className="text-lg font-semibold text-midnight dark:text-slate-100">{Math.round((loc.quantity / (loc.quantity + 20)) * 100)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ranking de médicos</CardTitle>
            <CardDescription>Performance financeira considerando o período selecionado.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {ranking.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-2xl border border-white/40 bg-white/80 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 dark:border-slate-800 dark:bg-slate-900/70"
              >
                <div>
                  <p className="text-sm font-semibold text-midnight dark:text-slate-100">
                    <span className="mr-2 text-xs text-slate-400">#{index + 1}</span>
                    {item.doctor}
                  </p>
                  <p className="text-xs text-slate-500">{item.specialty}</p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <p className="text-base font-semibold text-midnight dark:text-slate-100">{formatCurrency(item.value)}</p>
                  <p className="flex items-center justify-end gap-1">
                    {item.trend === "up" && <ArrowUpRight className="h-4 w-4 text-emerald-500" aria-hidden />}
                    {item.trend === "down" && <ArrowDownRight className="h-4 w-4 text-rose-500" aria-hidden />}
                    {item.trend === "equal" && <ArrowRight className="h-4 w-4 text-slate-400" aria-hidden />}
                    <span>{item.attendances} atend.</span>
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section aria-label="Linha do tempo" className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Timeline assistencial</CardTitle>
            <CardDescription>Eventos críticos e milestones de compliance organizados cronologicamente.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="max-h-[340px]">
              <ScrollViewport className="p-4">
                <ol className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                  {timeline.map((event) => (
                    <li key={event.id} className="relative rounded-2xl border border-white/40 bg-white/80 p-4 shadow-sm transition hover:border-primary/40 dark:border-slate-800 dark:bg-slate-900/70">
                      <Badge
                        variant={
                          event.status === "completed"
                            ? "success"
                            : event.status === "warning"
                            ? "warning"
                            : "outline"
                        }
                        className="mb-2"
                      >
                        {event.status === "completed" ? "Concluído" : event.status === "warning" ? "Atenção" : "Agendado"}
                      </Badge>
                      <p className="font-semibold text-midnight dark:text-slate-100">{event.title}</p>
                      <p className="text-xs text-slate-500">{event.description}</p>
                      <p className="mt-2 text-xs font-mono text-slate-400">{event.date}</p>
                    </li>
                  ))}
                </ol>
              </ScrollViewport>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Notas fiscais</CardTitle>
            <CardDescription>Emissão, pagamento e pendências para auditoria.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="rounded-2xl border border-emerald-200/60 bg-emerald-100/70 px-4 py-3 text-emerald-700 shadow-inner dark:border-emerald-500/40 dark:bg-emerald-500/20 dark:text-emerald-200">
              <p className="text-xs uppercase tracking-wide">Pagas</p>
              <p className="text-xl font-semibold">86%</p>
              <p className="text-xs">Integração automática com contas a receber.</p>
            </div>
            <div className="rounded-2xl border border-sky-200/60 bg-sky-100/70 px-4 py-3 text-sky-700 shadow-inner dark:border-sky-500/40 dark:bg-sky-500/20 dark:text-sky-100">
              <p className="text-xs uppercase tracking-wide">Emitidas</p>
              <p className="text-xl font-semibold">982</p>
              <p className="text-xs">Última emissão às {new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</p>
            </div>
            <div className="rounded-2xl border border-amber-200/60 bg-amber-100/70 px-4 py-3 text-amber-700 shadow-inner dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
              <p className="text-xs uppercase tracking-wide">Pendentes</p>
              <p className="text-xl font-semibold">{pendencias.find((item) => item.type === "nf")?.description.match(/\d+/)?.[0] ?? "0"}</p>
              <p className="text-xs">Ações de cobrança disparadas automaticamente.</p>
            </div>
          </CardContent>
        </Card>
      </section>
    </section>
  );
}

export default HomeDashboard;
