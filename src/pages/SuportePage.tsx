import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LifeBuoy, MessageCircle } from "lucide-react";

export function SuportePage() {
  return (
    <section className="space-y-6" aria-labelledby="suporte-title">
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle id="suporte-title" className="text-2xl">
            Suporte MediFlow
          </CardTitle>
          <CardDescription>Fale com especialistas da MediFlow Tech para evoluir o MediMVP.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
          <Button variant="outline" size="sm" className="rounded-xl">
            <LifeBuoy className="mr-1 h-4 w-4" aria-hidden /> Abrir chamado
          </Button>
          <Button variant="outline" size="sm" className="rounded-xl">
            <MessageCircle className="mr-1 h-4 w-4" aria-hidden /> Chat ao vivo
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

export default SuportePage;
