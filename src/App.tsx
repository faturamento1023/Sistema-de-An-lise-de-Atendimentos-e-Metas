import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell, defaultModules } from "@/components/layout/AppShell";
import { useAuthRole } from "@/hooks/useAuthRole";
import { HomeDataProvider } from "@/hooks/useHomeData";
import HomeDashboard from "@/features/home/HomeDashboard";
import AgendaPage from "@/features/agenda/AgendaPage";
import ProductionPage from "@/pages/ProductionPage";
import FaturamentoPage from "@/pages/FaturamentoPage";
import NotasFiscaisPage from "@/pages/NotasFiscaisPage";
import RelatoriosPage from "@/pages/RelatoriosPage";
import PacientesPage from "@/pages/PacientesPage";
import CadastrosMedicosPage from "@/pages/cadastros/CadastrosMedicosPage";
import CadastrosGestoresPage from "@/pages/cadastros/CadastrosGestoresPage";
import CadastrosLocaisPage from "@/pages/cadastros/CadastrosLocaisPage";
import CadastrosProcedimentosPage from "@/pages/cadastros/CadastrosProcedimentosPage";
import CadastrosTabelaPrecosPage from "@/pages/cadastros/CadastrosTabelaPrecosPage";
import ConfiguracoesPage from "@/pages/ConfiguracoesPage";
import LgpdAuditoriaPage from "@/pages/LgpdAuditoriaPage";
import SuportePage from "@/pages/SuportePage";

function App() {
  const { role, profile, availableRoles, setRole } = useAuthRole();

  return (
    <HomeDataProvider role={role}>
      <AppShell
        modules={defaultModules}
        profile={profile}
        role={role}
        availableRoles={availableRoles}
        onRoleChange={setRole}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<HomeDashboard />} />
          <Route path="/agenda" element={<AgendaPage role={role} />} />
          <Route path="/producao" element={<ProductionPage />} />
          <Route path="/faturamento" element={<FaturamentoPage />} />
          <Route path="/notas-fiscais" element={<NotasFiscaisPage />} />
          <Route path="/relatorios" element={<RelatoriosPage />} />
          <Route path="/pacientes" element={<PacientesPage />} />
          <Route path="/cadastros" element={<Navigate to="/cadastros/medicos" replace />} />
          <Route path="/cadastros/medicos" element={<CadastrosMedicosPage />} />
          <Route path="/cadastros/gestores" element={<CadastrosGestoresPage />} />
          <Route path="/cadastros/locais" element={<CadastrosLocaisPage />} />
          <Route path="/cadastros/procedimentos" element={<CadastrosProcedimentosPage />} />
          <Route path="/cadastros/tabela-precos" element={<CadastrosTabelaPrecosPage />} />
          <Route path="/configuracoes" element={<ConfiguracoesPage />} />
          <Route path="/lgpd" element={<LgpdAuditoriaPage />} />
          <Route path="/suporte" element={<SuportePage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AppShell>
    </HomeDataProvider>
  );
}

export default App;
