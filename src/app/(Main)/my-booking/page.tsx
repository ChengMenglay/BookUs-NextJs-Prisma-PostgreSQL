import React from "react";
import MyBookingList from "./MyBookingList";
import { getAllTicket } from "@/app/dashboard/actions/getTicket";
import { Separator } from "@/components/ui/separator";

export default async function MyBooking() {
  const tickets = await getAllTicket();
  const formattedTickets = tickets?.map((ticket) => ({
    ...ticket,
    totalPrice: Number(ticket.totalPrice),
    schedule: ticket?.schedule
      ? {
          route: {
            origin: ticket.schedule.route?.origin || "",
            destination: ticket.schedule.route?.destination || "",
          },
          boarding_point: ticket?.schedule.boarding_point,
          boarding_url: ticket?.schedule.boarding_url,
          dropping_point: ticket?.schedule.dropping_point,
          dropping_url: ticket?.schedule.dropping_url,
          departure_date: ticket.schedule.departure_date || null,
          departure_time: ticket.schedule.departure_time || new Date(),
          arrival_time: ticket.schedule.arrival_time || new Date(),
          price: ticket.schedule.price ? Number(ticket.schedule.price) : 0,
        }
      : null,
  }));
  return (
    <div className="py-20 w-[1200px] mx-auto">
      <div className=" space-y-3">
        <h1 className="text-2xl font-bold">My Booking History</h1>
        <Separator />
        <div>
          {formattedTickets?.map((ticket) => (
            <MyBookingList key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </div>
    </div>
  );
}
