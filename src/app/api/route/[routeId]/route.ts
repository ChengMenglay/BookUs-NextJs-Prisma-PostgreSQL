import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    req: NextRequest;
    params: { routeId: string };
  }
) {
  try {
    if (!params.routeId)
      return NextResponse.json("Params id is required", { status: 400 });
    const route = await prisma.route.findUnique({
      where: { id: params.routeId },
    });
    return NextResponse.json(route);
  } catch (error) {
    console.log("ROUTE_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    req: NextRequest;
    params: { routeId: string };
  }
) {
  try {
    const body = await req.json();
    if (!params.routeId)
      return NextResponse.json("Params id is required", { status: 400 });
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
    const route = await prisma.route.update({
      where: { id: params.routeId },
      data: { origin, destination, image_url, distance_km, type },
    });
    return NextResponse.json(route);
  } catch (error) {
    console.log("Route_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    req: NextRequest;
    params: { routeId: string };
  }
) {
  try {
    if (!params.routeId)
      return NextResponse.json("Params id is required", { status: 400 });
    const route = await prisma.route.delete({
      where: { id: params.routeId },
    });
    return NextResponse.json(route);
  } catch (error) {
    console.log("ROUTE_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
