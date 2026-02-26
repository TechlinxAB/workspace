"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import type { Role } from "@/lib/mockData";

export function WorkspaceShell({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("customer");

  return (
    <div className="relative z-10 min-h-screen w-full bg-white p-6">
      <div className="grid min-h-[calc(100vh-3rem)] w-full grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
        <Sidebar role={role} />
        <section className="min-w-0">
          <div className="mx-auto w-full max-w-[1240px]">
            <Topbar role={role} onRoleChange={setRole} />
            <div className="mt-4">{children}</div>
          </div>
        </section>
      </div>
    </div>
  );
}
