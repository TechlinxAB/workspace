import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { isTechlinxAdmin } from "@/lib/roles";

export async function getActiveSessionUser() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      isActive: true,
      createdAt: true
    }
  });

  if (!user || !user.isActive) {
    await prisma.session.deleteMany({ where: { userId: session.user.id } });
    return null;
  }

  return user;
}

export async function getAdminSessionUser() {
  const user = await getActiveSessionUser();
  if (!user) {
    return { status: 401 as const };
  }

  if (!isTechlinxAdmin(user.role)) {
    return { status: 403 as const, user };
  }

  return { status: 200 as const, user };
}
