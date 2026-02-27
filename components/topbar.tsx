import { Bell, Search } from "lucide-react";
import { signOut } from "@/auth";
import type { Role } from "@/lib/roles";

type TopbarProps = {
  user: {
    name: string | null;
    email: string;
    role: Role;
  };
};

function getInitials(name: string | null, email: string) {
  const source = name?.trim() || email;
  return source
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function Topbar({ user }: TopbarProps) {
  const displayName = user.name ?? user.email;

  return (
    <header className="flex h-16 flex-wrap items-center justify-between gap-3">
      <label className="relative min-w-[260px] flex-1 max-w-[520px]">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Tap to search"
          className="focus-ring h-11 w-full rounded-full border border-[rgba(18,18,18,0.06)] bg-[rgba(255,255,255,0.55)] pl-11 pr-4 text-sm text-ink shadow-[0_6px_16px_rgba(18,18,18,0.04)] placeholder:text-muted/90"
        />
      </label>

      <div className="flex items-center gap-2">
        <button
          type="button"
          className="focus-ring relative grid h-10 w-10 place-items-center rounded-full text-muted transition-all duration-200 hover:bg-[rgba(241,244,242,0.8)] hover:text-ink"
        >
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
        </button>

        <div className="flex items-center gap-2 rounded-full px-2 py-1.5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-xs font-bold text-[#2F5B3A]">
            {getInitials(user.name, user.email)}
          </span>
          <span className="pr-1 text-xs leading-tight">
            <span className="block font-semibold text-ink">{displayName}</span>
            <span className="block text-muted">{user.role === "admin" ? "Workspace Admin" : "Workspace User"}</span>
          </span>
        </div>

        <form
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/login" });
          }}
        >
          <button
            type="submit"
            className="focus-ring rounded-full border border-[rgba(18,18,18,0.08)] px-4 py-2 text-xs font-semibold text-muted transition hover:bg-[rgba(241,244,242,0.8)] hover:text-ink"
          >
            Log out
          </button>
        </form>
      </div>
    </header>
  );
}
