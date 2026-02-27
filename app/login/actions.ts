"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

export type LoginActionState = {
  error: string | null;
};

function getErrorMessage(code: string | null) {
  if (code === "rate_limited") {
    return "Too many login attempts. Try again in a few minutes.";
  }

  return "Invalid email or password.";
}

export async function loginAction(_: LoginActionState, formData: FormData): Promise<LoginActionState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const responseUrl = await signIn("credentials", {
    redirect: false,
    redirectTo: "/dashboard",
    email,
    password
  });

  const requestHeaders = await headers();
  const origin = requestHeaders.get("origin") ?? process.env.AUTH_URL ?? "http://localhost:3000";
  const url = new URL(responseUrl, origin);
  const error = url.searchParams.get("error");

  if (error) {
    return { error: getErrorMessage(url.searchParams.get("code")) };
  }

  redirect(url.pathname + url.search + url.hash);
}
