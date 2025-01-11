"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { TicketColumn } from "./columns";
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
