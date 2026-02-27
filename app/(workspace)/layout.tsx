import type { ReactNode } from "react";
import { WorkspaceShell } from "@/components/workspace-shell";
import { getActiveSessionUser } from "@/lib/authz";
import { redirect } from "next/navigation";

export const runtime = "nodejs";

export default async function WorkspaceLayout({ children }: { children: ReactNode }) {
  const user = await getActiveSessionUser();
  if (!user) {
    redirect("/login");
  }

  return (
    <WorkspaceShell user={{ name: user.name, email: user.email, role: user.role }}>
      {children}
    </WorkspaceShell>
  );
}
