import { prisma } from "@/lib/prisma";

export const getAllTicket = async () => {
  const ticket = await prisma.booking.findMany({
    where: { status: "Completed", isPaid: true },
    include: { schedule: { include: { route: true, bus: true } } },
    orderBy: { createdAt: "desc" },
  });
  if (!ticket) return null;

  return ticket;
};
