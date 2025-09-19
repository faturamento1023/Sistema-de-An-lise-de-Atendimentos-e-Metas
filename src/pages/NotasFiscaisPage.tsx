import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle2, Clock, Download } from "lucide-react";

export function NotasFiscaisPage() {
  return (
    <section className="space-y-6" aria-labelledby="nf-title">
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle id="nf-title" className="text-2xl">
            Notas fiscais e compliance
          </CardTitle>
          <CardDescription>
            Acompanhe emissão, pagamentos e pendências com trilha de auditoria LGPD.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-emerald-200/60 bg-emerald-100/70 px-4 py-3 text-sm text-emerald-700 shadow-inner dark:border-emerald-500/40 dark:bg-emerald-500/20 dark:text-emerald-200">
            <CheckCircle2 className="mb-1 h-5 w-5" aria-hidden />
            <p className="text-xs uppercase">Pagas</p>
            <p className="text-xl font-semibold">86%</p>
          </div>
          <div className="rounded-2xl border border-sky-200/60 bg-sky-100/70 px-4 py-3 text-sm text-sky-700 shadow-inner dark:border-sky-500/40 dark:bg-sky-500/20 dark:text-sky-100">
            <FileText className="mb-1 h-5 w-5" aria-hidden />
            <p className="text-xs uppercase">Emitidas</p>
            <p className="text-xl font-semibold">982</p>
          </div>
          <div className="rounded-2xl border border-amber-200/60 bg-amber-100/70 px-4 py-3 text-sm text-amber-700 shadow-inner dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
            <Clock className="mb-1 h-5 w-5" aria-hidden />
            <p className="text-xs uppercase">Pendentes</p>
            <p className="text-xl font-semibold">8</p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Exportações</CardTitle>
          <CardDescription>Exportar XML, PDF ou CSV das NFs selecionadas.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
          <Button variant="outline" size="sm" className="rounded-xl">
            <Download className="mr-1 h-4 w-4" aria-hidden /> Exportar CSV
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl">
            <Download className="mr-1 h-4 w-4" aria-hidden /> Exportar PDF
          </Button>
          <Badge variant="outline">Filtro: período, status, médico</Badge>
        </CardContent>
      </Card>
    </section>
  );
}

export default NotasFiscaisPage;
