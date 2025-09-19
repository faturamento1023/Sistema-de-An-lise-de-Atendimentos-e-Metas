import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UsersRound, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function PacientesPage() {
  return (
    <section className="space-y-6" aria-labelledby="pacientes-title">
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle id="pacientes-title" className="text-2xl">
            Pacientes
          </CardTitle>
          <CardDescription>Consulte dados de pacientes respeitando consentimentos LGPD.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Input placeholder="Buscar paciente por nome ou documento" className="sm:w-80" aria-label="Buscar paciente" />
          <Button variant="outline" size="sm" className="rounded-xl">
            <Search className="mr-1 h-4 w-4" aria-hidden /> Buscar
          </Button>
          <div className="flex items-center gap-2 rounded-2xl border border-white/30 bg-white/70 px-3 py-2 text-sm text-slate-600 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
            <UsersRound className="h-4 w-4 text-sky-500" aria-hidden />
            <span>Integração com prontuário eletrônico MediFlow</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default PacientesPage;
