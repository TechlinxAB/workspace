import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSessionUser } from "@/lib/authz";
import { isRole } from "@/lib/roles";

export const runtime = "nodejs";

function loadArgon2() {
  return eval("require")("argon2") as typeof import("argon2");
}

export async function GET() {
  const admin = await getAdminSessionUser();
  if (admin.status === 401) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (admin.status === 403) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true
    }
  });

  return NextResponse.json({ users });
}

export async function POST(request: Request) {
  const admin = await getAdminSessionUser();
  if (admin.status === 401) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (admin.status === 403) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const email = String(body.email ?? "").trim().toLowerCase();
  const name = String(body.name ?? "").trim();
  const role = body.role ?? "client_user";
  const temporaryPassword = String(body.temporaryPassword ?? "");

  if (!email || !name || !temporaryPassword || !isRole(role)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 409 });
  }

  const argon2 = loadArgon2();
  const passwordHash = await argon2.hash(temporaryPassword, { type: argon2.argon2id });

  const user = await prisma.user.create({
    data: {
      email,
      name,
      role,
      isActive: true,
      passwordHash
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true
    }
  });

  return NextResponse.json({ user }, { status: 201 });
}
