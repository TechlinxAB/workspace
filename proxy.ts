import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { isTechlinxAdmin } from "@/lib/roles";

const SESSION_COOKIE_NAME = process.env.NODE_ENV === "production" ? "__Secure-authjs.session-token" : "authjs.session-token";

export const proxy = auth(async (request) => {
  const { pathname } = request.nextUrl;

  if (pathname === "/login" || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (!request.auth?.user?.id) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const user = await prisma.user.findUnique({
    where: { id: request.auth.user.id },
    select: { role: true, isActive: true }
  });

  if (!user || !user.isActive) {
    await prisma.session.deleteMany({ where: { userId: request.auth.user.id } });
    const response = NextResponse.redirect(new URL("/login?error=disabled", request.url));
    response.cookies.set(SESSION_COOKIE_NAME, "", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 0
    });
    return response;
  }

  if (pathname.startsWith("/admin") && !isTechlinxAdmin(user.role)) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"]
};
