import { prisma } from "@/lib/prisma";
import React from "react";
import { TicketColumn } from "./components/columns";
import { format } from "date-fns";
import DashboardNav from "@/components/DashboardNav";
import { TicketClient } from "./components/client";
import { formatter } from "@/lib/utils";
export default async function Ticket() {
  const booking = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      schedule: {
        include: { route: true, bus: { include: { operator: true } } },
      },
    },
  });
  const formattedTicket: TicketColumn[] = booking.map((item) => ({
    id: item.id,
    bus: item.schedule.bus.number + " - " + item.schedule.bus.operator.name,
    trip: item.schedule.route.origin + " - " + item.schedule.route.destination,
    seat: item.seatNumber.map((seat) => seat).join(", "),
    totalPrice: formatter.format(Number(item.totalPrice)),
    phoneNumber: item.phoneNumber,
    isPaid: item.isPaid,
    status: item.status,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <DashboardNav title="Ticket" />
      <TicketClient data={formattedTicket} />
    </>
  );
}
