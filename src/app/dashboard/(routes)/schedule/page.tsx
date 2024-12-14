import React from "react";
import { format } from "date-fns";
import { prisma } from "@/lib/prisma";
import { ScheduleColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
import { ScheduleClient } from "./components/client";
import DashboardNav from "@/components/DashboardNav";

export default async function OrderPage() {
  const schedule = await prisma.schedule.findMany({
    include: {
      bus: { include: { operator: true } },
      route: true,
    },
    orderBy: { createdAt: "desc" },
  });
  const formmattedSchedule: ScheduleColumn[] = schedule.map((item) => ({
    id: item.id,
    bus: item.bus.number + " - " + item.bus.operator.name,
    route: item.route.origin + " - " + item.route.destination,
    departure_time: format(item.departure_time, "HH:mm a"),
    arrival_time: format(item.arrival_time, "HH:mm a"),
    price: formatter.format(item.price.toNumber()),
    available_seat: item.available_seat,
    frequency: item.frequency,
    createdAt: format(item.createdAt, "dd/MM/yyyy-HH:mm a"),
    status: item.status,
    recurring: item.recurring,
  }));
  return (
    <>
      <DashboardNav title="Schedule" />
      <ScheduleClient data={formmattedSchedule} />
    </>
  );
}
