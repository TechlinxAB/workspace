export const roles = [
  "techlinx_admin",
  "techlinx_webdev",
  "techlinx_marketing",
  "client_admin",
  "client_user"
] as const;

export type Role = (typeof roles)[number];

export const roleLabels: Record<Role, string> = {
  techlinx_admin: "Techlinx Admin",
  techlinx_webdev: "Techlinx Web Dev",
  techlinx_marketing: "Techlinx Marketing",
  client_admin: "Client Admin",
  client_user: "Client User"
};

export function isRole(value: unknown): value is Role {
  return typeof value === "string" && roles.includes(value as Role);
}

export function isTechlinxAdmin(role: Role) {
  return role === "techlinx_admin";
}
