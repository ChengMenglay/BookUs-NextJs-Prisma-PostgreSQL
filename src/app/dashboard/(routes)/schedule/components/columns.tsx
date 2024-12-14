"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
export type ScheduleColumn = {
  id: string;
  bus: string;
  route: string;
  departure_time: string;
  arrival_time: string;
  price: string;
  available_seat: number;
  frequency: string;
  createdAt: string;
  status: string;
  recurring: boolean;
};

export const columns: ColumnDef<ScheduleColumn>[] = [
  {
    accessorKey: "bus",
    header: "Bus",
  },
  {
    accessorKey: "route",
    header: "Route",
  },
  {
    accessorKey: "departure_time",
    header: "Departure",
  },
  {
    accessorKey: "arrival_time",
    header: "Arrival",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "available_seat",
    header: "Available Seat",
  },
  {
    accessorKey: "frequency",
    header: "Frequency",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
