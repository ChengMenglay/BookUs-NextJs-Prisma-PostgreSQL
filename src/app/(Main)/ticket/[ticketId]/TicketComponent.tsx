"use client";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowLeft, ArrowRight, Calendar, Download } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
type Props = {
  ticket: {
    totalPrice: number;
    phoneNumber: string;
    passenger_name: string;
    email: string;
    seatNumber: string[];
    schedule: {
      route: {
        origin: string;
        destination: string;
        distance_km: string;
      };
      bus: {
        number: string;
        operator: {
          name: string;
          contact: string;
        };
        type: {
          type: string;
        };
      };
      departure_date: Date | null;
      departure_time: Date;
      arrival_time: Date;
      price: number;
      boarding_point: string;
      boarding_url: string;
      dropping_point: string;
      dropping_url: string;
    } | null;
  } | null;
};
export default function TicketComponent({ ticket }: Props) {
  const searchParams = useSearchParams();
  const hasAlerted = useRef(false); // Ref to keep track of whether alert has been triggered

  useEffect(() => {
    // Ensure the toast is triggered only once
    if (hasAlerted.current) return; // If already alerted, skip

    if (searchParams?.get("success") === "1") {
      toast.success("Payment Completed.");
    } else {
      toast.error("Payment Failed.");
    }

    hasAlerted.current = true; // Mark that the alert has been triggered
  }, [searchParams]);
  const router = useRouter();

  const handleDownloadTicket = async () => {
    const ticketHtml = document.getElementById("ticket-detail");
    if (!ticketHtml) {
      toast.info("Ticket content is not available.");
    }
    try {
      const canvas = await html2canvas(ticketHtml as HTMLElement);
      const image = canvas.toDataURL("image/jgg"); // or "image/jpeg" for JPG
      const link = document.createElement("a");
      link.href = image;
      link.download = "ticket.jpg"; // Change to "ticket.jpg" for JPG
      link.click();
    } catch (error) {
      console.error("Failed to download the image:", error);
    }
  };
  return (
    <div className="py-20 flex justify-center">
      <Card className="w-[700px] px-4 py-2 space-y-1">
        <div id="ticket-detail">
          <CardTitle className="text-xl font-bold text-center my-4">
            Ticket Detail
          </CardTitle>
          <Card className="w-full p-4 my-2 bg-blue-600 rounded-lg shadow-md space-y-4">
            <h1 className="text-white text-lg font-semibold">Book Us</h1>
            <div className="flex justify-between items-center text-white">
              <div className="flex flex-col">
                <h2 className="text-lg font-bold">
                  {ticket?.schedule?.route.origin}
                </h2>
                <a href={ticket?.schedule?.boarding_url} className="text-sm">
                  {ticket?.schedule?.boarding_point}
                </a>
              </div>
              <ArrowRight className="text-2xl" />
              <div className="flex flex-col">
                <h2 className="text-lg font-bold">
                  {ticket?.schedule?.route.destination}
                </h2>
                <a href={ticket?.schedule?.dropping_url} className="text-sm">
                  {ticket?.schedule?.dropping_point}
                </a>
              </div>
            </div>
            <div className="flex items-center justify-between text-white">
              <p className=" text-sm flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {format(
                  ticket?.schedule?.departure_date as Date,
                  "dd/MM/yyyy"
                ) +
                  " " +
                  format(ticket?.schedule?.departure_time as Date, "HH:mm a")}
              </p>

              <p className=" text-sm flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {format(
                  ticket?.schedule?.departure_date as Date,
                  "dd/MM/yyyy"
                ) +
                  " " +
                  format(ticket?.schedule?.arrival_time as Date, "HH:mm a")}
              </p>
            </div>
          </Card>
          <div>
            <Card className=" p-2 space-y-2">
              <CardTitle className="text-md font-bold">Seat Number</CardTitle>
              <p>{ticket?.seatNumber.map((seat) => seat).join(", ")}</p>
            </Card>
            <Card className="p-2 space-y-2 my-2">
              <div className="space-y-2">
                <CardTitle className="text-md font-bold">
                  Bus Information
                </CardTitle>
                <Separator />
              </div>

              <div className=" w-full rounded-sm space-y-1">
                <h1 className="text-sm">
                  Bus number:{" "}
                  <span className="font-bold">
                    {ticket?.schedule?.bus.number}
                  </span>
                </h1>
                <h1 className="text-sm">
                  Type:{" "}
                  <span className="font-bold">
                    {ticket?.schedule?.bus.type.type}
                  </span>
                </h1>
                <h1 className="text-sm">
                  Operator:{" "}
                  <span className="font-bold">
                    {ticket?.schedule?.bus.operator.name}
                  </span>
                </h1>
                <h1 className="text-sm">
                  Operator contact:{" "}
                  <span className="font-bold">
                    {ticket?.schedule?.bus.operator.contact}
                  </span>
                </h1>
              </div>
            </Card>
            <Card className="p-2 space-y-2 my-2">
              <div className="space-y-2">
                <CardTitle className="text-md font-bold">Contact</CardTitle>
                <Separator />
              </div>

              <div className=" w-full rounded-sm space-y-1">
                <h1 className="text-sm">
                  Booking name:{" "}
                  <span className="font-bold">{ticket?.passenger_name}</span>
                </h1>
                <h1 className="text-sm">
                  Phone Number:{" "}
                  <span className="font-bold">{ticket?.phoneNumber}</span>
                </h1>
                <h1 className="text-sm">
                  Email: <span className="font-bold">{ticket?.email}</span>
                </h1>
              </div>
            </Card>
            <Card className="p-4 bg-blue-600 h-[80px] flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-white">
                Total Payment
              </CardTitle>
              <p className="text-md font-semibold text-white">
                {formatter.format(Number(ticket?.totalPrice))}
              </p>
            </Card>
          </div>
        </div>
        <div className="py-4 flex justify-end gap-x-2">
          <Button
            onClick={() => router.push("/")}
            variant={"outline"}
            className="h-12 hover:bg-blue-600 hover:text-white"
          >
            <ArrowLeft /> Go Back
          </Button>
          <Button
            onClick={handleDownloadTicket}
            variant={"outline"}
            className="h-12 bg-blue-600 hover:bg-blue-500 hover:text-white text-white"
          >
            <Download /> Download Ticket
          </Button>
        </div>
      </Card>
    </div>
  );
}
