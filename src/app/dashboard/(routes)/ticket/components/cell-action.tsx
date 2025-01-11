"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import React from "react";
import { TicketColumn } from "./columns";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type CellActionProps = {
  data: TicketColumn;
};
export default function CellAction({ data }: CellActionProps) {
  const router = useRouter();
  return (
    <>
      <Button
        variant={"outline"}
        onClick={() => router.push(`/ticket/${data.id}`)}
      >
        Detail
      </Button>
    </>
  );
}
