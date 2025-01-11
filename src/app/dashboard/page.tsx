import React from "react";
import DashboardNav from "@/components/DashboardNav";
import Overview from "./components/Overview";
import { getAllAdmin, getAllUser } from "./actions/getAllUser";
import { getAllTicket } from "./actions/getTicket";
import { BarChartComponent } from "@/components/BarChart";

export default async function Dashboard() {
  const users = await getAllUser();
  const admins = await getAllAdmin();
  const tickets = await getAllTicket();
  const formattedTickets: {
    id: string;
    seatNumber: string[];
    totalPrice: number;
    schedule: {
      price: number;
      departure_date: Date | null;
    };
  }[] =
    tickets?.map((ticket) => ({
      id: ticket.id,
      seatNumber: ticket.seatNumber,
      totalPrice: Number(ticket.totalPrice),
      schedule: {
        price: ticket.schedule?.price ? Number(ticket.schedule.price) : 0,
        departure_date: ticket.schedule.departure_date
          ? ticket.schedule.departure_date
          : null,
      },
    })) || [];
  return (
    <>
      <DashboardNav title="Overview" />
      <Overview users={users} admins={admins} tickets={formattedTickets} />
      <div className="px-4">
        <BarChartComponent ticket={formattedTickets} />
      </div>
    </>
  );
}
