import React from "react";
import { prisma } from "@/lib/prisma";
import BusTypeForm from "./components/BusTypeForm";

export default async function BusPage({
  params,
}: {
  params: { busTypeId: string };
}) {
  const type = await prisma.type.findUnique({
    where: { id: params.busTypeId },
  });
  return (
    <div className="p-8">
      <BusTypeForm initialData={type} />
    </div>
  );
}
