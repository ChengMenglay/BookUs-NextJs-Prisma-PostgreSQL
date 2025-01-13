"use client";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Armchair, Info, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { addDays, differenceInMinutes, format } from "date-fns";
import { formatter } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";

type ScheduleListsProps = {
  schedule: {
    id: string;
    bus: {
      seat: number;
      operator: {
        name: string;
        contact: string;
      };

      type: {
        type: string;
        image: string;
      };
    };
    route: {
      origin: string;
      destination: string;
      distance_km: string;
    };
    boarding_point: string;
    boarding_url: string;
    departure_date: Date | null;
    departure_time: Date;
    arrival_time: Date;
    price: number; // Update to number
    available_seat: number;
    status: string;
    recurring: boolean;
    frequency: string;
    createdAt: Date;
    updatedAt: Date;
  };
  userId: string;
};
export default function ScheduleLists({
  schedule,
  userId,
}: ScheduleListsProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const departureTime = new Date(schedule.departure_time);
  let arrivalTime = new Date(schedule.arrival_time);
  if (arrivalTime < departureTime) {
    arrivalTime = addDays(arrivalTime, 1);
  }
  const totalMinutes = differenceInMinutes(arrivalTime, departureTime);
  const totalHours = Math.floor(totalMinutes / 60);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <div>
      <div className=" space-y-2 flex flex-col items-center">
        <Card className="w-full bg-blue-700 text-white min-h-40 lg:py-2 py-4 flex flex-col justify-center px-4  space-y-2 space-x-2">
          <h1 className="text-sm px-2 font-semibold">Book Us</h1>
          <div className="flex lg:flex-row flex-col md:justify-between md:items-center gap-2">
            <div className="flex items-center justify-between lg:px-4 px-0 w-full">
              <div className=" space-y-2 ">
                <h1 className="font-bold sm:text-lg">
                  {format(schedule.departure_time, "hh:mm a")}
                </h1>
                <h2 className="sm:text-lg">{schedule.route.origin}</h2>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center space-x-2 mx-1">
                  <div className="sm:w-16 w-12 border-t-2 border-gray-200 "></div>
                  <h1>{totalHours}h</h1>
                  <div className="sm:w-16 w-12 border-t-2 border-gray-200 "></div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant={"link"} className="text-white">
                      <Info /> Trip info
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl max-w-xl">
                    <DialogHeader>
                      <DialogTitle>
                        <a href={schedule.boarding_url}>
                          {schedule.boarding_point}
                        </a>
                      </DialogTitle>
                    </DialogHeader>
                    <Image
                      width={900}
                      height={400}
                      className=" object-cover"
                      src={schedule.bus.type.image}
                      alt={schedule.bus.type.type}
                    />
                    <div className="space-y-6">
                      <p className="text-gray-700">
                        Explore the journey with{" "}
                        {schedule.bus.type.type.toLowerCase()} comfort and enjoy
                        the scenic views along the way.
                      </p>
                      <div className="grid md:grid-cols-6 gap-4 grid-cols-3 ">
                        <div className="flex flex-col items-center">
                          <h3 className="font-bold">Departure:</h3>
                          <p className="text-sm">
                            {format(schedule.departure_time, "hh:mm a")}
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <h3 className="font-bold">Arrival:</h3>
                          <p className="text-sm">
                            {format(schedule.arrival_time, "hh:mm a")}
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <h3 className="font-bold">Duration:</h3>
                          <p className="text-sm">{totalHours + " hours"}</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <h3 className="font-bold">Availablity:</h3>
                          <p className="text-sm">
                            {schedule.available_seat + " seats left"}
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <h3 className="font-bold">Type:</h3>
                          <p className="text-sm">{schedule.bus.type.type}</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <h3 className="font-bold">Operator:</h3>
                          <p className="text-sm">
                            {schedule.bus.operator.contact}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="p-3 border border-blue-700">
                          <h2 className="font-bold">{schedule.route.origin}</h2>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="flex items-center space-x-2">
                            <div className="w-32 border-t-2 border-blue-700 "></div>
                            <h1>{totalHours}h</h1>
                            <div className="w-32 border-t-2 border-blue-700 "></div>
                          </div>
                        </div>

                        <div className="p-3 border border-blue-700">
                          <h2 className="font-bold">
                            {schedule.route.destination}
                          </h2>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className=" space-y-2">
                <h1 className="font-bold sm:text-lg">
                  {format(schedule.arrival_time, "hh:mm a")}
                </h1>
                <h2 className="sm:text-lg">{schedule.route.destination}</h2>
              </div>
            </div>
            <div className="space-y-2 lg:w-1/3 w-full flex lg:flex-col flex-row lg:justify-start justify-between items-center lg:px-4 px-0">
              <div className=" space-y-1">
                <a
                  className="lg:hidden flex items-center text-xs"
                  href={schedule.boarding_url}
                >
                  <MapPin className="w-3 h-3 mr-1" />
                  {schedule.boarding_point}
                </a>
                <h1 className=" lg:text-lg text-md">
                  AIR BUS ({schedule.bus.seat})
                </h1>
              </div>

              <h1 className="flex items-center">
                <Armchair className="lg:w-4 lg:h-4 w-3 h-3 mr-1" />

                {schedule.available_seat + " seats left"}
              </h1>
            </div>
            <div className="lg:w-1/3 w-full lg:border-l-2 lg:px-4 px-0 space-y-2  flex flex-col lg:items-center justify-center">
              <h1 className="font-bold text-xl ">
                {formatter.format(schedule.price)}
              </h1>
              <Button
                onClick={() => {
                  if (!userId) {
                    router.push("/login");
                  } else {
                    router.push(
                      `/transport/${schedule.route.origin
                        .split(" ")
                        .join("-")}/${schedule.route.destination
                        .split(" ")
                        .join("-")}/${format(
                        schedule.departure_date as Date,
                        "dd-MM-yyyy"
                      )}/${schedule.id}`
                    );
                  }
                }}
                className="bg-white text-blue-700 hover:text-white lg:w-auto w-full"
              >
                Select trip
              </Button>
            </div>
          </div>
          <a
            target="_blank"
            className="lg:flex hidden items-center text-sm"
            href={schedule.boarding_url}
          >
            <MapPin className="w-3 h-3 mr-1" />
            {schedule.boarding_point}
          </a>
        </Card>
      </div>
    </div>
  );
}
