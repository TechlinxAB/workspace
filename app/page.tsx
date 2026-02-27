import { redirect } from "next/navigation";
import { getActiveSessionUser } from "@/lib/authz";

export const runtime = "nodejs";

export default async function HomePage() {
  const user = await getActiveSessionUser();
  redirect(user ? "/dashboard" : "/login");
}
