"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type TicketColumn = {
  id: string;
  bus: string;
  trip: string;
  seat: string;
  totalPrice: string;
  phoneNumber: string;
  isPaid: boolean;
  status: string;
  createdAt: string;
};

export const columns: ColumnDef<TicketColumn>[] = [
  {
    accessorKey: "bus",
    header: "Bus",
  },
  {
    accessorKey: "trip",
    header: "Trip",
  },
  {
    accessorKey: "seat",
    header: "Seat",
  },
  {
    accessorKey: "totalPrice",
    header: "Total price",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone number",
  },
  {
    accessorKey: "isPaid",
    header: "IsPaid",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    accessorKey: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
