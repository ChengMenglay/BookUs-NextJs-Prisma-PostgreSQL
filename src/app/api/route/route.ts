import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { origin, destination, image_url, distance_km, type } = body;
    if (!origin)
      return NextResponse.json("Origin is required", { status: 400 });
    if (!destination)
      return NextResponse.json("Destination is required", { status: 400 });
    if (!image_url)
      return NextResponse.json("Image Url is required", { status: 400 });
    if (!distance_km)
      return NextResponse.json("Distance is required", { status: 400 });
    if (!type) return NextResponse.json("Type is required", { status: 400 });
    const route = await prisma.route.create({
      data: { origin, destination, image_url, distance_km, type },
    });
    return NextResponse.json(route);
  } catch (error) {
    console.log("[Route_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
