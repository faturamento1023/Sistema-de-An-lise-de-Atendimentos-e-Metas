import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HandCoins, Download } from "lucide-react";

export function CadastrosTabelaPrecosPage() {
  return (
    <section className="space-y-6" aria-labelledby="cadastro-precos-title">
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle id="cadastro-precos-title" className="text-2xl">
            Tabela de preços
          </CardTitle>
          <CardDescription>Configure valores por procedimento e convênio.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
          <Button variant="outline" size="sm" className="rounded-xl">
            <Download className="mr-1 h-4 w-4" aria-hidden /> Importar tabela
          </Button>
          <div className="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/70 px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <HandCoins className="h-4 w-4 text-sky-500" aria-hidden />
            <span>Compatível com AMB/CBHPM e acordos customizados</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default CadastrosTabelaPrecosPage;
