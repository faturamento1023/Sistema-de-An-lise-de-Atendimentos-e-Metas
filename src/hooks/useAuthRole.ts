import * as React from "react";

type Role = "gestor" | "medico";

type Profile = {
  id: string;
  name: string;
  email: string;
  avatarInitials: string;
  role: Role;
};

type UseAuthRoleReturn = {
  role: Role;
  profile: Profile;
  availableRoles: Role[];
  setRole: (role: Role) => void;
};

const DEFAULT_PROFILE: Profile = {
  id: "u-gestora-001",
  name: "Dra. Helena Martins",
  email: "helena.martins@medimvp.com",
  avatarInitials: "HM",
  role: "gestor",
};

export function useAuthRole(): UseAuthRoleReturn {
  const [role, setRole] = React.useState<Role>(DEFAULT_PROFILE.role);
  const profile = React.useMemo<Profile>(
    () => ({ ...DEFAULT_PROFILE, role }),
    [role],
  );

  // TODO: Integrar com o provedor de autenticação real para obter o perfil/logins.
  // Este hook simula o retorno mínimo esperado pela Home para testes de UX.

  return {
    role,
    profile,
    availableRoles: ["gestor", "medico"],
    setRole,
  };
}

export type { Role, Profile, UseAuthRoleReturn };
