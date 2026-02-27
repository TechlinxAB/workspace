import { redirect } from "next/navigation";
import { Card } from "@/components/Card";
import { LoginForm } from "@/components/login-form";
import { getActiveSessionUser } from "@/lib/authz";

export const runtime = "nodejs";

export default async function LoginPage() {
  const user = await getActiveSessionUser();
  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(205,231,213,0.55),transparent_38%),linear-gradient(180deg,#f9fbf8_0%,#eef5f0_100%)] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl items-center justify-center">
        <div className="grid w-full gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[32px] border border-[rgba(255,255,255,0.9)] bg-[linear-gradient(180deg,rgba(255,255,255,0.88)_0%,rgba(255,255,255,0.68)_100%)] p-8 shadow-[0_24px_80px_rgba(18,18,18,0.08)] backdrop-blur-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1d6b3b]">Techlinx Workspace</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-ink">Secure access for customer and admin workspaces.</h1>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted">
              Authentication is handled server-side with database-backed sessions so access can be revoked immediately
              from the admin panel.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {[
                "Server-side Auth.js route handlers",
                "Postgres-backed sessions with revocation",
                "Admin and customer RBAC",
                "Reverse-proxy ready for aaPanel/nginx"
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-[24px] border border-[rgba(18,18,18,0.06)] bg-white/60 px-4 py-4 text-sm font-semibold text-ink shadow-[0_10px_24px_rgba(18,18,18,0.04)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          <Card className="self-center">
            <div className="mb-6">
              <h2 className="text-[22px] font-bold text-ink">Sign in</h2>
              <p className="mt-1 text-sm text-muted">Use your workspace credentials to continue.</p>
            </div>
            <LoginForm />
          </Card>
        </div>
      </div>
    </main>
  );
}
