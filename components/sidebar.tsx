"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getNavGroups } from "@/lib/nav";
import type { Role } from "@/lib/roles";

type SidebarProps = {
  role: Role;
};

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const navGroups = getNavGroups(role);

  return (
    <aside className="flex h-full flex-col px-4 py-1">
      <div className="mb-5 flex items-center gap-3 px-2 py-3">
        <div className="grid h-9 w-9 place-items-center">
          <img src="/app_logo.svg" alt="Techlinx logo" className="h-9 w-9" />
        </div>
        <div>
          <p className="text-sm font-bold text-ink">Techlinx</p>
          <p className="text-xs text-muted">Workspace</p>
        </div>
      </div>

      <nav className="flex-1 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-2 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={[
                        "group relative flex items-center gap-3 rounded-full px-[14px] py-3 text-sm font-semibold transition-all duration-200",
                        isActive
                          ? "bg-[rgba(230,240,234,0.95)] text-[#2F5B3A]"
                          : "text-muted hover:bg-[rgba(241,244,242,0.8)] hover:text-ink"
                      ].join(" ")}
                    >
                      {isActive ? (
                        <span className="absolute left-2.5 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[#6fae74]" />
                      ) : null}
                      <Icon
                        className={[
                          "h-4 w-4 transition-colors",
                          isActive ? "text-[#2F5B3A]" : "text-subtle group-hover:text-ink"
                        ].join(" ")}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
