import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Shield } from "lucide-react";

export function ConfiguracoesPage() {
  return (
    <section className="space-y-6" aria-labelledby="config-title">
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle id="config-title" className="text-2xl">
            Configurações
          </CardTitle>
          <CardDescription>Personalize integrações, temas e políticas de segurança.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
          <Button variant="outline" size="sm" className="rounded-xl">
            <Settings className="mr-1 h-4 w-4" aria-hidden /> Preferências
          </Button>
          <div className="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/70 px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <Shield className="h-4 w-4 text-teal-500" aria-hidden />
            <span>Políticas de privacidade MediMVP</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default ConfiguracoesPage;
