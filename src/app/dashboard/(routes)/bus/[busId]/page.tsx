import React from "react";
import { prisma } from "@/lib/prisma";
import BusForm from "./components/BusForm";

export default async function BusPage({
  params,
}: {
  params: { busId: string };
}) {
  const bus = await prisma.bus.findUnique({
    where: { id: params.busId },
  });
  const operator = await prisma.operator.findMany({
    orderBy: { createdAt: "desc" },
  });
  const type = await prisma.type.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <div className="p-8">
      <BusForm operator={operator} type={type} initialData={bus} />
    </div>
  );
}
