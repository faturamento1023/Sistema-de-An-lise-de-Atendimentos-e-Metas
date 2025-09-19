import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, ShieldCheck } from "lucide-react";

export function CadastrosGestoresPage() {
  return (
    <section className="space-y-6" aria-labelledby="cadastro-gestores-title">
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle id="cadastro-gestores-title" className="text-2xl">
            Gestores
          </CardTitle>
          <CardDescription>Controle de perfis administrativos com auditoria LGPD.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
          <Button variant="outline" size="sm" className="rounded-xl">
            <Briefcase className="mr-1 h-4 w-4" aria-hidden /> Novo gestor
          </Button>
          <div className="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/70 px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <ShieldCheck className="h-4 w-4 text-teal-500" aria-hidden />
            <span>Permissões hierárquicas e auditoria</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default CadastrosGestoresPage;
