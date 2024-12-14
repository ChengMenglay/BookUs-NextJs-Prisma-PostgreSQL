import React from "react";
import { prisma } from "@/lib/prisma";
import RouteForm from "./components/RouteForm";

export default async function RoutePage({
  params,
}: {
  params: { routeId: string };
}) {
  const route = await prisma.route.findUnique({
    where: { id: params.routeId },
  });
  const province = await prisma.province.findMany();
  return (
    <div className="p-8">
      <RouteForm province={province} initialData={route} />
    </div>
  );
}
