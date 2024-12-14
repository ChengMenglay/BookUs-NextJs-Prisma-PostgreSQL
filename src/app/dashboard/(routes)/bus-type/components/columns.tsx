"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import Image from "next/image";

export type BusTypeColumn = {
  id: string;
  type: string;
  image: string;
  createdAt: string;
};

export const columns: ColumnDef<BusTypeColumn>[] = [
  {
    accessorKey: "Bus",
    cell: ({ row }) => (
      <Image
        alt={row.original.type}
        width={200}
        height={200}
        src={row.original.image}
        className="rounded-md"
      />
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
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
