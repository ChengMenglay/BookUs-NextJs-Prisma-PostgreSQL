import React from "react";
import OperatorForm from "./components/OperatorForm";
import { prisma } from "@/lib/prisma";

export default async function OperatorPage({
  params,
}: {
  params: { operatorId: string };
}) {
  const operator = await prisma.operator.findUnique({
    where: { id: params.operatorId },
  });
  return (
    <div className="p-8">
      <OperatorForm initialData={operator} />
    </div>
  );
}
