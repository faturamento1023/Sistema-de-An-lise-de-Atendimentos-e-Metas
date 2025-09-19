import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, ShieldCheck, Download } from "lucide-react";

export function FaturamentoPage() {
  return (
    <section className="space-y-6" aria-labelledby="faturamento-title">
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle id="faturamento-title" className="text-2xl">
            Faturamento inteligente
          </CardTitle>
          <CardDescription>
            Centralize emissões, conciliações e auditoria das notas fiscais com rastreabilidade completa.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
          <Button variant="outline" size="sm" className="rounded-xl">
            <FileSpreadsheet className="mr-1 h-4 w-4" aria-hidden /> Abrir planilha
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl">
            <Download className="mr-1 h-4 w-4" aria-hidden /> Exportar XML
          </Button>
          <div className="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/70 px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <ShieldCheck className="h-4 w-4 text-teal-500" aria-hidden />
            <span>Integração com ERP e LGPD compliant</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default FaturamentoPage;
