import React from "react";
import { Card } from "./ui/card";
import { SidebarTrigger } from "./ui/sidebar";

export default function DashboardNav({ title }: { title: string }) {
  return (
    <Card className="h-20 w-full flex space-x-4 items-center px-4">
      <SidebarTrigger />
      <h1 className="text-2xl font-bold">{title}</h1>
    </Card>
  );
}
