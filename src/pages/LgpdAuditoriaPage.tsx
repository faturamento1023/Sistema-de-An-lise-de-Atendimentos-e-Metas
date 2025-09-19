import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, FileSearch } from "lucide-react";

export function LgpdAuditoriaPage() {
  return (
    <section className="space-y-6" aria-labelledby="lgpd-title">
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle id="lgpd-title" className="text-2xl">
            LGPD & Auditoria
          </CardTitle>
          <CardDescription>Gerencie consentimentos, logs de acesso e exporte relatórios regulatórios.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
          <Button variant="outline" size="sm" className="rounded-xl">
            <FileSearch className="mr-1 h-4 w-4" aria-hidden /> Consultar logs
          </Button>
          <div className="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/70 px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <ShieldCheck className="h-4 w-4 text-teal-500" aria-hidden />
            <span>Trilha de auditoria por usuário e sessão</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default LgpdAuditoriaPage;
