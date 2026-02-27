import type { ReactNode } from "react";
import type { Role } from "@/lib/roles";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";

type WorkspaceShellProps = {
  children: ReactNode;
  user: {
    name: string | null;
    email: string;
    role: Role;
  };
};

export function WorkspaceShell({ children, user }: WorkspaceShellProps) {
  return (
    <div className="relative z-10 min-h-screen w-full bg-white p-6">
      <div className="grid min-h-[calc(100vh-3rem)] w-full grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        <Sidebar role={user.role} />
        <section className="min-w-0">
          <div className="mx-auto w-full max-w-[1240px]">
            <Topbar user={user} />
            <div className="mt-4">{children}</div>
          </div>
        </section>
      </div>
    </div>
  );
}
