import { prisma } from "@/lib/prisma";
import React from "react";
import BusClient from "./components/client";
import { BusTypeColumn } from "./components/columns";
import { format } from "date-fns";
import DashboardNav from "@/components/DashboardNav";
export default async function Bus() {
  const types = await prisma.type.findMany({
    orderBy: { createdAt: "desc" },
  });
  const formattedBus: BusTypeColumn[] = types.map((item) => ({
    id: item.id,
    type: item.type,
    image: item.image,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <DashboardNav title="Bus Type" />
      <BusClient data={formattedBus} />
    </>
  );
}
