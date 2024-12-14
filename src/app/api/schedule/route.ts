import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      busId,
      routeId,
      departure_time,
      arrival_time,
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
      !status
    ) {
      return NextResponse.json("All fields are required", { status: 400 });
    }
    const schedule = await prisma.schedule.create({
      data: {
        busId,
        routeId,
        departure_time,
        arrival_time,
        price,
        available_seat,
        frequency,
        status,
      },
    });
    return NextResponse.json(schedule);
  } catch (error) {
    console.log("[SCHEDULE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
