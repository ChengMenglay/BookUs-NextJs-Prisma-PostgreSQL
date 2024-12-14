import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    req: NextRequest;
    params: { busId: string };
  }
) {
  try {
    if (!params.busId)
      return NextResponse.json("Params id is required", { status: 400 });
    const bus = await prisma.bus.findUnique({
      where: { id: params.busId },
    });
    return NextResponse.json(bus);
  } catch (error) {
    console.log("BUST_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    req: NextRequest;
    params: { busId: string };
  }
) {
  try {
    const body = await req.json();
    if (!params.busId)
      return NextResponse.json("Params id is required", { status: 400 });
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
    const bus = await prisma.bus.update({
      where: { id: params.busId },
      data: { number, operatorId, typeId, seat, status },
    });
    return NextResponse.json(bus);
  } catch (error) {
    console.log("BUS_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    req: NextRequest;
    params: { busId: string };
  }
) {
  try {
    if (!params.busId)
      return NextResponse.json("Params id is required", { status: 400 });
    const bus = await prisma.bus.delete({
      where: { id: params.busId },
    });
    return NextResponse.json(bus);
  } catch (error) {
    console.log("BUS_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
