"use server";

import { AuthError } from "next-auth";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";

export type LoginActionState = {
  error: string | null;
  email: string;
};

function getErrorMessage(code: string | null) {
  if (code === "disabled") {
    return "This account is disabled. Contact Techlinx.";
  }

  if (code === "rate_limited") {
    return "Too many login attempts. Try again in a few minutes.";
  }

  return "Incorrect email or password.";
}

export async function loginAction(_: LoginActionState, formData: FormData): Promise<LoginActionState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required.", email };
  }

  try {
    await signIn("credentials", {
      redirect: false,
      email,
      password
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin") {
        const code = "code" in error && typeof error.code === "string" ? error.code : null;
        return { error: getErrorMessage(code), email };
      }

      if ("kind" in error && error.kind === "signIn") {
        return { error: "Incorrect email or password.", email };
      }

      return { error: "Something went wrong. Try again.", email };
    }

    return { error: "Something went wrong. Try again.", email };
  }

  redirect("/dashboard");
}
