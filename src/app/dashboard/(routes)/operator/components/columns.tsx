"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";

export type OperatorColumn = {
  id: string;
  name: string;
  contact: string;
  address: string;
  createdAt: string;
};

export const columns: ColumnDef<OperatorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "address",
    header: "Address",
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
