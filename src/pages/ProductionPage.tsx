import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Layers3 } from "lucide-react";

export function ProductionPage() {
  return (
    <section className="space-y-6" aria-labelledby="producao-title">
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle id="producao-title" className="text-2xl">
            Produção assistencial
          </CardTitle>
          <CardDescription>
            Consolide produção por procedimento, convênio e local. Exportação pronta para faturamento e BI.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
          <Button variant="outline" size="sm" className="rounded-xl">
            <Download className="mr-1 h-4 w-4" aria-hidden /> Exportar CSV
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl">
            <Download className="mr-1 h-4 w-4" aria-hidden /> Exportar PDF
          </Button>
          <div className="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/70 px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <Layers3 className="h-4 w-4 text-sky-500" aria-hidden />
            <span>Visão multidimensional (Local • Procedimento • Fonte pagadora)</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default ProductionPage;
