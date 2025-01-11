import { getUserId } from "@/app/(auth)/actions/authAction";
import ScheduleLists from "@/components/ScheduleLists";
import SearchDestination from "@/components/SearchDestination";
import { Separator } from "@/components/ui/separator";
import { prisma } from "@/lib/prisma";
import { parse } from "date-fns";
import React from "react";
type TrasnportScheduleProps = {
  params: { origin: string; destination: string; departure_date: string };
};

export default async function TransportSchedule({
  params,
}: TrasnportScheduleProps) {
  const userId = await getUserId();
  const splitParamOrigin = params.origin.split("-").join(" ");
  const splitParamDestination = params.destination.split("-").join(" ");
  const splitFormatParamDepartureDate = parse(
    params.departure_date,
    "dd-MM-yyyy",
    new Date()
  );
  const province = await prisma.province.findMany();
  const schedule = await prisma.schedule.findMany({
    where: {
      OR: [
        { departure_date: splitFormatParamDepartureDate }, // Include schedules for a specific departure date
        { frequency: "daily", status: "Active" }, // Include daily active schedules
      ],
    },
    include: { bus: { include: { operator: true, type: true } }, route: true },
  });
  const filterSchedule = schedule.filter((item) => {
    return (
      item.route.origin === splitParamOrigin &&
      item.route.destination === splitParamDestination
    );
  });
  const transformScedule = filterSchedule.map((items) => ({
    ...items,
    departure_date: splitFormatParamDepartureDate,
    price: items.price.toNumber(),
  }));
  return (
    <div className="pt-20 container mx-auto px-2">
      <SearchDestination
        province={province}
        origin={splitParamOrigin}
        destination={splitParamDestination}
        departure_date={splitFormatParamDepartureDate}
      />
      <div className="mt-10 space-y-4">
        <h1 className="font-bold text-xl">
          Premium Bus| BookUs Air bus express (
          {transformScedule.filter((item) => item.bus.type.type === "Premium")
            .length +
            " " +
            (transformScedule.filter((item) => item.bus.type.type === "Premium")
              .length > 1
              ? "Departures"
              : "Departure")}
          )
        </h1>
        <Separator />
        {transformScedule
          .filter((item) => item.bus.type.type === "Premium")
          .map((item) => (
            <ScheduleLists
              key={`${item.route.origin}-${item.id}`}
              schedule={item}
              userId={userId as string}
            />
          ))}
      </div>
      <div className="mt-10 space-y-4">
        <h1 className="font-bold text-xl">
          Economy Bus| BookUs Air bus express (
          {transformScedule.filter((item) => item.bus.type.type === "Economy")
            .length +
            " " +
            (transformScedule.filter((item) => item.bus.type.type === "Economy")
              .length > 1
              ? "Departures"
              : "Departure")}
          )
        </h1>
        <Separator />
        {transformScedule
          .filter((item) => item.bus.type.type === "Economy")
          .map((item) => (
            <ScheduleLists
              key={`${item.route.origin}-${item.id}`}
              schedule={item}
              userId={userId as string}
            />
          ))}
      </div>
    </div>
  );
}
