import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, image } = body;
    if (!type) return NextResponse.json("Type is required", { status: 400 });
    if (!image) return NextResponse.json("Image is required", { status: 400 });
    const busType = await prisma.type.create({
      data: { type, image },
    });
    return NextResponse.json(busType);
  } catch (error) {
    console.log("[BUSTYPE_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
