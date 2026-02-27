import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const runtime = "nodejs";

export default async function HomePage() {
  const session = await auth();
  redirect(session ? "/dashboard" : "/login");
}
