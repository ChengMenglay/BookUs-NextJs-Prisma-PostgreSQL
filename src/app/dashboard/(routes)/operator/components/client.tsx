"use client";
import React from "react";
import { columns, OperatorColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type OperatorClientProps = {
  data: OperatorColumn[];
};
export default function OperatorClient({ data }: OperatorClientProps) {
  const router = useRouter();
  return (
    <div className="py-4 px-4 h-auto">
      <div className="flex justify-between">
        <Header
          title="Operators"
          total={data.length}
          subtitle="Manage operator for your website."
        />
        <Button
          onClick={() => router.push(`/dashboard/operator/new`)}
          className="h-10 bg-blue-700"
        >
          + Add new
        </Button>
      </div>
      <DataTable searchKey={"name"} columns={columns} data={data} />
    </div>
  );
}
