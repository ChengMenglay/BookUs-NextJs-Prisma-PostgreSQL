import React from "react";
import TicketComponent from "./TicketComponent";
import { prisma } from "@/lib/prisma";

type TicketDetailProps = {
  params: { ticketId: string };
};

export default async function TicketDetail({ params }: TicketDetailProps) {
  const ticket = await prisma.booking.findUnique({
    where: { id: params.ticketId },
    include: {
      schedule: {
        include: {
          bus: { include: { operator: true, type: true } },
          route: true,
        },
      },
    },
  });

  const formattedTicket = {
    phoneNumber: ticket?.phoneNumber || "",
    totalPrice: Number(ticket?.totalPrice) || 0,
    passenger_name: ticket?.passenger_name || "",
    email: ticket?.email || "",
    seatNumber: ticket?.seatNumber || [],
    schedule: ticket?.schedule
      ? {
          route: {
            origin: ticket.schedule.route?.origin || "",
            destination: ticket.schedule.route?.destination || "",
            distance_km: ticket.schedule.route?.distance_km || "",
          },
          bus: {
            number: ticket.schedule.bus.number || "",
            operator: {
              name: ticket.schedule.bus.operator.name || "",
              contact: ticket.schedule.bus.operator.contact || "",
            },
            type: {
              type: ticket.schedule.bus.type.type || "",
            },
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
  };

  return (
    <div>
      <TicketComponent ticket={formattedTicket} />
    </div>
  );
}
