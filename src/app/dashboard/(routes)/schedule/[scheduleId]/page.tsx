import React from "react";
import { prisma } from "@/lib/prisma";
import ScheduleForm from "./components/ScheduleForm";

export default async function SchedulePage({
  params,
}: {
  params: { scheduleId: string };
}) {
  const schedule = await prisma.schedule.findUnique({
    where: { id: params.scheduleId },
  });
  const buses = await prisma.bus.findMany({
    include: { operator: true },
  });
  const route = await prisma.route.findMany();
  return (
    <div className="p-8">
      <ScheduleForm bus={buses} route={route} initialData={schedule} />
    </div>
  );
}
