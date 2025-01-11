import { prisma } from "@/lib/prisma";

export const getAllUser = async () => {
  const users = await prisma.user.findMany({ where: { role: "User" } });
  if (!users) return null;
  return users;
};

export const getAllAdmin = async () => {
  const admins = await prisma.user.findMany({ where: { role: "Admin" } });
  if (!admins) return null;
  return admins;
};
