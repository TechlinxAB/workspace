import { randomUUID } from "crypto";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { Role as PrismaRole } from "@prisma/client";
import NextAuth, { CredentialsSignin, type Session } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { decode as defaultDecode, encode as defaultEncode } from "next-auth/jwt";
import prisma from "@/lib/prisma";
import { clearLoginAttempts, registerLoginAttempt } from "@/lib/rate-limit";

class InvalidCredentialsError extends CredentialsSignin {
  code = "invalid_credentials";
}

class RateLimitedLoginError extends CredentialsSignin {
  code = "rate_limited";
}

class DisabledAccountError extends CredentialsSignin {
  code = "disabled";
}

function getClientAddress(headers: Headers) {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return headers.get("x-real-ip") ?? "unknown";
}

function getLoginRateLimitKey(email: string, headers: Headers) {
  return `${email}:${getClientAddress(headers)}`;
}

function buildSessionCookieName() {
  return process.env.NODE_ENV === "production" ? "__Secure-authjs.session-token" : "authjs.session-token";
}

function loadArgon2() {
  return eval("require")("argon2") as typeof import("argon2");
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as never,
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "database"
  },
  trustHost: process.env.AUTH_TRUST_HOST === "true",
  useSecureCookies: process.env.NODE_ENV === "production",
  cookies: {
    sessionToken: {
      name: buildSessionCookieName(),
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production"
      }
    }
  },
  jwt: {
    async encode(params) {
      if (!params.token?.sub) {
        return defaultEncode(params);
      }

      const sessionToken = randomUUID();
      const expires = new Date(Date.now() + (params.maxAge ?? 30 * 24 * 60 * 60) * 1000);

      await prisma.session.create({
        data: {
          sessionToken,
          userId: params.token.sub,
          expires
        }
      });

      return sessionToken;
    },
    decode: defaultDecode
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, request) {
        const email = String(credentials.email ?? "")
          .trim()
          .toLowerCase();
        const password = String(credentials.password ?? "");

        if (!email || !password) {
          throw new InvalidCredentialsError();
        }

        const rateLimitKey = getLoginRateLimitKey(email, request.headers);
        const rateLimit = registerLoginAttempt(rateLimitKey);
        if (!rateLimit.allowed) {
          // TODO: move this limiter to Redis or another shared store for multi-instance deployments.
          throw new RateLimitedLoginError();
        }

        const user = await prisma.user.findUnique({
          where: { email },
          select: {
            id: true,
            email: true,
            name: true,
            passwordHash: true,
            role: true,
            isActive: true
          }
        });

        if (!user || !user.passwordHash) {
          throw new InvalidCredentialsError();
        }

        if (!user.isActive) {
          throw new DisabledAccountError();
        }

        const argon2 = loadArgon2();
        const isValidPassword = await argon2.verify(user.passwordHash, password);
        if (!isValidPassword) {
          throw new InvalidCredentialsError();
        }

        clearLoginAttempts(rateLimitKey);

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role as PrismaRole
        };
      }
    })
  ],
  callbacks: {
    async session({ session, user }) {
      const nextSession = session as Session;
      if (nextSession.user) {
        nextSession.user.id = user.id;
        nextSession.user.role = user.role as PrismaRole;
      }

      return nextSession;
    },
    async signIn({ user }) {
      if (!user.id) {
        return false;
      }

      const activeUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { isActive: true }
      });

      return !!activeUser?.isActive;
    }
  }
});
