"use client";
import React, { FC, useState, useMemo } from "react";
import { ScheduleColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ScheduleClientProps {
  data: ScheduleColumn[];
}

export const ScheduleClient: FC<ScheduleClientProps> = ({ data }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("All");

  // Filter orders based on the selected tab
  const filterSchedule = useMemo(() => {
    return data.filter((schedule) => {
      if (selectedTab === "All") return true;
      return schedule.status === selectedTab;
    });
  }, [data, selectedTab]);

  return (
    <>
      <div className="py-4 px-4 h-auto">
        <div className="flex justify-between mb-4">
          <Header
            title="Schedule"
            total={data.length}
            subtitle="Manage schedule for your store."
          />
          <Button
            onClick={() => router.push(`/dashboard/schedule/new`)}
            className="h-10 bg-blue-700"
          >
            + Add new
          </Button>
        </div>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Active">Active</TabsTrigger>
            <TabsTrigger value="Archived">Archived</TabsTrigger>
            <TabsTrigger value="Canceled">Canceled</TabsTrigger>
          </TabsList>
          <TabsContent value="All">
            <DataTable
              searchKey="bus"
              columns={columns}
              data={filterSchedule}
            />
          </TabsContent>
          <TabsContent value="Active">
            <DataTable
              searchKey="bus"
              columns={columns}
              data={filterSchedule}
            />
          </TabsContent>
          <TabsContent value="Archived">
            <DataTable
              searchKey="bus"
              columns={columns}
              data={filterSchedule}
            />
          </TabsContent>
          <TabsContent value="Canceled">
            <DataTable
              searchKey="bus"
              columns={columns}
              data={filterSchedule}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
