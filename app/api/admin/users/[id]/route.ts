import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAdminSessionUser } from "@/lib/authz";
import { isRole } from "@/lib/roles";

export const runtime = "nodejs";

function loadArgon2() {
  return eval("require")("argon2") as typeof import("argon2");
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const admin = await getAdminSessionUser();
  if (admin.status === 401) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (admin.status === 403) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const data: Prisma.UserUpdateInput = {};

  if ("isActive" in body) {
    if (typeof body.isActive !== "boolean") {
      return NextResponse.json({ error: "Invalid isActive value" }, { status: 400 });
    }
    data.isActive = body.isActive;
  }

  if ("role" in body) {
    if (!isRole(body.role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }
    data.role = body.role;
  }

  if ("name" in body) {
    const name = String(body.name ?? "").trim();
    if (!name) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }
    data.name = name;
  }

  if ("temporaryPassword" in body) {
    const temporaryPassword = String(body.temporaryPassword ?? "");
    if (!temporaryPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    const argon2 = loadArgon2();
    data.passwordHash = await argon2.hash(temporaryPassword, { type: argon2.argon2id });
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No updates provided" }, { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    });

    if (data.isActive === false) {
      await prisma.session.deleteMany({ where: { userId: id } });
    }

    return NextResponse.json({ user });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    throw error;
  }
}
