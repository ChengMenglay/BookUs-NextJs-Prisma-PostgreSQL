"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { ArrowRight, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type MyBookingListProps = {
  ticket: {
    id: string;
    seatNumber: string[];
    totalPrice: number;
    schedule: {
      departure_time: Date;
      arrival_time: Date;
      departure_date: Date | null;
      price: number;
      route: {
        origin: string;
        destination: string;
      };
    } | null;
  } | null;
};
export default function MyBookingList({ ticket }: MyBookingListProps) {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;
  return (
    <Card className="py-3 px-5">
      <div className="flex flex-col space-y-4 items-start justify-between">
        <span className="flex items-center border rounded-t-md p-2">
          <Calendar className="w-4 h-4 mr-1" />
          <span className="text-sm">
            {format(
              ticket?.schedule?.departure_date as Date,
              "EEEE, MMMM d, yyyy"
            )}
          </span>
        </span>
        <div className="flex w-full justify-between items-center">
          <div className="">
            <p className="text-lg font-semibold">
              {ticket?.schedule?.route.origin}
            </p>
            <p className="text-md">
              {format(ticket?.schedule?.departure_time as Date, "HH:mm a")}
            </p>
          </div>
          <span>
            <ArrowRight />
          </span>
          <div className="">
            <p className="text-lg font-semibold">
              {ticket?.schedule?.route.destination}
            </p>
            <p className="text-md">
              {format(ticket?.schedule?.arrival_time as Date, "HH:mm a")}
            </p>
          </div>
          <Button
            onClick={() => router.push(`/ticket/${ticket?.id}`)}
            className="bg-blue-600 text-white"
            variant={"outline"}
          >
            View Ticket <ArrowRight />
          </Button>
        </div>
      </div>
    </Card>
  );
}
