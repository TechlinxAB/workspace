import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

const WORKSPACE_PREFIXES = ["/dashboard", "/requests", "/it", "/website", "/marketing", "/billing", "/admin"];

function isWorkspacePath(pathname: string) {
  return WORKSPACE_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export const proxy = auth(async (request) => {
  const { pathname } = request.nextUrl;

  if (pathname === "/login" || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (!isWorkspacePath(pathname)) {
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
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin") && user.role !== "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"]
};
