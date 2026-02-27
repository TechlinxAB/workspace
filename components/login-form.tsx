"use client";

import { useActionState } from "react";
import { loginAction, type LoginActionState } from "@/app/login/actions";

const initialState: LoginActionState = {
  error: null
};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-semibold text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="focus-ring h-11 w-full rounded-2xl border border-[rgba(18,18,18,0.08)] bg-white/80 px-4 text-sm text-ink shadow-[0_8px_20px_rgba(18,18,18,0.05)]"
          placeholder="you@company.com"
          required
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-semibold text-ink">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          className="focus-ring h-11 w-full rounded-2xl border border-[rgba(18,18,18,0.08)] bg-white/80 px-4 text-sm text-ink shadow-[0_8px_20px_rgba(18,18,18,0.05)]"
          placeholder="Enter your password"
          required
        />
      </div>

      {state.error ? (
        <p className="rounded-2xl border border-[rgba(205,84,71,0.18)] bg-dangerBg px-4 py-3 text-sm text-danger">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="focus-ring w-full rounded-2xl bg-[#1d6b3b] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#185b32] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
