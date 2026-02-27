import { redirect } from "next/navigation";
import { Card } from "@/components/Card";
import { LoginForm } from "@/components/login-form";
import { getActiveSessionUser } from "@/lib/authz";

export const runtime = "nodejs";

function getInitialError(error: string | string[] | undefined) {
  if (error === "disabled") {
    return "This account is disabled. Contact Techlinx.";
  }

  if (typeof error === "string" && error.length > 0) {
    return "Something went wrong. Try again.";
  }

  return null;
}

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string | string[] }>;
}) {
  const user = await getActiveSessionUser();
  if (user) {
    redirect("/dashboard");
  }

  const params = await searchParams;
  const initialError = getInitialError(params.error);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(205,231,213,0.55),transparent_32%),linear-gradient(180deg,#f8fbf8_0%,#eef5f0_100%)] px-6 py-10">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <Card className="w-full">
          <div className="mb-6 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1d6b3b]">Techlinx Workspace</p>
            <h1 className="mt-3 text-[24px] font-bold text-ink">Sign in</h1>
            <p className="mt-1 text-sm text-muted">Use the credentials issued by Techlinx.</p>
          </div>

          <LoginForm initialError={initialError} />
        </Card>
      </div>
    </main>
  );
}
