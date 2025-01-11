"use client";
import React, { FC, useState, useMemo } from "react";
import { TicketColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";

interface TicketClientProps {
  data: TicketColumn[];
}

export const TicketClient: FC<TicketClientProps> = ({ data }) => {
  const [selectedTab, setSelectedTab] = useState("All");

  // Filter orders based on the selected tab
  const filterTicket = useMemo(() => {
    return data.filter((ticket) => {
      if (selectedTab === "All") return true;
      return ticket.status === selectedTab;
    });
  }, [data, selectedTab]);

  return (
    <>
      <div className="py-4 px-4 h-auto">
        <div className="mb-4">
          <Header
            title="Ticket"
            total={data.length}
            subtitle="Manage ticket for your store."
          />
        </div>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="All">All</TabsTrigger>
            <TabsTrigger value="Pending">Pending</TabsTrigger>
            <TabsTrigger value="Completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="All">
            <DataTable
              searchKey="phoneNumber"
              columns={columns}
              data={filterTicket}
            />
          </TabsContent>
          <TabsContent value="Pending">
            <DataTable
              searchKey="phoneNumber"
              columns={columns}
              data={filterTicket}
            />
          </TabsContent>
          <TabsContent value="Completed">
            <DataTable
              searchKey="phoneNumber"
              columns={columns}
              data={filterTicket}
            />
          </TabsContent>
          <TabsContent value="Canceled">
            <DataTable
              searchKey="phoneNumber"
              columns={columns}
              data={filterTicket}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};
