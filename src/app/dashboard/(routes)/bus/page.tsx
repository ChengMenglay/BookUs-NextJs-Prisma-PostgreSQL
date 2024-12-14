import { prisma } from "@/lib/prisma";
import React from "react";
import BusClient from "./components/client";
import { BusColumn } from "./components/columns";
import { format } from "date-fns";
import DashboardNav from "@/components/DashboardNav";
export default async function Bus() {
  const buses = await prisma.bus.findMany({
    include: { operator: true, type: true },
    orderBy: { createdAt: "desc" },
  });
  const formattedBus: BusColumn[] = buses.map((item) => ({
    id: item.id,
    number: item.number,
    operator: item.operator.name,
    type: item.type.type,
    seat: item.seat,
    status: item.status,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <DashboardNav title="Bus" />
      <BusClient data={formattedBus} />
    </>
  );
}
