import * as React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarCheck2,
  Activity,
  HandCoins,
  FileText,
  BarChart4,
  Users,
  NotebookPen,
  Settings,
  ShieldCheck,
  Stethoscope,
  Building2,
  ScrollText,
  FolderCog,
  LifeBuoy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/theme-provider";
import type { Profile, Role } from "@/hooks/useAuthRole";
import { useHomeData } from "@/hooks/useHomeData";
import { cn, formatCurrency } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

export type AppModule = {
  key: string;
  label: string;
  path?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children?: AppModule[];
  description?: string;
  restrictedTo?: Role[];
};

export type AppShellProps = {
  modules: AppModule[];
  children: React.ReactNode;
  profile: Profile;
  role: Role;
  availableRoles: Role[];
  onRoleChange: (role: Role) => void;
};

export function AppShell({ modules, children, profile, role, availableRoles, onRoleChange }: AppShellProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const location = useLocation();
  const { setTheme, resolvedTheme } = useTheme();
  const homeData = useHomeData();

  const handleToggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const sidebarModules = React.useMemo(
    () =>
      modules.filter((module) => {
        if (!module.restrictedTo) return true;
        return module.restrictedTo.includes(role);
      }),
    [modules, role],
  );

  return (
    <div className="relative flex min-h-screen w-full bg-gradient-to-br from-sky-100 via-slate-100 to-slate-200 text-slate-900 dark:from-midnight/90 dark:via-slate-950 dark:to-slate-900">
      <div
        className={cn(
          "group flex w-72 flex-col border-r border-white/20 bg-white/40 backdrop-blur-lg transition-all duration-200 dark:border-white/10 dark:bg-slate-900/50",
          collapsed && "w-20",
        )}
        aria-label="Barra lateral"
      >
        <div className="flex h-20 items-center gap-3 px-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-lg">
            <span className="text-lg font-semibold">M</span>
          </div>
          <div className={cn("flex flex-col", collapsed && "hidden")}
          >
            <span className="text-lg font-semibold tracking-tight text-midnight dark:text-slate-100">MediMVP</span>
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500">Health Intelligence</span>
          </div>
        </div>
        <Separator className="border-white/10" />
        <nav className="flex-1 overflow-y-auto px-3 py-6 scrollbar-thin">
          <ul className="flex flex-col gap-1">
            {sidebarModules.map((module) => (
              <SidebarItem
                key={module.key}
                module={module}
                collapsed={collapsed}
                currentPath={location.pathname}
              />
            ))}
          </ul>
        </nav>
        <div className="px-4 py-5 text-xs text-slate-500">
          <p className={cn("flex items-center justify-between", collapsed && "hidden")}>© 2025 MediFlow Tech</p>
          <p className={cn("flex items-center justify-between", collapsed && "hidden")}>MediMVP v0.3.0-slots</p>
        </div>
      </div>
      <div className="relative flex min-h-screen flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-white/40 bg-white/70 backdrop-blur-lg dark:border-slate-800/60 dark:bg-slate-950/70">
          <div className="flex items-center justify-between gap-4 px-6 py-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
                onClick={() => setCollapsed((prev) => !prev)}
                className="rounded-2xl"
              >
                <span className="sr-only">alternar menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-5 w-5"
                  aria-hidden
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
              <div className="hidden md:flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1 rounded-full bg-sky-100 px-2 py-1 font-semibold uppercase tracking-wide text-sky-600 dark:bg-sky-600/10 dark:text-sky-300">
                  ECG
                  <span className="h-0.5 w-12 animate-pulse bg-gradient-to-r from-sky-500 via-cyan-400 to-teal-400 opacity-70" />
                </span>
                <span className="tracking-[0.3em] text-slate-400">HEALTH-TECH</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 rounded-2xl border border-white/40 bg-white/70 px-3 py-1 text-xs font-medium text-slate-600 shadow-sm transition hover:border-primary/50 hover:shadow-primary/20 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200 sm:flex">
                <span>Modo</span>
                <Switch checked={resolvedTheme === "dark"} onCheckedChange={handleToggleTheme} label="Alternar tema" />
                <span className="font-semibold uppercase text-slate-500">{resolvedTheme}</span>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="hidden rounded-2xl border border-white/40 bg-white/80 text-xs font-semibold uppercase tracking-wide text-slate-600 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-200 md:flex"
                onClick={handleToggleTheme}
              >
                {resolvedTheme === "dark" ? "Modo Claro" : "Modo Escuro"}
              </Button>
              <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/70 px-3 py-2 shadow-sm backdrop-blur-md transition hover:border-primary/40 dark:border-slate-800 dark:bg-slate-900/70">
                <div className="flex flex-col text-right text-xs text-slate-500">
                  <span className="font-semibold text-slate-700 dark:text-slate-100">{profile.name}</span>
                  <span>{profile.email}</span>
                </div>
                <Avatar name={profile.name} className="ring-2 ring-primary/40" />
              </div>
            </div>
          </div>
          <FiltersBar role={role} availableRoles={availableRoles} onRoleChange={onRoleChange} />
        </header>
        <main className="relative flex-1 overflow-y-auto px-6 py-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_55%)]" aria-hidden />
          <div className="relative z-10 space-y-8 pb-20">{children}</div>
        </main>
        <footer className="mt-auto border-t border-white/30 bg-white/70 px-6 py-4 text-sm text-slate-500 backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
          © 2025 MediFlow Tech Soluções. Todos os direitos reservados. — MediMVP v0.3.0-slots (LGPD-compliant)
        </footer>
      </div>
    </div>
  );
}

