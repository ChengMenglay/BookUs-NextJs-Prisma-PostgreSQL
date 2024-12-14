import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    req: NextRequest;
    params: { busTypeId: string };
  }
) {
  try {
    if (!params.busTypeId)
      return NextResponse.json("Params id is required", { status: 400 });
    const busType = await prisma.type.findUnique({
      where: { id: params.busTypeId },
    });
    return NextResponse.json(busType);
  } catch (error) {
    console.log("BUSTYPE_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    req: NextRequest;
    params: { busTypeId: string };
  }
) {
  try {
    const body = await req.json();
    const { type, image } = body;
    if (!params.busTypeId)
      return NextResponse.json("Params id is required", { status: 400 });
    if (!type) return NextResponse.json("Type is required", { status: 400 });
    if (!image) return NextResponse.json("Image is required", { status: 400 });
    const busType = await prisma.type.update({
      where: { id: params.busTypeId },
      data: { type, image },
    });
    return NextResponse.json(busType);
  } catch (error) {
    console.log("BUSTYPE_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    req: NextRequest;
    params: { busTypeId: string };
  }
) {
  try {
    if (!params.busTypeId)
      return NextResponse.json("Params id is required", { status: 400 });
    const busType = await prisma.type.delete({
      where: { id: params.busTypeId },
    });
    return NextResponse.json(busType);
  } catch (error) {
    console.log("BUSTYPE_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
