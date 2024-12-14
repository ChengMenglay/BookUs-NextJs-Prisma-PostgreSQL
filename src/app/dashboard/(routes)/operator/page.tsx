import { prisma } from "@/lib/prisma";
import React from "react";
import OperatorClient from "./components/client";
import { OperatorColumn } from "./components/columns";
import { format } from "date-fns";
import DashboardNav from "@/components/DashboardNav";
export default async function Operator() {
  const operators = await prisma.operator.findMany({
    orderBy: { createdAt: "desc" },
  });
  const formattedOperator: OperatorColumn[] = operators.map((item) => ({
    id: item.id,
    name: item.name,
    contact: item.contact,
    address: item.address,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <>
      <DashboardNav title="Operator" />
      <OperatorClient data={formattedOperator} />
    </>
  );
}
