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
import { ScheduleColumn } from "./columns";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type CellActionProps = {
  data: ScheduleColumn;
};
export default function CellAction({ data }: CellActionProps) {
  const router = useRouter();
  const handleRemove = async () => {
    try {
      await axios.delete(`/api/schedule/${data.id}`);
      router.refresh();
      toast.success("Delete successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="w-8 h-8">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/dashboard/schedule/${data.id}`)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleRemove}>Remove</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
