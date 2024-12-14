import { prisma } from "@/lib/prisma";
import React from "react";
import { RouteColumn } from "./components/columns";
import { format } from "date-fns";
import DashboardNav from "@/components/DashboardNav";
import RouteClient from "./components/client";
export default async function Route() {
  const route = await prisma.route.findMany({
    orderBy: { createdAt: "desc" },
  });
  const formattedRoute: RouteColumn[] = route.map((item) => ({
    id: item.id,
    origin: item.origin,
    destination: item.destination,
    image_url: item.image_url,
    distance_km: item.distance_km,
    type: item.type,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <DashboardNav title="Route" />
      <RouteClient data={formattedRoute} />
    </>
  );
}
