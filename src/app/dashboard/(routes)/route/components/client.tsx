"use client";
import React from "react";
import { columns, RouteColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type BusTypeProps = {
  data: RouteColumn[];
};
export default function RouteClient({ data }: BusTypeProps) {
  const router = useRouter();
  return (
    <div className="py-4 px-4 h-auto">
      <div className="flex justify-between">
        <Header
          title="Routes"
          total={data.length}
          subtitle="Manage route for your website."
        />
        <Button
          onClick={() => router.push(`/dashboard/route/new`)}
          className="h-10 bg-blue-700"
        >
          + Add new
        </Button>
      </div>
      <DataTable searchKey={"origin"} columns={columns} data={data} />
    </div>
  );
}
