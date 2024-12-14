"use client";

import { ColumnDef } from "@tanstack/react-table";
import CellAction from "./cell-action";
import Image from "next/image";

export type RouteColumn = {
  id: string;
  origin: string;
  destination: string;
  image_url: string;
  distance_km: string;
  type: string;
  createdAt: string;
};

export const columns: ColumnDef<RouteColumn>[] = [
  {
    accessorKey: "Location",
    cell: ({ row }) => (
      <Image
        alt={row.original.origin + " - " + row.original.destination}
        width={200}
        height={200}
        src={row.original.image_url}
        className="rounded-md"
      />
    ),
  },
  {
    accessorKey: "origin",
    header: "Origin",
  },
  {
    accessorKey: "destination",
    header: "Destination",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "distance_km",
    header: "Distance (Km)",
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
