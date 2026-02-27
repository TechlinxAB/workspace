export type Role = "admin" | "customer";

export function isRole(value: unknown): value is Role {
  return value === "admin" || value === "customer";
}
