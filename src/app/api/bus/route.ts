import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { number, operatorId, typeId, seat, status } = body;
    if (!number)
      return NextResponse.json("Bus number is required", { status: 400 });
    if (!operatorId)
      return NextResponse.json("Operator is required", { status: 400 });
    if (!typeId)
      return NextResponse.json("Bus type is required", { status: 400 });
    if (!seat) return NextResponse.json("Seat is required", { status: 400 });
    if (!status)
      return NextResponse.json("Status number is required", { status: 400 });
    const bus = await prisma.bus.create({
      data: { number, operatorId, typeId, seat, status },
    });
    return NextResponse.json(bus);
  } catch (error) {
    console.log("[BUS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