function FiltersBar({ role, availableRoles, onRoleChange }: Pick<AppShellProps, "availableRoles" | "onRoleChange"> & { role: Role }) {
  const { filters, setFilters, availableFilters } = useHomeData();

  const handlePeriodMode = (mode: "mes" | "intervalo") => {
    setFilters((prev) => ({ ...prev, periodMode: mode }));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, month: value }));
  };

  const handleRangeChange = (key: "start" | "end") => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setFilters((prev) => ({ ...prev, range: { ...prev.range, [key]: value } }));
  };

  const handleLocationToggle = (id: string) => {
    setFilters((prev) => {
      const exists = prev.locations.includes(id);
      return {
        ...prev,
        locations: exists ? prev.locations.filter((loc) => loc !== id) : [...prev.locations, id],
      };
    });
  };

  const handleDoctorToggle = (id: string) => {
    setFilters((prev) => {
      const exists = prev.doctors.includes(id);
      return {
        ...prev,
        doctors: exists ? prev.doctors.filter((doc) => doc !== id) : [...prev.doctors, id],
      };
    });
  };

  const lockedDoctor = availableFilters.lockedDoctorId;

  return (
    <div className="border-t border-white/30 bg-white/80 px-6 py-4 text-sm shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/70">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid flex-1 grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Período</span>
            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant={filters.periodMode === "mes" ? "default" : "outline"}
                size="sm"
                className="rounded-2xl"
                onClick={() => handlePeriodMode("mes")}
              >
                Mês atual
              </Button>
              <Button
                type="button"
                variant={filters.periodMode === "intervalo" ? "default" : "outline"}
                size="sm"
                className="rounded-2xl"
                onClick={() => handlePeriodMode("intervalo")}
              >
                Intervalo
              </Button>
            </div>
            {filters.periodMode === "mes" ? (
              <select
                className="mt-1 w-full rounded-xl border border-white/40 bg-white/80 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900/80"
                value={filters.month}
                onChange={handleMonthChange}
                aria-label="Selecionar mês"
              >
                {availableFilters.months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            ) : (
              <div className="mt-1 flex flex-col gap-2 sm:flex-row">
                <div className="flex flex-1 flex-col text-xs text-slate-500">
                  <span>Início</span>
                  <input
                    type="date"
                    value={filters.range.start}
                    onChange={handleRangeChange("start")}
                    className="rounded-xl border border-white/40 bg-white/80 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900/80"
                  />
                </div>
                <div className="flex flex-1 flex-col text-xs text-slate-500">
                  <span>Fim</span>
                  <input
                    type="date"
                    value={filters.range.end}
                    onChange={handleRangeChange("end")}
                    className="rounded-xl border border-white/40 bg-white/80 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900/80"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Locais</span>
            <div className="rounded-2xl border border-white/40 bg-white/70 p-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
              <div className="flex flex-col gap-2">
                {availableFilters.locations.map((location) => (
                  <Checkbox
                    key={location.id}
                    checked={filters.locations.includes(location.id)}
                    onChange={() => handleLocationToggle(location.id)}
                    label={location.name}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Médicos</span>
            <div
              className={cn(
                "rounded-2xl border border-white/40 bg-white/70 p-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70",
                role === "medico" && "pointer-events-none opacity-60",
              )}
            >
              <div className="flex flex-col gap-2">
                {availableFilters.doctors.map((doctor) => (
                  <Checkbox
                    key={doctor.id}
                    checked={filters.doctors.includes(doctor.id)}
                    onChange={() => handleDoctorToggle(doctor.id)}
                    label={doctor.name}
                    disabled={Boolean(lockedDoctor && doctor.id !== lockedDoctor)}
                  />
                ))}
              </div>
              {role === "medico" && (
                <p className="mt-2 text-xs text-slate-500">
                  Perfil médico visualiza apenas a própria agenda e faturamento.
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Perfil ativo</span>
            <select
              className="rounded-2xl border border-white/40 bg-white/80 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary dark:border-slate-800 dark:bg-slate-900/80"
              value={role}
              onChange={(event) => onRoleChange(event.target.value as Role)}
              aria-label="Selecionar perfil"
            >
              {availableRoles.map((item) => (
                <option key={item} value={item}>
                  {item === "gestor" ? "Gestor(a)" : "Médico(a)"}
                </option>
              ))}
            </select>
            <div className="rounded-2xl border border-sky-200/60 bg-sky-100/70 px-4 py-3 text-xs text-sky-700 shadow-inner dark:border-sky-600/30 dark:bg-sky-900/50 dark:text-sky-200">
              <p className="font-semibold">Regras de acesso</p>
              <ul className="mt-1 space-y-1">
                <li>• Médicos: leitura na Agenda e faturamento próprio.</li>
                <li>• Gestores: gerenciam slots e visualizam faturamento geral.</li>
                <li>• Todos os perfis seguem LGPD e trilha de auditoria.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-2 text-xs text-slate-500 lg:w-60">
          <div className="rounded-2xl border border-white/40 bg-white/70 p-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
            <span className="font-semibold text-slate-600 dark:text-slate-100">Resumo rápido</span>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
              Produção filtrada: <strong>{formatCurrency(homeData.production.reduce((acc, loc) => acc + loc.value, 0))}</strong>
            </p>
            <p className="text-xs text-slate-400">Exportar PDF/CSV disponível nas seções dedicadas.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

type SidebarItemProps = {
  module: AppModule;
  collapsed: boolean;
  currentPath: string;
};

function SidebarItem({ module, collapsed, currentPath }: SidebarItemProps) {
  const isActive = module.path ? currentPath.startsWith(module.path) : false;
  const [open, setOpen] = React.useState(() => currentPath.startsWith(module.path ?? ""));
  const Icon = module.icon;

  const hasChildren = Boolean(module.children?.length);

  React.useEffect(() => {
    if (!hasChildren) return;
    const match = module.children?.some((child) => currentPath.startsWith(child.path ?? ""));
    if (match) setOpen(true);
  }, [currentPath, hasChildren, module.children]);

  if (hasChildren) {
    return (
      <li>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            "group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-white/60 hover:text-midnight dark:text-slate-300 dark:hover:bg-slate-800/80",
            isActive && "bg-white/70 text-midnight shadow-sm dark:bg-slate-800/70 dark:text-slate-100",
          )}
          aria-expanded={open}
        >
          <Icon className="h-5 w-5 text-sky-500" aria-hidden />
          {!collapsed && <span className="flex-1">{module.label}</span>}
          {!collapsed && (
            <svg
              className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
            >
              <path d="M6 8l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        {open && (
          <ul className={cn("ml-2 mt-2 flex flex-col gap-1 border-l border-white/50 pl-4", collapsed && "hidden")}
            aria-label={`Subseções de ${module.label}`}
          >
            {module.children?.map((child) => (
              <li key={child.key}>
                <NavLink
                  to={child.path ?? "#"}
                  className={({ isActive: childActive }) =>
                    cn(
                      "flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-500 transition hover:bg-white/70 hover:text-midnight dark:text-slate-400 dark:hover:bg-slate-800/70 dark:hover:text-slate-100",
                      (childActive || currentPath === child.path) &&
                        "bg-white/80 text-midnight shadow-sm dark:bg-slate-800/80 dark:text-slate-100",
                    )
                  }
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" aria-hidden />
                  {child.label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}
      </li>
    );
  }

  return (
    <li>
      <NavLink
        to={module.path ?? "#"}
        className={({ isActive: linkActive }) =>
          cn(
            "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-white/60 hover:text-midnight dark:text-slate-300 dark:hover:bg-slate-800/80",
            (linkActive || isActive) && "bg-white/80 text-midnight shadow-sm dark:bg-slate-800/80 dark:text-slate-100",
          )
        }
        aria-current={isActive ? "page" : undefined}
      >
        <Icon className="h-5 w-5 text-sky-500" aria-hidden />
        {!collapsed && <span>{module.label}</span>}
      </NavLink>
    </li>
  );
}

export const defaultModules: AppModule[] = [
  { key: "dashboard", label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { key: "agenda", label: "Agenda", path: "/agenda", icon: CalendarCheck2 },
  { key: "producao", label: "Produção", path: "/producao", icon: Activity },
  { key: "faturamento", label: "Faturamento", path: "/faturamento", icon: HandCoins },
  { key: "notas", label: "Notas Fiscais", path: "/notas-fiscais", icon: FileText },
  { key: "relatorios", label: "Relatórios", path: "/relatorios", icon: BarChart4 },
  { key: "pacientes", label: "Pacientes", path: "/pacientes", icon: Users },
  {
    key: "cadastros",
    label: "Cadastros",
    path: "/cadastros",
    icon: NotebookPen,
    children: [
      { key: "cadastros-medicos", label: "Médicos", path: "/cadastros/medicos", icon: Stethoscope },
      { key: "cadastros-gestores", label: "Gestores", path: "/cadastros/gestores", icon: FolderCog },
      { key: "cadastros-locais", label: "Locais", path: "/cadastros/locais", icon: Building2 },
      { key: "cadastros-procedimentos", label: "Procedimentos", path: "/cadastros/procedimentos", icon: ScrollText },
      { key: "cadastros-precos", label: "Tabela de Preços", path: "/cadastros/tabela-precos", icon: HandCoins },
    ],
  },
  { key: "configuracoes", label: "Configurações", path: "/configuracoes", icon: Settings },
  { key: "lgpd", label: "LGPD / Auditoria", path: "/lgpd", icon: ShieldCheck },
  { key: "suporte", label: "Suporte", path: "/suporte", icon: LifeBuoy },
];
