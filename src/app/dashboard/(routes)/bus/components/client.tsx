"use client";
import React from "react";
import { columns, BusColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type BusClientProps = {
  data: BusColumn[];
};
export default function BusClient({ data }: BusClientProps) {
  const router = useRouter();
  return (
    <div className="py-4 px-4 h-auto">
      <div className="flex justify-between">
        <Header
          title="Buses"
          total={data.length}
          subtitle="Manage bus for your website."
        />
        <Button
          onClick={() => router.push(`/dashboard/bus/new`)}
          className="h-10 bg-blue-700"
        >
          + Add new
        </Button>
      </div>
      <DataTable searchKey={"number"} columns={columns} data={data} />
    </div>
  );
}
