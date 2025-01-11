import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    req: NextRequest;
    params: { scheduleId: string };
  }
) {
  try {
    if (!params.scheduleId)
      return NextResponse.json("Params id is required", { status: 400 });
    const schedule = await prisma.schedule.findUnique({
      where: { id: params.scheduleId },
    });
    return NextResponse.json(schedule);
  } catch (error) {
    console.log("SCHEDULE_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    req: NextRequest;
    params: { scheduleId: string };
  }
) {
  try {
    const body = await req.json();
    const {
      busId,
      routeId,
      departure_time,
      arrival_time,
      boarding_point,
      boarding_url,
      dropping_point,
      dropping_url,
      price,
      frequency,
      available_seat,
      status,
    } = body;
    if (
      !busId ||
      !routeId ||
      !departure_time ||
      !arrival_time ||
      !price ||
      !available_seat ||
      !status ||
      !boarding_point ||
      !boarding_url ||
      !dropping_point ||
      !dropping_url
    ) {
      return NextResponse.json("All fields are required", { status: 400 });
    }
    const schedule = await prisma.schedule.update({
      where: { id: params.scheduleId },
      data: {
        busId,
        routeId,
        departure_time,
        arrival_time,
        boarding_point,
        boarding_url,
        dropping_point,
        dropping_url,
        price,
        available_seat,
        frequency,
        status,
      },
    });
    return NextResponse.json(schedule);
  } catch (error) {
    console.log("SCHEDULE_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    req: NextRequest;
    params: { scheduleId: string };
  }
) {
  try {
    if (!params.scheduleId)
      return NextResponse.json("Params id is required", { status: 400 });
    const schedule = await prisma.schedule.delete({
      where: { id: params.scheduleId },
    });
    return NextResponse.json(schedule);
  } catch (error) {
    console.log("SCHEDULE_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
