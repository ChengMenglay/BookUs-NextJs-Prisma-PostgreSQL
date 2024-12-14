"use client";
import React from "react";
import { columns, BusTypeColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type BusTypeProps = {
  data: BusTypeColumn[];
};
export default function BusTypeClient({ data }: BusTypeProps) {
  const router = useRouter();
  return (
    <div className="py-4 px-4 h-auto">
      <div className="flex justify-between">
        <Header
          title="Bus Types"
          total={data.length}
          subtitle="Manage type of bus for your website."
        />
        <Button
          onClick={() => router.push(`/dashboard/bus-type/new`)}
          className="h-10 bg-blue-700"
        >
          + Add new
        </Button>
      </div>
      <DataTable searchKey={"type"} columns={columns} data={data} />
    </div>
  );
}
