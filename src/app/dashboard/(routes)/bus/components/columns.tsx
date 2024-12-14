"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type BusColumn = {
  id: string;
  number: string;
  operator: string;
  type: string;
  seat: number;
  status: string;
  createdAt: string;
};

export const columns: ColumnDef<BusColumn>[] = [
  {
    accessorKey: "number",
    header: "Bus number",
  },
  {
    accessorKey: "operator",
    header: "Operator",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "seat",
    header: "Seat",
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
    accessorKey: " Action",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
